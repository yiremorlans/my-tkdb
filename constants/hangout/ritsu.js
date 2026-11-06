// Ritsu's Live2D touch lines for /meet as the Activity
// (docs/hangout-activity.md §4.3, §11). One pool per trigger, per tier; a
// tier with no pools uses the nearest lower one. Drafts, pending the user's
// approval. Kept apart from constants/dialogue/ritsu.js.
//
// Formal, legalistic, few contractions; he records, objects and bills.
// "Business partners" is his frame for warmth; "Partner" as an address
// from known through close (user, 2026-10-31); at bound she's his
// significant other, so no address, the lines carry it (user,
// 2026-11-02). Guarded spots (lips, chest,
// hips) are objections until spark, where the formality starts to slip. No
// stigma/artifact reveals. Holds (spark+) stay legalistic as he concedes:
// the pulse is evidence he stops contesting; caught tease is "not yet,
// properly"; bound is shared history he no longer records.
//
// Removable article (docs/hangout-activity.md §4.2): his voice recorder,
// out only in his m_recorder poses (new cheekPoke, new/known upset,
// bellyTouch from warm), held over the right hand spot. recorderPat is a
// tap on it in his hand at any tier; from warm a double-tap takes it
// (recorderOff). At close he'd rather it not hear them; at bound the
// recordings are a shared, private interest he plays back later.

