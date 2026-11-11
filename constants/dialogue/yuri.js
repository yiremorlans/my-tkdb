import bondScenes from "../bondScenes/yuri.js";

export default {
  // Level-up DMs: constants/bondScenes/yuri.js.
  bondScenes,
  dialogue: {
    close: [
      {
        line: '"I\'ll find your cure," he says with absolute conviction, "because I\'m the only one capable enough. And you\'re mine to save."',
        approach: "Insist you don't need saving",
        greeting: '"I will solve this. You don\'t get to give up before I do."', // ✓
        responses: {
          kind: "Say the next one won't fail",
          playful: "Ask if you get a discount",
          bold: "Say you're his to save",
          neutral: "Let him have the conviction",
        },
      },
      {
        line: "He's asleep at the bench over your file. He'd rather die than let you say so.", // ✓
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
          '"If anything happens to you I\'ll be extremely inconvenienced. Emotionally. Shut up."', // ✓
        responses: {
          kind: "Say the thanks he forbade",
          playful: "Fluster him on purpose",
          bold: "Refuse to take it back",
          neutral: "Let him deflect",
        },
      },
      {
        line: "He's stopped flinching when you reach for your coat. He hadn't noticed he was doing it until it stopped.", // ✓
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
        line: "He grips your wrist a moment too long, checking a pulse he already knows is fine.", // ✓
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
      // candidate from spark
      {
        line: '"I suppose I can concede you have proven yourself useful in the lab, worm." He holds out a small wrapped box without looking at you.', // ✓
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
      // candidate from spark
      {
        line: "Two Frostheim students left his examination room laughing. His eyes are red, and he's daring you to mention it.", // ✓
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
      // candidate from spark
      {
        line: 'The anomaly that nearly bit you on your last mission is under glass in his lab. "Even harmful anomalies can have use as medicinal ingredients..."', // ✓
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
      // candidate from spark
      {
        line: "It's snowing. He has drawn every blind in the lab and is pretending the weather doesn't exist.", // ✓
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
      // candidate from spark
      {
        line: "He's packing for an ingredient run into Jabberwock's mountains, and keeps glancing at the second pair of gloves he packed.", // ✓
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
      // candidate from spark
      {
        line: "His new paper goes to print next week. He's asked you to read the acknowledgments, and only the acknowledgments.", // ✓
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
      // candidate from spark
      {
        line: 'He bursts out of the lab announcing a new formula from an anomalous plant that only grows in subzero temperatures, gets as far as "discovered by...!", and remembers who found it.', // ✓
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
      // candidate from spark
      {
        line: "There's a health charm from a shrine tucked into your file. He insists the lab came with it.", // ✓
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
      // candidate from spark
      {
        line: "You dozed off at the bench. His coat is over your shoulders when you wake, and he is across the room being loudly busy.", // ✓
        approach: "Give the coat back",
        greeting:
          '"Keep the coat. Hypothermia in my own lab would set the research back considerably."', // ✓
        responses: {
          kind: ["Keep the coat on", "Ask if he's warm enough"],
          playful: ["Model the coat for him", "Ask to keep it"],
          bold: ["Wear it home, no debate", "Put it back on his shoulders"],
          neutral: ["Fold the coat", "Hand the coat back"],
        },
      },
      // candidate from spark (moved back from the /meet spark pool: asking
      // her opinion on his outfit reads as close, not spark)
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
          neutral: "Hold his gaze",
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
          neutral: "Let him be thorough",
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
