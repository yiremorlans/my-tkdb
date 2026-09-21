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
        greeting: '"Hah! Look at this one. You gonna cry?"',
        responses: {
          kind: ["Be kind despite his bark", "Answer with a small smile"],
          playful: ["Say you're both", "Call his bet"],
          bold: ["Meet his challenge head-on", "Hold his gaze, unblinking"],
          neutral: ["Play your hand quietly", "Watch the cards, not him"],
        },
      },
      {
        line: "The cards keep moving. So does the grin. Neither is friendly, exactly.",
        approach: "Stand your ground",
        greeting:
          "\"Heads or tails, even or odd, on or off... It's all so fucking tedious! ...Oh. You're real. Hey.\"",
        responses: {
          kind: ["Ignore the insult entirely", "Compliment his card work"],
          playful: ["Ask to be dealt in", "Pick a card, any card"],
          bold: ["Raise the stakes", "Call his bluff"],
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
          playful: ["Trade insults with him", "Ask what stupid ones cost"],
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
        greeting: "\"Who're you? Don't pop up out of nowhere like that.\"",
        responses: {
          kind: ["Remind him gently who you are", "Give your name, no fuss"],
          playful: ["Refuse to remind him", "Tell him to guess"],
          bold: ["Say you're not going anywhere", "Dare him to figure it out"],
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
          kind: ["Say the name suits you", "Accept the nickname warmly"],
          playful: ["Ask if it's a promotion", "Demand a nickname for him"],
          bold: ["Claim the nickname outright", "Say you like it"],
          neutral: ["Let the name stand", "Shrug at it"],
        },
      },
      {
        line: "He deals you in without asking, and doesn't explain the rules. Figure it out.",
        approach: "Play the hand out",
        greeting: '"You know the rules yet? No? Tch. Watch, then."',
        responses: {
          kind: ["Ask him to explain the rules", "Play along, figure it out"],
          playful: ["Make up your own rules", "Bluff before you know anything"],
          bold: [
            "Play without asking questions",
            "Bet big and see what happens",
          ],
          neutral: ["Watch and learn quietly", "Play it out, say nothing"],
        },
      },
      {
        line: "He pulls the chair out with his hand this time, not his boot.",
        approach: "Take the offered chair",
        greeting:
          '"Playing with these morons is exhausting... Lulu gets all mad if I win too much. Sit. You\'re better company."',
        responses: {
          kind: ["Sit down gladly", "Say he's good company too"],
          playful: ["Ask if the boot retired", "Tease the upgrade"],
          bold: ["Sit like it was always yours", "Drag the chair next to his"],
          neutral: ["Sit, say nothing", "Take the seat quietly"],
        },
      },
      {
        line: '"Do I know you? ...Right. Kitten. Course I do."',
        approach: "Remind him your name",
        greeting: "\"Don't tell me your name again. I'll get it. Eventually.\"",
        responses: {
          kind: ["Remind him gently", "Say it's fine either way"],
          playful: ["Make him guess again", "Give a fake name to test him"],
          bold: ["Say of course he knows", "Demand he remember for real"],
          neutral: ["Let it go unremarked", "Shrug, say nothing"],
        },
      },
      {
        line: "The smirk stays. The edge on it has gone somewhere else.",
        approach: "Read past the smirk",
        greeting:
          "\"Don't bet what you can't lose. Free advice. Only one you get.\"",
        responses: {
          kind: ["Take the advice kindly", "Thank him for the warning"],
          playful: ["Bet against his advice", "Ask if he ever follows it"],
          bold: ["Ignore the advice outright", "Bet everything anyway"],
          neutral: ["Nod, say nothing", "Take it in stride"],
        },
      },
      {
        line: "Some days he needs half a second to place you. Never longer than that anymore.",
        approach: "Give him the half second",
        greeting:
          '"Gyahaha! You actually bluffed me. Rookie luck. I\'ll allow it, once."',
        responses: {
          kind: ["Say he took it well", "Admit it was mostly luck"],
          playful: ["Ask for that in writing", "Take a very smug bow"],
          bold: ["Say it wasn't luck", "Demand a rematch"],
          neutral: ["Accept the once, say nothing", "Nod and take the win"],
        },
      },
      {
        line: '"You again, kitten," he says, like the word\'s just a fact now, not a jab.',
        approach: "Answer to kitten now",
        greeting:
          '"Gyahaha! You jumped. Everyone jumps. It\'s not even loaded. ...Probably."',
        responses: {
          kind: ["Ask him to warn you first", "Admit he got you"],
          playful: ["Ask him to check that", "Jump on purpose next time"],
          bold: ["Call him kitten back", "Bet him it's loaded"],
          neutral: ["Sit back down", "Let your hands settle"],
        },
      },
      {
        line: "He starts dealing you a hand before you've even sat down.",
        approach: "Ask for a new hand",
        greeting: '"Deal you in? Fine. Don\'t cry when you lose."',
        responses: {
          kind: ["Pick up your cards", "Ask him to go easy"],
          playful: ["Demand better cards", "Bet you'll win this time"],
          bold: ["Raise before looking", "Push your whole stack in"],
          neutral: ["Check your cards", "Play, unbothered"],
        },
      },
      {
        line: "A mook asks who you are. Taiga doesn't answer, and doesn't tell him to drop it either.",
        approach: "Answer the mook yourself",
        greeting: '"Ask her yourself, moron. Do I look like a directory?"',
        responses: {
          kind: ["Introduce yourself politely", "Answer for both of you"],
          playful: ["Give the mook a fake name", "Let Taiga field it badly"],
          bold: ["Say you're not explaining", "Tell the mook to move on"],
          neutral: ["Say your name, nothing else", "Let the question die"],
        },
      },
      {
        line: "The floor closes and the mooks get thrown out. He doesn't include you in that, and doesn't say why.",
        approach: "Stay past closing",
        greeting: '"Out. Not you. ...Whatever, stay. Just don\'t talk to me."',
        responses: {
          kind: ["Stay, keep quiet", "Ask if he means it"],
          playful: ["Leave with the mooks", "Talk at him a little"],
          bold: ["Stay without being asked", "Take the empty table"],
          neutral: ["Stay put", "Watch the floor empty"],
        },
      },
      {
        line: "He starts saving you a bite of whatever he's eating, no matter how questionable it looks.",
        approach: "Try the questionable bite",
        greeting: '"Hungry? There\'s some anomaly meat left. Probably safe."',
        responses: {
          kind: ["Try it, thank him", "Take the bite gladly"],
          playful: ["Ask what's actually in it", "Dare him to eat it first"],
          bold: ["Eat it without asking", "Say you're not scared of it"],
          neutral: ["Eat it, say nothing", "Take the bite quietly"],
        },
      },
      {
        line: "He glances up when you walk in. Then makes a point of not doing it again.",
        approach: "Pretend not to notice",
        greeting:
          "\"You keep coming back. Either you're broke or you're lonely.\"",
        responses: {
          kind: ["Say neither, you just came", "Say you like it here"],
          playful: ["Say both, obviously", "Ask which he's hoping for"],
          bold: ["Say he looked up first", "Tell him he can ask properly"],
          neutral: ["Take a seat, say nothing", "Let him go back to it"],
        },
      },
      {
        line: '"Lulu wants to know who keeps sitting at my table," he says, and goes right back to his hand.',
        approach: "Ask what he told Lulu",
        greeting: '"Told him to ask you. Sounded like a you problem."',
        responses: {
          kind: ["Say you'll talk to Lulu", "Ask what Lulu's worried about"],
          playful: ["Ask what he should've said", "Say it is a him problem"],
          bold: ["Say you'll handle Lulu", "Ask why Lulu's counting"],
          neutral: ["Leave it with Lulu", "Go back to the game"],
        },
      },
    ],
    warm: [
      {
        line: "His aggressive posture softens when he sees you're really there. He pulls out a seat beside him without a word.",
        approach: "Take the held seat",
        greeting: '"...So you came back, kitten?"',
        responses: {
          kind: ["Take the seat gladly", "Sit close, say thanks"],
          playful: [
            "Ask if he saved it on purpose",
            "Ask if he watched the door",
          ],
          bold: ["Sit like it's expected", "Sit without being told"],
          neutral: ["Drop into the seat", "Take the seat, no comment"],
        },
      },
      {
        line: "He tells you your tell. Which means he's been watching your face and not your cards, and he says it in front of everyone.",
        approach: "Ask how long he's known",
        greeting:
          '"You blink when you bluff. Whole table knows, kitten. Gyahaha!"',
        responses: {
          kind: ["Promise to work on it", "Ask what else he sees"],
          playful: ["Deny you have a tell", "Name his tell back"],
          bold: ["Bluff him on purpose", "Say he was watching you"],
          neutral: ["Fix your face", "Play the next hand"],
        },
      },
      {
        line: "It's past two and the floor is dead. He's still awake, and he doesn't ask why you are.",
        approach: "Stay up with him",
        greeting: "\"Can't sleep? Sit over there. I'll deal the cards.\"",
        responses: {
          kind: ["Say you'd rather be here", "Ask if he ever sleeps"],
          playful: ["Bet on who folds first", "Play until one of you drops"],
          bold: ["Deal the cards yourself", "Say you'll outlast him"],
          neutral: ["Sit and play a hand", "Watch him shuffle"],
        },
      },
      {
        line: "The float Lulu gave him is gone inside an hour. Not lost, spent, which he clearly thinks is a meaningful difference.",
        approach: "Run for it with him",
        greeting: [
          "\"Oops. Lulu's money's all gone. Run now, ask later.\"",
          "\"This is boring. I'm outta here. ...Something smells amazing. C'mon, we're getting food. Ciao, losers.\"",
        ],
        responses: {
          kind: ["Go with him, no lecture", "Offer to cover the float"],
          playful: ["Ask what he spent it on", "Bet Lulu catches him"],
          bold: ["Pull him out the back door", "Say you're not running"],
          neutral: ["Go, say nothing", "Follow him out"],
        },
      },
      {
        line: "The whole table gets quieter when he's talking to you. He hasn't noticed.",
        approach: "Let the room go quiet",
        greeting: '"Where was I. ...Right. You. Keep up."',
        responses: {
          kind: ["Let the room have its quiet", "Keep talking to him"],
          playful: ["Point out the quiet table", "Say the table's listening"],
          bold: ["Say you like the effect", "Let them all hear you"],
          neutral: ["Ignore it, say nothing", "Talk like nobody's there"],
        },
      },
      {
        line: "He says one odd thing and goes back to his cards. Days later it turns out he was right, and he's forgotten it.",
        approach: "Take the riddle seriously",
        greeting:
          '"Told you the answer days ago. Not my fault you weren\'t listening."',
        responses: {
          kind: ["Say you were listening", "Ask him to say it again"],
          playful: ["Repeat his own words back", "Ask for the next one"],
          bold: ["Say he knew all along", "Make him explain it"],
          neutral: ["Let it pass", "Note it down for later"],
        },
      },
      {
        line: '"Eat something," he says, shoving half his plate over. Not a suggestion.',
        approach: "Eat what he gives you",
        greeting: "\"Eat. I don't care if you're not hungry. Eat anyway.\"",
        responses: {
          kind: ["Eat it, thank him", "Eat, ask if he ate"],
          playful: ["Push the plate back, teasing", "Trade him the worse half"],
          bold: ["Tell him to eat first", "Eat off his side of the plate"],
          neutral: ["Clear the plate", "Eat what's in front of you"],
        },
      },
      {
        line: "You ask how he always wins. He gives you the real answer, which the mooks have never gotten out of him.",
        approach: "Ask how he always wins",
        greeting:
          '"Surefire way to win? Doesn\'t exist. You just gotta keep playing."',
        responses: {
          kind: ["Say that sounds exhausting", "Thank him for the truth"],
          playful: ["Accuse him of cheating", "Ask for the fake answer"],
          bold: ["Say that's not an answer", "Tell him to prove it"],
          neutral: ["Take the answer as given", "Nod, keep playing"],
        },
      },
      {
        line: "Lulu tried to move you to a different table once. Taiga vetoed it before he finished the sentence.",
        approach: "Stay at his table",
        greeting: '"Lulu wanted you moved. He didn\'t get far. Sit down."',
        responses: {
          kind: ["Sit down, feeling honored", "Say you'd have stayed anyway"],
          playful: ["Ask what he said to Lulu", "Ask if Lulu's still sulking"],
          bold: ["Say the table's yours now", "Say the seat was yours"],
          neutral: ["Stay where you are", "Settle in at his table"],
        },
      },
      {
        line: "He doesn't look up when you finally walk in. That deck has been shuffled more times than any deck needs.",
        approach: "Shrug off being late",
        greeting: '"Late. Not that I care. Sit down, dumbass."',
        responses: {
          kind: ["Apologize, mean it a little", "Say the walk ran long"],
          playful: ["Ask how long he's shuffled", "Ask for the exact number"],
          bold: ["Say he was clearly counting", "Tell him to admit he waited"],
          neutral: ["Sit, offer no excuse", "Sit before he says more"],
        },
      },
      {
        line: "Romeo corners you about a fee you've never heard of. Taiga tells him to put it on his tab, and goes back to his hand.",
        approach: "Let him cover the fee",
        greeting:
          '"Whatever Lulu just tried to charge you, ignore it. On my tab."',
        responses: {
          kind: ["Thank him for covering it", "Offer to pay it yourself"],
          playful: ["Ask what the fee was for", "Ask if his tab has a limit"],
          bold: ["Say you can pay your own way", "Ask what the tab costs you"],
          neutral: ["Let the two of them argue", "Stay out of it"],
        },
      },
      {
        line: "He wins a hand and slides half the pot your way like it's nothing.",
        approach: "Take the pot he slides",
        greeting: "\"Won the hand. Here, it's yours. Don't make it weird.\"",
        responses: {
          kind: ["Say you'll spend it well", "Say he should keep it"],
          playful: ["Ask if that's how he flirts", "Bet it all next hand"],
          bold: ["Ask for the other half too", "Take it, play it back at him"],
          neutral: ["Take it, say nothing", "Pocket the chips"],
        },
      },
      {
        line: "He backs you against the whole table with his own chips, and doesn't look remotely worried about it.",
        approach: "Play his stake",
        greeting:
          "\"Kitten's the only good bet at this table. Don't tell the others.\"",
        responses: {
          kind: ["Say you'll earn his bet", "Say you'll play it safe"],
          playful: ["Ask what odds he gave you", "Meow at him"],
          bold: ["Raise against the table", "Play it your own way"],
          neutral: ["Take the chips and play", "Play the stake quietly"],
        },
      },
      {
        line: "He forgets the day of the week more than once a month. He never forgets what you drink.",
        approach: "Take the drink",
        greeting: '"Here. Drink it. Don\'t make a thing out of it."',
        responses: {
          kind: ["Drink it, no fuss", "Say that counts for something"],
          playful: [
            "Test if he really remembers",
            "Name a drink he'd never get",
          ],
          bold: ["Say of course he remembers", "Ask what he drinks"],
          neutral: ["Take the drink, say nothing", "Drink it without comment"],
        },
      },
      {
        line: "He hands you the gun so he can deal with both hands, the way anyone else would hand over a drink.",
        approach: "Hold it while he deals",
        greeting: '"Hold that. Don\'t point it at anything you like."',
        responses: {
          kind: ["Hold it carefully", "Ask if it's loaded"],
          playful: ["Point it at him", "Ask for it permanently"],
          bold: ["Take it without asking", "Keep it when he wants it back"],
          neutral: ["Hold it, say nothing", "Set it on the table"],
        },
      },
      {
        line: '"Don\'t wander off," he says. "Not an order. Just... don\'t."',
        approach: "Don't wander off",
        greeting: '"...Good. Stay where I can see you."',
        responses: {
          kind: ["Promise not to wander", "Say you'd rather stay close"],
          playful: ["Wander a little anyway", "Ask if that's an order"],
          bold: ["Say you'll go where you want", "Tell him to keep up then"],
          neutral: ["Stay put, say nothing", "Stay in sight"],
        },
      },
      {
        line: "He tells you he feels like garbage and to leave him alone. He doesn't get up when you stay.",
        approach: "Stay anyway",
        greeting:
          '"Don\'t talk to me. I feel like shit. ...You can sit, though."',
        responses: {
          kind: ["Sit quietly with him", "Ask what he needs"],
          playful: ["Talk to him anyway", "Say you weren't talking"],
          bold: ["Stay without asking", "Tell him he's stuck with you"],
          neutral: ["Sit down nearby", "Stay put, say less"],
        },
      },
      {
        line: "He's playing five finger filet against his own hand out of boredom, and stops the second he clocks your face.",
        approach: "Take the knife off him",
        greeting: '"Bored. ...Fine, take it. Sit down, I\'ll deal instead."',
        responses: {
          kind: ["Take the knife, say thanks", "Ask him not to do that"],
          playful: ["Ask for his left hand", "Beat his count with cards"],
          bold: ["Pocket the knife outright", "Put your hand over his"],
          neutral: ["Take it, set it aside", "Wait for the cards"],
        },
      },
    ],
    spark: [
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
          bold: "Make something happen",
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
          bold: "Name the softness outright",
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
          kind: "Let him drop the act, gently",
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
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Huh." **{name}** looks {user} over. "You got guts. Stupid ones, but guts."',
      "{user} says the name, and **{name}** grins around it. \"Who're you? ...Whatever. C'mere.\"",
      '"You lost or somethin\'?" **{name}** asks {user}, shuffling the whole time.',
      "{user} says the name, and **{name}** squints. \"Didn't we meet yesterday? ...Nah. Don't remember.\" He sticks around anyway.",
    ],
    warm: [
      '"Took your damn time, kitten." **{name}** had been waiting on {user}.',
      "{user} calls out, and **{name}** kicks a chair out in their direction.",
      "**{name}** calls {user} a dumbass and deals them in.",
    ],
    spark: [
      '"Kitten." **{name}** says it to {user}, and this time it isn\'t a jab at all.',
      "{user} says the name, and **{name}** folds a hand he was winning.",
      "**{name}** hooks a finger in {user}'s collar to pull them down to his level, grinning.",
    ],
    close: [
      '"Anybody touches you, they answer to me." **{name}** tells {user} that was always the deal.',
      "**{name}** hears {user}, and everyone else stops existing.",
      "{user} calls, and **{name}** walks away from a bet he was about to win.",
    ],
    bound: [
      "\"You're the one hand I'd never fold, kitten.\" **{name}** growls it at {user}, daring them to make something of it.",
      "**{name}** pulls {user} in right there in the open, and the passers-by pretend not to notice.",
      "{user} says the name, and it's the one thing **{name}** doesn't lose track of.",
    ],
  },
};
