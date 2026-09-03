// Public "call out" encounters — the I/O half (docs/public-encounters.md).
// Content pools and pure helpers live in constants/publicEncounters.js; the
// tick loop that drives spawnEncounter/sweepExpiredEncounters lives in
// encounterScheduler.js.

import {
  buildEncounterContent,
  clearGuessCooldowns,
  ENCOUNTER_BOOST_CAP,
  ENCOUNTER_MAX_MINUTES,
  ENCOUNTER_MIN_MINUTES,
  ENCOUNTER_WINDOW_MINUTES,
  fillTemplate,
  generateEncounter,
  getGuessCooldownRemaining,
  getMilestone,
  MISSED_LINES,
  pickMilestone,
  POST_FAILURE_LIMIT,
  pickRandom,
  pickWinnerLine,
  startGuessCooldown,
  matchCharacterGuess,
  winnerLineBucket,
  WRONG_GUESS_LINES,
} from './constants/publicEncounters.js';
import {
  getCharacterById,
  getCharacterImageUrl,
  getFullName,
} from './constants/characters.js';
import { getDialogueTier, getRelationshipLevel } from './constants/game.js';
import { composeSilhouetteEncounter } from './imageComposition.js';
import { editChannelMessage, postChannelMessage } from './discordRest.js';
import {
  bumpGuildPostFailure,
  claimPublicEncounter,
  createPublicEncounter,
  expirePublicEncounter,
  finalizeExpiredEncounters,
  getActivePublicEncounter,
  getGuildSettings,
  getRelationship,
  grantEncounterBoost,
  incrementTimesMet,
  recordEncounterMilestone,
  recordEncounterWin,
  setGuildEnabled,
  recordGuildSpawn,
  setPublicEncounterLocation,
  setPublicEncounterMessageId,
  upsertGuildChannel,
  trackCharacterEngagement,
  trackCommandUsage,
  trackUserActivity,
} from './db/supabase.js';

const EPHEMERAL = 64;

// Cadence is the same everywhere; what differs per guild is only *when* its
// clock happens to land, because each rolls its own gap inside the shared
// range. That's what keeps servers from spawning in lockstep.
export function rollGapMinutes() {
  const min = Math.min(ENCOUNTER_MIN_MINUTES, ENCOUNTER_MAX_MINUTES);
  const max = Math.max(ENCOUNTER_MIN_MINUTES, ENCOUNTER_MAX_MINUTES);
  // guild_settings.next_gap_minutes is an INT column — round rather than hand
  // Postgres a float. Sub-minute precision on a 45–180 minute gap is noise.
  return Math.round(min + Math.random() * (max - min));
}

// Is this guild due? Read the /roam way: how long since the last one, against
// the gap that was rolled at that time — never a stored "next spawn at HH:MM".
//
// Because the anchor is a past event and the loop re-derives this on every
// tick, a redeploy or an outage of any length changes nothing: the elapsed time
// keeps accruing while the process is down, and the first tick after boot picks
// up exactly where the clock actually is. There is no timer to lose.
export function isSpawnDue(guild, now = new Date()) {
  // No anchor at all (a row written by hand, say) — treat as due rather than
  // leaving that guild silent forever.
  if (!guild.last_encounter_at) return true;

  const gapMinutes = guild.next_gap_minutes ?? ENCOUNTER_MIN_MINUTES;
  const dueAt = new Date(guild.last_encounter_at).getTime() + gapMinutes * 60 * 1000;
  return now.getTime() >= dueAt;
}

function ephemeral(content) {
  return { content, flags: EPHEMERAL };
}

// --- spawn ------------------------------------------------------------------

/**
 * Generate, composite and post one encounter for a guild, then re-anchor that
 * guild's cadence. The row is inserted before the POST so a POST that fails
 * still has a row to mark expired, and the guild's failure counter can climb
 * toward the auto-disable threshold.
 *
 * The compose + POST is the only part treated as a "channel POST failure". Once
 * the silhouette is live in the channel, a later DB error (message_id write,
 * cadence re-anchor) is logged but does not expire the encounter or touch the
 * failure counter — the encounter is real and the expiry sweep will finalize it.
 *
 * Returns the created row, or null if nothing was posted.
 */
