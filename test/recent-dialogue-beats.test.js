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
  TIER_MIX,
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

test('Close Friend (spark) mixes in warm beats about 10% of the time', () => {
  assert.deepStrictEqual(TIER_MIX.spark, { from: 'warm', chance: 0.1 });
  const sparkKeys = new Set(DIALOGUE.jin.dialogue.spark.map((b) => dialogueBeatKey(b.line)));
  const warmKeys = new Set(DIALOGUE.jin.dialogue.warm.map((b) => dialogueBeatKey(b.line)));
  const own = getRandomDialogueBeat(jin, 'spark', null, { now: DAY, rand: () => 0.5 });
  assert.ok(sparkKeys.has(own.beatKey));
  const mixed = getRandomDialogueBeat(jin, 'spark', null, { now: DAY, rand: () => 0.05 });
  assert.ok(warmKeys.has(mixed.beatKey));

  let warm = 0;
  for (let i = 0; i < 4000; i++) {
    if (warmKeys.has(getRandomDialogueBeat(jin, 'spark', null, { now: DAY }).beatKey)) warm++;
  }
  assert.ok(warm > 250 && warm < 550, `warm share ${warm}/4000`);
});

test('the mixed draw skips the last 5 answered beats across both pools', () => {
  const size = DIALOGUE.jin.dialogue.spark.length + DIALOGUE.jin.dialogue.warm.length;
  assert.strictEqual(recentBeatWindow(size), RECENT_DIALOGUE_BEAT_WINDOW);
  let recentBeats = [];
  for (let i = 0; i < 500; i++) {
    const { beatKey } = getRandomDialogueBeat(jin, 'spark', null, { now: DAY, recentBeats });
    assert.ok(!recentBeats.includes(beatKey), `repeat at draw ${i}`);
    recentBeats = [beatKey, ...recentBeats.filter((key) => key !== beatKey)]
      .slice(0, RECENT_DIALOGUE_BEAT_WINDOW);
  }
});

test('Confidant (close) mixes in spark beats about 10% of the time, skipping recents', () => {
  assert.deepStrictEqual(TIER_MIX.close, { from: 'spark', chance: 0.1 });
  const closeKeys = new Set(DIALOGUE.jin.dialogue.close.map((b) => dialogueBeatKey(b.line)));
  const sparkKeys = new Set(DIALOGUE.jin.dialogue.spark.map((b) => dialogueBeatKey(b.line)));
  assert.ok(closeKeys.has(getRandomDialogueBeat(jin, 'close', null, { now: DAY, rand: () => 0.5 }).beatKey));
  assert.ok(sparkKeys.has(getRandomDialogueBeat(jin, 'close', null, { now: DAY, rand: () => 0.05 }).beatKey));

  const window = recentBeatWindow(closeKeys.size + sparkKeys.size);
  let recentBeats = [];
  let spark = 0;
  for (let i = 0; i < 4000; i++) {
    const { beatKey } = getRandomDialogueBeat(jin, 'close', null, { now: DAY, recentBeats });
    assert.ok(closeKeys.has(beatKey) || sparkKeys.has(beatKey));
    assert.ok(!recentBeats.slice(0, window).includes(beatKey), `repeat at draw ${i}`);
    if (sparkKeys.has(beatKey)) spark++;
    recentBeats = [beatKey, ...recentBeats.filter((key) => key !== beatKey)].slice(0, window);
  }
  // The skip nudges the share up when close's own pool runs low, so the band is loose.
  assert.ok(spark > 200 && spark < 1400, `spark share ${spark}/4000`);
});

test('when every spark beat is recent, the draw falls to warm instead of repeating', () => {
  const spark = DIALOGUE.jin.dialogue.spark.map((b) => dialogueBeatKey(b.line));
  assert.ok(spark.length <= RECENT_DIALOGUE_BEAT_WINDOW, 'fixture assumes a 5-beat spark pool');
  for (let i = 0; i < 100; i++) {
    const { beatKey } = getRandomDialogueBeat(jin, 'spark', null, { now: DAY, recentBeats: spark, rand: () => 0.9 });
    assert.ok(!spark.includes(beatKey));
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
