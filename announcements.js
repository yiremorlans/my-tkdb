// Announcements (docs/announcements.md): the ephemeral notice that follows a
// player's command (scheduled maintenance, a free cooldown reset offer), and
// the `notice:claim:<id>` button that banks the reset. The notices and their
// text live in constants/announcements.js; the per-player seen/claimed rows
// are migration 037.
//
// Nothing here ever blocks or replaces a reply. app.js calls
// surfaceAnnouncements after the command's real answer has gone out, the same
// way it surfaces a pending bond scene.

import {
  ButtonStyleTypes,
  InteractionResponseType,
  MessageComponentTypes,
} from 'discord-interactions';
import { EPHEMERAL } from './utils.js';
import {
  ALREADY_CLAIMED_LINE,
  ANNOUNCEMENTS,
  announcementText,
  CLAIM_BUTTON_LABEL,
  CLAIMED_LINE,
  EXPIRED_LINE,
  findAnnouncement,
  isAnnouncementOpen,
  openAnnouncements,
} from './constants/announcements.js';
import { localDayStart } from './constants/missions.js';
import { isMaintenanceBypassUser } from './maintenance.js';
import { claimAnnouncementReset, markAnnouncementsShown } from './db/supabase.js';

function claimRow(notice) {
  return {
    type: MessageComponentTypes.ACTION_ROW,
    components: [
      {
        type: MessageComponentTypes.BUTTON,
        style: ButtonStyleTypes.SUCCESS,
        label: CLAIM_BUTTON_LABEL,
        custom_id: `notice:claim:${notice.id}`,
      },
    ],
  };
}

/**
 * The followup for this player's open notices, if any are due today.
 *
 * Returns `{ surfaced: true, ids }` after sending one combined ephemeral
 * (maintenance first, one claim button per reset offer), or
 * `{ surfaced: false }` when nothing is open or everything open was already
 * shown today. `sendFollowup(messageData)` posts on the command's own token.
 *
 * Marks the notices shown before sending, so a followup that fails still
 * counts as today's showing. Missing one reminder is the cheaper mistake than
 * a retry storm, and tomorrow's goes out as normal. `announcements` is the
 * list to draw from (tests pass their own).
 */
export async function surfaceAnnouncements(
  userId,
  sendFollowup,
  now = new Date(),
  announcements = ANNOUNCEMENTS,
) {
  const open = openAnnouncements(isMaintenanceBypassUser(userId), now, announcements);
  if (open.length === 0) return { surfaced: false };

  const claimed = new Set(
    await markAnnouncementsShown(userId, open.map((a) => a.id), localDayStart(now)),
  );
  const due = open.filter((a) => claimed.has(a.id));
  if (due.length === 0) return { surfaced: false };

  const resets = due.filter((a) => a.kind === 'reset');
  await sendFollowup({
    content: due.map(announcementText).join('\n\n'),
    ...(resets.length ? { components: resets.map(claimRow) } : {}),
    flags: EPHEMERAL,
  });

  return { surfaced: true, ids: due.map((a) => a.id) };
}

function ephemeralReply(content) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content, flags: EPHEMERAL },
  };
}

/**
 * `notice:claim:<id>`: bank one cooldown reset from a reset offer.
 *
 * Returns `{ response }`. On success the notice is edited in place: the text
 * stays, that offer's button goes, and the confirmation is appended. Every
 * refusal is a fresh ephemeral, so the original notice is left as it was.
 *
 * The open-window check is here, against the constants file; the
 * once-per-player rule is the RPC's, so a double click banks one reset.
 * `announcements` is the list to look the id up in (tests pass their own).
 */
export async function handleAnnouncementClaim(
  body,
  announcementId,
  now = new Date(),
  announcements = ANNOUNCEMENTS,
) {
  const userId = body.member?.user?.id || body.user?.id;
  const notice = findAnnouncement(announcementId, announcements);

  if (
    !notice ||
    notice.kind !== 'reset' ||
    (notice.testOnly && !isMaintenanceBypassUser(userId)) ||
    !isAnnouncementOpen(notice, now)
  ) {
    return { response: ephemeralReply(EXPIRED_LINE) };
  }

  let banked;
  try {
    banked = await claimAnnouncementReset(userId, notice.id);
  } catch (err) {
    console.error(`[announcements] Claim failed for ${notice.id}, user ${userId}: ${err.message}`);
    return { response: ephemeralReply('Something went wrong claiming that. Try again?') };
  }

  if (!banked) return { response: ephemeralReply(ALREADY_CLAIMED_LINE) };

  // Keep any other offer's button on a combined notice.
  const remaining = (body.message?.components || []).filter(
    (row) => !row.components?.some((c) => c.custom_id === `notice:claim:${notice.id}`),
  );
  return {
    response: {
      type: InteractionResponseType.UPDATE_MESSAGE,
      data: {
        content: `${body.message?.content ?? ''}\n\n${CLAIMED_LINE}`.trim(),
        components: remaining,
      },
    },
  };
}
