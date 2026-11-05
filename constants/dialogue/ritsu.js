import bondScenes from "../bondScenes/ritsu.js";

export default {
  // Level-up DMs: constants/bondScenes/ritsu.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: 'He looks up and assesses you in a single pass. "You will do. This investigation requires an inspector, and you appear capable of following instructions."',
        approach: "Hear the proposal",
        greeting:
          '"The terms are simple. You investigate, and I do the talking. State your position on that."',
        responses: {
          kind: ["Agree to his terms", "Say you'll follow his lead"],
          playful: ["Ask him to put it in writing", "Ask what your cut is"],
          bold: ["Say you'd have picked him too", "Name your price up front"],
          neutral: ["Ask what the case is", "Ask how long the job runs"],
        },
      },
      {
        line: '"Are you aware of the responsibility your position as inspector entails? I suggest you tidy your appearance and wipe that vacant look from your face."',
        approach: "Fix your appearance",
        greeting: '"Better. Marginally. We will work on the rest."',
        responses: {
          kind: ["Say you won't let him down", "Ask what he'd fix first"],
          playful: ["Ask what vacant looks like", "Make your most alert face"],
          bold: [
            "Book a follow-up inspection",
            "Say you'll prove it on the job",
          ],
          neutral: ["Hear him out", "Wait for the rest"],
        },
      },
      {
        line: '"What business do you have with me? Please keep in mind that I charge 5500 yen per half hour for consultations, tax inclusive."',
        approach: "Take the consultation",
        greeting:
          '"Good. The clock is running, so I suggest you begin with the facts."',
        responses: {
          kind: ["Pay the fee without complaint", "Say he's worth the rate"],
          playful: ["Object on principle", "Ask for a student discount"],
          bold: ["Ask for a retainer rate", "Negotiate the rate down"],
          neutral: ["Keep it under half an hour", "Accept the terms as given"],
        },
      },
      {
        line: "There are eleven documents spread out in front of him and he knows exactly where each one is.",
        approach: "Sit across from him",
        greeting:
          '"Before you commit to anything in this house, read it. All of it. I\'ll wait."',
        responses: {
          kind: ["Read every page he hands you", "Say you're glad he checks"],
          playful: [
            "Ask for the annotated copy",
            "Ask if there's a quiz after",
          ],
          bold: ["Read them twice, then sign", "Ask him to walk you through"],
          neutral: ["Ask where to start", "Take your time with the pages"],
        },
      },
      {
        line: "He speaks in complete sentences at a speed that suggests he's already ahead of them.",
        approach: "Try to keep up",
        greeting:
          '"Keep up, please. I am on a tight schedule today, and I will not be repeating the second clause."',
        responses: {
          kind: ["Say you won't waste his time", "Say you'll catch up"],
          playful: [
            "Ask for the transcript later",
            "Ask if he bills by the word",
          ],
          bold: ["Repeat his last point back", "Say you caught every word"],
          neutral: ["Ask him what the case is", "Sum up what you caught"],
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
      {
        line: '"You\'ve lost your notebook? One moment." He flips his own open. "At 9:04 AM it was inside the photocopier. Yes, I have that recorded."',
        approach: "Ask why he recorded that",
        greeting:
          '"I record everything. That you were the subject of this particular entry is incidental."',
        responses: {
          kind: ["Thank him for tracking it", "Say you owe him one"],
          playful: [
            "Ask what else he recorded",
            "Ask if you're in there a lot",
          ],
          bold: ["Ask to read his notes", "Say that's a little much"],
          neutral: ["Go get the notebook", "Check the photocopier"],
        },
      },
      {
        line: '"Good morning. We have a meeting at 3 PM today." He hands you a printed agenda. "Please adjust your plans accordingly."',
        approach: "Read the agenda",
        greeting:
          '"Item four is yours. I\'ve allotted you six minutes. You may use seven, if the argument merits it."',
        responses: {
          kind: ["Thank him for the extra minute", "Promise to prepare"],
          playful: ["Ask what item five is", "Request a snack break item"],
          bold: ["Ask for ten minutes", "Add an item of your own"],
          neutral: ["Note down 3 PM", "Fold the agenda away"],
        },
      },
      {
        line: '"As your business partner, I must ask that you stop consenting to uncompensated labor." He saw you carrying someone else\'s boxes.',
        approach: "Say you were helping",
        greeting:
          '"Helping is a service. Services have value. You are undercutting the market, and me."',
        responses: {
          kind: ["Say you like helping people", "Promise to be careful"],
          playful: ["Offer to invoice them", "Ask his rate for boxes"],
          bold: ["Say you'll help who you want", "Ask if he's jealous"],
          neutral: ["Set the boxes down", "Hear him out"],
        },
      },
      {
        line: '"You struggle to get up in the morning?" He considers this with great seriousness. "I could call you each day at a set time. I\'ll have to think about what to charge."',
        approach: "Accept the wake-up call",
        greeting:
          '"Excellent. 6:45. I will call once. If you do not answer, I will call once more. That is the entire service."',
        responses: {
          kind: ["Thank him for the offer", "Promise to pick up first ring"],
          playful: ["Haggle the price down", "Ask for a song with it"],
          bold: ["Say it should be free", "Ask him to make it 6:30"],
          neutral: ["Agree to 6:45", "Set a backup alarm"],
        },
      },
      {
        line: 'He hands a business card to a first-year who only asked him the time. He notices you watching. "Always have them on hand."',
        approach: "Ask for a card",
        greeting:
          '"You have four already. ...Very well. A fifth. Keep it in a different pocket."',
        responses: {
          kind: ["Keep it somewhere safe", "Say you'll treasure it"],
          playful: ["Ask him to sign it", "Say you collect them"],
          bold: ["Hand him one of yours", "Ask what the back is for"],
          neutral: ["Pocket the card", "Read the card"],
        },
      },
      {
        line: '"Taiga Hoshibami has deviated from my behavioral model three times this week." He sounds personally wronged. "I must revise it."',
        approach: "Help revise the model",
        greeting:
          '"Your observations would be welcome. You see him at hours I do not. Report everything."',
        responses: {
          kind: ["Share what you've seen", "Say the model is good"],
          playful: ["Say Taiga's onto him", "Add 'naps' as a variable"],
          bold: ["Say he should just ask Taiga", "Ask why he tracks Taiga"],
          neutral: ["Take notes with him", "Listen to the revisions"],
        },
      },
      {
        line: '"Until the age of three I traveled the world with my mother," he says, of a postcard on the diner wall. "From four, my studies took precedence."',
        approach: "Ask what he remembers",
        greeting:
          '"Very little, precisely. A fountain. A great deal of wind. I have no notes from that period, which I regret."',
        responses: {
          kind: ["Say the fountain sounds nice", "Ask about his mother"],
          playful: [
            "Ask if he rated the fountain",
            "Say toddlers take bad notes",
          ],
          bold: ["Say he should go back", "Ask if he misses it"],
          neutral: ["Look at the postcard", "Let him continue"],
        },
      },
      {
        line: '"I set aside time in the evening to watch opera online," he says, earbuds in hand. "It orders my thoughts. ...You may have the other earbud."',
        approach: "Take the other earbud",
        greeting:
          '"Act two. You have missed act one, but I can summarize it in ninety seconds."',
        responses: {
          kind: ["Listen along with him", "Ask which part he loves"],
          playful: ["Ask for the ninety seconds", "Sing the high note"],
          bold: ["Ask him to translate it", "Pick the next opera"],
          neutral: ["Listen", "Close your eyes"],
        },
      },
      {
        line: '"I\'ve finished reviewing today\'s recordings." He sets the recorder between you. "You sighed a total of four times. Is something troubling you?"',
        approach: "Tell him what's wrong",
        greeting:
          '"Take your time. I have cleared fifteen minutes. ...Twenty. I have cleared twenty."',
        responses: {
          kind: ["Thank him for noticing", "Say it's nothing big"],
          playful: ["Say one was a yawn", "Ask how many he sighed"],
          bold: ["Ask him to delete the tape", "Say he should ask more often"],
          neutral: ["Give him the short version", "Sit for a moment"],
        },
      },
      {
        line: '"The vice-captain asked me to organize some documents." He\'s already at the copier. "We begin by copying everything, in case the originals are lost."',
        approach: "Help him make copies",
        greeting:
          '"You collate. I copy. If you misalign a page, I will know, and I will say nothing, and you will feel it."',
        responses: {
          kind: ["Collate with care", "Offer to take a turn copying"],
          playful: ["Copy your hand instead", "Misalign one on purpose"],
          bold: ["Say one set is enough", "Take over the copier"],
          neutral: ["Start collating", "Stack the pages"],
        },
      },
      {
        line: "He passes you his notes to copy. The handwriting is appalling. He watches you squint and says nothing, with enormous dignity.",
        approach: "Ask what this word says",
        greeting:
          "\"'Jurisdiction.' Obviously. ...It is legible to the trained eye. I will read it aloud. All of it.\"",
        responses: {
          kind: ["Say you'll learn to read it", "Thank him for sharing them"],
          playful: ["Guess the word wrong", "Say it looks like a map"],
          bold: ["Tell him to type them", "Say it's barely writing"],
          neutral: ["Listen as he reads", "Copy what you can"],
        },
      },
      {
        line: '"You wish to have lunch with me?" He checks his watch, then his planner. "We are business partners. I will accompany you free of charge."',
        approach: "Pick the place",
        greeting:
          '"The diner. Our usual booth. ...That was not a question. I have already reserved it."',
        responses: {
          kind: ["Say you're glad he's free", "Offer to treat him"],
          playful: ["Ask what it'd normally cost", "Suggest somewhere new"],
          bold: ["Say you'll pick next time", "Ask why he reserved it early"],
          neutral: ["Head to the diner", "Follow him"],
        },
      },
      {
        line: '"We made solid progress toward reinstating the Gala today." He closes his binder with rare satisfaction. "Let\'s reconvene tomorrow."',
        approach: "Agree to reconvene",
        greeting:
          '"Same time. Same booth. Bring today\'s notes. And yourself, which is the more important item."',
        responses: {
          kind: ["Say you'll bring both", "Say today went well"],
          playful: ["Ask which item is heavier", "Say you'll forget the notes"],
          bold: ["Ask him to repeat that", "Say he's the important item"],
          neutral: ["Pack up your notes", "Nod and head out"],
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
      {
        line: "{user} says the name, and **{name}** switches the recorder on.",
        responses: {
          kind: "Speak clearly for the record",
          playful: "Wave at the recorder",
          bold: "Ask him to turn it off",
        },
      },
      {
        line: '"Name, House, nature of the matter." **{name}** has his notebook open before {user} finishes.',
        responses: {
          kind: "Give him all three",
          playful: "Give a fake name",
          bold: "Ask him the same three",
        },
      },
      {
        line: '"Five seconds." **{name}** looks up at {user}. "Consultations are billed by the half hour, so I suggest you be brief."',
        responses: {
          kind: "Say you'll keep it short",
          playful: "Start counting to five",
          bold: "Book the full half hour",
        },
      },
      {
        line: '**{name}** hands {user} his card. "Ritsu Shinjo. State your business. The first five minutes are complimentary."',
        responses: {
          kind: "Say you'll keep his card",
          playful: "Ask what minute six costs",
          bold: "Hire him on the spot",
        },
      },
    ],
    known: [
      {
        line: '**{name}** looks up from his notebook at {user}. "You were next on my list. Sit."',
        responses: {
          kind: "Sit down as asked",
          playful: "Ask who was first",
          bold: "Stay standing",
        },
      },
      {
        line: '**{name}** slides a stack of copies across to {user}. "The originals stay with me. These are yours."',
        responses: {
          kind: "Take the copies",
          playful: "Ask for the originals",
          bold: "Ask what's in them first",
        },
      },
      {
        line: "{user} calls, and **{name}** is already writing down the time. He has started a page just for them.",
        responses: {
          kind: "Ask what the page says",
          playful: "Ask for a copy of the page",
          bold: "Say you'll start one on him",
        },
      },
    ],
    warm: [
      {
        line: '"Excellent." **{name}** had a thought and no one worth telling it to until {user} turned up.',
        responses: {
          kind: "Ask him to tell you",
          playful: "Charge him for listening",
          bold: "Say you're worth telling",
        },
      },
      {
        line: "{user} calls out, and **{name}** caps the pen mid-clause.",
        responses: {
          kind: "Say he can finish it",
          playful: "Finish the clause for him",
          bold: "Ask what the clause says",
        },
      },
      {
        line: "**{name}** has drafted something with {user}'s name on it. He drafted it optimistically.",
        responses: {
          kind: "Ask to read the draft",
          playful: "Ask how optimistic",
          bold: "Sign it without reading",
        },
      },
    ],
    spark: [
      {
        line: "**{name}** loses his place in a sentence. {user} watches it happen and says nothing.",
        responses: {
          kind: "Wait for him to recover",
          playful: "Finish the sentence wrong",
          bold: "Point out he lost it",
        },
      },
      {
        line: '"Argue the other side for me," **{name}** says to {user}. "You\'re the only one who does it properly."',
        responses: {
          kind: "Agree to argue",
          playful: "Argue both sides",
          bold: "Argue it better than him",
        },
      },
      {
        line: "{user} says the name, and **{name}** files it under nothing at all. There is no file.",
        responses: {
          kind: "Say you don't need a file",
          playful: "Ask to see the file",
          bold: "Say he should start one",
        },
      },
    ],
    close: [
      {
        line: "**{name}** switches the recorder off, sets it down deliberately, and goes to {user}.",
        responses: {
          kind: "Say you won't tell a soul",
          playful: "Turn the recorder on",
          bold: "Ask what's off the record",
        },
      },
      {
        line: '"I have no argument for this," **{name}** tells {user}, "and no interest in constructing one."',
        responses: {
          kind: "Say you don't need one",
          playful: "Offer to argue for him",
          bold: "Say you rest your case",
        },
      },
      {
        line: "{user} calls, and **{name}** is late to the **{house}** meeting for the first time.",
        responses: {
          kind: "Say you'll make it up to him",
          playful: "Ask what the fine is",
          bold: "Say the meeting can wait",
        },
      },
    ],
    bound: [
      {
        line: '"No preamble, no clause, no conditions." **{name}** says it to {user} in front of everyone.',
        responses: {
          kind: "Say yes, then",
          playful: "Ask for it in writing",
          bold: "Say the same, no conditions",
        },
      },
      {
        line: "**{name}** closes the file. For {user}, he closes all of them.",
        responses: {
          kind: "Say that means everything",
          playful: "Ask what was in them",
          bold: "Say you'll open one for him",
        },
      },
      {
        line: "{user} says the name, and **{name}** clears the docket, and then the week.",
        responses: {
          kind: "Say you'll fill the week",
          playful: "Ask about next week",
          bold: "Book the week, then",
        },
      },
    ],
  },
};
