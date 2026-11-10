import { withPronounVariants } from "./_shared.js";
import bondScenes from "../bondScenes/jo.js";

export default {
  // Level-up DMs: constants/bondScenes/jo.js.
  bondScenes,
  dialogue: {
    spark: withPronounVariants([
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
        line: "{He} catches the look on your face and just watches, waiting to see if you'll say it or swallow it again.",
        // He's asking to be told outright: a flirty answer lands better than
        // a gentle one.
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
            "Tease {him} out of the office",
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
        // He reached and lost his nerve: taking his hand for him lands better
        // than letting him off gently.
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
        line: "The Aqua-line's empty this late. {He} didn't plan the drive for that, or so {he} claims.",
        approach: "Ride along on the Aqua-line",
        greeting:
          "Just us and the road tonight. I'll take that over an audience any day.",
        responses: {
          kind: ["Say you prefer it this way", "Say you'd pick this too"],
          playful: ["Ask if {he} planned it", "Ask if {he} booked the road"],
          bold: ["Say you'd ride all night", "Ask {him} to skip the exit"],
          neutral: ["Ride along in silence", "Watch the lights go past"],
        },
      },
      {
        line: "{He} scans the room the second {he} walks in, and doesn't stop looking until {he} finds you.",
        // He's openly glad to find you: keeping your eyes on him lands better
        // than a soft answer.
        mood: true,
        approach: "Catch {his} eye",
        greeting:
          "\"There you are. You're always the first person I look for. It's a habit by now, cutie.\"",
        responses: {
          kind: ["Say you'd hoped {he}'d come", "Say you look for {him} too"],
          playful: [
            "Ask who {he} looks for second",
            "Ask how long {he}'s done that",
          ],
          bold: ["Keep your eyes on {him}", "Hold {his} gaze across the room"],
          neutral: ["Let {him} come to you", "Wave from where you are"],
        },
      },
      {
        line: "The even, easy voice {he} keeps for everyone else slips. What's under it is only for you.",
        approach: "Ask what's under the charm",
        greeting:
          "You want the version under the charm? Careful what you ask for, cutie.",
        responses: {
          kind: [
            "Say you like what's under it",
            "Say you'll be careful with it",
          ],
          playful: ["Ask what {he}'s hiding", "Ask if it bites"],
          bold: ["Say you can take it", "Ask for all of it"],
          neutral: ["Let {him} keep some of it", "Listen without pushing"],
        },
      },
      {
        line: "For once {he} doesn't reach for the charm first. {He} just looks tired, and lets you see it.",
        approach: "Let {him} drop the act",
        greeting:
          "Sorry, I'm out of charm tonight. Can I just be tired with you for a bit?",
        responses: {
          kind: ["Say {he} never has to ask", "Say yes, as long as {he} likes"],
          playful: ["Miss the charm out loud", "Offer to be charming for two"],
          bold: [
            "Say {he} doesn't need the act",
            "Say you're keeping {him} here",
          ],
          neutral: ["Stay with {him} a while", "Let the evening stay slow"],
        },
      },
      {
        line: "{He}'s doing {his} stage makeup before the show, and catches you watching in the mirror.",
        // He's in performer mode and invites the audience: telling him he
        // looks stunning lands better than helping.
        mood: true,
        approach: "Hand {him} the next brush",
        greeting:
          "Thank you. You can keep watching, cutie. I don't mind, as long as it's you.",
        responses: {
          kind: ["Offer to do the last touches", "Hold the mirror steady"],
          playful: ["Ask to try the eyeliner", "Ask for a matching look"],
          bold: ["Say {he} looks stunning", "Say you'll be front row"],
          neutral: ["Watch {him} finish", "Wait by the mirror"],
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
        line: "{He}'s listing tomorrow's tasks out loud on autopilot, gets as far as the budget, and loses the thread when you get closer.",
        approach: "Wait for the next task",
        greeting: "I lost my place. I'm not going to pretend I mind.",
        responses: {
          kind: ["Tell {him} to slow down", "Say tomorrow can wait"],
          playful: [
            "Ask what came after 'budget'",
            "Ask if you're on the list",
          ],
          bold: ["Step past it entirely", "Say the list is done for today"],
          neutral: ["Let {him} keep the pace", "Let {him} find {his} place"],
        },
      },
      {
        line: "{He}'s walking you through the program for the next show, and halfway through the opening act {he} stops and just looks at you.",
        approach: "Ask about the second act",
        greeting:
          "The second act. Right. I had the whole running order in my head a minute ago, cutie.",
        responses: {
          kind: ["Say {he} knows it by heart", "Say the show's in good hands"],
          playful: [
            "Ask if you made {him} forget",
            "Ask if you're the second act",
          ],
          bold: ["Say you'd rather watch {him}", "Say {he}'s done for the day"],
          neutral: ["Wait for {him} to find it", "Read the program to {him}"],
        },
      },
      {
        line: "{He}'s rescheduled the same meeting twice this week. Both times it would've landed on the hour you usually come by.",
        approach: "Ask about the meeting",
        greeting:
          "It kept landing on your hour. I wasn't about to give that up for a meeting.",
        responses: {
          kind: ["Say you'd have waited for {him}", "Offer to move your hour"],
          playful: [
            "Ask what you did to earn it",
            "Ask if that's a confession",
          ],
          bold: ["Ask for a second hour", "Say you'll guard that hour"],
          neutral: ["Let {him} keep the hour", "Take the hour as it is"],
        },
      },
      {
        line: "The last of the house files out, and the captain's smile {he} wears for them gives way to a real one, easy and unpracticed.",
        approach: "Stay once the room empties",
        greeting:
          "Thank you for that. Smiling's easy when it's just you, cutie.",
        responses: {
          kind: ["Smile back at {him}", "Say you like this smile"],
          playful: ["Ask which smile this is", "Ask if it's off duty too"],
          bold: [
            "Say you'll keep the room empty",
            "Say no one else gets this one",
          ],
          neutral: ["Let the quiet settle", "Stay until {he}'s ready"],
        },
      },
      {
        line: "{He} was fitting a costume on you. Somewhere in it {his} hands stopped being a stylist's.",
        approach: "Let the fitting run long",
        greeting:
          "Hold still. ...I've checked this hem three times now, haven't I?",
        responses: {
          kind: ["Let {him} take {his} time", "Say there's no rush"],
          playful: [
            "Ask if it's about the costume",
            "Say you're keeping count",
          ],
          bold: ["Ask for a fourth check", "Say you'll stand still longer"],
          neutral: ["Stand still, let it run long", "Hold still for {him}"],
        },
      },
      {
        line: '"My whole week\'s been better because of you." {He} colors a little, hearing {himself} say it out loud.',
        approach: "Ask if {he}'s sure",
        greeting: "I'm sure. I don't say things like that by accident.",
        responses: {
          kind: ["Say you feel the same", "Say yours has been too"],
          playful: ["Make {him} repeat it", "Point out the blush"],
          bold: [
            "Say you'll make it every week",
            "Say you'll do it on purpose",
          ],
          neutral: ["Let the moment pass", "Smile and let it be"],
        },
      },
      {
        line: "{He} holds out {his} car keys. Tonight {he} wants you to drive, and {he}'ll take the passenger seat.",
        // He's handing over the wheel for once: telling him he's off duty
        // lands better than promising to be careful.
        mood: true,
        approach: "Take the keys",
        greeting:
          "Feels strange being on this side, huh? I'll handle the directions. Go easy on her, cutie.",
        responses: {
          kind: [
            "Ask for {his} best playlist",
            "Say you'll get {him} home safe",
          ],
          playful: [
            "Call {him} passenger princess",
            "Ask if you pick the music",
          ],
          bold: ["Say you know the way", "Say you'd have come regardless"],
          neutral: ["Start the car", "Pull out onto the road"],
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
      {
        line: "{He} wouldn't let you walk back alone this late. Now you're at your door, and {he}'s still finding things to say.",
        approach: "Wait for {him} to finish",
        greeting:
          "Get some proper rest, and don't skip your bedtime routine. ...I've said that twice now, haven't I? ...Goodnight, cutie.",
        responses: {
          kind: ["Tell {him} to follow it too", "Tell {him} to get home safe"],
          playful: [
            "Ask what else is on the list",
            "Say a third time can't hurt",
          ],
          bold: ["Don't let {him} leave yet", "Catch {his} sleeve"],
          neutral: ["Let {him} say it once more", "Stay at the door"],
        },
      },
      {
        line: "The common room's emptied out for the night. The show {he}'s been catching up on just hit the credits, and {he} hasn't turned it off.",
        approach: "Ask if {he}'s starting another",
        greeting:
          "I only ever have time for one. ...Stay for another anyway, cutie?",
        responses: {
          kind: [
            "Say {he}'s earned a second one",
            "Say you'll stay up with {him}",
          ],
          playful: ["Ask if it's a good one", "Threaten to spoil the ending"],
          bold: [
            "Say you're staying for two",
            "Hit play before {he} asks again",
          ],
          neutral: ["Let the next one start", "Stay through the credits"],
        },
      },
      {
        line: "{He}'s not being subtle about looking at you tonight, and doesn't seem to care that you've noticed.",
        approach: "Catch {him} looking",
        greeting:
          "Don't mind me. I spend all day keeping an eye on the whole house.",
        responses: {
          kind: ["Blush and hold {his} gaze", "Say you don't mind at all"],
          playful: ["Say you mind very much", "Ask if you count as the house"],
          bold: [
            "Say it's your turn to look",
            "Say someone should watch {him}",
          ],
          neutral: ["Let it happen, say nothing", "Carry on as you were"],
        },
      },
      {
        line: "The rest of Dionysia has cleared out of the office. {He}'s standing a step closer than {he} needs to.",
        // He's out of excuses and hoping you'll close the gap: taking the
        // last step lands better than reassurance.
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
          bold: [
            "Say you'll take responsibility",
            "Pull {him} in by the shawl",
          ],
          neutral: ["Let the question sit", "Let {his} hands stay"],
        },
      },
      {
        line: "{He}'s been on the same page of the proposal for a while now, and {his} eyes keep drifting off it to you.",
        approach: "Ask how the proposal's going",
        greeting:
          "Ha... I've read this same line four times and I still couldn't tell you what it says. I'm blaming you, cutie.",
        responses: {
          kind: ["Say {he}'s earned a break", "Offer to read it to {him}"],
          playful: [
            "Ask if you're that distracting",
            "Take it as a compliment",
          ],
          bold: ["Close the proposal for {him}", "Give {him} a fifth to blame"],
          neutral: ["Let {him} keep reading", "Let {him} keep looking"],
        },
      },
      // candidate from warm
      {
        line: '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        approach: "Ask when {he}'s leaving",
        greeting:
          '"Six, then. Windows down, and whatever today was stays outside the car."',
        responses: {
          kind: ["Say the sunset sounds perfect", "Say you'd love the drive"],
          playful: ["Ask for the long way home", "Ask who's picking the music"],
          bold: ["Say you'll hold {him} to six", "Ask to stay out past sunset"],
          neutral: ["Ride along in quiet", "Get in, watch the road"],
        },
      },
      // candidate from warm
      {
        line: '"The troupe has adopted you, by the way. Usually I have to translate my people for outsiders. With you they didn\'t need me to."',
        approach: "Ask what they said about you",
        greeting:
          '"Good things, mostly. The only complaint on record is that you don\'t come by often enough."',
        responses: {
          kind: ["Say you like them too", "Promise to come by more"],
          playful: ["Ask who complained exactly", "Ask for the bad ones too"],
          bold: ["Ask what {he} said about you", "Say you come by for {him}"],
          neutral: ["Take the news quietly", "Let the compliment sit"],
        },
      },
      // candidate from warm
      {
        line: "\"I'm heading to the botanical garden. Rui's been advising me on maintenance for my artifact. He knows it better than Mio does, believe it or not.\"",
        // A candid mood, letting the Mio secret slip: leaning in and asking
        // lands better than looking after him.
        mood: true,
        approach: "Walk to the garden with {him}",
        greeting:
          "\"Company's welcome. Just don't tell Mio I said Rui's the expert.\"",
        responses: {
          kind: [
            "Ask how {his} gear is holding",
            "Say you'll keep {him} company",
          ],
          playful: [
            "Ask if Rui's the favorite now",
            "Promise Mio won't hear it",
          ],
          bold: ["Stay for the whole tune-up", "Ask Rui to teach you too"],
          neutral: ["Watch Rui walk {him} through it", "Stay out of the way"],
        },
      },
      // candidate from warm
      {
        line: "\"You've never been inside the Heebie-Jeebie House, have you? I gave up on that place the day Shion claimed it. Come see what he's done to it.\"",
        approach: "Go take a look",
        greeting:
          '"Don\'t touch anything. I tell everyone that, and nobody listens, myself included."',
        responses: {
          kind: ["Say it has character", "Say Shion seems happy here"],
          playful: ["Touch something anyway", "Ask what that noise was"],
          bold: ["Ask why {he} gave up on it", "Go in ahead of {him}"],
          neutral: ["Look without touching", "Follow {him} inside"],
        },
      },
      // candidate from warm
      {
        line: '"I finished the budget early just so I\'d have the afternoon free."',
        approach: "Ask why {he} finished early",
        greeting:
          "\"Don't look so surprised when I make time for you. It's the one appointment I never move.\"",
        responses: {
          kind: ["Say you'll be there for it", "Say {he} earned the afternoon"],
          playful: [
            "Ask to be penciled in weekly",
            "Ask what the slot is called",
          ],
          bold: ["Say the whole day's next", "Say you'll hold {him} to it"],
          neutral: ["Let {him} keep the reason", "Take the afternoon offered"],
        },
      },
      // candidate from warm
      {
        line: '"I jog every morning before the house is awake. It clears my head, and the work goes faster after. I\'d recommend it to you."',
        approach: "Ask what it does for {him}",
        greeting:
          '"Half an hour with nobody needing anything. It\'s the clearest thinking I get all day."',
        responses: {
          kind: ["Say you'll give it a try", "Say it clearly works for {him}"],
          playful: ["Doubt you'd survive it", "Ask how early is too early"],
          bold: ["Say the house can wait", "Say {he} needs more than that"],
          neutral: ["Say you'll consider it", "Take the advice, say nothing"],
        },
      },
      // candidate from warm
      {
        line: "\"You turn up around this hour most days. I've started leaving the door open around now, that's all.\"",
        approach: "Ask if the door's for you",
        greeting:
          "\"It's open for anyone. It's just usually you who walks through it.\"",
        responses: {
          kind: ["Say you'll keep turning up", "Say you look forward to it"],
          playful: ["Test it tomorrow, early", "Ask about opening hours"],
          bold: ["Ask who else walks through", "Say the door's for you then"],
          neutral: ["Take the open door as is", "Step through without asking"],
        },
      },
    ]),
    close: withPronounVariants([
      {
        line: "For you {he}'d put down the proposal, the schedule, all of it, and just be a person for an hour.",
        approach: "Free them from the work",
        greeting:
          '"Ask me to stop working and I will. That\'s how much you have."',
        responses: {
          kind: [
            "Tell {him} to share the burden",
            "Say {he} needn't manage alone",
          ],
          playful: "Drag {him} from the desk",
          bold: "Tell {him} it runs itself",
          neutral: [
            "Sit through {his} to-do list",
            "Keep {him} company at the desk",
          ],
        },
      },
      {
        line: "The work is finally done for the night. {He} doesn't reach for more. {He} stays.",
        approach: "Go to them",
        greeting:
          "\"Sit with me a while after the work's put away. It's my favorite part of the day now.\"",
        responses: {
          kind: "Let {him} stay without arguing",
          playful: "Tease {him} for staying anyway",
          bold: "Say {he}'s allowed to stay",
          neutral: "Stay after the others leave",
        },
      },
      {
        line: "{He}'s stopped asking which version of {him} you prefer. You never did have a favorite.",
        approach: "Say it can be handed off",
        greeting:
          "\"Every version of me is yours. That's not a line. I've checked.\"",
        responses: {
          kind: "Say every version is enough",
          playful: "Out-charm {him} for once",
          bold: "Say you never had a favorite",
          neutral: "Let {him} pick, say nothing",
        },
      },
      {
        line: '"No audience tonight," {he} says softly. "Just you. That\'s better anyway."',
        approach: "Stay past the sunset",
        greeting: '"With you, I don\'t need to perform. I can just be myself."',
        responses: {
          kind: "Let the quiet be enough",
          playful: ["Ask if you're the whole show", "Tease him for going soft"],
          bold: "Hold {his} hand openly",
          neutral: "Stay quiet, let it be enough",
        },
      },
      {
        line: "{He} lets the day end without you having to talk {him} into it.",
        approach: "Free them from the work",
        greeting:
          '"You looked at me tired and unglamorous and stayed anyway. Nobody else does that."',
        responses: {
          kind: "See the tired under the charm",
          playful: "Call it a soft ending",
          bold: [
            "Say you'll end every day here",
            "Say the work can wait for you",
          ],
          neutral: "Let the day end",
        },
      },
    ]),
    bound: withPronounVariants([
      {
        line: "Nothing is scheduled, nothing is owed. For once {he} is entirely off the clock, and stays there.",
        approach: "Leave the work till morning",
        greeting: '"Stay till the theater\'s cold. Then stay longer."',
        responses: {
          kind: "Tell {him} {he} can rest now",
          playful: [
            "Keep {him} away from it",
            "Make {him} leave the work",
            "Take the wheel",
          ],
          bold: ["Claim the whole night", "Drive off with {him}"],
          neutral: [
            "Leave the docket till morning",
            "Watch the sunset in quiet",
          ],
        },
      },
      {
        line: "{He} takes the paint off and lets you see the tired underneath, and doesn't put it back.",
        approach: "Come to bed",
        greeting:
          '"Nobody else gets to see this. ...Stay till I fall asleep? That\'s all I want."',
        responses: {
          kind: "Let {him} be unguarded",
          playful: "Tease the tired underneath",
          bold: "Take {him} to bed",
          neutral: "Stay quiet beside {him}",
        },
      },
      {
        line: '"No audience," {he} murmurs against your neck. "Only you. Only ever you."',
        approach: "Say it back",
        greeting: '"I love you. Every version of me does. I\'ve polled them."',
        responses: {
          kind: ["Mean every word of it", "Say it back"],
          playful: "Ask which version said it",
          bold: "Say it first",
          neutral: "Hold the silence with {him}",
        },
      },
      {
        line: "{He} isn't managing anyone or performing anything, which is the most extraordinary thing {he}'s done.",
        approach: "Turn out the lights",
        greeting: [
          '"Come to bed. The lights are down and I\'m all out of brilliance."',
          '"Undress me. No, slowly. I\'m a performer, I have standards."',
        ],
        responses: {
          kind: "Set the pen down for {him}",
          playful: "Applaud like it's a show",
          bold: "Name what this really is",
          neutral: "Let the quiet stretch out",
        },
      },
      {
        line: "{He} falls asleep first for once, and doesn't apologize for it.",
        approach: "Come to bed",
        greeting:
          '"...Sorry. I was going to say something clever first. Stay anyway."',
        responses: {
          kind: "Let {him} finally rest",
          playful: "Tease {him} for falling asleep",
          bold: "Watch {his} guard come down",
          neutral: "Say nothing",
        },
      },
    ]),
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool. Pronouns are `{he}`/`{his}` tokens, filled off the
  // encounter's outfit (winnerLinePronouns), since a casual encounter is Venus;
  // response labels stay pronoun-free.
  winnerLines: {
    new: [
      '"A new face." **{name}** looks up from the budget for {user} and doesn\'t look back down.',
      "{user} calls {his} name, and **{name}** turns the charisma on like a stage light.",
      '"Come on over." **{name}** greets {user} as though their schedule weren\'t already full.',
      '**{name}** looks up from a stack of schedules and smiles at {user}. "Hey there. What can I do for you?"',
    ],
    known: [
      '"Twice now, cutie." **{name}** isn\'t the least bit surprised to see {user} again.',
      "{user} waves hello, and **{name}** sets {his} pen down like {he}'d been looking for an excuse.",
      "\"You're here again. That's dangerous for my schedule.\" **{name}** makes time for {user} anyway.",
    ],
    warm: [
      '"You\'re back!" **{name}** spots {user} and forgets whatever {he} was signing.',
      "{user} calls out, and **{name}** folds the schedule away mid-revision.",
      "\"I'm heading out for a drive later. Want to come along, cutie?\" **{name}** asks {user} like the seat's already saved.",
    ],
    spark: [
      "**{name}** hears {his} name, and the professional smile becomes a real one for {user}.",
      '**{name}** walks over to {user} anyway. "Proposal, schedule, budget... and yet here I am."',
      "{user} calls out early and catches **{name}** already looking {user}'s way.",
    ],
    close: [
      "**{name}** drops the stage presence for {user}, right there in the middle of everyone.",
      '"The rest can wait till tomorrow. You\'re with me." **{name}** says it to {user}, quietly firm.',
      "{user} calls, and **{name}** clocks out.",
    ],
    bound: [
      '"No audience," **{name}** murmurs, reaching {user}. "Only you."',
      "**{name}** hands the **{house}** program to Mio without explaining. {user} called.",
      "{user} calls {his} name, and every version of **{name}** answers to it.",
    ],
  },
};
