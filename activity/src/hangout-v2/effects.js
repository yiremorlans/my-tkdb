// Hangout effects PROTOTYPE (dev preview only, docs/hangout-activity.md §10
// "Lighting and effects"). Throwaway: nothing here ships until the user has
// seen it. Layers sit around the rig without touching it, unless the "light
// the rig" option is on:
//
//   bg (blur, grade, flicker)  →  behind-rig particles  →  rig  →
//   front particles  →  vignette  →  grain (whole stage)
//
// Everything is Pixi core: ColorMatrixFilter, BlurFilter, NoiseFilter and
// pooled sprites. No extra dependency.

import { BlurFilter, ColorMatrixFilter, Container, NoiseFilter, Sprite, Texture } from "pixi.js";

import { isEveningHour } from "../../../constants/backgrounds.js";

// --- color grades -----------------------------------------------------------
// Each grade is a per-channel gain, an offset and a desaturation amount,
// mixed with the identity matrix by `strength`.
export const GRADES = {
  none: null,
  night: { gain: [0.55, 0.62, 0.9], offset: [0.0, 0.01, 0.05], desat: 0.35 },
  dusk: { gain: [1.08, 0.86, 0.7], offset: [0.04, 0.0, 0.0], desat: 0.1 },
  candle: { gain: [1.05, 0.82, 0.58], offset: [0.03, 0.01, 0.0], desat: 0.2 },
  neon: { gain: [1.0, 0.75, 1.1], offset: [0.03, 0.0, 0.06], desat: -0.25 },
  obscuary: { gain: [0.6, 0.45, 0.85], offset: [0.03, 0.0, 0.06], desat: 0.25 },
  overcast: { gain: [0.82, 0.86, 0.92], offset: [0.0, 0.0, 0.02], desat: 0.3 },
};

function gradeMatrix(grade, strength, brightness = 1) {
  const id = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  if (!grade) {
    return id.map((v, i) => (i % 5 < 3 && Math.floor(i / 5) < 3 ? v * brightness : v));
  }
  const lum = [0.299, 0.587, 0.114];
  const m = [...id];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const base = (r === c ? 1 - grade.desat : 0) + grade.desat * lum[c];
      const graded = base * grade.gain[r];
      m[r * 5 + c] = ((r === c ? 1 : 0) * (1 - strength) + graded * strength) * brightness;
    }
    m[r * 5 + 4] = grade.offset[r] * strength;
  }
  return m;
}

// --- particle textures (drawn once on a canvas) ------------------------------
function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  return Texture.from(c);
}

const TEXTURES = {
  rain: () =>
    canvasTexture(4, 64, (g, w, h) => {
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(220,230,255,0)");
      grad.addColorStop(1, "rgba(220,230,255,0.9)");
      g.fillStyle = grad;
      g.fillRect(1, 0, 2, h);
    }),
  glow: () =>
    canvasTexture(64, 64, (g, w) => {
      const grad = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, w, w);
    }),
  petal: () =>
    canvasTexture(24, 16, (g) => {
      g.fillStyle = "rgba(255,190,215,0.95)";
      g.beginPath();
      g.ellipse(12, 8, 11, 5, 0, 0, Math.PI * 2);
      g.fill();
    }),
  sparkle: () =>
    canvasTexture(32, 32, (g) => {
      g.fillStyle = "rgba(255,255,255,1)";
      g.beginPath();
      g.moveTo(16, 0);
      g.lineTo(18, 14);
      g.lineTo(32, 16);
      g.lineTo(18, 18);
      g.lineTo(16, 32);
      g.lineTo(14, 18);
      g.lineTo(0, 16);
      g.lineTo(14, 14);
      g.closePath();
      g.fill();
    }),
  vignette: () =>
    canvasTexture(256, 256, (g, w, h) => {
      const grad = g.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.72);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,1)");
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
    }),
};

const rand = (a, b) => a + Math.random() * (b - a);

