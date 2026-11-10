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
  spark: withPronounVariants([
    {
      line: "The Aqua-line's empty this late. {He} didn't plan the drive for that, or so {he} claims.",
      responses: {
        kind: ["Say you prefer it this way", "Say you'd pick this too"],
        playful: ["Ask if {he} planned it", "Ask if {he} booked the road"],
        bold: ["Say you'd ride all night", "Ask {him} to skip the exit"],
        neutral: ["Ride along in silence", "Watch the lights go past"],
      },
    },
    {
      line: "There you are. You're always the first person I look for. It's a habit by now, cutie.",
      mood: true,
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
      line: "My whole week's been better because of you. ...I don't say things like that by accident.",
      responses: {
        kind: ["Say you feel the same", "Say yours has been too"],
        playful: ["Make {him} repeat it", "Ask what made it better"],
        bold: ["Say you'll make it every week", "Say you'll do it on purpose"],
        neutral: ["Let the moment pass", "Smile and let it be"],
      },
    },
    {
      line: "{He}'s stepping out for a walk to take a little break from work, wishing out loud that Dionysia had cherry blossoms.",
      responses: {
        kind: ["Say it's the break {he} needs", "Walk as long as {he} wants"],
        playful: [
          "Ask if you count as a view",
          "Ask if {he}'ll settle for you",
        ],
        bold: [
          "Take {his} arm on the way out",
          "Say you'll keep {him} out late",
        ],
        neutral: ["Fall into step beside {him}", "Follow {him} out"],
      },
    },
    {
      line: "Get some proper rest, and don't skip your bedtime routine. ...I've said that twice now, haven't I? ...Goodnight, cutie.",
      responses: {
        kind: ["Tell {him} to follow it too", "Tell {him} to get home safe"],
        playful: [
          "Ask what else is on the list",
          "Say a third time can't hurt",
        ],
        bold: ["Don't let {him} leave yet", "Catch {his} sleeve"],
        neutral: ["Let {him} say it once more", "Say goodnight back"],
      },
    },
    {
      line: "Today's tasks are done. There's a meeting about the next show, but I took the long way in case I ran into you.",
      responses: {
        kind: ["Say {he} earned a breather", "Walk {him} to the meeting"],
        playful: ["Ask how long the long way is", "Ask if you're on the way"],
        bold: ["Say the meeting can start late", "Say you'd hoped {he} would"],
        neutral: ["Wish {him} a short meeting", "Walk part of the way"],
      },
    },
    {
      line: "You think I work too much? ...When I'm working, I don't have to think about anything unnecessary. That's the honest answer. You're the first person I've told.",
      responses: {
        kind: ["Say {he} can stop around you", "Say you're glad {he} told you"],
        playful: [
          "Ask what counts as unnecessary",
          "Ask if you're on the list",
        ],
        bold: [
          "Say yes, {he} works too much",
          "Say you'll pull {him} out of it",
        ],
        neutral: ["Say you think so too", "Let the answer sit"],
      },
    },
    {
      line: "...Oh. Sorry, I was lost in thought. No, it's nothing serious. You were in it, if you have to know.",
      responses: {
        kind: ["Say you don't mind waiting", "Say {he} can tell you anytime"],
        playful: ["Ask if you behaved in it", "Ask for a rating out of ten"],
        bold: [
          "Ask what you were doing in it",
          "Say the real one's right here",
        ],
        neutral: ["Let the thought go", "Wait for {him} to come back"],
      },
    },
    {
      line: "This dress was made for you. I knew it the moment I saw the fabric. ...Hold still. ...I've checked this hem three times now, haven't I?",
      responses: {
        kind: ["Let {him} take {his} time", "Say there's no rush"],
        playful: ["Ask if it's about the dress", "Say you're keeping count"],
        bold: ["Ask for a fourth check", "Say you'll stand still longer"],
        neutral: ["Stand still, let it run long", "Hold still for {him}"],
      },
    },
    {
      line: "Most people on campus think there are two of me. You're one of the few who knows better. ...I like that it's you.",
      responses: {
        kind: [
          "Say the secret's safe with you",
          "Say you're glad it's you too",
        ],
        playful: ["Ask which of you does dishes", "Ask who gets the budget"],
        bold: ["Say you'd spot {him} anywhere", "Say it stays that way"],
        neutral: ["Nod and keep it quiet", "Say you hadn't thought of it"],
      },
    },
    {
      line: "My artifact's been in good form lately. Rui thinks it's the weather. I have my own theory, but I'm keeping it to myself for now.",
      responses: {
        kind: ["Say you're glad it holds up", "Ask if {he}'s in good form too"],
        playful: ["Guess the theory's you", "Ask if Rui's buying it"],
        bold: ["Ask to hear the theory", "Say you'll wait for it"],
        neutral: ["Ask what Rui would say", "Let {him} keep the theory"],
      },
    },
    {
      line: "Any trouble, you come to me first. Before Mio, before anyone. ...Humor me. I like being the one you come to.",
      responses: {
        kind: ["Say {he} can come to you too", "Ask who {he} goes to first"],
        playful: ["Ask if minor trouble counts", "Ask if gossip counts too"],
        bold: ["Make {him} promise the same", "Say {he}'s been first a while"],
        neutral: ["Say you'll keep it in mind", "Agree to the deal"],
      },
    },
    {
      line: "People bring me everything, but nobody asks about me. ...You did, once. I keep wondering why it stuck.",
      responses: {
        kind: ["Say you'll keep asking", "Ask how {he}'s doing now"],
        playful: ["Ask if you get points for it", "Say it was a good question"],
        bold: ["Say you really wanted to know", "Ask again, and wait for it"],
        neutral: ["Say it seemed fair to ask", "Let the question stand"],
      },
    },
    {
      line: "One snap and I'm in a different outfit. Quick change. ...I'd never try it on you without asking. I'm only a little tempted.",
      responses: {
        kind: ["Say you trust {him} with it", "Ask if it tires {him} out"],
        playful: ["Ask for something sparkly", "Ask if it works on pajamas"],
        bold: ["Tell {him} to go ahead and ask", "Say you might say yes"],
        neutral: ["Ask how it works", "Say it's a neat trick"],
      },
    },
    {
      line: "Show's in a few days. I'd like you there, front row. I perform better when I know where to look.",
      responses: {
        kind: ["Say you'll be there early", "Ask if {he}'s resting before it"],
        playful: ["Ask if there's a dress code", "Ask for a spoiler"],
        bold: ["Ask {him} to save you a seat", "Say you'll be looking back"],
        neutral: ["Say you'll try to make it", "Ask what the show is"],
      },
    },
    {
      line: "Who were you talking to just now? ...Forget it. That wasn't a captain's question.",
      // He's caught himself jealous: a straight answer lands better than reassurance.
      mood: true,
      responses: {
        kind: ["Say it was nobody important", "Tell {him} not to worry"],
        playful: ["Ask if {he}'s jealous", "Say you'll never tell"],
        bold: ["Say {he} can ask that", "Say you came here for {him}"],
        neutral: ["Tell {him} who it was", "Let it go"],
      },
    },
    {
      line: "Need a ride anywhere? I'm taking the car out anyway. ...I'm not, actually. I'll take it out if you say yes.",
      responses: {
        kind: ["Say yes, if {he}'s free", "Say you'll keep {him} company"],
        playful: ["Ask where you'd even go", "Ask if you get the radio"],
        bold: ["Say yes before {he} rethinks", "Say you'll pick the place"],
        neutral: ["Say a ride sounds nice", "Ask how far {he}'d go"],
      },
    },
    {
      line: "I can't hear your applause, cutie. A whole room was clapping for me earlier, and yours is the only one I was listening for.",
      responses: {
        kind: ["Clap just for {him}", "Say {he} earned every bit"],
        playful: ["Give one slow clap", "Ask for an encore first"],
        bold: ["Say you were watching only {him}", "Say you'll clap up close"],
        neutral: ["Clap along anyway", "Say it was a good show"],
      },
    },
    {
      line: "There's a bath oil I swear by. I want you to try it. ...I know that's a strange thing to want, so don't make it weird.",
      responses: {
        kind: ["Ask if {he} takes time for it", "Say you'll try it soon"],
        playful: ["Make it a little weird", "Ask if it smells like {him}"],
        bold: ["Say it's not strange at all", "Ask for {his} whole routine"],
        neutral: ["Say you'll give it a go", "Ask what's in it"],
      },
    },
    {
      line: "I've started doing HIIT on my breaks. Before you say it, yes, I know. ...You could always come make me stop.",
      responses: {
        kind: [
          "Say you'll come make {him} stop",
          "Ask when {he} actually rests",
        ],
        playful: ["Offer to time {his} sets", "Ask if you can join one"],
        bold: ["Say you'll pull {him} off it", "Say breaks are for resting"],
        neutral: ["Ask what HIIT is", "Say it sounds intense"],
      },
    },
    {
      line: "The house keeps asking where I disappear to in the evenings. I keep saying rehearsal. ...It isn't rehearsal.",
      responses: {
        kind: ["Say {he}'s earned the break", "Say you'll keep the secret"],
        playful: ["Offer to be {his} alibi", "Ask what you're rehearsing"],
        bold: ["Say {he} can tell them", "Tell {him} to keep coming"],
        neutral: ["Let the cover story stand", "Say rehearsal sounds fine"],
      },
    },
    {
      line: "I meant to invite just you. Somehow half the house found out and invited themselves. ...Next time I'm keeping it quiet.",
      responses: {
        kind: ["Say you'll go either way", "Say the house adores {him}"],
        playful: ["Ask who spilled it", "Ask if Shion's coming"],
        bold: ["Hold {him} to next time", "Say you'll keep it quiet too"],
        neutral: ["Say the more the merrier", "Ask where you're all going"],
      },
    },
  ]),
  close: withPronounVariants([
    {
      line: "Ask me to stop working and I will. That's how much you have.",
      responses: {
        kind: ["Ask {him} to stop for you", "Tell {him} to share the burden"],
        playful: ["Test it: ask {him} to stop", "Ask how much is 'that much'"],
        bold: ["Say stop, then. Right now", "Tell {him} it runs itself"],
        neutral: ["Say you'll remember that", "Let {him} keep working"],
      },
    },
    {
      line: "Sit with me a while after the work's put away. It's my favorite part of the day now.",
      responses: {
        kind: ["Sit close and stay a while", "Say it's yours too"],
        playful: ["Ask what it used to be", "Ask if snacks are included"],
        bold: ["Say you'll make it longer", "Say you'll come by sooner"],
        neutral: ["Sit with {him} a while", "Let the quiet settle"],
      },
    },
    {
      line: "Every version of me is yours. That's not a line. I've checked.",
      responses: {
        kind: ["Say every version is enough", "Say you'd keep them all"],
        playful: ["Ask which version checked", "Ask for the full lineup"],
        bold: ["Say you never had a favorite", "Say you'll claim all of them"],
        neutral: ["Take {him} at {his} word", "Let {him} say it"],
      },
    },
    {
      line: "With you, I don't need to perform. I can just be myself.",
      responses: {
        kind: ["Say that's who you came for", "Let the quiet be enough"],
        playful: ["Ask if you're the whole show", "Tease {him} for going soft"],
        bold: ["Take {his} hand", "Say {he} never has to with you"],
        neutral: ["Stay quiet, let it be enough", "Let {him} be"],
      },
    },
    {
      line: "You looked at me tired and unglamorous and stayed anyway. Nobody else does that.",
      responses: {
        kind: ["See the tired under the charm", "Say you'd stay every time"],
        playful: [
          "Say unglamorous suits {him}",
          "Ask what counts as glamorous",
        ],
        bold: ["Say you'll keep staying", "Say you'd stay through worse"],
        neutral: ["Let the words sit", "Stay where you are"],
      },
    },
    {
      line: "I'm letting you fuss over me. Don't get used to it. ...Actually, do.",
      responses: {
        kind: ["Fuss over {him} anyway", "Ask what {he} needs right now"],
        playful: ["Fuss twice as hard", "Ask for that in writing"],
        bold: ["Say you're already used to it", "Tell {him} to lie back"],
        neutral: ["Keep fussing", "Let {him} relax"],
      },
    },
    {
      line: "I told Mio I'd be unreachable for an hour. He asked why. I didn't lie, cutie.",
      responses: {
        kind: ["Say you'll guard that hour", "Say {he} deserves more than one"],
        playful: ["Ask what Mio said", "Ask if Mio's jealous"],
        bold: ["Say make it two hours", "Say Mio can know all of it"],
        neutral: ["Ask what {he} told him", "Take the hour"],
      },
    },
    {
      line: "Say my name. Not 'captain'. Just my name. I want to hear how it sounds from you.",
      // He's asking for something for once: a bold answer lands better than a gentle one.
      mood: true,
      responses: {
        kind: ["Say {his} name, just for {him}", "Say it like a secret"],
        playful: ["Say 'captain' anyway", "Drag the name out"],
        bold: ["Say it like you mean it", "Make {him} say yours first"],
        neutral: ["Say {his} name", "Ask how it sounded"],
      },
    },
    {
      line: "Not now. ...Sorry. Not you. Everything else, but never you. Come here.",
      // He's frayed, not his usual calm: going straight to him lands better than asking.
      mood: true,
      responses: {
        kind: ["Ask what happened", "Take something off {his} plate"],
        playful: ["Ask if you're on thin ice", "Bring {him} a peace offering"],
        bold: ["Go to {him} right away", "Say {he}'s allowed a bad day"],
        neutral: ["Give {him} a moment", "Wait until {he}'s ready"],
      },
    },
    {
      line: "I made you something, and it isn't for a show. Just something to wear when I'm not around.",
      responses: {
        kind: ["Say you'll wear it every day", "Ask how long it took {him}"],
        playful: ["Model it for {him}", "Ask if it's one of a kind"],
        bold: ["Put it on right away", "Say {he}'ll see it plenty"],
        neutral: ["Look it over", "Hold it up for a look"],
      },
    },
    {
      line: "I stayed up waiting for you to text back. That's new for me. I don't usually wait on anyone.",
      responses: {
        kind: ["Say you'll text first", "Tell {him} to sleep anyway"],
        playful: ["Ask how often {he} checked", "Ask if {he} reread it"],
        bold: ["Say you'll call next time", "Say you were worth the wait"],
        neutral: ["Say you fell asleep", "Apologize for the wait"],
      },
    },
    {
      line: "Tell me about your day. Not the problems. The rest of it. I want to hear the rest.",
      responses: {
        kind: ["Tell {him} the best part", "Ask about {his} day too"],
        playful: ["Tell {him} something silly", "Rate your day out of ten"],
        bold: ["Say the best part is now", "Tell {him} all of it"],
        neutral: ["Share a small moment", "Say it was quiet"],
      },
    },
    {
      line: "Someday I'd like to take you home to Kyushu. It's up in the mountains, and it snows sometimes. I've never wanted to show it to anyone before.",
      responses: {
        kind: ["Say you'd love to see it", "Ask what {he} misses most"],
        playful: ["Ask if you'll need a coat", "Ask who you'd have to impress"],
        bold: ["Say pick the date", "Say you'll hold {him} to it"],
        neutral: ["Ask what it's like", "Say it sounds beautiful"],
      },
    },
    {
      line: "Lie down for ten minutes with me. I'll set an alarm. ...I won't, actually.",
      responses: {
        kind: ["Say {he} needs the rest", "Let {him} rest against you"],
        playful: ["Ask about minute eleven", "Ask if {he} snores"],
        bold: ["Say forget the alarm", "Say make it an hour"],
        neutral: ["Lie down for ten minutes", "Ask if {he}'s that tired"],
      },
    },
    {
      line: "Ask me for something. Anything. I keep waiting for you to want something from me.",
      responses: {
        kind: ["Ask {him} to take a day off", "Ask {him} to let you help"],
        playful: ["Ask for a magic trick", "Ask for a quick change"],
        bold: ["Ask for {his} whole evening", "Ask {him} to stay longer"],
        neutral: ["Say you have everything", "Say you'll think about it"],
      },
    },
    {
      line: "New lipstick. I picked the shade thinking of you. ...You can tell me if you like it. Up close, cutie.",
      responses: {
        kind: ["Say it suits {him}", "Say you like it a lot"],
        playful: ["Ask what it's called", "Ask if it's kiss-proof"],
        bold: ["Lean in for a closer look", "Say you'd rather test it"],
        neutral: ["Look at the color", "Say it's a nice shade"],
      },
    },
    {
      line: "Teach me something. You're always letting me teach you. I'd like to be bad at something with you for once.",
      responses: {
        kind: ["Teach {him} something small", "Say you'll go slow with {him}"],
        playful: ["Teach {him} a terrible dance", "Bet {he}'s a quick study"],
        bold: ["Pick something {he}'ll hate", "Say lessons start now"],
        neutral: ["Ask what {he}'d like to learn", "Think it over"],
      },
    },
    {
      line: "I bought a second toothbrush. It's purely practical. Stop smiling, cutie.",
      responses: {
        kind: ["Say you'll leave yours too", "Say it's very practical"],
        playful: ["Ask what color {he} picked", "Smile even wider"],
        bold: ["Say you'll start using it", "Keep smiling at {him}"],
        neutral: ["Say that is practical", "Try to stop smiling"],
      },
    },
    {
      line: "I kept the ticket from the first show you came to. It's in my planner. ...Don't make that face.",
      responses: {
        kind: ["Say you kept yours too", "Ask to see it"],
        playful: ["Ask what else is in there", "Make the face anyway"],
        bold: ["Promise {him} a hundred more", "Say {he} can't hide it now"],
        neutral: ["Ask which show it was", "Say that's sweet"],
      },
    },
    {
      line: "Stay for dinner. I'll cook. You can watch or you can help, but you're not leaving hungry.",
      responses: {
        kind: ["Say you'll help {him} cook", "Offer to do the dishes"],
        playful: ["Offer to taste everything", "Ask if you get an apron"],
        bold: ["Say you'll pick the dish", "Say you'll cook for {him} next"],
        neutral: ["Say you'll stay", "Ask what {he}'s making"],
      },
    },
    {
      line: "You spent all day with the troupe and barely looked at me. ...I'm not sulking. I'm the captain. Captains don't sulk.",
      // He's petulant, not his usual calm: owning it with nerve lands better than soothing.
      mood: true,
      responses: {
        kind: ["Say you missed {him} all day", "Ask how {his} day went"],
        playful: ["Say captains clearly do", "Ask if this is sulking"],
        bold: ["Give {him} all your attention", "Kiss {his} cheek to make up"],
        neutral: ["Apologize for the day", "Sit down next to {him}"],
      },
    },
    {
      line: "My hands are cold. ...That's a lie. I just wanted an excuse.",
      responses: {
        kind: ["Warm {his} hands anyway", "Say {he} never needs one"],
        playful: ["Call {him} a terrible liar", "Say they feel freezing"],
        bold: ["Take both of {his} hands", "Hold on until they're warm"],
        neutral: ["Take {his} hand", "Let the lie slide"],
      },
    },
    {
      line: "I've written a new act. I'm not telling you what it's about until opening night. ...You'll know.",
      responses: {
        kind: ["Say you'll be there for it", "Ask if {he}'s resting enough"],
        playful: ["Guess wildly about it", "Promise not to peek"],
        bold: ["Say you already know", "Ask for a private preview"],
        neutral: ["Say you'll wait", "Ask when it opens"],
      },
    },
    {
      line: "I don't need you to fix anything. Just tell me it's going to be fine, and I'll believe it, coming from you.",
      responses: {
        kind: ["Tell {him} it'll be fine", "Say you'll be right here"],
        playful: ["Say it'll be fabulous", "Promise it with a pinky"],
        bold: ["Say you'll make sure of it", "Say {he} doesn't carry it alone"],
        neutral: ["Nod and stay close", "Stay with {him} a while"],
      },
    },
  ]),
};
