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

## Update 9 (sw v20)
- Layout: sections are no longer split into two columns on wide screens; each section now spans the full page width, so boxes are wider and their contents easier to read.
- Boxes in each section have a larger minimum width (180 px instead of 140 px).
- Print / PDF layout unchanged (still 2 columns to fit two A4 pages).

## Update 10 (sw v21)
- Apgar: the 10 / 15 / 20 min boxes appear only when the 5-min Apgar is below 6 (values already entered stay saved and in the handover).
- All boxes (text, number, date, pick-lists, calculated) now have the same height everywhere, and boxes in a row are aligned at the same level.

## Update 11 (sw v22)
- PDA course: when Paracetamol / Ibuprofen / Indomethacin is chosen, boxes appear for dose (mg/kg/dose), interval, start date and course length (days), with automatic "Day x of n" and last day. While running it also appears in Current medications. Surgical ligation / device closure shows date of intervention + details.
- Antenatal: separate nationality boxes for mother and father. Steroids received: steroid (Betamethasone / Dexamethasone / other) and dose / regimen boxes. Antenatal antibiotics: several courses can be added (+ Antibiotic course), each with details; an old single course is carried over.
- Birth: Indication / details box made longer.
- Blood gases: Action row removed.
- Fluids: Total intake = IVF + feeds. Fill any two and the third is calculated (the two boxes typed last are kept, the other is worked out). NPO feeds count as 0.
- Jaundice: TSB time is now a date-and-time picker.
- ROP: Action date (for treatment / treatment planned) and an automatic ROP log of exam dates, findings and actions (also in the handover).
- Lines & tubes: inserted date, removed date and number of days; automatic Lines log. Removed lines leave the work plan and show under "Removed lines" in the handover.

## Update 12 (sw v23)
- Birth: if delayed cord clamping is No, < 30 s or 30–60 s, a "Reason" box appears with suggestions (e.g. baby not vigorous / needed resuscitation per NRP, maternal haemorrhage, abruption, cord avulsion, indicated but not done); you can also type. The reason shows in the handover.
- Feeds: route option Gastrostomy (G-tube).
- Infection: culture site, organism (suggestions or type your own) and date positive; culture notes box kept. Positive organisms are flagged on the work plan and appear in the handover.
- Lines: days now shown in a box (Day n while in place, total days once removed).

## Update 13 (sw v24)
- Fluids: new IV fluid type **Dextrose + Aminoplasmin**. With Dextrose only or Dextrose + Aminoplasmin the Electrolytes / additives box is hidden.
- New **Fluid & feed change log**: total intake, IVF, fluid type, dextrose, Aminoplasmin, feeds, feed type, route and interval changes are logged automatically.
- All logs (ventilation, inotropes, fluids, antibiotics, lines, ROP): tap the time to correct when a change really happened; **+ Entry** adds a change by hand, so several changes on the same day each get their own time.
- Inotropes: next to DC, a **New dose + At time + Change** box records a dose change at the time it was made (blank time = now). DC also uses that time.
- Birth: **Admission** date & time and Admitted from (PNW, LR, OT, paediatric ward, paediatric emergency, private / other hospital). For private / other hospital: hospital name and a large box for the referral details.
- **Hide empty boxes** (button at the top of each baby): for the chosen shift date only boxes with data are shown, and empty sections disappear. Next day everything shows again; tap **Show empty boxes** any time.
- Lines & tubes moved under Abdomen & renal; inserted / removed now take date **and time**.
- New **Transfusions** section after Investigations: PRBCs, FFP, platelets, IVIG, cryo, albumin, exchange; date & time, dose, unit, notes, number (#1, #2…) and a "received so far" count per product.
- Infection: cultures are now a list (site, sent date & time, status Awaiting / Positive / No growth / Contaminant, organism, result date). Typing an organism sets the status. Awaiting cultures show on the work plan and in R – Pending. Old culture boxes are carried over.
- Antibiotics: start date **and time**, plus an automatic **Antibiotic log** (start, dose change, stop).
- Neuro: Head US is now a large **Bedside cranial US** box.
- Plan for this shift: the time box suggests Now, STAT, With the round, Before handover and every hour (typing "Now" fills the current time).
- Work plan: each baby card uses the full page width; **Print work plan** button.
- SBAR rewritten: each measure has its centile next to it (e.g. BW 1130 g (5th centile)); only filled data appear; "changes today" from the logs; R has a Pending line (awaiting cultures, consults, imaging reports, next ROP exam).

## Update 14 (sw v25)
- Inotropes, one row per drug: Drug → Started (date & time) → Dose with mcg/kg/min beside the number → Change / DC time → New dose → Change → DC. Leave the time blank to use the current time.
- Each drug's "changes / DC" text sits on its own full-width line under the row. Editing the start time also moves the "started" entry in the log and in that text.
- Inotrope day count and the handover use the start time (e.g. Dopamine 8 mcg/kg/min (D1, from 19/10 08:30)).

## Update 15 (sw v30)
- Top bar: the Day / Night / 24 h shift box is removed.
- All times use one format on every device: **12-hour with AM / PM**. Each time box is typed as h:mm with an AM/PM picker next to it (e.g. 930 → 9:30; type "n" for now; typing 21:30 is also accepted and sets PM). Logs, SBAR, work plan and print show times as e.g. 9:30 PM. Time of birth is one box + AM/PM.
- Blood gases: the date box is day/month only (dd/mm), no year.
- Cardiovascular: **Blood pressure readings** list – add as many readings as needed (date & time, SBP, DBP, mean worked out if blank) with an **Action taken** box for each. Old SBP/DBP/mean become the first reading.
- PDA course: the separate "Course (days)" box is removed; one **Course day** box counts the days from the start date.
- SBAR rewritten as bullets: one bullet per category with sub-points, essentials only (S: baby, severity, problems; B: birth, diagnosis, key antenatal, admission; A: each system with changes from today and yesterday; R: to do, pending, if/then, parents).
- Work plan: each category is a bullet list – Dx, Problems, Resp, CVS, Fluids, Renal/Abd, Infection, Other meds… Changes from today and yesterday are marked ↻.

## Update 16 (sw v31)
- Work plan card, in this order: Born (date & time of birth, PND), Admitted (date, time, from), Age, Weight, Dx, Problems,
  Resp (support, **last BGA only** – cord/admission gases not shown, last ventilation change), CVS (**last BP** + action, inotropes, PDA, last inotrope change),
  Fluids (total intake, IVF, feeding status, UOP, balance, blood sugar, last fluid change), Abdomen (only if a concern),
  Neuro (seizures, anticonvulsants, abnormal exam, cranial US, Sarnat / Thompson score, cooling, aEEG / NIRS, ROP),
  Infection (sepsis status, antibiotics with day, cultures, last antibiotic change), Jaundice (if relevant), Last labs, Imaging (abnormal),
  Transfusions (if any), Lines with days in place, all current Medications with day count, Consults, If / then, Parents update, then the tasks for this shift.
