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
        "\"I don't have enough research materials... No choice. I'll contact the teacher right now. If I go pick them up myself, I should still make it in time.\"",
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
  known: withPronounVariants([
    {
      line: "{He} sets the pen down the moment {he} spots you, like {he}'d been looking for an excuse.",
      approach: "Interrupt the paperwork",
      greeting:
        '"Perfect timing, cutie. I\'ve been reading the same page for a while now."',
      responses: {
        kind: ["Say you'll keep {him} company", "Ask if {he}'s had a break"],
        playful: ["Say you rescued {him}", "Ask how many times so far"],
        bold: ["Ask if {he} waited for you", "Tell {him} the pen stays down"],
        neutral: ["Let {him} finish the page", "Ask what {he}'s reading"],
      },
    },
    {
      line: "{He}'s setting out a tray of snacks for the dorm, and nudges it your way.",
      approach: "Take something from the tray",
      greeting:
        "\"After-practice snacks. Take some before Shion finds the tray. There's plenty, so don't hold back.\"",
      responses: {
        kind: ["Save {him} the last one", "Say the dorm's lucky"],
        playful: ["Take two, for later", "Hide a share from Shion"],
        bold: ["Ask who feeds the captain", "Take the tray over to {him}"],
        neutral: ["Take one and say nothing", "Eat while {he} works"],
      },
    },
    {
      line: "{He} checks {his} phone again, frowning at a message that hasn't come.",
      approach: "Ask who {he}'s waiting on",
      greeting:
        "\"Elias. I sent him on one errand and he still isn't back. Not that I'm mad. ...I am, a little.\"",
      responses: {
        kind: ["Offer to go find him", "Offer to do the errand instead"],
        playful: ["Promise a search party", "Ask if Elias got lost again"],
        bold: [
          "Say you'll bring Elias back",
          "Tell {him} to sit, you've got it",
        ],
        neutral: ["Ask what the errand was", "Ask where Elias usually goes"],
      },
    },
    {
      line: "{He} glances up and isn't the least bit surprised to see you again.",
      approach: "Catch {his} eye",
      greeting: '"You again, cutie. You\'re becoming a regular."',
      responses: {
        kind: ["Say you like coming by", "Say you come to check on {him}"],
        playful: ["Ask if {he} was counting", "Ask if regulars get perks"],
        bold: ["Say {he}'s stuck with you", "Say it's habit by now"],
        neutral: ["Say it's a coincidence", "Say you happened to pass by"],
      },
    },
    {
      line: "{He} comes in smelling faintly of smoke, looking very tired.",
      approach: "Ask about the smoke",
      greeting:
        '"Another fire at the circus tent. That\'s three now. I warned them about that fire act every single time."',
      responses: {
        kind: ["Offer to help clean up", "Ask if anyone got hurt"],
        playful: ["Ask if three's a pattern", "Ask if the act is cursed"],
        bold: ["Tell {him} to cancel the act", "Say they had enough warnings"],
        neutral: ["Let {him} vent about it", "Ask who runs the fire act"],
      },
    },
    {
      line: "{He} checks {his} watch, does a double take, and laughs at {himself}.",
      approach: "Ask what's funny",
      greeting:
        '"I lost track of the time again. You\'re a bad influence on my schedule, cutie."',
      responses: {
        kind: ["Ask if {he}'s eaten yet", "Say {he} needed a break"],
        playful: ["Ask if there's a fine for it", "Call {him} a bad influence"],
        bold: ["Say you're not sorry", "Answer only to 'cutie' now"],
        neutral: ["Don't react to the nickname", "Ask what time it is"],
      },
    },
    {
      line: "{He} hangs up with a sigh that has Shion's name all over it.",
      approach: "Ask what Shion did this time",
      greeting:
        '"Shion caused trouble again, so I need to go apologize. He always promises to stop, then does it again."',
      responses: {
        kind: ["Say you'll wait up for {him}", "Offer to keep an eye on Shion"],
        playful: ["Ask if apologies come in bulk", "Offer to keep the tally"],
        bold: ["Say it's not {his} to fix", "Say you're coming with {him}"],
        neutral: ["Ask where Shion is now", "Ask who's getting the apology"],
      },
    },
  ]),
};
