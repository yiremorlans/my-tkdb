// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/elias.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Another errand for Jo. Something new every day. It keeps me out of trouble, mostly.",
      responses: {
        kind: ["Keep him company on this one", "Say he's earned a break"],
        playful: ["Bet he's taking the long way", "Ask how many he's done"],
        bold: ["Ask where he's headed next", "Say you'll run one with him"],
        neutral: ["File it away", "Let him get back to it"],
      },
    },
    {
      line: "Sorry… I'm a little short on time. Would you mind if I went on ahead?",
      responses: {
        kind: ["Say he can go on ahead", "Say you'll catch him later"],
        playful: ["Ask if he's ever on time", "Ask if he's up to something"],
        bold: ["Ask to walk partway with him", "Ask what he's late for"],
        neutral: ["Say you don't mind", "Step aside for him"],
      },
    },
    {
      line: "I just run errands. If there's anything I can help with, anytime.",
      responses: {
        kind: ["Say you don't need a thing", "Ask if he ever gets a break"],
        playful: ["Ask what 'anything' covers", "Ask if he takes requests"],
        bold: ["Say you'll find him later", "Ask for his name instead"],
        neutral: ["Say you're fine, thanks", "Nod and move along"],
      },
    },
    {
      line: "Oh, walking alone…? This academy has far too many mysteries. Please be careful.",
      responses: {
        kind: ["Say you'll be careful", "Say you'll heed the warning"],
        playful: ["Say you came looking for one", "Ask if he's one of them"],
        bold: [
          "Say you can handle yourself",
          "Say mysteries don't scare you",
        ],
        neutral: ["Say you know your way", "Nod and keep walking"],
      },
    },
    {
      line: "Shion and Mio are getting along great again today. Peaceful as always, thank goodness.",
      responses: {
        kind: ["Ask if he keeps an eye on them", "Say he's earned a peaceful day"],
        playful: ["Bet he's jinxed it now", "Ask how long the streak is"],
        bold: ["Say you'll believe it", "Say you'll check on them"],
        neutral: ["Ask who Shion and Mio are", "Nod along"],
      },
    },
  ],
};
