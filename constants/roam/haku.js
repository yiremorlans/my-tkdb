// /roam beats for this character, keyed by tier:
// { line, approach, greeting, responses, mood? }, the same shape as constants/dialogue/haku.js.
// A tier listed here replaces dialogue.<tier> in constants/dialogue/haku.js for
// /roam; a tier left out still draws dialogue.<tier>. See constants/roam/index.js.
export default {
  new: [
    {
      line: "He's already changed course toward you, hands in his pockets, eyes narrowing like he can guess why you're here.",
      approach: "Meet his look",
      greeting:
        "\"What are you doing here? Don't tell me you've gotten yourself mixed up in something.\"",
      responses: {
        kind: ["Say you'll be careful", "Promise you're keeping clear"],
        playful: ["Say not yet, give it time", "Say trouble found you"],
        bold: ["Say he was your first stop", "Say he's in it now too"],
        neutral: ["Shrug, say nothing", "Ask what he means"],
      },
    },
    {
      line: "He's been walking the same way you are for a while now, and he hasn't once let you get more than a few steps ahead.",
      approach: "Walk with him",
      greeting:
        "\"Don't mind me. Curses draw attention, and not the friendly kind. I'll stick around till they lose interest.\"",
      responses: {
        kind: ["Say you're glad of the company", "Stay close to him"],
        playful: ["Ask whose attention, exactly", "Ask if a fox spirit's out"],
        bold: ["Walk a step ahead of him", "Say they can take a number"],
        neutral: ["Let him walk, say nothing", "Fall into step quietly"],
      },
    },
    {
      line: "Footsteps have been keeping pace a few steps behind you for a while now, light and in no hurry.",
      approach: "Turn around",
      greeting:
        "\"Boo! Ha ha, didn't think you'd get that scared. I was just getting rid of the shadow imp stuck to your back... I'm kidding! There was nothing there, I promise.\"",
      responses: {
        kind: ["Ask if the imp's gone for good", "Say you'll trust he got it"],
        playful: ["Say you nearly screamed", "Ask if imps pay rent"],
        bold: ["Say it takes more than that", "Ask him to prove it's gone"],
        neutral: ["Catch your breath", "Brush off your back"],
      },
    },
    {
      line: "He's heading off at an easy pace, but he slows when he sees you coming.",
      approach: "Ask if he has a minute",
      greeting:
        "\"Today doesn't really work for me... I'm going to be getting back to the dorm pretty late, so can we do tomorrow instead?\"",
      responses: {
        kind: ["Say tomorrow works fine", "Tell him it's not urgent"],
        playful: ["Ask if he's double-booked", "Ask if tomorrow's a promise"],
        bold: ["Say you'll find him tomorrow", "Say he owes you one now"],
        neutral: ["Say it can wait", "Let him go"],
      },
    },
    {
      line: "Somewhere nearby, a biwa is playing. He's heading toward it like someone who's been sent to deal with it.",
      approach: "Ask where he's headed",
      greeting:
        "\"You can hear the biwa, right? He's been going for three hours now. People are going to start getting pissed off, so I'll go tell him to stop soon.\"",
      responses: {
        kind: ["Have him pass on a compliment", "Say you'll wait till he's back"],
        playful: ["Say three hours is dedication", "Ask if he'll request a song"],
        bold: ["Say you'll ask for one more", "Say you'll go with him"],
        neutral: ["Let him get back to it", "Wish him luck"],
      },
    },
  ],
};
