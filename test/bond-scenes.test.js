// Bond scenes — the level-up DMs (docs/bond-scene-dms.md).
//
// The properties worth guarding here are the ones that are expensive to get
// wrong in production and invisible in a happy-path manual test:
//
//   * a scene is delivered once, ever, per (user, character, level) — a
//     replayed interaction or a re-earned level must send nothing;
//   * every beat after the first goes out on the bot token into a stored DM
//     channel, which is what makes a Continue button outlive its interaction;
//   * a click that isn't the exact next beat posts nothing at all, however long
//     ago it was rendered;
//   * the keepsake is granted exactly once, by the same write that closes the
//     scene;
//   * a beat that could not be delivered leaves the scene recoverable — the
//     next command offers a button that puts it back in the DM, and the scene
//     never renders anywhere but there.
//
// discordRest is mocked, so nothing here talks to Discord; the fake Supabase
// client reimplements migration 015's two functions in JS (see the caveat in
// test/helpers/fakeSupabase.js — this checks the callers, not the SQL).
import { test, mock, beforeEach } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({
  bond_scene_progress: [],
  bond_keepsakes: [],
  character_relationships: [],
  user_activity: [],
});
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

// Every outbound Discord call, recorded rather than made. `dmFails` flips
// openDmChannel into the 403 that a user sharing no guild with the bot produces.
const discord = { posts: [], typing: [], dmFails: false, postFails: false };
mock.module('../discordRest.js', {
  namedExports: {
    openDmChannel: async (userId) => {
      if (discord.dmFails) throw new Error('Discord API error: 403 Cannot send messages to this user');
      return `dm-${userId}`;
    },
    postChannelMessage: async (channelId, message) => {
      if (discord.postFails) throw new Error('Discord API error: 500');
      discord.posts.push({ channelId, ...message });
      return { id: `msg-${discord.posts.length}` };
    },
    postChannelTyping: async (channelId) => {
      discord.typing.push(channelId);
    },
  },
});

const {
  buildBondJournal,
  deliverBondScene,
  getBondScene,
  handleBondClick,
  handleBondReplayClick,
  surfaceBondSceneResume,
} = await import('../bondScenes.js');

const USER = 'user-1';
const CHAR = 'ren';

function reset() {
  fake.tables.bond_scene_progress = [];
  fake.tables.bond_keepsakes = [];
  fake.tables.character_relationships = [
    { discord_user_id: USER, character_id: CHAR, affinity: 55, times_met: 12 },
  ];
  fake.tables.user_activity = [{ discord_user_id: USER, bond_dms_enabled: true }];
  fake.tables.encounter_milestones = [];
  discord.posts = [];
  discord.typing = [];
  discord.dmFails = false;
  discord.postFails = false;
  fake.setRpcNow(new Date('2026-09-04T00:00:00Z'));
}

const row = () => fake.tables.bond_scene_progress[0];
// Authored beats carry {placeholders} that are resolved before posting, so a
// raw substring match would fail on exactly the beats worth checking. Compare
// the literal stretches between the placeholders instead.
function assertBeatPosted(content, rawBeat) {
  const segments = rawBeat.split(/\{\w+\}/).map((s) => s.trim()).filter((s) => s.length > 15);
  assert.ok(segments.length, 'the beat has no literal stretch long enough to match on');
  for (const segment of segments) {
    assert.ok(content.includes(segment), `posted message is missing: ${segment.slice(0, 60)}`);
  }
}
// The button ids on the last message posted, so a test can walk the scene the
// way a user does rather than by guessing indexes.
const lastButtons = () =>
  (discord.posts.at(-1)?.components || []).flatMap((r) => r.components).map((b) => b.custom_id);

beforeEach(reset);

// --- delivery ----------------------------------------------------------------

