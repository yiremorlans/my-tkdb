// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/alan.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/alan.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "Gloves already on, he looks you over once and lifts a hand to stop you.",
      approach: "Stay out of his way",
      greeting: '"Get back. It\'s dangerous."',
      responses: {
        kind: ["Say you'll be careful", "Trust his judgment"],
        playful: ["Ask how far is far enough", "Call him overprotective"],
        bold: ["Hold his gaze, then step back", "Say you're not going far"],
        neutral: ["Step back without a word", "Give him the space"],
      },
    },
    {
      line: "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
      approach: "Step over the toolbox",
      greeting: '"Watch your step."',
      responses: {
        kind: ["Offer to clear a path", "Say you'll watch your step"],
        playful: ["Promise to look both ways", "Ask if you passed the test"],
        bold: ["Ask for real work to do", "Say you're here to help"],
        neutral: ["Let him finish", "Step where it's clear"],
      },
    },
    {
      line: "Nobody else stands this close to him. You haven't learned why yet.",
      approach: "Stay close anyway",
      greeting: '"...Don\'t get involved with me."',
      responses: {
        kind: ["Say you'd like to know him", "Ask if you can stick around"],
        playful: ["Ask if this is too close", "Ask if standing here counts"],
        bold: ["Say you're not like the others", "Say you'll take that chance"],
        neutral: ["Don't move, don't answer", "Step back half a pace"],
      },
    },
    {
      line: "He's holding a campus map the wrong way up and won't admit he's lost.",
      approach: "Flip his map around",
      greeting: '"...Oh."',
      responses: {
        kind: ["Point him the right way", "Offer to walk with him"],
        playful: ["Ask if this happens often", "Ask how long he's been lost"],
        bold: ["Ask straight where he's headed", "Say you'll lead from here"],
        neutral: ["Let the moment pass", "Say nothing, just point"],
      },
    },
    {
      line: "Two students see him, go quiet, and walk the long way around. He doesn't seem to notice.",
      approach: "Walk right up to him",
      greeting: '"...What?"',
      responses: {
        kind: ["Ask if he's doing okay", "Say you came to say hello"],
        playful: ["Pretend you were lost", "Ask if you missed the memo"],
        bold: ["Hold his gaze and say hi", "Say you wanted to meet him"],
        neutral: ["Say never mind", "Keep walking past him"],
      },
    },
  ],
};