export async function spawnEncounter(guild, now = new Date(), { characterId, variant, reanchor = true } = {}) {
  const generated = generateEncounter(now, { characterId, variant });
  if (!generated) {
    console.warn('[publicEncounters] No eligible background — skipping spawn for', guild.guild_id);
    return null;
  }

  const expiresAt = new Date(now.getTime() + ENCOUNTER_WINDOW_MINUTES * 60 * 1000);

  const row = await createPublicEncounter({
    guildId: guild.guild_id,
    channelId: guild.encounter_channel_id,
    characterId: generated.characterId,
    variant: generated.variant,
    background: generated.background,
    teaser: generated.teaser,
    expiresAt,
  });

  // Another instance already has one live for this guild (the partial unique
  // index caught it). Stand down without posting or touching the cadence.
  if (!row) return null;

  // The compose + POST. A failure anywhere in here means the encounter never
  // became visible: close the row out and let the guild's failure counter climb
  // toward auto-disable.
  let message;
  try {
    const charFilename = generated.character.images[generated.variant];
    const image = await composeSilhouetteEncounter(generated.background, charFilename);

    message = await postChannelMessage(guild.encounter_channel_id, {
      content: buildEncounterContent(generated.teaser, expiresAt),
      files: [{ attachment: image, name: 'encounter.png' }],
      // The post names nobody and pings nobody — it's answered with a slash
      // command, not a reply.
      allowed_mentions: { parse: [] },
    });
  } catch (err) {
    console.error(`[publicEncounters] Post failed for guild ${guild.guild_id}:`, err.message);

    // Close the row out immediately — an encounter nobody can see must not
    // block the next spawn for the rest of its window.
    await expirePublicEncounter(row.id)
      .catch((e) => console.error('[publicEncounters] Failed to close orphaned row:', e.message));

    // A manual /encdev spawn (reanchor: false) never touches guild_settings — a
    // one-off test post must not move the live cadence or trip the auto-disable
    // counter.
    if (reanchor) {
      const { failures, disabled } = await bumpGuildPostFailure(guild.guild_id, POST_FAILURE_LIMIT)
        .catch((e) => {
          console.error('[publicEncounters] Failed to record post failure:', e.message);
          return { failures: 0, disabled: false };
        });
      if (disabled) {
        console.error(
          `[publicEncounters] Disabled encounters for guild ${guild.guild_id} after ${failures} consecutive post failures`,
        );
      }

      // Still push the clock forward, or a broken channel gets retried on every
      // tick until the failure counter runs out. If this write ALSO fails the
      // anchor stays "due" — the scheduler's in-memory retry floor
      // (SPAWN_RETRY_FLOOR_MS) is then the only thing spacing retries, so it
      // must not be silent.
      await recordGuildSpawn(guild.guild_id, { at: new Date(), gapMinutes: rollGapMinutes() })
        .catch((e) =>
          console.error(
            `[publicEncounters] Clock-advance after a failed post also failed for guild ${guild.guild_id} — leaning on the scheduler retry floor:`,
            e.message,
          ),
        );
    }
    return null;
  }

  // The silhouette is live in the channel now. Anything that fails past this
  // point is NOT a post failure — the encounter exists and is answerable, and
  // the scheduler's expiry sweep will finalize it on time (the row stays
  // resolved_at NULL). Don't expire it, don't touch the failure counter; just
  // log and carry on.
  await setPublicEncounterMessageId(row.id, message.id).catch((e) =>
    console.error(
      `[publicEncounters] Encounter ${row.id} posted but message_id wasn't saved — its win/miss edit will be skipped:`,
      e.message,
    ),
  );

  // Anchored to the successful post, so this guild's cadence is independent of
  // how fast the encounter gets solved. A post that lands also clears the
  // consecutive-failure count. A manual /encdev spawn passes reanchor: false so
  // a test never moves the live schedule. If this write fails the encounter is
  // still fine — the next tick just re-derives the schedule from the unchanged
  // anchor.
  if (reanchor) {
    await recordGuildSpawn(guild.guild_id, {
      at: new Date(),
      gapMinutes: rollGapMinutes(),
      resetFailures: true,
    }).catch((e) =>
      console.error(
        `[publicEncounters] Encounter ${row.id} posted but the cadence re-anchor failed:`,
        e.message,
      ),
    );
  }

  console.log(
    `[publicEncounters] Spawned ${generated.characterId} in guild ${guild.guild_id} (encounter ${row.id})`,
  );
  return { ...row, message_id: message.id };
}

