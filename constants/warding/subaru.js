// Subaru's solo warding cards. Shared cards featuring Subaru live in ./shared.js.
// See ./index.js for the full contract and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally — the
// option's affinityByResponse gain for this character (kind/playful/bold worth
// 2/1/0 in some order) — and then a flat +1 is added on top for the encounter
// being a warding card. The choice still moves the number; the +1 is an additive
// bonus, not a replacement. Every `close` should read as a warm beat, since even
// the character's least-resonant option nets at least +1, and none may read like
// the "what happened after" milestone afterlines in constants/publicEncounters.js.
// The result line also must NOT append the /call boost clause (describeBoost:
// "a warmer welcome, picking up after that coffee") — the warding +1 is its own.
// Temperature sits close to the bond scenes (constants/dialogue/subaru.js) — the
// accommodating captain choosing something for himself, and his stigma (he reads
// the thoughts left on anything he touches) treated as something given, not taken.
//
// Voice (reference.md): full contractions, gentle and earnest, never arch. Soft
// "Oh" openers, sentences that trail into "...", self-deprecating tag questions
// ("Silly, isn't it?", "I'm being weird, aren't I?"), spelled-out "Ha ha" when
// he's deflecting attention off himself. He apologizes reflexively but that's
// one tic among several, not the engine of the scene.
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
//   - Spoken words are wrapped in double quotes; stage directions left bare.
//   - kind reaches him (gentle notice, being in the room without asking anything
//     of him), playful meets the deflecting "ha ha", bold makes him comply
//     before he opens up — he rights himself inside the same beat (base gain
//     2/1/0 in some order, plus the flat +1). Options are kind / playful / bold.
// `// setting:` notes preserve what each card's art shows.
export default {
  Subaru: {
    file: "Subaru.png",
    characters: ["subaru"],
    title: "Secluded Serenity",
    approach: "Sit where he can see you",
    // setting: inside the Hotarubi tea room, the two of them alone. He is
    // partway through preparing the tea, unhurried and genuinely content, and
    // looks beautiful in the low light. A quiet, intimate moment.
    line:
      "\"Oh, you came in so quietly I nearly missed you. ...Stay? The water's almost ready, and I'd like it if you did.\"",
    greeting:
      "\"I do this alone most evenings. It's funny, the same steps feel completely different with you sitting there. ...You can watch, if you'd like.\"",
    responses: {
      kind: {
        label: "Tell him he looks at peace",
        close:
          '"At peace." *He pours slowly, turning the word over.*\n\n"I think I am. I didn\'t really have a word for it until you said it just now. I don\'t get many evenings where nobody needs anything from me. This is one of them, and you\'re in it."',
      },
      playful: {
        label: "Ask to taste it early",
        close:
          '"Oh, absolutely not, it\'s nowhere near ready." *A small smile.* "Listen to me, so serious about a pot of tea. Ha ha.\n\n...Two more minutes. Come sit a little closer, though, so I don\'t have to reach so far to pass it to you."',
      },
      bold: {
        label: "Ask him to show you how",
        close:
          "*He hesitates, then moves in close beside you.* \"Oh. Yes, I'd like that, actually. Here, hold it lower... a little lower than that.\n\nSlower than feels natural, that's the whole trick. Keep your wrist loose and let it fall. Don't push it.\"\n\n*His hand settles over yours to guide the tilt.* \"...There. That's it. I don't let people near this part, usually. It's nicer than I thought, showing you.\"",
      },
    },
  },
  Subaru_2: {
    file: "Subaru_2.png",
    characters: ["subaru"],
    title: "Sweet Detour",
    approach: "Catch his eye across the table",
    // setting: a date, the two of them each working through a green-tea-flavored
    // dessert across a small table. The MC is watching him; he has looked up
    // mid-bite, spoon still halfway, caught a little off guard by her attention.
    line:
      "\"They make the green tea sweets properly here. ...Though honestly, it's the chance to sit a while with you I'm glad of.\"",
    greeting:
      "\"I'm usually half somewhere else, even sitting still. Today I'm not, and I can't work out what changed. ...You, probably. I'm being weird about a dessert, aren't I?\"",
    responses: {
      kind: {
        label: "Say you feel the same",
        close:
          '"You do?" *He sets his spoon down, like his dessert can wait now.*\n\n"I spend most meals somewhere else in my head. Planning something, worrying at something. But this afternoon I\'m just... here, with you. That isn\'t a small thing for me. Thank you for saying it back."',
      },
      playful: {
        label: "Steal the last bite",
        close:
          "*Your spoon darts across to his cup, and the last bite is gone before he can object.* \"Oh, you didn't.\n\n...Ha ha. No, keep it, keep it. You look far too pleased with yourself, and honestly that's worth more than the bite was.\"",
      },
      bold: {
        label: "Tell him to just say it",
        close:
          "*He starts to soften it into a maybe, then stops himself.*\n\n\"...All right. No hedging. Could this be a regular thing? You, me, an afternoon like this one, often. I'd like that very much.\"",
      },
    },
  },
  Subaru_3: {
    file: "Subaru_3.png",
    characters: ["subaru"],
    title: "Carefully Selected Washi",
    approach: "Point to the one you like",
    // setting: sheets of washi laid out, held up to the light. He is pensive
    // and stuck, unable to settle on a palette for a set of lanterns he's
    // making, and wants the MC to help him choose.
    line:
      '"I\'ve been holding these to the light for an hour. Every one suits something. None seem right for the lanterns, though."',
    greeting:
      '"Purple, like the wisteria out front. Green, to match the tea room. Or something plainer, so they don\'t pull the eye at all. ...You pick. I trust your eyes more than mine right now."',
    responses: {
      kind: {
        label: "Choose the soft violet",
        close:
          '"The violet." *He holds it up to the light again and goes quiet for a moment.*\n\n"That\'s the one I kept setting aside. It felt a little vain, wanting something that pretty for a hallway lantern. You picked it without knowing any of that. ...All right. I\'ll stop arguing with myself and use it."',
      },
      playful: {
        label: "Pick the loudest one",
        close:
          "\"That one? You'd see that lantern from clear across the courtyard.\" *He laughs.* \"Ha ha. You're trying to talk me into being bold, aren't you.\n\n...Put it in the maybe pile. That's further than it would've gotten with just me deciding.\"",
      },
      bold: {
        label: "Say he outshines the lanterns",
        close:
          "*He lowers the sheet, caught off guard.* \"Oh. That's... you can't just say that while I'm trying to think. I've lost my place entirely now. Ha ha.\n\n...I heard you, though. Stay and help me pick the rest. It's better with you here.\"",
      },
    },
  },
};
