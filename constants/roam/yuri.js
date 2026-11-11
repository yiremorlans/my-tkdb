// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/yuri.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/yuri.js for
// /roam; a tier left out still draws the shared pool. See constants/roam/index.js.
export default {
  new: [
    {
      line: "Someone in a white lab coat is studying every passing student, one by one, as if taking inventory.",
      approach: "Let him look you over",
      greeting:
        '"Are there new subjects here? ...You. Allow me to grant you the privilege of becoming my test subject."',
      responses: {
        kind: ["Volunteer for the test", "Ask what he's researching"],
        playful: ["Ask what the privilege pays", "Ask if subjects get a badge"],
        bold: ["Ask why he picked you", "Hold out your arm"],
        neutral: ["Ask who he is", "Step out of his way"],
      },
    },
    {
      line: "He's striding along with a clipboard, glancing back every few steps for someone who isn't keeping up.",
      approach: "Ask where he's headed",
      greeting:
        '"Hmph. We have no time to spare on your drivel. Hurry up, Jiro!"',
      responses: {
        kind: ["Say you'll be brief", "Ask if someone needs a doctor"],
        playful: ["Hurry along with him", "Ask if he knows the way"],
        bold: ["Say it isn't drivel", "Keep pace and keep talking"],
        neutral: ["Let him go", "Step aside"],
      },
    },
    {
      line: "He's reading a patient file as he walks, gloved thumb keeping his place, slowing down for no one.",
      approach: "Ask for Jiro",
      greeting:
        '"You have business with Jiro? Not before bringing it to me, you don\'t. He is merely my assistant. As house captain, it is I who possesses the authority."',
      responses: {
        kind: ["Bring the matter to him", "Ask the captain instead"],
        playful: ["Ask if Jiro needs a permit", "Ask for an appointment"],
        bold: ["Tell him what it's about", "Ask what a captain decides"],
        neutral: ["Say it can wait", "Ask Jiro later"],
      },
    },
    {
      line: "He's holding a printed journal article at arm's length like it personally offended him, red pen uncapped.",
      approach: "Ask what it says",
      greeting:
        '"Lowbrow schools of thought with the gall to oppose my research will bear a mark of shame for generations to come. One day, the world will be forced to acknowledge me."',
      responses: {
        kind: ["Ask what his research is", "Ask what they opposed"],
        playful: ["Ask for his autograph early", "Ask if he's keeping a list"],
        bold: ["Say the world will catch up", "Say his results will speak"],
        neutral: ["Leave him to his reading", "Nod and move along"],
      },
    },
    {
      line: "His lab coat is spotless and his gloves are pristine, though he's just back from a mission.",
      approach: "Remark on the clean coat",
      greeting:
        '"The only blood I stain myself with is that atop the operating table. On missions, I have Jiro to fight in my stead."',
      responses: {
        kind: ["Ask how the mission went", "Ask who needs patching up"],
        playful: ["Ask if Jiro charges extra", "Ask for a souvenir"],
        bold: ["Say you'll come next time", "Ask for the full report"],
        neutral: ["Leave the subject be", "Look for Jiro instead"],
      },
    },
  ],
  known: [
    {
      line: "He's stopped calling you 'worm.' He hasn't replaced it with anything yet.",
      approach: "Ask what he'll call you now",
      greeting:
        "\"I'll call you what I like, when I've settled on it. These things require precision.\"",
      responses: {
        kind: ["Say you don't mind waiting", "Say you'll like what he picks"],
        playful: ["Offer terrible suggestions", "Guess wildly at what's next"],
        bold: ["Offer him your actual name", "Say you'll hold him to it"],
        neutral: ["Shrug and let it go", "Don't chase an answer"],
      },
    },
    {
      line: "He hasn't eaten since yesterday. There's proof, if you look for the wrappers he pretends aren't there.",
      approach: "Bring him something to eat",
      greeting:
        '"I don\'t require sustenance. I require silence and a working centrifuge. ...What is that."',
      responses: {
        kind: ["Insist he eat something", "Say you made it for him"],
        playful: ["Wave it under his nose", "Dare him to ignore it"],
        bold: ["Put the meal in his hands", "Say a doctor needs to eat"],
        neutral: ["Leave it on his desk", "Walk away"],
      },
    },
    {
      line: "He notes something about you in the margin, and covers it when you look.",
      approach: "Ask what he wrote",
      greeting:
        '"I catalogued your visit. Purely for scientific record-keeping."',
      responses: {
        kind: ["Let him keep his secret", "Don't make him explain"],
        playful: ["Read his margin notes aloud", "Peek over his shoulder"],
        bold: ["Say you'll be worth the notes", "Ask to be catalogued again"],
        neutral: ["Let him finish his notes", "Say nothing about it"],
      },
    },
    {
      line: "The insults have gotten more specific, which means he's been paying attention.",
      approach: "Take it as flattery",
      greeting:
        '"My observations got sharper. That\'s not the same as caring."',
      responses: {
        kind: ["Say you trust his eye", "Ask what else he's noticed"],
        playful: ["Ask for a more precise one", "Keep count of them"],
        bold: ["Say you've been observing too", "Say you'll take sharper"],
        neutral: ["Let the insults roll past", "Take none of it personally"],
      },
    },
    {
      line: "He's shouted Jiro's name three times now, too busy to go looking himself.",
      approach: "Tell him you found him",
      greeting: '"Jiro!! Jiro!!! What on earth are you... ah. It\'s you."',
      responses: {
        kind: ["Offer to go look for him", "Ask what he needs"],
        playful: ["Ask if you look like Jiro", "Answer to Jiro's name"],
        bold: ["Take Jiro's spot for now", "Ask what he needed Jiro for"],
        neutral: ["Don't announce yourself", "Stay quiet and wait"],
      },
    },
    {
      line: "He's humming classical music under his breath and doesn't stop when he notices you noticing.",
      approach: "Let him keep humming",
      greeting:
        '"Yes, I\'m aware. I have talents beyond medicine. Try not to be too astonished."',
      responses: {
        kind: ["Ask what he's humming", "Let him have the moment"],
        playful: ["Applaud when he finishes", "Ask if he does weddings"],
        bold: ["Ask for the whole piece", "Request something you know"],
        neutral: ["Tune it out", "Not notice the humming at all"],
      },
    },
    {
      line: "He's muttering about the academy's research budget like it's a personal insult, entirely unprompted.",
      approach: "Take his side",
      greeting:
        '"Even Nicolas agrees the work is sound. And still the academy gives me a budget fit for a middle school science fair!"',
      responses: {
        kind: ["Say his work deserves better", "Let him vent"],
        playful: ["Award him first place", "Offer to run a bake sale"],
        bold: ["Say they'll regret it", "Ask to see the numbers"],
        neutral: ["Wait for the rant to end", "Tune out the rant"],
      },
    },
  ],
  warm: [
    {
      line: "His cold demeanor cracks slightly: there's obsession in his eyes now, the drive to cure your curse is consuming him.",
      approach: "Notice the obsession",
      greeting:
        '"I do this for the future of humanity. And for yo... for the specimen. Your case is unusually stubborn, that\'s all."',
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
      line: "He has a new set of notes. Every page of them is about you.",
      approach: "Ask what he's working on",
      greeting:
        '"I\'ve read your file eleven times. Purely academic interest, obviously."',
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
      line: '"Where on earth have you been, worm?" he snaps. "Next time you take a leave of absence, you inform me in advance."',
      approach: "Sit down as told",
      greeting: '"You\'re late. Not that I was... never mind. Sit."',
      responses: {
        kind: ["Promise to tell him next time", "Give him a full report"],
        playful: ["Ask if he kept a log", "Ask if there's a form for it"],
        bold: ["Say he's your first stop", "Say you'd never skip him"],
        neutral: ["Say something came up", "Hand over your excuse"],
      },
    },
    {
      line: "He shoves a bottle at you without a word. It's the good painkiller. He'd deny caring.",
      // Caught out caring: teasing how he noticed lands better than
      // taking the bottle, since the flustered denial is the point.
      mood: true,
      approach: "Ask what it's for",
      greeting: "\"It's for the headache you've been pretending not to have.\"",
      responses: {
        kind: ["Admit the headache is real", "Take the painkiller"],
        playful: ["Ask if he's worried about you", "Ask how he even noticed"],
        bold: ["Say you knew he'd notice", "Ask him to take care of you"],
        neutral: ["Say it's not that bad", "Pocket it for later"],
      },
    },
    {
      line: "Jiro booked your next check-up before you thought to ask. He has now read that line in the ledger four times.",
      approach: "Ask about the check-up",
      greeting:
        '"What on earth did you say to Jiro!? He does not make exceptions for anyone. Not without consulting me!"',
      responses: {
        kind: ["Say you're his patient first", "Promise to go through him"],
        playful: ["Ask if you're in trouble", "Say Jiro is very attentive"],
        bold: ["Say he's your doctor", "Say Jiro can't replace him"],
        neutral: ["Say it was a small favor", "Say you only asked"],
      },
    },
    {
      line: "Jiro mentions, within earshot, that the whole afternoon was cleared for you.",
      approach: "Thank him for the time",
      greeting:
        '"Jiro exaggerates! I cleared nothing. There simply happened to be a gap in my afternoon. ...A large one. I made sure of it."',
      responses: {
        kind: ["Say you cleared yours too", "Ask what he planned for it"],
        playful: ["Ask if he blocked it in ink", "Ask how large the gap was"],
        bold: ["Say you'll take all of it", "Say you'll fill the gap"],
        neutral: ["Let the two of them argue", "Let the excuse stand"],
      },
    },
    {
      line: "Someone called his research a hobby earlier. He's been sharpening the same pencil for five minutes.",
      approach: "Take the pencil away",
      greeting:
        '"I am not upset. Amateurs may call my life\'s work whatever they like."',
      responses: {
        kind: ["Say his work matters", "Tell him they were wrong"],
        playful: ["Offer a fresh pencil", "Ask if that's his calm face"],
        bold: ["Ask who dared say it", "Tell him to forget them"],
        neutral: ["Keep hold of the pencil", "Wait for him to calm down"],
      },
    },
    {
      line: "He's humming over your chart, the same eight bars on a loop, and doesn't seem to know he's doing it.",
      // Caught humming unaware: being asked for more flusters him more
      // than leaving him be.
      mood: true,
      approach: "Say his name",
      greeting:
        '"What? I wasn\'t aware I was... The piece is stuck in my head. It aids concentration. That is all."',
      responses: {
        kind: ["Ask what the piece is", "Say you like the tune"],
        playful: ["Ask for an encore", "Ask if your chart is that good"],
        bold: ["Tell him not to stop", "Say you'd listen all day"],
        neutral: ["Get on with the work", "Let it play out"],
      },
    },
    {
      line: 'A visiting researcher asks who you are. "This is my..." He catches himself. "...patient. A patient of mine."',
      approach: "Let him finish that",
      greeting:
        '"Patient is the correct term. It is a precise term. Stop looking at me like that."',
      responses: {
        kind: ["Play along as the patient", "Let him off the hook"],
        playful: ["Ask what he nearly said", "Introduce yourself better"],
        bold: ["Say 'his' was enough", "Stand a little closer to him"],
        neutral: ["Shake the visitor's hand", "Let it pass"],
      },
    },
    {
      line: "He's hidden the isekai novel under a stack of medical journals, badly, the spine sticking out.",
      approach: "Ask what he's reading",
      greeting:
        '"...You didn\'t see anything. Not a word, or I revoke your visiting privileges."',
      responses: {
        kind: ["Tuck the spine back in", "Straighten the stack for him"],
        playful: ["Zip your lips, dramatically", "Ask if it's any good"],
        bold: ["Ask to borrow it after", "Say you'd read it too"],
        neutral: ["Pretend you didn't see it", "Carry on with your visit"],
      },
    },
  ],
  spark: [
    {
      line: "He's marching you across Mortkranken to see a recent finding. Three corridors in, he still hasn't admitted he's lost.",
      approach: "Ask how much farther it is",
      greeting:
        '"I know precisely where we are. The building was renovated, that\'s all."',
      responses: {
        kind: ["Let him lead anyway", "Say you're in no hurry"],
        playful: ["Ask if he's lost", "Ask if they moved the lab too"],
        bold: ["Take his arm and lead", "Point the right way"],
        neutral: ["Follow without comment", "Read the next door sign"],
      },
    },
    {
      line: "He's preparing Jiro's injection with the tray pulled close, and nobody else is allowed near it.",
      approach: "Offer to help",
      greeting:
        '"Not with this. Jiro\'s stigma reflects every injury back onto its source. Even a needle. I am the sole exception, you see."',
      responses: {
        kind: ["Leave it in his hands", "Ask if it ever costs him"],
        playful: ["Ask if that's concern", "Say he'd lose his best subject"],
        bold: ["Stay beside him while he works", "Make him rest after this"],
        neutral: ["Step clear of the tray", "Let him finish the dose"],
      },
    },
    {
      line: "The space heater has migrated across the lab to the spot where he always examines you.",
      approach: "Sit where it's warm",
      greeting:
        '"The heater is positioned for equipment calibration. You simply happen to be in its range."',
      responses: {
        kind: ["Say his patients are lucky", "Say you noticed the warmth"],
        playful: ["Ask which equipment", "Ask if you're the equipment"],
        bold: ["Say it can stay right there", "Pull him into the warm too"],
        neutral: ["Hold your hands to the heat", "Stay where you are"],
      },
    },
    {
      line: "There's a vial on the shelf with your name on the label, written far more carefully than the others.",
      mood: true,
      approach: "Ask about the vial",
      greeting:
        '"That one is yours. Formulated for you specifically. Legible labeling is basic laboratory protocol."',
      responses: {
        kind: ["Say you trust his formula", "Say you'll follow his dosing"],
        playful: ["Ask if he practiced your name", "Ask if it's a love potion"],
        bold: ["Ask for the next batch", "Ask him to administer it"],
        neutral: ["Check the dosage", "Compare the labels"],
      },
    },
    {
      line: "He's cleared a space on the bench beside him without being asked, mid-rant, like it's obvious you'd sit there.",
      // "Don't act shocked" is an invitation: playing up the surprise
      // flusters him more than sitting down without fuss.
      mood: true,
      approach: "Look for a seat",
      greeting: '"...Sit, then. I already made room, don\'t act shocked."',
      responses: {
        kind: ["Ask what has him worked up", "Ask to hear the whole story"],
        playful: ["Ask if this is a reservation", "Say you're touched instead"],
        bold: ["Sit close to him", "Lean on his shoulder"],
        neutral: ["Sit and listen", "Set your things down"],
      },
    },
    {
      line: "The research budget came through at last. He has found four separate excuses to mention it in ten minutes.",
      approach: "Ask about the new equipment",
      greeting:
        '"Hmph. You noticed the new equipment. The faculty finally saw sense and approved my budget. About time."',
      responses: {
        kind: ["Admire the new equipment", "Say his work earned it"],
        playful: [
          "Ask if you can push a button",
          "Ask which one's his favorite",
        ],
        bold: ["Say you knew they'd cave", "Claim the first demonstration"],
        neutral: ["Glance at the equipment", "Let him list the upgrades"],
      },
    },
  ],
};
