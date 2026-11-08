// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/benkei.js for
// /meet; a tier left out still draws the shared pool. See constants/meet/index.js.
export default {
  new: [
    {
      line: "That's my manager, the cat. Don't take it personally if she ignores you. She ignores me too.",
      responses: {
        kind: ["Say he's too nice to ignore", "Ask how he puts up with it"],
        playful: ["Ask if he's up for review", "Ask if she signs his checks"],
        bold: ["Ask who's really in charge", "Say you'll get her to notice"],
        neutral: ["Watch the cat instead", "Ignore the cat right back"],
      },
    },
    {
      line: "New around here? It's a strange school. It grows on you.",
      responses: {
        kind: ["Say you feel welcome already", "Say it's growing on you"],
        playful: [
          "Ask if that's his sales pitch",
          "Say you'll be the strange one",
        ],
        bold: ["Say you like strange", "Say you'll be the judge"],
        neutral: ["Say you'll give it time", "Just smile back"],
      },
    },
    {
      line: "Oh, hi! Sorry, I don't think I know your name yet. I'm Benkei. I work the campus store.",
      responses: {
        kind: ["Tell him your name", "Say it's nice to meet him"],
        playful: ["Make him guess your name", "Ask what the store's best at"],
        bold: ["Ask if he knows everyone", "Offer him a handshake"],
        neutral: ["Give your name, nothing else", "Nod back"],
      },
    },
    {
      line: "Just so you know, the store never closes. Any hour, if you need something, come find me.",
      responses: {
        kind: ["Say you'll take him up on it", "Say you'll count on him"],
        playful: ["Ask if he ever clocks out", "Promise to need odd things"],
        bold: ["Ask if he means any hour", "Ask if it'll be him there"],
        neutral: ["Say you don't need anything", "Nod and keep going"],
      },
    },
    {
      line: "You look like you've had a long one. Hang in there, okay?",
      responses: {
        kind: ["Ask how his day's been", "Say that helped, actually"],
        playful: ["Ask for the full pep talk", "Ask if he sells more energy"],
        bold: ["Say it just got better", "Say it's looking up now"],
        neutral: ["Say you'll manage", "Shrug it off"],
      },
    },
  ],
};
