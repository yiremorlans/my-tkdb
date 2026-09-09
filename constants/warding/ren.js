// Ren's solo warding cards. Shared cards featuring Ren (Ren_Haru,
// Ren_Haru_Towa, ...) live in ./shared.js. See ./index.js for the full
// contract and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally (the
// option's affinityByResponse gain for Ren, kind/playful/bold worth 1/2/0) and
// then a flat WARDING_AFFINITY_GAIN on top for the encounter being a warding
// card. The choice only changes the `close` line. Every `close` reads warm,
// since even his least-resonant option nets at least the bonus.
//
// Temperature sits close to the bond scenes (constants/dialogue/ren.js): Ren
// says large things in the flattest register he can manage and then changes the
// subject to a show or the view. playful reaches him most (trade the deflection
// back and he relaxes), kind gets past it to the one who "cares and thinks a
// lot", bold is a demand he'd normally dodge but concedes here. He calls the MC
// "Senpai" (capitalised, spoken). American spelling, no em dashes.
//
// Both Ren cards are dialogue-only, like Leo's selfie card: NO narration and NO
// stage directions anywhere. `dialogue` is the hook he mutters, `choice.prompt`
// is him still talking, every `close` is more of the same. The scene is carried
// entirely by what he says.
//
// setting, "Ren" (authored, not from the art): a summer fireworks festival. Ren
// has bought the MC a hard candy as a surprise and is holding it out without
// looking at her.
// setting, "Ren_2" (from the art): the two of them hanging out playing a co-op
// mobile game, sat close. Ren is holding his phone out to show her the damage
// counter from the run. The MC notices his in-game character is built to look
// like him.
export default {
  Ren: {
    file: "Ren.png",
    characters: ["ren"],
    title: "Fireworks Within",
    // A begrudging surprise gift with the guard visibly down. It reads wrong
    // from a near-stranger, so it only enters the pool once they're Friends.
    minLevel: "Friend",
    approach: "Take what he's holding out",
    dialogue: [
      "\"It's just some hard candy. ...Fine, yes, I saw it and thought you'd like the dumb sparkles inside. That's the whole story, there's no part two. Fireworks start in ten. Are you taking it, or am I holding it the whole show.\"",
    ],
    choice: {
      prompt:
        '"Here, take it before I change my mind. I got two from the good stall anyway, so don\'t make it a thing, Senpai."',
      options: [
        {
          key: "kind",
          label: "Thank him and mean it",
          style: 3,
          close:
            "\"...Don't say it like that. Just eat it, don't do the thing where you save it for later. ...And stand on this side, the view's better. I checked earlier.\"",
        },
        {
          key: "playful",
          label: "Ask what the catch is",
          style: 1,
          close:
            "\"The catch is you owe me one at the next festival. That's binding, I'm writing it down. ...See, this is easier. You give me a hard time, I hand it back, and nobody has to stand here being sincere about a piece of candy. Your tongue's gone completely green, by the way. Don't check it, just leave it. It suits you.\"",
        },
        {
          key: "bold",
          label: "Try to take his too",
          style: 4,
          close:
            "\"Hey, that's mine. ...you know what, keep it, I'll live. I'm not going back to the stall, the show's starting and I want my hands free anyway. Stand on this side. Next to me, actually, the crowd's about to close in and I'm not fishing you back out of it.\"",
        },
      ],
    },
  },
  Ren_2: {
    file: "Ren_2.png",
    characters: ["ren"],
    title: "Co-op Play",
    // One-on-one co-op with the avatar he clearly spent an hour building to
    // look like himself, shown to her without a fuss. Reads wrong from a
    // near-stranger, so it only enters the pool once they're Friends.
    minLevel: "Friend",
    approach: "Lean in to see his screen",
    dialogue: [
      '"See that damage number? Whole boss gone in one combo. My guy carried you the entire run."',
    ],
    choice: {
      prompt:
        '"...What. He does not look like me. Same jacket, that\'s it, and the earrings are a coincidence. Are we finishing this level or are you going to keep staring at my phone?"',
      options: [
        {
          key: "kind",
          label: "Say you made him on purpose",
          style: 3,
          close:
            "\"...Okay. Maybe I spent an hour in the character creator. The hair took forty minutes on its own. ...I wanted something on the screen I wouldn't get sick of looking at. Don't make it weird. It's your turn, the timer's going.\"",
        },
        {
          key: "playful",
          label: "Say you main him now",
          style: 1,
          close:
            "\"You can't main him, he's my save file. Make your own. ...Fine, you can borrow him, but you're not allowed to get him killed, I've got cosmetics on that account. ...Why do you keep staring at me? Focus, Senpai.\"",
        },
        {
          key: "bold",
          label: "Grab his phone to see closer",
          style: 4,
          close:
            "\"Hey, I was using that. ...Fine, hold it, but tilt it back so I can see. If my combo drops, that's on you. ...*I guess he does kinda look like me.* Don't push it, and give it back before the next wave, Senpai.\"",
        },
      ],
    },
  },
};
