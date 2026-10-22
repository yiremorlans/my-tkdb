export default {
  // The level-up DMs (docs/bond-scene-dms.md). Elias deflects with courtesy the
  // way other people put up a hand — the formality and self-effacement are the
  // armor, and the arc is him letting the mask slip a little further each
  // level. He answers every question about himself with a question about you,
  // so the intimacy is measured in how often that stops working.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Good evening. I hope this isn't strange, writing out of nowhere. There's something I've been meaning to say.",
        "You've passed me on campus {timesMet} times. I've been keeping track, apparently. Every time, you've said good evening to the man with the mop.\n\nMost people don't. They don't see the help, and usually I like it that way.",
        "You mentioned once you don't care for the east path after dark. I take a walk most evenings, nowhere in particular.\n\nOne path's as good as another to me, if you ever wanted the company.",
      ],
      choice: {
        prompt: "That's all of it. More than I meant to say tonight.",
        options: [
          {
            key: "kind",
            label: "Say he's worth knowing",
            style: 3,
            close:
              "Oh, that's kind of you. It isn't quite true, but I'd like it if you kept saying so.",
          },
          {
            key: "playful",
            label: "Ask what took so long",
            style: 1,
            close:
              "I drafted a few versions in my head. This was the least embarrassing one.",
          },
          {
            key: "bold",
            label: "Ask what he used to be",
            style: 4,
            close:
              "What I used to be? I'll leave that to your imagination, for now.\n\nAsk me again when it's later and I'm too tired to mind.",
          },
        ],
      },
      keepsake: {
        emoji: "🍭",
        line: "A wrapped candy left on the step outside your door.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Jo asked why a quick errand took me all afternoon.",
        "I told him the line at the shop was long. He gave me a look and let it slide. I didn't mention you.",
        "You led with {favResponse}, and I lost track of the time. I'm not sure why I kept that part to myself. It just felt like mine.",
      ],
      choice: {
        prompt: "So now you're in on it.",
        options: [
          {
            key: "kind",
            label: "Say you liked the walk",
            style: 3,
            close: "Oh, good. So did I.\n\nMaybe my next errand runs long too.",
          },
          {
            key: "playful",
            label: "Offer to back up his story",
            style: 1,
            close:
              "Please don't. Jo can smell a rehearsed answer.\n\nMine was terrible. He knew.",
          },
          {
            key: "bold",
            label: "Ask why he left you out",
            style: 4,
            close:
              "If I'd told him, he'd have teased me for a week.\n\nThat's most of the reason.",
          },
        ],
      },
      keepsake: {
        emoji: "⏳",
        line: "An afternoon he told Jo was spent in line.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Are you awake? If you don't mind… would you come down to the hall? You don't need to bring anything. It isn't that sort of night.",
        "*There's a record playing, something old and warm, nothing like what Dionysia usually puts on, and the whole hall smells like jambalaya.*\n\n> My mother's recipe. I import half the ingredients from home, and customs and I are on a first-name basis because of the rest. I make it once a year, at two in the morning, when nobody's awake to be polite about it.",
        "> It's my mother's music, and my mother's cooking, and this is the closest I get to New Orleans from here.\n\n*He sets the plate down in front of you and doesn't sit yet.*\n\n> I've done this alone for years. It wasn't a rule, exactly. It simply never occurred to me there was anyone I'd want in the room. Then it occurred to me, and it wouldn't stop occurring to me. So… here we are.",
      ],
      choice: {
        prompt: "…Would you say something? I've made myself nervous.",
        options: [
          {
            key: "kind",
            label: "Ask about his mother",
            style: 3,
            close:
              "*He talks for two hours. No one in this house has ever heard any of it.*\n\n*At the end, quietly, with none of his usual carefulness:*\n\n> I'd like to bring her here one day. I wanted someone to know that. It's the only real plan I have.",
          },
          {
            key: "playful",
            label: "Ask about the customs man",
            style: 1,
            close:
              "> Oh, we're very close now. He knows my name, my face, and my opinion of his paperwork.\n\n> Eat, please, while it's hot. I'll be unbearable if you let it go cold.",
          },
          {
            key: "bold",
            label: "Ask him to dance to it",
            style: 4,
            close:
              "*He looks at you for a long moment over the record player.*\n\n> …I haven't done that in a long time either.\n\n*He does it anyway, slow, unhurried, one hand at your back, the whole thing conducted at perhaps a third of the speed the song is asking for. Neither of you mentions that the record ended some time ago.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎷",
        line: "A record that kept turning long after the song had finished.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: You asked me once what I used to be. I told you to ask again when it was later, and I was tired enough.\n\nIt's later. I'm tired enough.",
        "Captain of Dionysia. For a good while. It isn't a secret, exactly. It's simply something people have agreed to be tactful about, which is worse.\n\nI lost it. Not a scandal, nothing you could put in a report. I simply reached a point where I couldn't keep up, and I let it go on long enough that someone had to say so, out loud, in a room with other people in it.",
        "Jo took it over. He does it better than I ever did, and I mean that entirely.\n\nNow I run his errands. Now and then someone calls me Captain by accident, and the whole hall goes quiet for half a second while everyone decides not to look at me.\n\nI've never said any of this aloud before. A year ago I'd have made a joke of it instead.",
      ],
      choice: {
        prompt:
          "Please, don't be gentle about it. Gentle is all I get from the rest of the house…",
        options: [
          {
            key: "kind",
            label: "Say you'd have followed him",
            style: 3,
            close:
              "*There is a very long silence.*\n\nYou wouldn't have wanted to, *he says.* You'd have gotten a man who was already running out.\n\n*Then, quieter:* …Say it again anyway. I find I'd like to hear it a second time, and I'm not proud of that.",
          },
          {
            key: "playful",
            label: "Call him Captain on purpose",
            style: 1,
            close:
              "*The reply takes a while.*\n\nHehe. Bad kid. And I'm very fond of you.\n\n…Do it again sometime, where people can hear. I'd like to see what happens too.",
          },
          {
            key: "bold",
            label: "Ask if he wants it back",
            style: 4,
            close:
              "No.\n\n*Then, after a pause:* That was too quick, wasn't it. Let me try again.\n\nNo. But I would like to be something again, one day. I hadn't let myself want that in about three years, until you started asking me questions.",
          },
        ],
      },
      keepsake: {
        emoji: "🗝️",
        line: "The door he said he'd open some time when it was later.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You're all right. I already know you are, I checked twice. This message is just for my own sake.",
        "There was an incident in the lower hall tonight, and I went at it, and… I was slow. Not disastrously so. Slow. There was a time it would have taken me twenty seconds. Tonight it took four minutes, and I felt every one of them.\n\nThat's the fear I don't say aloud. Not dying. Being the man who used to be able to.",
        "And here is what I actually meant to tell you, plainly, and then I'll go to bed.\n\nI went at it anyway. Didn't weigh it, didn't count the odds, didn't think about my knees. You were on the other side of that hall, and three years of being careful went straight out the window.\n\nI'd been treasuring the quiet. Dreading the day it ended. It seems I'd take it ending over having you on the far side of a bad hall.",
      ],
      choice: {
        prompt: "Tell me something true… It's been a long night.",
        options: [
          {
            key: "kind",
            label: "Tell him he wasn't slow",
            style: 3,
            close:
              "Now you're only being kind to me.\n\n…Be kind to me. Just tonight. I'll be sensible again in the morning, and you can go back to being honest.",
          },
          {
            key: "playful",
            label: "Say four minutes is a brag",
            style: 1,
            close:
              "Four minutes is *showing off.*\n\nI'm going to be repeating that to myself for a week, and I want you to know precisely what you've done.",
          },
          {
            key: "bold",
            label: "Go down to the hall",
            style: 4,
            close:
              "*He's sitting on the bottom step with his hands shaking, which he would never in his life have let anyone see.*\n\n*He doesn't reach for a joke. He simply holds out a hand, and when you take it, he pulls you down onto the step beside him and leans his whole weight into you, and stays there a long while.*\n\n> Don't say anything.\n\n*he says quietly.*\n\n> Just sit here. That's all I want.",
          },
        ],
      },
      keepsake: {
        emoji: "🕰️",
        line: "Four minutes he'll be counting for a long time.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: I'm going to try to say this without any of my usual deflecting, which you'll find is harder than it sounds.",
        "{timesMet} times. Every one of them, you've said good evening to a man with a mop, and never once asked him to be anything grander.\n\nYou have no idea what that is, to someone who used to be grander. Or perhaps you do, and you've simply been kind enough never to say so.",
        "I've spent three years treasuring quiet days and dreading the end of them. That isn't peace. That's only fear with the lights turned low. I've known that for a while, and I've done nothing about it, because doing something about it would mean wanting something, and anyone who wants something can lose it.",
        "So. Here is me, wanting something.\n\nI love you. I have for a long while now, since before that night in the kitchen, if I'm honest, and I've been meaning to be honest about it for months.\n\nI'm not asking you to do anything about it. I'm just done choosing nothing over the risk of losing something. That's the whole of my message, and it took me four cups of coffee to get here.",
      ],
      choice: {
        prompt: "Take your time. I have nothing but.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*The reply is one word:* Kitchen.\n\n*The record is already playing when you arrive, the same one, and he's standing in the middle of the floor with his hands in his pockets, looking younger than he is.*\n\n> Come here.\n\n*he says, quiet and entirely without his usual carefulness. He gets both arms around you and holds on like a man who has been standing very still for a very long time, and has finally been told he can stop.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. That's the right answer, and I mean that.\n\nIt took me a very long time to work up to one sentence. It would be a poor sort of man who handed it over and started a clock.\n\nThere will be candy on your sill Tuesday, same as always, and I'll still wish you good evening in the west corridor. None of it was ever a down payment on anything. It was only ever me, glad you were there.",
          },
        ],
      },
      keepsake: {
        emoji: "🍬",
        line: "The night he chose wanting something over keeping nothing.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He's winding a string of festival lights around one arm, in no hurry about it. \"Oh, I don't think I've seen you around here before.\"",
        approach: "Play along",
        greeting:
          '"You\'ve arrived at just the right time. Would you mind holding this end for me?"',
        responses: {
          kind: ["Offer to hold the other end", "Help him wind the lights"],
          playful: [
            "Ask if this is how he says hi",
            "Ask if he'll remember you now",
          ],
          bold: [
            "Take half the lights from him",
            "Say he'll be seeing you more",
          ],
          neutral: ["Say you're new here", "Watch him wind them"],
        },
      },
      {
        line: 'His careful courtesy arrives a good second before he does. "Oh, are you lost? This part of campus is a little out of the way."',
        approach: "Admit you're lost",
        greeting: '"Keep left. You\'ll find your way back."',
        responses: {
          kind: ["Say you're glad it was him", "Ask if you can walk with him"],
          playful: ["Ask if he gets lost too", "Say out of the way suits you"],
          bold: ["Say you meant to find him", "Ask what he's doing out here"],
          neutral: ["Nod and walk on", "Say nothing, keep going"],
        },
      },
      {
        line: "A lollipop stick shifts from one corner of his mouth to the other. He's leaning where he shouldn't be, doing nothing with real dedication.",
        approach: "Ask if he could help you",
        greeting:
          '"I was just taking a walk around campus. For my health, of course."',
        responses: {
          kind: ["Keep him company a minute", "Say it's a good spot for it"],
          playful: ["Ask what flavor it is", "Tease him about slacking"],
          bold: ["Lean beside him", "Ask for a lollipop too"],
          neutral: ["Leave him to it", "Ask if he's busy"],
        },
      },
      {
        line: "He's between errands, and in no particular rush to reach the next one.",
        approach: "Ask who they're for",
        greeting:
          '"For Jo. Lights today, something else tomorrow. It keeps me out of trouble, mostly."',
        responses: {
          kind: [
            "Say it's nice to run into him",
            "Say you only want the company",
          ],
          playful: ["Bet he's taking the long way", "Ask how many he's done"],
          bold: ["Ask where he's headed next", "Say you'll run one with him"],
          neutral: ["Nod, file it away", "Let him get back to it"],
        },
      },
      {
        line: "The smile comes slow and lands just right, warm, unhurried, and a half-second too practiced.",
        approach: "Let him go on ahead",
        greeting:
          '"Sorry… I\'m a little short on time. Would you mind if I went on ahead?"',
        responses: {
          kind: ["Return the smile", "Say you'll catch him later"],
          playful: [
            "Ask if that smile's for you",
            "Ask if he's up to something",
          ],
          bold: ["Hold his gaze", "Ask what he's late for"],
          neutral: ["Nod back at him", "Step aside for him"],
        },
      },
      {
        line: '"Sweep\'s already done, don\'t mind me." He\'s leaning on the broom instead of using it. "Old habit. Hard to break."',
        approach: "Ask about the old habit",
        greeting: '"Oh, it\'s nothing. I just like things tidy."',
        responses: {
          kind: ["Say the floor looks spotless", "Say he did a good job"],
          playful: ["Ask if he does windows", "Book him for your room next"],
          bold: ["Say the courtyard's next", "Say you've got a job for him"],
          neutral: ["Let him talk", "Stand with him a while"],
        },
      },
    ],
    known: [
      {
        line: "The charm's still running, just dialed down to something that costs him less.",
        approach: "Say hi anyway",
        greeting:
          "\"Oh, it's you again… I don't mind the interruption, honestly.\"",
        responses: {
          kind: ["Ask if he's having a slow day", "Say you'll keep it short"],
          playful: [
            "Ask if he's off the clock",
            "Offer him a candy for energy",
          ],
          bold: ["Stay as long as he lets you", "Take the spot beside him"],
          neutral: ["Let it slide", "Say nothing about it"],
        },
      },
      {
        line: 'He hands you a soda he bought "for the dorm" and doesn\'t make anything of it.',
        approach: "Take the soda",
        greeting: "\"Oh, don't mention it. Really, the dorm won't notice.\"",
        responses: {
          kind: [
            "Say you'll get the next one",
            "Say it's just what you needed",
          ],
          playful: ["Toast the dorm", "Ask if you count as the dorm"],
          bold: ["Claim the dorm's share", "Say he planned this"],
          neutral: ["Take the soda, say nothing", "Drink it without comment"],
        },
      },
      {
        line: "He's holding something wrapped in cloth that's the wrong shape for a parcel. \"Shion asked me to hold onto it. I wouldn't look, if I were you.\"",
        approach: "Don't even ask",
        greeting:
          '"Oh, not even a little curious? …Good. I\'ve been trying very hard not to be."',
        responses: {
          kind: ["Say you'll take his word", "Offer to keep him company"],
          playful: ["Ask if he's peeked yet", "Admit you're a little curious"],
          bold: ["Say you'd look, in his place", "Stand right next to it"],
          neutral: [
            "Keep your eyes off the cloth",
            "Change the subject for him",
          ],
        },
      },
      {
        line: "For once he doesn't dress it up. \"I forgot Jo's errand. Completely.\"",
        approach: "Ask what the errand was",
        greeting: "\"Oh, it'll come to me. Eventually, I'm sure.\"",
        responses: {
          kind: ["Help him retrace his steps", "Say Jo will understand"],
          playful: ["Call it a perfect record", "Bet Jo already knows"],
          bold: ["Say you'll cover for him", "Say you'll jog his memory"],
          neutral: ["Nod and let it stand", "Give him a moment"],
        },
      },
      {
        line: "Jo sent you to check on him. He's only just up, and in no hurry to be more up than that.",
        approach: "Tell him Jo's asking",
        greeting: '"Oh, is it that late already? …Tell him I\'m on my way."',
        responses: {
          kind: ["Say there's no rush", "Offer to fetch him a coffee"],
          playful: ["Ask if Shion's up yet", "Say Jo's timing him"],
          bold: ["Say Jo can wait a minute", "Say you'll walk him down"],
          neutral: ["Wait by the door", "Let him wake up"],
        },
      },
      {
        line: 'You\'re talking with him when a returning Dionysia student passes, says "Captain" out of old habit, then catches themself.',
        approach: "Ask what they meant",
        greeting:
          '"Oh no, I\'m nothing special. I just handle the odd jobs around here."',
        responses: {
          kind: ["Hide a smile", "Talk about anything else"],
          playful: [
            "Ask what you should call him",
            "Ask if he gets that a lot",
          ],
          bold: ["Ask him to finish his story", "Keep your eyes on him"],
          neutral: ["Let the rumor pass", "Change the subject"],
        },
      },
      {
        line: "He's sweeping a stretch of hallway that was already spotless the last time you passed it.",
        approach: "Ask how the sweeping's going",
        greeting:
          "\"Oh, it's going. You do keep passing this way, don't you…\"",
        responses: {
          kind: ["Walk the hallway with him", "Say you were just passing by"],
          playful: [
            "Ask if this spot's extra dirty",
            "Ask if he's guarding the hall",
          ],
          bold: ["Say you came this way for him", "Ask why he's really here"],
          neutral: ["Let him keep sweeping", "Say nothing, walk on"],
        },
      },
      {
        line: "He offers you the last of his candy without checking what flavor's left.",
        approach: "Take the last piece",
        greeting: "\"I don't mind the company, if you're offering it.\"",
        responses: {
          kind: ["Say it's your favorite", "Stay for the company"],
          playful: ["Guess the flavor first", "Ask for his favorite flavor"],
          bold: ["Hold out your hand for more", "Eat it right in front of him"],
          neutral: ["Take it, say nothing", "Eat it without comment"],
        },
      },
      {
        line: 'He notices you a beat late. "Oh, I was lost in thought… I didn\'t even realize you were here."',
        approach: "Ask what he was thinking about",
        greeting: '"Home, mostly."',
        responses: {
          kind: ["Say you don't mind the quiet", "Ask if he's all right"],
          playful: [
            "Ask if he found his way back",
            "Say you've been here ages",
          ],
          bold: ["Pull him back to the present", "Wave right in front of him"],
          neutral: ["Let him keep the thought", "Don't press for more"],
        },
      },
      {
        line: "He's still pretending he wasn't waiting for you to walk by, and not working very hard at it.",
        approach: "Slow down as you pass",
        greeting: '"Oh, what a coincidence."',
        responses: {
          kind: ["Play along with him", "Stop and stay a while"],
          playful: ["Say what are the odds", "Ask if he comes here often"],
          bold: ["Say you hoped he'd be here", "Say you took the long way"],
          neutral: ["Nod as you pass", "Say nothing about it"],
        },
      },
      {
        line: 'He catches you studying him and only smiles. "Something on your mind?"',
        approach: "Ask who he really is",
        greeting: '"My true self…? Heh. I\'ll leave that to your imagination."',
        responses: {
          kind: ["Say it can wait", "Say you're just glad he's here"],
          playful: ["Pretend you weren't looking", "Ask what he thinks it is"],
          bold: ["Say he's on your mind", "Say you're curious about him"],
          neutral: ["Let it go unremarked", "Say it's nothing"],
        },
      },
      {
        line: "He's got one of his newspapers open, reading it front to back.",
        approach: "Ask what he's reading",
        greeting:
          '"Oh, just one of the papers I subscribe to… Did you need something from me?"',
        responses: {
          kind: ["Say you just came to visit", "Ask if he reads every day"],
          playful: ["Read over his shoulder", "Ask for the gossip column"],
          bold: ["Fold the paper down", "Ask to borrow it after"],
          neutral: ["Let him read", "Glance at the headlines"],
        },
      },
      {
        line: '"As for missions… honestly, I\'ve had a gap, even as a circus troupe member," he admits. "I\'m worried I\'ll hold everyone back."',
        approach: "Tell him you'd have his back",
        greeting:
          '"Oh, that\'s kind of you… I still need to get my groove back, though."',
        responses: {
          kind: ["Say you'd be glad to have him", "Offer to practice with him"],
          playful: ["Ask for a circus trick", "Bet he's less rusty than that"],
          bold: ["Sign him up for the next one", "Say he'll keep up, period"],
          neutral: ["Let the doubt pass", "Say nothing, stay put"],
        },
      },
    ],
    warm: [
      {
        line: 'He falls into step beside you, and the easy smile goes real for a second. "Seeing you makes my day."',
        approach: "Slow down for him",
        greeting: '"Oh, good. Walk with me a while? I\'m in no hurry."',
        responses: {
          kind: ["Say he makes your day too", "Ask where he's headed"],
          playful: ["Ask who else makes his day", "Ask who else hears that"],
          bold: ["Pick the long way around", "Say the whole walk's yours"],
          neutral: ["Keep walking beside him", "Let the moment pass"],
        },
      },
      {
        line: '"Jo told me to take the afternoon off. I don\'t quite know what to do with it… Any ideas?"',
        approach: "Help him spend it",
        greeting:
          '"Would that be alright? …Then I\'m in your hands for the afternoon."',
        responses: {
          kind: ["Say you know a good spot", "Ask what he'd like to do"],
          playful: [
            "Suggest doing nothing at all",
            "Plan something ridiculous",
          ],
          bold: ["Say you've got a plan", "Claim his whole afternoon"],
          neutral: ["Nod and start walking", "Go along with it"],
        },
      },
      {
        line: "He's fitting lengths of bamboo together. \"Shion wants to do nagashi somen, so I figured I'd start setting it up.\"",
        approach: "Watch him set up",
        greeting: '"Slow work… Would you join us once it\'s ready?"',
        responses: {
          kind: ["Say you'd love to join", "Offer to help set up"],
          playful: [
            "Ask if Shion's lending a hand",
            "Call dibs on the first noodles",
          ],
          bold: ["Say you'll stay till it's done", "Take the other end of it"],
          neutral: ["Watch quietly", "Hand him the next piece"],
        },
      },
      {
        line: "\"It's a beautiful day for a stroll. Shion stepped out earlier too, though I'm not sure where he went.\"",
        approach: "Linger a moment",
        greeting: '"Should I tell him you stopped by?"',
        responses: {
          kind: ["Say it's him you hoped to see", "Ask if he'd take a stroll"],
          playful: ["Say Shion can wait", "Ask if he's free instead"],
          bold: ["Say you came looking for him", "Say you weren't after Shion"],
          neutral: ["Say no need to tell him", "Let Shion stay lost"],
        },
      },
      {
        line: '"I hear they\'re holding some kind of midnight dare here in Dionysia tomorrow night. Are you joining in the fun?"',
        // A mischievous mood: daring him back lands, earnest company less so.
        mood: true,
        approach: "Ask if he's going",
        greeting: '"Joining in? Hehe. Only if you\'re the one daring me."',
        responses: {
          kind: ["Say you'll watch with him", "Ask if he ever joined in"],
          playful: ["Dare him to join", "Double-dare him"],
          bold: ["Say you'll go if he does", "Say you'll be there"],
          neutral: ["Think it over", "Say you might"],
        },
      },
      {
        line: '"A nice smell is coming from the living tent… Is that jambalaya? Jo\'s in charge of dinner tonight."',
        approach: "Join them for dinner",
        greeting: '"Oh, you came. Here, I saved you a bowl."',
        responses: {
          kind: ["Say you'd love a bowl", "Say you'll eat with him"],
          playful: ["Ask what's in the jambalaya", "Ask for the biggest bowl"],
          bold: ["Say you'd have come anyway", "Say it reminds you of him"],
          neutral: ["Join without comment", "Follow him to the tent"],
        },
      },
      {
        line: '"Jo should be in the office. Mio should be in the workshop. And Shion seems to still be in his room. Who did you need?"',
        // A light, teasing mood: playing along with the bit lands, earnest answers less so.
        mood: true,
        approach: "Point at him",
        greeting: '"Oh. Me? …Well. That\'s a nice surprise."',
        responses: {
          kind: ["Say you just wanted to see him", "Ask if he has a minute"],
          playful: [
            "Ask if he's free for you",
            "Say he's the best on the list",
          ],
          bold: ["Say it's always him", "Claim the next hour"],
          neutral: ["Nod and stay", "Shrug and smile"],
        },
      },
      {
        line: "He's making coffee for the dorm again. He fixes one cup differently from the rest and slides it over to you.",
        approach: "Take the cup",
        greeting: "\"Oh, did I get it right? I wasn't sure I'd remembered.\"",
        responses: {
          kind: ["Say he got it just right", "Say you're glad he remembered"],
          playful: ["Ask what else he remembers", "Ask how he knew"],
          bold: ["Say only he gets it right", "Say you'll make his next"],
          neutral: ["Drink it quietly", "Hold the warm cup"],
        },
      },
      {
        line: "The dorm has gone quiet. He's in the common room with the lamp turned low and a pitcher of sweet tea, two glasses poured, one of them untouched.",
        // A restless late-night mood: light teasing lands, earnest concern less so.
        mood: true,
        approach: "Admit you can't sleep",
        greeting:
          '"…You can\'t sleep? In that case… Would you keep me company for just one drink?"',
        responses: {
          kind: ["Stay for just one", "Ask why he's still up"],
          playful: ["Ask who the glass was for", "Ask if it's decaf"],
          bold: ["Say you'll stay for two", "Take the untouched glass"],
          neutral: ["Drink with him quietly", "Share the quiet"],
        },
      },
      {
        line: "He's bundled up more than anyone else in the courtyard. \"Where I'm from, it does cool down in the winter, but it's not nearly as cold as this… I guess I haven't quite adjusted yet.\"",
        approach: "Say it's a crisp morning",
        greeting: "\"You don't seem to mind it at all. I'm a little jealous.\"",
        responses: {
          kind: ["Offer him your scarf", "Ask about winters back home"],
          playful: ["Ask how many layers he's in", "Say he looks cozy"],
          bold: ["Walk on his windy side", "Say you'll keep him warm"],
          neutral: ["Walk on together", "Let him stay bundled"],
        },
      },
      {
        line: '"Last night, Jo and I talked until late for the first time in a while, so… I\'m a little sleep-deprived."',
        approach: "Look curious",
        greeting: '"What we talked about? Secret."',
        responses: {
          kind: ["Say you're glad they talked", "Say he should rest a bit"],
          playful: ["Ask if it was about you", "Promise not to ask Jo"],
          bold: ["Say secrets suit him", "Say you'll wait till he tells"],
          neutral: ["Let him keep it", "Nod and leave it"],
        },
      },
      {
        line: 'Haru vaults a bench at the far end of the courtyard. Elias watches him land it. "He used to be one of ours, you know."',
        approach: "Ask about Haru",
        greeting:
          '"The best acrobat Dionysia had… He still moves like it, doesn\'t he?"',
        responses: {
          kind: ["Ask about Dionysia back then", "Ask if he misses those days"],
          playful: [
            "Ask if Haru knows he's a fan",
            "Ask if he could do that too",
          ],
          bold: [
            "Say you want his story instead",
            "Say you'd have come to watch",
          ],
          neutral: ["Watch Haru with him", "Let the memory sit"],
        },
      },
      {
        line: 'He takes one look at you. "You look worn out… Is there anything I can take off your hands?"',
        approach: "Say you're fine",
        greeting:
          '"Is that so? …Really, it\'s no trouble. Leave a few things to me."',
        responses: {
          kind: ["Admit you're a little tired", "Say just asking helps"],
          playful: ["Ask what he charges", "Ask if Jo lends him out"],
          bold: ["Ask him to stay instead", "Say you'd rather have him"],
          neutral: ["Let out a breath", "Nod and slow down"],
        },
      },
      {
        line: "\"Jo headed out for a jog this morning. Said it was perfect weather for it. I don't think I've got it in me.\"",
        approach: "Ask if he'd ever join him",
        greeting: '"Me? Oh, no… I\'ll cheer him on from here."',
        responses: {
          kind: ["Say you'll stay in with him", "Say walking counts too"],
          playful: [
            "Ask if he'd jog for sweets",
            "Bet he'd win with a head start",
          ],
          bold: ["Say you'll jog if he does", "Say you'll cheer with him"],
          neutral: ["Watch Jo's route", "Let Jo run alone"],
        },
      },
      {
        line: "A tin of sweets from home sits open between you. He nudges it an inch closer every time you look at it.",
        approach: "Take one from the tin",
        greeting:
          '"I import them from home… Believe it or not, I\'ve got a soft spot for sweets."',
        responses: {
          kind: ["Ask what home is like", "Ask what they're called"],
          playful: ["Ask which ones are best", "Ask if he's hiding a stash"],
          bold: ["Pick one out for him", "Say you'll split the tin"],
          neutral: ["Eat it quietly", "Nudge the tin back"],
        },
      },
      {
        line: '"Everyone seems lively today. How wonderful. I only hope these peaceful days can last forever…"',
        approach: "Wait for the rest",
        greeting: '"That\'s all. Days like this are enough for me."',
        responses: {
          kind: ["Say you hope so too", "Stay and enjoy it with him"],
          playful: ["Say forever's a long time", "Say he's easy to please"],
          bold: ["Say they're better with you", "Say you'll make tomorrow one"],
          neutral: ["Let the day go on", "Watch everyone with him"],
        },
      },
      {
        line: "\"You weren't around yesterday,\" he says, the way he'd mention the weather.",
        approach: "Ask if he missed you",
        greeting: '"Missed you? Hehe. Now, that would be telling."',
        responses: {
          kind: ["Say you missed him too", "Ask what you missed"],
          playful: [
            "Say you'll take that as yes",
            "Ask if he was keeping count",
          ],
          bold: ["Say you won't miss another", "Say you'll stay all day today"],
          neutral: ["Let it stay untold", "Smile and leave it"],
        },
      },
      {
        line: "The troupe is rehearsing in the big tent. He watches from the back row, near enough to belong and far enough not to join.",
        approach: "Sit in the back row too",
        greeting:
          "\"Oh, I'm better as an audience these days… Stay, and we'll clap at the right parts.\"",
        responses: {
          kind: ["Ask if he misses the stage", "Stay and watch with him"],
          playful: ["Clap at the wrong parts", "Bet he still knows every cue"],
          bold: ["Clap louder than anyone", "Ask to come back tomorrow"],
          neutral: ["Watch the rehearsal", "Sit and say nothing"],
        },
      },
    ],
    spark: [
      {
        line: "He takes the sucker out of his mouth and, for once, doesn't reach for a line to fill the quiet.",
        approach: "Enjoy the quiet",
        greeting: "\"Now, I've been real patient. I'd like that noted.\"",
        responses: {
          kind: "Say it's been noted",
          playful: "Make him be patient longer",
          bold: "Break the quiet yourself",
          neutral: "Leave him guessing",
        },
      },
      {
        line: "He tips your chin up with two fingers and forgets to make a joke of it.",
        approach: "Say yes",
        greeting:
          '"No coin, no trick, no angle. Just me asking. Say yes or say no."',
        responses: {
          kind: "Say yes, no angle either",
          playful: "Make him work for the yes",
          bold: "Tell him not to behave",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: '"I\'ve run clean out of angles with you," he says. "That\'s a first."',
        approach: "Call it a first",
        greeting: '"You look at me like you\'ve already decided. Have you?"',
        responses: {
          kind: "Say the angle was never needed",
          playful: "Turn his own line back on him",
          bold: "Say you already decided",
          neutral: "Step around him",
        },
      },
      {
        line: "He's done playing the long game. What's left is a good deal more direct.",
        approach: "Make up your mind",
        greeting: "\"I'd behave, but you don't seem to want me to.\"",
        responses: {
          kind: "Say you don't want him to",
          playful: "Make him work even harder",
          bold: "Make up your mind for him",
          neutral: "Let the question hang",
        },
      },
      {
        line: "He holds the door, then leans across it, then grins at his own foolishness.",
        approach: "Lean in the doorway too",
        greeting: '"Well, look at the two of us. Neither one going anywhere."',
        responses: {
          kind: "Let him have the moment",
          playful: "Lean back just as far",
          bold: "Block the door yourself",
          neutral: "Hold the door, say nothing",
        },
      },
      {
        line: '"Come here. I\'m done being clever about it."',
        approach: "Come here",
        greeting:
          '"There you are. That\'s all I was working up to. Took me long enough."',
        responses: {
          kind: "Take his hand",
          playful: "Make him work for this too",
          bold: "Come here first",
          neutral: "Come without a word",
        },
      },
      {
        line: "\"I don't dislike quiet nights. If anything, I'm used to them… But right now, I feel… a little unsatisfied.\"",
        approach: "Ask what's missing",
        greeting: '"…Hm. I think you already know."',
        responses: {
          kind: ["Say you'll stay up with him", "Say the night's not over"],
          playful: ["Pretend you have no idea", "Ask him to spell it out"],
          bold: ["Say you might, at that", "Step a little closer"],
          neutral: ["Let the quiet answer", "Hold his gaze"],
        },
      },
    ],
    close: [
      {
        line: '"Wasn\'t planning on caring about anybody," he admits, quiet. "You went and changed that."',
        approach: "Sit a while with him",
        greeting:
          '"You\'ve gone and become my favorite person in this place. Figured you should know."',
        responses: {
          kind: "Say you liked him anyway",
          playful: "Play his game back",
          bold: "Name what you both know",
          neutral: "Watch what he's really doing",
        },
      },
      {
        line: "The lollipop stays in his pocket. He's got nothing to keep your eyes busy with, and doesn't want one.",
        approach: "Notice the empty hands",
        greeting: '"No tricks tonight. Just me. Try not to look so surprised."',
        responses: {
          kind: "Tell him the act can come off",
          playful: "Steal the lollipop",
          bold: "Say tricks were never needed",
          neutral: "Let him have the quiet",
        },
      },
      {
        line: '"Ask me anything," he says. "I\'ll even tell you true. Novel, isn\'t it."',
        approach: "Ask him for the truth",
        greeting:
          '"I\'ve lied to everyone in this house. Not to you. Not once that mattered."',
        responses: {
          kind: "Believe him without proof",
          playful: "Out-charm him",
          bold: "Say you're not a mark",
          neutral: "Take him at his word quietly",
        },
      },
      {
        line: "He says your name without any of his usual polish. It sounds like a different man saying it.",
        approach: "Say his name plain",
        greeting:
          '"Stay a while, would you? The quiet\'s easier with you in it."',
        responses: {
          kind: "Say his real voice suits him",
          playful: "Point out the missing polish",
          bold: "Say his name back the same way",
          neutral: "Sit through the silence",
        },
      },
      {
        line: "For once he lets you see how much of the easy charm was armor.",
        approach: "Stay through the quiet",
        greeting:
          '"I used to be someone here. With you I don\'t have to be anyone."',
        responses: {
          kind: "Ask what he's really after",
          playful: "Tease the armor metaphor",
          bold: "Say you'll keep him anyway",
          neutral: "Let him keep his guard down",
        },
      },
      {
        line: '"My true self?" The old deflection starts up, then stalls. "...You\'ve seen most of it by now. Don\'t go telling anyone."',
        approach: "Admit you've seen it",
        greeting:
          '"Heh. Figured you had. ...You didn\'t run, so I suppose I can quit hiding the rest."',
        responses: {
          kind: "Say you like what you've seen",
          playful: "Promise to keep it a secret",
          bold: "Say you see all of him now",
          neutral: "Let him keep what's left",
        },
      },
    ],
    bound: [
      {
        line: "No angles, no coin, no charm. Just him, which turns out to be the dangerous part.",
        approach: "Check his hands",
        greeting: '"I love you. No trick in it. Check my hands if you like."',
        responses: {
          kind: "Take his hands",
          playful: "Check his hands anyway",
          bold: "Say this is the dangerous part",
          neutral: "Take it in, say nothing",
        },
      },
      {
        line: "He says your name in the dark, unhurried, and it is genuinely unfair.",
        approach: "Say it slower",
        greeting: '"Say my name like that again. Slower."',
        responses: {
          kind: "Say it back",
          playful: "Say his name wrong on purpose",
          bold: "Say his name slower",
          neutral: "Let him talk",
        },
      },
      {
        line: '"Spent years being nobody\'s," he says, low. "Turns out I\'m yours. Who\'d have thought."',
        approach: "Say you're his too",
        greeting:
          '"Yours and mine. Hm. Got a nice sound to it. Say it again, would you?"',
        responses: {
          kind: "Tell him he's someone's now",
          playful: "Call the bluff one more time",
          bold: "Claim him right back",
          neutral: "Turn over",
        },
      },
      {
        line: "He kisses slow, like a man with nowhere pressing to be and no wish to be anywhere else.",
        approach: "Come back to bed",
        greeting: '"Come back to bed. Everything else can wait on us."',
        responses: {
          kind: "Melt into the slow kiss",
          playful: "Ask what the rush was ever for",
          bold: "Pull him back down",
          neutral: "Let it stay unhurried",
        },
      },
      {
        line: "He's quit performing altogether. It cost him something. He'd pay it twice.",
        approach: "Notice what it cost him",
        greeting: '"Got nothing left to hide behind. Suits me fine."',
        responses: {
          kind: "Notice what it cost him",
          playful: "Tease him for finally quitting",
          bold: "Tell him to make it worth it",
          neutral: "Let him just be, quietly",
        },
      },
      {
        line: '"Hope this quiet lasts," he says into your hair. "First time I\'ve wanted something to."',
        approach: "Stay",
        greeting: '"Stay. I\'ll make it worth the morning."',
        responses: {
          kind: "Hope it lasts too",
          playful: "Tease him for wanting that",
          bold: "Promise him it will",
          neutral: "Let the morning come",
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
        line: '**{name}** hears {user} coming and turns with a polite smile. "Oh, it\'s you. I thought I heard someone."',
        responses: {
          kind: "Say sorry for sneaking up",
          playful: "Ask who else he expected",
          bold: "Say he's easy to find",
        },
      },
      {
        line: '{user} calls his name, and **{name}** shifts the lollipop to the other cheek. "Oh, you called me?"',
        responses: {
          kind: "Ask how his day's going",
          playful: "Ask what flavor it is",
          bold: "Ask why he took so long",
        },
      },
      {
        line: "{user} finishes a conversation and turns to find **{name}** wiping down the window right behind them. \"Oh, don't mind me. I didn't hear a thing.\"",
        responses: {
          kind: "Say you don't mind him at all",
          playful: "Ask how much he didn't hear",
          bold: "Say you'd have told him anyway",
        },
      },
      {
        line: '**{name}** looks up from cleaning, mildly surprised to see {user}. "Oh, hello. Did you need something?"',
        responses: {
          kind: "Offer him a hand with it",
          playful: "Ask what he's heard about you",
          bold: "Say it's clean enough",
        },
      },
    ],
    known: [
      {
        line: "{user} calls his name, and **{name}** turns with a smile that comes quicker than it used to. \"Oh, why, if it isn't you. I'm happy to see you again today.\"",
        responses: {
          kind: "Say you're glad too",
          playful: "Ask if he practiced that",
          bold: "Say you'll make it every day",
        },
      },
      {
        line: '{user} waves hello, and **{name}** smiles like he wasn\'t waiting. "Oh, what a coincidence."',
        responses: {
          kind: "Say it's a nice one",
          playful: "Say you planned it",
          bold: "Ask if he was waiting",
        },
      },
      {
        line: "\"You have a knack for finding me, don't you?\" **{name}** tells {user}, and doesn't sound like he minds.",
        responses: {
          kind: "Say you like finding him",
          playful: "Ask if he's been hiding",
          bold: "Ask why he's hard to find",
        },
      },
    ],
    warm: [
      {
        line: '"Oh, it\'s you. Good. The day just got better," **{name}** says, and {user} can tell he means it.',
        responses: {
          kind: "Say yours did too",
          playful: "Ask how much better",
          bold: "Say you came to find him",
        },
      },
      {
        line: '{user} asks if **{name}** is busy. "Oh, just an errand for Jo. It can wait a little… He won\'t mind."',
        responses: {
          kind: "Say you won't keep him long",
          playful: 'Ask how long "a little" is',
          bold: "Say you'll take the blame",
        },
      },
      {
        line: "**{name}** offers {user} a candy before he says hello.",
        responses: {
          kind: "Take the candy, say hi",
          playful: "Ask for his favorite one",
          bold: "Ask where the hello went",
        },
      },
    ],
    spark: [
      {
        line: "\"Keep that up and I'll start to think you like me.\" **{name}** smiles at {user} like it's a secret.",
        responses: {
          kind: "Say maybe you do",
          playful: "Ask what gave it away",
          bold: "Say he should think it",
        },
      },
      {
        line: "{user} says hi, and **{name}**'s easy smile goes real for a second.",
        responses: {
          kind: "Smile back at him",
          playful: "Ask where the real one went",
          bold: "Ask to see it again",
        },
      },
      {
        line: "**{name}** takes his time getting to {user}.",
        responses: {
          kind: "Let him take his time",
          playful: "Ask if he's racing",
          bold: "Tell him to hurry",
        },
      },
    ],
    close: [
      {
        line: '"Oh, it\'s you… Walk with me a while?" **{name}** falls in beside {user} like the errand never existed.',
        responses: {
          kind: "Walk with him",
          playful: "Ask about the errand",
          bold: "Say you'll pick the way",
        },
      },
      {
        line: "**{name}** drops the charm the moment it's {user}.",
        responses: {
          kind: "Say you like him better",
          playful: "Ask where the charm went",
          bold: "Say you saw it drop",
        },
      },
      {
        line: "{user} calls, and **{name}** stops working the room entirely.",
        responses: {
          kind: "Say you have him to yourself",
          playful: "Ask who he was working",
          bold: "Say the room can wait",
        },
      },
    ],
    bound: [
      {
        line: '"I\'d gotten used to belonging to no one…" **{name}** tells {user}, low. "It seems I\'m yours now."',
        responses: {
          kind: "Say you're his too",
          playful: "Ask when it happened",
          bold: "Say he always was",
        },
      },
      {
        line: "**{name}** says {user}'s name back, unhurried.",
        responses: {
          kind: "Say his name back",
          playful: "Ask him to say it again",
          bold: "Ask why so slow",
        },
      },
      {
        line: "{user} catches up with **{name}**, and he leaves the **{house}** errands for another day.",
        responses: {
          kind: "Say the errands can wait",
          playful: "Ask if Jo will notice",
          bold: "Say Jo will notice",
        },
      },
    ],
  },
};
