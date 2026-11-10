// /meet beats for this character, keyed by tier: { line, responses, mood? },
// the line spoken on its own (/meet renders no approach or greeting).
// A tier listed here replaces dialogue.<tier> in constants/dialogue/jo.js for
// /meet; a tier left out still draws the shared pool. See constants/meet/index.js.
// Written once in the uniform voice with {he}/{him}/{his} tokens;
// withPronounVariants expands each tier into { uniform, casual }.
import { withPronounVariants } from "../dialogue/_shared.js";

export default {
  new: withPronounVariants([
    {
      line: "Anything troubling you? If you run into any problems, just come talk to me.",
      responses: {
        kind: [
          "Say you'll take {him} up on it",
          "Ask when {he}'s free to talk",
        ],
        playful: [
          "Ask if {he} takes complaints",
          "Ask if that goes for everyone",
        ],
        bold: ["Say you'll come by anyway", "Ask what counts as a problem"],
        neutral: ["Say nothing's wrong yet", "Ask who {he} is"],
      },
    },
    {
      line: "Need something? Take your time. Everyone here moves at their own pace.",
      responses: {
        kind: ["Say you'll keep it quick", "Ask if {he} ever slows down"],
        playful: ["Ask what {his} pace is", "Ask if strolling counts"],
        bold: ["Say you'll match {his} pace", "Say you know what you need"],
        neutral: ["Take a moment to think", "Say it's just a question"],
      },
    },
    {
      line: "Give me a second to put this schedule down, and then you've got my full attention. What's going on?",
      responses: {
        kind: ["Say {he} can finish first", "Ask how full the schedule is"],
        playful: [
          "Say nothing's on fire, promise",
          "Say it's good news for once",
        ],
        bold: ["Get right to it", "Ask for all of it, then"],
        neutral: ["Wait for {him} to finish", "Ask if it's a bad time"],
      },
    },
    {
      line: "From the moment the curtain rises, our show begins. That's why we have to make sure we're prepared every single day.",
      responses: {
        kind: ["Offer to help {him} prepare", "Ask how {he} finds the time"],
        playful: ["Ask for a front-row seat", "Ask if you need a ticket"],
        bold: ["Say you'll come see the show", "Ask to see a rehearsal"],
        neutral: ["Say you'll keep that in mind", "Say it sounds like a lot"],
      },
    },
    {
      line: "The kids at this academy are all so unique. You can't handle them the usual way. You're one of the new ones, aren't you?",
      responses: {
        kind: [
          "Ask how {he} keeps up with them",
          "Say they're lucky to have {him}",
        ],
        playful: ["Ask how you'd be handled", "Ask if you count as unique"],
        bold: ["Say you're one of them now", "Ask what the unusual way is"],
        neutral: ["Nod and say you're new", "Give {him} your name"],
      },
    },
  ]),
  known: withPronounVariants([
    {
      line: "You keep up with the chaos better than half my own house does.",
      responses: {
        kind: ["Say {he} makes it look easy", "Say you learned from {him}"],
        playful: ["Take a little bow", "Ask if you're hired, then"],
        bold: ["Offer to be {his} backup", "Say {he} isn't alone in it"],
        neutral: ["Say it's not that hard", "Shrug off the praise"],
      },
    },
    {
      line: "Shion again. I'll go apologize. That's the dorm captain's job. Not the first time this week.",
      responses: {
        kind: ["Say you'll wait up for {him}", "Offer to keep an eye on Shion"],
        playful: ["Ask if apologies come in bulk", "Offer to keep the tally"],
        bold: ["Say you'll walk {him} back", "Say you're coming with {him}"],
        neutral: ["Ask where Shion is now", "Ask who's getting the apology"],
      },
    },
    {
      line: "You're here again. I'm starting to expect it, which is dangerous for my schedule.",
      responses: {
        kind: [
          "Offer to come when {he}'s free",
          "Say {he} could use the break",
        ],
        playful: ["Promise to be a menace", "Ask to be penciled in"],
        bold: [
          "Say you're {his} scheduled break",
          "Tell {him} to get used to it",
        ],
        neutral: ["Say you were passing by", "Say you won't stay long"],
      },
    },
    {
      line: "Things are pretty busy today too, but... let's do our best, without overdoing it.",
      responses: {
        kind: [
          "Offer to split the day's load",
          "Say you'll check on {him} later",
        ],
        playful: [
          "Say you'll do your second best",
          "Ask what counts as overdoing",
        ],
        bold: [
          "Hold {him} to the second part",
          "Say you'll make sure {he} won't",
        ],
        neutral: ["Ask what's on today", "Agree to pace yourself"],
      },
    },
    {
      line: "Good work today. Take everything, the good and the bad, and turn it into fuel for yourself.",
      responses: {
        kind: ["Ask how {his} day went", "Say {he} earned some rest too"],
        playful: ["Ask if snacks count as fuel", "Ask for a good-work sticker"],
        bold: ["Say {he} did better than good", "Say the good part was {him}"],
        neutral: ["Say you'll try", "Ask what {he} means by fuel"],
      },
    },
    {
      line: "Where am I from? Kyushu. You'd think it'd be warm, but my hometown's up in the mountains. It even snowed there sometimes.",
      responses: {
        kind: ["Ask if {he} misses it", "Ask if {he} gets home often"],
        playful: [
          "Ask if {he} skied to school",
          "Dare {him} to a snowball fight",
        ],
        bold: ["Say you'd love to go with {him}", "Say {he} owes you a tour"],
        neutral: ["Say you didn't know that", "Ask where in Kyushu"],
      },
    },
    {
      line: "My ideal night off is catching up on TV shows. When I'm busy, though, I can only fit in one episode.",
      responses: {
        kind: ["Say {he}'s earned a binge", "Ask for {his} watch list"],
        playful: [
          "Say yours is doing nothing",
          "Say yours is a horror marathon",
        ],
        bold: [
          "Say that's your night off too",
          "Say you'd catch up with {him}",
        ],
        neutral: ["Ask what show it is", "Say one sounds sensible"],
      },
    },
    {
      line: "Hungry? How about jjigae? Extra capsaicin, to wake things up.",
      responses: {
        kind: ["Offer to make it with {him}", "Offer to do the dishes after"],
        playful: ["Ask how much extra", "Ask if you'll survive it"],
        bold: [
          "Say you like it extra spicy",
          "Say you'll treat {him} next time",
        ],
        neutral: ["Say jjigae sounds good", "Ask for a milder bowl"],
      },
    },
    {
      line: "I picked up a heated humidifier for the house. It boils the water first, so the steam's cleaner.",
      responses: {
        kind: ["Offer to help set it up", "Say {he} thinks of everyone"],
        playful: ["Ask if it has a name yet", "Ask if it came with a warranty"],
        bold: [
          "Say {he} needs one of {his} own",
          "Say the house should chip in",
        ],
        neutral: ["Ask if it's loud", "Nod at the explanation"],
      },
    },
    {
      line: "I just saw Shion run off with Mio, saying he was going to build a skate rink in Dionysia... I've got a bad feeling about this.",
      responses: {
        kind: [
          "Offer to check on it with {him}",
          "Say {he} deserves a quiet night",
        ],
        playful: ["Ask if there'll be an ice show", "Say you'll test it first"],
        bold: ["Say Mio can handle it", "Say {he} can't save everyone"],
        neutral: ["Ask how big a rink", "Ask what Mio said"],
      },
    },
  ]),
  warm: withPronounVariants([
    {
      line: "Proposal, schedule, program, budget... and yet here I am, making time for you.",
      responses: {
        kind: ["Say you're glad {he} did", "Say it means a lot"],
        playful: [
          "Ask if you outrank the budget",
          "Ask where you fit on the list",
        ],
        bold: ["Say you'll make it worth it", "Tell {him} the budget can wait"],
        neutral: ["Say you'll keep it short", "Sit down with {him}"],
      },
    },
    {
      line: "Long day? Sit. I'll deal with the rest of this later, for once.",
      responses: {
        kind: ["Say {he}'s earned the break", "Ask how {his} day went"],
        playful: ["Ask what 'the rest' is", "Hold {him} to 'for once'"],
        bold: ["Say once isn't enough", "Say 'later' means tomorrow"],
        neutral: ["Say it's been a long one", "Take the seat offered"],
      },
    },
    {
      line: "You stayed up last night. Don't lie to me, cutie, I can hear it in your voice. I'll make you some honey tea.",
      responses: {
        kind: ["Say {he} notices everything", "Say {he}'s always thoughtful"],
        playful: ["Ask for extra honey", "Ask how {he} can hear it"],
        bold: ["Say {he} stayed up too", "Say {he}'s one to talk"],
        neutral: ["Wait for the tea", "Clear your throat"],
      },
    },
    {
      line: "Mio and I have another leadership meeting in a bit. ...Do you think we take on too much? It's just faster to handle things ourselves.",
      responses: {
        kind: ["Offer a second pair of hands", "Ask what you can take on"],
        playful: ["Ask if 'we' includes you", "Ask if Mio says the same"],
        bold: ["Say the house can pitch in", "Say faster isn't always better"],
        neutral: ["Let {him} talk it through", "Say it does sound like a lot"],
      },
    },
    {
      line: "Where are you off to at this hour? ...No. Whatever it is keeps until tomorrow. I'm walking you back.",
      responses: {
        kind: [
          "Say you're glad {he} caught you",
          "Thank {him} for looking out",
        ],
        playful: [
          "Ask if {he} tucks you in too",
          "Ask if this is a service now",
        ],
        bold: ["Ask who walks {him} back", "Say only if {he} sleeps too"],
        neutral: ["Walk back beside {him}", "Let the errand wait"],
      },
    },
    {
      line: "I jog every morning before the house is awake. It clears my head, and the work goes faster after. I'd recommend it to you.",
      responses: {
        kind: ["Say you'll give it a try", "Say it clearly works for {him}"],
        playful: ["Doubt you'd survive it", "Ask if walking counts"],
        bold: ["Say {he} needs more than that", "Say you'd like to join {him}"],
        neutral: ["Say you're no morning person", "Say you'll consider it"],
      },
    },
    {
      line: "Gathering research for new costumes. Tedious work, but the result is worth it. Want to see what I've got so far?",
      responses: {
        kind: ["Say it's impressive work", "Say {he}'s been thorough"],
        playful: ["Ask to model one yourself", "Suggest something outrageous"],
        bold: ["Say which one you'd cut", "Pick the best one for {him}"],
        neutral: ["Look it over in quiet", "Read through the notes"],
      },
    },
    {
      line: "Bread's still warm. I bake for the house before anyone's up, and today the first slice is yours.",
      responses: {
        kind: ["Save {him} half the slice", "Say it smells amazing"],
        playful: ["Ask for the second slice", "Ask if the house will mind"],
        bold: ["Ask who usually gets first", "Say {he} should take one too"],
        neutral: ["Ask what kind of bread it is", "Eat it where you stand"],
      },
    },
    {
      line: "Everyone in this house needs something from me. You're the only one who turns up without asking for anything. ...I've started looking forward to that.",
      mood: true,
      responses: {
        kind: [
          "Say you came to check on {him}",
          "Say you look forward to it too",
        ],
        playful: [
          "Say you'll think of a request",
          "Ask if snacks count as asking",
        ],
        bold: ["Say it's {his} turn to ask", "Say you'll turn up more often"],
        neutral: ["Say you don't need anything", "Say it's nothing special"],
      },
    },
    {
      line: "Seems everyone on campus knows where to find me. ...Lucky for me, that includes you. What's going on?",
      responses: {
        kind: ["Say people see how {he} cares", "Say {he}'s worth seeking out"],
        playful: ["Ask if there's a waitlist", "Say you're next in line"],
        bold: ["Say {he} can come to you too", "Say {he}'s allowed to say no"],
        neutral: ["Say word does travel", "Let {him} get back to it"],
      },
    },
    {
      line: "It gets chilly once the sun goes down, and half the house went out without coats. ...I'll stop worrying in a minute.",
      responses: {
        kind: ["Ask if {he} brought {his}", "Say {he}'s sweet to worry"],
        playful: [
          "Ask who's getting a lecture",
          "Ask who'll come back sneezing",
        ],
        bold: ["Say they'll be fine", "Say you'll check on them"],
        neutral: ["Say it's getting chilly", "Ask who went out"],
      },
    },
    {
      line: "Elias and Shion still haven't gotten up. ...Sorry, could you go check on them for me?",
      responses: {
        kind: ["Say you'll go wake them", "Say you're happy to help"],
        playful: ["Offer to borrow Mio's alarm", "Ask who's harder to wake"],
        bold: ["Say you'll handle both", "Say they'll be up in five"],
        neutral: ["Say you'll go see", "Ask what to tell them"],
      },
    },
    {
      line: "Another small fire during rehearsal. I've told them again and again to be careful with the flames...",
      // He's frazzled, not his usual calm: firm backup lands better than soothing.
      mood: true,
      responses: {
        kind: ["Ask if {he}'s okay", "Say {he}'s done all {he} can"],
        playful: ["Ask if it was part of the act", "Ask who lit it this time"],
        bold: ["Say {he}'s right to be firm", "Say {he}'s not overreacting"],
        neutral: ["Ask how bad it was", "Let {him} vent"],
      },
    },
    {
      line: "Would you try on an outfit for the next show? I need to see it on someone before I commit. Got a little time later? I'll be waiting.",
      responses: {
        kind: ["Say you trust {his} eye", "Say you'd be glad to"],
        playful: ["Ask if it has sequins", "Ask what color it is"],
        bold: ["Say you'll come straight over", "Ask to try it on now"],
        neutral: ["Say you'll find the time", "Ask how long it'll take"],
      },
    },
  ]),
};
