// /meet as the Activity, the player's side (docs/hangout-activity.md §11.2):
// the intro as narration, the beat's line and its four choices, then the
// pick's face, reaction line and gain line, and the hangout carries on.
// A touch before the answer plays its line, then the beat and its choices
// come back, so the player is never left without them while the answer is
// unrecorded.
//
// Shared by the Activity (main.js, answering through POST
// /api/activity/answer) and the v2 preview (preview.js, the dev server's
// /__meet). The server decides everything about the payout; this only shows
// it.

import { RESPONSE_TYPE_ORDER } from "../../../constants/responseTypes.js";
import { TYPE_MS } from "../hangout/stage.js";

// One glyph per type, abstract so it doesn't give the type away, and so the
// type never depends on color alone.
const RESPONSE_GLYPHS = { kind: "☼", playful: "♪", bold: "⚡︎", neutral: "♢" };
// The face for the outcome, by base gain (getAffinityForResponse).
const OUTCOME = { 2: "answerLove", 1: "answerLike", 0: "answerFlat" };
const RETRY_LINE = "Couldn't reach them. Try again?";

// The bot's lines are Discord markdown; the VN box shows plain text.
const plain = (text) =>
  text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`/g, "");

/**
 * Hooks the /meet flow into a started v2 scene (scene.js). `box` is the VN
 * box, `choices` the empty choices container, `next` the box's › button.
 *
 * Returns `{ play, stop }`. `play(encounter, answer)` plays `encounter`
 * (`{ intro, notice, line, responses }`) and resolves once an answer is
 * recorded or refused. `answer(type)` resolves to `{ gain, reaction, delta,
 * signature }`, or `{ refused }` with the line to show (cooldown, already
 * answered); it throws when the server can't be reached, and then the
 * choices stay up with a try-again line. `stop()` drops the encounter.
 */
export function meetFlow(scene, { box, choices, next }) {
  const { hangout, say, speak } = scene;
  const meet = { encounter: null, answer: null, step: null, back: null, done: null };

  const show = (text, { narration = false } = {}) => {
    box.classList.toggle("narration", narration);
    say(plain(text));
  };

  // Only touch lines come through here (Hangout's say), so only they move
  // his mouth. Before the answer, the beat comes back once the line is read.
  hangout.say = (line) => {
    box.classList.remove("narration");
    speak(line);
    if (meet.step === "intro" || meet.step === "beat") {
      choices.hidden = true;
      next.hidden = true;
      clearTimeout(meet.back);
      meet.back = setTimeout(showBeat, line.length * TYPE_MS + 2000);
    }
  };

  function showChoices() {
    choices.replaceChildren(
      ...RESPONSE_TYPE_ORDER.map((type) => {
        const b = document.createElement("button");
        b.className = `choice choice-${type}`;
        const glyph = document.createElement("span");
        glyph.className = "choice-icon";
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = RESPONSE_GLYPHS[type];
        b.append(glyph, meet.encounter.responses[type] ?? "...");
        b.onclick = () => pick(type);
        return b;
      }),
    );
    choices.hidden = false;
  }

  function showBeat() {
    clearTimeout(meet.back);
    meet.step = "beat";
    next.hidden = true;
    show(meet.encounter.line);
    showChoices();
  }

  async function pick(type) {
    if (meet.step !== "beat") return;
    meet.step = "answering";
    choices.hidden = true;
    let result;
    try {
      result = await meet.answer(type);
    } catch (err) {
      console.error(`[meet] answer failed: ${err.message}`);
      meet.step = "beat";
      show(RETRY_LINE, { narration: true });
      showChoices();
      return;
    }
    meet.step = "done";
    if (result.refused) {
      show(result.refused, { narration: true });
    } else {
      hangout.react(OUTCOME[Math.max(0, Math.min(2, result.gain))], scene.time);
      show([result.reaction, [result.delta, result.signature].filter(Boolean).join("\n")].join("\n"), { narration: true });
    }
    meet.done?.();
  }

  next.onclick = () => {
    if (meet.step === "intro") showBeat();
  };

  function stop() {
    clearTimeout(meet.back);
    choices.hidden = true;
    next.hidden = true;
    meet.step = null;
    meet.done = null;
  }

  function play(encounter, answer) {
    stop();
    Object.assign(meet, { encounter, answer, step: "intro" });
    show(encounter.notice ? `${encounter.intro}\n${encounter.notice}` : encounter.intro, { narration: true });
    next.hidden = false;
    return new Promise((resolve) => (meet.done = resolve));
  }

  return { play, stop };
}
