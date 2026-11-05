// Ritsu's bond scenes, read as DIALOGUE.ritsu.bondScenes
// (constants/dialogue/ritsu.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
// characters — see docs/negative-affinity-enemies-to-lovers.md. Ritsu is
// thorny by way of procedure rather than temper: everything is a clause, a
// schedule, a filed record. He warms up slowly and the warmth arrives as
// paperwork — an exception granted, a clause struck out, a standing
// appointment with no billable purpose. He does not become informal. He
// becomes precise about something other than work.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: Good evening. This message is outside the hours I have set aside for correspondence, so I will be brief.\n\nI am noting that at the top so that you understand it was deliberate.",
      "I maintain a record of everyone who enters Sinostra on business. It is not surveillance; it is the reason nobody has brought a successful claim against this house since I arrived.\n\nYour entry reads: {timesMet} visits, no petition, no dispute, no request for representation. That column is blank for exactly one person in a document of four hundred and six.\n\nI have checked it three times. A blank column is ordinarily an error. I have not been able to classify this one.",
    ],
    faces: { 0: "default", 1: "serious" },
    choice: {
      prompt:
        "I would like to know what you want. Not as an accusation. As a matter of completeness.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Say you don't want anything",
          style: 3,
          close:
            "That is not a category the record has.\n\nI will create one. Good night.",
        },
        {
          key: "playful",
          face: "sweat",
          label: "Offer to file a petition",
          style: 1,
          close:
            "Do not. The forms are extensive, and processing it ahead of the existing queue would not be defensible on paper.\n\n...I have already drafted it. That is all I intend to say on the matter.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Ask what he wants instead",
          style: 4,
          close:
            "That question is outside the scope of this correspondence.\n\nI am aware that took me nearly two minutes to send.\n\nI have not deleted it, however. I have noted it for future discussion.",
        },
      ],
    },
    keepsake: {
      emoji: "📄",
      line: "The one blank column in a record of four hundred and six.",
    },
  },

  friend: {
    beats: [
      "**{firstName}**: A matter concerning you requires your approval. Please read the following in full.",
      "I have worked alongside a number of people since arriving at this academy. Most keep me waiting. The captain cannot be relied upon to appear, and the vice-captain cannot be reached unless there is money involved.\n\nYou have never once broken a promise to me. You keep our appointments, and when I put a matter to you, you meet it with {favResponse} rather than hesitation. That is what I require of a business partner, and so far I have found it in exactly one person.",
      "So I have drafted cards for you. One hundred, on the same card stock as mine. Your name, your title as Inspector, and my number beneath it, so that anyone who calls about you reaches me first.",
    ],
    faces: { 0: "serious", 1: "smile", 2: "default" },
    choice: {
      prompt: "I require your approval before they go to print.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Say you'll carry one always",
          style: 3,
          close:
            "Good. A card does no work in a drawer.\n\nI have high hopes for your performance.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask what your hourly rate is",
          style: 1,
          close:
            "I have not set one. A partner negotiates their own rate.\n\nI should warn you that I negotiate well.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say it makes you two official",
          style: 4,
          close:
            "Indeed, this makes our relationship official.\n\n...Ahem. Our professional relationship. They go to print.",
        },
      ],
    },
    keepsake: {
      emoji: "🪪",
      line: "One hundred cards with your name over his number.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: I am proposing a standing arrangement. Tuesdays, 19:00 to 20:30, the small reading room on the second floor. Attendance optional; I will be present regardless.",
      "*You go. He has laid out two chairs, a lamp, tea, and absolutely no paperwork whatsoever, which for Ritsu Shinjo is a room stripped bare.*\n\n> There is no purpose. I want that stated plainly at the outset, because you will look for one and its absence is the entire point.",
      '> Every hour of my week is allocated. I have kept a schedule since I was twelve. One block on Tuesdays has read "contingency" since the start of the year and has never once held a contingency.\n\n> I have been spending it in this room. Alone. Reading things of no professional use to me and telling nobody.\n\n> I am now telling one person. The chair is for you. I bought it in March and have been rehearsing this since roughly then.',
    ],
    faces: { 0: "default", 1: "serious", 2: "sweat" },
    choice: {
      prompt:
        "You may decline. I would prefer a plain refusal to a polite acceptance.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Take the chair",
          style: 3,
          close:
            "*You sit down. He does not say anything at all for about four minutes, which is the longest he has ever gone without speaking in your presence.*\n\n> ...Good,\n\n*he says eventually.*\n\n> That is Tuesdays settled, then.\n\n*He is there at 18:52 every week after that, and never once mentions being early.*",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what he reads in here",
          style: 1,
          close:
            "> That is not relevant to the arrangement.\n\n> Poetry. It is extremely bad poetry and I have never told a living person. Romeo would have it engraved on something.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Ask why it took until March",
          style: 4,
          close:
            "> It did not take until March. I decided in November.\n\n> I spent four months determining whether the request could be made without imposing an obligation on you. I concluded that it could not, and I have made it anyway, which is the first knowingly improper thing I have done since I arrived at this academy.",
        },
      ],
    },
    keepsake: {
      emoji: "🪑",
      line: "A second chair bought in March for a block marked contingency.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: It is 03:14. I am aware this is a violation of the arrangement and I am proceeding.",
      "You know what I actually do for this house. Everybody does, and nobody says it in the plain form, so I will: I am the reason nothing that happens in Sinostra ever reaches a courtroom.\n\nEvery fee Romeo collects, every debt, every room somebody gets walked into. I make it defensible. On paper it is all consenting parties and lawful arrangements. I am extremely good at that. It is the observation that has kept me awake since Tuesday.",
      "I told myself I came here to reform this house's reputation. What I have actually done is leave that reputation as the only ugly thing standing, because I have sanded every provable edge off the rest.\n\nI came to the law because it is the one system where what is right and what is written are supposed to be the same thing. They are not. I worked that out young, and I have been billing by the hour ever since.\n\nThere is nobody I could say that to except you.",
    ],
    faces: { 0: "sweat", 1: "serious", 2: "close" },
    choice: {
      prompt:
        "You may respond however you wish. I have no preferred answer, which is itself unusual for me.",
      options: [
        {
          key: "kind",
          face: "surprise",
          label: "Say he's still deciding",
          style: 3,
          close:
            "*There is a very long silence.*\n\nThat is not established.\n\n*Then, at 03:41:* I would like it to be established. I have not wanted anything in that particular way in some years and I am finding it difficult to sit still, which does not happen.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask what it'd cost to hire him",
          style: 1,
          close:
            "You could not afford me.\n\nYou have never been billed. Not once, in {timesMet} visits. I have handled four matters on your behalf that you are not aware of and there is no invoice for any of them, and I have declined to examine why.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Tell him to stop collecting",
          style: 4,
          close:
            "I cannot. There is an engagement, and I drafted the terms of it myself, which makes it difficult to argue my way out of.\n\n*Then, some minutes later:*\n\nThere is a clause I put in at the time without knowing why. Termination on ninety days' notice. I have read it perhaps two hundred times and never given it.\n\nAsk me again in the spring.",
        },
      ],
    },
    keepsake: {
      emoji: "⚖️",
      line: "A termination clause read two hundred times and never used.",
    },
  },

  devoted: {
    beats: [
      "**{firstName}**: Your name has been removed from the Sinostra register. Every entry. Retroactively.",
      "This was not an oversight and it was not a courtesy. It was a decision I made at 02:00 and executed personally, and it required me to alter a document I have described to this house as inviolable.\n\nThe reason is that a man found me in the records room asking who in the register had been visiting the captain, and I gave him a complete and accurate answer that did not contain you.",
      "I have never lied on a record. Not once, under any pressure, including from Romeo, including twice from the captain.\n\nI have now. Deliberately, cleanly, with a fabricated audit trail that will withstand review.\n\nUnderstand exactly what I have handed you. If it is ever found, my practice is finished and I am finished with it. It is in your keeping now, and I put it there on purpose.",
    ],
    faces: { 0: "serious", 1: "default", 2: "sweat" },
    choice: {
      prompt:
        "Say something. I have been at this since two and I would like to stop.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Tell him to come to the room",
          style: 3,
          close:
            "*He arrives at the reading room at 04:11 with his tie undone, which you have never seen.*\n\n*He sits in his chair and says nothing for a long while, and then leans over and puts his head on your shoulder, an entirely unprecedented breach of everything he has ever observed about distance, and stays there.*\n\n> I am not going to discuss this,\n\n*he says.*\n\n> I am simply going to be here for a period.",
        },
        {
          key: "playful",
          face: "blush",
          label: "Ask if there's a form for it",
          style: 1,
          close:
            'There is not.\n\nThere is now. I have drafted one. It is a single page and it is titled "Matters I Have Elected Not To Record" and it has one line on it and I am aware that is the most sentimental thing I have ever done.',
        },
        {
          key: "bold",
          face: "surprise",
          label: "Ask what happens if it's found",
          style: 4,
          close:
            "I lose the placement, the reference, and every year I have spent building toward them.\n\nI did the calculation before I altered the file. It took four seconds. I have never completed a decision of that magnitude in four seconds, and I have been sitting here since two trying to be alarmed about it.\n\nI am not alarmed. That is the part I cannot file anywhere.",
        },
      ],
    },
    keepsake: {
      emoji: "🗂️",
      line: "A one-page file titled Matters I Have Elected Not To Record.",
    },
  },

  soulbound: {
    beats: [
      "**{firstName}**: Tuesday, 19:00, as usual. I am sending this in advance because I intend to say something and I have found that I say things more accurately when the other party has had notice.",
      "{timesMet} attendances. I have the figure to hand, as you would expect. What you would not expect is that I stopped recording them in February and have simply known the number since.\n\nI have never held a figure in my head. That is the entire purpose of a record.",
      "I have been drafting this for eleven weeks. I have twenty-three versions. The early ones set out the position, the risks, and a proposed structure, and read (I have reviewed them) like a merger.\n\nThe twenty-fourth version has no structure in it at all. I found I could not draft it and mean it at the same time, and I have chosen meaning it, which is not a trade I have made before in my life.",
      "I love you.\n\nThere is no clause attached. Nothing is contingent, nothing is reciprocal, and there is no term. I have deliberately given you an instrument with no obligation in it whatsoever, which every part of my training says is negligent drafting.\n\nIt is the only document I have ever produced that I am certain of.",
    ],
    faces: { 0: "serious", 1: "close", 2: "sweat", 3: "blush" },
    choice: {
      prompt:
        "You are under no obligation to respond. That is not politeness. It is the actual legal position and I have made sure of it.",
      options: [
        {
          key: "answered",
          face: "surprise_blush",
          label: "Say it back",
          style: 3,
          close:
            "*He is silent for a length of time that would be alarming in anyone else and is unprecedented in him.*\n\nRepeat that. I am not being difficult. I have modeled a considerable number of outcomes and that one had a low weighting and I would like to hear it again.\n\n*You repeat it. He stands up, crosses the small reading room, and kisses you with the entire eleven weeks of drafting behind it, and afterwards says, unsteadily,*\n\n> That was not in any of the twenty-four versions.",
        },
        {
          key: "held",
          face: "close",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Of course. That is the correct handling of an instrument of this kind and I would have advised it.\n\nI will say one thing that is not advice. Tuesday is not conditional. The chair was bought in March and it is not being taken away, and I will be in that room at 19:00 for as long as I am in this academy whether or not you ever attend again.\n\nThat is on the record. It is the only entry in it that I have made for my own benefit.",
        },
      ],
    },
    keepsake: {
      emoji: "📃",
      line: "The twenty-fourth draft, the one with no clauses in it.",
    },
  },
};
