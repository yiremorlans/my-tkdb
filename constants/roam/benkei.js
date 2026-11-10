// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/benkei.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/benkei.js for
// /roam; a tier left out still draws the shared pool. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He looks up from the boxes he's carrying, a little flustered, and gives you a warm, gentle smile.",
      approach: "Say hello",
      greeting:
        '"Oh! Hello. Sorry, didn\'t hear you come up. Can I help you find something?"',
      responses: {
        kind: ["Ask if he needs a hand", "Say you'd love his help"],
        playful: ["Blame your quiet shoes", "Ask if he's off the clock"],
        bold: ["Tell him what you need", "Say you found what you wanted"],
        neutral: ["Let him get back to it", "Say you were just passing"],
      },
    },
    {
      line: "One of Cornelius' cats has decided to walk with him, and he's matching her pace, not the other way around. He nods at her like that explains everything. It somehow does.",
      approach: "Say hi to the cat too",
      greeting:
        "\"That's the manager. Don't take it personally if she ignores you. She ignores me too.\"",
      responses: {
        kind: ["Say he's too nice to ignore", "Ask how he puts up with it"],
        playful: ["Ask if he's up for review", "Ask if she signs his checks"],
        bold: ["Ask who's really in charge", "Say you'll get her to notice"],
        neutral: ["Watch the cat instead", "Ignore the cat right back"],
      },
    },
    {
      line: "He's rewriting a price tag by hand because the printed one had a typo.",
      approach: "Wait for him to finish",
      greeting:
        "\"Sorry, one second. It said 'chocolat.' It's been bothering me for hours.\"",
      responses: {
        kind: ["Say the fix looks good", "Tell him it's worth fixing"],
        playful: ["Say 'chocolat' sounds fancier", "Ask if it was on purpose"],
        bold: ["Point out another typo", "Offer to write the next one"],
        neutral: ["Wait while he finishes", "Read the tag over his shoulder"],
      },
    },
    {
      line: "He starts to say something, thinks better of it, and offers you a snack instead.",
      approach: "Accept the snack",
      greeting:
        '"Please, go ahead. It\'s nothing special. I always carry a few."',
      responses: {
        kind: ["Say you'll share it with him", "Ask which one he'd pick"],
        playful: ["Ask if it's past its date", "Ask what else he's got"],
        bold: ["Ask why he carries snacks", "Say you'll pay him back"],
        neutral: ["Wait for him to say it", "Take it and smile"],
      },
    },
    {
      line: "He's helping someone gather up an armful of dropped books, and it doesn't look put on. It's just how he is.",
      approach: "Reciprocate his kindness",
      greeting: '"New around here? It\'s a strange school. It grows on you."',
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
  ],
};