test('deliverBondScene claims the level, posts beat 0 into the DM, and stores the channel every later beat needs', async () => {
  const result = await deliverBondScene(USER, CHAR, 'Friend');

  assert.strictEqual(result.delivered, true);
  assert.strictEqual(discord.posts.length, 1);
  assert.strictEqual(discord.posts[0].channelId, `dm-${USER}`);

  const scene = getBondScene(CHAR, 'Friend');
  assertBeatPosted(discord.posts[0].content, scene.beats[0]);

  assert.strictEqual(row().status, 'in_progress');
  // Load-bearing: without this the sequence would depend on an expiring token.
  assert.strictEqual(row().dm_channel_id, `dm-${USER}`);
  assert.strictEqual(row().current_beat, 0);
});

test('deliverBondScene never sends the same level twice, whatever state the existing row is in', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  assert.strictEqual(discord.posts.length, 1);

  const again = await deliverBondScene(USER, CHAR, 'Friend');

  assert.strictEqual(again.delivered, false);
  assert.strictEqual(again.reason, 'already-claimed');
  assert.strictEqual(discord.posts.length, 1, 'a replayed level-up must post nothing');
  assert.strictEqual(fake.tables.bond_scene_progress.length, 1);
});

test('a level crossed while an earlier scene is unfinished is claimed but held back', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.posts = [];

  const result = await deliverBondScene(USER, CHAR, 'Close Friend');

  assert.strictEqual(result.delivered, false);
  assert.strictEqual(result.reason, 'queued-behind');
  assert.strictEqual(result.behind, 'Friend');
  assert.strictEqual(discord.posts.length, 0, 'two scenes with one character must never run at once');

  const queued = fake.tables.bond_scene_progress.find((r) => r.level_name === 'Close Friend');
  assert.strictEqual(queued.status, 'queued', 'the row is still claimed, just not started');
});

test('a different character is never blocked by an unfinished scene', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.posts = [];

  const result = await deliverBondScene(USER, 'haru', 'Acquaintance');

  assert.strictEqual(result.delivered, true, 'separate characters are separate conversations');
  assert.strictEqual(discord.posts.length, 1);
});

test('a user who has opted out is marked and never messaged', async () => {
  fake.tables.user_activity = [{ discord_user_id: USER, bond_dms_enabled: false }];

  const result = await deliverBondScene(USER, CHAR, 'Friend');

  assert.strictEqual(result.delivered, false);
  assert.strictEqual(result.reason, 'opted-out');
  assert.strictEqual(discord.posts.length, 0);
  assert.strictEqual(row().status, 'skipped_optout');
});

test('the first bond DM a user ever gets carries the frame line and the opt-out button', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');

  assert.match(discord.posts[0].content, /sent you a message/);
  assert.ok(lastButtons().some((id) => id.startsWith('bond:optout:')));
});

test('a later scene with another character is not treated as a first contact', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.posts = [];

  await deliverBondScene(USER, 'haru', 'Acquaintance');

  assert.doesNotMatch(discord.posts[0].content, /sent you a message/);
  assert.ok(!lastButtons().some((id) => id.startsWith('bond:optout:')));
});

// --- the button walk ---------------------------------------------------------

test('each Continue posts the next beat with the bot token, into the stored channel, and advances the row', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  const scene = getBondScene(CHAR, 'Friend');

  const result = await handleBondClick(USER, {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1',
  });

  assert.strictEqual(result.acted, true);
  assert.strictEqual(discord.posts.length, 2);
  assert.strictEqual(discord.posts[1].channelId, `dm-${USER}`, 'beats go to the DM, not a webhook');
  assertBeatPosted(discord.posts[1].content, scene.beats[1]);
  assert.strictEqual(row().current_beat, 1);
});

test('the final beat carries the choice row rather than another Continue', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  const scene = getBondScene(CHAR, 'Friend');

  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });

  const ids = lastButtons();
  assert.strictEqual(ids.length, scene.choice.options.length);
  assert.ok(ids.every((id) => id.startsWith('bond:choice:')));
});

