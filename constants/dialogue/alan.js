import bondScenes from "../bondScenes/alan.js";

export default {
  // Level-up DMs: constants/bondScenes/alan.js.
  bondScenes,
  dialogue: {
    known: [
      {
        line: "You walk in on him doing pushups on the garage floor. He doesn't stop until he hits the count.",
        approach: "Let him hit the count",
        greeting: '"...499... 500. Phew. ...You been waiting long?"',
        responses: {
          kind: ["Hand him something to drink", "Say you were happy to wait"],
          playful: ["Offer to count for him", "Say you lost count at 300"],
          bold: [
            "Say you'll join him tomorrow",
            "Tell him you watched them all",
          ],
          neutral: ["Hold off till he's done", "Wait for him at the door"],
        },
      },
      {
        line: "He looks up when you come in and nods once. Two weeks ago he didn't do that.",
        approach: "Walk over to him",
        greeting: '"...You came back. Good."',
        responses: {
          kind: ["Say you missed hanging out", "Ask how his week went"],
          playful: ["Ask if the nod's new", "Nod back twice as hard"],
          bold: ["Hold his eyes, nod back", "Say you'll be here tomorrow"],
          neutral: ["Nod back once", "Head inside"],
        },
      },
      {
        line: "You catch the end of a sparring round in the Pit. Sho's flat on his back, exhausted, and Alan is already offering him a hand up.",
        approach: "Head down to the Pit",
        greeting:
          '"You came down to watch? ...Next round\'s cleaner. Stick around."',
        responses: {
          kind: ["Say you'll stay for it", "Ask if his hands are okay"],
          playful: ["Cheer for Sho instead", "Ask if Sho's still alive"],
          bold: ["Say it doesn't scare you", "Ask him to teach you after"],
          neutral: ["Watch quietly from outside", "Let them finish the round"],
        },
      },
      {
        line: '"Looks like we\'ve got another mission order," he says. "Rest while you can. Next one\'s a long one."',
        approach: "Ask what the mission is",
        greeting: '"You\'ll get the details when I do. Sleep first."',
        responses: {
          kind: ["Promise to rest up", "Tell him to rest too"],
          playful: ["Ask if he'll take own advice", "Joke that he never rests"],
          bold: ["Say you'll be ready first", "Ask what makes it long"],
          neutral: ["Get some sleep", "Take the warning in stride"],
        },
      },
      {
        line: "He's lacing up his shoes by the garage door when you come in.",
        approach: "Ask where he's off to",
        greeting: '"Heading out for a run. ...Could you wait here for me?"',
        responses: {
          kind: ["Say you'll wait right here", "Tell him to take it easy"],
          playful: ["Ask if he knows the route", "Bet you'd beat him back"],
          bold: ["Ask to run with him", "Say you'll keep pace"],
          neutral: ["Wait by the door", "Let him go"],
        },
      },
      {
        line: "He catches your wrist before it brushes the hot engine.",
        approach: "Let him check you over",
        greeting: '"Engine\'s still hot. ...You okay?"',
        responses: {
          kind: ["Tell him you're okay", "Trust his quick hands"],
          playful: [
            "Ask if he's always this fast",
            "Pretend you meant to reach",
          ],
          bold: ["Say you'll mind the engine", "Hold steady, say you're fine"],
          neutral: [
            "Pull your hand back",
            "Take the save without comment",
          ],
        },
      },
      {
        line: '"You\'re early," he says. Not a complaint.',
        approach: "Come by before he expects",
        greeting: '"Wasn\'t expecting anyone this early. ...Come in."',
        responses: {
          kind: ["Ask if he's eaten yet", "Say you couldn't wait"],
          playful: ["Ask if early counts as eager", "Ask who he was expecting"],
          bold: ["Say you'll always be early", "Say you came for him"],
          neutral: ["Let him get started", "Hang back by the door"],
        },
      },
      {
        line: "Leo's sprawled across a workbench, phone up, filming Alan work. Alan is ignoring him with real dedication.",
        approach: "Step around Leo's shot",
        greeting:
          "\"He's been here an hour. Hasn't touched a thing. ...You staying too?\"",
        responses: {
          kind: ["Say you'll actually help", "Say you'll stay if he wants"],
          playful: ["Ask if Leo's filming you too", "Wave at Leo's camera"],
          bold: ["Tell Leo to pitch in", "Say you're staying, phone-free"],
          neutral: ["Let Leo keep filming", "Let them have their bit"],
        },
      },
      {
        line: "He's started propping the garage door open when he knows you're coming.",
        approach: "Let yourself in",
        greeting: '"Left it open. Figured you\'d be by."',
        responses: {
          kind: ["Say it feels like a welcome", "Say you'll always come by"],
          playful: [
            "Ask if the door's just for you",
            "Knock after you're inside",
          ],
          bold: ["Head straight over to him", "Say you'll be by tomorrow too"],
          neutral: ["Let yourself in quietly", "Find a spot to stand"],
        },
      },
      {
        line: "He starts leaving the spare gloves out in your size. Never brings it up.",
        approach: "Take the gloves he left out",
        greeting: '"Got gloves that\'ll fit. Wear them."',
        responses: {
          kind: ["Say they fit perfectly", "Say you'll look after them"],
          playful: ["Ask when he measured you", "Model the gloves for him"],
          bold: ["Say you'll keep them on hand", "Wear them every time"],
          neutral: ["Pull the gloves on", "Take them without comment"],
        },
      },
      {
        line: "He answers your question about the engine in four words. A while later, he adds a fifth.",
        approach: "Ask what that part does",
        greeting: '"...Carburetor. That\'s what that is."',
        responses: {
          kind: ["Let him take his time", "Listen like it matters"],
          playful: ["Ask for the long version", "Name the next part wrong"],
          bold: ["Ask him to show you", "Ask what else he's fixed"],
          neutral: ["Nod and file it away", "Watch him work"],
        },
      },
      {
        line: "He waves off Leo's teasing about you without looking up from his work.",
        approach: "Wait him out",
        greeting: '"Leo talks too much. Ignore him."',
        responses: {
          kind: ["Notice he had your back", "Let him handle Leo"],
          playful: [
            "Ask what Leo said this time",
            "Tease him for defending you",
          ],
          bold: ["Tell Leo to drop it", "Say Leo's all talk"],
          neutral: ["Ignore Leo", "Get back to work"],
        },
      },
      {
        line: "He keeps glancing at the garage door like he's waiting for someone who isn't coming.",
        approach: "Ask who he's waiting on",
        greeting:
          '"Bandana disappears right around this time every day lately... What\'s he doing?"',
        responses: {
          kind: ["Say Sho's probably fine", "Say you'll keep an eye out"],
          playful: [
            "Guess Sho's got a secret hobby",
            "Ask if he's worried about Sho",
          ],
          bold: ["Say you'll ask Sho for him", "Tell him to just ask Sho"],
          neutral: ["Say you haven't seen Sho", "Leave Sho's business be"],
        },
      },
    ],
    warm: [
      {
        line: "You find him at a fork in the campus path, turning slowly on the spot. When he sees you, he doesn't pretend this time.",
        approach: "Walk him where he's going",
        greeting: '"Passed that same bench three times. ...Walk with me?"',
        responses: {
          kind: [
            "Walk with him, no questions",
            "Say you're headed the same way",
          ],
          playful: ["Ask how many laps he's done", "Take the scenic route"],
          bold: [
            "Answer yes before he's done",
            "Say you'll walk him every time",
          ],
          neutral: ["Fall into step beside him", "Point down the right path"],
        },
      },
      {
        line: "He's loading gear outside the garage for a trip with a few of the Vagastrom guys. He stops when he sees you.",
        approach: "Ask what the gear is for",
        greeting:
          '"Signed off on an R&R permit for once. Taking the guys to the mountains. ...You want to come too?"',
        responses: {
          kind: ["Say you'd like to come along", "Ask what you should bring"],
          playful: ["Ask who's reading the map", "Ask if Leo's coming"],
          bold: ["Say you're already packed", "Ask when you're leaving"],
          neutral: ["Say you might come", "Go grab your things"],
        },
      },
      {
        line: "Out back of the garage, you find him talking low with Tohma. Tohma sees you first and smiles. Alan doesn't send you away.",
        approach: "Keep their secret",
        greeting: "\"She's fine, Tohma. ...You didn't see this.\"",
        responses: {
          kind: ["Promise you saw nothing", "Say you'll keep quiet"],
          playful: [
            "Ask what the two are plotting",
            "Ask if you're in on it now",
          ],
          bold: ["Say you'll keep watch", "Nod to Tohma, then go"],
          neutral: ["Walk on like you saw nothing", "Wait until they're done"],
        },
      },
      {
        line: '"You eat today?" he asks. It\'s the third time this week.',
        approach: "Split his lunch with him",
        greeting:
          "\"Huh. I forgot to eat myself. ...I don't eat in the cafeteria. Portions aren't big enough. That's the only reason.\"",
        responses: {
          kind: ["Say you'll eat together", "Offer to make him a plate"],
          playful: [
            "Tease him for keeping count",
            "Ask if he's asking for him",
          ],
          bold: ["Say you're feeding him today", "Tell him to eat first"],
          neutral: [
            "Say you ate already",
            "Ask where he does eat",
          ],
        },
      },
      {
        line: "The garage radio is on. He turned it on because you like it. He won't say so.",
        approach: ["Notice the radio", "Let the radio play"],
        greeting: "\"...Figured you'd want it on. Don't tell Leo.\"",
        responses: {
          kind: ["Stay and listen while he works", "Say he figured right"],
          playful: ["Ask if it's your radio now", "Ask what station he picked"],
          bold: ["Say you'll pick next time", "Hum along to the radio"],
          neutral: ["Leave the dial alone", "Listen without comment"],
        },
      },
      {
        line: "He hands you the mission file before anyone else in the house has seen it.",
        // He's in captain mode, asking for a second pair of eyes: getting
        // straight to work lands better than reassuring him.
        mood: true,
        approach: "Ask why you're first",
        greeting: '"Read it tonight. Tell me what I missed."',
        responses: {
          kind: ["Promise you'll read it", "Say you've got his back on it"],
          playful: [
            "Ask if you're promoted now",
            "Ask if there's a quiz after",
          ],
          bold: ["Say you'll check it twice", "Say you'll go over it together"],
          neutral: ["Take the file", "Read it tonight"],
        },
      },
      {
        line: "He laughs, short and surprised at himself. He doesn't do that often.",
        approach: "Ask what's so funny",
        greeting: '"Was I laughing? ...Huh. Didn\'t notice."',
        responses: {
          kind: ["Laugh with him", "Say it suits him"],
          playful: ["Ask if it was your joke", "Try for another laugh"],
          bold: ["Say you're keeping that one", "Say you noticed it"],
          neutral: ["Let him have the moment", "Make nothing of it"],
        },
      },
      {
        line: "He's just finished tearing into Sho and Leo. When he turns to you, his voice drops back to normal.",
        approach: "Ask if they'll be okay",
        greeting: "\"They've got potential. Don't tell them I said that.\"",
        responses: {
          kind: ["Ask if he's okay too", "Say he's good for them"],
          playful: ["Ask if you're in trouble too", "Ask how loud it got"],
          bold: ["Say he was right to", "Tell him they'll come around"],
          neutral: ["Wait for him to cool off", "Leave the lecture be"],
        },
      },
      {
        line: "He waits for you outside the garage before the mission instead of setting off alone. Everyone knows why. Nobody says it.",
        // He's on mission footing: being ready at his side lands better than
        // softness about the wait.
        mood: true,
        approach: "Meet him outside the garage",
        greeting: '"...There you are. Get your things. We\'re going."',
        responses: {
          kind: [
            "Say you'd rather go together",
            "Say you were hoping he'd wait",
          ],
          playful: ["Ask if he packed snacks", "Ask if he's lost again"],
          bold: ["Tell him you're ready", "Fall in at his side"],
          neutral: ["Get your things", "Head out with him"],
        },
      },
      {
        line: 'He holds his phone out to you, screen first. "How do you send a picture on this?"',
        approach: "Show him how",
        greeting: '"Leo laughed at me last time. You won\'t."',
        responses: {
          kind: ["Show him where the button is", "Say the app is confusing"],
          playful: ["Send yourself a photo of him", "Ask who it's going to"],
          bold: ["Set the whole thing up for him", "Have him send one to you"],
          neutral: ["Show him the steps once", "Tap through it for him"],
        },
      },
      {
        line: "His wallet's held together with tape at this point. He catches you looking.",
        approach: "Ask about the wallet",
        greeting:
          "\"Yeah, it's pretty beat up. Can't bring myself to chuck it, though. Got some good memories with it.\"",
        responses: {
          kind: ["Say it's worth keeping", "Say you'd keep it too"],
          playful: [
            "Ask if it still holds cash",
            "Ask if the tape's load-bearing",
          ],
          bold: ["Tell him not to replace it", "Say good memories count"],
          neutral: ["Leave the wallet be", "Let it go back in his pocket"],
        },
      },
      {
        line: "It gets late in the garage. He doesn't tell you to head back to your dorm anymore.",
        approach: "Stay a while longer",
        greeting: ["\"It's late. I'll walk you back when you're ready.\""],
        responses: {
          kind: ["Say you'll stay till he's done", "Offer to help tidy up"],
          playful: ["Ask if he just likes company", "Ask if he's stalling too"],
          bold: ["Stay as long as you want", "Tell him he's stuck with you"],
          neutral: ["Hang around the garage", "Wait by the door"],
        },
      },
      {
        line: "He stops by on his way out to a mission, already halfway to the door.",
        approach: "Catch him before he goes",
        greeting:
          "\"I'm heading out. Mission. Make sure you go to class. ...I'll let you know when I'm back.\"",
        responses: {
          kind: ["Tell him to come back safe", "Say you'll be here after"],
          playful: ["Ask if he's got directions", "Ask for a souvenir"],
          bold: ["Say he'd better text you", "Ask to come with him"],
          neutral: ["Nod and let him go", "Let him head out"],
        },
      },
      {
        line: "He sets a can from the vending machine down next to you and keeps walking, like it just happened to be there.",
        approach: "Take the drink he left",
        greeting: '"Machine gave me two. Take one."',
        responses: {
          kind: ["Catch up and walk with him", "Say it's your favorite"],
          playful: ["Ask if it just appeared", "Ask what he got himself"],
          bold: ["Tell him to wait up", "Buy him one next time"],
          neutral: ["Take the can", "Drink it as you go"],
        },
      },
      {
        line: "People have stopped asking around when they need Alan. Now they just ask you.",
        approach: "Tell him who came looking",
        greeting: '"Who was it this time? ...Sorry they keep bothering you."',
        responses: {
          kind: [
            "Say you don't mind being asked",
            "Say you'd rather it be you",
          ],
          playful: [
            "Tease him about being popular",
            "Start charging them a fee",
          ],
          bold: [
            "Say you always know his spot",
            "Say they ask you for a reason",
          ],
          neutral: ["Say you don't mind", "Pass the message along"],
        },
      },
      {
        line: "You skipped training yesterday. He noticed, and he hasn't said a word about it until now.",
        approach: "Ask if he's mad",
        greeting:
          '"Not mad. ...Slack off once, and you\'ll find out how hard it is to get back in the game."',
        responses: {
          kind: ["Say you'll be there tomorrow", "Say you missed being there"],
          playful: [
            "Ask if he took attendance",
            "Say you were resting your legs",
          ],
          bold: ["Ask him to train you himself", "Say you'll make it up today"],
          neutral: ["Nod and take the lecture", "Let him have his say"],
        },
      },
      {
        line: "After the debrief he stops you at the door before you can slip out.",
        // He's handing out a captain's praise: owning it lands better than
        // modest thanks.
        mood: true,
        approach: "Wait to hear him out",
        greeting:
          "\"I've noticed your efforts. You're doing a good job. Hold your head high.\"",
        responses: {
          kind: ["Tell him he did good too", "Say you learned it from him"],
          playful: ["Ask if it's going in the log", "Stand up extra straight"],
          bold: ["Say you'll keep earning it", "Ask what's next, captain"],
          neutral: ["Nod and head out", "Take it and go"],
        },
      },
      {
        line: "The captain's log has a line in it now that isn't about missions. He never shows you which one.",
        approach: "Ask what he wrote in the log",
        greeting:
          "\"Some things I write down so I don't forget them. ...That's all.\"",
        responses: {
          kind: ["Let him keep his secret", "Say the log is his own"],
          playful: ["Guess which line is yours", "Guess wildly on purpose"],
          bold: ["Say you'll write one back", "Say you'll find it someday"],
          neutral: ["Let the log stay closed", "Don't ask which line"],
        },
      },
    ],
    spark: [
      {
        line: "He wipes his hands twice before he touches you. He touches you anyway.",
        approach: [
          "Let him wipe his hands first",
          "Wait for him to touch you",
          "Let his hand linger",
          "Stay still for him",
          "Hold still",
          "Hold still for the eyelash",
        ],
        greeting: '"Hold still. Eyelash on your cheek. ...There. Got it."',
        responses: {
          kind: ["Let him be careful with you", "Let him hold still with you"],
          playful: "Press a finger to his cheek",
          bold: "Tell him not to be careful",
          neutral: "Stay without a word",
        },
      },
      {
        line: "He's careful with you in a way he isn't careful with anything else.",
        approach: [
          "Let him go slow",
          "Stay a bit longer",
          "Stay exactly where you are",
          "Let the quiet settle",
          "Hold his gaze",
        ],
        greeting: "\"Don't go home yet. That's all. That's the whole ask.\"",
        responses: {
          kind: ["Say you're not going anywhere", "Tell him to stay close"],
          playful: "Ask how long he can wait",
          bold: ["Say you want this", "Hold his gaze first"],
          neutral: "Let him set the pace",
        },
      },
      {
        line: "The silence between you has stopped being comfortable and started being loaded.",
        approach: [
          "Hold the loaded silence",
          "Step into the silence",
          "Ask what's under the quiet",
          "Stand closer than that",
          "Test how close is too close",
          "Stand your ground, closer",
        ],
        greeting:
          '"You keep standing that close, I\'m gonna do something about it."',
        responses: {
          kind: "Let the quiet be enough",
          playful: ["Stand closer on purpose", "Dare him to come closer"],
          bold: ["Do something about it", "Close the distance first"],
          neutral: [
            "Let the silence sit",
            "Match the loaded quiet",
            "Step back",
          ],
        },
      },
      {
        line: "He tucks your hair back with rough, calloused fingers and says nothing about it.",
        approach: [
          "Let him tuck your hair back",
          "Let him read you instead",
          "Read it off him",
          "Say nothing, stay anyway",
        ],
        greeting:
          "\"I'm no good at saying it. You'll have to read it off me.\"",
        responses: {
          kind: "Read it off him",
          playful: "Turn the tease back on him",
          bold: "Say it for him",
          neutral: "Stay where you are",
        },
      },
      {
        line: '"...Come here," he says. It takes him a long time to get those two words out.',
        approach: [
          "Come here",
          "Wait out his long pause",
          "Let him find the words",
          "Let him close the distance",
          "Ask him to finish the thought",
          "Don't go home yet",
        ],
        greeting: '"Come here. Closer than that."',
        responses: {
          kind: "Cover his hands with yours",
          playful: ["Tease the long pause", "Ask if that took practice"],
          bold: "Take the first step",
          neutral: "Wait him out",
        },
      },
    ],
    close: [
      {
        line: '"I keep my head better with you around," he says, low, like a confession. "Thank you."',
        approach: "Take his hands",
        greeting:
          "\"I don't sleep much. It's easier when I know you're all right.\"",
        responses: {
          kind: "Say it means a lot to hear",
          playful: "Get him laughing",
          bold: "Tell him he isn't alone",
          neutral: "Look at his hands",
        },
      },
      {
        line: "He stops working entirely. For him, that's practically a declaration.",
        approach: "Tell him to rest",
        greeting: '"Whatever it is, you tell me first. I\'ll handle it."',
        responses: {
          kind: "Tell him he can put it down",
          playful: "Ask what stopped him",
          bold: "Say you'll tell him first",
          neutral: "Understand his quiet",
        },
      },
      {
        line: "He puts his jacket over your shoulders before you've admitted you're cold.",
        approach: "Wear his jacket",
        greeting: '"Come here. Let me look at you."',
        responses: {
          kind: "Let him look after you",
          playful: "Steal his jacket",
          bold: "Trust his protection",
          neutral: "Keep the jacket on",
        },
      },
      {
        line: '"Stay a while," he says. Three words from him weigh more than most speeches.',
        approach: "Stay a while",
        greeting:
          "\"Most of what sticks with me, I'd rather forget. You're not on that list. Stay.\"",
        responses: {
          kind: "Give him better things to keep",
          playful: "Talk until he gives in",
          bold: "Ask him to lean on you",
          neutral: "Sit through the long pause",
        },
      },
      {
        line: "The tired in his shoulders eases the moment you sit down beside him.",
        approach: "Sit down beside him",
        greeting: '"I\'m not good with words. You already know what I mean."',
        responses: {
          kind: "Say you know what he means",
          playful: "Ask if a nap beats him",
          bold: "Pull him against you",
          neutral: "Match his silence",
        },
      },
    ],
    bound: [
      {
        line: "He sleeps through the night now. He knows why. He'll never say it out loud.",
        approach: "Stay the whole night",
        greeting: '"Stay. Whole night. I sleep better."',
        responses: {
          kind: "Stay the whole night",
          playful: "Ask what he dreams about",
          bold: "Say you know why",
          neutral: "Let him sleep",
        },
      },
      {
        line: "His hands are rough and careful and everywhere, and he still doesn't speak.",
        approach: "Come here",
        greeting: '"I don\'t say much. Never had to, with you."',
        responses: {
          kind: "Let him not speak",
          playful: "Talk enough for two",
          bold: "Say it first",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He pulls you into his lap in the quiet of the garage like it's nothing. It isn't.",
        approach: "Sit with him",
        greeting: '"Sit here. On me. Yeah. Like that."',
        responses: {
          kind: "Settle into him gladly",
          playful: "Tease him for the pull",
          bold: "Climb into his lap",
          neutral: "Sit in the quiet",
        },
      },
      {
        line: '"...Love you," he says into your hair, so quietly it\'s almost deniable.',
        approach: "Say it for him",
        greeting:
          '"...Love you. Don\'t make me repeat it, I barely got it out."',
        responses: {
          kind: "Say it back for him",
          playful: "Pretend you missed it",
          bold: "Say it back louder",
          neutral: "Hold on to him",
        },
      },
      {
        line: "He's stopped holding back before he touches you. He used to be so careful. You told him he didn't have to be.",
        approach: "Meet him without holding back",
        greeting: '"Come here. Don\'t need a reason anymore, do I."',
        responses: {
          kind: "Go to him, no reason needed",
          playful: "Steal his jacket again",
          bold: "Tell him not to wash up",
          neutral: "Meet him halfway",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // the 28 `spark` labels that were left were each placed on the beat they
  // fit. One bound playful label, "Wear his gloves to bed", had no genuine
  // beat match and was dropped.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** looks {user} over once. "...Yeah. That\'s me."',
      "**{name}** had been at that corner a while, working out which way it went. {user} comes over to help.",
      '{user} trips on a loose step walking toward **{name}**. "...You okay?"',
      '**{name}** stops mid-stride and turns to {user}. After a pause: "...You lost?"',
    ],
    known: [
      "**{name}** knows {user}'s voice by now. He doesn't need to check who it is.",
      '{user} stops by to say hi, and **{name}** looks up. "...Still around. Good."',
      "**{name}** is out on a run, and slows to a stop when {user} calls out.",
    ],
    warm: [
      "{user} calls out, and **{name}** stops walking.",
      "{user} runs into **{name}** at lunch, and the food is forgotten.",
      "**{name}** doesn't say much when {user} shows up, but he seems happy to see them.",
    ],
    spark: [
      "{user} calls out, and **{name}** comes over and pats them on the head. That's his hello now.",
      '"...Thought that was you." **{name}** says it low, standing closer to {user} than he needs to.',
      "**{name}** doesn't say anything when {user} reaches him. He tips his head toward the quiet end of the courtyard and waits.",
    ],
    close: [
      "**{name}** was already walking {user}'s way before the name finished.",
      "{user} calls, and **{name}** puts a hand at their back, steering them out of the crowd.",
      "**{name}** says nothing. He stays where {user} can reach him.",
    ],
    bound: [
      '"Come here. Don\'t need a reason anymore, do I." **{name}** says it low, only to {user}.',
      "**{name}** hears {user}, and his shoulders finally come down.",
      "**{name}** crosses the courtyard to {user} without once checking which way he's going.",
    ],
  },
};
