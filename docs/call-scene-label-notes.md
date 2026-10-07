# Call scene label notes: `new` winner lines

Working notes for writing call-scene buttons (`{ line, responses }` entries in
`winnerLines`, docs/public-encounters.md §17.7). One pass over every
character's Stranger (`new`) winner lines, 2026-10-06.

For each character:

- **Ranks** come from `affinityByResponse` (2 = favorite, 1 = liked,
  0 = least). The answers are shuffled and look identical, so the pick is
  blind. All three labels have to be equally plausible, and the favorite
  must not stand out as the obviously "right" button.
- **Label language** says what each slot should *do* for this character at
  Stranger. It's grounded in the `characters.js` notes above
  `affinityByResponse` and in the `new` beat labels already approved in their
  dialogue file.
- **Lines** marks each `new` winner line ✅ (leaves {user} an opening, so it
  can take buttons), ➖ (weak opening, possible but not first choice) or ❌
  (a finished moment, stays a plain string). `[scene]` is the line that
  already has labels.

Sources: `characters.js` notes (most are voiceline-verified; Haru is derived
from reference.md only, and Benkei is partially verified) and the existing
`new` labels. reference.md sections should still be read per character before
drafting, as the voice-check skill requires.

## Status (2026-10-06)

- **Labels written** for every ✅ line below, except those held back for a
  line edit: the near-duplicate partners (finding 3: Tohma line 3, Haku
  line 2, Jo line 3, Haru line 1, Subaru line 2, Benkei line 3). ➖ and ❌
  lines stay plain. 77 of the 105 `new` lines can now open
  a scene (two to four per character).
- **Findings 1 and 2 fixed:** the 11 generic kind labels now answer their
  line, Elias's "janitor's a ghoul" label is reworded, and Jo's scene labels
  are pronoun-free.
- **Every `new`, `known` and `warm` line labeled (later 2026-10-06, user
  decision that all lines get buttons):** the held-back, ➖ and ❌ lines too,
  plus Towa's wordless daytime lines, which now open his daytime scenes.
  The per-line ✅/➖/❌ marks below are now only a note of how naturally each
  line invites a reply.
