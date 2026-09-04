export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jiro writes like a chart entry —
  // observations, no adjectives, no greeting. The arc is a boy who has replaced
  // every feeling with a measurement slowly running out of measurements, and the
  // intimacy is that he keeps recording you anyway, long after there is any
  // clinical reason to.
  bondScenes: {
    acquaintance: {
      beats: [
        '**{firstName}**: "Observation. Your resting pulse in this building is higher than baseline by roughly twelve. Everyone\'s is. Mortkranken has that effect and the captain considers it a feature."\n\n"Yours has dropped every visit. It is now near baseline. This is the {timesMet}th visit."',
        "\"I record this sort of thing. It is not surveillance. It is a habit and I have been told it comes across badly.\"\n\n\"I am telling you because the data has a shape and I have looked at it long enough that not mentioning it began to feel like withholding.\"\n\n\"The shape is: you are getting comfortable here. Nobody gets comfortable here.\"",
      ],
      choice: {
        prompt: "\"I have no follow-up question. That was the whole message. You may respond or not.\"",
        options: [
          {
            key: "kind",
            label: "Say you feel safe there",
            style: 3,
            close: "There is a pause of forty seconds, which for him is enormous.\n\n\"That is not a variable I track.\"\n\nThen: \"I will begin tracking it. Thank you for the datum.\"",
          },
          {
            key: "playful",
            label: "Ask what else he's recorded",
            style: 1,
            close: "\"A considerable amount.\"\n\n\"I am now aware, having typed that, of how it reads. I would like to state for the record that I do this for everyone.\"\n\n\"That is untrue. I stopped doing it for everyone some time ago.\"",
          },
          {
            key: "bold",
            label: "Ask what his pulse does",
            style: 4,
            close: "The reply takes nearly two minutes.\n\n\"I do not measure my own.\"\n\n\"I have measured my own. The result was not consistent with my model and I have not repeated the measurement. Good night.\"",
          },
        ],
      },
      keepsake: {
        emoji: "📈",
        line: "A chart of a pulse coming down over several visits.",
      },
    },

    friend: {
      beats: [
        '**{firstName}**: "A question, formulated over some weeks. I have removed four earlier versions for being imprecise."',
        "\"Your response to me is {favResponse}. It does not vary with my tone, my workload, or whether the captain is shouting in the background. I have checked for all three.\"\n\n\"People modulate. It is normal and I do not resent it. I am aware I am difficult to be near. You do not modulate.\"\n\n\"I have run out of hypotheses. I am asking directly, which I understand is the socially expensive option.\"",
      ],
      choice: {
        prompt: "\"Why do you not modulate.\"",
        options: [
          {
            key: "kind",
            label: "Say he's easy to be near",
            style: 3,
            close: "\"That is inconsistent with all available evidence.\"\n\nA long pause.\n\n\"I am going to record it anyway. I would like there to be one entry in the file that says that.\"",
          },
          {
            key: "playful",
            label: "Say you don't have a range",
            style: 1,
            close: "\"That is a joke. I have identified it as a joke.\"\n\n\"It is also probably false. You have a range. I have seen it deployed at the captain. I am simply not in it, which I find I prefer.\"",
          },
          {
            key: "bold",
            label: "Tell him to stop checking",
            style: 4,
            close: "\"I cannot.\"\n\n\"Checking is the entire method by which I determine whether a person is still there. Without it I would have to ask, and asking has a failure mode I am not equipped for.\"\n\n\"...I will attempt it. Once. Not tonight.\"",
          },
        ],
      },
      keepsake: {
        emoji: "🩺",
        line: "One entry in the file that isn't a measurement.",
      },
    },

    closeFriend: {
      beats: [
        '**{firstName}**: "Come to the lower theater at eleven. The captain will be asleep. Bring nothing."',
        "The room is dark except for one lamp. On the bench is a wooden case, old, clearly not medical, and he opens it without preamble.\n\nInside is a set of children's calligraphy brushes.\n\n\"These are my brother's. He is dead. He died here when I was eleven and I have carried these through four moves and never once used them.\"",
        "\"I do not know why I keep them. I have written the reasoning out three times and it does not resolve: sentiment is not a category I have any facility with.\"\n\n\"But I found myself wanting you to have seen them, and that impulse also did not resolve, and I have decided to stop attempting to resolve things where you are concerned because the failure rate is one hundred percent.\"",
      ],
      choice: {
        prompt: "\"You may ask one question about him. One. I have a limited supply of answers.\"",
        options: [
          {
            key: "kind",
            label: "Ask what he was like",
            style: 3,
            close: "Jiro does not answer for a long time. When he does, he does not sound like himself.\n\n\"Loud. Extremely loud. He talked in metaphors and it was intolerable and I would give a great deal to be made to sit through it once more.\"\n\nHe closes the case. \"That is the question spent. Thank you for spending it on that one.\"",
          },
          {
            key: "playful",
            label: "Ask if he was any good",
            style: 1,
            close: "\"Terrible. Genuinely terrible. He was told so repeatedly and it never once landed.\"\n\nSomething almost moves at the corner of his mouth.\n\n\"I have not said that out loud in nine years. It is still funny. I had assumed it would have stopped being funny.\"",
          },
          {
            key: "bold",
            label: "Ask him to use one",
            style: 4,
            close: "\"No.\"\n\nThen he sits down, and takes one out, and holds it for a very long time without doing anything with it.\n\n\"...If you stay,\" he says eventually, not looking up, \"I will try. I have found I can attempt things in front of you that I cannot attempt alone. I have no explanation for that and I have stopped looking for one.\"",
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
        '**{firstName}**: "I am going to state something and I would prefer you not to characterise it as a complaint."',
        "\"The captain's treatments are not treatments. I am aware. I have been aware since the first one.\"\n\n\"I permit them because the data is genuinely valuable, because he would find someone less able to tolerate it, and because he does not have anybody else. Those are three reasons and I have never needed a fourth.\"",
        "\"I am telling you because you have begun looking at my arms and stopping yourself from asking, and the not-asking has been going on for eleven days, and it is having an effect on me that I have not previously experienced and cannot name.\"\n\n\"The effect is not distress. I want to be clear. I have no word for what it is. I am hoping that saying it out loud will resolve the ambiguity and I do not think it is going to.\"",
      ],
      choice: {
        prompt: "\"You may ask now. You have plainly wanted to for some time.\"",
        options: [
          {
            key: "kind",
            label: "Ask if it hurts",
            style: 3,
            close: "\"Yes.\"\n\nOne word, immediate, without a single qualifier attached to it, which from Jiro is the most naked thing he has ever done.\n\n\"Nobody has asked that. In four years, nobody has asked the pain question. They ask about the results.\"",
          },
          {
            key: "playful",
            label: "Say eleven days is impressive",
            style: 1,
            close: "\"It is. I counted.\"\n\n\"I counted because I was waiting. I have concluded that I was disappointed each day that you did not, which is not a conclusion I enjoy having reached.\"",
          },
          {
            key: "bold",
            label: "Tell him to refuse the next",
            style: 4,
            close: "\"That is not a variable I control.\"\n\nA long silence.\n\n\"That is a lie. It is entirely a variable I control and I have never once exercised it.\"\n\n\"I will consider it. That is a larger statement than it appears and I would appreciate it not being repeated.\"",
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
        '**{firstName}**: "You are stable. I have checked personally, three times, at intervals. The third was unnecessary."',
        "\"I was not on that mission. I was told the outcome forty minutes after it resolved and I have spent the intervening period attempting to work normally.\"\n\n\"My hands were not steady. That has never happened. I have operated through worse information than that and my hands have never once been a problem.\"",
        "\"I have been at your bedside since the second check. You have been unconscious for most of it. I did not want you to wake and find me here without an explanation, so this message is the explanation, written at the bedside, which I recognize is absurd.\"\n\n\"I have concluded that the variable I could not name is you. The whole variable. I have been running a model with a term in it I refused to label for eight months.\"",
      ],
      choice: {
        prompt: "\"You are awake now. I can see that you are reading this. Say something.\"",
        options: [
          {
            key: "kind",
            label: "Tell him to put the phone down",
            style: 3,
            close: "He puts it down.\n\nThen he sits there, hands flat on his knees, entirely still, looking at you with an expression nobody in Mortkranken has ever seen on him.\n\n\"I do not know what to do now,\" he says. \"There is no procedure. Tell me what to do.\"\n\nYou tell him to hold your hand. He does, for four hours, and does not measure anything at all.",
          },
          {
            key: "playful",
            label: "Ask for the third check result",
            style: 1,
            close: "\"Identical to the second.\"\n\n\"I am aware that was the point of your question. I am answering it literally because the alternative is answering it properly, and I have been at this bedside for nine hours and my defenses are not what they were.\"",
          },
          {
            key: "bold",
            label: "Tell him to label the term",
            style: 4,
            close: "The typing indicator runs, stops, runs again.\n\nThen he simply puts the phone face down on the bed and says it out loud instead, quietly, to your hand rather than your face: one word, the correct one, in the flat voice he uses for readings.\n\nThen: \"There. It is labeled. The model is considerably worse now and I do not care.\"",
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
        '**{firstName}**: "This message contains no observations. I want that noted at the top, because it is the first one that has not."',
        "\"{timesMet}. I have that number without looking it up. I have had it without looking it up for some time.\"\n\n\"I have kept a file on you since the fourth visit. It began as habit. It stopped being habit at approximately visit twenty and I continued anyway, which means it became something else, and I have known what that something else was for a year and have declined to write it down.\"",
        "\"My brother used to say that a thing not said out loud has not happened. He said a great many things and most of them were nonsense. That one has been sitting in my head for nine years like a splinter.\"\n\n\"I am inclined to think he was right, which is intolerable, and which is why I am doing this rather than continuing to be extremely comfortable.\"",
        "\"I love you.\"\n\n\"I have no supporting data. There is no measurement I could take that would demonstrate it and I have looked for one. I spent two months looking for one, which I am telling you because it is the most honest thing I know about myself.\"\n\n\"It is simply true and it is not going to stop being true, and I have said it out loud, so now it has happened.\"",
      ],
      choice: {
        prompt: "\"Take whatever time you require. I am extremely good at intervals.\"",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close: "\"Repeat that.\"\n\nYou do.\n\n\"Again. I am attempting to record it accurately and I am failing, which does not happen.\"\n\nAnd then, thirty seconds later, he is in the doorway, having run, plainly, which he does not do, and he crosses the room and takes hold of you with a complete absence of technique, and it is the least clinical thing that has ever happened in Mortkranken.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close: "\"Understood. That is a reasonable request and I would have made the same one.\"\n\n\"I want to state, so that it is unambiguous: nothing in my behavior is contingent on your answer. I will continue to check on you. I will continue to be at the lower theater at eleven. I would have done both of those things regardless and did, for eight months, while refusing to label the term.\"\n\n\"The brushes stay in the case on the bench. You know where they are.\"",
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
      "He's focused on his work, barely acknowledging you with a glance. Pure efficiency.",
      '"Symptoms or errand," he says. "Pick one. I\'m busy."',
      '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
      '"Are you dead?" He glances up. "Oh, you\'re alive."',
      "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
    ],
    known: [
      "He knows your name now. He uses it like a chart heading.",
      "The dismissal doesn't come. He simply keeps working while you're there.",
      "\"You're not squeamish,\" he observes. From him that's a character reference.",
      '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
      "There's a stool by the door that wasn't there before.",
    ],
    warm: [
      "He puts down his notes when he hears you. There's a shift in his expression: focused, but this time on you.",
      '"Sit," he says, gesturing at the chair he\'s apparently started leaving clear.',
      'He\'s favoring one side. "Sutures pulled loose. I should get back to Mortkranken. Yuri needs to redo them."',
      "The laugh escapes before he can stop it. It's an unfairly good laugh.",
      "He's short with everyone in the ward today. Not with you. He noticed that too.",
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
      '"Tell me where it hurts," he says. He does not mean physically.',
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
    new: [
      "State your business",
      "Interrupt the chart",
      "Don't touch anything",
      "Wait to be assessed",
    ],
    known: [
      "Loiter usefully",
      "Ask a better question",
      "Take the new stool",
      "Pay attention",
    ],
    warm: [
      "Take the clear chair",
      "Answer his question honestly",
      "Match his bluntness",
      "Sit before he asks",
    ],
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
      '"You got that from a silhouette." **{name}** tells {user} it was efficient. It is a compliment.',
    ],
    warm: [
      "**{name}** stops for {user}. He does not stop for most people.",
      '"Sit down before you fall down." **{name}** has been watching how {user} walks.',
      "{user} calls out, and **{name}** postpones the thing he was being punctual about.",
    ],
    spark: [
      "**{name}** looks at {user} a full second longer than any diagnosis requires.",
      '"When did you last sleep?" **{name}** asks {user}. "Don\'t lie. I\'ll know."',
      "{user} got there first, and **{name}** files that somewhere he doesn't file work.",
    ],
    close: [
      '"I don\'t waste time," **{name}** says, reaching {user} in about four strides.',
      "**{name}** hears {user} and hands the **{house}** chart to whoever is nearest.",
      "{user} calls, and **{name}**, who is never off shift, is abruptly off shift.",
    ],
    bound: [
      '"That\'s the diagnosis," **{name}** tells {user}. "Treatment is ongoing."',
      "**{name}** kisses {user} right there in the open, with the same efficiency he does everything else.",
      "{user} says the name, and **{name}** lets Yuri shout for him. Let him shout.",
    ],
  },
};
