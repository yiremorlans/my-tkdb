export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Taiga never
  // gets nice; he gets specific. The engine of the whole ladder is the
  // time-slipping stigma: he loses people and places, and the intimacy is the
  // increasingly desperate machinery he builds to keep hold of one person.
  // "Kitten" and "dumbass" stay in to the last line. Canon: he never forgets
  // anyone he's nicknamed, so what slips is her *name*, never her; "kitten"
  // is the part that sticks.
  //
  // Texting voice, per reference.md's "## Bond Scenes" notes: lowercase, one
  // short sentence per line (no paragraphs), and "u"/"ur", "k", "yea", "lol".
  // "Gyahaha!" is still his. In-person `> ` speech and narration keep normal
  // punctuation.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: oi. kitten.\n\nthis is Taiga.\n\nwriting it down so I know it's me later.\n\nlong story.",
        "here's the deal.\n\nur name's on a scrap of paper in my pocket.\n\nthird one down, under a room number and a debt.\n\nevery time I find it I gotta work out who the hell u are.\n\nthen I remember.\n\nthen I stop caring why.\n\n{timesMet} times now.\n\nthat's Lulu's count, not mine.\n\nI just got the paper. Gyahaha!",
      ],
      choice: {
        prompt: "so. say something worth writing down, dumbass.",
        options: [
          {
            key: "kind",
            label: "Say you'll keep turning up",
            style: 3,
            close:
              "yea, they all say that.\n\n…writing it down anyway.\n\ndon't turn up, I'll feel like an idiot when I read this back.\n\nur problem now.",
          },
          {
            key: "playful",
            label: "Ask what else is on the paper",
            style: 1,
            close:
              "none of ur business.\n\nroom number, a debt, ur name.\n\ndon't read into the order.",
          },
          {
            key: "bold",
            label: "Ask why he wrote you down",
            style: 4,
            close:
              "*A longer gap than he'd ever admit to.*\n\nforgot u once.\n\nannoyed me.\n\nthat's the whole reason.\n\ndon't make it a thing, kitten.",
          },
        ],
      },
      keepsake: {
        emoji: "🃏",
        line: "A scrap of paper in a coat pocket with your name third on it.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: hey.\n\nnoticed something and I don't like it.",
        "u keep coming back with {favResponse}. every time.\n\ndoesn't matter what mood I'm in, doesn't matter if I forgot ur name an hour before.\n\nused to flinch when I pulled my gun too. everyone does, it's funny.\n\nu quit flinching a while back. sit closer than u used to. talk first instead of waiting for me to work out who u are.\n\nso that's what's stuck. figure it's on u to explain it to me.",
      ],
      choice: {
        prompt: "everyone's running something. what's urs.",
        options: [
          {
            key: "kind",
            label: "Say there's no angle",
            style: 3,
            close:
              "no angle, huh\n\ndon't jinx it, kitten. odds are bad enough as is.",
          },
          {
            key: "playful",
            label: "Ask if he's keeping count",
            style: 1,
            close:
              "gyahaha! course I'm keeping count, what, u think I do this for free?\n\nkeeping receipts, kitten. everyone pays eventually",
          },
          {
            key: "bold",
            label: "Ask what his angle is",
            style: 4,
            close:
              "since when do I explain myself?\n\n…keep coming at me like that, I'll start asking for more than answers.",
          },
        ],
      },
      keepsake: {
        emoji: "🔫",
        line: "The flinching at his gun you don't do anymore, and he can't stop noticing.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: come up to the floor after close.\n\nnot the tables.\n\nthe office.",
        "*The office is a mess. The corkboard on the back wall isn't. Only organized thing in the building.*\n\n*Covered in paper. Names, places, times, his handwriting getting worse down the years.*\n\n> That's the system. Everything I couldn't keep in my head.",
        "*He points top left. Neat, old, faded.*\n\n> First one I ever pinned. Back when I still thought I could out-play this thing. Keep enough notes, never lose a hand.\n\n*Bottom right: eleven notes, same person, eleven pens, months apart.*\n\n> You. Eleven. Lulu's the only other one with more than two, and he pays me.",
      ],
      choice: {
        prompt:
          "Go on then. Say the sad thing. Everyone says the sad thing when they see the board.",
        options: [
          {
            key: "kind",
            label: "Say eleven isn't enough",
            style: 3,
            close:
              "*He stops.*\n\n> ...What?\n\n*You say it again.*\n\n> Right.\n\n*He pulls out a pen. Writes a twelfth one right there, pins it without looking at you.*\n\n> Don't say anything. Get out. Come back tomorrow.",
          },
          {
            key: "playful",
            label: "Read one of them out loud",
            style: 1,
            close:
              "> Don't...\n\n*Too late. It says, handwriting getting away from him halfway:* \"the one who doesn't do the math. keep this one.\"\n\n*Long silence.*\n\n> Gyahaha,\n\n*no conviction behind it.*\n\n> Yeah. Alright.",
          },
          {
            key: "bold",
            label: "Ask him to write one now",
            style: 4,
            close:
              "> About what.\n\n*You tell him. He looks at you a while, then writes it slow, best handwriting on the board, pins it dead center.*\n\n> There,\n\n*he says.*\n\n> Not going anywhere. Don't care what my head does.",
          },
        ],
      },
      keepsake: {
        emoji: "📌",
        line: "The twelfth note on a corkboard, written while you were standing there.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: lost four days.\n\nfound out an hour ago.\n\ndon't come up.",
        "Lulu ran the floor.\n\nhasn't said a word.\n\nmeans he'll bring it up in a month, when I've forgot to be grateful.\n\nfour days gone.\n\nwednesday to sunday.\n\nnothing.\n\nsomebody moved a chair in my office and I've been staring at it an hour like it'll explain itself.",
        "thing nobody gets: it doesn't hurt.\n\npeople expect it to. it doesn't.\n\nit's that one day it's just the board. paper. some guy reading his own life off a wall, taking somebody else's word for it.\n\nur on it twelve times, kitten.\n\nspent the hour working out if that's a good thing to have done to u.",
      ],
      choice: {
        prompt: "say it straight. don't be nice about it, I'll know.",
        options: [
          {
            key: "kind",
            label: "Say you'd tell him about you",
            style: 3,
            close:
              "*Nothing for a long time.*\n\nevery time?\n\n*You say yes.*\n\n…every time.\n\nright.\n\n*Then:* come up.\n\nsaid don't, now I'm saying do.\n\nnot explaining the switch.",
          },
          {
            key: "playful",
            label: "Say you moved the chair",
            style: 1,
            close:
              "U MOVED THE…\n\n*A pause. Then something close to a laugh.*\n\nGyahaha.\n\ndickhead.\n\none mystery down.\n\n…don't do it again.\n\nactually, do.\n\nlol best hour I've had since Wednesday.",
          },
          {
            key: "bold",
            label: "Say the board isn't the point",
            style: 4,
            close:
              "it's the only point I've got.\n\n*Four minutes later:*\n\nexplain that.\n\nproperly.\n\nnot messing with u, I want the actual argument.\n\nbeen losing it to myself for years.\n\n*You give him the argument. He doesn't fold. But he asks again next week. And the week after.*",
          },
        ],
      },
      keepsake: {
        emoji: "🪑",
        line: "A chair moved four inches, and the hour he spent staring at it.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't be in the lower halls tonight.\n\nthat's not me asking.",
        "there's a thing down there, Lulu's put a price on it.\n\nI'm collecting.\n\nthat's the job, I'm hungry, decent night for it.\n\nur not coming.\n\nbefore u start.",
        "here's why, once, so listen.\n\ndon't always know what I do down there.\n\ncome back up sometimes, an hour's gone, Lulu won't look at me.\n\nnot finding out what I'm like with u in the middle of it.\n\nturn up anyway, I swear on the board I'm done talking to u.",
      ],
      choice: {
        prompt: "say ur staying out of it. say it so I can go.",
        options: [
          {
            key: "kind",
            label: "Say you'll stay put",
            style: 3,
            close:
              "k.\n\n*Nothing for three hours.*\n\n*Half four:* done.\n\nall fine.\n\nhour's all there.\n\n*Later, thinking you're asleep:* thought about the paper the whole way down.\n\nnever happens down there.",
          },
          {
            key: "playful",
            label: "Ask what's on the menu",
            style: 1,
            close:
              "Gyahaha! that's my girl… that's my…\n\n*A pause where he clearly reconsiders the sentence and then decides not to fix it.*\n\nsomething with too many legs.\n\nI'll tell u if it's any good.",
          },
          {
            key: "bold",
            label: "Refuse to promise",
            style: 4,
            close:
              "don't.\n\n*Only time he's ever sent one word.*\n\nkitten.\n\ndon't.\n\ngot about four things left I'm sure of, ur all of them.\n\nnot putting one in a corridor to find out what I am.\n\n…promise me.\n\nfirst time I've said that in years.",
          },
        ],
      },
      keepsake: {
        emoji: "📩",
        line: "The one word he sent alone, and the one he'd not used in years.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: office.\n\nnow.\n\nI'm not typing this one out, I'll lose it halfway.",
        "*Board's been rebuilt. Debts, room numbers, the rest, gone, boxed on the floor.*\n\n*Just you left. {timesMet} notes, one for every time, eleven different pens.*\n\n> Took two days. Lulu thinks I've cracked.",
        "> Never said this out loud. Shut up a minute.\n\n> Don't get to keep things. People go through me and out the other side, I get a bit of paper if I'm quick. Fine with that. Mostly.\n\n> Then you turned up. Started writing things down before I forgot 'em. Before, not after. Like I was scared of it, for the first time in six years.",
        "*Points at the middle of the board. The good handwriting.*\n\n> Says I love you. Since March. Wrote it for me, not you. So whatever happens up here, some version of me reads it and knows.\n\n> That's it. Said it worst way possible. Off a wall. Like a dumbass.",
      ],
      choice: {
        prompt: "Go on. Whatever it is. I've read worse off this board.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*Doesn't say anything a moment. Takes the pen out, holds it out handle-first.*\n\n> Write it. Your writing, not mine.\n\n*Pinned up next to his, he looks at the two a while, then just picks you up off the floor, one arm, no warning, holds on.*\n\n> Now it's on the wall,\n\n*into your hair.*\n\n> True even when I'm not.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "> Yeah.\n\n*No argument. Unheard of, from him.*\n\n> Board stays up either way. Not pressure. Just... need it up there. Not for you. For whoever I am in the morning.\n\n*Pen away.*\n\n> Take your time. Keep turning up. I'll still ask your name some days. Rather ask you than read you.",
          },
        ],
      },
      keepsake: {
        emoji: "📍",
        line: "A note in the middle of the board that's been there since March.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: 'He eyes you with a challenging smirk, cards deftly shuffled in his hands. "You lost, or you stupid?"',
        approach: "Smirk right back",
        greeting: '"Gyahaha! Look at this one, smirkin\' at me."',
        responses: {
          kind: ["Ask what he's playing", "Answer with a small smile"],
          playful: ["Say neither, you're lucky", "Ask which he'd bet on"],
          bold: ["Tell him to deal you in", "Hold his gaze, unblinking"],
          neutral: ["Wait for him to deal", "Watch the cards, not him"],
        },
      },
      {
        line: "The cards keep moving. The grin doesn't. Neither is friendly, exactly.",
        approach: "Stand your ground",
        greeting:
          "\"Heads or tails, even or odd, on or off... It's all so fucking tedious! ...Oh. You're real. Hey.\"",
        responses: {
          kind: ["Nod hello", "Compliment his card work"],
          playful: ["Ask to be dealt in", "Pick a card, any card"],
          bold: ["Reach in and cut the deck", "Grin back at him"],
          neutral: ["Let him posture", "Wait for the grin to fade"],
        },
      },
      {
        line: '"Huh. You\'ve got guts walking in here. Stupid ones, but guts."',
        approach: "Own having guts",
        greeting:
          '"You got money? No? Then you got nothin\' I want. Probably."',
        responses: {
          kind: ["Say you're just curious", "Take the guts as praise"],
          playful: ["Say stupid is half the fun", "Ask what stupid ones cost"],
          bold: ["Sit without being invited", "Tell him you're staying"],
          neutral: ["Shrug at the insult", "Let the remark hang"],
        },
      },
      {
        line: "He kicks a chair out, not toward you, just near you. Interpret it however you like.",
        approach: "Take a seat",
        greeting: '"Sit or scram. I don\'t care which, just pick."',
        responses: {
          kind: ["Sit without a fuss", "Smile and sit down"],
          playful: ["Kick the chair back at him", "Ask if the game's rigged"],
          bold: [
            "Take the seat like it's owed",
            "Pull the chair closer to him",
          ],
          neutral: ["Sit, say nothing", "Sit and watch the cards"],
        },
      },
      {
        line: '"Who the fuck are you again?" He squints. "...Whatever. Sit down."',
        approach: "Sit down anyway",
        greeting:
          "\"Tell me your name or don't. I'm never gonna remember it. Gyahaha!\"",
        responses: {
          kind: ["Remind him who you are", "Give him your name"],
          playful: ["Refuse to remind him", "Tell him to guess"],
          bold: ["Bet him he'll remember you", "Dare him to figure it out"],
          neutral: ["Say nothing and stay", "Let him squint"],
        },
      },
    ],
    known: [
      {
        line: '"Kitten" has stuck. He\'s stopped bothering to make it sound like an insult.',
        approach: "Own the nickname",
        greeting: '"You still answer to it. Guess that\'s something."',
        responses: {
          kind: ["Say the name suits you", "Smile when he says it"],
          playful: ["Ask if it's a promotion", "Try out a nickname for him"],
          bold: ["Say you're keeping it", "Say only he gets to use it"],
          neutral: ["Let the name stand", "Shrug at it"],
        },
      },
      {
        line: "He deals you in without asking, and doesn't explain the rules. Figure it out.",
        approach: "Play the hand out",
        greeting: '"Don\'t know the rules? Who cares. Just play, dumbass."',
        responses: {
          kind: ["Watch how he plays it", "Play along, figure it out"],
          playful: ["Make up your own rules", "Bluff before you know anything"],
          bold: [
            "Play without asking questions",
            "Bet big and see what happens",
          ],
          neutral: ["Watch a round first", "Play it out, say nothing"],
        },
      },
      {
        line: "He pulls the chair out with his hand this time, not his boot.",
        approach: "Take the offered chair",
        greeting:
          '"Playing with these morons is exhausting... Lulu gets all mad if I win too much. ...Whatever. You\'re up."',
        responses: {
          kind: ["Nod and join him", "Stay till he's done playing"],
          playful: ["Say you'll tell Lulu", "Ask who taught him manners"],
          bold: ["Deal yourself in", "Say you're here to win"],
          neutral: ["Sit, say nothing", "Take the seat"],
        },
      },
      {
        line: '"Do I know you? ...Right. Kitten. Course I do."',
        approach: "Remind him your name",
        greeting: "\"Name? Don't need it. You're kitten.\"",
        responses: {
          kind: ["Answer to kitten", "Say it's fine if he forgets"],
          playful: ["Make him guess your name", "Give a fake name to test him"],
          bold: ["Say he never forgets you", "Say kitten works fine"],
          neutral: ["Let it go unremarked", "Shrug, say nothing"],
        },
      },
      {
        line: "The smirk stays. The edge on it has gone somewhere else.",
        approach: "Place a big bet",
        greeting:
          "\"Don't bet what you can't lose. Free advice. Only one you get.\"",
        responses: {
          kind: ["Smile back at him", "Stay close by him"],
          playful: ["Ask if he's going soft", "Accuse him of being nice"],
          bold: ["Say he's looking out for you", "Bet he won't stay this nice"],
          neutral: ["Nod, say nothing", "Let the moment pass"],
        },
      },
      {
        line: "He folded. You had nothing. He's only now working that out.",
        approach: "Rake in the pot",
        greeting:
          '"Gyahaha! You actually bluffed me. Rookie luck. ...Do it again."',
        responses: {
          kind: ["Say he took it well", "Admit it was mostly luck"],
          playful: ["Ask for that in writing", "Take a very smug bow"],
          bold: ["Say it wasn't luck", "Raise the next pot"],
          neutral: ["Stack your chips, say nothing", "Wait for the next deal"],
        },
      },
      {
        line: "The pistol hits the felt next to your cards, harder than it needed to.",
        approach: "Keep your seat",
        greeting: '"Don\'t talk to me. I feel like shit."',
        responses: {
          kind: ["Ask who put him in a mood", "Get him his usual"],
          playful: ["Ask if it's loaded", "Offer to let him win"],
          bold: ["Deal him the next hand", "Nudge his foot under the table"],
          neutral: ["Keep your cards close", "Let your hands settle"],
        },
      },
      {
        line: "He watches the table lose hand after hand, looking more bored with every one.",
        approach: "Buy into the game",
        greeting:
          '"None of you morons have any flair for the table. Lulu needs to raise the minimum bet already."',
        responses: {
          kind: ["Pick up your cards", "Play a hand beside him"],
          playful: ["Bet you can wake him up", "Bet you'll win this time"],
          bold: ["Raise before looking", "Push your whole stack in"],
          neutral: ["Check your cards", "Play the hand out"],
        },
      },
      {
        line: "A mook asks who you are. Taiga doesn't answer, and doesn't tell him to drop it either.",
        approach: "Let the mook keep asking",
        greeting: '"Ask her yourself, moron. Do I look like a directory?"',
        responses: {
          kind: ["Tell the mook you're a friend", "Ask the mook's name first"],
          playful: [
            "Give the mook a fake name",
            "Say you're Taiga's bodyguard",
          ],
          bold: ["Say you're with Taiga", "Say Taiga knows who you are"],
          neutral: ["Say your name, nothing else", "Let the question die"],
        },
      },
      {
        line: "He tosses his cards down mid-hand. The table's lost him, and he's already getting up.",
        approach: "Ask where he's going",
        greeting: '"My room. This place is dead. ...You coming or what?"',
        responses: {
          kind: ["Say you were bored too", "Grab food for the two of you"],
          playful: [
            "Ask if this counts as a fold",
            "Peek at the hand he tossed",
          ],
          bold: ["Beat him to the door", "Hook your arm through his"],
          neutral: ["Watch him leave", "Stay and finish the hand"],
        },
      },
      {
        line: "He starts saving you a bite of whatever he's eating, no matter how questionable it looks.",
        approach: "Peer at his plate",
        greeting: '"Here. Last bite. Don\'t make me regret it."',
        responses: {
          kind: ["Take the bite he saved", "Split it with him"],
          playful: ["Ask what's actually in it", "Eat it slow to tease him"],
          bold: ["Take a bite from his hand", "Ask for seconds"],
          neutral: ["Eat it, say nothing", "Poke at it first"],
        },
      },
      {
        line: "He glances up when you walk in. Then makes a point of not doing it again.",
        approach: "Pretend not to notice",
        greeting:
          '"I spy, with my little eye, a tasty-looking kitty-cat... Come over here so I can pat you. ...Nah, changed my mind. Scram."',
        responses: {
          kind: ["Bring him something to eat", "Set a drink by his hand"],
          playful: ["Say you saw him look", "Say he blinked first"],
          bold: ["Sit down right next to him", "Say you're not going anywhere"],
          neutral: ["Find somewhere else to be", "Let him have his space"],
        },
      },
      {
        line: '"Lulu wants to know who keeps sitting at my table," he says, and goes right back to his hand.',
        approach: "Ask what he told Romeo",
        greeting: '"Told him to ask you. Sounded like a you problem."',
        responses: {
          kind: ["Say you'll talk to Romeo", "Ask what Romeo's worried about"],
          playful: ["Ask why Romeo's counting", "Ask if Romeo's jealous"],
          bold: ["Say you'll handle Romeo", "Say you're his lucky charm"],
          neutral: ["Leave it with Romeo", "Go back to the game"],
        },
      },
    ],
    warm: [
      {
        line: "The boredom drops off his face when he spots you. He pulls out a seat beside him without a word.",
        approach: "Stop by the empty seat",
        greeting:
          '"Huh. You came back. Figured you\'d cashed out on me, kitten."',
        responses: {
          kind: ["Sit and watch his hand", "Say you always come back"],
          playful: ["Ask who he kicked out of it", "Say he looks less bored"],
          bold: ["Say you'd never cash out", "Say you're in for the night"],
          neutral: ["Take the seat he pulled out", "Sit in for a hand"],
        },
      },
      {
        line: "He tells you your tell. Which means he's been watching your face and not your cards, and he says it in front of everyone.",
        // He's crowing in front of the table: volleying the tease lands, nerve doesn't.
        mood: true,
        approach: "Tell him to keep it down",
        greeting:
          '"You blink when you bluff. Whole table knows, kitten. Gyahaha!"',
        responses: {
          kind: ["Admit he's got you there", "Let him have this one"],
          playful: [
            "Say his tell is watching you",
            "Say you only blink for him",
          ],
          bold: ["Raise without blinking", "Bluff him on purpose"],
          neutral: ["Fix your face", "Look down at your cards"],
        },
      },
      {
        line: "It's well past midnight, the floor's empty, and you came down anyway. He has a theory about why.",
        approach: "Head over to his table",
        greeting:
          "\"You didn't come down this late for the cards, kitten. Don't play innocent with me.\"",
        responses: {
          kind: ["Say you couldn't sleep", "Keep him company"],
          playful: ["Ask what he's implying", "Swear you're here to gamble"],
          bold: ["Say you came for him", "Tell him to make room"],
          neutral: ["Take a seat at the table", "Ask him to deal"],
        },
      },
      {
        line: "The float Lulu gave him is gone inside an hour, and he's already eyeing the exit.",
        // A mischief mood, running from Lulu: being in on the escape lands, staking ground doesn't.
        mood: true,
        approach: "Follow his eyes to the exit",
        greeting: [
          '"Oops. I lost all the money Lulu gave me. Better make a run for it before he notices."',
        ],
        responses: {
          kind: ["Say Romeo will get over it", "Offer to cover the float"],
          playful: [
            "Ask what the getaway plan is",
            "Say the night's not over yet",
          ],
          bold: ["Stall Romeo for him", "Grab his hand and run"],
          neutral: ["Go, say nothing", "Follow him out"],
        },
      },
      {
        line: '"Taiga Hoshibami," Ritsu says at his door, contract already out. Taiga looks right past it, at you.',
        approach: "Let Ritsu make his case",
        greeting:
          '"...Who\'re you again? Whatever. Not signing. You can stay, though, kitten."',
        responses: {
          kind: ["Stay for a minute", "Tell Ritsu to try next week"],
          playful: ["Say you'll sign for him", "Ask what it'd take to sign"],
          bold: ["Say this visit isn't business", "Step inside past Ritsu"],
          neutral: ["Wait for Ritsu to answer", "Leave the contract with him"],
        },
      },
      {
        line: "He says one odd thing and goes back to his cards. Days later it turns out he was right, and he's forgotten it.",
        approach: "Tell him he called it",
        greeting:
          "\"Don't remember saying it. Not my fault you weren't listening.\"",
        responses: {
          kind: ["Say you remembered it", "Tell him it helped"],
          playful: ["Call him a fortune teller", "Ask what his next hunch is"],
          bold: ["Say you believed him", "Bet on his next call"],
          neutral: ["Let it pass", "Note it down for later"],
        },
      },
      {
        line: "Ritsu's behavioral model put him at the baccarat table. It was right. This time, you're the one sent to fetch him.",
        approach: "Tap him on the shoulder",
        greeting:
          '"Who the hell sent you? ...The cop guy? Whatever. You asked, kitten, so I\'m coming."',
        responses: {
          kind: ["Wait for his hand to finish", "Say Ritsu said please"],
          playful: ["Say Ritsu predicted this", "Remind him it's Ritsu"],
          bold: ["Say you'll make it worth it", "Take his arm and go"],
          neutral: ["Say Ritsu's waiting", "Check the time"],
        },
      },
      {
        line: "You ask how he always wins. He gives you the real answer, which the mooks have never gotten out of him.",
        approach: "Wait for the real answer",
        greeting:
          '"Surefire way to win? Doesn\'t exist. You just gotta keep playing."',
        responses: {
          kind: ["Say that sounds exhausting", "Say that's fair"],
          playful: [
            "Ask what your silence costs",
            "Say Romeo would charge for it",
          ],
          bold: ["Say you'll outplay him", "Say you're in for the long run"],
          neutral: ["Take the answer as given", "Nod, keep playing"],
        },
      },
      {
        line: "Romeo tried to move you to another table, since Taiga's been comping your chips. Taiga vetoed it mid-sentence.",
        approach: "Ask why Romeo backed off",
        greeting:
          '"Lulu wanted you moved? Tough shit. I say who sits at my table, kitten."',
        responses: {
          kind: ["Win some chips back for him", "Say you'd have stayed anyway"],
          playful: [
            "Ask what he said to Romeo",
            "Ask if Romeo's still sulking",
          ],
          bold: ["Say the table's yours now", "Say the seat was always yours"],
          neutral: ["Stay where you are", "Settle in at his table"],
        },
      },
      {
        line: "Going over case notes with Ritsu ran long. Taiga doesn't look up when you finally walk in, and that deck has been shuffled far too many times.",
        approach: "Wait for him to look up",
        greeting: '"Late. Not that I care. Sit down, dumbass."',
        responses: {
          kind: ["Say you're glad he waited", "Say Ritsu kept you late"],
          playful: ["Ask how long he's shuffled", "Say the deck needs a break"],
          bold: ["Say you're all his now", "Sit close till he forgives you"],
          neutral: ["Sit, offer no excuse", "Sit before he says more"],
        },
      },
      {
        line: "Romeo corners you about a fee you've never heard of. Taiga tells him to put it on his tab before you can ask what it's for.",
        approach: "Let him cover the fee",
        greeting:
          '"Whatever Lulu just tried to charge you, ignore it. On my tab."',
        responses: {
          kind: ["Let him cover it", "Offer to pay it yourself"],
          playful: ["Ask what the fee was for", "Ask if his tab has a limit"],
          bold: ["Say you'll win it back", "Ask what the tab costs you"],
          neutral: ["Let the two of them argue", "Stay out of it"],
        },
      },
      {
        line: "He wins a hand and slides half the pot your way like it's nothing.",
        approach: "Stare at the chips",
        greeting: '"Gyahaha! Easy money. Take it, I\'ll just win more."',
        responses: {
          kind: ["Say you'll spend it well", "Say he should keep it"],
          playful: ["Ask if that's how he flirts", "Bet it all next hand"],
          bold: ["Ask for the other half too", "Raise him with it next hand"],
          neutral: ["Take it, say nothing", "Pocket the chips"],
        },
      },
      {
        line: "You sit down beside him, and he pushes his whole stack in without even looking at his cards.",
        approach: "Ask if he's lost it",
        greeting:
          "\"That's it, kitty-cat. I feel like my luck'll change if you're around.\"",
        responses: {
          kind: ["Stay right beside him", "Say you hope you're lucky"],
          playful: ["Ask what odds he gave you", "Blow on the cards for luck"],
          bold: ["Say his luck's already changed", "Say you'd bet on him too"],
          neutral: ["Watch the cards turn", "Wait for the reveal"],
        },
      },
      {
        line: "Ritsu is mid-briefing at Sinostra when Taiga leans over your shoulder, reads one line, and yawns. Loudly.",
        approach: "Look up from the notes",
        greeting: '"Judge guy. Still here? She\'s on my time now."',
        responses: {
          kind: ["Let him read along", "Ask Ritsu for five minutes"],
          playful: [
            "Ask which line bored him",
            "Ask if Ritsu's recording this",
          ],
          bold: ["Say you hoped he'd show up", "Say Ritsu's time is almost up"],
          neutral: ["Keep reading the notes", "Wait for Ritsu to react"],
        },
      },
      {
        line: "First thing in the morning, he's slumped over an empty table, glaring at nothing until you walk in.",
        approach: "Ask if he's eaten",
        greeting: "\"I'm starving... You, get my usual. It's breakfast time.\"",
        responses: {
          kind: ["Bring back enough for two", "Fetch it without a fuss"],
          playful: ["Order him something weird", "Ask what the tip is"],
          bold: ["Say you're eating with him", "Steal a bite before he does"],
          neutral: ["Go place the order", "Ask what he wants today"],
        },
      },
      {
        line: 'Partway through a mission, you drift a few steps ahead. "Don\'t wander off," he says. "Not an order. Just... don\'t."',
        approach: "Stay at his side",
        greeting:
          '"Don\'t look at me like that, dumbass. ...Just stick around."',
        responses: {
          kind: ["Promise not to wander", "Say you'd rather stay close"],
          playful: ["Wander a little anyway", "Ask if he'd come find you"],
          bold: ["Say you're hard to lose", "Hold on to his sleeve"],
          neutral: ["Stay put, say nothing", "Stay in sight"],
        },
      },
      {
        line: "He's not at his table today. You find him in his room, ignoring every knock.",
        approach: "Knock one more time",
        greeting:
          "\"...I'm not gonna play today. I'm sleeping. I don't care if the place is burning down. Don't wake me up.\"",
        responses: {
          kind: ["Leave food by his door", "Let him sleep it off"],
          playful: ["Say the place is on fire", "Knock in a rhythm"],
          bold: ["Let yourself in anyway", "Say you'll wait right here"],
          neutral: ["Leave him to sleep", "Check back later"],
        },
      },
      {
        line: "He's playing five finger filet against his own hand, bored out of his mind, until he spots you.",
        // He's bored and wants entertaining: playing his game back lands, taking it over doesn't.
        mood: true,
        approach: "Ask what he's doing",
        greeting:
          '"I\'m bored... Hey, kitten. Come play five finger filet with me. Gimme your left hand."',
        responses: {
          kind: ["Hesitate, then offer your hand", "Ask him to go slow"],
          playful: ["Give him your right hand", "Count the beats out loud"],
          bold: ["Tell him to go faster", "Put your hand over his"],
          neutral: ["Wait for him to stop", "Keep your hands to yourself"],
        },
      },
    ],
    spark: [
      {
        line: "On your way to class, his boot slams into the wall beside you, blocking the way. He's grinning.",
        approach: "Look up at him",
        greeting:
          '"Where you going, kitty-cat? Class? You don\'t need to go there. I got something more fun in mind for us."',
        responses: {
          kind: ["Let him keep you a minute", "Say class can wait"],
          playful: ["Ask if this is a kidnapping", "Duck under his leg"],
          bold: ["Tug on his suspenders", "Ask if he's worth skipping for"],
          neutral: ["Wait for him to move", "Glance down the hall"],
        },
      },
      {
        line: "He hooks a finger in your collar to pull you down to his level, grinning.",
        approach: "Let him pull you down",
        greeting: "\"C'mere. Closer. I'm not gonna bite. Probably.\"",
        responses: {
          kind: "Tell him he's already won",
          playful: "Cheat where he can see",
          bold: "Pull him down instead",
          neutral: "Stay on your side",
        },
      },
      {
        line: '"Kitten," he says, and this time it isn\'t a jab at all.',
        approach: "Catch the shift",
        greeting:
          "\"I'd bet the whole damn house on you. Don't make me say it sober.\"",
        responses: {
          kind: "Say kitten back",
          playful: "Call the bluff",
          bold: "Say you'd take that bet",
          neutral: "Play the hand out",
        },
      },
      {
        line: "He wins the hand, sweeps the pot, and puts his arm across the back of your chair.",
        approach: "Sit on his side",
        greeting: '"Sit on my side of the table. I don\'t care how it looks."',
        responses: {
          kind: "Let him keep his arm there",
          playful: "Steal a chip while he's close",
          bold: "Sit on his side",
          neutral: "Sit, say nothing",
        },
      },
      {
        line: "He gets close enough to make a point and then forgets what the point was.",
        approach: "Get closer",
        greeting: "\"Hah! You're blushing. Good. Now we're even.\"",
        responses: {
          kind: "Let him forget the point",
          playful: "Make him blush first",
          bold: "Close the last bit yourself",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: "The insults have gone soft around the edges. He'd fight you for saying so.",
        approach: "Look at him like that",
        greeting:
          '"You keep looking at me like that, kitten, something\'s gonna happen."',
        responses: {
          kind: "Let the softness show",
          playful: "Tease the softness out more",
          bold: "Tell him to let it happen",
          neutral: "Let it go unremarked",
        },
      },
    ],
    close: [
      {
        line: '"You\'re the only one I\'d ever go all-in for," he says roughly, pulling you close. "Don\'t make me regret it."',
        approach: "Go all-in",
        greeting:
          "\"Hah. Didn't even blink. Don't let it go to your head, kitten.\"",
        responses: {
          kind: "Take the bet off his shoulders",
          playful: "Laugh in his face fondly",
          bold: "Go all-in with him",
          neutral: "Keep him company in silence",
        },
      },
      {
        line: "He puts his hand on the back of your chair. Just there. It stays.",
        approach: "Let him pull you close",
        greeting:
          '"Anybody touches you, they answer to me. That\'s the deal. Always was."',
        responses: {
          kind: "See past the snarl",
          playful: "Be the one who can rile him",
          bold: "Grab his collar first",
          neutral: "Let his hand stay, say nothing",
        },
      },
      {
        line: '"Don\'t do anything stupid," he growls, which is his entire vocabulary for worry.',
        approach: "Get over there",
        greeting:
          "\"Don't you dare go getting hurt. That's MY job to protect you. Gyahaha!\"",
        responses: {
          kind: "Tell him you worry too",
          playful: "Tease the worry out of him",
          bold: "Tell him you're his bet",
          neutral: "Let him worry, say nothing",
        },
      },
      {
        line: "He folds a winning hand because you looked tired and he wanted to leave.",
        approach: "Tell him to fold",
        greeting:
          "\"You look tired. We're leaving. No, I don't care about the hand.\"",
        responses: {
          kind: "Thank him for folding",
          playful: "Beat him at his own table",
          bold: "Say the hand never mattered",
          neutral: "Sit through the losing hand",
        },
      },
      {
        line: "The bravado is completely transparent now, and he's stopped trying to fix that.",
        approach: "See through the bravado",
        greeting: '"Get over here. Closer. I\'m not asking twice."',
        responses: {
          kind: "Go closer, no teasing",
          playful: "Point out the bravado's gone",
          bold: "Say you see right through him",
          neutral: "Let the bravado run out",
        },
      },
    ],
    bound: [
      {
        line: "He's rough with everyone and unspeakably careful with you, and hates being caught at it.",
        approach: "Get over there",
        greeting: "\"You're the only bet I'd never hedge. Ever.\"",
        responses: {
          kind: "Let him be careful",
          playful: "Ruin his hand",
          bold: "Tell him he's your bet too",
          neutral: "Play the hand out",
        },
      },
      {
        line: "He pulls you into his lap mid-hand and the whole table pretends not to notice.",
        approach: "Sit in his lap",
        greeting: "\"Get over here. On my lap. I don't care who's watching.\"",
        responses: {
          kind: "Call him kitten too",
          playful: "Say it in front of the table",
          bold: "Climb into his lap",
          neutral: "Settle in, say nothing",
        },
      },
      {
        line: '"Love you, kitten," he growls, daring you to make something of it.',
        approach: "Make something of it",
        greeting: '"Love you. Yeah. Said it. What\'re you gonna do about it?"',
        responses: {
          kind: "Say it back, soft",
          playful: "Make something of it",
          bold: "Say it first",
          neutral: "Let him growl",
        },
      },
      {
        line: "He falls asleep with an arm across you like a bar across a door.",
        approach: "Stay the night",
        greeting:
          '"Stay the night. Whole night. Don\'t make me ask twice, kitten."',
        responses: {
          kind: "Say it back",
          playful: "Test how tight the arm is",
          bold: "Hold on just as tight",
          neutral: "Stay still, let him sleep",
        },
      },
      {
        line: '"Kitten" has become the softest word in his entire vocabulary and he knows it.',
        approach: "Notice the softest word",
        greeting:
          '"Come back to bed. The game\'ll still be rigged in the morning."',
        responses: {
          kind: "Say the word suits him",
          playful: "Tease him for the softness",
          bold: "Claim the word as yours too",
          neutral: "Say nothing",
        },
      },
    ],
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: '"Huh." **{name}** looks {user} over. "You got guts. Stupid ones, but guts."',
        responses: {
          kind: "Take it as a compliment",
          playful: "Say stupid's more fun",
          bold: "Say you've got plenty more",
        },
      },
      {
        line: '"You lost or somethin\'?" **{name}** asks {user}, shuffling the whole time.',
        responses: {
          kind: "Say you were looking for him",
          playful: "Bet him you're not lost",
          bold: "Take the seat across from him",
        },
      },
      {
        line: "\"Don't remember a word you said. Ciao!\" **{name}** waves {user} off, and they're gone.",
        responses: {
          kind: "Wave goodbye to him",
          playful: 'Say "ciao" back at him',
          bold: "Catch up before he's gone",
        },
      },
      {
        line: '"Huh? What." **{name}** barely looks at {user}.',
        responses: {
          kind: "Say your name again",
          playful: "Wave a hand in his face",
          bold: "Sit right in his eyeline",
        },
      },
      {
        line: "**{name}** squints at {user} like he's trying to place them. \"Do I owe you money? 'Cause I don't got it.\"",
        responses: {
          kind: "Offer him your snack",
          playful: "Say he owes you a fortune",
          bold: "Bet him double or nothing",
        },
      },
    ],
    known: [
      {
        line: '"You again, kitten." **{name}** says it to {user} like a fact now, not a jab.',
        responses: {
          kind: "Answer to kitten",
          playful: "Meow at him",
          bold: "Say only he gets to say it",
        },
      },
      {
        line: '"What\'s your name again? ...Whatever. I know you." **{name}** shrugs at {user}.',
        responses: {
          kind: "Give him your name again",
          playful: "Give him a fake name",
          bold: "Say he knows you best",
        },
      },
      {
        line: "{user} calls his name, and **{name}** grins around it. \"Who're you? ...Whatever. C'mere.\"",
        responses: {
          kind: "Go over to him",
          playful: "Ask who's asking",
          bold: "Walk right into his space",
        },
      },
    ],
    warm: [
      {
        line: '"Took your damn time, kitten." **{name}** had been waiting on {user}.',
        responses: {
          kind: "Say it was worth the wait",
          playful: "Say kittens nap a lot",
          bold: "Say he'd wait longer for you",
        },
      },
      {
        line: "{user} calls out, and **{name}** kicks a chair out in their direction.",
        responses: {
          kind: "Take the seat",
          playful: "Sit in it backwards",
          bold: "Put your feet up on the table",
        },
      },
      {
        line: "**{name}** calls {user} a dumbass and deals them in.",
        responses: {
          kind: "Pick up your cards",
          playful: "Say he stacked the deck",
          bold: "Bet it all on the first hand",
        },
      },
      {
        line: '"Lulu can count the chips himself. Ciao!" **{name}** is out of his seat before {user} finishes talking.',
        responses: {
          kind: "Hold the door for him",
          playful: "Race him out the door",
          bold: "Say the night's yours now",
        },
      },
    ],
    spark: [
      {
        line: '"Kitten." **{name}** grins at {user}, and this time it isn\'t a jab at all.',
        responses: {
          kind: "Smile at the nickname",
          playful: "Purr at him",
          bold: "Give him a nickname back",
        },
      },
      {
        line: "{user} waves hello, and **{name}** folds a hand he was winning.",
        responses: {
          kind: "Say he didn't have to",
          playful: "Ask to see his cards",
          bold: "Say you're worth the pot",
        },
      },
      {
        line: '{user} says hi, and **{name}** tells the whole table "Ciao!" without looking back.',
        responses: {
          kind: "Wave to the table",
          playful: "Say ciao to the table too",
          bold: "Walk out on his arm",
        },
      },
      {
        line: "**{name}** hooks a finger in {user}'s collar to pull them down to his level, grinning.",
        responses: {
          kind: "Lean down for him",
          playful: "Ask what's down here",
          bold: "Pull him up instead",
        },
      },
    ],
    close: [
      {
        line: '"Anybody touches you, they answer to me." **{name}** tells {user} that was always the deal.',
        responses: {
          kind: "Say you'll be fine",
          playful: "Ask what the deal costs",
          bold: "Say same goes for him",
        },
      },
      {
        line: "**{name}** hears {user}, and everyone else stops existing.",
        responses: {
          kind: "Say the same about him",
          playful: "Ask where they all went",
          bold: "Keep his eyes on you",
        },
      },
      {
        line: "{user} calls, and **{name}** walks away from a bet he was about to win.",
        responses: {
          kind: "Say you'll make it up",
          playful: "Ask what he would've won",
          bold: "Say you're the better bet",
        },
      },
      {
        line: "**{name}** tosses his chips to the nearest mook without counting them. Then he's at {user}'s side.",
        responses: {
          kind: "Say the mook got lucky",
          playful: "Ask the mook to split it",
          bold: "Say he got the better deal",
        },
      },
    ],
    bound: [
      {
        line: "\"You're the one hand I'd never fold, kitten.\" **{name}** growls it at {user}, daring them to make something of it.",
        responses: {
          kind: "Say you'd never fold either",
          playful: "Ask what you're worth",
          bold: "Make something of it",
        },
      },
      {
        line: "**{name}** pulls {user} in right there in the open, and the passers-by pretend not to notice.",
        responses: {
          kind: "Let him pull you in",
          playful: "Wave at the passers-by",
          bold: "Pull him in closer",
        },
      },
      {
        line: "{user} calls his name, and it's the one thing **{name}** doesn't lose track of.",
        responses: {
          kind: "Say you'll remind him",
          playful: "Test him with your name",
          bold: "Say you won't let him lose it",
        },
      },
    ],
  },
};