- **Every line at every tier labeled** (spark, close and bound too, plus
  Towa's daytime lines). validateContent now requires labels on every
  character winner line, and pickCallScene draws with pickRandom from
  winnerLinePool like the normal reveal.
- **Near-duplicates (finding 3) are fine as they are** (user, 2026-10-06):
  they existed already. The point is not to write *new* lines that echo
  existing ones.
- **Still open:** the finding 4 lines break the winner-line rules in
  `_shared.js` and need the lines themselves edited (their labels will need
  a second look when they are).

---

## Cross-cutting findings

**1. The existing scene labels lean on generic wellbeing checks.** About a
third of the 26 kind labels ask after food or rest instead of answering the
line, which is the "lazy default" pattern the house rules warn about:

| Character | Kind label | Line it sits under |
|---|---|---|
| Jin | Ask if he's been sleeping | "Well? Say something." |
| Lucas | Ask if he's eaten today | "Is everything all right?" |
| Leo | Ask if he's eaten anything | "Give me a reaction." |
| Ren | Ask if he's eaten yet | "I'm on break." |
| Jiro | Offer him something to eat | "So what is it?" |
| Jo | Ask when he last took a break | "What can I do for you?" |
| Haru | Ask if he ever takes a break | hands {user} a tour flier |
| Ritsu | Ask if he ever takes a day off | "State your business." |
| Shion | Ask if he's having a good day | "Most people keep their distance." |
| Alan | Ask if he's doing okay | "...You lost?" |
| Rui | Ask how his day's going | "What's the plan?" |

Some of these are canon-adjacent (Lucas's breakfast lectures, Jo and Mio
overworking), but read side by side they're one template. Rewrite them to
answer the line. Mio's "Tell him to take a break" works because his line is
about his workload.

**2. Jo's labels must be pronoun-free.** His casual encounters use the `_girl`
face set and his dialogue already carries "her" variants for that look. A
scene shares one pool across both looks, so "Ask when **he** last took a
break" is wrong half the time. Write Jo's labels with no he/she: pure actions
like "Steal the budget pen" or "Pull up a chair uninvited".

**3. Near-duplicates now share a pool.** Each scene line sits next to the
plain line it was modeled on, so a winner can draw both:

- Benkei: the cat-is-the-manager joke (line 3 and the scene)
- Haku: glancing past {user}'s shoulder (line 2 and the scene)
- Tohma: "Perhaps I can be of some assistance?" vs "Is there something I can
  do for you?"
- Jo: "Come on over, cutie." vs "Hey there, cutie. What can I do for you?"
- Haru: both open "Well, hey there!"
- Subaru: both have him bowing to {user}

These stay as they are (user, 2026-10-06). The takeaway is for new lines:
don't write one that echoes a line already in the character's pool.

**4. Lines that break the winner-line rules** (no place, no house venue, the
character stays with {user}). These now matter more, because scene lines can
also be drawn as plain reveals:

- Benkei `new`[3]: "from the counter… Can't ring you up… asleep on the
  register" puts him at the campus store.
- Benkei `warm`[0] and `warm`[1]: "their usual on the counter" and "reaches
  under the counter" put him at the store too.
- Romeo `new`[3] "here to spend money", `new`[1] "when {user} walks in" and
  `new`[2] "Who let you up here?" all imply his own premises.
- Jiro `new`[2]: "keeps walking toward the lab" names a place and walks away.
- Taiga `new`[2]: "waves {user} off, and they're gone" ends with {user} gone,
  so the milestone afterline contradicts it.

**5. Constraints from the per-character rules that bind labels too:**

- No touching **Alan** before spark, so no handshakes or grabbing.
- **Zenji** is a ghost and real contact costs him, so no casual touch.
- **Jin** does no PDA.
- **Rui**: keeping his hands to himself is a given and never announced. A
  bold label can *test* the distance (his bold lands 0), but none should
  explain or promise around it.
- **Elias** does no favors, so labels shouldn't ask him to escort, promise or
  fetch.
- **Sho** teases {user} but never insults her, so labels can tease him back.
- **Shion**: "my wife" doesn't appear until known.
- **Subaru's** stigma: he's braced and ashamed at new, so a bold "Ask about
  his stigma" is plausible (it lands 0), but nothing should promise it's fine.

---

## Frostheim

### Jin: kind 1, playful 0, bold 2
- **bold (2):** meet him as an equal and refuse to be dismissed. Approved:
  "Stand your ground at the door", "Meet his stare head-on", "Refuse to be
  rushed".
- **kind (1):** brief, gentle and unfussy, never a push. "Keep it short for
  him", "Ask if it's a bad time".
- **playful (0):** tease the frost back. It doesn't land, but it has to look
  tempting. "Ask if you passed inspection", "Talk slow on purpose".
- Lines:
  - ✅ "...Get to the point." He's ordering {user} to talk, an ideal hook.
  - ➖ "unimpressed that it took this long". A remark about {user}, but no
    prompt.
  - ✅ "You know who I am. Good." He allows one step closer: take it, refuse
    it, or tease the permission.
  - `[scene]` "Well? Say something." Playful and bold fit. Kind is a generic
    wellbeing check (finding 1).

### Kaito: kind 2, playful 1, bold 0
- **kind (2):** reassurance and warmth. "Tell him he's doing fine",
  "Reassure him you're friendly".
- **playful (1):** bounce off the bit. "Laugh at the jump scare", "Ask if he
  always does that".
- **bold (0):** push or demand, which makes him feel smaller. "Call his
  bluff", "Ask why he's so loud".
- Lines:
  - ✅ jumps a foot, "Oh, it's just you." Reassure, laugh, or ask who he
    expected.
  - ✅ "Wait, you know my name?" A direct question, the strongest of the set.
  - ✅ startles, then pretends he didn't. Ideal for playful callouts.
  - `[scene]` "collecting on a, um" All three labels answer it. Good.

### Lucas: kind 2, playful 0, bold 1
- **kind (2):** turn his care back on him and meet him gently. "Offer to help
  him prep", "Check on the first-year".
- **bold (1):** stand level with him, firm and leading. "Shake his hand
  firmly", "Lead the way yourself".
- **playful (0):** banter he takes earnestly. "Curtsy on the way through",
  "Ask if he holds every door".
- Labels are in {user}'s voice, so American spelling even for Lucas.
- Lines:
  - ✅ holds the door. Already an approved beat: step through, curtsy, hold
    it for him.
  - ✅ mission papers, waves {user} along. Join him, ask, or lead.
  - ✅ "Penny for them?" He asks outright. The strongest line.
  - `[scene]` "Is everything all right?" Bold "Shake it and hold on" and
    playful "duel invite" fit. Kind doesn't answer him (finding 1); "Say
    you're fine, thanks to him" or "Ask if he checks on everyone" would.

### Tohma: kind 2, playful 1, bold 0
- **kind (2):** accept his help warmly, or turn the care back on him. "Accept
  his help gladly", "Ask what he needs".
- **playful (1):** volley the sly courtier. "Ask if this is a trap", "Ask how
  he expected you", "Ask who he overheard".
- **bold (0):** blunt advances slide off. "Say you don't buy it", "Say you
  know exactly where".
- Lines:
  - ➖ "Well, well." A courtesy that gives nothing away. Only works if the
    labels supply the reason for coming.
  - ✅ "How resourceful." A remark that invites a reply.
  - ✅ "Perhaps I can be of some assistance?" A strong hook (playful can
    catch the overhearing), but a near-duplicate of the scene (finding 3).
  - `[scene]` Good labels. Keep one of this line and line 3, not both.

---

## Vagastrom

### Alan: kind 2, playful 0, bold 1
- **kind (2):** quiet thanks, and noticing him. "Thank him for the warning",
  "Offer to walk with him".
- **bold (1):** stand level. "Stand your ground", "Hold his gaze", "Say you
  came looking for him".
- **playful (0):** he isn't good with words, so banter has nothing to land
  on. "Tease him about the map", "Ask if he's ever not lost".
- **No touch** in any label (finding 5).
- Lines:
  - ➖ "...Yeah. That's me." It confirms, but leaves little to answer.
  - ✅ lost at the corner. Approved beat material: point the way, tease the
    map, take it from him.
  - ✅ "Careful." moves something sharp. Thank him, tease the protectiveness,
    or step past it.
  - `[scene]` "...You lost?" Playful and bold answer it. Kind is generic
    (finding 1); "Say you were looking for him" belongs to bold, so try "Say
    you could use directions".

### Leo: kind 0, playful 1, bold 2
- **bold (2):** nerve, and taking control of the shot. "Cover the lens with
  your hand", "Say you're not his to use", "Tell him to keep watching".
- **playful (1):** banter back. "Pose for the camera", "Ask for a retake".
- **kind (0):** warmth that gives him nothing to grip. "Smile for him
  anyway", "Let him get the shot".
- Socially intimidating, not physical. Labels never treat him as a threat.
- Lines:
  - ✅ phone up, "Oh, this is good." Pose, block it, or ask what's good.
  - ✅ "Brave or stupid?" A direct question with a ready-made playful answer
    ("Say you're a bit of both").
  - ✅ grins like he's framing the shot. Same hooks as line 1. Pick one of
    the two.
  - `[scene]` "Give me a reaction." Playful and bold are great. Kind "Ask if
    he's eaten anything" is unrelated (finding 1); "Smile for him anyway"
    style fits.

### Shohei: kind 2, playful 1, bold 0
- **kind (2):** care and appreciating his food or bike. "Say hi to Bonnie
  too", "Ask if he's hurt".
- **playful (1):** tease him back (he teases {user}, never insults her).
  "Say you're looking at him", "Tease him about the bike talk".
- **bold (0):** meeting the front with force. "Ask what his problem is",
  "Pet the bike anyway".
- Lines:
  - ✅ "You need something or what?" A direct question.
  - ❌ waves {user} over. No prompt.
  - ✅ off the motorcycle, "What're you looking at?" Approved beat territory.
  - `[scene]` takeout box. Good labels.

---

## Hotarubi

### Subaru: kind 2, playful 1, bold 0
- **kind (2):** reassurance, and telling him not to apologize. "Tell him not
  to apologize", "Say the wait was fine".
- **playful (1):** gentle ribbing. "Bow deeper than he did", "Catch him off
  script".
- **bold (0):** direct asks make him anxious. "Refuse the polite version",
  "Say what you came to say".
- No showboating, and his stigma is braced at new (finding 5).
- Lines:
  - ✅ "Have we met before?" A direct question.
  - ✅ bows a little too gracefully. Bow back, tease it, or skip the bow.
    Near-duplicate of the scene's bow (finding 3).
  - ✅ goes pink, "Forgive me." Ideal for kind ("Tell him not to apologize").
  - `[scene]` Good labels, and the bold stigma ask is acceptable.

### Zenji: kind 2, playful 1, bold 0
- **kind (2):** listen to him and praise his art. "Praise the verse
  honestly", "Ask to hear the whole thing".
- **playful (1):** wordplay. "Rhyme back at him", "Attempt a terrible haiku".
- **bold (0):** the blunt truth. "Say the unpoetic truth", "Say you came on
  purpose".
- No casual touch (finding 5).
- Lines:
  - ✅ "Why, hello there, my dear." He greets {user} as if expected. Ask how
    he knew, return the bow.
  - ✅ "you've handed me the last five." Ideal: finish the verse, rhyme, ask
    for the rest.
  - ✅ finishes a sentence to no one. "Ask who he was talking to" is approved.
  - `[scene]` sensational surprise and a bow. Good labels.

### Haku: kind 2, playful 1, bold 0
- **kind (2):** quiet care, and trusting him. "Stay where he can see you",
  "Let him keep it light".
- **playful (1):** play along with the spooking. "Pretend to see something
  too", "Ask if a fox spirit's out".
- **bold (0):** call him out. "Ask what he's hiding", "Call him out for the
  scare".
- Cooperative, not lazy. Labels don't treat him as slow to help.
- Lines:
  - ✅ "Got it in one. Not bad." A remark: take the compliment, or brag.
  - ✅ glances past {user}'s shoulder, "...Ignore that." A strong hook, but a
    near-duplicate of the scene (finding 3).
  - ✅ asks if {user} needs anything. Answer the offer.
  - `[scene]` "Don't turn around." Good labels. Keep this or line 2.

---

## Dionysia

### Elias: kind 2, playful 1, bold 0
- **kind (2):** notice he's tired, small warmth. "Notice he looks tired",
  "Say resting counts too".
- **playful (1):** coy secrets and gentle teasing about slacking. "Tease him
  about slacking", "Ask if you count as trouble".
- **bold (0):** blunt questions. "Ask what he's avoiding", "Ask if he's meant
  to be here".
- No favors (finding 5). He overhears, so "Ask what he's heard" fits.
- Lines:
  - ➖ "Oh, hello." His courtesy arrives first. Weak hook.
  - ✅ shifts the lollipop, "Oh, you called me?" A question.
  - ✅ leaning where he shouldn't be. Ideal for teasing about slacking.
  - `[scene]` mop. Good labels. Bold "Ask why a janitor's a ghoul" is odd
    phrasing; "Ask what a ghoul's doing mopping" reads better.

### Jo: kind 2, playful 0, bold 1
- **kind (2):** make him stop working. "Say the work can wait", "Offer to
  help with it".
- **bold (1):** directness. "Demand his full attention", "Pull up a chair
  uninvited".
- **playful (0):** teasing glances off. "Steal the budget pen", "Call him
  'cutie' right back".
- **Pronoun-free labels** (finding 2).
- Lines:
  - ✅ "A new face." He doesn't look back down at the budget. Kind (the work
    can wait) and bold both fit.
  - ➖ charisma on like a stage light. Hookable ("Refuse to be charmed"), but
    no prompt.
  - ✅ "Come on over, cutie." An invitation, but a near-duplicate of the
    scene (finding 3).
  - `[scene]` "What can I do for you?" Kind has a pronoun and is generic
    (findings 1 and 2).

