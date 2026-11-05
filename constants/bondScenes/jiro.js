// Jiro's bond scenes, read as DIALOGUE.jiro.bondScenes
// (constants/dialogue/jiro.js imports this file).
//
// The level-up DMs (docs/bond-scene-dms.md). Jiro writes like a chart entry —
// observations, no adjectives, no greeting. The arc is a boy who has replaced
// every feeling with a measurement slowly running out of measurements, and the
// intimacy is that he keeps recording you anyway, long after there is any
// clinical reason to.
export default {
  acquaintance: {
    beats: [
      "**{firstName}**: This is Jiro from Mortkranken. Your number is on the patient list.\n\nYour last examination left one reading I want to take again. Not urgent, but I'm making a follow-up slot for this week. Please reply with your preferred day and time.",
      "I run the health check-ups here. Yuri is too busy to manage scheduling, so I do it.\n\nYou have {timesMet} visits on file. One reading from the last one doesn't agree with the others. I'd like to take it again. I could have flagged this the next time you were in, but this is more efficient.",
    ],
    faces: { 0: "default", 1: "serious" },
    choice: {
      prompt: "Pick a day and the slot is yours.",
      options: [
        {
          key: "kind",
          face: "default",
          label: "Pick a day right away",
          style: 3,
          close:
            "Noted. The slot is held.\n\nPlease arrive ten minutes early. Otherwise there isn't time for a full examination.",
        },
        {
          key: "playful",
          face: "smile",
          label: "Ask if you're dying",
          style: 1,
          close:
            "No. Probably not. It's your resting pulse. High once, which is usually the cuff or the walk over.\n\nI'm re-checking it anyway.",
        },
        {
          key: "bold",
          face: "default",
          label: "Ask why he texted instead",
          style: 4,
          close:
            "Because catching you during a walk-in is inefficient. That's already in the notes.\n\nThe follow-up is on the day you picked. You can wear whatever is convenient for you. You'll be taking it off anyway",
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
      "You apologized for not coming in, which is the least relevant part of it.\n\nYou usually answer me with {favResponse}. Not about this. You treat your own condition as a footnote.\n\nI'd like that changed.",
    ],
    faces: { 0: "serious", 1: "annoyed", 2: "serious" },
    choice: {
      prompt: "Tell me if that's something you can manage.",
      options: [
        {
          key: "kind",
          face: "default",
          label: "Promise to be more careful",
          style: 3,
          close:
            "A commitment, not a fact. I dislike the uncertainty in it.\n\nI'll check weekly if necessary. Possibly daily.",
        },
        {
          key: "playful",
          face: "default",
          label: "Ask if he'd notice",
          style: 1,
          close:
            "I did. You walked into the ward differently. That's how I found it.",
        },
        {
          key: "bold",
          face: "serious",
          label: "Point out he does it too",
          style: 4,
          close:
            "That's different. My condition is already documented.\n\nYours isn't. That's the problem.",
        },
      ],
    },
    keepsake: {
      emoji: "🩹",
      line: "The dressing he redid, neater than yours ever was.",
    },
  },

  closeFriend: {
    beats: [
      "**{firstName}**: I'm in the examination room until eleven. There's a batch of confections on the counter. They're yours.",
      "I've changed the recipe four times since we met in {sinceMet}. I don't eat them, so the changes are based on which ones you finish.\n\nLess sugar in the second batch. You left half. More in the third. You finished it and took another.",
      "I've never adjusted a formula for someone's preference before. Only for tolerance.",
    ],
    faces: { 0: "default", 1: "serious", 2: "close" },
    choice: {
      prompt: "The fourth batch is ready. Tell me if you're coming.",
      options: [
        {
          key: "kind",
          face: "smile",
          label: "Say you'll come right now",
          style: 3,
          close:
            "Good. The door's unlocked.\n\nThey're better warm, according to the recipe. I'll wait.",
        },
        {
          key: "playful",
          face: "default",
          label: "Ask if he'll try one too",
          style: 1,
          close:
            "Tea is most of what I keep down. Solids are harder.\n\nI'll try one. Are you going to wait while I eat it? I'm more likely to finish it that way.",
        },
        {
          key: "bold",
          face: "blush",
          label: "Say it isn't about the data",
          style: 4,
          close:
            "Correct. It stopped being data after the second batch. I kept recording it anyway.\n\nI don't have a name for what it is instead. Come before eleven.",
        },
      ],
    },
    keepsake: {
      emoji: "🍪",
      line: "The fourth batch, measured to what you'd finish.",
    },
  },

  confidant: {
    beats: [
      "**{firstName}**: I'm going to state something and I'd prefer you not to characterize it as a complaint.",
      "The captain's treatments are also experiments. I'm aware. I've been aware since the first one.\n\nI permit them because they keep me upright, because the data is genuinely valuable, and because he doesn't have anybody else. Those are three reasons and I've never needed a fourth.",
      "I'm telling you because you've begun looking at my arms and stopping yourself from asking. The not-asking has gone on for eleven days, and it's having an effect on me I haven't experienced before and can't name.\n\nThe effect isn't distress. I want to be clear. I have no word for what it is. I'm hoping saying it out loud resolves the ambiguity. I don't think it's going to.",
    ],
    faces: { 0: "serious", 1: "default", 2: "blush" },
    choice: {
      prompt: "You may ask now. You've plainly wanted to for some time.",
      options: [
        {
          key: "kind",
          face: "close",
          label: "Ask if it hurts",
          style: 3,
          close:
            "Yes.\n\n*One word, immediate, without a single qualifier attached to it, which from Jiro is the most naked thing he has ever done.*\n\nNobody has asked that. In all this time, nobody has asked the pain question. They ask about the results.",
        },
        {
          key: "playful",
          face: "annoyed",
          label: "Say eleven days is impressive",
          style: 1,
          close:
            "It is. I counted.\n\nI counted because I was waiting. I've concluded that I was disappointed each day that you didn't, which isn't a conclusion I enjoy having reached.",
        },
        {
          key: "bold",
          face: "serious",
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
    faces: { 0: "default", 1: "sweat", 2: "blush" },
    choice: {
      prompt:
        "You're awake now. I can see that you're reading this. Say something.",
      options: [
        {
          key: "kind",
          face: "surprise_blush",
          label: "Tell him to put the phone down",
          style: 3,
          close:
            "*He puts it down.*\n\n*Then he sits there, hands flat on his knees, entirely still, looking at you with an expression nobody in Mortkranken has ever seen on him.*\n\n> I don't know what to do now,\n\n*he says.*\n\n> There's no procedure. Tell me what to do.\n\n*You tell him to hold your hand. He does, for four hours, and doesn't measure anything at all.*",
        },
        {
          key: "playful",
          face: "close",
          label: "Ask for the third check result",
          style: 1,
          close:
            "> Identical to the second.\n\n> I'm aware that was the point of your question. I'm answering it literally because the alternative is answering it properly, and I've been at this bedside for nine hours and my defenses aren't what they were.",
        },
        {
          key: "bold",
          face: "smile",
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
    faces: { 0: "default", 1: "serious", 2: "close", 3: "blush" },
    choice: {
      prompt:
        "Take whatever time you require. I'm extremely good at intervals.",
      options: [
        {
          key: "answered",
          face: "surprise_blush",
          label: "Say it back",
          style: 3,
          close:
            "Repeat that.\n\n*You do.*\n\nAgain. I'm attempting to record it accurately and I'm failing, which doesn't happen.\n\n*And then, thirty seconds later, he's in the doorway, having run, plainly, which he doesn't do, and he crosses the room and takes hold of you with a complete absence of technique, and it's the least clinical thing that has ever happened in Mortkranken.*",
        },
        {
          key: "held",
          face: "smile",
          label: "Ask him to give you time",
          style: 2,
          close:
            "Understood. That's a reasonable request and I would've made the same one.\n\nI want to state, so that it's unambiguous: nothing in my behavior is contingent on your answer. I'll continue to check on you. I'll continue to be in the examination room at eleven. I would've done both of those things regardless and did, for eight months, while refusing to label the term.\n\nThere'll be a batch on the counter. You know where to find it.",
        },
      ],
    },
    keepsake: {
      emoji: "🗒️",
      line: "The one message in the whole file with no observation in it.",
    },
  },
};
