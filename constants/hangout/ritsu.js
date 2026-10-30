// Ritsu's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/ritsu.js.
//
// Formal, legalistic, few contractions; he records, objects and bills.
// "Business partners" is his frame for warmth. Guarded spots (lips, chest,
// hips) are objections until spark, where the formality starts to slip. No
// stigma/artifact reveals.

export default {
  new: {
    headPat: ["I beg your pardon. We have not been introduced.", "Please refrain from that. My hair was in order."],
    cheekPoke: ["Unprovoked contact. I am noting the time.", "Is there a matter you wish to raise? Then raise it."],
    lipsTouch: ["Excuse me.", "That is wholly inappropriate. Step back."],
    earTouch: ["I can hear you perfectly well without that.", "Please keep your hands to yourself."],
    handTap: ["Here is my card. Consultations are 5500 yen per half hour.", "A handshake is customary. That was not one."],
    chestTouch: ["Mind the lapel pin. Step back, please.", "That is far too close for a first meeting."],
    bellyTouch: ["I do not recall consenting to that. Remove your hand.", "Contact with my person is not permitted. Step back."],
    hipsTouch: ["Remove your hand. Now.", "That could constitute assault. I would advise against it."],
    upset: ["Start of recording. Please continue, if you wish this on file.", "Enough. I do not have time for this."],
  },
  known: {
    headPat: ["Again? I have recorded this twice now.", "...I will allow it. Once."],
    cheekPoke: ["What is it you want? Five seconds have elapsed.", "If you require my attention, there are more efficient methods."],
    lipsTouch: ["No.", "I must object, in the strongest terms."],
    earTouch: ["I am listening. There is no need for that.", "...Please do not touch my ears. It is distracting."],
    handTap: ["The gloves stay on.", "Do you need something? Be concise."],
    chestTouch: ["My recorder is in that pocket. Please do not.", "Step back. You are inside my personal space."],
    bellyTouch: ["Again with the unsolicited contact. Duly noted.", "That is not an area open to inquiry."],
    hipsTouch: ["Objection.", "I will not dignify that with a response. Hands off."],
    upset: ["That will do. I am noting this.", "I suggest you stop before I start billing for it."],
  },
  warm: {
    headPat: ["...I suppose I can permit that. Between partners.", "You are fortunate I find this tolerable."],
    cheekPoke: ["Is something on my face? Tell me at once.", "You are in high spirits. I will note it."],
    lipsTouch: ["That is not a term I have agreed to.", "No. ...Please, no."],
    earTouch: ["...That is ticklish. Strike it from the record.", "I heard you the first time."],
    handTap: ["Yes, I am here. What do you need?", "Your hand is cold. You should be wearing gloves."],
    chestTouch: ["That is closer than our arrangement allows.", "...Step back, please. I am asking politely."],
    bellyTouch: ["Ah. I was not prepared for that. Kindly give notice.", "That was... unexpected. Let the record show I did not flinch."],
    hipsTouch: ["Absolutely not.", "I am choosing to forget that happened."],
    upset: ["Please stop. You are disrupting my concentration.", "That is enough. I will not ask a third time."],
  },
  spark: {
    headPat: ["...This is outside business hours. I will allow it.", "I had not modeled this outcome. ...Continue."],
    cheekPoke: ["My face is not warm. That is the weather.", "Whatever you are thinking, I object."],
    lipsTouch: ["...I need a moment. Please do not record this.", "That is... not something I can negotiate on the spot."],
    earTouch: ["...Stop. I cannot think clearly when you do that.", "You have found a weakness. Do not exploit it."],
    handTap: ["...You may hold it. I will take the glove off.", "Your hand fits rather precisely. That is an observation."],
    chestTouch: ["...My pulse is elevated. I am aware.", "If you are gathering evidence, you have it."],
    bellyTouch: ["...You may not cite my reaction just now.", "Please. I am attempting to maintain a professional demeanor."],
    hipsTouch: ["That is... I have no precedent for that.", "Partner. Please. Not here."],
    upset: ["...Please. My notes are already illegible.", "Enough. I am losing track of my own argument."],
  },
};
