import { withPronounVariants } from "./_shared.js";
import bondScenes from "../bondScenes/jo.js";

export default {
  // Level-up DMs: constants/bondScenes/jo.js.
  bondScenes,
  dialogue: {
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
      // candidate from close
      // Bound version: he stops listing tasks entirely and pulls you in, so the budget never comes up again.
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
      // candidate from close
      // Bound version: the credits roll and neither of you moves, and he's long since stopped pretending he'll go back to his own work. The common room would also come out.
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
      // candidate from close
      // Bound version: the house stopped asking where you were last night a while ago. This fits Devoted's "not a secret anymore".
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
      // candidate from close
      // Bound version: the door's open for you at any hour, and he doesn't pretend it's for anyone else. The fixture would need reworking.
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
