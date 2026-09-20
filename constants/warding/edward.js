// Edward's solo warding cards. Shared cards featuring Edward (Rui_Edward,
// Lyca_Edward_Rui) live in ./shared.js. See ./index.js for the full contract
// and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally (the
// option's affinityByResponse gain for Edward, kind/playful/bold worth 1/0/2)
// and then a flat WARDING_AFFINITY_GAIN on top for the encounter being a
// warding card. The choice only changes the `close` line. Every `close` reads
// warm, since even his least-resonant option nets at least the bonus, and none
// may read like the "what happened after" milestone afterlines in
// constants/publicEncounters.js.
//
// Voice is grounded ONLY in reference.md's Edward section (the home voicelines)
// and constants/characters.js, NOT the bond-scene file: the courtly register
// never drops, it just stops being armor. The frail gentleman is a performance
// (parasol, cough, eyesight too poor for his own letters) and underneath it is
// an ancient, lonely predator tired of the act. bold reaches him most (the
// partner who sees past it and does not flinch), kind lands too (he genuinely
// wants to be doted on), playful lands softest (he is the one who does the
// teasing, too languid for it volleyed back) but still nets the bonus.
// Canon markers used here, all straight from reference.md: "Wicked girl", "You
// ought to know better than to...", "Ah ha ha ha.", the devil's hour, "my
// vitality returns at this hour", "Come here"/"Come closer", "..., would you?"
// tag questions on requests, "..., I'm afraid", "my favorite channel". No age
// in years is ever stated (reference.md never gives one), no "I shall" and no
// phrasing lifted from constants/dialogue/edward.js. American spelling, no em
// dashes.
//
// Unlike Shion's narration-weighted cards, all three Edward cards are
// dialogue-only, like Leo's selfie card and both Ren cards: NO narration and NO
// stage directions anywhere. `line` is the greeting-weight hook shown as text
// before the art (<= ~120 chars, has to land on its own),
// `greeting` is him still talking over the revealed art, every `close` is more
// of the same. The
// scene is carried entirely by what he says. The bond-scene texting quirks
// (emojis, Title Case) are a DM-only affectation and do not appear here; this
// is in-person speech, normal punctuation, spoken words in double quotes.
// `// setting:` notes preserve what each card's art shows.
export default {
  Edward: {
    file: "Edward.png",
    characters: ["edward"],
    title: "Sanguine Smirk",
    approach: "Sit across from him",
    // setting: a first one-on-one, Edward lounging with a glass of something
    // deep red held loosely by the stem, the slight amused smile on his lips.
    // He is openly intrigued by her and will not say whether the glass is wine
    // or blood. kind takes the ambiguity on faith, playful waves it off, bold
    // calls his bluff and asks for a glass of her own.
    line:
      '"Ah, you came alone. How brave. Sit with me. I have a glass of something red here, and I won\'t be telling you what."',
    greeting:
      '"It could be a vintage from a very good year. It could be something a good deal fresher. You keep watching my mouth for the fangs instead of asking. Humans always watch and never ask. So. Ask me, or do not."',
    responses: {
      kind: {
        label: "Say you trust him either way",
        close:
          '"That is either great faith or great foolishness, and at my age the two wear the same face. Stay a while, would you? I find I no longer want the glass, only the company."',
      },
      playful: {
        label: "Guess it's cranberry juice",
        close:
          '"Ah ha ha ha. Cranberry. You have decided to be unimpressed by me, on purpose, and it is working. That is its own small marvel. Sit. Be unimpressed a little longer."',
      },
      bold: {
        label: "Ask him to pour you one",
        close:
          '"Now that is the right question, wicked girl. You ought to know better than to ask a vampire to pour for you. I\'ll do it anyway. Come closer, and mind you do not spill."',
      },
    },
  },
  Edward_2: {
    file: "Edward_2.png",
    characters: ["edward"],
    title: "Invitation To Endless Night",
    // Him inviting her in close after dark, guard already down. Reads wrong
    // from a near-stranger, so it only enters the pool once they're Friends.
    minLevel: "Friend",
    approach: "Cross the room to him",
    // setting: his room, lamps low, moonlight across the floor. Edward is
    // beckoning her nearer with a dangerous but soft smile, his whole attention
    // on her. kind names the room safe, playful accuses the smile of being
    // rehearsed, bold simply closes the distance.
    line:
      '"The moonlight suits you from across the room. Come and stand in it properly. Closer. I promise you nothing."',
    greeting:
      '"This is the hour my vitality returns. I have told you as much before, and you crossed the floor regardless. Do you know how few have ever done that. Stand just there. Let me look at you a moment, and then you may tell me why you came."',
    responses: {
      kind: {
        label: "Say the room feels safe",
        close:
          '"Safe. Ah ha ha ha. No one has ever called any room of mine that, and there have been a great many. You make it sound like a mercy rather than a lair. Sit with me, then. I\'ll try to deserve the word."',
      },
      playful: {
        label: "Say he practiced that smile",
        close:
          '"Long enough in front of mirrors, wicked girl. Of course I practiced it. But not for you. For you it simply arrives, and I have stopped forbidding it. Stay where the light is."',
      },
      bold: {
        label: "Close the last of the gap",
        close:
          '"There you are. No hesitation on the threshold, no second thoughts, you simply crossed. You cannot know what that means to someone as old as I am, and as used to being left. Or you do, and you came anyway. Do not move, would you? Let the night run long."',
      },
    },
  },
  Edward_3: {
    file: "Edward_3.png",
    characters: ["edward"],
    title: "Outsider Observations",
    // His attention is elsewhere for once, and she has to win it back. Reads
    // wrong from a near-stranger, so it only enters the pool once they're
    // Friends.
    minLevel: "Friend",
    approach: "Block his view of the screen",
    // setting: Edward propped up absorbed in something on his phone, his pajama
    // shirt half unbuttoned and careless. He barely looks up at her. The card
    // never says what he is watching. kind offers to sit through it with him,
    // playful talks over it to upstage it, bold takes the phone out of his
    // hands.
    line:
      '"One moment, would you. I am in the middle of a video. ...You are still standing there, I see."',
    greeting:
      '"My favorite channel. ...You have been standing in front of it a while now, doing the thing where you want my attention and will not simply ask for it. I know that game. Go on, then. Earn it back."',
    responses: {
      kind: {
        label: "Say you'll watch it with him",
        close:
          '"You would sit through the whole thing at my side, whatever it is. That is either devotion or very fine manners. Come here, then, would you. I\'ll begin it again from the top."',
      },
      playful: {
        label: "Talk over his video",
        close:
          '"Ah ha ha ha. That is a dreadful racket, and I have not looked back at the screen once. ...Keep going. You have my attention now, wicked girl, which was the whole point, and we both know it."',
      },
      bold: {
        label: "Take the phone from his hands",
        close:
          '"You have taken my phone straight out of my hands, and not the least bit sorry about it. ...Keep it. The video will still be there tomorrow. Come and do these up, would you, since you cannot seem to stop looking at them."',
      },
    },
  },
};
