# Live2D outfits checklist

Hangout v2 (Live2D) is the default rig. Every character loads from two outfits:
`academy` plus one of `city` / `casual` / `work` / `roomwear`. Models live in
`assets/live2d/<id>/<outfit>/` and are registered under `outfits` in
`assets/live2d/<id>/rig.json`.

Status as of 2026-10-30: academy done for everyone. Jo also has `femacademy`
(game bundle `jofemacademy`, `dialogueVariant: "casual"`), an extra outfit
outside the four slots. No other second outfits yet.

Second-outfit bundles already in the game's cache (2026-10-30 pull), not
converted: `benkeiapron`, `miowork`, `renroomwear`.

## Benkei

- [x] Benkei `academy` (game bundle `benkei_`, his default)
- [ ] Benkei second outfit (old rig: `apron`; portrait `Benkei_Work.png`; bundle `benkeiapron` is cached)

## Second outfit already chosen in the old rig

- [ ] Alan `roomwear`
- [ ] Edward `casual`
- [ ] Ren `roomwear` (old rig also had `diner` as a third; bundle `renroomwear` is cached)
- [ ] Rui `casual`
- [ ] Shohei `casual` (source art only, never added to the old rig.json)
- [ ] Subaru `casual`
- [ ] Taiga `city`
- [ ] Tohma `city`
- [ ] Towa `casual` (source art only)
- [ ] Yuri `casual_2` (a `casual` atlas also exists)
- [ ] Zenji `casual` (source art only)

## `_Casual` portrait exists, slot not decided

Pick city / casual / work / roomwear for each.

- [ ] Haku: slot ___
- [ ] Haru: slot ___
- [ ] Jin: slot ___
- [ ] Jiro: slot ___
- [ ] Jo: slot ___ (`femacademy` already added, see above)
- [ ] Kaito: slot ___
- [ ] Leo: slot ___
- [ ] Lucas: slot ___
- [ ] Lyca: slot ___
- [ ] Ritsu: slot ___
- [ ] Romeo: slot ___ (not in the old rig, portrait only)

## No second-outfit art at all

Needs art first; uniform portrait only.

- [ ] Elias: slot ___
- [ ] Mio: slot ___ (the game has `miowork`, cached)
- [ ] Shion: slot ___
