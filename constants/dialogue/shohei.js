export default {
  // The level-up DMs (docs/bond-scene-dms.md). Sho's mouth arrives before he
  // does and the care arrives right behind it: he teases you and feeds you in
  // the same breath. The teasing IS the affection and is never a dig at her.
  // He is mouthy about Leo, about his brother's surname and about himself, and
  // never once unkind to her; canon's tell is "I'll warm you up. Pfft... I was
  // kidding, don't get mad." Tease, then immediately soften. Kind is what
  // reaches him, because nobody checks on the one who cooks. Food is the love
  // language throughout; by Devoted it's touch.
  //
  // He types fast and fluent in mixed case (never all-lowercase), caps for
  // emphasis, no full stops, short lines, and "u"/"ur", "lol", "rn", "tho" —
  // per reference.md's "## Bond Scenes" notes ("Sho - same as Leo"). No typos:
  // he is the one who makes fun of Alan's ("come tot hr epuit... Pfft."). Only
  // his typed DMs follow those rules; in-person `> ` speech and narration keep
  // normal punctuation.
  //
  // He calls her Senpai, the way he does all through his `dialogue` pool below.
  // Lowercase when he's typing, capitalised when he speaks. The word carries its
  // own arc: a joke about her being a year up at Acquaintance, and by Soulbound
  // the thing his bound-tier line calls "low and private and entirely
  // differently". Every scene should land it at least once.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: oi senpai\n\nu eat today? and don't say yeah if it was a vending machine\n\nthat's not eating, that's damage control",
        "look, I'm not being weird about it\n\nI do a big cook Thursdays and there's always way too much because I can't scale a recipe down, it's a whole thing, don't ask\n\nyou've been around {timesMet} times and every single time u look like you've been running on nothing\n\nit's bugging me, just come eat something",
      ],
      choice: {
        prompt: "and don't go making excuses about it either, just show up",
        options: [
          {
            key: "kind",
            label: "Say you'd like that",
            style: 3,
            close:
              "…cool\n\n*Then, immediately:* don't make it a thing, it's leftovers\n\n*It is not leftovers. There's a second bowl already set out when you get there.*",
          },
          {
            key: "playful",
            label: "Defend the vending machine",
            style: 1,
            close:
              "geez\n\nGEEZ\n\nthat's not food, that's a hostage situation with a wrapper on it\n\nThursday, at 7, I'm not asking twice",
          },
          {
            key: "bold",
            label: "Ask what he's making",
            style: 4,
            close:
              "why, u gonna have opinions?\n\n…ask me again when u get here, I'll make the one u like, I've been paying attention\n\n*A beat, like he heard himself say it.*\n\n…pfft forget I said that",
          },
        ],
      },
      keepsake: {
        emoji: "🍜",
        line: "A second bowl set out before you'd said you were coming.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: yo\n\nu good? that report Alan filed looked rough",
        "been meaning to say this for a while, just never found the moment\n\nvagastrom missions are not a joke, senpai. alan runs us straight into whatever's worst that week, leo mouths off and doubles the mess, and u eat just as much of it as the rest of us do\n\nand every time, good mission or straight up hell, u still come back and hit me with {favResponse} like none of it touched u\n\nI notice that. don't know how to say it without it turning into a whole thing, so here's me saying it like a whole thing anyway\n\nu don't gotta keep handing me {favResponse} on the bad ones. shoulder's free too, whenever u actually wanna talk instead",
      ],
      choice: {
        prompt:
          "anyway forget I said that part, unless u actually need it, then don't",
        options: [
          {
            key: "kind",
            label: "Say you'll remember that",
            style: 3,
            close:
              "…yeah?\n\ngood, cuz I meant it, and I don't say stuff like that twice\n\nnow eat something, u look like the mission again",
          },
          {
            key: "playful",
            label: "Ask if the truck counts too",
            style: 1,
            close:
              "counts as both, free food AND free shoulder, senpai's getting the whole package\n\ndon't tell Leo I said package, he'll make it weird",
          },
          {
            key: "bold",
            label: "Say he never asks either",
            style: 4,
            close:
              "…that's different\n\nokay it's not different, shut up\n\nfine, maybe I'll take u up on it too sometime, don't get used to it tho",
          },
        ],
      },
      keepsake: {
        emoji: "🫂",
        line: "The shoulder he offered before you ever had to ask for it.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: truck\n\n2am\n\ndon't tell anybody, I mean it",
        "*The food truck is shut, the shutter's down, and he's inside with one light on and something going on the burner that smells nothing like what he sells.*\n\n> This is the one I actually cook. Not the menu stuff. Menu stuff is for the money and the line out front and Leo's cut for building the app. This one's just mine.",
        "> It's not on any menu and it's not written down. Just something I've been making since before Darkwick, and I've never handed it to anybody.\n\n*He puts the bowl in front of you and immediately looks somewhere else.*\n\n> So, yeah. Don't say anything nice or I'm throwing you out. Just eat it while it's hot, Senpai. I've been keeping it warm twenty minutes waiting on you.",
      ],
      choice: {
        prompt: "...Well? Say something. Not that. Something else.",
        options: [
          {
            key: "kind",
            label: "Tell him it's the best thing",
            style: 3,
            close:
              "*He turns all the way around to face the burner so you can't see him.*\n\n> ...Yeah, all right.\n\n*He doesn't turn back for a while. When he does his ears are red and he blames the steam.*",
          },
          {
            key: "playful",
            label: "Ask for the recipe",
            style: 1,
            close:
              "> Absolutely not.\n\n> ...I'll make it. Whenever. That's better than the recipe anyway. You'd wreck it, you don't own one decent pan.",
          },
          {
            key: "bold",
            label: "Ask why you get this one",
            style: 4,
            close:
              "*He goes quiet, which is the rarest thing he does.*\n\n> Because you're the only one who ever asks if *I've* eaten, Senpai.\n\n*he says, at the wall.*\n\n> Everybody else just holds a bowl out. You've done it four times. I counted. That's embarrassing, so shut up.",
          },
        ],
      },
      keepsake: {
        emoji: "🍲",
        line: "The one dish he actually cooks, that isn't written down anywhere.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: ok so u know who my brother is",
        "everybody knows. has since day one, and they all do the same thing, that little recalculation where they work out how to talk to me now\n\nhalf this house thinks I'm here on his name, other half thinks I'm here to spy for him\n\nI cook, I get in fights, I show up when people need something, and none of it counts because of the surname",
        "u never did that, not once\n\nfirst person who didn't, and I'd been waiting on it for two years, so I noticed the exact second it didn't happen\n\nthat's it, that's the message\n\nsorry it's a downer, I'm normally way more fun than this",
      ],
      choice: {
        prompt: "alright, say something so this stops being weird",
        options: [
          {
            key: "kind",
            label: "Say it's his own name",
            style: 3,
            close:
              "*There's a long gap.*\n\n…say that to Leo next time he's being a jerk about it\n\nactually don't, actually I wanna have said it myself\n\nthanks senpai, seriously, don't make me say it twice",
          },
          {
            key: "playful",
            label: "Say you forgot he had one",
            style: 1,
            close:
              "u did NOT forget\n\n…u might've actually forgotten\n\nlol that's insane, that's the best thing that's happened to me all week and it's just u having a bad memory",
          },
          {
            key: "bold",
            label: "Ask who he'd be without it",
            style: 4,
            close:
              "*The reply takes a long time.*\n\ndunno, never got to find out\n\n*Then:* …some guy who cooks for u at 2am maybe\n\nyeah, I'd take that",
          },
        ],
      },
      keepsake: {
        emoji: "🛻",
        line: "The truck at 2am with the shutter down and one light on.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: don't come by the truck tomorrow\n\nface is a mess rn\n\nit's fine, it's not a big one",
        "*You ask. He caves in about four seconds, because he always does.*\n\nLeo said something about u, in front of people\n\nand I've let him say a thousand things about me and never once cared, so I know exactly how this looks\n\nbut that one wasn't about me, was it",
        "Mido already got me for it\n\nweek off the truck, which… fine, whatever\n\nwould do it again tho, wouldn't even think about it\n\ndidn't think about it the first time, that's the whole problem, hands were already moving",
      ],
      choice: {
        prompt: "go on then, chew me out, everybody else has",
        options: [
          {
            key: "kind",
            label: "Ask to see the damage",
            style: 3,
            close:
              "*He video calls before you've finished typing, and it's worse than he said, and he's grinning through it like an idiot.*\n\n> See? Nothing. Barely even... ow. Okay. Slight something.\n\n*He lets you talk him into ice and stays on the call while you watch him hold it there, complaining the whole time and not hanging up.*",
          },
          {
            key: "playful",
            label: "Ask if Leo looks worse",
            style: 1,
            close:
              "Pfft, Leo looks like he lost a fight with the curb\n\n…don't tell Mido I said that\n\nor do, he'll act furious for about a minute and then laugh about it in the garage where he thinks nobody can hear him",
          },
          {
            key: "bold",
            label: "Say you'd have done it too",
            style: 4,
            close:
              "…don't say stuff like that senpai, I'll get ideas\n\n*He turns up at your place an hour later with food, one eye swollen shut, and hands the bag over before he says anything.*\n\n*Then he just stands there. Then he puts his forehead down on your shoulder and stays there, and doesn't say another word for a while.*",
          },
        ],
      },
      keepsake: {
        emoji: "🥊",
        line: "A week off the truck he'd have taken again without thinking.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: ok\n\nshutter's down, truck's shut, nothing in my hands to keep me busy, so I'm doing this",
        "{timesMet} times you've come by\n\nI've cooked for u… I dunno, most of them\n\nI don't cook for people, I cook for *money* and I cook for the house because somebody's gotta\n\nur the only person I've ever cooked for because I wanted to watch u eat it",
        "and I know what I am, all right\n\nmouth on me, I get in fights, I'm loud, got a surname that walks into every room ahead of me. there's easier people to pick\n\nbut u keep asking if I've eaten. two years here and ur the only one who ever has\n\nit's such a stupid small thing to fall apart over and I did anyway, ages ago, and I've been pretending I didn't",
        "I've called u senpai about four thousand times\n\nstarted because ur a year up on me and it was funny. stopped being funny a long time ago\n\nkept saying it anyway because it was the only way I had of saying the other thing without saying it\n\nso: I love u, senpai. no clever version. since about the third bowl\n\nI've been cooking at u instead of telling u because that was easier. I'm a coward about exactly one thing",
      ],
      choice: {
        prompt: "say whatever, I'll be fine, I'm always fine",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "…ur kidding\n\nur not kidding, okay, all right, don't move\n\n*The shutter goes up eight minutes later with him under it, still in his apron, having clearly sprinted the whole way and refusing to admit it.*\n\n*He takes your jaw in both hands (flour on them, of course there's flour on them) and kisses you like he's been holding onto it since the third bowl, which he has.*",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "yeah, sure, take forever, I don't care\n\nthat's not me playing it cool, I'm bummed. but I'd be way more bummed if u said something u didn't mean because I put u on the spot at one thirty in the morning\n\nThursday's still on. Thursday was never about this. I'd still be feeding u if u told me to get lost, that's just how it is",
          },
        ],
      },
      keepsake: {
        emoji: "🍳",
        line: "The apron he was still wearing when he ran the whole way.",
      },
    },
  },
  dialogue: {
    new: [
      {
        line: "The truck's hatch is up and something smells incredible. He waves you over before you've decided anything.",
        approach: "Let him pick",
        greeting:
          "\"First time? Don't bother with the menu, I'll pick,\" he says with a smirk.",
        responses: {
          kind: ["Trust him to pick", "Thank him for the welcome"],
          playful: ["Give it right back", "Ask what he'd pick for you"],
          bold: ["Order the spicy one anyway", "Read the menu out loud"],
          neutral: ["Let him cook", "Wait for whatever comes"],
        },
      },
      {
        line: "He barely spares you a glance, jaw set, like he's already bored with whatever this is going to be.",
        approach: "Introduce yourself",
        greeting: '"What\'re you looking at? ...You hungry or what?"',
        responses: {
          kind: ["Say you'd love some food", "Thank him properly"],
          playful: ["Ask if he's always this tense", "Say you're starving, actually"],
          bold: ["Hold your ground calmly", "Ask what his problem is"],
          neutral: ["Simply be there", "Nod at the menu"],
        },
      },
      {
        line: 'Behind the truck, something coughs twice before it catches. "Yeah, yeah, I hear you," he mutters at it, then grins over at you like he wasn\'t just talking to his bike.',
        approach: "Order something",
        greeting:
          "\"Don't mind Bonnie, she's just picky about who she likes.\" He looks you over, easy, like he's already decided you're fine. \"She'll come around.\"",
        responses: {
          kind: ["Say hi to Bonnie too", "Say you'll win her over"],
          playful: ["Tease him about the bike talk", "Ask what Bonnie likes"],
          bold: ["Pet the bike anyway", "Say Bonnie likes you already"],
          neutral: ["Let him have his moment", "Order and wait"],
        },
      },
      {
        line: "Bonnie growls to a stop right by you, and he swings off in one motion, helmet already coming off.",
        approach: "Ask about the ride",
        greeting:
          '"Don\'t just stand there gawking. You want a ride or not?" He jerks his chin at the bike.',
        responses: {
          kind: ["Thank him for the offer", "Say you'd like that"],
          playful: ["Ask if Bonnie has road rage", "Ask if he's a safe driver"],
          bold: ["Hop on the bike with him", "Ask to drive"],
          neutral: ["Hop on without a word", "Decline, stay on foot"],
        },
      },
      {
        line: 'His knuckles are freshly wrapped, one already bruising. "Don\'t," he says, before you can even ask.',
        approach: "Ask about the knuckles",
        greeting: '"It\'s nothing. ...I said don\'t, Senpai. Want food or not?"',
        responses: {
          kind: ["Ask gently if he's hurt", "Offer to grab some ice"],
          playful: ["Tease him about the bruise", "Ask who won"],
          bold: ["Hold his gaze", "Ask anyway"],
          neutral: ["Let it go unasked", "Order food, say nothing"],
        },
      },
    ],
    known: [
      {
        line: "Bonnie's parked closer to where you always wait for your order now. He'd say that's just where there was room.",
        approach: "Tease him about it",
        greeting: [
          "\"Bonnie's warming up to you faster than she did to Leo. That's not a compliment to him.\"",
          '"Bonnie likes you. Don\'t ask me how I know that, I just know."',
        ],
        responses: {
          kind: ["Say you like the spot", "Thank him for the parking"],
          playful: ["Tease him about 'just room'", "Claim the spot as yours"],
          bold: ["Call it favoritism outright", "Say Bonnie has good taste"],
          neutral: ["Note it, say nothing", "Let the parking go unremarked"],
        },
      },
      {
        line: "He drops back to walk beside you as the mission wraps up, not saying why, just there.",
        approach: "Ask why he stuck around",
        greeting: '"What? Leo bailed. Somebody\'s gotta make sure you get back."',
        responses: {
          kind: ["Say you're glad he did", "Thank him for walking with you"],
          playful: ["Guess his real reason", "Tease him for not saying why"],
          bold: ["Ask him outright why", "Call out the silence"],
          neutral: [
            "Walk with him, say nothing",
            "Let the reason stay unknown",
          ],
        },
      },
      {
        line: "He's skipped his afternoon class again. \"It's all in the books anyway,\" he says, like that settles it.",
        approach: "Call him out on skipping",
        greeting: '"Pfft. You gonna tattle, Senpai? Go ahead. I\'ll still ace it."',
        responses: {
          kind: ["Offer to catch him up", "Say the books can wait"],
          playful: ["Ask what's in those books", "Threaten to tell on him"],
          bold: ["Call the excuse lazy", "Tell him to go to class"],
          neutral: ["Shrug, it's his choice", "Let him skip in peace"],
        },
      },
      {
        line: 'He spots something across the lot and swears under his breath, then waves it off like he didn\'t just see a masked stranger again. "Nothing, Senpai. Forget it."',
        approach: "Ask what he saw",
        greeting:
          '"I said it\'s nothing, Senpai. ...Just stick close on the walk back, yeah?"',
        responses: {
          kind: ["Ask if he's really okay", "Offer to walk him back"],
          playful: [
            "Press him for the real story",
            "Guess who the stranger was",
          ],
          bold: ["Demand to know what he saw", "Refuse to let it go"],
          neutral: ["Let him wave it off", "Drop the question"],
        },
      },
      {
        line: "The truck is slammed and he still waves you to the front of the line.",
        approach: "Take the front of the line",
        greeting:
          "\"You again, Senpai? Guess I'll feed you. Don't get used to it.\"",
        responses: {
          kind: ["Thank him for the priority", "Say you don't want to cut"],
          playful: [
            "Milk the special treatment",
            "Ask if you're his favorite now",
          ],
          bold: ["Take the spot, no argument", "Expect it every time now"],
          neutral: ["Take the spot, say nothing", "Move up without comment"],
        },
      },
      {
        line: "He glances at your textbook upside-down and gives you the right answer before you've even finished reading the question, then shrugs it off.",
        approach: "Ask how he knew that",
        greeting:
          '"What? It\'s all in the book. I read it once. Pfft, don\'t look at me like that."',
        responses: {
          kind: ["Thank him for the help", "Say he's good at this"],
          playful: ["Ask if he's secretly smart", "Demand he do your homework"],
          bold: ["Say you'd have gotten there", "Ask how he really knew"],
          neutral: ["Take the answer, move on", "Not question the help"],
        },
      },
      {
        line: "He's testing a new sauce and won't serve it to anyone else until you've said it's good.",
        approach: "Be the taste tester",
        greeting: '"Made extra. Wasn\'t for you. ...Fine, it was for you."',
        responses: {
          kind: ["Give an honest, kind review", "Say it's his best yet"],
          playful: ["Milk the taste test forever", "Demand a bigger portion"],
          bold: ["Give blunt, honest feedback", "Tell him to trust himself"],
          neutral: ["Taste it, say little", "Give a flat verdict"],
        },
      },
      {
        line: "He's boxed up food for you to go, even though you never asked.",
        approach: "Take the boxed portion",
        greeting: '"Sit. Eat. You look like you forgot lunch again."',
        responses: {
          kind: ["Thank him for the food", "Say he didn't have to"],
          playful: [
            "Ask if everyone gets this",
            "Tease him for the extra care",
          ],
          bold: ["Take the box, no thanks needed", "Say you expected it"],
          neutral: ["Take it, say nothing", "Eat it without comment"],
        },
      },
      {
        line: '"You\'re late, Senpai," he says, not really annoyed, just keeping score.',
        approach: "Apologize for being late",
        greeting: '"Three minutes, Senpai. Your food\'s getting cold."',
        responses: {
          kind: ["Apologize, mean it", "Promise to do better"],
          playful: ["Ask what the score even is", "Blame the traffic, poorly"],
          bold: ["Say the scorekeeping's petty", "Tell him to stop counting"],
          neutral: ["Shrug at being late", "Let the score stand"],
        },
      },
      {
        line: "He steps between you and Leo mid-jab, not even breaking his own conversation to do it.",
        approach: "Let him run interference",
        greeting: '"Knock it off, Leo. ...Ignore him, Senpai. He\'s bored."',
        responses: {
          kind: ["Thank him for stepping in", "Say Leo means no real harm"],
          playful: [
            "Ask what Leo said this time",
            "Tease him for defending you",
          ],
          bold: ["Say you can handle Leo", "Ask why he bothers"],
          neutral: ["Let it go, say nothing", "Move on from the jab"],
        },
      },
      {
        line: "He's icing his knuckles after sparring with Mido and shrugs off the wince like you didn't just see it.",
        approach: "Ask if he's okay",
        greeting:
          '"Five sets of fifteen rounds. Mido\'s insane. ...I\'m fine, Senpai."',
        responses: {
          kind: ["Ask if he's really fine", "Offer to wrap the knuckles"],
          playful: ["Tease him about losing", "Ask if Mido won this round"],
          bold: ["Demand he ice it properly", "Call out the tough act"],
          neutral: ["Let him shrug it off", "Say nothing about the wince"],
        },
      },
      {
        line: "He clocks you before you've said a word and starts making your order without asking.",
        approach: "Let him guess your order",
        greeting: '"Not the spicy one, right? See, I remembered."',
        responses: {
          kind: ["Thank him for remembering", "Say that means a lot"],
          playful: [
            "Test if he really remembers",
            "Ask what else he's tracking",
          ],
          bold: ["Say of course he remembered", "Demand he admit he cares"],
          neutral: [
            "Take the order, say nothing",
            "Let him guess without comment",
          ],
        },
      },
      {
        line: "He's already going off about something Leo did the second he spots you, like he's been saving it up just to tell you.",
        approach: "Let him vent about Leo",
        greeting:
          "\"Don't tell Leo I said this, but you're all right, Senpai.\"",
        responses: {
          kind: ["Let him vent it all out", "Take Leo's side gently"],
          playful: ["Egg the rant on", "Ask for the juicy details"],
          bold: ["Tell him to let it go", "Argue Leo's side to rile him"],
          neutral: ["Half-listen, say nothing", "Let the rant run its course"],
        },
      },
    ],
    warm: [
      {
        line: "He greets you with a warm smile, already thinking about how to make your day better.",
        approach: "Stay till close",
        greeting: '"Senpai, I\'m always happy to see you around."',
        responses: {
          kind: "Say you're happy too",
          playful: "Ask what he's planning",
          bold: "Demand to know the plan",
          neutral: "Smile back, say nothing",
        },
      },
      {
        line: "He catches Leo needling you from across the room and shuts it down with a look before you even notice.",
        approach: "Let him handle Leo",
        greeting:
          '"Tch. He knows better. Nobody gets to talk to you like that. Not even him."',
        responses: {
          kind: "Thank him for stepping in",
          playful: "Ask what the look said",
          bold: "Say you saw everything",
          neutral: "Let it go unremarked",
        },
      },
      {
        line: "He hands you something hot to hold before he says a single word.",
        approach: "Try the new recipe",
        greeting: [
          "\"Stay till close, Senpai? I'll feed you twice. That's the deal.\"",
          '"I named it after you. The dish, I mean. Don\'t make it weird, Senpai."',
        ],
        responses: {
          kind: "Take it gratefully",
          playful: "Ask what's the occasion",
          bold: "Eat it before he explains",
          neutral: "Take it, say nothing",
        },
      },
      {
        line: "He tosses you the spare helmet without asking if you want a ride. You always do.",
        approach: "Take the spare helmet",
        greeting:
          "\"Took Bonnie out this morning. She's got a mind of her own, runs sweet when it's cool like this.\"",
        responses: {
          kind: "Thank him for the helmet",
          playful: "Act surprised you're going",
          bold: "Climb on before he finishes",
          neutral: "Take the helmet, no fuss",
        },
      },
      {
        line: "\"Pit's on again? I'm done with that already. They're all normies, what's the point? Stay here, eat.\"",
        approach: "Sit, eat, complain",
        greeting:
          '"Good. Now tell me who ruined your day and I\'ll have opinions about them."',
        responses: {
          kind: "Let him vent, stay and eat",
          playful: "Egg on the complaining",
          bold: "Argue that Pit's not so bad",
          neutral: "Eat, let him talk",
        },
      },
    ],
    spark: [
      {
        line: "He feeds you a bite off his own fork and only afterward realizes what he did.",
        approach: "Open",
        greeting:
          '"Here. Open, Senpai. ...Good, right? Wait, why are you looking at me like that?"',
        responses: {
          kind: "Say his cooking means care",
          playful: "Feed him a bite back",
          bold: "Steal another bite boldly",
          neutral: "Let him panic",
        },
      },
      {
        line: "He walks you to Bonnie after close and takes the long way round to keep you a minute longer.",
        approach: "Notice he closed early",
        greeting:
          '"I closed early. First time ever. Do the math on that one, Senpai."',
        responses: {
          kind: "Thank him for the long way",
          playful: "Make him say it twice",
          bold: "Say it first",
          neutral: "Change the subject",
        },
      },
      {
        line: "He's sparring with Mido when you show up, and he cuts the session short without a word of explanation, toweling off on his way over.",
        approach: "Wait through the sparring",
        greeting: '"Hop on. No, don\'t ask where, just hop on."',
        responses: {
          kind: "Ask if he's alright",
          playful: "Tease him about ditching Mido",
          bold: "Ask why he cut it short",
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
          bold: "Kiss the flour off his cheek",
          neutral: "Keep chopping",
        },
      },
      {
        line: "He shrugs off his jacket and drops it over your shoulders, then acts like the cold never bothered him at all.",
        approach: "Wear his jacket",
        greeting:
          '"Senpai, I... okay, I\'m just gonna say it. I like you. A lot. A LOT."',
        responses: {
          kind: "Tell him you like him too",
          playful: "Ask him to say it a third time",
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
          kind: "Tell him to eat something too",
          playful: "Turn it into a joke",
          bold: "Tell him you'd stay till dawn",
          neutral: "Be present for him",
        },
      },
      {
        line: "There's a second helmet that lives at your place now. Nobody decided that. It just happened.",
        approach: "Read the board",
        greeting: [
          "\"You're on the board. Permanently. I'm not discussing it.\"",
          '"I\'ll drop you home. Not up for discussion, Senpai, just get on."',
        ],
        responses: {
          kind: "Thank him for the board",
          playful: "Decorate the helmet yourself",
          bold: "Ask to ride with him at night",
          neutral: "Accept the board, say nothing",
        },
      },
      {
        line: "He introduces you to his brother without the usual flinch at the surname, like it doesn't weigh anything when you're there.",
        approach: "Meet his brother",
        greeting:
          '"Senpai... I\'m really glad you\'re here. You know that, right?"',
        responses: {
          kind: "Say the surname doesn't matter",
          playful: "Tease the brother resemblance",
          bold: "Say his brother'd be proud",
          neutral: "Let the moment pass gently",
        },
      },
      {
        line: "He cooks for you last, after everyone's gone, and it's always better than what they got.",
        approach: "Eat what he saved",
        greeting:
          '"Everyone gets fed. You get fed properly, Senpai. There\'s a difference."',
        responses: {
          kind: "Thank him for saving the best",
          playful: "Demand a new dish",
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
          kind: "Tell him you see past the act",
          playful: "Tease him about going soft",
          bold: "Say you like this version best",
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
          playful: "Wear his shirt on purpose",
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
          playful: "Tease him about being clumsy",
          bold: "Kiss him quiet",
          neutral: "Wrap them, say nothing",
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
          playful: "Ask him to say it again",
          bold: "Say his name back just as low",
          neutral: "Stay curled up",
        },
      },
      {
        line: "He leaves Bonnie right outside your window some nights, just so you'll hear him get in safe.",
        approach: "Guess why",
        greeting: '"Truck\'s closed tomorrow. I closed it. Guess why."',
        responses: {
          kind: "Say you always hear him",
          playful: "Guess wrong on purpose",
          bold: "Climb on the bike behind him",
          neutral: "Let him keep doing it",
        },
      },
    ],
  },
  // No temperamentDialogue pool: every leftover line was placed onto a
  // dialogue beat's `greeting`.
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
      "{user} says the name, and **{name}** waves them over before deciding anything else.",
      '{user} catches **{name}** swinging off his motorcycle. He tugs his helmet off. "What\'re you looking at?"',
    ],
    warm: [
      "\"Senpai!\" **{name}** has {user}'s order on before they've finished crossing the road.",
      '"What\'re you yelling for, Senpai? I\'m right here." **{name}** doesn\'t bother hiding the grin from {user}.',
      "**{name}** was closing up. He is now, somehow, cooking for {user}.",
    ],
    spark: [
      '"What\'re you looking at, Senpai?" **{name}** is grinning at {user} like he won something.',
      "{user} says the name, and **{name}** forgets the pan entirely.",
      "**{name}** wipes his hands twice on the way to {user}. He wanted them clean.",
    ],
    close: [
      "**{name}** hears {user} and leaves the truck running. Somebody else's problem.",
      "\"Don't move, Senpai. I'm coming to you.\" **{name}** is already halfway to {user}.",
      "{user} calls, and **{name}** kisses their temple on the way past without thinking about it.",
    ],
    bound: [
      "\"Order's already going, Senpai. Started the second I saw you.\" **{name}** tells {user} he isn't sorry about it.",
      "**{name}** was humming. {user} calling his name made it considerably worse.",
      "{user} says the name, and **{name}** decides the **{house}** shift can run itself.",
    ],
  },
};
