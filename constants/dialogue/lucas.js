import bondScenes from "../bondScenes/lucas.js";

export default {
  // Level-up DMs: constants/bondScenes/lucas.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He's on his way to the training yard when he catches your eye, and breaks into an easy, ready smile.",
        approach: "Return his smile",
        greeting:
          '"Hello! An early training session will warm you up for the day. Would you care to join me?"',
        responses: {
          kind: ["Say you'd love to come along", "Join him, bring extra water"],
          playful: [
            'Ask what "early" means to him',
            "Ask if there's a warm-up lap",
          ],
          bold: ["Ask for his hardest drill", "Walk to the yard with him"],
          neutral: ["Smile back, say little", "Stay silent"],
        },
      },
      {
        line: "He holds the door without a word, like it's simply the natural thing to do.",
        approach: "Thank him as you pass",
        greeting:
          '"After you. And if you\'re ever in trouble, you can always come to me."',
        responses: {
          kind: ["Say it's a kind habit", "Say he's a true gentleman"],
          playful: ["Curtsy on the way through", "Ask if he holds every door"],
          bold: [
            "Say you'll get the next one",
            "Say the offer goes both ways",
          ],
          neutral: ["Walk through, say nothing", "Nod your thanks"],
        },
      },
      {
        line: "He's checking his gear over with far more care than the hour warrants. A mission, maybe.",
        approach: "Let him notice you",
        greeting:
          "\"You're here 10 minutes early. I'm impressed. Let's check the details for today's mission.\"",
        responses: {
          kind: ["Say you trust his prep", "Ask if he's all right"],
          playful: ["Ask if he checks it twice", "Ask if he ever sleeps in"],
          bold: ["Say you're ready when he is", "Ask what you're up against"],
          neutral: ["Wait beside him", "Wait for him to finish"],
        },
      },
      {
        line: '"Careful," he says, catching your arm before you trip over the loose flagstone.',
        approach: "Steady yourself on him",
        greeting:
          "\"We haven't been introduced properly. Lucas Errant. Pleasure's mine.\"",
        responses: {
          kind: ["Say you're glad he was there", "Say you're lucky he was close"],
          playful: ["Blame the flagstone", "Ask if he catches everyone"],
          bold: ["Offer your hand to shake", "Give him your name in return"],
          neutral: ["Nod and keep walking", "Give your name, nothing more"],
        },
      },
      {
        line: "He's already stepped between a first-year and a pack of older students, calm as if it's nothing.",
        approach: "Back him up",
        greeting:
          '"Thank you. They\'ll think twice now there are two of us."',
        responses: {
          kind: ["Say he was brave to step in", "Check on the first-year"],
          playful: ["Peek around him at the pack", "Ask if he does this daily"],
          bold: ["Square up beside him", "Stand shoulder to shoulder"],
          neutral: ["Stay behind him quietly", "Keep an eye on the pack"],
        },
      },
    ],
    known: [
      {
        line: "He spots you across the courtyard and starts walking before he's finished raising a hand in greeting.",
        approach: "Meet him halfway",
        greeting: [
          "\"Ah, it's you. Good. I'd hoped it would be.\"",
          '"I\'m so glad we ran into each other. I was hoping we would."',
        ],
        responses: {
          kind: ["Say you were looking for him", "Say you're glad to see him"],
          playful: ["Race him across the courtyard", "Tease him for hurrying"],
          bold: ["Say you'd have found him", "Close the distance yourself"],
          neutral: ["Nod as he reaches you", "Wait for him to arrive"],
        },
      },
      {
        line: "He's watching Kaito from across the room, some private worry crossing his face before he catches you looking.",
        approach: "Ask what's wrong",
        greeting:
          "\"I invited Kaito to train with me, but he turned me down. Apparently he's got a lot on his plate, but I'm worried about his lack of strength.\"",
        responses: {
          kind: ["Ask if Kaito's all right", "Offer to check on Kaito too"],
          playful: ["Catch him staring", "Ask what he's plotting"],
          bold: ["Go talk to Kaito with him", "Say Kaito's tougher than that"],
          neutral: ["Let him keep his worry", "Say nothing, let it pass"],
        },
      },
      {
        line: "He's buckling on his gear at a near run, and slows only because it's you.",
        approach: "Catch up to him",
        greeting:
          "\"I'm sorry, I'm about to head out. A dangerous anomaly is wreaking havoc on campus again, and it's a threat to the general students.\"",
        responses: {
          kind: ["Tell him to come back safe", "Ask if he's eaten first"],
          playful: [
            "Ask if he needs a sidekick",
            "Ask how big it is this time",
          ],
          bold: ["Say you're coming with him", "Fall in at his side"],
          neutral: ["Step aside to let him pass", "Wish him luck"],
        },
      },
      {
        line: "He doesn't so much as shiver in the cold, though you're already rubbing your hands together.",
        approach: "Ask how he isn't freezing",
        greeting:
          '"You think everywhere in Frostheim is cold? That\'s not true. The bedrooms are properly heated, like the cozy spot in front of the fireplace in winter."',
        responses: {
          kind: ["Ask if it reminds him of home", "Ask him to walk you inside"],
          playful: [
            "Steal some of his warmth",
            "Accuse him of being a furnace",
          ],
          bold: ["Say you'll see for yourself", "Stand closer to keep warm"],
          neutral: ["Rub your hands, say little", "Nod and keep walking"],
        },
      },
      {
        line: '"You\'re stronger than you were a month ago," he tells Kaito, steady and certain. "That\'s not nothing." Then he catches your eye, like you\'re in on it.',
        approach: "Nod in agreement",
        greeting:
          '"You worked hard today too. No matter what ordeals await us tomorrow, I trust that you\'ll both be able to overcome them."',
        responses: {
          kind: ["Agree Kaito's improved", "Say he's a good influence"],
          playful: ["Wink back conspiratorially", "Cheer Kaito on too"],
          bold: ["Say you noticed the look", "Say you'll keep Kaito to it"],
          neutral: ["Nod along, say nothing", "Let the moment pass quietly"],
        },
      },
      {
        line: "He's drilling forms alone in the training yard, sweat-soaked and relentless, until he looks up and finds you watching.",
        approach: "Ask if it's tough on him",
        greeting:
          '"Do I find it tough training every day? Those with strength have a duty to use it for others. I\'m perfectly all right."',
        responses: {
          kind: ["Tell him to take a break", "Say he's worked hard enough"],
          playful: ["Applaud from the sidelines", "Count his reps out loud"],
          bold: ["Ask to spar with him", "Match him rep for rep"],
          neutral: ["Watch without interrupting", "Wait for him to finish"],
        },
      },
      {
        line: '"Allow me," he says, and has your bag before you can protest.',
        approach: "Let him carry it",
        greeting:
          "\"There. It's no trouble at all, honestly. You've enough to carry as it is.\"",
        responses: {
          kind: ["Say he carries enough already", "Say you'll carry his next"],
          playful: ["Make him carry more", "Ask if chivalry ever rests"],
          bold: ["Take his bag in exchange", "Say you'll walk him back too"],
          neutral: ["Let him carry it, say nothing", "Walk on without comment"],
        },
      },
      {
        line: "He asks if you've eaten today in a tone that expects the honest answer, not the polite one.",
        approach: "Tell him the truth",
        greeting:
          '"Breakfast. Did you actually have any? You lose muscle mass on an empty stomach, you know."',
        responses: {
          kind: ["Ask if he's eaten himself", "Promise to eat something"],
          playful: [
            "Try to dodge the question",
            "Ask if he's checking up on you",
          ],
          bold: ["Admit you skipped a meal", "Challenge him to guess"],
          neutral: ["Give a short, plain answer", "Answer and move on"],
        },
      },
      {
        line: "He's brought an extra biscuit. He doesn't say who for.",
        approach: "Take the extra biscuit",
        greeting:
          '"I kept a biscuit aside for you. In case you\'d skipped breakfast again."',
        responses: {
          kind: ["Split it with him", "Say he didn't have to"],
          playful: ["Ask who it's really for", "Steal a second one"],
          bold: ["Say you'll bring the next one", "Call it out as thoughtful"],
          neutral: ["Take it, say nothing", "Eat it without comment"],
        },
      },
      {
        line: "He's standing out in the cold with his head tipped back, watching the sky like he expects it to do something.",
        approach: "Look up with him",
        greeting:
          '"On a clear, frosty night, you can see an aurora above Frostheim. It\'s very inspiring, like a beacon of hope in the darkness."',
        responses: {
          kind: ["Ask what he's hoping to see", "Say you'll wait with him"],
          playful: ["Ask if the sky is running late", "Point at a random star"],
          bold: ["Stand right beside him", "Say you'll watch till it comes"],
          neutral: ["Watch the sky in silence", "Let him keep looking"],
        },
      },
      {
        line: "\"There's something I want to investigate a little further...\" He's already pulling on his coat.",
        approach: "Say you'll join him",
        greeting: '"You\'ll join me? Thank you. You really are very kind."',
        responses: {
          kind: ["Say you're glad he asked", "Ask if he's rested first"],
          playful: ["Ask if it's spooky", "Ask what you're looking for"],
          bold: ["Say lead the way", "Say you'll watch his back"],
          neutral: ["Grab your coat", "Follow him out"],
        },
      },
      {
        line: "He's still hunched over demon subjugation texts well past the library's closing time, and the cold look is back in his eyes.",
        approach: "Ask what he's looking for",
        greeting:
          '"Any record of demons I can find. Someone I care about may depend on it."',
        responses: {
          kind: ["Ask what he's chasing", "Offer to help him search"],
          playful: ["Tease him for staying so late", "Ask if the books bite"],
          bold: [
            "Say you'll stay till he's done",
            "Say you'll hunt them with him",
          ],
          neutral: ["Let him keep his research", "Leave him to it quietly"],
        },
      },
      {
        line: "He notices you swaying on your feet before you do, and shifts closer so his shoulder's there before you ask.",
        approach: "Rest against him",
        greeting:
          "\"I'll walk you back, if you'll allow it. Just until the path's better lit.\"",
        responses: {
          kind: ["Lean into the offered support", "Promise to get some rest"],
          playful: [
            "Tease him for hovering again",
            "Ask if he's always watching",
          ],
          bold: ["Take his arm without asking", "Say he can lean on you too"],
          neutral: [
            "Accept the support quietly",
            "Steady yourself, say nothing",
          ],
        },
      },
    ],
    warm: [
      {
        line: "The easy smile turns private more often now, just for you.",
        approach: "Return the small smile",
        greeting: '"You came back. I... was hoping you would."',
        responses: {
          kind: ["Say that smile's your favorite", "Tell him you missed this"],
          playful: ["Ask what earned the smile", "Ask if that one's private"],
          bold: ["Smile back just as private", "Hold the look a beat longer"],
          neutral: ["Return the smile quietly", "Smile, say nothing"],
        },
      },
      {
        line: "He moves a half-step closer than he used to, and pretends he hasn't.",
        approach: "Fall into step with him",
        greeting:
          '"I kept thinking I heard you in the hall. I was wrong, until now."',
        responses: {
          kind: ["Let him keep the half-step", "Say you like him near"],
          playful: [
            "Pretend not to notice either",
            "Ask if he's lost his footing",
          ],
          bold: ["Close the half-step yourself", "Name the half-step"],
          neutral: ["Walk beside him, say nothing", "Keep to his pace"],
        },
      },
      {
        line: "He's already checking the room for anything that might hurt you. He always does.",
        approach: "Walk up to him",
        greeting: "\"I'm glad you're safe. How have you been?\"",
        responses: {
          kind: ["Say you're safe with him", "Tell him he can relax"],
          playful: ["Ask what could get past him", "Ask for a threat report"],
          bold: ["Say you'll watch his back too", "Say the room can wait"],
          neutral: ["Let him check, say nothing", "Wait for the all clear"],
        },
      },
      {
        line: '"You look tired," he observes gently. He noticed before you did.',
        approach: "Ask him how he's been",
        greeting:
          '"Sit, please. You look like you\'ve been on your feet all day."',
        responses: {
          kind: ["Admit you're a little tired", "Ask him to sit with you"],
          playful: ["Ask how he spotted it", "Ask if you look that bad"],
          bold: ["Say he looks tired too", "Make him take his own advice"],
          neutral: ["Sit, say nothing", "Take the seat offered"],
        },
      },
      {
        line: "The breezy courtesy is still there. It's just not the whole of him around you anymore.",
        approach: "See past the courtesy",
        greeting: '"May I walk with you? Only if you\'d like."',
        responses: {
          kind: ["Say you like the rest of him", "Say he can drop it with you"],
          playful: [
            "Ask what's under the courtesy",
            "Ask why he always asks first",
          ],
          bold: ["Say you see past it already", "Take his arm before he asks"],
          neutral: ["Walk with him quietly", "Walk on without talking"],
        },
      },
      {
        line: '"In Japan they say you meet evil spirits at twilight," he says, already pulling his coat on. "Shall we go and find out?"',
        approach: "Go with him",
        greeting:
          '"Stay on my left. If anything does turn up, I\'ll deal with it."',
        responses: {
          kind: ["Say you trust him", "Ask him to be careful too"],
          playful: ["Bet him nothing turns up", "Ask if he's hoping for one"],
          bold: ["Say you'll face them with him", "Take the lead yourself"],
          neutral: ["Fall in beside him", "Walk out with him"],
        },
      },
      {
        line: '"Jin\'s been calling you to his room a lot lately." His brow creases. "Is everything all right?"',
        approach: "Tell him it's fine",
        greeting:
          "\"If he's ever unkind to you, say the word. I'll have a word with him myself.\"",
        responses: {
          kind: ["Say you'd tell him first", "Say Jin's not so bad"],
          playful: ["Say Jin just likes company", "Say it's top secret"],
          bold: ["Say you can handle Jin", "Offer to go with him next time"],
          neutral: ["Say it's just errands", "Let the subject drop"],
        },
      },
      {
        line: '"Professor Dante scolded me for defeating the mock anomaly." He looks honestly baffled. "I believe I made the right call."',
        approach: "Ask what happened",
        greeting:
          '"It was meant to be a drill. But it went for a first-year, so I stopped it. Was that wrong?"',
        responses: {
          kind: ["Say he did the right thing", "Say the first-year's lucky"],
          playful: ["Ask if he broke the anomaly", "Suggest losing next time"],
          bold: ["Say Dante's wrong", "Tell him to argue his case"],
          neutral: ["Say drills have rules", "Hear him out"],
        },
      },
      {
        line: 'He has two textbooks open side by side, frowning. "Emrys and Darkwick disagree on this. I wonder which is correct."',
        approach: "Look at both pages",
        greeting:
          "\"You've a sharp eye. Tell me what you make of it. I'd value a second opinion.\"",
        responses: {
          kind: ["Work through it with him", "Say both could be right"],
          playful: [
            "Say Darkwick, out of loyalty",
            "Suggest asking an anomaly",
          ],
          bold: ["Pick a side and defend it", "Say Emrys has it wrong"],
          neutral: ["Read both passages", "Compare the diagrams"],
        },
      },
      {
        line: '"Kaito\'s taking me for ramen again," he says, clearly delighted. "He says it\'s Tokyo\'s signature dish. Come with us?"',
        approach: "Join them for ramen",
        greeting:
          "\"Wonderful. He'll be thrilled. He insists I'm eating it wrong, so you can settle it.\"",
        responses: {
          kind: ["Say you'd love to come", "Ask what he's ordering"],
          playful: ["Ask if Kaito's paying", "Ask how many bowls he's had"],
          bold: ["Say you'll order for him", "Bet you finish first"],
          neutral: ["Walk to the ramen place", "Ask where they're going"],
        },
      },
      {
        line: '"Is a \'pajama party\' some sort of important event?" He asks it in complete earnest. "Kaito insists we invite you."',
        approach: "Explain pajama parties",
        greeting:
          '"I see. No formal dress, and one simply talks until late? How odd. I think I\'d like that."',
        responses: {
          kind: ["Say yes, you'll come", "Say it's just fun, no rules"],
          playful: [
            "Invent a strict dress code",
            "Say pillow fights are required",
          ],
          bold: ["Say you'll host it", "Tell him to bring biscuits"],
          neutral: ["Say it's a sleepover", "Ask when it is"],
        },
      },
      {
        line: '"Struggling to sleep?" he asks, noting the shadows under your eyes. "Back home they\'d say the Sandman\'s running late."',
        approach: "Ask about the Sandman",
        greeting:
          '"An old folktale. He visits the sleepless. I\'ve always suspected he was some sort of anomaly."',
        responses: {
          kind: ["Say the story helps", "Ask if he sleeps well"],
          playful: ["Ask if he's hunted him", "Say the Sandman's avoiding you"],
          bold: ["Say you'd rather stay up", "Ask him to walk you back"],
          neutral: ["Say you're just tired", "Listen to the story"],
        },
      },
      {
        line: '"They\'ve announced what the next test covers." He already has a revision plan drawn up. "I\'m happy to help you review."',
        approach: "Take him up on it",
        greeting:
          '"Excellent. Library after class, then. I\'ll bring the biscuits, you bring the questions."',
        responses: {
          kind: ["Say he has to take breaks too", "Offer to quiz him back"],
          playful: [
            "Say you'll bring only snacks",
            "Ask if the plan's color-coded",
          ],
          bold: ["Say you'll set the plan", "Bet you outscore him"],
          neutral: ["Agree on the time", "Pack your notes"],
        },
      },
      {
        line: "Someone mutters something about you as you pass. Lucas stops, turns, and looks at them until they find somewhere else to be.",
        approach: "Catch up with him",
        greeting:
          '"I won\'t have people speak about you like that. Not where I can hear it."',
        responses: {
          kind: ["Stand a little closer to him", "Say you're all right"],
          playful: [
            "Ask how long he'd have stared",
            "Call it a very polite glare",
          ],
          bold: [
            "Say you'd have said something",
            "Ask him to teach you the look",
          ],
          neutral: ["Keep walking together", "Let it go"],
        },
      },
      {
        line: '"An early session warms you up for the day," he says, holding out a practice sword. "Would you care to join me?"',
        approach: "Take the practice sword",
        greeting:
          "\"Your grip's a little high. Here. ...There. Now you won't tire so fast.\"",
        responses: {
          kind: ["Ask him to show you", "Ask him to go easy"],
          playful: ["Swing wildly first", "Ask if he's ever lost"],
          bold: ["Challenge him to a bout", "Ask him not to hold back"],
          neutral: ["Take a first swing", "Mirror his stance"],
        },
      },
      {
        line: "He's pulled two chairs up to the fire in the Frostheim common room. \"Everyone assumes it's cold in here. It isn't, really.\"",
        approach: "Take the other chair",
        greeting: '"Warm your hands. You look frozen through."',
        responses: {
          kind: ["Hold your hands to the fire", "Say the company's warm too"],
          playful: ["Say Jin's room is a freezer", "Scoot your chair closer"],
          bold: ["Steal the closer chair", "Say you'll stay till it's out"],
          neutral: ["Sit by the fire", "Watch the flames"],
        },
      },
      {
        line: "He's out early, breathing in the cold. \"I'm fond of the morning air. Which do you prefer, morning or night?\"",
        approach: "Tell him which you prefer",
        greeting: "\"Really? I'd have guessed the other. I'm glad I asked.\"",
        responses: {
          kind: ["Say mornings, with him", "Ask why he likes mornings"],
          playful: ["Ask if he beat the birds up", "Say lunchtime"],
          bold: [
            "Challenge him to a sunrise run",
            "Say you'll be out here too",
          ],
          neutral: ["Say it depends", "Watch the sun come up"],
        },
      },
      {
        line: '"I\'m stopping by Professor Hyde\'s about demons before I head back." Something cold settles in his voice on the word. "Go on ahead."',
        approach: "Offer to wait for him",
        greeting:
          "\"You needn't. ...But thank you. I'll be quicker knowing someone's waiting.\"",
        responses: {
          kind: ["Say you'll walk back together", "Ask if he's all right"],
          playful: ["Say you'll time him", "Ask what Hyde's like"],
          bold: ["Walk him to Hyde's door", "Say you'll come in with him"],
          neutral: ["Wait by the stairs", "Head on ahead"],
        },
      },
    ],
    spark: [
      {
        line: "The politeness has thinned. What shows through it is not gentle at all.",
        approach: "Let the mask slip",
        greeting:
          "\"There's a part of me that isn't gentle. It's very fond of you.\"",
        responses: {
          kind: "Be soft with the harder part",
          playful: "Fluster the polite one",
          bold: "Close the space yourself",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "He takes your hand to check it for injury, and forgets to give it back.",
        approach: "Let him keep your hand",
        greeting: '"May I? ...Thank you. You needn\'t look so surprised."',
        responses: {
          kind: "Say it's his to keep",
          playful: "Ask what he's thinking",
          bold: "Turn your hand into his",
          neutral: "Take your hand back",
        },
      },
      {
        line: '"Forgive me," he murmurs, standing far closer than forgiveness requires.',
        approach: "Stand closer than needed",
        greeting: "\"Don't apologize for standing close. Please don't.\"",
        responses: {
          kind: "Say there's nothing to forgive",
          playful: "Ask what forgiveness costs",
          bold: "Step closer still",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He looks at your mouth for exactly a second too long, and knows it.",
        approach: "Say yes",
        greeting: '"Stay near me. I\'d rather not explain why."',
        responses: {
          kind: "Let him look a while longer",
          playful: "Catch him looking",
          bold: "Hold his gaze right back",
          neutral: "Look away first",
        },
      },
      {
        line: '"I\'m not always as harmless as I let people believe," he says evenly. "You should know that."',
        approach: "Trust him anyway",
        greeting: '"You trust me too easily. I\'d like you to keep doing it."',
        responses: {
          kind: "Say you know who he is",
          playful: "Ask just how not-harmless",
          bold: "Tell him you like the danger",
          neutral: "Take the risk, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"I don\'t say this to just anyone," he admits plainly, "but I\'m glad you\'re here."',
        approach: "Go to his side",
        greeting:
          '"I\'ve stopped apologizing for wanting you near. Is that all right?"',
        responses: {
          kind: "Say you're glad he's here too",
          playful: "Ask who else he doesn't tell",
          bold: "Tell him to keep you near",
          neutral: "Stay silent with him",
        },
      },
      {
        line: "He reaches for your sleeve, stops himself, and then does it anyway.",
        approach: "Take his hand",
        greeting:
          '"I would rather be the one who\'s hurt than watch it happen to you."',
        responses: {
          kind: "Say he matters just as much",
          playful: "Catch him being sweet",
          bold: "Say he doesn't have to stop",
          neutral: "Let the moment be enough",
        },
      },
      {
        line: "There's something less careful in how he looks at you now. Something honest.",
        approach: "Tell him you're safe",
        greeting: '"You don\'t have to be gentle with me. Not you."',
        responses: {
          kind: "Meet his honesty with your own",
          playful: "Fluster him on purpose",
          bold: "Say it before he can",
          neutral: "Hold the eye contact quietly",
        },
      },
      {
        line: '"Stay where I can see you," he says. It isn\'t a request, quite.',
        approach: "Stay where he can see you",
        greeting: '"Stay close. Just for a while. Please."',
        responses: {
          kind: "Say you're not going anywhere",
          playful: "Test how close he means",
          bold: "Say it isn't a request either",
          neutral: "Stay through the silence",
        },
      },
      {
        line: "He lets the softness show, just for you, and it costs him something to do it.",
        approach: "Let him be soft",
        greeting: '"Your safety means more to me than anything else."',
        responses: {
          kind: "Say it's safe with you",
          playful: "Tease the softness out further",
          bold: "Meet the softness head-on",
          neutral: "Let him have the quiet",
        },
      },
    ],
    bound: [
      {
        line: "The gentleness is still there. It is no longer the whole of him, with you.",
        approach: "Don't be gentle",
        greeting:
          "\"Don't be gentle with me. I'm not made of glass. Not with you.\"",
        responses: {
          kind: "Say you want all of him",
          playful: "Refuse to be handled gently",
          bold: "Pull him in by the collar",
          neutral: "Stay silent beside him",
        },
      },
      {
        line: "He kisses your knuckles, then your wrist, then stops asking permission.",
        approach: "Let him keep going",
        greeting:
          '"I love you. I\'ve said it in my head so often it should be easier aloud."',
        responses: {
          kind: "Tell him you love him",
          playful: "Make the polite one blush",
          bold: "Pull him down to you",
          neutral: "Let the night be still",
        },
      },
      {
        line: '"I\'d burn a great deal down for you," he says softly. "I hope that doesn\'t frighten you."',
        approach: "Say it back",
        greeting: "\"Whatever's left of me that isn't kind, it's yours too.\"",
        responses: {
          kind: "Tell him you're not afraid",
          playful: "Ask what's worth burning",
          bold: "Say you'd burn it with him",
          neutral: "Take the declaration quietly",
        },
      },
      {
        line: "He falls asleep with a hand fisted in your shirt, as though you might go.",
        approach: "Let him hold on",
        greeting: '"Closer. I want to feel you breathing."',
        responses: {
          kind: "Stay so he doesn't wake alone",
          playful: "Steal his shirt",
          bold: "Hold on just as tightly",
          neutral: "Let him sleep",
        },
      },
      {
        line: "He touches you like something he has been given and can hardly believe he keeps.",
        approach: "Stay the night",
        greeting:
          '"Stay the night. I\'ve stopped pretending I want anything else."',
        responses: {
          kind: "Say he gets to keep you",
          playful: "Ask if he still doubts it",
          bold: "Tell him to stop doubting it",
          neutral: "Let him hold on, say nothing",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two labels had no genuine beat match ("Let him finish the thought",
  // "Refuse to let him take the hit") and were dropped rather than force-
  // placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "**{name}** holds the door for {user} with a ready smile.",
      '"Good timing. I\'m off to fetch the mission papers from Tohma." **{name}** waves {user} along with him.',
      '"Penny for them? I\'m happy to lend an ear." **{name}** offers it to {user} with an easy smile, stranger or not.',
      '"I don\'t believe we\'ve met." **{name}** offers {user} a ready hand. "Is everything all right?"',
    ],
    known: [
      '"If you\'re ever in trouble, you know where to find me." **{name}** says it to {user} like a plain fact.',
      "{user} calls out, and **{name}** turns, openly pleased. \"I'd wondered when I'd see you next.\"",
      '"Have you eaten today? Honestly, now." **{name}** asks {user} before anything else.',
    ],
    warm: [
      '"I\'d hoped that was you." **{name}** takes whatever {user} is carrying without asking.',
      "{user} calls out, and **{name}**'s careful expression goes entirely soft.",
      "**{name}** had been checking the crowd for hazards. Now he's checking {user} for the same.",
    ],
    spark: [
      "**{name}** hears his name in {user}'s voice and loses count of the drill entirely.",
      '"You shouldn\'t be out here alone." **{name}** falls in beside {user} rather than say the rest of it.',
      "{user} calls his name, and **{name}** looks at them a moment too long to be only polite.",
    ],
    close: [
      "**{name}** doesn't ask whether {user} needs anything. He simply stays.",
      '"Have you eaten? Honestly, now." **{name}** already has a biscuit out for {user}.',
      "{user} calls, and **{name}** sets the **{house}** dispatch down without finishing the line.",
    ],
    bound: [
      "\"There's very little I wouldn't set aside for you,\" **{name}** says, only to {user}.",
      "**{name}** kisses {user}'s knuckles with people going past on both sides, and does not apologize for it.",
      "{user} says hi, and every ounce of **{name}**'s restraint goes somewhere else.",
    ],
  },
};
