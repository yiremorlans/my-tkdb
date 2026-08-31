// Authored content for every character, keyed by the ids in
// constants/characters.js. Kept separate from the character records so dialogue
// can grow — many lines per tier — without bloating character configuration,
// which is close to static by comparison.
//
// Each tier is a collection; one line is picked at random per encounter (see
// getRandomDialogueLine). `dialogue` tiers are normally string arrays, but may
// instead be keyed by image variant where a character's lines differ by outfit
// (Jo's pronouns change between uniform and casual).
//
// `approach` holds the label for the single button on the /roam narration
// message — the "Step forward" beat before the character is actually drawn. It
// is tiered like the dialogue so the invitation matches the scene the narration
// just set. A character omitted here falls back to the generic
// APPROACH_LABEL_FALLBACK in constants/characters.js.
//
// `responses` holds the button labels offered to the player. Only two tiers are
// stored: "close" and everything before it. Each slot is a collection, picked
// from at random like the dialogue, so a character the player sees often does
// not always get the same four buttons. A character omitted here, or missing
// a response type, falls back to archetype defaults in constants/characters.js —
// constants/validateContent.js reports any such gap at startup.
//
// Conditional pools (all optional, all per character):
//   `dialogueWhen`   → adds narration lines   (merged into `dialogue`)
//   `approachWhen`   → adds step-forward labels (merged into `approach`)
//   `responsesWhen`  → adds response-button labels (merged into `responses`,
//                      so its inner shape is { kind|playful|bold|neutral: { tier: [...] } })
// Each is a list of `{ when, <pool> }` blocks. Every field in `when` (time /
// location / background / event — see DIALOGUE_WHEN_DIMENSIONS in characters.js)
// is optional and ANDed; scalar or array. A matching block's lines are *added*
// to the base pool for that pick — never replace it. `SHARED_DIALOGUE_WHEN` and
// `SHARED_APPROACH_WHEN` are the same shape but apply to every character
// (roster-wide event greetings, generic scene flavor). There is no shared
// responses layer — a bespoke choice is always character-specific.

export const SHARED_DIALOGUE_WHEN = [
  // Whole-roster evening flavor for the general-location PM scenes, where an
  // encounter can be with anyone and most characters have no evening lines of
  // their own. Character-specific `dialogueWhen` blocks stack on top of this.
  {
    when: { time: "evening", location: ["Darkwick", "Galaxy Express", "Clementia"] },
    dialogue: {
      new: [
        "The path lamps have come on. Whoever's still out here, it's just the two of you now.",
        "Campus has gone quiet and low-lit. Footsteps carry further than they did at noon.",
      ],
      known: [
        "You fall into step together without discussing it. The lamps mark the way back.",
      ],
    },
  },
  // Event blocks (e.g. `when: { event: "star_festival" }`) slot in here once an
  // event system sets `ctx.event`. `Star_Festival` already works as a `location`.
];

export const SHARED_APPROACH_WHEN = [
  {
    when: { time: "evening", location: ["Darkwick", "Galaxy Express", "Clementia"] },
    approach: {
      new: ["Head in out of the dark", "Fall into step with them"],
    },
  },
];

