// Removable articles (docs/hangout-activity.md §4.2 "Removable articles"):
// double-tap an article he wears or carries to take it off. Attached by the
// Activity (main.js attachTouch) and the preview (preview.js).
//
// The first tap on an article plays at once as a touch on it (its own
// `<article>Pat` lines, with the face and pose of the spot it covers). A
// second tap on it within DOUBLE_TAP seconds removes it instead: no
// annoyance, its `<article>Off` reaction and line (always spoken), and the
// art fades out over FADE seconds. Below the unlock tier (warm) a
// double-tap is just two taps; once he's locked out (hangout.js
// LOCKOUT_TIERS), or while he settles after an upset, nothing comes off. A
// removed article stays off until reset (the next load, a tier change in
// the preview, or the drawer's reset).
//
// While an article is on, the spot it covers answers as the article
// (hotspots.js renderer.articleSpot), and so does its own art where no spot
// is (renderer.articleAt). Once it's off the spot is his again.
//
// Config, per outfit, in rig.json `outfits.<name>.articles` (listed order
// is priority, so an article another waits on comes first):
//   part        a model part to hide (its child parts and drawables too)
//   drawables   drawable ids to hide, alone or beside `part`
//   params      { id: value } held once it's off (Elias's candy switches)
//   rest        { id: value } or { byTier } held while it's on: how he
//               wears it at that tier (Elias's lollipop in his mouth from
//               spark); paused while a `poses` pose has it out
//   covers      the touch spot it covers, or a list of them (Mio's apron:
//               chest and belly), or { byTier } of either; a touch on it
//               borrows the face and pose of the covered spot it landed in
//   blocks      false: the covered spot stays his while it's on (only the
//               art itself is the article's); default true
//   shownOnly   true: it's only there while its art shows (Ren's phone and,
//               at warm, Elias's lollipop are out only in some poses)
//   poses       regex of the poses that bring it out; once it's off they
//               don't play
//   offPose     the pose played in their place once it's off (Ren's
//               m_migikoshi, Elias's m_ago), so a hand tap still moves
//               him; without it, those reactions play no pose
//   requires    an article that has to come off first (Haru's sling waits
//               on Peekaboo)
//   pool        false: no `<article>Pat` pool; a touch on it plays the
//               covered spot's own lines (Haru's empty sling)
//   hit         false: its own art isn't a touch area, only the covered
//               spot (the sling crosses his whole chest)
//   hotspots    hotspot geometry swapped in once it's off (Haru's belly spot
//               is drawn on Peekaboo)
//   holdThrough true: a hold on it is the hold of the spot it covers (Leo's
//               headphones and Benkei's tag still give the heartbeat check);
//               a press that ends as a tap is still the article's
//   tier        unlock tier, default warm
//   reactsAs    the covered spot every touch on it borrows the face, pose
//               and annoyance of, wherever in `covers` it lands (Yuri's
//               stethoscope hangs into his hips spot but reacts as belly)

import { DIALOGUE_TIERS } from "../../../constants/tiers.js";

import { hotspotAt } from "./hotspots.js";
import { coveredSpots, forTier } from "./reactions.js";

// Seconds between the two taps of a double-tap.
export const DOUBLE_TAP = 0.35;
// Reference units the second tap may land from the first and still count
// on that article, even if it isn't under the finger anymore: the first
// tap's pose can carry it away (Subaru's gloves ride his hands to his chin).
export const DOUBLE_TAP_SLOP = 90;
// Seconds the art takes to fade out.
export const FADE = 0.3;
export const UNLOCK_TIER = "warm";

const atLeast = (tier, min) => DIALOGUE_TIERS.indexOf(tier) >= DIALOGUE_TIERS.indexOf(min);

/**
 * Attaches removable articles to the scene. Wraps hangout.tapAt and
 * hangout.spotInfo (so holds.js, which calls tapAt for its own spots,
 * chains through it) and scene.frame. `startOff` starts them all removed
 * (?articles=off); `onChange` is called whenever one comes off or back;
 * `coach` (coach.js) gets the article chips: tap one below warm, take one
 * off from warm (offerHints).
 */
