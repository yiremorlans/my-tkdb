// Reference data for every character in assets/chars, grouped by the house
// they belong to (matched against character-named rooms in assets/bg where
// possible). Characters with `house: null` are general encounters only —
// they can turn up at any GENERAL_LOCATIONS spot (see constants/backgrounds.js),
// never inside another house.
import { HOUSES } from './backgrounds.js';

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
    images: { uniform: 'Jin_Kamurai_Uniform.png', casual: 'Jin_Kamurai_Casual.png' },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    dialogue: {
      new: ['The frost never bothered him — but he\'s curious why you\'re here.'],
      warm: ['He almost smiles now when he sees you coming — almost.'],
      close: ['The ice in his voice is long gone around you. "I was hoping I\'d run into you."'],
    },
  },
  {
    id: 'kaito',
    firstName: 'Kaito',
    lastName: 'Fuji',
    house: HOUSES.FROSTHEIM,
    images: { uniform: 'Kaito_Fuji_Uniform.png', casual: 'Kaito_Fuji_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    dialogue: {
      new: ['He flashes a sharp grin. "Lost, or just brave enough to wander into Frostheim?"'],
      warm: ['He nudges your shoulder like you\'re already part of his crew.'],
      close: ['"Took you long enough," he grins, pulling you into a quick shoulder-bump hug.'],
    },
  },
  {
    id: 'lucas',
    firstName: 'Lucas',
    lastName: 'Errant',
    house: HOUSES.FROSTHEIM,
    images: { uniform: 'Lucas_Errant_Uniform.png', casual: 'Lucas_Errant_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    dialogue: {
      new: ['He studies you for a long moment before offering the faintest nod.'],
      warm: ['He offers a small, genuine smile now instead of just a nod.'],
      close: ['"I don\'t say this to just anyone," he admits quietly, "but I\'m glad you\'re here."'],
    },
  },
  {
    id: 'tohma',
    firstName: 'Tohma',
    lastName: 'Ishibashi',
    house: HOUSES.FROSTHEIM,
    images: { uniform: 'Tohma_Ishibashi_Uniform.png', casual: 'Tohma_Ishibashi_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    dialogue: {
      new: ['Calm as still water, he tilts his head. "You\'re new around here."'],
      warm: ['His usual calm softens into something warmer whenever you\'re near.'],
      close: ['"You\'ve become someone I look forward to seeing," he says plainly, like it\'s just a fact.'],
    },
  },

  // Vagastrom
  {
    id: 'alan',
    firstName: 'Alan',
    lastName: 'Mido',
    house: HOUSES.VAGASTROM,
    images: { uniform: 'Alan_Mido_Uniform.png', casual: 'Alan_Mido_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    dialogue: {
      new: ['Grease-streaked hands, easy grin. "Careful, this place bites."'],
      warm: ['He waves you over immediately, already mid-joke.'],
      close: ['"Hey, you," he grins, tossing you a rag. "Stick around, I\'ll teach you everything."'],
    },
  },
  {
    id: 'leo',
    firstName: 'Leo',
    lastName: 'Kurosagi',
    house: HOUSES.VAGASTROM,
    images: { uniform: 'Leo_Kurosagi_Uniform.png', casual: 'Leo_Kurosagi_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['He revs an engine that isn\'t there just to make you jump.'],
      warm: ['He tosses you a helmet without asking — you\'re riding with him now.'],
      close: ['"Knew you\'d come back," he says, engine already running just for you.'],
    },
  },
  {
    id: 'shohei',
    firstName: 'Shohei',
    lastName: 'Haizono',
    house: HOUSES.VAGASTROM,
    images: { uniform: 'Shohei_Haizono_Uniform.png', casual: 'Shohei_Haizono_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    dialogue: {
      new: ['He leans against the garage wall, watching you with quiet interest.'],
      warm: ['He actually steps away from the wall to greet you properly.'],
      close: ['"I was hoping it\'d be you," he says softly, quiet interest turned into something more.'],
    },
  },

  // Hotarubi
  {
    id: 'subaru',
    firstName: 'Subaru',
    lastName: 'Kagami',
    house: HOUSES.HOTARUBI,
    images: { uniform: 'Subaru_Kagami_Uniform.png', casual: 'Subaru_Kagami_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    dialogue: {
      new: ['Lantern light catches his eyes as he offers a soft, knowing smile.'],
      warm: ['His smile brightens the moment he spots you.'],
      close: ['"I\'ve been waiting for you," he says, lantern light warm against his gentle expression.'],
    },
  },
  {
    id: 'zenji',
    firstName: 'Zenji',
    lastName: 'Kotodama',
    house: HOUSES.HOTARUBI,
    images: { uniform: 'Zenji_Kotodama_Uniform.png', casual: 'Zenji_Kotodama_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    dialogue: {
      new: ['He bows slightly, voice like a low temple bell. "Welcome, traveler."'],
      warm: ['His bow deepens, a mark of real respect now. "Welcome back, friend."'],
      close: ['"Your visits mean more to me than you know," he says, voice gentle as temple bells.'],
    },
  },
  {
    id: 'haku',
    firstName: 'Haku',
    lastName: 'Kusanagi',
    house: HOUSES.HOTARUBI,
    images: { uniform: 'Haku_Kusanagi_Uniform.png', casual: 'Haku_Kusanagi_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    dialogue: {
      new: ['Petals drift past him undisturbed; he seems used to visitors like you.'],
      warm: ['He picks a petal from his sleeve and offers it to you without a word.'],
      close: ['"Every visitor drifts on," he murmurs, "but you keep coming back to me."'],
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
    dialogue: {
      new: ['He juggles a stray coin between his fingers. "New audience — how lovely."'],
      warm: ['He tosses you a coin instead of just juggling it. "For luck. And for you."'],
      close: ['"Every show needs a star," he winks. "Lately, that\'s been you."'],
    },
  },
  {
    id: 'jo',
    firstName: 'Jo',
    lastName: 'Kongoza',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Jo_Kongoza_Uniform.png', casual: 'Jo_Kongoza_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['Upside-down on a rope, she waves as if this were completely normal.'],
      warm: ['She swings down from the rope just to greet you properly this time.'],
      close: ['"Catch me?" she laughs, already trusting you completely.'],
    },
  },
  {
    id: 'mio',
    firstName: 'Mio',
    lastName: 'Susuhara',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Mio_Susuhara_Uniform.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    dialogue: {
      new: ['She peers at you from behind a curtain, delighted by the surprise.'],
      warm: ['She steps fully out from behind the curtain now, no longer shy around you.'],
      close: ['"I don\'t hide from you anymore," she smiles. "I don\'t need to."'],
    },
  },
  {
    id: 'shion',
    firstName: 'Shion',
    lastName: 'Genkai',
    house: HOUSES.DIONYSIA,
    images: { uniform: 'Shion_Genkai_Uniform.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    dialogue: {
      new: ['A masked bow, a theatrical flourish. "Welcome to the show."'],
      warm: ['The mask tilts your way first, before anyone else in the room.'],
      close: ['"For you," Shion says, lifting the mask just enough to show a genuine smile.'],
    },
  },

  // Mortkranken
  {
    id: 'jiro',
    firstName: 'Jiro',
    lastName: 'Kirisaki',
    house: HOUSES.MORTKRANKEN,
    images: { uniform: 'Jiro_Kirisaki_Uniform.png', casual: 'Jiro_Kirisaki_Casual.png' },
    affinityByResponse: { kind: 1, playful: 0, bold: 2 },
    dialogue: {
      new: ['He doesn\'t look up from his notes. "Another test subject, then?"'],
      warm: ['He finally looks up from his notes when you walk in.'],
      close: ['"You\'re not a subject anymore," he says quietly. "You\'re just... someone I want to see."'],
    },
  },
  {
    id: 'yuri',
    firstName: 'Yuri',
    lastName: 'Isami',
    house: HOUSES.MORTKRANKEN,
    images: { uniform: 'Yuri_Isami_Uniform.png', casual: 'Yuri_Isami_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    dialogue: {
      new: ['Cold eyes soften just slightly. "You shouldn\'t wander here alone."'],
      warm: ['The cold in his eyes has all but melted whenever you\'re around.'],
      close: ['"I worry about you when you\'re not here," he admits, like it costs him something to say it.'],
    },
  },

  // Jabberwock
  {
    id: 'ren',
    firstName: 'Ren',
    lastName: 'Shiranami',
    house: HOUSES.JABBERWOCK,
    images: { uniform: 'Ren_Shiranami_Uniform.png', casual: 'Ren_Shiranami_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['He crouches by the field\'s edge, sizing you up like prey — or a friend.'],
      warm: ['He stops sizing you up — you\'re pack, now.'],
      close: ['"You\'re mine to look out for," he says simply, like it was never in question.'],
    },
  },
  {
    id: 'haru',
    firstName: 'Haru',
    lastName: 'Sagara',
    house: HOUSES.JABBERWOCK,
    images: { uniform: 'Haru_Sagara_Uniform.png', casual: 'Haru_Sagara_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    dialogue: {
      new: ['Dirt on his boots, mischief in his eyes. "You\'re either lost or looking for trouble."'],
      warm: ['He grins the second he sees you, already planning some trouble for two.'],
      close: ['"You\'re the best kind of trouble I\'ve found," he says, nudging you with his shoulder.'],
    },
  },
  {
    id: 'towa',
    firstName: 'Towa',
    lastName: 'Otonashi',
    house: HOUSES.JABBERWOCK,
    images: { uniform: 'Towa_Otonashi_Uniform.png', casual: 'Towa_Otonashi_Casual.png' },
    affinityByResponse: { kind: 2, playful: 1, bold: 0 },
    dialogue: {
      new: ['Quiet as the mountain air, he simply watches you approach.'],
      warm: ['He breaks his usual silence just to say your name.'],
      close: ['"The mountain\'s quiet," he says, "but you make it feel less lonely."'],
    },
  },

  // Obscuary
  {
    id: 'edward',
    firstName: 'Edward',
    lastName: 'Hart',
    house: HOUSES.OBSCUARY,
    images: { uniform: 'Edward_Hart_Uniform.png', casual: 'Edward_Hart_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['A slow, practiced smile. "Curious guest — welcome to my parlor."'],
      warm: ['His practiced smile turns into something a little more real for you.'],
      close: ['"You\'ve seen past the performance," he admits. "I don\'t mind, with you."'],
    },
  },
  {
    id: 'rui',
    firstName: 'Rui',
    lastName: 'Mizuki',
    house: HOUSES.OBSCUARY,
    images: { uniform: 'Rui_Mizuki_Uniform.png', casual: 'Rui_Mizuki_Casual.png' },
    affinityByResponse: { kind: 1, playful: 2, bold: 0 },
    dialogue: {
      new: ['He tilts his head, unreadable. "You\'re not supposed to be here. I don\'t mind."'],
      warm: ['He doesn\'t bother hiding his interest in you anymore.'],
      close: ['"You\'re the one exception to every rule I\'ve made," he says, unreadable no longer.'],
    },
  },
  {
    id: 'lyca',
    firstName: 'Lyca',
    lastName: 'Colt',
    house: HOUSES.OBSCUARY,
    images: { uniform: 'Lyca_Colt_Uniform.png', casual: 'Lyca_Colt_Casual.png' },
    affinityByResponse: { kind: 2, playful: 0, bold: 1 },
    dialogue: {
      new: ['She leans in the doorway, arms crossed. "Well, look what wandered in."'],
      warm: ['Her arms uncross the moment she sees it\'s you.'],
      close: ['"Don\'t tell anyone," she says, softening, "but I look forward to you wandering in."'],
    },
  },

  // Sinostra
  {
    id: 'taiga',
    firstName: 'Taiga',
    lastName: 'Hoshibami',
    house: HOUSES.SINOSTRA,
    images: { uniform: 'Taiga_Hoshibami_Uniform.png', casual: 'Taiga_Hoshibami_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['Cards shuffle idly in his hands. "Care to make this interesting?"'],
      warm: ['He deals you in without needing to ask. "You\'re always welcome at my table."'],
      close: ['"You\'re the only bet I\'ve never wanted to hedge," he says, setting the cards down.'],
    },
  },
  {
    id: 'ritsu',
    firstName: 'Ritsu',
    lastName: 'Shinjo',
    house: HOUSES.SINOSTRA,
    images: { uniform: 'Ritsu_Shinjo_Uniform.png', casual: 'Ritsu_Shinjo_Casual.png' },
    affinityByResponse: { kind: 0, playful: 2, bold: 1 },
    dialogue: {
      new: ['He studies you like a hand he hasn\'t decided how to play yet.'],
      warm: ['He\'s stopped calculating you — now he just enjoys your company.'],
      close: ['"I\'ve decided how to play this," he says softly. "I\'m not folding on you."'],
    },
  },
  {
    id: 'romeo',
    firstName: 'Romeo',
    lastName: 'Lucci',
    house: HOUSES.SINOSTRA,
    images: { uniform: 'Romeo_Lucci_Uniform.png', casual: 'Romeo_Lucci_Casual.png' },
    affinityByResponse: { kind: 0, playful: 1, bold: 2 },
    dialogue: {
      new: ['A sly wink. "Every newcomer\'s a gamble. Let\'s see what you\'re worth."'],
      warm: ['His sly wink turns into something warmer, just for you.'],
      close: ['"Every gamble needs a sure thing," he says. "You\'ve become mine."'],
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
    dialogue: {
      new: ['The old caretaker looks up from his work. "Don\'t see many folks out this far."'],
      warm: ['He sets his tools down properly to chat with you now.'],
      close: ['"You remind me why I still like this old place," he says, warm and genuine.'],
    },
  },
];

export function getCharacterById(id) {
  return CHARACTERS.find((c) => c.id === id) || null;
}

export function getCharactersByHouse(house) {
  return CHARACTERS.filter((c) => c.house === house);
}

// Characters eligible to appear at a given location: same-house characters,
// plus (for general locations) every character in the game.
export function getCharactersForLocation(locationKey, isGeneral) {
  return isGeneral ? CHARACTERS : getCharactersByHouse(locationKey);
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

export function getRandomDialogueLine(character, tier) {
  const lines = character.dialogue[tier] || character.dialogue.new;
  return lines[Math.floor(Math.random() * lines.length)];
}
