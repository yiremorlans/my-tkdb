import bondScenes from "../bondScenes/zenji.js";

export default {
  // Level-up DMs: constants/bondScenes/zenji.js.
  bondScenes,
  dialogue: {
    new: [
      {
        line: 'He greets you with a sweeping bow. "Why, hello there, my dear. Suppose we kick off another swanky day here?"',
        approach: "Return his bow",
        greeting:
          "\"Copacetic! There's an artist's sensibility in you, my dear. I can always tell.\"",
        responses: {
          kind: [
            "Say you'd love to stay a while",
            "Say it's lovely to meet him",
          ],
          playful: ["Say it's the bee's knees", "Ask if it comes with a song"],
          bold: ["Tell him to lead the way", "Say you'll pick the first stop"],
          neutral: ["Say hello back", "Nod and smile"],
        },
      },
      {
        line: "He's mid-sentence when you arrive: a story, out loud, to no one. He finishes the line before he finishes turning around.",
        approach: "Listen with him",
        greeting:
          '"...And they lived happily ever after. Ah! An audience. Did you catch the ending, my dear?"',
        responses: {
          kind: ["Say it was a lovely ending", "Ask to hear it from the top"],
          playful: ["Call for an encore", "Say it needed more dragons"],
          bold: [
            "Say you came for the next one",
            "Admit you only heard the end",
          ],
          neutral: ["Nod along", "Listen, say nothing"],
        },
      },
      {
        line: "He's been reciting to the open air. Catching your look, he brightens. \"You want to know the meaning of my words? I see. I'll have to give you a lecture on romanticism.\"",
        approach: "Say you're all ears",
        greeting:
          '"A willing pupil! Splendid. Lesson one, my dear: nothing is ever only what it seems. ...Lesson two is still in drafts."',
        responses: {
          kind: [
            "Say you'd attend every lecture",
            "Say his words sound lovely",
          ],
          playful: ["Call him Professor Kotodama", "Ask if there'll be a quiz"],
          bold: ["Ask what romanticism means", "Offer a lesson of your own"],
          neutral: ["Listen to the recital", "Let him explain"],
        },
      },
      {
        line: '"Well, if it isn\'t a new face. Has this inspired man of the quill left you speechless? ...No? A pity. It happens to some."',
        approach: "Introduce yourself",
        greeting:
          '"Charmed, truly! Zenji Kotodama. Do commit it to memory, my dear. Someday it\'ll be on every bookshelf."',
        responses: {
          kind: ["Say it's nice to meet him", "Say you'll remember him"],
          playful: [
            "Pretend to be speechless",
            "Ask for a signed first edition",
          ],
          bold: ["Say you'll be first in line", "Say you'll hold him to that"],
          neutral: ["Nod hello", "Let the question sit"],
        },
      },
      {
        line: '"Oh, have you come to see me? This is troubling." He smiles. "I\'m afraid I\'m out of autographs."',
        approach: "Say you're his biggest fan",
        greeting:
          '"A fan with conviction! How sensational. Alas, the muse has me rationed. I\'ll put your name at the top of the list, my dear."',
        responses: {
          kind: ["Say his smile will do", "Say you came for the company"],
          playful: ["Ask to be on the waitlist", "Ask for an IOU"],
          bold: ["Ask for one in verse", "Say you'll wait for restock"],
          neutral: ["Say you'll come back later", "Smile and nod"],
        },
      },
    ],
    known: [
      {
        line: '"The wanderer returns." He looks delighted. "My dear, you\'re becoming a regular fixture."',
        approach: "Say you'll keep returning",
        greeting: ['"Ah, twice in one week. Fate does love a repeat verse."'],
        responses: {
          kind: ["Say you're happy to return", "Say it's your favorite stop"],
          playful: ["Ask if you're a regular now", "Tease him about 'fixture'"],
          bold: ["Say you'll keep coming back", "Claim the title outright"],
          neutral: ["Nod, keep walking", "Take the compliment quietly"],
        },
      },
      {
        line: "He lifts the instrument across his knee. \"What's this? Well, it's a biwa, of course. It's a biwa just as you are yourself.\"",
        approach: "Listen a while",
        greeting:
          '"Come, lend an ear. The biwa\'s been dreadfully lonely for an audience."',
        responses: {
          kind: ["Say you'll be its audience", "Say you came to hear him"],
          playful: ["Ask what instrument you'd be", "Ask if it plays by itself"],
          bold: ["Ask what he meant by that", "Ask for a song about you"],
          neutral: ["Listen without a word", "Let the biwa rest"],
        },
      },
      {
        line: '"Come now, let\'s depart in search of something sensational."',
        approach: "Ask where to",
        greeting:
          '"Wherever the verse leads us, my dear. I have a feeling about today."',
        responses: {
          kind: ["Say you'd love to come", "Let him lead the way"],
          playful: [
            "Ask what counts as sensational",
            "Ask if you'll know it on sight",
          ],
          bold: ["Say you'll find it first", "Pick the direction yourself"],
          neutral: ["Follow along", "Fall in beside him"],
        },
      },
      {
        line: "\"Heh. There's no doubt about it. Zenji Kotodama is once again the most styling man on campus. These glad rags are the cat's pajamas.\"",
        approach: "Compliment his style",
        greeting:
          "\"Aw, you're a real pal. You've got a keen eye, my dear, and a kind one besides.\"",
        responses: {
          kind: ["Say the outfit works", "Say he wears it well"],
          playful: ["Ask where he shops", "Tease the cat's pajamas line"],
          bold: ["Say he's not wrong", "Challenge him to prove it"],
          neutral: ["Nod at the outfit", "Say nothing, let him preen"],
        },
      },
      {
        line: "He asks nothing at all. He's just been narrating the evening, step by step, and leaves the last line open for you to fill in.",
        approach: "Finish his sentence",
        greeting: '"I\'ve saved a line for you. It wanted your opinion."',
        responses: {
          kind: ["Fill in something gentle", "Fill in something true"],
          playful: ["Fill in something silly", "Steal the ending for yourself"],
          bold: ["Finish it better than he would", "Take over the whole story"],
          neutral: ["Fill it in plainly", "Say the line, move on"],
        },
      },
      {
        line: "\"Come now, read those messages out, won't you? They're fan letters for me, aren't they?\"",
        approach: "Read the first one out",
        greeting:
          '"...They\'re not? Ah. Well. The postman must be running behind, my dear."',
        responses: {
          kind: ["Say one might be, someday", "Read them all out anyway"],
          playful: [
            "Invent a fan letter for him",
            "Read it in a swooning voice",
          ],
          bold: ["Say you'll write him one", "Say his fans are shy"],
          neutral: ["Scroll through them", "Read them to yourself"],
        },
      },
      {
        line: '"Every tool has its own knack you\'ve got to acquire to use it properly. Behold, my mastery with a fishing pole!"',
        approach: "Watch him cast",
        greeting:
          '"Ha! Not a nibble yet, but the form is impeccable, wouldn\'t you say?"',
        responses: {
          kind: ["Say his form is perfect", "Wait with him for a bite"],
          playful: ["Ask what he's fishing for", "Bet you catch one first"],
          bold: ["Ask him to teach you", "Say the fish are doomed"],
          neutral: ["Watch the line", "Watch the water"],
        },
      },
      {
        line: '"Zenji Kotodama, a wonderful name, don\'t you think?" he asks, then actually waits to hear what you think.',
        approach: "Tell him what you think",
        greeting:
          '"A sensational name befitting of my sensational sensibilities, wouldn\'t you say? ...Well? Go on."',
        responses: {
          kind: ["Say it's a wonderful name", "Say it suits him"],
          playful: ["Suggest a sillier name", "Ask for the lecture anyway"],
          bold: ["Say yours could rival it", "Say it out loud yourself"],
          neutral: ["Shrug, say it's fine", "Give a plain opinion"],
        },
      },
      {
        line: "He's woven you into one of his stories as a character, and seems nervous about how you'll take it.",
        approach: "Ask which one you are",
        greeting:
          "\"I wrote you into today's stanza. Don't fret, I changed your name. Slightly.\"",
        responses: {
          kind: ["Say you're flattered", "Say the character suits you"],
          playful: ["Guess which one you are", "Ask for a bigger role"],
          bold: [
            "Ask to read the whole stanza",
            "Say you don't need it changed",
          ],
          neutral: ["Let him have his story", "Don't remark on the character"],
        },
      },
      {
        line: '"Haku filmed these at my behest," he says of an old video, "but I can\'t imagine these old things will capture anyone\'s heart." He seems to hope you disagree.',
        approach: "Say you liked it",
        greeting: '"Be honest, my dear. ...No, be kind. Then honest."',
        responses: {
          kind: ["Say you genuinely liked it", "Ask to see another one"],
          playful: ["Tease the old footage", "Ask Haku for outtakes"],
          bold: ["Say it's better than he thinks", "Tell him to post more"],
          neutral: ["Give a plain nod", "Watch without much comment"],
        },
      },
      {
        line: "He asks after your day with an attention that makes the question feel like the whole point of the conversation.",
        approach: "Tell him about your day",
        greeting:
          '"Tell me something true, my dear. I\'ve grown tired of my own inventions today."',
        responses: {
          kind: ["Tell him something true", "Ask him the same back"],
          playful: [
            "Make up something absurd",
            "Test if he's really listening",
          ],
          bold: ["Tell him something surprising", "Ask why he's so invested"],
          neutral: ["Answer plainly", "Give a short answer"],
        },
      },
      {
        line: '"A burst of inspiration has taken hold of me," he announces, then admits it was really just you walking by.',
        approach: "Ask what inspired him",
        greeting:
          '"The ghost of artistry visits me most when you\'re near. Coincidence? I think not."',
        responses: {
          kind: [
            "Say you're glad to inspire him",
            "Say you'll keep walking by",
          ],
          playful: ["Ask if that happens often", "Tease him for the excuse"],
          bold: ["Say of course it was you", "Claim credit outright"],
          neutral: ["Shrug it off", "Don't remark on it"],
        },
      },
      {
        line: "He's stopped introducing you as a fan and started calling you a friend.",
        approach: "Say you're glad to know him",
        greeting:
          '"You\'ve a good ear for nonsense, my dear. I mean that as the highest compliment."',
        responses: {
          kind: [
            "Say you're glad to be a friend",
            "Call him a friend right back",
          ],
          playful: ["Ask when he decided that", "Tease him about the upgrade"],
          bold: ["Say friend was always accurate", "Say it fits better anyway"],
          neutral: ["Accept the change quietly", "Let the word settle"],
        },
      },
    ],
    warm: [
      {
        line: "His expression brightens with genuine pleasure, all formal distance melting away. \"My dear. I'm glad you're here.\"",
        approach: "Sit beside him",
        greeting: '"The lanterns lean toward you. So, apparently, do I."',
        responses: {
          kind: ["Say you're glad too", "Say the lanterns agree"],
          playful: ["Ask what drew you in", "Ask the lanterns' opinion"],
          bold: ["Sit closer than invited", "Say you leaned first"],
          neutral: ["Sit beside him quietly", "Settle in by the lanterns"],
        },
      },
      {
        line: "He's saved the last of the tea. He'd been saving it for a while.",
        approach: "Accept the tea",
        greeting:
          '"Go on, drink up. Watching you enjoy it is enough food for my soul."',
        responses: {
          kind: ["Say it's the best cup yet", "Say it tastes like spring"],
          playful: ["Ask how long he saved it", "Ask what vintage this is"],
          bold: ["Drink it before he explains", "Ask what he gave up for it"],
          neutral: ["Take the tea, say nothing", "Sip it, let him watch"],
        },
      },
      {
        line: '"You arrive like a season, my dear," he says, delighted. "Expected, and still a gift."',
        approach: "Arrive like clockwork",
        greeting: '"You return like seasons turning. My heart is at ease."',
        responses: {
          kind: ["Say the same about him", "Say he's a season too"],
          playful: ["Ask which season he means", "Ask to be a better season"],
          bold: ["Say you're the gift then", "Say he's the expected one"],
          neutral: ["Arrive, say little", "Accept the verse, move on"],
        },
      },
      {
        line: "He shows you the pages he's been working on. He shows almost no one.",
        approach: "Ask about the verse",
        greeting: [
          '"I was writing about rain. You\'ve made it about something warmer."',
          '"My ideal summer vacation? To lay down my burdens in the springs of Yugawara and pursue my wordsmithery in peace, as so many greats have done before me."',
        ],
        responses: {
          kind: ["Tell him it's beautiful", "Ask what the rain became"],
          playful: ["Beg for the next page", "Offer a terrible rhyme"],
          bold: ["Read it before he stops you", "Ask to keep a page"],
          neutral: ["Read quietly, say nothing", "Hand the pages back"],
        },
      },
      {
        line: "The brush pauses. He'd rather talk to you than finish the line.",
        approach: "Tell him a small thing",
        greeting:
          '"Tell me one small thing about your day. Small things are the good ones."',
        responses: {
          kind: ["Tell him something warm", "Say the line can wait"],
          playful: ["Make the small thing absurd", "Invent a scandal for him"],
          bold: ["Say you're worth the pause", "Ask for the line instead"],
          neutral: ["Tell him something plain", "Keep it short, let him write"],
        },
      },
      {
        line: '"The moon is beautiful," he says, while Towa hums somewhere nearby. "I always look forward to nights like these, passing the hours with you both."',
        approach: "Sit out under the moon",
        greeting:
          "\"Towa's been humming the same four notes for an hour. I've decided it's a masterpiece.\"",
        responses: {
          kind: ["Say you look forward to it too", "Ask him to stay till late"],
          playful: ["Hum the fifth note", "Ask what the song's called"],
          bold: ["Say the moon is beautiful", "Stay out till it sets"],
          neutral: ["Look up at the moon", "Listen to Towa hum"],
        },
      },
      {
        line: '"Have you got any siblings, my dear?" He\'s watching the sky, not you. "No, I don\'t mean anything by it. Just a little conversation."',
        approach: "Answer his question",
        greeting:
          '"Is that so? ...How nice. Tell me more. I find I\'d like to listen tonight."',
        responses: {
          kind: ["Say you'll tell him lots", "Tell him a family story"],
          playful: [
            "Count your siblings on fingers",
            "Say you're one of a kind",
          ],
          bold: [
            "Ask if he'd listen all night",
            "Say you'll tell him every one",
          ],
          neutral: ["Answer and leave it there", "Watch the sky with him"],
        },
      },
      {
        line: '"Are you going to Mortkranken, my dear?" He hovers at your elbow. "No reason. Are you hurt? I hope you\'ll take care."',
        approach: "Tell him you're all right",
        greeting:
          '"Truly? Then I\'ll stop fussing. ...After one more question. Only one."',
        responses: {
          kind: ["Let him ask his question", "Promise you'll take care"],
          playful: [
            "Say it's a papercut, maybe",
            "Ask if he'll walk you there",
          ],
          bold: ["Ask him to come along", "Say you'll be back by dark"],
          neutral: ["Show him your hands", "Keep walking"],
        },
      },
      {
        line: "You're back from a mission. He's there the instant you return, looking you over. \"Ah, I'm so relieved you're all right, my dear.\"",
        approach: "Show him you're unhurt",
        greeting:
          '"I wondered if something had happened. I\'m glad my fears had no teeth."',
        responses: {
          kind: ["Say you thought of him", "Say you're glad to be back"],
          playful: [
            "Say his fears had tiny teeth",
            "Ask if he haunted the gate",
          ],
          bold: ["Ask how long he waited", "Say you'll take him next time"],
          neutral: ["Tell him how it went", "Let him look you over"],
        },
      },
      {
        line: '"Ordinarily my advice salon takes write-ins," he declares, "but tonight I\'m taking it into the field. You, my dear. What troubles you?"',
        approach: "Bring him a problem",
        greeting:
          '"A matter of the heart? Of the stomach? Of the homework? I am qualified in all three."',
        responses: {
          kind: ["Tell him something true", "Ask what troubles him"],
          playful: ["Ask for advice on a ghost", "Invent a dramatic problem"],
          bold: ["Ask for his honest advice", "Say he's the trouble"],
          neutral: ["Name a small worry", "Say you're fine for now"],
        },
      },
      {
        line: '"A swanky morning calls for swanky radio calisthenics!" He\'s already mid-stretch, arms overhead, counting aloud.',
        approach: "Join in the calisthenics",
        greeting:
          '"One, two! Splendid form, my dear. ...Well. Enthusiastic form. That counts double."',
        responses: {
          kind: ["Keep pace with him", "Say he makes it fun"],
          playful: ["Add your own dance move", "Count in the wrong order"],
          bold: ["Challenge him to go faster", "Lead the next set"],
          neutral: ["Follow the count", "Stretch alongside him"],
        },
      },
      {
        line: "He's gazing at a doll on a shelf. \"The moment I met him, I felt a destiny. I knew we couldn't be strangers.\"",
        approach: "Ask about the doll",
        greeting:
          "\"He's a fine listener. Never interrupts. Though I'll admit you're better company.\"",
        responses: {
          kind: ["Say the doll has good taste", "Ask the doll's name"],
          playful: ["Ask if the doll talks back", "Pretend to be jealous"],
          bold: ["Ask if you're a destiny too", "Say you'll outlast the doll"],
          neutral: ["Look at the doll", "Stand beside him"],
        },
      },
      {
        line: "He's perched on a railing, watching students pass. \"What am I doing? ...I'm people-watching. They're all so talented, every one.\"",
        approach: "Watch with him",
        greeting:
          "\"That one's a playwright, I'm sure of it. And that one? A heartbreaker. Your turn, my dear.\"",
        responses: {
          kind: ["Say he sees the best in them", "Guess someone's kindness"],
          playful: ["Invent a wild backstory", "Say that one's a spy"],
          bold: ["Ask what he sees in you", "Say he's the talented one"],
          neutral: ["Watch them go by", "Point someone out"],
        },
      },
      {
        line: '"Sorry, I didn\'t mean to sneak up on you." He looks sincerely puzzled. "Apparently my footsteps give the general students the heebie-jeebies."',
        approach: "Tell him he's not scary",
        greeting:
          "\"There's a ghost in Hotarubi, they say. Floating biwa, footsteps in the hall. I'd love to meet him.\"",
        responses: {
          kind: ["Say the ghost sounds lonely", "Say you'd introduce them"],
          playful: ["Say you've met the ghost", "Ask if he's checked a mirror"],
          bold: ["Say the ghost is wonderful", "Say the ghost has good taste"],
          neutral: ["Keep a straight face", "Change the subject"],
        },
      },
      {
        line: '"Haku\'s busy today," he announces. "Film me in his stead, won\'t you? A folktale. I\'ll do all the voices."',
        approach: "Hold up your phone",
        greeting:
          '"Rolling? Splendid. Ahem. Long ago, in a village much like this one..."',
        responses: {
          kind: ["Film the whole thing", "Say he's a natural"],
          playful: ["Say you forgot to hit record", "Ask for a second take"],
          bold: ["Direct him", "Ask him to look at the lens"],
          neutral: ["Keep the phone steady", "Watch him perform"],
        },
      },
      {
        line: '"Trouble sleeping?" He\'s by your window as if he\'s always been there. "Then I\'ll tell you a story. How about Urashima Taro?"',
        approach: "Ask for the story",
        greeting:
          '"A fisherman, a turtle, a palace under the sea. And a box he\'s told never to open. You know how it goes."',
        responses: {
          kind: ["Ask him to take it slow", "Say you like his voice"],
          playful: ["Say you'd open the box", "Ask if there's a romance"],
          bold: ["Ask for a sadder one", "Ask for one of his own"],
          neutral: ["Close your eyes", "Listen to the story"],
        },
      },
      {
        line: '"You\'ve a talent, you know," he says, apropos of nothing. "Every student here does. Yours is making people feel less like ghosts."',
        approach: "Ask what he means",
        greeting:
          '"Ha ha. A figure of speech, my dear. Mostly. Take the compliment, won\'t you?"',
        responses: {
          kind: ["Take the compliment", "Say he's easy to see"],
          playful: ["Ask what his talent is", "Call it a strange compliment"],
          bold: ["Say he's not a ghost to you", "Say you see him fine"],
          neutral: ["Thank him", "Let the words sit"],
        },
      },
      {
        line: '"Girls, be ambitious!" he proclaims as you pass. "Dream big, my dear. What\'s the biggest dream you\'ve got?"',
        approach: "Tell him your dream",
        greeting:
          "\"Oh, that's the cat's pajamas. Bigger, though. Dream it bigger. I'll keep it safe in my head.\"",
        responses: {
          kind: ["Ask what his dream was", "Say you'll dream bigger"],
          playful: ["Say your dream is a nap", "Ask him to rate it"],
          bold: ["Make the dream bigger", "Say he's in it"],
          neutral: ["Think it over", "Say it's a secret"],
        },
      },
    ],
    spark: [
      {
        line: "The story he's writing has quietly stopped being about anyone but you.",
        approach: "Let him show you",
        greeting:
          '"You are the only subject I cannot get right. I keep trying."',
        responses: {
          kind: "Tell him the verse landed",
          playful: "Steal his brush",
          bold: "Ask him to show you",
          neutral: "Let the verse stand",
        },
      },
      {
        line: "A flower turns up tucked behind your ear. You never quite catch him doing it.",
        approach: "Wear the flower",
        greeting:
          "\"There's a word for this in the old poems. I'd rather just show you.\"",
        responses: {
          kind: "Let his hand stay",
          playful: "Ask what rhymes with you",
          bold: "Catch his hand this time",
          neutral: "Wear it, say nothing",
        },
      },
      {
        line: '"I\'ve written this one badly on purpose," he admits. "I wanted an excuse to read it to you."',
        approach: "Hear the poem",
        greeting:
          '"Shall I read it to you? Fair warning: it isn\'t about the moon."',
        responses: {
          kind: "Ask him to read it",
          playful: "Write him a terrible one back",
          bold: "Ask him to read it twice",
          neutral: "Leave it in haiku",
        },
      },
      {
        line: "He sits closer than the step requires, and doesn't pretend otherwise.",
        approach: "Come closer",
        greeting:
          '"Come closer. The poem requires it. That\'s a lie, but come closer."',
        responses: {
          kind: "Let him stay close",
          playful: "Point out the cheating",
          bold: "Close the space on the step",
          neutral: "Don't move away",
        },
      },
      {
        line: '"Some things," he says softly, "are better in seventeen syllables. Others aren\'t."',
        approach: "Stay past the last lantern",
        greeting:
          '"Stay through the last lantern. I\'d like the night to be longer."',
        responses: {
          kind: "Ask him to say the rest",
          playful: "Guess which 'others' he means",
          bold: "Give him the next line",
          neutral: "Watch the lanterns",
        },
      },
    ],
    close: [
      {
        line: '"With you," he says, "the world behaves as though a story were being told well. I hadn\'t expected to feel that again."',
        approach: "Finish the poem together",
        greeting: '"With you, the world feels right. Like poetry made real."',
        responses: {
          kind: "Accept all of what he is",
          playful: "Make him laugh mid-verse",
          bold: "Tell him plainly you love this",
          neutral: "Share the quiet syllables",
        },
      },
      {
        line: "He doesn't reach for a metaphor this time. He just says he's happy.",
        approach: "Say nothing, and stay",
        greeting:
          "\"You needn't say anything. I've grown fluent in your silences.\"",
        responses: {
          kind: "Say happy suits him",
          playful: "Bring him gentle joy",
          bold: "Say it plainly back",
          neutral: "Accept his silence",
        },
      },
      {
        line: '"I\'ve written you badly a hundred times," he laughs. "You deserve better than my words."',
        approach: "Tell him the words are enough",
        greeting:
          "\"I've stopped writing about longing. There's nothing left to long for.\"",
        responses: {
          kind: "Say he needn't write you well",
          playful: "Ask for the worst one",
          bold: "Give him the ending yourself",
          neutral: "Say the words are enough",
        },
      },
      {
        line: "He says your name the way he'd read the last line of something he didn't want to end.",
        approach: "Go to him",
        greeting:
          '"Every verse I finish lately has your shape in it somewhere."',
        responses: {
          kind: "Say you don't want it to end",
          playful: "Steal the last line",
          bold: "Say his name back the same way",
          neutral: "Watch the lanterns together",
        },
      },
      {
        line: "The world quiets around him when you're near. He's noticed. He's grateful.",
        approach: "Watch the moon with him",
        greeting:
          '"Stay. The moon is doing something worth witnessing together."',
        responses: {
          kind: "Tell him his words reached you",
          playful: "Ask what he's grateful for",
          bold: "Say you feel it too",
          neutral: "Let the quiet stay",
        },
      },
    ],
    bound: [
      {
        line: "He's stopped writing about longing. The new poems are far less publishable.",
        approach: "Ask what he's writing now",
        greeting:
          "\"You've made a very poor poet of me. I've never been happier about anything.\"",
        responses: {
          kind: "Let the night run long",
          playful: "Rhyme something filthy",
          bold: "Say it without metaphor",
          neutral: "Let the poem finish",
        },
      },
      {
        line: "He reads you the old folktale badly, on purpose, so it takes all night.",
        approach: "Stay until morning",
        greeting:
          '"Stay until morning. The night has been generous; let\'s not insult it."',
        responses: {
          kind: "Stay until morning",
          playful: "Blow out the lantern",
          bold: "Kiss him mid-sentence",
          neutral: "Stay quiet with him",
        },
      },
      {
        line: '"Seventeen syllables can\'t hold this," he murmurs. "I\'ve stopped trying."',
        approach: "Hear the plain version",
        greeting:
          '"I love you. There. No metaphor. I\'ve been saving the plain version."',
        responses: {
          kind: "Say the plain version back",
          playful: "Tease him for trying at all",
          bold: "Kiss him before the next line",
          neutral: "Let the plain version stand",
        },
      },
      {
        line: "He hums something low against the back of your neck. It's a poem. You'll never read it.",
        approach: "Come here",
        greeting:
          '"Come here. I want to memorize something and it isn\'t a poem."',
        responses: {
          kind: "Let him hum a while longer",
          playful: "Hum it back at him, badly",
          bold: "Turn and face him",
          neutral: "Stay still, let him hum",
        },
      },
      {
        line: "The lanterns burn down and neither of you notices for a very long time.",
        approach: "Stay till the last lantern",
        greeting:
          '"Stay till the last lantern\'s out. I never did get enough night, less of it now."',
        responses: {
          kind: "Let the night keep going",
          playful: "Blame him for losing track",
          bold: "Say you didn't notice either",
          neutral: "Watch the lanterns burn down",
        },
      },
    ],
  },
  // The /call reveal lines for this character, keyed by the register in
  // WINNER_LINE_BUCKETS (constants/publicEncounters.js). Picked from at random
  // like the dialogue; {user} is the winner's mention and {name} their full
  // name, and the embed's winner line is the only place the reveal names
  // either of them. A register left out here falls back to the generic
  // WINNER_LINES pool.
  winnerLines: {
    new: [
      '"Why, hello there, my dear." **{name}** smiles at {user} as though they were expected.',
      '{user} names him, and **{name}** beams. "Seventeen syllables, and you\'ve handed me the last five."',
      "**{name}** finishes his sentence to no one at all, then turns to {user} with a flourish.",
      '**{name}** brightens all at once. "My dear! What a sensational surprise." He sweeps {user} a bow.',
    ],
    known: [
      '"The wanderer returns." **{name}** looks {user} over, pleased. "You\'re becoming a regular fixture, my dear."',
      '{user} names him, and **{name}** beams. "Twice is coincidence. Three times is a season."',
      "**{name}** had {user}'s name on the tip of his tongue all week. They said his first.",
    ],
    warm: [
      '"You arrive like a season, my dear." **{name}** is delighted with {user}.',
      "{user} calls out, and **{name}** abandons a perfectly good line mid-composition.",
      "**{name}** had a story saved for {user}. He tells it at length, with gestures.",
    ],
    spark: [
      '"Horsefeathers." **{name}** had absolutely been watching for {user}.',
      "{user} calls his name, and **{name}** finds himself briefly short of words.",
      "**{name}** bows to {user} with rather more ceremony than the moment requires.",
    ],
    close: [
      '"The moon is beautiful, isn\'t it?" **{name}** asks {user}, whatever the hour, and they know exactly what he means by it.',
      "**{name}** has stopped composing verses about longing. {user} is standing right there.",
      '"Can you see me? Phew..." **{name}** is so relieved it\'s {user} that he forgets to be dashing.',
    ],
    bound: [
      '"Seventeen syllables can\'t hold this, my dear." **{name}** stops trying and crosses to {user} instead.',
      "**{name}** hasn't much time, and spends all of it getting to {user}.",
      "{user} waves hello, and **{name}** gives up the metaphor entirely.",
    ],
  },
};