// --- expiry -----------------------------------------------------------------

/**
 * Edit a finalized-unsolved encounter's post to a "moment has passed" line and
 * drop the silhouette. The name is never spoken on a miss — there is nothing
 * to reveal, so the image goes rather than becoming a free answer key.
 */
export async function finalizeEncounter(row) {
  clearGuessCooldowns(row.id);

  if (!row.message_id) return; // the POST never landed — nothing to edit

  try {
    await editChannelMessage(row.channel_id, row.message_id, {
      content: pickRandom(MISSED_LINES),
      attachments: [],
      components: [],
      embeds: [],
    });
  } catch (err) {
    console.error(`[publicEncounters] Could not edit missed encounter ${row.id}:`, err.message);
  }
}

/**
 * Relocate a live encounter to a different channel, keeping its identity, its
 * deadline and its claim intact.
 *
 * Discord has no "move a message", so this re-posts: the silhouette is
 * recomposed from the fields already on the row (background, character,
 * variant), which is the one time this feature composites twice — a rare admin
 * action, not the hot path. `expires_at` is untouched, so the new post counts
 * down to the same moment the old one did.
 *
 * Everything downstream — the win edit, the miss edit, the sweep — reads
 * channel_id and message_id off the row, so repointing those two columns is
 * what actually moves the encounter. Returns false if it couldn't be moved.
 */
export async function moveEncounterToChannel(row, toChannelId) {
  const character = getCharacterById(row.character_id);
  const charFilename = character?.images?.[row.variant];
  if (!charFilename) {
    console.error(`[publicEncounters] Cannot move encounter ${row.id}: no art for ${row.character_id}/${row.variant}`);
    return false;
  }

  const image = await composeSilhouetteEncounter(row.background, charFilename);
  const message = await postChannelMessage(toChannelId, {
    content: buildEncounterContent(row.teaser, row.expires_at),
    files: [{ attachment: image, name: 'encounter.png' }],
    allowed_mentions: { parse: [] },
  });

  const moved = await setPublicEncounterLocation(row.id, toChannelId, message.id);
  if (!moved) {
    // Resolved between the post and the update — someone won it in the old
    // channel. Their reveal is already there; leave it be.
    console.log(`[publicEncounters] Encounter ${row.id} resolved mid-move; new post left as-is`);
    return false;
  }

  // Leave a pointer where it used to be, minus the silhouette — the encounter
  // is answerable in the new channel now, not this one.
  if (row.message_id) {
    await editChannelMessage(row.channel_id, row.message_id, {
      content: `This encounter moved to <#${toChannelId}>.`,
      attachments: [],
      embeds: [],
      components: [],
    }).catch((err) =>
      console.error(`[publicEncounters] Could not annotate the old post for ${row.id}:`, err.message),
    );
  }

  return true;
}

/**
 * Finalize every window that has run out for a guild and edit each post.
 * Called from the scheduler tick; also the restart-safety net, since the state
 * it works from is entirely in Postgres.
 */
export async function sweepExpiredEncounters(guildId, now = new Date()) {
  const rows = await finalizeExpiredEncounters(guildId, now);
  for (const row of rows) {
    await finalizeEncounter(row);
  }
  return rows;
}

// --- /encounters (admin) ----------------------------------------------------

// Discord permission bits, as they arrive in `member.permissions` — a decimal
// string of the invoking member's *computed* permissions in the invoking
// channel, inside the signed interaction body, so it can't be forged.
const PERMISSION_ADMINISTRATOR = 1n << 3n; // 0x8
const PERMISSION_MANAGE_GUILD = 1n << 5n;  // 0x20 — "Manage Server"

// Whether this member may configure encounters. Discord computes ADMINISTRATOR
// as every bit set, and the guild owner likewise, so both fall out of the
// Manage Server check; ADMINISTRATOR is tested explicitly anyway rather than
// relying on that.
function canManageEncounters(member) {
  let permissions;
  try {
    permissions = BigInt(member?.permissions ?? '0');
  } catch {
    // Malformed or absent — deny. Failing closed is the right default for a
    // command that can silence the feature for a whole server.
    return false;
  }

  return (
    (permissions & PERMISSION_MANAGE_GUILD) === PERMISSION_MANAGE_GUILD ||
    (permissions & PERMISSION_ADMINISTRATOR) === PERMISSION_ADMINISTRATOR
  );
}