test('a stale or replayed Continue posts nothing — the button never expires, so this is the only guard', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });
  assert.strictEqual(discord.posts.length, 2);

  // The same click again, as Discord would retry it.
  const replay = await handleBondClick(USER, {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1',
  });
  // And a jump past the beat the row is actually on.
  const skip = await handleBondClick(USER, {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '3',
  });

  assert.strictEqual(replay.acted, false);
  assert.strictEqual(replay.reason, 'stale-beat');
  assert.strictEqual(skip.acted, false);
  assert.strictEqual(discord.posts.length, 2, 'neither click may post');
  assert.strictEqual(row().current_beat, 1);
});

test('a click on somebody else\'s scene is ignored', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');

  const result = await handleBondClick('someone-else', {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1',
  });

  assert.strictEqual(result.acted, false);
  assert.strictEqual(result.reason, 'not-yours');
  assert.strictEqual(discord.posts.length, 1);
});

test('the closing choice posts its authored line, records the pick, and grants the keepsake once', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });

  const scene = getBondScene(CHAR, 'Friend');
  const option = scene.choice.options[0];

  const result = await handleBondClick(USER, {
    kind: 'choice', characterId: CHAR, levelKey: 'fri', arg: option.key,
  });

  assert.strictEqual(result.acted, true);
  assertBeatPosted(discord.posts.at(-1).content, option.close);
  // The keepsake is shown in the closing message, not just filed away.
  assert.ok(discord.posts.at(-1).content.includes(scene.keepsake.emoji));
  // The scene ends with exactly one button: a replay of the scene just
  // finished, so looking back doesn't require /bonds character:<name>.
  const ids = (discord.posts.at(-1).components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, [`bond:replaystart:${CHAR}:fri:x`]);

  assert.strictEqual(row().status, 'complete');
  assert.strictEqual(row().choice_key, option.key);
  assert.strictEqual(fake.tables.bond_keepsakes.length, 1);
  assert.strictEqual(fake.tables.bond_keepsakes[0].emoji, scene.keepsake.emoji);
});

test('a second choice click grants no second keepsake and posts nothing', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });
  const key = getBondScene(CHAR, 'Friend').choice.options[0].key;
  await handleBondClick(USER, { kind: 'choice', characterId: CHAR, levelKey: 'fri', arg: key });

  const posts = discord.posts.length;
  const other = getBondScene(CHAR, 'Friend').choice.options[1].key;
  const again = await handleBondClick(USER, { kind: 'choice', characterId: CHAR, levelKey: 'fri', arg: other });

  assert.strictEqual(again.acted, false);
  assert.strictEqual(again.reason, 'already-answered');
  assert.strictEqual(discord.posts.length, posts);
  assert.strictEqual(fake.tables.bond_keepsakes.length, 1);
  assert.strictEqual(row().choice_key, key, 'the first pick stands');
});

test('finishing a scene releases the queued next level for that character', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  await deliverBondScene(USER, CHAR, 'Close Friend'); // queued behind Friend
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });

  const key = getBondScene(CHAR, 'Friend').choice.options[0].key;
  await handleBondClick(USER, { kind: 'choice', characterId: CHAR, levelKey: 'fri', arg: key });

  const next = fake.tables.bond_scene_progress.find((r) => r.level_name === 'Close Friend');
  assert.strictEqual(next.status, 'in_progress', 'the waiting scene starts on its own');
  assert.strictEqual(next.current_beat, 0);
});

test('the opt-out button turns DMs off and closes the scene it was offered on', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');

  const result = await handleBondClick(USER, {
    kind: 'optout', characterId: CHAR, levelKey: 'fri', arg: 'x',
  });

  assert.strictEqual(result.acted, true);
  assert.strictEqual(row().status, 'skipped_optout');
  assert.strictEqual(fake.tables.user_activity[0].bond_dms_enabled, false);
  assert.match(discord.posts.at(-1).content, /\/bonds dms:on/);
});

// --- a beat that fails to post ------------------------------------------------

