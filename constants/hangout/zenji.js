// Zenji's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/zenji.js.
//
// He's a ghost: a touch passes through him or lands as a chill, and he can't
// return it. Only at spark does he spend the effort to almost feel it, and it
// costs him. No object handling. Guarded spots (lips, chest, hips) stay
// gentlemanly rebuffs until spark.

export default {
  new: {
    headPat: [
      "Oh! Your hand went straight through. Are you all right, my dear?",
      "Gracious, a pat on the head? I'm afraid there's not much there to pat.",
    ],
    cheekPoke: [
      "Ha ha! Did you feel a chill? That was me.",
      "You've poked the air, my dear. I'm just a touch to the left.",
    ],
    lipsTouch: [
      "My dear! We've scarcely been introduced!",
      "Ah, ah. A poet must be wooed with verse first.",
    ],
    earTouch: [
      "You want my ear? Then lend me yours. I have a story.",
      "A chill, wasn't it? Forgive me. I'm told I run cold.",
    ],
    handTap: [
      "Oh, a handshake? I'm afraid my hand isn't quite up to it.",
      "Your fingers found nothing? Horsefeathers. I'm right here.",
    ],
    chestTouch: [
      "Careful, my dear. You'll go right through.",
      "Gracious! A gentleman's heart isn't to be prodded.",
    ],
    bellyTouch: [
      "Gracious! A poke in the ribs, from someone I've only just met?",
      "Careful, my dear. That's the coldest part of me, I suspect.",
    ],
    hipsTouch: [
      "My dear! Such forwardness!",
      "Ah, ah, ah. Not even an inspired man of the quill allows that.",
    ],
    upset: [
      "My dear, please. You'll catch a chill.",
      "Enough, enough! You'll wear a hole in the air.",
    ],
  },
  known: {
    headPat: [
      "Ha ha. Still nothing there to pat, my dear. It's the thought that counts.",
      "Again? How sensational. You're getting the hang of me.",
    ],
    cheekPoke: [
      "Oh! You keep finding the cold spot. That's me, you know.",
      "Was that a poke? I hardly felt a thing. Do try again.",
    ],
    lipsTouch: [
      "My dear, such boldness belongs in the last chapter, not the second.",
      "Gracious. I'll have to write that down and never publish it.",
    ],
    earTouch: [
      "Lend me yours instead. I've a verse waiting.",
      "Whispering secrets? Ghosts are excellent at keeping them.",
    ],
    handTap: [
      "If only I could take it. ...Ha ha, let me pretend.",
      "Your hand went through mine. A shame. It's a lovely hand.",
    ],
    chestTouch: [
      "Careful. It's colder in there than you'd think.",
      "My dear, there's nothing in there to knock on.",
    ],
    bellyTouch: [
      "My dear, you'll find nothing there but a draft.",
      "Horsefeathers, a poke in the middle? I'll put that in a comedy, not a romance.",
    ],
    hipsTouch: [
      "Horsefeathers! My dear, have you no shame?",
      "That's quite enough of that, I think.",
    ],
    upset: [
      "My dear, please! You'll give yourself frostbite.",
      "Enough! Even a ghost needs room to breathe. ...Figuratively.",
    ],
  },
  warm: {
    headPat: [
      "Ha ha. If I were solid, I'd lean right into that.",
      "My dear, that's terribly sweet. Do it again.",
    ],
    cheekPoke: [
      "You found me! Most people walk right past.",
      "Ha ha. A poke for a poet. Copacetic.",
    ],
    lipsTouch: [
      "My dear, I must ask you not to. I'd only want to write about it.",
      "Not that one, I'm afraid. Some pages stay blank.",
    ],
    earTouch: [
      "Is that you whispering, or the wind? Either way, I'm listening.",
      "That tickled, I think. How curious.",
    ],
    handTap: [
      "I can't hold it. But I can walk beside it.",
      "With practice, I might manage your hand someday.",
    ],
    chestTouch: [
      "Gently. You're very near where my heart used to be.",
      "Careful, my dear. I'd rather you didn't go through there.",
    ],
    bellyTouch: [
      "Oh! I... I think I flinched. How peculiar, for a ghost.",
      "Gracious, my dear! A poet ought to get some warning.",
    ],
    hipsTouch: [
      "My dear, really! What would Haku say?",
      "Ah, ah. Not even for a friend.",
    ],
    upset: [
      "Enough, please. My dear, you'll scatter me like mist.",
      "My dear, please, stop. Even a gentleman's patience runs thin.",
    ],
  },
  spark: {
    headPat: [
      "Hold still. I'll try to feel it this time.",
      "...There. Almost. That's the most I've felt in a year.",
    ],
    cheekPoke: [
      "My dear, my face is warm. Ghosts aren't supposed to blush.",
      "You'll have me blushing, and I'm not sure I'm able.",
    ],
    lipsTouch: [
      "...My dear. You don't know what that does to a poet.",
      "I'd return that if I had the strength. Give me a moment to gather it.",
    ],
    earTouch: [
      "Gracious. I felt that. I wasn't meant to.",
      "Whisper something, my dear. I'll keep it.",
    ],
    handTap: [
      "Wait. Let me try. ...There. Don't let go.",
      "It costs me a little to hold on. I don't mind.",
    ],
    chestTouch: [
      "...If I still had a heartbeat, you'd hear it racing.",
      "My dear... You'll have me writing sonnets about this.",
    ],
    bellyTouch: [
      "Butterflies, my dear. I'd forgotten a fella could still get those.",
      "Ha ha... Gracious. Give a poor ghost a moment to collect himself.",
    ],
    hipsTouch: [
      "My dear! I'm... I'm a gentleman, you know!",
      "I've no words for that. Me, of all people.",
    ],
    upset: [
      "My dear, mercy. I'm spending all I have just staying composed.",
      "Enough, please. I can't keep up, and I want to.",
    ],
  },
  close: {
    headPat: [
      "I felt every bit of that, my dear. Worth whatever it costs me.",
      "My dear, you've a talent for patting thin air. Lucky for me, I'm in it.",
    ],
    cheekPoke: [
      "Ha ha! You found me first try. You know exactly where I am now.",
      "You're terribly fond of that spot, my dear. So am I, now.",
    ],
    lipsTouch: [
      "I saved up my strength this time. ...Now I can return it.",
      "My dear, that was the cat's pajamas. Do it again, and I'll put my whole self into it.",
    ],
    earTouch: [
      "Lean closer, my dear. I'll recite you something no one else gets to hear.",
      "Ha ha... I felt that clear down to my toes. And I'm not certain I have toes.",
    ],
    handTap: [
      "I've been practicing, you know. I can hold on longer now.",
      "There. I've got you, my dear. For as long as I can manage.",
    ],
    chestTouch: [
      "Careful, my dear. You'll find out how much of me is yours.",
      "Stay, my dear. I'd spend everything I have to keep you here.",
    ],
    bellyTouch: [
      "Ha ha! Mercy, my dear. Even a ghost is ticklish, it turns out.",
      "Stay there. I'm almost solid when you're this close.",
    ],
    hipsTouch: [
      "My dear... A gentleman would stop you. I'm finding I'd rather be a poet.",
      "Gracious. That's a scene I'd never let Haku film. ...Go on.",
    ],
  },
};