// --- particle systems ----------------------------------------------------------
// Each kind: texture, how many at density 1, spawn() and step(p, dt, w, h).
const PARTICLES = {
  rain: {
    texture: "rain",
    count: 260,
    spawn(p, w, h, anywhere) {
      const scale = rand(0.5, 1.2);
      p.scale.set(scale, scale * rand(0.8, 1.3));
      p.alpha = rand(0.25, 0.6) * scale;
      p.x = rand(-0.1 * w, 1.1 * w);
      p.y = anywhere ? rand(-h, h) : rand(-h * 0.3, -64);
      p.v = rand(900, 1400) * scale;
      p.rotation = 0.12;
    },
    step(p, dt, w, h) {
      p.y += p.v * dt;
      p.x -= p.v * dt * 0.12;
      return p.y < h + 64;
    },
  },
  snow: {
    texture: "glow",
    count: 160,
    spawn(p, w, h, anywhere) {
      const s = rand(0.06, 0.18);
      p.scale.set(s);
      p.alpha = rand(0.5, 0.95);
      p.x = rand(0, w);
      p.y = anywhere ? rand(0, h) : -20;
      p.v = rand(30, 90);
      p.phase = rand(0, 6.28);
    },
    step(p, dt, w, h, t) {
      p.y += p.v * dt;
      p.x += Math.sin(t * 0.8 + p.phase) * 20 * dt;
      return p.y < h + 20;
    },
  },
  petals: {
    texture: "petal",
    count: 45,
    spawn(p, w, h, anywhere) {
      p.scale.set(rand(0.6, 1.2));
      p.alpha = rand(0.7, 1);
      p.x = anywhere ? rand(0, w) : rand(-0.2 * w, w);
      p.y = anywhere ? rand(0, h) : -20;
      p.v = rand(40, 90);
      p.phase = rand(0, 6.28);
      p.spin = rand(-2, 2);
    },
    step(p, dt, w, h, t) {
      p.y += p.v * dt;
      p.x += (35 + Math.sin(t + p.phase) * 40) * dt;
      p.rotation += p.spin * dt;
      p.scale.y = Math.abs(Math.sin(t * 1.5 + p.phase)) * p.scale.x + 0.1;
      return p.y < h + 30 && p.x < w + 40;
    },
  },
  fireflies: {
    texture: "glow",
    count: 28,
    tint: 0xd8ff7a,
    blend: "add",
    spawn(p, w, h) {
      p.scale.set(rand(0.12, 0.25));
      p.x = rand(0, w);
      p.y = rand(h * 0.25, h * 0.95);
      p.phase = rand(0, 6.28);
      p.vx = rand(-15, 15);
      p.vy = rand(-10, 10);
      p.life = rand(6, 14);
    },
    step(p, dt, w, h, t) {
      p.vx += rand(-20, 20) * dt;
      p.vy += rand(-20, 20) * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha = 0.25 + 0.75 * Math.max(0, Math.sin(t * 1.7 + p.phase));
      p.life -= dt;
      return p.life > 0;
    },
  },
  sparkles: {
    texture: "sparkle",
    count: 40,
    blend: "add",
    spawn(p, w, h) {
      p.x = rand(0, w);
      p.y = rand(h * 0.55, h);
      p.phase = rand(0, 6.28);
      p.size = rand(0.25, 0.6);
      p.life = rand(1.5, 4);
    },
    step(p, dt, w, h, t) {
      const tw = Math.max(0, Math.sin(t * 3 + p.phase));
      p.scale.set(p.size * tw);
      p.alpha = tw;
      p.life -= dt;
      return p.life > 0;
    },
  },
  dust: {
    texture: "glow",
    count: 60,
    tint: 0xffe9c4,
    blend: "add",
    spawn(p, w, h) {
      p.scale.set(rand(0.03, 0.08));
      p.alpha = rand(0.2, 0.6);
      p.x = rand(0, w);
      p.y = rand(0, h);
      p.vx = rand(-6, 6);
      p.vy = rand(-8, 3);
      p.life = rand(8, 16);
    },
    step(p, dt, w, h) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      return p.life > 0;
    },
  },
};
export const PARTICLE_KINDS = Object.keys(PARTICLES);

class ParticleLayer {
  constructor(kind, textures) {
    this.def = PARTICLES[kind];
    this.view = new Container();
    this.texture = textures[this.def.texture] ??= TEXTURES[this.def.texture]();
    this.pool = [];
    this.density = 1;
  }
  frame(t, dt, w, h) {
    const want = Math.round(this.def.count * this.density);
    while (this.pool.length < want) {
      const p = new Sprite(this.texture);
      p.anchor.set(0.5);
      if (this.def.tint) p.tint = this.def.tint;
      if (this.def.blend) p.blendMode = this.def.blend;
      this.def.spawn(p, w, h, true);
      this.pool.push(p);
      this.view.addChild(p);
    }
    while (this.pool.length > want) this.pool.pop().destroy();
    for (const p of this.pool) {
      if (!this.def.step(p, dt, w, h, t)) this.def.spawn(p, w, h, false);
    }
  }
  destroy() {
    this.view.destroy({ children: true });
  }
}

