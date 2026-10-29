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

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const assetsDir = path.join(repoRoot, "assets");

const TYPES = { ".png": "image/png", ".json": "application/json", ".ttf": "font/ttf" };

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

// Dev-only: the preview's part editor saves rig.json through this. Only
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
            const rig = JSON.parse(body);
            const file = path.join(assetsDir, "rig", character, "rig.json");
            fs.writeFileSync(file, JSON.stringify(rig, null, 2) + "\n");
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

export default defineConfig(({ mode }) => {
  // The client id the SDK starts with is the bot's APP_ID, from .env locally
  // or the build environment on Railway.
  const env = { ...loadEnv(mode, repoRoot, ""), ...process.env };
  return {
    root: here,
    base: "./",
    publicDir: false,
    plugins: [serveRepoAssets(), saveRig()],
    define: { __DISCORD_CLIENT_ID__: JSON.stringify(env.APP_ID ?? "") },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      assetsDir: "static",
      rollupOptions: { input: path.join(here, "index.html") },
    },
  };
});