test('a beat that fails to post leaves current_beat where it was, so nothing is skipped', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.postFails = true;

  const result = await handleBondClick(USER, {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1',
  });

  assert.strictEqual(result.acted, false);
  assert.strictEqual(result.reason, 'post-failed');
  assert.strictEqual(row().current_beat, 0, 'the row must still know where the scene is');
});

// --- recovery: the resume button ---------------------------------------------

test('a user the bot cannot DM gets a pending row rather than an error', async () => {
  discord.dmFails = true;

  const result = await deliverBondScene(USER, CHAR, 'Friend');

  assert.strictEqual(result.delivered, false);
  assert.strictEqual(result.reason, 'pending-dm');
  assert.strictEqual(row().status, 'pending_dm');
  assert.strictEqual(discord.posts.length, 0);
});

test('the next command offers a button, and never the scene itself', async () => {
  discord.dmFails = true;
  await deliverBondScene(USER, CHAR, 'Friend');

  const followups = [];
  const result = await surfaceBondSceneResume(USER, async (m) => followups.push(m));

  assert.strictEqual(result.surfaced, true);
  assert.strictEqual(followups.length, 1);
  assert.strictEqual(followups[0].flags, 64);

  // The envelope, not the letter: no beat text may appear in a channel the
  // scene does not live in.
  const scene = getBondScene(CHAR, 'Friend');
  for (const beat of scene.beats) {
    const segment = beat.split(/\{\w+\}/).map((x) => x.trim()).filter((x) => x.length > 15)[0];
    assert.ok(!followups[0].content.includes(segment), 'the scene must not render outside the DM');
  }

  const ids = (followups[0].components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, [`bond:resume:${CHAR}:fri:x`]);
});

test('pressing resume delivers the scene into the DM and confirms', async () => {
  discord.dmFails = true;
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.dmFails = false; // the user has since joined a server with the bot

  const followups = [];
  const result = await handleBondClick(
    USER,
    { kind: 'resume', characterId: CHAR, levelKey: 'fri', arg: 'x' },
    { sendFollowup: async (m) => followups.push(m) },
  );

  assert.strictEqual(result.acted, true);
  assert.strictEqual(discord.posts.length, 1, 'beat 0 lands in the DM');
  assertBeatPosted(discord.posts[0].content, getBondScene(CHAR, 'Friend').beats[0]);
  assert.strictEqual(row().status, 'in_progress');
  assert.strictEqual(row().current_beat, 0);
  assert.match(followups[0].content, /in your DMs/);
  assert.strictEqual(followups[0].flags, 64);
});

test('a resume that still cannot reach the user says what to do about it', async () => {
  discord.dmFails = true;
  await deliverBondScene(USER, CHAR, 'Friend');

  const followups = [];
  const result = await handleBondClick(
    USER,
    { kind: 'resume', characterId: CHAR, levelKey: 'fri', arg: 'x' },
    { sendFollowup: async (m) => followups.push(m) },
  );

  assert.strictEqual(result.acted, false);
  assert.match(followups[0].content, /Add the bot to a server/);
  assert.match(followups[0].content, /Nothing is lost/);
  assert.strictEqual(row().status, 'pending_dm', 'it stays offerable next time');
});

test('a beat that fails mid-scene parks the row so the button can offer it', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.postFails = true;

  const result = await handleBondClick(USER, {
    kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1',
  });

  assert.strictEqual(result.acted, false);
  assert.strictEqual(result.reason, 'post-failed');
  assert.strictEqual(row().current_beat, 0, 'the row still points at the last beat seen');
  assert.strictEqual(row().status, 'pending_dm', 'nothing live is left in the DM');
});

test('resuming a scene that stalled mid-walk re-posts the owed beat, not the whole scene', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.postFails = true;
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });
  discord.postFails = false;
  const before = discord.posts.length;

  await handleBondClick(
    USER,
    { kind: 'resume', characterId: CHAR, levelKey: 'fri', arg: 'x' },
    { sendFollowup: async () => {} },
  );

  assert.strictEqual(discord.posts.length, before + 1, 'exactly one beat, not a replay');
  assertBeatPosted(discord.posts.at(-1).content, getBondScene(CHAR, 'Friend').beats[1]);
  assert.strictEqual(row().status, 'in_progress');
  assert.strictEqual(row().current_beat, 1);
});

