// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/elias.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/elias.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He's winding a string of festival lights around one arm, in no hurry about it.",
      approach: "Say hello",
      greeting:
        '"Oh, I don\'t think I\'ve seen you around before. Would you mind holding this end for me?"',
      responses: {
        kind: ["Offer to hold the other end", "Help him wind the lights"],
        playful: [
          "Ask if this is how he says hi",
          "Ask if he'll remember you now",
        ],
        bold: [
          "Take half the lights from him",
          "Say he'll be seeing you more",
        ],
        neutral: ["Say you're new here", "Watch him wind them"],
      },
    },
    {
      line: "A lollipop stick shifts from one corner of his mouth to the other. He's strolling nowhere in particular, hands in his pockets.",
      approach: "Ask what he's up to",
      greeting:
        '"I was just taking a walk around campus. For my health, of course."',
      responses: {
        kind: ["Offer to walk with him", "Say you could use one too"],
        playful: ["Ask if candy's for his health", "Say of course it is"],
        bold: ["Fall into step with him", "Say you'll pick the route"],
        neutral: ["Leave him to it", "Wish him a good walk"],
      },
    },
    {
      line: "He's between errands, and in no particular rush to reach the next one.",
      approach: "Ask whose errands they are",
      greeting:
        '"For Jo. Something new every day. It keeps me out of trouble, mostly."',
      responses: {
        kind: ["Keep him company on this one", "Say he's earned a break"],
        playful: ["Bet he's taking the long way", "Ask how many he's done"],
        bold: ["Ask where he's headed next", "Say you'll run one with him"],
        neutral: ["Nod, file it away", "Let him get back to it"],
      },
    },
    {
      line: "The smile comes slow and lands just right, warm, unhurried, and a half-second too practiced.",
      approach: "Catch his eye",
      greeting:
        '"Sorry… I\'m a little short on time. Would you mind if I went on ahead?"',
      responses: {
        kind: ["Return the smile", "Say you'll catch him later"],
        playful: ["Ask if he's ever on time", "Ask if he's up to something"],
        bold: ["Ask to walk partway with him", "Ask what he's late for"],
        neutral: ["Say you don't mind", "Step aside for him"],
      },
    },
    {
      line: "He's leaning on a broom instead of using it, the sweeping long since done.",
      approach: "Ask why he's still at it",
      greeting: '"Oh, it\'s nothing. Old habit. I just like things tidy."',
      responses: {
        kind: ["Say the floor looks spotless", "Say he did a good job"],
        playful: ["Ask if he does windows", "Book him for your room next"],
        bold: ["Say he missed a spot", "Say tidy suits him"],
        neutral: ["Let him talk", "Stand with him a while"],
      },
    },
  ],
};
