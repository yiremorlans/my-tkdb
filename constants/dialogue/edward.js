import bondScenes from "../bondScenes/edward.js";

export default {
  // Level-up DMs: constants/bondScenes/edward.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He greets you with a charming smile, as if you've arrived exactly on time, but there's something dangerous beneath the gentleman's facade.",
        approach: "Introduce yourself",
        greeting: '"My. A new face. Won\'t you keep me company?"',
        responses: {
          kind: ["Say you'll keep him company", "Stay as long as he likes"],
          playful: ["Ask who he was expecting", "Ask if you're late or early"],
          bold: ["Close the distance first", "Say you're right on time"],
          neutral: ["Let him do the talking", "Nod and step inside"],
        },
      },
      {
        line: 'He watches you take in Obscuary with a slight, amused smile. "Ah, to be young."',
        approach: "Ask what's so amusing",
        greeting: '"Ah ha ha ha. Pardon me. You\'re simply so full of energy."',
        responses: {
          kind: ["Ask if he'd like to join you", "Say he seems young at heart"],
          playful: [
            "Ask how long ago that was",
            "Ask if napping keeps him young",
          ],
          bold: [
            "Take his arm, bring him along",
            "Say he's not too old for this",
          ],
          neutral: ["Keep looking around", "Let him watch, say nothing"],
        },
      },
      {
        line: '"My favorite channel should be posting a new video at any moment..."',
        approach: "Try to get his attention",
        greeting: '"Sorry, but could we continue this tomorrow?"',
        responses: {
          kind: ["Ask what channel it is", "Say you'll come back tomorrow"],
          playful: [
            "Guess what the video is about",
            "Ask if you can subscribe too",
          ],
          bold: ["Ask to join him", "Say it's a date, then"],
          neutral: ["Leave him to his video", "Come back another time"],
        },
      },
      {
        line: "You turn around and he's simply there, smiling, as though he has been standing behind you for some time.",
        approach: "Admit you got a little lost",
        greeting:
          '"You mustn\'t wander Obscuary alone. It would be troublesome for me if you were to disappear."',
        responses: {
          kind: ["Ask him to show you around", "Ask him to walk with you"],
          playful: ["Ask how long he's been there", "Ask if he followed you"],
          bold: ["Say you were looking for him", "Smile right back at him"],
          neutral: ["Hold your ground, say nothing", "Step back a pace"],
        },
      },
      {
        line: "Everyone says Obscuary's captain is the most powerful vampire alive. The man himself is yawning into his sleeve.",
        approach: "Ask if the rumors are true",
        greeting: '"Hm? The most powerful vampire? No, those are just rumors."',
        responses: {
          kind: [
            "Say you'd like to know him",
            "Say rumors don't matter to you",
          ],
          playful: ["Ask how old he really is", "Ask who started the rumor"],
          bold: ["Say you'll decide for yourself", "Ask him to prove it wrong"],
          neutral: ["Stay watchful", "Keep your thoughts to yourself"],
        },
      },
    ],
    known: [
      {
        line: "The gentleman act is unchanged. The interest behind it is no longer performed.",
        approach: "See past the act",
        greeting:
          '"You visit more than duty requires. I\'ve noticed. I notice everything, given time."',
        responses: {
          kind: ["Say you like visiting him", "Say you noticed too"],
          playful: ["Call out the dropped act", "Ask how long he's watched"],
          bold: ["Say duty isn't why you come", "Ask why he keeps performing"],
          neutral: ["Let the act be, say nothing", "Notice, say nothing"],
        },
      },
      {
        line: '"You\'ve returned," he says, as though it were remarkable. To him it is.',
        approach: "Say you'll keep returning",
        greeting: '"I\'d started to think I imagined you."',
        responses: {
          kind: ["Say you meant to", "Say he's worth the trip"],
          playful: ["Say you're very real", "Tease him for being surprised"],
          bold: ["Say of course you returned", "Ask why that's remarkable"],
          neutral: ["Shrug, say nothing", "Let the remark pass"],
        },
      },
      {
        line: "\"Ah, there you are. I've a favor to ask of you: come to my room and I'll explain.\"",
        approach: "Ask what he needs",
        greeting:
          '"Do sit. I had Rui move the chair nearer. I find I dislike raising my voice."',
        responses: {
          kind: ["Take the chair he moved", "Ask if he's feeling unwell"],
          playful: [
            "Ask if Rui minded moving it",
            "Scoot the chair even closer",
          ],
          bold: ["Say the favor was the chair", "Tell him to name the favor"],
          neutral: [
            "Sit and wait for the favor",
            "Leave the chair where it is",
          ],
        },
      },
      {
        line: "The fragility slips for a moment. He lets it, and watches what you do.",
        approach: "Take a chance",
        greeting:
          '"Ah. You saw that. How careless of me... Well, what will you do about it?"',
        responses: {
          kind: ["Don't look away", "Say you won't tell Rui"],
          playful: ["Tease the slip", "Egg him on a little"],
          bold: ["Meet it head-on", "Say you saw it too"],
          neutral: ["Watch, say nothing", "Let it pass unremarked"],
        },
      },
      {
        line: "He's noticed you no longer check where the door is. For once, the amusement is gone, and what's left looks a lot like relief.",
        approach: "Settle in",
        greeting:
          '"You\'ve stopped looking for the exit. I confess I find that rather flattering."',
        responses: {
          kind: ["Say you weren't leaving", "Say you like it here"],
          playful: ["Admit you eyed the door", "Tease him for noticing"],
          bold: ["Put your feet up", "Close the door behind you"],
          neutral: ["Shrug, say nothing", "Let it go unremarked"],
        },
      },
      {
        line: "He has no interest in the missions or the gossip. What he wants, apparently, is the boring parts.",
        approach: "Ask what he wants to hear",
        greeting:
          '"Tell me about your week. The dull parts, mind. I\'ve had quite enough of the interesting ones."',
        responses: {
          kind: ["Tell him something dull", "Share something ordinary"],
          playful: [
            "Make up something absurd",
            "Ask what counts as dull enough",
          ],
          bold: ["Tell him something surprising", "Demand he share one too"],
          neutral: ["Say it was a quiet week", "Mention the weather"],
        },
      },
      {
        line: '"I\'m feeling worse than usual today," he says, in the exact tone of a man angling for sympathy.',
        approach: "Sit with him a while",
        greeting:
          '"Ah, sympathy. How restorative. I feel better already... No, wait. Worse. Stay."',
        responses: {
          kind: ["Offer to fetch him tea", "Fuss over him a little"],
          playful: ["Call out the fishing", "Demand he admit he's fine"],
          bold: ["Ask what's actually wrong", "Say he's clearly fine"],
          neutral: ["Nod along, say nothing", "Let him have the performance"],
        },
      },
      {
        line: '"Rui worries too much," he says, of the exact thing Rui is right to worry about.',
        approach: "Ask what Rui's worried about",
        greeting:
          '"Rui thinks I watch too many videos about the shady cabal of elites. He simply hasn\'t seen enough of them."',
        responses: {
          kind: ["Say Rui might have a point", "Say Rui just cares a lot"],
          playful: ["Ask what he did this time", "Tease him about the worry"],
          bold: ["Say the cabal isn't real", "Push him to explain himself"],
          neutral: ["Stay out of it", "Let it go unremarked"],
        },
      },
      {
        line: "He's stopped pretending he wasn't waiting for you to visit.",
        approach: "Say you came to see him",
        greeting:
          "\"I've saved you a seat. I didn't plan to. It simply... happened.\"",
        responses: {
          kind: ["Say you're glad to see him", "Take the seat he saved"],
          playful: ["Tease him for waiting", "Ask how long he waited"],
          bold: ["Say you knew he was waiting", "Call out the pretending"],
          neutral: ["Let the comment pass", "Say nothing about it"],
        },
      },
      {
        line: 'He calls you "wicked girl" in a tone that makes it sound like the nicest thing he\'s said all week.',
        approach: "Ask why he calls you that",
        greeting:
          '"You keep walking into a vampire\'s room of your own accord. What else would I call you?"',
        responses: {
          kind: ["Let him explain it", "Say you like the name"],
          playful: ["Demand a better nickname", "Ask what earned it"],
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
          playful: ["Read it back in his voice", "Threaten to tell Rui"],
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
          bold: [
            "Say it's none of his business",
            "Say neither, and look at him",
          ],
          neutral: ["Shrug, say nothing", "Change the subject"],
        },
      },
      {
        line: '"Carry me to bed," he says, not really joking, and not really asking either.',
        approach: "Go get Rui",
        greeting: '"Rui? Oh, how unkind. I did ask you so nicely."',
        responses: {
          kind: ["Say Rui's on his way", "Fetch a blanket instead"],
          playful: ["Pretend not to hear him", "Tease him for the demand"],
          bold: ["Refuse and tell him to walk", "Say he's perfectly capable"],
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
          kind: ["Sit and fuss over him", "Ask if it really hurts"],
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
          kind: ["Take what he offers gladly", "Say the coat is enough"],
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
          bold: ["Tell him to look himself", "Say he hid it to keep you here"],
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
          kind: ["Tell him the truth", "Ask if he is"],
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
          kind: ["Say he makes it easy", "Thank him for having you"],
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
          kind: ["Say you'll talk to Towa", "Find a different hill"],
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
          kind: ["Tell him the whole story", "Say it's handled now"],
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
          kind: ["Thank him for the invite", "Pour him a cup"],
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
          kind: "Take him at his word",
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
      {
        line: "**{name}** asks {user} whether he may take their hand, then waits for an answer.",
        responses: {
          kind: "Offer your hand",
          playful: "Ask what he'll do with it",
          bold: "Ask what he really wants",
        },
      },
      {
        line: '"Oh my. How charming." **{name}** appears at {user}\'s elbow, smiling.',
        responses: {
          kind: "Ask if he's been there long",
          playful: "Curtsy to the gentleman",
          bold: "Say you saw him coming",
        },
      },
      {
        line: "{user} says the name, and **{name}** smiles with rather too many implications in it.",
        responses: {
          kind: "Return the smile",
          playful: "Ask which implication",
          bold: "Say you caught all of them",
        },
      },
      {
        line: '"Oh my, a visitor." **{name}** smiles at {user}. "How lovely. Forgive me if I lean on something. I tire so easily."',
        responses: {
          kind: "Offer him your arm",
          playful: "Ask if he's really a vampire",
          bold: "Say you're not fooled",
        },
      },
    ],
    known: [
      {
        line: '"You\'ve returned." **{name}** says it to {user} as though it were remarkable.',
        responses: {
          kind: "Say you wanted to",
          playful: "Ask if you're a miracle",
          bold: "Say of course you did",
        },
      },
      {
        line: '{user} says the name, and **{name}** smiles. "I\'d started to think I imagined you."',
        responses: {
          kind: "Say you'd never vanish",
          playful: "Ask if you're his best dream",
          bold: "Say he can check",
        },
      },
      {
        line: "**{name}** has a favor to ask of {user}, and asks it with his most harmless smile.",
        responses: {
          kind: "Ask what the favor is",
          playful: "Ask what it'll cost you",
          bold: "Say the smile won't work",
        },
      },
    ],
    warm: [
      {
        line: '"You haven\'t flinched once," **{name}** observes to {user}, thrilled and slightly put out.',
        responses: {
          kind: "Say he isn't that scary",
          playful: "Flinch just for him",
          bold: "Dare him to make you",
        },
      },
      {
        line: "{user} calls out, and **{name}**'s cough evaporates. He forgets to bring it back.",
        responses: {
          kind: "Ask if he's feeling better",
          playful: "Remind him about the cough",
          bold: "Say the act slipped",
        },
      },
      {
        line: '"Do come here." **{name}** informs {user} that personal space is a modern invention.',
        responses: {
          kind: "Step closer to him",
          playful: "Ask when it was invented",
          bold: "Close the space between you",
        },
      },
    ],
    spark: [
      {
        line: '"You ought to know better than to play with fire," **{name}** tells {user}, sounding delighted about it.',
        responses: {
          kind: "Say you know what you're doing",
          playful: "Ask if you'll get burned",
          bold: "Play with it anyway",
        },
      },
      {
        line: "{user} says the name, and **{name}** stops performing frailty for the length of one look.",
        responses: {
          kind: "Say you saw the real him",
          playful: "Ask where the frailty went",
          bold: "Hold the look",
        },
      },
      {
        line: '"What were you hoping for? Go on, say it." **{name}** waits on {user}, unhurried.',
        responses: {
          kind: "Say you hoped to see him",
          playful: "Say you hoped for tea",
          bold: "Say it",
        },
      },
    ],
    close: [
      {
        line: '"May I?" **{name}** asks {user}, in public, about something unspecified.',
        responses: {
          kind: "Say yes",
          playful: "Ask may you what",
          bold: "Say he may",
        },
      },
      {
        line: "**{name}** walks {user} the whole way across campus and never once asks to be carried.",
        responses: {
          kind: "Say he did well",
          playful: "Offer to carry him now",
          bold: "Say the act is over",
        },
      },
      {
        line: "{user} calls, and the ancient thing under **{name}**'s manners answers immediately.",
        responses: {
          kind: "Say you're glad it came",
          playful: "Ask how old it is",
          bold: "Say you like that one",
        },
      },
    ],
    bound: [
      {
        line: '"Centuries," **{name}** murmurs to {user}, "and not one of them was this."',
        responses: {
          kind: "Say this is yours now",
          playful: "Ask about century three",
          bold: "Say it's only the start",
        },
      },
      {
        line: "**{name}** crosses to {user} without the parasol, the cough, or any of the rest of it.",
        responses: {
          kind: "Say he looks well",
          playful: "Ask where the parasol went",
          bold: "Say he never needed them",
        },
      },
      {
        line: "{user} says the name, and **{name}** stops being alone.",
        responses: {
          kind: "Say he never will be again",
          playful: "Ask if he's sure",
          bold: "Say you're staying",
        },
      },
    ],
  },
};