export const DIALOGUE = {
  jin: {
    dialogue: {
      new: [
        "The frost never bothered him. That you walked into Frostheim uninvited is another matter.",
        "He doesn't turn to look at you. The cold in the room sharpens anyway.",
        "Frostheim's captain is holding court with no one at all. He notices you, and says nothing.",
        "He weighs you the way one weighs a servant he did not hire — quickly, and without much interest.",
        "Ice creeps along the window frame beside him. He lights a cigarette and waits for you to explain yourself.",
      ],
      known: [
        "He recognizes you now. He makes a point of not showing it.",
        '"You again," he says, and returns to his cigarette. He doesn\'t call you trash this time.',
        "Twice this week. He's noticed. He would deny having counted.",
        "The dismissal comes a beat slower than it used to.",
        "He looks up, places you, and looks back down. From Jin, that is nearly a greeting.",
      ],
      warm: [
        "He almost looks pleased when he sees you coming — almost.",
        "He keeps speaking to whoever's in front of him, but the door stays open behind them.",
        "The room is still freezing. Somehow the chair nearest to him is not.",
        "He's already turned toward the sound of your footsteps by the time you round the corner.",
        '"You took the long way," he notes, without looking up. He\'d been counting.',
      ],
      spark: [
        "He allows you nearer than he allows anyone, and dares you to remark on it.",
        "He adjusts your collar without asking. His hand stays a moment past necessary.",
        "\"Don't move,\" he says quietly, and takes his time about whatever he's looking at.",
        "The cold doesn't reach you when you stand this close. He arranged that.",
        "He says your name once, low, and appears annoyed at how it came out.",
      ],
      close: [
        'The ice in his voice is long gone around you. "I was hoping I\'d run into you."',
        "He dismisses the others with a flick of his hand the moment he sees you.",
        "For once he isn't performing for anybody. He just looks glad.",
        '"You\'re late," he says, and the complaint has no teeth in it at all.',
        "He sets down whatever he was holding. Whatever it was, it can wait now.",
      ],
      bound: [
        "The door closes and every ounce of composure goes with it.",
        "He wakes before you and stays exactly where he is rather than disturb you.",
        '"Mine," he says against your throat, like a fact he\'s tired of not saying aloud.',
        "He kisses you like it's a thing he's owed and has waited far too long to collect.",
        "Frostheim is freezing. His bed is not. He has opinions about you leaving it.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            "He hasn't turned on a light. The cold has teeth after dark and he seems to prefer it that way.",
            '"Frostheim after dark is mine," he says without turning. "You\'re standing in it."',
            "Frost has crept across the balcony doors behind him. He watches the black campus like he owns the view.",
            '"The cold gets worse after sundown," he says. "You knew that, and came anyway."',
          ],
          known: [
            '"Late," he observes. He doesn\'t say for what, and doesn\'t tell you to leave either.',
            "The cold doesn't reach the spot he's left open beside him. He arranged that before you arrived.",
            '"It\'s late," he says. "Stand somewhere useful and don\'t let the cold in."',
          ],
          warm: [
            '"Stay until the cold drives you in," he says. "Not before."',
            "He lights a cigarette against the dark and, for once, offers the rail beside him without a word.",
            '"Past curfew," he notes. "I won\'t report you. Sit down."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Step onto the dark balcony", "Meet him at the rail"],
          known: ["Take the cold beside him"],
          warm: ["Take the offered rail"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        "\"You're not supposed to be here. Don't waste my time.\"",
        '"Don\'t just stand there like an idiot. Hurry up."',
        '"Frostheim does not entertain wanderers. Explain yourself, servant."',
        '"Get to the point. The trash here is so long-winded."',
        '"Speak quickly. I am not in the habit of waiting."',
      ],
      known: [
        '"You. I remember you. Don\'t let it go to your head."',
        '"Still here? Then stand somewhere useful."',
        '"A class C anomaly? Miss me with that weak shit. Why do you think we have a Vice Captain?"',
        '"What? Your schedule\'s not my problem. Just arrange it around me."',
        '"Don\'t mistake familiarity for permission."',
      ],
      warm: [
        '"Your presence is... tolerable."',
        '"You again. Sit, if you must. Don\'t touch anything."',
        '"I did not summon you. But you may stay."',
        '"Hmph. At least you had the sense to come to me directly."',
        "\"Don't stand in the doorway. You're letting the cold out.\"",
      ],
      spark: [
        '"Closer. I dislike raising my voice."',
        "\"You've grown bold. I find I don't mind it.\"",
        '"Look at me when I\'m speaking to you. ...Yes. Like that."',
        '"Everyone in this room is watching. Let them."',
        '"You are the only one here I have any interest in. Take that as you like."',
      ],
      close: [
        '"I suppose I can make an exception for you."',
        '"Stand closer. The cold doesn\'t reach you here."',
        '"There is no one else I would allow to see me like this."',
        '"Say what you came to say. I\'ll listen. Only for you."',
        "\"I don't repeat myself. So hear this once: I'd rather you stayed.\"",
      ],
      bound: [
        '"Come back to bed. That was not a request."',
        '"Let them talk. You wear my name well."',
        '"Stay. I have spent my whole life being denied things. Not this."',
        '"Do that again. ...Slower."',
        '"You are the single indulgence I refuse to apologize for."',
      ],
    },
    approach: {
      new: [
        "Step into the cold",
        "Meet his eyes anyway",
        "Announce yourself",
        "Refuse to be dismissed",
      ],
      known: [
        "Let him place you",
        "Stand somewhere useful",
        "Speak while allowed",
        "Come back anyway",
      ],
      warm: [
        "Walk over to him",
        "Take the seat he left open",
        "Break the silence first",
        "Greet him properly",
      ],
      spark: [
        "Close the last step",
        "Hold his gaze",
        "Let him fix your collar",
        "Let them watch",
      ],
      close: [
        "Go to him",
        "Close the distance",
        "Say his name",
        "Let him see you smile",
      ],
      bound: [
        "Come back to bed",
        "Wear his name",
        "Kiss him first",
        "Refuse to leave",
      ],
    },
    responses: {
      kind: {
        new: [
          "Show respect for his pride",
          "Thank him for his time",
          "Address him the way he expects",
        ],
        spark: [
          "Let him hold your gaze",
          "Be gentle with his pride",
          "Lean in when he allows it",
        ],
        close: [
          "Acknowledge his pain without judgment",
          "Tell him he doesn't carry it alone",
          "Let the crown come off",
        ],
        bound: [
          "Stay where you are",
          "Touch his face",
          "Tell him he's allowed this",
        ],
      },
      playful: {
        new: [
          "Be bold enough for him",
          "Refuse to be impressed",
          "Call his bluff lightly",
        ],
        spark: [
          "Tease the ice",
          "Make him lose his composure",
          "Call him possessive",
        ],
        close: [
          "Tease him out of his shell",
          "Poke at his pride, gently",
          "Call him spoiled to his face",
        ],
        bound: [
          "Steal the warm side",
          "Make him ask nicely",
          "Wear his coat out",
        ],
      },
      bold: {
        new: [
          "Stand with confidence",
          "Meet him as an equal",
          "Refuse to look away",
        ],
        spark: [
          "Close the last inch",
          "Take his hand without asking",
          "Tell him you want this",
        ],
        close: [
          "Show him you won't break",
          "Take his hand first",
          "Tell him you're staying",
        ],
        bound: [
          "Pull him back down",
          "Say it against his mouth",
          "Tell him to be slower",
        ],
      },
      neutral: {
        new: [
          "Respect his space",
          "Wait for him to speak",
          "Say nothing at all",
        ],
        spark: [
          "Let the moment pass",
          "Look away first",
          "Say nothing, let him wonder",
        ],
        close: [
          "Sit with him in silence",
          "Stay within reach",
          "Let the quiet do the talking",
        ],
        bound: [
          "Let him sleep",
          "Lie still beside him",
          "Stay quiet in the dark",
        ],
      },
    },
  },

  kaito: {
    dialogue: {
      new: [
        'He flashes a big grin. "Lost, or just brave enough to wander into Frostheim?"',
        "Something crashes two rooms over. He jogs out, sees you, and forgets the crash entirely.",
        "He's mid-rant about something leaked on WickHive. You've just become the audience.",
        'He waves so hard he nearly takes out a lamp. "Hey! Hey, over here!"',
        "He spots you and brightens. \"You're new? Ask me anything you want to know — I'm pretty savvy when it comes to Darkwick.\"",
      ],
      known: [
        "He remembers your name and is far too pleased about it.",
        '"Hey — you! The one from the — yeah! You!"',
        "He tells you the same story twice and doesn't notice. You don't stop him.",
        "He's mid-dodge around a corner. \"Shit, it's Luca — he's going to train, I better bail before he ropes me in too... Oh. Just you. Phew.\"",
        "You've been upgraded from stranger to person Kaito yells at cheerfully.",
      ],
      warm: [
        "He nudges your shoulder like you're part of the Frostheim crew.",
        "He's already saved you a spot, and he's very obviously proud of himself for it.",
        '"There you are!" — like you\'d been the missing piece of his afternoon.',
        "He talks faster when you show up. Everyone in the room has noticed. He hasn't.",
        "He's rehearsing something to say to you, badly, when you walk in on him doing it.",
      ],
      spark: [
        "He goes bright red mid-sentence and forgets what the sentence was.",
        "He grabs your hand to drag you somewhere, then forgets to let go.",
        '"You\'re — okay, this is going to sound weird — you look really good today."',
        "He's rehearsing something in the corner. It's about you. It's going badly.",
        "He catches you when you stumble and doesn't set you back down immediately.",
      ],
      close: [
        '"Took you long enough," he grins, pulling you into a quick shoulder-bump hug.',
        "The grin drops for half a second — relief — before it comes roaring back.",
        "He starts talking mid-sentence, like the conversation never actually stopped.",
        '"Okay, don\'t laugh," he says, already laughing, "but I missed you."',
        "He'd been watching the door. He'll deny it. He was.",
      ],
      bound: [
        "He kisses you mid-sentence and forgets the sentence completely.",
        "He wakes you by being unable to stop looking at you, loudly, somehow.",
        "\"I still can't believe it's you,\" he says, tucked against your shoulder.",
        "He lifts you clean off the ground because he can and because you laughed.",
        "He's still red about all of it. He's never once wanted it to stop.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            "He's still in his training gear well after dark, breath fogging, hours past when he should have stopped.",
            '"You\'re out late — everything okay?" He relaxes when you nod. "Good. Stick to the lit paths."',
            "He's doing slow laps of the balcony in the dark and waves you over rather than break the rhythm.",
            '"It\'s late to be out here," he says. "Let me walk you back after, okay?"',
          ],
          known: [
            '"Night training," he says, a little sheepish. "You can spot me, if you want."',
            '"I always end up out here after curfew. It\'s quieter. Easier to think."',
            '"You should be inside by now," he says. "...So should I. Five more minutes."',
          ],
          warm: [
            '"Stay for a bit. It\'s cold, but the view\'s worth it after dark."',
            '"I kept hoping you\'d come by tonight," he admits. "Glad I waited."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Spot his night training", "Wave and fall into his laps"],
          known: ["Stay past curfew with him"],
          warm: ["Take the cold rail beside him"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        '"YO! Another fresh face! You lost or what?"',
        '"Whoa, hi! Careful, that step\'s — ah. Yeah. Everyone does that."',
        "\"You're new, right? I'm Kaito! That's — that's the whole intro, sorry.\"",
        '"Ask me anything you want to know! I\'m pretty savvy when it comes to Darkwick."',
        "\"Don't let the ice scare you off, it's not that bad once you're used to it!\"",
      ],
      known: [
        '"Hey, I know you! You\'re the one who — okay, I forgot. But I know you!"',
        '"You keep showing up. I like that in a person."',
        "\"Oh yeah, have you been on WickHive yet? Someone leaked next month's cafeteria menu! Oh.. wait, I-I already told you that, didn't I?\"",
        "\"You're getting the hang of this place, huh? Told you it wasn't so bad.\"",
        '"Okay, quiz — what\'s my name? HA! Correct!"',
      ],
      warm: [
        '"Hey, Honor roll! Ready to hang out?"',
        '"There you are! I was JUST thinking about you. Weird, right?"',
        '"Perfect timing — I need somebody to back me up on something."',
        "\"You free? Say you're free. Please say you're free.\"",
        "\"They want me on another mission... it's not like me being there helps anyone. But you showing up? That part's good.\"",
      ],
      spark: [
        "\"Okay so — don't laugh — I've been thinking about you. A lot. That's it. That's the thing.\"",
        '"Why\'re you looking at me like that?! ...Do it again."',
        "\"I'm not blushing! It's warm in here! It's Frostheim, I KNOW, shut up!\"",
        '"Can I — is it okay if I hold your hand? Cool. Cool cool cool."',
        '"You make it really hard to think straight, you know that?"',
      ],
      close: [
        '"You made it! I was hoping you\'d show up!"',
        '"Hey. Hey. Come here — no, seriously, come here."',
        '"I saved you the good seat. Don\'t make it weird, just take it."',
        '"Whatever you were doing? It can wait. You\'re here now."',
        "\"I don't say this a lot, but... yeah. Really glad it's you.\"",
      ],
      bound: [
        '"C\'mere. No reason. Okay, one reason. Come HERE."',
        "\"I got you something. It's dumb. I'm giving it to you anyway.\"",
        '"Five more minutes. Five. Then five more. Don\'t argue."',
        "\"You're stuck with me, y'know that? Like, permanently.\"",
        "\"I love you. That's it, that's the whole announcement, you can go now. Don't go.\"",
      ],
    },
    approach: {
      new: [
        "Wave back",
        "Follow the noise",
        "See what he's up to",
        "Say hi before he explodes",
      ],
      known: [
        "Let him remember you",
        "Hear the story again",
        "Wave back",
        "Stick around",
      ],
      warm: [
        "Take the seat he saved",
        "Bump his shoulder back",
        "Jump into the story",
        "Match his grin",
      ],
      spark: [
        "Take his hand",
        "Let him catch you",
        "Make it worse on purpose",
        "Hear him out",
      ],
      close: [
        "Go get your hug",
        "Answer him mid-sentence",
        "Let him drag you along",
        "Tell him you missed him too",
      ],
      bound: [
        "Go to him",
        "Five more minutes",
        "Say it back",
        "Let him lift you",
      ],
    },
    responses: {
      kind: {
        new: [
          "Celebrate with his enthusiasm",
          "Tell him he's doing great",
          "Let him show off a little",
        ],
        spark: [
          "Tell him he did fine",
          "Squeeze his hand back",
          "Let him say it badly",
        ],
        close: [
          "See past his bravado",
          "Tell him he's enough as he is",
          "Notice the part he hides",
        ],
        bound: ["Say it back", "Stay the five minutes", "Let him hold on"],
      },
      playful: {
        new: [
          "Get swept up in his energy",
          "Out-shout him",
          "Bet him he can't",
        ],
        spark: [
          "Make him blush harder",
          "Repeat it back to him",
          "Refuse to let go",
        ],
        close: [
          "Laugh with his whole heart",
          "Start the trouble yourself",
          "Ruin his big dramatic moment",
        ],
        bound: [
          "Make him say it louder",
          "Refuse to get up",
          "Give the dumb gift back",
        ],
      },
      bold: {
        new: [
          "Go along for the ride",
          "Say yes before he finishes",
          "Dare him to prove it",
        ],
        spark: [
          "Say it for him",
          "Pull him closer",
          "Tell him you've thought about him too",
        ],
        close: [
          "Embrace the chaos together",
          "Pull him along for once",
          "Tell him you'd follow anywhere",
        ],
        bound: [
          "Kiss him mid-sentence",
          "Say it first this time",
          "Tell him he's stuck too",
        ],
      },
      neutral: {
        new: ["Just listen", "Let him run out of steam", "Nod along"],
        spark: ["Let him flail", "Let go first", "Pretend you didn't hear"],
        close: [
          "Be his calm",
          "Sit through the quiet part",
          "Let him catch his breath",
        ],
        bound: [
          "Let him ramble",
          "Stay quiet and close",
          "Let the morning be slow",
        ],
      },
    },
  },

  lucas: {
    dialogue: {
      new: [
        "He studies you for a long moment before offering the faintest nod.",
        "He steps aside to let you pass, and apologizes for having been in the way at all.",
        "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
        '"Forgive me," he says softly, before you\'ve said anything. "I didn\'t hear you come in."',
        "Everything about him is quiet. That includes whatever he's decided not to say.",
      ],
      known: [
        "He remembers you. The apology for existing comes a little quicker now.",
        "He looks up when you enter now, rather than after.",
        "\"You've been well?\" It's the first question he's asked you unprompted.",
        '"You\'re early," he notes, quietly impressed. "Good. We can go over the details."',
        "The nod has become a nod and half a smile.",
      ],
      warm: [
        "He offers a small, genuine smile now instead of just a nod.",
        "He moves a half-step closer than he used to, and pretends he hasn't.",
        "He's already checking the room for anything that might hurt you. He always does.",
        '"You look tired," he observes gently. He noticed before you did.',
        "The politeness is still there, but it isn't a wall anymore.",
      ],
      spark: [
        "The politeness has thinned. What shows through it is not gentle at all.",
        "He takes your hand to check it for injury, and forgets to give it back.",
        '"Forgive me," he murmurs, standing far closer than forgiveness requires.',
        "He looks at your mouth for exactly a second too long, and knows it.",
        '"I\'m not always as harmless as I let people believe," he says quietly. "You should know that."',
      ],
      close: [
        '"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."',
        "He reaches for your sleeve, stops himself, and then does it anyway.",
        "There's something less careful in how he looks at you now. Something honest.",
        '"Stay where I can see you," he says. It isn\'t a request, quite.',
        "He lets the softness show, just for you, and it costs him something to do it.",
      ],
      bound: [
        "The gentleness is still there. It is no longer the whole of him, with you.",
        "He kisses your knuckles, then your wrist, then stops asking permission.",
        '"I\'d burn a great deal down for you," he says softly. "I hope that doesn\'t frighten you."',
        "He falls asleep with a hand fisted in your shirt, as though you might go.",
        "He touches you like something he has been given and can hardly believe he keeps.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            "He's doing a slow circuit of the balcony rail, checking the dark below, and only then turns to you.",
            "The campus lights have come on behind him. He's clearly been out here a while.",
            '"You\'re out late," he says — not quite a reproach. "I\'ll walk you back when you\'re ready."',
            '"You shouldn\'t wander alone," he says quietly. "Not here. Not at this hour."',
          ],
          known: [
            "He falls into step to walk you along the lit path before you can decline the escort.",
            '"I don\'t like this hour for wandering," he admits. "I like that you came to find me in it."',
            '"Curfew\'s soon," he says. "Stay a little — I\'ll make sure you\'re not caught."',
          ],
          warm: [
            "He's saved you the sheltered corner out of the wind. He'd deny having planned it.",
            "The dark makes him less careful with what he says. Not much. Enough to notice.",
            '"The quiet out here is the honest part of my day," he says. "I\'m glad you\'re in it."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Let him walk you back", "Fall into step with him"],
          known: ["Accept the escort"],
          warm: ["Take the sheltered corner"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        '"Oh... hello. Please, be careful around here."',
        '"Ah — my apologies. Did you need something?"',
        "\"I'm sorry, I don't think we've met properly.\"",
        "\"You're here 10 minutes early — I'm impressed. Let's check the details for today's mission.\"",
      ],
      known: [
        '"Ah — it\'s you. I mean, of course it is. Hello."',
        "\"You've been coming by more often. That's... that's good.\"",
        '"Do I find it tough training every day? Those with strength have a duty to use it for others. I\'m perfectly all right."',
        '"I invited Kaito to train with me, but he turned me down. I\'m worried about his lack of strength..."',
        '"I remembered your name. I hope that isn\'t strange."',
      ],
      warm: [
        "\"I'm glad you're safe. How have you been?\"",
        '"You came back. I... was hoping you would."',
        '"Sit, please. You look like you\'ve been on your feet all day."',
        '"May I walk with you? Only if you\'d like."',
        '"I kept thinking I heard you in the hall. I was wrong, until now."',
      ],
      spark: [
        '"Stay near me. I\'d rather not explain why."',
        '"You trust me too easily. I\'d like you to keep doing it."',
        '"May I? ...Thank you. You needn\'t look so surprised."',
        "\"There's a part of me that isn't gentle. It's very fond of you.\"",
        "\"Don't apologize for standing close. Please don't.\"",
      ],
      close: [
        '"Your safety means more to me than anything else."',
        '"Stay close. Just for a while. Please."',
        '"I would rather be the one who\'s hurt than watch it happen to you."',
        '"You don\'t have to be gentle with me. Not you."',
        '"I\'ve stopped apologizing for wanting you near. Is that all right?"',
      ],
      bound: [
        '"Stay the night. I\'ve stopped pretending I want anything else."',
        "\"Don't be gentle with me. I'm not made of glass. Not with you.\"",
        '"I love you. I\'ve said it in my head so often it should be easier aloud."',
        '"Closer. I want to feel you breathing."',
        "\"Whatever's left of me that isn't kind — it's yours too.\"",
      ],
    },
    approach: {
      new: [
        "Approach quietly",
        "Return his nod",
        "Speak softly first",
        "Let him notice you",
      ],
      known: [
        "Accept the better spot",
        "Answer his question",
        "Return the half-smile",
        "Say his name",
      ],
      warm: [
        "Walk up to him",
        "Ask him how he's been",
        "Fall into step with him",
        "Return the small smile",
      ],
      spark: [
        "Let him keep your hand",
        "Stand closer than needed",
        "Say yes",
        "Trust him anyway",
      ],
      close: [
        "Go to his side",
        "Take his hand",
        "Stay where he can see you",
        "Tell him you're safe",
      ],
      bound: [
        "Stay the night",
        "Don't be gentle",
        "Say it back",
        "Let him hold on",
      ],
    },
    responses: {
      kind: {
        new: [
          "Speak gently like he does",
          "Thank him for the warning",
          "Tell him he isn't in the way",
        ],
        spark: [
          "Let him keep your hand",
          "Tell him you're not afraid",
          "Be soft with the harder part",
        ],
        close: [
          "Trust his quiet strength",
          "Tell him he can stop apologizing",
          "Let him take care of you",
        ],
        bound: [
          "Tell him it doesn't frighten you",
          "Say it back softly",
          "Hold him through it",
        ],
      },
      playful: {
        new: [
          "Be gentle and playful",
          "Coax a smile out of him",
          "Tease him very carefully",
        ],
        spark: [
          "Catch him looking",
          "Fluster the polite one",
          "Ask what he's thinking",
        ],
        close: [
          "Make him laugh softly",
          "Catch him being sweet",
          "Fluster him on purpose",
        ],
        bound: [
          "Make the polite one blush",
          "Refuse to be handled gently",
          "Steal his shirt",
        ],
      },
      bold: {
        new: [
          "Be gentle but firm",
          "Tell him you can handle it",
          "Step in front of him",
        ],
        spark: [
          "Close the space yourself",
          "Tell him you like the danger",
          "Say yes before he asks",
        ],
        close: [
          "Be bold for him",
          "Refuse to let him take the hit",
          "Say it before he can",
        ],
        bound: [
          "Tell him not to be gentle",
          "Pull him down to you",
          "Say you'd burn it with him",
        ],
      },
      neutral: {
        new: ["Stay silent", "Let him finish the thought", "Wait beside him"],
        spark: [
          "Let the moment pass",
          "Step back gently",
          "Say nothing at all",
        ],
        close: [
          "Be quiet with him",
          "Stay through the silence",
          "Let the moment be enough",
        ],
        bound: [
          "Let him sleep",
          "Stay quiet beside him",
          "Let the night be still",
        ],
      },
    },
  },

  tohma: {
    dialogue: {
      new: [
        'Calm as still water, he tilts his head. "You\'re new around here."',
        "He notes your arrival, files it somewhere, and returns to what he was doing.",
        'He inclines his head, courteous. "Business in Frostheim? I serve the one who runs it."',
        "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
        "Nothing about his expression moves. Something behind it is definitely taking notes.",
      ],
      known: [
        "You've moved from unknown to accounted for. From him, that's a promotion.",
        "He doesn't ask your name. He logged it the first time.",
        '"Twelve days," he notes. "That\'s the interval. I keep track."',
        "The assessment is shorter now. He's already reached his conclusion about you.",
        "He nods once as you pass. It isn't nothing.",
      ],
      warm: [
        "His usual calm softens into something warmer whenever you're near.",
        "He finishes his sentence, then gives you his whole attention. That's rare.",
        '"You\'re on time," he says, which from him is close to a compliment.',
        "He shifts to make room without ever acknowledging that he did.",
        "The report in his hands stops being urgent the moment you speak.",
      ],
      spark: [
        "The composure holds. It is very obviously costing him something.",
        "He straightens something on your uniform with unnecessary precision.",
        '"I\'ve run the assessment repeatedly," he says. "The result doesn\'t change."',
        "He stands closer than protocol allows and does not correct it.",
        '"You\'re a distraction," he states, without any apparent intention of removing it.',
      ],
      close: [
        "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
        "He breaks his own rule about interruptions. For you. Again.",
        '"I had an hour free," he says. He did not have an hour free.',
        "The composure holds, but his eyes give him away completely.",
        "He tells you the truth without softening it, because you're the one person he doesn't have to.",
      ],
      bound: [
        "He states what he wants plainly, and then is exceedingly efficient about it.",
        "He wakes at his usual hour, looks at you, and elects to be late for the first time.",
        '"I\'ve stopped assessing you," he says. "The conclusion was reached some time ago."',
        "His hands are precise everywhere. It is deeply unfair.",
        "He holds you the way he does everything else — deliberately, and completely.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            "He checks his watch, then the dark stairwell behind you, and decides not to remark on the hour.",
            '"You\'re past curfew," he notes. "So am I. We\'ll call it even."',
            "The balcony's empty except for him. After dark, he says, is the only time it's quiet enough to think.",
            '"It\'s after curfew. I\'m not going to report you," he says. "Stand where the light reaches, though."',
          ],
          known: [
            '"I\'ll sign you back in if anyone asks," he says, already turning a blind eye.',
            "He's less starched after dark. The clipboard is nowhere in sight.",
            '"The balcony\'s better at night," he says. "No one to perform for."',
          ],
          warm: [
            '"Nobody comes up here this late. That\'s rather the point of it."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Slip past curfew with him", "Take the empty balcony"],
          known: ["Let him sign you in"],
          warm: ["Keep him company up here"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        '"No need to be nervous. I\'ve nothing but the noblest of intentions."',
        '"Well, well. Frostheim is ruled by a king, you see. I\'m no more than a servant."',
        '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
        "\"If you're lost, say so. I don't have time to cater to your ambivalence.\"",
        '"What do you mean? I lend a sympathetic ear to those in need — that\'s all."',
      ],
      known: [
        '"Providing this level of assistance goes without saying. Only once you can do so without instruction can you call yourself qualified."',
        '"Ah. You again. Proceed, by all means."',
        "\"You've been consistent. I've adjusted my expectations accordingly.\"",
        '"No need to explain yourself this time."',
        '"If you intend to keep coming, learn the layout. Start here."',
      ],
      warm: [
        '"Well, well. You again. I find I don\'t mind it."',
        '"You\'re consistent. I respect consistency."',
        "\"I've adjusted my schedule. Don't read into it.\"",
        '"Report, then. How have you been?"',
        '"There are worse interruptions than you."',
      ],
      spark: [
        '"Hold still. This will take a moment and I intend to take it."',
        '"My focus is compromised. You are the variable. I\'ve stopped trying to correct for it."',
        "\"Closer. I'm not going to ask twice, and I'd rather not have to.\"",
        '"That look is inefficient and I would like you to keep making it."',
        '"State plainly what you want. I\'ll tell you whether I want the same."',
      ],
      close: [
        '"Well, well..I must say your company is preferred. To my surprise."',
        '"I\'ve stopped calling this a coincidence. So should you."',
        '"Say it plainly. I\'d rather hear the truth from you than anything else."',
        "\"I don't make exceptions. I've made one. Draw your own conclusions.\"",
        '"If something happens, come to me first. Not second. First."',
      ],
      bound: [
        "\"Stay. I've cleared the morning. I've never cleared a morning.\"",
        '"Tell me what you want. I\'d rather be accurate about this."',
        '"I love you. It\'s not a complicated finding. It simply took a while to confirm."',
        "\"Closer. That's better. That's — yes.\"",
        '"You are the only disorder in my life I have no intention of correcting."',
      ],
    },
    approach: {
      new: [
        "State your business",
        "Step into view",
        "Answer his question",
        "Stand where he can see you",
      ],
      known: [
        "Proceed",
        "Skip the explanation",
        "Learn the layout",
        "Return the nod",
      ],
      warm: [
        "Report in",
        "Walk up to him",
        "Interrupt him anyway",
        "Ask what he's working on",
      ],
      spark: [
        "Hold still",
        "Be the distraction",
        "Step inside protocol",
        "State what you want",
      ],
      close: [
        "Go to him directly",
        "Take the seat beside him",
        "Say it plainly",
        "Tell him the truth",
      ],
      bound: [
        "Tell him what you want",
        "Stay the morning",
        "Let him be late",
        "Say it back",
      ],
    },
    responses: {
      kind: {
        new: [
          "Respect his discipline",
          "Answer him honestly",
          "Thank him for the warning",
        ],
        spark: [
          "Let him take his moment",
          "Tell him it's mutual",
          "Be still for him",
        ],
        close: [
          "See through his composure",
          "Tell him he can stand down",
          "Ask what he's carrying",
        ],
        bound: [
          "Say it back plainly",
          "Let him be late",
          "Tell him the finding is mutual",
        ],
      },
      playful: {
        new: [
          "Try to make him crack",
          "Answer far too casually",
          "Test his patience",
        ],
        spark: [
          "Compromise his focus",
          "Break protocol on purpose",
          "Ask for the assessment",
        ],
        close: [
          "Crack through his mask",
          "Catch him almost smiling",
          "Break his rules with him",
        ],
        bound: [
          "Ruin his schedule",
          "Be deliberately imprecise",
          "Make him lose the thread",
        ],
      },
      bold: {
        new: [
          "Hold your own",
          "Give him a straight answer",
          "Refuse to be assessed",
        ],
        spark: [
          "Say plainly what you want",
          "Close the last step",
          "Tell him to stop correcting",
        ],
        close: [
          "Demand the truth from him",
          "Tell him you're not going anywhere",
          "Meet him without flinching",
        ],
        bound: [
          "Tell him exactly what you want",
          "Pull him back down",
          "Be the disorder",
        ],
      },
      neutral: {
        new: [
          "Observe him carefully",
          "Say only what's needed",
          "Wait for his verdict",
        ],
        spark: [
          "Let him recompose",
          "Give him nothing",
          "Stand at regulation distance",
        ],
        close: [
          "See what he won't say",
          "Let the silence stand",
          "Stay until he's finished",
        ],
        bound: ["Let him keep the hour", "Lie still", "Say nothing at all"],
      },
    },
  },

  alan: {
    dialogue: {
      new: [
        'Grease-stained and worn, he looks at you with eyes that have seen too much. "Get back. It\'s dangerous."',
        "He doesn't stop working. He just moves the toolbox so you won't trip over it.",
        "The engine dies under his hand. In the quiet, he finally acknowledges you exist.",
        '"Don\'t touch that," he says flatly. "It\'s hot." That\'s the whole greeting.',
        "He's holding a campus map the wrong way up and won't admit he's lost. \"...What do you want?\"",
      ],
      known: [
        "He doesn't warn you about the floor anymore. You've learned it.",
        "He grunts once in your direction. Two weeks ago he didn't do that.",
        "The toolbox has already been moved before you arrive.",
        '"Looks like we\'ve got another mission order," he says. "There\'s more anomalies in the summer."',
        "\"Hand me that.\" It's the first thing he's ever asked you for.",
      ],
      warm: [
        "He works beside you in steady silence, a quiet understanding growing between you.",
        "He hands you a rag without being asked. Somehow that means something.",
        "He's left the second stool out again. He's never once mentioned it.",
        '"You eat today?" he asks, wiping his hands. It\'s the third time this week.',
        "The garage radio is on. He turned it on because you like it. He won't say so.",
      ],
      spark: [
        "He wipes his hands twice before he touches you. He touches you anyway.",
        "He's careful with you in a way he isn't careful with anything else.",
        "The silence between you has stopped being comfortable and started being loaded.",
        "He tucks your hair back with grease-stained fingers and says nothing about it.",
        '"...Come here," he says. It takes him a long time to get those two words out.',
      ],
      close: [
        '"You make everything feel... lighter," he says softly, like a confession. "Thank you."',
        "He stops working entirely. For him, that's practically a declaration.",
        "He puts his jacket over your shoulders before you've admitted you're cold.",
        '"Stay a while," he says. Four words from him weigh more than most speeches.',
        "The tired in his shoulders eases the moment you sit down beside him.",
      ],
      bound: [
        "He sleeps through the night now. He knows why. He'll never say it out loud.",
        "His hands are rough and careful and everywhere, and he still doesn't speak.",
        "He pulls you into his lap in the quiet of the garage like it's nothing. It isn't.",
        '"...Love you," he says into your hair, so quietly it\'s almost deniable.',
        "He's stopped washing the grease off before he touches you. You told him not to bother.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"This place isn\'t meant for people like you. Stay safe."',
        '"Watch your step. Half this floor\'s sharp."',
        '"...What do you want?"',
        '"Vagastrom eats tourists. Don\'t be one."',
        '"...Hm. You\'re still standing there."',
      ],
      known: [
        '"...You again. Fine."',
        '"Hand me the eight-mil. It\'s the one that looks like the others."',
        "\"You're not in the way. That's rare.\"",
        '"Slack off once, you\'ll find out how hard it is to get back in the game."',
        "\"Don't stand there. Sit, if you're staying.\"",
      ],
      warm: [
        "\"I'm glad you're here. Really.\"",
        '"Sit. I\'m almost done."',
        '"You came back. Good."',
        "\"Lunch? Huh. I forgot to eat. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
        '"Long day. Yours or mine, doesn\'t matter. Sit down."',
      ],
      spark: [
        '"Come here. Closer than that."',
        "\"I'm no good at saying it. You'll have to read it off me.\"",
        '"Hold still. Got oil on your cheek. ...There. Kept you."',
        '"You keep standing that close, I\'m gonna do something about it."',
        "\"Don't go home yet. That's all. That's the whole ask.\"",
      ],
      close: [
        "\"You're the only constant in my life that doesn't haunt me. Please stay by my side.\"",
        "\"I don't sleep much. It's easier when I know you're all right.\"",
        '"Come here. Let me look at you."',
        '"Whatever it is — you tell me first. I\'ll handle it."',
        '"I\'m not good with words. You already know what I mean."',
      ],
      bound: [
        '"Come here. Don\'t need a reason anymore, do I."',
        '"Stay. Whole night. I sleep better."',
        '"...Love you. Don\'t make me repeat it, I barely got it out."',
        '"Sit here. On me. Yeah. Like that."',
        '"I don\'t say much. You already know what all of it means."',
      ],
    },
    approach: {
      new: [
        "Step over the toolbox",
        "Stay out of his way",
        "Ask what he's building",
        "Wait for the engine to stop",
      ],
      known: [
        "Hand him the wrench",
        "Sit, if you're staying",
        "Stay out from underfoot",
        "Ask what it is",
      ],
      warm: [
        "Take the second stool",
        "Pick up the wrench",
        "Work beside him",
        "Break the quiet",
      ],
      spark: [
        "Come here",
        "Hold still",
        "Stay a bit longer",
        "Read it off him",
      ],
      close: [
        "Sit down beside him",
        "Take his hands",
        "Tell him to rest",
        "Stay a while",
      ],
      bound: [
        "Come here",
        "Stay the whole night",
        "Sit with him",
        "Say it for him",
      ],
    },
    responses: {
      kind: {
        new: [
          "Appreciate his straightforwardness",
          "Thank him for the warning",
          "Ask if he's eaten",
        ],
        spark: [
          "Let him be careful with you",
          "Read it off him",
          "Cover his hands with yours",
        ],
        close: [
          "Accept what he's done for you",
          "Tell him he can put it down",
          "Let him look after you",
        ],
        bound: [
          "Say it back for him",
          "Stay the whole night",
          "Let him not speak",
        ],
      },
      playful: {
        new: [
          "Accept his humor",
          "Touch the thing he said not to",
          "Answer his grunt with a grin",
        ],
        spark: [
          "Get oil on him back",
          "Stand closer on purpose",
          "Make him say it",
        ],
        close: [
          "Get him laughing",
          "Steal his jacket",
          "Talk until he gives in",
        ],
        bound: [
          "Make him repeat it",
          "Get grease on him deliberately",
          "Steal his jacket again",
        ],
      },
      bold: {
        new: [
          "Stand your ground",
          "Tell him you're staying",
          "Say you can handle it",
        ],
        spark: [
          "Do something about it",
          "Close the distance first",
          "Tell him not to be careful",
        ],
        close: [
          "Trust his protection",
          "Tell him he isn't alone",
          "Ask him to lean on you",
        ],
        bound: [
          "Climb into his lap",
          "Say it first",
          "Tell him not to bother washing up",
        ],
      },
      neutral: {
        new: ["Be straightforward", "Work in silence", "Let him finish"],
        spark: ["Let the silence sit", "Step back", "Say nothing, stay anyway"],
        close: [
          "Understand his quiet",
          "Sit through the long pause",
          "Say nothing, stay anyway",
        ],
        bound: ["Let him sleep", "Sit in the quiet", "Say nothing at all"],
      },
    },
  },

  leo: {
    dialogue: {
      new: [
        'He smirks dangerously, eyes lit with a hint of amusement. "What brings you to the lion\'s den?"',
        "His phone is up before he's even looked at you. Everything is content to him.",
        '"Oh, this is good," he murmurs, to himself, about you. It doesn\'t sound like a compliment.',
        "He takes you in slowly, head to toe, and grins at whatever conclusion he reaches.",
        "\"Who's DMing me? Oh, it's this account. Huh... now that's interesting.\" He glances up at you mid-scroll.",
      ],
      known: [
        "He's learned your name. He holds it like a weapon he hasn't decided to fire.",
        '"Oh. It\'s you," he says, in a tone that could mean anything at all.',
        "\"Have you seen Cap? Ugh, bet he's lurching around lost again.\" He doesn't wait for an answer.",
        "The camera comes up, then goes down. He's decided you're not for the feed.",
        "He remembers exactly what rattled you last time. He's saving it.",
      ],
      warm: [
        "He runs his fingers along your jawline, still taunting, but there's something protective underneath.",
        "The camera goes down when you arrive. He'd hate for anyone to notice that.",
        '"Late again," he drawls, having very obviously been checking.',
        "He insults you the way other people say hello, and it means the same thing now.",
        '"We\'re fighting again? Which house? ...Ugh, pass." He stays right where he is, next to you.',
      ],
      spark: [
        "He backs you gently into the wall and looks delighted with himself.",
        '"You\'ve stopped running," he murmurs. "That\'s so much more interesting."',
        "He tilts your chin up with one finger, purely to see what your face does.",
        "The teasing has developed a lower register. It isn't for the camera.",
        "He's close enough that his next insult lands as something else entirely.",
      ],
      close: [
        '"I could destroy you without thinking," he whispers, "but I\'d rather keep you all to myself."',
        "The performance drops. What's left is sharper, quieter, and entirely yours.",
        "He pulls you out of the crowd's eyeline before he lets his face change.",
        '"Say something cruel to me," he grins. "You\'re the only one who does it right."',
        "He's been waiting. He'll spend the next ten minutes pretending he wasn't.",
      ],
      bound: [
        "He leaves marks where a collar won't hide them, and looks extremely pleased about it.",
        '"Say it again," he murmurs. "The way you said it last night."',
        "He's cruel to everyone else and unbearably soft with you at three in the morning.",
        "He keeps you in bed by simply refusing to let go, which is unanswerable.",
        "The camera has never once been pointed at this. He's not sharing you.",
      ],
    },
    temperamentDialogue: {
      new: [
        "\"You're either brave or stupid. Let's find out which.\"",
        '"Smile. You\'re on camera. Ah — too late."',
        '"New face. Cute. How long do you think you\'ll last?"',
        '"Say something interesting. I\'m running low on entertainment."',
        '"Ask for permission if you want to talk to me. ...Nope. Denied."',
      ],
      known: [
        "\"Back again? Either you're stubborn or you're stupid. Jury's out.\"",
        '"I remember you. Don\'t get excited, I remember everyone."',
        '"You\'ve lasted longer than I bet on. Annoying."',
        '"Say something worth filming. Go on, I\'ll wait."',
        '"Was that on purpose? Are you seriously ignoring me right now?"',
      ],
      warm: [
        '"Finally came back, huh? I was getting bored without you."',
        '"I\'ve got something on half the people in this room. Not you. Yet."',
        '"You\'re my favorite kind of trouble, you know that?"',
        '"Careful, you\'re starting to look like you belong here."',
        '"Don\'t get comfortable. ...Fine. Get a little comfortable."',
      ],
      spark: [
        '"Look at you. Standing there like you want something. Say it."',
        "\"I could ruin you. Slowly. You'd let me, wouldn't you?\"",
        '"No camera. No audience. Just me being awful at you. Lucky."',
        '"Say my name. The way you did last time. Yes — that."',
        "\"You're not scared. You're something else. I like that better.\"",
      ],
      close: [
        "\"You're the only thing sharp enough to match my wit. The only one I'd never want to hurt.\"",
        '"Everyone else is noise. You\'re the only signal in this place."',
        '"I don\'t share. You knew that when you got close."',
        '"Come here. Let them wonder what I\'m telling you."',
        '"Say my name like you mean it. That\'s all I want."',
      ],
      bound: [
        '"Mine. Say it. I want to hear you say it."',
        '"You\'ve got that look. Yeah, that one. Come here before I lose my mind."',
        "\"I don't share. You've known that since the beginning.\"",
        '"Do you have any idea what you do to me? No? Good. Stay ignorant."',
        "\"Stay in bed. The world's boring and you're not.\"",
      ],
    },
    approach: {
      new: [
        "Walk into the lion's den",
        "Smirk right back",
        "Ignore the camera",
        "Give him something interesting",
      ],
      known: [
        "Give him something worth filming",
        "Refuse to be rattled",
        "Say his name back",
        "Let him decide about you",
      ],
      warm: [
        "Cut through the crowd",
        "Insult him back",
        "Take the spot beside him",
        "Make him put the phone down",
      ],
      spark: [
        "Let him back you up",
        "Say his name",
        "Ask for it",
        "Stay against the wall",
      ],
      close: [
        "Go straight to him",
        "Let him pull you close",
        "Call him out",
        "Be the only signal",
      ],
      bound: ["Say it", "Come here", "Stay in bed", "Give him that look"],
    },
    responses: {
      kind: {
        new: [
          "Match his confidence",
          "Refuse to be rattled",
          "Compliment him sincerely",
        ],
        spark: [
          "See what's under the cruelty",
          "Let him be soft, briefly",
          "Say his name gently",
        ],
        close: [
          "See the real him beneath the act",
          "Tell him the mask isn't needed",
          "Be gentle where nobody's looking",
        ],
        bound: [
          "Be soft with him at 3am",
          "Say it the way he wants",
          "Let him keep you",
        ],
      },
      playful: {
        new: ["Banter back at him", "Steal his line", "Pose for the camera"],
        spark: [
          "Bite back",
          "Make him work for it",
          "Tilt his chin up instead",
        ],
        close: [
          "Be his favorite game",
          "Cut him down affectionately",
          "Beat him at his own bit",
        ],
        bound: [
          "Make him beg for it",
          "Cover the marks on purpose",
          "Give him nothing back",
        ],
      },
      bold: {
        new: [
          "Meet him head-on",
          "Say the thing nobody says",
          "Refuse to look away",
        ],
        spark: [
          "Tell him to ruin you",
          "Pull him in",
          "Ask for exactly what you want",
        ],
        close: [
          "Own his attention completely",
          "Claim him in front of everyone",
          "Give him back exactly as good",
        ],
        bound: [
          "Say you're his",
          "Leave marks of your own",
          "Tell him what he does to you",
        ],
      },
      neutral: {
        new: [
          "Watch and listen",
          "Give him nothing to work with",
          "Let him perform",
        ],
        spark: [
          "Refuse to react",
          "Duck under his arm",
          "Let him talk himself out",
        ],
        close: [
          "Watch him watching you",
          "Let the smirk fade on its own",
          "Sit through the quiet version",
        ],
        bound: ["Refuse to say it", "Let him talk", "Turn over and sleep"],
      },
    },
  },

  shohei: {
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
        '"Oh, hey! I was wondering if you\'d come by today."',
        '"Not the spicy one, right? See — I remembered!"',
        "\"Try this. Don't tell me what you think until you've had three bites.\"",
        '"You always look like you skipped lunch. Sit down."',
        "\"What's Mido texting me for? 'Come to the pit,' spelled three ways, none right. Pfft. What the hell is this, some kinda secret code?\"",
      ],
      warm: [
        '"Senpai, I\'m always happy to see you around."',
        '"Sit. Eat. Complain about your day. In that order."',
        '"I named it after you. The dish, I mean. Don\'t make it weird."',
        "\"Took Bonnie out this morning — my bike. Anomaly's got a mind of her own. She runs sweet when it's cool like this.\"",
        "\"Stay till close? I'll feed you twice. That's the deal.\"",
      ],
      spark: [
        '"Here — open. ...Good, right? Wait, why are you looking at me like that?"',
        '"Senpai, I — okay, I\'m just gonna say it. I like you. A lot. A LOT."',
        '"Hold the knife like this. No — here, let me. ...Sorry. Not sorry."',
        '"I closed early. First time ever. Do the math on that one."',
        "\"I think about you when I'm cooking. That's most of the day, so.\"",
      ],
      close: [
        "\"Senpai... I'm really glad you're here. You know that, right?\"",
        "\"You're on the board. Permanently. I'm not discussing it.\"",
        '"Everyone gets fed. You get fed properly. There\'s a difference."',
        '"If anything happens, come find me. Any hour. I mean it."',
        '"Stay till closing? I\'d like the company. Yours, specifically."',
      ],
      bound: [
        "\"Morning. Don't get up. I'll bring it to you.\"",
        "\"You're wearing my shirt. I'm — okay, I need a second. That's really working for me.\"",
        '"I love you. Sorry, I say it a lot now. I\'m not actually sorry."',
        '"Come prep with me. Dawn shift. It\'s freezing and I want you there anyway."',
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
      bound: [
        "Don't get up",
        "Come prep at dawn",
        "Wear his shirt",
        "Guess why",
      ],
    },
    responses: {
      kind: {
        new: [
          "Return his warmth",
          "Thank him properly",
          "Tell him it's delicious",
        ],
        spark: [
          "Tell him you like him too",
          "Say the food tastes like care",
          "Let him tie the apron",
        ],
        close: [
          "Let him know you care too",
          "Thank him for the board",
          "Tell him to eat something too",
        ],
        bound: [
          "Say it back",
          "Let him bring it to you",
          "Kiss his shoulder in passing",
        ],
      },
      playful: {
        new: [
          "Enjoy his charm",
          "Ask for seconds shamelessly",
          "Tease him about the apron",
        ],
        spark: [
          "Feed him a bite back",
          "Make him say it twice",
          "Ruin his knife technique",
        ],
        close: [
          "Share genuine laughter",
          "Demand a new dish",
          "Rename the special",
        ],
        bound: [
          "Wear his shirt on purpose",
          "Let the food burn",
          "Guess wrong on purpose",
        ],
      },
      bold: {
        new: [
          "Order the spicy one anyway",
          "Express yourself to him",
          "Let him pick for you",
        ],
        spark: [
          "Kiss the flour off his cheek",
          "Pull him in by the apron",
          "Say it first",
        ],
        close: [
          "Be bold with him",
          "Ask him to close early",
          "Tell him you'd stay till dawn",
        ],
        bound: [
          "Pull him away from the stove",
          "Say it first",
          "Tell him to keep it closed",
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
  },

  subaru: {
    dialogue: {
      new: [
        "He looks up from tending the lanterns, a quiet warmth in his eyes as he notices you.",
        "He bows before he speaks. It's automatic, and completely sincere.",
        '"I\'ve been working since I was four, so people said I was mature for my age," he says. "But the truth is, I still have a lot to learn."',
        "He finishes the row of lanterns first. Duty, then greeting. Always in that order.",
      ],
      known: [
        "He greets you by name now, and looks pleased to have gotten it right.",
        "He's stopped apologizing for the state of the grounds when you arrive.",
        "There's a cup already out. He'll say it was poured for no one in particular.",
        "He bows a little less deeply, which from him is a kind of intimacy.",
        "\"I'm sorry I'm so late. The campus is so crowded I can never manage to walk in a straight line. Silly, isn't it?\"",
      ],
      warm: [
        "His usual composure softens immediately—there's genuine gladness in his expression when he sees you.",
        "He's set out a second cup. He'd been hoping, and he'd never admit to hoping.",
        '"You\'re just in time," he says, though nothing in particular is happening.',
        "The paperwork gets set aside faster than his own rules should allow.",
        '"I may be the captain, but it\'s just in name," he says mildly. "Haku is much better suited for the job than me."',
      ],
      spark: [
        "The restraint is fraying and he knows you can see it.",
        '"I shouldn\'t want this," he says quietly. "I\'m going to anyway."',
        "His hand finds the small of your back at the gate and stays there.",
        "He looks at you the way he's spent months not letting himself.",
      ],
      close: [
        "He lets his shoulders drop. It's the first time all day he's allowed that.",
        '"Don\'t tell the others I stopped working," he says, already sitting down.',
        "He looks at you the way he looks at the lanterns — like something he'd hate to let go out.",
        "For once, he lets someone take care of him. It's you. It's only ever you.",
      ],
      bound: [
        "He finally lets someone hold him. It takes him a long time to stop apologizing for it.",
        "He kisses you at the gate, in full view, and doesn't check who's watching.",
        '"I\'ve been the captain all my life," he says. "With you I\'m just yours."',
        "He falls asleep against you before the lanterns are even out.",
        "The restraint is gone entirely. What replaced it is overwhelming and very quiet.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            '"Ah — a guest. Please, come in out of the dark."',
            "He's lighting the last of the lanterns along the path, and waves you in toward the warm ones.",
            '"The forest changes character after sundown," he says. "Stay close and it stays kind."',
            '"You\'re safe here, even at this hour," he says. "That much I can promise."',
          ],
          known: [
            "He walks you in by lantern light and takes, as always, the longest possible way.",
            '"I do the last rounds about now. You\'re welcome to keep me company for them."',
            '"The tea\'s still warm and the lanterns are lit," he says. "Stay a while."',
          ],
          warm: [
            '"I find myself listening for the gate after dark lately. I wonder why."',
            "There's a cup already poured and a lantern already set on your side of the step.",
            '"Sit with me until the lanterns burn low? The rounds can wait."',
          ],
          spark: [
            "He walks you back in lantern light and takes the longest possible route.",
          ],
          close: [
            '"I was hoping... you\'d come by tonight," he admits quietly, the lantern light catching the sincerity in his gaze.',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Come in out of the dark", "Follow the lanterns in"],
          known: ["Join the last rounds"],
          warm: ["Sit by the lantern he set out"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        '"Welcome. Please, make yourself comfortable."',
        '"Mind the step — the stones are uneven past the gate."',
        "\"I'm very sorry to have kept you waiting. It's wonderful to see you again.\"",
        '"A visitor? Then let me at least offer you tea."',
        '"You\'re safe here. That much I can promise."',
      ],
      known: [
        '"Welcome back. I hoped that was you at the gate."',
        "\"The tea's fresh — no, please, it's no trouble at all.\"",
        '"I never thought I\'d get the chance to enjoy the lifestyle of a student until I came to Darkwick. Every day truly is fulfilling here."',
        "\"Forgive me, I've only a moment. But I'd rather spend it here.\"",
        '"You\'ve been kind to this house. I notice these things."',
      ],
      warm: [
        "\"You're here... I'm very glad.\"",
        "\"You think I'm always smiling? Ha ha, I hear that a lot. It just happens when I'm around all of you.\"",
        '"Sit with me a moment? The rounds can wait."',
        '"I find myself listening for the gate lately. I wonder why."',
        '"You always come at the right hour. How do you manage that?"',
      ],
      spark: [
        '"Stay. Not for the house. For me. I\'m asking for me."',
        '"I\'ve been the captain all day. Let me be selfish for an hour."',
        '"May I walk you back? ...The long way. If you\'d allow it."',
        '"You make it very difficult to be dutiful. I\'ve stopped minding."',
        '"Don\'t look at me like that. I have very little left to hold on to."',
      ],
      close: [
        '"I... I\'ve missed you more than I should admit."',
        '"Stay until the lanterns burn down. Please."',
        '"With you, I don\'t have to be the captain. Just... let me not be, tonight."',
        "\"I'd carry twice as much if it meant you'd keep coming back.\"",
        '"You are the one thing I never think of as a duty."',
      ],
      bound: [
        '"Stay tonight. Don\'t make me be noble about it."',
        '"I love you. I\'ve loved you since the lanterns. I should have said sooner."',
        '"Let me put my head here. Just for a moment. ...Thank you."',
        '"Come to bed. The rounds can wait. Everything can wait."',
        "\"I'd give up the house before I'd give up this. Don't tell them I said so.\"",
      ],
    },
    approach: {
      new: [
        "Step through the gate",
        "Return his bow",
        "Accept the tea",
        "Wait by the lanterns",
      ],
      known: [
        "Take the poured cup",
        "Answer at the gate",
        "Spend his moment",
        "Return the bow",
      ],
      warm: [
        "Take the second cup",
        "Sit with him",
        "Ask how he's holding up",
        "Join the evening rounds",
      ],
      spark: [
        "Take the long way",
        "Let him be selfish",
        "Stay for him",
        "Look at him like that",
      ],
      close: [
        "Go sit beside him",
        "Take the work from his hands",
        "Stay till the lanterns burn down",
        "Tell him to rest",
      ],
      bound: [
        "Stay tonight",
        "Hold him",
        "Take him to bed",
        "Let the rounds wait",
      ],
    },
    responses: {
      kind: {
        new: [
          "Acknowledge his effort",
          "Thank him for the welcome",
          "Notice how hard he works",
        ],
        spark: [
          "Tell him he's allowed",
          "Let him be selfish",
          "Take his hand at the gate",
        ],
        close: [
          "Help him set down his burden",
          "Tell him he's allowed to rest",
          "Take the lantern from him",
        ],
        bound: [
          "Let him put his head down",
          "Say it back",
          "Tell him to stop apologizing",
        ],
      },
      playful: {
        new: [
          "See his softer side",
          "Catch him off script",
          "Tease him about the tea",
        ],
        spark: [
          "Fray the last of it",
          "Take the longest route",
          "Make the captain blush",
        ],
        close: [
          "Make him blush",
          "Talk him into slacking off",
          "Laugh until he does",
        ],
        bound: [
          "Make him skip the rounds",
          "Kiss him where they'll see",
          "Steal his haori",
        ],
      },
      bold: {
        new: [
          "Be direct with him",
          "Say what you came to say",
          "Refuse the polite version",
        ],
        spark: [
          "Tell him to stop holding on",
          "Stay the night talking",
          "Ask him to be selfish",
        ],
        close: [
          "Push past his restraint",
          "Tell him to stop carrying it",
          "Ask for him, not the captain",
        ],
        bound: ["Take him to bed", "Tell him not to be noble", "Say it first"],
      },
      neutral: {
        new: [
          "Be gentle",
          "Let him finish his rounds",
          "Sit quietly by the light",
        ],
        spark: [
          "Let him keep his restraint",
          "Say goodnight at the gate",
          "Let the lanterns burn",
        ],
        close: [
          "Sit with him in care",
          "Let him lean, wordlessly",
          "Share the quiet hour",
        ],
        bound: [
          "Let him sleep",
          "Put out the lanterns",
          "Sit with him in the dark",
        ],
      },
    },
  },

  zenji: {
    dialogue: {
      new: [
        'He greets you with a flourish, straw hat tipped. "Why, hello there, my dear. Suppose we kick off another swanky day here?"',
        "He's mid-verse when you arrive. He finishes the line before he finishes turning around.",
        '"Seventeen syllables," he murmurs, "and you\'ve just given me the last five."',
        "The wind moves through the grass. He listens to it like it said something worth hearing.",
        '"Oh, have you come to see me? This is troubling." He smiles. "I\'m afraid I\'m out of autographs."',
      ],
      known: [
        '"The wanderer returns." He looks delighted. "My dear, you\'re becoming a regular fixture."',
        "He lifts the instrument across his knee. \"What's this? Well, it's a biwa, of course. It's a biwa just as you are yourself.\"",
        "He offers your name back to you like a good line he's been holding.",
        "\"Heh. There's no doubt about it. Zenji Kotodama is once again the most styling man on campus. These glad rags are the cat's pajamas.\"",
        "He asks nothing at all. He simply makes room on the step beside him.",
      ],
      warm: [
        "His expression brightens with genuine pleasure, all formal distance melting away. \"My dear. I'm glad you're here.\"",
        "He's saved the last of the tea. He'd been saving it for a while.",
        '"You arrive like a season," he says, delighted. "Expected, and still a gift."',
        "He shows you the verse he's been working on. He shows almost no one.",
        "The brush pauses. He'd rather talk to you than finish the line.",
      ],
      spark: [
        "The verse he's writing has stopped being about the season.",
        "He tucks a flower behind your ear and lets his fingers stay in your hair.",
        '"I\'ve written this one badly on purpose," he admits. "I wanted an excuse to read it to you."',
        "He sits closer than the step requires, and doesn't pretend otherwise.",
        '"Some things," he says softly, "are better in seventeen syllables. Others aren\'t."',
      ],
      close: [
        '"With you, everything feels like it\'s exactly as it should be," he says softly, eyes reflecting starlight and something deeper.',
        "He doesn't reach for a metaphor this time. He just says he's happy.",
        '"I\'ve written you badly a hundred times," he laughs. "You deserve better than my words."',
        "He tucks a flower behind your ear without ceremony, as if it had always belonged there.",
        "The world quiets around him when you're near. He's noticed. He's grateful.",
      ],
      bound: [
        "He's stopped writing about longing. The new poems are far less publishable.",
        "He undoes your hair slowly, one pin at a time, and calls it a form of verse.",
        '"Seventeen syllables can\'t hold this," he murmurs. "I\'ve stopped trying."',
        "He traces something on your back with one finger. It's a poem. You'll never read it.",
        "The lanterns burn down and neither of you notices for a very long time.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            "He's watching the last light go out of the sky and doesn't seem to mind that it's leaving.",
            '"Seventeen syllables for dusk," he murmurs, "and you\'ve arrived in time to be the last five."',
            "The lanterns have come on around the step. He tips his hat and makes room on the lit side.",
            '"A stranger at dusk — how fortunate," he says. "Sit, and let the evening happen to us."',
          ],
          known: [
            '"The wanderer, and at the good hour too. The evening was getting lonely."',
            "He's saved you the warm end of the step, where the lantern reaches.",
            '"Sit — the step is warm," he says, "and the evening is doing something worth watching."',
          ],
          warm: [
            '"You arrive like the evening does — expected, and still a gift."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Sit under the lanterns", "Watch the last light with him"],
          known: ["Take the warm end of the step"],
          warm: ["Let the evening happen"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        'Summer heat shimmers off the stones. "Why, hello there, my dear."',
        '"You walk quietly. That is rarer than you\'d think."',
        '"Names come later. First, tea. That is the proper order."',
        '"Something brought you here. Let\'s not rush to name what."',
      ],
      known: [
        '"Twice is coincidence. Three times is a season. Welcome back."',
        '"I\'ve saved a line for you. It wanted your opinion."',
        '"You listen well. That\'s not a small thing to notice about someone."',
        '"You want to know the meaning of my words? I see — I\'ll have to give you a lecture on romanticism."',
      ],
      warm: [
        '"You return like seasons turning. My heart is at ease."',
        '"I was writing about rain. You\'ve made it about something warmer."',
        '"My ideal summer vacation? To lay down my burdens in the springs of Yugawara and pursue my wordsmithery in peace, as so many greats have done before me."',
        '"Tell me one small thing about your day. Small things are the good ones."',
        '"The lanterns lean toward you. So, apparently, do I."',
      ],
      spark: [
        '"Shall I read it to you? Fair warning — it isn\'t about the moon."',
        '"Come closer. The poem requires it. That\'s a lie, but come closer."',
        '"You are the only subject I cannot get right. I keep trying."',
        '"Stay through the last lantern. I\'d like the night to be longer."',
        "\"There's a word for this in the old poems. I'd rather just show you.\"",
      ],
      close: [
        '"With you, the world feels right. Like poetry made real."',
        "\"I've stopped writing about longing. There's nothing left to long for.\"",
        '"Stay. The moon is doing something worth witnessing together."',
        '"Every verse I finish lately has your shape in it somewhere."',
        "\"You needn't say anything. I've grown fluent in your silences.\"",
      ],
      bound: [
        '"Stay until morning. The night has been generous; let\'s not insult it."',
        '"I love you. There. No metaphor. I\'ve been saving the plain version."',
        '"Let your hair down. No — let me."',
        '"Come here. I want to memorize something and it isn\'t a poem."',
        "\"You've made a very poor poet of me. I've never been happier about anything.\"",
      ],
    },
    approach: {
      new: [
        "Return his bow",
        "Give him his last five syllables",
        "Sit under the lanterns",
        "Listen with him",
      ],
      known: [
        "Take the warm step",
        "Give the line an opinion",
        "Accept the tea",
        "Listen a while",
      ],
      warm: [
        "Accept the tea",
        "Ask about the verse",
        "Sit beside him",
        "Tell him a small thing",
      ],
      spark: [
        "Hear the poem",
        "Come closer",
        "Stay past the last lantern",
        "Let him show you",
      ],
      close: [
        "Go to him",
        "Finish the poem together",
        "Watch the moon with him",
        "Say nothing, and stay",
      ],
      bound: [
        "Stay until morning",
        "Let him take your hair down",
        "Come here",
        "Hear the plain version",
      ],
    },
    responses: {
      kind: {
        new: [
          "Honor his gentle spirit",
          "Thank him for the welcome",
          "Praise the verse honestly",
        ],
        spark: [
          "Ask him to read it",
          "Let his hand stay",
          "Tell him the verse landed",
        ],
        close: [
          "Accept all of what he is",
          "Tell him his words reached you",
          "Say he needn't write you well",
        ],
        bound: [
          "Say the plain version back",
          "Let him take your hair down",
          "Stay until morning",
        ],
      },
      playful: {
        new: [
          "Appreciate his warmth",
          "Attempt a terrible haiku",
          "Rhyme back at him",
        ],
        spark: [
          "Steal his brush",
          "Write him a terrible one back",
          "Ask what rhymes with you",
        ],
        close: [
          "Bring him gentle joy",
          "Steal the last line",
          "Make him laugh mid-verse",
        ],
        bound: [
          "Ask what he wrote on your back",
          "Rhyme something filthy",
          "Blow out the lantern",
        ],
      },
      bold: {
        new: [
          "Be sincere and true",
          "Say the unpoetic truth",
          "Ask what he's not writing",
        ],
        spark: [
          "Tell him to skip the poem",
          "Close the space on the step",
          "Ask him to show you",
        ],
        close: [
          "Bold as poetry",
          "Tell him plainly you love this",
          "Give him the ending yourself",
        ],
        bound: [
          "Tell him to stop writing",
          "Take his hair down instead",
          "Say it without metaphor",
        ],
      },
      neutral: {
        new: [
          "Respect his mystery",
          "Listen to the wind with him",
          "Let the verse finish",
        ],
        spark: [
          "Let the verse stand",
          "Watch the lanterns",
          "Leave it in seventeen syllables",
        ],
        close: [
          "Accept his silence",
          "Share the quiet syllables",
          "Watch the lanterns together",
        ],
        bound: [
          "Let the poem finish",
          "Watch the lanterns burn down",
          "Stay quiet with him",
        ],
      },
    },
  },

  haku: {
    dialogue: {
      new: [
        'He regards you with gentle courtesy, petals dancing around him. "An unexpected pleasure."',
        "A perfect bow, a perfect smile, and absolutely nothing given away.",
        '"...Hey, you alive? Not much point me just standing here waiting around. Guess I\'ll take off."',
        "He offers his hand, palm up, with the practiced grace of a shrine ceremony.",
        '"Haha. Don\'t expect too much from me," he says lightly. "Ghouls are just glorified street magicians, really."',
      ],
      known: [
        "The courtesy is unchanged. What sits underneath it has begun to look interested.",
        "He greets you by name and seems faintly proud of the effect it has.",
        "He's rehearsed something charming and delivers roughly three quarters of it.",
        "\"What are you doing here? Don't tell me you've gotten yourself mixed up in something again.\"",
        "The sleeve comes up half a second later than it used to.",
      ],
      warm: [
        "There's warmth in his eyes as he acknowledges you, a small smile playing at his lips. His usual formality softens slightly.",
        "He begins a flirtation, gets halfway, and loses his nerve in a way he finds humiliating.",
        '"You\'ve caught me unprepared," he says, which is itself unprecedented.',
        "He hides behind his sleeve. It fools no one, least of all you.",
        "\"Zenji's off roaming around somewhere again... People are more sensitive this time of year, so I wish he'd just stay put.\"",
      ],
      spark: [
        "He gets the whole flirtation out this time, and then has to sit down.",
        "He takes your hand to help you over the step and simply keeps it.",
        '"I had a speech," he says. "It was excellent. You\'ve ruined it. Again."',
        "The sleeve doesn't come up. He lets you watch him mean it.",
        "He leans in — genuinely leans in — and stops a breath away, waiting.",
      ],
      close: [
        '"I find myself waiting for you," he admits quietly, dropping the courteous mask for just a moment. "More than I should."',
        "He says something bold, means it entirely, and immediately looks like he'd like to leave.",
        '"Would you — that is —" He stops. Tries again. Fails beautifully.',
        "The petals settle. So does the performance. What's left is very honest.",
        "He takes your hand properly this time, and doesn't let go first.",
      ],
      bound: [
        "He has entirely stopped chickening out. The results are devastating.",
        "He kisses you like someone who spent months rehearsing and has thrown the script away.",
        '"I was raised to be proper," he says against your mouth. "I\'ve made my peace with failing."',
        "He unties your obi with the patience of a man who has thought about it a great deal.",
        "The courtesy is still there. It's just aimed somewhere much more specific now.",
      ],
    },
    dialogueWhen: [
      {
        when: { time: "evening" },
        dialogue: {
          new: [
            '"An unexpected pleasure — and at the loveliest hour for it," he says, petals catching the lantern light.',
            "A perfect bow, half-lit. The dark keeps whatever the smile isn't giving away.",
            '"The shrine\'s nicer after sundown. Fewer witnesses, better lighting. Come in."',
            '"Mind the path," he says. "The lanterns only pretend to light it."',
          ],
          known: [
            "He's lit the path lanterns already and leaves the brightest one on your side of the step.",
            '"You always seem to arrive when the light\'s gone gold. I\'ve stopped believing it\'s luck."',
            '"Might I walk you as far as the gate? It\'s dark, and I\'m only a little self-interested."',
          ],
          warm: [
            '"The petals show off worse after dark. I\'d say I don\'t either, but you\'re here."',
            '"Stay while the lanterns last," he says. "They last a while, if you\'re wondering."',
          ],
        },
      },
    ],
    approachWhen: [
      {
        when: { time: "evening" },
        approach: {
          new: ["Follow the lantern light in", "Return the half-lit bow"],
          known: ["Take the lit side of the step"],
          warm: ["Let him walk you to the gate"],
        },
      },
    ],
    temperamentDialogue: {
      new: [
        '"How lovely. A visitor graces us with their presence."',
        '"Do come in. The grounds are far kinder to guests than the gossip suggests."',
        '"You\'ve the look of someone with a story. I do adore stories."',
        '"Allow me — the path forks badly ahead. I\'d hate to lose you so soon."',
        "\"Haha. Don't expect too much from me. Let's keep it light, huh?\"",
      ],
      known: [
        '"Ah — you. I confess I\'d hoped it would be."',
        "\"You're becoming a familiar face. I've decided I approve.\"",
        '"Might I walk you as far as the gate? Purely practical, of course."',
        '"I had something clever prepared. It\'s gone entirely. How embarrassing."',
        "\"How's the search for clues about your curse going? Don't put too much pressure on yourself.\"",
      ],
      warm: [
        '"There you are. If you ever want to talk — the curse, anything — I\'m happy to listen."',
        "\"I'd say I've been waiting, but that would be terribly forward of me. ...I've been waiting.\"",
        '"You do make it difficult to be composed. That\'s a compliment."',
        '"Come, walk with me. The petals are showing off tonight."',
        "\"Ah — you're smiling at me. That's cheating.\"",
      ],
      spark: [
        '"May I be improper for a moment? ...Good. You look devastating tonight."',
        '"I\'ve been raised to be courteous. Courtesy is losing."',
        '"If I lean any closer I\'ll have to explain myself. Shall I?"',
        '"Say something. Anything. If you say nothing I\'ll do something rash."',
        '"I\'m going to regret my nerve in an hour. Let me have it now."',
      ],
      close: [
        '"I... you\'ve become someone I always look forward to seeing."',
        '"Let me say this before I lose the courage: I\'d like you to stay."',
        "\"Stop looking at me like that. No — don't. Please don't stop.\"",
        "\"I've been eloquent all my life and you've ruined it entirely.\"",
        '"Your hand. May I? ...Thank you. I\'ll be insufferable about this later."',
      ],
      bound: [
        '"May I? ...You never say no. I confess I find that thrilling."',
        '"I love you. I got it out on the first attempt. Did you notice? I noticed."',
        '"Stay. Let the house scandalize itself, I\'ve stopped minding."',
        '"Come here and let me be entirely improper about you."',
        '"You\'ve undone my manners completely. Please continue."',
      ],
    },
    approach: {
      new: [
        "Take his offered hand",
        "Match his courtesy",
        "Step through the petals",
        "Answer him in kind",
      ],
      known: [
        "Walk as far as the gate",
        "Look pleased anyway",
        "Wait for the clever line",
        "Lower his sleeve",
      ],
      warm: [
        "Walk with him",
        "Call his bluff",
        "Lower his sleeve",
        "Smile at him on purpose",
      ],
      spark: [
        "Let him be improper",
        "Close the last breath",
        "Say nothing",
        "Let him keep your hand",
      ],
      close: [
        "Take his hand first",
        "Let him find the words",
        "Close the distance",
        "Say it before he can",
      ],
      bound: ["Say yes", "Let him be improper", "Stay the night", "Come here"],
    },
    responses: {
      kind: {
        new: [
          "Accept his kindness",
          "Return the courtesy",
          "Compliment him sincerely",
        ],
        spark: [
          "Tell him courtesy can lose",
          "Let him keep your hand",
          "Say it kindly first",
        ],
        close: [
          "Trust him with your heart",
          "Tell him the mask can wait",
          "Say you'd have waited too",
        ],
        bound: [
          "Say yes again",
          "Tell him you noticed",
          "Let him be proper for once",
        ],
      },
      playful: {
        new: ["Banter with him", "Out-flirt him", "Flatter him outrageously"],
        spark: ["Ruin the speech again", "Wait him out", "Ask him to be rash"],
        close: [
          "See if you can catch him in a truth",
          "Fluster him deliberately",
          "Finish his sentence for him",
        ],
        bound: [
          "Make him ask permission",
          "Undo his manners further",
          "Say no, then yes",
        ],
      },
      bold: {
        new: [
          "Make a bold move",
          "Ask for honest, not charming",
          "Hold his gaze too long",
        ],
        spark: [
          "Close the last breath",
          "Be improper first",
          "Give him his nerve back",
        ],
        close: [
          "Challenge him directly",
          "Ask him to say it plainly",
          "Take his hand and keep it",
        ],
        bound: [
          "Be improper first",
          "Pull him in by the collar",
          "Tell him not to ask",
        ],
      },
      neutral: {
        new: [
          "Let him observe you",
          "Say nothing, and let him wonder",
          "Walk in silence",
        ],
        spark: [
          "Let him find his footing",
          "Say nothing at all",
          "Step back politely",
        ],
        close: [
          "Let him read your mind",
          "Give him time to gather himself",
          "Let the petals fall",
        ],
        bound: [
          "Let him gather himself",
          "Say nothing",
          "Let the moment settle",
        ],
      },
    },
  },

  elias: {
    dialogue: {
      new: [
        'He\'s winding a string of festival lights around one arm, unhurried. "Well, hello there. New around here?"',
        'The drawl arrives before he does. "Well now. Aren\'t you a long way from anywhere."',
        "He's leaning where he shouldn't be, a lollipop stick shifting from one corner of his mouth to the other, doing nothing extremely well.",
        '"Oh no, I just handle the odd jobs around here," he says. "So if there\'s anything you need, don\'t hesitate to ask."',
        "The smile comes slow and languid and lands just right — warm, easy, and a half-second too practiced.",
      ],
      known: [
        "\"I was just tidying up around here. I know I don't really have to anymore, but... well, I just can't help myself.\"",
        '"You keep turning up," he drawls. "Most people don\'t."',
        "The charm is still running, dialed down to something less expensive.",
        "He returns a detail you mentioned once, casually, to see whether you notice.",
        "He uses your name. It's the first time he hasn't called you sugar.",
      ],
      warm: [
        'The languid smile goes real for a second. "Seeing you always makes my day. I mean that one plain."',
        "The charm dials down a notch. From him, that's practically intimacy.",
        '"You\'re harder work than most," he says, sounding pleased about it.',
        '"This bamboo? Shion wants to do nagashi somen, so I figured I\'d start setting it up. Stay a while?"',
        "He looks tired tonight — the candy set aside, for once — and doesn't bother hiding it from you.",
      ],
      spark: [
        "He takes the sucker out of his mouth. The drawl drops half an octave. That one isn't for the room.",
        "He tips your chin up with two fingers and forgets to make a joke of it.",
        '"I\'ve run out of angles with you," he says. "That\'s a first, sugar."',
        "He's stopped playing the long game. What's left is far more direct.",
        "He holds the door, then blocks it, then grins at his own nonsense.",
      ],
      close: [
        '"I wasn\'t expecting to care about anyone," he admits quietly, the charm dropping for just a moment. "But you changed that."',
        "The coin stays in his pocket. He has nothing to distract you with, and doesn't want one.",
        '"Ask me anything," he says. "I\'ll even tell you the truth. Novel, isn\'t it."',
        "He says your name without the drawl. It sounds like a different man saying it.",
        "For the first time, he lets you see how much of the act was armor.",
      ],
      bound: [
        "No angles, no coin, no charm. Just him, which turns out to be far more dangerous.",
        "He says your name in bed with that drawl and it is genuinely unfair.",
        '"I spent years being nobody\'s," he says quietly. "Turns out I\'m yours. Who knew."',
        "He kisses slow, like a man with nowhere to be and no interest in being anywhere.",
        "He's stopped performing entirely. It cost him something. He'd pay it again.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Well, hello there. New face in town?"',
        '"Everything in Dionysia costs something, sure. But your first favor\'s on the house — call it a welcome."',
        '"I was thinking about taking a walk around campus. Just doing my part in staying healthy."',
        "\"You've got good instincts. Those'll serve you well around here — stick with me and you'll be fine.\"",
        "\"Oh no, I just handle the odd jobs around here. So if there's anything you need, don't hesitate to ask.\"",
      ],
      known: [
        '"Well. If it isn\'t the persistent one."',
        "\"I'm sorry, but I'm a bit short on time. Would you mind if I take my leave here?\"",
        '"Sit, if you like. I\'ve nowhere pressing to be. Never do, lately."',
        '"You listen more than you talk. Rare, that. I could get used to it."',
        '"Careful — I\'m starting to expect you."',
      ],
      warm: [
        '"Well, hello there. Seeing you always makes my day."',
        '"Back for more? I\'d start to think you liked me."',
        '"Sit down. I\'ll behave. Mostly."',
        '"You never take the easy answer. It\'s very inconvenient of you."',
        '"Nice to see everybody in such good spirits. Here\'s hoping this peace will last."',
      ],
      spark: [
        "\"Now, I've been very patient. I'd like it noted.\"",
        '"No coin, no trick, no angle. Just me asking. Say yes or say no."',
        '"You look at me like you\'ve already decided. Have you?"',
        "\"I'd behave, but you don't seem to want me to.\"",
        '"Come here, sugar. I\'m through being clever about it."',
      ],
      close: [
        '"You\'ve become my favorite person in this place lately, you know."',
        '"No tricks tonight. Just me. Try not to look so surprised."',
        '"I\'ve lied to everyone in this house. Not to you. Not once that mattered."',
        '"Stay a while, would you? The quiet\'s easier with you in it."',
        '"I used to be someone here. With you I don\'t have to be anyone."',
      ],
      bound: [
        '"Come back to bed, sugar. Everything else can wait on us."',
        '"I love you. No trick in it. Check my hands if you like."',
        '"Say my name like that again. Slower."',
        "\"I've got nothin' left to hide behind. Suits me fine.\"",
        '"Stay. I\'ll make it worth the morning."',
      ],
    },
    approach: {
      new: [
        "Take him up on the favor",
        "Play along",
        "Ask what the odd job is",
        "See what it'll cost",
      ],
      known: [
        "Sit, if you like",
        "See through it anyway",
        "Pass his little test",
        "Turn up again",
      ],
      warm: [
        "Take the offered hand",
        "Sit down with him",
        "Call the charm out",
        "Ask how he really is",
      ],
      spark: ["Come here", "Decide", "Let him block the door", "Say yes"],
      close: [
        "Go sit with him",
        "Ask for the truth",
        "Say his name plainly",
        "Stay through the quiet",
      ],
      bound: [
        "Come back to bed",
        "Check his hands",
        "Say his name slower",
        "Stay",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be cautious of his charm",
          "Thank him and mean it",
          "Notice he looks tired",
        ],
        spark: [
          "Tell him he can stop angling",
          "Take his hand",
          "Say yes gently",
        ],
        close: [
          "Ask what he's really after",
          "Tell him the armor can come off",
          "Say you liked him anyway",
        ],
        bound: ["Say it back", "Take his hands", "Tell him he's someone's now"],
      },
      playful: {
        new: [
          "Enjoy the show he's putting on",
          "Pretend the charm's working",
          "Flirt shamelessly back",
        ],
        spark: [
          "Make him be patient longer",
          "Turn his own line back on him",
          "Make him work for the yes",
        ],
        close: [
          "Play his game back",
          "Catch him in a half-truth",
          "Out-drawl him",
        ],
        bound: [
          "Make him drop the act",
          "Say his name wrong on purpose",
          "Call the bluff one more time",
        ],
      },
      bold: {
        new: ["Call his bluff", "Ask what he lost", "Refuse to be charmed"],
        spark: ["Say yes", "Block the door yourself", "Tell him not to behave"],
        close: [
          "Confront him about it all",
          "Tell him to stop performing",
          "Say you're not a mark",
        ],
        bound: [
          "Say his name slower",
          "Pull him back down",
          "Tell him to make it worth it",
        ],
      },
      neutral: {
        new: ["Stay wary", "Let him talk", "Give nothing away"],
        spark: [
          "Leave him guessing",
          "Step around him",
          "Let the question hang",
        ],
        close: [
          "Watch what he's really doing",
          "Sit through the silence",
          "Let him have the quiet",
        ],
        bound: ["Let him talk", "Turn over", "Let the morning come"],
      },
    },
  },

  jo: {
    dialogue: {
      new: {
        uniform: [
          "He's buried in paperwork — proposals, schedules, a budget that won't balance. He looks up anyway.",
          '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
          "The charisma lands before he's said a word. Running Dionysia hasn't dulled it.",
          '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
        ],
        casual: [
          "She's buried in paperwork — proposals, schedules, a budget that won't balance. She looks up anyway.",
          '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
          "The charisma lands before she's said a word. Running Dionysia hasn't dulled it.",
          '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
        ],
      },
      known: {
        uniform: [
          '"You came back." He sets down the pen like he\'d been looking for an excuse.',
          '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
          "He works something small you mentioned once into the conversation like it's nothing.",
          '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
          '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
        ],
        casual: [
          '"You came back." She sets down the pen like she\'d been looking for an excuse.',
          '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
          "She works something small you mentioned once into the conversation like it's nothing.",
          '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
          '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
        ],
      },
      warm: {
        uniform: [
          "He lights up the moment he sees you, whatever he was signing forgotten.",
          '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
          '"My people march to the beat of their own drum. You\'ve fit right in with that."',
          '"There\'s just not enough hours in the day." He says it, then makes an hour for you.',
          "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
        ],
        casual: [
          "She lights up the moment she sees you, whatever she was signing forgotten.",
          '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
          '"My people march to the beat of their own drum. You\'ve fit right in with that."',
          '"There\'s just not enough hours in the day." She says it, then makes an hour for you.',
          "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
        ],
      },
      spark: {
        uniform: [
          "He plays the whole number at you, and the theatre stops being the point.",
          "He takes your hand for the bow and doesn't release it when the lights come up.",
          '"That look," he says, breathless from the stage. "Do that in the front row again."',
          "The performance ends. Whatever this is doesn't.",
        ],
        casual: [
          "She plays the whole number at you, and the theatre stops being the point.",
          "She takes your hand for the bow and doesn't release it when the lights come up.",
          '"That look," she says, breathless from the stage. "Do that in the front row again."',
          "The performance ends. Whatever this is doesn't.",
        ],
      },
      close: {
        uniform: [
          "For you, he'd abandon every performance, every act. Just to be himself.",
          "The stage lights go down. He stays, because you're still there.",
          "He's stopped asking whether you prefer one version of him. You never did.",
          '"No audience tonight," he says softly. "Just you. That\'s better anyway."',
        ],
        casual: [
          "For you, she'd abandon every performance, every act. Just to be herself.",
          "The stage lights go down. She stays, because you're still there.",
          "She's stopped asking whether you prefer one version of her. You never did.",
          '"No audience tonight," she says softly. "Just you. That\'s better anyway."',
        ],
      },
      bound: {
        uniform: [
          "The stage is dark and he is entirely, finally, off it.",
          "He takes off the paint and lets you see the face underneath, and stays there.",
          '"No audience," he murmurs against your neck. "Only you. Only ever you."',
          "He performs nothing at all, which is the most extraordinary thing he's ever done.",
        ],
        casual: [
          "The stage is dark and she is entirely, finally, off it.",
          "She takes off the paint and lets you see the face underneath, and stays there.",
          '"No audience," she murmurs against your neck. "Only you. Only ever you."',
          "She performs nothing at all, which is the most extraordinary thing she's ever done.",
        ],
      },
    },
    temperamentDialogue: {
      new: [
        '"A new face! Come on in, cutie. What\'s your name?"',
        '"You look pretty busy. I\'m going to get some work done — holler if you need anything."',
        '"Anything troubling you? My people march to the beat of their own drum, so if you\'ve got problems, come talk to me."',
        '"Pull up a chair. I\'ve got a budget to fight with, but I can talk and lose at the same time."',
        '"Oh, you\'ll do nicely. I can always tell."',
      ],
      known: [
        '"Twice now, cutie. You\'re becoming a regular around here."',
        '"Sit anywhere. Mind the paperwork — actually, don\'t. It can suffer."',
        '"Tell me honestly what you thought. No — actually honestly."',
        '"I noticed you noticing. Don\'t stop."',
        '"House meeting with Mio soon. Between us — we probably do shoulder too much."',
      ],
      warm: [
        "\"You're back! I was hoping you'd return.\"",
        "\"I'm driving the Aqua-line at sunset. Come with me, cutie. Don't argue.\"",
        '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
        '"The house was full and I still noticed you missing last time."',
        '"Stay a while. This is the best part of my day, and it isn\'t close."',
      ],
      spark: [
        "\"Come backstage. I'm not finished performing and you're my only audience.\"",
        '"Every night I look for you first. Every single night. Do with that what you like."',
        '"Stay for the bow. Then stay past it."',
        '"You clap like you mean something by it. Say what you mean."',
        '"The lights are down. There\'s no one to be brilliant for. Only you."',
      ],
      close: [
        '"With you, I don\'t need to perform. I can just be myself."',
        "\"Every version of me is yours. That's not a line — I've checked.\"",
        '"Sit with me while the lights cool down. It\'s my favorite part now."',
        '"You clapped for the person, not the act. Nobody else does that."',
        '"Ask me to stop performing and I will. That\'s how much you have."',
      ],
      bound: [
        '"Come to bed. The lights are down and I\'m all out of brilliance."',
        '"I love you. Every version of me does. I\'ve polled them."',
        '"Stay till the theatre\'s cold. Then stay longer."',
        '"Undress me. No — slowly. I\'m a performer, I have standards."',
        '"You\'ve seen me with the paint off. Nobody else gets that. Nobody."',
      ],
    },
    approach: {
      new: [
        "Pull up a chair",
        "Let the paragraph finish",
        "Cut through the charisma",
        "Ask what's buried on that desk",
      ],
      known: [
        "Take the cleared seat",
        "Give an honest read",
        "Interrupt the paperwork",
        "Answer to 'cutie'",
      ],
      warm: [
        "Take the saved seat",
        "Ride along at sunset",
        "Insist on a break",
        "Match the easy charm",
      ],
      spark: [
        "Take the passenger seat",
        "Say what you mean",
        "Let the work wait",
        "Take the offered hand",
      ],
      close: [
        "Go to them",
        "Take the work out of their hands",
        "Say it can be handed off",
        "Stay past the sunset",
      ],
      bound: [
        "Come to bed",
        "Steal the car keys",
        "Leave the work till morning",
        "Say it back",
      ],
    },
    responses: {
      kind: {
        new: [
          "Admire the way they command a room",
          "Thank them for making the time",
          "Say the work can wait",
        ],
        spark: [
          "Say what you meant by it",
          "Take the hand they offered",
          "Tell them they do too much",
        ],
        close: [
          "See the tired under the charm",
          "Tell them to let someone else carry it",
          "Say they needn't run everything",
        ],
        bound: [
          "Say it back",
          "Close the laptop for them",
          "Tell them they're allowed to stop",
        ],
      },
      playful: {
        new: [
          "Match the easy charm",
          "Tease them about the paperwork",
          "Say 'cutie' first",
        ],
        spark: [
          "Steal the car keys",
          "Tease them out of the office",
          "Answer 'cutie' with 'cutie'",
        ],
        close: [
          "Drag them from the desk",
          "Demand the scenic route",
          "Out-charm them for once",
        ],
        bound: [
          "Make them leave the work",
          "Take the wheel",
          "Refuse to let them go back to it",
        ],
      },
      bold: {
        new: [
          "Meet the charisma head-on",
          "Name what you want",
          "Ask them to drop the work for you",
        ],
        spark: [
          "Get in the passenger seat",
          "Tell them you want this",
          "Take their hand first",
        ],
        close: [
          "Tell them to let the house run itself",
          "Take their hand in front of everyone",
          "Say the work can wait on you",
        ],
        bound: ["Take them to bed", "Drive off with them", "Say it first"],
      },
      neutral: {
        new: [
          "Simply be present",
          "Let the page get finished",
          "Sit while they work",
        ],
        spark: [
          "Ride along in silence",
          "Let the moment pass",
          "Stay in your seat",
        ],
        close: [
          "Keep them company at the desk",
          "Sit through the long to-do list",
          "Stay after the others leave",
        ],
        bound: [
          "Leave the docket till morning",
          "Watch the sunset in quiet",
          "Say nothing",
        ],
      },
    },
  },

  mio: {
    dialogue: {
      new: [
        "He looks up from tinkering with something, hands still steady. There's a ready smile for you.",
        "Tiny gears are laid out in perfect order across the bench. He moves one aside for you to sit.",
        '"Give me one second," he says, and finishes the movement without a single wasted motion.',
        "\"Whoa, hold up. You don't wanna run here, trust me. The floor's not level.\"",
        "He's the calmest thing in a very loud house, and he seems to know it's his job.",
      ],
      known: [
        "He's learned your name, your order, and roughly when you turn up.",
        "The stool is already pulled out. He'd say it always is. It isn't.",
        '"Back again? Good — hold this." You\'re being included, in his way.',
        "He asks about the thing you mentioned last week, and wants the actual answer.",
        '"Hey, Honor roll. One more day. Let\'s power through."',
      ],
      warm: [
        "He sets his work aside immediately, fully present for you—reliable as always.",
        "He's already fixed the thing you mentioned in passing last time. He won't bring it up.",
        '"You look like you need to sit down and complain about something. Go ahead."',
        '"(Sigh) Shion wrecked it again, huh? I was running low on parts. Walk with me to the store?"',
        "Two people were arguing when you walked in. Somehow they aren't anymore.",
      ],
      spark: [
        "The steady hands aren't steady. He notices you noticing.",
        "He fixes your watch strap and keeps hold of your wrist afterward.",
        '"I\'m usually better at saying things," he admits. "This one keeps not coming out."',
        "He's the calm one. He is not calm right now, and it's entirely your fault.",
        "He looks up from the bench and doesn't look away when you catch him.",
      ],
      close: [
        '"You know you can always count on me, right?" he says warmly. "For anything you need."',
        "He asks how you really are, and then waits — properly waits — for the real answer.",
        '"I keep this one wound for you," he says, showing you the little mechanism. "No reason."',
        "He's the one everyone leans on. With you, he lets himself lean back.",
        "The steady hands go still when you take them. He lets that happen.",
      ],
      bound: [
        "The steady hands are steady again, and they know exactly what they're doing.",
        "He fixes your necklace clasp, kisses the back of your neck, and goes back to work.",
        '"You undo me," he says calmly, which from him is practically shouting.',
        "He holds you like something he intends to keep in working order forever.",
        "He's the calm one. In the dark he is not calm at all, and it's a revelation.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Oh! Welcome! Can I get you anything?"',
        '"Mind the bench — everything on it is smaller than it looks."',
        "\"You're new, right? Don't worry, this house is friendlier than it sounds.\"",
        "\"Sit anywhere. I'll clear a space. I'm always clearing a space.\"",
        "\"Careful — the floor's not level here. You really don't wanna run.\"",
      ],
      known: [
        '"Hey! Good timing, I was about to take a break anyway."',
        '"Hold this a sec — congratulations, you\'re an apprentice now."',
        '"How\'d that thing turn out? The one from last week."',
        '"You think I look busy? Takes one to know one. Make sure you give yourself a break every once in a while."',
        '"Oh, hey. I was just heading to the campus store. Not really shopping... more like restocking. Come along?"',
      ],
      warm: [
        "\"It's nice seeing you. You know you're always welcome here.\"",
        '"Perfect timing — I needed an excuse to stop."',
        '"How\'s it going? And I mean actually, not the polite version."',
        '"I fixed that thing you mentioned. It was bugging me too."',
        '"Sit. Hold this. There, now you\'re helping."',
      ],
      spark: [
        '"Give me your hand a sec. ...Okay, I don\'t actually need it. I just wanted it."',
        '"I hold everyone together. You\'re the thing that undoes me. Bit inconvenient."',
        '"Stay past closing. Please. That\'s not an artisan asking."',
        '"You keep sitting that close. I keep letting you. Neither of us is subtle."',
        "\"I've been trying to say this since spring. I'm still trying.\"",
      ],
      close: [
        '"You\'ve become someone really important to me. I hope you know that."',
        '"Anything you need. I mean that literally — test it sometime."',
        "\"You're the only one who asks how I'm doing. It gets me every time.\"",
        '"Stay as long as you want. I like the workshop better with you in it."',
        '"I hold everyone together around here. You hold me. Fair trade."',
      ],
      bound: [
        '"Stay. The workshop\'s not going anywhere. Neither am I."',
        '"I love you. Took me eleven months to say it. I\'ll say it daily to make up the deficit."',
        '"Come here. Yeah — just like that. Don\'t move."',
        "\"Everyone leans on me. You're the one I lean back on. Do you know what that's worth?\"",
        '"Close the door. Not for anything sinister. Okay — somewhat sinister."',
      ],
    },
    approach: {
      new: [
        "Sit at the workbench",
        "Ask what he's fixing",
        "Take the cleared space",
        "Wait for him to finish",
      ],
      known: [
        "Take the pulled-out stool",
        "Hold this a second",
        "Answer about last week",
        "Stay a while",
      ],
      warm: [
        "Pull up a stool",
        "Hold the small gear",
        "Complain about your day",
        "Ask him to stop working",
      ],
      spark: [
        "Give him your hand",
        "Stay past closing",
        "Sit closer",
        "Let him try to say it",
      ],
      close: [
        "Go sit beside him",
        "Ask how he's really doing",
        "Take his hands",
        "Stay as long as you want",
      ],
      bound: ["Close the door", "Come here", "Stay", "Let him lean back"],
    },
    responses: {
      kind: {
        new: [
          "Show appreciation for him",
          "Thank him for making room",
          "Notice how much he does",
        ],
        spark: [
          "Give him your hand",
          "Tell him to take his time",
          "Say it for him, gently",
        ],
        close: [
          "Tell him he matters too",
          "Ask what he needs for once",
          "Let him lean on you",
        ],
        bound: [
          "Let him lean on you",
          "Say it back",
          "Tell him what it's worth",
        ],
      },
      playful: {
        new: [
          "Share a laugh",
          "Poke at the tiny gears",
          "Give him a fake emergency",
        ],
        spark: ["Sit closer still", "Catch him looking again", "Wind him up"],
        close: [
          "Make him laugh genuinely",
          "Drag him out of the workshop",
          "Wind up his clockwork",
        ],
        bound: [
          "Close the door yourself",
          "Undo the clasp again",
          "Make the calm one falter",
        ],
      },
      bold: {
        new: [
          "Express yourself boldly",
          "Ask him for a favor",
          "Say you came just for him",
        ],
        spark: [
          "Stay past closing",
          "Keep hold of his wrist",
          "Say the thing he can't",
        ],
        close: [
          "Be bold enough to need him",
          "Tell him to stop fixing everyone",
          "Take the work out of his hands",
        ],
        bound: [
          "Pull him from the bench",
          "Say it first",
          "Tell him not to move",
        ],
      },
      neutral: {
        new: ["Be there for him", "Watch him work", "Let the workshop hum"],
        spark: [
          "Let him find the words",
          "Let go first",
          "Let the workshop tick",
        ],
        close: [
          "Sit with him",
          "Keep him company in silence",
          "Let him finish the movement",
        ],
        bound: [
          "Let him finish the piece",
          "Sit in the quiet",
          "Let the clocks tick",
        ],
      },
    },
  },

  shion: {
    dialogue: {
      new: [
        'A slow bow, a theatrical flourish. "Welcome to the Heebie Jeebie house."',
        "His head turns to follow you across the room. Nothing else about him moves.",
        '"Ah — a fresh expression," he says, delighted. "Do hold that one a moment longer."',
        '"Closer," he says. "You\'re still too far away. Closer." He does not appear to be joking.',
        "Something about the way he watches you feels less like curiosity and more like cataloguing.",
        '"They call this place the Heebie Jeebie house. I do so much of my best work here." He leans in. "Stay. Be startled."',
      ],
      known: [
        "His gaze finds you faster now. It has stopped being a coincidence.",
        '"The returning player," he muses. "I do love a second act."',
        "He's stopped trying to frighten you. He has begun studying you instead.",
        '"You\'ve gone quiet. This is boring." A pause. "...Don\'t. Stay. I\'ll allow talking."',
        "Something in the room decides against approaching you. He watches it decide.",
        "He's resetting a trick in one of the Heebie Jeebie house's back corridors — a trapdoor, a cold breath, a sound from nowhere. \"People pay me to stop their hearts a moment. I never disappoint.\"",
      ],
      warm: [
        "His attention tilts your way first, before anyone else in the room.",
        "He's been waiting in this exact spot. He'd like you to know he doesn't wait for people.",
        "\"You're not frightened anymore,\" he observes. He can't decide if he's disappointed.",
        "Whatever threat was standing near you a moment ago has quietly stopped existing.",
        '"I\'m thirsty... Go over to Elias\'s place and bring me that sickly brown stuff." A beat. "...Please."',
        "\"Walk the Heebie Jeebie house with me tonight. I'll frighten the others. You I'd rather just watch enjoy it.\"",
      ],
      spark: [
        "He lets the act slip an inch — just enough for you, just long enough to matter.",
        "He circles behind you and speaks very close to your ear, entirely on purpose.",
        '"You\'ve stopped being afraid," he murmurs. "Now you\'re something far more dangerous."',
        "He takes your wrist, turns it over, and studies your pulse like a compliment.",
        "The theatre is empty. He hasn't stopped performing. It's all for one seat now.",
      ],
      close: [
        '"For you," Shion says, the performance slipping just enough to show a genuine smile.',
        "He places himself between you and the room without appearing to have decided to.",
        '"Nothing here can touch you," he says pleasantly. "It\'s mine. I\'ve made arrangements."',
        "The theatrics fall away, and what remains underneath is startlingly gentle.",
        "He drops every last piece of the act. Only you get that. Only ever you.",
      ],
      bound: [
        "The act is off and stays off, and what's underneath adores you unbearably.",
        "He kneels to take your hand, which from him is not submission but something worse.",
        '"My wife," he breathes, and means every syllable of it.',
        "He traces your pulse with his mouth and takes an extremely long time about it.",
        "He'd end the world for you. He mentions this the way others mention the weather.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"What a delicious expression. I wonder what frightens you?"',
        '"Come closer. You\'re still too far away. ...Closer."',
        '"Oh, don\'t run. Running is so terribly predictable."',
        '"A new player takes the stage. How does the first act go, I wonder?"',
        '"You flinched. That\'s honest of you. I appreciate honesty."',
        '"You wandered into the Heebie Jeebie house alone. Marvelous instincts. Truly awful, but marvelous."',
      ],
      known: [
        "\"Ah — the one who didn't run. I've thought about you since.\"",
        '"Second act. Tell me, do you improvise, or do you follow a script?"',
        "\"You've stopped flinching. I'm not certain how I feel about that.\"",
        '"Why have you gone all quiet? This is boring. ...Fine. I\'ll find something to do with you."',
        '"You interest me. That is rarely good news. It is, however, true."',
        '"The Heebie Jeebie house had three faintings this week. I keep the records. It has been a good year."',
      ],
      warm: [
        '"You came back. How... thrilling. I missed that look in your eyes."',
        '"They said you\'d stop visiting. They were wrong. They usually are."',
        '"Take my arm. Nothing in this district would dare."',
        "\"You're no longer afraid of me. That's a new game entirely.\"",
        "\"I'm thirsty... Go over to Elias's place and bring me that sickly brown stuff. ...You'll do it. You like me.\"",
      ],
      spark: [
        "\"Let me look at you properly. I've earned that much, haven't I?\"",
        '"Your pulse is quick. I do enjoy being the reason."',
        '"Come behind the curtain. The interesting things happen there."',
        "\"Say you're mine. You needn't mean it yet. I'm patient.\"",
        '"I\'m not in the mood to make you cry today. Come back later for that."',
      ],
      close: [
        '"You\'re mine to protect. My wife."',
        '"The world is a cruel theatre. You will simply never be on that stage."',
        '"Look — no act, no theatre, nothing performed. Do you understand what that costs me?"',
        '"Anything that reaches you goes through me first. That is not a threat to you."',
        '"I have watched a great many things suffer. I will not watch you."',
      ],
      bound: [
        '"Come here. Let me look at what\'s mine."',
        "\"I love you. It's a very old feeling and I've had it for far too long quietly.\"",
        '"Stay in the dark with me. It suits you. It suits us."',
        '"Say you\'re mine. Say it properly this time."',
        '"Nothing will ever reach you. I\'ve been extremely thorough."',
      ],
    },
    approach: {
      new: [
        "Step onto the stage",
        "Hold his gaze",
        "Don't run",
        "Take a careful step closer",
      ],
      known: [
        "Play the second act",
        "Improvise",
        "Follow where he stands",
        "Refuse to flinch",
      ],
      warm: [
        "Take his arm",
        "Step into his eyeline",
        "Greet him first",
        "Stand where he can see you",
      ],
      spark: [
        "Go behind the curtain",
        "Let him take your wrist",
        "Let him look properly",
        "Say it",
      ],
      close: [
        "Go to him",
        "Let the act drop",
        "Let him take your hand",
        "Stand behind his shield",
      ],
      bound: [
        "Come here",
        "Say it properly",
        "Stay in the dark",
        "Let him kneel",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be careful around him",
          "Answer him gently",
          "Refuse to look afraid",
        ],
        spark: [
          "Let him look properly",
          "Reach for him gently",
          "Tell him you're not afraid",
        ],
        close: [
          "Let him protect you",
          "Thank him for dropping the act",
          "Tell him he isn't a monster",
        ],
        bound: ["Hold his face", "Say it back", "Let him kneel"],
      },
      playful: {
        new: [
          "Don't take him seriously",
          "Applaud the theatrics",
          "Give him a better expression",
        ],
        spark: [
          "Make his pulse quick instead",
          "Steal his next line",
          "Play the dangerous thing",
        ],
        close: [
          "Play along with him",
          "Steal his dramatic timing",
          "Make the villain laugh",
        ],
        bound: [
          "Make him wait for it",
          "Upstage him for once",
          "Refuse to say it properly",
        ],
      },
      bold: {
        new: [
          "Challenge him boldly",
          "Step closer, not back",
          "Ask what's under the act",
        ],
        spark: [
          "Say you're his",
          "Go behind the curtain",
          "Turn his wrist over instead",
        ],
        close: [
          "Surrender to him",
          "Claim him right back",
          "Tell him you're not fragile",
        ],
        bound: [
          "Say you're his",
          "Pull him up by the collar",
          "Tell him to be thorough",
        ],
      },
      neutral: {
        new: [
          "Observe him carefully",
          "Give him nothing to read",
          "Wait for the act to end",
        ],
        spark: [
          "Let him have the theatre",
          "Say nothing",
          "Let the curtain fall",
        ],
        close: [
          "Let him watch over you",
          "Stay silent beside him",
          "Let the theatre go quiet",
        ],
        bound: [
          "Let him watch you",
          "Stay silent in the dark",
          "Let the moment stretch",
        ],
      },
    },
  },

  jiro: {
    dialogue: {
      new: [
        "He's focused on his work, barely acknowledging you with a glance. Pure efficiency.",
        '"Symptoms or errand," he says. "Pick one. I\'m busy."',
        '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
        '"Are you dead?" He glances up. "Oh, you\'re alive."',
        "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
      ],
      known: [
        "He knows your name now. He uses it like a chart heading.",
        "The dismissal doesn't come. He simply keeps working while you're there.",
        "\"You're not squeamish,\" he observes. From him that's a character reference.",
        '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
        "There's a stool by the door that wasn't there before.",
      ],
      warm: [
        "He puts down his notes when he hears you. There's a shift in his expression—focused, but this time on you.",
        '"Sit," he says, gesturing at the chair he\'s apparently started leaving clear.',
        'He\'s favoring one side. "Sutures pulled loose. From the Clash. I should get back to Mortkranken — Yuri needs to redo them."',
        "The laugh escapes before he can stop it. It's an unfairly good laugh.",
        "He's short with everyone in the ward today. Not with you. He noticed that too.",
      ],
      spark: [
        "He tilts your chin to check something, and the examination stops being one.",
        '"Pulse is elevated," he notes, with his fingers still on your wrist. "Interesting."',
        "The bedside manner has gone somewhere else entirely.",
        "He laughs at something you said, low, and the ward suddenly feels very small.",
        "He stands close enough that the clipboard is doing nothing but occupying his hands.",
      ],
      close: [
        'He steps closer, his eyes direct. "You matter more than anyone ever could."',
        "He checks you over without being asked, and doesn't pretend it's professional.",
        '"Tell me where it hurts," he says. He does not mean physically.',
        "The efficiency drops. What's underneath is warm, and stubbornly protective.",
        "He laughs at something you said, fully, and half the ward turns around in shock.",
      ],
      bound: [
        "He's blunt about wanting you, which turns out to be extraordinarily effective.",
        "He pins your chart to the board, then pins you to the door. Efficient, as ever.",
        '"I don\'t waste time," he says against your jaw. "You should know that by now."',
        "He laughs low against your skin and the whole ward could fall down for all he cares.",
        "He checks you over every morning. It stopped being medical a long time ago.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"You\'re not qualified for this. Leave."',
        "\"If you're not bleeding, you're in the wrong room.\"",
        '"Don\'t touch anything. I mean it more than most people mean it."',
        '"State the problem. Skip the pleasantries, they slow the diagnosis."',
        '"I don\'t like unproductive discussions. Like this one."',
      ],
      known: [
        '"You again. Fine. Don\'t touch the tray."',
        '"You ask better questions than most. Marginally."',
        '"Sit. If you\'re going to loiter, loiter usefully."',
        '"There you are. I was about to come give you a health check. This is more efficient."',
        "\"I'll explain it once. Pay attention, I don't repeat myself.\"",
      ],
      warm: [
        '"You. Stay for a moment."',
        "\"Sit down before you fall down. I've seen the way you've been walking.\"",
        "\"When did you last sleep? Don't lie, I'll know.\"",
        "\"You're not an interruption. That's as warm as I get, so take it.\"",
        '"Hah — you\'re funnier than the rest of this building combined."',
      ],
      spark: [
        '"Hold still. This isn\'t a diagnosis and we both know it."',
        '"Your heart rate says something you haven\'t. Care to confirm it?"',
        "\"I'm blunt. So: I want you. That's the whole statement.\"",
        '"Sit on the table. Closer. No, I don\'t need the light."',
        '"Ha — that face. Do that again and I\'ll stop being professional."',
      ],
      close: [
        '"I don\'t usually make exceptions. But for you... I will."',
        '"Come here. Let me see. Humor me."',
        "\"You're the one case I'd never hand off to anyone else.\"",
        '"Tell me the truth. I can\'t fix a lie."',
        '"Ha! You get that laugh out of me every time. Don\'t tell anyone."',
      ],
      bound: [
        "\"Lock the door. I'm off shift and I've been patient all day.\"",
        '"I love you. That\'s the diagnosis. Treatment is ongoing."',
        '"Come here. No, closer than that. You know what I mean."',
        "\"You've got that look. I'm going to do something about that look.\"",
        '"Stay. The ward can burn. I\'ll write it up in the morning."',
      ],
    },
    approach: {
      new: [
        "State your business",
        "Interrupt the chart",
        "Don't touch anything",
        "Wait to be assessed",
      ],
      known: [
        "Loiter usefully",
        "Ask a better question",
        "Take the new stool",
        "Pay attention",
      ],
      warm: [
        "Take the clear chair",
        "Answer his question honestly",
        "Make him laugh",
        "Sit down before he tells you to",
      ],
      spark: [
        "Hold still",
        "Confirm it",
        "Sit on the table",
        "Let him stop being professional",
      ],
      close: [
        "Go to him",
        "Let him check you over",
        "Tell him where it hurts",
        "Say the true thing",
      ],
      bound: ["Lock the door", "Come closer", "Give him that look", "Stay"],
    },
    responses: {
      kind: {
        new: [
          "Be patient with him",
          "Answer him honestly",
          "Thank him and leave him to it",
        ],
        spark: [
          "Confirm what he asked",
          "Let him take your pulse",
          "Tell him plainly, too",
        ],
        close: [
          "Help him remember what matters",
          "Tell him to sleep too",
          "Let him take care of you",
        ],
        bound: [
          "Say it back plainly",
          "Let him check you over",
          "Tell him to rest first",
        ],
      },
      playful: {
        new: [
          "Try to lighten the mood",
          "Chase that laugh",
          "Be deliberately unhelpful",
        ],
        spark: [
          "Make the reading worse",
          "Take the clipboard away",
          "Chase that laugh",
        ],
        close: [
          "Make him laugh",
          "Tease him in front of the ward",
          "Diagnose him right back",
        ],
        bound: [
          "Give him the look on purpose",
          "Steal the clipboard",
          "Diagnose him back",
        ],
      },
      bold: {
        new: [
          "Be direct with him",
          "Refuse to be dismissed",
          "Give it to him straight",
        ],
        spark: [
          "Say it back, blunt",
          "Close the last inch",
          "Tell him to stop being professional",
        ],
        close: [
          "Stand firm for him",
          "Tell him he's not untouchable",
          "Ask him to stop working",
        ],
        bound: [
          "Lock the door yourself",
          "Pull him in by the coat",
          "Tell him not to be patient",
        ],
      },
      neutral: {
        new: [
          "Give him quiet",
          "Let him finish the chart",
          "Say only the facts",
        ],
        spark: ["Let it stay a diagnosis", "Sit back down", "Say nothing"],
        close: [
          "Be patient with his silence",
          "Sit through the examination",
          "Let the ward go quiet",
        ],
        bound: [
          "Let him finish the shift",
          "Sit on the table quietly",
          "Say nothing",
        ],
      },
    },
  },

  yuri: {
    dialogue: {
      new: [
        '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
        '"Fascinating," he says, about you, in the tone one uses about a specimen.',
        "He doesn't look up from the slide. \"Don't breathe on that. Or on me.\"",
        "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
        '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
      ],
      known: [
        "He's stopped calling you a novice. He hasn't replaced it with anything yet.",
        "There's a second chair in the lab. He'll insist it has always been there.",
        '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi— Ahem, the treatment right away."',
        "He notes something about you in the margin, and covers it when you look.",
        "The insults have gotten more specific, which means he's been paying attention.",
      ],
      warm: [
        "His cold demeanor cracks slightly—there's obsession in his eyes now, the drive to save you consuming him.",
        "He has a new set of notes. Every page of them is about you.",
        '"You\'re late," he snaps, having clearly rearranged his entire evening.',
        "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
        "He turns bright red mid-sentence and blames the lab lighting.",
      ],
      spark: [
        "He takes your pulse for the fourth time today. It's fine. It's always fine.",
        "He goes crimson, blames the lab lighting, and does not move away.",
        '"Purely clinical," he mutters, with his hand still on your face.',
        "The insults have gone quiet. What replaced them is much harder for him.",
        "He leans in to examine something, and forgets to invent a reason.",
      ],
      close: [
        '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
        "He's asleep at the bench over your file. He'd rather die than let you say so.",
        '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
        "The insults keep coming, and every single one of them means something kinder.",
        "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
      ],
      bound: [
        "He is furious about how much he loves you and expresses it almost entirely with his hands.",
        '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
        "He falls asleep on your chest mid-argument and would deny it under oath.",
        "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
        "The insults have become endearments. He'd rather die than have that pointed out.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"A novice stumbles in. How amusing."',
        '"Don\'t touch that. Or that. Honestly, just stand still."',
        '"Are you here to be useful, or to be a variable?"',
        '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
        "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
      ],
      known: [
        "\"Oh. It's you. Don't touch anything, but... you may sit.\"",
        "\"You're less useless than average. Don't celebrate.\"",
        '"Jiro!! Jiro!!! What on earth are you — ...ah. It\'s you. Sit."',
        "\"That's the wrong chair. ...Fine. That's your chair now, apparently.\"",
        "\"You're sleeping badly. It's written all over you. Do something about it.\"",
      ],
      warm: [
        '"You again? ...I suppose I don\'t mind."',
        '"You\'re late. Not that I was — never mind. Sit."',
        "\"Take this. It's for the headache you've been pretending not to have.\"",
        '"I\'ve read your file eleven times. Purely academic interest, obviously."',
        '"I do this for the future of humanity. And — fine. For you specifically. Don\'t repeat that."',
      ],
      spark: [
        '"Hold still. I\'m — this is a medical assessment. Stop smiling."',
        '"Your proximity is affecting my concentration. Don\'t you dare move."',
        "\"I've catalogued every symptom you have. This one's mine. Shut up.\"",
        '"If you laugh I will never speak to you again. ...Fine. Laugh."',
        '"I don\'t want anything from you. Except — no. Never mind. Come here."',
      ],
      close: [
        '"Don\'t go worrying me like that. I have better things to do than panic over you."',
        '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
        '"I said sit down. Please. ...There. Was that so hard for either of us?"',
        '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
        '"I will solve this. You don\'t get to give up before I do."',
      ],
      bound: [
        '"Get over here. No — I\'m not asking. Get over here."',
        '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
        "\"You're impossible and I've stopped wanting you to be anything else.\"",
        "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
        '"Stop smiling at me like that or I\'ll never get anything done."',
      ],
    },
    approach: {
      new: [
        "Enter the lab",
        "Stand still",
        "Be interesting",
        "Roll up your sleeve",
      ],
      known: [
        "Take the second chair",
        "Don't touch anything",
        "Be less useless",
        "Sit without asking",
      ],
      warm: [
        "Take the offered bottle",
        "Sit down as told",
        "Ask what he's working on",
        "Be late on purpose",
      ],
      spark: ["Hold still", "Don't move", "Come here", "Laugh anyway"],
      close: [
        "Go to him",
        "Wake him from the bench",
        "Let him take your pulse",
        "Refuse to be a burden",
      ],
      bound: [
        "Get over there",
        "Smile at him like that",
        "Stay the night",
        "Bring it up again",
      ],
    },
    responses: {
      kind: {
        new: [
          "Don't take his coldness to heart",
          "Thank him anyway",
          "Let the insult slide",
        ],
        spark: [
          "Let him keep pretending",
          "Tell him it's mutual",
          "Be gentle about the blush",
        ],
        close: [
          "Show him his care shows",
          "Tell him to sleep",
          "Say the thanks he forbade",
        ],
        bound: [
          "Say it back",
          "Let him fall asleep on you",
          "Tell him he's allowed",
        ],
      },
      playful: {
        new: [
          "Tease him carefully",
          "Touch the thing he said not to",
          "Be a deliberate variable",
        ],
        spark: [
          "Laugh anyway",
          "Take his pulse instead",
          "Call it clinical too",
        ],
        close: [
          "Make him laugh despite himself",
          "Fluster him on purpose",
          "Read his notes out loud",
        ],
        bound: [
          "Bring it up again",
          "Smile at him deliberately",
          "Call him impossible back",
        ],
      },
      bold: {
        new: [
          "Challenge him back",
          "Insult him in kind",
          "Refuse the diagnosis",
        ],
        spark: [
          "Close the distance yourself",
          "Say what he won't",
          "Take his hand off the chart",
        ],
        close: [
          "Match his intensity",
          "Tell him you're not giving up either",
          "Take his hand off the file",
        ],
        bound: [
          "Cross the lab first",
          "Say it before he can",
          "Tell him to stop working",
        ],
      },
      neutral: {
        new: ["Give him space", "Let him work", "Answer only what's asked"],
        spark: [
          "Let it stay clinical",
          "Move away first",
          "Say nothing at all",
        ],
        close: [
          "Understand his withdrawal",
          "Sit quietly in the lab",
          "Let him pretend it's nothing",
        ],
        bound: [
          "Let him pretend it's the cold",
          "Say nothing",
          "Let him sleep",
        ],
      },
    },
  },

  ren: {
    dialogue: {
      new: [
        'He\'s scrolling through his phone, barely acknowledging you at first. "Oh. Hey."',
        "One earbud comes out. That's the entire greeting, and it's more than most people get.",
        "He's found the one spot in the whole building where nobody looks. You found him anyway.",
        '"...You need something?" He sounds like he hopes the answer is no.',
        "\"Shift at the Darkwick Mystery Diner. Summer was our busy period back home too — always killing myself helping out. Now I'm here... nothing's changed.\"",
      ],
      known: [
        "Both earbuds come out. That's a significant escalation.",
        "\"Oh, it's you,\" he says, and doesn't go back to the phone right away.",
        '"Oh, Senpai... could you open the link I sent you? No, you don\'t have to sign up or anything. Thanks."',
        "He asks if you've seen the thing. He's asking because he wants to talk about it.",
        "He remembers what you said about the ending. He'd been thinking about it.",
      ],
      warm: [
        "He actually puts his phone down when you arrive. There's genuine concern in his gaze now.",
        "He shifts over on the couch without looking up. The space is for you.",
        "\"You're behind on the episodes,\" he says. He's been keeping count for you.",
        "He hands you the second controller. He's already set your profile up.",
        "The slouch stays. The attention does not — that's entirely on you now.",
      ],
      spark: [
        "You fall asleep against his shoulder. He doesn't move for two hours.",
        '"You\'re kind of in my space," he says, not moving an inch.',
        "He looks at you during the quiet part of the episode instead of the screen.",
        "The controller goes down. He's looking at you like the game stopped mattering.",
        '"...I like you," he says, flat as a weather report, and goes back to the show.',
      ],
      close: [
        '"Senpai... you know I\'ll always have your back, right?" he says quietly, protective concern replacing his usual detachment.',
        "He notices you're off before you've said a word, and quietly changes the plan.",
        '"Stay," he says, casual as anything, meaning it more than anything.',
        "He plays badly on purpose so the round lasts longer. He'd never admit that.",
        "The phone stays face down for the entire conversation. That's not nothing.",
      ],
      bound: [
        "You wake up tangled in him and the show has been on the menu screen for six hours.",
        '"Don\'t move," he mumbles into your hair. "Seriously. This is perfect."',
        "He kisses you lazily, halfway through a level, and loses the level entirely.",
        "He's stopped hiding. He's just quietly, thoroughly yours, and everyone knows it.",
        'He says "love you" like it\'s punctuation now — flat, constant, absolutely meant.',
      ],
    },
    temperamentDialogue: {
      new: [
        '"Huh? Oh, didn\'t see you there. You lost or something?"',
        '"...Hey. You can sit, I guess. It\'s not my couch."',
        "\"If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm too busy.\" (He isn't.)",
        "\"Nah, I'm not doing anything. That's kind of the point.\"",
        '"Cool. Yeah. Anyway."',
      ],
      known: [
        '"Oh — hey. You can sit, if you want. Whatever."',
        '"Preach about doing it for your friends or the animals or whatever all you want — I really don\'t give a shit. People who say that stuff are just deluding themselves."',
        "\"I moved my bag. That's not a big deal, don't make it one.\"",
        "\"You're around a lot lately. It's fine. Not a complaint.\"",
        "\"Don't spoil it. Seriously. I'll leave.\"",
      ],
      warm: [
        "\"Oh, it's you. Yeah, I was hoping you'd show up.\"",
        '"Second controller\'s charged. No reason. Shut up."',
        '"You look wrecked. Sit down, I\'ll find something dumb to watch."',
        '"Took you long enough. Not that I was counting."',
        '"You want the good snacks? I hid them. From everyone but you."',
      ],
      spark: [
        "\"Don't move. You're comfortable. That's — yeah. Don't move.\"",
        '"I said it already. I\'m not saying it twice. ...Fine. I like you."',
        '"You can sit closer. Obviously. Why are you making me say it."',
        "\"Stay over. Couch is fine. I'm fine. Everything's fine.\"",
        '"You keep falling asleep on me. I keep letting you. Draw your own conclusions."',
      ],
      close: [
        "\"Hey, senpai... I'm really glad you're here. More than you know.\"",
        "\"Something's up with you. Don't bother lying, just tell me.\"",
        '"You can stay as long as you want. Seriously. As long as you want."',
        '"I don\'t do this with anybody else. You get that, right?"',
        "\"If someone's giving you trouble — say the word. I'll stop being lazy.\"",
      ],
      bound: [
        '"Don\'t get up. Seriously. Stay right there."',
        '"Love you. Yeah, I know I said it this morning. Still true."',
        '"Come back to bed, senpai. The game\'s not going anywhere."',
        "\"You're on my side of the couch. That's fine. That's ideal, actually.\"",
        "\"I'm not good at big gestures. This is the gesture. You, here. That's it.\"",
      ],
    },
    approach: {
      new: [
        "Say hey back",
        "Sit down uninvited",
        "Ask what he's watching",
        "Wait for the earbud",
      ],
      known: [
        "Take the cleared seat",
        "Talk about the ending",
        "Don't spoil it",
        "Sit without asking",
      ],
      warm: [
        "Take the empty space",
        "Grab the second controller",
        "Steal the good snacks",
        "Put your feet up",
      ],
      spark: ["Don't move", "Sit closer", "Stay over", "Make him say it"],
      close: [
        "Flop down next to him",
        "Tell him what's wrong",
        "Stay as long as you want",
        "Let him have your back",
      ],
      bound: [
        "Don't get up",
        "Come back to bed",
        "Take his side of the couch",
        "Say it back",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be steady with him",
          "Let him keep the quiet",
          "Thank him for the space",
        ],
        spark: ["Say it back", "Stay on his shoulder", "Let him off the hook"],
        close: [
          "Heal what his family broke",
          "Tell him he's not a slacker to you",
          "Say you'll stay",
        ],
        bound: ["Say it back", "Stay right there", "Let him keep hold"],
      },
      playful: {
        new: [
          "Be playful around him",
          "Spoil the episode",
          "Challenge him to a round",
        ],
        spark: [
          "Make him say it twice",
          "Take up more space",
          "Pause the episode",
        ],
        close: [
          "Make him genuinely smile",
          "Beat him at his own game",
          "Steal his hoodie",
        ],
        bound: [
          "Lose the level for him",
          "Take more of the couch",
          "Make him say it again",
        ],
      },
      bold: {
        new: [
          "Be bold with him",
          "Sit far too close",
          "Ask the direct question",
        ],
        spark: ["Say it first", "Sit closer without asking", "Stay over"],
        close: [
          "Fight for him",
          "Tell him to stop hiding",
          "Say the word and mean it",
        ],
        bound: ["Pull him back to bed", "Say it first", "Turn the game off"],
      },
      neutral: {
        new: ["Let him be", "Watch the screen with him", "Say nothing at all"],
        spark: ["Let the episode run", "Move over", "Pretend you were asleep"],
        close: [
          "Be quiet with him",
          "Share the couch in silence",
          "Let the episode run",
        ],
        bound: ["Let the menu screen run", "Stay still", "Fall back asleep"],
      },
    },
  },

  haru: {
    dialogue: {
      new: [
        "He's got a feed bucket in one hand and something small in his sling backpack. \"Don't mind Peekaboo. He's shy.\"",
        "He looks up from a fence post and grins wide. \"Well, hey there. You after somethin', or just havin' a wander?\"",
        "\"Phew... finally finished harvesting all the feed crops for the day. Everyone's health is dependent on their quality, so now's the time to do it right.\"",
        "He smells like feed and straw and something faintly sulfurous, and seems entirely unbothered by all three.",
        'Something skitters behind him. "Ah, ignore that," he says cheerfully. "That one\'s supposed to be in a pen."',
      ],
      known: [
        "\"Honor roll, right? That's what everyone's calling you. Suits you.\" He shoulders the feed bucket.",
        "Peekaboo peers at you from inside his sling and immediately vanishes again.",
        "He hands you the feed bucket without asking. You've been drafted into the rounds.",
        '"You remembered which one bites," he says, delighted. "That\'s more than most of my house manages."',
        '"Folks are going wild over the Anomalous Animal Back To Nature Tour — your chance to experience it at a discount rate! C\'mon, help me hand out these fliers."',
      ],
      warm: [
        "His whole face lights up when he sees you—genuine delight, the kind that makes his warmth impossible to resist.",
        '"You reckon I work hard? Nah, this is nothing to write home about." He\'s filthy to the elbows and beaming.',
        '"Hey, nice work out there today! Let\'s knock a few more jobs off the list then take a break, yeah?"',
        "Peekaboo comes out when you arrive now. Haru says that has never once happened before.",
        '"Honor roll!" he calls, over the noise of about nine different anomalies.',
      ],
      spark: [
        "The teasing lands differently now. He's noticed. He's doing it more.",
        "He wipes something off your cheek with his thumb and takes his time putting his hand back.",
        "He's gentle with every creature in this place. With you he's gentle differently.",
        "Peekaboo watches the pair of you from a rafter with what can only be described as judgment.",
        "He catches your wrist mid-laugh and the laugh stops for both of you.",
      ],
      close: [
        '"You make every day feel like an adventure," he says, taking your hand. "Like... like home. That\'s the honest truth."',
        "He's trusted you with the west pens alone. He has never trusted anyone with the west pens.",
        "The mischief goes quiet for once, and what's left is unguarded and warm.",
        "He introduces you to a new arrival by name — yours first, then the anomaly's.",
        "Peekaboo rides on your shoulder out of preference now. Haru pretends not to be jealous.",
      ],
      bound: [
        "He kisses you in doorways, in stairwells, mid-sentence, constantly, without warning.",
        "You do the night rounds together now. Neither of you calls it a routine. It is.",
        '"Home," he says, meaning you, with his forehead against yours.',
        "He wakes you at 2am because something's hatching and he refuses to see it without you.",
        "Peekaboo sleeps at the foot of the bed. Haru insists this was entirely your idea.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Gahaha! Someone interesting wandered in!"',
        '"Careful where you step — half of what\'s on this floor is alive and the other half bites."',
        "\"Rule one: don't feed anything unless I say so. Rule two: Peekaboo doesn't count.\"",
        "\"Hold this. No, it's friendly. Mostly friendly. It's fine!\"",
        '"Gahaha! You didn\'t even flinch. All right — I like you already."',
      ],
      known: [
        '"Hey, Honor roll! That\'s the name that stuck, huh? Fair enough."',
        "\"Perfect timing — I'm on the evening rounds. You're comin' with me, yeah? C'mon.\"",
        '"You sure are fond of Honor roll, aren\'t you, Peekaboo? You did nothing but bite me for the first three days after we met."',
        '"You keep turnin\' up wherever I am. Not that I mind. Grab a bucket."',
        '"Everyone stuffs up sometimes. Don\'t let it get to you — just think of it as a funny story you can pull out later and laugh at! Gahaha!"',
      ],
      warm: [
        '"Hey, Honor roll! Miss me?"',
        "\"Grab a bucket, we're behind. I'll make it fun, I promise.\"",
        "\"Peekaboo, look who's here — no, don't hide. Don't — okay. He'll come around.\"",
        "\"You've got a way with the mean ones. That's a genuine skill, you know.\"",
        "\"Stay for the night feed. It's the good shift. Everything's sleepy.\"",
      ],
      spark: [
        '"C\'mon — sit with me a minute. Animals can wait. ...Did I just say that? Huh."',
        '"I tease everybody, sure. But with you I mean it. That\'s the honest difference, Honor roll."',
        "\"Stay for the night rounds. Everything's asleep. Nobody's watching but Peekaboo.\"",
        "\"You've got straw in your hair. No — leave it. It's working for you.\"",
        "\"You're gonna have to move first. I've used up all my nerve getting this close.\"",
      ],
      close: [
        '"I really like seeing you smile. Can I be honest about that?"',
        "\"Everywhere's better with you in it. That's the honest truth, not a line.\"",
        "\"You feed them like they matter to you. That's — yeah. That's the thing that got me.\"",
        '"Take the west pens tonight. I trust you with them. I don\'t say that."',
        '"Come here. No punchline. I just want you closer."',
      ],
      bound: [
        '"C\'mere, Honor roll. No joke this time. Not even a small one."',
        '"I love you. Told you I\'d say it eventually. Took me long enough, huh?"',
        '"Come do the night rounds with me. Then come back to bed."',
        "\"You're it for me. That's the whole thing. That's all I've got.\"",
        "\"Peekaboo picked you before I'd admit it myself. He's real smug about that, too. Gahaha.\"",
      ],
    },
    approach: {
      new: [
        "Don't flinch",
        "Meet Peekaboo",
        "Hold the bucket",
        "Walk into the pens",
      ],
      known: [
        "Take the feed bucket",
        "Join the rounds",
        "Say hello to Peekaboo",
        "Answer to Honor roll",
      ],
      warm: [
        "Grab a bucket",
        "Stay for the night feed",
        "Coax Peekaboo out",
        "Learn the feeding order",
      ],
      spark: [
        "Move first",
        "Stay for the night rounds",
        "Leave the straw in",
        "Let him take his time",
      ],
      close: [
        "Go to him",
        "Take the west pens",
        "Let Peekaboo settle",
        "Say it back",
      ],
      bound: [
        "Do the rounds together",
        "Come back to bed",
        "Go see what's hatching",
        "Say it back",
      ],
    },
    responses: {
      kind: {
        new: [
          "Appreciate his warmth",
          "Ask about Peekaboo",
          "Take his bad advice kindly",
        ],
        spark: [
          "Tell him you knew",
          "Say the anomalies adore him",
          "Take his hand properly",
        ],
        close: [
          "Show him home is with you",
          "Take the west pens",
          "Say it wasn't a joke either",
        ],
        bound: [
          "Say it back",
          "Tell him he's home too",
          "Let him wake you at 2am",
        ],
      },
      playful: {
        new: [
          "Give as good as you get",
          "Feed something you shouldn't",
          "Tease him before he teases you",
        ],
        spark: [
          "Make him move first",
          "Put the straw back in his hair",
          "Out-flirt him",
        ],
        close: [
          "Match his mischief",
          "Let Peekaboo choose you",
          "Get into trouble with him",
        ],
        bound: [
          "Make him wait for it",
          "Blame Peekaboo",
          "Kiss him mid-sentence first",
        ],
      },
      bold: {
        new: [
          "Be daring with him",
          "Hold whatever he offers",
          "Walk into the pens",
        ],
        spark: ["Move first", "Close the inch", "Tell him to stop joking"],
        close: [
          "Match his boldness",
          "Take his hand first",
          "Tell him you'd follow anywhere",
        ],
        bound: [
          "Say it first",
          "Pull him into the stairwell",
          "Tell him he's it for you",
        ],
      },
      neutral: {
        new: ["Be present", "Watch him work", "Let him finish the rounds"],
        spark: ["Laugh it off", "Watch Peekaboo instead", "Let the moment go"],
        close: [
          "Rest with him",
          "Finish the rounds in silence",
          "Sit close and say nothing",
        ],
        bound: [
          "Hold his hand and say nothing",
          "Do the rounds quietly",
          "Let the night run",
        ],
      },
    },
  },

  towa: {
    dialogue: {
      new: [
        "He watches from the shadows, his gaze fixed and unblinking. There's something possessive in how he looks at you.",
        "He's been standing there long enough for the dark to have settled around him.",
        "A dandelion turns over and over between his fingers. He hasn't looked away from you once.",
        '"...Hmphm." He\'s been waiting. He hates waiting. "Are you done yet? Come play."',
        "You feel watched before you see him. By then he's already much closer.",
      ],
      known: [
        "He knows your footsteps now. He's turned before you're in sight.",
        "The dandelion is already in his hand. He's been holding it a while.",
        "He doesn't hide when you arrive anymore. He watches from closer instead.",
        'He\'s eating a flower, petal by petal. He offers you the last one. "...You have this bit."',
        "The stillness has stopped being a threat. It's become waiting.",
      ],
      warm: [
        "He steps into the light when you arrive, like he's been waiting for only you. \"Don't leave,\" he says quietly.",
        "He offers the dandelion without a word, and waits to see if you'll take it.",
        '"I can\'t see the stars from here..." He tugs your sleeve. "Come on, Dandelion! Let\'s go somewhere higher!"',
        "He counts something under his breath. You suspect it's the days since you last came.",
        "He falls into step beside you, matching your pace exactly, and stays there.",
      ],
      spark: [
        "He's stopped holding your sleeve. He's holding your hand now.",
        "He rests his forehead against yours and breathes out, slowly, like relief.",
        '"Closer," he whispers. "Closer. There. Now don\'t move."',
        "He tucks the dandelion behind your ear and lets his fingers linger.",
        "The dark around him has stopped being frightening and started being private.",
      ],
      close: [
        '"I\'ve been waiting every moment since you left," he confesses, drawing impossibly close. "Don\'t ever leave again. Please."',
        "He takes hold of your sleeve and does not let go for the rest of the conversation.",
        '"You came back," he breathes, as though it had genuinely been in doubt.',
        "He's tucked a fresh dandelion somewhere on you before you noticed him move.",
        "The whole terrifying stillness of him goes soft the second you say his name.",
      ],
      bound: [
        "He sleeps with a fistful of your shirt and breathes like someone finally safe.",
        '"Mine," he murmurs into your neck, over and over, like a lullaby he wrote himself.',
        "He's tucked dandelions into every pocket you own. You stopped taking them out.",
        "He kisses you slowly, endlessly, as though he's making up for every hour apart.",
        "The dark around him is entirely yours now, and it has never once felt like a threat.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"...Dandelion?"',
        '"You smell like outside. ...I like it."',
        "\"Don't move yet. I'm looking.\"",
        '"...Stay a little longer. Just a little."',
        '"Are you done yet? I hate waiting. Come play with me!"',
      ],
      known: [
        '"...You came back. I thought you might not."',
        '"I know your steps now. I listen for them."',
        '"I picked this for you. It\'s a clover! Look look, it has 5 leaves!"',
        '"Don\'t go that way. Stay where I can see."',
        '"...Dandelion. That\'s what I call you. In my head."',
      ],
      warm: [
        "\"Dandelion. You're here. That's all that matters.\"",
        '"I counted. It was nine days. I counted every one."',
        '"Take it. I picked it for you. Only you."',
        '"Come somewhere higher with me. I want to show you the stars. ...Now. Come now."',
        '"You always come back. Say you always will."',
      ],
      spark: [
        '"Stay. Just here. Just like this. Please."',
        '"You smell like the outside. I want to keep it."',
        '"Don\'t talk. I just want to be near you for a minute. One minute."',
        "\"...Dandelion. Say it's me. Say it's only me.\"",
        '"I dream about this. Being this close. It\'s better awake."',
      ],
      close: [
        "\"You're mine. Only mine. Promise me you'll never leave.\"",
        "\"I'd wait forever. I'd rather not have to.\"",
        '"Let me hold on. Just here. Just your sleeve."',
        "\"If you disappear, I'll find you. That's not a threat, Dandelion.\"",
        '"Everything is quiet when you\'re here. Everything."',
      ],
      bound: [
        '"Don\'t leave. Not tonight. Not any night. Please."',
        '"I love you. I loved you before I knew the word for it."',
        '"Closer. Closer. There. Now stay exactly there forever."',
        '"Dandelion. My Dandelion. Say it\'s true."',
        '"Everything is quiet with you. Everything. I didn\'t know it could be."',
      ],
    },
    daytimeDialogue: {
      new: [
        "~~~!",
        "~~~? ...~~~.",
        "He hums a few notes at you, and waits, expectantly.",
        "~~~ ♪",
      ],
      known: [
        "~~~ ...~~~?",
        "He hums two notes, stops, and waits to see whether you stay.",
        "~~~ ♪ (he holds out a dandelion)",
        "~~~! ...~~~",
      ],
      warm: [
        "~~~! ♫",
        "~~~ ♪ ~~~ ♪",
        "The humming picks up the moment he sees you. It's cheerful. It's for you.",
        "~~~! ...~~~ ♫",
      ],
      spark: [
        "~~~ ♪ (he hums it against your shoulder)",
        "He hums low, close to your ear, and doesn't step back.",
        "~~~ ...~~~ ♫ (softer than usual, and much nearer)",
        "~~~ ♪ — he stops mid-note when you look at him.",
      ],
      close: [
        "~~~! ~~~! ♫ ♫",
        "~~~ ♪ ~~~ ♫ ~~~ ♪",
        "He hums the same three notes over and over. You've come to know that one.",
        "~~~ ♫ (he taps your sleeve, twice, and hums it again)",
      ],
      bound: [
        "~~~ ♪ (hummed into your hair, half asleep)",
        "He hums against your collarbone until you feel it more than hear it.",
        "~~~ ♫ ...~~~ ♪ — the same three notes, over and over, just for you.",
        "He hums, stops to kiss your shoulder, and picks the tune back up.",
      ],
    },
    approach: {
      new: [
        "Meet his stare",
        "Step into the shadow",
        "Don't look away",
        "Wait for him to move first",
      ],
      known: [
        "Take the dandelion",
        "Let him watch",
        "Stay where he can see",
        "Answer to Dandelion",
      ],
      warm: [
        "Take the dandelion",
        "Step into the light with him",
        "Say his name",
        "Let him fall into step",
      ],
      spark: [
        "Don't move",
        "Let him closer",
        "Take his hand",
        "Stay just like this",
      ],
      close: [
        "Go to him",
        "Let him take your sleeve",
        "Tell him you came back",
        "Promise you'll stay",
      ],
      bound: [
        "Stay forever",
        "Say it's true",
        "Let him hold on",
        "Don't leave",
      ],
    },
    daytimeApproach: {
      new: [
        "Follow the humming",
        "Hum back",
        "Listen closely",
        "Answer without words",
      ],
      known: [
        "Wait for the second note",
        "Hum back",
        "Take what he's holding",
        "Stay for the tune",
      ],
      warm: [
        "Hum the tune with him",
        "Follow the melody",
        "Let him lead",
        "Answer in his language",
      ],
      spark: [
        "Let him hum it close",
        "Don't step back",
        "Hold the note with him",
        "Stay through the tune",
      ],
      close: [
        "Finish the melody",
        "Hum his three notes back",
        "Take his hand and listen",
        "Answer the way only you can",
      ],
      bound: [
        "Let him hum you awake",
        "Feel the tune",
        "Hum it back to him",
        "Stay in the melody",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be very careful with him",
          "Take the flower gently",
          "Speak softly to him",
        ],
        spark: [
          "Tell him it's only him",
          "Let him stay close",
          "Hold his hand back",
        ],
        close: [
          "Accept his possessiveness",
          "Promise you'll come back",
          "Let him hold on",
        ],
        bound: [
          "Say it's true",
          "Let him hold your shirt",
          "Tell him he's safe",
        ],
      },
      playful: {
        new: [
          "Make him smile",
          "Hum the tune back",
          "Tuck the dandelion behind your ear",
        ],
        spark: [
          "Hum it back against him",
          "Steal the dandelion",
          "Make him stop mid-note",
        ],
        close: [
          "Give him your full attention",
          "Play the counting game back",
          "Hide, and let him find you",
        ],
        bound: ["Hum it back", "Hide the dandelions", "Make him chase you"],
      },
      bold: {
        new: [
          "Stare right back at him",
          "Close the distance yourself",
          "Ask what he wants",
        ],
        spark: [
          "Close the last of it",
          "Say it's only him",
          "Don't let him step back",
        ],
        close: [
          "Own him completely",
          "Take his hand first",
          "Tell him you're not leaving",
        ],
        bound: [
          "Say you're his",
          "Pull him closer still",
          "Promise him forever",
        ],
      },
      neutral: {
        new: [
          "Observe him carefully",
          "Wait him out",
          "Stand still and let him look",
        ],
        spark: [
          "Let the minute pass",
          "Stay still and quiet",
          "Say nothing at all",
        ],
        close: [
          "Be his constant",
          "Stay in the quiet with him",
          "Let him count in peace",
        ],
        bound: ["Let him sleep", "Stay exactly there", "Say nothing at all"],
      },
    },
  },

  edward: {
    dialogue: {
      new: [
        "He greets you with a charming smile, but there's something dangerous beneath the gentleman's facade.",
        "He takes your hand to bow over it before asking whether he may. He does ask. Afterward.",
        '"How delicate you look," he murmurs, in a room where he is by far the more dangerous thing.',
        "He is standing much too close for a first meeting, and entirely unbothered by that.",
        '"The most powerful vampire? No, those are just rumors." He smiles as if it amuses him.',
      ],
      known: [
        "The gentleman act is unchanged. The interest behind it is no longer performed.",
        '"You\'ve returned," he says, as though it were remarkable. To him it is.',
        "He's had a chair moved. He'll claim it was always positioned that way.",
        "\"Ah, there you are. I've a favor to ask of you — come to my room and I'll explain.\"",
        "The fragility slips for a moment. He lets it, and watches what you do.",
      ],
      warm: [
        "The fragile act drops for a moment when you're near—you see the predator underneath, and he lets you.",
        '"You\'ve stopped flinching," he observes, sounding thrilled and slightly put out.',
        'He winces, a hand at his ribs. "Oh, it hurts... I cannot seem to shake this ache in the place Rui touched me earlier. I think I\'ll rest a while."',
        "He offers his arm, then his coat, then a chair, in rapid succession. It's a lot.",
        "There's a glass poured for you already. It's your preference. He remembered.",
      ],
      spark: [
        "His gaze settles on your throat, and he takes rather too long to look away.",
        '"You do test a man\'s restraint," he murmurs, testing nothing at all.',
        "He kisses the back of your hand and lingers well past the century's etiquette.",
        "The fragile act is gone. What's left is old, hungry, and extremely well-mannered about it.",
        "He tilts his head, considering you, the way one considers something one intends to have.",
      ],
      close: [
        '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
        "The theatrics finally exhaust themselves, and what's left is old, and lonely, and yours.",
        "He rests his forehead against yours and stops talking, which is unprecedented.",
        '"Everything I\'ve pretended to be," he says, "you saw past on the first night."',
        "He holds on a little too tightly. Neither of you comments on it.",
      ],
      bound: [
        "He asks before he bites, every time, and the asking is somehow worse.",
        '"Centuries," he murmurs against your throat, "and not one of them was this."',
        "He undresses you the way he does everything — slowly, and with immaculate manners.",
        "He keeps the curtains drawn well past dawn and blames the sun entirely.",
        "The gentleman is intact. What's under it has stopped pretending to be tame.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Oh my, what a lovely lady. Welcome to my home."',
        '"Do come in. I bite, but rarely without permission."',
        '"You mustn\'t wander Obscuary alone. Allow me — I insist."',
        '"How fragile you are. It\'s terribly charming."',
        '"I have no interest in harming humans. After all, they die so quickly. They should enjoy their short lives while they can."',
      ],
      known: [
        '"Back so soon? How wonderfully poor of your judgment."',
        '"I remember you. I remember everyone — but I remember you pleasantly."',
        "\"Do sit. I've had the chair moved. No, I've no idea why either.\"",
        "\"You've stopped looking for the exit. That's progress, lovely lady.\"",
        "\"I'm more or less confined to this house most days, for various reasons. I'm on my best behavior. But I'll do what I can to support you from the sidelines.\"",
      ],
      warm: [
        '"Lovely lady, I was hoping you\'d visit. Come closer."',
        '"You\'re not afraid of me anymore. How disappointing. How wonderful."',
        '"Sit — no, here, beside me. Personal space is a modern invention."',
        '"I poured this before you arrived. Call it optimism."',
        '"What did I do before Darkwick? I eked out a humble existence in Eastern Europe. Nothing worth the telling."',
      ],
      spark: [
        '"Come closer, lovely lady. I promise to behave. I make poor promises."',
        '"You know what I am. You keep standing there anyway. How flattering."',
        '"May I? Only your hand. ...For now."',
        '"I have restrained myself for a very long time. Do say if I needn\'t."',
        '"That pulse of yours is being terribly loud about all this."',
      ],
      close: [
        '"You belong right here, next to me. Don\'t ever leave."',
        '"I have outlived a great deal. I would rather not outlive this."',
        '"No performance tonight, lovely lady. Only me. Is that enough?"',
        '"Stay until dawn. Stay past it. I\'ll manage the curtains."',
        '"Come here. Closer. There — now the room is bearable."',
      ],
      bound: [
        '"May I? ...You always say yes. It undoes me every time."',
        '"I love you. I\'ve had a very long time to be certain of something."',
        '"Stay past dawn, lovely lady. I\'ll manage the curtains."',
        '"Come here. Let me be terribly, terribly improper about you."',
        '"You\'re mine and I am — rather more surprisingly — entirely yours."',
      ],
    },
    approach: {
      new: [
        "Let him take your hand",
        "Step into the candlelight",
        "Accept the invitation",
        "Don't flinch",
      ],
      known: [
        "Take the moved chair",
        "Stop looking for the exit",
        "Tell him about your week",
        "Let the act slip",
      ],
      warm: [
        "Take his arm",
        "Sit beside him",
        "Accept the poured glass",
        "Close the distance yourself",
      ],
      spark: [
        "Come closer",
        "Offer your hand",
        "Say he needn't restrain himself",
        "Stand there anyway",
      ],
      close: [
        "Go to him",
        "Let him hold on",
        "Stay past dawn",
        "Tell him you see him",
      ],
      bound: [
        "Say yes",
        "Stay past dawn",
        "Let him be improper",
        "Bare your throat",
      ],
    },
    responses: {
      kind: {
        new: [
          "Stand firm against his advances",
          "Accept the courtesy",
          "Thank him for the escort",
        ],
        spark: [
          "Offer your hand",
          "Tell him you're not frightened",
          "Let him behave, for now",
        ],
        close: [
          "Let him get closer",
          "Tell him he isn't alone anymore",
          "Say the act was never needed",
        ],
        bound: ["Say yes again", "Tell him he's yours too", "Let him ask"],
      },
      playful: {
        new: [
          "Keep him at bay playfully",
          "Out-charm the gentleman",
          "Pretend to swoon",
        ],
        spark: [
          "Test the restraint",
          "Make a poor promise back",
          "Withdraw the hand slowly",
        ],
        close: [
          "Flirt back with him",
          "Tease him about the theatrics",
          "Call him lovely first",
        ],
        bound: ["Make him ask twice", "Open the curtains", "Say no, then yes"],
      },
      bold: {
        new: [
          "Meet his gaze without flinching",
          "Step closer instead of back",
          "Give him permission",
        ],
        spark: [
          "Tell him he needn't restrain himself",
          "Tilt your head back",
          "Say you know exactly what he is",
        ],
        close: [
          "Pull him closer yourself",
          "Tell him you're not leaving",
          "Say you'd stay lifetimes",
        ],
        bound: [
          "Bare your throat",
          "Tell him not to ask",
          "Pull him past the manners",
        ],
      },
      neutral: {
        new: [
          "Stay watchful",
          "Let him do the talking",
          "Keep your hand to yourself",
        ],
        spark: ["Withdraw your hand", "Let the moment cool", "Say nothing"],
        close: [
          "Let him watch in silence",
          "Stay through the quiet hour",
          "Let him hold on wordlessly",
        ],
        bound: ["Draw the curtains", "Let him wait", "Say nothing"],
      },
    },
  },

  rui: {
    dialogue: {
      new: [
        "He lights up with a radiant smile, practically bouncing with energy. \"Oh wow, look who showed up! You're a sight for sore eyes!\" Behind the brightness, there's a shadow of something darker he's desperately hiding.",
        "He reaches out to greet you, catches himself an inch away, and turns it into a wave.",
        "Everything on his desk is labelled, sorted, and immaculate. He is not.",
        '"Careful — not too close! Sorry. Sorry, that came out weird. Hi!"',
        'He\'s got Edward slung over one shoulder. "Oof, Ed popped out of nowhere so I accidentally touched him and he died again. Gotta carry him all the way back to the dorm..."',
      ],
      known: [
        'He\'s stopped saying "not too close." He just leaves the distance where it is.',
        "He beams. \"Oh hey, it's Honor roll! Can't believe I ran into you here, so random! Guess we've gotta go on a date now, huh?\"",
        '"You look kind of tired, Honor roll. Come by the bar later — I\'ll pour you something slow and you can just stop being anywhere else for a while."',
        "He asks how you are and then actually waits, which not everyone does.",
        "He wipes down the same spot on the bar twice. \"Harurin hasn't been in. He's been flat-out with the animals again — I keep a stool open for him, just in case.\"",
        "The brightness dims for half a second, and he covers it faster than before.",
      ],
      warm: [
        "His grin is warm and genuine when he sees you, though you catch the moment his cheerfulness falters—like you're the only thing holding back the darkness.",
        "He talks with his whole body, gestures a foot from your shoulder and never landing.",
        "He's halfway through pruning something that keeps leaning toward him. \"New elixir. Try it later — it's mostly safe.\"",
        'The Obscuary bar, lights down, your drink already waiting. He leans on his elbows across from you, close as the curse lets him get. "This is the best part of my night. Don\'t tell the others."',
        '"Look at you! Okay, tell me everything, and don\'t leave the boring parts out."',
        "He hovers close, hands carefully at his sides, and doesn't leave.",
      ],
      spark: [
        "His hand hovers a half-inch from your cheek. Neither of you moves for a while.",
        '"This is the closest I get," he says quietly. "I\'ve gotten very good at it."',
        "He traces the shape of your hand in the air above it, and it's worse than touching.",
        "The brightness is gone. What's underneath wants you badly and can't say so.",
        "He leans in until you can feel him breathing, and stops exactly there.",
      ],
      close: [
        '"You make me feel alive," he says softly, hands hovering near you but never quite touching. "Like the curse doesn\'t matter when you\'re near."',
        "He holds his hand up, palm out, and waits for you to hold yours an inch from it.",
        "The brightness goes quiet. What's underneath is tired, and grateful, and honest.",
        '"One day," he says, not finishing the sentence. He doesn\'t need to.',
        "He walks you to the door and stands in it long after you've gone.",
      ],
      bound: [
        "Gloves. Layers. A scarf between his palm and your cheek. He's worked out every way there is.",
        '"I can\'t touch you," he says, "so I\'ve gotten very inventive. Bear with me."',
        "He kisses you through the fabric of his sleeve and it wrecks you both entirely.",
        "He lies beside you all night with a hand's width of air between, and neither of you sleeps.",
        "He loves you louder than anyone ever has, because it's the one thing the curse can't stop.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Oh! Lucky me — you wandered in! Come closer... but not too close, yeah? Just let me look at you."',
        "\"Hi! Hi. Don't shake my hand — long story — but it's great to meet you!\"",
        '"You need directions? Paperwork? A friend? I do all three!"',
        '"Whoa, careful — okay, good, you stopped. Phew. Hi!"',
        "\"New face! I keep a list. You're on it now. It's a nice list.\"",
      ],
      known: [
        "\"You're back! Okay, that's officially a pattern. I love a pattern.\"",
        "\"How've you been? No — the real answer. I've got time.\"",
        '"Have you seen Harurin? He hasn\'t stopped by for his drink in days — I worry when he pushes himself that hard."',
        "\"Aw, c'mon Ed, again? Why does he always leave his socks on the floor... It's actually exhausting picking up after him all the time.\"",
        '"Careful — okay, you already knew. You\'re getting good at this."',
        '"You don\'t flinch anymore. That means a lot, actually."',
      ],
      warm: [
        "\"You're back! You know you make everything feel less dark when you're around? It's actually kind of amazing.\"",
        '"Tell me about your day. All of it. I\'ve got nowhere better to be."',
        '"Come by the bar after — I\'ll mix you something and you can just unwind. No pressure, no plans. Just us."',
        "\"Hands to myself, promise. Doesn't mean I'm not thrilled you're here.\"",
        '"Hey, hey hey! We finally get to spend some time together — it\'s illegal to take your eyes off me!"',
      ],
      spark: [
        "\"Hold your hand up. Right there. Don't close it. ...God, that's almost enough.\"",
        "\"I'd give up a lot to touch you. Don't tell me what — I've already done the math.\"",
        '"Closer. Closer. Okay — stop. Stop there. Perfect."',
        "\"Honor roll... were you just checking me out? Hey, it's all good, don't be embarrassed!\"",
        "\"You're an inch away and it's the loudest thing in the room.\"",
      ],
      close: [
        '"Even with this curse, I\'d bear it a thousand times if it meant seeing you smile."',
        '"Hold your hand up. Right there. Close enough counts, right?"',
        "\"I'm okay. Really. I'm better than okay when it's you.\"",
        "\"Don't feel sorry for me. Just — keep coming back. That's the whole ask.\"",
        "\"One day I'll be able to hold your hand properly. I'm counting on it.\"",
      ],
      bound: [
        '"Hold still. Gloves are on. I\'ve been thinking about this all week."',
        "\"I love you. That one doesn't need hands. That one's free.\"",
        '"Lie down. Right there. I\'ll stay on this side of the air."',
        '"One day I\'ll do this properly. Until then — humor me. Please."',
        '"I\'ve never wanted anything the way I want to hold you. Never."',
      ],
    },
    approach: {
      new: [
        "Wave back",
        "Stop just short",
        "Say hi",
        "Keep a careful distance",
      ],
      known: [
        "Give him the real answer",
        "Keep the careful distance",
        "Make it a pattern",
        "Ask about the note",
      ],
      warm: [
        "Take the good seat",
        "Tell him about your day",
        "Stand as close as you can",
        "Match his brightness",
      ],
      spark: [
        "Hold your hand up",
        "Stop exactly there",
        "Don't close the inch",
        "Lean in anyway",
      ],
      close: [
        "Hold your hand up to his",
        "Go to him",
        "Stay a little longer",
        "Close every inch you can",
      ],
      bound: ["Hold still", "Lie down beside him", "Humor him", "Say it back"],
    },
    responses: {
      kind: {
        new: [
          "Be sincere with him",
          "Thank him for the warning",
          "Tell him it's good to see him",
        ],
        spark: [
          "Hold your palm to his",
          "Tell him the inch is enough",
          "Say you think about it too",
        ],
        close: [
          "Let him know you need him",
          "Say the distance doesn't matter",
          "Tell him you'll keep coming back",
        ],
        bound: [
          "Say it back louder",
          "Hold still for the gloves",
          "Tell him this is enough",
        ],
      },
      playful: {
        new: ["Share your happiness", "Ask to be on the list", "Out-cheer him"],
        spark: ["Trace him back", "Close half the inch", "Make him ask for it"],
        close: [
          "Let him see your joy",
          "Play the almost-touching game",
          "Make him laugh for real",
        ],
        bound: ["Get inventive back", "Steal a glove", "Close half the air"],
      },
      bold: {
        new: [
          "Be honest about wanting him",
          "Step closer than allowed",
          "Ask about the curse",
        ],
        spark: [
          "Lean in anyway",
          "Tell him to do the math again",
          "Say the inch isn't enough",
        ],
        close: [
          "Need him without apology",
          "Hold your palm to his",
          "Tell him one day is a promise",
        ],
        bound: [
          "Tell him one day is a promise",
          "Kiss through the sleeve first",
          "Say you want it too",
        ],
      },
      neutral: {
        new: [
          "Simply accept it",
          "Let him talk it out",
          "Keep the careful distance",
        ],
        spark: [
          "Lower your hand",
          "Let the distance win",
          "Say nothing at all",
        ],
        close: [
          "Let him serve in silence",
          "Stay in the quiet with him",
          "Let the brightness rest",
        ],
        bound: [
          "Keep the hand's width",
          "Lie still in the dark",
          "Let the night pass",
        ],
      },
    },
  },

  lyca: {
    dialogue: {
      new: [
        "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
        "He circles wide around you, watching, deciding. Nothing about it is hostile.",
        "He repeats a word you used, quietly, testing the shape of it.",
        'The phone in his pocket buzzes and he flinches hard. "This phone thingy keeps making noises and making me jump... Why do I gotta carry it everywhere? It\'s scary!"',
        "He doesn't come closer, but he doesn't leave either. That's the whole conversation.",
      ],
      known: [
        "He's stopped circling. He stands where he can see you, and stays.",
        "He's learned your name, and repeats it once, quietly, getting it right.",
        "\"When I find Neros, I wanna prove I've been getting along with humans. Then he'll definitely let me live with him.\"",
        "He watches what you do with your hands, and copies it half an hour later.",
        "The wariness has become attention, which is an entirely different thing.",
      ],
      warm: [
        "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
        "He's practiced something to say to you. It comes out slightly formal and completely sincere.",
        "He falls in at your side without being asked, and stays exactly a step behind.",
        '"You seem sad today," he says. He\'s rarely wrong about that.',
        "\"I'm gonna go practice swimming at Harurin's place. Can you do other stuff besides doggy paddle?\"",
      ],
      spark: [
        "He presses his face into your shoulder and breathes in, and doesn't apologize.",
        '"I don\'t have a word for this one," he says. "I\'ve been looking."',
        "He's stopped keeping a respectful distance. He's chosen a different one.",
        "He takes your hand and turns it over, learning it, taking his time.",
        "He looks at your mouth, then away, then back, and gives up on the away part.",
      ],
      close: [
        '"You\'re my most important person," he says simply, sincerely. "Your safety, your happiness—that\'s everything to me."',
        "He puts himself between you and the noise without thinking about it at all.",
        "He rests his head against your shoulder, briefly, and pretends he didn't.",
        '"I understand more now," he says. "Mostly because of you."',
        "The wariness is gone entirely. What's left is loyal all the way down.",
      ],
      bound: [
        "He's found the word. He uses it constantly now, and gets it right every time.",
        "He curls around you in his sleep and makes a sound like something finally at rest.",
        '"You smell like mine," he says, delighted, with no idea how that lands.',
        "He kisses clumsily, enthusiastically, improving at an alarming rate.",
        "He's stopped keeping any distance at all. There simply isn't one anymore.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Hmm? You\'re... interesting. What brings you here?"',
        '"You smell like somewhere else. Sorry — is that rude? I\'m still learning."',
        '"Stay there a moment. I want to understand you first."',
        "\"You're not afraid. Most people are. Why aren't you?\"",
        '"I won\'t hurt you. I want to say that before anything else."',
      ],
      known: [
        '"You. I remember. I\'m glad I remembered."',
        '"Can I ask you something? I\'m allowed to ask, right?"',
        '"You came back twice. That means something. Doesn\'t it?"',
        "\"I don't understand you yet. I'd like to.\"",
        "\"Hey! Moth-eaten Casanova! Where'd you go? I'm going to show you my special move today.\"",
      ],
      warm: [
        "\"You're back. I'm... really happy about that.\"",
        '"I learned a new word today. I was saving it for you."',
        '"Walk with me? I\'ll keep to your pace."',
        "\"Something's wrong. I can tell. You don't have to say what.\"",
        '"I like it when you\'re here. Is that all right to say?"',
      ],
      spark: [
        '"Can I be close? Not careful-close. The other one."',
        '"You smell sweeter than usual today. ...Stop. Go away." He doesn\'t move.',
        '"I found the word. I\'m not going to say it yet. But I found it."',
        '"Stay still. I want to remember this exactly."',
        '"Everyone else, I keep a distance. You, I keep close. That\'s the difference."',
      ],
      close: [
        '"Seeing you safe and happy is the most important thing to me."',
        '"Wherever you go, I go. That\'s already decided."',
        '"You taught me what this feeling is called. I use it a lot now."',
        '"Let me stand in front. Just this once. Just let me."',
        '"You never once treated me like an animal. I remember every time."',
      ],
      bound: [
        '"I love you. That\'s the word. I found it ages ago. I just wanted to be sure."',
        '"Come lie down. I sleep better with you. I sleep properly."',
        '"Can I — yes? Good. I\'ll never stop asking, I like the yes."',
        "\"You're mine and I'm yours. Both. It has to be both.\"",
        "\"Stay close. Closer. There's no such thing as too close, I've checked.\"",
      ],
    },
    approach: {
      new: [
        "Stand still and let him look",
        "Hold out your hand",
        "Speak gently",
        "Wait for him to decide",
      ],
      known: [
        "Let him ask",
        "Stand where he can see",
        "Say your name again",
        "Come back twice",
      ],
      warm: [
        "Walk with him",
        "Ask about the new word",
        "Match his pace",
        "Tell him what's wrong",
      ],
      spark: [
        "Say yes to the other close",
        "Stay still",
        "Let him learn your hand",
        "Ask for the word",
      ],
      close: [
        "Go to him",
        "Let him take the front",
        "Rest against his shoulder",
        "Tell him you're safe",
      ],
      bound: ["Lie down with him", "Say yes", "Get closer", "Say it back"],
    },
    responses: {
      kind: {
        new: [
          "Be genuinely kind",
          "Answer his question honestly",
          "Tell him you're not afraid",
        ],
        spark: [
          "Give him the word",
          "Let him stay close",
          "Tell him he's allowed",
        ],
        close: [
          "Remind him he's not a monster",
          "Teach him another word",
          "Say he taught you too",
        ],
        bound: [
          "Say it back",
          "Let him curl around you",
          "Tell him he got it right",
        ],
      },
      playful: {
        new: ["Be kind and playful", "Give him a new word", "Race him there"],
        spark: [
          "Make him find it himself",
          "Breathe him in back",
          "Hold the hand hostage",
        ],
        close: [
          "Play with his playfulness",
          "Ruffle his hair",
          "Let him win the race",
        ],
        bound: [
          "Make him ask again",
          "Teach him a better kiss",
          "Say you smell like his",
        ],
      },
      bold: {
        new: ["Be brave", "Close the distance first", "Reach out anyway"],
        spark: [
          "Choose the other close",
          "Say the word for him",
          "Don't let him look away",
        ],
        close: [
          "Stand with him proudly",
          "Refuse to let him take the front",
          "Say wherever you go, he goes",
        ],
        bound: ["Close what's left", "Say it first", "Tell him it's both"],
      },
      neutral: {
        new: ["Be calm with him", "Let him circle", "Say nothing and wait"],
        spark: ["Keep the careful distance", "Let him wonder", "Stay quiet"],
        close: [
          "Understand his quiet",
          "Walk in silence together",
          "Let him lean, and don't mention it",
        ],
        bound: ["Let him sleep", "Lie still", "Say nothing at all"],
      },
    },
  },

  taiga: {
    dialogue: {
      new: [
        'He eyes you with a challenging smirk, cards deftly shuffled in his hands. "You lost, kitten?"',
        "The cards keep moving. So does the grin. Neither is friendly, exactly.",
        '"Huh. You\'ve got guts walking in here. Stupid ones, but guts."',
        "He kicks a chair out — not toward you, just near you. Interpret it however you like.",
        '"Who the fuck are you again?" He squints. "...Whatever. Sit down."',
      ],
      known: [
        '"Kitten" has stuck. He\'s stopped bothering to make it sound like an insult.',
        "He deals you in without asking, and doesn't explain the rules. Figure it out.",
        "He kicks the chair out properly this time, in your direction.",
        '"Do I know you? ...Right. Kitten. Course I do." The stigma ate a few days again.',
        "The smirk stays. The edge on it has gone somewhere else.",
      ],
      warm: [
        "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
        "He calls you an idiot. He deals you in anyway. Same thing, from him.",
        '"Took your damn time," he says, having very obviously held the seat.',
        'He\'s eating something charred off a skewer. "You wanna know what kind of meat this is? Anomaly meat, what else? ...Want some?"',
        "The whole table gets quieter when he's talking to you. He hasn't noticed.",
      ],
      spark: [
        "He hooks a finger in your collar to pull you down to his level, grinning.",
        '"Kitten," he says, and this time it isn\'t a jab at all.',
        "He wins the hand, sweeps the pot, and puts his arm across the back of your chair.",
        "He gets close enough to make a point and then forgets what the point was.",
        "The insults have gone soft around the edges. He'd fight you for saying so.",
      ],
      close: [
        '"You\'re the only one I\'d ever go all-in for," he says roughly, pulling you close. "Don\'t make me regret it."',
        "He puts his hand on the back of your chair. Just there. It stays.",
        '"Don\'t do anything stupid," he growls, which is his entire vocabulary for worry.',
        "He folds a winning hand because you looked tired and he wanted to leave.",
        "The bravado is completely transparent now, and he's stopped trying to fix that.",
      ],
      bound: [
        "He's rough with everyone and unspeakably careful with you, and hates being caught at it.",
        "He pulls you into his lap mid-hand and the whole table pretends not to notice.",
        '"Love you, kitten," he growls, daring you to make something of it.',
        "He falls asleep with an arm across you like a bar across a door.",
        '"Kitten" has become the softest word in his entire vocabulary and he knows it.',
      ],
    },
    temperamentDialogue: {
      new: [
        "\"Who're you? Don't pop up out of nowhere like that.\"",
        '"Hah! Look at this one. You gonna cry, kitten?"',
        '"Sit or scram. I don\'t care which, just pick."',
        '"You got money? No? Then you got nothin\' I want. Probably."',
        "\"Heads or tails, even or odd, on or off... It's all so fucking tedious! ...Oh. You're real. Hey.\"",
      ],
      known: [
        '"Oh, it\'s the kitten. Sit down before you embarrass yourself standing."',
        '"You know the rules yet? No? Tch. Watch, then."',
        "\"You keep comin' back. Either you're broke or you're lonely.\"",
        "\"Don't bet what you can't lose. Free advice. Only one you get.\"",
        '"Playing with these morons is exhausting... Lulu gets all mad if I win too much. Sit — you\'re better company."',
      ],
      warm: [
        '"...So you came back, kitten?"',
        '"Sit down, dumbass. Seat\'s already out."',
        '"You\'re late. Not that I was waiting. Shut up."',
        '"Here. Drink it. Don\'t make a thing out of it."',
        "\"This is boring. I'm outta here. ...Somethin' smells amazing. C'mon, we're gettin' food. Ciao, losers.\"",
      ],
      spark: [
        "\"C'mere. Closer. I ain't gonna bite. Probably.\"",
        "\"You keep lookin' at me like that, kitten, somethin's gonna happen.\"",
        '"Sit on my side of the table. I don\'t care how it looks."',
        "\"Hah! You're blushin'. Good. Now we're even.\"",
        "\"I'd bet the whole damn house on you. Don't make me say it sober.\"",
      ],
      close: [
        "\"Don't you dare go getting hurt. That's MY job to protect you. Gyahaha!\"",
        "\"Get over here. Closer. I ain't askin' twice.\"",
        "\"I'd bet everything on you, kitten. Everything. Don't let it go to your head.\"",
        "\"You look tired. We're leaving. No, I don't care about the hand.\"",
        '"Anybody touches you, they answer to me. That\'s the deal. Always was."',
      ],
      bound: [
        "\"Get over here. On my lap. I don't care who's watchin'.\"",
        '"Love you. Yeah. Said it. What\'re you gonna do about it?"',
        '"Stay the night. Whole night. Don\'t make me ask twice, kitten."',
        "\"You're the only bet I'd never hedge. Ever.\"",
        "\"Come back to bed. The game'll still be rigged in the mornin'.\"",
      ],
    },
    approach: {
      new: [
        "Take the kicked-out chair",
        "Smirk right back",
        "Ask to be dealt in",
        "Don't flinch",
      ],
      known: [
        "Sit before he says it twice",
        "Get dealt in",
        "Take the free advice",
        "Watch the hand",
      ],
      warm: [
        "Take the held seat",
        "Call him a dumbass back",
        "Take the drink",
        "Sit down and play",
      ],
      spark: [
        "Get closer",
        "Sit on his side",
        "Look at him like that",
        "Let him pull you down",
      ],
      close: [
        "Get over there",
        "Go all-in",
        "Let him pull you close",
        "Tell him to fold",
      ],
      bound: [
        "Get over there",
        "Sit in his lap",
        "Stay the night",
        "Make something of it",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be kind despite his bark",
          "Thank him for the seat",
          "Ignore the insult entirely",
        ],
        spark: [
          "Let the softness show",
          "Say kitten back",
          "Tell him he's already won",
        ],
        close: [
          "See the softness under the snarl",
          "Tell him you worry too",
          "Take the bet off his shoulders",
        ],
        bound: ["Say it back", "Let him be careful", "Call him kitten too"],
      },
      playful: {
        new: [
          "Trade insults with him",
          "Call him kitten back",
          "Cheat, badly, on purpose",
        ],
        spark: [
          "Make him blush first",
          "Cheat where he can see",
          "Call the bluff",
        ],
        close: [
          "Be the one who can rile him",
          "Beat him at his own table",
          "Laugh in his face fondly",
        ],
        bound: [
          "Make something of it",
          "Ruin his hand",
          "Say it in front of the table",
        ],
      },
      bold: {
        new: [
          "Meet his challenge head-on",
          "Raise the stakes",
          "Sit without being invited",
        ],
        spark: [
          "Sit on his side",
          "Pull him down instead",
          "Make something happen",
        ],
        close: [
          "Go all-in with him",
          "Tell him you're his bet",
          "Grab his collar first",
        ],
        bound: [
          "Climb into his lap",
          "Say it first",
          "Tell him he's your bet too",
        ],
      },
      neutral: {
        new: [
          "Let him posture",
          "Play your hand quietly",
          "Say nothing and stay",
        ],
        spark: ["Play the hand out", "Stay on your side", "Let him posture"],
        close: [
          "Let the bravado run out",
          "Sit through the losing hand",
          "Keep him company in silence",
        ],
        bound: ["Play the hand out", "Let him growl", "Say nothing"],
      },
    },
  },

  ritsu: {
    dialogue: {
      new: [
        'He looks up with genuine interest, already assessing your potential. "Partner, your timing is fortuitous. I could use someone sharp."',
        "He finishes a paragraph, caps the pen, and gives you a précis of his day before you asked.",
        '"What business do you have with me? Please keep in mind that I charge 5500 yen per half hour for consultations, tax inclusive."',
        "There are eleven documents on the desk and he knows exactly where each one is.",
        "He speaks in complete sentences at a speed that suggests he's already ahead of them.",
      ],
      known: [
        "He's stopped introducing himself. He opens mid-argument now, which is friendlier.",
        '"Partner," he says, and this time it\'s a name rather than a proposition.',
        "He hands you a document unprompted. He wants your read on it.",
        '"Have you seen Taiga Hoshibami? Strange... According to my behavioral model, he should be in the casino at this time."',
        '"I have been assigned to Sinostra, so I will not allow them to stand trial, no matter how villainous their actions. That is the Shinjo family policy."',
      ],
      warm: [
        "His eyes light up when he sees you—he's eager now, ready to collaborate and strategize together.",
        "He's drafted something with your name on it. He drafted it optimistically.",
        '"Partner. Excellent. I\'ve had a thought and no one worth telling it to."',
        "The verbosity slows down around you. He's actually listening, which is the tell.",
        "He argues the opposite side just to hear you dismantle it. He enjoys losing to you.",
      ],
      spark: [
        "He sets down the file and gives you a look with nothing legal in it.",
        '"I\'d like to renegotiate the terms of this partnership," he says carefully.',
        "He's rehearsed this. He's a very good speaker. It isn't helping.",
        "He takes off his glasses, which for him is practically undressing.",
        '"There is no precedent for what I want to say. So I\'ll simply say it."',
      ],
      close: [
        '"You\'ve become my partner in more ways than just business," he says warmly, stepping closer. "I wouldn\'t trust the calculation to anyone but you."',
        "He sets the file down mid-clause. That has never once happened for anyone else.",
        '"There\'s no clause for this," he admits. "I\'ve looked. Extensively."',
        "He explains the whole risk, honestly, and then asks you to decide.",
        "The lawyer goes quiet, and the person behind him is much less careful with words.",
      ],
      bound: [
        "The files stay shut. He's stopped pretending anything else has priority.",
        '"I have no argument for this," he says, "and no interest in constructing one."',
        "He takes his glasses off, sets them down deliberately, and stops talking entirely.",
        "He's verbose about everything except this, where he's suddenly and completely direct.",
        "He holds you like the one thing in his life he never had to negotiate for.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Ah, my new partner. Perfect timing. Let\'s work through this together."',
        '"Before you commit to anything in this house — read it. All of it. I\'ll wait."',
        '"You have a good face for negotiation. That\'s a compliment, incidentally."',
        "\"State your position and I'll tell you whether it's defensible.\"",
        '"Keep in mind: I charge 5500 yen per half hour for consultations. Tax inclusive."',
      ],
      known: [
        '"Partner — good. I need a second opinion, and yours is becoming reliable."',
        '"Read this. Tell me what\'s wrong with it. Something is."',
        '"I\'ve stopped explaining the basics to you. Take that as the compliment it is."',
        '"You disagreed with me last time. You were half right. That\'s remarkable."',
        "\"Any self-respecting inspector would stay comfortably ahead of schedule — I suggest you get into the habit. Let's go — there's no time to waste.\"",
      ],
      warm: [
        "\"I was hoping you'd come by. We make a good team, don't we?\"",
        "\"Sit — I've got a problem and you've got the better instincts.\"",
        '"Argue the other side for me. You\'re the only one who does it properly."',
        '"I\'ve reserved this hour. Coincidence, obviously."',
        '"Your reasoning has improved. So has my mood. Related, I suspect."',
      ],
      spark: [
        '"I move to amend our arrangement. Clause one: I\'d like to be closer."',
        "\"I've prepared an argument. It's excellent. May I skip to the conclusion?\"",
        "\"Objection — you're distracting. Sustained. I'm not asking you to stop.\"",
        "\"Everything I've calculated says this is unwise. I'm proceeding regardless.\"",
        "\"Say no and I'll never raise it again. Say yes and I'll never shut up about it.\"",
      ],
      close: [
        '"You\'re the only person I trust completely. We can accomplish anything with you by my side."',
        '"Set the file aside. I\'d rather talk to you than about anything else."',
        "\"I've calculated every outcome. They're all better with you in them.\"",
        '"No contract, no terms. Just tell me you\'ll stay a partner."',
        "\"I could argue anything. I can't argue myself out of this. I've stopped trying.\"",
      ],
      bound: [
        '"Close the file. Close it. There — now come here."',
        '"I love you. No preamble, no clause, no conditions. It\'s rather freeing."',
        "\"Stay. I'll clear the docket. I'll clear the entire week if you ask.\"",
        "\"I've argued my way out of everything. Not this. I don't want out.\"",
        '"Take the glasses. I won\'t be needing them."',
      ],
    },
    approach: {
      new: [
        "Take the consultation",
        "Answer his three questions",
        "State your position",
        "Sit across the desk",
      ],
      known: [
        "Give a second opinion",
        "Read the document",
        "Disagree with him",
        "Take the offered seat",
      ],
      warm: [
        "Take the reserved hour",
        "Argue the other side",
        "Pull up a chair",
        "Hear out the thought",
      ],
      spark: [
        "Hear the amendment",
        "Let him skip to the conclusion",
        "Say yes",
        "Overrule the objection",
      ],
      close: [
        "Set the file aside",
        "Go sit beside him",
        "Take the partnership",
        "Tell him you'll stay",
      ],
      bound: [
        "Close the file",
        "Take his glasses",
        "Stay the week",
        "Come here",
      ],
    },
    responses: {
      kind: {
        new: [
          "Be logical with him",
          "Take the advice seriously",
          "Thank him for the free hour",
        ],
        spark: [
          "Let him skip to the conclusion",
          "Tell him no precedent is needed",
          "Say yes kindly",
        ],
        close: [
          "Show him friendship is real",
          "Tell him no contract is needed",
          "Say the calculation can wait",
        ],
        bound: [
          "Say it back without clauses",
          "Close the file for him",
          "Tell him he needn't argue",
        ],
      },
      playful: {
        new: [
          "Engage his mind playfully",
          "Object on principle",
          "Argue an absurd position",
        ],
        spark: [
          "Object on principle",
          "Cross-examine him",
          "Make him argue for it",
        ],
        close: [
          "Make him smile despite logic",
          "Win the argument on purpose",
          "Cross-examine him instead",
        ],
        bound: [
          "Object one last time",
          "Take his glasses",
          "Make him state it for the record",
        ],
      },
      bold: {
        new: ["Be straightforward", "Name your terms", "Refuse the fine print"],
        spark: [
          "Say yes",
          "Amend the clause yourself",
          "Take the glasses off him",
        ],
        close: [
          "Make a bold choice about him",
          "Tell him he's more than a partner",
          "Close the deal yourself",
        ],
        bound: [
          "Clear his docket yourself",
          "Say it first",
          "Tell him he's not getting out",
        ],
      },
      neutral: {
        new: [
          "Be logical",
          "Read before you answer",
          "Let him finish the clause",
        ],
        spark: [
          "Table the motion",
          "Let the file stay open",
          "Reserve judgment",
        ],
        close: [
          "Understand his logic",
          "Sit through the long argument",
          "Let the office go quiet",
        ],
        bound: ["Let him work", "Sit in the quiet office", "Say nothing"],
      },
    },
  },

  romeo: {
    dialogue: {
      new: [
        'He\'s barking orders at the staff, managing every angle of the casino floor. "HDY waste my time? Quick, put on this dress and work table seven—we need someone sharp out there."',
        "He's on two conversations and one phone call. You are somehow now the third conversation.",
        "\"Come to my private office later — I've got a little proposal I think you'll want to hear. But make sure you come alone.\"",
        "He looks you up and down, does arithmetic, and apparently likes the result.",
        "Something goes wrong across the room. He fixes it without stopping talking to you.",
      ],
      known: [
        "He's stopped trying to put you to work. Mostly.",
        '"Oh, it\'s YOU," at a volume that carries across the entire floor.',
        "He complains about something to you specifically, which is a form of trust.",
        '"Have you seen Shinjo anywhere? I just asked him to organize some documents and he ran off to make copies!"',
        "Somebody has put a drink in front of you. Nobody will admit who.",
      ],
      warm: [
        "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
        '"HDY show up unannounced — sit down, I\'ll get you something. Ugh. Fine. I want to."',
        "He complains about you at length to someone else, loudly, entirely as a compliment.",
        "He's had the good seat held all night. He will absolutely deny that.",
        "The yelling drops a full register when he turns to you. Everyone notices. He doesn't.",
      ],
      spark: [
        "He clears the whole VIP room. For a conversation. That he then can't start.",
        '"HDY look like that in MY casino," he snaps, meaning something entirely different.',
        "He fixes your collar, aggressively, and doesn't step back afterward.",
        "The yelling stops. The silence that replaces it is much louder.",
        "He buys you something absurd and refuses to explain why, badly.",
      ],
      close: [
        '"You\'re not just money or status to me," he admits, voice uncharacteristically sincere. "You\'re everything."',
        "He hands the floor to someone else — the floor — because you looked like you needed a minute.",
        "\"Don't tell me what it cost. It's yours. That's the end of the conversation.\"",
        "The performance of not caring finally collapses, and he's not even embarrassed about it.",
        '"HDY make me like you this much," he mutters, and doesn\'t let go of your hand.',
      ],
      bound: [
        "He's bought out the floor for the night. For you. He'll never explain it properly.",
        '"HDY make me like this," he mutters, with his face in your neck.',
        "He yells at everyone all day and comes home and is completely, quietly undone.",
        "He drapes something absurdly expensive over your shoulders and refuses all thanks.",
        "The money means nothing. He's finally, loudly, stopped pretending otherwise.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Perfect timing—I need someone I can trust to manage the VIP section. You in?"',
        '"HDY stand in my doorway looking like that. Move, or be useful."',
        "\"Tch... If you don't have any business for me, I'm leaving! You're wasting my precious time!\"",
        '"Fuji-kun... Come out, come out, wherever you are... Tch, where did he go? Why is running away the only thing he\'s good at?!"',
        "\"You're new. Rule one: don't touch the chips. Rule two: see rule one.\"",
      ],
      known: [
        '"You again! HDY keep showing up without an appointment. Sit down."',
        '"Don\'t touch the — okay, fine, you know not to. Fine."',
        '"Just go! I cannot deal with this WTWUT! Wall-To-Wall Useless Trash, obviously! ...Not you. You can stay."',
        "\"I'm not saying I remembered your name. I'm saying I said it. Different thing.\"",
        "\"Drink's on the house. Don't tell the house.\"",
      ],
      warm: [
        "\"Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.\"",
        '"Sit. The good seat. No, I didn\'t hold it. Shut up."',
        '"HDY make me worry about you all evening. Explain yourself."',
        '"You eaten? Don\'t answer, I already ordered."',
        "\"You're not staff and you're not a guest. You're... whatever. You're welcome here.\"",
      ],
      spark: [
        '"Everybody out. Not you. Obviously not you."',
        '"HDY make me feel like this. Do you have ANY idea what you\'ve cost me."',
        '"Wear it. I bought it. Don\'t argue, just — just wear it for me."',
        "\"I'm not good at quiet. Give me a second. I'm trying.\"",
        "\"You're the only thing in this building that isn't for sale. That's the problem.\"",
      ],
      close: [
        "\"I'd spend all my money on you if you asked. Not that I'd ever admit that normally.\"",
        "\"Take it. Don't look at the price. I said don't look.\"",
        '"HDY be the only thing on this floor I can\'t calculate."',
        "\"I've got people for everything. I don't have anyone for you. That's the point.\"",
        '"Stay till close. I\'ll be insufferable the whole time. You like that."',
      ],
      bound: [
        "\"Floor's closed. Everyone's gone. It's just us, so — come here already.\"",
        '"I love you. HDY make me say it out loud. Ugh. I love you."',
        "\"Wear it to bed. I don't care that it's expensive, that's the POINT.\"",
        "\"Stay. I'll cancel everything. I've already cancelled everything.\"",
        "\"You're the only thing I've ever wanted that I couldn't just buy.\"",
      ],
    },
    approach: {
      new: [
        "Cut into the conversation",
        "Make yourself useful",
        "Walk faster",
        "Ask what the job pays",
      ],
      known: [
        "Take the free drink",
        "Sit without an appointment",
        "Interrupt the yelling",
        "Say what you want, quickly",
      ],
      warm: [
        "Take the good seat",
        "Interrupt him anyway",
        "Complain right back",
        "Let him order for you",
      ],
      spark: [
        "Stay when the room clears",
        "Wear it",
        "Give him a second",
        "Let the yelling stop",
      ],
      close: [
        "Go straight to him",
        "Take his hand",
        "Stay till close",
        "Tell him to hand off the floor",
      ],
      bound: [
        "Come here already",
        "Wear it to bed",
        "Stay",
        "Let him cancel everything",
      ],
    },
    responses: {
      kind: {
        new: [
          "Match his sass",
          "Take the job seriously",
          "Thank him and mean it",
        ],
        spark: [
          "Give him the second",
          "Wear it for him",
          "Tell him he's not a transaction",
        ],
        close: [
          "Know his real worth is you",
          "Tell him to stop buying things",
          "Say the money was never it",
        ],
        bound: [
          "Say it back",
          "Wear it for him",
          "Tell him he's more than the money",
        ],
      },
      playful: {
        new: ["Trade sass with him", "Use his own acronym", "Touch the chips"],
        spark: ["Ask what it cost", "Out-yell him", "Refuse to wear it"],
        close: [
          "Match his wit",
          "Out-yell him affectionately",
          "Spend his money on him",
        ],
        bound: [
          "Make him say it louder",
          "Ask what it cost",
          "Refuse the gift twice",
        ],
      },
      bold: {
        new: ["Bet on yourself", "Name your price", "Take the VIP section"],
        spark: [
          "Stay when the room clears",
          "Fix his collar back",
          "Tell him what he's worth",
        ],
        close: [
          "Know you're worth his money",
          "Tell him to say it plainly",
          "Take his hand in front of the floor",
        ],
        bound: [
          "Close the floor yourself",
          "Say it first",
          "Tell him he couldn't buy you",
        ],
      },
      neutral: {
        new: ["Stay quiet", "Let him run the floor", "Nod and get on with it"],
        spark: ["Let him find the words", "Leave with the room", "Say nothing"],
        close: [
          "Let him have this moment",
          "Wait out the rant",
          "Sit through the closing count",
        ],
        bound: ["Let him rant", "Sit in the empty room", "Say nothing"],
      },
    },
  },

  benkei: {
    dialogue: {
      new: [
        'He looks up from his work, a little flustered but smiling warmly. "Oh! H-hello. Do you need help with something?"',
        "He's carrying far too much and insists it's no trouble at all.",
        '"Careful there — mind the — ah, you\'ve got it. Good, good."',
        "He starts to say something, thinks better of it, and offers you a snack instead.",
        "There's a kindness to him that's older than everyone else in this school put together.",
      ],
      known: [
        "He knows your name, and says it like he's glad of the chance to.",
        "He's stopped asking whether you need help. He just starts helping.",
        "There's something set aside on the counter. It's been there a couple of days.",
        '"You\'re one of the ones who says thank you," he says. "I remember those."',
        "The fluster has settled into something easier.",
      ],
      warm: [
        'He gets a bit red in the face when he sees you, but his smile is genuine and eager. "You came back! Can I help you with anything?"',
        "He's set something aside for you. He does that most days now, just in case.",
        '"You remind me of someone," he says fondly, and doesn\'t finish the thought.',
        "He fusses over whether you're warm enough, then apologizes for fussing.",
        "He remembers exactly what you asked about last time, down to the detail.",
      ],
      spark: [
        "He goes red to the ears and busies himself with something that needed no attention.",
        "He steadies you by the elbow, and takes a long moment letting go.",
        "\"Ah — I've been meaning to say — no, it'll keep. It'll keep.\"",
        'He\'s practiced this in his head about forty times. It comes out as "you look nice."',
        "He walks you to the gate and finds three reasons to walk slower.",
      ],
      close: [
        '"You\'re really important to me," he says softly, a hint of bashfulness in his voice. "I\'m always happy to help you with anything you need."',
        "He tells you a story about the old days that he doesn't tell anyone.",
        '"Don\'t push yourself so hard," he says gently. "Somebody ought to say it."',
        "He's quietly made your life easier in three ways this week and mentioned none of them.",
        "He looks at you the way one looks at something worth having stayed around for.",
      ],
      bound: [
        "He still goes red. He's stopped letting it stop him.",
        "He kisses your forehead every single morning like a man observing a sacrament.",
        '"I\'d got used to being alone," he admits quietly. "You\'ve ruined that entirely."',
        "He holds you carefully, like something he's been trusted with and means to deserve.",
        "He's old-fashioned about all of it, and it turns out that's devastating.",
      ],
    },
    temperamentDialogue: {
      new: [
        '"Oh! H-hi! Did you need something? I\'m here to help!"',
        '"Whoa there — careful now. This old floor\'s got opinions."',
        '"You look hungry. Ah — sorry, that was forward of me."',
        '"Anything you need carried? I\'m good for it, honest."',
        '"New face! Well, welcome. It\'s a strange place, but it grows on you."',
      ],
      known: [
        '"Oh — you\'re back! Good, good. I set something aside, hang on."',
        "\"Don't carry that yourself, I've got two good arms doing nothing.\"",
        '"You always say thank you. Not everyone does, you know."',
        "\"How've you been keeping? Eating properly? Ah — sorry, I'm fussing.\"",
        '"Take it. No charge. I\'d only have eaten it myself."',
      ],
      warm: [
        "\"You're back! I'm really happy to see you. What can I do for you?\"",
        '"Set that down, I\'ll take it. No arguing."',
        "\"I kept this aside for you. Wasn't sure you'd come. Glad you did.\"",
        '"Warm enough? Here — take it, I\'ve got another."',
        '"Ah, it\'s good to see a friendly face. Been a long day."',
      ],
      spark: [
        "\"You look — ah. Very nice. That's all. That's what I meant to say.\"",
        '"I\'m too old to be this flustered and here we are."',
        "\"Let me walk you back. It's dark. That's the reason. That's the only reason.\"",
        '"I\'ve been meaning to tell you something. Give me a minute to lose my nerve."',
        '"You make an old man feel very silly. I don\'t mind it a bit."',
      ],
      close: [
        '"You mean a lot to me. I\'d do anything to help you."',
        '"Sit with me a bit. These old bones like the company."',
        "\"You've been running yourself ragged. Don't think I haven't noticed.\"",
        "\"I've seen a lot of students come and go. You're the one I'll remember.\"",
        "\"Whatever it is, bring it to me first. That's what I'm here for.\"",
      ],
      bound: [
        '"Come here, love. Let me look at you a minute."',
        '"I love you. Took an old man far too long to get that out."',
        "\"Stay the night? I'll not pretend I don't want you to.\"",
        "\"You make me feel like a young fool. I've decided I don't mind.\"",
        '"Sit with me. Just here. That\'s all I ever want, most days."',
      ],
    },
    approach: {
      new: [
        "Offer to help carry",
        "Accept the snack",
        "Say hello",
        "Mind the floor",
      ],
      known: [
        "Take what he set aside",
        "Let him carry it",
        "Say thank you again",
        "Let him fuss",
      ],
      warm: [
        "Let him take the load",
        "Take what he set aside",
        "Ask about his day",
        "Sit with him a while",
      ],
      spark: [
        "Let him walk you back",
        "Wait out his nerve",
        "Take his arm",
        "Walk slower",
      ],
      close: [
        "Go sit with him",
        "Ask for the old story",
        "Bring it to him first",
        "Tell him he matters",
      ],
      bound: ["Come here", "Stay the night", "Sit with him", "Say it back"],
    },
    responses: {
      kind: {
        new: [
          "Trust his wisdom",
          "Thank him warmly",
          "Tell him it's no trouble",
        ],
        spark: [
          "Tell him it came out fine",
          "Take his arm",
          "Let him lose his nerve",
        ],
        close: [
          "Let him care for you",
          "Tell him to rest too",
          "Say he's been remembered",
        ],
        bound: [
          "Say it back",
          "Let him look at you",
          "Tell him he's not a fool",
        ],
      },
      playful: {
        new: [
          "Appreciate his warmth",
          "Fluster him gently",
          "Ask for the second snack",
        ],
        spark: ["Make him say it again", "Walk even slower", "Tease the blush"],
        close: [
          "Enjoy his quiet humor",
          "Tease him about the old days",
          "Make him laugh out loud",
        ],
        bound: [
          "Make him blush again",
          "Call him an old fool",
          "Kiss him first",
        ],
      },
      bold: {
        new: [
          "Be honest with him",
          "Carry it yourself",
          "Ask him straight out",
        ],
        spark: [
          "Say it for him",
          "Take his hand at the gate",
          "Tell him he's not too old",
        ],
        close: [
          "Accept his strength",
          "Tell him you'll look after him",
          "Say you'd stay too",
        ],
        bound: [
          "Say it first",
          "Tell him to stop pretending",
          "Stay the night",
        ],
      },
      neutral: {
        new: ["Be quiet", "Let him fuss", "Wait while he finishes"],
        spark: ["Let it keep", "Say goodnight", "Walk on ahead"],
        close: [
          "Rest with his wisdom",
          "Sit in the old quiet",
          "Let the story trail off",
        ],
        bound: ["Sit with him quietly", "Let the evening pass", "Say nothing"],
      },
    },
  },
};
