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
        "Turns out he came by looking for me when I went quiet, and you told him I was already at the diner. He's got this thing where if I go quiet too long he decides something's wrong and starts checking every room in the dorm. He's tracked me down before. Actual GPS tracker. I'm not exaggerating for effect.\n\nso you lied to Haru. Did that for me. huh. thanks, I guess.\n\nWhenever I complain about the Jabberwock rounds, you've got {favResponse} ready. Every time. You never ask why.\n\nI keep waiting for the part where you want something back.",
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
        "Not the diner. My room, for once.\n\n...that came out wrong. To play games. Diner's not exactly built for a second player anyway. I've got an actual couch, a second controller, and wifi that won't die on you\n\nKnown you since {sinceMet}, and you've finished basically every game I've put you onto since. Nobody else in this house gets why I like this stuff. Never really tried explaining it to anyone before",
        "Been meaning to ask you over for actual ages. Whatever, it's cool if you've got plans",
      ],
      choice: {
        prompt: "So. that's the ask. yes or no, I'm not typing it twice",
        options: [
          {
            key: "kind",
            label: "Say you'd love to come over",
            style: 3,
            close:
              "Yeah?\n\n...good.\n\nDoor's unlocked. Don't take forever, I already picked the game.",
          },
          {
            key: "playful",
            label: "Tease him for finally asking",
            style: 1,
            close:
              "Yeah, laugh it up.\n\nfor the record I had at least three better versions of this text and sent the worst one anyway. bring snacks. I've got a system, don't mess with it.",
          },
          {
            key: "bold",
            label: "Ask if this counts as a date",
            style: 4,
            close:
              "...No.\n\n*A long gap.*\n\nOkay, I wouldn't correct you if you called it that. Doesn't mean I'm saying it first. Just show up.",
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
        "so I've been chewing on something and it won't leave me alone. I complain about everything here. Every shift, every tour edit, every time Haru drags me out to go find Towa. loudly. On the record.\n\nHaru's put a tracker on me before, to haul me out when I go quiet too long. And here's the thing: I've never once actually refused any of it. I just complain, and then I do it.",
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
        "tonight you came out late and I'd been there forty minutes, grinding the same event so it'd look like I was there for the game. Haru saw me and made it a whole thing, and I realized I've been running an entire secret operation to look casual, which is more effort than just saying it.\n\nso: I wasn't happening to be there. Not once. that's the message.",
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
          kind: ["Offer a small smile", "Wait until he's done"],
          playful: ["Ask if he ever puts it down", "Ask if you can watch too"],
          bold: ["Wave a hand in front of it", "Peek over his shoulder"],
          neutral: ["Shrug and stay put", "Look away politely"],
        },
      },
      {
        line: "One earbud comes out. That's the entire greeting, and it's more than most people get.",
        approach: "Take it as a hello",
        greeting:
          "\"I'm not doing extra shifts. Unless you're covering my break. Then, maybe.\"",
        responses: {
          kind: ["Say you're not here for that", "Offer to cover his break"],
          playful: ["Match the energy", "Ask how long his break is"],
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
          playful: ["Trade flat lines with him", "Ask who he's hiding from"],
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
          playful: ["Ask what he's hiding", "Ask if nothing pays well"],
          bold: ["Ask the blunt question", "Ask what's on his screen"],
          neutral: ["Nod and leave him to it", "Lean on the wall, quiet"],
        },
      },
      {
        line: '"Great, shift change. I was gonna head out... What? Do I really need to be here for that?"',
        approach: "Tell him he can go",
        greeting:
          "\"If you're just gonna stand there, could you go feed the animals in the aquatic zone? I'm too busy.\" (He isn't.)",
        responses: {
          kind: ["Don't make it a thing", "Say you'll feed the animals"],
          playful: ["Challenge him to a round", "Ask what he's so busy with"],
          bold: ["Tell him to just say it", "Tell him to feed them himself"],
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
          playful: ["Ask where the customers are", "Ask if he's on the clock"],
          bold: ["Tell him to look busy", "Order something to test him"],
          neutral: ["Look over the menu", "Let it go unremarked"],
        },
      },
      {
        line: "You've barely sat down at the diner when a drink lands on your table. He's already back behind the counter, not looking at you.",
        approach: "Take the drink",
        greeting: '"It was already made. Would\'ve gone to waste otherwise."',
        responses: {
          kind: ["Say you appreciate it", "Say it was the right one"],
          playful: [
            "Ask if this is a habit now",
            "Call it suspiciously perfect",
          ],
          bold: ["Tell him he can admit it", "Say you'll be back tomorrow"],
          neutral: ["Drink it, say nothing", "Nod at him from your seat"],
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
            "Threaten to actually sign up",
          ],
          bold: ["Demand to know what it is", "Open it, call him out after"],
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
          playful: ["Pretend you haven't seen it", "Quote the worst line back"],
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
          kind: ["Tell him it was thoughtful", "Sit down gratefully"],
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
          kind: ["Promise a good pull", "Say you'll try your best"],
          playful: [
            "Ask what you get if it's good",
            "Say your luck is legendary",
          ],
          bold: ["Hit it before he's ready", "Ask for the next pull too"],
          neutral: ["Pull it, say nothing", "Take the phone quietly"],
        },
      },
      {
        line: "He mutes his phone the second you walk in. Small thing. He never used to bother.",
        approach: "Ask what he muted",
        greeting: '"Quiet today. Good. Means nobody\'s making me work."',
        responses: {
          kind: ["Let him keep it private", "Say you didn't notice"],
          playful: ["Guess what he muted", "Demand to know what it was"],
          bold: ["Ask outright what he muted", "Push for the real answer"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: '"You\'re not gonna make this weird, right?" he says, already regretting saying hi first.',
        approach: "Promise not to make it weird",
        greeting:
          "\"Don't tell Haru you came to my room. If he thinks I have free time, he'll hand me another shift.\"",
        responses: {
          kind: ["Promise not to tell Haru", "Say it stays between you"],
          playful: ["Ask what silence is worth", "Threaten to tell Haru"],
          bold: ["Say you're coming back", "Tell him he's not that busy"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He complains about doing rounds in Jabberwock for a solid minute before noticing you're still standing there.",
        approach: "Let him finish complaining",
        greeting: "\"You're around a lot lately. It's fine. Not a complaint.\"",
        responses: {
          kind: ["Let him finish venting", "Listen without interrupting"],
          playful: ["Egg the complaint on", "Ask for more detail"],
          bold: ["Cut the complaint short", "Tell him to just say it"],
          neutral: ["Wait quietly", "Say nothing, let him vent"],
        },
      },
      {
        line: "He comes out of the aquatic zone with his sleeve pressed to his nose and asks if he smells like it. He does. He knows he does.",
        approach: "Tell him it's pretty bad",
        greeting:
          '"Knew it. This is forced labor. I\'m never getting this smell out of my clothes."',
        responses: {
          kind: ["Say it's not that bad, kindly", "Sympathize with the smell"],
          playful: ["Exaggerate how bad it is", "Hold your nose dramatically"],
          bold: ["Say it's honestly disgusting", "Tell him to just admit it"],
          neutral: ["Shrug, say it's fine", "Say nothing about the smell"],
        },
      },
      {
        line: "He holds up two horror movie thumbnails and makes you pick, like your opinion actually counts for something now.",
        approach: "Look them over",
        greeting: "\"Just pick one. It's not a test. ...It's kinda a test.\"",
        responses: {
          kind: ["Pick carefully", "Say you're honored to choose"],
          playful: [
            "Pick the worse one on purpose",
            "Demand a say in everything",
          ],
          bold: ["Pick without hesitation", "Say your taste is better"],
          neutral: ["Pick one, say nothing", "Point at one, unbothered"],
        },
      },
      {
        line: '"Hey, senpai... you\'re not gonna sign me up for something, right?" He sounds legitimately worried.',
        approach: "Say it's nothing bad",
        greeting:
          '"Nothing bad. Okay. That\'s what Haru says right before he hands me a stack of flyers."',
        responses: {
          kind: ["Reassure him it's nothing bad", "Say he can relax"],
          playful: ["Pretend you already did", "Tease him for worrying"],
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
        line: "He actually puts his phone down when you arrive. Doesn't pick it back up, either.",
        approach: "Steal all his attention",
        greeting: "\"Oh, it's you. Yeah, I was hoping you'd show up.\"",
        responses: {
          kind: "Take the attention gladly",
          playful: "Ask what changed",
          bold: "Say you earned it",
          neutral: "Sit, say nothing",
        },
      },
      {
        line: "He shifts over on the couch without looking up. The space is for you.",
        approach: "Take the empty space",
        greeting: '"Sit. I already picked something bad for us to watch."',
        responses: {
          kind: "Take the space gladly",
          playful: "Ask if it's really for you",
          bold: "Sit like it's expected",
          neutral: "Sit without comment",
        },
      },
      {
        line: "\"You're behind on the episodes,\" he says. He's been keeping count for you.",
        approach: "Ask him to catch you up",
        greeting: '"You\'re the one text I actually answer fast."',
        responses: {
          kind: "Tell him that's sweet of him",
          playful: "Ask how far behind",
          bold: "Demand a marathon session",
          neutral: "Nod, let him catch you up",
        },
      },
      {
        line: "He hands you the second controller. He's already set your profile up.",
        approach: "Grab the second controller",
        greeting: '"Second controller\'s charged. No reason. Shut up."',
        responses: {
          kind: "Grin, glad he set it up",
          playful: "Ask when he set it up",
          bold: "Say of course he did",
          neutral: "Take it, say nothing",
        },
      },
      {
        line: "The slouch stays. The attention does not. That's entirely on you now.",
        approach: "Let him watch you instead",
        greeting:
          '"I noticed you before you said anything. That\'s new for me."',
        responses: {
          kind: "Let him watch, unbothered",
          playful: "Ask what he's staring at",
          bold: "Hold his gaze back",
          neutral: "Ignore the staring",
        },
      },
      {
        line: "He's got actual snacks stashed for once, and doesn't even pretend they're for anyone but you.",
        approach: "Steal the good snacks",
        greeting:
          '"You want the good snacks? I hid them. From everyone but you."',
        responses: {
          kind: "Tell him you feel special",
          playful: "Ask who else gets snacks",
          bold: "Take them without asking",
          neutral: "Take a snack, say nothing",
        },
      },
      {
        line: '"Don\'t judge the queue," he says, already scrolling to the next episode before you sit down.',
        approach: "Don't judge the queue",
        greeting: '"Don\'t tell Haru I said that."',
        responses: {
          kind: "Say the queue's fine",
          playful: "Judge the queue anyway",
          bold: "Demand a say in the queue",
          neutral: "Watch without comment",
        },
      },
      {
        line: "He turns the volume down without you asking, so you can actually hear each other over it.",
        approach: "Acknowledge the gesture",
        greeting:
          '"You look wrecked. Sit down, I\'ll find something dumb to watch."',
        responses: {
          kind: "Admit you needed that",
          playful: "Ask if that was on purpose",
          bold: "Say he clearly cares",
          neutral: "Say nothing, keep watching",
        },
      },
      {
        line: "The second the diner shift ends, he's already texting you where he's headed next.",
        approach: "Ask what his plans are",
        greeting:
          "\"I cleared my schedule. I don't have one, but still, it's cleared.\"",
        responses: {
          kind: "Ask to come along",
          playful: "Guess where he's headed",
          bold: "Invite yourself along",
          neutral: "Wait to be asked",
        },
      },
      {
        line: "He holds up the phone to show you an edit he's proud of before you even sit down.",
        approach: "Tell him it's good",
        greeting: "\"You get me. That's rare. I'm not saying it twice.\"",
        responses: {
          kind: "Praise the edit sincerely",
          playful: "Point out a flaw, gently",
          bold: "Say it's his best yet",
          neutral: "Nod, say it's fine",
        },
      },
      {
        line: '"You can have the good blanket," he says, like it\'s not a big deal. It is a big deal.',
        approach: "Take the good blanket",
        greeting: '"You\'re the only reason I show up to house stuff anymore."',
        responses: {
          kind: "Admit it's a big deal to you",
          playful: "Ask what's the catch",
          bold: "Take it like it's owed",
          neutral: "Take it, say nothing",
        },
      },
      {
        line: "He complains about his shift the entire walk over, then doesn't leave once he's here.",
        approach: "Point out he's still here",
        greeting:
          "\"You're allowed to complain to me. I'm good at it. Professional, even.\"",
        responses: {
          kind: "Let him keep complaining",
          playful: "Point out he hasn't left",
          bold: "Call out the excuse",
          neutral: "Let him vent, say nothing",
        },
      },
      {
        line: "He's already memorized your favorite instant noodles toppings. Never once asked.",
        approach: "Let him make it for you",
        greeting:
          "\"Being around you doesn't feel like work. That's the highest compliment I've got.\"",
        responses: {
          kind: "Tell him you're touched",
          playful: "Test what else he's memorized",
          bold: "Say of course he remembers",
          neutral: "Eat it, say nothing",
        },
      },
      {
        line: '"Don\'t make it weird," he says, handing you the controller with your name written on a sticky note stuck to it.',
        approach: "Hold back your grin",
        greeting:
          '"Stop. You\'re doing the face. ...I saved the last plate from the diner, too. Eat it before I change my mind."',
        responses: {
          kind: "Say the note is sweet",
          playful: "Tease him for the sticky note",
          bold: "Keep the note, say so",
          neutral: "Take it, say little",
        },
      },
      {
        line: "He pauses the show without complaint the second you start talking. That never used to happen.",
        approach: "Keep talking",
        greeting: '"Stay for the shift. I\'ll make it less boring. Slightly."',
        responses: {
          kind: "Keep talking gently",
          playful: "Milk the pause for attention",
          bold: "Say he'd rather listen",
          neutral: "Keep talking, unbothered",
        },
      },
      {
        line: '"You\'re late," he says, not looking up, already scooted over to make room.',
        approach: "Apologize for being late",
        greeting: '"Took you long enough. Not that I was counting."',
        responses: {
          kind: "Apologize, mean it a little",
          playful: "Blame the walk over",
          bold: "Say he was clearly counting",
          neutral: "Sit down, say nothing",
        },
      },
      {
        line: "He's rewatching something you both already saw, just because you liked it the first time.",
        approach: "Ask why he's rewatching it",
        greeting:
          '"I watched a movie without you and it felt wrong. Weird, right?"',
        responses: {
          kind: "Say that's sweet, actually",
          playful: "Ask if it's as good again",
          bold: "Say he missed you",
          neutral: "Watch along, say nothing",
        },
      },
      {
        line: "The couch cushion's already dented in the shape of two people. He doesn't mention it. Neither do you.",
        approach: "Sit in the usual spot",
        greeting:
          '"I\'d rather do nothing with you than something with anyone else."',
        responses: {
          kind: "Settle into the usual spot",
          playful: "Point out the dent",
          bold: "Say the spot is yours now",
          neutral: "Sit, say nothing",
        },
      },
    ],
    spark: [
      {
        line: "You fall asleep against his shoulder. He doesn't move for two hours.",
        approach: "Don't move",
        greeting:
          "\"Don't move. You're comfortable. That's... yeah. Don't move.\"",
        responses: {
          kind: "Stay on his shoulder",
          playful: "Wake up, act dramatic about it",
          bold: "Snuggle in deeper",
          neutral: "Pretend you were asleep",
        },
      },
      {
        line: '"You\'re kind of in my space," he says, not moving an inch.',
        approach: "Sit closer",
        greeting:
          '"You can sit closer. Obviously. Why are you making me say it."',
        responses: {
          kind: "Let him off the hook",
          playful: "Out-blank him",
          bold: "Sit closer without asking",
          neutral: "Move over",
        },
      },
      {
        line: "He looks at you during the quiet part of the episode instead of the screen.",
        approach: "Look back at him",
        greeting:
          '"You keep falling asleep on me. I keep letting you. Draw your own conclusions."',
        responses: {
          kind: "Look back gently",
          playful: "Pause it to mess with him",
          bold: "Say it first",
          neutral: "Let the episode run",
        },
      },
      {
        line: "The controller goes down. He's looking at you like the game stopped mattering.",
        approach: "Make him say it",
        greeting:
          '"I said it already. I\'m not saying it twice. ...Fine. I like you."',
        responses: {
          kind: "Let him say it in his own time",
          playful: "Make him say it twice",
          bold: "Make him finish the sentence",
          neutral: "Wait him out quietly",
        },
      },
      {
        line: '"...I like you," he says, flat as a weather report, and goes back to the show.',
        approach: "Stay over",
        greeting: "\"Stay over. Couch is fine. I'm fine. Everything's fine.\"",
        responses: {
          kind: "Say it back, low-key",
          playful: "Deliver it just as flat",
          bold: "Say it back, not flat at all",
          neutral: "Let the show play on",
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
          playful: "Point out the phone",
          bold: "Say that means something",
          neutral: "Share the couch in silence",
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
          playful: "Lose the level for him",
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
          playful: "Make him say it again",
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
      "One earbud comes out for {user}. **{name}** leaves the other in.",
      '"If this is about work, that\'s harassment." **{name}** stays put for {user} anyway, mildly impressed they found him at all.',
      "{user} says the name, and **{name}** pauses the game. Doesn't unpause it, either.",
    ],
    warm: [
      "**{name}** puts the phone down for {user}, and doesn't pick it back up.",
      "\"You're behind on the episodes,\" **{name}** tells {user}, who didn't know he'd been counting.",
      '"It\'s not like I was waiting for you or anything." **{name}** says it to {user} a little too fast.',
    ],
    spark: [
      "\"Second controller's charged.\" **{name}** says it to {user} like it isn't a confession.",
      "{user} says the name, and **{name}** goes very deliberately blank-faced about it.",
      "**{name}** was in the one spot on campus nobody looks. {user} looked.",
    ],
    close: [
      '"Don\'t move. Seriously." **{name}** arrives at {user} and stays exactly there.',
      "**{name}** loses the run because {user} called his name.",
      "{user} calls, and **{name}** pockets the phone and straightens up.",
    ],
    bound: [
      "\"Found me again. Pretty sure that's not luck anymore, Senpai.\" **{name}** doesn't dress it up for {user}.",
      "**{name}** reaches {user} and puts his chin on their shoulder. That was the whole plan.",
      "{user} says the name, and **{name}** decides the **{house}** roster can manage without him.",
    ],
  },
};
