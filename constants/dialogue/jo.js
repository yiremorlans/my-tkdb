import { withPronounVariants } from "./_shared.js";

export default {
  // The level-up DMs (docs/bond-scene-dms.md). Jo runs a house of eccentrics and
  // has never once been asked how he is; the arc is somebody finally asking and
  // him not having an answer ready. He calls you "cutie" as a way of keeping the
  // register light, and the top of the ladder is the first message where he
  // doesn't do it.
  bondScenes: {
    acquaintance: {
      beats: [
        "**{firstName}**: Odd hour for this. I've stopped being able to tell which hours are odd.",
        "Quick thing, then I'll leave you be. You came through the hall Tuesday while I was dealing with three separate crises, and you didn't add a fourth. You took the clipboard out of my hand long enough for me to drink my coffee while it was still hot.\n\nThat's the whole compliment, cutie. {timesMet} times in this house and you're the first to hand me something instead of a problem. In Dionysia, that makes you rare.",
      ],
      choice: {
        prompt: "Anyway. How are you? And answer properly, I'll know.",
        options: [
          {
            key: "kind",
            label: "Ask him back",
            style: 3,
            close:
              "Ha. Nice try.\n\n*A long pause, for someone whose whole job is having an answer ready.*\n\n...Tired. That's the honest one. Don't tell Mio, he'll build me something.",
          },
          {
            key: "playful",
            label: "Offer to be crisis four",
            style: 1,
            close:
              "Don't. The system doesn't have room for a fourth.\n\n...Though if it were you, I'd probably enjoy the day more. Forget I said that. Two hours' sleep talking.",
          },
          {
            key: "bold",
            label: "Say you'd need something",
            style: 4,
            close:
              "Oh, would you.\n\n*Real interest, the first thing in the whole message he hasn't managed.*\n\nAsk, then. I'd like to know what it does to me. I don't get many chances to find out.",
          },
        ],
      },
      keepsake: {
        emoji: "🎩",
        line: "One honest word from a man who always has an answer ready.",
      },
    },

    friend: {
      beats: [
        "**{firstName}**: Something's been bothering me and I've decided you're going to hear about it.",
        "I adapt. It's what I do. I read a room and I become the version of me that room needs, and I've been doing it so long I couldn't tell you where the seam is any more. On stage, in the hall, with Shion, with the advisors. Different man...and woman, every time and all of them mine.\n\nYou come to me with {favResponse} no matter which one you're getting. Same every time. And it's started to feel like being addressed by name in a room where everyone else is calling me by a job.",
      ],
      choice: {
        prompt: "So what am I supposed to do with that, cutie?",
        options: [
          {
            key: "kind",
            label: "Say you'd like the real one",
            style: 3,
            close:
              "That's the trouble. I'd have to find him first.\n\n...I'll look. Give me a while. He's under a lot of paperwork.",
          },
          {
            key: "playful",
            label: "Ask which one you're getting",
            style: 1,
            close:
              "Honestly? The one who's had four hours' sleep and is being charming out of sheer muscle memory.\n\nWhich is not the good one. Come back Thursday, the Thursday one is much better company.",
          },
          {
            key: "bold",
            label: "Tell him to stop adapting",
            style: 4,
            close:
              "*He doesn't answer for a long moment*\n\nNo one's told me to stop before. I've been told to rest, to take a night off. Never just stop.\n\nI don't know what that looks like yet. I'd like to find out.",
          },
        ],
      },
      keepsake: {
        emoji: "🪪",
        line: "The night somebody addressed him by name instead of by job.",
      },
    },

    closeFriend: {
      beats: [
        "**{firstName}**: Five thirty tomorrow. East gate. Don't ask why yet, just say yes.",
        "I run alone every morning, an hour, before the house is awake enough to have opinions about it. Nobody's ever been invited. It never once occurred to me that anybody should be.",
        "Here's the part I wasn't going to send: I've known you since {sinceMet}, and you've been running through my head for most of that hour lately, which does nothing good for my splits. So I decided the efficient fix was to stop thinking about you out there and just have you next to me instead.\n\nCall it training. Call it whatever gets you up. I want an hour that isn't a job, or a mission, and doesn't end with either of us owing the other one a report.",
      ],
      choice: {
        prompt: "Well? I already set two alarms, cutie. Say you'll join me.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there",
            style: 3,
            close:
              "Good.\n\n...I wasn't going to admit to the two alarms, but there it is. Five thirty. Don't make me run this one alone after all that.",
          },
          {
            key: "playful",
            label: "Ask if this counts as a date",
            style: 1,
            close:
              "Absolutely not. It's cardio with company.\n\n...Ask me again after the third morning. I might have a different answer by then.",
          },
          {
            key: "bold",
            label: "Say he could've just asked",
            style: 4,
            close:
              "I know. I sat on it for a week deciding whether saying it out loud would ruin the whole exercise.\n\nApparently not. Five thirty. Try not to be smug about it before you've even laced up.",
          },
        ],
      },
      keepsake: {
        emoji: "👟",
        line: "A five thirty text he sent instead of running alone with the thought of her.",
      },
    },

    confidant: {
      beats: [
        "**{firstName}**: Do you have a little time this afternoon? There's an outfit I want you to try on, deep green silk, for the show. I'll be waiting at the office.",
        "To save you the question, it can't be one of the storeroom artifacts. Those run one size for the whole cast and call it close enough. This one needs it exact, and I don't trust anyone else's hands near you for that part.\n\nWould you come alone? I'd rather it just be the two of us for this one.",
        "Also, if I'm honest...\n\nIt's the one hour this week where nobody needs anything from me except you, standing still while I take my time with you. I don't get many hours like that, and I don't intend to share a single minute of it.",
      ],
      choice: {
        prompt: "So? Office, three o'clock, if that works for you, cutie.",
        options: [
          {
            key: "kind",
            label: "Tell him you're coming",
            style: 3,
            close:
              "Good.\n\nYou're going to look good in it. I picked it out myself, so I'd know.",
          },
          {
            key: "playful",
            label: "Ask if you're the mannequin",
            style: 1,
            close:
              "Close enough. Stand still, hold that pose, and try not to look that good while I'm trying to concentrate. No one else here to blame it on.",
          },
          {
            key: "bold",
            label: "Call the fitting an excuse",
            style: 4,
            close:
              "Caught.\n\nFine. I wanted to see you in something I picked out myself. Don't gloat about it.",
          },
        ],
      },
      keepsake: {
        emoji: "🧵",
        line: "A fitting he could've finished in ten minutes, and didn't.",
      },
    },

    devoted: {
      beats: [
        "**{firstName}**: I canceled the show.",
        "Full house. Two months of rehearsal. Romeo's already going to bill me for the room, and I have not canceled a performance in my life, not for illness, not for a funeral, not once.\n\nYou were in the lower halls when it went wrong and nobody could tell me where. So I dropped the stigma mid-transformation in front of a hundred and forty people and I walked off, and I did not think about it. That's the part I want you to have: I did not think about it.",
        "I've spent my whole life being the one who decides what gets sacrificed. I'm extremely good at it. I've sacrificed sleep, friendships, whole years of being a person, and I've never once resented any of it.\n\nTonight somebody else did the deciding and it wasn't me, and it turns out that person is you, and you weren't even in the room.",
      ],
      choice: {
        prompt:
          "Tell me I was an idiot. Nobody else is going to, they're all too polite.",
        options: [
          {
            key: "kind",
            label: "Tell him you're all right",
            style: 3,
            close:
              "I know. I've known for an hour.\n\nSay it in person. I'm outside. I've been outside for a while and I couldn't work out how to knock without it meaning something.",
          },
          {
            key: "playful",
            label: "Ask what Romeo billed him",
            style: 1,
            close:
              "More than the show made. He put it in writing. He put it in an *acronym*.\n\nWorth it. Don't tell him that, he'll raise it.",
          },
          {
            key: "bold",
            label: "Tell him it wasn't idiotic",
            style: 4,
            close:
              "*He's at the door before you've finished, still half in costume with the paint smudged, having very clearly walked straight there.*\n\n*He doesn't say anything for a while. He just puts both hands on your shoulders, holds you at arm's length to check, and then gives up entirely and pulls you in.*\n\n> A lifetime on that stage,\n\n*he says into your hair.*\n\n> ...and one of you.",
          },
        ],
      },
      keepsake: {
        emoji: "🎟️",
        line: "A ticket to a show that didn't happen.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: No nickname on this one. You'll notice, and I want you to.",
        "{timesMet} times. I've counted, which I don't do, because I don't keep count of people. Keeping count is how you end up with a ledger of who owes what and I have quite enough of those.\n\nYou're the only person in my life who isn't on one. Not on the debit side, not on the credit side. You're just there, at five thirty, at the gate.",
        "I adapt to everybody. I told you that months ago and you told me to stop and I said I didn't know how.\n\nI've worked out that I do know how. I know exactly how. It's this: it's whoever I am at six in the morning halfway round the water with the stage nowhere on me and nothing to run. That's the seam. You've been looking at it for a year.",
        "So: I love you.\n\nNot the captain, not the Venus of Dionysia, not whichever version the room ordered. The one who's out of breath and hasn't got a line ready.\n\nYou can take that at whatever speed you like. I've spent years making decisions for a house full of people. I'm quite happy to not make this one.",
      ],
      choice: {
        prompt:
          "Your call. Entirely, and I mean that more than I've meant anything.",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...East gate. Now. I know it's not five thirty.\n\n*He's there in the dark with no shoes on properly and no explanation for that, and when you get to him he laughs, a real one, cracked open, nothing performed anywhere in it.*\n\n> Say it out here,\n\n*he says, hands either side of your jaw.*\n\n> Where there's nobody to be a captain in front of.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Take it.\n\n*And then, because he cannot help himself:* And don't manage me about it. If you decide no, say no. I've had a lifetime of people managing me and I'd rather have one person who doesn't.\n\nThe gate's at five thirty. It was at five thirty before any of this and it'll be at five thirty after. I'll wait. That part isn't a favor, it's just where I am.",
          },
        ],
      },
      keepsake: {
        emoji: "📇",
        line: "The one message that didn't start with a nickname.",
      },
    },
  },
  // All six tiers are paired beats — { line, approach } — so the /roam
  // button always answers the scene the line just set, rather than being
  // drawn from a separate pool at random (docs/dialogue-approach-pairing.md).
  // `approach` may be an array when more than one reaction genuinely fits the
  // same beat. `spark` was the last tier closed: its 5 lines were expanded to
  // the full 27-line target to pair with `approach.spark`, which had already
  // been grown that far on its own — see the note by `dialogue.spark` below
  // for how the payoff/response pairing was done for it.
  dialogue: {
    new: withPronounVariants([
      {
        line: "{He}'s buried in paperwork: proposals, schedules, a budget that won't balance. {He} looks up anyway.",
        approach: "Ask for a minute of {his} time",
        greeting: '"A new face! Come on in, cutie. What\'s your name?"',
        responses: {
          kind: ["Say the work can wait", "Offer to help with it"],
          playful: ["Tease {him} about the papers", "Steal the budget pen"],
          bold: [
            "Ask {him} to work less for you",
            "Demand {his} full attention",
          ],
          neutral: ["Sit while {he} works", "Wait without interrupting"],
        },
      },
      {
        line: '"Anything troubling you, cutie? If you run into any problems, just come talk to me."',
        approach: "Ask if {he}'s free",
        greeting:
          '"Take your time. Everyone here moves at their own pace, and you don\'t have to rush for me."',
        responses: {
          kind: ["Thank {him} for the time", "Say you appreciate it"],
          playful: [
            "Call {him} 'cutie' right back",
            "Ask if that goes for everyone",
          ],
          bold: [
            "Ask {him} to make time for you",
            "Push straight to the point",
          ],
          neutral: ["Let {him} decide the pace", "Wait for {him} to lead"],
        },
      },
      {
        line: "The charisma lands before {he}'s said a word. Running Dionysia hasn't dulled it.",
        approach: "Cut through the charisma",
        greeting:
          '"Pull up a chair. I\'ve got a budget to fight with, but I can talk and lose at the same time."',
        responses: {
          kind: ["Thank {him} for the honesty", "Appreciate the effort"],
          playful: ["Match the easy charm", "Call out the charm offensive"],
          bold: ["Meet the charisma head-on", "Refuse to be charmed"],
          neutral: ["Simply be present", "Let the charm pass by"],
        },
      },
      {
        line: '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
        approach: "Wave {him} over",
        greeting:
          "\"Give me a second to put this down, and then you've got my full attention. What's going on?\"",
        responses: {
          kind: ["Ask if {he}'s sleeping enough", "Check {he}'s eating too"],
          playful: ["Steal {his} coffee order", "Rearrange {his} paperwork"],
          bold: ["Wave {him} over anyway", "Demand {he} take a break"],
          neutral: ["Let the schedule wait", "Wait quietly nearby"],
        },
      },
      {
        line: "{He} glances up mid-signature, and somehow the whole room feels less busy for it.",
        approach: "Pull up a chair",
        greeting: '"Anything troubling you? If there is, come talk to me."',
        responses: {
          kind: ["Say you're here for {him}", "Ask how {he}'s really doing"],
          playful: [
            "Tease {him} about signing",
            "Ask what {he}'s signing away",
          ],
          bold: ["Pull up a chair uninvited", "Take {his} attention outright"],
          neutral: ["Watch {him} work in quiet", "Sit without a word"],
        },
      },
    ]),
    // Pool sizes track the affinity width of the level(s) they cover (see
    // RELATIONSHIP_LEVELS / DIALOGUE_TIER_BY_LEVEL in constants/game.js) —
    // roughly 1 line per POOL_POINTS_PER_LINE affinity points, so a wider band
    // doesn't repeat more often than a narrow one. known=55 wide → 13, warm=75
    // wide → 18 at the current POOL_POINTS_PER_LINE of 4.
    known: withPronounVariants([
      {
        line: '"You came back." {He} sets down the pen like {he}\'d been looking for an excuse.',
        approach: "Interrupt the paperwork",
        greeting: '"Sit anywhere. I was getting bored in here without you."',
        responses: {
          kind: ["Say you missed the chaos", "Ask if {he}'s had a break"],
          playful: ["Say you rescued {him}", "Hide the pen from {him}"],
          bold: ["Ask if {he} waited for you", "Say {he} wanted the excuse"],
          neutral: ["Take the offered seat", "Sit and let {him} finish"],
        },
      },
      {
        line: '"House meeting with Mio in a minute. You think we shoulder too much? It\'s just quicker to handle it ourselves."',
        approach: "Sit through the budget talk",
        greeting:
          '"Sit in on the house meeting. Budget talks go faster with you around."',
        responses: {
          kind: ["Say you don't mind staying", "Offer to take some of it on"],
          playful: ["Heckle the budget numbers", "Ask if there's snack money"],
          bold: ["Tell {him} to delegate more", "Ask for a say in the budget"],
          neutral: ["Listen without comment", "Sit and take notes"],
        },
      },
      {
        line: "{He} works something small you mentioned once into the conversation like it's nothing.",
        approach: "Give an honest read",
        greeting: '"Tell me honestly what you thought. No, actually honestly."',
        responses: {
          kind: ["Tell {him} it landed well", "Say it meant a lot"],
          playful: ["Act surprised {he} remembered", "Ask if {he} took notes"],
          bold: [
            "Ask why {he} remembered that",
            "Ask what else {he} remembers",
          ],
          neutral: ["Give the honest read plainly", "Answer it straight"],
        },
      },
      {
        line: '"Have you seen Elias, cutie? Asked him to do something and he\'s still not back..."',
        approach: "Offer to help instead",
        greeting:
          '"You would? Lifesaver. When you find him, tell him I\'m not even mad. ...I am, a little."',
        responses: {
          kind: ["Take the last errand", "Say Elias is probably fine"],
          playful: ["Offer to impersonate Elias", "Promise a search party"],
          bold: ["Say Elias is an excuse", "Ask why {he} trusted Elias"],
          neutral: [
            "Say you'll look for him too",
            "Ask where Elias usually goes",
          ],
        },
      },
      {
        line: '"Elias is back, so we\'re stealing a coffee break before I lose the afternoon to that budget. Join us, cutie."',
        approach: "Join the coffee break",
        greeting:
          '"Sit with me a minute. I\'m losing this battle with the budget either way."',
        responses: {
          kind: ["Say the break is well earned", "Offer to fetch {his} coffee"],
          playful: [
            "Steal a sip of {his} coffee",
            "Ask if the budget is winning",
          ],
          bold: ["Ask what {he}'s avoiding", "Tell {him} to skip the budget"],
          neutral: ["Sit and drink in quiet", "Sit and let {him} vent"],
        },
      },
      {
        line: "{He} looks up from the desk and isn't the least bit surprised to see you again.",
        approach: "Walk in like a regular",
        greeting: '"Twice now, cutie. You\'re becoming a regular around here."',
        responses: {
          kind: ["Say you like coming by", "Thank {him} for the welcome"],
          playful: ["Ask if you get a punch card", "Ask if regulars get perks"],
          bold: ["Ask if {he} was counting", "Say you'll make it three"],
          neutral: ["Nod and take a seat", "Say you happened to pass by"],
        },
      },
      {
        line: '"Another fire at the circus tent. That\'s three now. I warned them about that fire act every single time."',
        approach: "Ask about the fire act",
        greeting: '"Small fire. I mean that literally, before you ask."',
        responses: {
          kind: ["Offer to help check the tent", "Ask if anyone got hurt"],
          playful: ["Ask if three's a pattern", "Ask if the act is cursed"],
          bold: [
            "Tell {him} to replace the tent",
            "Tell {him} to cancel the act",
          ],
          neutral: ["Let {him} vent about it", "Ask who runs the fire act"],
        },
      },
      {
        line: "{He} notices you've been running errands all morning, and quietly takes the last one off your list before you can grab it.",
        approach: "Let {him} take the last errand",
        greeting:
          '"You handle the chaos here better than half my own house does."',
        responses: {
          kind: ["Thank {him} for noticing", "Say it was no trouble"],
          playful: [
            "Race {him} to the last errand",
            "Ask if that's a favor owed",
          ],
          bold: ["Insist on carrying some", "Take the list back from {him}"],
          neutral: ["Let {him} take it, unbothered", "Hand over the list"],
        },
      },
      {
        line: "\"The students here don't run on a normal clock. Neither do you, I've noticed. Works out.\"",
        approach: "Answer to 'cutie'",
        greeting:
          '"I lost track of the time again. You\'re a bad influence on my schedule, cutie."',
        responses: {
          kind: ["Say the nickname stuck", "Say you like the nickname"],
          playful: ["Answer only to 'cutie' now", "Call {him} a bad influence"],
          bold: ["Ask for a different name", "Tell {him} to say it again"],
          neutral: ["Don't react to the nickname", "Ask what time it is"],
        },
      },
      {
        line: "\"Shion again. I'll go apologize, it's the dorm captain's job. Not the first time this week.\"",
        approach: "Say you'll accompany {him}",
        greeting:
          "\"Shion nods, agrees, and does it again anyway. I've stopped counting how many times I've tried.\"",
        responses: {
          kind: ["Offer to smooth it over too", "Say you'll stand by {him}"],
          playful: [
            "Ask what Shion did this time",
            "Ask if apologies come in bulk",
          ],
          bold: ["Say it's not {his} job", "Say Shion should apologize"],
          neutral: ["Walk with {him} in silence", "Ask where Shion is now"],
        },
      },
      {
        line: "{He}'s mid-sentence about the program lineup when {he} notices you and just... stops rushing.",
        approach: "Point out {he} stopped rushing",
        greeting:
          "\"You're here again. I'm starting to expect it, which is dangerous for my schedule.\"",
        responses: {
          kind: ["Say there's no rush for you", "Say you'll wait for {him}"],
          playful: [
            "Tease {him} for slowing down",
            "Ask if the lineup can wait",
          ],
          bold: ["Ask why {he} stopped for you", "Say you're worth the delay"],
          neutral: ["Let {him} finish at {his} pace", "Ask about the lineup"],
        },
      },
      {
        line: '"Sorry, I was somewhere else for a second there. Nothing serious. Where were we?"',
        approach: "Ask where {his} head went",
        greeting: [
          '"Ask me anything. I promise the honest version is more interesting than the polished one."',
        ],
        responses: {
          kind: ["Say {he} can tell you later", "Say there's no pressure"],
          playful: ["Guess where {his} head went", "Ask if {he} was daydreaming"],
          bold: ["Press {him} for the real answer", "Demand the honest version"],
          neutral: ["Let it go unanswered", "Wait for {him} to continue"],
        },
      },
      {
        line: "{He}'s learned your schedule well enough to know when you're free before you do.",
        approach: "Say you've noticed",
        greeting: '"You notice things around here. Not many people bother."',
        responses: {
          kind: ["Say it means a lot", "Say you're glad {he} does"],
          playful: ["Ask how closely {he} watches", "Ask if there's a spreadsheet"],
          bold: ["Ask why {he} tracks it", "Ask what else {he} noticed"],
          neutral: ["Let the observation stand", "Check your schedule"],
        },
      },
    ]),
    warm: withPronounVariants([
      {
        line: "{He} lights up the moment {he} sees you, whatever {he} was signing forgotten.",
        approach: "Take the saved seat",
        greeting: [
          "\"You're back! I was hoping you'd return.\"",
          '"I saved you the good seat. The one without three weeks of paperwork on it."',
        ],
        responses: {
          kind: ["Sit before {he} can insist", "Say the seat is enough"],
          playful: ["Ask what {he} was signing", "Ask to sign something too"],
          bold: ["Say you noticed {him} light up", "Move the paperwork aside"],
          neutral: ["Take the seat, say nothing", "Sit down, let {him} finish"],
        },
      },
      {
        line: '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        approach: "Ride along at sunset",
        greeting: '"Don\'t argue. The sunset waits for nobody."',
        responses: {
          kind: ["Say the sunset sounds perfect", "Say you'd love the drive"],
          playful: [
            "Demand shotgun, no arguments",
            "Ask who's picking the music",
          ],
          bold: ["Demand it now, not later", "Take the keys from {him}"],
          neutral: ["Ride along in quiet", "Get in, watch the road"],
        },
      },
      {
        line: '"My people march to the beat of their own drum. You\'ve fit right in with that."',
        approach: "Take the compliment in stride",
        greeting:
          "\"The circus troupe listens to everything I say. You're the only one who argues back. I don't mind it.\"",
        responses: {
          kind: ["Say you like fitting in", "Say {his} people suit you"],
          playful: ["Out-charm {him} right back", "Ask to join the troupe"],
          bold: ["Ask what's under the charm", "Argue back, on cue"],
          neutral: ["Let the compliment sit", "Nod at the compliment"],
        },
      },
      {
        line: '"There\'s just not enough hours in the day." {He} says it, then makes an hour for you.',
        approach: "Insist on a break",
        greeting:
          '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
        responses: {
          kind: ["Thank {him} for the hour", "Ask when {he} last stopped"],
          playful: [
            "Confiscate {his} schedule",
            "Hide the proposal from {him}",
          ],
          bold: ["Say the hour's non-negotiable", "Close the folder for {him}"],
          neutral: ["Sit with {him} quietly", "Take the hour offered"],
        },
      },
      {
        line: "\"There's a coffee with your name on it and fifteen minutes I'm refusing to spend on anything else. Sit with me, cutie.\"",
        approach: "Enjoy the coffee break",
        greeting:
          '"Long day? Sit. I\'ll deal with the rest of this later, for once."',
        responses: {
          kind: [
            "Say the fifteen minutes matter",
            "Say {he}'s earned the break",
          ],
          playful: ["Claim the coffee as yours", "Time the fifteen minutes"],
          bold: ["Ask for fifteen more minutes", "Say {he} needs a longer one"],
          neutral: ["Drink the coffee in quiet", "Sit for the fifteen"],
        },
      },
      {
        line: '"Botanical garden duty today. Rui knows the equipment better than Mio does, believe it or not. I just carry things."',
        approach: "Help with garden duty",
        greeting:
          "\"Rui's the expert, not me. Just don't tell Mio I said that.\"",
        responses: {
          kind: ["Offer to carry the heavy stuff", "Say carrying counts too"],
          playful: ["Doubt {he}'s the expert", "Tell Mio immediately"],
          bold: ["Ask what Mio doesn't know", "Take the heavier crate"],
          neutral: [
            "Help without asking questions",
            "Follow Rui's instructions",
          ],
        },
      },
      {
        line: "{He}'s swapped {his} coffee order to match yours without a word about it.",
        approach: "Point out the swapped coffee",
        greeting:
          '"Stay a while. This is the best part of my day, and it isn\'t close."',
        responses: {
          kind: ["Say it's a small kindness", "Say you like it that way"],
          playful: ["Ask when {he} learned it", "Order {his} old one back"],
          bold: ["Call it what it is", "Ask how long that's been true"],
          neutral: ["Drink it, say nothing", "Finish the cup, stay"],
        },
      },
      {
        line: '"Come to the school building with me? I\'ve got the house advisor to see, and the company beats the walk alone."',
        approach: "Go with {him}",
        greeting:
          '"Walk slow. The teachers can wait a minute longer than usual."',
        responses: {
          kind: ["Say the company's easy", "Say you'd rather walk too"],
          playful: [
            "Ask if you're the excuse now",
            "Walk slower than {he} does",
          ],
          bold: ["Say {he} could've just asked", "Ask {him} to ask next time"],
          neutral: ["Walk with {him} in quiet", "Set an unhurried pace"],
        },
      },
      {
        line: "\"You stayed up last night. Don't lie to me, cutie, I can hear it in your voice. I'll make you some honey tea.\"",
        approach: "Accept the honey tea",
        greeting:
          '"Sit down. I\'m making you honey tea whether you ask or not."',
        responses: {
          kind: ["Let {him} make the tea", "Admit you stayed up"],
          playful: ["Deny it, badly", "Ask for two cups"],
          bold: ["Ask how {he} always knows", "Tell {him} to sleep too"],
          neutral: ["Take the tea without a word", "Drink the tea, sit down"],
        },
      },
      {
        line: "{He} saves you the seat next to the one with the least paperwork stacked on it. Small mercy, from {him}.",
        approach: "Work through it",
        greeting:
          '"I looked up from the budget last time and you weren\'t there. I noticed that."',
        responses: {
          kind: ["Say you noticed {him} notice", "Say you'll be here more"],
          playful: ["Ask if the seat's reserved", "Ask for a nameplate on it"],
          bold: ["Ask why {he} was counting", "Clear the stack yourself"],
          neutral: ["Sit and work in quiet", "Start on the top page"],
        },
      },
      {
        line: '"Leadership meeting with Mio again. Between us, I think we take on more than we should."',
        approach: "Ask about the leadership talk",
        greeting: '"That stays between us. Don\'t repeat it."',
        responses: {
          kind: ["Say {he} needn't do it alone", "Say {he} carries a lot"],
          playful: ["Offer to sit in and heckle", "Volunteer as vice-captain"],
          bold: ["Say the load should split", "Name what {he} should drop"],
          neutral: ["Let {him} talk it through", "Keep it between you"],
        },
      },
      {
        line: "The circus troupe listens to {him} without question. You're the only one who gets to argue back, and {he} seems to prefer it that way.",
        approach: "Ask what {he}'s not saying",
        greeting:
          '"You\'re rare, you know. Never needed a thing from me. I still catch myself waiting for it."',
        responses: {
          kind: ["Say arguing keeps {him} honest", "Say arguing is a privilege"],
          playful: ["Argue back on principle", "Disagree for the sport of it"],
          bold: ["Push until {he} answers", "Say {he} can need something"],
          neutral: ["Leave it where it is", "Leave the question open"],
        },
      },
      {
        line: '"I finished the budget early just so I\'d have the afternoon free."',
        approach: "Ask why {he} finished early",
        greeting:
          '"Don\'t look so surprised when I make time for you. I do it on purpose now."',
        responses: {
          kind: [
            "Say the afternoon suits {him}",
            "Say {he} earned the afternoon",
          ],
          playful: ["Guess why {he} rushed it", "Check {his} math for errors"],
          bold: ["Say it out loud for {him}", "Claim the whole afternoon"],
          neutral: ["Let {him} keep the reason", "Take the free hours"],
        },
      },
      {
        line: "{He}'s stopped pretending the jog is just exercise. You're half the reason {he} still gets up for it.",
        approach: "Join {him} on the jog",
        greeting:
          "\"Try to keep up. I'm not going to pretend it's just exercise anymore.\"",
        responses: {
          kind: ["Match {his} pace, say nothing", "Say the jog suits {him}"],
          playful: ["Race {him} the last stretch", "Set an unfair head start"],
          bold: ["Say you know why {he} gets up", "Push the pace yourself"],
          neutral: ["Run beside {him} in quiet", "Keep step to the end"],
        },
      },
      {
        line: '"Gathering research for new costumes. Tedious work, but the result is worth it. Want to see what I\'ve got so far?"',
        approach: "Look at the costume research",
        greeting: "\"Here's what I've found so far. Tell me what you think.\"",
        responses: {
          kind: ["Say the work shows", "Give a real opinion"],
          playful: ["Critique it, badly", "Suggest something outrageous"],
          bold: ["Ask what took so long", "Pick the best one for {him}"],
          neutral: ["Look it over in quiet", "Read through the notes"],
        },
      },
      {
        line: "{He} notices when you've had a long day before you say a word, and quietly clears an hour for you.",
        approach: "Let {him} clear the hour",
        greeting: '"I finished early today. On purpose."',
        responses: {
          kind: ["Say the hour was needed", "Say the hour helps"],
          playful: ["Ask what gave it away", "Ask for two hours next time"],
          bold: ["Ask why {he} keeps doing this", "Tell {him} to rest in it"],
          neutral: [
            "Let {him} clear it, say nothing",
            "Use the hour with {him}",
          ],
        },
      },
      {
        line: '"You\'re rare, you know that? Never once needed anything from me. I still catch myself waiting for it."',
        approach: "Tell {him} {he}'s dependable",
        greeting:
          '"Careful. Say that too often and I might start believing it."',
        responses: {
          kind: ["Say it's mutual", "Say {he} can need things too"],
          playful: ["Threaten to need something", "Ask for something absurd"],
          bold: ["Ask why that surprises {him}", "Say {he}'s allowed to wait"],
          neutral: ["Let the compliment stand", "Let {him} believe it"],
        },
      },
      {
        line: '"Don\'t look so surprised every time I make time for you. I keep doing it on purpose."',
        approach: "Ask why {he} keeps making time",
        greeting: '"Why? Because I want to. That\'s the whole reason."',
        responses: {
          kind: ["Say it registers every time", "Say it doesn't go unnoticed"],
          playful: ["Act surprised anyway", "Look surprised on purpose"],
          bold: ["Ask what {he} wants in return", "Say you'd make time back"],
          neutral: ["Let {him} keep doing it", "Accept it without asking"],
        },
      },
    ]),
    // Expanded 2026-09-17 from 5 flat lines to 27 fully-paired beats, closing
    // the gap against the already-target-sized `approach.spark` (27 labels).
    // All 27 original approach labels, all 5 original temperamentDialogue.spark
    // lines, and all 28 original responses.*.spark labels were placed onto a
    // beat below before anything new was authored — nothing already written
    // was discarded. `approach.spark`, `temperamentDialogue.spark`, and the
    // `spark` key under every `responses` type are now gone: every one of
    // those pools emptied out completely once its content had a home.
    spark: withPronounVariants([
      {
        line: "{He}'s got the car keys out before you've said anything, like your answer was never really in doubt.",
        approach: "Take the passenger seat",
        greeting: "Get in. I already know where we're going.",
        responses: {
          kind: "Buckle in without a word",
          playful: "Make {him} ask properly",
          bold: "Get in the passenger seat",
          neutral: "Let the drive continue",
        },
      },
      {
        line: "{He} catches the look on your face and just watches, waiting to see if you'll say it or swallow it again.",
        approach: "Say what you mean",
        greeting:
          '"That look you give me. Say what you mean by it, cutie. Out loud."',
        responses: {
          kind: "Say what you meant by it",
          playful: "Make {him} guess instead",
          bold: "Say exactly what you mean",
          neutral: "Let the look speak for itself",
        },
      },
      {
        line: "{He}'s got three things due today and a fourth just walked in and {he} can't make {himself} care about the first three.",
        approach: "Let the work wait",
        greeting:
          "Nothing on that desk is going anywhere. You are, eventually. Let's not rush that.",
        responses: {
          kind: "Tell {him} {he} does too much",
          playful: "Tease {him} out of the office",
          bold: "Take the pen out of {his} hand",
          neutral: "Sit and let the work wait",
        },
      },
      {
        line: "{He} holds {his} hand out like it's nothing, like it isn't the first unguarded thing {he}'s done all week.",
        approach: "Take the offered hand",
        greeting: "I'm not letting go until you tell me to. So don't, cutie.",
        responses: {
          kind: "Take the hand {he} offered",
          playful: "Make {him} wait for it",
          bold: "Take {his} hand first",
          neutral: "Take the hand, say nothing",
        },
      },
      {
        line: "The Aqua-line's empty this late. {He} didn't plan that, or so {he} claims.",
        approach: "Ride the Aqua-line with {him}",
        greeting:
          "Just us and the water tonight. I'll take that over an audience any day.",
        responses: {
          kind: "Say you don't mind the quiet",
          playful: "Answer 'cutie' with 'cutie'",
          bold: "Move closer on the seat",
          neutral: "Ride along in silence",
        },
      },
      {
        line: "{He} scans the room the second {he} walks in, and doesn't stop looking until {he} finds you.",
        approach: "Hold {his} gaze",
        greeting:
          '"Every night I look for you first. Every single night. Do with that what you like."',
        responses: {
          kind: "Say you look for {him} too",
          playful: "Ask how long {he}'s done that",
          bold: "Hold {his} gaze, unflinching",
          neutral: "Let {him} find you, say nothing",
        },
      },
      {
        line: "The even, easy voice {he} keeps for everyone else slips. What's under it is only for you.",
        approach: "Ask what's under the charm",
        greeting:
          "You want the version under the charm? Careful what you ask for, cutie.",
        responses: {
          kind: "Say you like what's under it",
          playful: "Ask what {he}'s hiding",
          bold: "Demand the honest version",
          neutral: "Let {him} keep some of it",
        },
      },
      {
        line: "For once {he} doesn't reach for the charm first. {He} just looks tired, and lets you see it.",
        approach: "Let {him} drop the act",
        greeting:
          "No performance tonight. Just tired, and you, and that's apparently enough.",
        responses: {
          kind: "Notice the tired under it",
          playful: "Miss the charm out loud",
          bold: "Say {he} doesn't need the act",
          neutral: "Sit with {him} quietly",
        },
      },
      {
        line: '"That look," {he} says, the schedule forgotten. "Do it again. I want to be sure."',
        approach: "Match the look you're given",
        greeting:
          "There. That's the one. Keep looking at me like that and see what happens.",
        responses: {
          kind: "Give the look back, gently",
          playful: "Ask which version this is",
          bold: "Hold the look, don't look away",
          neutral: "Give it back, unhurried",
        },
      },
      {
        line: "{He} says something under {his} breath, meant for {himself}, and you catch just enough of it to want the rest.",
        approach: "Ask {him} to say it again",
        greeting: "No. You heard it once. That's all you're getting tonight.",
        responses: {
          kind: "Let {him} keep it, this once",
          playful: "Guess at what {he} said",
          bold: "Demand {he} says it again",
          neutral: "Don't push for it",
        },
      },
      {
        line: "{He}'s listing tomorrow's tasks out loud, on autopilot, and stops mid-sentence when you get closer instead of listening.",
        approach: "Step past the schedule",
        greeting: "I lost my place. I'm not going to pretend I mind.",
        responses: {
          kind: "Tell {him} to slow down",
          playful: "Ask what came after 'budget'",
          bold: "Step past it entirely",
          neutral: "Let {him} keep the pace",
        },
      },
      {
        line: "{He} forgets the sentence {he} was building and just looks at you instead.",
        approach: "Let {him} forget the sentence",
        greeting: "I had a whole point. Gone. You do that.",
        responses: {
          kind: "Let the sentence go unfinished",
          playful: "Make {him} lose the thread",
          bold: "Finish the sentence for {him}",
          neutral: "Wait, unbothered, in the quiet",
        },
      },
      {
        line: "{He}'s rescheduled the same meeting twice this week, and it isn't the meeting {he}'s avoiding.",
        approach: "Ask what {he}'s avoiding",
        greeting:
          "Fine. It's you. I've been avoiding how much I look forward to you.",
        responses: {
          kind: "Ask if {he}'s all right",
          playful: "Guess what {he}'s avoiding",
          bold: "Ask {him} straight out",
          neutral: "Let {him} get there alone",
        },
      },
      {
        line: "The easy captain's smile stays perfectly in place, right up until you're the only one left in the room.",
        approach: "Wait for the mask to slip",
        greeting:
          "You're the only one I don't have to hold this up for. It gets heavy, cutie.",
        responses: {
          kind: "Let {him} set the smile down",
          playful: "Tease the slipping mask",
          bold: "Ask what's under the smile",
          neutral: "Watch it slip, say nothing",
        },
      },
      {
        line: "{He} was fitting a costume on you. Somewhere in it {his} hands stopped being a stylist's.",
        approach: "Let the fitting run long",
        greeting:
          "This is taking longer than it should. I'm not in any hurry to fix that.",
        responses: {
          kind: "Let {him} take {his} time",
          playful: "Ask if it's about the costume",
          bold: "Call out the excuse",
          neutral: "Stand still, let it run long",
        },
      },
      {
        line: "{He} says something bold and immediately looks like {he}'s bracing to take it back.",
        approach: "Ask if {he}'s sure",
        greeting: "I'm sure. I don't say things like that by accident.",
        responses: {
          kind: "Say it's fine either way",
          playful: "Make {him} repeat it",
          bold: "Tell {him} you want this",
          neutral: "Let the moment pass",
        },
      },
      {
        line: "{He} offers you the wheel halfway through the drive, like trust is just another thing {he} hands over without ceremony.",
        approach: "Take the wheel with {him}",
        greeting:
          "Don't crash it. It's the only thing here I actually own outright.",
        responses: {
          kind: "Take the wheel carefully",
          playful: "Steal the car keys",
          bold: "Take the wheel like you own it",
          neutral: "Stay in your seat",
        },
      },
      {
        line: "Neither of you says anything for a while, and for once {he} doesn't rush to fill it.",
        approach: "Let the silence do the work",
        greeting:
          "I usually fill the quiet before it gets like this. I didn't want to, with you.",
        responses: {
          kind: "Let the silence stay easy",
          playful: "Break it first, on purpose",
          bold: "Hold the silence and the gaze",
          neutral: "Say nothing, stay close",
        },
      },
      {
        line: "{He} mentioned once that there's a version of {him} with no seam showing. You've never stopped wondering where it is.",
        approach: "Ask about the seam",
        greeting:
          "You keep looking for it. I keep hoping you'll find it before I have to show you.",
        responses: {
          kind: "Say you're not in a rush",
          playful: "Guess where the seam is",
          bold: "Name the version you want",
          neutral: "Let the question go unasked",
        },
      },
      {
        line: "The last of the paperwork's been signed for twenty minutes now. {He} hasn't reached for anything new.",
        approach: "Stay after the schedule ends",
        greeting:
          "\"Stay after everyone's gone home. I'm not done with you, and the budget can wait.\"",
        responses: {
          kind: "Say the work isn't everything",
          playful: "Ask what's keeping {him} then",
          bold: "Say you're not leaving either",
          neutral: "Wait out the quiet",
        },
      },
      {
        line: "{He}'s not being subtle about looking at you tonight, and doesn't seem to care that you've noticed.",
        approach: "Let {him} look {his} fill",
        greeting: "Caught. I wasn't going to apologize for it either.",
        responses: {
          kind: "Let {him} look, unbothered",
          playful: "Dare {him} to keep looking",
          bold: "Meet the look, don't look away",
          neutral: "Let it happen, say nothing",
        },
      },
      {
        line: "There's a foot of space between you that neither of you closed on purpose, and neither of you is closing it by accident either.",
        approach: "Close the space between you",
        greeting:
          "\"Come here. Closer. I've spent all day being reasonable and I'm done with it.\"",
        responses: {
          kind: "Close the distance gently",
          playful: "Make {him} close it first",
          bold: "Close the distance yourself",
          neutral: "Let the distance close itself",
        },
      },
      {
        line: '"I thought I was done feeling like this," {he} admits. "So, what are you going to do about it?"',
        approach: "Ask {him} to mean it",
        greeting: "I meant it. I don't say things like that as a bit, cutie.",
        responses: {
          kind: "Say you feel it too",
          playful: "Ask if {he}'s sure this time",
          bold: "Ask {him} to mean it",
          neutral: "Let the question go unanswered",
        },
      },
      {
        line: "{He}'s holding the pen over the same line for a full minute, not writing anything, just looking at you instead.",
        approach: "Let {him} set the pen down",
        greeting:
          "I wrote the same word four times. I'm blaming you for all four.",
        responses: {
          kind: "Let {him} set it down",
          playful: "Ask what {he}'s writing",
          bold: "Take the pen from {him}",
          neutral: "Wait for {him} to notice",
        },
      },
      {
        line: "Everything that usually keeps {him} upright, the shows, the schedule, the house, goes quiet for a second, and it's just you {he}'s looking at.",
        approach: "Hold the moment steady",
        greeting:
          '"No proposal, no lineup, no one to keep steady but you. I thought I was past feeling like this."',
        responses: {
          kind: "Hold the moment with {him}",
          playful: "Ask what {he}'s thinking",
          bold: "Say you're not going anywhere",
          neutral: "Let the moment hold, quietly",
        },
      },
      {
        line: "{He} said once, offhand, that {he} thought {he} was past feeling like this. {He} hasn't brought it up again, but {he} hasn't looked away either.",
        approach: "Ask what {he}'s done about it",
        greeting: "Nothing yet. I'm still deciding if I'm allowed to.",
        responses: {
          kind: "Tell {him} {he}'s allowed to",
          playful: "Push {him} to just say it",
          bold: "Ask {him} outright",
          neutral: "Let {him} take {his} time",
        },
      },
      {
        line: "The charisma {he} wears for the house, for the school, for everyone, thins out the longer you two are alone.",
        approach: "Let the charm drop for you",
        greeting:
          "It's a lot of work, being charming at everyone. You're the only one I don't have to be it for.",
        responses: {
          kind: "Say you never needed the charm",
          playful: "Miss the charm, teasingly",
          bold: "Say you noticed the seam",
          neutral: "Let it drop, unbothered",
        },
      },
    ]),
    close: withPronounVariants([
      {
        line: "For you {he}'d put down the proposal, the schedule, all of it, and just be a person for an hour.",
        approach: "Free them from the work",
        greeting:
          '"Ask me to stop working and I will. That\'s how much you have."',
        responses: {
          kind: [
            "Tell {him} to share the burden",
            "Say {he} needn't manage alone",
          ],
          playful: "Drag {him} from the desk",
          bold: "Tell {him} it runs itself",
          neutral: [
            "Sit through {his} to-do list",
            "Keep {him} company at the desk",
          ],
        },
      },
      {
        line: "The work is finally done for the night. {He} doesn't reach for more. {He} stays.",
        approach: "Go to them",
        greeting:
          "\"Sit with me a while after the work's put away. It's my favorite part of the day now.\"",
        responses: {
          kind: "Let {him} stay without arguing",
          playful: "Tease {him} for staying anyway",
          bold: "Say {he}'s allowed to stay",
          neutral: "Stay after the others leave",
        },
      },
      {
        line: "{He}'s stopped asking which version of {him} you prefer. You never did have a favorite.",
        approach: "Say it can be handed off",
        greeting:
          "\"Every version of me is yours. That's not a line. I've checked.\"",
        responses: {
          kind: "Say every version is enough",
          playful: "Out-charm {him} for once",
          bold: "Say you never had a favorite",
          neutral: "Let {him} pick, say nothing",
        },
      },
      {
        line: '"No audience tonight," {he} says softly. "Just you. That\'s better anyway."',
        approach: "Stay past the sunset",
        greeting: '"With you, I don\'t need to perform. I can just be myself."',
        responses: {
          kind: "Let the quiet be enough",
          playful: ["Ask if you're the whole show", "Demand the scenic route"],
          bold: "Hold {his} hand openly",
          neutral: "Stay quiet, let it be enough",
        },
      },
      {
        line: "{He} lets the day end without you having to talk {him} into it.",
        approach: "Free them from the work",
        greeting:
          '"You looked at me tired and unglamorous and stayed anyway. Nobody else does that."',
        responses: {
          kind: "See the tired under the charm",
          playful: "Call it a soft ending",
          bold: ["Call out the easy ending", "Say the work can wait for you"],
          neutral: "Let the day end quietly",
        },
      },
    ]),
    bound: withPronounVariants([
      {
        line: "Nothing is scheduled, nothing is owed. For once {he} is entirely off the clock, and stays there.",
        approach: "Leave the work till morning",
        greeting: '"Stay till the theater\'s cold. Then stay longer."',
        responses: {
          kind: "Tell {him} {he} can rest now",
          playful: [
            "Keep {him} away from it",
            "Make {him} leave the work",
            "Take the wheel",
          ],
          bold: ["Claim the whole night", "Drive off with {him}"],
          neutral: [
            "Leave the docket till morning",
            "Watch the sunset in quiet",
          ],
        },
      },
      {
        line: "{He} takes the paint off and lets you see the tired underneath, and doesn't put it back.",
        approach: "Come to bed",
        greeting:
          '"Nobody else gets to see this. ...Stay till I fall asleep? That\'s all I want."',
        responses: {
          kind: "Let {him} be unguarded",
          playful: "Tease the tired underneath",
          bold: "Take {him} to bed",
          neutral: "Stay quiet beside {him}",
        },
      },
      {
        line: '"No audience," {he} murmurs against your neck. "Only you. Only ever you."',
        approach: "Say it back",
        greeting: '"I love you. Every version of me does. I\'ve polled them."',
        responses: {
          kind: ["Mean every word of it", "Say it back"],
          playful: "Ask which version said it",
          bold: "Say it first",
          neutral: "Hold the silence with {him}",
        },
      },
      {
        line: "{He} isn't managing anyone or performing anything, which is the most extraordinary thing {he}'s done.",
        approach: "Turn out the lights",
        greeting: [
          '"Come to bed. The lights are down and I\'m all out of brilliance."',
          '"Undress me. No, slowly. I\'m a performer, I have standards."',
        ],
        responses: {
          kind: "Set the pen down for {him}",
          playful: "Applaud like it's a show",
          bold: "Name what this really is",
          neutral: "Let the quiet stretch out",
        },
      },
      {
        line: "{He} falls asleep first for once, and doesn't apologize for it.",
        approach: "Come to bed",
        greeting:
          '"...Sorry. I was going to say something clever first. Stay anyway."',
        responses: {
          kind: "Let {him} finally rest",
          playful: "Tease {him} for falling asleep",
          bold: "Watch {his} guard come down",
          neutral: "Say nothing",
        },
      },
    ]),
  },
  // No temperamentDialogue or responses pools left — every tier is fully
  // paired, so every `dialogue[tier]` beat above carries its own `approach`,
  // `greeting`, and `responses` (docs/dialogue-approach-pairing.md). The last leftovers were migrated
  // 2026-09-18: each remaining temperamentDialogue line was moved onto the
  // beat it answers best (trimmed where it only restated that beat's own
  // `line`), and each remaining close/bound `responses` label went onto a
  // beat as an extra option. `temperamentDialogue.new`'s two lines were
  // verbatim copies of dialogue.new[3] and [1] (the beats' own `line`s), so
  // they weren't placed as greetings; the second one's tail seeded
  // dialogue.new[4]'s greeting instead.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"A new face." **{name}** looks up from the budget for {user} and doesn\'t look back down.',
      "{user} says the name, and **{name}** turns the charisma on like a stage light.",
      '"Come on over, cutie." **{name}** greets {user} as though their schedule weren\'t already full.',
    ],
    warm: [
      '"You\'re back!" **{name}** forgets whatever he was signing. {user} did that.',
      "{user} calls out, and **{name}** folds the schedule away mid-revision.",
      "\"I'm heading out for a drive later. Want to come along, cutie?\" **{name}** asks {user} like the seat's already saved.",
    ],
    spark: [
      "**{name}** hears his name, and the professional smile becomes a real one for {user}.",
      '"Proposal, schedule, budget... and yet here I am." **{name}** is walking over to {user} regardless.',
      "{user} got there first, and **{name}** looks caught.",
    ],
    close: [
      "**{name}** drops the stage presence for {user}, right there in the middle of everyone.",
      '"The rest can wait till tomorrow. You\'re with me." **{name}** says it to {user}, quietly firm.',
      "{user} calls, and **{name}** clocks out.",
    ],
    bound: [
      '"No audience," **{name}** murmurs, reaching {user}. "Only you."',
      "**{name}** hands the **{house}** program to Mio without explaining. {user} called.",
      "{user} says the name, and every version of **{name}** answers to it.",
    ],
  },
};
