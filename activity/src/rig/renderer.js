// Hangout rig: draws a loaded rig with PixiJS (docs/hangout-activity.md §3).
// Owns the sprites, mood and hand-pose state. Motion (motion.js) supplies the
// pose each frame; placement math is skeleton.js, shared with the Node tools.
//
// Coordinates: `view` is in the rig's reference space (rig.reference px).
// The caller scales/positions `view` to fit the screen.

import { Container, Matrix, MeshPlane, Sprite } from "pixi.js";

import { isVisible, moodParts, overlayMatrix, resolveMood } from "./expressions.js";
import { apply, bendRows, invert, solve, spriteMatrix, withOutfit } from "./skeleton.js";

// Rows in a bend mesh. More rows give a rounder elbow at a tiny cost.
const BEND_ROWS = 16;

export class RigRenderer {
  /**
   * `rig` is rig.json as loaded (with or without `outfits`); `outfit`
   * picks which one to draw, else its defaultOutfit. `this.rig` is the
   * flattened outfit (skeleton.js withOutfit).
   */
  constructor({ rig, textures, outfit }) {
    this.source = rig;
    this.textures = textures;
    this.view = new Container();
    this.view.sortableChildren = true;
    this.nodes = new Map(); // part id → Sprite | MeshPlane
    this.overlayNodes = new Map(); // file → Sprite
    this.setOutfit(outfit ?? rig.defaultOutfit);
    this.setMood("default");
  }

  /**
   * Draws another outfit: rebuilds the part nodes and resets the hands to
   * that outfit's defaults. Mood and overlays carry over (they ride on the
   * shared head).
   */
  setOutfit(name) {
    const rig = withOutfit(this.source, name);
    for (const node of this.nodes.values()) node.destroy();
    this.nodes.clear();
    this.rig = rig;
    this.outfit = rig.outfit ?? null;
    this.byId = new Map(rig.parts.map((p) => [p.id, p]));
    this.handPose = {};
    for (const [side, hand] of Object.entries(rig.hands ?? {})) this.handPose[side] = hand.default;

    for (const part of rig.parts) {
      if (!part.image) continue;
      const texture = this.textures.get(part.image);
      const node = part.mesh?.bend
        ? new MeshPlane({ texture, verticesX: 2, verticesY: BEND_ROWS })
        : new Sprite(texture);
      node.zIndex = part.z ?? 0;
      node.label = part.id;
      this.view.addChild(node);
      this.nodes.set(part.id, node);
    }

    this.blinkMood = rig.expressions?.moods?.blink ? resolveMood(rig, "blink") : null;
    if (this.moodName) this.setMood(this.moodName);
    this.solved = null;
  }

  setMood(name) {
    this.moodName = name;
    this.mood = resolveMood(this.rig, name);
  }

  /** Swaps the hand on `side` to a pose from rig.json `hands`. */
  setHandPose(side, pose) {
    const hand = this.rig.hands?.[side];
    if (!hand?.poses?.[pose]) throw new Error(`unknown hand pose ${side}.${pose}`);
    this.handPose[side] = pose;
  }

  /** The image entry (part, or hand pose) a part currently draws. */
  imageEntry(part) {
    for (const [side, hand] of Object.entries(this.rig.hands ?? {})) {
      if (hand.part === part.id) return hand.poses[this.handPose[side]];
    }
    return part;
  }

  /** Lays out every node for this frame's pose. */
  update(pose = {}, { blink = false } = {}) {
    const sizes = new Map();
    for (const part of this.rig.parts) {
      if (!part.image) continue;
      const tex = this.textures.get(this.imageEntry(part).image);
      sizes.set(part.id, [tex.width, tex.height]);
    }
    const solved = solve(this.rig, pose, sizes);
    this.solved = solved;
    this.sizes = sizes;
    const visible = moodParts(this.mood, blink ? this.blinkMood : null);

    for (const [id, node] of this.nodes) {
      const part = this.byId.get(id);
      const entry = this.imageEntry(part);
      node.visible = isVisible(part, visible);
      if (!node.visible) continue;
      const tex = this.textures.get(entry.image);
      if (node.texture !== tex) node.texture = tex;
      const m = spriteMatrix(this.rig, part, solved.get(id).bone, sizes.get(id), entry);
      if (part.mesh?.bend) this.bend(node, part, m, solved, sizes.get(id), entry);
      else node.setFromMatrix(new Matrix(...m));
    }

    this.updateOverlays(solved, blink && this.blinkMood && !this.mood.noBlink);
  }

  // Lays a bend mesh out in reference space, one matrix per row
  // (skeleton.js bendRows).
  bend(node, part, m, solved, size, entry) {
    const rowMatrix = bendRows(this.rig, part, solved, size, entry);
    const [w, h] = size;
    const pos = node.geometry.positions;
    for (let row = 0; row < BEND_ROWS; row++) {
      const v = row / (BEND_ROWS - 1);
      const rm = rowMatrix(v);
      for (let col = 0; col < 2; col++) {
        const [x, y] = apply(rm, [col * w, v * h]);
        const i = (row * 2 + col) * 2;
        pos[i] = x;
        pos[i + 1] = y;
      }
    }
    node.geometry.getBuffer("aPosition").update();
    node.setFromMatrix(new Matrix());
  }

  // A blink that is itself an overlay (eyes shut, from the expression
  // portraits) draws on top of the mood's overlays.
  updateOverlays(solved, blinking = false) {
    const ex = this.rig.expressions;
    const overlays = blinking ? [...this.mood.overlays, ...this.blinkMood.overlays] : this.mood.overlays;
    const wanted = new Set(overlays.map((o) => o.file));
    for (const [file, node] of this.overlayNodes) node.visible = wanted.has(file);
    if (!wanted.size) return;
    const head = solved.get(ex.head).bone;
    overlays.forEach((o, i) => {
      let node = this.overlayNodes.get(o.file);
      if (!node) {
        node = new Sprite(this.textures.get(o.file));
        this.view.addChild(node);
        this.overlayNodes.set(o.file, node);
      }
      node.zIndex = (ex.overlayZ ?? 1000) + 0.01 * (i + 1);
      node.visible = true;
      node.setFromMatrix(new Matrix(...overlayMatrix(this.rig, head, o)));
    });
  }

  /**
   * Where a reference-space point falls in a part's image, normalized to
   * [0, 1], or null if the part isn't drawn. Used for hotspot rects.
   */
  partUV(id, point) {
    const part = this.byId.get(id);
    const node = this.nodes.get(id);
    if (!this.solved || !node?.visible) return null;
    const size = this.sizes.get(id);
    const m = spriteMatrix(this.rig, part, this.solved.get(id).bone, size, this.imageEntry(part));
    const [x, y] = apply(invert(m), point);
    return [x / size[0], y / size[1]];
  }

  /** A part's current bone matrix (reference space), for the editor. */
  boneOf(id) {
    return this.solved?.get(id)?.bone ?? null;
  }
}
