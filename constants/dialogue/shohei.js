export default {
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
      '"Call me Sho, Senpai. Not Shohei — nobody calls me Shohei."',
      "The truck is slammed and he still waves you to the front of the line.",
    ],
    warm: [
      "He greets you with a warm smile, already thinking about how to make your day better.",
      "Your order goes on the moment he spots you coming down the street.",
      "He hands you something hot to hold before he says a single word.",
      "He's scribbled a new recipe on the back of a receipt. He wants to know what you'd change.",
      "\"Pit's on again? I'm done with that already. They're all normies — what's the point? Stay here, eat.\"",
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
      '"You hungry? Wrong question — everyone\'s hungry. Sit down."',
      "\"First time at the truck? I'm Sho — not Shohei, just Sho. And you don't get to order, I'll pick,\" he says with a smirk.",
      '"What\'re you looking at? ...Crap, that came out rude. You hungry or what?"',
      '"No charge for first-timers. House rule. My house, my rule."',
    ],
    known: [
      '"Oh, hey, Senpai! I was wondering if you\'d come by today."',
      '"Not the spicy one, right? See — I remembered."',
      "\"Try this. Don't tell me what you think until you've had three bites, Senpai.\"",
      '"You always look like you skipped lunch, Senpai. Sit down."',
      "\"What's Mido texting me for? 'Come to the pit,' spelled three ways, none right. Pfft. What the hell is this, some kinda secret code?\"",
    ],
    warm: [
      '"Senpai, I\'m always happy to see you around."',
      "\"Pit's on again? I'm done with that — bunch of normies. Sit. Eat. Complain about your day.\"",
      '"I named it after you. The dish, I mean. Don\'t make it weird, Senpai."',
      "\"Took Bonnie out this morning — my bike. Anomaly's got a mind of her own. Runs sweet when it's cool like this.\"",
      "\"Stay till close, Senpai? I'll feed you twice. That's the deal.\"",
    ],
    spark: [
      '"Here — open, Senpai. ...Good, right? Wait, why are you looking at me like that?"',
      '"Senpai, I — okay, I\'m just gonna say it. I like you. A lot. A LOT."',
      '"Hold the knife like this. No — here, let me. ...Sorry. Not sorry."',
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
      "\"You're wearing my shirt, Senpai. I'm — okay, I need a second. That's really working for me.\"",
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
      '**{name}** turns on {user} with a knife still moving and a grin that doesn\'t match the street. "Senpai? You know me?"',
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
