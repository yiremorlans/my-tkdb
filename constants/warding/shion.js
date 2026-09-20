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
// coddled. `responses` is written kind / playful / bold like every other card;
// the scoring is on the response key, not its position. The Heebie-Jeebie
// House is the only name
// for his hangout; Mio is "Mio".
//
// These render like a /roam encounter, not a bond-scene DM:
//   - `line` is ONE greeting-weight hook (<= ~120 chars), shown as plain text
//     before the art appears, so it has to land on its own. `greeting` is
//     what gets painted into the image dialogue box, so that is where the
//     scene is carried; it can run long, the box grows to fit. Nothing in the
//     card marks it as rare — that is the sparkle on the approach button, and
//     it is added at render, not authored here.
//   - A painted `greeting` is plain text on a canvas, exactly as a /roam
//     greeting is: Discord markdown does nothing there (asterisks are stripped
//     at the paint) and the canvas font has no emoji glyphs, so an emoji would
//     render as an empty box. Write it plain.
//   - Spoken words are wrapped in double quotes; stage directions left bare in
//     *italics*. In-person speech, so normal punctuation.
//   - Weight the bare *italic* description. These cards carry the scene in
//     narration and described action; spoken lines stay sparse and short.
//     Shion shows more than he says.
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
    line: '"Come here. Closer, up to the glass with me. Watch that one. It lures the small ones in with a light, then eats them."',
    greeting:
      '"That one\'s got no eyes, doesn\'t need them. That one glows so the small ones swim to it. Every pretty thing in here kills something. ...I could stand here all day."',
    responses: {
      kind: {
        label: "Say you'd stay all day too",
        close:
          '*He doesn\'t look over. His shoulders come down a little, the way they do when he decides to trust something.* "...People go restless around me inside ten minutes. You settled in." *He taps the glass once, then goes back to watching.* "Stay till they put the lights out, then."',
      },
      playful: {
        label: "Say his taste in dates is grim",
        close:
          '"Grim." *He says it back slowly, like a word worth keeping. He brought you to this tank on purpose, steering you past the bright harmless ones, because he wanted to watch your face when the light drew a fish in and it was gone. Whatever your face did, he liked it. The calm tips younger, and he lets it.* "Say it again. I chose this one for you."',
      },
      bold: {
        label: "Call it a date out loud",
        close:
          '*He looks at you a while, flat, the way he looks at things he has already decided are his. The small smile surfaces, barely there.* "A date. Good." *He turns back to the glass, satisfied.* "It\'s been one on my side a long time. You\'re only catching up."',
      },
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
    line: '"Mio checked the box twice. Nothing in it bites. Nothing he found, anyway."',
    greeting:
      '"They booked a magician. I do the other version. The one where everyone screams and somebody gets carried out. ...Sit at the front. It goes better when you\'re watching."',
    responses: {
      kind: {
        label: "Say you'll be watching him",
        close:
          '*The card goes still between his fingers. He keeps his eyes on it, not on you.* "Watching me. Not the trick, not the screaming." *He turns the words over like he is checking them for a catch. Nobody stays for that part, they come for the fright and leave before the lights come up. When he looks up he has already found your face, and he stays on it.* "Sit near the front. That part isn\'t the act."',
      },
      playful: {
        label: "Bet he can't spook Mio",
        close:
          '"Mio doesn\'t spook. He has watched every trick I own and never once flinched." *The look he saves for the stage tips younger. Mio is worn thin these days, though, and by midnight the guard slips.* "I\'ve thought about this. Help me pick the night. I want you next to me when his face finally goes."',
      },
      bold: {
        label: "Straighten his collar",
        close:
          '*You step in and set his collar straight. He holds still for it and watches you do it. When you step back the flat calm slides over him again like a coat pulled on.* "I\'ll go stop a few hearts. Not yours." *At the curtain he pauses.* "Yours I\'ve frightened plenty. I\'ve a use for it yet."',
      },
    },
  },
};
