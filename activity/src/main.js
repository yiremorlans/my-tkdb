// Hangout Activity entry (index.html; docs/hangout-activity.md §4, §11). The
// shared scene with only the player-facing chrome: the VN box, the response
// choices and the annoyance meter. No debug drawer, HUD or editor; those are
// the dev previews'.
//
// Inside Discord the scene waits for sign-in (discord.js): until release
// the token route only lets the owner in, so anyone else (say, joining the
// owner's session from the voice channel) gets a short line and no scene.
// After sign-in the launch decides what opens (discord.js launchInfo):
// - a /meet pick: that user's own encounter (§11.2), in Live2D, with the
//   drawn outfit, place and tier. Someone with no encounter of their own in
//   this instance gets a refusal line and no scene.
// - `/encdev hangout`: the free hangout, no encounter.
//
// In a plain browser it's the free hangout: ?character=<id> picks the rig,
// ?tier=<tier> the reaction tier.

import { answerEncounter, discordPlatform, inDiscord, keepSessionAlive, launchInfo, loadEncounter, startDiscord } from "./discord.js";
import { loadLines } from "./hangout/lines.js";
import { closeUpPref, MOBILE_FPS } from "./hangout/stage.js";

// Repo assets load through /assets/v/<build>/, which app.js serves as
// /assets/ but caches for good: the build stamps a new <build> on every
// deploy, so a player reopening a hangout loads nothing again until then.
const versioned = (url) => url?.replace(/^\/assets\//, `/assets/v/${__ASSET_VERSION__}/`) ?? url;

// Cubism Core defines a global (Live2DCubismCore), so it's a classic script,
// served from /assets like the other repo assets: never a third-party CDN.
const CUBISM_CORE = versioned("/assets/live2d/vendor/live2dcubismcore.min.js");

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = Object.assign(document.createElement("script"), { src });
    script.onload = resolve;
    script.onerror = () => reject(new Error(`failed to load ${src}`));
    document.head.append(script);
  });
}

/** Starts the Live2D scene: Cubism Core first, then the scene code. */
async function startScene(stage, character, options) {
  await loadScript(CUBISM_CORE);
  const scene = await import("./hangout-v2/scene.js");
  return scene.startScene(stage, { ...options, base: versioned(`/assets/live2d/${character}`) });
}

// The free hangout's character when none is given.
const DEFAULT_CHARACTER = "alan";
const NO_ENCOUNTER = "Nobody's waiting for you here. Use /meet to find someone.";

const params = new URLSearchParams(location.search);
const $ = (sel) => document.querySelector(sel);

// Discord reports its platform; in a plain browser a coarse pointer stands
// in for "phone".
const isMobile = discordPlatform() === "mobile" || matchMedia("(pointer: coarse)").matches;

const capitalize = (id) => id[0].toUpperCase() + id.slice(1);

