// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/haku.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Well, look who wandered in. You lost, or is this on purpose?",
      responses: {
        kind: ["Say you came to see him", "Ask if you can stay a bit"],
        playful: ["Say you're very lost", "Ask which answer he wants"],
        bold: ["Say he should guess", "Say it's on purpose"],
        neutral: ["Say you're just passing by", "Say you took a wrong turn"],
      },
    },
    {
      line: "It feels humid every day thanks to the rain, and Hotarubi's so old it's probably on the brink of collapsing. Haha... I guess it's always easier to complain, huh.",
      responses: {
        kind: ["Let him complain a little", "Ask what he likes about it"],
        playful: ["Ask how long it has left", "Bet it outlasts the rain"],
        bold: ["Say a little rain won't hurt", "Say it'll hold up fine"],
        neutral: ["Say old places creak", "Nod along"],
      },
    },
    {
      line: "You've adjusted to life at Darkwick pretty well, haven't you? Not that anomalies and missions are something you'd want to get used to...",
      responses: {
        kind: ["Say you're getting there", "Say you hope you never do"],
        playful: ["Claim you're a natural", "Say anomalies grow on you"],
        bold: ["Say nothing here scares you", "Say you can handle missions"],
        neutral: ["Say it's been fine", "Say the missions are a lot"],
      },
    },
    {
      line: "All these geniuses and their lectures are giving me heartburn. Wouldn't mind hearing the woes of someone long-suffering instead every once in a while.",
      responses: {
        kind: ["Tell him one of your woes", "Offer to hear his first"],
        playful: [
          "Prescribe him fewer lectures",
          "Ask if you look long-suffering",
        ],
        bold: ["Say your woes beat his", "Claim the long-suffering title"],
        neutral: ["Say you've got no woes", "Ask which genius it was"],
      },
    },
    {
      line: "Don't put too much pressure on yourself. It's okay to half-ass stuff, you know.",
      responses: {
        kind: ["Say you'll ease up a little", "Take the advice to heart"],
        playful: [
          "Ask him for half-ass lessons",
          "Ask if he's half-assing this",
        ],
        bold: ["Say you don't do halfway", "Say you can take pressure"],
        neutral: ["Say you're fine", "Shrug off the advice"],
      },
    },
  ],
};
