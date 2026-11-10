// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/alan.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "Most people keep their distance. ...Don't get involved with me.",
      responses: {
        kind: ["Say you'd like to know him", "Ask if you can stick around"],
        playful: ["Ask how involved is too much", "Ask if saying hi counts"],
        bold: ["Say you're not most people", "Say you'll take that chance"],
        neutral: ["Hold your ground", "Let him say his piece"],
      },
    },
    {
      line: "Looking for someone? ...I got something I need to do here.",
      responses: {
        kind: ["Say you were looking for him", "Offer to help with it"],
        playful: ["Say you're just browsing", "Guess it isn't homework"],
        bold: ["Say you're right on target", "Say you'll join him"],
        neutral: ["Say you're just passing by", "Say you'll leave him to it"],
      },
    },
    {
      line: "...Hold on. That sounds like a bike engine, but it's not one I know. ...Be right back.",
      responses: {
        kind: ["Ask whose bike it could be", "Say you'll be here after"],
        playful: ["Ask if he knows every engine", "Say it sounds like a bad cold"],
        bold: ["Say you'll come take a look", "Say you'll be right behind him"],
        neutral: ["Let him go", "Say you didn't hear a thing"],
      },
    },
    {
      line: "...You seem busy. Let me know if you need anything.",
      responses: {
        kind: ["Say you'll come find him", "Ask if he needs anything"],
        playful: ["Ask what counts as anything", "Say busy is your default"],
        bold: ["Name something you need", "Say you'll take him up on it"],
        neutral: ["Say you're fine for now", "Say you're not that busy"],
      },
    },
    {
      line: "Was just going for a jog. ...What do you want?",
      responses: {
        kind: ["Say it can wait till after", "Say you just wanted to say hi"],
        playful: ["Ask how far counts as a jog", "Offer him a map"],
        bold: ["Ask if you can come along", "Say you'll keep up"],
        neutral: ["Say it's nothing", "Step aside to let him by"],
      },
    },
  ],
};
