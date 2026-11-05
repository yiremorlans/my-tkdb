// Benkei's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/benkei.js. His Live2D model
// isn't converted yet; the lines are ready for when it is.
//
// Kind, warm, easily flustered shopkeep; a young former professor with a
// casual register (no "shan't"/"needn't", no old-man framing). Staff, never a
// student. Rebuffs stay gentle and a little sheepish, with the shop and his
// cat manager as cover (manager/cat mentions in new tier only). Never touches
// why Clementia/Ultio ended. Guarded spots (lips, chest, hips) stay polite
// refusals until spark.
//
// Removable article (docs/hangout-activity.md §4.2): the name tag on his
// campus-store apron, work outfit only (the academy outfit has none). It
// covers the chest spot, so nametagPat borrows chest's guarded register
// early; from warm a double-tap takes it off (nametagOff). chestTouch is
// shared by both outfits and never mentions the tag.
//
// Holds (spark+): one line on letting go. Close hints and holds back;
// bound treats intimacy as shared history. Still flustered, still on shift.

export default {
  new: {
    headPat: [
      "Oh! Uh, hi. Can I help you find something?",
      "Ha ha... That's new. Usually people just ask where the batteries are.",
    ],
    cheekPoke: [
      "Oh? Did I have something on my face?",
      "Oh! You caught me off guard there.",
    ],
    lipsTouch: [
      "Oh! Ah, sorry. Not the lips, okay?",
      "Ah, sorry, that's a little much.",
    ],
    earTouch: [
      "Oh! That tickles. Sorry, I'm listening.",
      "Ha ha... I can hear you fine from over there, promise.",
    ],
    handTap: [
      "Oh, sorry, was I in your way? Here.",
      "Need a hand with something? That's what I'm here for.",
    ],
    chestTouch: [
      "Ah, could you give me a little room? Sorry.",
      "Hey, careful. My manager's watching.",
    ],
    bellyTouch: [
      "Oh! Uh, that's my stomach. Sorry, could you not?",
      "Ha ha... Let's keep the poking to the snack aisle, yeah?",
    ],
    nametagPat: [
      "Oh, the tag? Yep, that's me. Need help finding something?",
      "Ah, careful, it's only pinned on. Sorry, did you need something?",
    ],
    hipsTouch: ["Whoa! Hey, I'm working here.", "Ah, no, sorry. Not okay."],
    upset: [
      "Okay, that's enough. Hands to yourself, please.",
      "Hey. I said stop. I mean it.",
    ],
  },
  known: {
    headPat: [
      "Ha ha... Is my hair sticking up again?",
      "Oh... Do I look like I need cheering up?",
    ],
    cheekPoke: ["Hey. What's that for?", "You're in a mood today, huh."],
    lipsTouch: [
      "Ah, no. Sorry, not that.",
      "Whoa. Um... That's a little personal, yeah?",
    ],
    earTouch: [
      "Ha ha, that tickles. Cut it out.",
      "Oh, sorry, was I zoning out? I'm listening.",
    ],
    handTap: [
      "Careful, I've got marker on these from the price tags.",
      "Hey, you. Need something? I'm right here.",
    ],
    chestTouch: [
      "Ah, a little close. Sorry.",
      "Careful, you'll wrinkle the tie.",
    ],
    bellyTouch: [
      "Hey, no poking. I'm not the bread.",
      "Ah, sorry. Not there, okay?",
    ],
    nametagPat: [
      "You know my name by now, I hope. ...You do, right?",
      "Ha ha... It's crooked again, isn't it?",
    ],
    hipsTouch: [
      "Hey! Hands to yourself.",
      "Whoa, no! You're a student. Absolutely not.",
    ],
    upset: [
      "Okay, that's enough. Sorry, but it is.",
      "Hey. I'm asking you to stop. Please.",
    ],
  },
  warm: {
    headPat: [
      "You know, I don't mind that.",
      "Oh. That's nice, actually. I could get used to that.",
    ],
    cheekPoke: [
      "What? Was I smiling again?",
      "You're in a good mood. I like seeing that.",
    ],
    lipsTouch: [
      "Ah... Not that. Sorry.",
      "Oh. Ha ha... Let's not, okay? That's a little close.",
    ],
    earTouch: [
      "Ha ha, that tickles. You're doing that on purpose.",
      "You've got my attention. You always do.",
    ],
    handTap: ["Here. What's up?", "Oh, just saying hi? Okay."],
    chestTouch: [
      "Ah, that's a little close. Sorry.",
      "Hey, easy. I'm still on shift.",
    ],
    bellyTouch: [
      "Whoa! Ha ha... Okay, you got me.",
      "Ha... Sneaky. Warn me next time, yeah?",
    ],
    nametagPat: [
      "It hasn't changed, I promise. Still me.",
      "Ha ha... If you're after a tag, I can get you an application.",
    ],
    nametagOff: [
      "Hey! I need that. ...Okay, just don't lose it, yeah?",
      "Oh! Ha ha... Now nobody'll know who to ask for.",
    ],
    hipsTouch: ["Whoa. Hey.", "Okay, not that. Sorry."],
    upset: [
      "That's enough now. I'm serious.",
      "Hey. Stop. You know better than that.",
    ],
  },
  spark: {
    headPat: [
      "I'd lean into that, if I wasn't on shift.",
      "Ha ha... My face is red, isn't it.",
    ],
    cheekPoke: [
      "You're teasing me. ...I don't mind.",
      "Ah... I'm flustered enough already, you know.",
    ],
    lipsTouch: [
      "Oh. I, uh... Wow. Okay.",
      "...Don't do that unless you mean it.",
    ],
    earTouch: [
      "Ah... That's not fair.",
      "Hey... I can't think when you do that.",
    ],
    handTap: [
      "Here. You can hold on, if you want.",
      "Oh... Okay. I'll just keep this, then.",
    ],
    chestTouch: [
      "Ah... You can probably hear that, huh.",
      "Could you stay like that a second? Sorry. Just a second.",
    ],
    bellyTouch: [
      "Oh... Ha ha. My stomach's doing a whole thing now.",
      "Ah... Okay. You can leave it there. I'll manage.",
    ],
    nametagPat: [
      "Yep, still Benkei. Ha ha... Still flustered, too.",
      "Oh, was that crooked? ...Thanks.",
    ],
    nametagOff: [
      "Ha ha... Without that, I'm technically just some guy.",
      "Ah... You're really not making this job easy, you know.",
    ],
    hipsTouch: [
      "Whoa... You're bold today.",
      "Hey... Not here. Not while I'm working.",
    ],
    upset: [
      "Okay, I give up. You win. Just give me a second.",
      "You're making it really hard to work, you know.",
    ],
    heartbeatHold: [
      "So much for playing it cool, huh.",
      "Ah... Don't look at me like that. I know.",
    ],
    lipHold: [
      "Oh... I, um. Sorry. Where was I?",
      "My face is going to stay this red all shift.",
    ],
    handHold: [
      "Oh... We're holding hands. Ha ha... I'm fine. Totally fine.",
      "Your hand's warm. Mine's probably sweaty, sorry.",
    ],
  },
  close: {
    headPat: [
      "I could get used to this. Actually, I already have.",
      "Mm. Don't stop on my account. The work can wait.",
    ],
    cheekPoke: [
      "Yeah, yeah, I'm smiling. You do that to me.",
      "Again? Okay. I'll stand still for it.",
    ],
    lipsTouch: [
      "You keep doing that, I'm going to start asking for it.",
      "Okay. Come here, then. Quick, before someone walks in.",
    ],
    earTouch: [
      "Ha ha... You know exactly where that spot is now, huh.",
      "Keep talking right there. I like hearing you up close.",
    ],
    handTap: [
      "Here. ...I was hoping you'd reach for it.",
      "Mm. Don't let go yet. I like this part.",
    ],
    chestTouch: [
      "Still racing. I don't think that's ever going to stop around you.",
      "Stay there. I'm on break as long as you are.",
    ],
    bellyTouch: [
      "Ha ha... That tickles. Do it again.",
      "Okay, you win. I'm all yours till the next customer.",
    ],
    nametagPat: [
      "Mm. Go ahead. Nobody fusses over me like you do.",
      "Ha ha... You know, I've started leaving it crooked for you to fix.",
    ],
    nametagOff: [
      "Go ahead. No customers right now anyway. ...Just you.",
      "Off the clock, then. Ha ha... Don't tell anyone.",
    ],
    hipsTouch: [
      "Hey... The store's empty right now. Just so you know.",
      "Keep that up and I'm putting up the 'back in thirty' sign.",
    ],
    heartbeatHold: [
      "Yeah. I gave up hiding that a while ago.",
      "Check as often as you like. It's always the same answer.",
    ],
    lipHold: [
      "I'm going to be thinking about that all night.",
      "Ah... You're making it really hard to be a gentleman about this.",
    ],
    handHold: [
      "Mm. I like it when you don't let go first.",
      "I'd hold on through a whole shift if you let me.",
    ],
    caughtTease: [
      "Ah! Ha ha... Not yet. Not here, okay?",
      "Hey... Slow down. I want to get this right.",
    ],
  },
  bound: {
    nametagPat: [
      "Mm. Some things never get old. You fussing over me is one.",
      "Mm. I pin it on every morning and think of you. Is that silly?",
    ],
    nametagOff: [
      "Again? Ha ha... You always start with that.",
      "Ha ha... Don't lose it. I'd have a hard time explaining that one.",
    ],
    heartbeatHold: [
      "Still checking? You know exactly what you do to me.",
      "It's never once calmed down around you. Not even after.",
    ],
    lipHold: [
      "Ah... Careful. I remember exactly where that leads.",
      "Mm. ...You know I can't say no to you now.",
    ],
    handHold: [
      "Just like this. I don't need anything else.",
      "Mm. You let go, and I already want it back. Every time.",
    ],
    breakAway: [
      "Ah... Ha... Okay. Okay. Give me a second. I can't...",
      "You're going to be the end of me.",
    ],
    teaseLetGo: [
      "Ha... Wait, that's it? You can't leave me like this mid-shift.",
      "Ah... You're mean. Come back on my break and finish that.",
    ],
  },
};