export function attachArticles(scene, { startOff = false, onChange, coach } = {}) {
  const { renderer, hangout } = scene;
  const rig = renderer.rig;
  const baseHotspots = { ...rig.hotspots };
  const articles = new Map(
    Object.entries(rig.articles ?? {}).map(([name, config]) => {
      const art = [...new Set([...(config.part ? renderer.drawablesUnderPart(config.part) : []), ...(config.drawables ?? [])])];
      const poses = config.poses ? new RegExp(config.poses) : null;
      return [name, { name, config, art, poses, off: false, offAt: 0 }];
    }),
  );

  const covered = (a) => coveredSpots(a.config.covers, hangout.tier);
  // Its `reactsAs` spot, else the covered spot the last hit on `a` landed
  // in (hotspotAt), else its first: a list's touches borrow that spot's
  // face and pose.
  const spotOf = (a) => {
    if (a.config.reactsAs && covered(a).includes(a.config.reactsAs)) return a.config.reactsAs;
    return a.hitSpot && covered(a).includes(a.hitSpot) ? a.hitSpot : covered(a)[0];
  };
  const present = (a) => !a.off && (!a.config.shownOnly || renderer.drawablesShown(a.art));
  const unlocked = (a) => atLeast(hangout.tier, a.config.tier ?? UNLOCK_TIER);
  const ready = (a) => !a.config.requires || articles.get(a.config.requires)?.off !== false;

  renderer.articleSpot = (spot) => {
    for (const a of articles.values()) {
      if (a.config.blocks !== false && covered(a).includes(spot) && present(a)) {
        a.hitSpot = spot;
        return a.name;
      }
    }
    return null;
  };
  // holds.js: the hold spot under a `holdThrough` article, or null.
  renderer.articleHoldSpot = (name) => {
    const a = articles.get(name);
    return a?.config.holdThrough && present(a) ? spotOf(a) : null;
  };
  // `spot` given: only an article covering that spot (hotspots.js, for a
  // non-blocking article's art inside the spot it covers).
  renderer.articleAt = (point, spot) => {
    for (const a of articles.values()) {
      if (spot && !covered(a).includes(spot)) continue;
      if (a.config.hit !== false && present(a) && renderer.drawablesHit(a.art, point)) {
        a.hitSpot = spot ?? null;
        return a.name;
      }
    }
    return null;
  };

  // An article's spot: the covered spot's annoyance, face and pose, its own
  // lines. A missing pool falls back to the covered spot's lines. A rig that
  // sets a `<article>Pat` reaction gives it its own face and pose too
  // (Subaru's gloved hand is calm where his bare one is drained).
  const spotInfo = hangout.spotInfo.bind(hangout);
  hangout.spotInfo = (spot) => {
    const a = articles.get(spot);
    if (!a) return spotInfo(spot, { worn: false });
    const info = spotInfo(spotOf(a), { worn: false });
    const pat = `${a.name}Pat`;
    if (a.config.pool === false || !hangout.pool(pat)) return info;
    return { ...info, line: pat, ...(rig.reactions?.[pat] ? { reaction: pat } : {}) };
  };

  // A tap on an article that's only out in its own poses (Ren's phone)
  // keeps the pose it's in, instead of the covered spot's: at close his
  // hand_l pose is m_migikoshi, which put the phone away before the second
  // tap of a double-tap could land on it. The upset still plays its own.
  let tapping = null;
  const reactPose = renderer.reactPose.bind(renderer);
  renderer.reactPose = (name, tier) => {
    const a = tapping;
    if (a?.poses && name !== "upset" && renderer.posing && a.poses.test(renderer.posing)) {
      const pose = forTier(rig.reactionPoses?.[name], tier);
      if (!pose || !a.poses.test(pose)) return renderer.extendPose();
    }
    return reactPose(name, tier);
  };

  let last = null; // { name, t, point } of the last tap on an article
  const tapAt = hangout.tapAt.bind(hangout);
  hangout.tapAt = (point, t) => {
    const spot = hotspotAt(rig, renderer, point);
    let a = articles.get(spot);
    const near = last && t - last.t <= DOUBLE_TAP && Math.hypot(point[0] - last.point[0], point[1] - last.point[1]) <= DOUBLE_TAP_SLOP;
    if (near && a?.name !== last.name && removable(articles.get(last.name), t)) a = articles.get(last.name);
    if (a && last?.name === a.name && t - last.t <= DOUBLE_TAP && removable(a, t)) {
      last = null;
      remove(a.name, { t });
      return { spot, result: "removed" };
    }
    tapping = a ?? null;
    let tap;
    try {
      tap = tapAt(point, t);
    } finally {
      tapping = null;
    }
    last = a && tap.result === "ok" ? { name: a.name, t, point } : null;
    if (last) coach?.done(HINTS.tap);
    return tap;
  };

  /** Whether a double-tap would take article `a` off at time `t`. */
  function removable(a, t) {
    return unlocked(a) && ready(a) && present(a) && !hangout.locked && !hangout.meter.recovering(t);
  }

  /** Takes article `name` off; `silent` skips the reaction (?articles=off). */
  function remove(name, { t = scene.time, silent = false } = {}) {
    const a = articles.get(name);
    if (!a || a.off) return false;
    a.off = true;
    a.offAt = t;
    const fade = silent ? 0 : FADE;
    if (a.config.part) renderer.setPartHidden(a.config.part, true, fade);
    renderer.setDrawablesHidden(a.art, true, fade);
    Object.assign(rig.hotspots, a.config.hotspots);
    blockPoses();
    if (!silent) {
      // Taken from his hand mid-pose (Ritsu's recorder, Ren's phone): the
      // pose returns first, then the Off pose plays.
      if (a.poses && renderer.posing && a.poses.test(renderer.posing)) renderer.returnFirst();
      hangout.react(`${name}Off`, t);
      coach?.done(HINTS.off);
    }
    onChange?.();
    return true;
  }

  /** Every article back on. */
  function reset() {
    for (const a of articles.values()) {
      if (!a.off) continue;
      a.off = false;
      if (a.config.part) renderer.setPartHidden(a.config.part, false);
      renderer.setDrawablesHidden(a.art, false);
    }
    for (const key of Object.keys(rig.hotspots)) if (!(key in baseHotspots)) delete rig.hotspots[key];
    Object.assign(rig.hotspots, baseHotspots);
    last = null;
    blockPoses();
    onChange?.();
  }

  function blockPoses() {
    renderer.blockedPoses = [...articles.values()].filter((a) => a.off && a.poses).map((a) => ({ poses: a.poses, offPose: a.config.offPose ?? null }));
  }

  // Held parameters, each frame: a worn article's `rest` (paused while one
  // of its poses has it out, the return included) and a removed one's
  // `params` once its fade is done.
  let lastPose = null;
  let held = "";
  function holdParams(t) {
    if (renderer.posing) lastPose = renderer.posing;
    const posed = renderer.posing ?? (performance.now() < renderer.idleUntil ? lastPose : null);
    const params = {};
    for (const a of articles.values()) {
      if (a.off) {
        if (t >= a.offAt + FADE) Object.assign(params, a.config.params);
      } else if (!(posed && a.poses?.test(posed))) Object.assign(params, forTier(a.config.rest, hangout.tier));
    }
    const key = JSON.stringify(params);
    if (key === held) return;
    held = key;
    renderer.setHeldParams(params);
  }

  const sceneFrame = scene.frame;
  scene.frame = (t, dt) => {
    holdParams(t);
    sceneFrame(t, dt);
  };

  // --- tutorial chips (coach.js) --------------------------------------------
  // Below warm, a tap on an article plays its own lines; from warm a
  // double-tap takes it off. Each chip points at the first article that
  // fits (a dot on its biggest piece of art) and is offered only where he has one, so it
  // waits for a character who does. The text never names the article.
  const HINTS = { tap: "hangout.hint.articleTap", off: "hangout.hint.articleOff" };
  const tappable = () => [...articles.values()].find((a) => a.config.hit !== false && present(a)) ?? null;
  const takeable = () => [...articles.values()].find((a) => a.config.hit !== false && removable(a, scene.time)) ?? null;
  const centerOf = (a) => (a ? renderer.drawablesAnchor(a.art) : null);
  const below = () => !atLeast(hangout.tier, UNLOCK_TIER);
  function offerHints() {
    if (!coach || !articles.size) return;
    const rank = DIALOGUE_TIERS.indexOf(UNLOCK_TIER);
    coach.offer({
      key: HINTS.tap,
      rank: rank - 1,
      text: "Something of his reacts to a tap",
      point: () => centerOf(tappable()),
      when: () => below() && Boolean(tappable()),
    });
    coach.offer({
      key: HINTS.off,
      rank,
      text: "New: something of his comes off. Double-tap it",
      point: () => centerOf(takeable()),
      when: () => !below() && Boolean(takeable()),
    });
  }
  offerHints();

  if (startOff) {
    // In listed order, so an article another waits on is already off.
    for (const name of articles.keys()) remove(name, { silent: true });
  }

  return {
    /** Each article's name, state and whether a double-tap would take it off now. */
    list() {
      return [...articles.values()].map((a) => ({
        name: a.name,
        off: a.off,
        present: present(a),
        covers: covered(a).join(", "),
        removable: removable(a, scene.time),
        requires: a.config.requires ?? null,
      }));
    },
    remove: (name) => remove(name),
    reset,
    offerHints,
    /** Plays article `name`'s touch (Pat) reaction, as a tap on it would. */
    pat(name) {
      const a = articles.get(name);
      if (!a) return;
      const info = hangout.spotInfo(name);
      hangout.react(info.reaction, scene.time, name, info.line ? { line: info.line } : undefined);
    },
    /** Plays article `name`'s removal reaction without taking it off. */
    offReaction(name) {
      if (articles.has(name)) hangout.react(`${name}Off`, scene.time);
    },
    DOUBLE_TAP,
  };
}
