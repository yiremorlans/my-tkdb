export default {
  // The level-up DMs (docs/bond-scene-dms.md). One of the six volatile
  // characters — see docs/negative-affinity-enemies-to-lovers.md. Ritsu is
  // thorny by way of procedure rather than temper: everything is a clause, a
  // schedule, a filed record. He warms up slowly and the warmth arrives as
  // paperwork — an exception granted, a clause struck out, a standing
  // appointment with no billable purpose. He does not become informal. He
  // becomes precise about something other than work.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Good evening. This message is outside the hours I have set aside for correspondence, so I will be brief.\n\nI am noting that at the top so that you understand it was deliberate.",
        "I maintain a record of everyone who enters Sinostra on business. It is not surveillance; it is the reason nobody has brought a successful claim against this house since I arrived.\n\nYour entry reads: {timesMet} visits, no petition, no dispute, no request for representation. That column is blank for exactly one person in a document of four hundred and six.\n\nI have checked it three times. A blank column is ordinarily an error. I have not been able to classify this one.",
      ],
      choice: {
        prompt:
          "I would like to know what you want. Not as an accusation. As a matter of completeness.",
        options: [
          {
            key: "kind",
            label: "Say you don't want anything",
            style: 3,
            close:
              "That is not a category the record has.\n\nI will create one. Good night.",
          },
          {
            key: "playful",
            label: "Offer to file a petition",
            style: 1,
            close:
              "Do not. The forms are extensive, and processing it ahead of the existing queue would not be defensible on paper.\n\n...I have already drafted it. That is all I intend to say on the matter.",
          },
          {
            key: "bold",
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
        "**{firstName}**: A matter I have modeled at some length and been unable to resolve. I am therefore asking, which is a method I resort to rarely and dislike.",
        "Your conduct toward me is {favResponse} without variance. I have run it against every input available: Romeo shouting, Taiga Hoshibami's whereabouts, the hour, whether I have been of any use to you. It does not move.\n\nPeople are transactional. That is not cynicism, it is observed data, and I have built a practice on it: I predict what a person will do from what they are owed and what they want.\n\nI cannot predict you. That is the first time the model has failed since I built it, and I have been unable to enjoy anything since I noticed.",
      ],
      choice: {
        prompt: "Explain the discrepancy. I would like the model repaired.",
        options: [
          {
            key: "kind",
            label: "Say you're not a transaction",
            style: 3,
            close:
              "Everything is a transaction.\n\n*A long pause.*\n\nThat was said reflexively and I have reviewed it and I do not think it survives scrutiny. I will require some days.",
          },
          {
            key: "playful",
            label: "Say you'll invoice him",
            style: 1,
            close:
              "For what, precisely.\n\n...That was a joke. I have identified it as a joke on the second reading. It was a good one. I am recording that I laughed, since you cannot see it and would otherwise not know.",
          },
          {
            key: "bold",
            label: "Tell him to scrap the model",
            style: 4,
            close:
              "I have refined this model since my studies began. Every person I have encountered is in it, and it has not failed once. It is the reason I am never caught unprepared, in court or out of it. I am aware of how that sounds.\n\nI am not going to discard it. I am prepared to make one exception in it. That is a larger concession than it appears.",
          },
        ],
      },
      keepsake: {
        emoji: "📐",
        line: "A single exception written into a model that had never had one.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: I am proposing a standing arrangement. Tuesdays, 19:00 to 20:30, the small reading room on the second floor. Attendance optional; I will be present regardless.",
        "*You go. He has laid out two chairs, a lamp, tea, and absolutely no paperwork whatsoever, which for Ritsu Shinjo is a room stripped bare.*\n\n> There is no purpose. I want that stated plainly at the outset, because you will look for one and its absence is the entire point.",
        '> Every hour of my week is allocated. I have kept a schedule since I was twelve. One block on Tuesdays has read "contingency" since the start of the year and has never once held a contingency.\n\n> I have been spending it in this room. Alone. Reading things of no professional use to me and telling nobody.\n\n> I am now telling one person. The chair is for you. I bought it in March and have been rehearsing this since roughly then.',
      ],
      choice: {
        prompt:
          "You may decline. I would prefer a plain refusal to a polite acceptance.",
        options: [
          {
            key: "kind",
            label: "Take the chair",
            style: 3,
            close:
              "*You sit down. He does not say anything at all for about four minutes, which is the longest he has ever gone without speaking in your presence.*\n\n> ...Good,\n\n*he says eventually.*\n\n> That is Tuesdays settled, then.\n\n*He is there at 18:52 every week after that, and never once mentions being early.*",
          },
          {
            key: "playful",
            label: "Ask what he reads in here",
            style: 1,
            close:
              "> That is not relevant to the arrangement.\n\n> Poetry. It is extremely bad poetry and I have never told a living person. Romeo would have it engraved on something.",
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "You may respond however you wish. I have no preferred answer, which is itself unusual for me.",
        options: [
          {
            key: "kind",
            label: "Say he's still deciding",
            style: 3,
            close:
              "*There is a very long silence.*\n\nThat is not established.\n\n*Then, at 03:41:* I would like it to be established. I have not wanted anything in that particular way in some years and I am finding it difficult to sit still, which does not happen.",
          },
          {
            key: "playful",
            label: "Ask what it'd cost to hire him",
            style: 1,
            close:
              "You could not afford me.\n\nYou have never been billed. Not once, in {timesMet} visits. I have handled four matters on your behalf that you are not aware of and there is no invoice for any of them, and I have declined to examine why.",
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "Say something. I have been at this since two and I would like to stop.",
        options: [
          {
            key: "kind",
            label: "Tell him to come to the room",
            style: 3,
            close:
              "*He arrives at the reading room at 04:11 with his tie undone, which you have never seen.*\n\n*He sits in his chair and says nothing for a long while, and then leans over and puts his head on your shoulder, an entirely unprecedented breach of everything he has ever observed about distance, and stays there.*\n\n> I am not going to discuss this,\n\n*he says.*\n\n> I am simply going to be here for a period.",
          },
          {
            key: "playful",
            label: "Ask if there's a form for it",
            style: 1,
            close:
              'There is not.\n\nThere is now. I have drafted one. It is a single page and it is titled "Matters I Have Elected Not To Record" and it has one line on it and I am aware that is the most sentimental thing I have ever done.',
          },
          {
            key: "bold",
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
      choice: {
        prompt:
          "You are under no obligation to respond. That is not politeness. It is the actual legal position and I have made sure of it.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "*He is silent for a length of time that would be alarming in anyone else and is unprecedented in him.*\n\nRepeat that. I am not being difficult. I have modeled a considerable number of outcomes and that one had a low weighting and I would like to hear it again.\n\n*You repeat it. He stands up, crosses the small reading room, and kisses you with the entire eleven weeks of drafting behind it, and afterwards says, unsteadily,*\n\n> That was not in any of the twenty-four versions.",
          },
          {
            key: "held",
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
  },
  dialogue: {
    new: [
      {
        line: 'He looks up and assesses you in a single pass. "You will do. I require a partner for this investigation, and you appear capable of following instructions."',
        approach: "Hear the proposal",
        greeting:
          '"The terms are simple. You keep up, and I do the talking. State your position on that."',
        responses: {
          kind: ["Agree to his terms", "Say you'll try to keep up"],
          playful: ["Ask who does the thinking", "Counter with your own terms"],
          bold: ["Say you'll do some talking", "Name your price up front"],
          neutral: [
            "Ask for the terms in writing",
            "Ask how long the job runs",
          ],
        },
      },
      {
        line: "He finishes a paragraph, caps the pen, and gives you a précis of his day before you ask.",
        approach: "Take the briefing",
        greeting:
          '"That was the summary. The full version runs eleven minutes. You may interrupt at the four-minute mark."',
        responses: {
          kind: ["Ask for the full version", "Say the summary helped"],
          playful: ["Interrupt at minute three", "Start a timer of your own"],
          bold: ["Interrupt him right now", "Say the summary was plenty"],
          neutral: [
            "Wait for the four-minute mark",
            "Ask what happens at four",
          ],
        },
      },
      {
        line: '"What business do you have with me? Please keep in mind that I charge 5500 yen per half hour for consultations, tax inclusive."',
        approach: "Take the consultation",
        greeting:
          '"Good. State your business. The clock started when you sat down."',
        responses: {
          kind: ["Pay the fee without complaint", "Say the rate seems fair"],
          playful: ["Object on principle", "Ask for a student discount"],
          bold: ["Refuse to pay the fee", "Negotiate the rate down"],
          neutral: ["Keep it under half an hour", "Accept the terms as given"],
        },
      },
      {
        line: "There are eleven documents spread out in front of him and he knows exactly where each one is.",
        approach: "Sit across from him",
        greeting:
          '"Before you commit to anything in this house, read it. All of it. I\'ll wait."',
        responses: {
          kind: ["Ask where to start", "Take the reading seriously"],
          playful: [
            "Skim it and bluff your way",
            "Ask him to summarize instead",
          ],
          bold: ["Sign without reading a word", "Say you trust the house"],
          neutral: ["Read before you answer", "Take your time with the pages"],
        },
      },
      {
        line: "He speaks in complete sentences at a speed that suggests he's already ahead of them.",
        approach: "Try to keep up",
        greeting:
          '"Keep up, please. I am on a tight schedule today, and I will not be repeating the second clause."',
        responses: {
          kind: ["Say you'll catch up", "Ask for the gist instead"],
          playful: [
            "Ask him to repeat it anyway",
            "Race him to the next clause",
          ],
          bold: ["Say the clause was the problem", "Tell him to slow down"],
          neutral: ["Ask about the second clause", "Sum up what you caught"],
        },
      },
    ],
    known: [
      {
        line: '"For the record," he says, "I am correct. You may attempt to argue otherwise, if you wish."',
        approach: "Counter his argument",
        greeting:
          "\"According to my notes, you've disagreed with me four times now. I'm choosing not to find that concerning.\"",
        responses: {
          kind: ["Let him have this one", "Agree, just to see his face"],
          playful: [
            "Go for disagreement five",
            "Ask what counts as concerning",
          ],
          bold: ["Say you were right all four", "Say he should be concerned"],
          neutral: ["Ask to see the tally", "Ask what the four were"],
        },
      },
      {
        line: '"Partner," he says, and this time it\'s a name rather than a proposition.',
        approach: "Accept the title",
        greeting:
          '"Partner. Good. I need a second opinion, and yours is becoming reliable."',
        responses: {
          kind: ["Say you're glad to help", "Thank him for the trust"],
          playful: ["Ask what the raise is", "Ask what 'becoming' means"],
          bold: ["Say it's been reliable a while", "Say he needed you sooner"],
          neutral: ["Ask to see the document", "Ask what the matter is"],
        },
      },
      {
        line: "He hands you a document unprompted. He wants your read on it.",
        approach: "Read the document",
        greeting: '"Read this. Tell me what\'s wrong with it. Something is."',
        responses: {
          kind: ["Say you'll find the flaw", "Ask what makes him sure"],
          playful: ["Guess the flaw before reading", "Ask if he planted it"],
          bold: ["Name the flaw on page one", "Tell him it's fine, unread"],
          neutral: [
            "Ask which section worries him",
            "Mark the flaw and hand it back",
          ],
        },
      },
      {
        line: '"Have you seen Taiga Hoshibami? Strange... According to my behavioral model, he should be in the casino at this time."',
        approach: "Help him look for Taiga",
        greeting:
          '"By my model, there is a 29% chance he is at the baccarat table. We will begin there."',
        responses: {
          kind: ["Offer to take the back tables", "Reassure him it's fine"],
          playful: ["Ask about the other 71%", "Bet on the casino odds"],
          bold: ["Drag Taiga back yourself", "Tell him to relax the model"],
          neutral: ["Head for the baccarat table", "Ask where to look second"],
        },
      },
      {
        line: '"I have been assigned to Sinostra, so I will not allow them to stand trial, no matter how villainous their actions. That is the Shinjo family policy."',
        approach: "Ask about the Shinjo policy",
        greeting:
          '"Every client receives a defense. In my family that is not an opinion. It is policy."',
        responses: {
          kind: ["Say he sounds proud of it", "Say the policy suits him"],
          playful: ["Ask if it's ever backfired", "Tease the family motto"],
          bold: ["Ask if he's ever doubted it", "Ask what he'd do instead"],
          neutral: ["Ask who wrote the policy", "Take it at face value"],
        },
      },
      {
        line: "He asks for your honest assessment of his argument, and looks faintly betrayed when you actually give it.",
        approach: "Give a second opinion",
        greeting:
          '"You disagreed with me last time. You were half right. That\'s remarkable."',
        responses: {
          kind: ["Say his half was good too", "Take remarkable as praise"],
          playful: ["Ask which half was right", "Ask him to put it in writing"],
          bold: ["Say you were fully right", "Say it's not that remarkable"],
          neutral: ["Ask what he changed since", "Let the half stand"],
        },
      },
      {
        line: '"You disagree?" He looks personally offended, then visibly recalibrates. "...Go on, then. Convince me."',
        approach: "Explain your position",
        greeting:
          '"I am listening. Please be concise. I will be taking notes."',
        responses: {
          kind: ["Keep it to three points", "Reassure him it's not personal"],
          playful: ["Make him work to be convinced", "Slow down for his notes"],
          bold: ["Say he won't need notes", "Refuse to back down"],
          neutral: ["Give him one sentence", "Wait for his pen to be ready"],
        },
      },
      {
        line: "He is already at the diner, in the usual booth, his notes squared on his side of the table.",
        approach: "Slide into the booth",
        greeting: [
          '"Our usual booth, of course. I have stopped explaining the basics to you, so we may begin at once."',
        ],
        responses: {
          kind: ["Ask where he wants to start", "Say you like this booth"],
          playful: ["Steal a page of his notes", "Order before he can"],
          bold: ["Take his side of the table", "Start before he does"],
          neutral: ["Open your own notes", "Ask what's on today's list"],
        },
      },
      {
        line: "He quotes something you said days ago, word for word, and looks almost annoyed that he has it.",
        approach: "Ask how he remembered",
        greeting:
          '"It is on that morning\'s recording. I have played it back more often than the matter requires."',
        responses: {
          kind: ["Say you don't mind", "Ask what the matter was"],
          playful: ["Ask how many times exactly", "Ask for a copy of the tape"],
          bold: [
            "Ask why he keeps replaying it",
            "Say the matter didn't need it",
          ],
          neutral: ["Ask if he records everyone", "Let him keep the recording"],
        },
      },
      {
        line: "He's filed you under a new heading in his notebook, one he doesn't let you read.",
        approach: "Ask what heading",
        greeting:
          '"Everyone I meet goes in the notebook. You have been moved to a heading of your own. Do not ask which."',
        responses: {
          kind: ["Say you don't mind the file", "Ask if that's a good sign"],
          playful: ["Guess the heading yourself", "Ask anyway"],
          bold: ["Ask what got you moved", "Reach for the notebook"],
          neutral: ["Don't ask which", "Ask where you were before"],
        },
      },
      {
        line: '"I charge 5500 yen per half hour," he says, then, after a beat, "...This one is free."',
        approach: "Thank him for the discount",
        greeting:
          '"We are business partners. I will make an exception. Please do not mention it to anyone."',
        responses: {
          kind: ["Promise not to tell anyone", "Say that means something"],
          playful: ["Ask if it's a special rate", "Ask if lunch is free too"],
          bold: ["Say you'd have paid anyway", "Call it out as a favor"],
          neutral: [
            "Ask how long it stays free",
            "Ask what counts as partners",
          ],
        },
      },
      {
        line: "He recites a Rulebook article at you that sounds suspiciously specific to whatever you're currently doing.",
        approach: "Ask if that's a real rule",
        greeting:
          '"It is entirely real. I can cite the article and subsection, if you like. You would not like."',
        responses: {
          kind: ["Take his word for it", "Stop what you're doing"],
          playful: [
            "Say you'd like the subsection",
            "Call his bluff on the rule",
          ],
          bold: ["Say the rule sounds made up", "Keep doing it anyway"],
          neutral: ["Ask how old the rule is", "Ask for the article number"],
        },
      },
      {
        line: "He hands you the same takeout coffee he buys himself. Black, of course.",
        approach: "Take the coffee",
        greeting:
          '"Your performance declines when your mind is not sharp. Additives would only interfere with the flavor."',
        responses: {
          kind: ["Thank him for thinking of you", "Say black is fine by you"],
          playful: ["Ask for sugar anyway", "Ask about your performance"],
          bold: [
            "Say your mind is plenty sharp",
            "Ask if he's worried for you",
          ],
          neutral: ["Drink it as it comes", "Ask where he buys it"],
        },
      },
    ],
    warm: [
      {
        line: "His eyes light up when he sees you. He's eager now, ready to collaborate and strategize together.",
        approach: "Pull up a chair",
        greeting:
          "\"Sit. I've got a problem and you've got the better instincts.\"",
        responses: {
          kind: ["Take the offered chair", "Ask what the problem is"],
          playful: ["Make him wait for it", "Ask what's in it for you"],
          bold: ["Sit down like you own it", "Solve it before he finishes"],
          neutral: ["Sit, hear the problem", "Sit, wait for details"],
        },
      },
      {
        line: "He's drafted something with your name on it. He drafted it optimistically.",
        approach: "Take the reserved hour",
        greeting: '"I\'ve reserved this hour. Coincidence, obviously."',
        responses: {
          kind: ["Clear your hour for him too", "Say the hour is well spent"],
          playful: ["Call the coincidence out", "Call it a lucky accident"],
          bold: ["Book him for the next one", "Ask for a standing slot"],
          neutral: ["Take the hour, say nothing", "Use the hour as planned"],
        },
      },
      {
        line: '"Partner. Excellent. I\'ve had a thought and no one worth telling it to."',
        approach: "Hear out the thought",
        greeting:
          "\"I was hoping you'd come by. We make a good team, don't we?\"",
        responses: {
          kind: ["Listen closely to the thought", "Say you're worth telling"],
          playful: ["Guess the thought first", "Make him work for it"],
          bold: ["Demand he say it plainly", "Tell him to get to it"],
          neutral: ["Hear him out in silence", "Wait for the thought"],
        },
      },
      {
        line: "The verbosity slows down around you. He's actually listening, which is the tell.",
        approach: "Notice him listening",
        greeting:
          '"Your reasoning has improved. So has my mood. Related, I suspect."',
        responses: {
          kind: ["Say you noticed him listening", "Say you like being heard"],
          playful: ["Test how closely he listens", "Quiz him on what you said"],
          bold: ["Call out the improved mood", "Say his mood is your doing"],
          neutral: ["Let him keep listening quietly", "Carry on as normal"],
        },
      },
      {
        line: "He argues the opposite side just to hear you dismantle it. He enjoys losing to you.",
        approach: "Argue the other side",
        greeting:
          '"Argue the other side for me. You\'re the only one who does it properly."',
        responses: {
          kind: ["Argue, then let him win", "Concede one point to him"],
          playful: ["Argue just to rile him up", "Switch sides mid-argument"],
          bold: ["Dismantle his argument fully", "Take the harder position"],
          neutral: ["Argue the other side plainly", "Argue until he stops"],
        },
      },
    ],
    spark: [
      {
        line: "He sets down the file and gives you a look with nothing legal in it.",
        approach: "Say yes",
        greeting:
          "\"Say no and I'll never raise it again. Say yes and I'll not let it rest.\"",
        responses: {
          kind: "Tell him not to let it rest",
          playful: "Make him wait for an answer",
          bold: "Say yes",
          neutral: "Take a moment before answering",
        },
      },
      {
        line: '"I\'d like to renegotiate the terms of this partnership," he says carefully.',
        approach: "Hear the amendment",
        greeting:
          '"Clause one: closer. Clause two: also closer. I haven\'t drafted the rest."',
        responses: {
          kind: "Hear him out kindly",
          playful: "Make him argue for it",
          bold: "Amend the clause yourself",
          neutral: "Table the motion",
        },
      },
      {
        line: "He's rehearsed this. He's a very good speaker. It isn't helping.",
        approach: "Let him skip to the conclusion",
        greeting:
          "\"I've prepared an argument. It's excellent. May I skip to the conclusion?\"",
        responses: {
          kind: "Let him skip to the conclusion",
          playful: "Make him say the whole thing",
          bold: "Finish the argument for him",
          neutral: "Reserve judgment",
        },
      },
      {
        line: "He switches off the recorder, which for him is practically undressing.",
        approach: "Notice what he's doing",
        greeting:
          "\"Everything I've calculated says this is unwise. I'm proceeding regardless.\"",
        responses: {
          kind: "Let him have the moment",
          playful: "Tease the dramatic gesture",
          bold: "Switch the recorder off",
          neutral: "Watch without saying anything",
        },
      },
      {
        line: '"There is no precedent for what I want to say. So I\'ll simply say it."',
        approach: "Overrule the objection",
        greeting:
          "\"Objection. You're distracting. Sustained. I'm not asking you to stop.\"",
        responses: {
          kind: "Tell him there's precedent",
          playful: "Cross-examine him",
          bold: "Overrule the objection",
          neutral: "Let the file stay open",
        },
      },
    ],
    close: [
      {
        line: '"You\'ve become my partner in more ways than just business," he says warmly, stepping closer. "I wouldn\'t trust the calculation to anyone but you."',
        approach: "Take the partnership",
        greeting:
          '"You\'re the only person I trust completely. We can accomplish anything with you by my side."',
        responses: {
          kind: "Show him friendship is real",
          playful: "Make him smile despite logic",
          bold: "Take the partnership boldly",
          neutral: "Understand his logic",
        },
      },
      {
        line: "He sets the file down mid-clause. That has never once happened for anyone else.",
        approach: "Set the file aside",
        greeting:
          '"Set the file aside. I\'d rather talk to you than about anything else."',
        responses: {
          kind: "Say the calculation can wait",
          playful: "Tease the mid-clause pause",
          bold: "Close the deal yourself",
          neutral: "Let him set the file aside",
        },
      },
      {
        line: '"There\'s no clause for this," he admits. "I\'ve looked. Extensively."',
        approach: "Ask what he looked for",
        greeting:
          "\"I could argue anything. I can't argue myself out of this. I've stopped trying.\"",
        responses: {
          kind: "Ask what he found",
          playful: "Cross-examine him instead",
          bold: "Tell him he's more than that",
          neutral: "Let him finish looking",
        },
      },
      {
        line: "He explains the whole risk, honestly, and then asks you to decide.",
        approach: "Tell him you'll stay",
        greeting:
          '"No contract, no terms. Just tell me you\'ll stay a partner."',
        responses: {
          kind: "Tell him no contract is needed",
          playful: "Make light of the whole risk",
          bold: "Make a bold choice about him",
          neutral: "Sit through the long argument",
        },
      },
      {
        line: "The lawyer goes quiet, and the person behind him is much less careful with words.",
        approach: "Go sit beside him",
        greeting:
          "\"I've calculated every outcome. They're all better with you in them.\"",
        responses: {
          kind: "Let the quiet stay kind",
          playful: "Win the argument on purpose",
          bold: "Say what the lawyer cannot",
          neutral: "Let the room go quiet",
        },
      },
    ],
    bound: [
      {
        line: "The files stay shut. He's stopped pretending anything else has priority.",
        approach: "Close the file",
        greeting: '"Close the file. Close it. There, now come here."',
        responses: {
          kind: "Close the file for him",
          playful: "Make him say it out loud",
          bold: "Tell him he's not getting out",
          neutral: "Sit in the quiet room",
        },
      },
      {
        line: '"I have no argument for this," he says, "and no interest in constructing one."',
        approach: "Accept there's no argument",
        greeting:
          "\"I've argued my way out of everything. Not this. I don't want out.\"",
        responses: {
          kind: "Tell him he needn't argue",
          playful: "Object one last time",
          bold: "Clear his docket yourself",
          neutral: "Let him work",
        },
      },
      {
        line: "He switches the recorder off, sets it down deliberately, and stops talking entirely.",
        approach: "Switch the recorder off",
        greeting:
          '"Off the record. ...I find I have very little to say. I just wanted you here."',
        responses: {
          kind: "Thank him for the silence",
          playful: "Kill the recording",
          bold: "Take the silence as answer",
          neutral: "Say nothing",
        },
      },
      {
        line: "He's verbose about everything except this, where he's suddenly and completely direct.",
        approach: "Stay the week",
        greeting:
          "\"Stay. I'll clear the docket. I'll clear the entire week if you ask.\"",
        responses: {
          kind: "Take him up on the week",
          playful: "Hold him to the whole week",
          bold: "Say it first",
          neutral: "Let him clear the week quietly",
        },
      },
      {
        line: "He holds you like the one thing in his life he never had to negotiate for.",
        approach: "Come here",
        greeting:
          '"I love you. No preamble, no clause, no conditions. It\'s rather freeing."',
        responses: {
          kind: "Say it back without clauses",
          playful: "Tease him about negotiating",
          bold: "Hold him back just as hard",
          neutral: "Stay in the quiet held moment",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // the `new`-tier kind/playful/bold/neutral pool entries had no genuine
  // same-beat fit, so they were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Four seconds. Acceptable." **{name}** had been timing how long it took {user} to place him.',
      "{user} says the name, and **{name}** notes the exact hour.",
      '"Consultations are 5,500 yen per half hour." **{name}** waives it for {user}, and mentions that he is waiving it.',
    ],
    warm: [
      '"Excellent." **{name}** had a thought and no one worth telling it to until {user} turned up.',
      "{user} calls out, and **{name}** caps the pen mid-clause.",
      "**{name}** has drafted something with {user}'s name on it. He drafted it optimistically.",
    ],
    spark: [
      "**{name}** loses his place in a sentence. {user} watches it happen and says nothing.",
      '"Argue the other side for me," **{name}** says to {user}. "You\'re the only one who does it properly."',
      "{user} says the name, and **{name}** files it under nothing at all. There is no file.",
    ],
    close: [
      "**{name}** switches the recorder off, sets it down deliberately, and goes to {user}.",
      '"I have no argument for this," **{name}** tells {user}, "and no interest in constructing one."',
      "{user} calls, and **{name}** is late to the **{house}** meeting for the first time.",
    ],
    bound: [
      '"No preamble, no clause, no conditions." **{name}** says it to {user} in front of everyone.',
      "**{name}** closes the file. For {user}, he closes all of them.",
      "{user} says the name, and **{name}** clears the docket, and then the week.",
    ],
  },
};
