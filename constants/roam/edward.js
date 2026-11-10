// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/edward.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/edward.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He smiles at you as if you've arrived exactly on time. It's a charming smile, and only a little too pleased.",
      approach: "Introduce yourself",
      greeting:
        '"Ah, the special student, is it? Everyone\'s been making quite the fuss about you."',
      responses: {
        kind: ["Say it's nice to meet him", "Say you'd hoped to meet him"],
        playful: ["Ask if it was flattering", "Ask if you live up to it"],
        bold: [
          "Say you'd rather hear his take",
          "Say he can judge for himself",
        ],
        neutral: ["Shrug off the fuss", "Say you're just a student"],
      },
    },
    {
      line: "He watches you hurry past with a slight, amused smile.",
      approach: "Ask what's so amusing",
      greeting: '"Ah, to be young. You certainly are full of energy."',
      responses: {
        kind: ["Ask if he'd like to join you", "Say he seems young at heart"],
        playful: ["Offer to lend him some", "Ask if he ever had any"],
        bold: [
          "Take his arm, bring him along",
          "Say he's not too old for this",
        ],
        neutral: ["Say you're just in a hurry", "Keep hurrying past"],
      },
    },
    {
      line: "He's staring at a screen, refreshing the same channel page again and again, waiting on a new upload.",
      approach: "Try to get his attention",
      greeting: '"Sorry, but could we continue this tomorrow?"',
      responses: {
        kind: ["Ask what channel it is", "Ask what he likes about it"],
        playful: [
          "Guess what the video is about",
          "Ask if you can subscribe too",
        ],
        bold: ["Ask to join him", "Say you'll watch it with him"],
        neutral: ["Leave him to his video", "Come back another time"],
      },
    },
    {
      line: "You turn around and he's simply there, smiling, as though he has been standing behind you for some time.",
      approach: "Admit you got a little lost",
      greeting:
        '"It would be troublesome for me if you were to disappear. Let me know next time you decide to wander off.',
      responses: {
        kind: ["Promise to be careful", "Ask him to walk with you"],
        playful: ["Ask why it'd trouble him", "Ask if he followed you"],
        bold: ["Say you're not going anywhere", "Say he found you fast enough"],
        neutral: ["Hold your ground", "Step back a pace"],
      },
    },
    {
      line: "He's the most powerful vampire alive, if the rumors are true. At the moment, he's yawning into his sleeve.",
      approach: "Ask if the rumors are true",
      greeting: '"Hm? The most powerful vampire? No, those are just rumors."',
      responses: {
        kind: ["Say you'd like to know him", "Say he seems too nice for them"],
        playful: ["Ask how old he really is", "Ask who started the rumor"],
        bold: [
          "Say you'll decide for yourself",
          "Say you don't mind either way",
        ],
        neutral: ["Stay watchful", "Keep your thoughts to yourself"],
      },
    },
  ],
};
