// Shohei's bond scenes, read as DIALOGUE.shohei.bondScenes
// (constants/dialogue/shohei.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Sho's mouth arrives before he
// does and the care arrives right behind it: he teases you and feeds you in
// the same breath. The teasing IS the affection and is never a dig at her.
// He is mouthy about Leo, about his brother's surname and about himself, and
// never once unkind to her; canon's tell is "I'll warm you up. Pfft... I was
// kidding, don't get mad." Tease, then immediately soften. Kind is what
// reaches him, because nobody checks on the one who cooks. Food is the love
// language throughout; by Devoted it's touch.
//
// He types fast and fluent in mixed case (never all-lowercase), caps for
// emphasis, no full stops, short lines, and "u"/"ur", "lol", "rn", "tho" —
// per reference/shohei.md's "Texting style" notes ("Same as Leo"). No typos:
// he is the one who makes fun of Alan's ("come tot hr epuit... Pfft."). Only
// his typed DMs follow those rules; in-person `> ` speech and narration keep
// normal punctuation.
//
// He calls her Senpai, the way he does all through his `dialogue` pool below.
// Lowercase when he's typing, capitalised when he speaks. The word carries its
// own arc: a joke about her being a year up at Acquaintance, and by Soulbound
// the thing his bound-tier line calls "low and private and entirely
// differently". Every scene should land it at least once.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: oi senpai\n\nu eat today? and don't say yeah if it was a vending machine\n\nthat's not eating, that's damage control",
      "look, I'm not being weird about it\n\nI do a big cook Thursdays and there's always way too much because I can't scale a recipe down, it's a whole thing, don't ask\n\nyou've been around {timesMet} times and every single time u look like you've been running on nothing\n\nit's bugging me, just come eat something",
    ],
    faces: { 0: "smile", 1: "annoyed" },
    choice: {
      prompt: "and don't go making excuses about it either, just show up",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'd like that",
          style: 3,
          close:
            "…cool\n\n*Then, immediately:* don't make it a thing, it's leftovers\n\n*It is not leftovers. There's a second bowl already set out when you get there.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Defend the vending machine",
          style: 1,
          close:
            "geez\n\nGEEZ\n\nthat's not food, that's a hostage situation with a wrapper on it\n\nThursday, at 7, I'm not asking twice",
        },
        {
          key: "bold",
          face: "sweat",
          label: "Ask what he's making",
          style: 4,
          close:
            "why, u gonna have opinions?\n\n…ask me again when u get here, I'll make the one u like, I've been paying attention\n\n*A beat, like he heard himself say it.*\n\n…pfft forget I said that",
        },
      ],
    },
    keepsake: {
      emoji: "🍜",
      line: "A second bowl set out before you'd said you were coming.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: senpai\n\nI asked half the house to come on that diner run today\n\nsuddenly everybody's got somewhere to be",
      "then there's u\n\ndidn't even ask what we were getting into, just showed up and gave me {favResponse} the whole walk back like it was the best part of ur day",
      "so I gotta ask\n\nis this a u like me thing? cuz that'd explain a lot",
    ],
    faces: { 0: "annoyed", 1: "smile", 2: "full_smile" },
    choice: {
      prompt: "lol relax, I'm kidding. thx for coming tho, for real",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you like his company",
          style: 3,
          close:
            "ok that's worse, I can't even tease u about that one\n\nsame time next week. ur not getting out of it",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say he owes you a meal",
          style: 1,
          close:
            "knew it\n\nfine, u earned a plate\n\nsame deal next week, right?",
        },
        {
          key: "bold",
          face: "surprise_blush",
          label: "Ask if he wants it to be",
          style: 4,
          close:
            "geez, senpai\n\nwhat kinda question is that\n\nnot answering that over text",
        },
      ],
    },
    keepsake: {
      emoji: "📦",
      line: "The diner run half the house was suddenly too busy for.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: truck\n\n2am\n\ndon't tell anybody, I mean it",
      "*The food truck is shut, the shutter's down, and he's inside with one light on and something going on the burner that smells nothing like what he sells.*\n\n> This is the one I actually cook. Not the menu stuff. Menu stuff is for the money and the line out front and Leo's cut for building the app. This one's just mine.",
      "> It's not on any menu and it's not written down. Just something I've been making since before Darkwick, and I've never handed it to anybody.\n\n*He puts the bowl in front of you and immediately looks somewhere else.*\n\n> So, yeah. Don't say anything nice or I'm throwing you out. Just eat it while it's hot, Senpai. I've been keeping it warm twenty minutes waiting on you.",
    ],
    faces: { 0: "serious", 1: "close", 2: "sweat" },
    choice: {
      prompt: "...Well? Say something. Not that. Something else.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him it's the best thing",
          style: 3,
          close:
            "*He turns all the way around to face the burner so you can't see him.*\n\n> ...Yeah, all right.\n\n*He doesn't turn back for a while. When he does his ears are red and he blames the steam.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask for the recipe",
          style: 1,
          close:
            "> Absolutely not.\n\n> ...I'll make it. Whenever. That's better than the recipe anyway. You'd wreck it, you don't own one decent pan.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask why you get this one",
          style: 4,
          close:
            "*He goes quiet, which is the rarest thing he does.*\n\n> Because you're the only one who ever asks if *I've* eaten, Senpai.\n\n*he says, at the wall.*\n\n> Everybody else just holds a bowl out. You've done it four times. I counted. That's embarrassing, so shut up.",
        },
      ],
    },
    keepsake: {
      emoji: "🍲",
      line: "The one dish he actually cooks, that isn't written down anywhere.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: ok so u know who my brother is",
      "everybody knows. has since day one, and they all do the same thing, that little recalculation where they work out how to talk to me now\n\nhalf this house thinks I'm here on his name, other half thinks I'm here to spy for him\n\nI cook, I get in fights, I show up when people need something, and none of it counts because of the surname",
      "u never did that, not once\n\nfirst person who didn't, and I'd been waiting on it for two years, so I noticed the exact second it didn't happen\n\nthat's it, that's the message\n\nsorry it's a downer, I'm normally way more fun than this",
    ],
    faces: { 0: "serious", 1: "annoyed", 2: "sweat" },
    choice: {
      prompt: "alright, say something so this stops being weird",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say it's his own name",
          style: 3,
          close:
            "*There's a long gap.*\n\n…say that to Leo next time he's being a jerk about it\n\nactually don't, actually I wanna have said it myself\n\nthanks senpai, seriously, don't make me say it twice",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say you forgot he had one",
          style: 1,
          close:
            "u did NOT forget\n\n…u might've actually forgotten\n\nlol that's insane, that's the best thing that's happened to me all week and it's just u having a bad memory",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask who he'd be without it",
          style: 4,
          close:
            "*The reply takes a long time.*\n\ndunno, never got to find out\n\n*Then:* …some guy who cooks for u at 2am maybe\n\nyeah, I'd take that",
        },
      ],
    },
    keepsake: {
      emoji: "🛻",
      line: "The truck at 2am with the shutter down and one light on.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: don't come by the truck tomorrow\n\nface is a mess rn\n\nit's fine, it's not a big one",
      "*You ask. He caves in about four seconds, because he always does.*\n\nLeo said something about u, in front of people\n\nand I've let him say a thousand things about me and never once cared, so I know exactly how this looks\n\nbut that one wasn't about me, was it",
      "Mido already got me for it\n\nweek off the truck, which… fine, whatever\n\nwould do it again tho, wouldn't even think about it\n\ndidn't think about it the first time, that's the whole problem, hands were already moving",
    ],
    faces: { 0: "sweat", 1: "annoyed", 2: "serious" },
    choice: {
      prompt: "go on then, chew me out, everybody else has",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Ask to see the damage",
          style: 3,
          close:
            "*He video calls before you've finished typing, and it's worse than he said, and he's grinning through it like an idiot.*\n\n> See? Nothing. Barely even... ow. Okay. Slight something.\n\n*He lets you talk him into ice and stays on the call while you watch him hold it there, complaining the whole time and not hanging up.*",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if Leo looks worse",
          style: 1,
          close:
            "Pfft, Leo looks like he lost a fight with the curb\n\n…don't tell Mido I said that\n\nor do, he'll act furious for about a minute and then laugh about it in the garage where he thinks nobody can hear him",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say you'd have done it too",
          style: 4,
          close:
            "…don't say stuff like that senpai, I'll get ideas\n\n*He turns up at your place an hour later with food, one eye swollen shut, and hands the bag over before he says anything.*\n\n*Then he just stands there. Then he puts his forehead down on your shoulder and stays there, and doesn't say another word for a while.*",
        },
      ],
    },
    keepsake: {
      emoji: "🥊",
      line: "A week off the truck he'd have taken again without thinking.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: ok\n\nshutter's down, truck's shut, nothing in my hands to keep me busy, so I'm doing this",
      "{timesMet} times you've come by\n\nI've cooked for u… I dunno, most of them\n\nI don't cook for people, I cook for *money* and I cook for the house because somebody's gotta\n\nur the only person I've ever cooked for because I wanted to watch u eat it",
      "and I know what I am, all right\n\nmouth on me, I get in fights, I'm loud, got a surname that walks into every room ahead of me. there's easier people to pick\n\nbut u keep asking if I've eaten. two years here and ur the only one who ever has\n\nit's such a stupid small thing to fall apart over and I did anyway, ages ago, and I've been pretending I didn't",
      "I've called u senpai about four thousand times\n\nstarted because ur a year up on me and it was funny. stopped being funny a long time ago\n\nkept saying it anyway because it was the only way I had of saying the other thing without saying it\n\nso: I love u, senpai. no clever version. since about the third bowl\n\nI've been cooking at u instead of telling u because that was easier. I'm a coward about exactly one thing",
    ],
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt: "say whatever, I'll be fine, I'm always fine",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "…ur kidding\n\nur not kidding, okay, all right, don't move\n\n*The shutter goes up eight minutes later with him under it, still in his apron, having clearly sprinted the whole way and refusing to admit it.*\n\n*He takes your jaw in both hands (flour on them, of course there's flour on them) and kisses you like he's been holding onto it since the third bowl, which he has.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "yeah, sure, take forever, I don't care\n\nthat's not me playing it cool, I'm bummed. but I'd be way more bummed if u said something u didn't mean because I put u on the spot at one thirty in the morning\n\nThursday's still on. Thursday was never about this. I'd still be feeding u if u told me to get lost, that's just how it is",
        },
      ],
    },
    keepsake: {
      emoji: "🍳",
      line: "The apron he was still wearing when he ran the whole way.",
    },
  },
};
