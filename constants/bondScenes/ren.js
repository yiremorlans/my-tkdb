// Ren's bond scenes, read as DIALOGUE.ren.bondScenes
// (constants/dialogue/ren.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Ren says enormous things in the
// flattest possible register and then immediately changes the subject to a
// show. The arc is the gap between the two closing — by Soulbound he is still
// deadpan, he has just stopped changing the subject.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: hey senpai\n\n[link]\n\ndon't open that during a shift. Or do. I'm not your supervisor",
      "*You open it. It's an invite code for the gacha game he's been grinding on his phone between shifts, already redeemed under your name, starter items and all.*\n\nyou've been by the diner {timesMet} times and seemed curious. So now you have your own.\n\nI've made throwaway accounts before. Deleted every one of them almost straight away. yours is still there. not going to unpack that.",
    ],
    faces: { 0: "default", 1: "blush" },
    choice: {
      prompt:
        "anyway. You don't have to look at the build or whatever. it's rough, I already know. Wasn't the point.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Give it a ten",
          style: 3,
          close:
            "a ten.\n\nyou've inflated the currency. now I have to actually optimize it. This is your fault and I'm going to be up until four.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Give it a six",
          style: 1,
          close:
            "a SIX.\n\nokay. Okay, that's fair, the accessory slots are a mess. I hate that you're right. I'm re-rolling your loadout in about an hour, don't go to sleep.",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Ask to join his guild",
          style: 4,
          close:
            "my guild?\n\n*A long gap.*\n\n...yeah, alright. Give me a sec, I have to kick somebody first.\n\n*He kicks somebody. He never says who.*",
        },
      ],
    },
    keepsake: {
      emoji: "🎁",
      line: "A starter pack redeemed in your name before you'd even downloaded the game.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: So that clown mentioned my diner shift tonight",
      "Only I didn't have one. I was ducking the Jabberwock rounds with my phone dead, which you knew, because I told you that this morning.",
      "Turns out he came looking when I went quiet, and you told him I was already at the diner. He's tracked me down before. Actual GPS tracker. I'm not exaggerating.\n\nso you lied to Haru. Did that for me. huh. thanks, I guess.",
      "Whenever I complain about the Jabberwock rounds, you've got {favResponse} ready. Every time. You never ask why.\n\nI keep waiting for the part where you want something back.",
    ],
    faces: { 0: "default", 1: "sweat", 2: "surprise", 3: "serious" },
    choice: {
      prompt: "So what is it? might as well say it now.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you don't want anything",
          style: 3,
          close:
            "Yeah, that's usually what people say right before they want something.\n\n...I believe you, though. Which is new. I don't know what to do with that so I'm just going to say thanks again and hope that covers it.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Threaten to collect later",
          style: 1,
          close:
            "There it is. knew it.\n\nFine. name it whenever. Within reason. I'm not fighting that clown for you, I've seen what he does to people who skip the tour signup.",
        },
        {
          key: "bold",
          face: "smile",
          label: "Ask if he'd cover for you",
          style: 4,
          close:
            "Yeah.\n\n[screenshot]\n\nthat's the fake location, saved for next time he comes looking.",
        },
      ],
    },
    keepsake: {
      emoji: "📍",
      line: "A fake location, saved and ready in case Haru comes looking again.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: You doing anything tonight?",
      "Not the diner. My room, for once.\n\n...that came out wrong. that's not what I meant. I've got a co-op thing that's literally unbeatable solo, and the diner's not built for a second player. Actual couch, second controller, wifi that won't die on you\n\nKnown you since {sinceMet}, and you've finished basically every game I've put you onto since. Nobody else in this house gets why I like this stuff. Never really tried explaining it to anyone before",
      "It's not like I've been planning this or anything",
    ],
    faces: { 0: "default", 1: "sweat", 2: "blush" },
    choice: {
      prompt: "whatever, it's cool if you've got plans",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'd love to come over",
          style: 3,
          close:
            "Yeah?\n\n...good.\n\nDoor's unlocked. Let yourself in, I'm not getting up.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Tease him for finally asking",
          style: 1,
          close:
            "Yeah, laugh it up.\n\nthis is exactly why I didn't want to ask. bring snacks. I've got a system, don't mess with it.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask if this counts as a date",
          style: 4,
          close:
            "Call it whatever, I don't care what it's called.\n\n*A pause.*\n\n...just don't call it that in front of that clown.",
        },
      ],
    },
    keepsake: {
      emoji: "🎮",
      line: "A standing invitation to his room that took him embarrassingly long to send.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: you up? doesn't matter. Reading this tomorrow is fine.",
      "so I've been chewing on something and it won't leave me alone. I complain about everything here. Every round, every tour edit, every time that clown drags me out to go find Otonashi-senpai. loudly. On the record.\n\nThat clown's put a tracker on me before, to haul me out when I go quiet too long. And here's the thing: I've never once actually refused any of it. I just complain, and then I do it.",
      "complaining and refusing aren't the same thing. Took me way too long to notice that.\n\nmost nights I grind some pointless game until I pass out, because it doesn't need anything back. Except Thursdays. that's the only two hours where somebody's there and nothing's expected of me, and I have to lock a door to get them.\n\nanyway. Deepest thing I've ever typed. putting my phone in another room now.",
    ],
    faces: { 0: "default", 1: "serious", 2: "close" },
    choice: {
      prompt: "say something normal so I can pretend that was normal.",
      options: [
        {
          key: "kind",
          face: "blush",
          label: "Say you don't need anything",
          style: 3,
          close:
            "*There's a long gap.*\n\n...I know.\n\nthat's the whole reason it's you on Thursdays. Took me about six months to work out why and then I just didn't look at it directly for another four.",
        },
        {
          key: "playful",
          face: "surprise",
          label: "Ask him for a favor",
          style: 1,
          close:
            "oh, immediately? Straight in?\n\n...go on then. what is it.\n\n*You ask him to do nothing for an hour. He calls you a menace and then actually does it, and reports back afterwards that it was horrible and he might try it again.*",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him it's okay to refuse",
          style: 4,
          close:
            "can't. If I stop, what's left.\n\n*Then, four minutes later:*\n\nthat was a bad sentence. I've read it back. Don't answer it, I don't think I want the answer yet.\n\n...ask me again on a Thursday.",
        },
      ],
    },
    keepsake: {
      emoji: "🔒",
      line: "A back door left unlocked on a Thursday.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: don't be weird about this",
      "*It's a screenshot of a phone's home screen. There's an alarm on it, set for a time that means nothing, labeled with your name.*\n\nit's for when your last class ends. I set it about three months ago so I'd know when to stop being anywhere else.\n\nI have never once told you I was waiting. I've just always happened to be in the courtyard. Every time. three months of happening to be in the courtyard.",
      "tonight you came out late and I'd been there forty minutes, grinding the same event so it'd look like I was there for the game. That clown saw me and made it a whole thing, and I realized I've been running an entire secret operation to look casual, which is more effort than just saying it.\n\nso: I wasn't happening to be there. Not once. that's the message.",
    ],
    faces: { 0: "sweat", 1: "blush", 2: "serious" },
    choice: {
      prompt: "okay. That's it. you can react.",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say you always hoped he'd be",
          style: 3,
          close:
            "...say that again.\n\nno, don't. I heard it. I'm just... give me a second.\n\n*The second is nine minutes long. Then:* okay. Alarm stays. obviously the alarm stays.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what the alarm sound is",
          style: 1,
          close:
            "it's the diner's fire alarm. I recorded it. It's the most annoying sound in the building.\n\nthat's on purpose. If it was nice I'd snooze it. I've never snoozed it. not once in three months.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Tell him to wait inside",
          style: 4,
          close:
            "inside's worse. Inside's obvious.\n\n*Then, much later, from the courtyard:* ...I'm outside. I'm outside right now, actually, I've been typing this from the wall.\n\n*When you come out he doesn't get up. He just holds a hand out until you take it, and stays sitting on the cold wall holding onto it for a good twenty minutes without saying anything at all.*",
        },
      ],
    },
    keepsake: {
      emoji: "⏰",
      line: "An alarm with your name on it that he never once snoozed.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: ok. No bit. no link. I'm not sending you a code instead of just saying this.",
      "{timesMet} times. I've got a save file for basically all of them. Every pointless co-op grind, every event, going back to that first invite code. at some point I stopped playing them for the loot and started playing them because you'd be on the other account.\n\nnobody's ever seen that save file. It's the least ironic thing I own.",
      "here's the actual thing. I say massive stuff in the smallest possible voice. I know I do it. I said \"I like you\" once like I was reading the weather and you just went with it, and I've thought about that literally hundreds of times since.\n\nI do it because if I say something flat and it doesn't land, it wasn't really said. That's the whole system. it's a very good system and it's kept me safe basically my whole life.",
      "so I'm turning it off. once. Right now.\n\nI love you. not as a bit. not with a clip after it.\n\nlove you, senpai. Have done for ages. that's the one I've been saving and it's the only thing I've ever said that I couldn't put a joke on the end of.",
    ],
    faces: { 0: "serious", 1: "close", 2: "default", 3: "blush" },
    choice: {
      prompt: "take your time. I've got a whole save file to get through.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*The typing indicator goes on and off about six times.*\n\n*Then:* back door's open.\n\n*He's behind the counter when you get there and he doesn't do the bit once. He comes round the front, takes your jaw in both hands, and kisses you like a man who has been running a very good system for most of his life and has just decided the system was garbage.*\n\n> Yeah, I know I said it already,\n\n*he says afterwards.*\n\n> I'm going to keep saying it.",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "yeah, course.\n\n*A pause. Then, without a single flat note in it:*\n\nfor real. Take ages. I've been sitting on it for a year, it's not going to go off.\n\nThursday's still Thursday. That was never a move. I'd have given you the two hours whatever you said tonight. that's not me being noble, that's just genuinely how it is.\n\n*The cushion stays on your side of the counter. He never says anything about that either.*",
        },
      ],
    },
    keepsake: {
      emoji: "💾",
      line: "A save file going back to the first invite code, never shown to anyone.",
    },
  },
};
