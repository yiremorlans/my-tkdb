import bondScenes from "../bondScenes/shohei.js";

export default {
  // Level-up DMs: constants/bondScenes/shohei.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "The truck's hatch is up and something smells incredible. He waves you over before you've decided anything.",
        approach: "Ask what smells so good",
        greeting:
          "\"First time? Don't bother with the menu, I'll pick,\" he says with a smirk.",
        responses: {
          kind: ["Trust whatever he's making", "Eat it while it's hot"],
          playful: ["Ask if smelling costs extra", "Ask for a bigger portion"],
          bold: ["Say you came for the cook", "Tell him to surprise you"],
          neutral: ["Let him cook", "Wait for whatever comes"],
        },
      },
      {
        line: "He barely spares you a glance, jaw set, like he's already bored with whatever this is going to be.",
        approach: "Introduce yourself",
        greeting: '"What\'re you looking at?"',
        responses: {
          kind: ["Ask if it's a bad time", "Say you'll keep it quick"],
          playful: ["Ask what he's looking at", "Ask who ruined his day"],
          bold: ["Say you wanted to meet him", "Say you like the scowl"],
          neutral: ["Simply be there", "Keep looking at him"],
        },
      },
      {
        line: 'Behind the truck, something coughs twice before it catches. "Yeah, yeah, I hear you," he mutters at it, then grins over at you like he wasn\'t just talking to his bike.',
        approach: "Order something",
        greeting:
          "\"Don't mind Bonnie, she's just picky about who she likes.\" He looks you over, easy, like he's already decided you're fine. \"She'll come around.\"",
        responses: {
          kind: ["Ask if the engine's okay", "Ask how long he's had the bike"],
          playful: [
            "Ask if the bike talks back",
            "Ask if it's always this moody",
          ],
          bold: ["Talk to the bike yourself", "Grin right back at him"],
          neutral: ["Let him have his moment", "Order and wait"],
        },
      },
      {
        line: "Bonnie growls to a stop right by you, and he swings off in one motion, helmet already coming off.",
        approach: "Ask about the ride",
        greeting:
          "\"Don't just stand there gawking. She's not a photo op.\" He puts himself between you and Bonnie, casual about it.",
        responses: {
          kind: ["Say she's well looked after", "Admire her from here"],
          playful: ["Ask for a photo with her", "Ask if she bites"],
          bold: ["Ask to ride her sometime", "Say you'll ask her first"],
          neutral: ["Look a moment longer", "Step back from Bonnie"],
        },
      },
      {
        line: 'His knuckles are freshly wrapped, one already bruising. "Don\'t," he says, before you can even ask.',
        approach: "Ask about the knuckles",
        greeting: "\"It's nothing. ...I said don't.\"",
        responses: {
          kind: ["Promise not to pry", "Offer to grab some ice"],
          playful: ["Ask to see the other guy", "Ask who won"],
          bold: ["Hold his gaze", "Say you'll ask later"],
          neutral: ["Let it go unasked", "Say nothing"],
        },
      },
    ],
    known: [
      {
        line: "Bonnie's ended up right where you always wait for your order. She wasn't sitting there a month ago.",
        approach: "Tease him about it",
        greeting: [
          '"What? Bonnie likes it there. She can smell the barbecue sandwiches from that spot."',
        ],
        responses: {
          kind: ["Say it's a good spot", "Say you like seeing her there"],
          playful: ["Ask if Bonnie takes tips", "Ask if Bonnie's got a crush"],
          bold: [
            "Say you'd notice if she moved",
            "Say she can keep you company",
          ],
          neutral: ["Note where Bonnie is", "Move on to ordering"],
        },
      },
      {
        line: "He drops back to walk beside you as the mission wraps up, not saying why, just there.",
        approach: "Ask why he stuck around",
        greeting:
          '"What? Leo bailed. Somebody\'s gotta make sure you get back."',
        responses: {
          kind: ["Say you like the company", "Walk back with him"],
          playful: ["Ask if he's on escort duty", "Race him the last stretch"],
          bold: ["Bump his shoulder", "Match his pace back"],
          neutral: [
            "Keep pace with him",
            "Let the reason stay unknown",
          ],
        },
      },
      {
        line: "He's skipped his afternoon class again. \"It's all in the books anyway,\" he says, like that settles it.",
        approach: "Ask which class it was",
        greeting:
          '"Pfft. You gonna tattle, Senpai? Go ahead. I\'ll still ace it."',
        responses: {
          kind: ["Offer to catch him up", "Ask what he's doing instead"],
          playful: ["Ask what's in those books", "Threaten to tell on him"],
          bold: ["Bet he aces it", "Say you'll quiz him later"],
          neutral: ["Say it's his call", "Let him skip in peace"],
        },
      },
      {
        line: 'He spots something across the lot and swears under his breath, then waves it off like he didn\'t just see a masked stranger again. "Nothing, Senpai. Forget it."',
        approach: "Ask what he saw",
        greeting:
          "\"Nah, I'm just seeing things. ...C'mon, I'll walk you back.\"",
        responses: {
          kind: ["Say you'll stay close", "Ask if he's been sleeping okay"],
          playful: [
            "Ask if you should be scared",
            "Ask if he's your bodyguard now",
          ],
          bold: ["Say you'll walk on his side", "Keep an eye out with him"],
          neutral: ["Let him wave it off", "Drop the question"],
        },
      },
      {
        line: "The truck is slammed and he still waves you to the front of the line.",
        approach: "Head to the window",
        greeting:
          '"Senpai. Front. I\'m not making you stand out there twenty minutes."',
        responses: {
          kind: ["Say you're starving", "Let him pick for you"],
          playful: ["Say the line hates you now", "Ask if you're his favorite"],
          bold: ["Say you'd wait an hour for him", "Stay at the window after"],
          neutral: ["Take the front spot", "Move up without comment"],
        },
      },
      {
        line: "He glances at your textbook upside-down and gives you the right answer before you've even finished reading the question, then shrugs it off.",
        approach: "Ask how he knew that",
        greeting:
          "\"What? It's all in the book. I read it once. Pfft, don't look at me like that.\"",
        responses: {
          kind: ["Say he's good at this", "Ask him to study with you"],
          playful: [
            "Ask if he's secretly smart",
            "Ask him to do your homework",
          ],
          bold: ["Say you'd have gotten there", "Say smart looks good on him"],
          neutral: ["Write the answer down", "Not question the help"],
        },
      },
      {
        line: "You and Subaru walk up to the truck together. Subaru stalls in front of the menu board, so you lean in to help him decide.",
        approach: "Help Subaru order",
        greeting:
          "\"Subaru. Get the rice bowl, it's mild and it'll fill you up. You'll like it. ...What about you, Senpai?\"",
        responses: {
          kind: ["Let him pick for you both", "Say his food never misses"],
          playful: ["Order the same as Subaru", "Ask if friends eat free"],
          bold: ["Say you want his favorite", "Tell him to make it two"],
          neutral: ["Let Subaru take his time", "Wait at the counter"],
        },
      },
      {
        line: "He's boxed up food for you to go, even though you never asked.",
        approach: "Take the boxed portion",
        greeting: '"Take it. You look like you forgot lunch again."',
        responses: {
          kind: ["Ask what he packed", "Eat it right away"],
          playful: ["Ask if everyone gets this", "Ask what this'll cost you"],
          bold: ["Say next time you're staying", "Say you expected it"],
          neutral: ["Take the box", "Eat it without comment"],
        },
      },
      {
        line: "You show up three minutes late. Your plate's already waiting on the counter, and he's been watching it cool.",
        approach: "Apologize for being late",
        greeting: '"Three minutes, Senpai. Your food\'s getting cold."',
        responses: {
          kind: ["Grab a fork and dig in", "Eat it before it goes cold"],
          playful: ["Ask if he timed you", "Blame Leo, obviously"],
          bold: ["Say three minutes is nothing", "Say you ran the last bit"],
          neutral: ["Shrug at being late", "Sit without a word"],
        },
      },
      {
        line: "He steps between you and Leo mid-jab, not even breaking his own conversation to do it.",
        approach: "Let him run interference",
        greeting: '"Knock it off, Leo. ...Ignore him. He\'s bored."',
        responses: {
          kind: ["Say you're glad he's here", "Tell him you're okay"],
          playful: ["Ask if Leo's always like this", "Say Leo's just jealous"],
          bold: ["Say you can handle Leo", "Say you've got his back too"],
          neutral: ["Let him handle Leo", "Move on from the jab"],
        },
      },
      {
        line: "He's icing his knuckles after sparring with Mido and shrugs off the wince like you didn't just see it.",
        approach: "Ask if he's okay",
        greeting:
          "\"Five sets of fifteen rounds. Mido's insane. ...I'm fine, Senpai.\"",
        responses: {
          kind: ["Get him some water", "Offer to wrap the knuckles"],
          playful: [
            "Ask if Mido's okay at least",
            "Ask if Mido won this round",
          ],
          bold: ["Hold the ice on for him", "Check his knuckles yourself"],
          neutral: ["Let him shrug it off", "Say nothing about the wince"],
        },
      },
      {
        line: "He clocks you before you've said a word and starts making your order without asking.",
        approach: "Let him guess your order",
        greeting: '"Not the spicy one, right? See, I remembered."',
        responses: {
          kind: ["Say it's exactly right", "Let him add something new"],
          playful: [
            "Test if he really remembers",
            "Ask what else he's tracking",
          ],
          bold: ["Say you only come for him", "Watch him cook up close"],
          neutral: [
            "Take the order",
            "Let him guess without comment",
          ],
        },
      },
      {
        line: "He's glaring at a second plate going cold beside him when you walk up.",
        approach: "Ask about the extra plate",
        greeting:
          "\"Leo bailed on me again. Food's sitting there going cold. ...Whatever. What're you doing here, Senpai?\"",
        responses: {
          kind: ["Offer to eat with him", "Say you came hungry"],
          playful: ["Say you smelled the food", "Call dibs on the spare plate"],
          bold: ["Say you're his date now", "Say you came to see him"],
          neutral: ["Say you were passing by", "Eye the cold plate"],
        },
      },
    ],
    warm: [
      {
        line: "It's an hour before opening and he's alone in the truck, working on a new sauce. The second you lean in the window, he holds the spoon out.",
        approach: "Be the taste tester",
        greeting:
          "\"Taste this, Senpai. Go on. Bet you it's the best thing you've had all week.\"",
        responses: {
          kind: ["Say you'd pay double for it", "Say it's his best yet"],
          playful: [
            "Ask to be his taster forever",
            "Ask for a second spoonful",
          ],
          bold: ["Lick the spoon clean", "Ask for a whole bowl"],
          neutral: ["Taste the sauce", "Give a flat verdict"],
        },
      },
      {
        line: "He's headed out for tomorrow's ingredients and doesn't break stride when he passes you, just jerks his head for you to come along.",
        approach: "Go shopping with him",
        greeting:
          "\"C'mon. Hurry up, or I'm gonna leave you behind. You're on vegetables, Senpai. Pick good ones, I'll know.\"",
        responses: {
          kind: ["Pick the best ones you can", "Ask what he's cooking"],
          playful: ["Pick a weird one on purpose", "Ask if he'll grade you"],
          bold: ["Say you'll out-pick him", "Walk on ahead of him"],
          neutral: ["Tag along quietly", "Follow his list"],
        },
      },
      {
        line: "He tosses you the spare helmet without asking if you want a ride. You always do.",
        approach: "Take the spare helmet",
        greeting:
          "\"Took Bonnie out this morning. She's got a mind of her own, runs sweet when it's cool like this.\"",
        responses: {
          kind: ["Say Bonnie sounds happy", "Ask how Bonnie's running"],
          playful: [
            "Act surprised you're going",
            "Ask to drive Bonnie yourself",
          ],
          bold: ["Beat him onto the bike", "Tell him to open it up"],
          neutral: ["Catch the helmet", "Put the helmet on"],
        },
      },
      {
        line: "Word goes around that the Pit's on again tonight. He hears it, snorts, and heads the other way with a skateboard under his arm.",
        approach: "Skip the Pit with him",
        greeting:
          "\"Pit's on again? I'm done with that already. They're all normies, what's the point? Got better things to do.\"",
        responses: {
          kind: ["Ask if you can tag along", "Say you'd rather hang with him"],
          playful: ["Ask what's better than the Pit", "Bet he eats pavement"],
          bold: ["Ask to come watch him skate", "Ask to borrow the board"],
          neutral: ["Walk alongside him", "Watch him ride"],
        },
      },
      {
        line: "He's scowling at his phone hard enough to crack it. His R&R permit came back rejected. Again.",
        approach: "Ask what got rejected",
        greeting:
          '"Ugh... Would it kill him to approve an R&R permit every once in a while?"',
        responses: {
          kind: ["Say he's earned a break", "Offer to help him reapply"],
          playful: ["Offer to forge a signature", "Ask where he'd even go"],
          bold: ["Say you'll cover for him", "Say he should take you along"],
          neutral: ["Let him grumble", "Ask what it was for"],
        },
      },
      {
        line: "There's a fishing rod wedged in the back of the truck, tucked in between the supply crates like it lives there.",
        approach: "Ask about the fishing rod",
        greeting:
          "\"This? It's a fishing rod. Sometimes I catch and filet the fish myself. It's pretty easy, and it saves cash.\"",
        responses: {
          kind: ["Ask where his fishing spot is", "Ask if he cooks his catch"],
          playful: ["Ask how many got away", "Ask for the catch of the day"],
          bold: ["Ask to come along next time", "Bet you'd out-fish him"],
          neutral: ["Nod at the rod", "Let the rod be"],
        },
      },
      {
        line: "He's short on cookware for tomorrow and headed to the Mystery Diner to borrow some from the kitchen. Ren's on shift, which Sho seems to think counts as permission.",
        approach: "Go to the diner with him",
        greeting:
          '"Senpai, there you are. I\'m headed to the diner, could you come with and help me carry some stuff?"',
        responses: {
          kind: ["Say you're glad to help", "Ask what he's short on"],
          playful: ["Ask if Ren knows about this", "Ask what you're paid in"],
          bold: ["Say you'll carry the heavy box", "Offer to talk Ren into it"],
          neutral: ["Just start walking", "Follow his lead"],
        },
      },
      {
        line: "You pass the truck just after dawn. The prep's already done, and he's leaning in the window yawning into his sleeve, waiting to open.",
        approach: "Catch him after prep",
        greeting:
          "\"All right, that's the morning prep done. ...What're you doing up this early? Get over here, you're first in line.\"",
        responses: {
          kind: ["Say he works too hard", "Offer to help him open up"],
          playful: ["Ask if first gets a discount", "Ask who feeds the cook"],
          bold: ["Say you'll keep him awake", "Say you came up early for him"],
          neutral: ["Let him yawn it out", "Say good morning"],
        },
      },
      {
        line: "Leo wanders past with a yakisoba bun from the convenience store, and Sho stops mid-sentence to glare at it.",
        approach: "Ask how far back they go",
        greeting:
          '"Since middle school. We\'d eat lunch up on the school roof, and he lived off yakisoba buns, milk, and hot dogs. Guy was skin and bones."',
        responses: {
          kind: ["Say Leo's lucky to have him", "Ask how long he's fed Leo"],
          playful: [
            "Ask for embarrassing stories",
            "Ask if that counts as lunch",
          ],
          bold: ["Ask if Leo's changed at all", "Ask about their Shibuya days"],
          neutral: ["Hear the story out", "Let him keep talking"],
        },
      },
      {
        line: "You drag yourself over after a long day of classes and reports, and he's already watching you with his chin propped on his fist.",
        approach: "Say you survived the day",
        greeting:
          "\"You've been running around all day, huh? Classes, reports, whatever Alan dumped on you. ...Honestly, Senpai, respect. Most people would've bailed by now.\"",
        responses: {
          kind: ["Say you're glad you came", "Ask how his day went"],
          playful: ["Ask what he's staring at", "Ask if he's been waiting"],
          bold: ["Say he's worth the walk", "Say you saved him for last"],
          neutral: ["Shrug it off", "Say it was a long one"],
        },
      },
      {
        line: "He's wiping down the counter when he brings it up, way too casually. Leo's been telling everyone you two hung out the other day.",
        approach: "Tell him about Leo",
        greeting:
          "\"So. You and Leo, huh? What'd he drag you into? ...Don't tell me it was one of his videos.\"",
        responses: {
          kind: ["Say it was nothing wild", "Say he should come next time"],
          playful: ["Make it sound way wilder", "Ask if he's jealous"],
          bold: ["Say he's more fun than Leo", "Say Leo was actually fun"],
          neutral: ["Keep it vague", "Say it was nothing"],
        },
      },
      {
        line: "You wander up to the truck and offer to lend a hand. It's the slowest afternoon of the week, the lot is empty, and he clocks exactly why you're here.",
        approach: "Offer to help out",
        greeting:
          "\"Huh? No, I don't really need any help today... You don't have to make excuses to hang out with me, you know. Just ask.\"",
        responses: {
          kind: [
            "Admit you just wanted to come",
            "Say the company's the point",
          ],
          playful: [
            "Insist you're here to work",
            "Say you almost had him fooled",
          ],
          bold: ["Ask to hang out, flat out", "Stay without an excuse"],
          neutral: ["Stay anyway", "Hang around the truck"],
        },
      },
      {
        line: "He waves you over and tilts his phone so you can see. It's a text from Alan, and it's pure gibberish.",
        approach: "Look at his phone",
        greeting:
          "\"'come tot hr epuit'? Pfft. What the hell is this, some kinda secret code? Help me out here, Senpai.\"",
        responses: {
          kind: ["Help him work it out", "Say Alan tried his best"],
          playful: ["Text back in gibberish", "Read it in Alan's voice"],
          bold: ["Call Alan back yourself", "Say it's obviously the Pit"],
          neutral: ["Squint at the text", "Hand the phone back"],
        },
      },
      {
        line: "Leo drowns his plate in ketchup without taking a single bite. Sho watches it happen like he's witnessing a crime.",
        approach: "Defend his cooking",
        greeting:
          '"See? Senpai gets it. ...Put the bottle down, Leo. Taste it first, then you can add condiments. That\'s the rule."',
        responses: {
          kind: ["Say it's perfect as is", "Say Leo's missing out"],
          playful: ["Hide the bottle from Leo", "Steal Leo's plate instead"],
          bold: ["Tell Leo to try it plain", "Take the bottle from Leo"],
          neutral: ["Eat your own plate", "Let them bicker"],
        },
      },
      {
        line: "He's up, in uniform, and walking toward the classroom block before first bell, which has never once happened.",
        approach: "Walk him to class",
        greeting:
          "\"Seriously, it's way too early for this... What? I'm going to class. You're the one who wouldn't shut up about it.\"",
        responses: {
          kind: ["Say you're proud of him", "Ask if he slept at all"],
          playful: ["Ask who replaced him", "Take a photo for proof"],
          bold: ["Meet him there tomorrow", "Say he'll thank you later"],
          neutral: ["Walk to class with him", "Act like it's normal"],
        },
      },
      {
        line: "You're halfway through a vending machine sandwich when he spots it from across the courtyard and confiscates it on the spot.",
        approach: "Surrender the sandwich",
        greeting:
          '"Nope. Hostage situation, remember? Truck. Now. I\'m not watching you eat that."',
        responses: {
          kind: [
            "Ask what he's making instead",
            "Say you'll come eat properly",
          ],
          playful: ["Defend the sandwich", "Negotiate for its release"],
          bold: ["Race him to the truck", "Say he's buying, then"],
          neutral: ["Follow him to the truck", "Hand it over quietly"],
        },
      },
      {
        line: "Alan's briefing the team on another mission. Sho drifts over to stand at your shoulder without a word, like that's just where he goes now.",
        approach: "Take the spot beside him",
        greeting:
          '"Stick with me out there, Senpai. Whatever it throws at us, I\'ve got your back."',
        responses: {
          kind: ["Say you've got his back", "Say you'll stick with him"],
          playful: ["Ask who's got his back", "Ask if he's your shadow now"],
          bold: ["Say you'll take point", "Tell him to try and keep up"],
          neutral: ["Stay beside him", "Listen to the briefing"],
        },
      },
      {
        line: "He's lettering the truck's new menu board by hand, and it's honestly good. Clean lines, sharp letters, the kind of sign a real shop would pay for.",
        approach: "Admire the signage",
        greeting:
          '"Hey, Senpai. Anything you want on here? Speak now, I\'m almost done."',
        responses: {
          kind: ["Ask what's going on the menu", "Ask where he learned that"],
          playful: ["Ask him to letter your name", "Ask for his autograph"],
          bold: [
            "Ask for a dish named after you",
            "Say he should charge for it",
          ],
          neutral: ["Admire it quietly", "Watch him finish"],
        },
      },
    ],
    spark: [
      {
        line: "He feeds you a bite off his own fork and only afterward realizes what he did.",
        approach: "Lean in for a taste",
        greeting:
          '"Here. Open, Senpai. ...Good, right? Wait, why are you looking at me like that?"',
        responses: {
          kind: "Say it tastes better from him",
          playful: "Feed him a bite back",
          bold: "Steal another bite",
          neutral: "Let him panic",
        },
      },
      {
        line: "He walks you to Bonnie after close and takes the long way around to keep you a minute longer.",
        approach: "Ask about the long way",
        greeting:
          '"I closed early. First time ever. Do the math on that one, Senpai."',
        responses: {
          kind: "Take the longer way too",
          playful: "Ask if he got lost",
          bold: "Say it first",
          neutral: "Change the subject",
        },
      },
      {
        line: "He's sparring with Mido when you show up, and he cuts the session short without a word of explanation, toweling off on his way over.",
        approach: "Wait through the sparring",
        greeting: '"Hop on. No, don\'t ask where, just hop on."',
        responses: {
          kind: "Hand him a water first",
          playful: "Ask if Mido knows he quit",
          bold: "Go wherever he's headed",
          neutral: "Wait for him quietly",
        },
      },
      {
        line: "He guides your hands on the knife from behind, and neither of you is thinking about onions.",
        approach: "Let him guide your hands",
        greeting:
          "\"I think about you when I'm cooking. That's most of the day, so.\"",
        responses: {
          kind: "Let him guide you closer",
          playful: "Rate his knife skills",
          bold: "Say you think about him too",
          neutral: "Keep chopping",
        },
      },
      {
        line: "He shrugs off his jacket and drops it over your shoulders, then acts like the cold never bothered him at all.",
        approach: "Wear his jacket",
        greeting:
          '"Senpai, I... okay, I\'m just gonna say it. I like you. A lot. A LOT."',
        responses: {
          kind: "Tell him you like him",
          playful: "Ask if he's cold now",
          bold: "Pull him in by the apron",
          neutral: "Let the moment sit quietly",
        },
      },
    ],
    close: [
      {
        line: '"You mean so much to me," he says earnestly. "I hope you know that by now."',
        approach: "Go straight to him",
        greeting:
          "\"Senpai... you came right over. Don't tease me, I'm being sincere here.\"",
        responses: {
          kind: "Tell him he means the world",
          playful: "Ask him to say it again",
          bold: "Tell him you'd stay till dawn",
          neutral: "Be present for him",
        },
      },
      {
        line: "There's a second helmet that lives at your place now. Nobody decided that. It just happened.",
        approach: "Pick up the second helmet",
        greeting: [
          "\"You're on the board. Permanently. I'm not discussing it.\"",
          '"I\'ll drop you home. Not up for discussion, Senpai, just get on."',
        ],
        responses: {
          kind: "Say you'll keep it on",
          playful: "Decorate the helmet yourself",
          bold: "Ask to ride with him at night",
          neutral: "Put the helmet on",
        },
      },
      {
        line: "He introduces you to his brother without the usual flinch at the surname, like it doesn't weigh anything when you're there.",
        approach: "Meet his brother",
        greeting:
          "\"Senpai... I'm really glad you're here. You know that, right?\"",
        responses: {
          kind: "Say the surname doesn't matter",
          playful: "Tease the brother resemblance",
          bold: "Say his brother'd be proud",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "He cooks for you last, after everyone's gone, and it's always better than what they got.",
        approach: "Eat what he saved",
        greeting:
          '"Everyone gets fed. You get fed properly, Senpai. There\'s a difference."',
        responses: {
          kind: "Eat every last bite",
          playful: "Ask what he's cooking next",
          bold: "Ask him to close early",
          neutral: "Keep him company",
        },
      },
      {
        line: "The whole rough exterior Vagastrom demands just... isn't there when it's you.",
        approach: "Stay till closing",
        greeting:
          '"If anything happens, come find me. Any hour, Senpai. I mean it."',
        responses: {
          kind: "Say you feel safe with him",
          playful: "Ask what Leo would say",
          bold: "Say you're not going anywhere",
          neutral: "Stay through the cleanup",
        },
      },
    ],
    bound: [
      {
        line: "He makes you breakfast in his shirt and is far too pleased with the whole picture.",
        approach: "Wear his shirt",
        greeting:
          "\"You're wearing my shirt, Senpai. I'm... okay, I need a second. That's really working for me.\"",
        responses: {
          kind: "Let him bring you breakfast",
          playful: "Ask if you can keep it",
          bold: "Pull him away from the stove",
          neutral: "Let him cook",
        },
      },
      {
        line: "He's stopped hiding split knuckles from you. Now you're the one who wraps them.",
        approach: "Don't get up",
        greeting:
          '"Morning, Senpai. I already warmed Bonnie up. We\'re not going anywhere, I just like doing it for you."',
        responses: {
          kind: "Kiss his shoulder in passing",
          playful: "Ask if he let them win",
          bold: "Kiss him quiet",
          neutral: "Wrap his knuckles",
        },
      },
      {
        line: "You prep the truck together at dawn now. He hums the entire time.",
        approach: "Come prep at dawn",
        greeting:
          '"Come prep with me, Senpai. Dawn shift. It\'s freezing and I want you there anyway."',
        responses: {
          kind: "Enjoy the quiet dawn with him",
          playful: "Hum along off-key",
          bold: "Take over a task yourself",
          neutral: "Prep in easy silence",
        },
      },
      {
        line: '"Senpai" has become something he says low and private and entirely differently.',
        approach: "Make him say it again",
        greeting:
          '"I love you, Senpai. Sorry, I say it a lot now. I\'m not actually sorry."',
        responses: {
          kind: "Say it back",
          playful: "Call him kohai back",
          bold: "Say his name back just as low",
          neutral: "Stay curled up",
        },
      },
      {
        line: "He leaves Bonnie right outside your window some nights, just so you'll hear him get in safe.",
        approach: "Hear Bonnie pull up",
        greeting: '"Truck\'s closed tomorrow. I closed it. Guess why."',
        responses: {
          kind: "Say you always hear him",
          playful: "Ask if Bonnie's the alarm",
          bold: "Climb on the bike behind him",
          neutral: "Let him keep doing it",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // six labels had no genuine beat match ("Tell him it's delicious", "Ask for
  // seconds shamelessly", "Tease him about the apron", "Eat in comfortable
  // quiet" from `new`; "Rename the special" from `close`; "Let the food burn"
  // from `bound`) and were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '{user} flags **{name}** down on his way back to the dorm. He slows, barely. "Yeah, that\'s me. You need something or what?"',
      "{user} calls his name, and **{name}** waves them over before deciding anything else.",
      '{user} catches **{name}** swinging off his motorcycle. He tugs his helmet off. "What\'re you looking at?"',
      '**{name}** shifts a takeout box to his other hand and looks {user} over. "You hungry, or just staring?"',
    ],
    known: [
      '"Oh, it\'s you." **{name}** leans out the truck window at {user}. "Hungry, Senpai, or just bored?"',
      '{user} calls his name, and **{name}** is already heading over. "Yeah, yeah. I heard you the first time."',
      '**{name}** turns at the sound of {user}\'s voice, already grinning. "Pfft. Knew it was you, Senpai."',
    ],
    warm: [
      '**{name}** spots {user} across the courtyard and whistles them over. "C\'mon, Senpai. What took you so long?"',
      "\"What're you yelling for, Senpai? I'm right here.\" **{name}** doesn't bother hiding the grin from {user}.",
      "**{name}** was closing up. He is now, somehow, cooking for {user}.",
    ],
    spark: [
      '"What\'re you looking at, Senpai?" **{name}** is grinning at {user} like he won something.',
      "{user} calls his name from the bus stop, and **{name}** swings Bonnie around in a tight turn to pull up right beside them.",
      "{user} calls his name, and **{name}** kicks his skateboard up into his hand and jogs the rest of the way over.",
    ],
    close: [
      "**{name}** hears {user} and leaves the truck running. Somebody else's problem.",
      "\"Don't move, Senpai. I'm coming to you.\" **{name}** is already halfway to {user}.",
      "{user} calls, and **{name}** kisses their temple on the way past without thinking about it.",
    ],
    bound: [
      "\"Order's already going, Senpai. Started the second I saw you.\" **{name}** tells {user} he isn't sorry about it.",
      "**{name}** was humming. {user} calling his name made it considerably worse.",
      "{user} calls his name, and **{name}** decides the **{house}** shift can run itself.",
    ],
  },
};
