// Hangout Activity entry (index.html; docs/hangout-activity.md §4). The
// shared scene (hangout/scene.js) with only the player-facing chrome: the
// VN box and the Spend time button. No debug drawer, HUD or editor; those
// are the dev preview's (preview/preview.js).
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

import { discordPlatform, inDiscord, startDiscord } from "./discord.js";
import { MOBILE_FPS, startScene } from "./hangout/scene.js";
import { loadRig } from "./rig/loader.js";

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
  const rigLoad = loadRig(base);
  rigLoad.catch(() => {}); // startScene awaits it and main's catch reports it

  if (inDiscord()) {
    try {
      const discord = await startDiscord();
      console.log(`[discord] signed in as ${discord.user.id}`);
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
  const scene = await startScene($("#stage"), {
    base,
    loaded: rigLoad,
    tier: params.get("tier"),
    maxFPS: isMobile ? MOBILE_FPS : 0,
  });
  const { hangout } = scene;

  // Spend time is the cosmetic path until milestone 3 adds the cooldown and
  // the affinity write (hangout.js spendTime).
  $("#btn-spend").onclick = () => hangout.spendTime(scene.time);

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
