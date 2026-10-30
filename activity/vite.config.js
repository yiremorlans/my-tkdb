// Vite config for the Hangout Activity (docs/hangout-activity.md §7).
//
// The dev server serves the repo's assets/ at /assets, the same path Express
// serves in production (app.js), so rig.json and its images load from one
// URL in both.
//
// `npm run build:activity` builds index.html only (never preview.html) into
// activity/dist, which app.js serves at /. Inside Discord every request goes
// through its proxy, so nothing may come from a third-party CDN (PixiJS and
// the SDK are bundled) and every path has to land on a URL mapping:
// - built files go under static/, not Vite's default assets/, which would
//   collide with the repo's /assets mapping;
// - base "./" makes them page-relative, so they resolve under the root
//   mapping (/) wherever the page is served from.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

import { writeHandFits } from "./tools/lib/hand-fits.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const assetsDir = path.join(repoRoot, "assets");

const TYPES = { ".png": "image/png", ".json": "application/json", ".ttf": "font/ttf", ".wav": "audio/wav", ".ogg": "audio/ogg" };

function serveRepoAssets() {
  return {
    name: "serve-repo-assets",
    configureServer(server) {
      server.middlewares.use("/assets", (req, res, next) => {
        const file = path.join(assetsDir, decodeURIComponent(req.url.split("?")[0]));
        if (!file.startsWith(assetsDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
          return next();
        }
        res.setHeader("Content-Type", TYPES[path.extname(file)] ?? "application/octet-stream");
        res.setHeader("Cache-Control", "no-store");
        fs.createReadStream(file).pipe(res);
      });
    },
  };
}

// Dev-only: the preview's part editor saves rig.json through this, plus
// the hand poses it nudged into each outfit's hand-fits.json (so
// fit-outfit.js keeps them; align-hands.js --write refits them). Only
// `vite serve` runs configureServer, so it never exists in a build.
function saveRig() {
  return {
    name: "save-rig",
    configureServer(server) {
      server.middlewares.use("/__rig/save", (req, res) => {
        const character = new URL(req.url, "http://x").searchParams.get("character") ?? "";
        if (req.method !== "POST" || !/^[a-z0-9_-]+$/.test(character)) {
          res.statusCode = 400;
          return res.end("bad request");
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            // handFits: { <outfit>: { <side>: { <image>: pose entry } } }
            const { rig, handFits = {} } = JSON.parse(body);
            const dir = path.join(assetsDir, "rig", character);
            fs.writeFileSync(path.join(dir, "rig.json"), JSON.stringify(rig, null, 2) + "\n");
            for (const [outfit, fits] of Object.entries(handFits)) {
              writeHandFits(path.join(dir, rig.outfits?.[outfit]?.dir ?? "."), fits);
            }
            res.end("saved");
          } catch (err) {
            res.statusCode = 400;
            res.end(err.message);
          }
        });
      });
    },
  };
}

// Dev-only: the preview's /meet demo (docs/hangout-activity.md §11.2) asks
// the bot's own content code for an encounter, so it shows what /meet would:
// - /__meet/beat?character=&tier=&variant= draws the place, the beat and its
//   four labels, as buildMeetSpawnMessage does (no recent-beat skip, no DB);
// - /__meet/answer?character=&tier=&type=&mood= scores a pick and returns the
//   reaction line and the gain line, as buildResponseResultMessage does,
//   for the first level of that tier and with no boost or errand.
// Loaded through Vite so edits to constants/ show up without a restart.
function meetPreview() {
  return {
    name: "meet-preview",
    configureServer(server) {
      const load = (file) => server.ssrLoadModule(path.join(repoRoot, "constants", file));
      const send = (res, status, body) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };
      server.middlewares.use("/__meet", async (req, res) => {
        try {
          const url = new URL(req.url, "http://x");
          const q = Object.fromEntries(url.searchParams);
          const [chars, bgs, reactions, game, tiers] = await Promise.all(
            ["characters.js", "backgrounds.js", "reactions.js", "game.js", "tiers.js"].map(load),
          );
          const character = chars.getCharacterById(q.character);
          if (!character || !tiers.DIALOGUE_TIERS.includes(q.tier)) return send(res, 400, { error: "bad character or tier" });

          if (url.pathname === "/beat") {
            const now = new Date();
            // A housed character is always on their own turf; a houseless one
            // (Benkei) splits like /roam (buildMeetSpawnMessage).
            const turf = character.house || Math.random() < bgs.TURF_PROBABILITY ? bgs.getRandomBackgroundForCharacter(character, now) : null;
            const spot = turf ?? bgs.getRandomGeneralBackground(now);
            const ctx = { now, locationKey: spot?.locationKey ?? null, backgroundFile: spot?.file ?? null, event: null };
            const { line, responses, mood } = chars.getRandomDialogueEntry(character, q.tier, q.variant || "uniform", ctx);
            const labels = chars.generateCharacterResponses(character, responses);
            const place = spot ? ` at **${bgs.getLocationDisplayName(spot)}**.` : ".";
            return send(res, 200, {
              intro: `${chars.getFullName(character)} agrees to meet you${place}`,
              notice: chars.moodNotice(character, mood),
              background: spot ? `assets/bg/${bgs.backgroundPath(spot.file)}` : null,
              line,
              mood: !!mood,
              responses: Object.fromEntries(Object.entries(labels).map(([type, { label }]) => [type, label])),
            });
          }
          if (url.pathname === "/answer") {
            const gain = chars.getAffinityForResponse(character, q.type, { mood: q.mood === "1" });
            const level = game.RELATIONSHIP_LEVELS.find((l) => tiers.getDialogueTier(l.name) === q.tier);
            return send(res, 200, {
              gain,
              reaction: reactions.getReactionLine(character, q.tier, q.type, gain),
              delta: `${gain > 0 ? `+${gain}` : gain} — ${level.emoji ? `${level.emoji} ` : ""}**${level.name}**`,
            });
          }
          send(res, 404, { error: "not found" });
        } catch (err) {
          send(res, 500, { error: err.message });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // The client id the SDK starts with is the bot's APP_ID, from .env locally
  // or the build environment on Railway.
  const env = { ...loadEnv(mode, repoRoot, ""), ...process.env };
  return {
    root: here,
    base: "./",
    publicDir: false,
    plugins: [serveRepoAssets(), saveRig(), meetPreview()],
    define: { __DISCORD_CLIENT_ID__: JSON.stringify(env.APP_ID ?? "") },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      assetsDir: "static",
      rollupOptions: { input: path.join(here, "index.html") },
    },
  };
});
