// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/ren.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/ren.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He's scrolling through his phone and barely acknowledges you at first.",
      approach: "Say hey",
      greeting: "Oh. Hey. Give me a sec, this one's almost over.",
      responses: {
        kind: ["Say there's no rush", "Wait until he's done"],
        playful: ["Bet on how it ends", "Ask if you can watch too"],
        bold: ["Sit down next to him", "Settle in till it's over"],
        neutral: ["Say you weren't waiting", "Leave him to it"],
      },
    },
    {
      line: "He looks up from his phone at you hovering, like you might be about to cut into his break.",
      approach: "Get his attention",
      greeting: "Huh? ...I'm on break. Whatever it is, ask someone else.",
      responses: {
        kind: ["Keep him company on his break", "Say it can wait"],
        playful: ["Say you're on break too", "Ask if breaks have a cooldown"],
        bold: ["Say you're asking him", "Say it's him or no one"],
        neutral: ["Leave him to his break", "Go ask someone else"],
      },
    },
    {
      line: "He's found a spot where nobody looks. You found him anyway.",
      approach: "Sit down uninvited",
      greeting:
        "...This is harassment. I came here specifically to not be found.",
      responses: {
        kind: ["Say you won't tell anyone", "Say you'll be quiet"],
        playful: ["Say you win hide-and-seek", "Ask if there's room to hide"],
        bold: ["Claim the spot as yours too", "Tell him you found him fast"],
        neutral: ["Say you weren't looking", "Say it's a public spot"],
      },
    },
    {
      line: "He's got rounds again, and he's clearly hunting for someone to hand them off to.",
      approach: "Ask if he's busy",
      greeting:
        "If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm busy.",
      responses: {
        kind: ["Say you'll feed the animals", "Say you'll take this one"],
        playful: ["Ask if you get a jumpsuit", "Accept the side quest"],
        bold: ["Say you'll do it for a favor", "Say yes on one condition"],
        neutral: ["Say it's not your job", "Say you'll think about it"],
      },
    },
    // model: Default2
    {
      line: "He's holding a bucket at arm's length, like whatever's in it might climb out.",
      approach: "Ask what's in it",
      greeting:
        "Don't ask. It moved earlier. Why am I the one who has to feed these weird-ass animals...?",
      responses: {
        kind: ["Offer to hold it for a bit", "Say they are pretty weird"],
        playful: ["Ask if it has a name", "Say it looked at you funny"],
        bold: ["Look in the bucket", "Tell him it can't be that bad"],
        neutral: ["Say it's probably fine", "Keep your distance"],
      },
    },
  ],
};
