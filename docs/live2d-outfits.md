# Live2D outfits checklist

The Hangout runs on Live2D. Every character loads from two outfits:
`academy` plus one of `city` / `casual` / `work` / `roomwear`. Models live in
`assets/live2d/<id>/<outfit>/` and are registered under `outfits` in
`assets/live2d/<id>/rig.json`.

Status as of 2026-10-31: academy done for everyone. Second outfits done for
Benkei (`work`), Leo (`casual`), Mio (`work`), Ren (`roomwear`) and Shohei
(`casual`). Jo also has `femacademy`
(game bundle `jofemacademy`, `dialogueVariant: "casual"`), an extra outfit
outside the four slots.

Spot-bound outfits (`spots` in rig.json, hangout-activity.md §11.5) are worn
only at their background files. Benkei's `work`, Mio's `work` and Ren's
`roomwear` are also `always: true`: worn every time at the campus store, the
Dionysia workshop and Ren's room. The `house` jumpsuits (Haru, Towa, Ren) are
only there, without `always`: anywhere in Jabberwock they join the casual
roll, and academy still comes up on a uniform roll. A new outfit gets
`spots` only when it belongs to one place.

`house` is the slot for the game's `<name>house` bundles (2026-11-01).

## Benkei

- [x] Benkei `academy` (game bundle `benkei_`, his default)
- [x] Benkei `work` (game bundle `benkeiapron`; old rig called it `apron`)

## Second outfit already chosen in the old rig

- [ ] Alan `roomwear`
- [x] Edward `casual` (game bundle `edwardcasual`)
- [x] Ren `roomwear` (game bundle `renroomwear`; old rig also had `diner` as a third)
- [x] Ren `house` (game bundle `renhouse`; only-there at every Jabberwock background except his room; chest/belly/hips matched to academy in px)
- [x] Rui `casual` (game bundle `ruicasual`)
- [x] Shohei `casual` (game bundle `shocasual`)
- [x] Subaru `casual` (game bundle `subarucasual`)
- [x] Taiga `city` (game bundle `taigacity`; `m_face` joined to `m_aori` as on academy; chest/belly/hips matched to academy in px)
- [ ] Tohma `city` (on academy `m_ago1` is joined after `m_hidarikoshi` and `m_ago2` after `m_pocket`, returns likewise; do the same)
- [x] Towa `casual` (game bundle `towacasual`; chest/belly/hips matched to academy in px)
- [x] Towa `house` (game bundle `towahouse`; spot-bound to every Jabberwock background; chest is the jumpsuit body + collar, matched to academy in px)
- [x] Yuri `casual_2` (game bundle `yuricasual2`; e_surprise_00 and e_shinken_00 copied from academy; chest/belly matched to academy in px)
- [x] Yuri `casual` (game bundle `yuricasual`; e_surprise_00 and e_shinken_00 copied from academy; chest/belly/hips matched to academy in px)
- [x] Yuri `house` (game bundle `yurihouse`; always there at the Mortkranken Lab and Examination rooms; e_surprise_00 and e_shinken_00 copied from academy; chest/belly/hips matched to academy in px)
- [ ] Zenji `casual` (source art only)

## `_Casual` portrait exists, slot not decided

Pick city / casual / work / roomwear for each.

- [x] Haku: slot `casual` (game bundle `hakucasual`; chest/belly/hips matched to academy in px)
- [x] Haru: slot `casual` (game bundle `harucasual`; Peekaboo is the belly spot, `e_usagi_egao_00` and `e_usagi_kuchiake_00` copied from academy)
- [x] Haru `house` (game bundle `haruhouse`; spot-bound to every Jabberwock background; Peekaboo is the belly spot, `e_usagi_egao_00` and `e_usagi_kuchiake_00` copied from academy; hips matched to academy in px)
- [ ] Jin: slot ___
- [x] Jiro: slot `casual` (game bundle `jirocasual`; chest/belly/hips matched to academy in px)
- [x] Jiro `casual_2` (game bundle `jirocasual2`; chest/belly/hips matched to academy in px)
- [x] Jiro `house` (game bundle `jirohouse`; always there at the Mortkranken Lab and Examination rooms; chest is the shirt front, matched to academy in px)
- [ ] Jo: slot ___ (`femacademy` already added, see above)
- [ ] Kaito: slot ___
- [x] Leo: slot `casual` (game bundle `leocasual`)
- [ ] Lucas: slot ___
- [x] Lyca: slot `casual` (game bundle `lycacasual`; chest/belly/hips matched to academy in px)
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
