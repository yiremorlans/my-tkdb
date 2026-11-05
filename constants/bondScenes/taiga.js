// Taiga's bond scenes, read as DIALOGUE.taiga.bondScenes
// (constants/dialogue/taiga.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
// characters — see docs/negative-affinity-enemies-to-lovers.md. Taiga never
// gets nice; he gets specific. The engine of the whole ladder is the
// time-slipping stigma: he loses people and places, and the intimacy is the
// increasingly desperate machinery he builds to keep hold of one person.
// "Kitten" and "dumbass" stay in to the last line. Canon: he never forgets
// anyone he's nicknamed, so what slips is her *name*, never her; "kitten"
// is the part that sticks.
//
// Texting voice, per reference/taiga.md's "Texting style" notes: lowercase, one
// short sentence per line (no paragraphs), and "u"/"ur", "k", "yea", "lol".
// "Gyahaha!" is still his. In-person `> ` speech and narration keep normal
// punctuation.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: oi. kitten.\n\nthis is Taiga.\n\nwriting it down so I know it's me later.\n\nlong story.",
      "here's the deal.\n\nur name's on a scrap of paper in my pocket.\n\nthird one down, under a room number and a debt.\n\nevery time I find it I gotta work out who the hell u are.\n\nthen I remember.\n\nthen I stop caring why.\n\n{timesMet} times now.\n\nthat's Lulu's count, not mine.\n\nI just got the paper. Gyahaha!",
    ],
    faces: { 0: "serious", 1: "serious" },
    choice: {
      prompt: "so. say something worth writing down, dumbass.",
      options: [
        {
          key: "kind",
          face: "serious",
          label: "Say you'll keep turning up",
          style: 3,
          close:
            "yea, they all say that.\n\n…writing it down anyway.\n\ndon't turn up, I'll feel like an idiot when I read this back.\n\nur problem now.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Ask what else is on the paper",
          style: 1,
          close:
            "none of ur business.\n\nroom number, a debt, ur name.\n\ndon't read into the order.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "serious", 1: "smile" },
    choice: {
      prompt: "everyone's running something. what's urs.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say there's no angle",
          style: 3,
          close:
            "no angle, huh\n\ndon't jinx it, kitten. odds are bad enough as is.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Ask if he's keeping count",
          style: 1,
          close:
            "gyahaha! course I'm keeping count, what, u think I do this for free?\n\nkeeping receipts, kitten. everyone pays eventually",
        },
        {
          key: "bold",
          face: "smile",
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
    faces: { 0: "serious", 1: "default", 2: "close" },
    choice: {
      prompt:
        "Go on then. Say the sad thing. Everyone says the sad thing when they see the board.",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say eleven isn't enough",
          style: 3,
          close:
            "*He stops.*\n\n> ...What?\n\n*You say it again.*\n\n> Right.\n\n*He pulls out a pen. Writes a twelfth one right there, pins it without looking at you.*\n\n> Don't say anything. Get out. Come back tomorrow.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Read one of them out loud",
          style: 1,
          close:
            "> Don't...\n\n*Too late. It says, handwriting getting away from him halfway:* \"the one who doesn't do the math. keep this one.\"\n\n*Long silence.*\n\n> Gyahaha,\n\n*no conviction behind it.*\n\n> Yeah. Alright.",
        },
        {
          key: "bold",
          face: "smile",
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
    faces: { 0: "serious", 1: "sweat", 2: "close" },
    choice: {
      prompt: "say it straight. don't be nice about it, I'll know.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you'd tell him about you",
          style: 3,
          close:
            "*Nothing for a long time.*\n\nevery time?\n\n*You say yes.*\n\n…every time.\n\nright.\n\n*Then:* come up.\n\nsaid don't, now I'm saying do.\n\nnot explaining the switch.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Say you moved the chair",
          style: 1,
          close:
            "U MOVED THE…\n\n*A pause. Then something close to a laugh.*\n\nGyahaha.\n\ndickhead.\n\none mystery down.\n\n…don't do it again.\n\nactually, do.\n\nlol best hour I've had since Wednesday.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "serious", 1: "smile", 2: "serious" },
    choice: {
      prompt: "say ur staying out of it. say it so I can go.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll stay put",
          style: 3,
          close:
            "k.\n\n*Nothing for three hours.*\n\n*Half four:* done.\n\nall fine.\n\nhour's all there.\n\n*Later, thinking you're asleep:* thought about the paper the whole way down.\n\nnever happens down there.",
        },
        {
          key: "playful",
          face: "full_smile_blush",
          label: "Ask what's on the menu",
          style: 1,
          close:
            "Gyahaha! that's my girl… that's my…\n\n*A pause where he clearly reconsiders the sentence and then decides not to fix it.*\n\nsomething with too many legs.\n\nI'll tell u if it's any good.",
        },
        {
          key: "bold",
          face: "sweat",
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
    faces: { 0: "sweat", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt: "Go on. Whatever it is. I've read worse off this board.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*Doesn't say anything a moment. Takes the pen out, holds it out handle-first.*\n\n> Write it. Your writing, not mine.\n\n*Pinned up next to his, he looks at the two a while, then just picks you up off the floor, one arm, no warning, holds on.*\n\n> Now it's on the wall,\n\n*into your hair.*\n\n> True even when I'm not.",
        },
        {
          key: "held",
          face: "close",
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
};
