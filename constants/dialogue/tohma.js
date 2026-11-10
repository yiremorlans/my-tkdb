import bondScenes from "../bondScenes/tohma.js";

export default {
  // Level-up DMs: constants/bondScenes/tohma.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: 'Calm as still water, he tilts his head. "You\'re new around here."',
        approach: "Confirm it",
        greeting:
          '"Well, well. Lost, are we? Perhaps I can be of some assistance."',
        responses: {
          kind: ["Say you'd follow his lead", "Admit you're a little lost"],
          playful: ["Ask if he's the map", "Say you're lost on purpose"],
          bold: ["Say you're exploring", "Say you know exactly where"],
          neutral: ["Wait for his verdict", "Say you're finding your way"],
        },
      },
      {
        line: "He sets his pen down the moment you walk in, pleasant as anything.",
        approach: "Walk over to him",
        greeting:
          '"Well, hello there. I\'ve been expecting you. May I ask for your assistance with something?"',
        responses: {
          kind: ["Offer to help right away", "Ask what he needs"],
          playful: ["Ask how he expected you", "Ask if this is a trap"],
          bold: ["Ask why you, specifically", "Say you're busy, but go on"],
          neutral: ["Ask what the task is", "Hear him out first"],
        },
      },
      {
        line: 'He inclines his head, courteous. "Business in Frostheim? Then you\'ll want our captain."',
        approach: "State your business",
        greeting:
          '"Frostheim is ruled by a king, you see. I\'m no more than a servant."',
        responses: {
          kind: [
            "Ask if the king keeps him busy",
            "Offer to wait for the king",
          ],
          playful: ["Ask to be announced", "Ask for the servant's name"],
          bold: [
            "Call him more than a servant",
            "Say you'd rather talk to him",
          ],
          neutral: ["Say only what's needed", "Ask for the captain"],
        },
      },
      {
        line: "He checks the corridor behind you before he looks at you. Habit, not suspicion.",
        approach: "Let him finish",
        greeting:
          '"This academy has far more than its fair share of loose cannons, wouldn\'t you agree?"',
        responses: {
          kind: ["Ask if he's ever off duty", "Offer to keep watch with him"],
          playful: [
            "Ask if you look suspicious",
            "Ask who's on his watch list",
          ],
          bold: ["Ask if he's the dangerous one", "Ask who he's expecting"],
          neutral: ["Say it's been lively lately", "Glance back down the hall"],
        },
      },
      {
        line: "He mentions, in passing, a problem of yours you never told him about.",
        approach: "Ask how he knew",
        greeting:
          "\"Seems you've become involved in a difficult situation. How do I know? I just happened to overhear, that's all.\"",
        responses: {
          kind: ["Ask if he can help", "Admit it's been rough"],
          playful: ["Ask who he overheard", "Ask how often he overhears"],
          bold: ["Ask what he'd advise", "Ask what else he overheard"],
          neutral: ["Hear what he has to say", "Let the overhearing go"],
        },
      },
    ],
    known: [
      {
        line: "He waves you in mid-errand, the way he does for people who belong here.",
        approach: "Proceed",
        greeting: '"Ah. You again. Proceed, by all means."',
        responses: {
          kind: ["Ask how his errand's going", "Say it's nice to belong"],
          playful: ["Ask if you live here now", "Bow and proceed"],
          bold: ["Say you earned it", "Walk past like it's nothing"],
          neutral: ["Slip in and let him work", "Nod and move on"],
        },
      },
      {
        line: "He doesn't ask your name. He had it the first time and kept it.",
        approach: "Skip the explanation",
        greeting: '"No need to explain yourself this time."',
        responses: {
          kind: ["Ask how his day's been", "Say you're glad he remembers"],
          playful: ["Ask what else he's kept", "Ask if he remembers everyone"],
          bold: ["Say you noticed him notice", "Call it memory, not habit"],
          neutral: ["Skip the explanation", "Let it go unremarked"],
        },
      },
      {
        line: '"You haven\'t slept properly in days," he notes. "Don\'t argue. It shows."',
        approach: "Ask how he can tell",
        greeting:
          '"An orderly schedule is the key to good health. Yours, I\'m afraid, is not orderly."',
        responses: {
          kind: ["Ask if his is orderly", "Promise to sleep tonight"],
          playful: ["Ask how many days, exactly", "Blame the second years"],
          bold: ["Say you'll sleep if he does", "Ask what he'd suggest"],
          neutral: ["Shrug it off", "Let the remark pass"],
        },
      },
      {
        line: "He brings up a party the way you'd mention the weather, then waits.",
        approach: "Ask about the party",
        greeting:
          '"I hope you\'ll join us for a party some time. Our king, naturally, will not be attending."',
        responses: {
          kind: ["Say you'd love to come", "Ask if he gets to enjoy it"],
          playful: [
            "Ask if there's a dress code",
            "Ask why the king won't come",
          ],
          bold: ["Say you'll come if he's there", "Ask why he's inviting you"],
          neutral: ["Ask when it is", "Say you'll think about it"],
        },
      },
      {
        line: "He nods once as you pass, then thinks better of letting you go.",
        approach: "Return the nod",
        greeting:
          "\"You ask fewer questions than you did at first. Either you're learning, or you've simply given up asking.\"",
        responses: {
          kind: ["Say you're still learning", "Say you'll never stop asking"],
          playful: [
            "Ask if that's a compliment",
            "Ask which one he's hoping for",
          ],
          bold: ["Say you ask better ones now", "Ask a question right now"],
          neutral: ["Shrug and keep walking", "Nod back at him"],
        },
      },
      {
        line: "He walks you through Frostheim's schedule like you'll actually need to know it now.",
        approach: "Learn the layout",
        greeting:
          '"If you intend to keep coming, learn the layout. Start here."',
        responses: {
          kind: [
            "Say you plan to keep coming",
            "Say he's kind to take the time",
          ],
          playful: [
            "Pretend to already know it",
            "Ask if there's a quiz later",
          ],
          bold: ["Say you'll figure it out", "Say you'll know it by tomorrow"],
          neutral: ["Follow along with him", "Nod along at the schedule"],
        },
      },
      {
        line: '"Honestly," he murmurs, in the tone he reserves for people he has stopped needing to warn off.',
        approach: "Ask what that means",
        greeting: '"You\'ve made yourself rather difficult to overlook."',
        responses: {
          kind: ["Ask if he minds the company", "Say you don't mind the tone"],
          playful: ["Ask what you did to earn it", "Mimic the murmur back"],
          bold: [
            "Say you mean to stay that way",
            "Say you never needed warning",
          ],
          neutral: ["Let the murmur pass", "Let it stand"],
        },
      },
      {
        line: "He's watching two of Frostheim's own spar in the yard below.",
        approach: "Watch with him",
        greeting:
          "\"Errant and Fuji lack polish, but they've got potential. They're sincere, and that's what counts.\"",
        responses: {
          kind: ["Say they're lucky to have him", "Ask who looks out for him"],
          playful: ["Ask which one he'd bet on", "Ask if he was ever that raw"],
          bold: ["Say he'd beat them both", "Ask what he sees in them"],
          neutral: ["Ask who's winning", "Say they look evenly matched"],
        },
      },
      {
        line: '"Well, well," he says, a little pleased. He was within earshot when you held your own earlier.',
        approach: "Ask what he overheard",
        greeting:
          '"I happened to overhear you holding your own earlier. Well done."',
        responses: {
          kind: ["Say you learned from him", "Say it wasn't easy"],
          playful: [
            "Say you'd have bowed for him",
            "Say you'll charge for the show",
          ],
          bold: ["Say you won't back down", "Say you'd do it again"],
          neutral: ["Say it was nothing", "Let the praise stand"],
        },
      },
      {
        line: "He finds you in the courtyard, which means he came looking.",
        approach: "Ask what the captain wants",
        greeting:
          '"So this is where you\'ve been idling your time away. Our captain is waiting for you."',
        responses: {
          kind: ["Say you'll go right away", "Walk back with him"],
          playful: ["Say you were waiting for him", "Ask if you're in trouble"],
          bold: ["Say Jin can wait a minute", "Ask why he came himself"],
          neutral: ["Follow him back", "Head to Jin's room"],
        },
      },
      {
        line: "He offers you some of his lunch. \"I assure you, it's not poisoned,\" he says, and this time he means it as a joke you're in on.",
        approach: "Eat it anyway",
        greeting:
          '"I tend to eat lightly. Would you care for some? ...You know the rest by now."',
        responses: {
          kind: ["Say you'll split it", "Say it looks good"],
          playful: ["Ask him to taste it first", "Ask what poison it is"],
          bold: ["Eat it without hesitating", "Say you'd know if it were"],
          neutral: ["Take a small bite", "Take the joke in stride"],
        },
      },
      {
        line: "He's halfway out the door with a stack of papers when you catch him.",
        approach: "Catch him on his way out",
        greeting:
          '"Is that everything? I\'m afraid there are several matters I must attend to."',
        responses: {
          kind: ["Say it can wait until later", "Offer to carry some papers"],
          playful: ["Ask what's in the stack", "Ask if the king assigned them"],
          bold: ["Say it'll only take a minute", "Walk alongside him anyway"],
          neutral: ["Say that's everything", "Let him go"],
        },
      },
      {
        line: "\"Don't repeat that,\" he says, already knowing you won't.",
        approach: "Note he didn't need to ask",
        greeting: ['"This conversation never happened. Understand?"'],
        responses: {
          kind: ["Promise it stays with you", "Say his secrets are safe"],
          playful: ["Ask what never happened", "Swear on the king's crown"],
          bold: ["Say your word is enough", "Say it's already forgotten"],
          neutral: [
            "Keep it to yourself",
            "Let the trust go unremarked",
          ],
        },
      },
    ],
    warm: [
      {
        line: "His usual calm softens into something warmer whenever you're near.",
        approach: "Check in with him",
        greeting: '"Well, well. You again. I find I don\'t mind it."',
        responses: {
          kind: ["Ask if he's had a quiet day", "Ask how he's been keeping"],
          playful: ["Ask what softened him", "Ask if you're the reason"],
          bold: [
            "Say you'll keep coming, then",
            "Say you'll be near more often",
          ],
          neutral: ["Nod a hello", "Ask after his day only"],
        },
      },
      {
        line: "He finishes his sentence, then gives you his whole attention. That's rare.",
        approach: "Interrupt him anyway",
        greeting: '"There are worse interruptions than you."',
        responses: {
          kind: ["Tell him what's on your mind", "Ask what he was working on"],
          playful: ["Interrupt him again", "Ask if you earned that"],
          bold: ["Say you're worth it", "Make it worth his while"],
          neutral: ["Say what you came to say", "Wait until he's finished"],
        },
      },
      {
        line: '"You\'re on time," he says, which from him is close to a compliment.',
        approach: "Arrive on time",
        greeting: '"You\'re consistent. I respect consistency."',
        responses: {
          kind: [
            "Say his time matters to you",
            "Say he's worth being early for",
          ],
          playful: ["Act smug about the compliment", "Ask if he timed you"],
          bold: ["Say you'll always be on time", "Ask for the full compliment"],
          neutral: ["Accept the near-compliment", "Nod and get started"],
        },
      },
      {
        line: "He shifts to make room without ever acknowledging that he did.",
        approach: "Walk up to him",
        greeting: '"Well, then. How have you been? And the truth, this time."',
        responses: {
          kind: ["Ask how he's doing today", "Sit in the space he made"],
          playful: ["Ask if there's room for you", "Call it lucky timing"],
          bold: ["Sit closer than he planned", "Stay longer than usual"],
          neutral: ["Take the space he made", "Say a quick hello"],
        },
      },
      {
        line: "The report in his hands stops being urgent the moment you speak.",
        approach: "Ask what he's working on",
        greeting:
          '"I\'ve adjusted my schedule. Purely a matter of efficiency, I assure you."',
        responses: {
          kind: [
            "Ask if the report can wait",
            "Say you'll wait while he works",
          ],
          playful: ["Ask if it was ever urgent", "Offer to come back later"],
          bold: ["Say you'll keep him a while", "Ask for his full attention"],
          neutral: [
            "Let the report stay closed",
            "Ask about the report anyway",
          ],
        },
      },
      {
        line: "He pours a second cup of tea without asking whether you wanted one. You did.",
        approach: "Accept the poured cup",
        greeting:
          "\"I can tell at a glance when you're in need of a cup. Drink it while it's hot.\"",
        responses: {
          kind: ["Drink it while it's hot", "Say the tea is perfect"],
          playful: [
            "Ask if he always assumes right",
            "Ask if he read your mind",
          ],
          bold: ["Pour him one in return", "Ask him to sit and drink too"],
          neutral: ["Take the cup without a word", "Ask what blend it is"],
        },
      },
      {
        line: 'The chessboard is set up between you. "Sit. I\'ll go easy. Somewhat."',
        // A game he's sure to win: volleying the banter lands, earnest effort doesn't.
        mood: true,
        approach: "Sit for a game",
        greeting:
          '"Excellent. I\'ll show you how to win. Against opponents other than myself, of course."',
        responses: {
          kind: ["Say you'd like to learn", "Ask him to show you the trick"],
          playful: ["Ask how easy is 'somewhat'", "Play for bragging rights"],
          bold: ["Say you'll win one day", "Move first without asking"],
          neutral: ["Study the board", "Take the white pieces"],
        },
      },
      {
        line: '"Honestly." He\'s pinching the bridge of his nose beneath the monocle. "The second years have been making quite the racket this morning."',
        approach: "Ask who's to blame",
        greeting:
          '"Fuji, predictably. Something about a leaked cafeteria menu. Sit. I could use one sensible voice this morning."',
        responses: {
          kind: ["Offer to quiet them down", "Ask if he's had his tea"],
          playful: [
            "Ask who's in trouble first",
            "Ask if Jin slept through it",
          ],
          bold: ["Say you'll handle them", "Bring him a cup of tea"],
          neutral: ["Sit and keep quiet", "Hand him a cup of tea"],
        },
      },
      {
        line: "It's late and he's still at the desk, working through Frostheim's paperwork. He glances up. \"You should be asleep.\"",
        approach: "Offer to help him finish",
        greeting:
          '"Good health is the greatest treasure, you know. ...Very well. Sort those by date, and not one page more."',
        responses: {
          kind: ["Take a pile off his desk", "Tell him to rest too"],
          playful: ["Say you'll go when he does", "Say you're sleepwalking"],
          bold: ["Say he's worth the lost sleep", "Say you'll stay till it's done"],
          neutral: ["Help without talking", "Work until he stops"],
        },
      },
      {
        line: "\"Honestly. If he'd just take action, everything would be resolved instantaneously.\" He sighs at a door down the corridor. Jin's door.",
        approach: "Ask what Jin's avoiding",
        greeting:
          '"Our king prefers to rule from his room. I\'ve learned to work around the door."',
        responses: {
          kind: ["Say Frostheim's in good hands", "Ask if he's carrying it alone"],
          playful: ["Ask if Jin's still asleep", "Ask if the king takes visitors"],
          bold: ["Say Jin will come around", "Say you'll wait it out too"],
          neutral: ["Glance at Jin's door", "Ask how long he's waited"],
        },
      },
      {
        line: '"Look at you, you\'re trembling." He\'s in front of you before you\'ve come to a stop. "What happened?"',
        approach: "Tell him about it",
        greeting:
          '"You must have had quite a frightening encounter. You poor thing. Sit down. I\'ll see to the rest."',
        responses: {
          kind: ["Let him fuss over you", "Say you're glad he's here"],
          playful: ["Blame the cold", "Say you should see the anomaly"],
          bold: ["Tell him exactly what happened", "Ask him to come look"],
          neutral: ["Sit where he says", "Catch your breath first"],
        },
      },
      {
        line: "You ask him something you should probably already know. He doesn't sigh, and he doesn't check the time.",
        approach: "Admit you don't know",
        greeting:
          '"Inexperience is not a crime. The crime is choosing to remain ignorant. Now. From the beginning."',
        responses: {
          kind: ["Ask him to walk you through", "Say you'll take notes"],
          playful: ["Ask if you're a lost cause", "Ask how he learned it all"],
          bold: ["Ask for the hard version", "Say you'll teach him something"],
          neutral: ["Listen to him explain", "Pay attention"],
        },
      },
      {
        line: "You find him out back of the Vagastrom garage, jacket off, sleeves rolled. He doesn't look surprised you found him.",
        // Off duty and out of the uniform: banter lands, earnest care doesn't.
        mood: true,
        approach: "Ask why he's out here",
        greeting:
          '"I was Vagastrom once, you know. Some habits don\'t transfer."',
        responses: {
          kind: ["Say it suits him out here", "Say you never saw him here"],
          playful: ["Ask if he knew you'd come", "Say he almost looks the part"],
          bold: ["Roll up your sleeves too", "Ask to stay out here too"],
          neutral: ["Lean on the wall beside him", "Let him keep his reasons"],
        },
      },
      {
        line: '"You\'ve been asking around about something," he says mildly, and hands you a folded page. "I happened to overhear."',
        approach: "Take the folded page",
        greeting: '"Names and times. Where I got them needn\'t concern you."',
        responses: {
          kind: ["Ask how he finds the time", "Ask what it cost him"],
          playful: ["Ask who he overheard", "Ask if he overhears you often"],
          bold: ["Say you'll put it to use", "Say you'd have found it"],
          neutral: ["Read the page", "Pocket it for later"],
        },
      },
      {
        line: 'He falls into step beside you in the hallway. "You\'re fatigued. You may insist otherwise. You may even believe it."',
        approach: "Insist you're fine",
        greeting:
          '"I can tell at a glance. Take the afternoon. I\'ll inform whoever needs to know."',
        responses: {
          kind: ["Admit he's right", "Promise to slow down"],
          playful: ["Ask how bad you look", "Say you'll nap in his office"],
          bold: ["Say you'll rest if he does", "Say he can walk you back"],
          neutral: ["Match his stride", "Head back to your room"],
        },
      },
      {
        line: 'You walk past without seeing him. His voice follows you, amused. "Ignoring me, are you?"',
        approach: "Turn back to him",
        greeting:
          "\"You've certainly got guts. I'll assume it was an accident. This time.\"",
        responses: {
          kind: ["Admit you were lost in thought", "Say you'd never ignore him"],
          playful: ["Blame a very good daydream", "Swear it was nothing personal"],
          bold: ["Say he has your attention now", "Ask if he missed you"],
          neutral: ["Say hello this time", "Blink back to the present"],
        },
      },
      {
        line: "He watches you haul a box across the hall, then takes it off you without a word. It seems to weigh nothing to him.",
        // His canon brute strength on show: teasing it lands, earnest care doesn't.
        mood: true,
        approach: "Let him take the box",
        greeting:
          '"Please don\'t overexert yourself. There are many people here who need you in one piece."',
        responses: {
          kind: ["Promise to be more mindful", "Hold the door for him"],
          playful: ["Ask if he lifts for fun", "Ask if he could carry you too"],
          bold: ["Grab the other end anyway", "Grab the next box yourself"],
          neutral: ["Point where it goes", "Walk ahead of him"],
        },
      },
      {
        line: '"No need to look so wary." He holds out an envelope sealed with Frostheim\'s crest. "I\'ve nothing but the noblest of intentions."',
        approach: "Open the envelope",
        greeting:
          '"An invitation. Frostheim\'s evening. I took the liberty of adding your name myself."',
        responses: {
          kind: ["Say it's an honor", "Take it with both hands"],
          playful: ["Ask about his real intentions", "Ask if it's a summons"],
          bold: ["Say you hoped for less noble", "Open it in front of him"],
          neutral: ["Read what's inside", "Tuck it away"],
        },
      },
    ],
    spark: [
      {
        line: "The composure holds. It is very obviously costing him something.",
        approach: "Notice what it costs him",
        greeting:
          "\"My focus is not what it was. You're the reason. I've stopped trying to do anything about it.\"",
        responses: {
          kind: "Tell him it's mutual",
          playful: "Break a rule on purpose",
          bold: "Ask what it's costing him",
          neutral: "Let him recompose",
        },
      },
      {
        line: "He straightens something on your uniform with unnecessary precision.",
        approach: "Hold still",
        greeting:
          '"Hold still. This will take a moment and I intend to take it."',
        responses: {
          kind: "Be still for him",
          playful: "Ask if he does this often",
          bold: "Say plainly what you want",
          neutral: "Keep a proper distance",
        },
      },
      {
        line: '"I\'ve turned this over more than once," he says. "The answer keeps coming back the same."',
        approach: "State what you want",
        greeting:
          '"State plainly what you want. I\'ll tell you whether I want the same."',
        responses: {
          kind: "Let him take his moment",
          playful: "Ask what he's concluded",
          bold: "Tell him you already know",
          neutral: "Wait for him to decide",
        },
      },
      {
        line: "He stands closer than is proper and does not correct it.",
        approach: "Step past his manners",
        greeting:
          "\"Closer. I'm not going to ask twice, and I'd rather not have to.\"",
        responses: {
          kind: "Let him stay close",
          playful: "Point out the impropriety",
          bold: "Close the last step",
          neutral: "Give him nothing",
        },
      },
      {
        line: '"You\'re a distraction," he states, without any apparent intention of removing it.',
        approach: "Be the distraction",
        greeting:
          '"That look is doing nothing for my concentration and I would like you to keep making it."',
        responses: {
          kind: "Ask if he minds it",
          playful: "Compromise his focus",
          bold: "Tell him to stop holding back",
          neutral: "Let yourself be distracting",
        },
      },
    ],
    close: [
      {
        line: "\"You've become someone I look forward to seeing,\" he says plainly, like it's just a fact.",
        approach: "Say it plainly",
        greeting:
          '"Well, well. I must say your company is preferred. To my surprise."',
        responses: {
          kind: "Tell him he can stand down",
          playful: "Catch him almost smiling",
          bold: "Say you look forward to it too",
          neutral: "Take the words in stride",
        },
      },
      {
        line: "He breaks his own rule about interruptions. For you. Again.",
        approach: "Go to him directly",
        greeting:
          "\"I don't make exceptions. I've made one. Draw your own conclusions.\"",
        responses: {
          kind: "Thank him for the exception",
          playful: "Break his rules with him",
          bold: "Demand the truth from him",
          neutral: "See what he won't say",
        },
      },
      {
        line: '"I had an hour free," he says. He did not have an hour free.',
        approach: "Take the seat beside him",
        greeting: '"I\'ve stopped calling this a coincidence. So should you."',
        responses: {
          kind: "Ask what he's carrying",
          playful: "Call the hour a lie",
          bold: "Ask why he's really here",
          neutral: "Stay until he's finished",
        },
      },
      {
        line: "The composure holds, but his eyes give him away completely.",
        approach: "See what his eyes say",
        greeting:
          '"If something happens, come to me first. Not second. First."',
        responses: {
          kind: "See through his composure",
          playful: "Crack through his mask",
          bold: "Tell him you're staying",
          neutral: "Let his eyes say it instead",
        },
      },
      {
        line: "He tells you the truth without softening it, because you're the one person he doesn't have to.",
        approach: "Tell him the truth",
        greeting:
          '"Say it plainly. I\'d rather hear the truth from you than anything else."',
        responses: {
          kind: "Thank him for the honesty",
          playful: "Ask if it's ever gentle",
          bold: "Meet him without flinching",
          neutral: "Let the silence stand",
        },
      },
    ],
    bound: [
      {
        line: "He states what he wants plainly, and then is exceedingly efficient about it.",
        approach: "Tell him what you want",
        greeting:
          '"Tell me what you want. I\'d rather not have to guess with you."',
        responses: {
          kind: "Say it back plainly",
          playful: "Ask if he's ever spontaneous",
          bold: "Tell him exactly what you want",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He wakes at his usual hour, looks at you, and elects to be late for the first time.",
        approach: "Let him be late",
        greeting:
          '"I love you. Hardly a complicated thing to work out. It simply took me a while to say it."',
        responses: {
          kind: "Let him be late",
          playful: "Ruin his schedule",
          bold: "Pull him back down",
          neutral: "Stay in with him",
        },
      },
      {
        line: '"I stopped weighing you up a long while ago," he says. "The matter was settled."',
        approach: "Say it back",
        greeting:
          '"You are the one disruption to my order that I have no intention of resolving."',
        responses: {
          kind: "Tell him it goes both ways",
          playful: "Make him lose the thread",
          bold: "Say you weighed him up too",
          neutral: "Let the settled matter rest",
        },
      },
      {
        line: "His hands are precise everywhere. It is deeply unfair.",
        approach: "Call it unfair",
        greeting: "\"Closer. That's better. That's... yes.\"",
        responses: {
          kind: "Take his precise hands",
          playful: "Be deliberately imprecise",
          bold: "Be the disorder",
          neutral: "Lie still",
        },
      },
      {
        line: "He holds you the way he does everything else: deliberately, and completely.",
        approach: "Stay the morning",
        greeting:
          "\"Stay. I've cleared the morning. I've never cleared a morning.\"",
        responses: {
          kind: "Melt into how he holds you",
          playful: "Ask if he's ever careless",
          bold: "Hold him just as deliberately",
          neutral: "Let him keep the hour",
        },
      },
    ],
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Well, well." **{name}** turns to {user} with a courtesy that gives away nothing.',
      '{user} names him, and **{name}** files it somewhere, smiling. "How resourceful."',
      '"Perhaps I can be of some assistance?" **{name}** asks {user}, as though he hadn\'t already overheard they were looking for him.',
      '**{name}** turns to {user}, already smiling. "Ah, you must be new. Is there something I can do for you?"',
    ],
    known: [
      '"Ah. You again." **{name}** turns to {user}. "Proceed, by all means."',
      "**{name}** greets {user} by name before they've finished calling his. He makes a point of remembering.",
      '"No need to explain yourself this time." **{name}** gives {user} a moment he could have spent elsewhere.',
    ],
    warm: [
      '"Honestly." **{name}** was two steps from a clean escape, and {user} caught him anyway.',
      "{user} calls out, and **{name}** gives them his whole attention.",
      "**{name}** adjusts his monocle, then decides {user} is worth being late for.",
    ],
    spark: [
      '"Shouting my name across half the campus. You\'ve certainly got guts." **{name}** looks delighted with {user}.',
      "{user} greets **{name}** by name, and he's too pleased to remember a single pleasantry he had ready.",
      "**{name}** was en route to the **{house}** briefing. He is now walking {user}'s way instead.",
    ],
    close: [
      '"This conversation never happened," **{name}** murmurs, already steering {user} out of earshot.',
      "**{name}** hears {user}, and the servant's mask comes off between one step and the next.",
      "{user} calls, and **{name}**'s next appointment quietly stops mattering.",
    ],
    bound: [
      '"I stopped weighing you up a long while ago," **{name}** tells {user}, taking their hand in the open.',
      "**{name}** hands the **{house}** dispatch to a passing first-year. {user} called; the matter is settled.",
      "{user} calls his name, and **{name}** clears his entire schedule.",
    ],
  },
};
