// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/yuri.js for
// /meet; a tier left out still draws dialogue.<tier>. See constants/meet/index.js.
export default {
  new: [
    {
      line: "What are you dawdling for? Change out of those rags and report to my lab immediately!",
      responses: {
        kind: ["Say you'll be right there", "Change and hurry to his lab"],
        playful: [
          "Ask what's wrong with the rags",
          "Ask if he was waiting for you",
        ],
        bold: ["Say you were on your way", "Say you came looking for him"],
        neutral: ["Ask what this is about", "Check what you're wearing"],
      },
    },
    {
      line: "Don't touch that. Or anything else, for that matter. Stay exactly there. A genius is at work.",
      responses: {
        kind: ["Call it groundbreaking", "Ask how it works"],
        playful: ["Ask if you may blink", "Ask if you're the experiment"],
        bold: ["Offer to be his assistant", "Move closer to watch"],
        neutral: ["Step back and wait", "Keep your hands to yourself"],
      },
    },
    {
      line: "Hm. Poor posture, poor sleep, poor decisions. Textbook.",
      responses: {
        kind: ["Ask how to fix all three", "Say you could use his help"],
        playful: ["Ask if you're a rare case", "Ask which one's worst"],
        bold: ["Say coming here wasn't one", "Book your follow-up now"],
        neutral: ["Straighten your posture", "Let the diagnosis stand"],
      },
    },
    {
      line: "Why must a peerless genius such as myself be saddled with performing piddling health checks for the new students!? It's asinine!",
      responses: {
        kind: ["Ask about his research", "Say you're in good hands"],
        playful: ["Offer to be his prize specimen", "Ask for a genius checkup"],
        bold: ["Tell him you asked for him", "Say you only want the best"],
        neutral: ["Ask how long it takes", "Wait for your turn"],
      },
    },
    {
      line: "Prepare the new formula, Jiro. A specimen has arrived. ...What? You're not here for treatment?",
      responses: {
        kind: ["Volunteer for the formula", "Ask what the formula does"],
        playful: ["Ask if specimens get snacks", "Fake a small cough"],
        bold: ["Say you're here for him", "Make him guess why you came"],
        neutral: ["Say you're just passing by", "Wait for Jiro to answer"],
      },
    },
  ],
  known: [
    {
      line: "Are you injured or ill? Oh dear, how unfortunate. I shall begin the experi... Ahem, the treatment, immediately.",
      responses: {
        kind: ["Ask what he'd recommend", "Offer yourself for science"],
        playful: ["Call him out on 'experi-'", "Ask if you're lab rat #1"],
        bold: ["Say you came to him first", "Ask what he'll try first"],
        neutral: ["Let him work without a word", "Watch him work in silence"],
      },
    },
    {
      line: "Hmph. You noticed the new equipment. The research grant committee finally saw sense. About time.",
      responses: {
        kind: ["Admire the new equipment", "Say his work earned it"],
        playful: [
          "Ask if you can push a button",
          "Ask which one's his favorite",
        ],
        bold: ["Say you knew they'd cave", "Claim the first demonstration"],
        neutral: ["Glance at it and say nothing", "Let him talk, say nothing"],
      },
    },
    {
      line: "Even Nicolas agrees the work is sound. And still the academy gives me a budget fit for a middle school science fair!",
      responses: {
        kind: ["Say his work deserves better", "Let him vent"],
        playful: ["Award him first place", "Offer to run a bake sale"],
        bold: ["Say they'll regret it", "Ask to see the numbers"],
        neutral: ["Half-listen, say nothing", "Tune out the rant"],
      },
    },
    {
      line: "You walk in with zero notice, now I have to rearrange my schedule. Try to appreciate that.",
      responses: {
        kind: ["Say you know he's busy", "Say you'll give more notice"],
        playful: ["Ask if you were worth it", "Ask what he moved for you"],
        bold: ["Say you'll keep turning up", "Say he can rearrange again"],
        neutral: ["Accept it, ask nothing", "Nod and move on"],
      },
    },
    {
      line: "Oh, it's you. And here I thought I had a patient. I am currently reviewing today's lessons, so please leave unless you're here for treatment.",
      responses: {
        kind: ["Say you're here for treatment", "Ask what he's reviewing"],
        playful: ["Ask if you could be a patient", "Ask if he's disappointed"],
        bold: ["Say you'll wait till he's done", "Ask to review with him"],
        neutral: ["Leave him to his lessons", "Ask when he'll be free"],
      },
    },
    {
      line: "Hmph. You really think yourself important enough to make a genius like myself wait around!?",
      responses: {
        kind: ["Promise not to waste his time", "Say you hurried to get here"],
        playful: ["Catch him admitting he waited", "Ask if he timed you"],
        bold: ["Say you're here now", "Ask if he missed you"],
        neutral: ["Say you got held up", "Check the time"],
      },
    },
    {
      line: "Anomalous medical science is uncharted territory. Should I become its pioneer, all will bow before my intellect until the end of time... Ha ha... Ah ha ha ha ha!",
      responses: {
        kind: ["Say the field needs him", "Ask what he'll chart first"],
        playful: ["Ask if you have to bow too", "Ask to hear the laugh again"],
        bold: ["Say you'll be there to see it", "Ask how close he is"],
        neutral: ["Wait out the laughter", "Take a step back"],
      },
    },
    {
      line: "Jiro's not feeling well, you say? Very well. I shall test my latest formula on him.",
      responses: {
        kind: ["Say Jiro's in good hands", "Ask what the formula treats"],
        playful: ["Ask if Jiro gets a say", "Ask if it's been tested yet"],
        bold: ["Offer to bring Jiro to him", "Ask to watch the treatment"],
        neutral: ["Say you only passed it on", "Leave Jiro to him"],
      },
    },
    {
      line: "Why yes, I attended every lesson today, as always. All studies are linked, after all. Though it takes a mind such as mine to recognize that.",
      responses: {
        kind: ["Say it shows in his work", "Ask how today's lessons link"],
        playful: ["Ask to copy his notes", "Ask if he's ever missed one"],
        bold: ["Ask him to show you the links", "Say you'll keep up with him"],
        neutral: ["Say you were there too", "Nod and leave it there"],
      },
    },
    {
      line: "Sports...? Hmph, such nonsense is entirely superfluous to my life. Why needlessly expend energy in such a manner?",
      responses: {
        kind: ["Say you'd walk with him", "Ask what he'd rather do"],
        playful: ["Offer to be his trainer", "Ask if lab sprints count"],
        bold: ["Tell him it's doctor's orders", "Say the body's his tool too"],
        neutral: ["Say it's not for everyone", "Let the topic drop"],
      },
    },
  ],
  warm: [
    {
      line: "I do this for the future of humanity. And for yo... for the specimen. Your case is unusually stubborn, that's all.",
      responses: {
        kind: [
          "Say your case is in good hands",
          "Say no one else could crack it",
        ],
        playful: [
          "Ask if the specimen has a name",
          "Say the specimen is flattered",
        ],
        bold: [
          "Say you'll be just as stubborn",
          "Say you'll see it through too",
        ],
        neutral: ["Stay professional about it", "Stay out of his way"],
      },
    },
    {
      line: "I've read your file eleven times. Purely academic interest, obviously.",
      responses: {
        kind: ["Offer to answer his questions", "Ask what he found"],
        playful: [
          "Ask if you're a page-turner",
          "Ask for his favorite chapter",
        ],
        bold: ["Demand to see the file", "Say eleven isn't enough"],
        neutral: ["Don't name it", "Let it go unremarked"],
      },
    },
    {
      line: "Where on earth have you been, worm? Next time you take a leave of absence, you inform me in advance.",
      responses: {
        kind: ["Promise to tell him next time", "Give him a full report"],
        playful: ["Ask if he kept a log", "Ask if there's a form for it"],
        bold: ["Say he's your first stop", "Say you'd never skip him"],
        neutral: ["Say something came up", "Hand over your excuse"],
      },
    },
    {
      line: "Take this. It's for the headache you've been pretending not to have.",
      // Caught out caring: teasing how he noticed lands better than
      // taking the bottle, since the flustered denial is the point.
      mood: true,
      responses: {
        kind: ["Admit the headache is real", "Take the painkiller"],
        playful: ["Ask if he's worried about you", "Ask how he even noticed"],
        bold: ["Say you knew he'd notice", "Ask him to take care of you"],
        neutral: ["Say it's not that bad", "Pocket it for later"],
      },
    },
    {
      line: "From now on, you report to my lab every week. It's a standing appointment. A genius's time is precious, so consider yourself privileged.",
      responses: {
        kind: ["Say you'll be there", "Promise never to miss it"],
        playful: ["Ask who you outranked", "Ask if there's a waitlist"],
        bold: ["Say you'd come without one", "Claim the slot as yours"],
        neutral: ["Ask what time it starts", "Accept the appointment"],
      },
    },
    {
      line: "Jiro let you into the lab without me!? What on earth did you say to him? He does not make exceptions for anyone. Not without consulting me!",
      responses: {
        kind: ["Say you're his patient first", "Promise to go through him"],
        playful: ["Ask if you're in trouble", "Say Jiro is very attentive"],
        bold: ["Say he's your doctor", "Say Jiro can't replace him"],
        neutral: ["Say it was a small favor", "Say you only asked"],
      },
    },
    {
      line: "Jiro told you I cleared my afternoon? Jiro exaggerates! I cleared nothing. There simply happened to be a gap. ...A large one. I made sure of it.",
      responses: {
        kind: ["Say you cleared yours too", "Ask what he planned for it"],
        playful: ["Ask if he blocked it in ink", "Ask how large the gap was"],
        bold: ["Say you'll take all of it", "Say you'll fill the gap"],
        neutral: ["Let the two of them argue", "Let the excuse stand"],
      },
    },
    {
      line: "Some lowbrow critic called my research a fairy tale. I am not upset. Amateurs may call my life's work whatever they like.",
      responses: {
        kind: ["Say his work matters", "Tell him they were wrong"],
        playful: [
          "Ask if he's drafting a reply",
          "Ask if that's his calm face",
        ],
        bold: ["Ask who dared say it", "Tell him to forget them"],
        neutral: ["Let him vent", "Wait for him to calm down"],
      },
    },
    {
      line: "That centrifuge separates anomalous blood samples, and it cost more than a year of Darkwick tuition. You'll observe from here. Next to me, where I can explain.",
      responses: {
        kind: ["Ask what he's looking for", "Admire the equipment"],
        playful: ["Ask if this is a promotion", "Ask if there's a quiz after"],
        bold: ["Say you'll take notes for him", "Step in closer"],
        neutral: ["Watch the layers form", "Listen to him explain"],
      },
    },
    {
      line: "Take it, worm. A formula developed for one specimen alone. I-It's not as though I stayed up perfecting it! The research simply demanded it!",
      // Staying up gives him away: teasing what it means flusters him more
      // than taking the flask at face value.
      mood: true,
      responses: {
        kind: ["Say you'll take it daily", "Ask what went into it"],
        playful: ["Ask how late he stayed up", "Ask if it's a love potion"],
        bold: ["Drink it in front of him", "Ask for the next batch"],
        neutral: ["Hold it up to the light", "Pocket it and move on"],
      },
    },
    {
      line: "Keep the coat. Hypothermia in my own lab would set the research back considerably.",
      responses: {
        kind: ["Say you feel cozy", "Ask if he's warm enough"],
        playful: ["Model the coat for him", "Ask to keep it"],
        bold: ["Wear it home, no debate", "Put it back on his shoulders"],
        neutral: ["Say you're not that cold", "Hand the coat back"],
      },
    },
    {
      line: "Lack of sleep is the root of all illness. Drink that, then go to bed.",
      responses: {
        kind: ["Drink it without arguing", "Promise to sleep tonight"],
        playful: ["Ask what's in it", "Ask if he follows that rule"],
        bold: ["Say you'll go if he does", "Pour him one too"],
        neutral: ["Say you'll try", "Set the cup down"],
      },
    },
    {
      line: "Jiro's gone!? ...So be it, then. I grant you the privilege of being my assistant for the day. Be grateful, worm.",
      responses: {
        kind: ["Ask what he needs first", "Say you'll do it his way"],
        playful: ["Ask if you get a lab coat", "Ask if you outrank Jiro now"],
        bold: ["Say you came to help anyway", "Roll up your sleeves"],
        neutral: ["Wait for instructions", "Say Jiro will turn up"],
      },
    },
    {
      line: "Tell me, do you have an excuse for looking more emaciated than me when I spent all night researching? I didn't think so!",
      responses: {
        kind: ["Ask what kept him up", "Ask if he's slept at all"],
        playful: ["Ask if it's a contest", "Say he's observant as ever"],
        bold: ["Say you both need sleep", "Say it's his turn to rest"],
        neutral: ["Say you slept fine", "Let the remark pass"],
      },
    },
  ],
};
