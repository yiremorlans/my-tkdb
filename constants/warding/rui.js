// Rui's solo warding cards. Shared cards featuring Rui live in ./shared.js.
// See ./index.js for the full contract and entry shape.
export default {
  Rui: {
    file: "Rui.png",
    characters: ["rui"],
    title: "Just a Moment More",
    approach: "Hold his eyes across the bar",
    // setting: the Obscuary bar, late, lights down. The MC is a little flushed
    // and in no hurry to leave; her drink is barely touched. No contact the
    // whole scene, per the reaper curse. The intimacy is all in the look he
    // holds across the measured foot of air he keeps.
    dialogue: [
      "\"You look at me, then at the drink like it'll help. It won't, cutie. I've watched you leave it sitting there for an hour.\"",
    ],
    choice: {
      prompt:
        "*He leans on the bar, as close as the curse lets him get, and doesn't look away.* \"Stay till close? It's twenty minutes. Just a moment more, cutie. I've got nothing but moments.\"",
      options: [
        {
          key: "kind",
          label: "Say you're staying till close",
          style: 3,
          close:
            "\"Then I'm in no hurry with these glasses. The dishes can wait.\"\n\n*He puts the towel down and doesn't pick it up again.*",
        },
        {
          key: "playful",
          label: "Hold his gaze on purpose",
          style: 1,
          close:
            "*You lock eyes and refuse to blink. He grins.* \"Oh, it's a contest now? I'll lose on purpose and love every second of it. Don't push me, I've got all night to lose.\"",
        },
        {
          key: "bold",
          label: "Say looking isn't enough",
          style: 4,
          close:
            "\"It's not. I know it's not. Hasn't been for a while now.\"\n\n*A beat, and the brightness comes back up, gentler.* \"But it's what's on the menu. So let me enjoy this moment a while.\"",
        },
      ],
    },
  },
  Rui_2: {
    file: "Rui_2.png",
    characters: ["rui"],
    title: "Midsummer Shadow",
    approach: "Wait out the heat beside him",
    // setting: a blazing summer afternoon, outdoors. The MC is dressed for the
    // weather; Rui, because of the reaper curse, is not and cannot be. He's
    // overheating and covering it with cheer, chasing a thread of breeze and
    // keeping his usual measured distance. No contact the whole scene. The
    // crack under the brightness is the curse, not the temperature.
    dialogue: [
      '"Don\'t laugh, cutie. You get to enjoy a day like this. I just get to survive it. Reaper curse, zero summer planning."',
    ],
    choice: {
      prompt:
        "*He leans into what little breeze there is, keeping the careful arm's length between you.* \"So what's the plan, cutie, do we melt here together?\"",
      options: [
        {
          key: "kind",
          label: "Offer to find him some shade",
          style: 3,
          close:
            '"You didn\'t have to do that."\n\n*He follows you under the tree anyway, and for once he lets the quiet sit there without filling it.*',
        },
        {
          key: "playful",
          label: "Fan him with your notebook",
          style: 1,
          close:
            "*You wave it at him. He shuts his eyes and hams it up.* \"Oh, that's the good stuff. Keep going, I'll put you in my will. Prime real estate, right next to the plants.\"",
        },
        {
          key: "bold",
          label: "Say the curse can wait",
          style: 4,
          close:
            '"Yeah, no. Not with you standing this close."\n\n*A beat, and the grin comes back, dialed down.* "I know you mean it kindly. That\'s exactly why I won\'t."',
        },
      ],
    },
  },
  Rui_3: {
    file: "Rui_3.png",
    characters: ["rui"],
    title: "Sweet Tour",
    approach: "Take the cup he holds out",
    // setting: a night festival, lanterns and stalls. Rui is in a yukata and
    // knows it. He's been walking the MC down the dessert stalls like a guided
    // tour; here he's stopped with two cups from the latest one, splitting it
    // with her. Light throughout. The curse is only texture: no contact, the
    // cup handed over rather than passed hand to hand.
    dialogue: [
      '"Quit staring at the yukata, cutie, I know I pull it off. Now pick a stall, the next one does a black sesame syrup you have to taste to believe."',
    ],
    choice: {
      prompt:
        '*He holds both dessert cups up, one in each hand, and waits for you to take yours.* "Okay, taste test. Be honest, the whole tour\'s riding on your review."',
      options: [
        {
          key: "kind",
          label: "Get a pic of the desserts",
          style: 3,
          close:
            '"The desserts, sure."\n\n*He tips his chin down and smiles.* "Fine, take it, cutie. Get the yukata in too, I worked for this look."',
        },
        {
          key: "playful",
          label: "Score your tour guide",
          style: 1,
          close:
            '"Haha, what? Only? C\'mon, cutie, I\'m an eleven and you know it. Ask anyone at the bar."\n\n*He spins the empty cup on a fingertip and catches it.* "Keep your tip. Just don\'t ditch your guide before the last stall, okay?"',
        },
        {
          key: "bold",
          label: "Say he's sweeter than dessert",
          style: 4,
          close:
            '"...You can\'t just say that with a straight face, cutie. That\'s not fair."\n\n*He smiles.* "Eat it before it melts. Four stalls to go."',
        },
      ],
    },
  },
};