test('a scene with a live button in the DM is never offered a resume button', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');

  const followups = [];
  const result = await surfaceBondSceneResume(USER, async (m) => followups.push(m));

  assert.strictEqual(result.surfaced, false);
  assert.strictEqual(result.reason, 'nothing-pending');
  assert.strictEqual(followups.length, 0, 'its Continue is alive in the DM');
});

test('a completed scene is never offered a resume button', async () => {
  await deliverBondScene(USER, CHAR, 'Friend');
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'fri', arg: '1' });
  const key = getBondScene(CHAR, 'Friend').choice.options[0].key;
  await handleBondClick(USER, { kind: 'choice', characterId: CHAR, levelKey: 'fri', arg: key });

  const followups = [];
  const result = await surfaceBondSceneResume(USER, async (m) => followups.push(m));

  assert.strictEqual(result.surfaced, false);
  assert.strictEqual(followups.length, 0);
});

test('levels crossed while a scene is undelivered queue up rather than piling into pending_dm', async () => {
  discord.dmFails = true;

  await deliverBondScene(USER, CHAR, 'Acquaintance');
  await deliverBondScene(USER, CHAR, 'Friend');
  await deliverBondScene(USER, CHAR, 'Close Friend');

  const rows = fake.tables.bond_scene_progress;
  assert.strictEqual(rows.length, 3, 'every crossing is still claimed and kept');

  const owed = rows.filter((r) => r.status === 'pending_dm');
  assert.deepStrictEqual(
    owed.map((r) => r.level_name),
    ['Acquaintance'],
    'only the lowest unread level is owed; a scene assumes the ones before it',
  );
  assert.deepStrictEqual(
    rows.filter((r) => r.status === 'queued').map((r) => r.level_name).sort(),
    ['Close Friend', 'Friend'],
  );
});

test('the resume button offers the earliest unread level, not the most recent', async () => {
  discord.dmFails = true;
  await deliverBondScene(USER, CHAR, 'Acquaintance');
  await deliverBondScene(USER, CHAR, 'Friend');

  const followups = [];
  await surfaceBondSceneResume(USER, async (m) => followups.push(m));

  const ids = (followups[0]?.components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, [`bond:resume:${CHAR}:acq:x`], 'Acquaintance before Friend');
});

test('finishing one level releases the next, so the whole ladder is readable in order', async () => {
  discord.dmFails = true;
  await deliverBondScene(USER, CHAR, 'Acquaintance');
  await deliverBondScene(USER, CHAR, 'Friend');
  discord.dmFails = false;

  const walk = async (slug) => {
    await handleBondClick(USER, { kind: 'resume', characterId: CHAR, levelKey: slug, arg: 'x' },
      { sendFollowup: async () => {} });
    const level = slug === 'acq' ? 'Acquaintance' : 'Friend';
    const scene = getBondScene(CHAR, level);
    for (let i = 1; i < scene.beats.length; i++) {
      await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: slug, arg: String(i) });
    }
    await handleBondClick(USER, {
      kind: 'choice', characterId: CHAR, levelKey: slug, arg: scene.choice.options[0].key,
    });
  };

  await walk('acq');

  const friend = fake.tables.bond_scene_progress.find((r) => r.level_name === 'Friend');
  assert.strictEqual(friend.status, 'in_progress', 'Friend starts itself once Acquaintance is done');
  assert.strictEqual(fake.tables.bond_keepsakes.length, 1);

  await walk('fri');
  assert.strictEqual(fake.tables.bond_keepsakes.length, 2, 'both levels readable, in order');
});

