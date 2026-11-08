// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/mio.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/mio.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He's tinkering with a bent hinge, sighing like this isn't the first time.",
      approach: "Ask what he's fixing",
      greeting:
        '"This? Hinge off the Heebie-Jeebie House door. Somebody slammed it. ...It was Shion."',
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
      line: "Dark circles under his eyes, and a yawn he doesn't bother hiding.",
      approach: "Ask how much he slept",
      greeting:
        "\"Yeah, yeah. I know how it looks. I'm a natural short sleeper, so I'm fine. (Yaaawn...)\"",
      responses: {
        kind: ["Offer to run his next errand", "Offer him a coffee"],
        playful: ["Ask if it's genetic", "Ask if naps count against it"],
        bold: [
          "Say you'll wake him in an hour",
          "Say you'll check again later",
        ],
        neutral: ["Let the excuse stand", "Take his word for it"],
      },
    },
    {
      line: "He's bent over a mission tool, and holds up one finger without looking up.",
      approach: "Wait until he's done",
      greeting:
        '"...There. Done. Thanks for waiting. Most people start talking halfway through."',
      responses: {
        kind: ["Ask what finally worked", "Offer to tidy up for him"],
        playful: ["Say you nearly dozed off", "Ask if you're hired now"],
        bold: ["Say you'd have waited longer", "Ask him to show you how"],
        neutral: ["Say it was no trouble", "Let him pack up"],
      },
    },
    {
      line: "He's hauling luggage almost too heavy for one person, shifting his grip every few steps.",
      approach: "Wish him luck",
      greeting:
        '"Hm? Oh, thanks. Got a pretty big repair job to do now. I\'ll do my best."',
      responses: {
        kind: ["Help him carry it over", "Offer to hand him tools"],
        playful: ["Ask if there's a body in it", "Guess what's in it"],
        bold: ["Say you'll come along", "Ask to see the job"],
        neutral: ["Step out of his way", "Let him get going"],
      },
    },
    {
      line: "His phone buzzes with another repair request. He starts to add it to the list, then stops.",
      approach: "Ask what came in",
      greeting:
        "\"Wait a sec… Wasn't this one the carpenter cat's job? Well… complaining is more trouble than it's worth.\"",
      responses: {
        kind: ["Say he takes on too much", "Offer to take a job off him"],
        playful: ["Ask how long the list is", "Bet the list never shrinks"],
        bold: ["Say you'll come on that one", "Say he's allowed to say no"],
        neutral: ["Let him add it to the list", "Say nothing"],
      },
    },
  ],
};
