// Edward's solo warding cards. Shared cards featuring Edward (Rui_Edward,
// Lyca_Edward_Rui) live in ./shared.js. See ./index.js for the full contract
// and entry shape.
//
// Warding cards are a rare /roam outcome. A pick is still scored normally (the
// option's affinityByResponse gain for Edward, kind/playful/bold worth 1/0/2)
// and then a flat WARDING_AFFINITY_GAIN on top for the encounter being a
// warding card. The choice only changes the `close` line. Every `close` reads
// warm, since even his least-resonant option nets at least the bonus, and none
// may read like the "what happened after" milestone afterlines in
// constants/publicEncounters.js.
//
// Voice is grounded ONLY in reference.md's Edward section (the home voicelines)
// and constants/characters.js, NOT the bond-scene file: the courtly register
// never drops, it just stops being armor. The frail gentleman is a performance
// (parasol, cough, eyesight too poor for his own letters) and underneath it is
// an ancient, lonely predator tired of the act. The act is shown, never
// explained: he disarms by being languid and ordinary, and no line restates
// the rumors, the sun, or his health for the player, who knows them already.
// bold reaches him most (the partner who sees past it and does not flinch),
// kind lands too (he genuinely wants to be doted on), playful lands softest
// (he is the one who does the teasing, too languid for it volleyed back) but
// still nets the bonus.
// Canon markers used here, all straight from reference.md: "Wicked girl", "You
// ought to know better than to...", "Ah ha ha ha.", the devil's hour, "my
// vitality returns at this hour" (never in an Obscuary scene: it is always
// night there, so the hour means nothing), "Come here"/"Come closer", "..., would you?"
// tag questions on requests, "..., I'm afraid", "my favorite channel". No age
// in years is ever stated (reference.md never gives one), no "I shall" and no
// phrasing lifted from constants/dialogue/edward.js. American spelling, no em
// dashes.
//
// Unlike Shion's narration-weighted cards, all three Edward cards are
// dialogue-only, like Leo's selfie card and both Ren cards: NO narration and NO
// stage directions anywhere. `line` is the greeting-weight hook shown as text
// before the art (<= ~120 chars, has to land on its own),
// `greeting` is him still talking over the revealed art, every `close` is more
// of the same. The
// scene is carried entirely by what he says. The bond-scene texting quirks
// (emojis, Title Case) are a DM-only affectation and do not appear here; this
// is in-person speech, normal punctuation, spoken words in double quotes.
// `// setting:` notes preserve what each card's art shows.
export default {
  Edward: {
    file: "Edward.png",
    characters: ["edward"],
    title: "Sanguine Smirk",
    approach: "Sit across from him",
    // setting: a first one-on-one, Edward lounging with a glass of something
    // deep red held loosely by the stem, the slight amused smile on his lips.
    // He disarms rather than menaces: idle, bored, chatty, the glass waved off
    // as nothing. He never says whether it is wine or blood; the smile is the
    // only tell. kind trusts him whatever is in it, playful plays along with
    // the harmless act, bold asks for a glass of her own.
    line:
      '"Ah, there you are. Sit, would you? Don\'t mind the glass. Just a little something for an old man\'s poor circulation."',
    greeting:
      '"No need to look at it like that. It\'s only a glass. Now, sit and entertain me, would you? I\'ve watched everything on my list twice. How troubling."',
    responses: {
      kind: {
        label: "Say you trust him either way",
        close:
          '"Either way? Ah ha ha ha. You really should be more careful whom you trust, you know. ...But I don\'t think I\'ll talk you out of it. Stay a while, would you?"',
      },
      playful: {
        label: "Guess it's cranberry juice",
        close:
          '"Cranberry. Ah ha ha ha. Yes, let\'s call it that. Nobody has ever guessed anything so wholesome for me. I could get used to being thought harmless. Sit with me a while longer."',
      },
      bold: {
        label: "Ask him to pour you one",
        close:
          '"Wicked girl. You ought to know better than to ask an invalid to share his medicine. ...Very well. Just a sip. Come closer, and mind you don\'t spill."',
      },
    },
  },
  Edward_2: {
    file: "Edward_2.png",
    characters: ["edward"],
    title: "Invitation To Endless Night",
    // Coming to his room is routine, he calls her over all the time. The ask
    // here is that she stay: Obscuary is always night, so there is no dawn to
    // send her home. Guard already down. Reads wrong from a near-stranger, so
    // it only enters the pool once they're Friends.
    minLevel: "Friend",
    approach: "Cross the room to him",
    // setting: his room, lamps low, moonlight across the floor. Edward is
    // beckoning her nearer with a dangerous but soft smile, his whole attention
    // on her, asking her not to leave. kind names the room safe, playful
    // accuses the smile of being rehearsed, bold simply closes the distance.
    line:
      '"Leaving already? You have only just arrived. The moonlight suits you. Come and stand in it properly, would you?"',
    greeting:
      '"There is no dawn here to send you home, so you will have to find some other excuse to leave. I would rather you did not look for one. Stay. I promise you nothing."',
    responses: {
      kind: {
        label: "Say the room feels safe",
        close:
          '"Safe. Ah ha ha ha. No one has ever called any room of mine that, and there have been a great many. You make it sound like a mercy rather than a lair. Then stay in it, would you? I\'ll try to deserve the word."',
      },
      playful: {
        label: "Say he practiced that smile",
        close:
          '"For a century or two, wicked girl. Of course I practiced it. But not for you. For you it simply arrives, and I have stopped forbidding it. Stay where the light is."',
      },
      bold: {
        label: "Close the last of the gap",
        close:
          '"There you are. Closer than you usually let yourself come. Wicked girl. What were you hoping for? Go on, say it. And then stay and find out."',
      },
    },
  },
  Edward_3: {
    file: "Edward_3.png",
    characters: ["edward"],
    title: "Outsider Observations",
    // His attention is elsewhere for once, and she has to win it back. Reads
    // wrong from a near-stranger, so it only enters the pool once they're
    // Friends.
    minLevel: "Friend",
    approach: "Block his view of the screen",
    // setting: Edward propped up absorbed in something on his phone, his pajama
    // shirt half unbuttoned and careless. He barely looks up at her. The card
    // never says what he is watching. kind offers to sit through it with him,
    // playful talks over it to upstage it, bold takes the phone out of his
    // hands.
    line:
      '"One moment, would you. I am in the middle of a video. ...You are still standing there, I see."',
    greeting:
      '"My favorite channel. ...You have been standing in front of it a while now, doing the thing where you want my attention and will not simply ask for it. I know that game. Go on, then. Earn it back."',
    responses: {
      kind: {
        label: "Say you'll watch it with him",
        close:
          '"You would sit through the whole thing at my side, without even asking what it is? Ah ha ha ha. How trusting. Come here, would you. I\'ll begin it again from the top."',
      },
      playful: {
        label: "Talk over his video",
        close:
          '"Ah ha ha ha. What a racket. I have not looked back at the screen once. ...Keep going. You have my attention now, wicked girl, which was the whole point, and we both know it."',
      },
      bold: {
        label: "Take the phone from his hands",
        close:
          '"You have taken my phone straight out of my hands, and not the least bit sorry about it. ...Keep it. The video will still be there tomorrow. Come and do these up, would you, since you cannot seem to stop looking at them."',
      },
    },
  },
};