// The annoyance meter, so the player sees spam-tapping build toward upset,
// and mute, only for a character with sounds; remembered across sessions.
function wireChrome(scene) {
  const { hangout, sounds } = scene;
  const meterFill = $("#meter-fill");
  scene.frame = (t, dt) => {
    hangout.frame(t, dt);
    meterFill.style.width = `${hangout.locked ? 100 : Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
  };
  const mute = $("#btn-mute");
  if (sounds.enabled) {
    mute.hidden = false;
    mute.ariaPressed = String(sounds.muted);
    mute.onclick = () => {
      sounds.setMuted(!sounds.muted);
      mute.ariaPressed = String(sounds.muted);
    };
  }
  // Desktop: the full framing (hands in reach) is the default; this swaps
  // in the close-up bust and remembers it (stage.js closeUpPref). Phones
  // never get it: a portrait screen always shows the full framing.
  if (!isMobile) {
    const closeUp = $("#btn-close-up");
    closeUp.hidden = false;
    const apply = (on) => {
      scene.setCloseUp(on);
      closeUp.ariaPressed = String(on);
    };
    apply(closeUpPref.get());
    closeUp.onclick = () => {
      const on = closeUp.ariaPressed !== "true";
      closeUpPref.set(on);
      apply(on);
    };
  }
}

/** A /meet encounter (§11.2): the scene as drawn, then the flow until answered. */
async function playEncounter(session, encounter) {
  $("#vn-name").textContent = encounter.name;
  // Independent fetches, so they go out together.
  const [lines, { meetFlow }, { attachWarmth }, { attachHolds }] = await Promise.all([
    loadLines(encounter.character, { daytime: encounter.daytime }),
    import("./hangout-v2/meet.js"),
    import("./hangout-v2/warmth.js"),
    import("./hangout-v2/holds.js"),
  ]);
  const scene = await startScene($("#stage"), encounter.character, {
    tier: encounter.tier,
    outfit: encounter.outfit,
    place: versioned(encounter.background),
    lines,
    maxFPS: isMobile ? MOBILE_FPS : 0,
  });
  wireChrome(scene);
  // Touches and the answer flush him a little more from spark up (§12.7).
  const warmth = attachWarmth(scene, "hangout");
  // Press and hold his chest, lips or a hand, from spark (holds.js).
  attachHolds(scene, { warmth: () => warmth });
  const flow = meetFlow(scene, { box: $(".vn-box"), choices: $("#choices"), next: $("#btn-next") });
  // Renewed only while the answer is pending: once it's recorded nothing
  // else calls the server, so the Activity can stay open as long as it likes.
  const stopRenewing = keepSessionAlive(session);
  await flow.play(encounter, (type) => answerEncounter(session, encounter.id, type));
  stopRenewing();
}

/** The free hangout: no encounter, the tier's greeting. */
async function playFreeHangout(character) {
  $("#vn-name").textContent = capitalize(character);
  const options = { tier: params.get("tier"), lines: await loadLines(character, timeParam()), maxFPS: isMobile ? MOBILE_FPS : 0 };
  const scene = await startScene($("#stage"), character, options);
  wireChrome(scene);
  const [{ attachWarmth }, { attachHolds }] = await Promise.all([import("./hangout-v2/warmth.js"), import("./hangout-v2/holds.js")]);
  const warmth = attachWarmth(scene, "hangout");
  attachHolds(scene, { warmth: () => warmth });
  scene.say(scene.hangout.line("greeting") ?? "");
}

/** `?time=day|evening` overrides the hour for touch lines that swap by day. */
function timeParam() {
  const time = params.get("time");
  return time === "day" || time === "evening" ? { daytime: time === "day" } : undefined;
}

async function main() {
  const character = /^[a-z0-9_-]+$/.test(params.get("character") ?? "") ? params.get("character") : DEFAULT_CHARACTER;
  if (!inDiscord()) return playFreeHangout(character);

  let session;
  let launch;
  let encounter = null;
  try {
    const discord = await startDiscord();
    console.log(`[discord] signed in as ${discord.user.id}`);
    session = discord.session;
    launch = await launchInfo(session);
    if (!launch.dev) encounter = await loadEncounter(session);
  } catch (err) {
    // SDK rejections are plain `{ code, message }` objects, not Errors.
    const reason = err?.message ?? JSON.stringify(err);
    console.error(`[discord] sign-in failed: ${reason}`);
    $("#vn-text").textContent =
      err?.status === 403 ? "The hangout isn't open yet." : "Couldn't sign in. Try reopening it?";
    return;
  }

  if (launch.dev) return playFreeHangout(DEFAULT_CHARACTER);
  if (!encounter) {
    // Someone else's instance, or nothing open: a line, no character, no
    // touch spots (§11.1).
    $(".vn-box").classList.add("narration");
    $("#vn-text").textContent = NO_ENCOUNTER;
    return;
  }
  return playEncounter(session, encounter);
}

main().catch((err) => {
  $("#vn-text").textContent = "Couldn't load the hangout. Try reopening it?";
  console.error(`[hangout] ${err.message}`);
});
