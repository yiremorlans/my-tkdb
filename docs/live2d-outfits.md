# Live2D outfits checklist

Hangout v2 (Live2D) is the default rig. Every character loads from two outfits:
`academy` plus one of `city` / `casual` / `work` / `roomwear`. Models live in
`assets/live2d/<id>/<outfit>/` and are registered under `outfits` in
`assets/live2d/<id>/rig.json`.

Status as of 2026-10-31: academy done for everyone. Second outfits done for
Benkei (`work`), Leo (`casual`), Mio (`work`), Ren (`roomwear`) and Shohei
(`casual`). Jo also has `femacademy`
(game bundle `jofemacademy`, `dialogueVariant: "casual"`), an extra outfit
outside the four slots.

Benkei's `work`, Mio's `work` and Ren's `roomwear` are spot-bound
(`spots` in rig.json, hangout-activity.md §11.5): worn always and only at
the campus store, the Dionysia workshop and Ren's room. A new outfit gets
`spots` only when it belongs to one place.

## Benkei

- [x] Benkei `academy` (game bundle `benkei_`, his default)
- [x] Benkei `work` (game bundle `benkeiapron`; old rig called it `apron`)

## Second outfit already chosen in the old rig

- [ ] Alan `roomwear`
- [ ] Edward `casual`
- [x] Ren `roomwear` (game bundle `renroomwear`; old rig also had `diner` as a third)
- [ ] Rui `casual`
- [x] Shohei `casual` (game bundle `shocasual`)
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
- [x] Leo: slot `casual` (game bundle `leocasual`)
- [ ] Lucas: slot ___
- [ ] Lyca: slot ___
- [ ] Ritsu: slot ___
- [ ] Romeo: slot ___ (not in the old rig, portrait only)

## No second-outfit art at all

Needs art first; uniform portrait only.

- [ ] Elias: slot ___
- [x] Mio: `work` (game bundle `miowork`; the game had the art after all)
- [ ] Shion: slot ___

## Date outfits (`dateOnly`)

Dates (hangout-activity.md §12.4) draw only from outfits marked
`dateOnly: true` in rig.json. `/meet` never draws them (meetActivity.js
`pickOutfit`, built 2026-11-01). Each one still
names a `dialogueVariant`. A character with none wears `defaultOutfit` on
dates. Status as of 2026-11-01: none yet for anyone.

## Gala outfits (`galaOnly`)

Gala night (gala-reinstatement-arc.md §5.1.1) draws only from outfits marked
`galaOnly: true`: formalwear for the Gala partner scene. `/meet` and dates
never draw them (`/meet`'s exclusion built 2026-11-01). Each one still names a `dialogueVariant`. A character with
none wears `defaultOutfit`. Status as of 2026-11-01: none yet for anyone.
