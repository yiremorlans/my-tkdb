// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/edward.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Ah, the special student, is it? Everyone's been making quite the fuss about you.",
      responses: {
        kind: ["Say it's nice to meet him", "Say you'd hoped to meet him"],
        playful: ["Ask if it was flattering", "Ask if you live up to it"],
        bold: [
          "Say you'd rather hear his take",
          "Say he can judge for himself",
        ],
        neutral: ["Shrug off the fuss", "Say you're just a student"],
      },
    },
    {
      line: "My favorite channel should be posting a new video at any moment...",
      responses: {
        kind: ["Ask what channel it is", "Ask what he likes about it"],
        playful: [
          "Guess what the video is about",
          "Ask if you can subscribe too",
        ],
        bold: ["Ask to join him", "Say you'll watch it with him"],
        neutral: ["Leave him to his video", "Come back later"],
      },
    },
    {
      line: "I was taken by a sudden whim to travel abroad. I had heard good things about Japan, so I came over to play, but alas, I was captured.",
      responses: {
        kind: ["Ask if he's settled in", "Say you hope he's treated well"],
        playful: ["Ask if he's planning an escape", "Ask if it was worth it"],
        bold: ["Say he doesn't look captive", "Say he let them catch him"],
        neutral: ["Nod along", "Let him finish the story"],
      },
    },
    {
      line: "You ought to know... I have no interest in harming humans. They should enjoy their short lives while they can.",
      responses: {
        kind: ["Ask if he enjoys his own", "Ask what he enjoys most"],
        playful: ["Ask if that's a warning", "Ask if he's offering tips"],
        bold: ["Ask him to show you how", "Say you'll start right now"],
        neutral: ["Take it as advice", "Let it hang there"],
      },
    },
    {
      line: "I'm going to lie down a while. If you need something, ask Rui.",
      responses: {
        kind: ["Say you'll let him rest", "Offer to fetch him a blanket"],
        playful: ["Ask if Rui does everything", "Ask what Rui would say"],
        bold: ["Ask if you can stay a bit", "Ask him for a favor"],
        neutral: ["Go find Rui", "Let him lie down"],
      },
    },
  ],
};