/**
 * Per-guild configuration.
 *
 * `default_member_permissions: '32'` on the command is only a *default*: a
 * server admin can override it under Server Settings → Integrations and grant
 * `/encounters` to any role they like. So the permission is re-checked here
 * against the member's real computed permissions rather than trusted to that
 * default — otherwise "only admins can turn encounters off" would hold by
 * convention, not by enforcement.
 *
 * Returns `{ reply, afterReply }` like handleCall.
 */
export async function handleEncountersAdmin(body) {
  const userId = body.member?.user?.id || body.user?.id;
  const guildId = body.guild_id;

  if (!guildId) {
    return { reply: ephemeral('This only works in a server.'), afterReply: null };
  }

  // Applies to every subcommand, not just `disable` — `channel` can silently
  // relocate encounters into a channel nobody reads, which stops the feature
  // just as effectively.
  if (!canManageEncounters(body.member)) {
    console.warn(
      `[publicEncounters] Refused /encounters from ${userId} in ${guildId} — lacks Manage Server`,
    );
    return {
      reply: ephemeral('You need the **Manage Server** permission to configure encounters.'),
      afterReply: null,
    };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === 'channel') {
    const channelId = sub.options?.find((o) => o.name === 'channel')?.value;
    if (!channelId) {
      return { reply: ephemeral('Pick a channel to post encounters in.'), afterReply: null };
    }

    const existing = await getGuildSettings(guildId);
    const previousChannelId = existing?.encounter_channel_id || null;
    const isMove = previousChannelId !== null && previousChannelId !== channelId;

    // One channel per server, enforced by the schema rather than by a check
    // here: guild_settings.guild_id is the PRIMARY KEY and this is an upsert on
    // it, so running the command again *moves* the channel — it can never add a
    // second. There is no state in which a guild has two encounter channels.
    //
    // Anchor at "now" with a fresh gap, so the first encounter lands one normal
    // interval out rather than the instant the admin hits enter.
    await upsertGuildChannel(guildId, channelId, userId, {
      at: new Date(),
      gapMinutes: rollGapMinutes(),
    });

    const lines = [
      isMove
        ? `Encounters have moved to <#${channelId}> — they'll stop posting in <#${previousChannelId}>, and anything still live comes with them.`
        : `Encounters will post in <#${channelId}>.`,
      "They'll start showing up on their own. When is deliberately not shown to anyone — including you, here — so nobody can wait in the channel for one.",
      `Each one stays callable for ${ENCOUNTER_WINDOW_MINUTES} minute${ENCOUNTER_WINDOW_MINUTES === 1 ? '' : 's'} once it appears.`,
      'I need **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there.',
    ];

    return {
      reply: ephemeral(lines.join('\n')),
      afterReply: async () => {
        // Anything still live comes across with the channel. Left behind it
        // would sit in a channel /call no longer accepts, counting down to a
        // deadline nobody could answer.
        if (isMove) {
          try {
            const live = await getActivePublicEncounter(guildId);
            if (live) {
              let moved = false;
              try {
                moved = await moveEncounterToChannel(live, channelId);
              } catch (err) {
                console.error(`[publicEncounters] Could not move encounter ${live.id}:`, err.message);
              }

              // Couldn't bring it across — close it out where it stands rather
              // than leave it unanswerable. expirePublicEncounter is
              // conditional on resolved_at, so an encounter that was won
              // mid-move keeps its reveal instead.
              if (!moved && await expirePublicEncounter(live.id)) {
                await finalizeEncounter(live);
              }
            }
          } catch (err) {
            console.error(`[publicEncounters] Could not relocate encounter for ${guildId}:`, err.message);
          }
        }

        // Surfaces a permissions problem now, at setup, rather than silently
        // burning three spawns before the auto-disable kicks in.
        try {
          await postChannelMessage(channelId, {
            content: 'Encounters are set up here. Watch for a figure in the dark.',
            allowed_mentions: { parse: [] },
          });
        } catch (err) {
          console.error(`[publicEncounters] Setup check failed for guild ${guildId}:`, err.message);
        }
      },
    };
  }

  if (subcommand === 'disable') {
    await setGuildEnabled(guildId, false);
    return {
      reply: ephemeral(
        'Encounters are off for this server. Any encounter still in flight will finish normally.',
      ),
      afterReply: null,
    };
  }

  if (subcommand === 'status') {
    const settings = await getGuildSettings(guildId);
    if (!settings) {
      return {
        reply: ephemeral('Encounters have never been set up here. Run `/encounters channel` to start.'),
        afterReply: null,
      };
    }

    // Health only: is it running, and if not, why. Deliberately nothing about
    // cadence or when the next one lands — an admin who could see that would
    // win every encounter.
    const channel = settings.encounter_channel_id
      ? `<#${settings.encounter_channel_id}>`
      : null;
    const failures = settings.post_failures || 0;

    let line;
    if (!channel) {
      line = '⚠️ **Not running** — no channel is set. Run `/encounters channel`.';
    } else if (!settings.enabled && failures >= POST_FAILURE_LIMIT) {
      // enabled was cleared by the auto-disable, not by an admin — say so,
      // because "off" alone would read as somebody's deliberate choice.
      line = `⚠️ **Stopped** — ${failures} posts in a row failed to reach ${channel}, so I stopped trying.\nCheck I have **View Channel**, **Send Messages**, **Attach Files** and **Embed Links** there, then run \`/encounters channel\` again to restart.`;
    } else if (!settings.enabled) {
      line = `⛔ **Off** — turned off with \`/encounters disable\`. Channel is still set to ${channel}; run \`/encounters channel\` to turn it back on.`;
    } else if (failures > 0) {
      line = `⚠️ **Running, with errors** — ${failures} recent post${failures === 1 ? '' : 's'} failed to reach ${channel}. Check my permissions there; after ${POST_FAILURE_LIMIT} in a row I'll stop.`;
    } else {
      line = `✅ **Running** — posting in ${channel}.`;
    }

    return { reply: ephemeral(line), afterReply: null };
  }

  return { reply: ephemeral('Unknown subcommand.'), afterReply: null };
}

