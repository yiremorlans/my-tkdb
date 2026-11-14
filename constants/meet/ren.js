// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/ren.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Huh? ...I'm on break. Whatever it is, ask someone else.",
      responses: {
        kind: ["Keep him company on his break", "Say it can wait"],
        playful: ["Say you're on break too", "Ask if breaks have a cooldown"],
        bold: ["Say you're asking him", "Say it's him or no one"],
        neutral: ["Leave him to his break", "Go ask someone else"],
      },
    },
    {
      line: "I'm out of HP... Not doing anything is kind of the point.",
      responses: {
        kind: ["Say he's earned a break", "Say doing nothing is fine"],
        playful: ["Ask if you can join nothing", "Offer him a health potion"],
        bold: ["Sit and do nothing with him", "Say nothing's better with two"],
        neutral: ["Nod and leave him to it", "Say suit yourself"],
      },
    },
    {
      line: "If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm busy.",
      responses: {
        kind: ["Say you'll feed the animals", "Say you'll take this one"],
        playful: ["Ask if you get a jumpsuit", "Accept the side quest"],
        bold: ["Say you'll do it for a favor", "Say yes on one condition"],
        neutral: ["Say it's not your job", "Say you'll think about it"],
      },
    },
    // model: Noon1 (Affinity2) + Default4
    {
      line: "Ugh... that clown's looking for me again. If he asks, you never saw me.",
      responses: {
        kind: ["Say you never saw him", "Promise to keep quiet"],
        playful: ["Offer a fake alibi", "Call it a stealth mission"],
        bold: ["Play lookout", "Say he owes you one"],
        neutral: ["Say it's not your business", "Keep walking"],
      },
    },
    // Evening2 (Affinity6), verbatim
    {
      line: "Don't people get embarrassed calling out those words when they use their stigmas? It makes them look like LARPers...",
      responses: {
        kind: ["Say it does look a bit much", "Say you'd be embarrassed too"],
        playful: ["Call it cosplay with powers", "Say they need a dice roll"],
        bold: ["Say it's the best part", "Say it sounds cool to you"],
        neutral: ["Say it doesn't bother you", "Say you don't think about it"],
      },
    },
  ],
};
