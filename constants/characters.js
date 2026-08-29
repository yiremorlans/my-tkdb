// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
import { HOUSES, CHARACTER_ROOMS } from './backgrounds.js';

export const RESPONSE_TYPES = {
  KIND: 'kind',
  PLAYFUL: 'playful',
  BOLD: 'bold',
  NEUTRAL: 'neutral',
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
    id: 'jin',
    firstName: 'Jin',
    lastName: 'Kamurai',
    house: HOUSES.FROSTHEIM,
    exclusiveRoom: CHARACTER_ROOMS.JIN,
    images: { uniform: 'Jin_Kamurai_Uniform.png', casual: 'Jin_Kamurai_Casual.png' },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ['Himedere', 'Oujidere'],
    keywords: ['arrogant', 'high-status', 'treats others as servants', 'short-spoken', 'protective', 'aristocratic'],
    dialogue: {
      new: ['The frost never bothered him — but he\'s curious why you\'re here.'],
      warm: ['He almost smiles now when he sees you coming — almost.'],
      close: ['The ice in his voice is long gone around you. "I was hoping I\'d run into you."'],
    },
    temperamentDialogue: {
      new: ['You\'re not supposed to be here. Don\'t waste my time.'],
      warm: ['Your presence is... tolerable.'],
      close: ['I suppose I can make an exception for you.'],
    },
  },
  {
    id: 'kaito',
    firstName: 'Kaito',
    lastName: 'Fuji',
    house: HOUSES.FROSTHEIM,
    images: { uniform: 'Kaito_Fuji_Uniform.png', casual: 'Kaito_Fuji_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    archetype: ['Bakadere'],
    keywords: ['excitable', 'clumsy', 'loud', 'expressive', 'good-hearted', 'enthusiastic'],
    dialogue: {
      new: ['He flashes a sharp grin. "Lost, or just brave enough to wander into Frostheim?"'],
      warm: ['He nudges your shoulder like you\'re already part of his crew.'],
      close: ['"Took you long enough," he grins, pulling you into a quick shoulder-bump hug.'],
    },
    temperamentDialogue: {
      new: ['YO! Another fresh face! You lost or what?'],
      warm: ['Hey, you! Ready to hang out?'],
      close: ['You made it! I was hoping you\'d show up!'],
    },
  },
  {
    id: 'lucas',
    firstName: 'Lucas',
    lastName: 'Errant',
    house: HOUSES.FROSTHEIM,
    images: { uniform: 'Lucas_Errant_Uniform.png', casual: 'Lucas_Errant_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ['Dandere', 'Pure Angel'],
    keywords: ['polite', 'soft-spoken', 'innocent', 'protective', 'gentle', 'sincere'],
    dialogue: {
      new: ['He studies you for a long moment before offering the faintest nod.'],
      warm: ['He offers a small, genuine smile now instead of just a nod.'],
      close: ['"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."'],
    },
    temperamentDialogue: {
      new: ['Oh... hello. Please, be careful around here.'],
      warm: ['I\'m glad you\'re safe. How have you been?'],
      close: ['Your safety means more to me than anything else.'],
    },
  },
  {
    id: 'tohma',
    firstName: 'Tohma',
    lastName: 'Ishibashi',
    house: HOUSES.FROSTHEIM,
    additionalHouses: [HOUSES.VAGASTROM],
    additionalRooms: [CHARACTER_ROOMS.JIN],
    images: { uniform: 'Tohma_Ishibashi_Uniform.png', casual: 'Tohma_Ishibashi_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Kuudere'],
    keywords: ['serious', 'blunt', 'rule-focused', 'lawful neutral', 'composed', 'mission-oriented'],
    dialogue: {
      new: ['Calm as still water, he tilts his head. "You\'re new around here."'],
      warm: ['His usual calm softens into something warmer whenever you\'re near.'],
      close: ['"You\'ve become someone I look forward to seeing," he says plainly, like it\'s just a fact.'],
    },
    temperamentDialogue: {
      new: ['State your purpose here.'],
      warm: ['I see you again. That\'s... acceptable.'],
      close: ['Your company is preferred. To my surprise.'],
    },
  },

  // Vagastrom
  {
    id: 'alan',
    firstName: 'Alan',
    lastName: 'Mido',
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.ALAN,
    images: { uniform: 'Alan_Mido_Uniform.png', casual: 'Alan_Mido_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ['Kuudere'],
    keywords: ['stoic', 'quiet', 'practical', 'emotionally distant', 'reliable', 'mechanical'],
    dialogue: {
      new: ['Grease-streaked hands, easy grin. "Careful, this place bites."'],
      warm: ['He waves you over immediately, already mid-joke.'],
      close: ['"Hey, you," he grins, tossing you a rag. "Stick around, I\'ll teach you everything."'],
    },
    temperamentDialogue: {
      new: ['Don\'t touch anything. Unless you enjoy explosions.'],
      warm: ['You know how things work here now. Good.'],
      close: ['You\'re the only one I don\'t mind working alongside.'],
    },
  },
  {
    id: 'leo',
    firstName: 'Leo',
    lastName: 'Kurosagi',
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.LEO,
    images: { uniform: 'Leo_Kurosagi_Uniform.png', casual: 'Leo_Kurosagi_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Sadodere', 'Teasedere'],
    keywords: ['cynical', 'mocking', 'ego-driven', 'influencer', 'teasing', 'sharp-tongued'],
    dialogue: {
      new: ['He revs an engine that isn\'t there just to make you jump.'],
      warm: ['He tosses you a helmet without asking — you\'re riding with him now.'],
      close: ['"Knew you\'d come back," he says, engine already running just for you.'],
    },
    temperamentDialogue: {
      new: ['Well, well. Another NPC stumbles into Vagastrom. How thrilling.'],
      warm: ['Oh, look who\'s back. Did you miss me tormenting you?'],
      close: ['I\'ll admit it—you\'re more interesting than most. Don\'t let it go to your head.'],
    },
  },
  {
    id: 'shohei',
    firstName: 'Shohei',
    lastName: 'Haizono',
    house: HOUSES.VAGASTROM,
    exclusiveRoom: CHARACTER_ROOMS.SHOHEI,
    images: { uniform: 'Shohei_Haizono_Uniform.png', casual: 'Shohei_Haizono_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Deredere'],
    keywords: ['sweet', 'respectful', 'underclassman', 'nonchalant', 'friendly', 'earnest'],
    dialogue: {
      new: ['He leans against the garage wall, watching you with quiet interest.'],
      warm: ['He actually steps away from the wall to greet you properly.'],
      close: ['"I was hoping it\'d be you," he says softly, quiet interest turned into something more.'],
    },
    temperamentDialogue: {
      new: ['Oh! Senpai! What brings you by?'],
      warm: ['Senpai! I\'m always happy to see you around.'],
      close: ['Senpai... I\'m really glad you\'re here. You know that, right?'],
    },
  },

  // Hotarubi
  {
    id: 'subaru',
    firstName: 'Subaru',
    lastName: 'Kagami',
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.SUBARU,
    images: { uniform: 'Subaru_Kagami_Uniform.png', casual: 'Subaru_Kagami_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Dandere', 'Megaredere'],
    keywords: ['polite', 'earnest', 'hardworking', 'captain', 'overly kind', 'bottled emotions', 'responsible'],
    dialogue: {
      new: ['Lantern light catches his eyes as he offers a soft, knowing smile.'],
      warm: ['His smile brightens the moment he spots you.'],
      close: ['"I\'ve been waiting for you," he says, lantern light warm against his gentle expression.'],
    },
    temperamentDialogue: {
      new: ['Welcome. Please, make yourself comfortable.'],
      warm: ['You\'re here... I\'m very glad.'],
      close: ['I... I\'ve missed you more than I should admit.'],
    },
  },
  {
    id: 'zenji',
    firstName: 'Zenji',
    lastName: 'Kotodama',
    house: HOUSES.HOTARUBI,
    exclusiveRoom: CHARACTER_ROOMS.ZENJI,
    images: { uniform: 'Zenji_Kotodama_Uniform.png', casual: 'Zenji_Kotodama_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ['Deredere'],
    keywords: ['empathetic', 'gentle', 'caring', 'observant', 'haiku-writer', 'warm', 'spiritual'],
    dialogue: {
      new: ['He bows slightly, voice like a low temple bell. "Welcome, traveler."'],
      warm: ['His bow deepens, a mark of real respect now. "Welcome back, friend."'],
      close: ['"Your visits mean more to me than you know," he says, voice gentle as temple bells.'],
    },
    temperamentDialogue: {
      new: ['Autumn winds carry you here. Welcome, wanderer.'],
      warm: ['You return like seasons turning. My heart is at ease.'],
      close: ['With you, the world feels right. Like poetry made real.'],
    },
  },
  {
    id: 'haku',
    firstName: 'Haku',
    lastName: 'Kusanagi',
    house: HOUSES.HOTARUBI,
    images: { uniform: 'Haku_Kusanagi_Uniform.png', casual: 'Haku_Kusanagi_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ['Oujidere'],
    keywords: ['formal', 'courtesy', 'flirty', 'priest-family', 'charming', 'chickens out', 'teasing'],
    dialogue: {
      new: ['Petals drift past him undisturbed; he seems used to visitors like you.'],
      warm: ['He picks a petal from his sleeve and offers it to you without a word.'],
      close: ['"Every visitor drifts on," he murmurs, "but you keep coming back to me."'],
    },
    temperamentDialogue: {
      new: ['How lovely. A visitor graces us with their presence.'],
      warm: ['Princess, you honor us with your return.'],
      close: ['I... you\'ve become someone I always look forward to seeing.'],
    },
  },

  // Dionysia
  {
    id: 'elias',
    firstName: 'Elias',
    lastName: 'Pratt',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Elias_Pratt_Uniform.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    archetype: ['Kuudere', 'Shundere'],
    keywords: ['charming southern gentleman', 'manipulative', 'former captain', 'tired', 'demoted', 'smooth-talking'],
    dialogue: {
      new: ['He juggles a stray coin between his fingers. "New audience — how lovely."'],
      warm: ['He tosses you a coin instead of just juggling it. "For luck. And for you."'],
      close: ['"Every show needs a star," he winks. "Lately, that\'s been you."'],
    },
    temperamentDialogue: {
      new: ['Well, hello there, sugar. New face in town?'],
      warm: ['Always a pleasure to see you again, darlin\'.'],
      close: ['You\'ve become my favorite thing about this place, you know.'],
    },
  },
  {
    id: 'jo',
    firstName: 'Jo',
    lastName: 'Kongoza',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Jo_Kongoza_Uniform.png', casual: 'Jo_Kongoza_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Charismatic Oujidere'],
    keywords: ['brilliant performer', 'commands attention', 'Venus of Dionysia', 'transformation artifact', 'beautiful', 'legendary'],
    dialogue: {
      new: {
        uniform: ['The spotlight finds him as he commands the stage with magnetic presence.'],
        casual: ['The spotlight finds her as she commands the stage with magnetic presence.'],
      },
      warm: {
        uniform: ['He lights up the moment he sees you, the star already in motion for you.'],
        casual: ['She lights up the moment she sees you, the star already in motion for you.'],
      },
      close: {
        uniform: ['For you, he\'d abandon every performance, every act. Just to be himself.'],
        casual: ['For you, she\'d abandon every performance, every act. Just to be herself.'],
      },
    },
    temperamentDialogue: {
      new: ['A new admirer! How delightful! What\'s your name?'],
      warm: ['You\'re back! I was hoping you\'d return.'],
      close: ['With you, I don\'t need to perform. I can just be myself.'],
    },
  },
  {
    id: 'mio',
    firstName: 'Mio',
    lastName: 'Susuhara',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Mio_Susuhara_Uniform.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Deredere'],
    keywords: ['reliable', 'loyal', 'caretaker', 'glue of the group', 'socially aware', 'smooth', 'mediator'],
    dialogue: {
      new: ['She peers at you from behind a curtain, delighted by the surprise.'],
      warm: ['She steps fully out from behind the curtain now, no longer shy around you.'],
      close: ['"I don\'t hide from you anymore," she smiles. "I don\'t need to."'],
    },
    temperamentDialogue: {
      new: ['Oh! Welcome! Can I get you anything?'],
      warm: ['It\'s nice seeing you. You know you\'re always welcome here.'],
      close: ['You\'ve become someone really important to me. I hope you know that.'],
    },
  },
  {
    id: 'shion',
    firstName: 'Shion',
    lastName: 'Genkai',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Shion_Genkai_Uniform.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    archetype: ['Yandere', 'Sadodere'],
    keywords: ['obsessive', 'protective', 'loves to watch suffering', 'dangerous', 'intense', 'theatrical', 'cruel'],
    dialogue: {
      new: ['A masked bow, a theatrical flourish. "Welcome to the show."'],
      warm: ['The mask tilts your way first, before anyone else in the room.'],
      close: ['"For you," Shion says, lifting the mask just enough to show a genuine smile.'],
    },
    temperamentDialogue: {
      new: ['What a delicious expression. I wonder what frightens you?'],
      warm: ['You came back. How... thrilling. I missed that look in your eyes.'],
      close: ['You\'re mine to protect. No one else gets to hurt you but me.'],
    },
  },

  // Mortkranken
  {
    id: 'jiro',
    firstName: 'Jiro',
    lastName: 'Kirisaki',
    house: HOUSES.MORTKRANKEN,
    exclusiveRoom: CHARACTER_ROOMS.JIRO,
    images: { uniform: 'Jiro_Kirisaki_Uniform.png', casual: 'Jiro_Kirisaki_Casual.png' },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    archetype: ['Kuudere'],
    keywords: ['blunt', 'straight-to-the-point', 'no fluff', 'charming laugh', 'serious', 'direct'],
    dialogue: {
      new: ['He doesn\'t look up from his notes. "Another test subject, then?"'],
      warm: ['He finally looks up from his notes when you walk in.'],
      close: ['"You\'re not a subject anymore," he says quietly. "You\'re just... someone I want to see."'],
    },
    temperamentDialogue: {
      new: ['You\'re not qualified for this. Leave.'],
      warm: ['You. Stay for a moment.'],
      close: ['I don\'t usually make exceptions. But for you... I will.'],
    },
  },
  {
    id: 'yuri',
    firstName: 'Yuri',
    lastName: 'Isami',
    house: HOUSES.MORTKRANKEN,
    images: { uniform: 'Yuri_Isami_Uniform.png', casual: 'Yuri_Isami_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ['Sadodere', 'Hinedere'],
    keywords: ['cynical', 'medical genius', 'cold', 'easily flustered', 'callous exterior', 'mocking'],
    dialogue: {
      new: ['Cold eyes soften just slightly. "You shouldn\'t wander here alone."'],
      warm: ['The cold in his eyes has all but melted whenever you\'re around.'],
      close: ['"I worry about you when you\'re not here," he admits, like it costs him something to say it.'],
    },
    temperamentDialogue: {
      new: ['A novice stumbles in. How amusing.'],
      warm: ['You again? ...I suppose I don\'t mind.'],
      close: ['Don\'t go worrying me like that. I have better things to do than panic over you.'],
    },
  },

  // Jabberwock
  {
    id: 'ren',
    firstName: 'Ren',
    lastName: 'Shiranami',
    house: HOUSES.JABBERWOCK,
    exclusiveRoom: CHARACTER_ROOMS.REN,
    images: { uniform: 'Ren_Shiranami_Uniform.png', casual: 'Ren_Shiranami_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Dandere'],
    keywords: ['quiet', 'slacker', 'gamer', 'pop culture fan', 'keeps to himself', 'observant', 'loyal'],
    dialogue: {
      new: ['He crouches by the field\'s edge, sizing you up like prey — or a friend.'],
      warm: ['He stops sizing you up — you\'re pack, now.'],
      close: ['"You\'re mine to look out for," he says simply, like it was never in question.'],
    },
    temperamentDialogue: {
      new: ['...Who are you?'],
      warm: ['You\'re alright.'],
      close: ['I\'ll always have your back. Always.'],
    },
  },
  {
    id: 'haru',
    firstName: 'Haru',
    lastName: 'Sagara',
    house: HOUSES.JABBERWOCK,
    additionalHouses: [HOUSES.DIONYSIA],
    images: { uniform: 'Haru_Sagara_Uniform.png', casual: 'Haru_Sagara_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    archetype: ['Teasedere', 'Deredere'],
    keywords: ['playful', 'charming', 'warm', 'mischievous', 'thoughtful', 'affectionate', 'flirty'],
    dialogue: {
      new: ['Dirt on his boots, mischief in his eyes. "You\'re either lost or looking for trouble."'],
      warm: ['He grins the second he sees you, already planning some trouble for two.'],
      close: ['"You\'re the best kind of trouble I\'ve found," he says, nudging you with his shoulder.'],
    },
    temperamentDialogue: {
      new: ['Well, well! Someone interesting wandered in!'],
      warm: ['Hey, Ojou-chan! Miss me?'],
      close: ['I really like seeing you smile. Can I be honest about that?'],
    },
  },
  {
    id: 'towa',
    firstName: 'Towa',
    lastName: 'Otonashi',
    house: HOUSES.JABBERWOCK,
    images: { uniform: 'Towa_Otonashi_Uniform.png', casual: 'Towa_Otonashi_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Yandere', 'Mayadere'],
    keywords: ['obsessive', 'intensely attached', 'clinging', 'dandelion', 'dangerous vibe', 'possessive', 'devoted'],
    pmOnly: true,
    dialogue: {
      new: ['Quiet as the mountain air, he simply watches you approach.'],
      warm: ['He breaks his usual silence just to say your name.'],
      close: ['"The mountain\'s quiet," he says, "but you make it feel less lonely."'],
    },
    amOnlyDialogue: {
      new: ['~~~!'],
      warm: ['~~~!'],
      close: ['~~~!'],
    },
    temperamentDialogue: {
      new: ['...Dandelion?'],
      warm: ['Dandelion. You\'re here. That\'s all that matters.'],
      close: ['You\'re mine. Only mine. Promise me you\'ll never leave.'],
    },
  },

  // Obscuary
  {
    id: 'edward',
    firstName: 'Edward',
    lastName: 'Hart',
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.EDWARD,
    images: { uniform: 'Edward_Hart_Uniform.png', casual: 'Edward_Hart_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Bodere', 'Deredere'],
    keywords: ['fragile act', 'powerful vampire', 'affectionate', 'flirty', 'no personal space', 'lovely lady', 'possessive'],
    dialogue: {
      new: ['A slow, practiced smile. "Curious guest — welcome to my parlor."'],
      warm: ['His practiced smile turns into something a little more real for you.'],
      close: ['"You\'ve seen past the performance," he admits. "I don\'t mind, with you."'],
    },
    temperamentDialogue: {
      new: ['Oh my, what a lovely lady. Welcome to my home.'],
      warm: ['Lovely lady, I was hoping you\'d visit. Come closer.'],
      close: ['You belong right here, next to me. Don\'t ever leave.'],
    },
  },
  {
    id: 'rui',
    firstName: 'Rui',
    lastName: 'Mizuki',
    house: HOUSES.OBSCUARY,
    exclusiveRoom: CHARACTER_ROOMS.RUI,
    images: { uniform: 'Rui_Mizuki_Uniform.png', casual: 'Rui_Mizuki_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    archetype: ['Bright Deredere'],
    keywords: ['bright soul', 'reaper', 'cursed', 'organized', 'enthusiastic', 'caring', 'flirty', 'cannot touch'],
    dialogue: {
      new: ['He tilts his head, unreadable. "You\'re not supposed to be here. I don\'t mind."'],
      warm: ['He doesn\'t bother hiding his interest in you anymore.'],
      close: ['"You\'re the one exception to every rule I\'ve made," he says, unreadable no longer.'],
    },
    temperamentDialogue: {
      new: ['You\'re not supposed to be here, but... I\'m really happy you are!'],
      warm: ['Welcome! You make everything brighter just by being here.'],
      close: ['Even with this curse, I\'d bear it a thousand times if it meant seeing you smile.'],
    },
  },
  {
    id: 'lyca',
    firstName: 'Lyca',
    lastName: 'Colt',
    house: HOUSES.OBSCUARY,
    additionalHouses: [HOUSES.HOTARUBI],
    images: { uniform: 'Lyca_Colt_Uniform.png', casual: 'Lyca_Colt_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    archetype: ['Deredere'],
    keywords: ['loyal companion', 'empathetic', 'emotionally intelligent', 'learns constantly', 'observant', 'hardworking', 'protective'],
    dialogue: {
      new: ['She leans in the doorway, arms crossed. "Well, look what wandered in."'],
      warm: ['Her arms uncross the moment she sees it\'s you.'],
      close: ['"Don\'t tell anyone," she says, softening, "but I look forward to you wandering in."'],
    },
    temperamentDialogue: {
      new: ['Oh? Someone new. I\'ll keep an eye on you.'],
      warm: ['You\'re back. I\'m... happy about that.'],
      close: ['Seeing you safe and happy is the most important thing to me.'],
    },
  },

  // Sinostra
  {
    id: 'taiga',
    firstName: 'Taiga',
    lastName: 'Hoshibami',
    house: HOUSES.SINOSTRA,
    exclusiveRoom: CHARACTER_ROOMS.TAIGA,
    images: { uniform: 'Taiga_Hoshibami_Uniform.png', casual: 'Taiga_Hoshibami_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Tsundere', 'Thugdere'],
    keywords: ['rough', 'aggressive', 'insults', 'kitten', 'dumbass', 'protective', 'flirty', 'loyal'],
    dialogue: {
      new: ['Cards shuffle idly in his hands. "Care to make this interesting?"'],
      warm: ['He deals you in without needing to ask. "You\'re always welcome at my table."'],
      close: ['"You\'re the only bet I\'ve never wanted to hedge," he says, setting the cards down.'],
    },
    temperamentDialogue: {
      new: ['What are you doing here?'],
      warm: ['...So you came back, kitten?'],
      close: ['Don\'t you dare go getting hurt. That\'s MY job to protect you.'],
    },
  },
  {
    id: 'ritsu',
    firstName: 'Ritsu',
    lastName: 'Shinjo',
    house: HOUSES.SINOSTRA,
    images: { uniform: 'Ritsu_Shinjo_Uniform.png', casual: 'Ritsu_Shinjo_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    archetype: ['Kuudere'],
    keywords: ['analytical', 'legalistic', 'lawyer', 'verbose', 'calculation', 'logical', 'warms up slowly'],
    dialogue: {
      new: ['He studies you like a hand he hasn\'t decided how to play yet.'],
      warm: ['He\'s stopped calculating you — now he just enjoys your company.'],
      close: ['"I\'ve decided how to play this," he says softly. "I\'m not folding on you."'],
    },
    temperamentDialogue: {
      new: ['An interesting variable has entered the equation.'],
      warm: ['Your presence is... not unwelcome.'],
      close: ['You\'ve become the most important factor in any calculation I make.'],
    },
  },
  {
    id: 'romeo',
    firstName: 'Romeo',
    lastName: 'Lucci',
    house: HOUSES.SINOSTRA,
    images: { uniform: 'Romeo_Lucci_Uniform.png', casual: 'Romeo_Lucci_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    archetype: ['Teasedere', 'Kanedere'],
    keywords: ['sassy', 'money-oriented', 'high-maintenance', 'teasing sarcasm', 'yells', 'acronyms', 'HDY', 'genuine concern'],
    dialogue: {
      new: ['A sly wink. "Every newcomer\'s a gamble. Let\'s see what you\'re worth."'],
      warm: ['His sly wink turns into something warmer, just for you.'],
      close: ['"Every gamble needs a sure thing," he says. "You\'ve become mine."'],
    },
    temperamentDialogue: {
      new: ['HDY showing up here? You lost or stupid?'],
      warm: ['Oh, you came back! I\'m impressed you survived this long.'],
      close: ['I\'d spend all my money on you if you asked. Not that I\'d ever admit that normally.'],
    },
  },

  // General (no house — encountered only at general locations)
  {
    id: 'benkei',
    firstName: 'Benkei',
    lastName: null,
    house: null,
    images: { uniform: 'Benkei_Uniform.png', work: 'Benkei_Work.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    archetype: ['Deredere'],
    keywords: ['old caretaker', 'hardworking', 'gentle', 'kind', 'nostalgic', 'wise', 'protective'],
    dialogue: {
      new: ['The old caretaker looks up from his work. "Don\'t see many folks out this far."'],
      warm: ['He sets his tools down properly to chat with you now.'],
      close: ['"You remind me why I still like this old place," he says, warm and genuine.'],
    },
    temperamentDialogue: {
      new: ['Ah, young one. What brings you to these parts?'],
      warm: ['Welcome back. It\'s good to see a familiar face.'],
      close: ['You\'re like family to me now. I hope you know that.'],
    },
  },
];

export function getCharacterById(id) {
  return CHARACTERS.find((c) => c.id === id) || null;
}

export function getCharactersByHouse(house) {
  return CHARACTERS.filter((c) => c.house === house || (c.additionalHouses && c.additionalHouses.includes(house)));
}

// Characters eligible to appear at a given location: same-house characters,
// plus (for general locations) every character in the game.
// Exclusive rooms only allow their specific character.
export function getCharactersForLocation(locationKey, isGeneral) {
  if (isGeneral) return CHARACTERS;

  // Check if this is an exclusive room location
  const charsForRoom = CHARACTERS.filter((c) => c.exclusiveRoom === locationKey || (c.additionalRooms && c.additionalRooms.includes(locationKey)));
  if (charsForRoom.length > 0) return charsForRoom;

  return getCharactersByHouse(locationKey);
}

export function getFullName(character) {
  return character.lastName ? `${character.firstName} ${character.lastName}` : character.firstName;
}

export function getCharacterImageUrl(character, variant) {
  const images = character.images;
  const key = variant && images[variant] ? variant : Object.keys(images)[0];
  const baseUrl = process.env.BASE_URL || '';
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

export function getRandomDialogueLine(character, tier, variant = null, now = null) {
  // Handle pmOnly characters (e.g., Towa can only speak in afternoon/evening)
  if (character.pmOnly && character.amOnlyDialogue && now) {
    const hour = now.getHours();
    // AM is 0-11 (midnight to 11:59 AM), PM is 12-23 (noon to 11:59 PM)
    if (hour < 12) {
      const amLines = character.amOnlyDialogue[tier] || character.amOnlyDialogue.new;
      return Array.isArray(amLines) ? amLines[Math.floor(Math.random() * amLines.length)] : amLines;
    }
  }

  let lines = character.dialogue[tier] || character.dialogue.new;

  // Handle variant-specific dialogue (e.g., Jo with different pronouns for casual vs uniform)
  if (variant && typeof lines === 'object' && !Array.isArray(lines) && lines[variant]) {
    lines = lines[variant];
  }

  return Array.isArray(lines) ? lines[Math.floor(Math.random() * lines.length)] : lines;
}

export function getTemperamentGreeting(character, tier) {
  const temperamentLines = character.temperamentDialogue || {};
  const lines = temperamentLines[tier] || temperamentLines.new || ['...'];
  return lines[Math.floor(Math.random() * lines.length)];
}
