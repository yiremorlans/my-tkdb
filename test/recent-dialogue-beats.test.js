// The recent-beat skip: a /roam or /meet draw leaves out the beats this player
// most recently answered from this character (recentBeatWindow in
// constants/characters.js), and the memory behind it is one capped row per
// (user, character), never a growing log (migration 031). The click-time write
// is covered in resp-cooldown-redeem-gate.test.js.
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { createFakeSupabase } from './helpers/fakeSupabase.js';

process.env.SUPABASE_URL ??= 'http://fake.local';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'fake-service-role-key';

const fake = createFakeSupabase({ recent_dialogue_beats: [] });
mock.module('@supabase/supabase-js', {
  namedExports: { createClient: () => fake.client },
});

const {
  dialogueBeatKey,
  getRandomDialogueBeat,
  getRandomDialogueEntry,
  RECENT_DIALOGUE_BEAT_WINDOW,
  recentBeatWindow,
} = await import('../constants/characters.js');
const { DIALOGUE } = await import('../constants/dialogue.js');
const { getRecentDialogueBeats, rememberDialogueBeat } = await import('../db/supabase.js');

const jin = { id: 'jin' };
const DAY = new Date('2026-06-15T12:00:00');

test('the window shrinks with the pool so at least 3 beats stay drawable', () => {
  assert.strictEqual(recentBeatWindow(3), 0);
  assert.strictEqual(recentBeatWindow(5), 2);
  assert.strictEqual(recentBeatWindow(13), 5);
  assert.strictEqual(recentBeatWindow(24), 5);
});

test('a draw never returns a beat inside the window', () => {
  const pool = DIALOGUE.jin.dialogue.new;
  assert.strictEqual(pool.length, 5, 'fixture assumes a 5-beat pool');
  const recentBeats = pool.slice(0, 2).map((beat) => dialogueBeatKey(beat.line));
  for (let i = 0; i < 200; i++) {
    const { beatKey } = getRandomDialogueBeat(jin, 'new', null, { now: DAY, recentBeats });
    assert.ok(!recentBeats.includes(beatKey), 'drew a beat it should have skipped');
  }
});

test('/meet skips recents too, from the same draw', () => {
  const pool = DIALOGUE.jin.dialogue.new;
  const recentBeats = pool.slice(0, 2).map((beat) => dialogueBeatKey(beat.line));
  for (let i = 0; i < 200; i++) {
    const { line, beatKey } = getRandomDialogueEntry(jin, 'new', null, { now: DAY, recentBeats });
    assert.strictEqual(beatKey, dialogueBeatKey(line));
    assert.ok(!recentBeats.includes(beatKey));
  }
});

test('fed its own history, a long run never repeats a beat within the window', () => {
  const window = recentBeatWindow(DIALOGUE.jin.dialogue.warm.length);
  let recentBeats = [];
  for (let i = 0; i < 500; i++) {
    const { beatKey } = getRandomDialogueBeat(jin, 'warm', null, { now: DAY, recentBeats });
    assert.ok(!recentBeats.slice(0, window).includes(beatKey), `repeat at draw ${i}`);
    recentBeats = [beatKey, ...recentBeats.filter((key) => key !== beatKey)].slice(0, window);
  }
});

test('keys from another tier or an edited line are ignored, not a crash', () => {
  const { line } = getRandomDialogueBeat(jin, 'new', null, { now: DAY, recentBeats: ['stale', 'gone'] });
  assert.ok(line && line !== '...');
});

test('the stored list is one row per user+character: newest first, deduped, capped', async () => {
  fake.tables.recent_dialogue_beats = [];
  assert.deepStrictEqual(await getRecentDialogueBeats('user-1', 'jin'), []);

  for (const key of ['a', 'b', 'c', 'd', 'e', 'c', 'f']) {
    await rememberDialogueBeat('user-1', 'jin', key, RECENT_DIALOGUE_BEAT_WINDOW);
  }
  await rememberDialogueBeat('user-1', 'ren', 'z', RECENT_DIALOGUE_BEAT_WINDOW);

  assert.strictEqual(fake.tables.recent_dialogue_beats.length, 2);
  assert.deepStrictEqual(await getRecentDialogueBeats('user-1', 'jin'), ['f', 'c', 'e', 'd', 'b']);
});
