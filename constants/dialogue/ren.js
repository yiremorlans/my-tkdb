export default {
  // The level-up DMs (docs/bond-scene-dms.md). Ren says enormous things in the
  // flattest possible register and then immediately changes the subject to a
  // show. The arc is the gap between the two closing — by Soulbound he is still
  // deadpan, he has just stopped changing the subject.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: hey senpai\n\n[link]\n\ndon't open that during a shift. Or do. I'm not your supervisor",
        "*You open it. It's an invite code for the gacha game he's been grinding on his phone between shifts, already redeemed under your name, starter items and all.*\n\nyou've been by the diner {timesMet} times and seemed curious. So now you have your own.\n\nI've made throwaway accounts before. Deleted every one of them almost straight away. yours is still there. not going to unpack that.",
      ],
      choice: {
        prompt:
          "anyway. You don't have to look at the build or whatever. it's rough, I already know. Wasn't the point.",
        options: [
          {
            key: "kind",
            label: "Give it a ten",
            style: 3,
            close:
              "a ten.\n\nyou've inflated the currency. now I have to actually optimize it. This is your fault and I'm going to be up until four.",
          },
          {
            key: "playful",
            label: "Give it a six",
            style: 1,
            close:
              "a SIX.\n\nokay. Okay, that's fair, the accessory slots are a mess. I hate that you're right. I'm re-rolling your loadout in about an hour, don't go to sleep.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "So what is it? might as well say it now.",
        options: [
          {
            key: "kind",
            label: "Say you don't want anything",
            style: 3,
            close:
              "Yeah, that's usually what people say right before they want something.\n\n...I believe you, though. Which is new. I don't know what to do with that so I'm just going to say thanks again and hope that covers it.",
          },
          {
            key: "playful",
            label: "Threaten to collect later",
            style: 1,
            close:
              "There it is. knew it.\n\nFine. name it whenever. Within reason. I'm not fighting that clown for you, I've seen what he does to people who skip the tour signup.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "whatever, it's cool if you've got plans",
        options: [
          {
            key: "kind",
            label: "Say you'd love to come over",
            style: 3,
            close:
              "Yeah?\n\n...good.\n\nDoor's unlocked. Let yourself in, I'm not getting up.",
          },
          {
            key: "playful",
            label: "Tease him for finally asking",
            style: 1,
            close:
              "Yeah, laugh it up.\n\nthis is exactly why I didn't want to ask. bring snacks. I've got a system, don't mess with it.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "say something normal so I can pretend that was normal.",
        options: [
          {
            key: "kind",
            label: "Say you don't need anything",
            style: 3,
            close:
              "*There's a long gap.*\n\n...I know.\n\nthat's the whole reason it's you on Thursdays. Took me about six months to work out why and then I just didn't look at it directly for another four.",
          },
          {
            key: "playful",
            label: "Ask him for a favor",
            style: 1,
            close:
              "oh, immediately? Straight in?\n\n...go on then. what is it.\n\n*You ask him to do nothing for an hour. He calls you a menace and then actually does it, and reports back afterwards that it was horrible and he might try it again.*",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "okay. That's it. you can react.",
        options: [
          {
            key: "kind",
            label: "Say you always hoped he'd be",
            style: 3,
            close:
              "...say that again.\n\nno, don't. I heard it. I'm just... give me a second.\n\n*The second is nine minutes long. Then:* okay. Alarm stays. obviously the alarm stays.",
          },
          {
            key: "playful",
            label: "Ask what the alarm sound is",
            style: 1,
            close:
              "it's the diner's fire alarm. I recorded it. It's the most annoying sound in the building.\n\nthat's on purpose. If it was nice I'd snooze it. I've never snoozed it. not once in three months.",
          },
          {
            key: "bold",
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
      choice: {
        prompt: "take your time. I've got a whole save file to get through.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The typing indicator goes on and off about six times.*\n\n*Then:* back door's open.\n\n*He's behind the counter when you get there and he doesn't do the bit once. He comes round the front, takes your jaw in both hands, and kisses you like a man who has been running a very good system for most of his life and has just decided the system was garbage.*\n\n> Yeah, I know I said it already,\n\n*he says afterwards.*\n\n> I'm going to keep saying it.",
          },
          {
            key: "held",
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
  },
  dialogue: {
    new: [
      {
        line: 'He\'s scrolling through his phone, barely acknowledging you at first. "Oh. Hey."',
        approach: "Say hey back",
        greeting: '"Yeah. Give me a sec, this one\'s almost over."',
        responses: {
          kind: ["Say there's no rush", "Wait until he's done"],
          playful: ["Bet on how it ends", "Ask if you can watch too"],
          bold: ["Sit down next to him", "Settle in till it's over"],
          neutral: ["Shrug and stay put", "Look away politely"],
        },
      },
      {
        line: "Break time at the diner. He looks up from his phone at you hovering, the look he saves for customers who've finished eating and won't leave.",
        approach: "Take it as a hello",
        greeting:
          "\"I'm not doing extra shifts. Unless you're covering my break. Then, maybe.\"",
        responses: {
          kind: ["Say you just came to eat", "Share his booth for the break"],
          playful: [
            "Ask if loitering costs extra",
            "Haggle him down from maybe",
          ],
          bold: ["Say deal, he owes you", "Tell him maybe isn't a no"],
          neutral: ["Nod, say nothing", "Shrug and let it go"],
        },
      },
      {
        line: "He's found the one spot in the whole building where nobody looks. You found him anyway.",
        approach: "Sit down uninvited",
        greeting:
          '*This is harassment.* "...I came here specifically to not be found."',
        responses: {
          kind: ["Sit quietly, no fuss", "Say you'll be quiet"],
          playful: ["Trade flat lines with him", "Ask if there's room to hide"],
          bold: ["Claim the spot as yours too", "Tell him you found him fast"],
          neutral: ["Say nothing at all", "Stare at the ceiling"],
        },
      },
      {
        line: '"...You need something?" He sounds like he hopes the answer is no.',
        approach: "Tell him it's nothing",
        greeting: "\"Nah, I'm not doing anything. That's kind of the point.\"",
        responses: {
          kind: ["Say you're just checking in", "Say doing nothing is fine"],
          playful: ["Ask if you can join nothing", "Ask if nothing pays well"],
          bold: ["Sit and do nothing with him", "Claim the other end"],
          neutral: ["Nod and leave him to it", "Lean on the wall, quiet"],
        },
      },
      {
        line: '"Great, rounds again. I was gonna head out... What? Do I really need to do all of them?"',
        approach: "Tell him he can go",
        greeting:
          "\"If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm too busy.\" (He isn't.)",
        responses: {
          kind: [
            "Say you'll wait till he's free",
            "Say you'll feed the animals",
          ],
          playful: [
            "Ask which round is the worst",
            "Say he owes you a diner round",
          ],
          bold: ["Plant yourself right there", "Take the spot next to him"],
          neutral: ["Shrug, say nothing", "Say you'll think about it"],
        },
      },
    ],
    known: [
      {
        line: "The diner's dead, so he's slumped over the counter. He sees you come in and, for once, doesn't pretend to be busy.",
        approach: "Point out he's not busy",
        greeting: "\"You're back already? Guess I don't mind.\"",
        responses: {
          kind: ["Say you like the quiet", "Say you don't mind either"],
          playful: ["Say business is booming", "Ask if he's on the clock"],
          bold: ["Stay till close", "Order something to test him"],
          neutral: ["Look over the menu", "Let it go unremarked"],
        },
      },
      {
        line: "You've barely sat down at the diner when a drink lands on your table. He's already back behind the counter, not looking at you.",
        approach: "Take the drink",
        greeting: '"It was already made. Would\'ve gone to waste otherwise."',
        responses: {
          kind: ["Drink it, say nothing", "Say it was the right one"],
          playful: [
            "Offer to rescue more drinks",
            "Call it suspiciously perfect",
          ],
          bold: ["Order the same tomorrow", "Say you'll be back tomorrow"],
          neutral: ["Ask what's in it", "Nod at him from your seat"],
        },
      },
      {
        line: '"Oh, Senpai... could you open the link I sent you? No, you don\'t have to sign up or anything. Thanks."',
        approach: "Open the link he sent",
        greeting: '"...You actually opened it. Huh. Nobody else ever does."',
        responses: {
          kind: ["Open it without question", "Say you trust him"],
          playful: [
            "Ask what you signed up for",
            "Joke about actually signing up",
          ],
          bold: ["Say you'll open the next one", "Ask what it's actually for"],
          neutral: ["Open it, say nothing", "Do it without comment"],
        },
      },
      {
        line: "He asks if you've seen the video. He's asking because he wants to talk about it.",
        approach: "Say you've seen it",
        greeting:
          '"Good, then you saw the ending. It was garbage, right? Tell me it wasn\'t just me."',
        responses: {
          kind: ["Say it wasn't just him", "Agree the ending was rough"],
          playful: ["Pitch an even worse ending", "Quote the worst line back"],
          bold: ["Say you already have thoughts", "Demand he go first"],
          neutral: ["Say yes, keep it short", "Give a flat answer"],
        },
      },
      {
        line: "He's watching some b-list horror movie on his phone, the kind with a rubber monster. He tilts the screen toward you without a word.",
        approach: "Ask about the movie",
        greeting:
          "\"They shot it in a week with no budget. The monster's a guy in a rubber suit that doesn't fit.\"",
        responses: {
          kind: ["Say you like his taste", "Say you'd watch it too"],
          playful: ["Ask if the monster wins", "Rate it out of ten"],
          bold: ["Ask him to start it over", "Say you'll pick the next one"],
          neutral: ["Watch it for a minute", "Nod at the screen"],
        },
      },
      {
        line: "He sweeps his charging cables and a spare power bank off the cushion next to him without being asked.",
        approach: "Take the cleared seat",
        greeting:
          "\"The outlet's on this side, so it's the only seat that makes sense. Don't make it weird.\"",
        responses: {
          kind: ["Plug your phone in too", "Sit, don't make it weird"],
          playful: [
            "Call the outlet a good excuse",
            "Make it weird, on purpose",
          ],
          bold: ["Take the seat, no ceremony", "Sit like it was always yours"],
          neutral: ["Sit, say nothing", "Take the seat quietly"],
        },
      },
      {
        line: "He's got a gacha pull loaded on his phone, thumb hovering over the button. When he sees you, he holds it out instead of pressing it.",
        approach: "Take the pull for him",
        greeting:
          "\"My luck's been trash all week, so you press it. ...If it's bad, I'm blaming you.\"",
        responses: {
          kind: ["Promise a good pull", "Say you'll share the blame"],
          playful: [
            "Ask what you get if it's good",
            "Say your luck is legendary",
          ],
          bold: ["Press it, own the result", "Ask for the next pull too"],
          neutral: ["Pull it, say nothing", "Take the phone quietly"],
        },
      },
      {
        line: "He mutes his phone the second you walk in. Small thing. He never used to bother.",
        approach: "Ask what he muted",
        greeting:
          '"It was buzzing. Not a big deal." It stays face down after that.',
        responses: {
          kind: ["Sit down like it's nothing", "Put your phone away too"],
          playful: ["Say no one can interrupt now", "Guess if it was Haru"],
          bold: ["Make yourself at home", "Say you're staying a while"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: "He's holed up in his room, dodging his rounds. He lets you in, but checks the hall first.",
        approach: "Promise you came alone",
        greeting:
          "\"Don't tell that clown you came to my room. If he thinks I have free time, he'll hand me another round.\"",
        responses: {
          kind: ["Promise not to tell Haru", "Say it stays between you"],
          playful: ["Ask what silence is worth", "Offer to fake an alibi"],
          bold: ["Say you're coming back", "Say you'll knock quieter"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He complains about doing rounds in Jabberwock for a solid minute before noticing you're still standing there.",
        approach: "Let him finish complaining",
        greeting: "\"You're around a lot lately. It's fine. Not a complaint.\"",
        responses: {
          kind: ["Say the feeling's mutual", "Let him finish venting"],
          playful: [
            "Call it his best review yet",
            "Say you'll file one for him",
          ],
          bold: ["Say get used to it", "Tell him to save you a spot"],
          neutral: ["Nod and take it", "Shrug and say sure"],
        },
      },
      {
        line: "He comes out of the aquatic zone with his sleeve pressed to his nose and asks if he smells like it. He does. He knows he does.",
        approach: "Tell him it's pretty bad",
        greeting:
          '"Knew it. This is forced labor. I\'m never getting this smell out of my clothes."',
        responses: {
          kind: ["Sit next to him anyway", "Sympathize with him"],
          playful: ["Say the fish won this round", "Call it a war wound"],
          bold: ["Stay close, smell and all", "Say you've smelled worse"],
          neutral: ["Shrug, say it's fine", "Say nothing about the smell"],
        },
      },
      {
        line: "He holds up two horror movie thumbnails and makes you pick, like your opinion actually counts for something now.",
        approach: "Look them over",
        greeting: "\"Just pick one. It's not a test. ...It's kinda a test.\"",
        responses: {
          kind: ["Say you'll watch either", "Say you like bad movies"],
          playful: [
            "Pick the one with worse CGI",
            "Pick the worse one on purpose",
          ],
          bold: ["Pick without hesitation", "Say your taste is better"],
          neutral: ["Pick one, say nothing", "Point at one, unbothered"],
        },
      },
      {
        line: '"Hey, senpai... you\'re not gonna sign me up for something, right?" He sounds legitimately worried.',
        approach: "Say it's nothing bad",
        greeting:
          '"Nothing bad. Okay. That\'s what that clown says right before he hands me a stack of flyers."',
        responses: {
          kind: ["Reassure him it's nothing bad", "Say he can relax"],
          playful: ["Pretend you already did", "Say it's a B-movie club"],
          bold: [
            "Say maybe you did sign him up",
            "Refuse to confirm either way",
          ],
          neutral: ["Say nothing, let him wonder", "Shrug, keep walking"],
        },
      },
    ],
    warm: [
      {
        line: "He actually puts his phone down mid-level when you arrive. Doesn't pick it back up, either.",
        approach: "Steal all his attention",
        greeting:
          '"Oh. You. ...Fine, I needed an excuse to quit this level anyway."',
        responses: {
          kind: ["Sit down next to him", "Talk about your day"],
          playful: [
            "Offer to be his excuse anytime",
            "Ask if the phone's broken",
          ],
          bold: ["Say you earned it", "Say the level can wait"],
          neutral: ["Settle in quietly", "Drop your bag, sit"],
        },
      },
      {
        line: "A shark movie is already queued up. He shifts over on the couch without looking up. The space is for you.",
        approach: "Take the empty space",
        greeting:
          '"Sit. I already picked something for us. It has a killer shark."',
        responses: {
          kind: ["Get comfy for the shark", "Say it sounds perfect"],
          playful: ["Guess the budget", "Ask if the shark wins"],
          bold: ["Sit like it's expected", "Call dibs on the next pick"],
          neutral: ["Sit without comment", "Take the space, no comment"],
        },
      },
      {
        line: "He's working through his watch list while Haru's out, and there's a gap on the couch beside him.",
        approach: "Ask what's on the list",
        greeting: '"Three B-movies in. You can stay for the fourth."',
        responses: {
          kind: ["Stay for the fourth one", "Settle in for the long haul"],
          playful: [
            "Rank the first three with him",
            "Ask how long Haru's gone",
          ],
          bold: ["Pick the fifth one", "Say you're staying for five"],
          neutral: ["Nod and stay put", "Let the movie play"],
        },
      },
      {
        line: "He's got a co-op raid open on his phone, and the second slot's been sitting empty, waiting for you.",
        approach: "Get your phone out",
        greeting: "\"I wasn't holding it for you. It's just open. Get in.\"",
        responses: {
          kind: ["Take the empty slot", "Join the raid, no fuss"],
          playful: [
            "Ask if you're carrying him",
            "Ask what your stats look like",
          ],
          bold: ["Say you knew he'd wait", "Say you'll lead the raid"],
          neutral: ["Join, say nothing", "Open the game"],
        },
      },
      {
        line: "He's still slouched, but his eyes haven't left you since you came in.",
        approach: "Catch him looking",
        greeting: '"...What. You had something on your face. It\'s gone now."',
        responses: {
          kind: ["Pretend you didn't notice", "Stay and keep him company"],
          playful: ["Ask what was so interesting", "Catch him at it again"],
          bold: ["Tell him he can just look", "Watch him right back"],
          neutral: ["Let him look away", "Act like you missed it"],
        },
      },
      {
        line: "He's got actual snacks stashed for once, and doesn't even pretend they're for anyone but you.",
        approach: "Steal the good snacks",
        greeting:
          '"Top shelf, behind the cups. I hid them from that clown.So, whatever. Help yourself."',
        responses: {
          kind: ["Sit down and share them", "Save him the better half"],
          playful: ["Rate the snack selection", "Ask what else is up there"],
          bold: ["Take them without asking", "Raid the whole stash"],
          neutral: ["Take a snack, say nothing", "Eat one, sit down"],
        },
      },
      {
        line: "He's adding something to his watch list, and you catch the title. It has three sequels.",
        approach: "Ask about the sequels",
        greeting:
          "\"Don't judge the queue. The third one's the best one. I'll fight you on that.\"",
        responses: {
          kind: ["Say you'll watch all four", "Take his word for it"],
          playful: ["Defend the second one", "Ask if there's a fifth"],
          bold: ["Say you'll judge for yourself", "Queue up your own pick"],
          neutral: ["Nod at the list", "Let him keep scrolling"],
        },
      },
      {
        line: "Out back at Jabberwock, Towa's tucking flowers into your hair. Ren watches from the fence and doesn't look away.",
        // He's on the outside of this one: quietly taking his "fine" lands, teasing doesn't.
        mood: true,
        approach: "Ask Ren how it looks",
        greeting:
          "\"Why are you asking me? Ask Otonashi-senpai. ...It's fine. Don't ask me.\"",
        responses: {
          kind: ["Ask him to wait for you", "Give him a small wave"],
          playful: [
            "Ask if he's on lookout duty",
            "Ask if he's waiting his turn",
          ],
          bold: ["Wave him over", "Tell him he's next"],
          neutral: ["Let Towa finish", "Leave the flowers be"],
        },
      },
      {
        line: "His shift ends, but he takes his time with his jacket, in no hurry to head off until he knows what you're doing.",
        approach: "Ask what his plans are",
        greeting:
          "\"Nothing. That's the plan. ...It works for two, if you've got nothing going on.\"",
        responses: {
          kind: ["Walk out with him", "Say two sounds about right"],
          playful: ["RSVP to nothing", "Ask if nothing includes snacks"],
          bold: ["Invite yourself along", "Pick the plan yourself"],
          neutral: ["Wait to be asked", "Head for the door with him"],
        },
      },
      {
        line: "He holds up the phone to show you an edit he's proud of before you even sit down.",
        // He's proud and showing it: real attention lands, critiquing the cut doesn't.
        mood: true,
        approach: "Tell him it's good",
        greeting:
          '"I know. It\'s already doing numbers. ...The cut at the end took me two hours."',
        responses: {
          kind: ["Watch it twice", "Say the end cut landed"],
          playful: ["Ask for the blooper reel", "Ask for a director's cut"],
          bold: ["Say it's his best yet", "Tell him to post it"],
          neutral: ["Nod, say it's fine", "Ask what he edits on"],
        },
      },
      {
        line: "You walk into the diner and he's already writing your order down before you reach the counter.",
        approach: "Ask how he knew",
        greeting:
          "\"Same as always. Don't look so surprised. It's not hard, you only order one thing.\"",
        responses: {
          kind: ["Take the usual, no fuss", "Wait at the counter with him"],
          playful: ["Ask if regulars get a discount", "Rate his service a ten"],
          bold: ["Say make it a double", "Order one for him too"],
          neutral: ["Nod at the counter", "Let him ring it up"],
        },
      },
      {
        line: "He said he'd walk part of the way back with you. He complains the whole time, and still doesn't peel off at his turn.",
        approach: "Point out he missed his turn",
        greeting:
          '"...Yeah, I know. Doubling back now would be a whole extra trip. Just keep walking."',
        responses: {
          kind: ["Let him keep complaining", "Say you like the company"],
          playful: [
            "Ask if this counts as cardio",
            "Bet he misses the next one too",
          ],
          bold: ["Take the long way, then", "Say he's walking you home"],
          neutral: ["Let the venting run", "Keep walking, say nothing"],
        },
      },
      {
        line: "He's already memorized your favorite instant noodles toppings. Never once asked.",
        approach: "Let him make it for you",
        greeting:
          "\"Extra corn, no scallions. ...What? I remember stuff. It's noodles, it's not a big deal.\"",
        responses: {
          kind: ["Dig in without comment", "Say he got it perfect"],
          playful: ["Ask for extra extra corn", "Ask for a surprise topping"],
          bold: ["Say of course he remembers", "Claim the bigger cup"],
          neutral: ["Eat it, say nothing", "Eat what he makes"],
        },
      },
      {
        line: "He asks how the Jabberwock rounds went. Then, way too casually, who you ended up doing them with.",
        approach: "Answer the real question",
        greeting:
          "\"That clown. Huh. ...He's always got you running around for him. Doesn't that get old? ...Whatever. Not my business.\"",
        responses: {
          kind: ["Say it's nothing like that", "Say you saved him a snack"],
          playful: [
            "Say Haru owes you hazard pay",
            "Ask for asylum from rounds",
          ],
          bold: ["Say you picked here tonight", "Say you'd rather hang here"],
          neutral: ["Answer, leave it there", "Shrug, say it was fine"],
        },
      },
      {
        line: "He's halfway through complaining about his rounds when you start talking, and he actually stops.",
        approach: "Keep talking",
        greeting: '"Go ahead. Yours is probably worse."',
        responses: {
          kind: ["Let him finish first", "Say you'll keep it short"],
          playful: ["Promise yours has a twist", "Say his can be the sequel"],
          bold: ["Take the floor", "Say he can go after"],
          neutral: ["Say what you came to say", "Start your story"],
        },
      },
      {
        line: '"You\'re late," he says, not looking up, already scooted over to make room.',
        approach: "Apologize for being late",
        greeting: '"Took you long enough. Not that I was counting."',
        responses: {
          kind: ["Ask what you missed", "Say you hurried"],
          playful: ["Blame the walk over", "Ask for the exact count"],
          bold: ["Sit like you always do", "Take the room he made"],
          neutral: ["Sit, skip the apology", "Sit in the space left"],
        },
      },
      {
        line: "You're waiting outside the diner when his shift ends. He steps out, sees you, and stops in the doorway.",
        // He's caught off guard and suspicious: plain, ordinary care lands, a bit doesn't.
        mood: true,
        approach: "Say you waited for him",
        greeting:
          '"...You waited? For me? Okay. Who sent you. Was it that clown."',
        responses: {
          kind: ["Ask how his shift went", "Ask if he's eaten yet"],
          playful: ["Pretend you were passing by", "Say you're his fan club"],
          bold: [
            "Start walking, he'll follow",
            "Say you'll be back next shift",
          ],
          neutral: ["Wave from the curb", "Wait for him to move"],
        },
      },
      {
        line: "The aquatic zone's already fed by the time you get there, and his sleeves are soaked to the elbow. He hates that place.",
        approach: "Ask why he went early",
        greeting:
          "\"Because you'd have gotten stuck with it. Don't read into it. I still hate that place.\"",
        responses: {
          kind: ["Offer him your jacket", "Say you'll take the next one"],
          playful: [
            "Call it a heroic sacrifice",
            "Rate the aquatic zone a zero",
          ],
          bold: ["Stick by him till he's dry", "Say you owe him one"],
          neutral: ["Nod, let it go", "Hand him a towel, say nothing"],
        },
      },
    ],
    spark: [
      {
        line: "You wake up against his shoulder. His phone died an hour ago, and he never got up to charge it.",
        approach: "Start to sit up",
        greeting:
          "\"Oh. You're up. I wasn't... My arm's asleep. That's fine. It's fine.\"",
        responses: {
          kind: "Stay right where you are",
          playful: "Ask if his arm survived",
          bold: "Settle back in",
          neutral: "Sit up and stretch",
        },
      },
      {
        line: "\"You're kind of in my space,\" he says, and doesn't move an inch.",
        approach: "Start to move over",
        greeting:
          '"...I didn\'t say move. Why would you move. Just. Stay there."',
        responses: {
          kind: "Stay put, no comment",
          playful: "Ask whose space it is, then",
          bold: "Lean into his space",
          neutral: "Stay half on your side",
        },
      },
      {
        line: "He's looking at you during the quiet part of the movie instead of the screen.",
        approach: "Look back at him",
        greeting: '"...You\'re missing the good part. So am I. Whatever."',
        responses: {
          kind: "Keep looking back",
          playful: "Ask if he's rating you",
          bold: "Lean in closer",
          neutral: "Turn back to the movie",
        },
      },
      {
        line: "He lets the raid timer run out on his phone. He's looking at you instead.",
        approach: "Point at the timer",
        greeting:
          "\"I know. It's fine. There's other raids. There's... yeah. Other raids.\"",
        responses: {
          kind: "Let the raid go",
          playful: "Ask if you're worth the loot",
          bold: "Take his free hand",
          neutral: "Wait for the next raid",
        },
      },
      {
        line: "Your hands bump reaching for the same charger. He doesn't pull back right away.",
        approach: "Leave your hand there",
        greeting: "\"...Your hand's cold.\" He still hasn't moved his.",
        responses: {
          kind: "Let the moment sit",
          playful: "Ask if he's charging too",
          bold: "Lace your fingers with his",
          neutral: "Plug in your phone",
        },
      },
      {
        line: "He's rewatching something you both already saw, just because you liked it the first time.",
        approach: "Ask why he's rewatching it",
        greeting: "\"You liked this one. So. It's on. Don't make it a thing.\"",
        responses: {
          kind: ["Say you'd watch it again", "Settle in for the rewatch"],
          playful: ["Quote the best line first", "Ask if it's as good again"],
          bold: ["Say it's your movie now", "Take your spot, no ceremony"],
          neutral: ["Watch along, say nothing", "Start it from the top"],
        },
      },
      {
        line: "The couch cushion's already dented in the shape of two people. He doesn't mention it. Neither do you.",
        approach: "Sit in the usual spot",
        greeting:
          '"I\'d rather do nothing with you than something with anyone else."',
        responses: {
          kind: ["Say you'd rather be here", "Do nothing right beside him"],
          playful: ["Fit into the dent exactly", "Measure the dent"],
          bold: ["Say the spot is yours now", "Claim the better side"],
          neutral: ["Drop into the dent", "Let the quiet stay"],
        },
      },
    ],
    close: [
      {
        line: "\"Senpai... look, if it comes down to it, I'm on your side. Obviously.\" The phone's already face down.",
        approach: "Let him have your back",
        greeting:
          "\"If someone's giving you trouble, say the word. I'll stop being lazy.\"",
        responses: {
          kind: "Tell him he's not lazy",
          playful: "Tease him for the dramatics",
          bold: "Say you'd do the same for him",
          neutral: "Let the episode run",
        },
      },
      {
        line: "He notices you're off before you've said a word, and quietly changes the plan.",
        approach: "Tell him what's wrong",
        greeting:
          "\"Something's up with you. Don't bother lying, just tell me.\"",
        responses: {
          kind: "Say you'll stick it out",
          playful: "Get a real laugh out of him",
          bold: "Push him to stop hiding",
          neutral: "Be quiet with him",
        },
      },
      {
        line: '"Stay," he says, casual as anything, meaning it more than anything.',
        approach: "Stay as long as you want",
        greeting:
          '"You can stay as long as you want. Seriously. As long as you want."',
        responses: {
          kind: "Say you'll take him up on it",
          playful: "Steal his hoodie",
          bold: "Name what this is",
          neutral: "Stay, say nothing",
        },
      },
      {
        line: "He plays badly on purpose so the round lasts longer. He'd never admit that.",
        approach: "Flop down next to him",
        greeting:
          "\"Hey, Senpai... I'm really glad you're here. More than you know.\"",
        responses: {
          kind: "Let him win anyway",
          playful: "Beat him at his own game",
          bold: "Say it before he does",
          neutral: "Play along, say nothing",
        },
      },
      {
        line: "The phone stays face down for the entire conversation. That's not nothing.",
        approach: "Notice the phone stays down",
        greeting: '"I don\'t do this with anybody else. You get that, right?"',
        responses: {
          kind: "Notice, say nothing about it",
          playful: "Ask if the phone's sulking",
          bold: "Say that means something",
          neutral: "Share the couch in silence",
        },
      },
      {
        line: '"...I like you," he says, flat as a weather report, and goes back to his phone.',
        approach: "Wait for the rest",
        greeting: "\"Stay over. Couch is fine. I'm fine. Everything's fine.\"",
        responses: {
          kind: "Say you'll stay over",
          playful: "Ask for the forecast",
          bold: "Stay, and sit close",
          neutral: "Nod and stay",
        },
      },
    ],
    bound: [
      {
        line: "You wake up tangled in him and the show has been on the menu screen for six hours.",
        approach: "Take his side of the couch",
        greeting:
          "\"You're on my side of the couch. That's fine. That's ideal, actually.\"",
        responses: {
          kind: "Let him keep hold",
          playful: "Hog the whole couch",
          bold: "Wake him up on purpose",
          neutral: "Fall back asleep",
        },
      },
      {
        line: '"Don\'t move," he mumbles into your hair. "Seriously. This is perfect."',
        approach: "Don't get up",
        greeting: '"...Mmh. Good. Five more minutes. Then ten."',
        responses: {
          kind: "Stay right there",
          playful: "Test how still he means",
          bold: "Move just to see",
          neutral: "Stay still",
        },
      },
      {
        line: "He kisses you lazily, halfway through a level, and loses the level entirely.",
        approach: "Kiss him back",
        greeting: '"Come back to bed, Senpai. The game\'s not going anywhere."',
        responses: {
          kind: "Kiss him back slowly",
          playful: "Say the level had it coming",
          bold: "Take the controller from him",
          neutral: "Let the menu screen run",
        },
      },
      {
        line: "He's stopped hiding. He's just quietly, thoroughly yours, and everyone knows it.",
        approach: "Stop hiding it too",
        greeting:
          "\"I'm not good at big gestures. This is the gesture. You, here. That's it.\"",
        responses: {
          kind: "Say you're glad he stopped",
          playful: "Call it a big gesture",
          bold: "Turn the game off",
          neutral: "Let him just be",
        },
      },
      {
        line: 'He says "love you" like it\'s punctuation now, flat, constant, absolutely meant.',
        approach: "Say it back",
        greeting:
          '"Love you. Yeah, I know I said it this morning. Still true."',
        responses: {
          kind: "Say it back",
          playful: "Count how many times, out loud",
          bold: "Pull him back to bed",
          neutral: "Let it be constant, unremarked",
        },
      },
    ],
  },
  // playful is Ren's register — dry banter, gaming, teasing his video hobby; it
  // lands hardest (affinityByResponse.playful = 2). kind reaches him too, but
  // only low-key and unsentimental (1). bold glances off — he deflects
  // forwardness rather than meeting it (0), so those moves read as the player
  // pushing and Ren not biting.
  //
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two labels had no genuine beat match ("Tell him he's off the clock" from
  // kind, "Say it first" from bold) and were dropped rather than force-
  // placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      {
        line: "**{name}** stays put for {user}, mildly impressed they found him at all.",
        responses: {
          kind: "Stay a while, no fuss",
          playful: "Keep his hideout secret",
          bold: "Take the spot next to him",
        },
      },
      {
        line: "\"Is this for a mission? Because I'm technically on break.\" **{name}** stays on his phone while {user} talks, but he's listening.",
        responses: {
          kind: "Say it can wait",
          playful: "Ask if the break ever ends",
          bold: "Sit and wait out his break",
        },
      },
      {
        line: "\"Whatever it is, I didn't do it. Or I'll do it later.\" **{name}** hears {user} out anyway.",
        responses: {
          kind: "Say nobody's blaming him",
          playful: "Ask how much later",
          bold: "Sit down, no explanation",
        },
      },
      {
        line: '**{name}** glances up from his phone at {user}. "I\'m on break. Especially if that clown sent you."',
        responses: {
          kind: "Sit and share the break",
          playful: "Say you're hiding from him too",
          bold: "Claim half the break",
        },
      },
    ],
    known: [
      {
        line: "\"You're around a lot lately.\" Arms crossed, **{name}** tells {user} it isn't a complaint.",
        responses: {
          kind: "Say you like the company",
          playful: "Ask where to file a complaint",
          bold: "Say you'll be around more",
        },
      },
      {
        line: '"Rounds are done. Don\'t ask about the aquatic zone." **{name}** drops down next to {user} like he earned it.',
        responses: {
          kind: "Say he earned the break",
          playful: "Ask how bad, on a scale",
          bold: "Scoot over for him",
        },
      },
      {
        line: '"Don\'t tell that clown you saw me." **{name}** lets {user} stay anyway.',
        responses: {
          kind: "Promise you won't tell",
          playful: "Ask what he's hiding from",
          bold: "Say Haru already knows",
        },
      },
    ],
    warm: [
      {
        line: "**{name}** puts the phone down for {user}, and doesn't pick it back up.",
        responses: {
          kind: "Ask how his day's been",
          playful: "Check if his battery died",
          bold: "Take the spot beside him",
        },
      },
      {
        line: "\"You missed the last B-movie night,\" **{name}** tells {user}, who didn't know he'd been counting.",
        responses: {
          kind: "Ask what he thought of it",
          playful: "Ask him to rate them all",
          bold: "Say you'll catch the next one",
        },
      },
      {
        line: '"It\'s not like I was waiting for you or anything." **{name}** says it to {user} a little too fast.',
        responses: {
          kind: "Say you'd have waited too",
          playful: "Say that was fast",
          bold: "Sit down like you belong",
        },
      },
    ],
    spark: [
      {
        line: "\"Raid's got a second slot.\" **{name}** says it to {user} like it isn't a confession.",
        responses: {
          kind: "Take the second slot",
          playful: "Call dibs on the loot",
          bold: "Say you'll outscore him",
        },
      },
      {
        line: "{user} calls his name, and **{name}** pockets his phone mid-match.",
        responses: {
          kind: "Say he can finish the match",
          playful: "Ask if he just forfeited",
          bold: "Claim the spot beside him",
        },
      },
      {
        line: "\"You're kind of in my space,\" **{name}** says to {user}, and doesn't move an inch out of it.",
        responses: {
          kind: "Share the space, no comment",
          playful: "Ask if there's a toll",
          bold: "Stay in his space",
        },
      },
    ],
    close: [
      {
        line: '"Stay," **{name}** says when he gets to {user}, casual as anything, and doesn\'t go anywhere either.',
        responses: {
          kind: "Say you'll stay",
          playful: "Ask how long",
          bold: "Say only if he asks",
        },
      },
      {
        line: "**{name}** loses the run because {user} called his name.",
        responses: {
          kind: "Say you'll watch the next run",
          playful: "Ask for a rematch",
          bold: "Say he was losing anyway",
        },
      },
      {
        line: "{user} calls, and **{name}** pockets the phone and straightens up.",
        responses: {
          kind: "Fall into step beside him",
          playful: "Ask if the phone is jealous",
          bold: "Take the phone's place",
        },
      },
    ],
    bound: [
      {
        line: "\"Found me again. Pretty sure that's not luck anymore, Senpai.\" **{name}** doesn't dress it up for {user}.",
        responses: {
          kind: "Say it never was luck",
          playful: "Say you just got lucky",
          bold: "Say you'll always find him",
        },
      },
      {
        line: "**{name}** reaches {user} and puts his chin on their shoulder. That was the whole plan.",
        responses: {
          kind: "Let him stay there",
          playful: "Ask if there's a phase two",
          bold: "Say that's a weak plan",
        },
      },
      {
        line: "\"Hey. Was hoping it'd be you.\" **{name}** tells {user}, and doesn't even try to take it back.",
        responses: {
          kind: "Say you hoped so too",
          playful: "Ask him to say it again",
          bold: "Say it'll always be you",
        },
      },
    ],
  },
};
