// Towa's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/towa.js.
//
// Towa can't speak by day, so his lines swap by the hour like
// daytimeDialogue (activity/src/hangout/lines.js, the same evening cutoff as
// _PM backgrounds): the tier pools are his evening voice, `daytime` the
// wordless one. Daytime lines are hums and sounds only ("~ ~ ~ ♪", "...!"),
// with no letters at all; "Heh heh" is a night voiceline, so it stays in the
// evening pools. "Dandelion" starts at known. He likes being touched by the
// MC from the start (a physical, cuddly type), but on his terms: through
// known, lips/chest/belly/hips get a guarded "not there" (he hears her heart
// and reads the touch as off), never cold; hips drop his voice a little.
// From spark those spots fluster him.
// Upset goes lower and flatter through warm (his voice drops), never cruel,
// and is flustered from spark.

export default {
  new: {
    headPat: [
      "Heh heh ♪ Again! Do it again!",
      "Oh! You're a nice one. I knew it. ♪",
    ],
    cheekPoke: [
      "Hm? What's on my face? Is it petals?",
      "Hey! Heh heh ♪ My turn next!",
    ],
    lipsTouch: [
      "...? Hm. Not there.",
      "Your heart just jumped. Why'd you do that?",
    ],
    earTouch: [
      "Ah! That tickles. ~ ~ ♪",
      "Careful! My ears are really good, you know.",
    ],
    handTap: [
      "Are we going somewhere? Let's go!",
      "Your hand's small. Come play with me!",
    ],
    chestTouch: [
      "...? What are you looking for in there?",
      "Hm? That's where my heart is. Don't poke it.",
    ],
    bellyTouch: [
      "...Hm? That's my belly. Why?",
      "No. Pat my head instead.",
    ],
    hipsTouch: [
      "...Hey. Not there.",
      "I can hear your heart. You know that was weird, right?",
    ],
    upset: ["...Stop.", "I said stop. I don't like that."],
  },
  known: {
    headPat: ["Heh heh ♪ Dandelion's petting me!", "More! Right there. ♪"],
    cheekPoke: [
      "Hey! Heh heh ♪ Caught you, Dandelion.",
      "Do it again and I'll poke back. ♪",
    ],
    lipsTouch: [
      "...? Dandelion. Why there?",
      "Not there, Dandelion. Heads are better.",
    ],
    earTouch: [
      "Ah! That tickles. Heh heh ♪",
      "Shh. I'm listening to you, Dandelion.",
    ],
    handTap: [
      "Found you! ♪ Now you can't get away.",
      "Your hand's warm. Come on, let's go play!",
    ],
    chestTouch: [
      "...? Dandelion's hands are curious.",
      "Hm? Nothing in there for you, Dandelion.",
    ],
    bellyTouch: [
      "...Heh. No. Cuddle me properly or don't.",
      "Hm? That's not how you ask for a cuddle.",
    ],
    hipsTouch: [
      "...Dandelion. Hands up here.",
      "I heard your heart skip. That's not a head pat.",
    ],
    upset: ["...Dandelion. Stop it.", "I don't like that. Don't do it again."],
  },
  warm: {
    headPat: [
      "Heh heh ♪ More, Dandelion. I'll stay right here.",
      "Your hand fits my head. That's lucky. ♪",
    ],
    cheekPoke: [
      "Hey! Do that again and I'll cuddle you.",
      "Heh heh ♪ My cheek's soft, right? Like petals.",
    ],
    lipsTouch: [
      "...? You keep picking there. Do you know something I don't?",
      "Hm? Are they soft? I never checked. ♪",
    ],
    earTouch: [
      "Ah! Heh heh ♪ I heard that. I hear everything.",
      "Shh. Do it again. I like how close you are.",
    ],
    handTap: [
      "Found you, Dandelion! Now hold on. ♪",
      "Don't let go. If you let go, I'll come find you.",
    ],
    chestTouch: [
      "...? Are you listening to my heart? It's loud.",
      "Hm? That's my sweater. You can borrow it. ♪",
    ],
    bellyTouch: [
      "Heh heh ♪ Stop, Dandelion! That tickles!",
      "Hm? Are you hungry too? Let's go eat flowers.",
    ],
    hipsTouch: [
      "...? Dandelion is acting funny. ♪",
      "Hm? Do you want a cuddle? Just say so.",
    ],
    upset: [
      "...Stop. I mean it, Dandelion.",
      "That's enough. I don't like it.",
    ],
  },
  spark: {
    headPat: [
      "Heh heh ♪ Only you get to do that, Dandelion.",
      "Keep going. I hate waiting, but I'd wait for this.",
    ],
    cheekPoke: [
      "Hey! ...Heh heh ♪ Do it again.",
      "Hm? My cheeks are hot. That's your fault, Dandelion.",
    ],
    lipsTouch: [
      "...! D-Dandelion. Say something.",
      "...! Heh heh... My heart's loud now. Can you hear it too?",
    ],
    earTouch: [
      "...! Not so close. Your heart's going so fast.",
      "Ah! Heh heh ♪ Stay close. I like your heartbeat best.",
    ],
    handTap: [
      "Mine. ♪ This hand's mine now, Dandelion.",
      "Hold on tight. Don't go anywhere without me.",
    ],
    chestTouch: [
      "...! Dandelion. My heart's doing something weird.",
      "...Heh heh. You found the loud part.",
    ],
    bellyTouch: [
      "...! Heh heh ♪ Stop! That's not fair!",
      "Hm? ...You're blushing. I can tell. ♪",
    ],
    hipsTouch: [
      "...! Dandelion! ...Heh heh. Do that again.",
      "...! You're bold. I like bold. ♪",
    ],
    upset: [
      "...! Okay, okay! That's too much, Dandelion.",
      "Heh... Stop. My face is too hot.",
    ],
  },
  close: {
    headPat: [
      "Heh heh ♪ Promise you'll do this every day.",
      "Dandelion's hand is the best one. ♪",
    ],
    cheekPoke: [
      "Heh heh ♪ Caught you! Now you owe me a cuddle.",
      "Do it again! I'll count. ♪",
    ],
    lipsTouch: [
      "...! Heh heh ♪ You want that, Dandelion? Me too.",
      "...Again. Slower this time. ♪",
    ],
    earTouch: [
      "Shh. Your heart's saying my name. Heh heh ♪",
      "Ah! Stay there. I like hearing you this close.",
    ],
    handTap: [
      "My Dandelion. ♪ Don't let go, okay?",
      "Let's go somewhere only we know. ♪",
    ],
    chestTouch: [
      "Hear that? It's yours. Heh heh ♪",
      "...Mine. And this is yours. Fair, right?",
    ],
    bellyTouch: [
      "Heh heh ♪ Dandelion! No fair! Cuddle instead!",
      "Okay, that's it. Big squeeze! ♪",
    ],
    hipsTouch: [
      "...! Heh heh ♪ You're bold, Dandelion.",
      "Hm? Come closer, then. ♪",
    ],
  },
  daytime: {
    new: {
      headPat: ["~ ~ ~ ♪", "...! ~ ~ ~ ♫"],
      cheekPoke: ["...? ~ ~ ~?", "~ ~! ~ ~ ♪"],
      lipsTouch: ["...!", "...? . . . ~ ~ ."],
      earTouch: ["~ ~? ~ ~ ~ ♪", "...! ~ ~ ~!"],
      handTap: ["~ ~ ~ ♪ ~ ~ ~ ♪", "...? ~ ~ ♫"],
      chestTouch: ["...?", ". . . ~ ~ ~ ?"],
      bellyTouch: ["...? ~ ~?", ". . . ...? ~ ~ ."],
      hipsTouch: ["...! ...!", ". . . ~ ~ ."],
      upset: [". . . ~ ~ ~ .", "~ ~ . . . ~ ."],
    },
    known: {
      headPat: ["~ ~ ~ ♫ ~ ~ ~ ♫", "~ ~! ~ ~ ~ ♪"],
      cheekPoke: ["~ ~! ~ ~! ♪", "...? ~ ~ ♪"],
      lipsTouch: ["...? ...", "~ ~ . . . ?"],
      earTouch: ["~ ~ ~ ♪ ...!", "...! ~ ~ ~ ♫"],
      handTap: ["~ ~ ~ ♪ ~ ~ ♪", "...! ~ ~ ~ ♫ ~ ~ ~ ♪"],
      chestTouch: ["...? ~ ~ ~", ". . . ~ ~ ?"],
      bellyTouch: ["~ ~? . . . ~ ~", "...? . . . ~ ~ ~ ?"],
      hipsTouch: ["...! . . .", "~ ~ . . . !"],
      upset: ["~ ~ ~ . . . .", ". . . ~ ~ ~ ."],
    },
    warm: {
      headPat: ["~ ~ ~ ♫ ~ ~ ♪", "~ ~ ~ ♪ ~ ~ ~ ♪ ~ ~ ~ ♪"],
      cheekPoke: ["~ ~! ~ ~ ~ ♫", "~ ~ ♪ ~ ~?"],
      lipsTouch: ["...? ~ ~ .", "...! . . . ~ ~ ~?"],
      earTouch: ["~ ~ ~! ~ ~ ♪", "...! ~ ~ ~ ♫ ~ ~ ♫"],
      handTap: ["~ ~ ~ ♪ ~ ~ ~ ♫", "...! ~ ~ ~ ♫ ~ ~ ~ ♪"],
      chestTouch: ["...? ~ ~ ~ ♪", "~ ~ . . . ?"],
      bellyTouch: ["...! ~ ~ ♪ ~ ~?", "~ ~ ~! ...! ~ ~ ~ ♪"],
      hipsTouch: ["...! ~ ~ . . .", ". . . ~ ~ ~?"],
      upset: ["~ ~ ~ . . . ~ .", "...! . . . ~ ~ ."],
    },
    spark: {
      headPat: ["~ ~ ~ ♫ . . . ~ ~ ~ ♪", "~ ~! ~ ~ ~ ♫ ~ ~ ~ ♫"],
      cheekPoke: ["...! ~ ~ ~ ♫", "~ ~? . . . ~ ~ ♪"],
      lipsTouch: ["...! . . . ~ ~ ~ ♫", "...! ...! ~ ~ ~?"],
      earTouch: ["...! ~ ~ ~ . . . ♫", "~ ~ ~! ~ ~ ~! ♫ ♫"],
      handTap: ["~ ~ ~ ♫ ~ ~ ~ ♫", "~ ~ ~ ♪ . . . ~ ~ ♪"],
      chestTouch: ["...! ~ ~ ~ . . . ♪", "...! . . . ~ ~ ~ ♫"],
      bellyTouch: ["...! ...! ~ ~ ♫", "♫ ...! ~ ~ . . . ~ ~ ~ ♪"],
      hipsTouch: ["...! ...! . . . ~ ~ ♫", "~ ~ . . . ...! ~ ~ ~?"],
      upset: ["~ ~ ~ . . . ~ ~ .", "...! ~ ~ . . . ~ ."],
    },
    close: {
      headPat: ["~ ~ ~ ♪ ~ ~ ~ ♪ ~ ~ ♫", "♫ ~ ~ ~ ♪ . . . ~ ~ ~ ♫"],
      cheekPoke: ["~ ~ ♪ ~ ~! ~ ~ ~ ♫", "~ ~ ~? ~ ~ ♫ ~ ~ ~ ♪"],
      lipsTouch: ["...! ~ ~ ♫ ~ ~ ~ ♪", "~ ~ . . . ...! ~ ~ ~ ♫ ♫"],
      earTouch: ["~ ~ ~ ♪ ~ ~ ~ ♫ ~ ~ ♪", "...! ~ ~ ~ ♫ . . . ♪"],
      handTap: ["♪ ~ ~ ~ ♪ . . . ~ ~ ~ ♫", "~ ~ ♪ ~ ~ ~ ♫ ~ ~ ~ ♪"],
      chestTouch: ["~ ~ ~ ♪ . . . ~ ~ ~ ♫", "...! . . . ~ ~ ♫"],
      bellyTouch: ["~ ~ ♫ ~ ~ ~! ~ ~ ♪", "...! ~ ~ ~ ♪ ~ ~ ~ ♫"],
      hipsTouch: ["...! ~ ~ ♪ ~ ~ ~?", "~ ~ ~ ♫ . . . ~ ~! ♪"],
    },
  },
};
