export default {
  dialogue: {
    new: [
      'He\'s barking orders at the staff, managing every angle of the casino floor. "HDY waste my time? Quick, put on this dress and work table seven—we need someone sharp out there."',
      "He's on two conversations and one phone call. You are somehow now the third conversation.",
      "\"Come to my private office later — I've got a little proposal I think you'll want to hear. But make sure you come alone.\"",
      "He looks you up and down, does arithmetic, and apparently likes the result.",
      "He's got a sheet mask on and a phone to his ear and does not consider either a reason to stop running the floor.",
    ],
    known: [
      "He's stopped trying to put you to work. Mostly.",
      '"Oh, it\'s YOU," at a volume that carries across the entire floor.',
      "He complains about something to you specifically, which is a form of trust.",
      '"Have you seen Shinjo anywhere? I just asked him to organize some documents and he ran off to make copies!"',
      'He pushes a glass of something green across the desk. "Noni juice. Drink it. Your skin cell turnover is suboptimal and it shows."',
    ],
    warm: [
      "He pauses mid-command when he spots you, actually stepping away from the action to greet you properly. Suddenly you matter more than the operation.",
      '"You show up unannounced, no appointment — sit down. I\'ll get you something. Ugh. Fine. I want to."',
      "He complains about you at length to someone else, loudly, entirely as a compliment.",
      "He's had the good seat held all night. He will absolutely deny that.",
      "The yelling drops a full register when he turns to you. Everyone notices. He doesn't.",
    ],
    spark: [
      "He clears the whole VIP room. For a conversation. That he then can't start.",
      '"HDY look like that in MY casino," he snaps, meaning something entirely different.',
      "He fixes your collar, aggressively, and doesn't step back afterward.",
      "The yelling stops. The silence that replaces it is much louder.",
      "He buys you something absurd and refuses to explain why, badly.",
    ],
    close: [
      '"You\'re not just money or status to me," he admits, voice uncharacteristically sincere. "You\'re everything."',
      "He hands the floor to someone else — the floor — because you looked like you needed a minute.",
      "\"Don't tell me what it cost. It's yours. That's the end of the conversation.\"",
      "The performance of not caring finally collapses, and he's not even embarrassed about it.",
      '"I like you. This much. It\'s ridiculous," he mutters, and doesn\'t let go of your hand.',
    ],
    bound: [
      "He's bought out the floor for the night. For you. He'll never explain it properly.",
      '"Look what you\'ve done to me," he mutters, with his face in your neck.',
      "He yells at everyone all day and comes home and is completely, quietly undone.",
      "He drapes something absurdly expensive over your shoulders and refuses all thanks.",
      "The money means nothing. He's finally, loudly, stopped pretending otherwise.",
    ],
  },
  temperamentDialogue: {
    new: [
      '"Perfect timing—I need someone I can trust to manage the VIP section. You in?"',
      '"HDY come in here with your skin like that and no routine. Sit. We are fixing this."',
      "\"Tch... If you don't have any business for me, I'm leaving! You're wasting my precious time!\"",
      '"Fuji-kun... Come out, come out, wherever you are... Tch, where did he go? Why is running away the only thing he\'s good at?!"',
      "\"You're new. Rule one: don't touch the chips. Rule two: see rule one.\"",
    ],
    known: [
      '"You again! HDY keep showing up without an appointment. Sit down."',
      '"Don\'t touch the — okay, fine, you know not to. Fine."',
      '"Just go! I cannot deal with this WTWUT! Wall-To-Wall Useless Trash, obviously! ...Not you. You can stay."',
      "\"I'm not saying I remembered your name. I'm saying I said it. Different thing.\"",
      "\"Drink's on the house. Don't tell the house.\"",
    ],
    warm: [
      "\"Oh, you're back! Actually... I'm kind of happy to see you. Don't tell anyone.\"",
      '"Sit. The good seat. No, I didn\'t hold it. Shut up."',
      '"You had me worried all evening. Somebody put that look on your face — give me a name. I\'ll have a word. ...A thorough one."',
      '"You eaten? Don\'t answer, I already ordered."',
      "\"You're not staff and you're not a guest. You're... whatever. You're welcome here.\"",
    ],
    spark: [
      '"Everybody out. Not you. Obviously not you."',
      '"You\'ve cost me something I can\'t put a number on. Do you have ANY idea how much that irritates me?"',
      '"Wear it. I bought it. Don\'t argue, just — just wear it for me."',
      "\"I'm not good at quiet. Give me a second. I'm trying.\"",
      "\"You're the only thing in this building that isn't for sale. That's the problem.\"",
    ],
    close: [
      "\"I'd spend all my money on you if you asked. Not that I'd ever admit that normally.\"",
      "\"Take it. Don't look at the price. I said don't look.\"",
      '"Everything on this floor, I can price. Then there\'s you. It\'s infuriating."',
      "\"I've got people for everything. I don't have anyone for you. That's the point.\"",
      '"Stay till close. I\'ll be insufferable the whole time. You like that."',
    ],
    bound: [
      "\"Floor's closed. Everyone's gone. It's just us, so — come here already.\"",
      '"I love you. HDY make me say it out loud. Ugh. I love you."',
      "\"Wear it to bed. I don't care that it's expensive, that's the POINT.\"",
      "\"Stay. I'll cancel everything. I've already cancelled everything.\"",
      "\"You're the only thing I've ever wanted that I couldn't just buy.\"",
    ],
  },
  approach: {
    new: [
      "Cut into the conversation",
      "Make yourself useful",
      "Walk faster",
      "Ask what the job pays",
    ],
    known: [
      "Take the free drink",
      "Sit without an appointment",
      "Interrupt the yelling",
      "Say what you want, quickly",
    ],
    warm: [
      "Take the good seat",
      "Interrupt him anyway",
      "Complain right back",
      "Let him order for you",
    ],
    spark: [
      "Stay when the room clears",
      "Wear it",
      "Give him a second",
      "Let the yelling stop",
    ],
    close: [
      "Go straight to him",
      "Take his hand",
      "Stay till close",
      "Tell him to hand off the floor",
    ],
    bound: [
      "Come here already",
      "Wear it to bed",
      "Stay",
      "Let him cancel everything",
    ],
  },
  responses: {
    kind: {
      new: [
        "Let him fuss over you",
        "Take the work seriously",
        "Thank him and mean it",
      ],
      spark: [
        "Give him the second",
        "Wear it for him",
        "Tell him he's not business",
      ],
      close: [
        "Know his worth is you",
        "Tell him to stop buying things",
        "Say the money was never it",
      ],
      bound: [
        "Say it back",
        "Wear it for him",
        "Tell him he's more than money",
      ],
    },
    playful: {
      new: ["Trade sass back", "Use his own acronym", "Touch the chips"],
      spark: ["Ask what it cost", "Out-yell him", "Refuse to wear it"],
      close: [
        "Match his wit",
        "Out-yell him affectionately",
        "Spend his money on him",
      ],
      bound: [
        "Make him say it louder",
        "Ask what it cost",
        "Refuse the gift twice",
      ],
    },
    bold: {
      new: ["Bet on yourself", "Name your price", "Take the VIP section"],
      spark: [
        "Stay when the room clears",
        "Fix his collar back",
        "Tell him what he's worth",
      ],
      close: [
        "Know you're worth his money",
        "Tell him to say it plainly",
        "Take his hand openly",
      ],
      bound: [
        "Close the floor yourself",
        "Say it first",
        "Tell him he couldn't buy you",
      ],
    },
    neutral: {
      new: ["Stay quiet", "Let him run the floor", "Nod and get on with it"],
      spark: ["Let him find the words", "Leave with the room", "Say nothing"],
      close: [
        "Let him have this moment",
        "Wait out the rant",
        "Sit through the closing count",
      ],
      bound: ["Let him rant", "Sit in the empty room", "Say nothing"],
    },
  },
};
