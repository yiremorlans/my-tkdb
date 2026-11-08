// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/jo.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/jo.js for
// /roam; a tier left out still draws the shared pool. See constants/roam/index.js.
// Written once in the uniform voice with {he}/{him}/{his} tokens;
// withPronounVariants expands each tier into { uniform, casual }.
import { withPronounVariants } from "../dialogue/_shared.js";

export default {
  new: withPronounVariants([
    {
      line: "{He}'s buried in paperwork: proposals, schedules, a budget that won't balance. {He} looks up anyway.",
      approach: "Ask for a minute of {his} time",
      greeting: '"A new face! What\'s your name?"',
      responses: {
        kind: ["Say you won't keep {him} long", "Say you'd like to help out"],
        playful: ["Give your name with a bow", "Ask if new faces get a prize"],
        bold: ["Give your name, ask {his}", "Say you'll be a regular face"],
        neutral: ["Just give your name", "Say it's your first week"],
      },
    },
    {
      line: '"Anything troubling you? If you run into any problems, just come talk to me."',
      approach: "Ask if {he}'s free",
      greeting: '"Take your time. Everyone here moves at their own pace."',
      responses: {
        kind: ["Say you'll keep it quick", "Ask if {he} ever slows down"],
        playful: ["Ask what {his} pace is", "Ask if strolling counts"],
        bold: ["Say you'll match {his} pace", "Say you know what you need"],
        neutral: ["Take a moment to think", "Say it's just a question"],
      },
    },
    {
      line: "The charisma lands before {he}'s said a word. Running Dionysia hasn't dulled it.",
      approach: "Ask if {he}'s busy",
      greeting:
        '"I\'ve got a budget to fight with, but I can talk and lose at the same time."',
      responses: {
        kind: ["Offer a second pair of eyes", "Ask how long {he}'s been at it"],
        playful: ["Offer to referee", "Ask who's ahead so far"],
        bold: ["Say you'll fight it with {him}", "Offer to be {his} second"],
        neutral: ["Ask what the budget's for", "Let {him} keep fighting it"],
      },
    },
    {
      line: "{He}'s frowning at {his} phone, thumb already hovering over someone's number.",
      approach: "Ask who {he}'s calling",
      greeting:
        '"I don\'t have enough research materials... No choice. I\'ll contact the teacher right now. If I go pick them up myself, I should still make it in time."',
      responses: {
        kind: ["Offer to go with {him}", "Offer to help carry them"],
        playful: ["Guess it's for a costume", "Ask if you can model it"],
        bold: ["Say you're coming along", "Tell {him} to let you help"],
        neutral: ["Ask what the research is for", "Let {him} get going"],
      },
    },
    {
      line: "{He}'s just back from a workout, sleeves pushed up, still a little out of breath.",
      approach: "Ask what {he}'s training for",
      greeting:
        "\"I should get some karate practice in, even just light sparring, or I'll get rusty. I wonder if anyone's up for it.\"",
      responses: {
        kind: ["Offer to hold the pads", "Ask what keeps {him} so busy"],
        playful: ["Ask {him} to go easy on you", "Ask if you'll need a helmet"],
        bold: ["Say you're up for it", "Take a stance across from {him}"],
        neutral: ["Say you've never sparred", "Ask how long {he}'s trained"],
      },
    },
  ]),
};