// --- /call ------------------------------------------------------------------

/**
 * Handle a `/call` interaction.
 *
 * Returns `{ reply, afterReply }` — the caller sends `reply` (always
 * ephemeral) and then runs `afterReply`, which is null except on a win. The
 * split keeps the interaction inside Discord's 3s budget: the reward grant,
 * the milestone, the public message edit and analytics all happen after the
 * user already has their answer.
 */
export async function handleCall(body, now = new Date()) {
  const userId = body.member?.user?.id || body.user?.id;
  const guildId = body.guild_id;
  const rawGuess = body.data?.options?.find((o) => o.name === 'character')?.value ?? '';

  if (!guildId) {
    return { reply: ephemeral('This only works in a server.'), afterReply: null };
  }

  const guild = await getGuildSettings(guildId);
  if (!guild || !guild.enabled || !guild.encounter_channel_id) {
    return { reply: ephemeral("Encounters aren't set up in this server."), afterReply: null };
  }

  if (body.channel_id !== guild.encounter_channel_id) {
    return {
      reply: ephemeral(`You can only call out from <#${guild.encounter_channel_id}>.`),
      afterReply: null,
    };
  }

  const encounter = await getActivePublicEncounter(guildId, now);
  if (!encounter) {
    return { reply: ephemeral("There's no one to call out to right now."), afterReply: null };
  }

  const guessedId = matchCharacterGuess(rawGuess);

  // Gibberish and typos cost nothing — the cooldown exists to stop someone
  // machine-gunning real names, not to punish a misspelling.
  if (!guessedId) {
    return { reply: ephemeral("I don't know who that is."), afterReply: null };
  }

  if (guessedId !== encounter.character_id) {
    const remaining = getGuessCooldownRemaining(encounter.id, userId, now.getTime());
    if (remaining > 0) {
      return {
        reply: ephemeral(`Give it a moment — try again in ${Math.ceil(remaining / 1000)}s.`),
        afterReply: null,
      };
    }

    startGuessCooldown(encounter.id, userId, now.getTime());
    // Nothing to record: engagement is counted as correct calls only, so a
    // wrong guess costs the caller a cooldown and writes no row anywhere.
    return { reply: ephemeral(pickRandom(WRONG_GUESS_LINES)), afterReply: null };
  }

  const character = getCharacterById(encounter.character_id);

  // The claim and the relationship read are independent, so they go together —
  // the tier picks the winner line's register and gates the milestone, and a
  // second sequential round trip here would eat into the 3s budget.
  const [claimed, relationship] = await Promise.all([
    claimPublicEncounter(encounter.id, userId, now),
    // A win never changes affinity, so this is only ever read: it decides the
    // register of the public line and gates which milestones are reachable.
    getRelationship(userId, encounter.character_id).catch((err) => {
      console.error('[publicEncounters] relationship read failed, treating as new:', err.message);
      return null;
    }),
  ]);

  if (!claimed) {
    return { reply: ephemeral('Someone else reached them first.'), afterReply: null };
  }

  clearGuessCooldowns(encounter.id);

  const level = getRelationshipLevel(relationship?.affinity ?? 0);
  const tier = getDialogueTier(level.name);
  const bucket = winnerLineBucket(tier);
  const milestoneType = pickMilestone(tier, bucket);
  const milestone = getMilestone(milestoneType);

  const vars = {
    user: `<@${userId}>`,
    name: getFullName(character),
    firstName: character.firstName,
    house: character.house || 'Darkwick',
  };

  const replyLines = [
    `That was **${getFullName(character)}**.`,
    // Spell out the reward rather than hint at it: a pending boost, redeemed by
    // the next authored response with this character — /roam or /meet, whichever
    // comes first.
    `Your next \`/roam\` or \`/meet\` with ${character.firstName} is boosted from this encounter.`,
  ];

  const afterReply = async () => {
    // grantEncounterBoost and incrementTimesMet both read-then-write the same
    // character_relationships row. Run them in series: the first creates the row
    // (for a never-met character) and the second updates it, so they can't race
    // two INSERTs into a unique violation or both read the same counter and lose
    // one increment. Each catches independently so one failing doesn't skip the
    // other or the reveal.
    await grantEncounterBoost(userId, encounter.character_id, ENCOUNTER_BOOST_CAP)
      .catch((err) => console.error('[publicEncounters] grantEncounterBoost failed:', err?.message));
    await incrementTimesMet(userId, encounter.character_id)
      .catch((err) => console.error('[publicEncounters] incrementTimesMet failed:', err?.message));

    await Promise.allSettled([
      recordEncounterMilestone({
        userId,
        characterId: encounter.character_id,
        milestoneType,
      }),
      // The durable monthly tally — the only per-user record this feature
      // keeps, and the reason public_encounters can be pruned at 90 days.
      recordEncounterWin(userId, guildId),
      trackUserActivity(userId),
      trackCommandUsage(userId, 'call'),
      trackCharacterEngagement(userId, encounter.character_id),
    ]).then((results) => {
      for (const result of results) {
        if (result.status === 'rejected') {
          console.error('[publicEncounters] win side-effect failed:', result.reason?.message);
        }
      }
    });

    if (!encounter.message_id) return;

    // The public reveal: the catch (winner line, tuned to the relationship
    // register) and then the milestone's "what happened after" beat, the same
    // afterline whose `label` shows under /affinity's Moments together.
    const revealLines = [pickWinnerLine(tier, vars)];
    if (milestone) revealLines.push(fillTemplate(milestone.afterline, vars));

    // Discord rejects the whole edit (400 URL_TYPE_INVALID_URL) if the thumbnail
    // isn't an absolute URL — which is what getCharacterImageUrl returns when
    // BASE_URL is unset. A missing BASE_URL is a deploy-config gap; it must not
    // cost the channel its entire reveal, so drop the thumbnail and keep the
    // text when the URL isn't usable.
    const thumbUrl = getCharacterImageUrl(character, encounter.variant);
    const embed = {
      description: revealLines.join('\n\n'),
      color: level.color,
    };
    if (/^https?:\/\//i.test(thumbUrl)) {
      embed.thumbnail = { url: thumbUrl };
    } else {
      console.error(
        `[publicEncounters] BASE_URL is unset or invalid — revealing encounter ${encounter.id} without a thumbnail (got "${thumbUrl}")`,
      );
    }

    try {
      // No file is composed or uploaded here: the spawn silhouette stays as the
      // message's image (omitting `attachments` leaves it alone) and the reveal
      // rides in an embed beneath it, whose thumbnail is the /assets URL for
      // the real art. The mention has to be in `content` — a mention inside an
      // embed renders but never pings.
      await editChannelMessage(encounter.channel_id, encounter.message_id, {
        content: `<@${userId}>`,
        embeds: [embed],
      });
    } catch (err) {
      // The winner already has their ack and their reward; a failed edit only
      // costs the channel its reveal.
      console.error(`[publicEncounters] Could not edit solved encounter ${encounter.id}:`, err.message);
    }
  };

  return { reply: ephemeral(replyLines.join('\n')), afterReply };
}

