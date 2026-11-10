import bondScenes from "../bondScenes/kaito.js";

export default {
  // Level-up DMs: constants/bondScenes/kaito.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He's pressed into a doorway watching the hall, and startles hard when he clocks you.",
        approach: "Say hi before he bolts",
        greeting:
          '"Oh thank god, it\'s just you... I thought he found me. Sorry. You came around the corner really fast."',
        responses: {
          kind: ["Apologize for the scare", "Offer to keep watch with him"],
          playful: [
            "Ask if this is a stakeout",
            "Ask if you're on WickHive now",
          ],
          bold: ["Ask who he's hiding from", "Step into his hiding spot"],
          neutral: ["Nod along", "Give him a second"],
        },
      },
      {
        line: "Somebody leaked something on WickHive, and he's reacting to it out loud, to nobody in particular.",
        approach: "Ask what's going on",
        greeting:
          '"Wait, have you been on WickHive yet? No? Okay, okay, so get this..."',
        responses: {
          kind: ["Ask him to start from the top", "Ask him to show you the post"],
          playful: ["Gasp along with him", "Ask if you're in the leak"],
          bold: ["Ask who leaked it", "Pull up WickHive beside him"],
          neutral: ["Let him run out of steam", "Half-listen, say nothing"],
        },
      },
      {
        line: "He's hovering nearby like he's hoping you'll ask him something. Being the guy who knows things about Darkwick is a role he'd very much like to have.",
        approach: "Ask him for directions",
        greeting:
          "\"You're new, right? I'm Kaito! If you need to know anything about Darkwick, ask me. I'm pretty savvy!\"",
        responses: {
          kind: ["Ask where the good food is", "Say you could use a guide"],
          playful: ["Ask for the latest rumor", "Ask which teacher to avoid"],
          bold: ["Ask him for the full tour", "Ask what Frostheim is like"],
          neutral: ["Just listen", "Take the offer at face value"],
        },
      },
      {
        line: 'He waves so hard he nearly clips a lamp. "Hey! Over here. Hiya!"',
        approach: "Wave back",
        greeting:
          "*Must be my lucky day! They actually waved back. ...Okay. Stay cool, Kaito.*",
        responses: {
          kind: ["Say you hoped he'd notice you", "Say you're glad he called"],
          playful: ["Say they heard him in Hotarubi", "Get swept up in his energy"],
          bold: ["Ask what he called you for", "Walk right up to him"],
          neutral: ["Give a small wave back", "Nod instead of waving"],
        },
      },
      {
        line: '"Argh, I want junk food! And I want to try all the new snack flavors!" He\'s glaring at the campus store shelf.',
        approach: "Ask which flavor's best",
        greeting:
          "\"All of them. That's the problem. ...Wanna split one? I'm Kaito, by the way.\"",
        responses: {
          kind: ["Offer to split one", "Say you'll try his favorite"],
          playful: ["Vote for the weirdest one", "Suggest a taste-test"],
          bold: ["Buy him the new flavor", "Ask him to pick for you"],
          neutral: ["Grab a snack, say nothing", "Browse the shelf beside him"],
        },
      },
    ],
    known: [
      {
        line: "He lights up when he spots you, then immediately checks whether he's bothering you.",
        approach: "Say hi back",
        greeting:
          '"Hey! Wait, am I being annoying? Sorry! You can tell me if I am."',
        responses: {
          kind: ["Say he's not annoying at all", "Say you came to find him"],
          playful: ["Ask what annoying looks like", "Tease him for checking"],
          bold: ["Say you'd tell him if he was", "Sit down and stay a while"],
          neutral: ["Say it's fine", "Shrug it off"],
        },
      },
      {
        line: "He's carrying a tin of homemade cookies and holding it out before he's even said hi.",
        approach: "Try what he baked",
        greeting:
          '"I made cookies! Okay, a lot of cookies. Try one? Be honest, are they good?"',
        responses: {
          kind: ["Tell him they're really good", "Say you'd eat these daily"],
          playful: ["Take three to be safe", "Ask for the secret ingredient"],
          bold: ["Say you want the recipe", "Take the whole tin"],
          neutral: ["Take one, say nothing", "Eat it without comment"],
        },
      },
      {
        line: "He shows you the same WickHive post he showed you yesterday. You let him.",
        approach: "Look at the post again",
        greeting:
          "\"Have you seen WickHive yet? Someone leaked next month's cafeteria menu. Oh wait... I-I showed you this yesterday, didn't I?!\"",
        responses: {
          kind: ["Say it's still good news", "Let him have the moment"],
          playful: ["Recite the menu back to him", "Pretend it's brand new"],
          bold: ["Say you remember it", "Say you'd hear it again"],
          neutral: ["Look without saying anything", "Nod along"],
        },
      },
      {
        line: "He's ducking around a corner. \"Shit, it's Luca, he's off to train, I gotta... oh. Just you. Phew.\"",
        approach: "Tell him the coast is clear",
        greeting:
          "\"If he spots me he'll make me run laps with him. I can't. I would actually die.\"",
        responses: {
          kind: ["Say he doesn't have to go", "Say you'll hide with him"],
          playful: ["Tease him for hiding", "Offer to run laps instead"],
          bold: ["Offer to run one lap with him", "Say you'll cover for him"],
          neutral: ["Let him explain in his time", "Wait for him to relax"],
        },
      },
      {
        line: '"Ahem... Testing, testing... Morning! Heh, nailed it..." He\'s rehearsing a greeting to nobody.',
        approach: "Say good morning back",
        greeting: '"Ack! How long\'ve you been there?!"',
        responses: {
          kind: ["Say he nailed it", "Say it worked on you"],
          playful: ["Rate it a solid ten", "Ask for an encore"],
          bold: [
            "Say you heard the whole thing",
            "Say practice on you instead",
          ],
          neutral: ["Pretend you just got here", "Wave and keep walking"],
        },
      },
      {
        line: '"Noooo why does Tohma want to see me...? No way it\'s about something good!"',
        approach: "Ask what Tohma wants",
        greeting:
          "\"I don't know! That's the scary part. ...Could you come with me? Please?\"",
        responses: {
          kind: ["Say he won't face it alone", "Promise to stay close"],
          playful: ["Tease him about the nerves", "Ask what he did this time"],
          bold: ["Say you'll walk in first", "Say you'll do the talking"],
          neutral: ["Go along without comment", "Wait outside the door"],
        },
      },
      {
        line: '"All right, time to man up and bite the bullet... Nope, absolutely not, can\'t do it!"',
        approach: "Ask what he can't do",
        greeting:
          "\"Nothing! It's nothing. ...Okay, it's a whole thing. Don't ask.\"",
        responses: {
          kind: ["Say he can do it", "Say you'll go with him"],
          playful: ["Offer him a pep talk", "Bet he can do it by Friday"],
          bold: ["Say you'll go first", "Say you'll stand right there"],
          neutral: ["Let him work up to it", "Give him a minute"],
        },
      },
      {
        line: "He's saved you a seat before you even got there, then acts like it was an accident.",
        approach: "Take the seat he saved",
        greeting:
          '"Oh, that seat? It was just open. I wasn\'t saving it. ...Okay, I was saving it."',
        responses: {
          kind: ["Sit down in it right away", "Say you'd have saved his too"],
          playful: [
            "Say you believed him at first",
            "Ask who else it was open for",
          ],
          bold: ["Say you knew all along", "Say save it every day"],
          neutral: ["Sit without remarking on it", "Set your things down"],
        },
      },
      {
        line: '"Hey, you seem different somehow today. Did you change something? Or am I just imagining things?!"',
        approach: "Ask what he noticed",
        greeting:
          "\"I don't know! Something. ...Oh no, I should know, shouldn't I?\"",
        responses: {
          kind: ["Say you're glad he noticed", "Say he's not imagining it"],
          playful: [
            "Make him guess what changed",
            "Say you changed everything",
          ],
          bold: ["Ask why he's looking so close", "Say he noticed first"],
          neutral: ["Say nothing changed", "Let him keep guessing"],
        },
      },
      {
        line: "He's mid-apology for something that wasn't his fault before you've even asked what happened.",
        approach: "Tell him it's okay",
        greeting: '"Sorry! Sorry. I know, I\'m doing it again. Sorry."',
        responses: {
          kind: [
            "Tell him it's not his fault",
            "Say there's nothing to forgive",
          ],
          playful: ["Point out the apology again", "Count how many sorries"],
          bold: ["Say you're on his side", "Ask what actually happened"],
          neutral: ["Let the apology run its course", "Wait for him to finish"],
        },
      },
      {
        line: '"Okay but don\'t laugh," he says, already laughing at himself first.',
        approach: "Promise not to laugh",
        greeting:
          "\"So this guy on TikTok... no wait, I'm gonna ruin it. Okay. Ha, I can't, I'm already laughing!\"",
        responses: {
          kind: ["Say you'll wait for the end", "Laugh along with him"],
          playful: ["Start laughing first", "Try to finish it for him"],
          bold: ["Ask to watch it with him", "Count him down from three"],
          neutral: ["Wait for him to recover", "Let him get it out"],
        },
      },
      {
        line: '"Urgh... Limited time only, you are not my friend..." He\'s scowling at his phone.',
        approach: "Ask what he's looking at",
        greeting:
          "\"Huh? Oh, I'm on TikTok. I really want this, but I'm pretty broke this month...\"",
        responses: {
          kind: ["Ask what he wants", "Say it'll come back around"],
          playful: [
            "Say limited time is a scam",
            "Ask how limited we're talking",
          ],
          bold: ["Say treat yourself", "Say you'll split it with him"],
          neutral: ["Peek at the screen", "Let him scroll"],
        },
      },
      {
        line: '"Hey, new message. Better check it out, yeah? Or are you the type who\'s got like a ton of unread inbox messages?"',
        approach: "Check your phone",
        greeting:
          "\"...Wait, that one's from me. Don't read it in front of me! I'll die!\"",
        responses: {
          kind: ["Say you read his first", "Check it right away"],
          playful: ["Admit you've got hundreds", "Ask if it's from him"],
          bold: ["Read it out loud", "Say you never leave him unread"],
          neutral: ["Check it later", "Pocket your phone"],
        },
      },
    ],
    warm: [
      {
        line: "He's saved you a seat at the diner and is very obviously proud of himself for thinking of it.",
        approach: "Slide into the booth",
        greeting: "\"You free? Say you're free. Please say you're free.\"",
        responses: {
          kind: ["Say you hoped he'd ask", "Say you're free, all evening"],
          playful: ["Ask if he hoped you'd come", "Make him sweat a second"],
          bold: ["Take the seat like you own it", "Say yes before he finishes"],
          neutral: ["Sit down without a word", "Take the seat, no fuss"],
        },
      },
      {
        line: '"There you are!". Like you\'d been the missing piece of his afternoon.',
        approach: "Greet him back",
        greeting:
          '"Hi! I was just... okay, this\'ll sound weird... I was just thinking about you."',
        responses: {
          kind: ["Admit he crossed your mind", "Say that's not weird at all"],
          playful: ["Ask what he was thinking", "Ask if it was flattering"],
          bold: ["Say it fits you well", "Ask what else he thinks"],
          neutral: ["Greet him back plainly", "Say hello, nothing more"],
        },
      },
      {
        line: "He talks faster when you turn up. Everyone in the room has noticed. He hasn't.",
        approach: "Match his grin",
        greeting:
          "\"They want me on another mission. It's not like me being there helps anyone. ...You showing up, though. That part's good.\"",
        responses: {
          kind: ["Say you'd want him there", "Say he does help, truly"],
          playful: ["Point out he's speeding up", "Time how fast he's talking"],
          bold: ["Say you make him nervous", "Say you'll stay till he's done"],
          neutral: ["Match his energy quietly", "Let him talk it out"],
        },
      },
      {
        line: '"It\'s on me today," he says, patting a pocket that did well at something he won\'t name. "Get whatever you want."',
        approach: "Let him treat you",
        greeting:
          '"Got a bit of spare cash this month, don\'t ask, so lunch is on me. Get whatever."',
        responses: {
          kind: ["Say next lunch is on you", "Say he didn't have to"],
          playful: ["Order the most expensive thing", "Order dessert first"],
          bold: ["Say you'll get the next one", "Order for both of you"],
          neutral: ["Take the offer, say nothing", "Order something small"],
        },
      },
      {
        line: "He's practicing a greeting under his breath when you catch him at it. \"Ack! How long've you been there?!\"",
        approach: "Catch him practicing",
        greeting:
          "\"Am I being annoying? Tell me if I'm being annoying. You're probably busy.\"",
        responses: {
          kind: ["Reassure him it sounded fine", "Say he's never annoying"],
          playful: ["Repeat his greeting back", "Give it a score out of ten"],
          bold: ["Ask for the real greeting", "Say greet you that way daily"],
          neutral: ["Pretend you didn't hear it", "Let him recover first"],
        },
      },
      {
        line: 'His phone is at 5% and his face is pure panic. "Do you have a charger? Tell me you have a charger."',
        approach: "Hand him your charger",
        greeting: "\"You're a lifesaver. Seriously. Tomorrow would've been a disaster.\"",
        responses: {
          kind: ["Say he can keep it tonight", "Say you'll always have one"],
          playful: ["Charge him one favor for it", "Ask what he'd do without you"],
          bold: ["Plug it in for him", "Say you'll text him at nine"],
          neutral: ["Say it's no big deal", "Wait while it charges"],
        },
      },
      {
        line: "\"Campus store after class? I'm almost out of granulated sugar.\" He says it like it's a medical emergency.",
        approach: "Go to the store with him",
        greeting: "\"Okay, I'm baking tonight. If you come, you get first pick. That's the deal.\"",
        responses: {
          kind: ["Say you'd come anyway", "Offer to carry the bag"],
          playful: ["Ask what he's baking", "Bargain for two picks"],
          bold: ["Say you want to help bake", "Tell him to buy two bags"],
          neutral: ["Walk with him to the store", "Say sure, after class"],
        },
      },
      {
        line: "\"I fell asleep in class,\" he confesses, clutching his notebook. \"I don't even know what the homework is. Help me.\"",
        approach: "Show him your notes",
        greeting: "\"You're seriously the best. Honor Roll saves the day again. Okay, what'd I miss?\"",
        responses: {
          kind: ["Walk him through the homework", "Say it happens to everyone"],
          playful: ["Ask what he dreamed about", "Charge him a cookie per page"],
          bold: ["Quiz him on it after", "Say you'll sit next to him"],
          neutral: ["Hand over the notes", "Point to the right page"],
        },
      },
      {
        line: "He shoves his phone at you, wheezing. \"Have you seen this yet? It's all over TikTok, it's killing me.\"",
        approach: "Watch the video",
        greeting: '"Wait for it. Wait for it... there! Okay, now I need you to watch it again."',
        responses: {
          kind: ["Laugh because he's laughing", "Ask him to send it to you"],
          playful: ["Pretend you don't get it", "Find a better one to show him"],
          bold: ["Send him one back right now", "Say send you every one"],
          neutral: ["Watch it twice", "Hand the phone back"],
        },
      },
      {
        line: "He's in an empty classroom working through a dance off his phone, counting under his breath. He freezes when he sees you.",
        approach: "Ask to see the whole dance",
        greeting: "\"It's for a trend, okay? Towa's better at it. Don't film me, I'm begging you.\"",
        responses: {
          kind: ["Say it looked good", "Promise not to film"],
          playful: ["Pretend to film anyway", "Try the steps yourself"],
          bold: ["Ask him to teach you", "Tell him to go from the top"],
          neutral: ["Sit and watch", "Wait for him to start again"],
        },
      },
      {
        line: "\"How is Jin's skin that perfect?\" He's squinting into his phone camera. \"Rich kids and their stupid fancy toner.\"",
        approach: "Tell him his skin's fine",
        greeting: "\"You're just saying that. ...Are you just saying that? Say it again anyway.\"",
        responses: {
          kind: ["Say it again, meaning it", "Say his freckles are cute"],
          playful: ["Offer to steal Jin's toner", "Blame all the sugar"],
          bold: ["Say his skin's fine as is", "Say Jin's jealous of him"],
          neutral: ["Shrug at the comparison", "Let him fuss a bit"],
        },
      },
      {
        line: "\"Luca got another commendation.\" He's smiling. It doesn't quite reach his eyes. \"Good for him. Seriously.\"",
        approach: "Ask how he's really doing",
        greeting: "\"Me? I'm great. I'm fine! ...Okay, it's kind of hard standing next to him sometimes.\"",
        responses: {
          kind: ["Say you like him as he is", "Say you'd pick his company"],
          playful: ["Say Luca can't bake", "Award him a commendation"],
          bold: ["Say you came to see him", "Say he's braver than he thinks"],
          neutral: ["Let him vent", "Sit with him a while"],
        },
      },
      {
        line: "You've been gone a few days. He spots you and makes a noise that isn't quite a word.",
        approach: "Let him catch up to you",
        greeting: "\"Oh my god, you're back! I'm so happy. Please don't disappear on me like that again.\"",
        responses: {
          kind: ["Say you missed him too", "Promise to text next time"],
          playful: ["Ask if he cried", "Claim a secret mission"],
          bold: ["Say he could have called", "Hug him first"],
          neutral: ["Say you're back now", "Tell him where you went"],
        },
      },
      {
        line: "\"I could've taken you to lunch with that money,\" he groans, head on the table. \"Why am I such a moron?\"",
        approach: "Sit down across from him",
        greeting: "\"Don't ask what I spent it on. Please. My pride's in the negatives already.\"",
        responses: {
          kind: ["Say lunch doesn't matter", "Offer to buy this time"],
          playful: ["Guess what he spent it on", "Say he owes you two lunches"],
          bold: ["Say tomorrow's lunch is yours", "Lift his head off the table"],
          neutral: ["Wait for him to sit up", "Let him groan it out"],
        },
      },
      {
        line: "His phone is face-down on the table like it might bite. \"Romeo's texting me. Not opening it. Not today.\"",
        approach: "Ask what Romeo wants",
        greeting: "\"Nothing good. It's never anything good. Distract me?\"",
        responses: {
          kind: ["Distract him with a story", "Say he doesn't have to answer"],
          playful: ["Read it in a dramatic voice", "Guess what it says"],
          bold: ["Say you'll read it with him", "Say Romeo can wait"],
          neutral: ["Leave the phone alone", "Change the subject"],
        },
      },
      {
        line: 'He stares at you a second too long. "You seem different today. Did you change something? Or am I making it up?"',
        approach: "Make him guess",
        greeting: "\"Okay, don't tell me. Haircut? No. New earrings? ...I'm gonna get this.\"",
        responses: {
          kind: ["Say he's sweet to notice", "Give him a small hint"],
          playful: ["Say he's getting colder", "Make up something wild"],
          bold: ["Say he'll get it by lunch", "Say he's the one who changed"],
          neutral: ["Tell him what changed", "Let him keep guessing"],
        },
      },
      {
        line: "He's in front of the vending machine with the focus of a man picking a weapon. \"New flavors. I want all of them.\"",
        approach: "Help him pick one",
        greeting: "\"Okay, you pick. If it's bad, it's on you. If it's good, we split it.\"",
        responses: {
          kind: ["Pick the one he eyed first", "Buy the second one yourself"],
          playful: ["Pick the weirdest flavor", "Pick with your eyes closed"],
          bold: ["Buy all of them", "Say you get the bigger half"],
          neutral: ["Point at one", "Let him choose"],
        },
      },
      {
        line: "He leans his whole weight on your shoulder while he scrolls, like it's the most natural thing in the world.",
        approach: "Let him lean",
        greeting: "\"Is this okay? Towa does it all the time. I'm just comfy. ...Should I move? I'll move.\"",
        responses: {
          kind: ["Tell him to stay put", "Say it's more than okay"],
          playful: ["Lean back on him", "Ask if you outrank Towa"],
          bold: ["Rest your head on his", "Say Towa can find a new spot"],
          neutral: ["Keep still", "Look at his screen"],
        },
      },
    ],
    spark: [
      {
        line: "He goes red mid-sentence and completely loses the sentence.",
        approach: "Let him recover",
        greeting:
          "\"I'm not blushing, it's warm in here. It's Frostheim, I KNOW how that sounds, don't.\"",
        responses: {
          kind: "Agree it's warm in here",
          playful: "Make him blush harder",
          bold: "Call out the blush directly",
          neutral: "Pretend you didn't catch it",
        },
      },
      {
        line: '"Do you... okay, this\'ll sound weird... do you actually pay attention to me? Because it kind of seems like you do."',
        approach: "Say you noticed too",
        greeting:
          '"You actually notice stuff about me. Do you know how weird that is? Good weird. Really good weird."',
        responses: {
          kind: "Say you noticed on purpose",
          playful: "Repeat it back to him",
          bold: "Put him on the spot",
          neutral: "Shrug, say you don't know",
        },
      },
      {
        line: "He's turning the pendant over between two fingers without noticing he's doing it. \"My gran gave me this. It's... yeah. I don't usually let people ask about it, so don't get used to it.\"",
        approach: "Hear him out",
        greeting:
          "\"Okay so, don't laugh, I think about you kind of a lot. That's the thing. That's all of it.\"",
        responses: {
          kind: "Say you think of him too",
          playful: "Tease him for fidgeting",
          bold: "Ask him to tell you the story",
          neutral: "Let him decide what to share",
        },
      },
      {
        line: "He starts to ask you something, bails, starts again, bails again.",
        approach: "Let him stumble through it",
        greeting:
          '"Okay. Okay! Do you wanna... hang out? Like, just us? You can say no! ...Please don\'t say no."',
        responses: {
          kind: "Let him say it badly",
          playful: "Guess wildly at the question",
          bold: "Tell him to just ask already",
          neutral: "Let him flail",
        },
      },
      {
        line: '"There\'s this spot where you can see the stars really well," he tells his shoes. "I just... thought maybe. Sometime."',
        approach: "Ask to see the spot",
        greeting:
          "\"Wait, you want to? Like, actually? Okay. Okay! It's a bit of a walk. I'll go first. Or you go first. Sorry.\"",
        responses: {
          kind: "Say you'd love to see it",
          playful: "Tease him for stalling",
          bold: "Say it for him",
          neutral: "Wait for him to ask outright",
        },
      },
      {
        line: "He catches your sleeve when you go to leave and has no plan for after that.",
        approach: "Take his hand",
        greeting:
          '"Can I... is it okay if I hold your hand? Cool. Cool cool cool."',
        responses: {
          kind: "Lace your fingers with his",
          playful: "Refuse to let go of his hand",
          bold: "Pull him in by the collar",
          neutral: "Let go first",
        },
      },
    ],
    close: [
      {
        line: '"You came," he says, like he\'d half-braced for you not to.',
        approach: "Tell him you're glad too",
        greeting:
          '"You made it! I was kind of scared you wouldn\'t, honestly."',
        responses: {
          kind: "Tell him he's enough as he is",
          playful: "Laugh along with him",
          bold: "Say you'd never miss it",
          neutral: "Be his calm",
        },
      },
      {
        line: "The grin drops for a second, pure relief, before it comes roaring back.",
        approach: "Take the good chair",
        greeting:
          '"I saved you the good chair. Sorry, is that too much? Just sit, just sit."',
        responses: {
          kind: "See past the grin",
          playful: "Tease him about the relief",
          bold: "Push past the grin",
          neutral: "Sit through the quiet part",
        },
      },
      {
        line: '"Don\'t laugh," he says, already braced for it, "but I bake when I can\'t sleep, and there\'s a lot of cookies right now."',
        approach: "Eat the extra cookies",
        greeting:
          '"I baked way too much again. That\'s a you-problem now. Sit down."',
        responses: {
          kind: "Thank him for the cookies",
          playful: "Raid the cookie stash",
          bold: "Demand more cookies",
          neutral: "Eat quietly, say nothing",
        },
      },
      {
        line: "He picks the conversation up mid-sentence, like it never actually stopped.",
        approach: "Answer him mid-sentence",
        greeting:
          '"Whatever you were doing can wait, right? You\'re here now."',
        responses: {
          kind: "Pick the thread up with him",
          playful: "Start the trouble yourself",
          bold: "Tell him to keep up",
          neutral: "Let him catch his breath",
        },
      },
      {
        line: "He'd been watching the door. He'll deny it. He was.",
        approach: "Call out the wait",
        greeting:
          "\"I don't say this a lot, but... yeah. Really glad it's you.\"",
        responses: {
          kind: "Notice the part he plays off",
          playful: "Tease him about watching",
          bold: "Demand the honest version",
          neutral: "Let him have his denial",
        },
      },
    ],
    bound: [
      {
        line: "He kisses you and forgets whatever he was in the middle of saying.",
        approach: "Kiss him back",
        greeting: '"C\'mere. No reason. Okay, one reason. Come HERE."',
        responses: {
          kind: "Kiss him first this time",
          playful: "Ask what he forgot",
          bold: "Kiss him first",
          neutral: "Let the kiss speak instead",
        },
      },
      {
        line: "\"I still can't believe it's you,\" he says, tucked against your shoulder.",
        approach: "Go to him",
        greeting:
          "\"I got you something. It's dumb. You're getting it anyway.\"",
        responses: {
          kind: "Say it back",
          playful: "Re-gift the dumb gift",
          bold: "Open the gift immediately",
          neutral: "Let him ramble",
        },
      },
      {
        line: "\"I know I'm not... y'know. Brave. But I'm working on it. For you I'm working on it.\"",
        approach: "Say it back",
        greeting:
          '"You mean that? Okay. ...Okay. Then I\'m gonna keep going, scary parts and all."',
        responses: {
          kind: "Tell him he already shows up",
          playful: "Make him say it louder",
          bold: "Say it before he can",
          neutral: "Let him keep working at it",
        },
      },
      {
        line: "He wakes you by being unable to stop looking at you, somehow loudly.",
        approach: "Five more minutes",
        greeting: '"Five more minutes. Then five more. Don\'t argue."',
        responses: {
          kind: "Stay the five minutes",
          playful: "Refuse to get up",
          bold: "Refuse the five minutes",
          neutral: "Let the morning be slow",
        },
      },
      {
        line: "He's still a little embarrassed by how much he means it. He's never once wanted it to stop.",
        approach: "Say you don't mind",
        greeting:
          '"You\'re stuck with me. You know that, right? Like... permanently."',
        responses: {
          kind: "Say you don't mind at all",
          playful: "Tease him about being stuck",
          bold: "Tell him he's got no choice",
          neutral: "Stay quiet and close",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // three `new`-tier labels had no genuine beat match ("Wave off the burden
  // question", "Bet him he won't", "Push him to commit") and were dropped
  // rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '**{name}** jumps a foot. "Eeeek?! Oh, it\'s just you." {user} had only said his name.',
      '"Wait, you know my name?" **{name}** looks at {user} like it\'s a prize.',
      "{user} calls out, and **{name}** startles, recovers, and pretends he didn't.",
      '**{name}** jumps at the sight of {user}, then sags. "Oh thank god. I thought you were collecting on a, um. Never mind! Hi!"',
    ],
    known: [
      '"Hey, it\'s you again!" **{name}** waves at {user} with his whole arm, then tries to play it cool. Too late.',
      '**{name}** already has his phone out for {user}. "Okay, you have to see this. It\'s all over WickHive."',
      '**{name}** falls into step beside {user} like they\'d planned it. "Okay, where are we going?"',
    ],
    warm: [
      '"There you are!" **{name}** is talking to {user} at top speed already.',
      "{user} says his name, and **{name}** lights up like it's going in his story later.",
      "**{name}** was halfway into a WickHive rant. {user} turning up improved it enormously.",
    ],
    spark: [
      "**{name}** goes red before he's finished turning around. {user} does that to him now.",
      '"You... you called ME." **{name}** is going to bring this up to {user} for a week.',
      '**{name}** turns at {user}\'s voice and loses his whole train of thought. "Huh? Wait, what was I even talking about?!"',
    ],
    close: [
      "**{name}** is through the crowd before {user} finishes the second syllable.",
      "\"Please don't leave again,\" **{name}** says into {user}'s shoulder. Half joking.",
      "{user} calls, and **{name}** doesn't check who's watching.",
    ],
    bound: [
      "\"I still can't believe it's you,\" **{name}** says, arriving at {user} at a run.",
      "**{name}** had been working up the nerve for something. {user} calling out did the work for him.",
      "{user} says hi, and **{name}** decides he can be brave today after all.",
    ],
  },
};
