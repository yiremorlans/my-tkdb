// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
//
// `house` is the single source of truth for house standing: every character
// belongs to exactly one house (or none), and /house tallies affinity from this
// field alone. `additionalLocations` is NOT a second membership — it is
// scenery, listing where else a character can plausibly be encountered, and it
// takes background keys of any kind (houses and character rooms alike). Lyca is
// an Obscuary character who is sometimes found around Hotarubi; Tohma is
// Frostheim, seen at Vagastrom and in Jin's room. Only attributedLocations() in
// constants/backgrounds.js reads it, and only to decide backgrounds. Adding an
// entry changes where a character appears and nothing else — not their house,
// not their affinity, not how often they show up.
import { HOUSES, CHARACTER_ROOMS, timeBucket } from "./backgrounds.js";
import {
  DIALOGUE,
  SHARED_APPROACH_WHEN,
  SHARED_DIALOGUE_WHEN,
} from "./dialogue.js";

export const RESPONSE_TYPES = {
  KIND: "kind",
  PLAYFUL: "playful",
  BOLD: "bold",
  NEUTRAL: "neutral",
};

// Each character's affinityByResponse ranks KIND/PLAYFUL/BOLD as a
// permutation of {2, 1, 0} points — their favorite response type, a
// neutral-liked type, and a least-liked type. A NEUTRAL response always
// yields 0 points regardless of character (see constants/game.js).
//
// dialogue holds the lines a character can greet the user with, grouped by
// how far along the relationship is (see DIALOGUE_TIER_BY_LEVEL in
// constants/game.js). Each tier is a collection so more lines can be added
// over time without changing any code — one is picked at random per encounter.
export const CHARACTERS = [
  // Frostheim
  {
    id: "jin",
    firstName: "Jin",
    lastName: "Kamurai",
    house: HOUSES.FROSTHEIM,
    exclusiveRoom: CHARACTER_ROOMS.JIN,
    images: {
      uniform: "Jin_Kamurai_Uniform.png",
      casual: "Jin_Kamurai_Casual.png",
    },
    // bold is what actually reaches Jin (affinityByResponse.bold = 2). The
    // Himedere/Oujidere crown only comes off for someone who meets him as an
    // equal and refuses to be dismissed: "You've got guts abandoning your
    // place at my back, servant" and "You want to practice the waltz? Bold,
    // aren't you?" are approval, not reproach, and he says outright that
    // deference bores him — "A party? I don't waste air on bootlickers",
    // "Kneel! Tsk..." kind lands too (1): once he's let you close he leans
    // into being looked after — the standing order to wake him every morning
    // ("that's an order"), "Massage me, servant", "Your house is too far.
    // Stay here tonight" — and the Max Affinity line ("I don't take you being
    // here for granted. I know it won't last forever") wants gentleness in
    // reply, not a push. playful lands worst (0): he does the teasing himself
    // and has no patience for it lobbed back — "...Get to the point. The trash
    // here is so long-winded", "Spit it out", "Why are you so chatty today?
    // Just pour my tea", "Just arrange it around me" — so banter as a reply is
    // one more thing he has to sit through. Note this is "didn't resonate,"
    // not dislike.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Himedere", "Oujidere"],
    keywords: [
      "Frostheim captain",
      "imperious — calls you 'servant', 'peasant'",
      "commands, never asks ('Kneel!', 'That's an order')",
      "old-money heir — private helicopter, personal chef",
      "classically raised — waltz, piano duets, dining etiquette",
      "short-tempered, no patience for long-windedness",
      "despises bootlickers, respects guts",
      "tsundere generosity ('take it before I change my mind')",
      "smokes",
      "a betrayed figurehead under the crown",
      "knows nothing good lasts",
      "possessive — 'you wear my name well'",
      "protective — 'your place at my back'",
      "keeps Tohma as his attendant",
    ],
  },
  {
    id: "kaito",
    firstName: "Kaito",
    lastName: "Fuji",
    house: HOUSES.FROSTHEIM,
    images: {
      uniform: "Kaito_Fuji_Uniform.png",
      casual: "Kaito_Fuji_Casual.png",
    },
    // kind is what actually reaches Kaito (affinityByResponse.kind = 2):
    // under the loud grin the script is one long plea for reassurance — "Am
    // I being annoying?! I'm sorry!", "why am I such a moron?!", "It's not
    // like me being there is any help to anyone", the Welcome Back "Please
    // don't leave me again", and the Max Affinity "I know I'm weak, and a
    // coward. But I really do want to become your knight in shining armor" —
    // all of it wants warmth back, not a bit or a push. playful lands
    // second (1): the surface is real too — WickHive leaks, "it's all over
    // TikTok", meme-sharing, the "winn... er, earnings" bravado you can
    // bounce off of. bold lands worst (0): he's a coward by his own account
    // — bails before Luca can "rope me in", dreads a summons from Tohma,
    // "time to man up and bite the bullet... Nope, absolutely not, can't do
    // it!" — so a blunt or demanding advance just makes him feel smaller.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Bakadere"],
    keywords: [
      "self-deprecating",
      "anxious",
      "cowardly",
      "gambling debt",
      "social-media-obsessed",
      "makes sweets",
      "clingy",
      "good-hearted",
    ],
  },
  {
    id: "lucas",
    aliases: ["luca"],
    firstName: "Lucas",
    lastName: "Errant",
    house: HOUSES.FROSTHEIM,
    images: {
      uniform: "Lucas_Errant_Uniform.png",
      casual: "Lucas_Errant_Casual.png",
    },
    // kind is what actually reaches Lucas (affinityByResponse.kind = 2): the
    // script is a boy who looks after everyone but himself — "you need to make
    // sure you eat a proper breakfast", "rest is the best medicine", the worry
    // over Kaito's strength — while punishing himself with training he calls
    // never enough ("I haven't trained nearly enough... I have to do more").
    // A partner who turns that care back on him and meets the grief gently
    // ("yet again, I've failed to protect the people most important to me";
    // "please don't make that face") is the one who gets through. bold lands
    // second (1): under the courtesy is a hard, duty-bound resolve — "those
    // with strength have a duty to use it for others", "this is the only path
    // left", "I'm not always as harmless as I let people believe", "sometimes
    // I feel out of sorts, like I'm not myself" — and a partner who doesn't
    // flinch at that side and stands level with it reaches him where softness
    // alone can't. playful lands worst (0): there is almost no play in him —
    // he takes "pajama party" and "Penny for them?" in complete earnest — so
    // banter volleyed back is received politely but doesn't land. Note this is
    // "didn't resonate," not dislike.
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Dandere", "Pure Angel"],
    keywords: [
      "polite",
      "soft-spoken",
      "old-world British courtesy",
      "apologizes for taking up space",
      "gentle",
      "sincere",
      "fiercely protective",
      "'those with strength have a duty to use it for others'",
      "self-sacrificing — 'the only path left'",
      "trains himself past exhaustion to subjugate demons",
      "tends everyone's wellbeing but his own",
      "haunted by those he couldn't protect",
      "a darker self he keeps leashed",
      "came to Darkwick to learn how to subjugate demons",
      "searching for his missing twin brother, Nox",
      "any mention of demons lights a cold fire in him",
      "trusts too easily and acts impulsively",
      "bad at keeping a secret",
    ],
  },
  {
    id: "tohma",
    firstName: "Tohma",
    lastName: "Ishibashi",
    house: HOUSES.FROSTHEIM,
    additionalLocations: [HOUSES.VAGASTROM, CHARACTER_ROOMS.JIN],
    images: {
      uniform: "Tohma_Ishibashi_Uniform.png",
      casual: "Tohma_Ishibashi_Casual.png",
    },
    // kind is what actually reaches Tohma (affinityByResponse.kind = 2): he does
    // all the caretaking in the script and none of it comes back to him — "Take
    // care not to overdo it today... I can tell at a glance that you're
    // fatigued", "Good health is the greatest treasure... Good night, I'll
    // finish up here", "If something is concerning you, perhaps I could lend an
    // ear". The beats where the butler's guard drops all want warmth in reply,
    // not wit or a push: the tired "I've no interest in hearing your excuses",
    // the Goodnight LVL 24 "Forgetting about everything I've got to do and be,
    // just for a night... It's not a bad feeling", the Max Affinity "turn to
    // those around you for help. I will be there to keep you safe". playful
    // lands too (1): the sly courtier runs through the whole script — the "Well,
    // well" with a sly smile, the jokes that aren't quite jokes ("Would you
    // like some? ...I assure you, it's not poisoned"), "I can show you how to
    // win — against opponents other than myself, of course", "Ignoring me, are
    // you? You've certainly got guts" — so a partner who volleys the banter
    // back is meeting him where he plays. bold lands worst (0): his whole
    // surface is unflappable courtesy and smooth deflection — "I've nothing but
    // the noblest of intentions", "it's nothing serious... whatever do you
    // mean?", "This conversation never happened. Understand?" — so a blunt,
    // demanding advance slides off it, received graciously but not what moves
    // him. Note this is "didn't resonate," not dislike. (Was playful 0 / bold 1:
    // that read him as an enforcer — "blunt", "rule-focused", "lawful neutral" —
    // which the script contradicts. He turns a blind eye to curfew, signs you
    // back in, works in the shadows, and never speaks bluntly in his life.)
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Kuudere"],
    keywords: [
      "Frostheim vice-captain",
      "eloquent",
      "formal, old-fashioned courtesy",
      "composed, hard to read",
      "devoted attendant to Jin ('our king')",
      "butler-ish caretaking — tea, chess, sleep, schedules",
      "offers a sympathetic ear",
      "sly, dark humor",
      "says 'Honestly.' and 'Well, well'",
      "secretive fixer — 'this conversation never happened'",
      "eavesdrops, keeps track",
      "ends justify means — 'any means necessary'",
      "disciplinarian mentor, high standards",
      "moves in high society",
      "quietly protective",
    ],
  },

  // Vagastrom
  {
    id: "alan",
    firstName: "Alan",
    lastName: "Mido",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.ALAN,
    images: {
      uniform: "Alan_Mido_Uniform.png",
      casual: "Alan_Mido_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. kind (2): the
    // guarded man has "a soft spot for the MC, showing a rare smile on a few
    // occasions when she's around", and his one confessed fear is his own
    // strength ("only enhance his stigma if someone is about to die") — that
    // asks for gentleness, not a push. bold (1): a Vagastrom captain of
    // "unshakeable conviction" who is harsh with Sho and Leo answers someone
    // who stands level with him. playful (0): "stern and stoic attitude,
    // smiling on extremely rare occasion", and "by his own admission, he is
    // not good with words" — banter has nothing to land on.
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Kuudere"],
    keywords: [
      "stoic",
      "taciturn",
      "guarded",
      "protective",
      "reliable",
      "disciplined",
      "gruffly affectionate",
      "mechanic",
      "biker",
      "Vagastrom captain",
      "rumored to have killed someone",
      "afraid of his own strength — 'only if someone is about to die'",
      "harsh on Sho and Leo, but says they have potential",
      "rare smiles, and mostly around you",
      "haunted past",
      "big appetite",
      "no sense of direction",
    ],
  },
  {
    id: "leo",
    firstName: "Leo",
    lastName: "Kurosagi",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.LEO,
    images: {
      uniform: "Leo_Kurosagi_Uniform.png",
      casual: "Leo_Kurosagi_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. bold (2): he is
    // "always in search of the next thrill and not shy about using others to
    // get it" — nerve is the thing he actually finds interesting. playful (1):
    // "witty and cynical" is his native register, but like Jin and Edward he
    // is the one doing the needling, so it volleys rather than lands deepest.
    // kind (0): "careless blunt remarks" and an "egotistical nature" that
    // "leads him to appear disobedient" give warmth nothing to grip. "Didn't
    // resonate," not dislike.
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Sadodere", "Teasedere"],
    keywords: [
      "Vagastrom vice-captain",
      "cynical",
      "mocking",
      "ego-driven",
      "influencer",
      "teasing",
      "sharp-tongued",
      "gossip-monger",
      "brand-conscious",
      "entitled",
      "possessive",
    ],
  },
  {
    id: "shohei",
    aliases: ["sho"],
    firstName: "Shohei",
    lastName: "Haizono",
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.SHOHEI,
    images: {
      uniform: "Shohei_Haizono_Uniform.png",
      casual: "Shohei_Haizono_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. kind stays top
    // (2): he is "hardworking and responsible when it comes to his craft",
    // takes pride in the food truck, "dislikes when people leave their food
    // cold and despises it even more when people waste perfectly good food",
    // and reprimands Leo the moment he mocks Subaru — care given and returned
    // is his real currency, under the mouth. playful moved 0 -> 1: the one
    // explicitly MC-directed line in his profile is "Sho also develops a
    // liking to tease his friends, particularly the MC", so banter volleyed
    // back is a channel he opens himself, not one that misses. bold moved
    // 1 -> 0: the aggression is a front he drops ("initially comes off as a
    // typical delinquent", "despite his words, he does what he is asked"), so
    // meeting a delinquent with more force pushes on the surface rather than
    // getting under it. "Didn't resonate," not dislike.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "cocky delinquent front — aggressive or apathetic on the surface",
      "does what he's asked despite his mouth",
      "underclassman",
      "nonchalant",
      "sweary",
      "biker",
      "fighter",
      "food-truck — a capable cook, particular about his dishes",
      "hates cold food, despises wasted food",
      "teases his friends, you most of all",
      "draws the line when Leo mocks his friends",
      "Professor Hyde's younger brother",
      "earnest",
    ],
  },

  // Hotarubi
  {
    id: "subaru",
    firstName: "Subaru",
    lastName: "Kagami",
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.SUBARU,
    images: {
      uniform: "Subaru_Kagami_Uniform.png",
      casual: "Subaru_Kagami_Casual.png",
    },
    // kind is what actually reaches Subaru (affinityByResponse.kind = 2): the
    // script is starved for gentle notice and reassurance — "I really am so
    // lucky to be surrounded by so many kind people like you", "You've been
    // kind to this house. I notice these things" — and every anxious beat
    // ("I was worried I'd done something to make you feel uncomfortable", the
    // Max Affinity "I get really anxious sometimes... I'm being weird, aren't
    // I?") wants warmth in reply, not wit or a push. playful lands second (1):
    // he takes gentle ribbing and deflects with it himself — "You think I'm
    // always smiling? Ha ha" — and by Goodnight LVL 24 he'll spin ghost
    // stories for you. bold lands worst (0): he's conflict-averse to the bone
    // — "If I cancel now, they'll hate me", compulsive apology, the figurehead
    // who defers every call to Haku — so a blunt or demanding advance makes
    // him comply anxiously instead of opening up.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Dandere", "Megaredere"],
    keywords: [
      "polite",
      "self-deprecating",
      "anxious",
      "people-pleaser",
      "selfless",
      "hardworking",
      "bottled emotions",
      "Hotarubi captain — 'I'm just a figurehead, really'",
      "esteemed kabuki actor since childhood, currently on hiatus",
      "stigma reads residual thoughts from anything he touches — calls it gross",
      "quietly harsh on people — 'humans are much nastier than any anomalies'",
    ],
  },
  {
    id: "zenji",
    firstName: "Zenji",
    lastName: "Kotodama",
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.ZENJI,
    images: {
      uniform: "Zenji_Kotodama_Uniform.png",
      casual: "Zenji_Kotodama_Casual.png",
    },
    // kind is what actually reaches Zenji (affinityByResponse.kind = 2): under
    // the showmanship the script is a ghost on borrowed time who treasures
    // being listened to and looked after — "Watching you is enough food for my
    // soul", "if I can save you, and our friends, I could ask for nothing
    // more", the quiet worry when you go silent or head for Mortkranken.
    // playful lands too (1): he's a performer who lives for banter, wordplay
    // and gentle spooky teasing — "Has this inspired man of the quill left you
    // speechless?", "Horsefeathers, I'd never. I was there the night before
    // last." bold lands worst (0): he deflects directness into metaphor and the
    // moon ("The moon is beautiful" carries "I love you" until the very last
    // line), so a blunt advance is received graciously but isn't what moves him.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "florid theatrical showman",
      "self-styled genius of the pen",
      "eccentric poet — speaks in metaphors",
      "old-fashioned romanticist",
      "Taro Kirisaki — Jiro's late older brother",
      "thinks every student at Darkwick is talented; compliments everyone",
      "worrywart",
      "Jazz-Age slang",
      "calls you 'my dear'",
      "gentle",
      "warm",
      "empathetic",
      "observant",
      "spiritual",
      "died at Darkwick last year and bears it no grudge",
      "spirit too weak for most people to see him",
      "oblivious that the Hotarubi ghost rumors are about him",
      "quietly protective",
    ],
  },
  {
    id: "haku",
    firstName: "Haku",
    lastName: "Kusanagi",
    house: HOUSES.HOTARUBI,
    images: {
      uniform: "Haku_Kusanagi_Uniform.png",
      casual: "Haku_Kusanagi_Casual.png",
    },
    // Verified against his voiceline script: quiet, undemanding care is what
    // reaches him (kind 2); deadpan and the spooking he does to get a reaction
    // out of you are his default register but read as deflection, so playful
    // lands softer (1); he meets forwardness by keeping it light and
    // undercutting himself, so bold glances off (0).
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    // Not a Dandere: he is the one who rescues Subaru when Subaru can't get a
    // sentence out, and Zenji compares his charm to Don Juan. The reserve is
    // Kuudere deflection, and the spooking is Teasedere.
    archetype: ["Kuudere", "Teasedere"],
    keywords: [
      "Hotarubi vice-captain",
      "laid-back",
      "deadpan",
      "slacker — insists he's lazy, does the work anyway",
      "'It's okay to half-ass stuff, you know'",
      "dorm handyman — cleans up the other ghouls' messes",
      "genuine medium — sees ghosts even other ghouls can't",
      "heir to the Kusanagi shrine clan, a long line of mediums",
      "estranged from his family, who were glad to see him go",
      "spooks and teases you to watch your reaction",
      "'devilish charm' — Zenji's Don Juan comparison",
      "looks after Subaru; manages Zenji's video work",
      "quietly attentive",
      "world-weary",
      "self-deprecating",
      "deflects sincerity",
    ],
  },

  // Dionysia
  {
    id: "elias",
    firstName: "Elias",
    lastName: "Pratt",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Elias_Pratt_Uniform.png" },
    // kind is what actually reaches Elias (affinityByResponse.kind = 2): the
    // voiceline script is a tired caretaker who is quietly lonely under the
    // charm — he buys snacks "for everyone in the dorm", makes the coffee,
    // sets out the somen bamboo, tells you to "go ahead and rest first", and
    // drops his guard only to admit small aches: "I was lost in thought... I
    // didn't even realize you were here", "I don't dislike quiet nights... but
    // right now I feel a little unsatisfied", "I only hope these peaceful days
    // can last forever". Genuine warmth and being noticed is what lands.
    // playful is real but secondary (1): he deflects with a coy wink rather
    // than escalating — "What we talked about? Secret", "Up late tonight?
    // Hehe. Bad kid", "My true self? I'll leave that to your imagination", the
    // candy he keeps offering you. bold lands worst (0): nothing in the script
    // pushes or dares, and even his one forward line is a soft, lonely
    // invitation — "You can't sleep? ...Would you keep me company for just one
    // drink?" — so a blunt or demanding advance meets only courtly deflection.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Kuudere", "Shundere"],
    keywords: [
      "unhurried Southern-gentleman drawl",
      "calls you 'sugar'",
      "easy charm worn as armor over a hidden self",
      "guards his true self — 'leave that to your imagination'",
      "former Dionysia captain, quietly demoted",
      "runs errands and odd jobs for Jo",
      "ex-campus-janitor, still tidies from habit",
      "quietly looks after the whole dorm",
      "always working a lollipop or candy",
      "world-weary, often lost in thought",
      "melancholy under the ease",
      "out of practice, doubts he can keep up on missions",
      "treasures the peace, dreads it ending",
      "unruffled by the macabre",
    ],
  },
  {
    id: "jo",
    firstName: "Jo",
    lastName: "Kongoza",
    house: HOUSES.DIONYSIA,
    images: {
      uniform: "Jo_Kongoza_Uniform.png",
      casual: "Jo_Kongoza_Casual.png",
    },
    // kind is what actually reaches Jo (affinityByResponse.kind = 2): the
    // script runs on work as avoidance — "review the proposal, adjust the
    // schedule, check the program lineup, calculate the budget... 24 hours
    // just isn't enough", and the Night LVL 18 tell, "When I'm working, I
    // don't have to think about anything unnecessary." He pours care outward
    // (snacks for the dorm, sending you to check on Elias and Shion, "turn
    // the good and the bad into fuel for yourself", the secret hot milk at
    // LVL 24) and never lets it come back. A partner who notices the tired
    // under the competence and makes him stop is the one who gets in. bold
    // lands second (1): he leads Dionysia but defaults to yielding — "People
    // don't change that easily, so it's usually easier to be the one who
    // adapts" — and answers directness in kind, from the LVL 23 "No. I'm
    // taking you home" to the Max Affinity "So then — how are you going to
    // take responsibility?" Someone who meets him level and won't be managed
    // around registers. playful lands worst (0): the charisma is real but the
    // register is calm, weary and earnest, not a banter volley — teasing him
    // back glances off the workload armor instead of getting under it. Note
    // this is "didn't resonate," not dislike.
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ["Charismatic Oujidere"],
    keywords: [
      "Dionysia captain",
      "brilliant performer",
      "legendary Venus of Dionysia",
      "transformation artifact — a look for any venue",
      "Dionysia dorm leader, co-runs the house with Mio",
      "effortless charisma, commands a room",
      "calls you 'cutie'",
      "calm, measured, unshowy off the stage",
      "workaholic — buries feeling in the workload",
      "over-shoulders responsibility, would rather do it himself",
      "caretaker of a house of eccentrics",
      "adapts to others by default",
      "disciplined routine — daily jog, strength training",
      "gently protective, quietly firm when it counts",
      "weary under the competence",
    ],
  },
  {
    id: "mio",
    firstName: "Mio",
    lastName: "Susuhara",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Mio_Susuhara_Uniform.png" },
    // Verified against his voiceline script. kind is what actually reaches him
    // (affinityByResponse.kind = 2): the whole script is someone who pours care
    // outward and waves it off when it comes back — "Takes one to know one. Make
    // sure you give yourself a break", "I'm good, though. I don't need much
    // sleep", "bit of spit and it'll heal", plus the Welcome Back and Max
    // Affinity lines ("You disappearing really did make way more work for me...
    // Ha ha, kidding. Mostly", "When I'm with you, I... Sorry, never mind"), so
    // being noticed, told to rest, and let to lean is what lands. playful lands
    // second (1): he trades dry banter and fake-scares ("Boo! Ha ha, did I scare
    // you?", the picture-book bit) and you can bounce off him, but every "Ha ha,
    // kidding" walks back something real, so it's his deflection as much as real
    // play. bold lands worst (0): he can't finish his own confession ("This one
    // keeps not coming out") and undercuts sincerity the moment it turns heavy,
    // so a blunt or demanding advance is received kindly but slides off.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    // Dandere over Deredere: the underlying disposition is genuinely loving, but
    // he never says the warm thing outright — he undercuts it every time.
    archetype: ["Dandere", "Deredere"],
    keywords: [
      "Dionysia vice-captain",
      "reliable",
      "loyal",
      "clockwork artisan",
      "roving campus handyman",
      "contraption-builder",
      "overworked, runs on little sleep",
      "deflects concern about himself",
      "redirects care to others",
      "safety-minded and protective",
      "defuses conflict",
      "put-upon caretaker of Shion",
      "older-sibling instinct",
      "dry, understated affection",
      "can't voice his feelings",
    ],
  },
  {
    id: "shion",
    firstName: "Shion",
    lastName: "Genkai",
    house: HOUSES.DIONYSIA,
    images: { uniform: "Shion_Genkai_Uniform.png" },
    // Verified against his voiceline script. bold is what actually reaches Shion
    // (affinityByResponse.bold = 2): the yandere/sadodere wants to be met, not
    // soothed. "Come closer. You're still too far away. Closer." rewards
    // someone who closes the distance instead of running; "Come to see me,
    // have you? With no clue what I might do to you... Foolish girl." and
    // "You're getting bold just 'cause you're my wife, aren't you?" are
    // approval, and Noon LVL 21 demands she talk back ("you better start
    // wagging that tongue before I lose my temper"). A partner who steps in,
    // doesn't flinch, and claims him back is the one who lands. playful lands
    // second (1): his own play is cruel and childish — worms in Mio's toolbox,
    // "You want a bite? ...Keep dreaming", scaring people "for a laugh", the
    // flat "Ha ha ha..." — so matching the mischief reaches him, it just
    // doesn't cut as deep as being met head-on. kind lands worst (0):
    // gentleness bores him ("Why've you gone all quiet? This is boring. I'm
    // going home.") and softness gets no purchase; his tender beats (Goodnight
    // LVL 24's fear of the dark, "She's my family. I've got to cherish her.")
    // are him lowering his guard, not answering being coddled. "Didn't
    // resonate," not dislike. (Was keyworded "theatrical" — the script has no
    // performer in it: he's terse, plain, and childish, and lurks the
    // Heebie-Jeebie House to frighten people, not to put on a show.)
    //
    // The Heebie-Jeebie House is the canon story name for Shion's hangout and
    // is deliberate. constants/dialogue/reference.md calls the same place the
    // "Exciting House" (Shion's and Mio's lines) and the "Waku-Waku House"
    // (Jo's) — those are translation variants of the same location, not a
    // different building. Do not "correct" this name against the reference.
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Yandere", "Sadodere"],
    keywords: [
      "obsessive yandere — calls you 'my wife', talks of 'forever'",
      "possessive, territorial — 'Who was that man? I'll remember his face'",
      "no sense of personal space — 'Closer. Closer.'",
      "blunt, flat, childish register — short sentences, Irish lilt ('shite', \"'cause\", 'mightn't')",
      "petulant — sulks over a missed breakfast, guilt-trips ('Don't you feel sorry for me?')",
      "loves to watch fear and suffering — 'the life fading right out of his skin'",
      "frightens people for fun around the Heebie-Jeebie House",
      "casual gruesome imagery — stitching mouths shut, 'a bite of this flesh'",
      "keeps a disturbing pet",
      "devoted to his found family (Mio, Jo, Elias); rejects blood ties as 'hateful shackles'",
      "Mio's older brother and constant burden",
      "sadistic streak — 'If you want me to make you cry, come back later'",
      "lullaby motif — 'You mightn't ever wake up after it, mind'",
      "hates the night — 'it's hot, it hurts, it's hard to breathe'",
    ],
  },

  // Mortkranken
  {
    id: "jiro",
    firstName: "Jiro",
    lastName: "Kirisaki",
    house: HOUSES.MORTKRANKEN,
    exclusiveRoom: CHARACTER_ROOMS.JIRO,
    images: {
      uniform: "Jiro_Kirisaki_Uniform.png",
      casual: "Jiro_Kirisaki_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified, but cross-checked
    // against Yuri's entry, which pairs them deliberately. bold (2): "calm and
    // apathetic, seemingly unfazed by things that would normally disturb
    // others" — there is no armor to get through, so directness meets him
    // head-on. kind (1): he "shows little concern for his own deteriorating
    // health" and leans on Yuri's medication to stay upright, so someone who
    // notices reaches something real, quietly. playful (0): his one flicker of
    // humor is laughing *at* the MC's fear of corpses and ghosts, not banter
    // he trades.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Kuudere"],
    keywords: [
      "Mortkranken vice-captain",
      "blunt",
      "clinical",
      "detached",
      "efficiency-obsessed",
      "socially oblivious",
      "quietly caring",
    ],
  },
  {
    id: "yuri",
    firstName: "Yuri",
    lastName: "Isami",
    house: HOUSES.MORTKRANKEN,
    images: {
      uniform: "Yuri_Isami_Uniform.png",
      casual: "Yuri_Isami_Casual.png",
    },
    // kind is what actually reaches Yuri (affinityByResponse.kind = 2). The
    // "genius and visionary" act is armor bolted over a terror of failure and
    // loss — the opening cutscene is his life's research in flames and a small
    // voice saying "Goodbye... Mama"; Goodnight LVL 24 is "My next surgery must
    // be a success... I cannot afford another failure"; Night LVL 23 is him
    // chanting his own name to stay upright ("There is no life I can't save...
    // There can't be..."). What gets under the bravado is steady, unsentimental
    // care he would never ask for: telling him to sleep (his own "lack of sleep
    // is the root of all illness" turned back on him), letting "worm" slide,
    // not laughing at the isekai medical novel he hides. playful lands second
    // (1): he is the script's biggest fluster machine — "Good morning, M... M...
    // My", "Wh-Where did you come from!?", the Max Affinity meltdown ("You
    // belong to me... N-N-N-No, you've misunderstood!") — so teasing genuinely
    // lands, it just makes him sputter and re-arm rather than open up. bold
    // lands worst (0): his rawest nerve is his intellect and status going
    // unacknowledged ("You should feel honored", "make a genius like myself
    // wait around", Frostheim "kneeling before me"), so a blunt challenge to
    // his logic or a refusal to be his specimen hits exactly there and makes
    // him bombastic instead of honest. "Didn't resonate," not dislike. The
    // inverse of his housemate Jiro (kind 1 / bold 2), whose calm has no armor
    // to tease and so meets directness head-on.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Hinedere", "Bodere"],
    keywords: [
      "self-proclaimed genius and visionary",
      "grandiose, theatrical bravado",
      "mad-scientist menace — 'the experi— ahem, treatment'",
      "calls you 'worm' / 'test subject' / 'specimen'",
      "Mortkranken house captain",
      "shouts for his ghoul Jiro constantly",
      "experiments on Jiro under the guise of treatment",
      "savior complex — obsessed with preserving every life",
      "terror of failure and inadequacy under the bravado",
      "lost his lab and research to a fire",
      "cries for 'Mama' / Slavic mad-scientist cackle",
      "no fighter — sends Jiro on missions in his stead",
      "diligent student — 'all studies are linked'",
      "easily flustered — stammers and goes red",
      "hides an isekai medical light novel",
      "possessive over his patients — 'you belong to me'",
      "Frostheim rivalry",
    ],
  },

  // Jabberwock
  {
    id: "ren",
    firstName: "Ren",
    lastName: "Shiranami",
    house: HOUSES.JABBERWOCK,
    exclusiveRoom: CHARACTER_ROOMS.REN,
    images: {
      uniform: "Ren_Shiranami_Uniform.png",
      casual: "Ren_Shiranami_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. playful (2):
    // deadpan complaint is his whole voice — "That's harassment. Is everyone
    // in this place from the past?", the "forced labor" defence, the phone as
    // his only sanctuary — so someone who trades it back is speaking his
    // language. kind (1): "although on the surface he seems rude and uncaring,
    // Ren cares and thinks a lot" and "tends to hide his feelings", so warmth
    // reaches the real one, past the deflection. bold (0): he is "desperate to
    // avoid as much work as possible" and gets out of rooms fast, so a demand
    // is one more thing to dodge.
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ["Dandere"],
    keywords: [
      "deadpan wit",
      "slacker",
      "gamer",
      "pop culture fan",
      "meme editor",
      "observant",
      "quietly loyal",
    ],
  },
  {
    id: "haru",
    firstName: "Haru",
    lastName: "Sagara",
    house: HOUSES.JABBERWOCK,
    additionalLocations: [HOUSES.DIONYSIA],
    images: {
      uniform: "Haru_Sagara_Uniform.png",
      casual: "Haru_Sagara_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. playful (2):
    // "laid back and relentlessly cheerful", "makes jokes", and he "drags
    // those around him into trouble with his antics" — matching the bit is
    // how you join him. kind (1): he runs Jabberwock day and night and no one
    // carries him back, so being noticed lands, just under the noise. bold
    // (0): he is the one doing the pushing — a tracking device on Ren,
    // forcing him out of his room, hawking the tour "by any means possible" —
    // so force answered with force is a register he already occupies, and the
    // moment flirting actually lands he retreats.
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ["Teasedere", "Deredere"],
    keywords: [
      "playful",
      "teasing",
      "warm",
      "affectionate",
      "zookeeper",
      "devoted caretaker",
      "protective of every life in the park",
      "hardworking",
      "Jabberwock captain",
      "relentlessly optimistic — 'You'll be right, you got this!'",
      "relentless tour promoter — pushes Jabberwock at any moment",
      "drags everyone around him into his antics",
      "prosthetic right arm, kept under a black glove",
      "ex-Dionysia acrobat; a thief until Jo turned him around",
      "chickens out when flirting lands",
      "Aussie drawl",
    ],
  },
  {
    id: "towa",
    firstName: "Towa",
    lastName: "Otonashi",
    house: HOUSES.JABBERWOCK,
    images: {
      uniform: "Towa_Otonashi_Uniform.png",
      casual: "Towa_Otonashi_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified, and the profile
    // is unusually direct about it: he is "capable of reading people well,
    // understanding who is kind-hearted and who is more hostile". kind (2) is
    // literally the axis he sorts people on, and he "immediately appears
    // friendly with the MC" for having a "pleasant" presence. bold (0): read
    // as hostility, it turns him — "he stops smiling and his eyes become
    // thinner... his voice also becomes deeper, the sky becomes cloudier".
    // playful (1): the humming, bubbles and flower-eating whimsy are easy to
    // meet, they just are not what he is weighing you on.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Yandere", "Mayadere"],
    keywords: [
      "Jabberwock vice-captain",
      "childlike",
      "hums constantly",
      "obsessive",
      "intensely attached",
      "clingy",
      "possessive",
      "jealous",
      "dandelion",
      "eats flowers",
      "nature-attuned",
      "casually morbid",
      "quietly unnerving",
      "devoted",
    ],
    pmOnly: true,
  },

  // Obscuary
  {
    id: "edward",
    aliases: ["ed"],
    firstName: "Edward",
    lastName: "Hart",
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.EDWARD,
    images: {
      uniform: "Edward_Hart_Uniform.png",
      casual: "Edward_Hart_Casual.png",
    },
    // bold is what actually reaches Edward (affinityByResponse.bold = 2). The
    // frail gentleman is a performance — parasol, cough, "carry me to bed,"
    // eyesight too poor to read his own letters — and underneath it is an
    // ancient, lonely predator tired of the act. The partner who sees past it
    // and does not flinch is the one who gets there: "you've stopped
    // flinching," he observes, thrilled and put out; "wicked girl, you ought to
    // know better than to play with fire"; "what were you hoping for? Go on,
    // say it." kind lands too (1): he genuinely wants to be doted on — head on
    // your lap, held until he sleeps, "it would be troublesome for me if you
    // were to disappear" — so tending the act is welcome, just not the deepest
    // hit. playful lands worst (0): he is the one who does the teasing, and he
    // is too languid and melancholy for banter volleyed back to land — "sorry,
    // but could we continue this tomorrow?" Note this is "didn't resonate," not
    // dislike.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Bodere", "Deredere"],
    keywords: [
      "Obscuary captain, with little interest in the duties",
      "fragile act",
      "secretly the most powerful vampire",
      "old-world, courtly eloquence",
      "languid, wants to be doted on",
      "predatory charm under the manners",
      "asks before he bites",
      "detached about humans — 'they die so quickly'",
      "YouTube addict, conspiracy theories",
      "centuries-old loneliness, a lost 'her'",
      "no personal space",
      "wicked girl / lovely lady",
      "possessive",
    ],
  },
  {
    id: "rui",
    firstName: "Rui",
    lastName: "Mizuki",
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.RUI,
    images: {
      uniform: "Rui_Mizuki_Uniform.png",
      casual: "Rui_Mizuki_Casual.png",
    },
    // kind is what actually reaches Rui (affinityByResponse.kind = 2). The home
    // script is a bright surface with a crack running under it — the onion-
    // cutting excuse for red eyes, "my face is my only redeeming feature",
    // "you're not doing this all for me, are you?", "I wish I could've met you
    // as a regular guy" — and a partner who is gentle and sincere is the one
    // who gets past the cheer. playful lands too but only on the surface (1):
    // he loves matching energy ("it's illegal to take your eyes off me",
    // "leaving me on delivered! Ahaha") and enjoys the banter without it
    // touching the thing underneath. bold lands worst (0): recklessness toward
    // the curse — closing the distance he carefully keeps, testing the touch —
    // frightens him more than it flatters him ("don't think about trying to
    // grab my hand", "just be happy enough for the both of us"). Note this is
    // "didn't resonate," not dislike.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Bright Deredere"],
    keywords: [
      "Obscuary vice-captain",
      "reaper",
      "flirtatious playboy — Lyca's 'blond gigolo'",
      "against violence",
      "chases Edward off you",
      "bright soul",
      "cheer that masks his pain",
      "self-deprecating",
      "cursed touch kills the living",
      "gloves and careful distance",
      "bartender and mixologist",
      "tends the anomaly garden",
      "houseparent to Obscuary",
      "organized",
      "forward about his affection",
      "the curse means he can never feel tired, so he refuses to be idle",
    ],
  },
  {
    id: "lyca",
    firstName: "Lyca",
    lastName: "Colt",
    house: HOUSES.OBSCUARY,
    additionalLocations: [HOUSES.HOTARUBI],
    images: {
      uniform: "Lyca_Colt_Uniform.png",
      casual: "Lyca_Colt_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. kind (2): "easily
    // wary of new people, and it can take him a while to get used to being
    // around them", won over by patience — he thanked a Hotarubi student for
    // lending him a pencil, and stopped himself from harming the MC mid-
    // transformation. bold (0): he is "short-tempered, especially when he is
    // being nagged", and pressure from a stranger reads as threat before it
    // reads as interest. playful (1): he can be met in play, but note the
    // tension — he "gets irritated when he hears rumors about him or anyone
    // making fun of him", so the line between teasing and mockery is thin
    // here, and this is the weakest-evidenced 1 in the roster.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: [
      "part werewolf",
      "raised apart from humans",
      "learning to read",
      "blunt, simple speech",
      "childlike, literal phrasing",
      "coins phonetic words (thingy, so-shul skill, roo-teen)",
      "reads emotions by scent",
      "wary of strangers",
      "skittish about attraction",
      "moon-cycle transformation",
      "territorial about his dirty blanket",
      "possessive",
      "dog-like loyalty",
      "walks as bonding",
      "protective and self-sacrificing",
      "hopes to reunite with a human from his past",
      "ignores etiquette when it suits him; obedient when it counts",
      "bite scars on his arms — stops himself from biting others",
      "imprisoned on campus before he was allowed to be a student",
      "born of a human and a werewolf",
      "calls Edward 'moth-eaten Casanova'",
      "not tech-savvy",
      "hardworking, eager to prove himself",
    ],
  },

  // Sinostra
  {
    id: "taiga",
    firstName: "Taiga",
    lastName: "Hoshibami",
    house: HOUSES.SINOSTRA,
    exclusiveRoom: CHARACTER_ROOMS.TAIGA,
    images: {
      uniform: "Taiga_Hoshibami_Uniform.png",
      casual: "Taiga_Hoshibami_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. bold (2):
    // "reckless and impulsive... willing to use violence and cause trouble
    // until he gets what he wants", trigger-happy, and openly predatory
    // ("Quit squirming around. You that excited to be my next meal?") — only
    // someone who does not flinch is in the conversation. playful (1): the
    // riddles, the nicknames and the Gyahaha are real, and matching the
    // mischief reaches him. kind (0): he "gets bored easily and tends to keep
    // silent in most conversations", so softness loses him — note Elias's
    // read that "Taiga's a sensitive soul... waiting for someone who truly
    // believes in him", which is him lowering his guard, not him answering
    // being coddled. Same shape as Shion. "Didn't resonate," not dislike.
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ["Tsundere", "Thugdere"],
    keywords: [
      "rough",
      "aggressive",
      "blunt insults",
      "domineering",
      "kitten",
      "dumbass",
      "Gyahaha laugh",
      "gambler",
      "Sinostra captain",
      "huge appetite",
      "eats anomaly beasts",
      "time-slipping stigma",
      "forgets people and places",
      "fatalistic",
      "easily bored",
      "predatory flirtation",
      "possessive",
      "protective",
    ],
  },
  {
    id: "ritsu",
    firstName: "Ritsu",
    lastName: "Shinjo",
    house: HOUSES.SINOSTRA,
    images: {
      uniform: "Ritsu_Shinjo_Uniform.png",
      casual: "Ritsu_Shinjo_Casual.png",
    },
    // Derived from reference.md, not yet voiceline-verified. bold (2): he is
    // transactional to the bone and engages when he is met head-on — "when he
    // is talked ill of, his ego cracks and he retorts in response", and his
    // pitch is a challenge in itself ("As long as I am your attorney, I will
    // not allow you to stand trial before anyone"). kind (1): "he is not
    // entirely inhumane" — warmth registers, slowly, past the formality.
    // playful (0): "extraordinarily formal, and due to that, can sometimes be
    // blind to people's feelings and seem insufferable" — a joke lands in
    // front of him and simply files itself.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Kuudere"],
    keywords: [
      "Sinostra first-year",
      "lawyer",
      "legalistic",
      "analytical",
      "runs behavioral models",
      "punctual to the second",
      "transactional",
      "keeps meticulous records",
      "formal and polite",
      "diligent overachiever",
      "verbose",
      "warms up slowly",
    ],
  },
  {
    id: "romeo",
    firstName: "Romeo",
    lastName: "Scorpius Lucci",
    house: HOUSES.SINOSTRA,
    images: {
      uniform: "Romeo_Lucci_Uniform.png",
      casual: "Romeo_Lucci_Casual.png",
    },
    // bold is what Romeo actually respects (affinityByResponse.bold = 2): the
    // script hires for nerve — "someone sharp", "someone I can trust", "walk
    // with your head held high or I'll step on it" — and rewards a partner who
    // names their price and meets him level. kind reaches him too, but only
    // sideways and embarrassed — "I'm kind of happy to see you, don't tell
    // anyone" (1). playful lands worst (0): being needled genuinely gets under
    // his skin — Taiga's "Lulu", Frostheim whispering — so teasing reads as the
    // player poking a short fuse, not banter he enjoys.
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ["Teasedere", "Kanedere"],
    keywords: [
      "Sinostra vice-captain",
      "vain",
      "elaborate skincare and gym regimen",
      "money-solves-everything worldview",
      "casino floor boss",
      "protection-fee collector",
      "yells constantly",
      "coins acronyms",
      "HDY",
      "teasing sarcasm",
      "casual menace",
      "brand- and status-obsessed",
      "backhanded care",
      "fiercely claims his people",
    ],
  },

  // General (no house — encountered only at general locations)
  {
    id: "benkei",
    firstName: "Benkei",
    lastName: null,
    house: null,
    images: { uniform: "Benkei_Uniform.png", work: "Benkei_Work.png" },
    // PARTIALLY VERIFIED. reference.md has a short section for Benkei now
    // (kind hearted, warm/gentle smile, former professor and advisor to the
    // now-defunct Clementia House and Ultio House, no voiceline script), which
    // backs "gentle" and "kind" below. The affinity split, archetype, and the
    // rest of the keywords still have no source document behind them. Confirm
    // against canon before leaning on those.
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ["Deredere"],
    keywords: ["pervy", "gentle", "kind", "nostalgic", "protective"],
  },
];

export function getCharacterById(id) {
  if (!id) return null;
  const normalized = String(id).trim().toLowerCase();
  return (
    CHARACTERS.find((c) => c.id === normalized) ||
    CHARACTERS.find((c) => c.aliases && c.aliases.includes(normalized)) ||
    null
  );
}

// NOTE: getCharactersByHouse / getCharactersForLocation used to live here —
// "given a location, who can appear at it". Nothing asks that question any
// more. /roam and /meet both draw the character first and then resolve their
// settings via attributedLocations() in constants/backgrounds.js, which is the
// same character/location relation read in the opposite direction. Keeping only
// one direction means the two can never drift out of agreement.

export function getFullName(character) {
  return character.lastName
    ? `${character.firstName} ${character.lastName}`
    : character.firstName;
}

export function getCharacterImageUrl(character, variant) {
  const images = character.images;
  const key = variant && images[variant] ? variant : Object.keys(images)[0];
  const baseUrl = process.env.BASE_URL || "";
  return `${baseUrl}/assets/chars/${images[key]}`;
}

export function getRandomCharacterImageVariant(character) {
  const keys = Object.keys(character.images);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Affinity gained for a given response type, from this character's
// perspective. NEUTRAL always yields 0, regardless of character.
export function getAffinityForResponse(character, responseType) {
  if (responseType === RESPONSE_TYPES.NEUTRAL) return 0;
  return character.affinityByResponse[responseType] ?? 0;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Fallback for the /roam narration button when a character has no `approach`
// entry in dialogue.js. Deliberately generic, since it has to front any scene.
const APPROACH_LABEL_FALLBACK = [
  "Step forward",
  "Close the distance",
  "Make yourself known",
  "Walk over to them",
];

// Resolve one tier of a dialogue pool to a flat list of lines, following the
// variant map (Jo's uniform/casual pronouns) when one is present. Always returns
// a fresh array — callers merge pools with `.push`, and the source arrays live
// in DIALOGUE and must not be mutated.
function resolvePoolTier(pool, tier, variant) {
  if (!pool) return [];
  let lines = pool[tier] || pool.new;
  if (variant && lines && typeof lines === "object" && !Array.isArray(lines)) {
    lines = lines[variant] || Object.values(lines)[0];
  }
  if (Array.isArray(lines)) return [...lines];
  if (typeof lines === "string") return [lines];
  return [];
}

// The dimensions a conditional-dialogue `when` block can constrain. Each field
// is optional (absent = "don't care") and accepts a scalar or an array; every
// present field must match for the block to apply. Adding a genuinely new
// dimension means one key here, one line in matchesWhen, and one key on the
// `ctx` that encounters.js builds — nothing else.
export const DIALOGUE_WHEN_DIMENSIONS = [
  "time",
  "location",
  "background",
  "event",
];

function fieldMatches(rule, value) {
  if (rule === undefined) return true;
  return Array.isArray(rule) ? rule.includes(value) : rule === value;
}

// Evaluate a declarative `when` block against the encounter context.
export function matchesWhen(when, ctx = {}) {
  if (!when) return true;
  return (
    fieldMatches(when.time, timeBucket(ctx.now)) &&
    fieldMatches(when.location, ctx.locationKey) &&
    fieldMatches(when.background, ctx.backgroundFile) &&
    fieldMatches(when.event, ctx.event ?? null)
  );
}

// Flatten every matching conditional entry's tier into one list. `poolKey` is
// the field on each `{ when, <poolKey> }` block that holds the tiered lines —
// "dialogue" for narration, "approach" for the step-forward button.
function collectConditional(entries, poolKey, tier, variant, ctx) {
  const out = [];
  for (const entry of entries || []) {
    if (matchesWhen(entry.when, ctx)) {
      out.push(...resolvePoolTier(entry[poolKey], tier, variant));
    }
  }
  return out;
}

// `ctx` carries the encounter context: { now, locationKey, backgroundFile,
// event }. All fields optional — an absent field just means `when` rules that
// constrain it won't match.
export function getRandomDialogueLine(
  character,
  tier,
  variant = null,
  ctx = {},
) {
  const content = DIALOGUE[character.id];
  if (!content) return "...";

  // A pmOnly character (Towa) only truly speaks in the evening; the rest of the
  // day it hard-swaps to a wordless replacement pool. Gated by the same evening
  // cutoff as `_PM` backgrounds (timeBucket, off ctx.now) — not a separate
  // threshold. Separate from the additive `when` system below.
  if (
    character.pmOnly &&
    content.daytimeDialogue &&
    timeBucket(ctx.now) === "day"
  ) {
    const daytime =
      content.daytimeDialogue[tier] || content.daytimeDialogue.new;
    return Array.isArray(daytime) ? pickRandom(daytime) : daytime;
  }

  // Base pool, plus every conditional block whose `when` matches this scene —
  // the character's own `dialogueWhen` and the shared roster-wide pool. Additive:
  // a matched scene adds its flavor without ever emptying a tier.
  const lines = resolvePoolTier(content.dialogue, tier, variant);
  lines.push(
    ...collectConditional(content.dialogueWhen, "dialogue", tier, variant, ctx),
  );
  lines.push(
    ...collectConditional(SHARED_DIALOGUE_WHEN, "dialogue", tier, variant, ctx),
  );

  if (lines.length === 0) return "...";
  return pickRandom(lines);
}

// The greeting rendered onto the encounter image. Driven only by the character's
// temperament tier — never by time, location, or event.
export function getTemperamentGreeting(character, tier) {
  const content = DIALOGUE[character.id] || {};
  const lines = resolvePoolTier(content.temperamentDialogue, tier, null);
  if (lines.length === 0) return "...";
  return pickRandom(lines);
}

// The label on the single button that turns the /roam narration into an actual
// encounter — the "Step forward" beat. Tiered like the dialogue so the
// invitation matches the scene the narration just set. `approachWhen` (per
// character) and SHARED_APPROACH_WHEN add scene/time-specific labels the same
// way `dialogueWhen` adds narration; the pmOnly daytime swap is still a hard
// replacement, gated on the evening cutoff. `ctx` is the same object
// getRandomDialogueLine takes.
export function getRandomApproachLabel(
  character,
  tier,
  variant = null,
  ctx = {},
) {
  const content = DIALOGUE[character.id];
  if (!content) return pickRandom(APPROACH_LABEL_FALLBACK);

  if (
    character.pmOnly &&
    content.daytimeApproach &&
    timeBucket(ctx.now) === "day"
  ) {
    const daytime =
      content.daytimeApproach[tier] || content.daytimeApproach.new;
    return Array.isArray(daytime) ? pickRandom(daytime) : daytime;
  }

  const labels = resolvePoolTier(content.approach, tier, variant);
  labels.push(
    ...collectConditional(content.approachWhen, "approach", tier, variant, ctx),
  );
  labels.push(
    ...collectConditional(SHARED_APPROACH_WHEN, "approach", tier, variant, ctx),
  );

  if (labels.length === 0) return pickRandom(APPROACH_LABEL_FALLBACK);
  return pickRandom(labels);
}

// `ctx` (optional, same shape as getRandomDialogueLine's) lets a character's
// `responsesWhen` blocks add scene/time-specific button labels. No shared layer
// for responses — a bespoke choice ("Stay till the lanterns are out") is always
// character-specific.
export function generateCharacterResponses(character, tier = "new", ctx = {}) {
  const archetypes = character.archetype || [];
  const keywords = character.keywords || [];

  const archetypeSet = new Set(archetypes.map((a) => a.toLowerCase()));
  const keywordSet = new Set(keywords.map((k) => k.toLowerCase()));

  // Define response options based on archetype + keywords combinations + relationship tier
  const responses = {
    [RESPONSE_TYPES.KIND]: generateKindResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
    [RESPONSE_TYPES.PLAYFUL]: generatePlayfulResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
    [RESPONSE_TYPES.BOLD]: generateBoldResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
    [RESPONSE_TYPES.NEUTRAL]: generateNeutralResponse(
      character,
      archetypeSet,
      keywordSet,
      tier,
      ctx,
    ),
  };

  return responses;
}

// Button labels live in constants/dialogue.js, authored at three tiers rather
// than all six — the buttons only need to change where the register does. The
// dialogue tiers that share a register share a label set: everything up to
// "warm" reads as an approach, "spark" turns flirtatious, "close" is intimate,
// "bound" is romantic.
const RESPONSE_LABEL_TIER = {
  new: "new",
  known: "new",
  warm: "new",
  spark: "spark",
  close: "close",
  bound: "bound",
};

// Each slot is a collection, picked from at random so a character the player
// sees often doesn't always get the same four buttons. Base labels come from
// `responses`; any `responsesWhen` block whose `when` matches `ctx` adds its
// labels on top. A character with nothing here falls through to the archetype
// defaults below.
function responseLabel(characterId, responseType, tier, ctx = {}) {
  const content = DIALOGUE[characterId];
  const labelTier = RESPONSE_LABEL_TIER[tier] || "new";
  const labels = resolvePoolTier(
    content?.responses?.[responseType],
    labelTier,
    null,
  );
  for (const entry of content?.responsesWhen || []) {
    if (matchesWhen(entry.when, ctx)) {
      labels.push(
        ...resolvePoolTier(entry.responses?.[responseType], labelTier, null),
      );
    }
  }
  if (labels.length === 0) return null;
  return pickRandom(labels);
}

function generateKindResponse(character, archetypeSet, keywordSet, tier, ctx) {
  const label = responseLabel(character.id, RESPONSE_TYPES.KIND, tier, ctx);
  if (label) return { label };

  if (
    archetypeSet.has("kuudere") ||
    archetypeSet.has("tsundere") ||
    archetypeSet.has("yandere")
  ) {
    return { label: "Be honest with them" };
  }
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere")) {
    return { label: "Light up with warmth" };
  }
  if (archetypeSet.has("dandere")) {
    return { label: "Speak gently" };
  }
  if (
    archetypeSet.has("oujidere") ||
    archetypeSet.has("charismatic oujidere")
  ) {
    return { label: "Admire them openly" };
  }

  return { label: "Offer kind words" };
}

function generatePlayfulResponse(
  character,
  archetypeSet,
  keywordSet,
  tier,
  ctx,
) {
  const label = responseLabel(character.id, RESPONSE_TYPES.PLAYFUL, tier, ctx);
  if (label) return { label };

  if (archetypeSet.has("teasedere")) return { label: "Tease them back" };
  if (archetypeSet.has("sadodere")) return { label: "Make them laugh" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bakadere"))
    return { label: "Share a laugh" };
  if (archetypeSet.has("yandere")) return { label: "Play their game" };
  if (archetypeSet.has("kuudere")) return { label: "Exchange wit with them" };

  return { label: "Crack a joke" };
}

function generateBoldResponse(character, archetypeSet, keywordSet, tier, ctx) {
  const label = responseLabel(character.id, RESPONSE_TYPES.BOLD, tier, ctx);
  if (label) return { label };

  if (archetypeSet.has("yandere")) return { label: "Match their intensity" };
  if (archetypeSet.has("sadodere")) return { label: "Challenge them directly" };
  if (archetypeSet.has("tsundere") || archetypeSet.has("thugdere"))
    return { label: "Stand your ground" };
  if (archetypeSet.has("oujidere") || archetypeSet.has("charismatic oujidere"))
    return { label: "Be bold and charming" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Express yourself boldly" };
  if (archetypeSet.has("kuudere")) return { label: "Make a bold move" };

  return { label: "Flirt boldly" };
}

function generateNeutralResponse(
  character,
  archetypeSet,
  keywordSet,
  tier,
  ctx,
) {
  const label = responseLabel(character.id, RESPONSE_TYPES.NEUTRAL, tier, ctx);
  if (label) return { label };

  if (archetypeSet.has("kuudere") || archetypeSet.has("dandere"))
    return { label: "Stay quiet" };
  if (archetypeSet.has("yandere")) return { label: "Observe them carefully" };
  if (archetypeSet.has("deredere") || archetypeSet.has("bright deredere"))
    return { label: "Simply be present" };
  if (archetypeSet.has("sadodere")) return { label: "Watch and listen" };

  return { label: "Stay silent" };
}
