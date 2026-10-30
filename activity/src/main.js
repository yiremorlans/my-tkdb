// Hangout Activity entry (index.html; docs/hangout-activity.md §4). The
// shared scene (hangout/scene.js) with only the player-facing chrome: the
// VN box and the annoyance meter. No debug drawer,
// HUD or editor; those are the dev preview's (preview/preview.js).
//
// Inside Discord the scene waits for sign-in (discord.js): until release
// the token route only lets the owner in, so anyone else (say, joining the
// owner's session from the voice channel) gets a short line and no scene.
// The rig downloads during sign-in all the same; its files are public under
// /assets anyway, so that gives nothing away.
//
// ?character=<id> picks the rig and ?tier=<tier> the reaction tier, for
// checking the built page in a plain browser. Inside Discord neither can be
// passed, so it's the default character at "new" until milestone 3 reads
// the real relationship level.
//
// Version: v1 is the sprite rig; v2 the Live2D proof (hangout-v2/), picked
// by `/encdev hangout version:v2` and read back after sign-in
// (discord.js launchVersion), or ?version=v2 in a plain browser. v2's code
// and Cubism Core load only for a v2 launch.

import { discordPlatform, inDiscord, launchVersion, startDiscord } from "./discord.js";
import { loadLines } from "./hangout/lines.js";
import { startScene } from "./hangout/scene.js";
import { MOBILE_FPS } from "./hangout/stage.js";
import { loadRig } from "./rig/loader.js";

// Cubism Core defines a global (Live2DCubismCore), so it's a classic script,
// served from /assets like the other repo assets: never a third-party CDN.
const CUBISM_CORE = "/assets/live2d/vendor/live2dcubismcore.min.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = Object.assign(document.createElement("script"), { src });
    script.onload = resolve;
    script.onerror = () => reject(new Error(`failed to load ${src}`));
    document.head.append(script);
  });
}

/** Starts the v2 (Live2D) scene: Cubism Core first, then the v2 code. */
async function startSceneV2(stage, options) {
  await loadScript(CUBISM_CORE);
  const { startScene: start } = await import("./hangout-v2/scene.js");
  return start(stage, { ...options, base: `/assets/live2d/${character}` });
}

// The only rigged character in v1 (docs/hangout-activity.md §1).
const DEFAULT_CHARACTER = "alan";

const params = new URLSearchParams(location.search);
const character = /^[a-z0-9_-]+$/.test(params.get("character") ?? "") ? params.get("character") : DEFAULT_CHARACTER;
const $ = (sel) => document.querySelector(sel);

// Discord reports its platform; in a plain browser a coarse pointer stands
// in for "phone".
const isMobile = discordPlatform() === "mobile" || matchMedia("(pointer: coarse)").matches;

async function main() {
  const base = `/assets/rig/${character}`;
  let version = params.get("version") === "v2" ? "v2" : "v1";
  // Inside Discord the version is only known after sign-in, so v1's rig
  // starts downloading regardless; a v2 launch just doesn't use it.
  const rigLoad = version === "v1" || inDiscord() ? loadRig(base) : null;
  rigLoad?.catch(() => {}); // startScene awaits it and main's catch reports it

  if (inDiscord()) {
    try {
      const discord = await startDiscord();
      console.log(`[discord] signed in as ${discord.user.id}`);
      version = await launchVersion(discord.sessionToken);
    } catch (err) {
      // SDK rejections are plain `{ code, message }` objects, not Errors.
      const reason = err?.message ?? JSON.stringify(err);
      console.error(`[discord] sign-in failed: ${reason}`);
      // The reason is shown while the hangout is owner-only, so a failed
      // sign-in can be diagnosed without devtools. Drop it at release.
      $("#vn-text").textContent =
        err?.status === 403 ? "The hangout isn't open yet." : `Couldn't sign in. Try reopening it? (${reason})`;
      return;
    }
  }

  $("#vn-name").textContent = character[0].toUpperCase() + character.slice(1);
  const options = { tier: params.get("tier"), lines: await loadLines(character), maxFPS: isMobile ? MOBILE_FPS : 0 };
  console.log(`[hangout] ${version}`);
  const scene =
    version === "v2"
      ? await startSceneV2($("#stage"), options)
      : await startScene($("#stage"), { ...options, base, loaded: rigLoad });
  const { hangout } = scene;

  // The annoyance meter, so the player sees spam-tapping build toward upset.
  const meterFill = $("#meter-fill");
  scene.frame = (t, dt) => {
    hangout.frame(t, dt);
    meterFill.style.width = `${Math.min(100, (hangout.meter.level(t) / hangout.meter.config.threshold) * 100)}%`;
  };

  // Mute, only for a character with sounds; remembered across sessions.
  const { sounds } = scene;
  const mute = $("#btn-mute");
  if (sounds.enabled) {
    mute.hidden = false;
    mute.ariaPressed = String(sounds.muted);
    mute.onclick = () => {
      sounds.setMuted(!sounds.muted);
      mute.ariaPressed = String(sounds.muted);
    };
  }
  scene.say(hangout.line("greeting") ?? "");
}

main().catch((err) => {
  $("#vn-text").textContent = "Couldn't load the hangout. Try reopening it?";
  console.error(`[hangout] ${err.message}`);
});
