// Towa's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/towa.js.
//
// Towa can't speak by day, and the hangout's hour isn't fixed, so nearly
// every line is a hum or a wordless sound, spaced like daytimeDialogue
// ("~ ~ ~ ♪"). Only a handful carry a word ("Dandelion", known+) and those
// are night-only by canon. He likes being touched by the MC from the start
// (a physical, cuddly type), so even guarded spots are a puzzled "...?" or a
// low hum rather than coldness until spark, where they fluster him. Upset
// goes lower and flatter, never cruel.

export default {
  new: {
    headPat: ["~ ~ ~ ♪", "...! ~ ~ ~ ♫"],
    cheekPoke: ["...? ~ ~ ~?", "~ ~! Heh heh ♪"],
    lipsTouch: ["...!", "...? . . . ~ ~ ."],
    earTouch: ["~ ~? ~ ~ ~ ♪", "...! ~ ~ ~!"],
    handTap: ["~ ~ ~ ♪ ~ ~ ~ ♪", "...? ~ ~ ♫"],
    chestTouch: ["...?", ". . . ~ ~ ~ ?"],
    bellyTouch: ["...? ~ ~?", ". . . ...? ~ ~ ."],
    hipsTouch: ["...! ...!", ". . . ~ ~ ."],
    upset: [". . . ~ ~ ~ .", "~ ~ . . . ~ ."],
  },
  known: {
    headPat: ["~ ~ ~ ♫ ~ ~ ~ ♫", "Heh heh ♪ ~ ~ ~ ♪"],
    cheekPoke: ["~ ~! ~ ~! ♪", "...? Heh heh ♪"],
    lipsTouch: ["...? ...", "~ ~ . . . ?"],
    earTouch: ["~ ~ ~ ♪ ...!", "...! ~ ~ ~ ♫"],
    handTap: ["~ ~ ~ ♪ ~ ~ ♪", "...! ~ ~ ~ ♫ ~ ~ ~ ♪"],
    chestTouch: ["...? ~ ~ ~", ". . . ~ ~ ?"],
    bellyTouch: ["~ ~? . . . ~ ~", "...? . . . ~ ~ ~ ?"],
    hipsTouch: ["...! . . .", "~ ~ . . . !"],
    upset: ["~ ~ ~ . . . .", ". . . ~ ~ ~ ."],
  },
  warm: {
    headPat: ["~ ~ ~ ♫ Heh heh ♪", "~ ~ ~ ♪ ~ ~ ~ ♪ ~ ~ ~ ♪"],
    cheekPoke: ["~ ~! ~ ~ ~ ♫", "Heh heh ♪ ~ ~?"],
    lipsTouch: ["...? ~ ~ .", "...! . . . ~ ~ ~?"],
    earTouch: ["~ ~ ~! Heh heh ♪", "...! ~ ~ ~ ♫ ~ ~ ♫"],
    handTap: ["~ ~ ~ ♪ ~ ~ ~ ♫", "...! ~ ~ ~ ♫ ...Dandelion. ♪"],
    chestTouch: ["...? ~ ~ ~ ♪", "~ ~ . . . ?"],
    bellyTouch: ["...! Heh heh ♪ ~ ~?", "~ ~ ~! ...! ~ ~ ~ ♪"],
    hipsTouch: ["...! ~ ~ . . .", ". . . ~ ~ ~?"],
    upset: ["~ ~ ~ . . . ~ .", "...! . . . ~ ~ ."],
  },
  spark: {
    headPat: ["~ ~ ~ ♫ . . . ~ ~ ~ ♪", "Heh heh ♪ ~ ~ ~ ♫ ~ ~ ~ ♫"],
    cheekPoke: ["...! ~ ~ ~ ♫", "~ ~? . . . Heh heh ♪"],
    lipsTouch: ["...! . . . ~ ~ ~ ♫", "...! ...! ~ ~ ~?"],
    earTouch: ["...! ~ ~ ~ . . . ♫", "~ ~ ~! ~ ~ ~! ♫ ♫"],
    handTap: ["~ ~ ~ ♫ ~ ~ ~ ♫", "~ ~ ~ ♪ ...Mine. ♪"],
    chestTouch: ["...! ~ ~ ~ . . . ♪", "...Dandelion. ~ ~ ~ ♫"],
    bellyTouch: ["...! ...! Heh heh ♫", "♫ ...! ~ ~ . . . ~ ~ ~ ♪"],
    hipsTouch: ["...! ...! . . . ~ ~ ♫", "~ ~ . . . ...! ~ ~ ~?"],
    upset: ["~ ~ ~ . . . ~ ~ .", "...! ~ ~ . . . ~ ."],
  },
};
