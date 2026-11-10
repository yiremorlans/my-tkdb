import bondScenes from "../bondScenes/shion.js";

export default {
  // Level-up DMs: constants/bondScenes/shion.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He doesn't move to greet you. Only his eyes track across, then his head, slow, to follow you.",
        approach: "Back away slowly",
        greeting: "\"Don't run. Running's predictable, and I'll only follow.\"",
        responses: {
          kind: ["Say you're not scared", "Say you weren't going to run"],
          playful: [
            "Ask how fast he'd follow",
            "Make him guess your next move",
          ],
          bold: ["Tell him to try you", "Walk toward him instead"],
          neutral: ["Watch him carefully", "Stay exactly where you are"],
        },
      },
      {
        line: '"Come closer," he says, flat. "You\'re still too far away. Closer." He isn\'t joking.',
        approach: "Take a step closer",
        greeting: '"Better. Stay there. Let me look at you."',
        responses: {
          kind: ["Stay right where he put you", "Ask if this is close enough"],
          playful: ["Take your time closing the gap", "Take a tiny, tiny step"],
          bold: ["Step closer, not back", "Come closer than he asked"],
          neutral: ["Wait him out", "Let him look at you"],
        },
      },
      {
        line: "He watches you the way he watches the cat across the yard, patient, unblinking, waiting to see what you'll do.",
        approach: "Avoid eye contact",
        greeting: '"Looking away won\'t help. The cat tried that too."',
        responses: {
          kind: ["Let him look his fill", "Hold still for him"],
          playful: ["Give him a better face", "Ask what happened to the cat"],
          bold: ["Stare right back", "Tell him you're not the cat"],
          neutral: ["Give him nothing to read", "Look at the cat instead"],
        },
      },
      {
        line: '"You wandered into the Heebie-Jeebie House on your own," he says. "Terrible instincts. I like them."',
        approach: "Call it curiosity",
        greeting:
          '"Curiosity. Fine. Sit down and be curious where I can see you."',
        responses: {
          kind: ["Say you'll be curious here", "Sit where he can see you"],
          playful: ["Ask which room is worst", "Ask for a tour of the house"],
          bold: ["Own the bad instincts", "Sit wherever you like"],
          neutral: ["Shrug at the label", "Sit down without a word"],
        },
      },
      {
        line: "The way he studies your face feels less like interest and more like he's learning it for later.",
        approach: "Hold still",
        greeting:
          '"That face is nice. I wonder what it looks like when you cry."',
        responses: {
          kind: ["Say his face is nice too", "Ask why he studies you"],
          playful: ["Fake one sniffle for him", "Make a silly face instead"],
          bold: ["Say you're not afraid", "Tell him he'll never see it"],
          neutral: ["Hold still for him", "Keep your face blank"],
        },
      },
    ],
    known: [
      {
        line: "You keep catching his eyes already on you. He doesn't look away when you notice.",
        approach: "Hold his gaze",
        greeting: '"What. I can look at you if I want."',
        responses: {
          kind: ["Let him look all he likes", "Let him have the attention"],
          playful: ["Ask since when", "See who blinks first"],
          bold: ["Hold his gaze right back", "Say you noticed too"],
          neutral: ["Meet his gaze", "Look away first"],
        },
      },
      {
        line: "\"You're still alive, then. I couldn't find you anywhere. I figured I'd killed you and forgotten about it.\"",
        approach: "Ask if he missed you",
        greeting: '"Missed you? No. I just looked everywhere."',
        responses: {
          kind: ["Say you're glad to be found", "Say you're right here"],
          playful: ["Ask if he really looked", "Say you'd have haunted him"],
          bold: ["Say you'd have found him too", "Say he'd never forget you"],
          neutral: ["Say you were around", "Let the comment pass"],
        },
      },
      {
        line: "He's holding something behind his back and waiting for you to ask about it. He'll wait all day.",
        approach: "Refuse to ask",
        greeting:
          "\"...You're not going to ask. Fine. Then I'll just show you.\"",
        responses: {
          kind: ["Ask him nicely", "Let him show you"],
          playful: ["Guess what it is", "Pretend you're not looking"],
          bold: ["Take it out of his hand", "Say you'd never have asked"],
          neutral: ["Wait him out", "Say nothing at all"],
        },
      },
      {
        line: "He's eating a piece of Jo's bread, slowly, and making sure you can see every bite.",
        approach: "Eye the bread",
        greeting: '"You want some too? ...Never giving you any."',
        responses: {
          kind: ["Tell him to enjoy it", "Say Jo bakes well"],
          playful: ["Look tragically hungry", "Steal a bite anyway"],
          bold: ["Stare until he cracks", "Take a piece yourself"],
          neutral: ["Watch him eat the bread", "Let him have the bread"],
        },
      },
      {
        line: "He's resetting the trapdoor trick again. It catches him off guard this time and he goes down with it, and comes back up looking delighted about it.",
        approach: "Ask if he's okay",
        greeting:
          '"Did you see that? Straight down... wait till someone else finds it."',
        responses: {
          kind: ["Wait for him at the edge", "Help him up"],
          playful: ["Laugh at the fall with him", "Ask if the trapdoor won"],
          bold: ["Dare him to go again", "Offer to lure the next one"],
          neutral: ["Watch without reacting", "Say nothing about the fall"],
        },
      },
      {
        line: "Someone bolts past you in the corridor, white-faced. He's strolling up from the direction they came.",
        approach: "Ask what he did",
        greeting:
          '"They were so happy they almost fainted. That\'s three now. Good week."',
        responses: {
          kind: ["Walk on beside him", "Say it was a good week"],
          playful: ["Ask how he managed it", "Ask if you're next"],
          bold: ["Ask to watch the next one", "Say he can't make you faint"],
          neutral: ["Let it pass unremarked", "Say nothing about it"],
        },
      },
      {
        line: "He holds something small and dead out to you on his palm, and waits for your face to do something.",
        approach: "Say thank you",
        greeting:
          "\"Thank you? People usually scream. That's how I know they're happy.\"",
        responses: {
          kind: ["Say you are happy, truly", "Keep the gift safe"],
          playful: ["Ask if it was happy too", "Ask where he found it"],
          bold: ["Say you don't need to scream", "Ask for a bigger one"],
          neutral: ["Take the dead thing", "Leave it on his palm"],
        },
      },
      {
        line: "Your books are gone. In their place is one of the Heebie-Jeebie House's bloody head props, and he doesn't pretend it wasn't him.",
        approach: "Don't even blink",
        greeting:
          '"Why are you so quiet? This is boring. ...Fine. I\'ll find something to do with you."',
        responses: {
          kind: ["Let him have his trick", "Keep the head as a gift"],
          playful: ["Name the head", "Ask what else he can vanish"],
          bold: ["Toss the head back to him", "Ask for a scarier prop"],
          neutral: ["Don't react at all", "Let the books stay gone"],
        },
      },
      {
        line: "He's soaking wet, and offers no explanation for it.",
        approach: "Don't ask why he's wet",
        greeting: '"Not even curious? ...Fine. Now I\'m not telling you."',
        responses: {
          kind: ["Offer him a towel, no fuss", "Let him stay wet"],
          playful: ["Guess where he's been", "Bet he tells you by tonight"],
          bold: ["Demand to know why", "Say you'll find out anyway"],
          neutral: ["Don't ask", "Ignore the wet clothes"],
        },
      },
      {
        line: '"Mio says you asked about me," he says, and it\'s not clear yet if that pleases him or not.',
        approach: "Say you were curious",
        greeting:
          '"Next time, ask me, not Mio. He sighs when I call you my wife."',
        responses: {
          kind: ["Say you just wondered", "Admit you were curious"],
          playful: ["Ask what else Mio says", "Ask since when you're his wife"],
          bold: ["Ask him everything, then", "Say you'd rather ask him"],
          neutral: ["Say you'll ask him next time", "Let it go unremarked"],
        },
      },
      {
        line: "He's turning something over in his gloved hands, something Mio built and plainly didn't build for this.",
        approach: "Ask what it does",
        greeting: '"Mio made it for me. Wanna be my test subject?"',
        responses: {
          kind: ["Hold out your hand for it", "Stand still for the test"],
          playful: ["Volunteer immediately", "Ask what happened to the last"],
          bold: ["Say yes without asking", "Ask to test it on him next"],
          neutral: ["Neither agree nor refuse", "Wait to hear what it does"],
        },
      },
      {
        line: "\"Don't tell Jo,\" he says, holding something he clearly isn't supposed to have.",
        approach: "Keep his secret",
        greeting: '"If Jo finds out, I\'ll know it was you."',
        responses: {
          kind: ["Say it stays between you", "Say you won't tell Jo"],
          playful: ["Ask what he's hiding", "Threaten to tell Jo anyway"],
          bold: ["Demand to see it", "Ask what it's worth to him"],
          neutral: ["Keep it from Jo", "Let it go unremarked"],
        },
      },
      {
        line: "He's put something in your bag while you weren't looking, and now he's watching your hand go in after it.",
        approach: "Reach in anyway",
        greeting: "\"...Nothing? That's no fun. I'll try harder next time.\"",
        responses: {
          kind: ["Reach in without fuss", "Hand it back to him"],
          playful: ["Scream for his benefit", "Guess before you look"],
          bold: ["Say it'll take more than that", "Slip it into his pocket"],
          neutral: ["Look at what he left", "Leave it in there"],
        },
      },
    ],
    warm: [
      {
        line: "His attention tilts to you first, before the rest of the room registers at all.",
        approach: "Step into his eyeline",
        greeting: "\"They said you'd stop visiting. They're usually wrong.\"",
        responses: {
          kind: ["Say you're not going anywhere", "Say you'd have come anyway"],
          playful: ["Say you nearly didn't come", "Ask who 'they' are"],
          bold: ["Tell him to keep watching", "Tell him they're wrong"],
          neutral: ["Say you're still visiting", "Wait to be noticed"],
        },
      },
      {
        line: "He's been waiting in this exact spot, and he wants credit for it.",
        approach: "Greet him first",
        greeting:
          '"You finally came back. I waited the whole time. You should be sorry."',
        responses: {
          kind: ["Say you're glad he waited", "Wait here with him a while"],
          playful: ["Be sorry for one second", "Refuse to feel sorry"],
          bold: ["Say he can wait again tomorrow", "Say you came back for him"],
          neutral: ["Shrug at the wait", "Let the waiting go"],
        },
      },
      {
        line: "\"You're not frightened of me anymore,\" he observes, and can't work out whether that disappoints him.",
        approach: "Hold steady",
        greeting: "\"You're not afraid of me now. That's a whole new game.\"",
        responses: {
          kind: ["Say it's not disappointing", "Stand a little nearer"],
          playful: ["Ask which he'd prefer", "Ask about the new game"],
          bold: ["Close the gap, say you're in", "Say you'll win this one too"],
          neutral: ["Let him work it out", "Hold his gaze"],
        },
      },
      {
        line: "Whatever was standing too near you a moment ago has quietly stopped being a problem.",
        approach: "Notice what he did",
        greeting: '"Stay close to me. Then nothing will dare come near you."',
        responses: {
          kind: ["Stay close to him", "Say you feel safer near him"],
          playful: ["Ask what he did to it", "Ask if it's still breathing"],
          bold: ["Say you saw what he did", "Say you only want him near"],
          neutral: ["Move on", "Stay where you are"],
        },
      },
      {
        line: "\"I'm thirsty. Go to Elias's and bring me that sickly brown stuff.\" He doesn't say please.",
        approach: "Fetch what he asked",
        greeting:
          '"You actually went. ...You like me. Don\'t bother denying it."',
        responses: {
          kind: ["Bring two, one for you", "Bring it without complaint"],
          playful: ["Deny it anyway", "Take the first sip yourself"],
          bold: ["Say of course you like him", "Deny nothing"],
          neutral: ["Fetch it without a word", "Hand him the drink"],
        },
      },
      {
        line: '"Walk the Heebie-Jeebie House with me tonight. I like to watch the faces they make."',
        approach: "Take his arm",
        greeting:
          '"Good. Hold on tight. If you let go, I\'ll have to come find you. ...I always do."',
        responses: {
          kind: ["Stay close through the house", "Say you'll hold on tight"],
          playful: ["Bet on who screams first", "Threaten to let go"],
          bold: ["Say frights don't scare you", "Dare him to find you"],
          neutral: ["Hold his sleeve", "Walk in beside him"],
        },
      },
      {
        line: "He's slumped over a table with his hat over his face. \"Don't talk to me. Mio's damn noisy clock woke me up. I'm in a terrible mood.\"",
        // His canon terrible mood: keeping his no-talking rule and plotting against the clock lands; staying close despite the mood is the runner-up.
        mood: true,
        approach: "Sit down anyway",
        greeting: '"...Fine. You can stay. Not a word, though."',
        responses: {
          kind: ["Stay quiet beside him", "Ask if he wants to nap"],
          playful: ["Slide him a note instead", "Offer to bury the clock"],
          bold: ["Rest your head by his", "Say he couldn't make you leave"],
          neutral: ["Say nothing at all", "Wait for him to sit up"],
        },
      },
      {
        line: "He's glaring at the kitchen door. \"I'm the only one who didn't get breakfast. Because I didn't wake up on time?\"",
        // A petulant sulk: playing along with the grievance lands, telling him off doesn't.
        mood: true,
        approach: "Agree with him",
        greeting: '"Everyone should adjust to me. You already do."',
        responses: {
          kind: ["Wait with him for lunch", "Say you'd have waited for him"],
          playful: [
            "Offer to raid the kitchen",
            "Say they owe him dessert now",
          ],
          bold: ["Say he's lucky you adjust", "Say you won't eat without him"],
          neutral: ["Look at the kitchen door", "Let him sulk"],
        },
      },
      {
        line: '"I swapped Mio\'s toolbox for a bunch of worms." He\'s crouched by the workshop door, waiting. "He\'s gonna be shocked when he opens it."',
        // Mid-prank and he wants an accomplice: being in on it lands, upping the stakes doesn't.
        mood: true,
        approach: "Wait with him",
        greeting:
          "\"Shh. He's coming. Don't warn him. If you warn him, you're next.\"",
        responses: {
          kind: ["Promise you won't warn Mio", "Keep watch with him"],
          playful: ["Crouch down next to him", "Count down on your fingers"],
          bold: ["Say he wouldn't dare", "Say you're on his side"],
          neutral: ["Keep quiet and watch", "Stay where you are"],
        },
      },
      {
        line: '"Listen carefully. If you do something bad, you\'ll be punished." He\'s planted in your way. "You better tell me everything before I get angry."',
        approach: "Ask what you did",
        greeting:
          "\"You were gone all morning. You didn't tell me where. That's bad.\"",
        responses: {
          kind: [
            "Promise to tell him next time",
            "Say you were thinking of him",
          ],
          playful: ["Tell him only half", "Make him earn the answer"],
          bold: ["Tell him every last detail", "Say he could've come along"],
          neutral: ["Wait for him to calm down", "Say nothing either way"],
        },
      },
      {
        line: '"Where are you going?" He\'s fallen into step before you can answer. "...Hmm. Then I\'ll come with you."',
        approach: "Let him tag along",
        greeting: '"Walk slower. I want people to see us together."',
        responses: {
          kind: ["Slow down for him", "Say you're glad of the company"],
          playful: ["Speed up on purpose", "Ask who he's showing off to"],
          bold: ["Tell him to keep up", "Take his sleeve"],
          neutral: ["Keep walking", "Tell him where"],
        },
      },
      {
        line: "\"What's with those people? They look like they're having fun.\" He's already heading over. \"I'll join them.\"",
        approach: "Go with him",
        greeting: '"Watch. ...There. Now they\'re running. Much better."',
        responses: {
          kind: ["Stay right at his side", "Let him have his fun"],
          playful: ["Rate the scare out of ten", "Say that was fast"],
          bold: ["Say it's your turn to join", "Ask to scare the next one"],
          neutral: ["Watch it happen", "Stand back"],
        },
      },
      {
        line: '"Mio is my little brother," he says, out of nowhere. "Blood relation? That\'s pointless. A hateful chain."',
        approach: "Ask what family is, then",
        greeting:
          "\"The kind I picked. Mio, Jo, Elias. ...You're on the list. You're my wife.\"",
        responses: {
          kind: [
            "Say picked family sounds nice",
            "Say you're glad to be family",
          ],
          playful: ["Ask if Mio agrees", "Ask who else he's adopted"],
          bold: ["Say you picked him too", "Claim him as your family"],
          neutral: ["Nod", "Let him keep talking"],
        },
      },
      {
        line: '"That guy earlier. Who was he?" He\'s looking past you, down the hall. "...I see. Alright then. I\'ll remember his face."',
        approach: "Tell him it was nobody",
        greeting:
          '"Nobody has a face. I saw it. My wife shouldn\'t talk to nobodies."',
        responses: {
          kind: ["Say he's just a classmate", "Say you'd rather talk to him"],
          playful: ["Ask if he's jealous", "Say nobody was very nice"],
          bold: ["Say nobody else counts", "Say you'll talk to anyone"],
          neutral: ["Change the subject", "Keep walking"],
        },
      },
      {
        line: "You find him at the docks after dark, feet in the water. He doesn't pull them out when he sees you.",
        approach: "Sit on the dock with him",
        greeting:
          "\"Water's better than air. Air's too dry. You wouldn't get it.\"",
        responses: {
          kind: ["Ask if he's feeling okay", "Say you'll stay till he's done"],
          playful: ["Dip your feet in too", "Splash him"],
          bold: ["Say you get more than he knows", "Say you'd like to get it"],
          neutral: ["Sit on the edge", "Listen to the water"],
        },
      },
      {
        line: "He's carrying a briefcase that is definitely not his. \"Elias begged me, so I'm carrying it for him. I'm impressive, right?\"",
        approach: "Tell him he's impressive",
        greeting: '"Right. Say it again. ...Elias didn\'t say it once. Rude."',
        responses: {
          kind: ["Say it again, and mean it", "Offer to help him carry it"],
          playful: ["Ask what's inside", "Say Elias is lucky"],
          bold: ["Say only you get to say it", "Say the next one costs him"],
          neutral: ["Walk with him to Elias", "Nod"],
        },
      },
      {
        line: '"The Rain Garden people have creepy eyes. The pharmacy guy is arrogant and persistent." He\'s listing them off like a grudge. "And the gambling den... has someone in the way."',
        approach: "Ask who's in the way",
        greeting: "\"Doesn't matter. You don't go there without me.\"",
        responses: {
          kind: ["Say you'll stick close there", "Let him finish his list"],
          playful: ["Ask him to rate Dionysia", "Add a house to his list"],
          bold: ["Say he'll have to come, then", "Say nobody's in your way"],
          neutral: ["Nod along", "Let the grudge go"],
        },
      },
      {
        line: '"I\'m sleeping in the Heebie-Jeebie House tonight." He says it like an invitation. "Might be fun if someone wanders in."',
        approach: "Ask who he's expecting",
        greeting:
          '"Whoever wanders in. ...I\'d rather it was you. Come by late."',
        responses: {
          kind: ["Say you'll bring a blanket", "Ask if he'll be cold"],
          playful: ["Promise to scare him first", "Ask what's in it for you"],
          bold: ["Say you'll be the one", "Say he'll be the scared one"],
          neutral: ["Say maybe", "Tell him good night"],
        },
      },
    ],
    spark: [
      {
        line: "He lets the flat calm slip an inch, just for you, just long enough that you're sure you saw it.",
        approach: "Let him look properly",
        greeting: '"Let me look at you properly. I\'ve earned that much."',
        responses: {
          kind: "Let him take his time",
          playful: "Steal his next line",
          bold: "Hold his gaze right back",
          neutral: "Say nothing",
        },
      },
      {
        line: "He steps in close behind you and speaks right at your ear, entirely on purpose.",
        approach: "Go round the back",
        greeting:
          '"Come round the back of the house. The good frights are back there."',
        responses: {
          kind: "Reach for his hand",
          playful: "Play the dangerous thing",
          bold: "Go round the back with him",
          neutral: "Let him have the quiet",
        },
      },
      {
        line: '"You stopped being afraid," he murmurs. "Now you\'re something far worse."',
        approach: "Ask what's worse",
        greeting:
          '"I\'m not in the mood to make you cry today. Come back later for that."',
        responses: {
          kind: "Tell him you're not afraid",
          playful: "Ask how much worse",
          bold: "Say you like being worse",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "He takes your wrist, turns it over, and studies your pulse like it told him something he liked.",
        approach: "Let him take your wrist",
        greeting: '"Your pulse is quick. I do like being the reason."',
        responses: {
          kind: "Let him hold your wrist",
          playful: "Make his pulse quick instead",
          bold: "Turn his wrist over instead",
          neutral: "Let him study your pulse",
        },
      },
      {
        line: '"You\'re getting bold," he says, almost approving. "Because you\'re nearly mine."',
        approach: "Say it",
        greeting:
          "\"Say you're mine. You don't have to mean it yet. I'm patient.\"",
        responses: {
          kind: "Say you're getting there",
          playful: "Tease the word 'nearly'",
          bold: "Say you're his",
          neutral: "Let the claim sit unanswered",
        },
      },
    ],
    close: [
      {
        line: '"For you," Shion says, and the flatness cracks just enough to let a real smile through.',
        approach: "Go to him",
        greeting: '"You\'re mine to look after now. My wife."',
        responses: {
          kind: "Let him look after you",
          playful: "Make the villain laugh",
          bold: "Claim him right back",
          neutral: "Accept it from him",
        },
      },
      {
        line: "He puts himself between you and the room without seeming to have decided to.",
        approach: "Stand behind him",
        greeting:
          "\"The world's a cruel place. You're simply never going to be out in it.\"",
        responses: {
          kind: "Let him stand there",
          playful: "Play along with him",
          bold: "Step out from behind him",
          neutral: "Let him watch over you",
        },
      },
      {
        line: '"Nothing in here touches you," he says, mild about it. "It\'s mine. I\'ve made arrangements."',
        approach: "Trust his arrangements",
        greeting:
          '"Anything that reaches you goes through me first. That isn\'t aimed at you."',
        responses: {
          kind: "Trust the arrangements",
          playful: "Prank him back",
          bold: "Tell him you're not fragile",
          neutral: "Let the room go quiet",
        },
      },
      {
        line: "The blank calm falls away, and what's underneath is startlingly gentle.",
        approach: "Let him take your hand",
        greeting:
          "\"I've watched a great many things suffer. I won't watch you.\"",
        responses: {
          kind: "Thank him for the truth",
          playful: "Tease the softness out",
          bold: "Dare him to be thorough",
          neutral: "Stay silent beside him",
        },
      },
      {
        line: "He drops every last piece of the front. Only you get that. Only ever you.",
        approach: "Let the front drop",
        greeting:
          '"Look, no front, nothing put on. Do you know what that costs me?"',
        responses: {
          kind: "Tell him he isn't a monster",
          playful: "Tease him for dropping the act",
          bold: "Say you see all of him now",
          neutral: "Let him have the quiet",
        },
      },
    ],
    bound: [
      {
        line: "The front is off and stays off, and what's under it adores you past all reason.",
        approach: "Come here",
        greeting: '"Come here. Let me look at what\'s mine."',
        responses: {
          kind: "Hold his face",
          playful: "Upstage him for once",
          bold: "Pull him up by the collar",
          neutral: "Let him watch you",
        },
      },
      {
        line: "He kneels to take your hand, which from him isn't submission but something heavier.",
        approach: "Let him kneel",
        greeting: '"Nothing will ever reach you. I\'ve been very thorough."',
        responses: {
          kind: "Let him kneel",
          playful: "Make him wait for it",
          bold: "Pull him back to his feet",
          neutral: "Let him hold your hand",
        },
      },
      {
        line: '"My wife," he breathes, and means every letter of it.',
        approach: "Say it properly",
        greeting: '"Say you\'re mine. Properly, this time."',
        responses: {
          kind: "Say it back",
          playful: "Refuse to say it properly",
          bold: "Say it back louder",
          neutral: "Let the moment stretch",
        },
      },
      {
        line: "He traces your pulse with his mouth and takes a very long time about it.",
        approach: "Stay till he sleeps",
        greeting:
          "\"The night's the worst of it. Stay till I'm asleep. ...Stay after.\"",
        responses: {
          kind: "Say you'll stay after",
          playful: "Count how long he takes",
          bold: "Tell him to be thorough",
          neutral: "Stay silent in the dark",
        },
      },
      {
        line: "He'd end the world for you. He mentions it the way other people mention the weather.",
        approach: "Let him mean it",
        greeting:
          "\"I love you. It's an old feeling, and I've carried it too long without saying so.\"",
        responses: {
          kind: "Say you'd do the same",
          playful: "Ask for a smaller gesture",
          bold: "Say you're his",
          neutral: "Let him mean it quietly",
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
      '**{name}**\'s eyes track over first, then his head, slow. "...You knew my name." {user} did.',
      '"Come closer." **{name}** says it to {user} like it isn\'t a request.',
      "{user} says hi, and **{name}** looks pleased in a way that isn't reassuring.",
      '**{name}** tilts his head at {user} and smiles, slow. "Hm? Most people keep their distance."',
    ],
    known: [
      "**{name}**'s eyes are already on {user}. He doesn't look away when they notice.",
      '"You\'re still alive, then." **{name}** looks {user} over. "I looked everywhere."',
      '"Hurry up already." **{name}** has been waiting on {user}, and acts like that\'s their fault.',
    ],
    warm: [
      "**{name}** had been waiting in this exact spot for {user}.",
      '"My wife." **{name}** greets {user} with it, like it\'s already settled.',
      "**{name}** was in a foul mood right up until {user} showed up.",
    ],
    spark: [
      "\"You're not scared of me.\" **{name}** can't decide whether that disappoints him about {user}.",
      "{user} calls his name, and **{name}** closes the distance immediately. All of it.",
      '"Closer." **{name}** has said it to {user} before.',
    ],
    close: [
      "**{name}** takes {user}'s hand and does not give it back.",
      '"Who else was out here?" **{name}** asks {user}, already deciding to remember their faces.',
      "\"Where are you going? ...Hmm. Then I'll come with you.\" **{name}** doesn't give {user} a vote.",
    ],
    bound: [
      '"My wife," **{name}** breathes, and means every letter of it to {user}.',
      "**{name}** tucks {user} under the jacket draped over his shoulders, like he's hiding them from everyone else.",
      "{user} meets **{name}** halfway, and he decides, again, that forever is the plan.",
    ],
  },
};
