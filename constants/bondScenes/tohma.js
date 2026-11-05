// Tohma's bond scenes, read as DIALOGUE.tohma.bondScenes
// (constants/dialogue/tohma.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Tohma is never off-balance and
// never quite off-duty, so the intimacy is in what he lets slip on purpose:
// each scene is a piece of information he chose to hand you, and the last one
// is the first thing he has ever wanted for himself rather than for the house.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Hello. I don't suppose you've got a moment?\n\nI'd ordinarily say this in person, but the captain keeps me occupied by day, and some things are better said where nobody happens to overhear.",
      "I make it a point to know a little about everyone who comes through this house. You will find that unnerving, and you would be right to.\n\nWhat I have on you, after {timesMet} occasions, is remarkably thin. You say the same things about people whether or not they're in the room. Do you know how rare that is, in a building where I learn most of what I know by overhearing?\n\nSo this is not a file being opened. This is me putting the pen down, which I do rather less often.",
    ],
    faces: { 0: "default", 1: "serious" },
    choice: {
      prompt:
        "Perhaps you could humor me, and ask me something you would not under typical circumstances.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Ask if he ever rests",
          style: 3,
          close:
            "Honestly. Of all the things you might have asked.\n\nNo. Not in some years. You are the first person to inquire, and I find I do not have a prepared answer, which is unusual for me.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what's in his file",
          style: 1,
          close:
            "A great deal, and none of it flattering. You shall never see a page of it.\n\nWell, perhaps *a* page. Ask me again when I am less busy.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask what he really wrote",
          style: 4,
          close:
            "*The reply is slower than any of the others.*\n\nYou want to know what is written under your name. Naturally you do.\n\nYou will not see it. Not because it is unflattering, it is not, but because it is the one page in that file I did not write for the house. I wrote it for me.\n\nGood night.",
        },
      ],
    },
    keepsake: {
      emoji: "🫖",
      line: "A conversation that officially never happened.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: A small matter of house business. Yours, as it happens, which is why I'd rather it didn't come up in the common room.",
      "Half of Frostheim comes to me in the course of a day. A book that was never returned, a first year who has upset the captain, a dispute nobody else wants to touch. I sort it, they go on their way, and nobody gives it another thought. That's how it ought to be.",
      "You have never once come to me. You meet everything with {favResponse}, deal with your own trouble, and carry on as though there was none. It hasn't escaped my notice that lately there has been rather a lot of it.",
      "So consider this formal notice. Whatever you need, a hand with your work, a word in the right ear, a matter handled quietly, you may bring it to me. You won't need to explain, and you won't owe me anything for it.\n\nMy services are technically spoken for by our king. I assure you he won't miss an hour or two. I'm told I'm rather good at this.",
    ],
    faces: { 0: "serious", 1: "default", 2: "serious", 3: "smile" },
    choice: {
      prompt:
        "Well? The next time you're in difficulty, I would much prefer to hear it from you than to happen to overhear it.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll come to him",
          style: 3,
          close:
            "Good. That's all I wanted to hear.\n\nI'll admit it's rather pleasant, being sought out by name instead of by title. Whatever it turns out to be, you'll find me ready for it.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what the catch is",
          style: 1,
          close:
            "A catch. Honestly. I offer my services free of charge and you go looking for the poison.\n\nThere's no catch. If it would set your mind at ease, I could invent one. I'm told I'm quite good at that, too.",
        },
        {
          key: "bold",
          face: "surprise",
          label: "Hand him a problem now",
          style: 4,
          close:
            "Already. Well, you certainly don't let an offer go to waste.\n\nSend me the particulars. It will be dealt with by morning, and you may thank me for it in person.",
        },
      ],
    },
    keepsake: {
      emoji: "🛎️",
      line: "{firstName}'s standing offer: bring it to him, whatever it is.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: Come to the second-floor landing tomorrow at eleven. Bring nothing and tell no one. I am aware how that reads.",
      "It is not a mission and you are not in trouble. It is a window.\n\nThere is a spot on that landing where, at eleven, the light comes through the east glass and lies across the floor in a particular way for about nine minutes. Then it is gone until the next clear day.",
      "I have been standing in it alone for two years and telling nobody about it, because the moment a thing like that is known about it becomes a place people go, and then it is not that any more.\n\nYou may consider that I have just handed over the only thing in this building that is mine. I would rather you did not make a great deal of it. I would rather you came.",
    ],
    faces: { 0: "default", 1: "close", 2: "blush" },
    choice: {
      prompt:
        "Say yes or no. I shall be perfectly composed either way; I am always perfectly composed.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Tell him you'll be there",
          style: 3,
          close:
            "Good.\n\n*One word, and then nothing for the rest of the night, which from a man who writes in paragraphs is close to a shout.*\n\n*He is on the landing at ten to. He does not mention having been early and neither do you.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if this is a date",
          style: 1,
          close:
            "Honestly.\n\n*A pause. A longer one than the joke warrants.*\n\nIt is nine minutes of light on a floor. Call it whatever you find useful. I shall be there at eleven either way.",
        },
        {
          key: "bold",
          face: "close",
          label: "Ask why you get to know",
          style: 4,
          close:
            "Because it stopped being enough on my own, *he writes, plainly, with none of the arrangement he usually puts around a sentence.*\n\nThere. That is the honest answer and I shall deny having given it. Eleven o'clock.",
        },
      ],
    },
    keepsake: {
      emoji: "🪟",
      line: "Nine minutes of east light on a landing nobody else knows about.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: You will have heard the rumor about how our king came to be short of a friend. I would like you to hear the rest of it from me rather than from the version that is going around.",
      "They are not wrong that I benefited. They are not wrong that I was in a position to have arranged a good deal of it. What they have wrong is the part in between, where I am supposed to have actually done the arranging, and that is the part nobody has ever troubled to check.\n\nThose two facts have sat beside one another for two years and been enough for everybody. I have let them, because a house runs better on a vice-captain people are slightly afraid of. That is the whole strategy. It has worked beautifully, and it has cost me every friendship I might otherwise have had here.",
      "I am not asking you to believe me. I am telling you what happened and then leaving it with you, which is the single most dangerous thing I have done since I arrived.\n\nYou may do anything at all with it. That is rather the point of giving it to you.",
    ],
    faces: { 0: "serious", 1: "default", 2: "sweat" },
    choice: {
      prompt:
        "So. What is your verdict? I find I am unable to predict it, which is novel and not entirely pleasant.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you believe him",
          style: 3,
          close:
            "*There is no reply for a very long time.*\n\nYou should not, *he writes.* On the evidence you have, you should not.\n\n*Then:* Thank you. I have been carrying that for two years and it turns out one only has to put it down once.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Say you'll hold it over him",
          style: 1,
          close:
            "Do, *he says, and means it.* Please do. It will be an enormous relief to owe somebody something for once instead of the reverse.\n\nWell, well. Look what you have made of me.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him to stop shielding",
          style: 4,
          close:
            "I cannot, *he writes at once. Then, after a moment:*\n\nI do not know how. I was made to be useful before I was made to be anything else, and I have never once been asked to be a person instead.\n\nYou are asking. I have noticed. Give me some time with it.",
        },
      ],
    },
    keepsake: {
      emoji: "📁",
      line: "The truth he'd let the whole house get wrong for two years.",
    },
  },

  devoted: {
    beats: [
      "*You find the tea outside your door before the message arrives. It is exactly how you take it, which you have never told him.*\n\n**{firstName}**: You did not sleep last night. Do not ask how I know. Drink that.",
      "I have made a study of the small ways people here come apart, so that I can put them back before anyone important notices. It is my actual function in this house, whatever the title says.\n\nI have caught myself doing it for you for some months now, and doing it badly, because I keep wanting to be seen doing it. That is not how the work is meant to go. The work is meant to be invisible.",
      "I stood outside your door for rather longer than the delivery required. I have decided to tell you that instead of letting you assume the tea appeared by itself.\n\nHonestly. Years of being unreadable, undone by a cup going cold in a corridor.",
    ],
    faces: { 0: "serious", 1: "default", 2: "blush" },
    choice: {
      prompt: "Say nothing kind. I am not equipped for it at this hour.",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Say something kind anyway",
          style: 3,
          close:
            "...Well, well.\n\n*The next message takes four minutes.*\n\nI am going to sit down. Do not tell anybody that a sentence did that. Say it again tomorrow, when I have had some warning.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask how he takes his",
          style: 1,
          close:
            "Badly. Standing up, at the wrong hour, usually cold.\n\nIf you are offering, I am at the landing most nights after one. I have never said that to a single person in this building.",
        },
        {
          key: "bold",
          face: "close",
          label: "Tell him to come in and sit",
          style: 4,
          close:
            "*He does, and he is careful about it, and then somewhere in the second hour he stops being careful and falls asleep upright on your couch mid-sentence: the composed, unreadable vice-captain of Frostheim, out cold with his monocle in his hand.*\n\n*He wakes at five, appalled, and stays another hour anyway.*",
        },
      ],
    },
    keepsake: {
      emoji: "☕",
      line: "A cup made exactly right by someone you never told.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: I am going to be direct, which I am told I never am, and which is a reputation I have worked rather hard for.",
      "I have spent my life being the second man in every room. It suits me. I am better placed there, I see more from there, and I have never once wanted the chair at the front.\n\nI have wanted precisely one thing for myself in all that time, and I have been managing it the way I manage everything else: quietly, at a distance, and with a contingency in place for when it ends.",
      "{timesMet} occasions. I have the number because of course I have the number.\n\nOn every one of them, you have walked into a room where I was being useful to somebody, and some entirely unhelpful part of me has thought: ah. There. That is the one I would like to be useless in front of.",
      "So. I love you.\n\nI have no arrangement around that sentence and nothing to trade for it, and I have not left myself an exit, which you may take as the measure of how seriously I mean it.\n\nThis conversation, unlike every other one, did happen. I should like it on the record.",
    ],
    faces: { 0: "serious", 1: "close", 2: "smile", 3: "blush" },
    choice: {
      prompt:
        "Take your time. I am extremely good at waiting and extremely poor at hoping, so do not mind either.",
      options: [
        {
          key: "answered",
          face: "full_smile_blush",
          label: "Say it back",
          style: 3,
          close:
            "*For once there is no clever thing at all.*\n\n...Come to the landing, *he writes.* Now. It is dark and there is no light on the floor and I do not care in the least.\n\n*He is already there. He does not say anything when you arrive. He simply takes your hands, both of them, and stands there holding on in the dark like a man who has finally set something down.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Naturally. It would be a poor sort of declaration that came with terms attached.\n\nI shall carry on exactly as I have. The tea will still arrive. I shall still know when you have not slept. None of that was ever a bid, whatever it looked like from where you were standing.\n\nAnd you will find me on the landing at eleven, on clear days, for as long as you like. I am, as I said, extremely good at waiting.",
        },
      ],
    },
    keepsake: {
      emoji: "✒️",
      line: "The one conversation he refused to deny having had.",
    },
  },
};