test('different characters each keep their own owed scene, offered one command at a time', async () => {
  discord.dmFails = true;
  // Distinct claim times, so "newest first" is actually exercised rather than
  // being an accident of three rows sharing a millisecond.
  await deliverBondScene(USER, CHAR, 'Friend');
  fake.setRpcNow(new Date('2026-09-04T01:00:00Z'));
  await deliverBondScene(USER, 'haru', 'Acquaintance');
  fake.setRpcNow(new Date('2026-09-04T02:00:00Z'));
  await deliverBondScene(USER, 'taiga', 'Acquaintance');

  const owed = fake.tables.bond_scene_progress.filter((r) => r.status === 'pending_dm');
  assert.strictEqual(owed.length, 3, 'separate characters never block each other');

  // One per command, so a burst of level-ups can't wall off the encounter.
  const followups = [];
  await surfaceBondSceneResume(USER, async (m) => followups.push(m));
  assert.strictEqual(followups.length, 1);

  // Newest first across characters — they are independent conversations, so
  // there is no ladder between them to preserve.
  const ids = (followups[0].components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, ['bond:resume:taiga:acq:x']);
});

// --- the replay gallery -------------------------------------------------------
//
// Two properties matter here and nothing else really does: a replay is posted
// for real into the DM, with real Continue / choice buttons, same as the
// original scene — and a replay writes nothing. The second is what keeps the
// remembered choice (`choice_key`, read by later dialogue) from becoming
// something a player can quietly re-roll.

// Finish a scene outright, the way a player would.
async function playThrough(level, slug, optionKey) {
  await deliverBondScene(USER, CHAR, level);
  const scene = getBondScene(CHAR, level);
  for (let i = 1; i < scene.beats.length; i++) {
    await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: slug, arg: String(i) });
  }
  await handleBondClick(USER, {
    kind: 'choice', characterId: CHAR, levelKey: slug, arg: optionKey ?? scene.choice.options[0].key,
  });
}

