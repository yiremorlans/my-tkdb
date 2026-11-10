import bondScenes from "../bondScenes/jiro.js";

export default {
  // Level-up DMs: constants/bondScenes/jiro.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: "He's writing in an incubation log and barely spares you a glance. His mask is pulled down to his chin, forgotten.",
        approach: "Ask how his day is going",
        greeting: '"I don\'t like unproductive discussions. Like this one."',
        responses: {
          kind: ["Ask what he's incubating", "Ask how long he's been up"],
          playful: [
            "Point out his forgotten mask",
            "Ask if you're interrupting",
          ],
          bold: ["Say you'll be quick", "Tell him why you came"],
          neutral: ["Let him finish the log", "Wait in silence"],
        },
      },
      {
        line: '"Examination or errand?" he asks. "If it\'s an errand, please wait. I\'m busy."',
        approach: "State your business",
        greeting:
          '"Symptoms first, please. Pleasantries slow the diagnosis down."',
        responses: {
          kind: ["Wait until he's free", "Describe your symptoms"],
          playful: ["Ask if curiosity counts", "Say your symptom is boredom"],
          bold: ["Say you came to see him", "Say you have no symptoms"],
          neutral: ["Say only the facts", "Hand over your chart"],
        },
      },
      {
        line: '"Oh, there you are. I was about to go give you a health check. This saves time and effort."',
        approach: "Wait to be assessed",
        greeting:
          "\"Could you sit down? I'm going to take your pulse. You can breathe normally, it isn't a test.\"",
        responses: {
          kind: ["Roll up your sleeve for him", "Sit down for the checkup"],
          playful: [
            "Ask what happens if you pass",
            "Ask what happens if you fail",
          ],
          bold: ["Ask for the full checkup", "Say you only trust his checks"],
          neutral: ["Give him quiet", "Wait for the check"],
        },
      },
      {
        line: '"You\'re new," he says, not looking up. "Please try not to die before your first check-up. The paperwork is annoying."',
        approach: "Promise not to die",
        greeting:
          '"Good. Please come by Mortkranken this week so I can confirm it."',
        responses: {
          kind: ["Promise to be careful", "Ask if he's careful too"],
          playful: ["Joke about dying anyway", "Ask if a pulse is enough"],
          bold: ["Say you'll come by tomorrow", "Ask for the check-up now"],
          neutral: ["Ask what the check-up is", "Agree to drop by"],
        },
      },
      {
        line: "Everything in the room is sterile, ordered, and faintly unwelcoming. He fits it perfectly.",
        approach: "Don't touch anything",
        greeting:
          '"You kept your hands to yourself. Most people touch the jars. Then they faint."',
        responses: {
          kind: ["Respect the sterile space", "Stay where he can work"],
          playful: ["Ask if you fit in too", "Ask if he decorated"],
          bold: ["Say it suits him", "Say nothing here scares you"],
          neutral: ["Look at the jars", "Keep a careful distance"],
        },
      },
    ],
    known: [
      {
        line: "He knows your name now. He uses it like a chart heading.",
        approach: "Let him use your name",
        greeting: '"Your color\'s better than last week."',
        responses: {
          kind: ["Say you've been resting", "Say his name back"],
          playful: ["Ask what else is on the chart", "Ask for the full report"],
          bold: ["Say you like being his patient", "Say you'll keep improving"],
          neutral: ["Answer to your name", "Say nothing about it"],
        },
      },
      {
        line: "The dismissal doesn't come. He simply keeps working while you're there.",
        approach: "Loiter usefully",
        greeting:
          "\"If you're staying, could you hold this? Please don't look at what's in it.\"",
        responses: {
          kind: ["Offer to hand him things", "Ask if he's eaten today"],
          playful: ["Ask if you count as staff", "Ask if staying is allowed"],
          bold: ["Ask what he's working on", "Say you like watching him work"],
          neutral: ["Stay out of the way", "Hold the container"],
        },
      },
      {
        line: "\"You're not squeamish,\" he observes. From him that's a character reference.",
        approach: "Take it as a compliment",
        greeting:
          "\"It was an observation. Most people are squeamish. You aren't. That's useful.\"",
        responses: {
          kind: ["Say that means a lot from him", "Offer to assist sometime"],
          playful: ["Ask what would spook him", "Ask for it in writing"],
          bold: ["Say nothing rattles you", "Offer to watch a procedure"],
          neutral: ["Shrug at the observation", "Let the comment pass"],
        },
      },
      {
        line: '"They said they wanted to die, so I prescribed them what they needed. I don\'t see the point of discussing ethics after the fact."',
        approach: "Pay attention",
        greeting:
          "\"It was their decision. I only handled the dosage. I've never understood why that's the part people object to.\"",
        responses: {
          kind: ["Listen without judgment", "Say you get the reasoning"],
          playful: ["Ask if that's his opener", "Ask if that was a joke"],
          bold: [
            "Say he can tell you anything",
            "Say you'd rather hear it plain",
          ],
          neutral: [
            "Accept his explanation",
            "Hear him out",
          ],
        },
      },
      {
        line: 'You nod off waiting for him and wake to two fingers at your wrist. "Oh, you\'re alive."',
        approach: "Ask why he's checking",
        greeting: '"You sleep very still. It seemed worth confirming."',
        responses: {
          kind: ["Say you're very much alive", "Say you feel rested now"],
          playful: ["Ask if 'alive' is the verdict", "Ask if he was worried"],
          bold: ["Ask what your pulse was", "Say he can check anytime"],
          neutral: ["Rub your eyes", "Sit up and stretch"],
        },
      },
      {
        line: '"I attend classes every day since Yuri does," he says, frowning at an attendance record, "but sometimes they mark me as absent."',
        approach: "Explain how roll call works",
        greeting:
          "\"I'm supposed to reply when they say my name? I didn't know that.\"",
        responses: {
          kind: ["Say being there should count", "Show him how to say 'here'"],
          playful: [
            "Ask what he thought it was for",
            "Call his name to test him",
          ],
          bold: ["Say you'll practice with him", "Tell him to answer loudly"],
          neutral: ["Glance at the record", "Let it go unremarked"],
        },
      },
      {
        line: "He's pulling on his coat. \"Yuri's holed up in the lab, so I'm going out. If he calls for me, tell him I'm with a patient.\"",
        approach: "Agree to cover for him",
        greeting:
          "\"He sends me out on errands often enough that he'll assume this is one. I'll be back when it's done.\"",
        responses: {
          kind: ["Promise to cover for him", "Tell him to get some air"],
          playful: ["Ask where he's really going", "Offer him a better alibi"],
          bold: ["Ask to go with him", "Say you'll answer Yuri for him"],
          neutral: ["Say you'll pass it on", "Let him slip out"],
        },
      },
      {
        line: "He's rearranged the appointment log so your slot always comes first. He'd call it coincidence.",
        approach: "Call him out",
        greeting:
          "\"It isn't favoritism. You arrive first, so you're seen first.\"",
        responses: {
          kind: ["Ask how many he's seeing today", "Promise you wont be late"],
          playful: ["Ask who got bumped", "Ask for a reminder card"],
          bold: ["Say you'll keep the slot", "Say first suits you fine"],
          neutral: [
            "Let him call it coincidence",
            "Say nothing about the slot",
          ],
        },
      },
      {
        line: '"Streptococcal infections are on the rise," he says, and hands you a mask before you ask for one.',
        approach: "Take the mask",
        greeting:
          '"They\'re spread through droplet and contact infection. Have you been taking precautions?"',
        responses: {
          kind: ["Put the mask on right away", "Ask if he's feeling okay"],
          playful: ["Ask how contagious, exactly", "Ask if the mask is a gift"],
          bold: ["Tell him to put his on", "Say you've been careful"],
          neutral: ["Put on the mask", "Nod and keep your distance"],
        },
      },
      {
        line: 'He checks the clock and rolls up his sleeve. "Nearly time for my medication."',
        approach: "Ask how long it takes",
        greeting:
          '"It should take approximately one hour. Are you going to wait for me?"',
        responses: {
          kind: ["Say you'll wait for him", "Ask if the treatment hurts"],
          playful: ["Ask if you can watch", "Offer to time it for him"],
          bold: ["Say you're coming with him", "Say he can't skip it"],
          neutral: ["Nod and stay where you are", "Say nothing and stay put"],
        },
      },
      {
        line: "It's late and his light is still on. He's reading a medical journal, with a stack of others beside him.",
        approach: "Ask if he reads every night",
        greeting:
          '"Every day. I like medical journals best. I don\'t remember what made me start reading them."',
        responses: {
          kind: ["Ask if he's slept at all", "Ask which one he'd recommend"],
          playful: ["Ask if it's a page-turner", "Ask to borrow the dull one"],
          bold: ["Ask for the one on infections", "Ask to hear a medical case"],
          neutral: ["Let him keep reading", "Leave him to his journal"],
        },
      },
      {
        line: "He's added a line to your chart that isn't a symptom. He won't say what it says.",
        approach: "Ask what he wrote",
        greeting: "\"It isn't a symptom. That's all you need to know.\"",
        responses: {
          kind: [
            "Let him keep the note private",
            "Say you trust it's nothing bad",
          ],
          playful: ["Guess what he wrote", "Offer to trade notes"],
          bold: ["Ask if it's medical", "Ask to see your chart"],
          neutral: ["Let it go unremarked", "Say nothing about the line"],
        },
      },
      {
        line: '"What\'s the purpose of educational facilities like Darkwick?" he asks. He genuinely wants to know.',
        approach: "Give him a reason",
        greeting: '"You can learn everything you need through self-study."',
        responses: {
          kind: ["Say it's for the people there", "Say you'd study less alone"],
          playful: [
            "Ask what he'd study instead",
            "Ask if self-study has exams",
          ],
          bold: ["Say you learn more with him", "Say people are the point"],
          neutral: ["Shrug at the question", "Let him keep his theory"],
        },
      },
    ],
    warm: [
      {
        line: 'You mention the scary dare going around campus. "A dare? Okay, I\'ll do it with you."',
        approach: "Ask why he's in",
        greeting: '"I\'ve always wanted to try screaming in fear."',
        responses: {
          kind: ["Say you'll walk it with him", "Say you'll stay close"],
          playful: ["Ask if he's ever been scared", "Bet he won't scream once"],
          bold: ["Say you'll hold him to it", "Say you don't scare easily"],
          neutral: ["Agree to the dare", "Shrug and go along"],
        },
      },
      {
        line: 'He looks up from your chart. "How are you sleeping?"',
        approach: "Ask why he's asking",
        greeting: "\"I don't, so I'm asking for comparison.\"",
        responses: {
          kind: ["Answer him honestly", "Admit you've slept badly"],
          playful: ["Say like the dead", "Ask if it's a trick question"],
          bold: ["Say badly, and ask about his", "Give him the exact hours"],
          neutral: ["Answer without detail", "Say you sleep fine"],
        },
      },
      {
        line: 'There\'s blood on his shirt. "The blood? I believe one of the wounds on my stomach tore."',
        // He's bleeding and unbothered: tending the tear lands, insisting on the walk doesn't.
        mood: true,
        approach: "Ask if it needs stitches",
        greeting:
          "\"I'll have to get Yuri to suture it. I've told him deep dermal suturing would be more effective, but he won't listen to me.\"",
        responses: {
          kind: ["Offer to take him to Yuri", "Help him press on it"],
          playful: ["Ask if he just noticed", "Ask if it's even his blood"],
          bold: ["Say he shouldn't go alone", "Say you're not leaving him"],
          neutral: ["Walk him to Yuri", "Hand him a cloth for it"],
        },
      },
      {
        line: 'Something clatters in the lab and you jump. He laughs outright. "Hahaha! Oh, sorry."',
        approach: "Ask what's so funny",
        greeting: "\"It was just the ventilation. That's funny, isn't it?\"",
        responses: {
          kind: ["Say you like his laugh", "Laugh along with him"],
          playful: ["Insist it was a ghost", "Say his apology is noted"],
          bold: ["Admit it got you", "Say his laugh was worth it"],
          neutral: ["Let the laugh pass quietly", "Pretend nothing happened"],
        },
      },
      {
        line: 'He comes in from the cold and stops short beside you. "Hurk...! Phew... I\'m fine..."',
        // His condition is acting up: tending him lands, pushing him doesn't.
        mood: true,
        approach: "Ask if he's alright",
        greeting:
          '"The change in temperature causes my physical condition to deteriorate. It passes. Are you going to wait with me?"',
        responses: {
          kind: ["Wrap your scarf around him", "Offer to get Yuri"],
          playful: ["Ask if 'fine' is a diagnosis", "Ask for a second opinion"],
          bold: ["Tell him to warm up first", "Make him stand by the heater"],
          neutral: ["Give him a minute", "Wait for it to pass"],
        },
      },
      {
        line: '"You\'ve skipped too many appointments," he says. "It\'s been a long time since your last check up."',
        approach: "Say you're here now",
        greeting:
          '"I suppose I\'ll have to re-examine you. Please roll your sleeve and sit here."',
        responses: {
          kind: ["Say you'll stop skipping", "Hold out your wrist"],
          playful: ["Ask if he missed you", "Blame your busy schedule"],
          bold: [
            "Tell him to check everything",
            "Say you missed the check-ups",
          ],
          neutral: ["Roll up your sleeve", "Apologize for the gap"],
        },
      },
      {
        line: '"Your face looks terrible," he says, without softening it at all. "Come here and inhale this. Mild smelling salts."',
        approach: "Match his bluntness",
        greeting:
          "\"I'm aware. Mine always looks like this. Yours usually doesn't.\"",
        responses: {
          kind: ["Sit down, no argument", "Inhale the salts"],
          playful: ["Ask if it's that bad", "Sniff once, make a face"],
          bold: ["Ask how terrible exactly", "Tell him you haven't slept"],
          neutral: ["Sit where he points", "Take one breath of it"],
        },
      },
      {
        line: '"I\'m going to see some flowers on Yuri\'s orders," he says, pulling on his gloves. "Do you want to come?"',
        approach: "Ask what kind of flowers",
        greeting: '"I\'ll be harvesting mandrakes."',
        responses: {
          kind: ["Say you'll come along", "Ask if he's up for the walk"],
          playful: ["Ask if flowers count as work", "Ask if he likes flowers"],
          bold: ["Say you'll dig beside him", "Say you were hoping he'd ask"],
          neutral: ["Agree to come", "Ask where they grow"],
        },
      },
      {
        line: 'You hold out a rice ball. He studies it the way he studies a sample. "I suppose I might be able to eat some of it."',
        approach: "Watch him try it",
        greeting:
          "\"...Two bites. That's more than yesterday. You don't have to look so pleased.\"",
        responses: {
          kind: ["Tell him to take his time", "Say two bites is progress"],
          playful: ["Count the bites out loud", "Cheer for a third bite"],
          bold: ["Say you made it for him", "Say you'll feed him the rest"],
          neutral: ["Watch him eat", "Let him eat in peace"],
        },
      },
      {
        line: 'He stops at the door on his way out, smiling stiffly. "See you tomorrow."',
        approach: "Notice the smile",
        greeting:
          '"...What? You\'re the one who told me I should say that while smiling."',
        responses: {
          kind: ["Say he did it right", "Say see you tomorrow back"],
          playful: ["Smile back just as stiffly", "Ask if it hurts to smile"],
          bold: ["Say it suits him", "Tell him to keep practicing"],
          neutral: ["Wave him off", "Nod goodnight"],
        },
      },
      {
        line: "His phone buzzes. \"Oh, Yuri's calling me. It'll be annoying if I pick up.\"",
        approach: "Ask if he should answer",
        greeting: "\"I'll just ignore it until you're ready.\"",
        responses: {
          kind: ["Ask if it's his treatment", "Say you'll be quick"],
          playful: ["Ask how many he's ignored", "Ask what Yuri wants"],
          bold: ["Tell him to pick up", "Say you'll wait while he does"],
          neutral: ["Let it ring", "Wait for it to stop"],
        },
      },
      {
        line: 'You bring up his birthday. "Whose birthday? Oh, mine? I forgot."',
        approach: "Ask how he forgot",
        greeting: '"Did Yuri leak my medical records?"',
        responses: {
          kind: ["Say you'll remember it for him", "Ask what he'd like"],
          playful: ["Blame Yuri for the leak", "Say it's your business now"],
          bold: ["Say it's on his chart", "Say you'll celebrate it"],
          neutral: ["Say it came up", "Let it go"],
        },
      },
      {
        line: '"I found an anomalous plant that only grows in extreme cold," he says, "and successfully created a medication with it."',
        approach: "Ask how he managed it",
        greeting: '"It was just a coincidence though."',
        responses: {
          kind: ["Ask if it'll help him", "Say it's impressive work"],
          playful: ["Ask if it tastes awful", "Ask what it cures"],
          bold: ["Say he earned that one", "Give him the credit"],
          neutral: ["Listen to him explain", "Nod at the result"],
        },
      },
      {
        line: "He's left a mug of herbal tea by your usual seat, unasked. It smells bitter.",
        approach: "Drink it without asking",
        greeting:
          '"I brewed it. Tea is most of what I can keep down, so I\'ve had the practice. Please drink all of it."',
        responses: {
          kind: ["Drink all of it", "Say it's the best tea"],
          playful: ["Ask what's actually in it", "Wince at the first sip"],
          bold: ["Make him drink one too", "Finish it in one go"],
          neutral: ["Drink half of it", "Sip it slowly"],
        },
      },
      {
        line: '"Yuri says I\'m playing favorites with your check-ups," he says. "I told him it was an unproductive discussion."',
        approach: "Ask if Yuri's right",
        greeting:
          '"Your check-ups do take longer. I hadn\'t thought about why. ...Is that what playing favorites is?"',
        responses: {
          kind: ["Say he can take his time", "Help him figure it out"],
          playful: ["Ask who's keeping score", "Ask if Yuri timed them"],
          bold: ["Say Yuri's right", "Say you're his favorite"],
          neutral: ["Stay out of it", "Let him work it out"],
        },
      },
      {
        line: "Your check-ups are in his log as always. Lately there's a second kind of entry under your name.",
        approach: "Ask what the new entry is",
        greeting:
          "\"'Visit.' For when you come by and nothing's wrong with you. There wasn't a better category.\"",
        responses: {
          kind: ["Say 'visit' sounds right", "Say you'll visit more"],
          playful: ["Suggest a better category", "Ask how many visits so far"],
          bold: ["Say you come for him", "Say check-ups were visits too"],
          neutral: ["Leave the log alone", "Accept the category"],
        },
      },
      {
        line: '"You haven\'t eaten in front of me lately," he says. "I\'ve noticed."',
        approach: "Ask how he noticed",
        greeting:
          '"I can barely eat, so I notice when other people skip it. You don\'t have to mind me. Go ahead and eat."',
        responses: {
          kind: ["Eat while he has his tea", "Ask if he'll have tea with you"],
          playful: ["Ask if he's been counting", "Ask if this is a check-up"],
          bold: ["Say you'll feed him", "Share your lunch with him"],
          neutral: ["Take out your lunch", "Start eating"],
        },
      },
      {
        line: "Jiro's drip is set up and waiting, but Yuri has fallen asleep at his desk. Jiro moves around him without a sound and doesn't wake him.",
        // A hushed, tender moment: honoring his care for Yuri lands, digging into it doesn't.
        mood: true,
        approach: "Ask if he needs Yuri awake",
        greeting:
          "\"My treatment is due. It can wait an hour. He won't rest if I ask him to, so I've stopped asking.\"",
        responses: {
          kind: ["Wait the hour with him", "Brew the tea while you wait"],
          playful: ["Ask if Yuri snores", "Ask who's the patient now"],
          bold: [
            "Say his treatment can't wait",
            "Say you'll wake Yuri in time",
          ],
          neutral: ["Let Yuri sleep", "Keep your voice down"],
        },
      },
    ],
    spark: [
      {
        line: "He tilts your chin to check something, and the examination stops being one.",
        approach: "Hold still",
        greeting:
          "\"Hold still. ...I've forgotten what I was checking. That hasn't happened before.\"",
        responses: {
          kind: ["Let him take your pulse", "Let him take his time"],
          playful: ["Fluff the pulse count", "Remind him, wrongly"],
          bold: ["Say you've forgotten too", "Say he wasn't checking"],
          neutral: ["Let it stay a diagnosis", "Stay perfectly still"],
        },
      },
      {
        line: '"Pulse is elevated," he notes, with his fingers still on your wrist. "Interesting."',
        approach: "Confirm it",
        greeting:
          "\"Then it isn't the cuff, or the walk over. I'll write down the real cause.\"",
        responses: {
          kind: ["Hold still for the count", "Admit it's because of him"],
          playful: ["Ask what else he's confirming", "Ask what he'll write"],
          bold: ["Say it's him, not the walk", "Tell him to write it down"],
          neutral: ["Keep your wrist still", "Let him write in silence"],
        },
      },
      {
        line: "He sets the stethoscope around his neck and doesn't reach for it. The bedside manner has gone somewhere else entirely.",
        approach: "Sit on the table",
        greeting:
          '"Thank you. I\'m going to listen to your heart now. ...You can stop holding your breath."',
        responses: {
          kind: ["Let him have the moment", "Let out the breath"],
          playful: ["Take the clipboard away", "Ask what your heart says"],
          bold: ["Close the distance yourself", "Pull him closer to listen"],
          neutral: ["Sit back down", "Breathe slowly for him"],
        },
      },
      {
        line: '"I\'m aware this isn\'t an examination anymore," he says, unhurried. "I\'m not stopping."',
        approach: "Let him continue",
        greeting:
          '"Tell me if you want me to stop. I\'d rather have the data than guess."',
        responses: {
          kind: ["Nod for him to go on", "Say you don't want him to"],
          playful: ["Dare him to keep going", "Say you'll let him know"],
          bold: ["Close the last inch", "Tell him not to stop"],
          neutral: ["Say nothing", "Answer with a nod"],
        },
      },
      {
        line: "He stands close enough that the clipboard is doing nothing but occupying his hands.",
        approach: "Let him relax",
        greeting:
          "\"I don't know what to do with my hands when I'm not examining you. That's new.\"",
        responses: {
          kind: ["Tell him it's alright", "Guide his hand"],
          playful: ["Offer him your wrist", "Suggest he examine you"],
          bold: ["Take his hands in yours", "Put his hand on your cheek"],
          neutral: ["Let the silence answer", "Stay close to him"],
        },
      },
    ],
    close: [
      {
        line: 'He steps closer, his eyes direct. "If I lost you it would be a significant problem. Factor that in."',
        approach: "Say the true thing",
        greeting:
          '"Thank you. I remember most things once. I\'ll remember that one on purpose."',
        responses: {
          kind: ["Say you feel the same", "Say it again for him"],
          playful: ["Ask for the math on that", "Ask if he'll quiz you on it"],
          bold: ["Match his bluntness", "Give him more to remember"],
          neutral: ["Let the statement land quietly", "Let the moment settle"],
        },
      },
      {
        line: "He checks you over without being asked, and doesn't pretend it's professional.",
        approach: "Let him check you over",
        greeting:
          "\"Come here. Let me see. ...You're fine. I'm going to check again anyway.\"",
        responses: {
          kind: ["Let him take care of you", "Let him check twice"],
          playful: ["Poke at his bedside manner", "Ask for a third opinion"],
          bold: ["Let him worry, say so", "Say you'll check him too"],
          neutral: ["Sit through the examination", "Hold still for round two"],
        },
      },
      {
        line: '"Tell me where it hurts," he says. He doesn\'t mean physically.',
        approach: "Tell him where it hurts",
        greeting:
          "\"I can't prescribe anything for that. I'll stay instead. That's the treatment.\"",
        responses: {
          kind: ["Say it hurts less now", "Say the treatment's working"],
          playful: [
            "Deflect with a joke first",
            "Ask how long treatment lasts",
          ],
          bold: ["Ask where it hurts for him", "Tell him to stay all night"],
          neutral: ["Be patient with his silence", "Lean on him quietly"],
        },
      },
      {
        line: "The efficiency drops. What's underneath is warm, and stubbornly protective.",
        approach: "See what's underneath",
        greeting:
          '"If something happens to you, I\'m the one who has to fix it. So nothing is going to happen to you."',
        responses: {
          kind: ["Let him look after you", "Promise to be careful"],
          playful: ["Diagnose him right back", "Ask if that's a prescription"],
          bold: ["Ask him to stop working", "Say the same goes for him"],
          neutral: ["Let the ward go quiet", "Let the promise stand"],
        },
      },
      {
        line: "He's stopped triaging the room. There's just you, and the focus he usually reserves for a chart.",
        approach: "Go to him",
        greeting:
          "\"You're the one case I wouldn't hand off to Yuri. He'd only experiment on you.\"",
        responses: {
          kind: ["Tell him plainly he matters", "Say you trust only him"],
          playful: ["Tease him in front of the ward", "Ask what Yuri would do"],
          bold: ["Say you're the only case", "Tell him to never hand off"],
          neutral: ["Let him focus on you", "Stay under his care"],
        },
      },
    ],
    bound: [
      {
        line: "He's blunt about wanting you, which turns out to be extraordinarily effective.",
        approach: "Give him that look",
        greeting:
          '"You\'re looking at me like that again. I looked it up. I know what it means now."',
        responses: {
          kind: ["Let him have the moment", "Ask what he found out"],
          playful: ["Give him the look on purpose", "Ask for his sources"],
          bold: ["Meet the bluntness in kind", "Tell him to act on it"],
          neutral: ["Say nothing", "Keep looking at him"],
        },
      },
      {
        line: "He pins your chart to the board, then pins you to the door. Efficient, as ever.",
        approach: "Lock the door",
        greeting:
          "\"If Yuri calls for me, I'm not answering. It's annoying when I do.\"",
        responses: {
          kind: ["Let him lock it", "Tell him Yuri can wait"],
          playful: ["Steal the clipboard", "Cover his ears for him"],
          bold: ["Lock the door yourself", "Tell Yuri he's busy"],
          neutral: ["Wait against the door", "Let Yuri keep calling"],
        },
      },
      {
        line: '"I don\'t waste time," he says against your jaw. "You should know that by now."',
        approach: "Come closer",
        greeting:
          '"Closer. I can still see the floor between us. That\'s inefficient."',
        responses: {
          kind: ["Let him have this", "Step in close"],
          playful: ["Diagnose him back", "Leave an inch, to tease"],
          bold: ["Pull him in by the coat", "Close the gap entirely"],
          neutral: ["Let it happen quietly", "Let him close it"],
        },
      },
      {
        line: '"I wanted this before I should have," he says, matter-of-fact. "Poor professional conduct. I\'ve made peace with it."',
        approach: "Call it worth it",
        greeting: '"I love you. That\'s the diagnosis. Treatment is ongoing."',
        responses: {
          kind: ["Say it back plainly", "Say you love him too"],
          playful: ["Ask about the treatment", "Ask for a second opinion"],
          bold: ["Tell him not to be patient", "Say the treatment's forever"],
          neutral: ["Sit on the table quietly", "Hold his hand quietly"],
        },
      },
      {
        line: "He checks you over every morning. It stopped being medical a long time ago.",
        approach: "Stay",
        greeting:
          "\"It's been a long time since I had a family. I don't know what you're supposed to do in the mornings. Could you teach me?\"",
        responses: {
          kind: ["Say you'll teach him", "Say you'll learn it together"],
          playful: ["Ask for a longer checkup", "Say lesson one is breakfast"],
          bold: ["Show him, starting now", "Kiss him good morning"],
          neutral: ["Stay for the checkup", "Say you'll work it out"],
        },
      },
    ],
  },
  // When the old per-tier `responses` pool was folded onto the beats above,
  // two labels had no genuine beat match ("Tell him to sleep too", "Let him
  // check you over") and were dropped rather than force-placed.
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Symptoms or errand." **{name}** doesn\'t slow down for {user}. "Pick one."',
      '{user} says hello, and **{name}** tugs his mask down to answer. "Yes. Do you need something treated?"',
      "\"Don't ask what's in the cooler,\" **{name}** tells {user}, and keeps walking toward the lab.",
      '"Hm." **{name}** looks {user} over the way he\'d read a chart. "Your color\'s fine. So what is it?"',
    ],
    known: [
      '"Your color\'s better than last week." **{name}** tells {user} this before hello.',
      '{user} runs into **{name}**, who stops. "I was about to come find you for a check-up. This saves me a trip."',
      "Someone down the hall bolts at the sight of **{name}**. \"That's rude, isn't it?\" he asks {user}.",
    ],
    warm: [
      "**{name}** stops for {user}, then waits until they fall into step beside him.",
      '"Could you slow down? You\'re pale, and your balance is off." **{name}** has been watching how {user} walks.',
      '{user} calls out, and **{name}** turns around. "I was on my way to a patient. I suppose they can wait a minute."',
    ],
    spark: [
      "**{name}** looks at {user} a full second longer than any diagnosis requires.",
      '"When did you last sleep?" **{name}** asks {user}. "Don\'t lie. I\'ll know."',
      "{user} calls his name, and **{name}** files that somewhere he doesn't file work.",
    ],
    close: [
      '"I don\'t waste time," **{name}** says, reaching {user} in about four strides.',
      "**{name}** hears {user} and hands the **{house}** chart to whoever is nearest.",
      "{user} calls, and **{name}** is abruptly off shift.",
    ],
    bound: [
      '"That\'s the diagnosis," **{name}** tells {user}. "Treatment is ongoing."',
      '**{name}** smiles at {user}, on purpose this time. "You told me to practice."',
      "{user} calls his name, and **{name}** lets Yuri shout for him. Let him shout.",
    ],
  },
};