// --- auto rules (what would ship) --------------------------------------------
export function autoEffects(bgUrl, now = new Date(), timeOverride = "auto") {
  const file = decodeURIComponent((bgUrl ?? "").split("/").pop());
  const evening = timeOverride === "auto" ? isEveningHour(now) : timeOverride === "evening";
  const alreadyNight = /_PM\.png$/i.test(file);
  const hotarubi = /hotarubi/i.test(bgUrl ?? "");
  const frostheim = /frostheim/i.test(bgUrl ?? "");
  const obscuary = /obscuary/i.test(bgUrl ?? "");
  return {
    rain: hotarubi,
    particles: frostheim ? "snow" : null,
    grade: obscuary ? "obscuary" : evening && !alreadyNight ? "night" : "none",
    gradeStrength: obscuary ? 0.5 : 0.75,
    blur: 2,
    why: [
      hotarubi && "Hotarubi: rain (canon, always)",
      frostheim && "Frostheim: snow",
      obscuary && "Obscuary: always-night grade",
      !obscuary && evening && !alreadyNight && "evening (TZ) on a day file: night grade",
      alreadyNight && "_PM file: already night, no grade",
    ].filter(Boolean),
  };
}

// --- the effects stack ----------------------------------------------------------
export function createEffects(scene) {
  const { app, renderer } = scene;
  const textures = {};
  const behind = new Container();
  const front = new Container();
  const vignette = new Sprite((textures.vignette = TEXTURES.vignette()));
  vignette.alpha = 0;
  app.stage.addChildAt(behind, app.stage.getChildIndex(renderer.view));
  app.stage.addChild(front, vignette);

  const blur = new BlurFilter({ strength: 0, quality: 3 });
  const grade = new ColorMatrixFilter();
  const rigGrade = new ColorMatrixFilter();
  const grain = new NoiseFilter({ noise: 0.06 });

  const state = {
    rain: false,
    rainDensity: 1,
    rainLayer: "both", // behind | front | both
    particles: null,
    particleDensity: 1,
    particleLayer: "behind",
    grade: "none",
    gradeStrength: 0.75,
    rigLight: false,
    rigStrength: 0.4,
    blur: 0,
    flicker: false,
    vignette: 0,
    grain: false,
  };
  const layers = {};

  function syncLayer(key, kind, on, layer, density) {
    if (!on || layers[key]?.kind !== kind) {
      layers[key]?.layers.forEach((l) => l.destroy());
      delete layers[key];
    }
    if (!on) return;
    if (!layers[key]) {
      const where = layer === "both" ? [behind, front] : [layer === "front" ? front : behind];
      layers[key] = {
        kind,
        layer,
        layers: where.map((parent) => {
          const l = new ParticleLayer(kind, textures);
          parent.addChild(l.view);
          return l;
        }),
      };
    }
    if (layers[key].layer !== layer) {
      layers[key].layers.forEach((l) => l.destroy());
      delete layers[key];
      return syncLayer(key, kind, on, layer, density);
    }
    // "both": most of the particles behind the rig, a few in front of it.
    layers[key].layers.forEach((l, i, all) => (l.density = density * (all.length === 2 ? (i === 0 ? 0.65 : 0.35) : 1)));
  }

  function apply() {
    syncLayer("rain", "rain", state.rain, state.rainLayer, state.rainDensity);
    syncLayer("particles", state.particles, !!state.particles, state.particleLayer, state.particleDensity);
    blur.strength = state.blur;
    const bg = scene.background();
    if (bg) bg.filters = [state.blur > 0 && blur, grade].filter(Boolean);
    renderer.view.filters = state.rigLight && state.grade !== "none" ? [rigGrade] : null;
    rigGrade.matrix = gradeMatrix(GRADES[state.grade], state.rigStrength);
    vignette.alpha = state.vignette;
    app.stage.filters = state.grain ? [grain] : null;
  }

  function frame(t, dt) {
    const { width: w, height: h } = app.screen;
    vignette.width = w;
    vignette.height = h;
    for (const { layers: ls } of Object.values(layers)) ls.forEach((l) => l.frame(t, dt, w, h));
    // Flicker: neon/candle, a slow wobble plus rare quick dips.
    let b = 1;
    if (state.flicker) {
      b = 1 + 0.035 * Math.sin(t * 2.3) + 0.02 * Math.sin(t * 7.1);
      if (Math.random() < 0.006) b -= 0.15;
    }
    grade.matrix = gradeMatrix(GRADES[state.grade], state.gradeStrength, b);
    if (state.grain) grain.seed = Math.random();
  }

  return {
    state,
    set(patch) {
      Object.assign(state, patch);
      apply();
    },
    apply,
    frame,
  };
}