// --- /encdev (owner-only test tooling) -------------------------------------

// Not a Discord-permission gate — a single hard-coded operator. OWNER_DISCORD_ID
// is the bot owner's user id; unset means the command is off for everyone. The
// command is also registered with default_member_permissions '0', so it never
// shows up for non-admins — but that only hides it. This check is what enforces
// it, and anyone else is answered with a bare "Unknown command." so its
// existence isn't confirmed.
function isEncounterDevOwner(userId) {
  const owner = process.env.OWNER_DISCORD_ID;
  return Boolean(owner) && userId === owner;
}

/**
 * `/encdev` — manual encounter tooling, restricted to OWNER_DISCORD_ID. Exists
 * only to exercise the spawn / reveal / expiry path on demand instead of
 * waiting out the 45–180 minute cadence.
 *
 *   /encdev spawn [character] [variant]   force one encounter now
 *   /encdev clear                         expire this guild's live encounter
 *
 * A manual spawn passes `reanchor: false`, so it never writes guild_settings —
 * the real cadence anchor and the post-failure counter are left exactly as they
 * were. Testing never moves or masks the live schedule.
 *
 * Returns a plain message-data object (`{ content }`). app.js defers this
 * interaction ephemerally and delivers the return value as the followup, so the
 * whole thing runs with a ~15s budget rather than the 3s inline one.
 */
