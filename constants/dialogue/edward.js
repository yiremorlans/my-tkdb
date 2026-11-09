import bondScenes from "../bondScenes/edward.js";

export default {
  // Level-up DMs: constants/bondScenes/edward.js.
  bondScenes,
  dialogue: {
    known: [
      {
        line: "\"If this is about a mission, I can't help you, I'm afraid. I leave such day-to-day duties to Rui, so I suggest you ask him instead.\"",
        approach: "Say it's not about a mission",
        greeting: '"Oh? Then you came for my company. How unusual... Do stay."',
        responses: {
          kind: ["Say you came to see him", "Say Rui can have the mission"],
          playful: ["Ask what he does all day", "Ask if napping is a duty"],
          bold: ["Say you'd rather ask him", "Say you came for him, not Rui"],
          neutral: ["Let him go back to resting", "Nod and stay a while"],
        },
      },
      {
        line: "\"Well, hello there. It's been a while. Come over here. I've been looking forward to your return.\"",
        approach: "Go over to him",
        greeting:
          '"There. Much better. I was beginning to think I\'d imagined you."',
        responses: {
          kind: ["Say you missed him too", "Say you came straight here"],
          playful: ['Ask how long "a while" was', "Ask if he counted the days"],
          bold: ["Say you'll come back sooner", "Take the spot beside him"],
          neutral: ["Go over, say nothing", "Wave from where you are"],
        },
      },
      {
        line: "\"Ah, there you are. I've a favor to ask of you. Come to my room and I'll explain.\"",
        approach: "Follow him up",
        greeting:
          '"My video has stopped playing, and Rui is nowhere to be found. I don\'t suppose you could...?"',
        responses: {
          kind: ["Say you're happy to help", "Ask what he needs"],
          playful: ["Ask if it's a big favor", "Guess it's about YouTube"],
          bold: ["Say you'll grant one favor", "Say he owes you one after"],
          neutral: ["Hear the favor first", "Wait for him to explain"],
        },
      },
      {
        line: '"The stamina and physical strength of a vampire is dozens of times that of a human. We don\'t need to work ou..." He breaks off, coughing.',
        approach: "Wait for the coughing to stop",
        greeting: '"(wheeze) ...As I was saying. Dozens of times."',
        responses: {
          kind: ["Pat his back for him", "Offer him your arm"],
          playful: ["Ask him to prove it", "Ask for one push-up"],
          bold: ["Say the cough was a nice touch", "Say you'll take his word"],
          neutral: ["Wait it out", "Let him catch his breath"],
        },
      },
      {
        line: "\"I'm more or less confined to this house most days, for various reasons. I'm on my best behavior.\"",
        approach: "Ask if he ever goes out",
        greeting:
          '"Not if I can help it. But I\'ll do what I can to support you from the sidelines."',
        responses: {
          kind: ["Say you'll visit, then", "Say you'll bring news back"],
          playful: ["Ask what bad behavior is", "Ask if Rui's the warden"],
          bold: ["Ask to see his worst", "Say behaving doesn't suit him"],
          neutral: ["Take him at his word", "Nod along"],
        },
      },
      {
        line: '"I have much to learn about the human world... Rui is teaching me a lot, but I cannot seem to divorce myself of careless blunders."',
        approach: "Ask what he got wrong",
        greeting:
          '"Rui claims I can\'t tie my own shoelaces. A gross exaggeration. ...Would you mind?"',
        responses: {
          kind: ["Offer to teach him something", "Say Rui's a good teacher"],
          playful: ["Ask for his worst blunder", "Ask what Rui's teaching now"],
          bold: [
            "Say blunders are half the fun",
            "Say you'll teach him faster",
          ],
          neutral: ["Let him keep learning", "Nod along"],
        },
      },
      {
        line: '"You ought to be getting ready for bed. Me? Oh, I\'ll turn in soon... Just one more YouTube video."',
        approach: "Ask how many is one more",
        greeting: '"One. Perhaps two. The autoplay decides, really."',
        responses: {
          kind: ["Say goodnight to him", "Tell him to sleep soon too"],
          playful: ["Ask what he's watching", "Bet it's more than one"],
          bold: ["Say you'll watch it with him", "Say you'll hold him to one"],
          neutral: ["Head off to bed", "Leave him to it"],
        },
      },
      {
        line: '"Do you realize that human society is controlled by a shady cabal of elites? There are many videos about it on YouTube."',
        approach: "Ask which videos",
        greeting:
          '"Rui thinks I watch too many of them. He simply hasn\'t seen enough."',
        responses: {
          kind: ["Ask him to show you one", "Hear out the whole theory"],
          playful: ["Ask if Rui's in on it", "Ask if you're in the cabal"],
          bold: ["Say you'll watch one with him", "Say he's the elite here"],
          neutral: ["Stay out of it", "Let him explain"],
        },
      },
      {
        line: "\"Sounds like Lyca's having fun, from all that yapping. I think it's good for him to develop some temporary bonds with humans at this time in his life.\"",
        approach: "Listen to the yapping with him",
        greeting:
          '"Ah ha ha ha. Rui will be cross about the noise. I rather like it."',
        responses: {
          kind: ["Say Lyca's doing well", "Say you'll keep Lyca company"],
          playful: ["Ask who he's yapping at", "Say it sounds like a party"],
          bold: ["Ask why temporary", "Say they won't be temporary"],
          neutral: ["Listen for a moment", "Let him enjoy the noise"],
        },
      },
      {
        line: 'He calls you "wicked girl" in a tone that makes it sound like the nicest thing he\'s said all week.',
        approach: "Ask why he calls you that",
        greeting:
          '"You keep walking into a vampire\'s room of your own accord. What else would I call you?"',
        responses: {
          kind: ["Say it sounds sweet from him", "Say you like the name"],
          playful: ["Bargain for a cuter nickname", "Ask what earned it"],
          bold: ["Claim the name outright", "Say it suits you fine"],
          neutral: ["Let the name stand", "Shrug at the nickname"],
        },
      },
      {
        line: "Rui's left him another list of chores. Edward has read exactly none of it.",
        approach: "Pick up the list",
        greeting:
          '"Ah, the list. Read it to me, would you? My eyesight is not what it used to be."',
        responses: {
          kind: ["Read a little of the list", "Offer to help with it"],
          playful: ["Read it back in his voice", "Read it like a love letter"],
          bold: ["Toss the list aside with him", "Say the chores can wait"],
          neutral: ["Set the list down, say nothing", "Leave the list alone"],
        },
      },
      {
        line: "He asks, again, whether you like Rui or Lyca better, far too invested in an answer that isn't his to have.",
        approach: "Refuse to answer",
        greeting:
          '"Oh? Not even a hint? How cruel. I\'ll have to draw my own conclusions, then."',
        responses: {
          kind: ["Say you like them both", "Laugh off his conclusions"],
          playful: ["Name someone else entirely", "Make him guess"],
          bold: ["Say he'll never guess", "Say neither, and look at him"],
          neutral: ["Shrug, say nothing", "Change the subject"],
        },
      },
      {
        line: "\"(cough cough) Oh, it's you... I'm feeling worse than usual today. I don't suppose you could carry me to bed?\"",
        approach: "Go get Rui",
        greeting: '"Rui? Oh, how unkind. I did ask you so nicely."',
        responses: {
          kind: ["Fuss over him a little", "Fetch him a blanket"],
          playful: ["Pretend not to hear him", "Ask where it hurts most"],
          bold: ["Offer your arm to the stairs", "Say you'll carry him, then"],
          neutral: ["Wait for Rui to arrive", "Hand him a pillow"],
        },
      },
    ],
    warm: [
      {
        line: "The fragile act drops for a moment when you're near: you see the predator underneath, and he lets you.",
        approach: "Close the distance yourself",
        greeting: '"I was hoping you\'d visit. Come closer."',
        responses: {
          kind: ["Let him see the real thing", "Stay exactly where you are"],
          playful: ["Ask what the predator's like", "Ask for the act back"],
          bold: ["Tell him to keep it out", "Meet the look head on"],
          neutral: ["Stay, say nothing", "Come closer, no comment"],
        },
      },
      {
        line: '"You never did flinch," he observes, sounding thrilled and slightly put out.',
        approach: "Refuse to flinch",
        greeting:
          '"Not afraid of me in the least. How disappointing. How wonderful."',
        responses: {
          kind: ["Say it's not disappointing", "Say you trust him now"],
          playful: ["Ask which he'd prefer", "Flinch on purpose, badly"],
          bold: ["Say he'll have to try harder", "Ask what he'd do about it"],
          neutral: ["Let him decide, say nothing", "Let the observation stand"],
        },
      },
      {
        line: 'He winces, a hand at his ribs. "Oh, it hurts... I cannot seem to shake this ache in the place Rui touched me earlier. I think I\'ll rest a while."',
        approach: "Sit beside him",
        greeting:
          '"Sit. No, here, beside me. Personal space is a modern invention."',
        responses: {
          kind: ["Sit and fuss over him", "Fetch him something warm"],
          playful: ["Tease the dramatics", "Offer a dramatic remedy"],
          bold: ["Say Rui didn't do that much", "Sit closer than he asked"],
          neutral: ["Sit quietly beside him", "Let him rest a while"],
        },
      },
      {
        line: "He offers his arm, then his coat, then a chair, in rapid succession. It's a lot.",
        approach: "Take his arm",
        greeting:
          '"What did I do before Darkwick? I eked out a humble existence in Eastern Europe. Nothing worth the telling."',
        responses: {
          kind: ["Say one is plenty", "Say the coat is enough"],
          playful: ["Take all three at once", "Ask what else is on offer"],
          bold: ["Take the arm, skip the rest", "Refuse all three, stay close"],
          neutral: ["Take the arm, say nothing", "Take the chair only"],
        },
      },
      {
        line: "There's a glass poured for you already. It's your preference. He remembered.",
        approach: "Accept the poured glass",
        greeting: '"I poured this before you arrived. Call it optimism."',
        responses: {
          kind: ["Raise the glass to him", "Say the optimism paid off"],
          playful: ["Ask how he knew", "Toast his optimism"],
          bold: ["Say of course he remembered", "Ask what else he predicted"],
          neutral: ["Take the glass, say nothing", "Drink without comment"],
        },
      },
      {
        line: '"How strange... I can\'t find my other sock." He\'s holding one up, bewildered. "I could have sworn I put it here. Have you seen it?"',
        approach: "Help him look",
        greeting:
          "\"Under the bed, perhaps? I'd check myself, but it's so very far down. Would you?\"",
        responses: {
          kind: ["Check under the bed", "Say you'll find it"],
          playful: ["Ask if the sock ran off", "Say one sock is a look"],
          bold: ["Find it, then keep it", "Say he hid it to keep you here"],
          neutral: ["Search the room", "Check the drawers"],
        },
      },
      {
        line: '"Going for a walk?" He\'s watching you from the window seat. "Mind you don\'t linger in the garden. Humans are rather susceptible to the miasma there."',
        approach: "Ask him to walk with you",
        greeting:
          '"Me? Out there? ...Well. If you insist on dragging an old man about, I won\'t stop you."',
        responses: {
          kind: ["Offer him your arm", "Say you'll go slow for him"],
          playful: ["Ask what miasma tastes like", "Race him to the gate"],
          bold: ["Say he's not that old", "Take his hand and go"],
          neutral: ["Wait by the door", "Fetch his coat"],
        },
      },
      {
        line: '"Rui? Is my lunch ready yet? ...Oh. It\'s you." He brightens anyway. "You wouldn\'t happen to be feeling heartsore, would you?"',
        approach: "Ask why he wants to know",
        greeting:
          '"Idle curiosity. I\'m a love advisor of some renown. Well. Of some renown in this house."',
        responses: {
          kind: ["Ask for his best advice", "Ask if he is"],
          playful: ["Invent a tragic romance", "Ask for his credentials"],
          bold: ["Say it's about him", "Ask who he'd have you pick"],
          neutral: ["Say you're fine", "Sit and hear his advice"],
        },
      },
      {
        line: '"How are you finding Obscuary?" He studies you over steepled fingers. "You\'re adapting remarkably well. Perhaps you\'re predisposed."',
        approach: "Ask what he means",
        greeting:
          '"Only that most humans don\'t settle into a house of anomalies quite so easily. You seem at home. I like that."',
        responses: {
          kind: ["Say he makes it easy", "Say the house suits you"],
          playful: ["Ask if you're secretly a ghoul", "Say you're just nosy"],
          bold: ["Ask what he thinks you are", "Say maybe you are"],
          neutral: ["Shrug it off", "Look around the room"],
        },
      },
      {
        line: '"I felt like stargazing, so I went up the hill." He sounds wounded. "Towa was there already. He chased me away."',
        approach: "Offer to go with him",
        greeting:
          '"Would you? Towa might tolerate me with company. He seems to like you rather more than me."',
        responses: {
          kind: ["Say you'll talk to Towa", "Offer to go up with him"],
          playful: ["Ask how fast he ran", "Say Towa has good taste"],
          bold: ["Say you'll claim the hill", "Tell him to stand his ground"],
          neutral: ["Look out the window", "Find the stars from here"],
        },
      },
      {
        line: '"Rui has his tavern work at this hour," he says, surrounded by blankets, snacks, and a remote. "He made sure I had everything I needed."',
        approach: "Ask if he needs anything",
        greeting:
          "\"Everything but company. He can't leave that on a tray, I'm told. Sit.\"",
        responses: {
          kind: ["Sit and keep him company", "Tuck the blanket in"],
          playful: ["Steal one of his snacks", "Ask for the remote"],
          bold: ["Take the best spot", "Say Rui spoils him"],
          neutral: ["Sit at the end", "Take a snack"],
        },
      },
      {
        line: '"Really. You became embroiled in another petty human dispute?" He sighs as if it pains him. "How absurd you humans are. Come here."',
        approach: "Go to him",
        greeting:
          "\"Tell me all of it. I adore a petty dispute, as long as it's someone else's.\"",
        responses: {
          kind: ["Tell him the whole story", "Save him the pettiest part"],
          playful: ["Say you won, of course", "Make it sound dramatic"],
          bold: ["Ask whose side he's on", "Say he'd have made it worse"],
          neutral: ["Sit beside him", "Let it go"],
        },
      },
      {
        line: '"My, where did the time go? Talking to you is so relaxing." He smiles. "Why, do you suppose?"',
        approach: "Ask him why",
        greeting:
          '"Perhaps because I know I could feast upon you at any moment. ...Or perhaps you\'re simply good company. Pick one."',
        responses: {
          kind: ["Pick good company", "Say he's relaxing too"],
          playful: ["Pick both", "Say he's all bark"],
          bold: ["Say he wouldn't dare", "Pick the first one"],
          neutral: ["Say nothing", "Check the time"],
        },
      },
      {
        line: "You've been away. He looks up from his chaise. \"Well, hello there. It's been a while. Come over here. I've been looking forward to your return.\"",
        approach: "Come over to him",
        greeting:
          "\"Tell me where you've been. And whom you've been with. Leave nothing out.\"",
        responses: {
          kind: ["Say you missed him", "Tell him everything"],
          playful: ["Say it's a secret", "Ask if he counted the days"],
          bold: ["Ask why he wants to know", "Say he could have visited"],
          neutral: ["Sit and tell him", "Say you were busy"],
        },
      },
      {
        line: '"Hello? Oh good, there you are." He\'d been looking for you, in his fashion: from the doorway. "Let me know next time you wander off."',
        approach: "Promise to tell him",
        greeting:
          '"Otherwise I\'d have to go looking, and I do so hate getting up. Humor an old man."',
        responses: {
          kind: ["Say you'll leave a note", "Say you'll check in"],
          playful: ["Say you'll wander more", "Ask if he'd really get up"],
          bold: ["Say he should come find you", "Say you'll go where you like"],
          neutral: ["Nod", "Sit where he can see you"],
        },
      },
      {
        line: "Lyca's voice carries from the next room, bright and loud. Edward listens, amused. \"It's good for him, making friends with humans.\"",
        approach: "Ask about Lyca",
        greeting:
          "\"Oh, nothing ominous. Only that he'll outlast them. So will I. One learns to enjoy the noise while it's there.\"",
        responses: {
          kind: ["Say you'll stick around", "Say the noise is nice"],
          playful: ["Say Lyca's louder than noise", "Ask if you're noise too"],
          bold: ["Ask if he'll outlast you", "Tell him to enjoy you, then"],
          neutral: ["Listen to Lyca", "Stay quiet"],
        },
      },
      {
        line: "There's a note on your door in looping, old-fashioned script: Tea at mine. Bring nothing but yourself.",
        approach: "Go over for tea",
        greeting:
          '"You came. I had Rui set out the good cups. He complained, naturally."',
        responses: {
          kind: ["Say the good cups suit him", "Pour him a cup"],
          playful: ["Say you brought nothing", "Ask what Rui said"],
          bold: ["Say you'd have come unasked", "Take the best chair"],
          neutral: ["Sit down for tea", "Take a cup"],
        },
      },
      {
        line: "He's holding a phone upside down and frowning at it. \"Rui showed me how to send a picture. I've sent eleven of the ceiling.\"",
        approach: "Show him how",
        greeting:
          '"Patience, please. I have much to learn about the human world. Rui says I learn it in the wrong order."',
        responses: {
          kind: ["Walk him through it", "Say he's doing fine"],
          playful: ["Ask to see the ceilings", "Send one of him to Rui"],
          bold: ["Take a picture of him", "Say he's doing it on purpose"],
          neutral: ["Turn the phone over", "Wait while he tries"],
        },
      },
    ],
    spark: [
      {
        line: "His gaze settles on your throat, and he takes rather too long to look away.",
        approach: "Stand there anyway",
        greeting:
          '"You know what I am. You keep standing there anyway. How flattering."',
        responses: {
          kind: "Stay right where you are",
          playful: "Ask what's taking so long",
          bold: "Tilt your head back",
          neutral: "Let the moment cool",
        },
      },
      {
        line: '"You do test a man\'s restraint," he murmurs, testing nothing at all.',
        approach: "Say he can let loose",
        greeting:
          '"I have restrained myself for a very long time. Do say if I needn\'t."',
        responses: {
          kind: "Say he needn't restrain it",
          playful: "Test the restraint",
          bold: "Say you're done waiting",
          neutral: "Say nothing",
        },
      },
      {
        line: "He kisses the back of your hand and lingers well past the century's etiquette.",
        approach: "Offer your hand",
        greeting: '"May I? Only your hand. ...For now."',
        responses: {
          kind: "Offer your hand",
          playful: "Make a poor promise back",
          bold: "Ask for more than your hand",
          neutral: "Withdraw your hand",
        },
      },
      {
        line: "The fragile act is gone. What's left is old, hungry, and extremely well-mannered about it.",
        approach: "Come closer",
        greeting: '"Come closer. I promise to behave. I make poor promises."',
        responses: {
          kind: "Take him at his word",
          playful: "Ask how poor the promises are",
          bold: "Say you know what he is",
          neutral: "Hold still, say nothing",
        },
      },
      {
        line: "He tilts his head, considering you, the way one considers something one intends to have.",
        approach: "Let him consider you",
        greeting:
          '"That pulse of yours is being terribly loud about all this."',
        responses: {
          kind: "Tell him you're not frightened",
          playful: "Ask what he intends",
          bold: "Say you're already his",
          neutral: "Let him look, say nothing",
        },
      },
    ],
    close: [
      {
        line: '"I\'ve been waiting lifetimes for someone who could see me like this," he says, pulling you close. "Don\'t leave me again."',
        approach: "Go to him",
        greeting: '"You belong right here, next to me. Don\'t ever leave."',
        responses: {
          kind: "Let him get closer",
          playful: "Call him lovely first",
          bold: "Tell him you're not leaving",
          neutral: "Stay through the quiet hour",
        },
      },
      {
        line: "The theatrics finally exhaust themselves, and what's left is old, and lonely, and yours.",
        approach: "Stay past dawn",
        greeting: '"Stay until dawn. Stay past it. I\'ll manage the curtains."',
        responses: {
          kind: "Tell him he's not alone",
          playful: "Tease him about the theatrics",
          bold: "Say you'd stay lifetimes",
          neutral: "Stay, say nothing",
        },
      },
      {
        line: "He rests his forehead against yours and stops talking, which is unprecedented.",
        approach: "Let the silence hold",
        greeting: '"No performance tonight. Only me. Is that enough?"',
        responses: {
          kind: "Let the silence be enough",
          playful: "Flirt back with him",
          bold: "Pull him closer yourself",
          neutral: "Let him watch in silence",
        },
      },
      {
        line: '"Everything I\'ve pretended to be," he says, "you saw past on the first night."',
        approach: "Tell him you see him",
        greeting:
          '"I have outlived a great deal. I would rather not outlive this."',
        responses: {
          kind: "Say the act was never needed",
          playful: "Tease him for taking so long",
          bold: "Say you'd have said it sooner",
          neutral: "Let the moment settle quietly",
        },
      },
      {
        line: "He holds on a little too tightly. Neither of you comments on it.",
        approach: "Let him hold on",
        greeting: '"Come here. Closer. There, now the room is bearable."',
        responses: {
          kind: "Hold on just as tight",
          playful: "Point out he's holding tight",
          bold: "Hold on tighter than he does",
          neutral: "Let him hold on wordlessly",
        },
      },
    ],
    bound: [
      {
        line: "He asks before he bites, every time, and the asking is somehow worse.",
        approach: "Say yes",
        greeting: '"May I? ...You always say yes. It undoes me every time."',
        responses: {
          kind: "Let him ask",
          playful: "Say no, then yes",
          bold: "Tell him not to ask",
          neutral: "Let him wait",
        },
      },
      {
        line: '"Centuries," he murmurs against your throat, "and not one of them was this."',
        approach: "Bare your throat",
        greeting:
          '"I love you. I\'ve had a very long time to be certain of something."',
        responses: {
          kind: "Say yes again",
          playful: "Make him ask twice",
          bold: "Pull him back to your throat",
          neutral: "Say nothing",
        },
      },
      {
        line: "He undresses you the way he does everything: slowly, and with immaculate manners.",
        approach: "Let him be improper",
        greeting:
          '"Come here. Let me be terribly, terribly improper about you."',
        responses: {
          kind: "Let him take his time",
          playful: "Rush him along, teasingly",
          bold: "Pull him past the manners",
          neutral: "Let it happen slowly",
        },
      },
      {
        line: "He keeps the curtains drawn well past dawn and blames the sun entirely.",
        approach: "Stay past dawn",
        greeting:
          '"Good. Sleep as long as you like. The sun can complain to me."',
        responses: {
          kind: "Say the sun can wait",
          playful: "Open the curtains",
          bold: "Say he's not fooling anyone",
          neutral: "Draw the curtains",
        },
      },
      {
        line: "The gentleman is intact. What's under it has stopped pretending to be tame.",
        approach: "Let him drop the act",
        greeting:
          '"You\'re mine and I am, rather more surprisingly, entirely yours."',
        responses: {
          kind: "Tell him he's yours too",
          playful: "Tease the gentleman act",
          bold: "Say you like what's underneath",
          neutral: "Let him be, say nothing",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one kind label had no genuine beat match ("Let him be gracious") and was
  // dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      "**{name}** asks {user} whether he may take their hand, then waits for an answer.",
      '"Oh my. How charming." **{name}** appears at {user}\'s elbow, smiling.',
      "{user} calls his name, and **{name}** smiles with rather too many implications in it.",
      '"Oh my, a new face." **{name}** smiles at {user}. "How lovely. Forgive me if I lean on something. I tire so easily."',
    ],
    known: [
      '"You\'ve returned." **{name}** says it to {user} as though it were remarkable.',
      '{user} waves hello, and **{name}** smiles. "I\'d started to think I imagined you."',
      "**{name}** has a favor to ask of {user}, and asks it with his most harmless smile.",
    ],
    warm: [
      '"You haven\'t flinched once," **{name}** observes to {user}, thrilled and slightly put out.',
      "{user} calls out, and **{name}**'s cough evaporates. He forgets to bring it back.",
      '"Do come here." **{name}** informs {user} that personal space is a modern invention.',
    ],
    spark: [
      '"You ought to know better than to play with fire," **{name}** tells {user}, sounding delighted about it.',
      "{user} says hi, and **{name}** stops performing frailty for the length of one look.",
      '"What were you hoping for? Go on, say it." **{name}** waits on {user}, unhurried.',
    ],
    close: [
      '"May I?" **{name}** asks {user}, in public, about something unspecified.',
      "**{name}** walks {user} the whole way across campus and never once asks to be carried.",
      "{user} calls, and the ancient thing under **{name}**'s manners answers immediately.",
    ],
    bound: [
      '"Centuries," **{name}** murmurs to {user}, "and not one of them was this."',
      "**{name}** crosses to {user} without the parasol, the cough, or any of the rest of it.",
      '{user} comes to find **{name}**, and he looks thoroughly pleased to be found. "You came looking for me?"',
    ],
  },
};
