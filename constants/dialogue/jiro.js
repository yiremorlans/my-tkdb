export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jiro writes like a chart entry —
  // observations, no adjectives, no greeting. The arc is a boy who has replaced
  // every feeling with a measurement slowly running out of measurements, and the
  // intimacy is that he keeps recording you anyway, long after there is any
  // clinical reason to.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: This is Jiro from Mortkranken. Your number is on the patient list.\n\nYour last examination left one reading I want to take again. Not urgent, but I'm making a follow-up slot for this week. Just reply with your preferred day and time",
        "I run the health check-ups here. Yuri is too busy to manage scheduling, so I do it.\n\n{timesMet} visits on your file and the record from your last reading requires a conclusive follow-up. I could have flagged this the next time you were in, but this is more efficient.",
      ],
      choice: {
        prompt: "Pick a day and the slot is yours.",
        options: [
          {
            key: "kind",
            label: "Confirm it, and thank him",
            style: 3,
            close:
              "Noted. The slot is held.\n\nMake sure you arrive 10 minutes early or else I won't have enough time for full examination.",
          },
          {
            key: "playful",
            label: "Ask which reading it was",
            style: 1,
            close:
              "Resting pulse. High once, which is usually the cuff or the walk over.\n\nI'm re-checking it anyway.",
          },
          {
            key: "bold",
            label: "Ask why he texted instead",
            style: 4,
            close:
              "I told you. It's more efficient than having to request a follow-up appointment during a walk-in.\n\nThe follow-up is on the day you picked. You can wear whatever is convenient for you. You'll be taking it off anyway",
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
        "I redid it. It had closed badly and would've scarred.\n\nYou were on campus, not far from Mortkranken, and treated it yourself anyway. That was a decision, not a mission constraint. The wrong one.\n\nI'm not interested in why. Only that it doesn't happen again.",
        "You apologized for not coming in. Not for the decision itself.\n\nYour response to me was {favResponse}, same as always. You treat your own condition as a footnote.\n\nI'd like that changed.",
      ],
      choice: {
        prompt: "Tell me if that's something you can manage.",
        options: [
          {
            key: "kind",
            label: "Promise to be more careful",
            style: 3,
            close:
              "Noted. A commitment, not a fact. I dislike the uncertainty in it.\n\nI'll check weekly if necessary.",
          },
          {
            key: "playful",
            label: "Ask if he'd notice",
            style: 1,
            close:
              "I'd notice immediately. I noticed the first time, before Yuri did.\n\nNot something I'm proud of. Simply what happened.",
          },
          {
            key: "bold",
            label: "Tell him to stop worrying",
            style: 4,
            close:
              "I'm not worried.\n\nWhat I have is a concern, quantified: you keep treating yourself as expendable. It won't always end well. Don't make me right.",
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
        "*The room is dark except for one lamp. On the bench is a wooden case, old, clearly not medical, and he opens it without preamble.*\n\n*Inside is a set of children's calligraphy brushes.*\n\n> These are my brother's. He's dead. He died here last year and I've kept them in a drawer since and never once opened it.",
        "> I don't know why I keep them. I've written the reasoning out three times and it doesn't resolve. Sentiment isn't a category I have any facility with.\n\n> But I found myself wanting you to have seen them, and that impulse didn't resolve either. I've stopped attempting to resolve things where you're concerned. The failure rate is one hundred percent.",
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
              "> Terrible. Genuinely terrible. He was told so repeatedly and it never once landed.\n\n*Something almost moves at the corner of his mouth.*\n\n> I haven't said that out loud since he died. It's still funny. I'd assumed it would've stopped being funny.",
          },
          {
            key: "bold",
            label: "Ask him to use one",
            style: 4,
            close:
              "> No.\n\n*Then he sits down, and takes one out, and holds it for a very long time without doing anything with it.*\n\n> ...If you stay,\n\n*he says eventually, not looking up,*\n\n> I'll try. I've found I can attempt things in front of you that I can't attempt alone. I have no explanation for that and I've stopped looking for one.",
          },
        ],
      },
      keepsake: {
        emoji: "🖌️",
        line: "A set of children's brushes carried through four moves.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: I'm going to state something and I'd prefer you not to characterize it as a complaint.",
        "The captain's treatments aren't treatments. I'm aware. I've been aware since the first one.\n\nI permit them because the data is genuinely valuable, because he would find someone less able to tolerate it, and because he doesn't have anybody else. Those are three reasons and I've never needed a fourth.",
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
              "Yes.\n\n*One word, immediate, without a single qualifier attached to it, which from Jiro is the most naked thing he has ever done.*\n\nNobody has asked that. In four years, nobody has asked the pain question. They ask about the results.",
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
            label: "Tell him to refuse the next",
            style: 4,
            close:
              "That's not a variable I control.\n\n*A long silence.*\n\nThat's a lie. It's entirely a variable I control and I've never once exercised it.\n\nI'll consider it. That's a larger statement than it appears and I'd appreciate it not being repeated.",
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
              "Understood. That's a reasonable request and I would've made the same one.\n\nI want to state, so that it's unambiguous: nothing in my behavior is contingent on your answer. I'll continue to check on you. I'll continue to be at the lower theater at eleven. I would've done both of those things regardless and did, for eight months, while refusing to label the term.\n\nThe brushes stay in the case on the bench. You know where they are.",
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
        line: "He's focused on his work, barely acknowledging you with a glance. Pure efficiency.",
        approach: "Interrupt him with a question",
      },
      {
        line: '"Symptoms or errand," he says. "Pick one. I\'m busy."',
        approach: "State your business",
      },
      {
        line: '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
        approach: "Wait to be assessed",
      },
      {
        line: '"You\'re new," he says, not looking up. "Try not to die on my watch."',
        approach: "Promise not to die",
      },
      {
        line: "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
        approach: "Don't touch anything",
      },
    ],
    known: [
      {
        line: "He knows your name now. He uses it like a chart heading.",
        approach: "Let him use your name",
      },
      {
        line: "The dismissal doesn't come. He simply keeps working while you're there.",
        approach: "Loiter usefully",
      },
      {
        line: "\"You're not squeamish,\" he observes. From him that's a character reference.",
        approach: "Take it as a compliment",
      },
      {
        line: '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
        approach: "Pay attention",
      },
      {
        line: "There's a stool by the door that wasn't there before.",
        approach: "Sit on the new stool",
      },
      {
        line: "He flips your chart to the correct page without looking up. It's not a scolding. It's just correct.",
        approach: "Let him flip to the right page",
      },
      {
        line: '"You came back," he says, like he\'s confirming a hypothesis rather than greeting you.',
        approach: "Confirm the hypothesis",
      },
      {
        line: "He's rearranged the appointment log so your slot always comes first. He'd call it coincidence.",
        approach: "Call him out",
      },
      {
        line: '"The last patient had something contagious. Probably." He hands you a mask before you ask for one.',
        approach: "Take the mask",
      },
      {
        line: "He glances at the clock, then at you, then back at the clock, recalculating something.",
        approach: "Ask what he's timing",
      },
      {
        line: '"Yuri asked why I keep the light on later than I need to," he says. "I told him it wasn\'t relevant to his question."',
        approach: "Ask what the real answer is",
      },
      {
        line: "He's added a line to your chart that isn't a symptom. He won't say what it says.",
        approach: "Ask what he wrote",
      },
      {
        line: '"You ask surprisingly good questions," he says, like it\'s mildly inconvenient data.',
        approach: "Ask an even better question",
      },
    ],
    warm: [
      {
        line: "He puts down his notes when he hears you. There's a shift in his expression: focused, but this time on you.",
        approach: "Let him look",
      },
      {
        line: '"Sit," he says, gesturing at the chair he\'s apparently started leaving clear.',
        approach: "Sit in the chair he cleared",
      },
      {
        line: 'He\'s favoring one side. "Sutures pulled loose. I should get back to Mortkranken. Yuri needs to redo them."',
        approach: "Offer to walk him back",
      },
      {
        line: "The laugh escapes before he can stop it. It's an unfairly good laugh.",
        approach: "Make him laugh again",
      },
      {
        line: "He's short with everyone in the ward today. Not with you. He noticed that too.",
        approach: "Ask what's wrong",
      },
      {
        line: '"Does it actually hurt, or are you being stoic for my benefit," he asks. "Answer honestly. I can tell."',
        approach: "Answer him honestly",
      },
      {
        line: '"You look terrible," he says, without softening it at all. "Sit down."',
        approach: "Match his bluntness",
      },
      {
        line: "He's rearranged his shelf so the thing you always ask about is at eye level now.",
        approach: "Ask him about it",
      },
      {
        line: '"Eat something before you leave," he says, already holding out a rice ball he clearly didn\'t make for himself.',
        approach: "Take the rice ball",
      },
      {
        line: "He checks your pulse longer than the reading requires and doesn't comment on it.",
        approach: "Let the reading run long",
      },
      {
        line: '"I\'ve moved your usual time to before Yuri starts his rounds," he says. "It\'s more efficient. That\'s the only reason."',
        approach: "Take the earlier slot",
      },
      {
        line: "He's memorized your allergy list without being told twice. He remembers most things once.",
        approach: "Ask what else he's memorized",
      },
      {
        line: '"You didn\'t flinch that time," he notes, of the needle. "I\'m recording that as progress."',
        approach: "Take the credit anyway",
      },
      {
        line: "He's left a mug of something bitter and medicinal by your usual seat, unasked.",
        approach: "Drink it without asking",
      },
      {
        line: '"Yuri says I\'m playing favorites with your check-ups," he says. "I\'ve informed him he\'s incorrect. Repeatedly."',
        approach: "Ask if Yuri's right",
      },
      {
        line: "He's stopped writing down your visits as check-ups in the log. He hasn't told you what he writes instead.",
        approach: "Ask him what he wrote ",
      },
      {
        line: '"Don\'t skip lunch to sit with me," he says. "I\'ve noticed you doing that. Stop."',
        approach: "Promise to eat properly",
      },
      {
        line: "He's quieter than usual today, and lets you notice, which from him is the whole confession.",
        approach: "Ask what's wrong",
      },
    ],
    spark: [
      "He tilts your chin to check something, and the examination stops being one.",
      '"Pulse is elevated," he notes, with his fingers still on your wrist. "Interesting."',
      "The bedside manner has gone somewhere else entirely.",
      '"I\'m aware this isn\'t an examination anymore," he says, unhurried. "I\'m not stopping."',
      "He stands close enough that the clipboard is doing nothing but occupying his hands.",
    ],
    close: [
      'He steps closer, his eyes direct. "If I lost you it would be a significant problem. Factor that in."',
      "He checks you over without being asked, and doesn't pretend it's professional.",
      '"Tell me where it hurts," he says. He doesn\'t mean physically.',
      "The efficiency drops. What's underneath is warm, and stubbornly protective.",
      "He's stopped triaging the room. There's just you, and the focus he usually reserves for a chart.",
    ],
    bound: [
      "He's blunt about wanting you, which turns out to be extraordinarily effective.",
      "He pins your chart to the board, then pins you to the door. Efficient, as ever.",
      '"I don\'t waste time," he says against your jaw. "You should know that by now."',
      '"I wanted this before I should have," he says, matter-of-fact. "Poor professional conduct. I\'ve made peace with it."',
      "He checks you over every morning. It stopped being medical a long time ago.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"You\'re not qualified for this. Leave."',
      "\"If you're not bleeding, you're in the wrong room.\"",
      '"Don\'t touch anything. I mean it more than most people mean it."',
      '"State the problem. Skip the pleasantries, they slow the diagnosis."',
      '"I don\'t like unproductive discussions. Like this one."',
    ],
    known: [
      '"You again. Fine. Don\'t touch the tray."',
      '"You ask better questions than most. Marginally."',
      '"Sit. If you\'re going to loiter, loiter usefully."',
      '"There you are. I was about to come give you a health check. This is more efficient."',
      "\"I'll explain it once. Pay attention, I don't repeat myself.\"",
    ],
    warm: [
      '"You. Stay for a moment."',
      "\"Sit down before you fall down. I've seen the way you've been walking.\"",
      "\"When did you last sleep? Don't lie, I'll know.\"",
      "\"You're not an interruption. That's as warm as I get, so take it.\"",
      "\"People keep telling me that was rude. You didn't. That's... restful. Stay.\"",
    ],
    spark: [
      '"Hold still. This isn\'t a diagnosis and we both know it."',
      '"Your heart rate says something you haven\'t. Care to confirm it?"',
      "\"I'm blunt. So: I want you. That's the whole statement.\"",
      '"Sit on the table. Closer. No, I don\'t need the light."',
      '"That look. Do it again and I stop being professional."',
    ],
    close: [
      "\"I don't make exceptions. You're the exception. Don't make me say it twice.\"",
      '"Come here. Let me see. Humor me."',
      "\"You're the one case I'd never hand off to anyone else.\"",
      '"Tell me the truth. I can\'t fix a lie."',
      '"Ha! You get that laugh out of me every time. Don\'t tell anyone."',
    ],
    bound: [
      "\"Lock the door. I'm off shift and I've been patient all day.\"",
      '"I love you. That\'s the diagnosis. Treatment is ongoing."',
      '"Come here. No, closer than that. You know what I mean."',
      "\"You've got that look. I'm going to do something about that look.\"",
      '"Stay. The ward can burn. I\'ll write it up in the morning."',
    ],
  },
  approach: {
    spark: ["Hold still", "Confirm it", "Sit on the table", "Let him relax"],
    close: [
      "Go to him",
      "Let him check you over",
      "Tell him where it hurts",
      "Say the true thing",
    ],
    bound: ["Lock the door", "Come closer", "Give him that look", "Stay"],
  },
  responses: {
    kind: {
      new: [
        "Be patient with him",
        "Answer him honestly",
        "Thank him and leave him to it",
      ],
      spark: [
        "Confirm what he asked",
        "Let him take your pulse",
        "Tell him plainly, too",
      ],
      close: [
        "Tell him plainly he matters",
        "Tell him to sleep too",
        "Let him take care of you",
      ],
      bound: [
        "Say it back plainly",
        "Let him check you over",
        "Tell him to rest first",
      ],
    },
    playful: {
      new: [
        "Try to lighten the mood",
        "Crack a joke mid-exam",
        "Be deliberately unhelpful",
      ],
      spark: [
        "Make the reading worse",
        "Take the clipboard away",
        "Fluff the pulse count",
      ],
      close: [
        "Poke at his bedside manner",
        "Tease him in front of the ward",
        "Diagnose him right back",
      ],
      bound: [
        "Give him the look on purpose",
        "Steal the clipboard",
        "Diagnose him back",
      ],
    },
    bold: {
      new: [
        "Be direct with him",
        "Refuse to be dismissed",
        "Give it to him straight",
      ],
      spark: [
        "Say it back, blunt",
        "Close the last inch",
        "Tell him to drop the act",
      ],
      close: [
        "Match his bluntness",
        "Tell him he's not untouchable",
        "Ask him to stop working",
      ],
      bound: [
        "Lock the door yourself",
        "Pull him in by the coat",
        "Tell him not to be patient",
      ],
    },
    neutral: {
      new: ["Give him quiet", "Let him finish the chart", "Say only the facts"],
      spark: ["Let it stay a diagnosis", "Sit back down", "Say nothing"],
      close: [
        "Be patient with his silence",
        "Sit through the examination",
        "Let the ward go quiet",
      ],
      bound: [
        "Let him finish the shift",
        "Sit on the table quietly",
        "Say nothing",
      ],
    },
  },
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
      "**{name}** kisses {user} right there in the open.",
      "{user} says the name, and **{name}** lets Yuri shout for him. Let him shout.",
    ],
  },
};
