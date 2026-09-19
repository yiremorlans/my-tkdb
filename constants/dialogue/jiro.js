export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jiro writes like a chart entry —
  // observations, no adjectives, no greeting. The arc is a boy who has replaced
  // every feeling with a measurement slowly running out of measurements, and the
  // intimacy is that he keeps recording you anyway, long after there is any
  // clinical reason to.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: This is Jiro from Mortkranken. Your number is on the patient list.\n\nYour last examination left one reading I want to take again. Not urgent, but I'm making a follow-up slot for this week. Please reply with your preferred day and time.",
        "I run the health check-ups here. Yuri is too busy to manage scheduling, so I do it.\n\nYou have {timesMet} visits on file. One reading from the last one doesn't agree with the others. I'd like to take it again. I could have flagged this the next time you were in, but this is more efficient.",
      ],
      choice: {
        prompt: "Pick a day and the slot is yours.",
        options: [
          {
            key: "kind",
            label: "Confirm it, and thank him",
            style: 3,
            close:
              "Noted. The slot is held.\n\nPlease arrive ten minutes early. Otherwise there isn't time for a full examination.",
          },
          {
            key: "playful",
            label: "Ask if you're dying",
            style: 1,
            close:
              "No. Probably not. It's your resting pulse. High once, which is usually the cuff or the walk over.\n\nI'm re-checking it anyway.",
          },
          {
            key: "bold",
            label: "Ask why he texted instead",
            style: 4,
            close:
              "Because catching you during a walk-in is inefficient. I said that already.\n\nThe follow-up is on the day you picked. You can wear whatever is convenient for you. You'll be taking it off anyway",
          },
        ],
      },
      keepsake: {
        emoji: "📋",
        line: "The follow-up slot he texted to confirm instead of catching you in the ward.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: I want to revisit an entry from last week. You came into the ward already treated. A field dressing, applied by you, over a laceration you sustained on a mission and didn't report until the next scheduled check-up.",
        "I redid it. It had closed badly and would've scarred.\n\nYou were on campus, not far from Mortkranken, and treated it yourself anyway. That was a decision, not a mission constraint. The wrong one.\n\nI don't need to know why. Please don't do it again. Redressing a badly wrapped wound is inconvenient.",
        "You apologized for not coming in, which is the least relevant part of it.\n\nYou answered me with {favResponse}, same as always. You treat your own condition as a footnote.\n\nI'd like that changed.",
      ],
      choice: {
        prompt: "Tell me if that's something you can manage.",
        options: [
          {
            key: "kind",
            label: "Promise to be more careful",
            style: 3,
            close:
              "A commitment, not a fact. I dislike the uncertainty in it.\n\nI'll check weekly if necessary. Possibly daily.",
          },
          {
            key: "playful",
            label: "Ask if he'd notice",
            style: 1,
            close:
              "I'd notice immediately. You walk differently when something hurts.",
          },
          {
            key: "bold",
            label: "Point out he does it too",
            style: 4,
            close:
              "That's different. My condition is already documented.\n\n*A pause.*\n\nThat isn't a good argument. I'll think of a better one.",
          },
        ],
      },
      keepsake: {
        emoji: "🩹",
        line: "The dressing he redid, wound tighter than yours ever was.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Come to the lower theater at eleven. The captain will be asleep. Bring nothing.",
        "*The room is dark except for one lamp. On the bench is a wooden case, old, clearly not medical, and he opens it without preamble.*\n\n*Inside is a fountain pen, the nib worn crooked from one particular hand.*\n\n> This was my brother's. He's dead. He died here last year and I've kept it in a drawer since and never once opened it.",
        "> I don't know why I keep it. I've written the reasoning out three times and it doesn't resolve. Sentiment isn't a category I have any facility with.\n\n> But I found myself wanting you to have seen it, and that impulse didn't resolve either. I've stopped attempting to resolve things where you're concerned. The failure rate is one hundred percent.",
      ],
      choice: {
        prompt:
          "You may ask one question about him. One. I have a limited supply of answers.",
        options: [
          {
            key: "kind",
            label: "Ask what he was like",
            style: 3,
            close:
              "*Jiro doesn't answer for a long time. When he does, he doesn't sound like himself.*\n\n> Loud. Extremely loud. He talked in metaphors and it was intolerable and I'd give a great deal to be made to sit through it once more.\n\n*He closes the case.*\n\n> That's the question spent. Thank you for spending it on that one.",
          },
          {
            key: "playful",
            label: "Ask if he was any good",
            style: 1,
            close:
              "> At writing? Terrible. Genuinely terrible. He was told so repeatedly and it never once landed.\n\n*Something almost moves at the corner of his mouth.*\n\n> I haven't said that out loud since he died. It's still funny. I'd assumed it would've stopped being funny.",
          },
          {
            key: "bold",
            label: "Ask him to write with it",
            style: 4,
            close:
              "> No.\n\n*Then he sits down, and takes it out, and holds it for a very long time without doing anything with it.*\n\n> ...If you stay,\n\n*he says eventually, not looking up,*\n\n> I'll try. I've found I can attempt things in front of you that I can't attempt alone. I have no explanation for that and I've stopped looking for one.",
          },
        ],
      },
      keepsake: {
        emoji: "🖌️",
        line: "His brother's pen, out of the drawer for the first time.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I'm going to state something and I'd prefer you not to characterize it as a complaint.",
        "The captain's treatments are also experiments. I'm aware. I've been aware since the first one.\n\nI permit them because they keep me upright, because the data is genuinely valuable, and because he doesn't have anybody else. Those are three reasons and I've never needed a fourth.",
        "I'm telling you because you've begun looking at my arms and stopping yourself from asking. The not-asking has gone on for eleven days, and it's having an effect on me I haven't experienced before and can't name.\n\nThe effect isn't distress. I want to be clear. I have no word for what it is. I'm hoping saying it out loud resolves the ambiguity. I don't think it's going to.",
      ],
      choice: {
        prompt: "You may ask now. You've plainly wanted to for some time.",
        options: [
          {
            key: "kind",
            label: "Ask if it hurts",
            style: 3,
            close:
              "Yes.\n\n*One word, immediate, without a single qualifier attached to it, which from Jiro is the most naked thing he has ever done.*\n\nNobody has asked that. In all this time, nobody has asked the pain question. They ask about the results.",
          },
          {
            key: "playful",
            label: "Say eleven days is impressive",
            style: 1,
            close:
              "It is. I counted.\n\nI counted because I was waiting. I've concluded that I was disappointed each day that you didn't, which isn't a conclusion I enjoy having reached.",
          },
          {
            key: "bold",
            label: "Tell him to push back",
            style: 4,
            close:
              "That's not a variable I control. Without them I stop working.\n\n*A long silence.*\n\nThat's only partly true. I could ask him to test the new formulas on something else first. I've never once asked.\n\nI'll consider it. That's a larger statement than it appears and I'd appreciate it not being repeated.",
          },
        ],
      },
      keepsake: {
        emoji: "🧪",
        line: "The first straight answer he ever gave about the pain.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: You're stable. I've checked personally, three times, at intervals. The third was unnecessary.",
        "I wasn't on that mission. I was told the outcome forty minutes after it resolved and I've spent the intervening period attempting to work normally.\n\nMy hands weren't steady. That's never happened. I've operated through worse information than that and my hands have never once been a problem.",
        "I've been at your bedside since the second check. You've been unconscious for most of it. I didn't want you to wake and find me here without an explanation, so this message is the explanation, written at the bedside. I recognize that's absurd.\n\nThe variable I couldn't name is you. The whole variable. I've been running a model with a term in it I refused to label for eight months.",
      ],
      choice: {
        prompt:
          "You're awake now. I can see that you're reading this. Say something.",
        options: [
          {
            key: "kind",
            label: "Tell him to put the phone down",
            style: 3,
            close:
              "*He puts it down.*\n\n*Then he sits there, hands flat on his knees, entirely still, looking at you with an expression nobody in Mortkranken has ever seen on him.*\n\n> I don't know what to do now,\n\n*he says.*\n\n> There's no procedure. Tell me what to do.\n\n*You tell him to hold your hand. He does, for four hours, and doesn't measure anything at all.*",
          },
          {
            key: "playful",
            label: "Ask for the third check result",
            style: 1,
            close:
              "> Identical to the second.\n\n> I'm aware that was the point of your question. I'm answering it literally because the alternative is answering it properly, and I've been at this bedside for nine hours and my defenses aren't what they were.",
          },
          {
            key: "bold",
            label: "Tell him to label the term",
            style: 4,
            close:
              "*The typing indicator runs, stops, runs again.*\n\n*Then he simply puts the phone face down on the bed and says it out loud instead, quietly, to your hand rather than to you: one word, the correct one, in the flat voice he uses for readings.*\n\n> There. It's labeled. The model is considerably worse now and I don't care.",
          },
        ],
      },
      keepsake: {
        emoji: "🛏️",
        line: "Nine hours at a bedside by someone who doesn't sit down.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: This message contains no observations. I want that noted at the top, because it's the first one that hasn't.",
        "{timesMet}. I have that number without looking it up. I've had it for some time.\n\nI've kept a file on you since the fourth visit. It began as habit. It stopped being habit around visit twenty and I continued anyway, which means it became something else. I've known what that something else was for a year and declined to write it down.",
        "My brother used to say that a thing not said out loud hasn't happened. He said a great many things and most of them were nonsense. That one's been sitting in my head since he died like a splinter.\n\nI'm inclined to think he was right, which is intolerable, and which is why I'm doing this rather than continuing to be extremely comfortable.",
        "I love you.\n\nI have no supporting data. There's no measurement I could take that would demonstrate it and I've looked for one. I spent two months looking for one, which I'm telling you because it's the most honest thing I know about myself.\n\nIt's simply true and it's not going to stop being true, and I've said it out loud, so now it's happened.",
      ],
      choice: {
        prompt:
          "Take whatever time you require. I'm extremely good at intervals.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "Repeat that.\n\n*You do.*\n\nAgain. I'm attempting to record it accurately and I'm failing, which doesn't happen.\n\n*And then, thirty seconds later, he's in the doorway, having run, plainly, which he doesn't do, and he crosses the room and takes hold of you with a complete absence of technique, and it's the least clinical thing that has ever happened in Mortkranken.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Understood. That's a reasonable request and I would've made the same one.\n\nI want to state, so that it's unambiguous: nothing in my behavior is contingent on your answer. I'll continue to check on you. I'll continue to be at the lower theater at eleven. I would've done both of those things regardless and did, for eight months, while refusing to label the term.\n\nThe pen stays in the case on the bench. You know where they are.",
          },
        ],
      },
      keepsake: {
        emoji: "🗒️",
        line: "The one message in the whole file with no observation in it.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "He's writing in an incubation log and barely spares you a glance. His mask is pulled down to his chin, forgotten.",
        approach: "Interrupt him with a question",
        greeting: '"I don\'t like unproductive discussions. Like this one."',
        responses: {
          kind: ["Be patient with him", "Apologize and wait your turn"],
          playful: ["Try to lighten the mood", "Ask if this counts as one"],
          bold: ["Be direct with him", "Ask your question anyway"],
          neutral: ["Let him finish the log", "Wait in silence"],
        },
      },
      {
        line: '"Examination or errand?" he asks. "If it\'s an errand, please wait. I\'m busy."',
        approach: "State your business",
        greeting:
          '"Symptoms first, please. Pleasantries slow the diagnosis down."',
        responses: {
          kind: [
            "Thank him and leave him to it",
            "List your symptoms politely",
          ],
          playful: ["Crack a joke mid-exam", "Say your symptom is boredom"],
          bold: ["Give it to him straight", "Skip straight to the point"],
          neutral: ["Say only the facts", "Hand over your chart"],
        },
      },
      {
        line: '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
        approach: "Wait to be assessed",
        greeting:
          "\"Could you sit down? I'm going to take your pulse. You can breathe normally, it isn't a test.\"",
        responses: {
          kind: ["Answer him honestly", "Sit down as asked"],
          playful: ["Hold your breath anyway", "Ask if nervous counts"],
          bold: ["Tell him to skip the check", "Hold out your wrist first"],
          neutral: ["Give him quiet", "Breathe normally, say nothing"],
        },
      },
      {
        line: '"You\'re new," he says, not looking up. "Please try not to die before your first check-up. The paperwork is annoying."',
        approach: "Promise not to die",
        greeting:
          '"Good. Please come by Mortkranken this week so I can confirm it."',
        responses: {
          kind: ["Promise to be careful", "Promise to stay in one piece"],
          playful: ["Joke about dying anyway", "Ask if a pulse is enough"],
          bold: ["Say you'll come by tomorrow", "Ask him to name the day"],
          neutral: ["Stay, say nothing", "Agree to drop by"],
        },
      },
      {
        line: "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
        approach: "Don't touch anything",
        greeting:
          '"You kept your hands to yourself. Most people touch the jars, and then they faint. That\'s inconvenient."',
        responses: {
          kind: ["Respect the sterile space", "Keep your hands to yourself"],
          playful: ["Be deliberately unhelpful", "Ask which jar is worst"],
          bold: ["Touch something anyway", "Say you won't faint"],
          neutral: ["Stand still, say nothing", "Keep a careful distance"],
        },
      },
    ],
    known: [
      {
        line: "He knows your name now. He uses it like a chart heading.",
        approach: "Let him use your name",
        greeting: '"Your color\'s better than last week."',
        responses: {
          kind: ["Say it's nice to be known", "Thank him for noticing"],
          playful: [
            "Ask what else is on the chart",
            "Tease the chart-heading tone",
          ],
          bold: ["Say of course he knows it", "Ask him to use it more"],
          neutral: ["Take the naming plainly", "Say nothing about it"],
        },
      },
      {
        line: "The dismissal doesn't come. He simply keeps working while you're there.",
        approach: "Loiter usefully",
        greeting:
          "\"If you're staying, could you hold this? Please don't look at what's in it.\"",
        responses: {
          kind: ["Say you don't mind waiting", "Offer to help while there"],
          playful: ["Loiter uselessly on purpose", "Peek at what's in it"],
          bold: ["Take it without question", "Ask what you're holding"],
          neutral: ["Stay quietly, out of the way", "Say nothing, just stay"],
        },
      },
      {
        line: "\"You're not squeamish,\" he observes. From him that's a character reference.",
        approach: "Take it as a compliment",
        greeting:
          "\"Most people are squeamish. Yes, it was a compliment. I don't give them often, so I wasn't sure it came across.\"",
        responses: {
          kind: [
            "Say specimens don't bother you",
            "Take the compliment kindly",
          ],
          playful: ["Ask what would spook him", "Act scandalized for effect"],
          bold: ["Say nothing rattles you", "Challenge him to try harder"],
          neutral: ["Shrug at the observation", "Let the comment pass"],
        },
      },
      {
        line: '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
        approach: "Pay attention",
        greeting:
          "\"You're still listening. Most people leave at that part. I don't know why.\"",
        responses: {
          kind: ["Listen without judgment", "Say you get the reasoning"],
          playful: ["Ask for the ethics lecture", "Ask if that was a joke"],
          bold: [
            "Push back on the ethics of it",
            "Ask him to justify it properly",
          ],
          neutral: [
            "Take the explanation, move on",
            "Say nothing, just listen",
          ],
        },
      },
      {
        line: 'You nod off waiting for him and wake to two fingers at your wrist. "Oh, you\'re alive."',
        approach: "Assure him you're alive",
        greeting:
          '"I know. I took your pulse before I asked. People seem to prefer being asked."',
        responses: {
          kind: ["Thank him for checking", "Say you feel rested now"],
          playful: ["Pretend to still be dead", "Ask if he was worried"],
          bold: ["Ask what your pulse was", "Say he can check anytime"],
          neutral: ["Nod, still half-asleep", "Stretch, say nothing"],
        },
      },
      {
        line: "He's frowning at an attendance sheet. \"They marked me absent again. I was there. Apparently I'm supposed to answer when they say my name.\"",
        approach: "Offer to nudge him next time",
        greeting:
          '"I never notice my own name at roll call. I always notice yours, for some reason."',
        responses: {
          kind: ["Say it's an easy mistake", "Say you saw him there"],
          playful: ["Call his name to test him", "Quiz him on his own name"],
          bold: ["Say you'll cue him every time", "Say you notice his too"],
          neutral: ["Nod, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He's pulling on his coat. \"Yuri's holed up in the lab, so I'm going out. If he calls for me, tell him I'm with a patient.\"",
        approach: "Agree to cover for him",
        greeting:
          "\"He sends me out on errands often enough that he'll assume this is one. I'll be back when it's done.\"",
        responses: {
          kind: ["Promise to cover for him", "Tell him to get some air"],
          playful: ["Ask where he's really going", "Offer him a better alibi"],
          bold: ["Ask to go with him", "Say you'll answer Yuri for him"],
          neutral: ["Nod, say nothing", "Let him slip out"],
        },
      },
      {
        line: "He's rearranged the appointment log so your slot always comes first. He'd call it coincidence.",
        approach: "Call him out",
        greeting:
          "\"It isn't favoritism. You arrive first, so you're seen first.\"",
        responses: {
          kind: [
            "Say you don't mind either way",
            "Thank him for the efficiency",
          ],
          playful: [
            "Call it exactly what it is",
            "Tease the 'coincidence' line",
          ],
          bold: ["Name it as favoritism outright", "Ask him to just admit it"],
          neutral: [
            "Let him call it coincidence",
            "Say nothing about the slot",
          ],
        },
      },
      {
        line: '"The last patient had something contagious. Probably." He hands you a mask before you ask for one.',
        approach: "Take the mask",
        greeting:
          '"It\'s probably nothing. If you start coughing blood, come back. Before dinner, ideally."',
        responses: {
          kind: ["Thank him for the mask", "Take it without question"],
          playful: [
            "Ask how contagious, exactly",
            "Fake a cough and watch him",
          ],
          bold: ["Take it without asking why", "Say you're not worried"],
          neutral: ["Put it on, say nothing", "Take it, say nothing"],
        },
      },
      {
        line: "He glances at the clock, then at you, then back at the clock, recalculating something.",
        approach: "Ask what he's timing",
        greeting: [
          "\"I've been timing how long you stay. It's longer each visit. I haven't worked out why.\"",
        ],
        responses: {
          kind: ["Tell him you don't mind", "Say you like to stay late"],
          playful: ["Ask for the results so far", "Ask if you're the variable"],
          bold: ["Say he already knows why", "Promise to stay even longer"],
          neutral: ["Nod and stay where you are", "Say nothing and stay put"],
        },
      },
      {
        line: '"Yuri asked why I keep the light on later than I need to," he says. "I told him it wasn\'t relevant to his question."',
        approach: "Ask what the real answer is",
        greeting:
          "\"I don't sleep much anyway. You tend to come by after dark. That's all it is.\"",
        responses: {
          kind: ["Ask gently why it's on late", "Say you don't need an answer"],
          playful: [
            "Guess the real answer yourself",
            "Tease him about dodging Yuri",
          ],
          bold: ["Ask him to just say why", "Push past the deflection"],
          neutral: ["Let it go unremarked", "Don't press for more"],
        },
      },
      {
        line: "He's added a line to your chart that isn't a symptom. He won't say what it says.",
        approach: "Ask what he wrote",
        greeting: "\"It isn't a symptom. That's all you need to know.\"",
        responses: {
          kind: [
            "Let him keep the note private",
            "Say you trust it's nothing bad",
          ],
          playful: ["Guess what he wrote", "Demand to read the chart"],
          bold: ["Ask him outright what it says", "Take the chart and look"],
          neutral: ["Let it go unremarked", "Say nothing about the line"],
        },
      },
      {
        line: '"You ask surprisingly good questions," he says, and makes a note of it.',
        approach: "Ask an even better question",
        greeting:
          "\"...That one I didn't see coming. I don't have an answer yet. Give me a moment. I'd like to get it right.\"",
        responses: {
          kind: ["Thank him for saying so", "Say you're glad he noticed"],
          playful: ["Time him while he thinks", "Look far too pleased"],
          bold: ["Say his questions are good", "Say you meant to stump him"],
          neutral: ["Take the comment plainly", "Shrug, move on"],
        },
      },
    ],
    warm: [
      {
        line: "He puts down his notes when he hears you. There's a shift in his expression: focused, but this time on you.",
        approach: "Let him look",
        greeting:
          '"I stopped writing when you came in. I didn\'t decide to. It just happened."',
        responses: {
          kind: ["Let him look, say nothing", "Say you don't mind the look"],
          playful: ["Ask what he's diagnosing", "Ask if you're in his notes"],
          bold: ["Hold his gaze back", "Say it can keep happening"],
          neutral: ["Sit, unbothered", "Let him study you"],
        },
      },
      {
        line: '"Sit," he says, gesturing at the chair he\'s apparently started leaving clear.',
        approach: "Sit in the chair he cleared",
        greeting:
          "\"How are you sleeping? I don't, so I'm asking for comparison.\"",
        responses: {
          kind: ["Sit down, thank him", "Answer about your sleep"],
          playful: ["Ask if it's just for you", "Ask how he'd compare"],
          bold: ["Sit like it's expected", "Ask when he last slept"],
          neutral: ["Sit without comment", "Say you sleep fine"],
        },
      },
      {
        line: 'He\'s favoring one side. "One of my sutures tore. I should get back to Mortkranken. Yuri will have to redo it."',
        approach: "Offer to walk him back",
        greeting:
          '"If you want. It\'s only a tear. Yuri will complain the whole time he sutures it."',
        responses: {
          kind: ["Offer to walk him back", "Offer your arm for support"],
          playful: [
            "Tease him about the sutures",
            "Promise to out-complain Yuri",
          ],
          bold: ["Insist on walking with him", "Tell him to lean on you"],
          neutral: ["Walk along, say nothing", "Carry his things back"],
        },
      },
      {
        line: "You jump at a noise from the specimen room, and he laughs. It's short, and he doesn't seem to know he did it.",
        approach: "Ask what's so funny",
        greeting:
          "\"It was the ventilation. You thought it was a ghost. That's funny, isn't it?\"",
        responses: {
          kind: ["Enjoy the laugh with him", "Laugh along with him"],
          playful: ["Insist it was a ghost", "Say the ghost laughed too"],
          bold: ["Point out how rare it is", "Tell him to laugh more often"],
          neutral: ["Let the laugh pass quietly", "Pretend nothing happened"],
        },
      },
      {
        line: "He's short with everyone in the ward today. Not with you. He noticed that too.",
        approach: "Ask what's wrong",
        greeting:
          "\"Nothing. People keep telling me I was rude today. You haven't. That's restful.\"",
        responses: {
          kind: ["Ask gently what's wrong", "Say you'll stay a while"],
          playful: ["Ask what everyone else did", "Ask how rude he was"],
          bold: ["Say he's not fine either", "Tell him to apologize to them"],
          neutral: ["Let it go unremarked", "Sit and keep it restful"],
        },
      },
      {
        line: '"Does it actually hurt, or are you being stoic for my benefit," he asks. "Answer honestly. I can tell."',
        approach: "Answer him honestly",
        greeting:
          "\"Thank you. I'll give you something mild. You don't have to be brave in here. It doesn't help the reading.\"",
        responses: {
          kind: ["Answer honestly, gently", "Tell him where it hurts"],
          playful: ["Try to hide it anyway", "Ask for the strong stuff"],
          bold: ["Say yes, plainly", "Say you're not being brave"],
          neutral: ["Give a flat answer", "Point to the sore spot"],
        },
      },
      {
        line: '"Your face looks terrible," he says, without softening it at all. "Come here and inhale this. Mild smelling salts."',
        approach: "Match his bluntness",
        greeting:
          "\"I'm aware. Mine always looks like this. Yours usually doesn't.\"",
        responses: {
          kind: ["Sit down, no argument", "Inhale the salts, thank him"],
          playful: ["Agree, dramatically", "Wince dramatically at salts"],
          bold: ["Say he looks tired too", "Tell him his face is fine"],
          neutral: ["Sit down, say nothing", "Take the salts, say nothing"],
        },
      },
      {
        line: "The tin of confections you liked last time is on the counter again, refilled, with the lid already off.",
        approach: "Ask if he made them",
        greeting:
          "\"I did. It's like measuring out medication, only nobody's life depends on it. I find that relaxing.\"",
        responses: {
          kind: ["Thank him for making them", "Say they're really good"],
          playful: ["Ask for the recipe", "Ask if any are poisoned"],
          bold: ["Say he made them for you", "Ask him to make more"],
          neutral: ["Take one, say nothing", "Eat one quietly"],
        },
      },
      {
        line: 'You hold out a rice ball. He studies it the way he studies a sample. "I suppose I might be able to eat some of it."',
        approach: "Watch him try it",
        greeting:
          "\"...Two bites. That's more than yesterday. You don't have to look so pleased.\"",
        responses: {
          kind: ["Tell him to take his time", "Say two bites is progress"],
          playful: ["Count the bites out loud", "Cheer for the third bite"],
          bold: ["Tell him to finish it", "Say you'll bring another"],
          neutral: ["Watch, say nothing", "Let him eat in peace"],
        },
      },
      {
        line: "He checks your pulse longer than the reading requires and doesn't comment on it.",
        approach: "Let the reading run long",
        greeting:
          '"Seventy-two. I counted twice. The second count wasn\'t necessary."',
        responses: {
          kind: ["Let him take his time", "Thank him for the care"],
          playful: ["Ask if that's still medical", "Ask for a third count"],
          bold: ["Call out the long reading", "Ask why he counted twice"],
          neutral: ["Let the reading run long", "Keep your wrist still"],
        },
      },
      {
        line: '"I\'ve moved your usual time to before Yuri starts his rounds," he says. "It\'s more efficient. That\'s the only reason."',
        approach: "Take the earlier slot",
        greeting:
          "\"It also means Yuri isn't there to shout. That's a secondary benefit.\"",
        responses: {
          kind: ["Thank him for the earlier slot", "Say you'll never be late"],
          playful: ["Ask if Yuri knows", "Ask how loud Yuri gets"],
          bold: ["Say it's obviously for you", "Say that's not the only one"],
          neutral: ["Take the slot, say nothing", "Nod at the new time"],
        },
      },
      {
        line: "He's memorized your allergy list without being told twice. He remembers most things once.",
        approach: "Ask what else he's memorized",
        greeting:
          '"Your blood type. Your resting pulse. That you hum on the stairs. Some of it isn\'t medical."',
        responses: {
          kind: ["Say that means a lot", "Say you're glad he noticed"],
          playful: ["Test what else he remembers", "Hum for him right now"],
          bold: ["Say of course he remembers", "Ask what else isn't medical"],
          neutral: ["Shrug, say nothing", "Let the list stand"],
        },
      },
      {
        line: '"You didn\'t flinch that time," he notes, of the needle. "I\'m recording that as progress."',
        approach: "Take the credit anyway",
        greeting: "\"That's fine. It's your arm. I only held the needle.\"",
        responses: {
          kind: ["Take the progress kindly", "Thank him for a gentle hand"],
          playful: ["Take way too much credit", "Ask for a sticker anyway"],
          bold: ["Say you've always been brave", "Say he deserves some credit"],
          neutral: ["Take the note plainly", "Roll your sleeve back down"],
        },
      },
      {
        line: "He's left a mug of herbal tea by your usual seat, unasked. It smells bitter.",
        approach: "Drink it without asking",
        greeting:
          '"I brewed it. It tastes better than Frostheim\'s, so please drink all of it."',
        responses: {
          kind: ["Drink it, thank him", "Say it's the best tea"],
          playful: [
            "Ask what's actually in it",
            "Promise not to tell Frostheim",
          ],
          bold: ["Drink it without asking", "Finish it in one go"],
          neutral: ["Drink it, say nothing", "Sip it slowly"],
        },
      },
      {
        line: '"Yuri says I\'m playing favorites with your check-ups," he says. "I\'ve informed him he\'s incorrect. Repeatedly."',
        approach: "Ask if Yuri's right",
        greeting:
          "\"He isn't. Your check-ups take longer because you ask questions. That's all.\"",
        responses: {
          kind: ["Say Yuri might have a point", "Say you'll keep asking them"],
          playful: ["Side with Yuri, teasingly", "Ask a question right now"],
          bold: ["Say Yuri's right, plainly", "Say it's more than questions"],
          neutral: ["Stay out of it", "Let him have the last word"],
        },
      },
      {
        line: "He's stopped writing down your visits as check-ups in the log. He hasn't told you what he writes instead.",
        approach: "Ask him what he wrote",
        greeting: "\"'Visit.' Just visit. There wasn't a better category.\"",
        responses: {
          kind: ["Let him keep the log private", "Say 'visit' sounds right"],
          playful: ["Guess what he calls it now", "Suggest a better category"],
          bold: ["Demand to see the log", "Ask what it should say"],
          neutral: ["Let it go unremarked", "Accept the category"],
        },
      },
      {
        line: '"Don\'t skip lunch to sit with me," he says. "I\'ve noticed you doing that. Stop."',
        approach: "Promise to eat properly",
        greeting:
          "\"Good. I'll know if you don't. I can barely eat, so I notice when other people skip it.\"",
        responses: {
          kind: ["Promise to eat properly", "Promise, and mean it"],
          playful: ["Point out the double standard", "Offer to eat for two"],
          bold: ["Say he should eat too", "Say you'll watch him eat too"],
          neutral: ["Nod, say nothing", "Agree without argument"],
        },
      },
      {
        line: "He's quieter than usual today, and lets you notice, which from him is the whole confession.",
        approach: "Ask what's wrong",
        greeting:
          "\"Nothing is wrong. I didn't sleep. I usually don't, but today I noticed.\"",
        responses: {
          kind: ["Ask gently what's wrong", "Offer to sit with him"],
          playful: [
            "Guess what's bothering him",
            "Offer a very boring lecture",
          ],
          bold: ["Push him to say it outright", "Tell him to rest now"],
          neutral: ["Sit quietly with him", "Keep him quiet company"],
        },
      },
    ],
    spark: [
      {
        line: "He tilts your chin to check something, and the examination stops being one.",
        approach: "Hold still",
        greeting:
          "\"Hold still. ...I've forgotten what I was checking. That hasn't happened before.\"",
        responses: {
          kind: ["Let him take your pulse", "Let him take his time"],
          playful: ["Fluff the pulse count", "Remind him, wrongly"],
          bold: ["Tell him to drop the act", "Say he wasn't checking"],
          neutral: ["Let it stay a diagnosis", "Stay perfectly still"],
        },
      },
      {
        line: '"Pulse is elevated," he notes, with his fingers still on your wrist. "Interesting."',
        approach: "Confirm it",
        greeting:
          "\"Then it isn't the cuff, or the walk over. I'll write down the real cause.\"",
        responses: {
          kind: ["Confirm what he asked", "Admit it's because of him"],
          playful: ["Ask what else he's confirming", "Ask what he'll write"],
          bold: ["Confirm it boldly", "Tell him to write it down"],
          neutral: ["Say nothing, let him note it", "Let him write in silence"],
        },
      },
      {
        line: "He sets the stethoscope around his neck and doesn't reach for it. The bedside manner has gone somewhere else entirely.",
        approach: "Sit on the table",
        greeting:
          '"Thank you. I\'m going to listen to your heart now. ...You can stop holding your breath."',
        responses: {
          kind: ["Let him have the moment", "Let out the breath"],
          playful: ["Take the clipboard away", "Ask what your heart says"],
          bold: ["Close the distance yourself", "Pull him closer to listen"],
          neutral: ["Sit back down", "Breathe slowly for him"],
        },
      },
      {
        line: '"I\'m aware this isn\'t an examination anymore," he says, unhurried. "I\'m not stopping."',
        approach: "Let him continue",
        greeting:
          '"Tell me if you want me to stop. I\'d rather have the data than guess."',
        responses: {
          kind: ["Let him continue gently", "Say you don't want him to"],
          playful: ["Dare him to keep going", "Say you'll let him know"],
          bold: ["Close the last inch", "Tell him not to stop"],
          neutral: ["Say nothing", "Answer with a nod"],
        },
      },
      {
        line: "He stands close enough that the clipboard is doing nothing but occupying his hands.",
        approach: "Let him relax",
        greeting:
          "\"I don't know what to do with my hands when I'm not examining you. That's new.\"",
        responses: {
          kind: ["Tell him it's alright", "Guide his hand gently"],
          playful: ["Offer him your wrist", "Suggest he examine you"],
          bold: ["Take his hands in yours", "Put his hand on your cheek"],
          neutral: ["Let the silence answer", "Stay close, say nothing"],
        },
      },
    ],
    close: [
      {
        line: 'He steps closer, his eyes direct. "If I lost you it would be a significant problem. Factor that in."',
        approach: "Say the true thing",
        greeting:
          '"Thank you. I remember most things once. I\'ll remember that one on purpose."',
        responses: {
          kind: ["Say you feel the same", "Say it again for him"],
          playful: ["Ask for the math on that", "Ask if he'll quiz you on it"],
          bold: ["Match his bluntness", "Give him more to remember"],
          neutral: ["Let the statement land quietly", "Let the moment settle"],
        },
      },
      {
        line: "He checks you over without being asked, and doesn't pretend it's professional.",
        approach: "Let him check you over",
        greeting:
          "\"Come here. Let me see. ...You're fine. I'm going to check again anyway.\"",
        responses: {
          kind: ["Let him take care of you", "Let him check twice"],
          playful: ["Poke at his bedside manner", "Ask for a third opinion"],
          bold: ["Let him worry, say so", "Say you'll check him too"],
          neutral: ["Sit through the examination", "Hold still for round two"],
        },
      },
      {
        line: '"Tell me where it hurts," he says. He doesn\'t mean physically.',
        approach: "Tell him where it hurts",
        greeting:
          "\"I can't prescribe anything for that. I'll stay instead. That's the treatment.\"",
        responses: {
          kind: ["Tell him gently", "Thank him for staying"],
          playful: [
            "Deflect with a joke first",
            "Ask how long treatment lasts",
          ],
          bold: ["Ask where it hurts for him", "Tell him to stay all night"],
          neutral: ["Be patient with his silence", "Lean on him quietly"],
        },
      },
      {
        line: "The efficiency drops. What's underneath is warm, and stubbornly protective.",
        approach: "See what's underneath",
        greeting:
          '"If something happens to you, I\'m the one who has to fix it. So nothing is going to happen to you."',
        responses: {
          kind: ["Let him be warm, say nothing", "Promise to be careful"],
          playful: ["Diagnose him right back", "Ask if that's a prescription"],
          bold: ["Ask him to stop working", "Say the same goes for him"],
          neutral: ["Let the ward go quiet", "Let the promise stand"],
        },
      },
      {
        line: "He's stopped triaging the room. There's just you, and the focus he usually reserves for a chart.",
        approach: "Go to him",
        greeting:
          "\"You're the one case I wouldn't hand off to Yuri. He'd only experiment on you.\"",
        responses: {
          kind: ["Tell him plainly he matters", "Say you trust only him"],
          playful: ["Tease him in front of the ward", "Ask what Yuri would do"],
          bold: ["Say you're the only case", "Tell him to never hand off"],
          neutral: ["Let him focus, say nothing", "Stay under his care"],
        },
      },
    ],
    bound: [
      {
        line: "He's blunt about wanting you, which turns out to be extraordinarily effective.",
        approach: "Give him that look",
        greeting:
          '"You\'re looking at me like that again. I looked it up. I know what it means now."',
        responses: {
          kind: ["Let him have the moment", "Ask what he found out"],
          playful: ["Give him the look on purpose", "Ask for his sources"],
          bold: ["Meet the bluntness in kind", "Tell him to act on it"],
          neutral: ["Say nothing", "Keep looking at him"],
        },
      },
      {
        line: "He pins your chart to the board, then pins you to the door. Efficient, as ever.",
        approach: "Lock the door",
        greeting:
          "\"Thank you. If Yuri calls for me, I'm not answering. It's annoying when I do.\"",
        responses: {
          kind: ["Let him lock it", "Tell him Yuri can wait"],
          playful: ["Steal the clipboard", "Cover his ears for him"],
          bold: ["Lock the door yourself", "Tell Yuri he's busy"],
          neutral: ["Wait, say nothing", "Let Yuri call, say nothing"],
        },
      },
      {
        line: '"I don\'t waste time," he says against your jaw. "You should know that by now."',
        approach: "Come closer",
        greeting:
          '"Closer. I can still see the floor between us. That\'s inefficient."',
        responses: {
          kind: ["Let him have this", "Step in close"],
          playful: ["Diagnose him back", "Leave an inch, to tease"],
          bold: ["Pull him in by the coat", "Close the gap entirely"],
          neutral: ["Let it happen quietly", "Let him close it"],
        },
      },
      {
        line: '"I wanted this before I should have," he says, matter-of-fact. "Poor professional conduct. I\'ve made peace with it."',
        approach: "Call it worth it",
        greeting: '"I love you. That\'s the diagnosis. Treatment is ongoing."',
        responses: {
          kind: ["Say it back plainly", "Say you love him too"],
          playful: ["Ask about the treatment", "Ask for a second opinion"],
          bold: ["Tell him not to be patient", "Say the treatment's forever"],
          neutral: ["Sit on the table quietly", "Hold his hand quietly"],
        },
      },
      {
        line: "He checks you over every morning. It stopped being medical a long time ago.",
        approach: "Stay",
        greeting:
          "\"It's been a long time since I had a family. I don't know what you're supposed to do in the mornings. Could you teach me?\"",
        responses: {
          kind: ["Say you'll teach him", "Say you'll learn it together"],
          playful: ["Ask for a longer checkup", "Say lesson one is breakfast"],
          bold: ["Show him, starting now", "Kiss him good morning"],
          neutral: ["Stay, say nothing", "Stay close, say nothing"],
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two labels had no genuine beat match ("Tell him to sleep too", "Let him
  // check you over") and were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Symptoms or errand." **{name}** doesn\'t slow down for {user}. "Pick one."',
      '{user} says the name, and **{name}** revises his estimate of the walk. "...Fine. Two minutes."',
      '"You got that from a silhouette." **{name}** tells {user} it was efficient.',
    ],
    warm: [
      "**{name}** stops for {user}.",
      '"Sit down before you fall down." **{name}** has been watching how {user} walks.',
      "{user} calls out, and **{name}** postpones the thing he was on his way to.",
    ],
    spark: [
      "**{name}** looks at {user} a full second longer than any diagnosis requires.",
      '"When did you last sleep?" **{name}** asks {user}. "Don\'t lie. I\'ll know."',
      "{user} got there first, and **{name}** files that somewhere he doesn't file work.",
    ],
    close: [
      '"I don\'t waste time," **{name}** says, reaching {user} in about four strides.',
      "**{name}** hears {user} and hands the **{house}** chart to whoever is nearest.",
      "{user} calls, and **{name}** is abruptly off shift.",
    ],
    bound: [
      '"That\'s the diagnosis," **{name}** tells {user}. "Treatment is ongoing."',
      '**{name}** smiles at {user}, on purpose this time. "You told me to practice."',
      "{user} says the name, and **{name}** lets Yuri shout for him. Let him shout.",
    ],
  },
};
