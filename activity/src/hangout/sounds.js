// Hangout: short sound clips a reaction plays (docs/hangout-activity.md §4.2).
// A reaction's `sound` is a file under the rig's directory, or a list to pick
// from at random; only characters whose rig.json sets one play anything.
//
// Clips are decoded once up front through Web Audio, so a tap plays them with
// no lag (an <audio> element stalls on phones). The context starts suspended
// until the first tap, which counts as the gesture browsers want before
// audio. Hangout spaces clips out (SOUND_COOLDOWN); a new one still cuts off
// any clip running longer than that, so they never stack. Sound is local:
// it plays for the tapper, not into the call.

const MUTE_KEY = "hangout:muted";

export class Sounds {
  /** `buffers`: file → ArrayBuffer, as loadRig fetched them. */
  constructor(buffers = new Map()) {
    this.decoded = new Map();
    this.playing = null;
    this.muted = readMuted();
    const AudioCtx = globalThis.AudioContext ?? globalThis.webkitAudioContext;
    this.ctx = buffers.size && AudioCtx ? new AudioCtx() : null;
    if (!this.ctx) return;
    for (const [file, data] of buffers) {
      this.ctx.decodeAudioData(data).then(
        (buffer) => this.decoded.set(file, buffer),
        () => console.warn(`[hangout] couldn't decode ${file}`),
      );
    }
  }

  /** Whether this character has any sounds the browser can play. */
  get enabled() {
    return this.ctx != null;
  }

  play(file) {
    const buffer = this.decoded.get(file);
    if (!buffer || this.muted) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.stop();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.onended = () => {
      if (this.playing === source) this.playing = null;
    };
    source.start();
    this.playing = source;
  }

  stop() {
    this.playing?.stop();
    this.playing = null;
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted) this.stop();
    try {
      localStorage.setItem(MUTE_KEY, muted ? "1" : "");
    } catch {}
  }
}

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}
