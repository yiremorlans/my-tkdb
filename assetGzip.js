// Gzipped static files for the Hangout Activity's versioned assets
// (app.js, /assets/v/<build>/...): a Live2D model is mostly JSON and a
// .moc3, which shrink 60-90% gzipped, while its PNGs are already
// compressed and pass through to express.static untouched.
//
// Each file is gzipped once and kept in memory (keyed by its mtime and
// size, so an edited file is re-gzipped), so a burst of players opening
// the same character costs one gzip, not one per player. The cache is
// capped and drops the least recently served file first.

import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

const gzip = promisify(zlib.gzip);

// Extensions worth gzipping, with the Content-Type express.static would send.
const COMPRESSIBLE = {
  '.json': 'application/json; charset=UTF-8',
  '.moc3': 'application/octet-stream',
  '.js': 'text/javascript; charset=UTF-8',
};

const MAX_CACHE_BYTES = 64 * 1024 * 1024;

/**
 * Middleware serving `root`'s compressible files gzipped to clients that
 * accept it, with `cacheControl`; anything else falls through to next().
 */
export function gzipStatic(root, { cacheControl, maxCacheBytes = MAX_CACHE_BYTES } = {}) {
  const base = path.resolve(root);
  // file -> { key, body: Promise<Buffer>, size }; Map order is recency.
  const cache = new Map();
  let cached = 0;

  function remember(file, entry) {
    cache.set(file, entry);
    entry.body.then(
      (buf) => {
        if (cache.get(file) !== entry) return;
        entry.size = buf.length;
        cached += buf.length;
        for (const [f, e] of cache) {
          if (cached <= maxCacheBytes) break;
          if (e === entry) continue;
          cache.delete(f);
          cached -= e.size ?? 0;
        }
      },
      () => cache.get(file) === entry && cache.delete(file),
    );
  }

  function forget(file) {
    const old = cache.get(file);
    if (!old) return;
    cache.delete(file);
    cached -= old.size ?? 0;
  }

  return async function gzipAssets(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const type = COMPRESSIBLE[path.extname(req.path).toLowerCase()];
    if (!type || !/\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) return next();
    let file;
    try {
      file = path.join(base, decodeURIComponent(req.path));
    } catch {
      return next();
    }
    if (!file.startsWith(base + path.sep)) return next();
    let stat;
    try {
      stat = await fs.promises.stat(file);
    } catch {
      return next();
    }
    if (!stat.isFile()) return next();

    const key = `${stat.mtimeMs}:${stat.size}`;
    let entry = cache.get(file);
    if (entry?.key === key) {
      cache.delete(file); // re-insert: most recently served
      cache.set(file, entry);
    } else {
      forget(file);
      entry = { key, body: fs.promises.readFile(file).then((buf) => gzip(buf)) };
      remember(file, entry);
    }
    let body;
    try {
      body = await entry.body;
    } catch (err) {
      return next(err);
    }
    res.set({
      'Content-Type': type,
      'Content-Encoding': 'gzip',
      'Content-Length': String(body.length),
      Vary: 'Accept-Encoding',
      ...(cacheControl && { 'Cache-Control': cacheControl }),
    });
    if (req.method === 'HEAD') return res.end();
    res.end(body);
  };
}