export async function handleEncounterDev(body) {
  const userId = body.member?.user?.id || body.user?.id;
  const guildId = body.guild_id;

  if (!isEncounterDevOwner(userId)) {
    console.warn(`[publicEncounters] /encdev refused for ${userId} in ${guildId}`);
    return { content: 'Unknown command.' };
  }

  if (!guildId) return { content: 'This only works in a server.' };

  const guild = await getGuildSettings(guildId);
  if (!guild || !guild.encounter_channel_id) {
    return { content: "Encounters aren't set up here. Run `/encounters channel` first." };
  }

  const sub = body.data?.options?.[0];
  const subcommand = sub?.name;

  if (subcommand === 'clear') {
    const live = await getActivePublicEncounter(guildId);
    if (!live) return { content: 'No live encounter to clear.' };

    const expired = await expirePublicEncounter(live.id);
    if (!expired) return { content: 'That encounter resolved before it could be cleared.' };

    await finalizeEncounter(expired);
    return { content: `Cleared encounter #${live.id}. You can \`/encdev spawn\` again now.` };
  }

  if (subcommand === 'spawn') {
    const live = await getActivePublicEncounter(guildId);
    if (live) {
      const endsUnix = Math.floor(new Date(live.expires_at).getTime() / 1000);
      return {
        content: `An encounter is already live (#${live.id}, ends <t:${endsUnix}:R>). Clear it with \`/encdev clear\` first.`,
      };
    }

    const rawCharacter = sub.options?.find((o) => o.name === 'character')?.value;
    const variant = sub.options?.find((o) => o.name === 'variant')?.value || undefined;

    let characterId;
    if (rawCharacter) {
      characterId = matchCharacterGuess(rawCharacter);
      if (!characterId) return { content: `I don't know who "${rawCharacter}" is.` };
    }

    const row = await spawnEncounter(guild, new Date(), { characterId, variant, reanchor: false });
    if (!row) {
      return {
        content:
          'Spawn failed — nothing was posted. Check the logs (no eligible background, or the channel POST was rejected).',
      };
    }

    return {
      content: `Spawned **${getFullName(getCharacterById(row.character_id))}** (${row.variant}) as encounter #${row.id} in <#${guild.encounter_channel_id}>.`,
    };
  }

  return { content: 'Unknown subcommand.' };
}