### Mio: kind 2, playful 1, bold 0
- **kind (2):** tell him to rest, take a job off him. "Tell him to actually
  rest", "Offer to cover a job for him".
- **playful (1):** dry banter, Shion jokes. "Count his yawns out loud",
  "Ask if Shion's okay too".
- **bold (0):** blunt callouts. "Call out the lie directly", "Say he's
  allowed to say no".
- Never "fragile".
- Lines:
  - ✅ "Good work today." He waves with a box of parts. Offer to hold it.
  - ✅ mid-yawn, "Short sleeper." Ideal (approved: "Count his yawns").
  - ✅ three more jobs, {user} goes first. Take a job off him, or say you'll
    wait.
  - `[scene]` toolbox, ten minutes. Good labels. Kind's "take a break" fits
    here because the line is about his workload.

### Shion: kind 0, playful 1, bold 2
- **bold (2):** step in and don't flinch. "Walk toward him instead", "Stare
  right back", "Make him come to you".
- **playful (1):** match the mischief. "Pretend to run, then don't", "Flinch
  on purpose, grinning".
- **kind (0):** gentleness. "Say you meant no harm", "Ask him to go easy".
- Sparse and terse. No "my wife" at new (finding 5).
- Lines:
  - ✅ "...You knew my name." Own it, or tease it.
  - ✅ "Come closer." Canon, and the best hook he has (approved: "Take a
    tiny, tiny step").
  - ➖ pleased in a way that isn't reassuring. Workable but thin.
  - `[scene]` "Most people keep their distance." Playful and bold fit. Kind
    doesn't answer (finding 1); "Say you're not most people" is bold, so
    try "Say he doesn't scare you".

---

## Mortkranken

### Jiro: kind 1, playful 0, bold 2
- **bold (2):** straight to the point. "Give it to him straight", "Skip
  straight to the point".
- **kind (1):** notice his health, quietly. "Be patient with him", "Answer
  him honestly".
- **playful (0):** jokes mid-exam. "Say your symptom is boredom", "Ask if
  nervous counts".
- Calm, never rough.
- Lines:
  - ✅ "Symptoms or errand. Pick one." Ideal (approved: "Say your symptom is
    boredom").
  - ✅ "Do you need something treated?" A direct question.
  - ❌ cooler, "keeps walking toward the lab". A finished moment.
  - `[scene]` "Your color's fine." Playful and bold fit. Kind is generic
    (finding 1); "Say you're fine, ask about him" or "Hold out your wrist
    anyway".

### Yuri: kind 2, playful 1, bold 0
- **kind (2):** steady care he wouldn't ask for. "Tell him to get some
  sleep", "Offer to help without fuss".
- **playful (1):** make him sputter. "Offer to be his prize specimen", "Ask if
  he's taking notes".
- **bold (0):** challenging his intellect. "Refuse to be his specimen",
  "Refuse to be impressed".
- Volatile, so prickly is in character.
- Lines:
  - ✅ "A test subject, wandering in." Ideal (approved: "Offer to be his prize
    specimen" / "Refuse to be his specimen").
  - ✅ "You should feel honored." A remark that invites a reply.
  - ➖ "informs {user} of this at considerable length". Workable ("Interrupt
    him", "Let him finish"), but thin.
  - `[scene]` "Are you ill?" Good labels.

---

## Jabberwock

### Ren: kind 1, playful 2, bold 0
- **playful (2):** trade flat complaints. "Trade flat lines with him", "Ask
  who he's hiding from".
- **kind (1):** low-key, no fuss. "Sit quietly, no fuss", "Offer to cover his
  break".
- **bold (0):** demands. "Tell him to just say it", "Peek over his shoulder".
- Lines:
  - ➖ stays put, impressed {user} found him. No prompt.
  - ✅ "Is this for a mission? … technically on break." A question; ideal.
  - ✅ "I didn't do it. Or I'll do it later." Trade flat lines with him.
  - `[scene]` "on break… if that clown sent you." Playful and bold fit. Kind
    is generic (finding 1). The line's "Especially if…" reads oddly after a
    statement; consider "Especially not if that clown sent you."

### Haru: kind 1, playful 2, bold 0 (reference.md only)
- **playful (2):** join the bit. "Say you got lost on purpose", "Say you're
  after free snacks", "Tiptoe dramatically".
- **kind (1):** notice him and the critters. "Say the critters are lucky",
  "Ask how you can help".
- **bold (0):** force. "Ask to see the worst pen", "Walk in anyway".
- Lines:
  - ✅ "You after somethin'?" A direct question, but a near-duplicate opener
    of the scene (finding 3).
  - ➖ "Gahaha! Look at that." Delight with no prompt.
  - ✅ introduces Peekaboo first. Approved territory: ask what Peekaboo
    likes, sneak him a snack.
  - `[scene]` tour flier. Playful "Haggle for a discount" and bold "Say you
    don't do tours" are great. Kind is generic (finding 1).

### Towa: kind 2, playful 1, bold 0 (scenes at night only)
- **kind (2):** gentle and friendly; it's the axis he sorts people on.
  "Thank him, smiling", "Crouch down beside him".
- **playful (1):** whimsy, humming. "Hum back at him", "Make one up on the
  spot".
- **bold (0):** reads as hostility. "Ask what he wants", "Tell him to forget
  Haru".
- Never hides, never furtive. Bubbles are dangerous. These `new` lines only
  show at night; days use his wordless pool.
- Lines:
  - ➖ stops humming, eyes land on {user}. Wordless, but answerable with an
    action ("Stare back", "Wave").
  - ✅ "...Dandelion?" A canon word aimed at {user}; ideal.
  - ➖ turns a dandelion over, watching. A gesture.
  - `[scene]` "Found you." Good labels.

---

## Obscuary

### Edward: kind 1, playful 0, bold 2
- **bold (2):** see past the act, don't flinch. "Say you see through the
  act", "Give him permission", "Call his bluff".
- **kind (1):** tend the act. "Accept the courtesy", "Thank him for asking
  first".
- **playful (0):** banter volleyed back. "Out-charm the gentleman", "Pretend
  to swoon".
- Disarming, not menacing: no fangs, no blood. He protects Rui and Lyca's
  feelings.
- Lines:
  - ✅ asks whether he may take {user}'s hand. Ideal (approved: "Give him
    permission", "Ask if anyone ever says yes").
  - ✅ "Oh my. How charming." He appears at {user}'s elbow.
  - ➖ smiles with too many implications. Hookable by bold only.
  - `[scene]` "I tire so easily." Good labels.

### Rui: kind 2, playful 1, bold 0
- **kind (2):** sincere and gentle. "Be sincere with him", "Say it's nice to
  meet him".
- **playful (1):** match his energy. "Out-cheer him", "Ask if he says that to
  all".
- **bold (0):** reckless with the distance. "Step closer than allowed",
  "Reach for his hand".
- Forward, not bashful. "Cutie" is his word (labels may echo it, sparingly).
- Lines:
  - ✅ "Welcome to the fun side of campus." Keeps his distance; the distance
    is observed, never explained.
  - ✅ "Me? Oh, you've got good taste." A great playful hook.
  - ✅ "Guess my reputation got here first." Ask what it says.
  - `[scene]` "What's the plan?" Playful and bold fit. Kind is generic
    (finding 1).

### Lyca: kind 2, playful 1, bold 0
- **kind (2):** patience, giving him space. "Let him take his time", "Stand
  where he can see you".
- **playful (1):** gentle play, never mockery. "Ask what you smell like",
  "Wave with both hands".
- **bold (0):** pressure. "Take one step closer", "Ask him to decide
  already".
- Not infantilized.
- Lines:
  - ✅ "What do you want me to do? Say it." A direct question.
  - ➖ "What?" He turns right around. Short, but answerable.
  - ✅ "Stay there a moment." He takes {user} in by scent. Approved beat
    territory.
  - `[scene]` "You don't smell scared." Good labels.

---

## Sinostra

### Taiga: kind 0, playful 1, bold 2
- **bold (2):** don't flinch, raise the stakes. "Raise the stakes", "Call his
  bluff", "Sit without being invited".
- **playful (1):** trade insults, mischief. "Trade insults with him", "Ask
  what stupid ones cost".
- **kind (0):** softness loses him. "Take the guts as praise", "Compliment
  his card work".
- "Ciao!" always ends his speech. Volatile, so prickly is in character.
- Lines:
  - ✅ "You got guts. Stupid ones, but guts." Ideal (approved territory).
  - ✅ "You lost or somethin'?" A direct question.
  - ❌ "Don't remember a word you said. Ciao!" A finished moment.
  - ➖ "Huh? What." He barely looks. Answerable, but thin.
  - `[scene]` "Do I owe you money?" Great labels.

### Ritsu: kind 1, playful 0, bold 2
- **bold (2):** head-on, set terms, negotiate. "Name your price up front",
  "Negotiate the rate down".
- **kind (1):** take him seriously, slow warmth. "Agree to his terms", "Take
  the reading seriously".
- **playful (0):** jokes file themselves. "Ask for a student discount",
  "Start a timer of your own".
- Lines:
  - ➖ switches the recorder on. A gesture with no prompt.
  - ✅ "Name, House, nature of the matter." A direct form to fill in.
  - ✅ "Five seconds… be brief." Ideal for all three.
  - `[scene]` card, five free minutes. Playful and bold are great. Kind "Ask
    if he ever takes a day off" is generic (finding 1); "Thank him for the
    free minutes" answers it.

### Romeo: kind 1, playful 0, bold 2
- **bold (2):** name your price, meet him level. "Name your price", "Take
  the VIP section", "Bet on yourself".
- **kind (1):** sideways and embarrassed. "Say you'd be glad to help",
  "Thank him for the chance".
- **playful (0):** needling gets under his skin. "Use his own acronym",
  "Trade sass back".
- Lines:
  - ✅ "HDY waste my time." A great hook (approved: "Use his own acronym").
  - ✅ "Name, business, and what it's worth to me." Ideal for bold.
  - ✅ "Who let you up here? … Be useful." Answer the order.
  - `[scene]` reflection, "spend money". Labels are good ("Compliment his
    skin" plays his vanity).

---

## Campus store

### Benkei: kind 2, playful 1, bold 0 (partially verified)
- **kind (2):** warm greeting, feeling welcome. "Say you feel welcome
  already", "Take it gratefully".
- **playful (1):** gentle jokes about the cat and his teaching habits.
  "Ask if the cat agrees", "Give the tag a B-minus".
- **bold (0):** direct asks. "Ask why he changed his mind", "Call him out on
  fussing".
- Young and casual, never old-man framing. Not a student.
- Lines:
  - ✅ "Oh! H-hello." Like a question from the back row. Teacher jokes fit
    playful.
  - ❌ snack pressed into {user}'s hand. Finished. Could take "Take it
    gratefully" / "Ask which is the good one", but it's weak.
  - ✅ the cat manager. A strong hook for all three (approved: "Ask who's
    really in charge"), and it doesn't name the store.
  - `[scene]` the manager asleep on the register. Good labels.
