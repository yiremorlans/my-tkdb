// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/jo.js for
// /meet; a tier left out still draws the shared pool. See constants/meet/index.js.
// Written once in the uniform voice with {he}/{him}/{his} tokens;
// withPronounVariants expands each tier into { uniform, casual }.
import { withPronounVariants } from "../dialogue/_shared.js";

export default {
  new: withPronounVariants([
    {
      line: "Anything troubling you? If you run into any problems, just come talk to me.",
      responses: {
        kind: ["Say you'll take {him} up on it", "Say you'd listen too, anytime"],
        playful: [
          "Ask if {he} takes complaints",
          "Ask if that goes for everyone",
        ],
        bold: ["Say you'll come by anyway", "Ask what counts as a problem"],
        neutral: ["Say nothing's wrong yet", "Ask who {he} is"],
      },
    },
    {
      line: "Need something? Take your time. Everyone here moves at their own pace.",
      responses: {
        kind: ["Say you'll keep it quick", "Ask if {he} ever slows down"],
        playful: ["Ask what {his} pace is", "Ask if strolling counts"],
        bold: ["Say you'll match {his} pace", "Say you know what you need"],
        neutral: ["Take a moment to think", "Say it's just a question"],
      },
    },
    {
      line: "Give me a second to put this schedule down, and then you've got my full attention. What's going on?",
      responses: {
        kind: ["Say {he} can finish first", "Ask how full the schedule is"],
        playful: [
          "Say nothing's on fire, promise",
          "Say it's good news for once",
        ],
        bold: ["Get right to it", "Ask for all of it, then"],
        neutral: ["Wait for {him} to finish", "Ask if it's a bad time"],
      },
    },
    {
      line: "From the moment the curtain rises, our show begins. That's why we have to make sure we're prepared every single day.",
      responses: {
        kind: ["Offer to help {him} prepare", "Ask how {he} finds the time"],
        playful: ["Ask for a front-row seat", "Ask if you need a ticket"],
        bold: ["Say you'll come see the show", "Ask to see a rehearsal"],
        neutral: ["Say you'll keep that in mind", "Say it sounds like a lot"],
      },
    },
    {
      line: "The kids at this academy are all so unique. You can't handle them the usual way. You're one of the new ones, aren't you?",
      responses: {
        kind: [
          "Ask how {he} keeps up with them",
          "Say they're lucky to have {him}",
        ],
        playful: ["Ask how you'd be handled", "Ask if you count as unique"],
        bold: ["Say you're one of them now", "Ask what the unusual way is"],
        neutral: ["Nod and say you're new", "Give {him} your name"],
      },
    },
  ]),
};
