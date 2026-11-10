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
  warm: withPronounVariants([
    {
      line: "{He}'s muttering that there aren't enough hours in the day, then sees you and finds one anyway.",
      approach: "Take {him} up on it",
      greeting:
        '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
      responses: {
        kind: ["Say you're glad {he} did", "Say it means a lot"],
        playful: [
          "Ask if you outrank the budget",
          "Ask where you fit on the list",
        ],
        bold: ["Say you'll make it worth it", "Tell {him} the budget can wait"],
        neutral: ["Say you'll keep it short", "Sit down with {him}"],
      },
    },
    {
      line: "{He}'s holding two coffees, and one of them already has your name on it.",
      approach: "Enjoy the coffee break",
      greeting:
        '"Long day? Sit. I\'ll deal with the rest of this later, for once."',
      responses: {
        kind: ["Say {he}'s earned the break", "Ask how {his} day went"],
        playful: ["Clink coffees with {him}", "Hold {him} to 'for once'"],
        bold: ["Say once isn't enough", "Say 'later' means tomorrow"],
        neutral: ["Say it's been a long one", "Take the seat offered"],
      },
    },
    {
      line: "{He}'s heading out with a folder under {his} arm, and slows down when {he} sees you.",
      mood: true,
      approach: "Catch up to {him}",
      greeting:
        "\"I'm heading to meet with the teachers. You're going to class too? Then... want to go together?\"",
      responses: {
        kind: ["Say you're headed that way", "Say you'd like that"],
        playful: ["Ask if you're {his} excuse", "Ask if you get a hall pass"],
        bold: [
          "Say yes before {he} finishes",
          "Say you were hoping {he}'d ask",
        ],
        neutral: ["Ask what the teachers want", "Walk with {him} in quiet"],
      },
    },
    {
      line: "{He} clears {his} throat for the third time, voice rough, and gives you a sheepish look.",
      approach: "Ask if {he}'s okay",
      greeting:
        "\"Sorry. I stayed up late last night, and my throat's acting up... I'll go make some honey tea.\"",
      responses: {
        kind: ["Ask what kept {him} up so late", "Ask if {he} needs anything"],
        playful: ["Ask for a cup too", "Say {he} sounds like a DJ"],
        bold: ["Say {he} knows better", "Make the tea for {him}"],
        neutral: ["Wait while {he} clears it", "Say it sounds sore"],
      },
    },
    {
      line: "{He}'s just out of another leadership meeting with Mio, rubbing {his} temple and reading over a list that keeps growing.",
      approach: "Ask about the leadership talk",
      greeting:
        '"Are the two of us taking on too much? ...But it\'s faster if we just handle it ourselves."',
      responses: {
        kind: ["Offer a second pair of hands", "Ask what you can take on"],
        playful: ["Ask if 'we' includes you", "Ask if Mio says the same"],
        bold: ["Say the house can pitch in", "Say faster isn't always better"],
        neutral: ["Let {him} talk it through", "Say it does look like a lot"],
      },
    },
    {
      line: "{He} catches you heading out somewhere {he} clearly doesn't approve of, and falls into step beside you.",
      approach: "Stop and look at {him}",
      greeting:
        "\"Where do you think you're going at a time like this? ...No. I'm taking you home. If it's something you need to do, you can do it tomorrow.\"",
      responses: {
        kind: ["Say you feel safer with {him}", "Thank {him} for looking out"],
        playful: [
          "Ask if {he} tucks you in too",
          "Ask if this is a service now",
        ],
        bold: ["Ask who walks {him} back", "Say only if {he} sleeps too"],
        neutral: ["Walk back beside {him}", "Let the errand wait"],
      },
    },
    {
      line: "{He}'s surrounded by costume sketches and fabric swatches, and waves you over.",
      approach: "Look at the costume research",
      greeting: "\"Here's what I've found so far. Tell me what you think.\"",
      responses: {
        kind: ["Say it's impressive work", "Say {he}'s been thorough"],
        playful: ["Ask to model one yourself", "Suggest something outrageous"],
        bold: ["Say which one you'd cut", "Pick the best one for {him}"],
        neutral: ["Look it over in quiet", "Read through the notes"],
      },
    },
    {
      line: "{He}'s slicing a loaf that's still warm, and the first piece is already set aside.",
      approach: "Take the first slice",
      greeting:
        "\"Don't tell the others. There's a queue for that loaf and you just skipped it.\"",
      responses: {
        kind: ["Save {him} half the slice", "Say it smells amazing"],
        playful: ["Ask for the second slice", "Ask what silence costs"],
        bold: ["Ask who usually gets first", "Say {he} should skip it too"],
        neutral: ["Ask what kind of bread it is", "Eat it where you stand"],
      },
    },
    {
      line: "{He}'s fielding three requests at once, and when {he} sees it's you, {his} shoulders drop.",
      mood: true,
      approach: "Ask how {he} keeps up",
      greeting:
        '"One request at a time. ...But don\'t worry about me. Did you need something?"',
      responses: {
        kind: ["Say you came to check on {him}", "Offer to help"],
        playful: ["Say you're request number four", "Say you'll get in line"],
        bold: ["Say you came for {him}", "Say you'll worry anyway"],
        neutral: ["Say you don't need anything", "Wait for {him} to finish"],
      },
    },
    {
      line: "A student from another house thanks {him} on the way out, and {he} waves them off with a tired smile.",
      approach: "Ask who made {him} the advisor",
      greeting:
        '"No one, really. When someone comes to me in trouble, I can\'t just send them away. ...Apparently that gets around."',
      responses: {
        kind: ["Say people see how {he} cares", "Say {he}'s worth seeking out"],
        playful: ["Ask if there's a waitlist", "Say you're next in line"],
        bold: ["Say {he} can come to you too", "Say {he}'s allowed to say no"],
        neutral: ["Say word does travel", "Let {him} get back to it"],
      },
    },
  ]),
  spark: withPronounVariants([
    {
      line: "{He} catches the look on your face and just watches, waiting to see if you'll say it or swallow it again.",
      mood: true,
      approach: "Meet {his} eyes",
      greeting: '"That look you give me. Say what you mean by it, cutie."',
      responses: {
        kind: ["Say you like looking at {him}", "Say it means you're happy"],
        playful: ["Ask what look {he} means", "Say {he} has to guess"],
        bold: ["Say it means come closer", "Say you'd rather show {him}"],
        neutral: ["Let the look speak for itself", "Let {him} read it"],
      },
    },
    {
      line: "{He}'s got three things due today, and since you walked in {he} can't make {himself} care about any of them.",
      approach: "Let the work wait",
      greeting:
        "Nothing on that desk is going anywhere. You are, eventually. Let's not rush that.",
      responses: {
        kind: ["Say you're in no rush either", "Say you'll stay a while"],
        playful: [
          "Tease {him} about the deadline",
          "Ask which one is due first",
        ],
        bold: [
          "Take the pen out of {his} hand",
          "Say the desk can wait all day",
        ],
        neutral: ["Sit and let the work wait", "Let the hour run on"],
      },
    },
    {
      line: "Walking back from rehearsal, {his} hand drifts toward yours. {He} catches it halfway and lowers it again, like nothing happened.",
      mood: true,
      approach: "Notice the hand",
      greeting:
        "You saw that. I lost my nerve halfway. Not my finest moment, cutie.",
      responses: {
        kind: ["Say you'd have let {him}", "Say you didn't mind at all"],
        playful: ["Ask where the nerve went", "Ask if it'll try again"],
        bold: ["Grab {his} hand yourself", "Reach for {his} hand first"],
        neutral: ["Keep walking with {him}", "Let {him} try again later"],
      },
    },
    {
      line: "The even, easy voice {he} keeps for everyone else slips. What's under it is only for you.",
      approach: "Ask what's under the charm",
      greeting:
        "You want the version under the charm? Careful what you ask for, cutie.",
      responses: {
        kind: ["Say you like what's under it", "Say you'll be careful with it"],
        playful: ["Ask what {he}'s hiding", "Ask if it bites"],
        bold: ["Say you can take it", "Say you'll take it as it comes"],
        neutral: ["Let {him} keep some of it", "Listen without pushing"],
      },
    },
    {
      line: "{He} keeps smiling at nothing, and finally gives up pretending it's nothing.",
      approach: "Ask what the smile's for",
      greeting:
        "My whole week's been better because of you. ...I don't say things like that by accident.",
      responses: {
        kind: ["Say you feel the same", "Say yours has been too"],
        playful: ["Make {him} repeat it", "Ask what made it better"],
        bold: ["Say you'll make it every week", "Say you'll do it on purpose"],
        neutral: ["Let the moment pass", "Smile and let it be"],
      },
    },
    {
      line: "{He}'s stepping out for a walk to take a little break from work, wishing out loud that Dionysia had cherry blossoms.",
      approach: "Grab your coat",
      greeting:
        "It'd be a nicer view with them. ...Then again, I'd have you along. Walk with me?",
      responses: {
        kind: ["Say it's the break {he} needs", "Walk as long as {he} wants"],
        playful: [
          "Ask if you count as a view",
          "Ask if {he}'ll settle for you",
        ],
        bold: [
          "Take {his} arm on the way out",
          "Say you'll keep {him} out late",
        ],
        neutral: ["Fall into step beside {him}", "Follow {him} out"],
      },
    },
  ]),
  close: withPronounVariants([
    {
      line: "{He}'s got the car keys out before you've said anything, like your answer was never really in doubt.",
      approach: "Take the passenger seat",
      greeting: "Good. Where we're going is a surprise, cutie.",
      responses: {
        kind: ["Buckle in without a word", "Say you trust {his} pick"],
        playful: ["Make {him} ask properly", "Guess the destination"],
        bold: ["Say you were going to ask", "Say you cleared your evening"],
        neutral: ["Let the drive continue", "Watch the road go by"],
      },
    },
    {
      line: "{He}'s doing {his} stage makeup before the show, and catches you watching in the mirror.",
      mood: true,
      approach: "Hand {him} the next brush",
      greeting:
        "Thank you. You can keep watching, cutie. I don't mind, as long as it's you.",
      responses: {
        kind: ["Offer to do the last touches", "Steady {his} hand for {him}"],
        playful: ["Ask to try the eyeliner", "Ask for a matching look"],
        bold: ["Say {he} looks stunning", "Say you'll only watch {him}"],
        neutral: ["Watch {him} finish", "Keep watching {him}"],
      },
    },
    {
      line: 'You\'re back after a few days away, and {he} says it under {his} breath, mostly to {himself}: "...Missed you."',
      approach: "Ask {him} to say it again",
      greeting: "Once was already more than I meant to say, cutie.",
      responses: {
        kind: ["Say you missed {him} too", "Say it's good to be back"],
        playful: ["Ask how much {he} missed you", "Pretend you didn't hear"],
        bold: ["Say it back, louder", "Say you won't leave that long"],
        neutral: ["Don't push for it", "Let the quiet say it"],
      },
    },
    {
      line: "{He}'s rescheduled the same meeting twice this week. Both times it would've landed on the hour you usually come by.",
      approach: "Ask about the meeting",
      greeting:
        "It kept landing on your hour. I wasn't about to give that up for a meeting.",
      responses: {
        kind: ["Say you'd have waited for {him}", "Offer to move your hour"],
        playful: ["Ask what you did to earn it", "Ask if that's a confession"],
        bold: ["Ask for a second hour", "Say you'll guard that hour"],
        neutral: ["Let {him} keep the hour", "Take the hour as it is"],
      },
    },
    {
      line: "{He} holds out {his} car keys. This time {he} wants you to drive, and {he}'ll take the passenger seat.",
      mood: true,
      approach: "Take the keys",
      greeting:
        "Feels strange being on this side, huh? I'll handle the directions. Go easy on her, cutie.",
      responses: {
        kind: [
          "Say {he} can rest the whole way",
          "Say you'll get {him} home safe",
        ],
        playful: ["Call {him} passenger princess", "Ask if you pick the music"],
        bold: ["Say you know the way", "Say you'd have come regardless"],
        neutral: ["Start the car", "Pull out onto the road"],
      },
    },
    {
      line: "{He}'s not being subtle about looking at you, and doesn't seem to care that you've noticed.",
      approach: "Catch {him} looking",
      greeting:
        "Don't mind me. I spend all day keeping an eye on the whole house.",
      responses: {
        kind: ["Blush and hold {his} gaze", "Say you don't mind at all"],
        playful: ["Say you mind very much", "Ask if you count as the house"],
        bold: ["Say it's your turn to look", "Say someone should watch {him}"],
        neutral: ["Let it happen, say nothing", "Carry on as you were"],
      },
    },
    {
      line: "Everyone else has cleared out. {He}'s standing a step closer than {he} needs to.",
      mood: true,
      approach: "Stay where you are",
      greeting:
        "I'd give you an excuse for standing this close, but I'm out of good ones.",
      responses: {
        kind: [
          "Say {he} doesn't need an excuse",
          "Say you were hoping {he}'d stay",
        ],
        playful: ["Say you'll lend {him} one", "Make {him} close it first"],
        bold: ["Take the last step", "Lean into {his} side"],
        neutral: ["Let the distance close itself", "Meet {him} halfway"],
      },
    },
    {
      line: "{He}'s settled a shawl around your shoulders, and {his} hands haven't let go of the ends.",
      approach: "Hold still for {him}",
      greeting:
        "...I thought I was done feeling like this. So, what are you going to do about it?",
      responses: {
        kind: ["Say you'll keep {him} warm too", "Put your hands over {his}"],
        playful: [
          "Ask if {his} hands are stuck",
          "Say you're not cold anymore",
        ],
        bold: ["Say you'll take responsibility", "Pull {him} in by the shawl"],
        neutral: ["Let the question sit", "Let {his} hands stay"],
      },
    },
  ]),
};
