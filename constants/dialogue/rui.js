import bondScenes from "../bondScenes/rui.js";

export default {
  // Level-up DMs: constants/bondScenes/rui.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He's hauling a crate of bottles on one hip and still finds a hand to wave with. \"Oh, hey! New face! Sorry, I'm mid-thing here, gimme one sec!\"",
        approach: "Say hi",
        greeting:
          '"Hey, cutie. Want to grab a bite after this? I\'m almost done here, I swear."',
        responses: {
          kind: ["Tell him there's no rush", "Offer to hold the crate"],
          playful: ["Ask if he's juggling next", "Ask what the 'thing' is"],
          bold: ["Say you'll wait right here", "Say he owes you a proper hi"],
          neutral: ["Just say hi back", "Wait for him to set it down"],
        },
      },
      {
        line: "\"Obscuary looks like it'd be full of downers, but it's actually pretty lively in there, right? Not gonna lie, I def prefer it that way.\"",
        approach: "Peek inside",
        greeting: '"See? Come on in, the more the merrier!"',
        responses: {
          kind: ["Say it feels welcoming", "Ask if he keeps it lively"],
          playful: ["Say you'll bring the party", "Ask for the grand tour"],
          bold: ["Say you'll stay a while", "Say you expected coffins"],
          neutral: ["Glance around the bar", "Say you expected quieter"],
        },
      },
      {
        line: "He's behind the bar, and every bottle on the shelves at his back is labeled, sorted, and lined up by height.",
        approach: "Ask about the order",
        greeting:
          "\"Oh, the bottles? Ha, you noticed! Can't pour a good drink if you can't find anything, right?\"",
        responses: {
          kind: ["Say the care shows", "Say it's impressive work"],
          playful: ["Ask if he alphabetizes too", "Order the shortest bottle"],
          bold: ["Ask what the order means", "Ask to learn the system"],
          neutral: ["Let him explain", "Read the labels"],
        },
      },
      {
        line: '"Careful, not too close! Sorry, that came out weird. Can we start over?"',
        approach: "Keep a careful distance",
        greeting:
          '"Okay, take two! Hi, I\'m Rui. Pretend I opened with something way smoother."',
        responses: {
          kind: ["Say no apology needed", "Say you're glad you met him"],
          playful: ["Say the first try was cute", "Pretend you've never met"],
          bold: ["Start over with a big hello", "Say you'd like to know him"],
          neutral: ["Stop where he asked", "Stay put and say hi"],
        },
      },
      {
        line: '"Oof, Ed popped out of nowhere so I accidentally touched him and he died again. Now I have to carry him all the way back to the dorm..."',
        approach: "Ask if this happens a lot",
        greeting:
          "\"Ahaha, yeah, kinda a lot! Don't worry, he'll be back up in no time. He always is.\"",
        responses: {
          kind: ["Offer to help carry Edward", "Ask how he's holding up"],
          playful: [
            "Ask if Ed does it on purpose",
            "Say Ed looks comfy up there",
          ],
          bold: ["Say it wasn't his fault", "Say you'll walk them back"],
          neutral: ["Take his word for it", "Step aside to let him pass"],
        },
      },
    ],
    known: [
      {
        line: "He's stopped warning you off. He still keeps a few steps between you, he just doesn't mention it anymore.",
        approach: "Wave from where you are",
        greeting:
          '"Hey, Honor Roll! Perfect timing, I was getting bored of my own company."',
        responses: {
          kind: ["Say you're glad you came by", "Ask how his day's going"],
          playful: ["Say hello with a wink", "Ask if you passed the test"],
          bold: ["Ask to hang out today", "Say you came to see him"],
          neutral: ["Nod hello", "Stay where you are"],
        },
      },
      {
        line: "He beams. \"Oh hey, it's Honor Roll! Can't believe I ran into you here, so random! Guess we've gotta go on a date now, huh?\" Then throws in a wink for good measure.",
        approach: "Say this keeps happening",
        greeting:
          "\"Ha, so it's a pattern! I love a pattern. It's like, written in the stars!\"",
        responses: {
          kind: ["Say you were hoping to", "Say you're happy to see him"],
          playful: ["Ask where he's taking you", "Say you'd love a date"],
          bold: ["Pick the place yourself", "Say it wasn't random"],
          neutral: ["Shrug at the date talk", "Let the joke pass"],
        },
      },
      {
        line: '"You look kind of tired, Honor Roll, you doing okay? Why don\'t you stop by the bar later? I can be your shoulder to cry on."',
        approach: "Take him up on it",
        greeting:
          '"Hey, cutie, you made it! I was starting to think you found a better bar."',
        responses: {
          kind: ["Say you'll be there", "Ask if he's doing okay too"],
          playful: [
            "Ask if tears get a discount",
            "Say you'll bring the tissues",
          ],
          bold: ["Say you'll hold him to it", "Admit it's been a long day"],
          neutral: ["Say maybe later", "Take a seat at the bar"],
        },
      },
      {
        line: "It's warm out, and he's still got the black turtleneck on under his shirt, collar right up to his jaw. Not an inch of skin he doesn't have to show.",
        approach: "Ask if he's hot in that",
        greeting:
          "\"Hot? Me? Always, thanks for noticing! Ahaha. ...Oh, you meant the turtleneck. Yeah, it's fine. I'm used to it.\"",
        responses: {
          kind: ["Offer him a cold drink", "Suggest somewhere cooler"],
          playful: ["Fan him from a distance", "Say he's hot either way"],
          bold: ["Say you'll keep him company", "Say the turtleneck suits him"],
          neutral: ["Take his word for it", "Let it drop"],
        },
      },
      {
        line: 'He spots you across the courtyard and waves with his whole arm. "Hey there, it\'s me, your curse twin!"',
        approach: "Call him curse twin back",
        greeting:
          '"Ahaha, see? It suits us! Twins gotta stick together, right?"',
        responses: {
          kind: [
            "Say you'd pick him as a twin",
            "Say it's nice not to be alone",
          ],
          playful: ["Ask for matching outfits", "Ask who's the older twin"],
          bold: ["Say you've got his back", "Ask if he means that"],
          neutral: ["Smile back at him", "Just wave back"],
        },
      },
      {
        line: "He's crouched by the rose bushes outside the dorm, coaxing a stubborn one into blooming. \"This one's fussy. Doesn't do that for just anyone.\"",
        approach: "Ask what it needs",
        greeting:
          '"Patience, mostly. ...Wait, look! It\'s opening up. Guess it likes you."',
        responses: {
          kind: ["Say his roses are beautiful", "Admire his patience with it"],
          playful: ["Cheer the rose on", "Claim you're fussy as well"],
          bold: ["Say you're not just anyone", "Demand it bloom for you too"],
          neutral: ["Watch him coax it", "Watch the rose open"],
        },
      },
      {
        line: "He stops mid-wipe behind the bar, staring at nothing. A second later the smile clicks back into place like a switch.",
        approach: "Say his name",
        greeting:
          '"Hm? Oh! Sorry, spaced out for a sec. Totally fine! What\'s up?"',
        responses: {
          kind: ["Smile back and stay a while", "Ask if he's had a long day"],
          playful: ["Ask who he was dreaming of", "Tease the recovery"],
          bold: ["Say you're right here", "Ask what he was thinking"],
          neutral: ["Let it go unremarked", "Say nothing about it"],
        },
      },
      {
        line: "He's moving a cutting into a bigger pot, chatting the whole time.",
        approach: "Ask how it's going",
        greeting:
          '"Great! This little guy outgrew his old pot. Happens to the best of us, right? Ahaha."',
        responses: {
          kind: ["Say it's in good hands", "Ask what it'll grow into"],
          playful: ["Ask if you can name it", "Ask what the plants think"],
          bold: ["Ask to repot one with him", "Hand him the next pot"],
          neutral: ["Watch him repot it", "Wait till he's done"],
        },
      },
      {
        line: "\"Hey, hang out with me later? I'll make it worth your while,\" he says, like it's already decided.",
        approach: "Say yes",
        greeting: '"Yes! Okay, it\'s a plan. No backing out now."',
        responses: {
          kind: ["Say you hoped he'd ask", "Say you'd like that"],
          playful: ["Pretend to think it over", "Ask what he's planning"],
          bold: ["Pick the time yourself", "Say you'll clear your schedule"],
          neutral: ["Just nod", "Ask when and where"],
        },
      },
      {
        line: "He's already got your drink order memorized, right down to how much ice you like.",
        approach: "Order the usual",
        greeting:
          '"Your usual, coming right up! Less ice than last time, right?"',
        responses: {
          kind: ["Say he's got you figured out", "Ask what his usual is"],
          playful: [
            "Ask what else he's memorized",
            "Ask if he memorizes everyone's",
          ],
          bold: ["Test if he really remembers", "Order something new instead"],
          neutral: ["Watch him pour it", "Take the drink"],
        },
      },
      {
        line: "You ask if he's okay. \"Aw, don't worry about me!\" he says, before you've even finished.",
        approach: "Worry about him anyway",
        greeting:
          "\"Seriously, I'm good! Now you. How've you been? The real answer.\"",
        responses: {
          kind: ["Say his worries count too", "Say he can tell you anytime"],
          playful: ["Say you'll trade answers", "Say that was a record dodge"],
          bold: ["Say you worry because you care", "Say you've got all night"],
          neutral: ["Say you've been fine", "Drop it for now"],
        },
      },
      {
        line: "He's fending off Edward on your behalf again, with a little more bite than usual.",
        approach: "Hang back and watch",
        greeting:
          '"Aw c\'mon, Ed, stay away from her! ...Geez, that old man. Sorry, cutie."',
        responses: {
          kind: ["Say you're glad he's around", "Ask if Ed bugs him too"],
          playful: ["Ask about a restraining order", "Call him your bodyguard"],
          bold: ["Say you'll return the favor", "Say Ed doesn't scare you"],
          neutral: ["Let him handle Edward", "Let it go unremarked"],
        },
      },
      {
        line: "You ask if he's coming to class. \"Oh sorry, I don't do the whole class thing! You go, I'm all good here!\"",
        approach: "Ask what he'll do instead",
        greeting:
          '"Me? Oh, plenty! Laundry, cleaning up after Ed, prep for the bar. Can\'t sit still anyway, so it works out!"',
        responses: {
          kind: ["Say you'll stop by the bar", "Wish him a good day"],
          playful: ["Bet he'll miss you first", "Ask what's on tonight's menu"],
          bold: ["Ask to tag along instead", "Say you'll find him after"],
          neutral: ["Head to class", "Wave and go"],
        },
      },
    ],
    warm: [
      {
        line: "He's hauling a basket of the entire dorm's laundry, piled so high he has to lean around it to see. He spots you and lifts it like a trophy.",
        approach: "Ask if he needs a hand",
        greeting:
          "\"Nope, I've got it! This is my workout. Everyone in the dorm changes clothes like it's a sport, so I'm basically an athlete.\"",
        responses: {
          kind: ["Say he works too hard", "Ask when he gets a break"],
          playful: ["Cheer him on like a coach", "Ask for his training plan"],
          bold: ["Say you'll walk with him", "Claim the next load"],
          neutral: ["Hold the door open", "Let him get to it"],
        },
      },
      {
        line: "You finally have some free time together. He looks like he hurried to make it, a little breathless and very pleased with himself.",
        approach: "Let him catch his breath",
        greeting:
          '"Hey, hey, hey! We finally get to spend some time together, it\'s illegal to take your eyes off me!"',
        responses: {
          kind: ["Say you missed him", "Say he has your full attention"],
          playful: ["Tease him for rushing", "Ask if he ditched chores"],
          bold: ["Claim the whole hour", "Say he's not leaving early"],
          neutral: ["Ask what he wants to do", "Let him pick the plan"],
        },
      },
      {
        line: "He's out watering the garden under the usual night sky, pruning shears already sticking out of his back pocket. \"Whoa, everything's blooming like crazy out here!\"",
        approach: "Ask what's blooming",
        greeting:
          '"Pretty much everything! I barely did anything, honestly. Just water and a whole lot of talking to them."',
        responses: {
          kind: ["Say it's clearly working", "Say they're lucky to have him"],
          playful: ["Ask for the secret", "Sniff every single bloom"],
          bold: ["Say you'd bloom for him too", "Say you'll help water next"],
          neutral: ["Hold the watering can", "Watch him work the rows"],
        },
      },
      {
        line: 'The bar\'s lights are turned low, and your drink is already waiting. He leans on his elbows across the counter from you. "Best part of my night, every time."',
        approach: "Ask how he knew your order",
        greeting:
          '"Lucky guess? Nah, I know my regulars. Started on it the second I heard the door. Still your favorite, right?"',
        responses: {
          kind: ["Say you'd come just for this", "Ask how his night's been"],
          playful: ["Ask what the worst part is", "Toast to every time"],
          bold: ["Ask what makes it the best", "Say he tells everyone that"],
          neutral: ["Take the drink", "Try the first sip"],
        },
      },
      {
        line: "He spots you and points across the room, already guessing. \"Wait, wait. Something's different about you. Don't tell me, I'll get it.\"",
        approach: "Let him guess",
        greeting:
          "\"Not your hair. Not your bag. ...You're smiling more. That's it, right? Who do I thank?\"",
        responses: {
          kind: ["Say you're glad to see him", "Ask what he'd guess first"],
          playful: ["Make him keep guessing", "Say nothing's different"],
          bold: ["Tell him to look closer", "Dare him to get it right"],
          neutral: ["Shrug and let him try", "Wait for his answer"],
        },
      },
      {
        line: "He's wiped the same spot of the bar in front of you three times now. On the fourth pass he gives up and just leans there.",
        // He's been caught goofing off and is hamming it up: teasing lands better than sincerity.
        mood: true,
        approach: "Ask if he's slacking off",
        greeting:
          "\"Who, me? Totally working. ...Okay, not really. I'm just thrilled you're here, cutie.\"",
        responses: {
          kind: [
            "Say you were hoping he'd stay",
            "Say you like having him here",
          ],
          playful: ["Say the counter's sparkling", "Ask if you're his break"],
          bold: ["Say he doesn't need an excuse", "Tell him the bar can wait"],
          neutral: ["Let him lean there", "Nod at the clean spot"],
        },
      },
      {
        line: 'He spots a loose thread on your uniform and holds out a hand for your blazer. "Give it here. Two minutes, tops."',
        approach: "Hand over your blazer",
        greeting:
          "\"Loose threads drive me nuts. Relax, I'm fast. I get a lot of practice on Ed's stuff.\"",
        responses: {
          kind: ["Say his stitches are neat", "Ask where he learned to sew"],
          playful: ["Ask if he charges extra", "Find him another loose one"],
          bold: ["Say he's showing off", "Say you'll bring him more"],
          neutral: ["Watch his hands work", "Wait while he stitches"],
        },
      },
      {
        line: "It's been a busy week, and you haven't caught up on your phone messages. When you reach the bar, he looks up like he's been saving a question.",
        approach: "Say you've been swamped",
        greeting:
          "\"Huh? Did you know you've got unread messages? Oh, that's why you've been leaving me on delivered! Ahaha!\"",
        responses: {
          kind: ["Say you missed him this week", "Ask how his week went"],
          playful: ["Say you've been in demand", "Blame your busy week"],
          bold: ["Say you came straight here", "Say he has you now"],
          neutral: ["Ask what you missed", "Say it's been a long week"],
        },
      },
      {
        line: "\"Hey, did you eat yet? No? Okay, sit. I'm making you something and you don't get a vote.\"",
        // He's in bossy-host mode and having fun with it: playing customer lands better than sincerity.
        mood: true,
        approach: "Let him feed you",
        greeting:
          "\"Ahaha, good! You looked like you were running on empty. Don't ever skip a meal on my watch. My door's always open!\"",
        responses: {
          kind: ["Ask what his favorite dish is", "Offer to help him cook"],
          playful: ["Ask if dessert comes too", "Say you'll leave a review"],
          bold: [
            "Say you came for his cooking",
            "Say you'll cook for him next",
          ],
          neutral: ["Wait for the food", "Eat what he puts down"],
        },
      },
      {
        line: "He's still shaking his head and smiling when you come in, like Lyca just impressed the heck out of him.",
        approach: "Ask what Lyca did",
        greeting:
          "\"Okay, so, some guys were running their mouths about him today. He called them out, stood his ground, and didn't lose his temper once. Didn't need me at all!\"",
        responses: {
          kind: ["Say Lyca's working hard", "Say he sounds proud"],
          playful: ["Say Lyca learned from the best", "Ask for the full story"],
          bold: ["Say you saw it coming", "Ask if Lyca knows he's proud"],
          neutral: ["Let him brag a while", "Hear the story out"],
        },
      },
      {
        line: "You're frowning over the mission briefing in the courtyard when he leans into view. \"Whoa, what's with the face? You're gonna give yourself wrinkles, Honor Roll!\"",
        approach: "Admit you're nervous",
        greeting:
          "\"Aw, c'mon, you're gonna be great! I'll be right there the whole time, and I'm weirdly good at this stuff. Ahaha. ...Seriously, though. You've got this.\"",
        responses: {
          kind: ["Say he always cheers you up", "Ask if he's nervous too"],
          playful: [
            "Make him promise a drink after",
            "Ask for his wrinkle cream",
          ],
          bold: ["Ask who worries about him", "Say you'll watch his back"],
          neutral: ["Nod and let out a breath", "Go back to the briefing"],
        },
      },
      {
        line: "\"You're back! I was worried you'd forgotten about me!\" It's a joke. He checks your face anyway, just to be sure.",
        approach: "Promise you didn't forget",
        greeting:
          '"Good, \'cause two whole days is way too long! You owe me a full catch-up, Honor Roll."',
        responses: {
          kind: ["Say you thought of him", "Say he's hard to forget"],
          playful: [
            "Ask if Haru lent him a tracker",
            "Say you missed his chatter",
          ],
          bold: ["Say he can count on you", "Ask if he really worried"],
          neutral: ["Say you were just away", "Wave hello"],
        },
      },
      {
        line: "Edward is asleep outside in the cold, and Rui is standing over him, hands on hips. \"Didn't you just take a nap, old man? You're gonna catch a cold!\"",
        approach: "Fetch a blanket for Edward",
        greeting:
          "\"Oh, you're a lifesaver! I swear, I can't leave him alone for five minutes. Honestly, he's an ancient toddler.\"",
        responses: {
          kind: ["Say Ed's lucky to have him", "Help get Ed back inside"],
          playful: ["Suggest leaving Ed there", "Ask if this happens a lot"],
          bold: ["Say Ed can look after himself", "Tell Ed to wake up"],
          neutral: ["Watch Ed sleep on", "Wait while he fusses"],
        },
      },
      {
        line: "Lyca tells Rui, flat as anything, that his nagging is annoying but the dorm would fall apart without him. Then he walks off like it was nothing, and Rui is left with a hand pressed to his chest.",
        approach: "Ask if he's okay",
        greeting:
          '"Lyca\'s an open book, but the flip side is he says the darndest things... I feel like watching him is bad for my heart..."',
        responses: {
          kind: ["Say he does so much for them", "Say the dorm's lucky"],
          playful: ["Ask if he needs to lie down", "Say Lyca's a softie"],
          bold: ["Say Lyca's just honest", "Say he should hear it more"],
          neutral: ["Wait for him to recover", "Look where Lyca went"],
        },
      },
      {
        line: 'He catches you crossing the courtyard alone after dark and jogs over, frowning. "You\'re out here by yourself?"',
        approach: "Say you're fine",
        greeting:
          '"Fine or not, let me walk you back! You can\'t talk me out of it."',
        responses: {
          kind: ["Say you'd like the company", "Say you're glad he showed up"],
          playful: [
            "Say he's out here alone too",
            "Ask if he's scared of the dark",
          ],
          bold: [
            "Say you came out to find him",
            "Set the pace for both of you",
          ],
          neutral: ["Let him lead the way", "Head back together"],
        },
      },
      {
        line: "Haru's leaning on the bar mid-story, and both of them stop the second you walk in, grinning like they've been arguing about something.",
        approach: "Ask what you interrupted",
        greeting:
          '"Perfect timing! Harurin says his stories are better than mine. Mine have endings!"',
        responses: {
          kind: ["Say you're happy to see both", "Ask how their night's going"],
          playful: ["Ask to hear the ending", "Start a story of your own"],
          bold: ["Say you came to see Rui", "Say Haru's got a point"],
          neutral: ["Wait for them to settle", "Lean on the bar too"],
        },
      },
      {
        line: 'Rui and Haku are crossing the courtyard together when Haku calls you "princess" in passing, easy as anything, and keeps walking. Rui stops and stares after him, grinning like he can\'t believe the nerve.',
        // He's turned Haku's flirting into a game: playing along beats sincerity here.
        mood: true,
        approach: "Ask what's so funny",
        greeting:
          "\"Hakucchi! Every time! Okay, fine, he's smooth. But I'm way more fun, right?\"",
        responses: {
          kind: ["Say Haku's just teasing", "Say you like them both"],
          playful: ["Wink at Rui", "Ask Rui for a better nickname"],
          bold: ["Say Rui's better at it", "Say Haku's got nothing on him"],
          neutral: ["Wave after Haku", "Watch Haku go"],
        },
      },
      {
        line: '"What? Ed was praising my good looks? I mean he\'s right, right? People always tell me my face is my only redeeming feature!"',
        approach: "Say it's not his only one",
        greeting: '"Oh? Go on, then. Name another one. I\'m listening!"',
        responses: {
          kind: ["Say he's also a good person", "Say he's a caring person"],
          playful: ["Say Ed has good taste", "Praise his modesty"],
          bold: ["Say his heart's the best part", "Say Ed undersold him"],
          neutral: ["Laugh along", "Let it slide"],
        },
      },
    ],
    spark: [
      {
        line: "His hand hovers a half-inch from your cheek. Neither of you moves for a while.",
        approach: "Don't close the inch",
        greeting:
          "\"Hold your hand up. Right there. Don't close it. ...Honestly, that's almost enough.\"",
        responses: {
          kind: "Tell him the inch is enough",
          playful: "Trace him back",
          bold: "Say the inch isn't enough",
          neutral: "Lower your hand",
        },
      },
      {
        line: '"This is as close as I get," he says. "I\'ve had a lot of practice. Wish I hadn\'t, but I have."',
        approach: "Take what he can give",
        greeting:
          "\"I'd trade a lot to be able to touch you right now. Don't ask me what, I've already done the math, ahaha.\"",
        responses: {
          kind: "Say you think about it too",
          playful: "Ask what the math said",
          bold: "Tell him to do the math again",
          neutral: "Say nothing at all",
        },
      },
      {
        line: "He traces the shape of your hand in the air above it, and it's worse than touching.",
        approach: "Hold your hand up",
        greeting:
          '"Okay, that\'s close enough. For you, I mean. I could stand here all day. Hold right there for me, cutie?"',
        responses: {
          kind: "Hold your palm to his",
          playful: "Wiggle your fingers at him",
          bold: "Press where his hand traced",
          neutral: "Let him trace your hand",
        },
      },
      {
        line: "The brightness is gone. What's underneath wants you badly and can't say so.",
        approach: "Lean in anyway",
        greeting:
          "\"Honor Roll... were you just checking me out? Hey, it's all good, don't be embarrassed!\"",
        responses: {
          kind: "Say you want him too",
          playful: "Make him ask for it",
          bold: "Say it for him",
          neutral: "Let the distance win",
        },
      },
      {
        line: "He leans in until you can feel him breathing, and stops exactly there.",
        approach: "Stop exactly there",
        greeting:
          "\"You're one inch away and I swear it's the loudest thing in the whole room.\"",
        responses: {
          kind: "Stay right where he stopped",
          playful: "Count how long he'll wait",
          bold: "Say the inch is his to close",
          neutral: "Stay that inch away",
        },
      },
      {
        line: "\"You're not doing all this for me, are you?\" he asks, light, like the answer doesn't actually matter to him.",
        approach: "Tell him the truth",
        greeting:
          '"Congrats on making it through another day. Seriously, I admire you for working so hard. Just... make sure some of it\'s for you, okay?"',
        responses: {
          kind: "Say it's not just for him",
          playful: "Tease him for asking",
          bold: "Admit it outright",
          neutral: "Let the question hang",
        },
      },
    ],
    close: [
      {
        line: '"You don\'t make me forget the curse. The gloves see to that," he says, hands staying carefully at his sides. "You just make it feel less like the whole story. That\'s a big deal, actually."',
        approach: "Go to him",
        greeting:
          '"This curse is worth putting up with on the days you smile at me like that. Easily."',
        responses: {
          kind: "Say distance doesn't matter",
          playful: "Play the almost-touching game",
          bold: "Need him without apology",
          neutral: "Stay in the quiet with him",
        },
      },
      {
        line: "He holds his hand up, palm out, and waits for you to hold yours an inch from it.",
        approach: "Hold your hand up to his",
        greeting:
          '"Hold your hand up. Right there. Close enough counts, right?"',
        responses: {
          kind: "Let him know you need him",
          playful: "Tease the almost-touch",
          bold: "Hold your palm to his",
          neutral: "Hold your palm still",
        },
      },
      {
        line: "The brightness goes quiet. What's underneath is tired, and grateful, and honest.",
        approach: "Let him be tired",
        greeting: "\"I'm okay. Really. I'm better than okay when it's you.\"",
        responses: {
          kind: "Say he can be tired here",
          playful: "Make him laugh for real",
          bold: "Say you see all of him",
          neutral: "Let the brightness rest",
        },
      },
      {
        line: '"One day," he says, not finishing the sentence. He doesn\'t need to.',
        approach: "Close every inch you can",
        greeting:
          "\"One day I'll be able to hold your hand properly. I'm counting on it.\"",
        responses: {
          kind: "Say you'll wait for one day",
          playful: "Ask how long 'one day' is",
          bold: "Tell him one day is a promise",
          neutral: "Let him serve in silence",
        },
      },
      {
        line: "He walks you to the door and stands in it long after you've gone.",
        approach: "Stay a little longer",
        greeting:
          "\"Don't feel sorry for me. Just... keep coming back. That's the whole ask.\"",
        responses: {
          kind: "Tell him you'll come back",
          playful: "Tease him for standing there",
          bold: "Say you're already coming back",
          neutral: "Look back at him once",
        },
      },
    ],
    bound: [
      {
        line: "Gloves. Layers. A scarf between his palm and your cheek. He's worked out every way there is.",
        approach: "Hold still",
        greeting:
          '"Hold still. Gloves are on. I\'ve been thinking about this all week."',
        responses: {
          kind: "Hold still for the gloves",
          playful: "Steal a glove",
          bold: "Say he's thought of everything",
          neutral: "Hold still for him",
        },
      },
      {
        line: '"Can\'t touch you," he says, "so I\'ve gotten creative. Just go with it."',
        approach: "Humor him",
        greeting:
          '"One day I\'ll do this properly. Until then, humor me. Please."',
        responses: {
          kind: "Tell him this is enough",
          playful: "Get inventive back",
          bold: "Tell him one day is a promise",
          neutral: "Go along with it",
        },
      },
      {
        line: "He kisses you through the fabric of his sleeve and it wrecks you both entirely.",
        approach: "Kiss him back through it",
        greeting:
          '"Ahaha... look at us. The sleeve stays, okay? Everything else, I\'m not arguing."',
        responses: {
          kind: "Let the sleeve be enough",
          playful: "Kiss him back through it too",
          bold: "Kiss through the sleeve first",
          neutral: "Nod against his sleeve",
        },
      },
      {
        line: "He lies beside you all night with a hand's width of air between, and neither of you sleeps.",
        approach: "Lie down beside him",
        greeting:
          '"Lie down. Right there. I\'ll stay on this side of the air."',
        responses: {
          kind: "Stay close despite the gap",
          playful: "Close half the air",
          bold: "Close all the air you can",
          neutral: "Keep the hand's width",
        },
      },
      {
        line: "He loves you louder than anyone ever has, because it's the one thing the curse can't stop.",
        approach: "Say it back",
        greeting:
          "\"I love you. That one doesn't need hands. That one's free.\"",
        responses: {
          kind: "Say it back louder",
          playful: "Say it back even louder",
          bold: "Match how loud he loves you",
          neutral: "Lie still in the dark",
        },
      },
      {
        line: '"Sometimes I wish you\'d met me as a regular guy," he says, light as anything. "You\'d never have looked twice. ...Still glad it went the way it did."',
        approach: "Say you're glad too",
        greeting:
          '"I\'ve never wanted anything like I want to just hold you. Never. ...Sorry. Heavy. But true."',
        responses: {
          kind: "Say you're glad too",
          playful: "Ask what regular Rui was like",
          bold: "Say you want it too",
          neutral: "Let the night pass",
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // one playful label had no genuine beat match ("Let him see your joy") and
  // was dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Hey there! New face, huh? Welcome to the fun side of campus." **{name}** waves {user} over.',
      '{user} calls his name, and **{name}** spins around and points at himself. "Me? Oh, you\'ve got good taste."',
      '{user} calls his name, and **{name}** lights up. "You know me already? Guess my reputation got here first."',
      "**{name}** points both hands at {user}. \"Hey, cutie! You've got my whole attention. What's the plan?\"",
    ],
    known: [
      '"Cutie! Came all this way to check me out, huh?" **{name}** winks at {user}.',
      "\"You called? Lucky me!\" **{name}** gives {user} a wink. \"Don't worry, I don't bite. That's Ed's thing.\"",
      '"Oh, hey, cutie! Wanna grab a bite after this?" **{name}** asks {user}, like it\'s the most natural thing in the world.',
    ],
    warm: [
      "\"Oh good, it's you. Ed's been at it all day, I need a normal person.\" **{name}** falls into step with {user}.",
      '"Talk to me! About anything. I like hearing you go on." **{name}** grins at {user} like he\'s got all day.',
      '"Harurin said you\'d be around." **{name}** grins at {user}. "I might\'ve asked a few times."',
    ],
    spark: [
      "**{name}** forgets the careful distance {user} is owed. Then remembers. Then regrets remembering.",
      "\"It's illegal to take your eyes off me, cutie.\" **{name}** throws {user} a wink, and they weren't going to.",
      "{user} calls his name, and the crack under **{name}**'s cheer shows, briefly.",
    ],
    close: [
      "\"You're not doing all this for me, are you?\" **{name}** asks {user}, laughing like it's a joke. It isn't, quite.",
      "**{name}** puts his sleeve between his hand and {user}'s cheek.",
      "{user} calls, and **{name}** leaves the cuttings he was carrying on the nearest bench.",
    ],
    bound: [
      '"Whole curse, and it never stopped me from wanting to be with you." **{name}** says it to {user} across the gap.',
      "**{name}** reaches {user} and stands as close as the curse allows, which is closer than it used to be.",
      "{user} waves hello, and **{name}** stops being happy enough for the both of them and is simply happy.",
    ],
  },
};
