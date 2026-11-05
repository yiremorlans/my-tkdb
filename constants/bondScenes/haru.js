// Haru's bond scenes, read as DIALOGUE.haru.bondScenes
// (constants/dialogue/haru.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Haru flirts constantly and bolts
// the instant it lands, so his scenes are built on that reflex: he says
// something enormous, panics, and covers it with a tour plug. The arc is the
// gap between the enormous thing and the bolt getting shorter, until at
// Soulbound he says it and stays put. At Confidant he admits the
// relentless-cheer act is a system he built so nobody would offer him help.
// The prosthetic arm is NOT a secret to him (Mio built it, he'll take the
// glove off in front of a tour group) — never write it as a shameful reveal,
// and never elaborate on how it was broken (Shion broke it; that's all we say).
//
// Texting voice, per reference/haru.md's "Texting style" notes: little kaomoji
// faces in his typed lines — (^_^;) sheepish, (;_;) for the sad ones — plus
// shortened words like "btw". Not in the `> ` lines he says out loud.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hey, Honor Roll! Big news.\n\nYou're crew on the boat tour. Made you a badge and everything. Didn't ask. Bit late to argue now, it's laminated (^_^;)",
      "You've come round {timesMet} times now. Reckon that makes you a regular. My favorite one, if I'm honest with you.\n\nAnyway! All you've gotta do is hand out life jackets and laugh at my jokes. Easy.\n\nAlso I bumped someone for that spot btw, which you didn't hear from me.",
    ],
    faces: { 0: "full_smile", 1: "sweat" },
    choice: {
      prompt: "So you'll come, hey? Say you'll come.",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say you'd love to",
          style: 3,
          close:
            "YES! Best news all week! Gahaha!\n\nBring a mate if you want, they'll get mates' rates. Tell everyone. Tell your whole house (^_^)",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Ask who got bumped",
          style: 1,
          close:
            "Nobody! Nobody got bumped!\n\n...Towa got bumped (^_^;) He always rides along with me, and now he's on flier duty instead. So he doesn't know yet, and I'd like to keep it that way for as long as humanly possible.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask what he meant by that",
          style: 4,
          close:
            "Gahaha! Did I say that? Nah, what I meant was the tour. Great tour. Five stars, people rave...\n\n...Right! Bring a jacket, hey, gets cold out on the water.\n\nGotta go, the Capybus is eating the fliers (^_^;)",
        },
      ],
    },
    keepsake: {
      emoji: "🪪",
      line: "A laminated crew badge with your name on it, made before you'd said yes.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: Hey. Went back and forth on whether I should message you at all, so if this is weird just ignore it (^_^;)",
      "One of the critters isn't doing great. Nothing dramatic, she's stable. But it's a two-person job and I've only got the one of me.\n\nCould rope in Ren or Towa, sure. Didn't want to.",
      "You, though! You're a real good sport, hey. Doesn't matter what mess I drag you into, you come back with {favResponse} and roll with it. Gahaha!\n\nSo I'm chancing it. Last minute, I know (^_^;) Reckon you could come lend us a hand? You'd be a real lifesaver.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "smile" },
    choice: {
      prompt: "No pressure. Well. A bit of pressure. Can you come?",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say you're on your way",
          style: 3,
          close:
            "...Yeah? All right! Cheers.\n\nGate's already propped open, come straight through. Knew you would, btw (^_^)",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if there's a tour discount",
          style: 1,
          close:
            "Discount? You're the one helping me out, I should be paying you (^_^;)\n\n...Cheers for making me laugh. Needed that. Gate's open.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say he should've asked sooner",
          style: 4,
          close:
            "Yeah, nah, don't go saying that. I'll get used to it.\n\n...Maybe I should've, though. Now get over here (^_^;)",
        },
      ],
    },
    keepsake: {
      emoji: "🚪",
      line: "The gate he'd already left open, because he knew you'd come.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Park's shut. Come round the side gate anyway. Bring nothing, I've got it covered.",
      "*It's the middle of the night and every enclosure light is off except one, and he's sitting on an upturned crate in front of it with two thermoses.*\n\n> This is the old girl. She came in eleven years ago and she's the reason there's a park at all. Doesn't do tours. Doesn't do visitors. Doesn't really do me most days.",
      "> I sit here about three nights a week. Have done since I got the captaincy. Nobody's ever come with me. I've never asked anyone, and I've had plenty of chances.\n\n*He hands you the second thermos without looking over.*\n\n> Brought two of these on the off chance for about a year, by the way. Just so you know the standard of pathetic we're operating at.",
    ],
    faces: { 0: "default", 1: "close", 2: "blush" },
    choice: {
      prompt: "Say something. She's judging us both.",
      options: [
        {
          key: "kind",
          face: "full_smile",
          label: "Say you'll come every week",
          style: 3,
          close:
            "*He doesn't answer for a bit. Then he laughs at nothing, sort of helplessly.*\n\n> Yeah, alright.\n\n> You'll have to. I've got two thermoses now, haven't I. That's a commitment. That's practically a mortgage.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask how long she'll judge",
          style: 1,
          close:
            "> Eleven years and counting. She's still deciding about me.\n\n> Reckon she's decided about you already, though. She hasn't moved to the back once. That's... yeah. That's not nothing.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask about the second thermos",
          style: 4,
          close:
            "> Aw, don't...\n\n*He stops. He actually stops, which he never does.*\n\n> ...A year.\n\n*he says.*\n\n> Filled the second one every single night I came out here on the off chance you'd say yes to something I hadn't asked yet.\n\n*And then he doesn't cover it with a joke. He just sits there in the dark next to you and lets it be true.*",
        },
      ],
    },
    keepsake: {
      emoji: "🫖",
      line: "A second thermos filled every night for a year on the off chance.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: Gonna tell you something and I need you to just not make a thing of it. Dead flat. It's the only way it comes out.",
      "First, so it's not weird: the arm's not a secret. You've watched me take the glove off to shift a fence post in front of a tour group. Mio built it, joints and all, and he'll corner anyone who stands still long enough to explain how it works.\n\nSo this isn't a big reveal. I'm not owed a gasp (^_^;)",
      "Here's the actual thing. That whole 'nothing slows me down, all stamina and bad luck' routine? I built it. On purpose, years back. So nobody would ever look at me and go, hey, d'you need a hand with that.\n\nAnd it worked for ages. Then you started turning up and doing half my rounds without being asked and leaving food where I'd trip over it, and I let you, and that's the nearest I've come to dropping the whole act since I started running it.\n\nSay something normal now. Or plug the tour, genuinely, I'd take the tour.",
    ],
    faces: { 0: "serious", 1: "default", 2: "sweat" },
    choice: {
      prompt: "Go on then. Flat. You promised.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say he's allowed a hand",
          style: 3,
          close:
            "*A long pause.*\n\n...Yeah. That's the exact sentence. That's the one the whole routine exists to stop anyone saying to me.\n\nGive us a sec. Gone all... yeah (;_;) Give us a sec.",
        },
        {
          key: "playful",
          face: "full_smile",
          label: "Plug the tour back at him",
          style: 1,
          close:
            "OH, THAT'S LOW.\n\n*He's laughing properly, which is what you were going for.*\n\nThat's the meanest kindest thing anyone's ever done to me. Five stars. People rave.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Say you're not going to stop",
          style: 4,
          close:
            "*No reply for a bit.*\n\n...Yeah, I know. Worked that out a month ago. It's why I'm telling you any of this.\n\n*Then, with the drawl gone out of it:*\n\nOkay. You do the morning rounds with me. Properly, not tagging along.\n\n> ...Cheers. For not making it weird.",
        },
      ],
    },
    keepsake: {
      emoji: "🧤",
      line: "A black glove on the fence post, off like it was nothing, because it was.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Righto, so I've done something and Jo is going to have my hide for it.",
      "There was a thing in the park tonight and it went for the small enclosure, and you were between it and the gate, and I made a call.\n\nI opened the small enclosure. On purpose. Let the whole lot out into the park so it'd have twenty things to chase instead of one thing to chase.\n\nTook us four hours to get them back in. Got them all. Every single one, I counted twice.",
      "Here's the bit I can't get straight in my head.\n\nEvery life in this park is mine. That's not a slogan, that's the actual job, I know all their names and I'd fight anyone in this academy over any one of them.\n\nAnd I put all of them at risk in about a second and a half because you were standing in the wrong place, and I'd do it again, and I don't know what that makes me.",
    ],
    faces: { 0: "sweat", 1: "default", 2: "serious" },
    choice: {
      prompt:
        "You'll be right. You always say that to me. Say it back, I need to hear it off someone.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him he got them all back",
          style: 3,
          close:
            "Yeah. Yeah, I did.\n\n*A long gap.*\n\n...say it again. Sorry (;_;) I've been counting them in my head for four hours and I can't make the number stick.\n\n*You say it about nine times. Eventually he sends a photo of the enclosure, all present, and one word:* ok.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Call it the midnight tour",
          style: 1,
          close:
            "The midnight tour. Oh, that's awful. Twenty critters, one guest, free-range, no refunds (^_^;)\n\n...Yeah. All right. I'll be right.\n\nJo's still having my hide, though. He's going to bring it up in about eight months when I've relaxed.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say it makes him yours",
          style: 4,
          close:
            "*There's no reply at all for about a minute.*\n\n*Then he's at the gate, still in the mud, absolutely wrecked, and he doesn't do a joke and he doesn't do the tour and he doesn't bolt.*\n\n*He just gets both arms round you, the gloved one and the other one, and holds on, and says into your shoulder,*\n\n> Yeah. Reckon it does.",
        },
      ],
    },
    keepsake: {
      emoji: "🌾",
      line: "Four hours of counting, and every one of them back inside.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: No tour plug on this one. I want that noted at the top. I've never once managed a message without a tour plug.",
      "{timesMet} times you've come round, and every single one of them you've said hello to the animals first, and I've stood there grinning like an idiot every single time, enjoying it more than is reasonable (^_^;)",
      "Here's my whole thing, right. I say the big stuff and then I bolt. Always have. Say something that means something, watch it land, and then immediately turn it into a bit so if it wasn't wanted I can pretend I never said it.\n\nI've done it to you about forty times. You've never once used the out. You've just stood there and waited for me to come back, and I always have, and that's... yeah. Nobody waits.",
      "So I'm not bolting.\n\nI love you. That's it. I'm not doing a bit after it, I'm not plugging anything, I'm not going to say something dumb about the aviary in three seconds to get out of it.\n\nI'm just going to sit here having said it. Which is the single hardest thing I've ever made myself do.",
    ],
    faces: { 0: "serious", 1: "smile", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take your time. I'm not going anywhere. That's sort of the whole point of tonight.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "...Say that again, I've gone and dropped my phone in the mud.\n\n*He's already running by the time you've typed it. He arrives at the side gate absolutely filthy and completely undone, and for once in his life he does not bolt and he does not joke.*\n\n*He kisses you against the gate with the enclosure lights off and the old girl watching, and afterwards he laughs (properly, wrecked, delighted) and says,*\n\n> Gahaha... yeah. All right.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Course, mate. Take as long as you want.\n\n*A pause. Then, with none of the drawl doing any work:*\n\nAnd listen, I'm not going to get weird. I'm not going to stop asking you on the tour, I'm not going to stop filling the second thermos. That was all real before tonight and it's all still real.\n\nYou'll be right. And so will I. I'm extremely good at waiting, turns out (^_^;) Did it for a year with a thermos.",
        },
      ],
    },
    keepsake: {
      emoji: "📣",
      line: "The first message he ever sent without plugging the tour.",
    },
  },
};
