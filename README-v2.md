# NICU Duty Sheet – v2 changes

Upload to GitHub next to your existing files: `index.html`, `sw.js`, `refdata.js`, `tools/make_refdata.py`
(`manifest.webmanifest` and the icons are unchanged). `sw.js` is now `nicu-duty-v13` and caches `refdata.js` for offline use.
Old saved babies open normally (old BGA times are split into date + time automatically).

## Reference tables (needed for centile curves)
Charts and the blood-pressure plot work now and show the baby's points; **centile curves and P / z labels appear once `refdata.js` is filled**.
- WHO 2006: download the 6 CSVs (weight, length, head circumference; boys, girls) from the CDC "WHO Growth Charts Data files" page.
- Fenton 2013: the LMS / percentile data come from Dr Tanis Fenton (University of Calgary Fenton chart page). One CSV per sex and measure.
- BP: one CSV per source (Zubrow 1995, van Zadelhoff, Elsayed, Kiss) – columns in the header of `tools/make_refdata.py`.

    python3 tools/make_refdata.py --who who_folder --fenton fenton_folder \
      --bp "zubrow|Zubrow 1995|pma|Zubrow AB et al. J Perinatol 1995;15:470-479.|zubrow.csv" > refdata.js

## Where each request went
1. Head circumference + length boxes (birth and current) in Patient; new **Growth & centiles** section: auto-saved series, 3 charts, centile / z table, references.
   Preterm = Fenton 2013 by PMA (22–50 wk), then WHO by corrected age after 50 wk; term = WHO by age.
2. Nationality (and drug names): suggestions start with the letters typed.
3. Antenatal: antibiotic course + details, Antenatal US.
4. Medicines (Infection, Other medications): name, dose, unit, per kg/dose/day/h/min, interval, with per-dose and per-day maths and usual unit/interval hint (no doses suggested). Caffeine has per + interval.
5. BGA: date on top, time under it.
6. Ventilation / inotrope logs: changes within 3 minutes share one row.
7. BP: recorded automatically from SBP/DBP, plotted on the chosen reference (without tables: MAP vs "MAP = GA" rule-of-thumb line).
8. Gastric aspirate (GA): amount + colour options.
9. Fluid balance: automatic (intake − urine output × 24 − other losses; insensible loss not counted).
10. ROP: first exam, last exam, finding, action, follow-up weeks → next exam date.
11. HIE / "whole body cooling": Thompson table (9 items, total /22), Sarnat criteria, cooling start/end, duration, age at start, method.
12. Neurological examination: consciousness, tone, posture, movements, Moro, suck, grasp, fontanelle, pupils, cry, head, reflexes, cranial nerves.
Handover and work-plan cards include all the new data.

## Update 3 (v14)
- Antenatal: **Maternal illnesses** (DM, HTN, pre-eclampsia, other). Included in the handover.
- Birth: if delayed cord clamping = **No**, a **cord milking** box appears with advice (can be considered from GA 28 wk; not advised below 28 wk).
- Thompson score: items and points follow the MDApp calculator; bands 0–10 mild, 11–14 moderate, ≥ 15 severe.
- **BP centiles are now loaded** from the EPIQ guideline you sent: Zubrow 1995 by corrected age, Zubrow 1995 day 1 by GA, Kent 2007 term days 1–4. Default "Auto" picks the right table from age and GA. The "MAP = GA" line was removed (the guideline says MBP < GA alone is not a valid hypotension definition).
- Still missing: Fenton 2013 and WHO 2006 numbers (the PDFs you sent are charts, not data), van Zadelhoff and Kiss BP tables.
- sw.js is now `nicu-duty-v14`.

## Update 4 (v15)
- Growth section and charts removed. Patient > Measurements now has a **centile box next to each value** (birth and current weight, length, head circumference) for manual entry. Centiles appear in the handover.
- New last section **Preparing for discharge**: measured-on date, weight, length, head circumference, each with a centile box. Included in the handover.
- Blood pressure reference: **Zubrow 1995 is the default** (day-1 table by GA for readings in the first 24 h, corrected-age table afterwards). Other options: **Elsayed / EPIQ 2022** and **van Zadelhoff** (tables not loaded yet).
- `refdata.js` now holds only the BP tables. `tools/make_refdata.py` and the Fenton / WHO files are no longer needed.
- sw.js is `nicu-duty-v15`.

## Update 5 (v16)
- "Growth notes" label shortened. Maternal blood group moved to Maternal investigations.
- Blood pressure centiles removed (SBP / DBP / mean boxes stay). `refdata.js` is no longer used: delete it from GitHub.
- Gastric aspirate: amount typed manually (ml) + a colour box with suggestions. Old entries are carried over.
- Neuro exam: removed Moro, suck / swallow, grasp, cry and cranial nerves (the Thompson table is unchanged).
- "Preparing for discharge" section removed.
- Handover card now shows four SBAR sections (Situation, Background, Assessment, Recommendation), each with its own Copy button. The full text is under "Full text to copy".
- sw.js is `nicu-duty-v16` (no longer lists refdata.js).

## Update 6 (sw v17)
- Removed current weight / length / head-circumference centile boxes (birth centiles kept).
- Caffeine: dose now has a visible unit selector (mg / mcg), then per (/kg/day, /kg/dose) and interval.
- Fluid balance now in total ml per 24 h (also shown as ml/kg): intake (ml/kg/d x weight) minus urine (ml/kg/h x 24 x weight) minus listed losses. Losses: up to 3 rows, choose type (drain, chest drain, stool, gastric aspirate, NG/OG, stoma, other) and enter ml/24 h. Needs weight (current, else birth).

## Update 7 (sw v18)
- Losses reduced to 2 rows (type + ml/24 h).
- Lines & tubes: line/tube type is now a pick-list (UVC, UAC, PICC, PIV, ETT, NG/OG, chest drain, catheter, etc.) with insertion date and day count.
- Blood investigations: added nRBCs (blood count) and D-dimer, Fibrinogen (coagulation).
- New Consultations section: speciality list (surgery, neurology, neurosurgery, haematology, cardiology, etc.), requested/seen dates, reason/recommendations; appears in the handover and bed card (flagged if not yet seen).

## Update 8 (sw v19)
- Patient: all boxes in a row now have the same height (sex level with name/ID); GA weeks/days boxes bigger.
- Antenatal: MgSO4 moved down; intrapartum antibiotics beside antenatal antibiotic course.
- Birth: cord-milking advice note removed; Apgar 10/15/20 min boxes appear only if any Apgar < 6.
- Respiratory: SIMV + PS mode (adds PS box); Vt/kg only in VG modes (removed from A/C, SIMV, PC...).
- PPHN/pulmonary hypertension in diagnosis/problems/echo: BGA table adds FiO2, MAP, SpO2 rows and automatic OI (arterial pO2; values < 30 read as kPa) and OSI.
- Cardiovascular: PDA size (mm).
- Neuro: 3 anticonvulsant rows (drug, loading, maintenance, interval) shown for HIE or seizures; cooling methods 33.5 / 34 / 34.5; CFM and cerebral NIRS connected (+ rSO2); multi-organ box removed; Sarnat staging table (fill in, stage appears above, like Thompson).
