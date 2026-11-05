// Leo's bond scenes, read as DIALOGUE.leo.bondScenes
// (constants/dialogue/leo.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
// characters — see docs/negative-affinity-enemies-to-lovers.md. Leo stays
// thorny the whole way up: he never softens his mouth, he just stops aiming
// it at you, and the warmth is entirely in what he does while insulting you.
// Bold is what reaches him; being flattered makes him worse.
//
// Texting voice, per reference/leo.md's "Texting style" notes: Leo texts in
// mixed case (never all-lowercase), drops full stops, keeps paragraphs short,
// and uses "u"/"ur", "lol", "rn", "tho". "Ugh" and "Tch" survive into private
// DMs, casual profanity (shit/fuck) when riled or deflecting, and "Honor Roll"
// as his own address for her, same as everyone else in the game calls her —
// mocking at Acquaintance, protective by Devoted, said straight by Soulbound.
// Alan is "Cap" to him, same as in every other pool. Spoken voice notes and
// narration keep normal punctuation; the texting rules are only for what he
// actually types.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Don't get excited\n\nI message a lot of people\n\nUr not special, ur like extremely not special",
      "So there's a thread going around about u\n\nNothing too bad, which is honestly boring, I was hoping for something I could use\n\nAnyway I killed it, ur welcome\n\ndidn't like the guy who started it and this was cheaper than dealing with him\n\n{timesMet} times we've hung out and nobody's got anything on u\n\nkind of impressive and I'm annoyed about it",
    ],
    faces: { 0: "smile", 1: "annoyed" },
    choice: {
      prompt: "go ahead, thank me",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Just say thank you",
          style: 3,
          close:
            "Ugh\n\nDo it again but sarcastic, I don't know what to do with the other kind, it's making my skin crawl",
        },
        {
          key: "playful",
          face: "wink",
          label: "Ask how he even found it",
          style: 1,
          close:
            "I see everything that gets posted on this campus, it's kind of my whole thing\n\nalso I bugged the guy's car\n\njoking\n\nmostly",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you didn't ask him to",
          style: 4,
          close:
            "No, u didn't, that's the entire point Honor Roll\n\nanyone can do a favor they got asked for\n\nanyway don't read into it, reading into it is so embarrassing for u",
        },
      ],
    },
    keepsake: {
      emoji: "🗑️",
      line: "A thread about you that got deleted before you ever saw it.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Asked Sho to do fireworks with me again\n\nthat's like the fifth time he's said no, I'm literally offering him a good time and he acts like I asked him to commit a crime",
      "so I'm doing it without him and I need someone who'll actually show up\n\nCap's out, he'd just say \"it's dangerous\" and confiscate them\n\nur the only one who meets my ideas with {favResponse}\n\nthat's why I'm asking u, don't make it weird",
    ],
    faces: { 0: "annoyed", 1: "default" },
    choice: {
      prompt: "so are u in or are u gonna be boring about it",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Offer to keep watch",
          style: 3,
          close:
            "a lookout, wow, so cute\n\nnobody's gonna come, Sho's asleep and Cap's lost somewhere\n\nu can hold the lighter tho\n\nthat's a real job, don't let it go to ur head",
        },
        {
          key: "playful",
          face: "wink",
          label: "Say you're telling Sho",
          style: 1,
          close:
            "lol no ur not\n\nu'd have to explain how u know, and then u'd have to admit u were in on it\n\nnice try tho, I almost bought it\n\nI'm taking that as a yes",
        },
        {
          key: "bold",
          face: "full_smile",
          label: "Ask when and where",
          style: 4,
          close:
            "No \"are u sure\", no \"what if we get caught\"\n\nlol knew I picked right\n\nbehind the garage, after Sho's asleep, I'll text u\n\nand if he finds out, it was ur idea",
        },
      ],
    },
    keepsake: {
      emoji: "🎆",
      line: "A plan Sho still hasn't found out about.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Ok serious question and if u screenshot this I'll ruin ur life",
      "do u ever look at the pics I post of u\n\nlike do u actually like them or do u just scroll past\n\nasking bc those are the only ones I let out",
      "the rest are in a folder, started right after we met in {sinceMet} and I just never stopped adding to it\n\nthose don't go up\n\n600k ppl get plenty of me already\n\nthey don't need everything",
    ],
    faces: { 0: "serious", 1: "sweat", 2: "blush" },
    choice: {
      prompt: "and no, u don't get to ask about the rest of them, I asked first",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you like the ones he posts",
          style: 3,
          close:
            "obviously, I took them\n\nbut ok, noted\n\nur so easy to please lol",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what else is in there",
          style: 1,
          close:
            "u, mostly\n\nand one of Cap with a flower stuck in his hair, that one's staying too",
        },
        {
          key: "bold",
          face: "wink",
          label: "Ask why he's hoarding them",
          style: 4,
          close:
            "hoarding is a strong word\n\ncurating\n\nand the collection's not open to the public, sorry not sorry",
        },
      ],
    },
    keepsake: {
      emoji: "🔒",
      line: "The pictures of you he doesn't share with anyone.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: the numbers dipped this week\n\nI know that's not a thing to message a person at 3am about\n\nI'm doing it anyway",
      "here's the bit nobody gets\n\nit's not vanity, vanity would be fine, vanity's cheap\n\nit's that if the numbers go, there's nothing under them\n\nCap's got the strength, Sho's got… whatever Sho's got, the food thing, people love him for free\n\nI've got a follower count and a very good jawline and both of those depreciate",
      "I'm the vice-captain of a house where everyone would pick him over me in a heartbeat, including me\n\nand I've built an entire personality out of not letting that land\n\nanyway don't be nice about it\n\nif ur nice about it I'll have to block u, that's just how I'm built",
    ],
    faces: { 0: "default", 1: "annoyed", 2: "serious" },
    choice: {
      prompt: "go on, worst thing you've got, I've earned it",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Be nice about it anyway",
          style: 3,
          close:
            "I said I'd block u\n\n*He doesn't block you.*\n\n…I'm not blocking u, obviously\n\nsay the rest of it, I hate it, keep going",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Insult the jawline",
          style: 1,
          close:
            "THE JAWLINE IS THE ONE THING\n\nokay that helped, I'm furious that helped tho\n\nur a menace and I'm going to sleep",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him you'd pick him",
          style: 4,
          close:
            "*There's no answer for eleven minutes.*\n\ndon't say stuff like that at 3am, *he sends finally, and there's none of the voice left in it at all.* I'll believe it at 3am, that's how it gets u\n\n…say it again in daylight and I'll decide then",
        },
      ],
    },
    keepsake: {
      emoji: "💻",
      line: "The week the numbers dipped and he told exactly one person.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: saw what he said to u in the courtyard",
      "he's done\n\nnot like… nothing dramatic, I'm not Cap, I don't hit people\n\nhe's just going to find that everyone's suddenly very busy for about a month and he's never going to work out why the fuck that is\n\nthat's the version of me people know better than to test\n\nyou've never seen it pointed anywhere near u and u never will",
      "and yeah, I know that's not a nice thing about me, I'm aware, I've got a whole list\n\nbut u looked at the floor when he said it, and I've spent two years making sure nobody ever makes me look at the floor, so\n\nso nobody gets to do it to u either\n\nthat's it, that's the rule now",
    ],
    faces: { 0: "annoyed", 1: "smile", 2: "serious" },
    choice: {
      prompt: "don't tell me not to Honor Roll, I've already done it",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Tell him you didn't need it",
          style: 3,
          close:
            "I know u didn't\n\nthat's not why I did it\n\nI did it because I had to do something with my hands or I was going to have a whole feeling in public",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask if that's a declaration",
          style: 1,
          close:
            "it's a *hit job*, completely different thing, wildly different\n\n…it's the same thing, isn't it\n\nGod, this is so beneath me",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him to come here",
          style: 4,
          close:
            "*He shows up twenty minutes later in a hoodie with the hood up, which for Leo Kurosagi is basically appearing in public undressed.*\n\n*He doesn't say anything clever. He just gets an arm around you, hard, chin on the top of your head, and stands there in the corridor where anyone could see, which is the most reckless thing he's ever done.*",
        },
      ],
    },
    keepsake: {
      emoji: "🧢",
      line: "A hood pulled up so he could stand in a corridor and hold on.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Ok so I've drafted this eleven times and every version made me sound insane so I'm just going to type it badly",
      "{timesMet} times\n\nand every single one of them I've had a bit ready, something cutting, something that'd land, I'm never not holding one\n\nand the bits have got worse and worse because I stopped meaning them somewhere around the middle\n\na bit u don't mean is just noise, and you've been listening to noise for months",
      "here's the actual thing\n\nI'm not a nice person and I'm not going to become one\n\nI gossip, I'm petty, I keep score, and I will absolutely ruin someone's month over a look they gave u. none of that's changing\n\nwhat changed is I stopped wanting to point any of it at u and started wanting to point all of it *for* u, and I don't know what to call that except the obvious",
      "I love u, Honor Roll\n\nthere, typed it, not deleting it, which is genuinely the hardest thing I've done this year\n\nand before u say anything, I know exactly what I am and I know exactly what u could have instead, and I've done the math on that at 3am more times than I'm going to admit\n\nsay whatever u want, I've survived worse crowds",
    ],
    faces: { 0: "sweat", 1: "close", 2: "serious", 3: "blush" },
    choice: {
      prompt:
        "come on then, I'm not going to break, I'm probably not going to break",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "…say that again\n\nno wait don't, I've got to… hang on\n\n*The next thing is a voice note, eight seconds, and it's just him swearing quietly and then laughing at himself.*\n\n> Okay.\n\n*he says at the end of it, and for once there is not one single ounce of performance in his voice.*\n\n> Okay. I'm coming over. Don't be normal about it, I'm going to be so weird when I get there.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "yeah, yep, cool, totally\n\n*A gap.*\n\nthat was three lies in a row, sorry, give me one second\n\n…okay, take whatever u need, I mean that one\n\nI've been holding it for ages and it's not heavy, it just talks a lot\n\nand I'm not going anywhere, obviously, I live here and I'm extremely attention-seeking\n\nyou'll be sick of me, that's the plan Honor Roll",
        },
      ],
    },
    keepsake: {
      emoji: "📱",
      line: "The twelfth draft, sent badly, and never deleted.",
    },
  },
};
