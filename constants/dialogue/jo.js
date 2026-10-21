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
        "**{firstName}**: Is this an odd hour? I've stopped being able to tell.",
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
        "I adapt. It's what I do. I read a room and I become the version of me that room needs, and I've been doing it so long I couldn't tell you where the seam is anymore. On stage, in the hall, with Shion, with the advisors. Different man...and woman, every time and all of them mine.\n\nYou come to me with {favResponse} no matter which one you're getting. Same every time. And it's started to feel like being addressed by name in a room where everyone else is calling me by a job.",
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
        "You know I jog every morning. I've told you to try it more than once. It's the only hour of the day nobody needs anything from me.",
        "Ever since we met in {sinceMet}, a good chunk of that hour has gone to thinking about you, which is terrible for my pace. So I figured I'd just bring you along.\n\nCall it training. I want an hour that isn't a job, or a mission, and doesn't end with either of us owing the other one a report.",
      ],
      choice: {
        prompt: "Well? I already set two alarms, cutie. Say you'll join me.",
        options: [
          {
            key: "kind",
            label: "Say you'll be there",
            style: 3,
            close:
              "Good.\n\n...I wasn't going to admit to the two alarms, but there it is. I've already planned the route for two. I'll keep the pace easy.",
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
            label: "Say he should've asked sooner",
            style: 4,
            close:
              "You're right. I sat on it for a week deciding whether saying it out loud would ruin the whole exercise.\n\nThat's a week of mornings I ran alone for nothing. I won't make that mistake twice. And sleep early tonight. That one isn't a request.",
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
        "Also, if I'm honest...\n\nI've thought about {lastMoment} more than I've thought about the show this week. That's not a complaint. It's why I want this hour: nobody needing anything from me except you, standing still while I take my time with you. I don't intend to share a single minute of it.",
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
            label: "Ask for the whole afternoon",
            style: 4,
            close:
              "The whole afternoon.\n\n...Done. Mio can have the leadership meeting to himself, and neither of us has to pretend it's about the costume. Don't be late.",
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
        "**{firstName}**: Remember the green silk? When I fitted you for it, I took one measurement that had nothing to do with the costume.",
        "Somewhere between the morning jogs together and that afternoon in my office, you stopped being someone I fit into my schedule, and I started wanting to clear whole days just to spend them with you. You're the only person I stop checking the time with, cutie.",
        "I'm done keeping you to the hours nobody's watching. I want {house} to know about us, and if anyone asks, I'll tell them myself.",
      ],
      choice: {
        prompt:
          "Are you free tonight? I'd like to come see you.\n\nIf you'd like me to stay, you only have to ask.",
        options: [
          {
            key: "kind",
            label: "Ask him to stay the night",
            style: 3,
            close:
              "Heh. I was hoping you'd ask.\n\nI'm on my way. And I'm skipping the morning jog tomorrow. You can be the reason.",
          },
          {
            key: "playful",
            label: "Ask who he'll tell first",
            style: 1,
            close:
              "Whoever asks first. Knowing this house, that's everyone by breakfast.\n\nI'm heading over right away.",
          },
          {
            key: "bold",
            label: "Say you're his",
            style: 4,
            close:
              "...I'm already out the door. Say it again when I'm there. I'd like to hear it all night.",
          },
        ],
      },
      keepsake: {
        emoji: "💍",
        line: "A ring sized at a fitting he said was for the costume.",
      },
    },

    soulbound: {
      beats: [
        "**{firstName}**: No nickname tonight. I'd like you to notice that.",
        "It's past one. The house is finally asleep, the budget balances, and there's nothing left on my desk to hide behind.\n\nI used to like this hour. Work done, a jog, a set before bed, lights out, nobody needing anything. I was used to quiet nights. I told myself they were the reward.",
        "{timesMet} times with you, and I can't stand them anymore. I made hot milk for two again tonight, out of habit, and drank both. The other side of the bed has started to feel like a room I keep walking past.\n\nI lie here thinking about your hand with my ring on it, and how long I'd keep you if you were here. The answer keeps getting longer. That isn't something a captain should put in writing. I'm putting it in writing.",
        "So, plainly: I love you.\n\nNot the captain, not the Venus of Dionysia, not whichever version the room ordered. The man at one in the morning who's finished every task on the list and still can't sleep, because you're not in it.\n\nI want the quiet nights with you in them. All of them. Take this at whatever speed you like. I've made enough decisions for other people. This one's yours.",
      ],
      choice: {
        prompt:
          "I thought I was done with feelings like this. So then. How are you going to take responsibility?",
        options: [
          {
            key: "answered",
            label: "Say it back",
            style: 3,
            close:
              "...Say it again. Slower.\n\nI'm coming to get you. Nobody crosses campus alone at this hour, not even to get to me. Grab a coat, and don't bother bringing a reason to leave early.\n\nThe milk can go cold. I've been careful with you for a year. I don't intend to be careful tonight.",
          },
          {
            key: "held",
            label: "Ask him to give you time",
            style: 2,
            close:
              "Of course. Take it.\n\nJust don't manage me about it. If it's no, say no. I've had a lifetime of people handling me gently, and I'd rather have one person who doesn't.\n\nI'll still pour the second cup. That isn't pressure. It's just where I am at one in the morning now.",
          },
        ],
      },
      keepsake: {
        emoji: "🥛",
        line: "The second cup of hot milk, poured for her out of habit.",
      },
    },
  },
  dialogue: {
    new: withPronounVariants([
      {
        line: "{He}'s buried in paperwork: proposals, schedules, a budget that won't balance. {He} looks up anyway.",
        approach: "Ask for a minute of {his} time",
        greeting: '"A new face! Come on in, cutie. What\'s your name?"',
        responses: {
          kind: ["Give your name, keep it short", "Offer to help with it"],
          playful: [
            "Tease {him} about the papers",
            "Give your name with a bow",
          ],
          bold: [
            "Ask {him} to work less for you",
            "Ask {him} to put the pen down",
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
          kind: ["Say you'll keep it quick", "Ask what's on {his} plate"],
          playful: [
            "Call {him} 'cutie' right back",
            "Ask if that goes for everyone",
          ],
          bold: ["Say that goes for {him} too", "Push straight to the point"],
          neutral: ["Let {him} decide the pace", "Wait for {him} to lead"],
        },
      },
      {
        line: "The charisma lands before {he}'s said a word. Running Dionysia hasn't dulled it.",
        approach: "Cut through the charisma",
        greeting:
          '"Pull up a chair. I\'ve got a budget to fight with, but I can talk and lose at the same time."',
        responses: {
          kind: ["Offer a second pair of eyes", "Ask if {he}'s eaten today"],
          playful: ["Match the easy charm", "Call out the charm offensive"],
          bold: ["Meet the charisma head-on", "Say to let the budget lose"],
          neutral: ["Simply be present", "Let the charm pass by"],
        },
      },
      {
        line: '"You look pretty busy. I\'ll get some work done. Holler if you need anything."',
        approach: "Wave {him} over",
        greeting:
          "\"Give me a second to put this down, and then you've got my full attention. What's going on?\"",
        responses: {
          kind: ["Ask how {his} day's going", "Say you came to see {him}"],
          playful: ["Steal {his} coffee order", "Say you're the emergency"],
          bold: ["Say {he} needs a break more", "Make {him} take a real break"],
          neutral: ["Let the schedule wait", "Wait quietly nearby"],
        },
      },
      {
        line: "{He} glances up mid-signature, and somehow the whole room feels less busy for it.",
        approach: "Pull up a chair",
        greeting:
          '"Sit, sit. Whatever this is, it can wait until you\'ve said your piece."',
        responses: {
          kind: ["Say you won't take long", "Ask how long {he}'s been at it"],
          playful: [
            "Tease {him} about signing",
            "Ask what {he}'s signing away",
          ],
          bold: [
            "Say your piece straight out",
            "Take {his} attention outright",
          ],
          neutral: ["Watch {him} work in quiet", "Sit without a word"],
        },
      },
    ]),
    known: withPronounVariants([
      {
        line: '"You came back." {He} sets down the pen like {he}\'d been looking for an excuse.',
        approach: "Interrupt the paperwork",
        greeting: '"Sit anywhere. I was getting bored in here without you."',
        responses: {
          kind: ["Say you'll keep {him} company", "Ask if {he}'s had a break"],
          playful: ["Say you rescued {him}", "Ask if you beat the budget"],
          bold: ["Ask if {he} waited for you", "Tell {him} the pen stays down"],
          neutral: ["Take the offered seat", "Sit and let {him} finish"],
        },
      },
      {
        line: '"I put out snacks for the dorm students after practice. Take some before Shion finds the tray, there\'s plenty."',
        approach: "Take something from the tray",
        greeting:
          '"Eat, don\'t be polite about it. The tray exists to be emptied."',
        responses: {
          kind: ["Save {him} the last one", "Say the dorm's lucky"],
          playful: ["Take two, for later", "Hide a share from Shion"],
          bold: ["Ask who feeds the captain", "Take the tray over to {him}"],
          neutral: ["Take one and say nothing", "Eat while {he} works"],
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
          kind: ["Take the last errand", "Ask what else is on {his} list"],
          playful: ["Offer to impersonate Elias", "Promise a search party"],
          bold: [
            "Say you'll bring Elias back",
            "Tell {him} to sit, you've got it",
          ],
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
          bold: [
            "Say the budget can lose today",
            "Tell {him} to skip the budget",
          ],
          neutral: ["Sit and drink in quiet", "Sit and let {him} vent"],
        },
      },
      {
        line: "{He} looks up from the desk and isn't the least bit surprised to see you again.",
        approach: "Walk in like a regular",
        greeting: '"Twice now, cutie. You\'re becoming a regular around here."',
        responses: {
          kind: ["Say you like coming by", "Say you come to check on {him}"],
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
            "Say you'll take the next check",
            "Say {he} can't watch every act",
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
          kind: [
            "Say you'll split it with {him}",
            "Ask what's left on {his} list",
          ],
          playful: [
            "Race {him} to the last errand",
            "Ask if that's a favor owed",
          ],
          bold: ["Insist on carrying some", "Say you'll return the favor"],
          neutral: ["Let {him} take this one", "Hand over the list"],
        },
      },
      {
        line: "\"The students here don't run on a normal clock. Neither do you, I've noticed. Works out.\"",
        approach: "Answer to 'cutie'",
        greeting:
          '"I lost track of the time again. You\'re a bad influence on my schedule, cutie."',
        responses: {
          kind: ["Ask if {he}'s eaten yet", "Say you like the nickname"],
          playful: ["Answer only to 'cutie' now", "Call {him} a bad influence"],
          bold: ["Say {his} schedule can cope", "Tell {him} to say it again"],
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
          bold: ["Say it's not {his} job", "Say you'll do the talking"],
          neutral: ["Walk with {him} in silence", "Ask where Shion is now"],
        },
      },
      {
        line: "{He}'s mid-sentence about the program lineup when {he} notices you and just... stops rushing.",
        approach: "Point out {he} stopped rushing",
        greeting:
          "\"You're here again. I'm starting to expect it, which is dangerous for my schedule.\"",
        responses: {
          kind: [
            "Say the slower pace suits {him}",
            "Say {he} looks better for it",
          ],
          playful: [
            "Tease {him} for slowing down",
            "Ask if the lineup can wait",
          ],
          bold: [
            "Say {he} should stop more often",
            "Say you're worth the delay",
          ],
          neutral: ["Let {him} finish at {his} pace", "Ask about the lineup"],
        },
      },
      {
        line: '"Sorry, I was somewhere else for a second there. Nothing serious. Where were we?"',
        approach: "Ask where {his} head went",
        greeting:
          '"Nothing serious, I promise. Where were we before my head wandered off?"',
        responses: {
          kind: ["Say {he} can tell you later", "Say there's no pressure"],
          playful: [
            "Guess where {his} head went",
            "Ask if {he} was daydreaming",
          ],
          bold: ["Tell {him} to sit a minute", "Stay till {he}'s back"],
          neutral: ["Let it go unanswered", "Wait for {him} to continue"],
        },
      },
      {
        line: "\"You turn up around this hour most days. I've started leaving the door open around now, that's all.\"",
        approach: "Ask if the door's for you",
        greeting:
          "\"It's open for anyone. It's just usually you who walks through it.\"",
        responses: {
          kind: ["Say you'll keep turning up", "Say you look forward to it"],
          playful: ["Test it tomorrow, early", "Ask about opening hours"],
          bold: ["Ask who else walks through", "Say the door's for you then"],
          neutral: ["Take the open door as is", "Step through without asking"],
        },
      },
    ]),
    warm: withPronounVariants([
      {
        line: "{He} lights up the moment {he} sees you, whatever {he} was signing forgotten.",
        approach: "Ask if the paperwork can wait",
        greeting: [
          '"Honestly? It waited two weeks for me. It can wait an hour for you."',
        ],
        responses: {
          kind: [
            "Ask if {he}'s slept this week",
            "Say the hour's for {him} too",
          ],
          playful: [
            "Ask what {he} was signing",
            "Offer to forge {his} signature",
          ],
          bold: [
            "Say you noticed {him} light up",
            "Take the pen out of {his} hand",
          ],
          neutral: ["Wait for {him} to finish", "Let the paperwork wait"],
        },
      },
      {
        line: '"I\'m driving the Aqua-line later to catch the sunset. Come with, cutie."',
        approach: "Ask when {he}'s leaving",
        greeting:
          '"Six, then. Windows down, and whatever today was stays outside the car."',
        responses: {
          kind: ["Say the sunset sounds perfect", "Say you'd love the drive"],
          playful: ["Ask for the long way home", "Ask who's picking the music"],
          bold: ["Say you'll hold {him} to six", "Ask to stay out past sunset"],
          neutral: ["Ride along in quiet", "Get in, watch the road"],
        },
      },
      {
        line: '"The troupe has adopted you, by the way. Usually I have to translate my people for outsiders. With you they didn\'t need me to."',
        approach: "Ask what they said about you",
        greeting:
          '"Good things, mostly. The only complaint on record is that you don\'t come by often enough."',
        responses: {
          kind: ["Say you like them too", "Promise to come by more"],
          playful: ["Ask who complained exactly", "Ask for the bad ones too"],
          bold: ["Ask what {he} said about you", "Say you come by for {him}"],
          neutral: ["Take the news quietly", "Let the compliment sit"],
        },
      },
      {
        line: '"There\'s just not enough hours in the day." {He} says it, then makes an hour for you.',
        approach: "Insist on a break",
        greeting:
          '"Proposal, schedule, program, budget... and yet here I am, making time for you."',
        responses: {
          kind: ["Say {he} should take two", "Ask when {he} last stopped"],
          playful: [
            "Ask if you're on the agenda",
            "Ask if the budget gets jealous",
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
        line: "\"I'm heading to the botanical garden. Rui's been advising me on maintenance for my artifact. He knows it better than Mio does, believe it or not.\"",
        // A candid mood, letting the Mio secret slip: leaning in and asking
        // lands better than looking after him.
        mood: true,
        approach: "Walk to the garden with {him}",
        greeting:
          "\"Company's welcome. Just don't tell Mio I said Rui's the expert.\"",
        responses: {
          kind: [
            "Ask how {his} gear is holding",
            "Say you'll keep {him} company",
          ],
          playful: [
            "Ask if Rui's the favorite now",
            "Promise Mio won't hear it",
          ],
          bold: ["Stay for the whole tune-up", "Ask Rui to teach you too"],
          neutral: ["Watch Rui walk {him} through it", "Stay out of the way"],
        },
      },
      {
        line: "{He}'s swapped {his} coffee order to match yours without a word about it.",
        approach: "Point out the swapped coffee",
        greeting: [
          '"You noticed. I did wonder how long that would take, cutie."',
        ],
        responses: {
          kind: ["Say you noticed weeks ago", "Say it suits {him} better"],
          playful: ["Ask what else {he} copied", "Threaten to change orders"],
          bold: [
            "Say you'll order {his} next",
            "Say it was never about coffee",
          ],
          neutral: ["Let the admission stand", "Drink it, say nothing"],
        },
      },
      {
        line: '"Come to the school building with me? I\'ve got the teachers to see, and the company beats the walk alone."',
        // He's in a light, unhurried mood: claiming more of his time lands
        // better than checking on him.
        mood: true,
        approach: "Go with {him}",
        greeting:
          '"Walk slow. Whatever they want from me will keep for another ten minutes."',
        responses: {
          kind: ["Ask how {he}'s holding up", "Ask what they want from {him}"],
          playful: [
            "Ask if you're the excuse now",
            "Walk slower than {he} does",
          ],
          bold: [
            "Say you'll walk {him} back after",
            "Say ten minutes isn't enough",
          ],
          neutral: ["Walk with {him} in quiet", "Set an unhurried pace"],
        },
      },
      {
        line: "\"You stayed up last night. Don't lie to me, cutie, I can hear it in your voice. I'll make you some honey tea.\"",
        approach: "Accept the honey tea",
        greeting:
          "\"Let me look after you for a bit. It's the easiest thing I'll do all day.\"",
        responses: {
          kind: ["Let {him} make the tea", "Admit you stayed up"],
          playful: ["Deny it, badly", "Ask for two cups"],
          bold: ["Say you'll drink it with {him}", "Tell {him} to sleep too"],
          neutral: ["Take the tea without a word", "Drink the tea, sit down"],
        },
      },
      {
        line: "\"You've never been inside the Heebie-Jeebie House, have you? I gave up on that place the day Shion claimed it. Come see what he's done to it.\"",
        approach: "Go take a look",
        greeting:
          '"Don\'t touch anything. I tell everyone that, and nobody listens, myself included."',
        responses: {
          kind: ["Say it has character", "Say Shion seems happy here"],
          playful: ["Touch something anyway", "Ask what that noise was"],
          bold: ["Ask why {he} gave up on it", "Go in ahead of {him}"],
          neutral: ["Look without touching", "Follow {him} inside"],
        },
      },
      {
        line: '"Leadership meeting with Mio again. Between us, I think we take on more than we should."',
        approach: "Ask about the leadership talk",
        greeting:
          "\"It's faster if the two of us just handle it. That's the excuse I keep using, anyway.\"",
        responses: {
          kind: ["Say {he} needn't do it alone", "Say {he} carries a lot"],
          playful: ["Offer to sit in and heckle", "Volunteer as vice-captain"],
          bold: ["Say the load should split", "Name what {he} should drop"],
          neutral: ["Let {him} talk it through", "Keep it between you"],
        },
      },
      {
        line: '"Where are you off to at this hour? ...No. Whatever it is keeps until tomorrow. I\'m walking you back."',
        approach: "Let {him} walk you back",
        greeting:
          '"I\'d rather lose the sleep than spend the night wondering about it."',
        responses: {
          kind: ["Say {he} should be asleep too", "Say you're glad {he} came"],
          playful: ["Walk slower on purpose", "Ask if this is a service now"],
          bold: ["Ask who walks {him} back", "Say you'll walk {him} back too"],
          neutral: ["Walk back beside {him}", "Let the errand wait"],
        },
      },
      {
        line: '"I finished the budget early just so I\'d have the afternoon free."',
        approach: "Ask why {he} finished early",
        greeting:
          "\"Don't look so surprised when I make time for you. It's the one appointment I never move.\"",
        responses: {
          kind: ["Say you'll be there for it", "Say {he} earned the afternoon"],
          playful: [
            "Ask to be penciled in weekly",
            "Ask what the slot is called",
          ],
          bold: ["Say the whole day's next", "Say you'll hold {him} to it"],
          neutral: ["Let {him} keep the reason", "Take the afternoon offered"],
        },
      },
      {
        line: '"I jog every morning before the house is awake. It clears my head, and the work goes faster after. I\'d recommend it to you."',
        approach: "Ask what it does for {him}",
        greeting:
          '"Half an hour with nobody needing anything. It\'s the clearest thinking I get all day."',
        responses: {
          kind: ["Say you'll give it a try", "Say it clearly works for {him}"],
          playful: ["Doubt you'd survive it", "Ask how early is too early"],
          bold: ["Say the house can wait", "Say {he} needs more than that"],
          neutral: ["Say you'll consider it", "Take the advice, say nothing"],
        },
      },
      {
        line: '"Gathering research for new costumes. Tedious work, but the result is worth it. Want to see what I\'ve got so far?"',
        approach: "Look at the costume research",
        greeting: "\"Here's what I've found so far. Tell me what you think.\"",
        responses: {
          kind: ["Say the work shows", "Give a real opinion"],
          playful: [
            "Ask to model one yourself",
            "Suggest something outrageous",
          ],
          bold: ["Say which one you'd cut", "Pick the best one for {him}"],
          neutral: ["Look it over in quiet", "Read through the notes"],
        },
      },
      {
        line: "\"Bread's still warm. I bake for the house before anyone's up, and today the first slice is yours.\"",
        approach: "Take the first slice",
        greeting:
          "\"Don't tell the others. There's a queue for that loaf and you just skipped it.\"",
        responses: {
          kind: ["Save {him} half the slice", "Ask if {he} ate any yet"],
          playful: ["Ask for the second slice", "Promise not to tell"],
          bold: ["Ask who usually gets first", "Ask when {he} sleeps at all"],
          neutral: ["Eat it where you stand", "Take it without a word"],
        },
      },
      {
        line: '"Everyone in this house needs something from me by noon. You just turn up. I\'ve started counting on that more than I should."',
        // He's half-admitting he leans on you: pressing him to lean more
        // lands better than reassurance.
        mood: true,
        approach: "Tell {him} {he}'s dependable",
        greeting:
          '"Careful. Say that too often and I might start believing it."',
        responses: {
          kind: ["Say it's mutual", "Ask what {he} needs today"],
          playful: ["Turn up with snacks instead", "Ask for something absurd"],
          bold: ["Say {he} can count on it", "Say {he} can rely on you more"],
          neutral: ["Let the compliment stand", "Let {him} believe it"],
        },
      },
      {
        line: "\"That's the third person this week who's come to me about trouble in someone else's house. Somehow it's always my door.\"",
        approach: "Ask why it's always {him}",
        greeting:
          '"Nobody appointed me to it. I answered once, and the campus took notes."',
        responses: {
          kind: ["Say they're lucky it's {him}", "Ask if {he} ever says no"],
          playful: ["Knock and ask for advice", "Take a number and queue up"],
          bold: ["Ask who {he} goes to", "Tell {him} to say no once"],
          neutral: ["Let {him} get back to it", "Stay out of the queue"],
        },
      },
    ]),
    spark: withPronounVariants([
      {
        line: "{He}'s got the car keys out before you've said anything, like your answer was never really in doubt.",
        approach: "Take the passenger seat",
        greeting: "Good. Where we're going is a surprise, cutie.",
        responses: {
          kind: ["Buckle in without a word", "Say you trust {his} pick"],
          playful: ["Make {him} ask properly", "Guess the destination"],
          bold: ["Say you were going to ask", "Say you cleared your evening"],
          neutral: ["Let the drive continue", "Watch the road go by"],
        },
      },
      {
        line: "{He} catches the look on your face and just watches, waiting to see if you'll say it or swallow it again.",
        // He's asking to be told outright: a flirty answer lands better than
        // a gentle one.
        mood: true,
        approach: "Meet {his} eyes",
        greeting: '"That look you give me. Say what you mean by it, cutie."',
        responses: {
          kind: ["Say you like looking at {him}", "Say it means you're happy"],
          playful: ["Ask what look {he} means", "Say {he} has to guess"],
          bold: ["Say it means come closer", "Say you'd rather show {him}"],
          neutral: ["Let the look speak for itself", "Let {him} read it"],
        },
      },
      {
        line: "{He}'s got three things due today, and since you walked in {he} can't make {himself} care about any of them.",
        approach: "Let the work wait",
        greeting:
          "Nothing on that desk is going anywhere. You are, eventually. Let's not rush that.",
        responses: {
          kind: ["Say you're in no rush either", "Say you'll stay a while"],
          playful: [
            "Tease {him} out of the office",
            "Ask which one is due first",
          ],
          bold: [
            "Take the pen out of {his} hand",
            "Say the desk can wait all day",
          ],
          neutral: ["Sit and let the work wait", "Let the hour run on"],
        },
      },
      {
        line: "Walking back from rehearsal, {his} hand drifts toward yours. {He} catches it halfway and lowers it again, like nothing happened.",
        // He reached and lost his nerve: taking his hand for him lands better
        // than letting him off gently.
        mood: true,
        approach: "Notice the hand",
        greeting:
          "You saw that. I lost my nerve halfway. Not my finest moment, cutie.",
        responses: {
          kind: ["Say you'd have let {him}", "Say you didn't mind at all"],
          playful: ["Ask where the nerve went", "Ask if it'll try again"],
          bold: ["Grab {his} hand yourself", "Reach for {his} hand first"],
          neutral: ["Keep walking with {him}", "Let {him} try again later"],
        },
      },
      {
        line: "The Aqua-line's empty this late. {He} didn't plan the drive for that, or so {he} claims.",
        approach: "Ride along on the Aqua-line",
        greeting:
          "Just us and the road tonight. I'll take that over an audience any day.",
        responses: {
          kind: ["Say you prefer it this way", "Say you'd pick this too"],
          playful: ["Ask if {he} planned it", "Ask if {he} booked the road"],
          bold: ["Say you'd ride all night", "Ask {him} to skip the exit"],
          neutral: ["Ride along in silence", "Watch the lights go past"],
        },
      },
      {
        line: "{He} scans the room the second {he} walks in, and doesn't stop looking until {he} finds you.",
        // He's openly glad to find you: keeping your eyes on him lands better
        // than a soft answer.
        mood: true,
        approach: "Catch {his} eye",
        greeting:
          "\"There you are. You're always the first person I look for. It's a habit by now, cutie.\"",
        responses: {
          kind: ["Say you'd hoped {he}'d come", "Say you look for {him} too"],
          playful: [
            "Ask who {he} looks for second",
            "Ask how long {he}'s done that",
          ],
          bold: ["Keep your eyes on {him}", "Hold {his} gaze across the room"],
          neutral: ["Let {him} come to you", "Wave from where you are"],
        },
      },
      {
        line: "The even, easy voice {he} keeps for everyone else slips. What's under it is only for you.",
        approach: "Ask what's under the charm",
        greeting:
          "You want the version under the charm? Careful what you ask for, cutie.",
        responses: {
          kind: [
            "Say you like what's under it",
            "Say you'll be careful with it",
          ],
          playful: ["Ask what {he}'s hiding", "Ask if it bites"],
          bold: ["Say you can take it", "Ask for all of it"],
          neutral: ["Let {him} keep some of it", "Listen without pushing"],
        },
      },
      {
        line: "For once {he} doesn't reach for the charm first. {He} just looks tired, and lets you see it.",
        approach: "Let {him} drop the act",
        greeting:
          "Sorry, I'm out of charm tonight. Can I just be tired with you for a bit?",
        responses: {
          kind: ["Say {he} never has to ask", "Say yes, as long as {he} likes"],
          playful: ["Miss the charm out loud", "Offer to be charming for two"],
          bold: [
            "Say {he} doesn't need the act",
            "Say you're keeping {him} here",
          ],
          neutral: ["Stay with {him} a while", "Let the evening stay slow"],
        },
      },
      {
        line: "{He}'s doing {his} stage makeup before the show, and catches you watching in the mirror.",
        // He's in performer mode and invites the audience: telling him he
        // looks stunning lands better than helping.
        mood: true,
        approach: "Hand {him} the next brush",
        greeting:
          "Thank you. You can keep watching, cutie. I don't mind, as long as it's you.",
        responses: {
          kind: ["Offer to do the last touches", "Hold the mirror steady"],
          playful: ["Ask to try the eyeliner", "Ask for a matching look"],
          bold: ["Say {he} looks stunning", "Say you'll be front row"],
          neutral: ["Watch {him} finish", "Wait by the mirror"],
        },
      },
      {
        line: 'You\'re back after a few days away, and {he} says it under {his} breath, mostly to {himself}: "...Missed you."',
        approach: "Ask {him} to say it again",
        greeting: "Once was already more than I meant to say, cutie.",
        responses: {
          kind: ["Say you missed {him} too", "Say it's good to be back"],
          playful: ["Ask how much {he} missed you", "Pretend you didn't hear"],
          bold: ["Say it back, louder", "Say you won't leave that long"],
          neutral: ["Don't push for it", "Let the quiet say it"],
        },
      },
      {
        line: "{He}'s listing tomorrow's tasks out loud, on autopilot, and stops mid-sentence when you get closer instead of listening.",
        approach: "Step past the schedule",
        greeting: "I lost my place. I'm not going to pretend I mind.",
        responses: {
          kind: ["Tell {him} to slow down", "Say tomorrow can wait"],
          playful: [
            "Ask what came after 'budget'",
            "Ask if you're on the list",
          ],
          bold: ["Step past it entirely", "Say the list is done for today"],
          neutral: ["Let {him} keep the pace", "Let {him} find {his} place"],
        },
      },
      {
        line: "{He}'s walking you through the program for the next show, and halfway through the opening act {he} stops and just looks at you.",
        approach: "Ask about the second act",
        greeting:
          "The second act. Right. I had the whole running order in my head a minute ago, cutie.",
        responses: {
          kind: ["Say it can wait till tomorrow", "Say {he}'ll remember later"],
          playful: [
            "Ask if you made {him} forget",
            "Ask if you're the second act",
          ],
          bold: ["Tell {him} to keep looking", "Say you'd rather watch {him}"],
          neutral: ["Wait for {him} to find it", "Read the program to {him}"],
        },
      },
      {
        line: "{He}'s rescheduled the same meeting twice this week. Both times it would've landed on the hour you usually come by.",
        approach: "Ask about the meeting",
        greeting:
          "It kept landing on your hour. I wasn't about to give that up for a meeting.",
        responses: {
          kind: ["Say you'd have waited for {him}", "Say you'll keep coming"],
          playful: [
            "Ask how many times it'll move",
            "Ask if the meeting's jealous",
          ],
          bold: ["Ask for a second hour", "Say you'll guard that hour"],
          neutral: ["Let {him} keep the hour", "Take the hour as it is"],
        },
      },
      {
        line: "The last of the house files out, and the captain's smile {he} wears for them gives way to a real one, easy and unpracticed.",
        approach: "Stay once the room empties",
        greeting:
          "Thank you for that. Smiling's easy when it's just you, cutie.",
        responses: {
          kind: ["Smile back at {him}", "Say you like this smile"],
          playful: ["Ask which smile this is", "Ask if it's off duty too"],
          bold: [
            "Say you'll keep the room empty",
            "Say no one else gets this one",
          ],
          neutral: ["Let the quiet settle", "Stay until {he}'s ready"],
        },
      },
      {
        line: "{He} was fitting a costume on you. Somewhere in it {his} hands stopped being a stylist's.",
        approach: "Let the fitting run long",
        greeting:
          "Hold still. ...I've checked this hem three times now, haven't I?",
        responses: {
          kind: ["Let {him} take {his} time", "Say there's no rush"],
          playful: [
            "Ask if it's about the costume",
            "Ask if the hem is cursed",
          ],
          bold: ["Ask for a fourth check", "Say you'll stand still longer"],
          neutral: ["Stand still, let it run long", "Hold still for {him}"],
        },
      },
      {
        line: '"My whole week\'s been better because of you." {He} colors a little, hearing {himself} say it out loud.',
        approach: "Ask if {he}'s sure",
        greeting: "I'm sure. I don't say things like that by accident.",
        responses: {
          kind: ["Say you feel the same", "Say yours has been too"],
          playful: ["Make {him} repeat it", "Point out the blush"],
          bold: [
            "Say you'll make it every week",
            "Say you'll do it on purpose",
          ],
          neutral: ["Let the moment pass", "Smile and let it be"],
        },
      },
      {
        line: "{He} holds out {his} car keys. Tonight {he} wants you to drive, and {he}'ll take the passenger seat.",
        // He's handing over the wheel for once: telling him he's off duty
        // lands better than promising to be careful.
        mood: true,
        approach: "Take the keys",
        greeting:
          "I'll handle the directions. You handle not scratching the paint, cutie.",
        responses: {
          kind: [
            "Promise to drive carefully",
            "Say you'll get {him} home safe",
          ],
          playful: ["Adjust every mirror first", "Ask for {his} best playlist"],
          bold: ["Say {he} gets to rest now", "Say {he}'s off duty tonight"],
          neutral: ["Start the car", "Pull out onto the road"],
        },
      },
      {
        line: "Neither of you says anything for a while, and for once {he} doesn't rush to fill it.",
        approach: "Let the silence do the work",
        greeting:
          "I usually fill the quiet before it gets like this. I didn't want to, with you.",
        responses: {
          kind: ["Let the silence stay easy", "Say the quiet suits you two"],
          playful: ["Break it first, on purpose", "Count how long it lasts"],
          bold: ["Hold the silence and the gaze", "Move a little closer"],
          neutral: ["Say nothing, stay close", "Let it stretch out"],
        },
      },
      {
        line: "{He} mentioned once that there's a version of {him} with no seam showing. You've never stopped wondering where it is.",
        approach: "Ask about the seam",
        greeting:
          "You keep looking for it. I keep hoping you'll find it before I have to show you.",
        responses: {
          kind: ["Say you're not in a rush", "Say {he} can show you anytime"],
          playful: ["Guess where the seam is", "Ask for a hint"],
          bold: ["Name the version you want", "Say you'll find it first"],
          neutral: ["Let the question go unasked", "Leave the seam be"],
        },
      },
      {
        line: "It's well past the end of {his} schedule. The budget's still open in front of {him}, and {he} hasn't turned a page in twenty minutes.",
        approach: "Stay after the schedule ends",
        greeting:
          "\"Stay after everyone's gone home. I'm not done with you, and the budget can wait.\"",
        responses: {
          kind: ["Say the work isn't everything", "Say you'd like to stay"],
          playful: [
            "Ask what's keeping {him} then",
            "Ask if the budget agreed",
          ],
          bold: [
            "Say you're not leaving either",
            "Ask what else {he} has in mind",
          ],
          neutral: ["Wait out the quiet", "Stay without a word"],
        },
      },
      {
        line: "{He}'s not being subtle about looking at you tonight, and doesn't seem to care that you've noticed.",
        approach: "Catch {him} looking",
        greeting:
          "Don't mind me. I spend all day keeping an eye on the whole house.",
        responses: {
          kind: ["Blush and hold {his} gaze", "Say you don't mind at all"],
          playful: ["Say you mind very much", "Ask if you count as the house"],
          bold: [
            "Say it's your turn to look",
            "Say someone should watch {him}",
          ],
          neutral: ["Let it happen, say nothing", "Carry on as you were"],
        },
      },
      {
        line: "The rest of Dionysia has cleared out of the office. {He}'s standing a step closer than {he} needs to.",
        // He's out of excuses and hoping you'll close the gap: taking the
        // last step lands better than reassurance.
        mood: true,
        approach: "Stay where you are",
        greeting:
          "I'd give you a reason for standing this close, but I'm out of good ones.",
        responses: {
          kind: [
            "Say {he} doesn't need a reason",
            "Say you were hoping {he}'d stay",
          ],
          playful: ["Say you'll lend {him} one", "Make {him} close it first"],
          bold: ["Take the last step", "Lean into {his} side"],
          neutral: ["Let the distance close itself", "Meet {him} halfway"],
        },
      },
      {
        line: '"I thought I was done feeling like this," {he} admits. "So, what are you going to do about it?"',
        approach: "Ask {him} to mean it",
        greeting: "I meant it. I don't say things like that as a bit, cutie.",
        responses: {
          kind: ["Say you feel it too", "Say {he} isn't alone in it"],
          playful: [
            "Ask if {he}'s sure this time",
            "Ask what changed {his} mind",
          ],
          bold: [
            "Say you'll take responsibility",
            "Say you're not giving it back",
          ],
          neutral: ["Let the question go unanswered", "Let it sit between you"],
        },
      },
      {
        line: "{He}'s holding the pen over the same line for a full minute, not writing anything, just looking at you instead.",
        approach: "Let {him} set the pen down",
        greeting:
          "I wrote the same word four times. I'm blaming you for all four.",
        responses: {
          kind: ["Let {him} set it down", "Say the word can wait"],
          playful: ["Ask what {he}'s writing", "Ask which word it was"],
          bold: ["Take the pen from {him}", "Give {him} a fifth to blame"],
          neutral: ["Wait for {him} to notice", "Let {him} keep looking"],
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
          playful: ["Ask if you're the whole show", "Tease him for going soft"],
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
          bold: [
            "Say you'll end every day here",
            "Say the work can wait for you",
          ],
          neutral: "Let the day end",
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
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool. Pronouns are `{he}`/`{his}` tokens, filled off the
  // encounter's outfit (winnerLinePronouns), since a casual encounter is Venus;
  // response labels stay pronoun-free.
  winnerLines: {
    new: [
      {
        line: '"A new face." **{name}** looks up from the budget for {user} and doesn\'t look back down.',
        responses: {
          kind: "Ask how you can help",
          playful: "Ask if you're in the budget",
          bold: "Pull up a chair",
        },
      },
      {
        line: "{user} calls {his} name, and **{name}** turns the charisma on like a stage light.",
        responses: {
          kind: "Smile back, give your name",
          playful: "Shield your eyes from it",
          bold: "Look right past the spotlight",
        },
      },
      {
        line: '"Come on over, cutie." **{name}** greets {user} as though their schedule weren\'t already full.',
        responses: {
          kind: "Ask when the last break was",
          playful: "Call the captain cutie back",
          bold: "Clear a spot on the schedule",
        },
      },
      {
        line: '**{name}** looks up from a stack of schedules and smiles at {user}. "Hey there, cutie. What can I do for you?"',
        responses: {
          kind: "Offer to sort the schedules",
          playful: "Start a round of applause",
          bold: "Ask for ten free minutes",
        },
      },
    ],
    known: [
      {
        line: '"Twice now, cutie." **{name}** isn\'t the least bit surprised to see {user} again.',
        responses: {
          kind: "Say twice isn't enough",
          playful: "Ask for a punch card",
          bold: "Say you're making it a habit",
        },
      },
      {
        line: "{user} waves hello, and **{name}** sets {his} pen down like {he}'d been looking for an excuse.",
        responses: {
          kind: "Be the excuse",
          playful: "Ask if you're the excuse",
          bold: "Take the rest of the hour",
        },
      },
      {
        line: "\"You're here again. That's dangerous for my schedule.\" **{name}** makes time for {user} anyway.",
        responses: {
          kind: "Offer to help catch up after",
          playful: "Ask how dangerous",
          bold: "Say the schedule can lose",
        },
      },
    ],
    warm: [
      {
        line: '"You\'re back!" **{name}** spots {user} and forgets whatever {he} was signing.',
        responses: {
          kind: "Ask how {his} day's been",
          playful: "Ask what you just interrupted",
          bold: "Say {he}'s done for today",
        },
      },
      {
        line: "{user} calls out, and **{name}** folds the schedule away mid-revision.",
        responses: {
          kind: "Say this counts as a break",
          playful: "Ask if you're on it",
          bold: "Ask for the whole evening",
        },
      },
      {
        line: "\"I'm heading out for a drive later. Want to come along, cutie?\" **{name}** asks {user} like the seat's already saved.",
        responses: {
          kind: "Say you'd love to come",
          playful: "Ask who picks the music",
          bold: "Call shotgun",
        },
      },
    ],
    spark: [
      {
        line: "**{name}** hears {his} name, and the professional smile becomes a real one for {user}.",
        responses: {
          kind: "Say you like the real smile",
          playful: "Ask for the stage one",
          bold: "Ask to see it more",
        },
      },
      {
        line: '**{name}** walks over to {user} anyway. "Proposal, schedule, budget... and yet here I am."',
        responses: {
          kind: "Say all of it can wait",
          playful: "Ask which one lost",
          bold: "Say you win over the budget",
        },
      },
      {
        line: "{user} got there first, and **{name}** looks caught.",
        responses: {
          kind: "Pretend you saw nothing",
          playful: "Ask what you caught",
          bold: "Say you'll keep the secret",
        },
      },
    ],
    close: [
      {
        line: "**{name}** drops the stage presence for {user}, right there in the middle of everyone.",
        responses: {
          kind: "Say you like this better",
          playful: "Ask for an encore",
          bold: "Keep the audience out",
        },
      },
      {
        line: '"The rest can wait till tomorrow. You\'re with me." **{name}** says it to {user}, quietly firm.',
        responses: {
          kind: "Say yes to tomorrow",
          playful: "Ask what the rest is",
          bold: "Say you're not going anywhere",
        },
      },
      {
        line: "{user} calls, and **{name}** clocks out.",
        responses: {
          kind: "Say the night is free",
          playful: "Ask for overtime pay",
          bold: "Claim the whole evening",
        },
      },
    ],
    bound: [
      {
        line: '"No audience," **{name}** murmurs, reaching {user}. "Only you."',
        responses: {
          kind: "Say that's all you need",
          playful: "Applaud anyway",
          bold: "Say make it always",
        },
      },
      {
        line: "**{name}** hands the **{house}** program to Mio without explaining. {user} called.",
        responses: {
          kind: "Wave to Mio",
          playful: "Ask if Mio agreed",
          bold: "Say the program can wait",
        },
      },
      {
        line: "{user} calls {his} name, and every version of **{name}** answers to it.",
        responses: {
          kind: "Say you love every version",
          playful: "Ask which version this is",
          bold: "Call for the real one",
        },
      },
    ],
  },
};
