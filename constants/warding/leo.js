// Leo's solo warding cards. Shared cards featuring Leo (e.g. Sho_Leo) live in
// ./shared.js. See ./index.js for the full contract and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally — the
// option's affinityByResponse gain for this character (kind/playful/bold worth
// 0/1/2 for Leo) — and then a flat bonus on top for the encounter being a
// warding card. The choice still moves the number; the bonus is additive, not a
// replacement. Every `close` should read as a warm beat, since even his
// least-resonant option nets at least the bonus, and none may read like the
// "what happened after" milestone afterlines in constants/publicEncounters.js.
// Temperature sits close to the bond scenes (constants/dialogue/leo.js): Leo
// never softens his mouth, he just stops aiming it at you, and the warmth is
// entirely in what he does while insulting you. bold reaches him, playful
// volleys, kind (sincerity with no bit) makes him squirm and lower his guard a
// fraction. "Honor Roll" is his address for her, mocking this early. No em
// dashes in authored lines.
//
// The "Leo" card is unlike every other warding card in the set: it is a
// provocative selfie he has dropped into the MC's DMs, so it has NO narration
// and NO stage directions anywhere. `dialogue` is the follow-up nag painted
// onto the selfie, `prompt` reveals the caption it came with, and every `close`
// is more of the same text thread, all in his bond-scene texting
// voice (mixed case never all-lowercase, dropped full stops, short paragraphs,
// "u"/"ur"/"tho"/"rn"/"lol", "Ugh"/"Tch", casual profanity when deflecting).
// The scene is carried entirely by what he types.
// `// setting:` notes preserve what the art shows.
export default {
  Leo: {
    file: "Leo.png",
    characters: ["leo"],
    title: "Capricious Selfie",
    // A provocative selfie he took and sent unprompted, so it only lands once
    // there is enough between them for that to be a power move rather than a
    // cold open.
    minLevel: "Friend",
    approach: "Open the photo he just sent",
    // setting: not a scene, a phone screen. The card art IS the selfie: Leo
    // shot from just above, headphones around his neck, collar open, the smirk
    // that shows the tongue piercing, one brow up like he already knows the
    // effect. Studied and careless at once. Everything below is the DM thread
    // it arrived in.
    dialogue: [
      "I can see the little dots from ur response, Honor roll. Admit it, it's the best thing that's happened to you all week",
    ],
    choice: {
      prompt:
        '"This one\'s not going on the feed. just for u. Mostly so u know exactly what ur missing"\n\nsay something. the longer u take the more I win here',
      options: [
        {
          key: "kind",
          label: "Say he looks good, no bit",
          style: 3,
          close:
            "ugh. no bit? just straight out like that?\n\nGod, ok, delete that from ur memory, I'm deleting it from mine\n\n...keep the photo tho. that one stays",
        },
        {
          key: "playful",
          label: "Credit the lighting, not him",
          style: 1,
          close:
            "the LIGHTING. I set that up in 4 seconds with one lamp, that's raw talent and u know it\n\nok that was a good one, I'm keeping it. ur allowed to send me a bad photo back now. one. as a treat",
        },
        {
          key: "bold",
          label: "Tell him the bait worked",
          style: 4,
          close:
            "...huh\n\nmost people act like they didn't look. u just say it\n\nok. ur getting the ones I don't post from now on, that's a whole privilege\n\nand yeah I already knew it was working. was just waiting for u to be the one to say it",
        },
      ],
    },
  },
};
