import bondScenes from "../bondScenes/yuri.js";

export default {
  // Level-up DMs: constants/bondScenes/yuri.js.
  bondScenes,
  dialogue: {
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
      {
        line: "Two Frostheim students left his examination room laughing. His eyes are red, and he's daring you to mention it.",
        approach: "Close the door behind them",
        greeting:
          '"Allergies. ...Mark my words, I\'ll have those pompous, preening parasites at Frostheim kneeling before me."',
        responses: {
          kind: [
            "Say his work speaks for itself",
            "Say you'd trust no one else",
          ],
          playful: ["Blame the allergies too", "Ask for an allergy remedy"],
          bold: ["Say you'd have shown them out", "Stay until his eyes clear"],
          neutral: ["Let the allergies stand", "Pretend you didn't notice"],
        },
      },
      {
        line: '"I\'m busy with my experiments. Go back to your dorm and ready yourself for your next appointment. Jiro, see her home." Jiro is barely on his feet before Yuri reaches for his own coat.',
        approach: "Wait by the door",
        greeting:
          '"Jiro has a dosage to prepare. I happen to be going that way. The direction is... that way. Isn\'t it?"',
        responses: {
          kind: ["Say you're glad it's him", "Ask if he's warm enough"],
          playful: ["Ask if he knows the way", "Offer to lead, just in case"],
          bold: ["Say you'd rather he took you", "Take the long way with him"],
          neutral: ["Point the right way", "Hold the door for him"],
        },
      },
      {
        line: 'The anomaly that nearly bit you on your last mission is under glass in his lab. "Even harmful anomalies can have use as medicinal ingredients..."',
        approach: "Look at the specimen",
        greeting:
          '"This is the sort of immeasurable value my work provides. ...It will never touch you again. It is going into a tincture."',
        responses: {
          kind: ["Ask what the tincture treats", "Ask him to show you how"],
          playful: ["Ask if it's still angry", "Ask to name the tincture"],
          bold: ["Say it never stood a chance", "Say you'll bring him more"],
          neutral: ["Keep back from the glass", "Watch it through the glass"],
        },
      },
      {
        line: "Jiro mentions, in passing, that his glasses were a gift from Yuri. Yuri drops an entire tray of slides.",
        approach: "Help with the slides",
        greeting:
          '"They were a PRESCRIPTION! Corrective lenses are a medical necessity, Jiro, not a gift!"',
        responses: {
          kind: ["Say he chose them well", "Say they suit Jiro"],
          playful: [
            "Ask if you get a pair too",
            "Ask for your own prescription",
          ],
          bold: [
            "Ask Jiro for the full story",
            "Say Jiro wears them every day",
          ],
          neutral: ["Stack the slides back up", "Leave it to the two of them"],
        },
      },
      {
        line: "He's planning his trip to Nihombashi Takashimaya for next season's clothes, and has asked your opinion on three coats in a row.",
        // A sample of one is the giveaway: teasing that he only asked her
        // flusters him more than a sincere pick does.
        mood: true,
        approach: "Give your opinion",
        greeting:
          '"Your opinion is a data point. A single data point. I simply require a larger sample."',
        responses: {
          kind: ["Pick the one he lingered on", "Say the teal one suits him"],
          playful: ["Ask if you're the whole sample", "Ask who else he asked"],
          bold: ["Say you're coming with him", "Pick one for him, no debate"],
          neutral: ["Say they all look fine", "Point at one at random"],
        },
      },
      {
        line: "He's on the third volume of The Ace Doctor Wows Minds In Another World Thesis, and has stopped hiding the cover from you.",
        // He's stopped hiding it from her: asking to share the secret
        // flusters him more than taking the "research" at face value.
        mood: true,
        approach: "Ask how it's going",
        greeting:
          '"It is research. The protagonist\'s surgical technique is wildly inaccurate and I am... documenting the errors. Thoroughly."',
        responses: {
          kind: ["Ask what the hero gets wrong", "Ask him to read you a page"],
          playful: ["Ask for volume one", "Ask to borrow it after him"],
          bold: ["Read over his shoulder", "Ask what happens next"],
          neutral: ["Leave him to his reading", "Let the excuse stand"],
        },
      },
      {
        line: '"Agnihaet." His stigma flares, and a page of equations resolves in a single breath. He looks up to see if you saw.',
        approach: "Watch him work",
        greeting:
          '"Instantaneous processing. You may applaud, I won\'t stop you."',
        responses: {
          kind: ["Ask him to show you again", "Ask what he solved"],
          playful: ["Applaud for far too long", "Ask him to do your homework"],
          bold: ["Say you saw every second", "Say the world should see this"],
          neutral: ["Look back at the page", "Wait for the result"],
        },
      },
      {
        line: "He's giving Jiro his evening shot, one of three a day, and narrating every step to you like a lecture.",
        approach: "Pay attention",
        greeting:
          '"Observe. Nobody else can do this. Not safely. You are watching a singular procedure."',
        responses: {
          kind: ["Ask him to explain the dose", "Ask who looks after him"],
          playful: ["Take notes like a student", "Ask if there's a quiz after"],
          bold: ["Step closer to watch", "Stay for all three shots"],
          neutral: [
            "Watch the needle, not him",
            "Wait for the procedure to end",
          ],
        },
      },
      {
        line: "It's snowing. He has drawn every blind in the lab and is pretending the weather doesn't exist.",
        approach: "Leave the blinds shut",
        greeting:
          '"I despise the snow. It brings nothing but revolting memories. ...We are not discussing it."',
        responses: {
          kind: ["Talk about anything else", "Stay in with him"],
          playful: [
            "Draw a sun on the whiteboard",
            "Count the days until spring",
          ],
          bold: ["Say you'll keep him busy", "Close the last blind yourself"],
          neutral: ["Get on with the checkup", "Glance at the window anyway"],
        },
      },
      {
        line: "Another mission came back with nothing intact for him to study. He's taking it as a personal attack from every other house.",
        approach: "Ask what happened",
        greeting:
          '"Brutes! Every one of them! Not a single viable specimen. Do they think anomalies grow on trees!?"',
        responses: {
          kind: ["Ask what he'd have studied", "Say his work deserves better"],
          playful: ["Ask if some grow on trees", "Volunteer as a stand-in"],
          bold: ["Help him draft the complaint", "Say they'll regret it"],
          neutral: ["Let him vent", "Wait out the tirade"],
        },
      },
      {
        line: "He's packing for an ingredient run into Jabberwock's mountains, and keeps glancing at the second pair of gloves he packed.",
        // His sense of direction is the soft spot: teasing who navigates
        // flusters him more than a plain yes to the trip.
        mood: true,
        approach: "Ask about the gloves",
        greeting:
          '"The mountains are uncharted. A second pair of hands is a sensible precaution. Yours happen to be available."',
        responses: {
          kind: ["Say you'll come along", "Ask what you'll look for"],
          playful: ["Ask who's reading the map", "Offer to lead the way"],
          bold: ["Put the gloves on now", "Pack your bag beside his"],
          neutral: ["Check the weather first", "Ask when you'd leave"],
        },
      },
      {
        line: "Jiro is out, so he made his own wake-up tonic. He made it badly, and is drinking it with great dignity.",
        approach: "Ask how it tastes",
        greeting:
          '"Jiro measures by eye. I measure by science. The results are... comparable."',
        responses: {
          kind: ["Offer to make the next one", "Ask how Jiro makes it"],
          playful: ["Ask for a sip", "Ask for his honest rating"],
          bold: ["Remake it for him", "Make him eat something with it"],
          neutral: ["Let him drink it", "Watch him finish it"],
        },
      },
      {
        line: "Jiro is right there with nothing to do, and Yuri still hands the clipboard to you.",
        approach: "Take the clipboard",
        greeting:
          '"Jiro is... recovering. From something. You\'ll assist me today. Be grateful."',
        responses: {
          kind: ["Ask what the first step is", "Say you'll do it properly"],
          playful: ["Ask Jiro how he's feeling", "Salute the doctor"],
          bold: [
            "Ask for a lab coat of your own",
            "Say you'll assist every day",
          ],
          neutral: ["Wait for instructions", "Read down the list"],
        },
      },
      {
        line: "You left something sweet on his desk. He's filed it as a 'low blood sugar intervention' and eaten it immediately.",
        approach: "Ask if it helped",
        greeting:
          '"My blood sugar was dropping. You noticed. That\'s... adequate observational skill."',
        responses: {
          kind: ["Insist he eat a real meal", "Say you'll bring one tomorrow"],
          playful: ["Ask if he'll prescribe more", "Ask for that in writing"],
          bold: ["Say you'll keep checking", "Stock his desk drawer"],
          neutral: ["Let the excuse stand", "Clear the wrapper away"],
        },
      },
      {
        line: "His new paper goes to print next week. He's asked you to read the acknowledgments, and only the acknowledgments.",
        // He hid her in the acknowledgments: catching the name flusters him
        // more than praising the paper does.
        mood: true,
        approach: "Read the acknowledgments",
        greeting:
          '"Read it. Out loud, if you must. And do not comment on the third name."',
        responses: {
          kind: ["Ask to read the whole thing", "Ask what the paper proves"],
          playful: ["Read the third name twice", "Ask who the third name is"],
          bold: ["Ask why you're in it", "Say you'll frame the page"],
          neutral: ["Read it to yourself", "Hand the page back"],
        },
      },
      {
        line: "He's drawn your blood again and holds the vial up to the light longer than any test requires.",
        approach: "Ask about the results",
        greeting:
          '"Your numbers held this week. Held. That is... that is a good result. I\'m allowed to look at a good result."',
        responses: {
          kind: ["Say that's his doing", "Ask what comes next"],
          playful: ["Ask if he'll frame the vial", "Ask how long he'll look"],
          bold: ["Hold out your arm for more", "Tell him to celebrate"],
          neutral: ["Let him look", "Roll your sleeve down"],
        },
      },
      {
        line: 'He bursts out of the lab announcing a new formula from an anomalous plant that only grows in subzero temperatures, gets as far as "discovered by...!", and remembers who found it.',
        approach: "Ask who discovered it",
        greeting:
          '"Eureka! Discovered by...! Jiro... A joint effort. Largely mine. Jiro held the plant."',
        responses: {
          kind: ["Ask what the formula treats", "Say the formula's still his"],
          playful: ["Ask Jiro for his side", "Ask how well Jiro held it"],
          bold: ["Ask to see it work", "Say it's big news either way"],
          neutral: ["Let him rewrite the credits", "Wait for the full story"],
        },
      },
      {
        line: "There's a health charm from a shrine tucked into your file. He insists the lab came with it.",
        approach: "Ask about the charm",
        greeting:
          '"Superstition has no place in medicine. It\'s... tradition. Traditions are harmless. Leave it there."',
        responses: {
          kind: ["Say you'll keep it with you", "Ask which shrine he went to"],
          playful: ["Ask what the lab wished for", "Ask if he bought one too"],
          bold: ["Tie it to your bag", "Ask to go along next year"],
          neutral: ["Leave the charm where it is", "Open the file around it"],
        },
      },
      {
        line: "He laughed at something you said, a real one, not the mad-scientist kind, and now looks horrified by it.",
        approach: "Tell the joke again",
        greeting: '"That was a cough. A medical cough. I\'m monitoring it."',
        responses: {
          kind: ["Say you liked hearing it", "Let the cough stand"],
          playful: ["Try for a second one", "Offer him a cough drop"],
          bold: ["Say you'll do it again", "Tell the same joke louder"],
          neutral: ["Move on with the topic", "Pretend you missed it"],
        },
      },
      // candidate from warm
      {
        line: "He's marching you across Mortkranken to see a recent finding. Three corridors in, he still hasn't admitted he's lost.", // ✓
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
      // candidate from warm
      {
        line: "Your name is on the lab whiteboard now, in his handwriting, in a slot nobody else gets.", // ✓
        approach: "Ask about the slot",
        greeting:
          "\"It's a standing appointment. A genius's time is precious, so consider yourself privileged.\"", // ✓
        responses: {
          kind: ["Say you'll be there", "Promise never to miss it"],
          playful: ["Ask who you outranked", "Ask for a better time"],
          bold: ["Ask why you get a slot", "Claim the slot as yours"],
          neutral: ["Note the time, say nothing", "Accept the appointment"],
        },
      },
      // candidate from warm
      {
        line: "The space heater has migrated across the lab to the spot where he always examines you.", // ✓
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
      // candidate from warm
      {
        line: "There's a flask on the shelf with your name on the label, written far more carefully than the others.", // ✓
        // The careful label gives him away: teasing what it means flusters him
        // more than taking the flask at face value.
        mood: true,
        approach: "Ask about the flask",
        greeting:
          '"That one is yours. Formulated for you specifically. Legible labeling is basic laboratory protocol."', // ✓
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
      // candidate from warm
      {
        line: "You dozed off at the bench. His coat is over your shoulders when you wake, and he is across the room being loudly busy.", // ✓
        approach: "Give the coat back",
        greeting:
          '"Keep the coat. Hypothermia in my own lab would set the research back considerably."', // ✓
        responses: {
          kind: ["Keep the coat on", "Ask if he's warm enough"],
          playful: ["Model the coat for him", "Ask to keep it"],
          bold: ["Wear it home, no debate", "Put it back on his shoulders"],
          neutral: ["Fold the coat, say nothing", "Hand it back, no comment"],
        },
      },
      // candidate from warm
      {
        line: "He's cleared a space on the bench beside him without being asked, mid-rant, like it's obvious you'd sit there.", // ✓
        approach: "Look for a seat",
        greeting: '"...Sit, then. I already made room, don\'t act shocked."',
        responses: {
          kind: ["Sit, ask what he's working on", "Sit down, no fuss"],
          playful: ["Ask if he saved it for you", "Act surprised by the space"],
          bold: ["Take the seat like you own it", "Sit before he can protest"],
          neutral: ["Sit like it's nothing", "Take the space, unbothered"],
        },
      },
      // candidate from warm
      {
        line: "The research budget came through at last. He has found four separate excuses to mention it in ten minutes.", // ✓
        approach: "Ask about the new equipment",
        greeting:
          '"Hmph. You noticed the new equipment. The research grant committee finally saw sense. About time."',
        responses: {
          kind: ["Admire the new equipment", "Say his work earned it"],
          playful: [
            "Ask if you can push a button",
            "Ask which one's his favorite",
          ],
          bold: ["Say you knew they'd cave", "Claim the first demonstration"],
          neutral: [
            "Glance at it and say nothing",
            "Let him talk, say nothing",
          ],
        },
      },
      // candidate from warm
      {
        line: '"You should feel honored," he says, of something small and ordinary he just did for you.', // ✓
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
