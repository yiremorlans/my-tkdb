// Shion's solo warding cards. Shared cards featuring Shion (e.g. Mio_Shion)
// live in ./shared.js. See ./index.js for the full contract and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally — the
// option's affinityByResponse gain for this character (bold/playful/kind worth
// 2/1/0) — and then a flat +1 is added on top for the encounter being a warding
// card. The choice still moves the number; the +1 is an additive bonus, not a
// replacement. Every `close` should read as a warm beat, since even the
// character's least-resonant option nets at least +1, and none may read like the
// "what happened after" milestone afterlines in constants/publicEncounters.js.
// The result line also must NOT append the /call boost clause (describeBoost:
// "a warmer welcome, picking up after that coffee") — the warding +1 is its own.
// Temperature sits close to the bond scenes (constants/dialogue/shion.js): the
// flat calm cracking an inch for her, gruesome imagery offered as affection, and
// the intimacy being him letting her say no and staying anyway — never softening.
//
// Voice (reference.md + characters.js): blunt, flat, childish. Short plain
// sentences, no dialect or lilt — his canon voicelines are plain flat English
// (no "aye", "folk", "wee", "'cause", "mightn't"). Censored curses only. NO
// performer, no showman patter — even "Cruel Magician" is fright work, not a
// crowd-pleaser. No em dashes in authored lines. bold reaches him
// (he wants to be met, not soothed), playful matches the cruel-childish mischief
// he opens himself, kind lands softest — gentleness gives softness no purchase,
// so on a kind pick his guard lowers a fraction rather than him accepting being
// coddled. Options are listed kind / playful / bold like every other card; the
// scoring is on `key`, not position. The Heebie-Jeebie House is the only name
// for his hangout; Mio is "Mio".
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `dialogue` is ONE greeting-weight line (<= ~120 chars), painted into the
//     image dialogue box like a temperamentDialogue line, so it has to hook on
//     its own. Everything else moves into `prompt`.
//   - Spoken words are wrapped in double quotes; stage directions left bare in
//     *italics*. In-person speech, so normal punctuation.
// `// setting:` notes preserve what each card's art shows.
export default {
  Shion: {
    file: "Shion.png",
    characters: ["shion"],
    title: "Other Side of the Glass",
    approach: "Follow him along the glass",
    // setting: an aquarium, bright blue tank-light everywhere, other visitors
    // about. Shion has a serious set to his face but a small smile under it —
    // he is glad to be here with her. It plays as a date; neither of them says
    // the word. He walks her along the glass naming the creatures, drawn to the
    // water and half at home in front of it without either of them naming why.
    // The three choices meet the date-ness of it differently: kind mirrors the
    // feeling back, playful teases his idea of an outing, bold names it outright.
    dialogue: [
      '"Come here. Closer, up to the glass with me. Watch that one. It lures the small ones in with a light, then eats them."',
    ],
    choice: {
      prompt:
        '*He moves along the glass and you follow. He names the sea anomalies without reading the placards.* "That one\'s got no eyes, doesn\'t need them. That one glows so the small ones swim to it. Every pretty thing in here kills something." *A long pause.* "I could watch them in here all day."',
      options: [
        {
          key: "kind",
          label: "Say you'd stay all day too",
          style: 3,
          close:
            '*He doesn\'t look over, but his shoulders come down a little.* "...Would you. People go restless around me inside ten minutes. You just settled in." *A beat at the glass.* "Stay till they put the lights out, then. I\'m not done looking, and I\'d rather you were here for it."',
        },
        {
          key: "playful",
          label: "Say his taste in dates is grim",
          style: 1,
          close:
            '"Grim." *He weighs the word like he wants to keep it.* "I picked the tank where the light draws them in and thought, she\'ll like that one best." *The flat calm tips younger.* "I was right. Don\'t tell me I wasn\'t. I watched your face when it ate."',
        },
        {
          key: "bold",
          label: "Call it a date out loud",
          style: 4,
          close:
            '*He looks at you a moment, flat, the way he looks at things he\'s decided are his.* "A date. Out loud, then. Good." *The small smile comes back, barely there.* "It\'s been one on my side a long while. You\'re only just catching me up."',
        },
      ],
    },
  },
  Shion_2: {
    file: "Shion_2.png",
    characters: ["shion"],
    title: "Cruel Magician",
    approach: "Take the seat down front",
    // setting: backstage before an event Shion has to perform at as a magician.
    // Mio is not in the room. He checked the prop box for anomalies and left; the
    // supervising is understood, not staged, and Shion only ever mentions it.
    // Shion looks enigmatic — gloves, hat, a card he keeps palming out of sight
    // and producing again.
    // He treats the stage the way he treats the Heebie-Jeebie House: somewhere
    // to stop people's hearts a moment, not somewhere to be liked.
    dialogue: [
      '"Mio checked the box twice. Nothing in it bites. Nothing he found, anyway."',
    ],
    choice: {
      prompt:
        '"They asked for a magician. I do the other thing, where the room goes up in screams and somebody\'s carried out." *The Ace of Hearts appears out of thin air.* "Sit at the front. It goes better when you\'re the one watching."',
      options: [
        {
          key: "kind",
          label: "Say you'll be watching him",
          style: 3,
          close:
            '*The card stops between his fingers.* "Watching me. Not the vanish, not the screaming." *He turns the card over, looking at it instead of you.* "Nobody asks for that. They want the fright and they leave before the lights come up." *A beat.* "Sit near the front. I\'ll keep finding your face between the tricks. That part\'s not the act."',
        },
        {
          key: "playful",
          label: "Bet he can't spook Mio",
          style: 1,
          close:
            '"Mio doesn\'t spook. He\'s watched every trick I own since we were little, never once flinched." *The look he saves for the stage tips younger.* "He\'s worn out these days, though. Guard drops by midnight." *Almost a smile.* "Help me pick the night. I want you next to me when his face finally goes."',
        },
        {
          key: "bold",
          label: "Straighten his collar",
          style: 4,
          close:
            '*You step in and set his collar straight. He holds still and watches you.* "...Right." *The flat calm slides back over him like a coat.* "I\'ll go stop a few hearts. Not yours. Yours I\'ve frightened plenty, and I\'ve a use for it yet."',
        },
      ],
    },
  },
};
