import bondScenes from "../bondScenes/yuri.js";

export default {
  // Level-up DMs: constants/bondScenes/yuri.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: '"What are you dawdling for? Change out of those rags and report to my lab immediately!"',
        approach: "Enter the lab",
        greeting: '"Are you here to be useful, or to be a variable?"',
        responses: {
          kind: ["Say you're here to be useful", "Ask where he needs you"],
          playful: ["Be a deliberate variable", "Dawdle on purpose"],
          bold: ["Say you're here by choice", "Start before he assigns you"],
          neutral: ["Don't answer either way", "Skip the argument, go"],
        },
      },
      {
        line: '"Fascinating," he says, about you, in the tone one uses about a specimen.',
        approach: "Be interesting",
        greeting:
          "\"I am a very busy man, so if you don't require examination, then we're done here.\"",
        responses: {
          kind: [
            "Ask for an examination, then",
            "Say you'll wait till he's free",
          ],
          playful: [
            "Ask if he's taking notes",
            "Offer to be his prize specimen",
          ],
          bold: ["Say you're not done here yet", "Turn the observation around"],
          neutral: ["Don't react to the label", "Let him look, say nothing"],
        },
      },
      {
        line: "He doesn't look up from the slide. \"Don't touch that. Or anything else in here.\"",
        approach: "Stand still",
        greeting: '"Good. Stay exactly there. A genius is at work."',
        responses: {
          kind: ["Ask what he's found so far", "Tell him to take his time"],
          playful: ["Ask if you may blink", "Lean in a little closer"],
          bold: ["Ask to see the slide", "Move closer to the slide"],
          neutral: ["Look around the lab instead", "Step back and wait"],
        },
      },
      {
        line: "The lab hums. He's been awake for an unreasonable number of hours and it shows.",
        approach: "Ask if he's slept",
        greeting: '"Hm. Poor posture, poor sleep, poor decisions. Textbook."',
        responses: {
          kind: [
            "Say you're worried about him",
            "Offer to sit with him a while",
          ],
          playful: [
            "Say he's describing himself",
            "Guess how long he's been awake",
          ],
          bold: ["Call out the overworking", "Quote his sleep rule back"],
          neutral: ["Let him work", "Say nothing about it"],
        },
      },
      {
        line: '"You should feel honored to be chosen as the test subject of Dr. Yuri Isami, genius and visionary!"',
        approach: "Roll up your sleeve",
        greeting: '"Still. This is a privilege, not a conversation."',
        responses: {
          kind: ["Say you're in good hands", "Hold still and let him work"],
          playful: ["Ask for his autograph", "Ask if you get a lollipop"],
          bold: ["Ask what he's testing for", "Ask to see the results after"],
          neutral: [
            "Hold out your arm, indifferent",
            "Wait without asking questions",
          ],
        },
      },
    ],
    known: [
      {
        line: "He's stopped calling you 'worm.' He hasn't replaced it with anything yet.",
        approach: "Ask what he'll call you now",
        greeting:
          "\"I'll call you what I like, when I've settled on it. These things require precision.\"",
        responses: {
          kind: ["Say you don't mind waiting", "Say you'll like what he picks"],
          playful: [
            "Offer terrible suggestions",
            "Guess wildly at what's next",
          ],
          bold: ["Offer him your actual name", "Say you'll hold him to it"],
          neutral: ["Shrug and let it go", "Don't chase an answer"],
        },
      },
      {
        line: "He hasn't eaten since yesterday. There's proof, if you look for the wrappers he pretends aren't there.",
        approach: "Bring him something to eat",
        greeting:
          '"I don\'t require sustenance. I require silence and a working centrifuge. ...What is that."',
        responses: {
          kind: ["Insist he eat something", "Say you made it for him"],
          playful: ["Wave it under his nose", "Dare him to ignore it"],
          bold: ["Put the meal in his hands", "Say a doctor needs to eat"],
          neutral: ["Leave it on his desk", "Say nothing, just walk away"],
        },
      },
      {
        line: '"Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi... Ahem, the treatment, immediately."',
        approach: "Let him examine you",
        greeting:
          '"Do try not to bleed on anything. I only just cleaned the equipment."',
        responses: {
          kind: ["Say you trust his hands", "Hold still for the treatment"],
          playful: ["Call him out on 'experi-'", "Ask if you're lab rat #1"],
          bold: ["Hold the injury out steadily", "Ask what he'll try first"],
          neutral: ["Let him work without a word", "Watch him work in silence"],
        },
      },
      {
        line: "He notes something about you in the margin, and covers it when you look.",
        approach: "Ask what he wrote",
        greeting:
          '"I catalogued your visit. Purely for scientific record-keeping."',
        responses: {
          kind: ["Let him keep his secret", "Don't make him explain"],
          playful: ["Read his margin notes aloud", "Peek over his shoulder"],
          bold: ["Say you'll be worth the notes", "Ask to be catalogued again"],
          neutral: ["Let him finish his notes", "Say nothing about it"],
        },
      },
      {
        line: "The insults have gotten more specific, which means he's been paying attention.",
        approach: "Take it as flattery",
        greeting:
          '"My observations got sharper. That\'s not the same as caring."',
        responses: {
          kind: ["Say you trust his eye", "Ask what else he's noticed"],
          playful: ["Ask for a more precise one", "Keep count of them"],
          bold: ["Say you've been observing too", "Say you'll take sharper"],
          neutral: ["Let the insults roll past", "Take none of it personally"],
        },
      },
      {
        line: "He's shouted Jiro's name down the hall three times now, too busy to go looking himself.",
        approach: "Tell him you found him",
        greeting:
          '"Jiro!! Jiro!!! What on earth are you... ah. It\'s you. Sit."',
        responses: {
          kind: ["Offer to go look for him", "Sit and ask what he needs"],
          playful: ["Ask if you look like Jiro", "Answer to Jiro's name"],
          bold: ["Take Jiro's spot for now", "Ask what he needed Jiro for"],
          neutral: ["Don't announce yourself", "Stay quiet in the doorway"],
        },
      },
      {
        line: "\"You're less useless than the last one,\" he announces, like it's the nicest thing he's ever said.",
        approach: "Be less useless",
        greeting: '"That was observation, not praise. Don\'t confuse the two."',
        responses: {
          kind: ["Take it as observation", "Say you'll keep improving"],
          playful: ["Ask who the last one was", "Say you'll treasure it"],
          bold: ["Call it a compliment anyway", "Say you'll earn the real one"],
          neutral: ["Take none of it seriously", "Not worth a reaction"],
        },
      },
      {
        line: "He's cleared a space on the bench beside him without being asked, mid-rant, like it's obvious you'd sit there.",
        approach: "Sit without asking",
        greeting: '"...Sit, then. I already made room, don\'t act shocked."',
        responses: {
          kind: ["Sit, ask what he's working on", "Sit down, no fuss"],
          playful: ["Ask if he saved it for you", "Act surprised by the space"],
          bold: ["Take the seat like you own it", "Sit before he can protest"],
          neutral: ["Sit like it's nothing", "Take the space, unbothered"],
        },
      },
      {
        line: "The research budget came through at last. He has found four separate excuses to mention it in ten minutes.",
        approach: "Ask about the new equipment",
        greeting:
          '"Hmph. You noticed the new equipment. The research grant committee finally saw sense. About time."',
        responses: {
          kind: ["Admire the new equipment", "Ask him to show it off"],
          playful: ["Ask what it all cost", "Ask him to name each one"],
          bold: ["Ask what he'll research first", "Ask what took so long"],
          neutral: [
            "Glance at it and say nothing",
            "Let him talk, say nothing",
          ],
        },
      },
      {
        line: "He's humming classical music under his breath and doesn't stop when he notices you noticing.",
        approach: "Let him keep humming",
        greeting:
          '"Yes, I\'m aware. I have talents beyond medicine. Try not to be too astonished."',
        responses: {
          kind: ["Ask what he's humming", "Let him have the moment"],
          playful: ["Applaud when he finishes", "Ask if he does weddings"],
          bold: ["Ask for the whole piece", "Request something you know"],
          neutral: ["Tune it out", "Not notice the humming at all"],
        },
      },
      {
        line: "He's muttering about the academy's research budget like it's a personal insult, entirely unprompted.",
        approach: "Take his side",
        greeting:
          '"Even Nicolas agrees the work is sound. And still the academy gives me a budget fit for a middle school science fair!"',
        responses: {
          kind: ["Say his work deserves better", "Let him vent"],
          playful: ["Ask if he's drafting a speech", "Ask what he'd buy first"],
          bold: ["Say you'll back his case", "Say the results will prove it"],
          neutral: ["Half-listen, say nothing", "Tune out the rant"],
        },
      },
      {
        line: "He's hidden the isekai novel under a stack of medical journals, badly, the spine sticking out.",
        approach: "Don't mention the book",
        greeting:
          '"...You didn\'t see anything. Not a word, or I revoke your visiting privileges."',
        responses: {
          kind: ["Smile to yourself, say nothing", "Keep his secret safe"],
          playful: ["Zip your lips, dramatically", "Ask if it's any good"],
          bold: ["Ask to borrow it after", "Say you'd read it too"],
          neutral: ["Pretend you didn't see it", "Look away, say nothing"],
        },
      },
      {
        line: '"You should feel honored," he says, of something small and ordinary he just did for you.',
        approach: "Feel honored anyway",
        greeting:
          '"You walk in with zero notice, now I have to rearrange my schedule. Try to appreciate that."',
        responses: {
          kind: ["Say you know he's busy", "Let yourself feel honored"],
          playful: ["Play along with the bit", "Ask what he moved for you"],
          bold: ["Say you'll keep turning up", "Say he can rearrange again"],
          neutral: ["Accept it, ask nothing", "Nod and move on"],
        },
      },
    ],
    warm: [
      {
        line: "His cold demeanor cracks slightly: there's obsession in his eyes now, the drive to cure your curse is consuming him.",
        approach: "Notice the obsession",
        greeting:
          '"I do this for the future of humanity. And for yo... for the specimen. Your case is unusually stubborn, that\'s all."',
        responses: {
          kind: ["Let him fuss over your pulse", "Say you trust him with it"],
          playful: [
            "Ask if the specimen has a name",
            "Say the specimen is flattered",
          ],
          bold: ["Say you'll see it through too", "Tell him to slow down"],
          neutral: ["Stay professional about it", "Stay out of his way"],
        },
      },
      {
        line: "He has a new set of notes. Every page of them is about you.",
        approach: "Ask what he's working on",
        greeting:
          '"I\'ve read your file eleven times. Purely academic interest, obviously."',
        responses: {
          kind: ["Ask to see the notes", "Say no one's been as thorough"],
          playful: ["Ask what page you're on", "Tease him about the notes"],
          bold: ["Demand to see the file", "Say eleven isn't enough"],
          neutral: ["Don't name it", "Let it go unremarked"],
        },
      },
      {
        line: '"Where on earth have you been, worm?" he snaps. "Next time you take a leave of absence, you inform me in advance."',
        approach: "Sit down as told",
        greeting: '"You\'re late. Not that I was... never mind. Sit."',
        responses: {
          kind: ["Report in like a good patient", "Say sorry for worrying him"],
          playful: ["Ask if he was counting", "Ask if he filed a complaint"],
          bold: ["Say nothing kept you away", "Say you came straight here"],
          neutral: ["Sit in the lab quietly", "Take the seat, say nothing"],
        },
      },
      {
        line: "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
        // Caught out caring: teasing how he noticed lands better than
        // taking the bottle, since the flustered denial is the point.
        mood: true,
        approach: "Take the offered bottle",
        greeting:
          "\"Take this. It's for the headache you've been pretending not to have.\"",
        responses: {
          kind: ["Take the painkiller", "Ask if he's taken one"],
          playful: ["Ask if he's worried about you", "Ask how he even noticed"],
          bold: ["Put one in his hand too", "Say you'll take one if he does"],
          neutral: ["Take it without a word", "Pocket it, say nothing"],
        },
      },
      {
        line: "He turns bright red mid-sentence and blames the lab lighting.",
        approach: "Ask what he was saying",
        greeting:
          '"I was saying... it was nothing of consequence. The lighting in here is atrocious, that\'s the whole of it."',
        responses: {
          kind: ["Agree about the lighting", "Give him a moment"],
          playful: [
            "Offer to fix the lighting",
            "Ask what he was really saying",
          ],
          bold: ["Match his volume", "Say you'd like to hear it"],
          neutral: ["Say nothing, let him recover", "Wait it out, unbothered"],
        },
      },
      {
        line: "He's marching you across Mortkranken to see a recent finding. Three corridors in, he still hasn't admitted he's lost.",
        approach: "Take over the navigating",
        greeting:
          '"I know precisely where we are. The building was renovated, that\'s all."',
        responses: {
          kind: ["Let him lead anyway", "Say you're in no hurry"],
          playful: ["Ask if he's lost", "Offer him a map"],
          bold: ["Take his arm, keep walking", "Point the right way"],
          neutral: ["Follow without comment", "Walk on, say nothing"],
        },
      },
      {
        line: "Your name is on the lab whiteboard now, in his handwriting, in a slot nobody else gets.",
        approach: "Ask about the slot",
        greeting:
          "\"It's a standing appointment. A genius's time is precious, so consider yourself privileged.\"",
        responses: {
          kind: ["Say you'll be there", "Promise never to miss it"],
          playful: ["Ask who you outranked", "Ask for a better time"],
          bold: ["Ask why you get a slot", "Claim the slot as yours"],
          neutral: ["Note the time, say nothing", "Accept the appointment"],
        },
      },
      {
        line: "Jiro booked your next check-up before you thought to ask. Yuri has now read that line in the ledger four times.",
        approach: "Ask about the check-up",
        greeting:
          '"Jiro scheduled you. Without consulting me. He does not do that. For anyone. Explain it."',
        responses: {
          kind: ["Say Jiro was being thorough", "Say you're his patient first"],
          playful: [
            "Ask if he's jealous of Jiro",
            "Say Jiro is very attentive",
          ],
          bold: ["Say he's the one you'd ask", "Say you'll book the next one"],
          neutral: ["Let the ledger go", "Say nothing about it"],
        },
      },
      {
        line: "The space heater has migrated across the lab to the spot where he always examines you.",
        approach: "Sit where it's warm",
        greeting:
          '"The heater is positioned for equipment calibration. You simply happen to be in its range."',
        responses: {
          kind: ["Say his patients are lucky", "Say you noticed the warmth"],
          playful: ["Ask which equipment", "Ask if you're the equipment"],
          bold: ["Say it can stay right there", "Pull him into the warm too"],
          neutral: ["Hold your hands to the heat", "Settle in, say nothing"],
        },
      },
      {
        line: "Jiro mentions that the whole afternoon was cleared for you. Yuri hears him do it.",
        approach: "Thank him for the time",
        greeting:
          '"Jiro exaggerates! I cleared nothing. There simply happened to be a gap in my afternoon. ...A large one. I made sure of it."',
        responses: {
          kind: ["Say you'll make it worth it", "Ask what he planned for it"],
          playful: ["Ask Jiro for more details", "Ask how large the gap was"],
          bold: ["Say you'll take all of it", "Say you'll fill the gap"],
          neutral: ["Let the two of them argue", "Let the excuse stand"],
        },
      },
      {
        line: "Someone called his research a hobby this morning. He's been sharpening the same pencil for five minutes.",
        approach: "Take the pencil away",
        greeting:
          '"I am not upset. Amateurs may call my life\'s work whatever they like."',
        responses: {
          kind: ["Say his work matters", "Tell him they were wrong"],
          playful: ["Offer a fresh pencil", "Ask if that's his calm face"],
          bold: ["Ask who dared say it", "Tell him to forget them"],
          neutral: ["Keep hold of the pencil", "Wait for him to calm down"],
        },
      },
      {
        line: '"Don\'t touch that." A pause. "...That one, you may touch. Carefully."',
        approach: "Handle the equipment",
        greeting:
          '"Carefully. That cost more than your tuition. ...I\'ll be watching."',
        responses: {
          kind: ["Ask what it's for", "Say you're honored"],
          playful: [
            "Ask if this is a promotion",
            "Ask what else you may touch",
          ],
          bold: ["Ask him to show you how", "Ask what changed"],
          neutral: ["Touch it, say nothing", "Set it down again"],
        },
      },
      {
        line: "There's a flask on the shelf with your name on the label, written far more carefully than the others.",
        // The careful label gives him away: teasing what it means flusters him
        // more than taking the flask at face value.
        mood: true,
        approach: "Ask about the flask",
        greeting:
          '"That one is yours. Formulated for you specifically. Legible labeling is basic laboratory protocol."',
        responses: {
          kind: ["Say you'll take it daily", "Ask what went into it"],
          playful: [
            "Ask if he practiced your name",
            "Ask if it's a love potion",
          ],
          bold: ["Drink it in front of him", "Ask for the next batch"],
          neutral: ["Take the flask, say nothing", "Pocket it and move on"],
        },
      },
      {
        line: "He's humming over your chart, the same eight bars on a loop, and doesn't seem to know he's doing it.",
        // Caught humming unaware: joining in on the tune flusters him more
        // than leaving him be.
        mood: true,
        approach: "Listen without stopping him",
        greeting:
          '"What? I wasn\'t aware I was... The piece is stuck in my head. It aids concentration. That is all."',
        responses: {
          kind: ["Let him hum, say nothing", "Say it helps you focus too"],
          playful: ["Say he hums when he's happy", "Hum the next bars for him"],
          bold: ["Ask him to play it properly", "Ask what put him in a mood"],
          neutral: ["Get on with the work", "Let it play out"],
        },
      },
      {
        line: "You dozed off at the bench. His coat is over your shoulders when you wake, and he is across the room being loudly busy.",
        approach: "Give the coat back",
        greeting:
          '"Keep the coat. Hypothermia in my own lab would set the research back considerably."',
        responses: {
          kind: ["Keep the coat on", "Ask if he's warm enough"],
          playful: ["Model the coat for him", "Ask to keep it"],
          bold: ["Wear it home, no debate", "Put it back on his shoulders"],
          neutral: ["Fold the coat, say nothing", "Hand it back, no comment"],
        },
      },
      {
        line: "You sent him one question. Four paragraphs came back within a few minutes, from a very busy man.",
        approach: "Ask a follow-up question",
        greeting:
          '"I replied promptly because the question was urgent. That is the only reason."',
        responses: {
          kind: ["Say his answer was thorough", "Say he explains it best"],
          playful: [
            "Ask if he was waiting by it",
            "Say he must type very fast",
          ],
          bold: ["Send another one right away", "Say you'll text him tomorrow"],
          neutral: ["Read it and move on", "Send back a short thanks"],
        },
      },
      {
        line: 'A visiting researcher asks who you are. "This is my..." He catches himself. "...patient. A patient of mine."',
        approach: "Let him finish that",
        greeting:
          '"Patient is the correct term. It is a precise term. Stop looking at me like that."',
        responses: {
          kind: ["Play along as the patient", "Let him off the hook"],
          playful: ["Ask what he nearly said", "Introduce yourself better"],
          bold: ["Say 'his' was enough", "Stand a little closer to him"],
          neutral: ["Shake the visitor's hand", "Say nothing, let it pass"],
        },
      },
      {
        line: "He takes the coffee out of your hand mid-sentence and replaces it with something that smells medicinal.",
        approach: "Drink whatever that is",
        greeting:
          '"Lack of sleep is the root of all illness. Drink that, then go to bed."',
        responses: {
          kind: ["Drink it without arguing", "Promise to sleep tonight"],
          playful: ["Ask what's in it", "Ask if he follows that rule"],
          bold: ["Say you'll go if he does", "Pour him one too"],
          neutral: ["Drink it, say nothing", "Set the cup down"],
        },
      },
    ],
    spark: [
      {
        line: "He takes your pulse for the fourth time today, and loses count partway through.",
        approach: "Offer your wrist again",
        greeting:
          '"Hold still. That body of yours is a vital specimen, and I am monitoring it. ...Stop smiling."',
        responses: {
          kind: ["Say you trust his hands", "Ask what the reading says"],
          playful: ["Ask whose pulse is racing", "Ask if it's still fine"],
          bold: ["Ask what he's checking for", "Say a fifth check is fine"],
          neutral: ["Let it stay clinical", "Wait for him to finish"],
        },
      },
      {
        line: "You're walking side by side on a lazy afternoon, and your hands keep brushing. His ears have gone red to the tips.",
        approach: "Walk a little closer",
        greeting:
          '"M... M... My, what an adequate afternoon it is, no!? Hmph... What are you smiling at?"',
        responses: {
          kind: ["Say you're glad he came out", "Slow down to stay with him"],
          playful: ["Ask if he's too warm", "Bump his hand on purpose"],
          bold: ["Take his hand", "Say you're smiling at him"],
          neutral: ["Say it's nothing", "Keep your eyes ahead"],
        },
      },
      {
        line: "You mention feeling warm. He checks your forehead first, and only then remembers to ask.",
        approach: "Lean into his hand",
        greeting:
          '"As suspected. Allow me to examine you. Fortunately for you, I happen to have a new formula on hand."',
        responses: {
          kind: ["Ask what he'd prescribe", "Say you trust his diagnosis"],
          playful: ["Ask what symptom this is", "Ask for the prognosis"],
          bold: ["Say it isn't a fever", "Cover his hand with yours"],
          neutral: ["Let him finish checking", "Wait for him to let go"],
        },
      },
      {
        line: '"I suppose I can concede you have proven yourself useful in the lab, worm." He holds out a small wrapped box without looking at you.',
        approach: "Take the box",
        greeting:
          '"...This is a token of my gratitude. I-It\'s a reward for assisting me in my experiments, nothing more!"',
        responses: {
          kind: ["Say you'll keep it safe", "Ask if he chose it himself"],
          playful: ["Shake it to guess", "Ask if he wrapped it himself"],
          bold: ["Open it in front of him", "Say you'll be useful again"],
          neutral: ["Pocket it for later", "Take it with a nod"],
        },
      },
      {
        line: "You stop by Mortkranken looking for Jiro. Yuri steps out of the lab and plants himself in the doorway.",
        approach: "Ask for Jiro",
        greeting:
          '"You have business with Jiro? Not before bringing it to me, you don\'t. He is merely my assistant. As house captain, it is I who possesses the authority."',
        responses: {
          kind: ["Say you came to see him too", "Ask how his day's been"],
          playful: ["Ask what the captain's fee is", "Ask for a signed permit"],
          bold: ["Say he'll do just as well", "Ask him to walk you in"],
          neutral: ["Wait for Jiro to appear", "Wait for him to step aside"],
        },
      },
    ],
    close: [
      {
        line: '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
        approach: "Insist you don't need saving",
        greeting: '"I will solve this. You don\'t get to give up before I do."',
        responses: {
          kind: "Say the next one won't fail",
          playful: "Ask if you get a discount",
          bold: "Say you're his to save",
          neutral: "Let him have the conviction",
        },
      },
      {
        line: "He's asleep at the bench over your file. He'd rather die than let you say so.",
        approach: "Wake him from the bench",
        greeting:
          '"Don\'t go worrying me like that. I have better things to do than panic over you."',
        responses: {
          kind: "Let him rest, no argument",
          playful: "Read his notes out loud",
          bold: "Take the file away from him",
          neutral: "Sit quietly in the lab",
        },
      },
      {
        line: '"Don\'t you dare thank me," he warns, ears scarlet. "I\'m not doing it for gratitude."',
        approach: "Ignore the warning",
        greeting:
          '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."',
        responses: {
          kind: "Say the thanks he forbade",
          playful: "Fluster him on purpose",
          bold: "Refuse to take it back",
          neutral: "Let him deflect, say nothing",
        },
      },
      {
        line: "He's stopped flinching when you reach for your coat. He hadn't noticed he was doing it until it stopped.",
        approach: "Go to him",
        greeting:
          '"I always preserve the lives of my patients. I cannot make guarantees for any other parts of them, however. ...You, I keep whole."',
        responses: {
          kind: "Reach for his hand instead",
          playful: "Reach for his coat pointedly",
          bold: "Ask when he stopped flinching",
          neutral: "Let him pretend it's nothing",
        },
      },
      {
        line: "He grips your wrist a moment too long, checking a pulse he already knows is fine.",
        approach: "Let him take your pulse",
        greeting:
          '"I said sit down. Please. ...There. Was that so hard for either of us?"',
        responses: {
          kind: "Let him hold on longer",
          playful: "Ask how long he'll pretend",
          bold: "Match his intensity",
          neutral: "Let the moment stretch quietly",
        },
      },
    ],
    bound: [
      {
        line: "He is furious about how much he loves you and expresses it almost entirely with his hands.",
        approach: "Get over there",
        greeting:
          '"You belong to me. I won\'t hand you to another researcher..." He stops cold. "N-No. You\'ve misunderstood. I merely..."',
        responses: {
          kind: "Tell him he's allowed",
          playful: "Tease him about the hands",
          bold: "Ask what he's so furious about",
          neutral: "Let his hands do the talking",
        },
      },
      {
        line: '"Don\'t look at me like that," he snaps, already crossing the lab toward you.',
        approach: "Smile at him like that",
        greeting:
          '"Stop. You know exactly what that does to my concentration. ...Come here."',
        responses: {
          kind: "Let him cross the distance",
          playful: "Smile at him deliberately",
          bold: "Cross the lab first",
          neutral: "Hold his gaze, say nothing",
        },
      },
      {
        line: "He falls asleep on your chest mid-argument and would deny it under oath.",
        approach: "Let him rest against you",
        greeting:
          "\"You're impossible and I've stopped wanting you to be anything else.\"",
        responses: {
          kind: "Let him fall asleep on you",
          playful: "Argue on without him",
          bold: "Kiss him mid-argument",
          neutral: "Let him sleep",
        },
      },
      {
        line: "He kisses you like it's a problem he intends to solve thoroughly and repeatedly.",
        approach: "Stay the night",
        greeting:
          "\"Stay the night. The lab's cold. That's the reason. That's the only reason.\"",
        responses: {
          kind: "Say the lab is very cold",
          playful: "Ask if he's solved it yet",
          bold: "Demand he show his work",
          neutral: "Let it happen, unhurried",
        },
      },
      {
        line: '"Stay," is all he says now, where he used to build a whole excuse around the word.',
        approach: "Just stay",
        greeting:
          '"I love you. There. I said it. Never bring it up again. ...Bring it up again."',
        responses: {
          kind: "Stay, no questions asked",
          playful: "Bring it up again",
          bold: "Beat him to the word",
          neutral: "Stay without a word",
        },
      },
    ],
  },
  // No top-level `approach` pool: every dialogue[tier] beat, at every tier,
  // carries its own `approach` (see dialogue above) — the independent pool
  // this used to be is fully unreachable, so it's removed rather than left as
  // dead weight. Nothing sits under a beat's own label any more except
  // APPROACH_LABEL_FALLBACK's generic string, which no authored line reaches.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"A test subject, wandering in of its own accord." **{name}** looks {user} over, delighted.',
      '{user} calls his name, and **{name}** draws himself up. "You should feel honored to have some of my attention."',
      '"You know of me. Of course you do." **{name}** informs {user} of this at considerable length.',
      '**{name}** draws himself up at {user}. "You stand before a genius and visionary. Consider yourself fortunate. Are you ill, by any chance?"',
    ],
    known: [
      '"...Ah. It\'s you." **{name}** stops shouting for Jiro long enough to deal with {user}.',
      '{user} waves hello, and **{name}** looks almost pleased. "You\'re less useless than the last one."',
      '"You turn up with zero notice, and now I have to rearrange my schedule." **{name}** rearranges it for {user} anyway.',
    ],
    warm: [
      '"Where on earth have you been, worm?" **{name}** demands of {user}, then looks annoyed at himself for asking.',
      '{user} calls out, and **{name}** startles so badly his notes scatter. "Y-you could warn a person!"',
      '**{name}** waves {user} over. "You\'re late. Not that I was waiting... N-never mind!"',
    ],
    spark: [
      '"Wh-Where did you come from!?" **{name}** knows exactly where {user} came from.',
      "{user} says hi, and **{name}** goes an interesting color.",
      "**{name}** re-arms the bravado twice on the way to {user}. Neither attempt survives.",
    ],
    close: [
      '"You\'re mine to save," **{name}** informs {user}, loudly, as though that settles the matter.',
      "**{name}** abandons whatever he was striding off to do, mid-stride, because {user} called his name.",
      "{user} calls, and **{name}** shouts for Jiro to cover the **{house}** ward. Jiro already was.",
    ],
    bound: [
      '"You are indispensable. To the research. And... and to me. Obviously to me." **{name}** announces it to {user} at volume, then urgently requires a distraction.',
      "**{name}** is furious about how hard it is to walk past {user}, and crosses to them anyway.",
      "{user} says hello, and **{name}** catches himself smiling and clears his throat behind his hand.",
    ],
  },
};