test('a journal with nothing in it says so, and says what fills it', async () => {
  // The player has a relationship with Ren in the fixture but has crossed no
  // level with him, which is the state anyone running /bonds early is in.
  const journal = await buildBondJournal(USER, CHAR);

  assert.match(journal.content, /haven't had a moment like that yet/);
  assert.match(journal.content, /\/roam/, 'a dead end here teaches the player nothing');
  assert.match(journal.content, /\/meet/);
  assert.strictEqual(journal.components, undefined, 'and there is nothing to open');
  assert.strictEqual(journal.flags, 64, 'ephemeral, like every other /bonds surface');
});

test('a name that matches nobody is answered, not thrown', async () => {
  const journal = await buildBondJournal(USER, 'not-a-character');

  assert.strictEqual(journal.content, "You haven't met anyone by that name.");
  assert.strictEqual(journal.flags, 64);
});

test('the journal takes every name form /call does, not just the bare id', async () => {
  await playThrough('Acquaintance', 'acq');
  const expected = (await buildBondJournal(USER, CHAR)).content;

  // Ren Shiranami, reached the ways a player would actually type him. The
  // surname forms matter most: /call's own description teaches "Shohei Haizono",
  // and before this resolved through matchCharacterGuess a full name came back
  // as a stranger to someone who had scenes with him.
  for (const typed of ['Ren', 'ren shiranami', 'Ren Shiranami', 'Shiranami', '  REN  ']) {
    const journal = await buildBondJournal(USER, typed);
    assert.strictEqual(journal.content, expected, `/bonds character:${typed} found nobody`);
  }
});

test('a scene unlocks its own replay the moment it is finished — no character-wide gate', async () => {
  await playThrough('Acquaintance', 'acq');

  const journal = await buildBondJournal(USER, CHAR);
  assert.match(journal.content, /Acquaintance/);
  const ids = (journal.components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, [`bond:replay:${CHAR}:acq:x`], 'replayable straight away, not gated on Soulbound');
});

test('a replay for a level never finished posts nothing and says so', async () => {
  await playThrough('Acquaintance', 'acq');
  const postsBefore = discord.posts.length;

  // Friend was never played, so there is nothing to have again yet.
  const followups = [];
  const result = await handleBondReplayClick(
    USER,
    { kind: 'replay', characterId: CHAR, levelKey: 'fri', arg: 'x' },
    { sendFollowup: async (m) => followups.push(m) },
  );

  assert.strictEqual(result.posted, false, 'unfinished, so re-checked on the click and refused');
  assert.strictEqual(discord.posts.length, postsBefore, 'nothing goes out for a scene never finished');
  assert.match(followups[0].content, /isn't finished yet/);
});

test('finishing Soulbound lists every finished scene alongside it', async () => {
  await playThrough('Soulbound', 'sol');

  const journal = await buildBondJournal(USER, CHAR);
  assert.match(journal.content, /Soulbound/);
  const ids = (journal.components || []).flatMap((r) => r.components).map((b) => b.custom_id);
  assert.deepStrictEqual(ids, [`bond:replay:${CHAR}:sol:x`]);
});

test('a replay is the original interaction again: real beats, real buttons, posted for real into the DM', async () => {
  await playThrough('Friend', 'fri');
  const postsAfterPlay = discord.posts.length;
  const scene = getBondScene(CHAR, 'Friend');

  // Beat 0, via the journal button.
  const followups = [];
  const started = await handleBondReplayClick(
    USER,
    { kind: 'replay', characterId: CHAR, levelKey: 'fri', arg: 'x' },
    { sendFollowup: async (m) => followups.push(m) },
  );
  assert.strictEqual(started.posted, true);
  assert.strictEqual(discord.posts.length, postsAfterPlay + 1, 'a replay posts into the DM like the original scene');
  assert.strictEqual(discord.posts.at(-1).channelId, `dm-${USER}`);
  assertBeatPosted(discord.posts.at(-1).content, scene.beats[0]);
  assert.deepStrictEqual(lastButtons(), [`bond:rnext:${CHAR}:fri:1`], 'a real Continue button, not a preview page');
  assert.match(followups[0].content, /Sent/, 'the journal entry point confirms it landed');

  // Continue, via rnext — no sendFollowup needed for this one, same as a live beat.
  const next = await handleBondReplayClick(USER, { kind: 'rnext', characterId: CHAR, levelKey: 'fri', arg: '1' });
  assert.strictEqual(next.posted, true);
  assertBeatPosted(discord.posts.at(-1).content, scene.beats[1]);
  assert.deepStrictEqual(
    lastButtons(),
    scene.choice.options.map((o) => `bond:rchoice:${CHAR}:fri:${o.key}`),
    'the last beat carries the real choice row, not a preview of every ending',
  );
});

test('picking a choice during a replay shows the real closing line and writes nothing', async () => {
  const scene = getBondScene(CHAR, 'Friend');
  const [mine, other] = scene.choice.options;
  await playThrough('Friend', 'fri', mine.key);

  const rowBefore = { ...row() };
  const keepsakesBefore = fake.tables.bond_keepsakes.length;

  // A replay can pick an ending that wasn't taken the first time — nothing
  // about that is special-cased or marked; it plays exactly like the original
  // choice, it just doesn't record anything.
  const result = await handleBondReplayClick(USER, {
    kind: 'rchoice', characterId: CHAR, levelKey: 'fri', arg: other.key,
  });

  assert.strictEqual(result.posted, true);
  assertBeatPosted(discord.posts.at(-1).content, other.close);
  assert.ok(discord.posts.at(-1).content.includes(scene.keepsake.emoji), 'the keepsake line still shows — it is just not granted again');
  // Another Replay button, so the sequence can be run again from here too.
  assert.deepStrictEqual(lastButtons(), [`bond:replaystart:${CHAR}:fri:x`]);

  assert.strictEqual(row().choice_key, mine.key, 'the remembered answer is untouched');
  assert.deepStrictEqual(row(), rowBefore);
  assert.strictEqual(fake.tables.bond_keepsakes.length, keepsakesBefore, 'no second keepsake granted');
});

test('the closing DM message\'s own Replay button posts silently, with no followup', async () => {
  await playThrough('Friend', 'fri');
  const postsAfterPlay = discord.posts.length;

  const result = await handleBondReplayClick(USER, {
    kind: 'replaystart', characterId: CHAR, levelKey: 'fri', arg: 'x',
  });

  assert.strictEqual(result.posted, true);
  assert.strictEqual(discord.posts.length, postsAfterPlay + 1);
  // No sendFollowup passed in, and handleBondReplayClick doesn't require one —
  // the DM-native entry point never needs to confirm itself.
});

test('rnext refuses an out-of-range beat rather than posting anything', async () => {
  await playThrough('Friend', 'fri');
  const scene = getBondScene(CHAR, 'Friend');
  const postsAfterPlay = discord.posts.length;

  const tooFar = await handleBondReplayClick(USER, {
    kind: 'rnext', characterId: CHAR, levelKey: 'fri', arg: String(scene.beats.length),
  });
  const zero = await handleBondReplayClick(USER, { kind: 'rnext', characterId: CHAR, levelKey: 'fri', arg: '0' });

  assert.strictEqual(tooFar.posted, false);
  assert.strictEqual(zero.posted, false, 'beat 0 comes from replaystart, not rnext');
  assert.strictEqual(discord.posts.length, postsAfterPlay);
});

test('one player\'s finished scene is not another player\'s to replay', async () => {
  await playThrough('Soulbound', 'sol');
  const postsAfterPlay = discord.posts.length;

  const result = await handleBondReplayClick('someone-else', {
    kind: 'replay', characterId: CHAR, levelKey: 'sol', arg: 'x',
  });

  assert.strictEqual(result.posted, false, "`getBondSceneRow` is scoped to the clicking userId, so a forged id finds nobody else's row");
  assert.strictEqual(discord.posts.length, postsAfterPlay);
});

test('a replay of an unfinished scene is refused even when other levels with the same character are done', async () => {
  await playThrough('Soulbound', 'sol');
  // Devoted was never played, so there is nothing to have again.
  const result = await handleBondReplayClick(USER, {
    kind: 'replay', characterId: CHAR, levelKey: 'dev', arg: 'x',
  });
  assert.strictEqual(result.posted, false);
});

// --- content resolution -------------------------------------------------------

test('every character has an authored scene at every level, and nothing else resolves', () => {
  const levels = ['Acquaintance', 'Friend', 'Close Friend', 'Confidant', 'Devoted', 'Soulbound'];

  for (const level of levels) {
    const scene = getBondScene(CHAR, level);
    assert.ok(scene?.beats?.length, `${CHAR} has no scene at ${level}`);
    assert.ok(scene.choice?.options?.length >= 2);
    assert.ok(scene.keepsake?.emoji && scene.keepsake?.line);
  }

  // There is no house-style fallback: an id off the roster resolves to null,
  // which deliverBondScene closes as `skipped_gone` rather than delivering
  // someone else's words in their name.
  assert.strictEqual(getBondScene('not-a-character', 'Friend'), null);
});

test('Stranger has no scene — the first one fires on the crossing out of it', async () => {
  const result = await deliverBondScene(USER, CHAR, 'Stranger');

  assert.strictEqual(result.delivered, false);
  assert.strictEqual(result.reason, 'no-scene-at-level');
  assert.strictEqual(fake.tables.bond_scene_progress.length, 0, 'no row is claimed either');
});

test('scene placeholders are filled from the player\'s own history, not left as braces', async () => {
  // Ren's Acquaintance scene puts {timesMet} in beat 1, and the fixture has 12.
  await deliverBondScene(USER, CHAR, 'Acquaintance');
  await handleBondClick(USER, { kind: 'next', characterId: CHAR, levelKey: 'acq', arg: '1' });

  const posted = discord.posts.map((p) => p.content).join('\n');
  assert.doesNotMatch(posted, /\{\w+\}/, 'an unresolved placeholder would ship as a hole');
  assert.match(posted, /\b12\b/, 'times_met is read from the relationship row');
});