export default {
  new: {
    headPat: [
      "I beg your pardon. We have not been introduced.",
      "Please refrain from that. My hair was in order.",
    ],
    cheekPoke: [
      "Unprovoked contact. I am noting the time.",
      "Is there a matter you wish to raise? Then raise it.",
    ],
    lipsTouch: [
      "Excuse me.",
      "Ah. ...That was unsolicited. Kindly keep a professional distance.",
    ],
    earTouch: [
      "I can hear you perfectly well without that.",
      "Please keep your hands to yourself.",
    ],
    handTap: [
      "Here is my card. Consultations are 5500 yen per half hour.",
      "A handshake is customary. That was not one.",
    ],
    chestTouch: [
      "Mind the lapel pin. Step back, please.",
      "That is far too close for a first meeting.",
    ],
    bellyTouch: [
      "I do not recall consenting to that. Remove your hand.",
      "Contact with my person is not permitted. Step back.",
    ],
    recorderPat: [
      "That is my property. Please do not handle it.",
      "Hands off, please. That device is not for public use.",
    ],
    hipsTouch: [
      "Remove your hand. Now.",
      "That could constitute assault. I would advise against it.",
    ],
    upset: [
      "Start of recording. Please continue, if you wish this on file.",
      "Enough. I do not have time for this.",
    ],
  },
  known: {
    headPat: [
      "Again? I have recorded this twice now.",
      "...I will allow it. Once.",
    ],
    cheekPoke: [
      "What is it you want? That is unsolicited.",
      "If you require my attention, there are more efficient methods.",
    ],
    lipsTouch: ["No.", "...Please. I would prefer this not go on the record."],
    earTouch: [
      "I am listening. There is no need for that.",
      "...Please do not touch my ears. It is distracting.",
    ],
    handTap: [
      "Excuse me. I was about to take notes.",
      "Do you need something, Partner? Be concise.",
    ],
    chestTouch: [
      "My recorder is in that pocket. Please do not.",
      "Step back. You are inside my personal space.",
    ],
    bellyTouch: [
      "Again with the unsolicited contact. Duly noted.",
      "That is not an area open to inquiry.",
    ],
    recorderPat: [
      "If you wish to hear the playback, you need only ask.",
      "Please, Partner. That has a full day of notes on it.",
    ],
    hipsTouch: [
      "Objection.",
      "I will not dignify that with a response. Hands off.",
    ],
    upset: [
      "That will do. I am noting this.",
      "I suggest you stop, Partner, before I file a complaint.",
    ],
  },
  warm: {
    headPat: [
      "...I suppose I can permit that. Between partners.",
      "You are fortunate I find this tolerable.",
    ],
    cheekPoke: [
      "Is something on my face, Partner? Tell me at once.",
      "You are in high spirits. I will note it.",
    ],
    lipsTouch: ["That is not a term I will agree to.", "No. ...Please, no."],
    earTouch: [
      "...That is ticklish. Strike it from the record.",
      "I heard you the first time.",
    ],
    handTap: [
      "Yes, Partner, I am here. What do you need?",
      "Your hand is cold. You should be wearing gloves.",
    ],
    chestTouch: [
      "That is closer than our arrangement allows.",
      "...Step back, please. I am asking politely.",
    ],
    bellyTouch: [
      "Objection. That was not on the agenda.",
      "Kindly give notice before any further contact.",
    ],
    recorderPat: [
      "Do not touch the recorder. It is still running.",
      "That device holds evidence, Partner. Hands off.",
    ],
    recorderOff: [
      "Return that at once. ...Fine. I will commit the rest to memory.",
      "You realize everything you just said is already on it.",
    ],
    hipsTouch: ["Absolutely not.", "I am choosing to forget that happened."],
    upset: [
      "Please stop. You are disrupting my concentration.",
      "That is enough. I will not ask a third time.",
    ],
  },
  spark: {
    headPat: [
      "...For you, Partner, I will waive the objection.",
      "I have no grounds to stop you.",
    ],
    cheekPoke: [
      "My face is not warm. That is the weather.",
      "...It is not what you are thinking. I want that on the record.",
    ],
    lipsTouch: [
      "...I need a moment. Please do not record this.",
      "That is... not something I can negotiate on the spot.",
    ],
    earTouch: [
      "...Stop. I cannot think clearly when you do that.",
      "You have found a weakness. Do not exploit it.",
    ],
    handTap: [
      "Your hand is cold. ...I will hold it until it warms.",
      "Your hand fits rather precisely. That is an observation.",
    ],
    chestTouch: [
      "...My pulse is elevated. I am aware.",
      "If you are gathering evidence, you have it.",
    ],
    bellyTouch: [
      "...You may not cite my reaction just now.",
      "Please. I am attempting to maintain a professional demeanor.",
    ],
    recorderPat: [
      "If you want something off the record, Partner, you need only ask.",
      "...You want it? May I ask on what grounds?",
    ],
    recorderOff: [
      "You may hold on to it. I trust you with it.",
      "Very well. You have my full attention, Partner.",
    ],
    hipsTouch: [
      "That is... I have no precedent for that.",
      "Please, Partner. That is well beyond our terms.",
    ],
    upset: [
      "...Please. My notes are already illegible.",
      "Enough. I am losing track of my own argument.",
    ],
    heartbeatHold: [
      "...Yes, it is racing. I am aware. That stays between us.",
      "You may keep your hand there. I would only ask that you not count.",
    ],
    lipHold: [
      "I have lost my place entirely. Kindly do not ask me to repeat it.",
      "I had something to say, Partner. ...It can wait.",
    ],
    handHold: [
      "...I had somewhere to be. I seem to have forgotten where.",
      "You need not let go on my account. I am in no hurry.",
    ],
  },
  close: {
    headPat: [
      "Continue. I have cleared my schedule for this.",
      "You are the only one I allow to do that. I trust you have noticed.",
    ],
    cheekPoke: [
      "Yes, my face is warm. I concede the point.",
      "Again, if you like. I find I do not mind it.",
    ],
    lipsTouch: [
      "...Again, please. I was not adequately prepared.",
      "I would like that entered into the record. Twice, if possible.",
    ],
    earTouch: [
      "You know precisely what that does to me. Proceed.",
      "...I will not object. Not this time.",
    ],
    handTap: [
      "Take my hand. I would rather you did.",
      "Hold on as long as you like. I am not billing for this.",
    ],
    chestTouch: [
      "Keep your hand there. I find I do not want you to move.",
      "My pulse is your doing. I would testify to that.",
    ],
    bellyTouch: [
      "...Proceed. I am off the clock.",
      "That was unfair. ...Do it again, so I can be ready.",
    ],
    recorderPat: [
      "What happens next is not something I intend to have on tape.",
      "It has caught more of my composure slipping than I care to admit.",
    ],
    recorderOff: [
      "Take it. My hands will be occupied regardless.",
      "Good. I would rather none of this be admissible.",
    ],
    hipsTouch: [
      "...That is a bold motion, Partner. I am inclined to grant it.",
      "...If I have gone rigid, that is not my stigma. Let us leave it there.",
    ],
    heartbeatHold: [
      "You need not check. I will stipulate to the facts.",
      "I have stopped contesting that evidence. You may keep collecting it.",
    ],
    lipHold: [
      "...I find I have nothing prepared. For once, that does not trouble me.",
      "If you are waiting for an objection, Partner, none is coming.",
    ],
    handHold: [
      "Your hand is always cold. I have come to look forward to warming it.",
      "Our arrangement has no clause for this. I would draft one that names only you.",
    ],
    caughtTease: [
      "...Not yet, Partner. I would like to do this properly.",
      "I must object. ...For now. Do not mistake that for a refusal.",
    ],
  },
  bound: {
    recorderPat: [
      "Leave it running. You know I will listen to this later.",
      "You like knowing I replay these. I can tell.",
    ],
    recorderOff: [
      "Turn it back on. I want to hear how you sound when I do this.",
      "Fine. I will rely on memory. You will have to be thorough.",
    ],
    heartbeatHold: [
      "You already have the full record on that. You were there.",
      "It still does that. I have given up building a model for it.",
    ],
    lipHold: [
      "I recall where that led last time. ...I have no objection.",
      "You are making it very difficult to keep my schedule. I no longer care who knows why.",
    ],
    handHold: [
      "I used to keep a record of everything. You, I would rather simply remember.",
      "Whatever comes next, I would like to face it with this hand in mine.",
    ],
    breakAway: [
      "Recess. I am calling a recess. ...Give me a moment to collect myself.",
      "That was... I cannot argue with that. Stay close while I recover.",
    ],
    teaseLetGo: [
      "Adjourned, just like that? I move that we resume. Without delay.",
      "...You stopped there on purpose. I will be seeking redress, and you know exactly how.",
    ],
  },
};
