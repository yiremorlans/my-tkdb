export default {
  // The level-up DMs (docs/bond-scene-dms.md). Lyca is still learning to read
  // and is not tech-savvy, so his messages are short and phonetically spelled.
  // He reads people by scent, so he always knows before you tell him, and the
  // bite scars on his arms are what he is most afraid of you seeing.
  //
  // Per reference.md's "## Bond Scenes" notes he does not type in all-lowercase:
  // sentence starts and "I" get a capital even though the spelling stays rough
  // ("dont", "im").
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Is this you\n\nThe blond gigolo put your name in the thingy for me. I pressed it four times. Sorry if it went four times",
        "I don't mind classes. The teachers say cool stuff. Once I can read the blackboard its gonna be perfect\n\nYou listen like you're really getting it\n\nSometimes I smell somethin' sweet off you. Just for a second. Its different from everyone else\n\nI started sitting where I could see you in class. It was s'posed to be so I could copy how you write stuff down. But...\n\nI want to learn about you. Not just what the teachers say. That's what I wanted to say the last {timesMet} times. I didn't know how",
      ],
      choice: {
        prompt:
          "Is that a rude thing to say? The blond gigolo says half the things I say are rude.",
        options: [
          {
            key: "kind",
            label: "Say it's not rude at all",
            style: 3,
            close:
              "Good\n\n...Then I'm gonna keep learning about you. Everything. Is that allowed?",
          },
          {
            key: "playful",
            label: "Ask what you smell like",
            style: 1,
            close:
              "Sweet. Like strawberry milk, the carton kind\n\n...Somethin' about it makes my stomach feel weird. I dunno why",
          },
          {
            key: "bold",
            label: "Say you want to know him too",
            style: 4,
            close:
              "...Really?\n\nNobody asks about me. They just ask what I am\n\nOkay. You can ask. I'll answer if I know the words",
          },
        ],
      },
      keepsake: {
        emoji: "📚",
        line: "Sitting where he could see you in class, to copy your letters and learn something else.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Your scent was all squeezy today. Somethings wrong",
        "You always give me {favResponse}. Your scent's what changes, so thats how I know.\n\nToday you still gave me {favResponse}. But under it you smelled squeezy. Like that time you cried and didn't tell me how come.\n\nNobody else can smell it on you. I can.\n\nIf somebody did somethin' to you, tell me who.",
      ],
      choice: {
        prompt: "How come. You don't gotta say it nice",
        options: [
          {
            key: "kind",
            label: "Say he's right, you're tired",
            style: 3,
            close:
              "...Tired. Okay. I knew it was somethin'\n\nThen go sleep. If your scent's still squeezy tomorrow Im asking again",
          },
          {
            key: "playful",
            label: "Ask if he's a detective now",
            style: 1,
            close:
              "No. Detectives use their eyes. I use my nose. Mine's better\n\nSo don't bother hiding stuff from me. It won't work",
          },
          {
            key: "bold",
            label: "Tell him you need a hug",
            style: 4,
            close:
              "A hug. Fine\n\nTen seconds. That's the rule. But I'm coming over\n\nAfter, I can stay till your scent's not squeezy",
          },
        ],
      },
      keepsake: {
        emoji: "🐺",
        line: "The day your scent went squeezy under all the right words, and he noticed.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to my room. Bring nothing. Dont bring the blond gigolo",
        "*The room is bare except for a bed and, folded on the end of it, a blanket that is filthy, threadbare, and clearly ancient. He is standing between you and it, which he does not seem to have decided to do.*\n\n> That's mine. It's from before. Before the campus, before the cage, before any of it.",
        "> The blond gigolo washed it once. Two years ago. He was being kind and it took the smell out and I didn't talk to him for six days.\n\n*He moves out of the way, which takes him a visible amount of effort.*\n\n> You can touch it. Not take it. Touch it.\n\n> I've never let anyone. That's what I'm doing right now, I want you to know that's what I'm doing.",
      ],
      choice: {
        prompt: "Go on. I'll be fine. I've decided I'll be fine.",
        options: [
          {
            key: "kind",
            label: "Touch it and say nothing",
            style: 3,
            close:
              "*He watches your hand the entire time without breathing much.*\n\n*When you take it away he sits down on the floor rather suddenly.*\n\n> ...It smells like you now,\n\n*he says, and then, before you can apologize:*\n\n> No. Good. That's good. That's the good one. Leave it.",
          },
          {
            key: "playful",
            label: "Say it needs a wash",
            style: 1,
            close:
              "> DON'T.\n\n*Then, after a second:*\n\n> ...that was a joke. That was a joke and I did the shouting anyway.\n\n> Do it again. I want to practice it being a joke.",
          },
          {
            key: "bold",
            label: "Ask what's from before",
            style: 4,
            close:
              "*He is quiet for a long time.*\n\n> Neros. The human from before all this. He had a house, and a fire in the wall, the good kind, and he let me sleep by it.\n\n> This is all I've got of that time. I'm gonna find him. I've never said that part out loud before, 'cause saying it out loud makes it a thing I could fail at.\n\n*He leans against your side on the floor, all his weight, and stays there.*",
          },
        ],
      },
      keepsake: {
        emoji: "🧵",
        line: "A blanket from before, that nobody else has ever been allowed to touch.",
      },
    },

    confidant: {
      beats: [
        "*It comes at four in the morning and it is a voice note, not a message.*\n\n**{firstName}**: It's the moon week. I'm in the far room. I'm not coming out.",
        "> The blond gigolo locks it. I ask him to. That's the arrangement. I ask, he locks, he doesn't say anything about it after.\n\n> It's not scary in here. Everyone thinks it's scary. It's just very long.",
        "*There's a rustling, and then he says something he has clearly been building up to.*\n\n> I want to show you my arms after. Not now. After, when it's over.\n\n> They're all bites. All of them are mine. I did all of them. When it gets bad I have to put it somewhere and the somewhere is me, because the other option is a person.\n\n> Nobody's seen them on purpose. The blond gigolo's seen them because he's the one with the key. That's different.",
      ],
      choice: {
        prompt: "Is that all right? You can say no and I'll never bring it up.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there after",
            style: 3,
            close:
              "*There is a very long silence on the recording.*\n\n> ...Okay. Okay. Six days.\n\n*He counts them out loud to you every single night. On the seventh he pushes both sleeves up without a word, and lets you look, and does not once say anything about it.*",
          },
          {
            key: "playful",
            label: "Ask what he does in there",
            style: 1,
            close:
              "> Sleep. Pace. Count things.\n\n> I count how many times you've come. That's a thing I do in here. It's better than the other counting.",
          },
          {
            key: "bold",
            label: "Ask to sit outside the door",
            style: 4,
            close:
              "> No. NO.\n\n*Then, immediately, much smaller:*\n\n> ...sorry. Sorry. That was the loud one.\n\n> You can't be near the door. That's the whole point of the door.\n\n*A long gap.*\n\n> You could talk into the thingy though. From your room. I could have it next to me. That's not near.\n\n*You talk into it every night for six nights. He keeps all of them.*",
          },
        ],
      },
      keepsake: {
        emoji: "🎧",
        line: "Six nights of voice notes, kept and played back through a locked door.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: I did a bad thing and im telling you before the blond gigolo does",
        "> There was a person near you in the courtyard and I got between. I didn't decide to. I was there and then I was there, and there wasn't any bit in the middle where I picked.\n\n> I growled. Out loud. At a student. In front of everyone.",
        "> They put me in a cage for two years for that. Not that exact thing. That sort of thing.\n\n> Suba had to come. He talked to them for an hour and now it's fine and nothing happens. But it was two years, before, for less.\n\n> And I've been sitting here since and the bad part isn't the cage. The bad part is I'd do it again and I know I would, so I've been trying to be sorry and it won't come.",
      ],
      choice: {
        prompt: "Tell me to be sorry. If you say it I might manage it.",
        options: [
          {
            key: "kind",
            label: "Say you're not asking that",
            style: 3,
            close:
              "> ...Then what do I do with it.\n\n> Can I come and sit next to you. That's what I want to do. I've wanted to do that for two hours and I didn't know if it was allowed after growling.\n\n*He sits on the floor by your chair with his head against your knee for most of the night and doesn't say another word.*",
          },
          {
            key: "playful",
            label: "Ask if it was a good growl",
            style: 1,
            close:
              "> It was a really good one.\n\n*He says it before he can stop himself, and then:*\n\n> ...that's not the right answer, is it. The blond gigolo would tell me off for that.\n\n> It was a really good one though.",
          },
          {
            key: "bold",
            label: "Tell him you'd do it too",
            style: 4,
            close:
              "*There's no reply for a while. When it comes it's a voice note and he's much closer to the microphone than usual.*\n\n> Say that once more.\n\n*You do.*\n\n> ...Okay. Then I'm not sorry and I'm not going to try to be, and it's fine, because there's two of us.",
          },
        ],
      },
      keepsake: {
        emoji: "🦴",
        line: "A growl in a courtyard that nobody put him in a cage for.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: Ive been practicing this all week. Im going to do it in the thingy because the writing is too hard for this one",
        "> {timesMet} times. I counted every one, even the ones in the far room where I couldn't see you.\n\n> I asked the blond gigolo how to say a thing and he asked what thing and I wouldn't tell him, and he laughed, and then he stopped laughing and helped me for two hours.",
        "> Here's what I know about me. I hold on too hard. I go in front of people without picking. I bite my own arms so I don't bite anything else. I can't read most signs and I never will properly.\n\n> I was in a cage for two years and everyone here was kind about it and nobody ever asked me what it was like. You asked. On the third walk. You just asked, like it was a normal thing to ask about.",
        "*There is a long pause on the recording, and a deep breath.*\n\n> I love you. That's the thing. That's the one I was practicing.\n\n> The blond gigolo says you say it and then you stop and let the other person have a go. So I'm going to stop now.\n\n*The recording doesn't end. He just breathes, and waits, for eleven whole seconds before it cuts out.*",
      ],
      choice: {
        prompt:
          "That's me stopped. The blond gigolo says this is the bit where I wait.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*He does not send anything at all.*\n\n*He is outside your door in four minutes, having plainly run the whole way, and he does not say a word. He just puts his forehead against your shoulder the way he does and stands there breathing you in, both hands fisted in the back of your coat.*\n\n> Say it in the thingy after,\n\n*he says eventually, into your collar.*\n\n> So I've got it for the moon week.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "> Okay.\n\n*No argument. No wheedling. Just:*\n\n> Okay. The blond gigolo said that might happen and he told me what to do, and what to do is say okay and mean it.\n\n> Walks are still walks. That's not a swap for anything, that's just the best bit of the week and it was the best bit before I said the thing.\n\n> And you can still touch the blanket. That doesn't undo. That one's forever whatever you say.",
          },
        ],
      },
      keepsake: {
        emoji: "🎙️",
        line: "Eleven seconds of someone breathing, waiting for you to have a go.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He keeps his distance, observing you carefully. There's wariness in his posture, but curiosity flickers in his eyes.",
        approach: "Take a step toward him",
        greeting: '"Stay back. I don\'t know your scent."',
        responses: {
          kind: ["Let him come to you", "Stop right where you are"],
          playful: ["Offer your hand to sniff", "Ask what you smell like"],
          bold: ["Give him your name", "Say you'll wait till he does"],
          neutral: ["Keep your hands down", "Hold still, say nothing"],
        },
      },
      {
        line: "He keeps to the far side of the room, watching you, deciding. Nothing about it is hostile.",
        approach: "Wait for him to decide",
        greeting: '"...You smell weird. Not bad weird. Just weird."',
        responses: {
          kind: ["Let him take his time", "Give him all the room he needs"],
          playful: ["Ask if you passed", "Ask what the verdict is"],
          bold: ["Say you'll come back tomorrow", "Say he'll get used to you"],
          neutral: ["Let him keep his distance", "Stay where you are"],
        },
      },
      {
        line: "He's come in from the edge of the room. He stands where he can see you, and stays.",
        approach: "Face toward him",
        greeting:
          "\"...You again. Humans are s'posed to run away. You don't.\"",
        responses: {
          kind: ["Let him decide how close", "Say you like the company"],
          playful: ["Ask what took him so long", "Ask if he's staying a while"],
          bold: ["Say you're not going anywhere", "Say you'll stay right here"],
          neutral: ["Stand still, say nothing", "Let him watch you"],
        },
      },
      {
        line: "He's already facing the door when you come through it. He caught your scent before you got there.",
        approach: "Walk over to him",
        greeting: '"You came back. Again. ...How come?"',
        responses: {
          kind: ["Say you came to say hi", "Tell him it's good to see him"],
          playful: ["Ask if he was waiting", "Ask if he missed you"],
          bold: ["Say you'll keep coming back", "Say he'll see you plenty"],
          neutral: ["Nod and come in", "Stop by the door"],
        },
      },
      {
        line: "He doesn't come closer, but he doesn't leave either. Neither do you, for a long while.",
        approach: "Stay quiet with him",
        greeting: '"...You gonna stand there all day? Fine. Me too."',
        responses: {
          kind: ["Stay as long as he does", "Let him break the quiet"],
          playful: ["Ask if this is a contest", "Ask who blinks first"],
          bold: ["Say you're not leaving first", "Say you can wait longer"],
          neutral: ["Keep standing there", "Wait him out"],
        },
      },
    ],
    known: [
      {
        line: "He rubs at his arms, scowling at the sky. \"Urgh... My skin's crawling... Moon must be gettin' round soon...\"",
        approach: "Ask what he needs",
        greeting: '"Ngh... It\'s fine. It always does this."',
        responses: {
          kind: ["Let him handle it his way", "Ask what helps"],
          playful: ["Ask if it tickles", "Ask if it's like an itch"],
          bold: ["Say you trust him to know", "Say he's got it handled"],
          neutral: ["Give him some room", "Look up at the sky"],
        },
      },
      {
        line: "\"I didn't do anything wrong! Those guys were saying mean stuff about me 'cause they thought I couldn't hear. All I did was yell at them.\"",
        approach: "Ask what happened",
        greeting:
          '"I can hear fine. Better than them. ...They still said I\'m the one who started it."',
        responses: {
          kind: ["Say you believe him", "Say they started it"],
          playful: ["Say they deserved the yelling", "Ask how loud he got"],
          bold: ["Say he stood his ground", "Say you'd have yelled too"],
          neutral: ["Hear him out", "Let him get it out"],
        },
      },
      {
        line: "\"When I find Neros, I wanna prove I've been getting along with humans. Then he'll definitely let me live with him.\"",
        approach: "Ask him about Neros",
        greeting:
          "\"...I still don't know where he is, though. But I'm gonna find him.\"",
        responses: {
          kind: ["Say he's doing great", "Offer to help him practice"],
          playful: ["Ask what Neros looks like", "Bet him he's ready now"],
          bold: ["Say he's got nothing to prove", "Say Neros will be proud"],
          neutral: ["Let him talk about Neros", "Say nothing, listen"],
        },
      },
      {
        line: '"There was this big noise in our practical class and my ears popped out. Everyone ran away screaming. Damn it..."',
        approach: "Ask if he's okay",
        greeting: '"I didn\'t even do anything. They just popped out."',
        responses: {
          kind: ["Say it wasn't his fault", "Say they'll get used to it"],
          playful: ["Ask if he can do it on purpose", "Say the ears suit him"],
          bold: ["Say they overreacted", "Say he's got nothing to hide"],
          neutral: ["Walk with him a while", "Let him cool off"],
        },
      },
      {
        line: '"At first I was sad \'cause I got put in a different house to Suba, but all kinds of stuff happens here every day so it was fine."',
        approach: "Ask what kind of stuff",
        greeting:
          "\"That blond gigolo's always nagging and that moth-eaten Casanova's always sleeping. ...I don't mind it.\"",
        responses: {
          kind: ["Say he fits in there", "Say Suba's not far"],
          playful: ["Ask who's worse, Rui or Ed", "Say it sounds lively"],
          bold: ["Say Obscuary got lucky", "Say he'd do fine anywhere"],
          neutral: ["Let him tell it", "Let him go on"],
        },
      },
      {
        line: "\"Laws, school regulations, anomalous law... Manners, morals, rules... How're you s'posed to remember all that?\"",
        approach: "Ask which one's hardest",
        greeting:
          '"Manners. Manners are the worst. Nobody even writes them down."',
        responses: {
          kind: ["Say one rule at a time", "Say nobody remembers them all"],
          playful: ["Say you break a few too", "Say manners are overrated"],
          bold: ["Say he'll learn them fast", "Say half of them are silly"],
          neutral: ["Let him list them out", "Nod along"],
        },
      },
      {
        line: "He catches your scent and goes a little red. He takes a big step back and puts a hand on his stomach.",
        approach: "Ask what's wrong",
        greeting:
          "\"H-Hey, don't come so close! Somethin' about your scent makes my stomach feel weird!\"",
        responses: {
          kind: ["Ask if he's feeling okay", "Give him room"],
          playful: ["Ask if he's blushing", "Ask if your scent did that"],
          bold: ["Say he looks fine to you", "Say he's turning red"],
          neutral: ["Stay where you are", "Give him a second"],
        },
      },
      {
        line: 'The phone in his pocket buzzes and he flinches hard. "This phone thingy keeps making noises and making me jump... Why do I gotta carry it everywhere?"',
        approach: "Ask what spooked him",
        greeting:
          '"It buzzes like a bug in my pocket. ...You know how to make it shut up?"',
        responses: {
          kind: ["Show him how to silence it", "Say it surprises you too"],
          playful: ["Make it buzz on purpose", "Call it a very loud bug"],
          bold: ["Take the phone and fix it", "Tell him to just carry it"],
          neutral: ["Wait it out with him", "Wait for the buzzing to stop"],
        },
      },
      {
        line: "\"What's a 'so-shul skill'? That blond gigolo was talking about them. He said I don't have any. Is that a good thing?\"",
        approach: "Explain social skills",
        greeting: "\"...So it's a bad thing. Okay. Then I'm gonna get some.\"",
        responses: {
          kind: ["Say he'll pick them up", "Offer to help him practice"],
          playful: ["Say Rui has too many", "Tease the way he says it"],
          bold: ["Say Rui's wrong about him", "Tell him to prove Rui wrong"],
          neutral: ["Nod, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: 'He hovers near you at the end of class. "...I\'m going for a walk."',
        approach: "Ask where he's headed",
        greeting: '"You coming? I liked the last one."',
        responses: {
          kind: ["Say you'd like to come", "Let him pick the path"],
          playful: ["Say you'll race him", "Say you'll pick a new route"],
          bold: ["Tell him to lead the way", "Match his pace exactly"],
          neutral: ["Walk together, say nothing", "Walk at his pace"],
        },
      },
      {
        line: "\"I'm starving... I wanna eat Sho's food, but I can't order it without Suba... Wait, you can read, right?\"",
        approach: "Say you can read",
        greeting:
          "\"Then you order. I'll tell you what I want. ...It's the chicken.\"",
        responses: {
          kind: ["Offer to read him the menu", "Say you'll go with him"],
          playful: ["Say Suba's off duty today", "Say reading costs a bite"],
          bold: ["Say you're buying", "Say you'll order for both"],
          neutral: ["Nod, say nothing", "Head to the truck with him"],
        },
      },
      {
        line: "You're still a long way off when his head turns toward you. He knew before he saw you.",
        approach: "Wave once he's looking",
        greeting:
          "\"I know your scent now. Don't sneak up on me. It won't work.\"",
        responses: {
          kind: ["Say his nose is amazing", "Say you're glad he knows you"],
          playful: ["Say you'll switch shampoo", "Ask what gave you away"],
          bold: ["Say you'd rather he knew", "Say you wanted him to know"],
          neutral: ["Walk the rest of the way", "Meet him halfway"],
        },
      },
      {
        line: '"You spoke up for me. Back when they were deciding what to do with me." He still hasn\'t figured out why.',
        approach: "Ask what's on his mind",
        greeting:
          '"Suba, I get. He knew me. ...How come you did, though? I coulda been anything."',
        responses: {
          kind: ["Say you saw who he was", "Say he deserved a chance"],
          playful: [
            "Say you have good instincts",
            "Tease that you liked him fast",
          ],
          bold: ["Say you'd do it again", "Ask why that surprises him"],
          neutral: ["Shrug, say nothing", "Let the question hang"],
        },
      },
    ],
    warm: [
      {
        line: "The guarded distance closes when he recognizes you. A genuine, warm smile breaks through his usual reserve.",
        approach: "Smile back",
        greeting: "\"You're back. I'm... really happy about that.\"",
        responses: {
          kind: ["Say you're glad to be back", "Say you missed that smile"],
          playful: ["Ask what made him smile", "Ask for another one"],
          bold: ["Say you're happy too", "Tell him to smile more"],
          neutral: ["Take the spot beside him", "Nod, walk over"],
        },
      },
      {
        line: "He's practiced something to say to you. It comes out a little stiff and completely sincere.",
        approach: "Ask about the new word",
        greeting: '"I learned a new word today. I was saving it for you."',
        responses: {
          kind: ["Praise him for it", "Say he used it just right"],
          playful: ["Ask him to use it again", "Offer him a harder word"],
          bold: ["Say it suits him", "Ask where he learned it"],
          neutral: ["Nod, say nothing", "Let the word sit"],
        },
      },
      {
        line: '"The teacher asked us to name an anomalous plant you can eat, but when I did he said humans can\'t eat it. So what? I can."',
        approach: "Say he wasn't wrong",
        greeting: '"See? You get it. I knew you would. The teacher didn\'t."',
        responses: {
          kind: ["Say he answered honestly", "Say you'd have marked it right"],
          playful: ["Ask what it tastes like", "Ask him to name another"],
          bold: [
            "Say the question was unfair",
            "Tell him to argue it next time",
          ],
          neutral: ["Nod along", "Let him vent"],
        },
      },
      {
        line: "\"Your scent's all squeezy today. You're sad,\" he says. He's rarely wrong about that.",
        approach: "Ask how he knew",
        greeting:
          '"Your scent told me before your face did. You don\'t gotta say what."',
        responses: {
          kind: ["Thank him for not pushing", "Say you'll tell him later"],
          playful: [
            "Call his nose a lie detector",
            "Ask what happy smells like",
          ],
          bold: ["Say he's right, plainly", "Say the whole thing"],
          neutral: ["Let him notice, say nothing", "Say it's nothing much"],
        },
      },
      {
        line: "\"I'm gonna go practice swimming at Haru's place. Can you do other stuff besides doggy paddle?\"",
        approach: "Say you know a few strokes",
        greeting:
          '"Really? Show me. I\'m faster than anyone at doggy paddle, but the human ways look cool."',
        responses: {
          kind: ["Offer to swim with him", "Ask to see his doggy paddle"],
          playful: ["Tease the doggy paddle", "Challenge him to a race"],
          bold: ["Say he'll outswim you soon", "Say you're better at it"],
          neutral: ["Agree without a word", "Meet him at the water"],
        },
      },
      {
        line: 'He\'s stopped flinching at his own phone. Mostly. "Suba showed me how to turn the noise off."',
        approach: "Ask how he'll know you texted",
        greeting: "\"...Oh. I didn't think about that. I'll check it. A lot.\"",
        responses: {
          kind: ["Say you're proud of him", "Say you'll text anyway"],
          playful: ["Ask what noise he picked", "Send a text right now"],
          bold: ["Say he'll figure it out", "Turn the noise back on"],
          neutral: ["Take it in stride", "Sit while he's quiet"],
        },
      },
      {
        line: '"That blond gigolo tried to sit between us at lunch. I moved. He can sit somewhere else."',
        approach: "Ask if he's jealous",
        greeting:
          "\"What's jealous? ...Doesn't matter. He was too close. That's all.\"",
        responses: {
          kind: ["Say you'd rather sit with him", "Say you'd have moved too"],
          playful: ["Say that's exactly jealous", "Ask where Rui ended up"],
          bold: ["Say you saw him do it", "Say he can sit closer"],
          neutral: ["Shrug it off", "Eat, let it go"],
        },
      },
      {
        line: "He's eating Sho's chicken over rice with his hands again. Without looking up, he pushes the container over to you.",
        approach: "Take a bite",
        greeting: '"...Good, huh? Nobody else gets any of my food. Just you."',
        responses: {
          kind: ["Thank him for sharing", "Say you'll share yours too"],
          playful: ["Ask for a fork, at least", "Eat with your hands too"],
          bold: ["Ask why only you", "Say you'll hold him to that"],
          neutral: ["Eat beside him", "Nod, keep eating"],
        },
      },
      {
        line: "\"I read the whole chapter myself last night. Took a while, but I got it.\" He says it like it's nothing, but he's watching for your reaction.",
        approach: "Tell him that's great",
        greeting:
          '"Suba helped with two words. Only two. The rest was all me."',
        responses: {
          kind: ["Say that's amazing", "Say he worked hard for it"],
          playful: ["Quiz him on the chapter", "Ask for a summary"],
          bold: ["Say you knew he could", "Tell him to read you some"],
          neutral: ["Accept it as normal", "Nod like you expected it"],
        },
      },
      {
        line: "He growls, quiet and short, at someone who got too close to you in the hall. Then he looks embarrassed about it.",
        approach: "Tell him it's okay",
        greeting:
          "\"It just came out. I'm not s'posed to growl at people. I really try not to.\"",
        responses: {
          kind: ["Say it's okay to protect you", "Say you weren't bothered"],
          playful: ["Tease the embarrassed growl", "Growl back at him"],
          bold: ["Say he did the right thing", "Say one growl isn't much"],
          neutral: ["Let it go, unbothered", "Keep walking, no comment"],
        },
      },
      {
        line: '"You\'re not scared of me. Everyone else still is, a little. I noticed a while back."',
        approach: "Say you never were",
        greeting:
          '"Not even the first time? ...Okay. I believe you. Your scent didn\'t lie."',
        responses: {
          kind: ["Say you never were scared", "Say there's nothing to fear"],
          playful: [
            "Ask why everyone else still is",
            "Ask if that disappoints him",
          ],
          bold: ["Say you trust him completely", "Say the others are wrong"],
          neutral: ["Shrug, unconcerned", "Walk on beside him"],
        },
      },
      {
        line: "He's started saving you a seat without being asked, and glares at anyone who tries to take it.",
        approach: "Take the seat he saved",
        greeting: '"I made room next to me. It\'s yours, if you want it."',
        responses: {
          kind: ["Take the seat beside him", "Tell him you'd have found it"],
          playful: ["Ask who he glared at", "Ask if the glare works"],
          bold: ["Take the seat like it's yours", "Sit before anyone else can"],
          neutral: ["Sit, say nothing", "Take it, settle in"],
        },
      },
      {
        line: "\"I draw what happened every day so I don't forget it. You're in most of the pages now.\"",
        approach: "Ask to see the pages",
        greeting:
          '"You can look. Don\'t laugh at how I drew your face. Faces are hard."',
        responses: {
          kind: ["Ask kindly to see the pages", "Say you'd love to see them"],
          playful: ["Demand to see every page", "Ask to be drawn better"],
          bold: ["Take the book to look", "Ask which page is best"],
          neutral: ["Wait to be shown", "Look when he offers"],
        },
      },
      {
        line: "It's been a few days. He's in front of you the second you turn up, not quite scowling.",
        approach: "Say sorry you were gone",
        greeting:
          '"Do you hate me? ...No? Okay. Then don\'t do it again. It made my heart all squeezy."',
        responses: {
          kind: ["Promise you'll come back", "Say you missed him too"],
          playful: [
            "Ask what squeezy feels like",
            "Ask if he counted the days",
          ],
          bold: ["Say you could never hate him", "Say you won't do it again"],
          neutral: ["Stay put and let him look", "Nod, say nothing"],
        },
      },
      {
        line: "\"I asked Suba what 'sarcasm' means. He said it's saying the opposite on purpose. How am I s'posed to tell?\"",
        approach: "Tell him to listen for tone",
        greeting:
          '"So you say the opposite and do a voice? ...That\'s just lying, but nicer."',
        responses: {
          kind: ["Say it's not really lying", "Promise to be clearer"],
          playful: ["Agree, sarcastically", "Call him a natural at this"],
          bold: ["Say he'll catch on", "Say he catches plenty"],
          neutral: ["Let him think it over", "Move on from the word"],
        },
      },
      {
        line: "He tugs your sleeve instead of saying your name now, when he wants your attention.",
        approach: "Give him your attention",
        greeting:
          '"Stay a little. I like the quiet better when you\'re in it."',
        responses: {
          kind: ["Say you'll stay a while", "Say you like it too"],
          playful: ["Pretend to leave, then stay", "Tug his sleeve back"],
          bold: ["Stay until he says go", "Sit closer in the quiet"],
          neutral: ["Give him a nod", "Stay in the quiet"],
        },
      },
      {
        line: "\"The blond gigolo says I got so-shul skills now. Some. He'd tell me if I didn't.\"",
        approach: "Tell him he's right",
        greeting: '"Yeah? ...Then I\'m gonna tell Neros. When I find him."',
        responses: {
          kind: ["Say he's come a long way", "Say the change shows"],
          playful: [
            "Ask what human stuff he means",
            "Ask for Rui's exact words",
          ],
          bold: ["Say he never needed fixing", "Say he's doing it his way"],
          neutral: ["Just nod at that", "Take his word for it"],
        },
      },
      {
        line: "He's outside your classroom when the bell goes, most days now. It stopped being a coincidence a while ago.",
        approach: "Ask if he's waited long",
        greeting: '"Not long. ...Okay, a little long. Worth it."',
        responses: {
          kind: ["Say it was worth it too", "Say you'll get out sooner"],
          playful: ["Say he's a bad liar", "Ask what 'a little' means"],
          bold: ["Say of course you'd come", "Say he can wait inside"],
          neutral: ["Head off together", "Walk on with him"],
        },
      },
    ],
    spark: [
      {
        line: "He presses his face into your shoulder and breathes in, and doesn't apologize.",
        approach: "Stay still",
        greeting: '"Stay still. I want to remember this exactly."',
        responses: {
          kind: "Let him stay close",
          playful: "Breathe him in back",
          bold: "Breathe him in first",
          neutral: "Stay quiet",
        },
      },
      {
        line: '"I don\'t have a word for this one," he says. "I\'ve been looking."',
        approach: "Ask for the word",
        greeting:
          '"I found the word. I\'m not going to say it yet. But I found it."',
        responses: {
          kind: "Give him the word",
          playful: "Make him find it himself",
          bold: "Say the word for him",
          neutral: "Let him wonder",
        },
      },
      {
        line: "He's stopped keeping a respectful distance. He's chosen a different one.",
        approach: "Say yes to the other close",
        greeting: '"Can I be close? Not careful-close. The other one."',
        responses: {
          kind: "Tell him he's allowed",
          playful: "Ask what the other one is",
          bold: "Choose the other close",
          neutral: "Keep the careful distance",
        },
      },
      {
        line: "He takes your hand and turns it over, learning it, taking his time.",
        approach: "Let him learn your hand",
        greeting:
          '"Everyone else, I keep a distance. You, I keep close. That\'s the difference."',
        responses: {
          kind: "Let him take his time",
          playful: "Hold the hand hostage",
          bold: "Turn his hand over first",
          neutral: "Let him learn it, say nothing",
        },
      },
      {
        line: "He looks at your mouth, then away, then back, and gives up on the away part.",
        approach: "Let him look",
        greeting:
          '"You smell sweeter than usual today. ...Stop. Go away." He doesn\'t move.',
        responses: {
          kind: "Let him look, stay soft",
          playful: "Ask what he's looking at",
          bold: "Don't let him look away",
          neutral: "Hold still, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"You\'re my most important person," he says, plain and certain. "You safe. You happy. Nothing matters more than that."',
        approach: "Tell him you're safe",
        greeting: '"...Okay. Okay. Then I can stop checking. Almost."',
        responses: {
          kind: "Teach him another word",
          playful: "Roughhouse with him",
          bold: "Say he matters just as much",
          neutral: "Let him lean on you",
        },
      },
      {
        line: "He puts himself between you and the noise without thinking about it at all.",
        approach: "Let him take the front",
        greeting: '"Let me stand in front. Just this once. Just let me."',
        responses: {
          kind: "Thank him for standing there",
          playful: "Ruffle his hair",
          bold: "Stand with him proudly",
          neutral: "Understand his quiet",
        },
      },
      {
        line: "He rests his head against your shoulder, briefly, and pretends he didn't.",
        approach: "Rest against his shoulder",
        greeting:
          '"You never once treated me like an animal. I remember every time."',
        responses: {
          kind: "Remind him he's not an animal",
          playful: "Pretend not to notice either",
          bold: "Refuse to let him lead",
          neutral: "Let him rest there quietly",
        },
      },
      {
        line: '"I understand more now," he says. "Mostly because of you."',
        approach: "Say you taught him",
        greeting:
          '"You taught me what this feeling is called. I use it a lot now."',
        responses: {
          kind: "Say he taught you too",
          playful: "Test what else he's learned",
          bold: "Say you taught each other",
          neutral: "Walk in silence together",
        },
      },
      {
        line: "The wariness is gone entirely. What's left is loyal all the way down.",
        approach: "Go to him",
        greeting: '"Wherever you go, I go. That\'s already decided."',
        responses: {
          kind: "Say you're glad he's loyal",
          playful: "Let him win the race",
          bold: "Say wherever you go, he goes",
          neutral: "Accept it, say nothing",
        },
      },
    ],
    bound: [
      {
        line: "He's found the word. He uses it constantly now, and gets it right every time.",
        approach: "Say it back",
        greeting:
          '"I love you. That\'s the word. I found it ages ago. I just wanted to be sure."',
        responses: {
          kind: "Tell him he got it right",
          playful: "Ask him to say it again",
          bold: "Say it first",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He curls around you in his sleep and makes a sound like something finally at rest.",
        approach: "Lie down with him",
        greeting: '"Come lie down. I sleep better with you. I sleep properly."',
        responses: {
          kind: "Let him curl around you",
          playful: "Tease the sound he makes",
          bold: "Hold him just as close",
          neutral: "Let him sleep",
        },
      },
      {
        line: '"You smell like mine," he says, delighted, with no idea how that lands.',
        approach: "Let him say it",
        greeting: "\"You're mine and I'm yours. Both. It has to be both.\"",
        responses: {
          kind: "Let him have the thought",
          playful: "Say you smell like his",
          bold: "Tell him it's both",
          neutral: "Lie still",
        },
      },
      {
        line: "He kisses clumsily, enthusiastically, improving at an alarming rate.",
        approach: "Say yes",
        greeting:
          '"Can I... yes? Good. I\'ll never stop asking, I like the yes."',
        responses: {
          kind: "Say you like the yes too",
          playful: "Teach him a better kiss",
          bold: "Take the lead this time",
          neutral: "Let him keep trying, silent",
        },
      },
      {
        line: "He's stopped keeping any distance at all. There simply isn't one anymore.",
        approach: "Get closer",
        greeting:
          "\"Stay close. Closer. There's no such thing as too close, I've checked.\"",
        responses: {
          kind: "Let him close the last of it",
          playful: "Make him ask again",
          bold: "Close what's left",
          neutral: "Let it happen, say nothing",
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
        line: '**{name}** stops a few steps short of {user}, arms folded. "...What do you want me to do? Say it."',
        responses: {
          kind: "Say nothing, just hi",
          playful: "Ask for a high five",
          bold: "Tell him to come closer",
        },
      },
      {
        line: '{user} says the name, and **{name}** turns right around. "What?"',
        responses: {
          kind: "Say you only wanted to see him",
          playful: "Say \"what\" right back",
          bold: "Tell him to come here",
        },
      },
      {
        line: '"Stay there a moment." **{name}** takes {user} in slowly, scent and all.',
        responses: {
          kind: "Stay still for him",
          playful: "Ask if you pass",
          bold: "Step forward anyway",
        },
      },
      {
        line: '**{name}** studies {user}, nose first. "...Huh. You don\'t smell scared." He folds his arms. "What do you want?"',
        responses: {
          kind: "Tell him your name",
          playful: "Sniff back at him",
          bold: "Say you're not scared of him",
        },
      },
    ],
    known: [
      {
        line: '"You called me. So you want something." **{name}** waits for {user} to say what it is.',
        responses: {
          kind: "Say you don't need a reason",
          playful: "Make him guess what",
          bold: "Say exactly what you want",
        },
      },
      {
        line: '{user} calls, and **{name}** comes over with a book under his arm. "Wait. Before you say anything. What\'s this word?"',
        responses: {
          kind: "Help him sound it out",
          playful: "Make up a definition",
          bold: "Ask him to guess first",
        },
      },
      {
        line: "\"Why'd you call me? ...It's okay if there's no reason. I just wanna know.\" **{name}** asks {user}.",
        responses: {
          kind: "Say there's no reason",
          playful: "Say it's a secret",
          bold: "Give him a real reason",
        },
      },
    ],
    warm: [
      {
        line: "**{name}** knows the voice before he's found the face, and comes straight to {user}.",
        responses: {
          kind: "Say hi when he gets there",
          playful: "Ask if he smelled you first",
          bold: "Meet him halfway",
        },
      },
      {
        line: '"...You again. Where\'re we going today?" **{name}** is already walking toward {user}.',
        responses: {
          kind: "Let him pick today",
          playful: "Say it's a surprise",
          bold: "Say you're leading today",
        },
      },
      {
        line: "{user} calls out, and **{name}** falls in at their side, exactly one step behind.",
        responses: {
          kind: "Slow down for him",
          playful: "Take one step back too",
          bold: "Tell him to walk beside you",
        },
      },
    ],
    spark: [
      {
        line: "\"H-Hey, don't come so close!\" **{name}** says it to {user}, and doesn't step back either.",
        responses: {
          kind: "Stop where you are",
          playful: "Take one more step",
          bold: "Ask why he isn't moving",
        },
      },
      {
        line: "{user} says the name, and **{name}**'s ears do something he has no control over.",
        responses: {
          kind: "Pretend not to notice",
          playful: "Point at his ears",
          bold: "Ask what his ears mean",
        },
      },
      {
        line: "**{name}** had practiced a greeting for {user}. It comes out stiff and completely sincere.",
        responses: {
          kind: "Say it was a good greeting",
          playful: "Ask for an encore",
          bold: "Ask how long he practiced",
        },
      },
    ],
    close: [
      {
        line: "**{name}** hears {user}, and nothing else on campus is interesting anymore.",
        responses: {
          kind: "Say you feel the same",
          playful: "Ask what's boring now",
          bold: "Say keep it that way",
        },
      },
      {
        line: "\"Let's go for a walk. I'll go slow, 'cause you're a human.\" **{name}** waits for {user} to move first.",
        responses: {
          kind: "Walk with him",
          playful: "Say you can keep up",
          bold: "Race him",
        },
      },
      {
        line: "{user} calls, and **{name}** abandons the **{house}** errand without a flicker of guilt.",
        responses: {
          kind: "Say the errand can wait",
          playful: "Ask if Edward will notice",
          bold: "Say he should finish it",
        },
      },
    ],
    bound: [
      {
        line: '"You smell like mine," **{name}** says to {user}, delighted.',
        responses: {
          kind: "Say you are his",
          playful: "Ask what you smell like",
          bold: "Say he smells like yours",
        },
      },
      {
        line: "**{name}** doesn't reach for a new word this time. He just says {user}'s name, slow.",
        responses: {
          kind: "Say his name the same way",
          playful: "Ask if that's his new word",
          bold: "Ask him to say it again",
        },
      },
      {
        line: "{user} says the name, and **{name}** makes a sound like something finally at rest.",
        responses: {
          kind: "Stay right here with him",
          playful: "Ask what that sound was",
          bold: "Ask him to make it again",
        },
      },
    ],
  },
};
