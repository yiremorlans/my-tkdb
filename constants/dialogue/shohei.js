export default {
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
  // per reference.md's "## Bond Scenes" notes ("Sho - same as Leo"). No typos:
  // he is the one who makes fun of Alan's ("come tot hr epuit... Pfft."). Only
  // his typed DMs follow those rules; in-person `> ` speech and narration keep
  // normal punctuation.
  //
  // He calls her Senpai, the way he does all through his `dialogue` pool below.
  // Lowercase when he's typing, capitalised when he speaks. The word carries its
  // own arc: a joke about her being a year up at Acquaintance, and by Soulbound
  // the thing his bound-tier line calls "low and private and entirely
  // differently". Every scene should land it at least once.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: oi senpai\n\nu eat today? and don't say yeah if it was a vending machine\n\nthat's not eating, that's damage control",
        "look, I'm not being weird about it\n\nI do a big cook Thursdays and there's always way too much because I can't scale a recipe down, it's a whole thing, don't ask\n\nyou've been around {timesMet} times and every single time u look like you've been running on nothing\n\nit's bugging me, just come eat something",
      ],
      choice: {
        prompt: "and don't go making excuses about it either, just show up",
        options: [
          {
            key: "kind",
            label: "Say you'd like that",
            style: 3,
            close:
              "…cool\n\n*Then, immediately:* don't make it a thing, it's leftovers\n\n*It is not leftovers. There's a second bowl already set out when you get there.*",
          },
          {
            key: "playful",
            label: "Defend the vending machine",
            style: 1,
            close:
              "geez\n\nGEEZ\n\nthat's not food, that's a hostage situation with a wrapper on it\n\nThursday, at 7, I'm not asking twice",
          },
          {
            key: "bold",
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
        "**{firstName}**: ok so I noticed something and it's bugging me",
        "I'm not like this with anybody else, that's the thing I noticed\n\neverybody else in this house I'm either arguing with or waiting for them to leave, it's just my default\n\nLeo says I look like every conversation's about to go bad, he's not wrong\n\nthen u show up and I'm just fine, easy, not bracing for anything\n\nu come at me with {favResponse}, I hand it back, costs me nothing\n\na year here and ur the only one that's true, senpai",
      ],
      choice: {
        prompt: "so what's that about? because I didn't do it on purpose",
        options: [
          {
            key: "kind",
            label: "Say you feel it too",
            style: 3,
            close:
              "…yeah?\n\n*A long pause.*\n\nokay, cool, that's… yeah, that's good actually\n\n*Then, way too fast:* anyway what're u eating tonight",
          },
          {
            key: "playful",
            label: "Tell him he's gone soft",
            style: 1,
            close:
              "I have NOT gone soft\n\n…okay I made u lunch twice this week and u didn't ask either time\n\nPfft, fine, don't tell Leo, he'll be unbearable about it for a year",
          },
          {
            key: "bold",
            label: "Say he seeks you out",
            style: 4,
            close:
              "I do not seek u out… okay, the diner thing, and the packaging thing, and the boxes\n\nyeah all right, I didn't need help with any of those\n\nu don't gotta make excuses to hang out with me, y'know, goes both ways\n\njust ask, senpai",
          },
        ],
      },
      keepsake: {
        emoji: "🥢",
        line: "Two years in, and the first person he never had to brace for.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: truck\n\n2am\n\ndon't tell anybody, I mean it",
        "*The food truck is shut, the shutter's down, and he's inside with one light on and something going on the burner that smells nothing like what he sells.*\n\n> This is the one I actually cook. Not the menu stuff. Menu stuff is for the money and the line out front and Leo's cut for building the app. This one's just mine.",
        "> It's not on any menu and it's not written down. Just something I've been making since before Darkwick, and I've never handed it to anybody.\n\n*He puts the bowl in front of you and immediately looks somewhere else.*\n\n> So, yeah. Don't say anything nice or I'm throwing you out. Just eat it while it's hot, Senpai. I've been keeping it warm twenty minutes waiting on you.",
      ],
      choice: {
        prompt: "...Well? Say something. Not that. Something else.",
        options: [
          {
            key: "kind",
            label: "Tell him it's the best thing",
            style: 3,
            close:
              "*He turns all the way around to face the burner so you can't see him.*\n\n> ...Yeah, all right.\n\n*He doesn't turn back for a while. When he does his ears are red and he blames the steam.*",
          },
          {
            key: "playful",
            label: "Ask for the recipe",
            style: 1,
            close:
              "> Absolutely not.\n\n> ...I'll make it. Whenever. That's better than the recipe anyway. You'd wreck it, you don't own one decent pan.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "alright, say something so this stops being weird",
        options: [
          {
            key: "kind",
            label: "Say it's his own name",
            style: 3,
            close:
              "*There's a long gap.*\n\n…say that to Leo next time he's being a jerk about it\n\nactually don't, actually I wanna have said it myself\n\nthanks senpai, seriously, don't make me say it twice",
          },
          {
            key: "playful",
            label: "Say you forgot he had one",
            style: 1,
            close:
              "u did NOT forget\n\n…u might've actually forgotten\n\nlol that's insane, that's the best thing that's happened to me all week and it's just u having a bad memory",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "go on then, chew me out, everybody else has",
        options: [
          {
            key: "kind",
            label: "Ask to see the damage",
            style: 3,
            close:
              "*He video calls before you've finished typing, and it's worse than he said, and he's grinning through it like an idiot.*\n\n> See? Nothing. Barely even... ow. Okay. Slight something.\n\n*He lets you talk him into ice and stays on the call while you watch him hold it there, complaining the whole time and not hanging up.*",
          },
          {
            key: "playful",
            label: "Ask if Leo looks worse",
            style: 1,
            close:
              "Pfft, Leo looks like he lost a fight with the curb\n\n…don't tell Mido I said that\n\nor do, he'll act furious for about a minute and then laugh about it in the garage where he thinks nobody can hear him",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "say whatever, I'll be fine, I'm always fine",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "…ur kidding\n\nur not kidding, okay, all right, don't move\n\n*The shutter goes up eight minutes later with him under it, still in his apron, having clearly sprinted the whole way and refusing to admit it.*\n\n*He takes your jaw in both hands (flour on them, of course there's flour on them) and kisses you like he's been holding onto it since the third bowl, which he has.*",
          },
          {
            key: "held",
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
  },
  dialogue: {
    new: [
      "The truck's hatch is up and something smells incredible. He waves you over before you've decided anything.",
      "His face lights up when he sees you. There's something genuinely kind in his eyes.",
      "He's got a knife moving fast and a grin that doesn't match this neighborhood at all.",
      '"Give me thirty seconds," he calls over the fryer. "You\'re gonna want this hot."',
      '"Huh? Was that your stomach? You hungry?" He\'s already reaching for a pan. "Sit down."',
    ],
    known: [
      "He's started making enough for two without thinking about it.",
      "He remembers you don't like the spicy one. He made the other one.",
      "There's a portion already boxed, your name scrawled on the lid in marker.",
      '"Call me Sho, Senpai. Not Shohei. Nobody calls me Shohei."',
      "The truck is slammed and he still waves you to the front of the line.",
    ],
    warm: [
      "He greets you with a warm smile, already thinking about how to make your day better.",
      "Your order goes on the moment he spots you coming down the street.",
      "He hands you something hot to hold before he says a single word.",
      "He's scribbled a new recipe on the back of a receipt. He wants to know what you'd change.",
      "\"Pit's on again? I'm done with that already. They're all normies, what's the point? Stay here, eat.\"",
    ],
    spark: [
      "He feeds you a bite off his own fork and only afterward realizes what he did.",
      "He ties your apron for you and takes an unreasonable amount of time about it.",
      "The hatch is down, the truck is warm, and he's stopped pretending to be busy.",
      "He guides your hands on the knife from behind, and neither of you is thinking about onions.",
      "He goes scarlet to the ears and keeps cooking as though absolutely nothing happened.",
    ],
    close: [
      '"You mean so much to me," he says earnestly. "I hope you know that by now."',
      "He's made your favorite. He'll pretend it was a coincidence. It wasn't.",
      "Your name is on the truck's board as a permanent item. He won't take it down.",
      "He cooks for you last, after everyone's gone, and it's always better than what they got.",
      "The whole rough exterior Vagastrom demands just... isn't there when it's you.",
    ],
    bound: [
      "He makes you breakfast in his shirt and is far too pleased with the whole picture.",
      "He kisses your shoulder on his way past the stove, every single time, without thinking.",
      "You prep the truck together at dawn now. He hums the entire time.",
      '"Senpai" has become something he says low and private and entirely differently.',
      "He holds you from behind while something simmers and neither of you moves for a while.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Oh, Senpai. What brings you by?"',
      '"You hungry? Wrong question. Everyone\'s hungry. Sit down."',
      "\"First time at the truck? I'm Sho, not Shohei, just Sho. And you don't get to order, I'll pick,\" he says with a smirk.",
      '"What\'re you looking at? ...Crap, that came out rude. You hungry or what?"',
      '"No charge for first-timers. House rule. My house, my rule."',
    ],
    known: [
      '"Oh, hey, Senpai! I was wondering if you\'d come by today."',
      '"Not the spicy one, right? See, I remembered."',
      "\"Try this. Don't tell me what you think until you've had three bites, Senpai.\"",
      '"You always look like you skipped lunch, Senpai. Sit down."',
      "\"What's Mido texting me for? 'Come to the pit,' spelled three ways, none right. Pfft. What the hell is this, some kinda secret code?\"",
    ],
    warm: [
      '"Senpai, I\'m always happy to see you around."',
      "\"Pit's on again? I'm done with that, bunch of normies. Sit. Eat. Complain about your day.\"",
      '"I named it after you. The dish, I mean. Don\'t make it weird, Senpai."',
      "\"Took Bonnie out this morning, my bike. Anomaly's got a mind of her own. Runs sweet when it's cool like this.\"",
      "\"Stay till close, Senpai? I'll feed you twice. That's the deal.\"",
    ],
    spark: [
      '"Here. Open, Senpai. ...Good, right? Wait, why are you looking at me like that?"',
      '"Senpai, I... okay, I\'m just gonna say it. I like you. A lot. A LOT."',
      '"Hold the knife like this. No, here, let me. ...Sorry. Not sorry."',
      '"I closed early. First time ever. Do the math on that one, Senpai."',
      "\"I think about you when I'm cooking. That's most of the day, so.\"",
    ],
    close: [
      "\"Senpai... I'm really glad you're here. You know that, right?\"",
      "\"You're on the board. Permanently. I'm not discussing it.\"",
      '"Everyone gets fed. You get fed properly, Senpai. There\'s a difference."',
      '"If anything happens, come find me. Any hour, Senpai. I mean it."',
      '"Stay till closing, Senpai? I\'d like the company. Yours, specifically."',
    ],
    bound: [
      "\"Morning, Senpai. Don't get up. I'll bring it to you.\"",
      "\"You're wearing my shirt, Senpai. I'm... okay, I need a second. That's really working for me.\"",
      '"I love you, Senpai. Sorry, I say it a lot now. I\'m not actually sorry."',
      '"Come prep with me, Senpai. Dawn shift. It\'s freezing and I want you there anyway."',
      '"Truck\'s closed tomorrow. I closed it. Guess why."',
    ],
  },
  approach: {
    new: [
      "Take a seat at the counter",
      "Let him pick",
      "Wait thirty seconds",
      "Order something",
    ],
    known: [
      "Take the front of the line",
      "Have three bites",
      "Be the taste test",
      "Take the boxed portion",
    ],
    warm: [
      "Sit, eat, complain",
      "Stay till close",
      "Try the new recipe",
      "Take it off the heat",
    ],
    spark: [
      "Let him guide your hands",
      "Open",
      "Notice he closed early",
      "Let him tie the apron",
    ],
    close: [
      "Stay till closing",
      "Eat what he saved",
      "Read the board",
      "Go straight to him",
    ],
    bound: ["Don't get up", "Come prep at dawn", "Wear his shirt", "Guess why"],
  },
  responses: {
    kind: {
      new: [
        "Thank him properly",
        "Call him Sho, not Shohei",
        "Tell him it's delicious",
      ],
      spark: [
        "Tell him you like him too",
        "Say his cooking means care",
        "Let him tie the apron",
      ],
      close: [
        "Tell him you see past the act",
        "Thank him for the board",
        "Tell him to eat something too",
      ],
      bound: [
        "Say it back",
        "Let him bring you breakfast",
        "Kiss his shoulder in passing",
      ],
    },
    playful: {
      new: [
        "Give it right back",
        "Ask for seconds shamelessly",
        "Tease him about the apron",
      ],
      spark: [
        "Feed him a bite back",
        "Make him say it twice",
        "Rate his knife skills",
      ],
      close: ["Turn it into a joke", "Demand a new dish", "Rename the special"],
      bound: [
        "Wear his shirt on purpose",
        "Let the food burn",
        "Guess wrong on purpose",
      ],
    },
    bold: {
      new: [
        "Order the spicy one anyway",
        "Hold his gaze",
        "Hop on the bike with him",
      ],
      spark: [
        "Kiss the flour off his cheek",
        "Pull him in by the apron",
        "Say it first",
      ],
      close: [
        "Ask to ride with him at night",
        "Ask him to close early",
        "Tell him you'd stay till dawn",
      ],
      bound: [
        "Pull him away from the stove",
        "Kiss him quiet",
        "Climb on the bike behind him",
      ],
    },
    neutral: {
      new: ["Simply be there", "Eat in comfortable quiet", "Let him cook"],
      spark: ["Let him panic", "Keep chopping", "Change the subject"],
      close: [
        "Be present for him",
        "Stay through the cleanup",
        "Keep him company",
      ],
      bound: ["Let him cook", "Prep in easy silence", "Stay curled up"],
    },
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** glances over, then back at what his hands are doing. "You got my name right. Congrats." {user} had only called out.',
      "{user} says the name, and **{name}** waves them over before deciding anything else.",
      '"Sho. Just Sho." **{name}** corrects {user} cheerfully and hands them something hot.',
    ],
    warm: [
      "\"Senpai!\" **{name}** has {user}'s order on before they've finished crossing the road.",
      "{user} calls out, and **{name}**'s whole face does the thing it does.",
      "**{name}** was closing up. He is now, somehow, cooking for {user}.",
    ],
    spark: [
      '"Say it again, Senpai." **{name}** is grinning at {user} like he won something.',
      "{user} says the name, and **{name}** forgets the pan entirely.",
      "**{name}** wipes his hands twice on the way to {user}. He wanted them clean.",
    ],
    close: [
      "**{name}** hears {user} and leaves the truck running. Somebody else's problem.",
      "\"Don't move, Senpai. I'm coming to you.\" **{name}** is already halfway to {user}.",
      "{user} calls, and **{name}** kisses their temple on the way past without thinking about it.",
    ],
    bound: [
      '"I love you, Senpai. Yeah, I say it a lot now." **{name}** tells {user} he isn\'t sorry.',
      "**{name}** was humming. {user} calling his name made it considerably worse.",
      "{user} says the name, and **{name}** decides the **{house}** shift can run itself tonight.",
    ],
  },
};
