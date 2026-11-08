// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/mio.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Hinge off the Heebie-Jeebie House door. Somebody slammed it. ...It was Shion.",
      responses: {
        kind: [
          "Ask if he needs another hand",
          "Offer to hold the hinge steady",
        ],
        playful: [
          "Ask if it's under warranty",
          "Ask if it'll come back haunted",
        ],
        bold: ["Say you came just for him", "Ask to try fixing it"],
        neutral: ["Watch him work", "Let him finish up"],
      },
    },
    {
      line: "Ahh… finally I can eat. This is basically my first meal. I've still got work after this, so I'll keep it light.",
      responses: {
        kind: ["Bring him something to drink", "Share your snacks with him"],
        playful: [
          "Ask if this counts as two",
          "Ask if it's lunch or breakfast",
        ],
        bold: ["Say you'll come help after", "Ask what's broken this time"],
        neutral: ["Let him eat", "Leave him to his meal"],
      },
    },
    {
      line: "Busy? Yeah, same for me. You should take a break sometimes too.",
      responses: {
        kind: ["Say you'll take his advice", "Say he could use one first"],
        playful: [
          "Ask if he takes his own advice",
          "Ask if this counts as one",
        ],
        bold: ["Say you'll take one together", "Say you'll hold him to it"],
        neutral: ["Say you'll try", "Shrug it off"],
      },
    },
    {
      line: "…Okay, one more stop, then back to hand out materials… I'll barely make it on time.",
      responses: {
        kind: ["Offer to carry the materials", "Offer to take the other stop"],
        playful: [
          "Ask if 'barely' is his record",
          "Have him build a time machine",
        ],
        bold: ["Say the other stop can wait", "Say you're coming with him"],
        neutral: ["Say you won't hold him up", "Wave him off"],
      },
    },
    {
      line: 'Oh, hey. I\'m off to pick up parts. Not "shopping," exactly… More like… restocking.',
      responses: {
        kind: ["Offer to help carry them back", "Ask what he's running low on"],
        playful: [
          "Say that's what shopping is",
          "Ask if snacks count as parts",
        ],
        bold: ["Say you'll tag along", "Ask for his parts list"],
        neutral: ["Say good luck with it", "Nod and head off"],
      },
    },
  ],
};
