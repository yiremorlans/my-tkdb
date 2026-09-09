// Mio's solo warding cards. Shared cards featuring Mio (e.g. Mio_Shion) live
// in ./shared.js. See ./index.js for the full contract and entry shape.
export default {
  Mio: {
    file: "Mio.png",
    characters: ["mio"],
    title: "A Breath of Cool Air",
    approach: "Hold out the water bottle",
    dialogue: [
      '"For me? You came all the way out here, in this heat, to bring me water. Okay. What\'s the catch?"',
    ],
    choice: {
      prompt:
        '"You found me. ...And you brought water. Okay. You\'ve got my attention."',
      options: [
        {
          key: "kind",
          label: "Tell him to sit down a minute",
          style: 3,
          close:
            '*He drinks, then pats the floor beside him until you sit down too.* "...Ten minutes. Both of us. If anyone asks, I had you helping me check the veranda boards for warping." *He leans back on his hands, shoulder just touching yours.* "This is nice. Don\'t make it a habit. ...Actually. Maybe make it a little bit of a habit."',
        },
        {
          key: "playful",
          label: "Poke the half-built rig",
          style: 1,
          close:
            "*You reach for the contraption and he catches your wrist, easy, and doesn't quite let go.* \"Ah, ah. That arm's spring-loaded. Takes a finger if you're lucky.\" *Almost a smile.* \"Bring water again tomorrow and I'll teach you which end is safe.\"",
        },
        {
          key: "bold",
          label: "Say he needs taking care of",
          style: 4,
          close:
            '"Take care of me, huh." *He takes a long pull, caps it, doesn\'t hand it back.* "I\'m a natural short sleeper. I run on fumes." *He looks at you.* "...But you can keep an eye on me. If you\'re volunteering. I wouldn\'t say no."',
        },
      ],
    },
  },
  Mio_2: {
    file: "Mio_2.png",
    characters: ["mio"],
    title: "Clockwork Artisan",
    dialogue: [],
    choice: { prompt: "", options: [] },
  },
};
