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

## Update 17 (sw v33)
- Spell check: free-text boxes (notes, plans, details, indications) use the device spell check – misspelt words are underlined and tapping them shows suggestions. It is switched off for name, ID, times, dates, lab cells and drug / organism boxes (those have their own suggestions).
- Maternal antibiotic courses: type any antibiotic; suggestions appear as you type (penicillins, cephalosporins, macrolides, aminoglycosides, carbapenems, etc.).
- Respiratory: **POCUS lung ultrasound score** table just before Respiratory notes – 6 zones (upper anterior, lower anterior, lateral, each side) scored 0–3, total 0–18 worked out automatically; one column per scan (+ New score). "How to score" box (Brat 2015). The latest score goes to the handover and work plan.
- Blood pressure readings: date is day/month only with the time, so it takes less space; SBP / DBP / mean boxes are larger with large numbers.
- Inotropes: start date is day/month only (no year).
- Drug logs (antibiotic and inotrope): one line per event – "Ampicillin 100 mg/kg/dose q8h started", "Ampicillin 150 mg/kg/dose q8h" (new dose), "Ampicillin stopped (day 3)". A dose typed soon after starting completes the "started" line; changing the start time moves that line instead of adding a new one.
- Transfusions: the number (#1, #2…) sits in its own box beside the product; "Received so far" shows the count in a box beside each product.

## Update 18 (sw v40)
- Jaundice: new **Threshold guideline** box – **AAP 2022** (default), **NICE CG98** or **Type levels by hand**. The phototherapy and exchange levels are now filled in automatically from the two Excel files:
  - AAP 2022 (Suppl. Tables 1–4, µmol/L): read by completed hour of age at the TSB (1–336 h) and GA 35–≥40 wk. A **Neurotoxicity risk factor** box (no / ≥ 1, risk factors other than GA) picks the table. Also shows the escalation-of-care level (exchange − 34 µmol/L). Below 35 wk it asks you to choose NICE.
  - NICE CG98 threshold graphs: ≥ 38 wk from the 6-hourly NICE table; 23–37 wk from the NICE graph formula (phototherapy 40 → GA×10 − 100, exchange 80 → GA×10 by 72 h, then flat).
  - Age in hours = TSB date / time minus date & time of birth (now if the TSB time is blank).
- New **TSB vs phototherapy level** box; TSB vs exchange and the BIND-M trigger (within 30 µmol/L) use the guideline levels.
- Handover / work plan show the level with its source, e.g. "photo level 282 (AAP 2022 · 38 wk · no risk factor, 52 h)".
- Babies who already had levels typed in stay on "Type levels by hand" until you change the guideline.
- "Threshold sources & AAP risk factors" reference box at the end of the Jaundice section.

## Update 19 (sw v41)
- New section **Newborn screening & metabolic** (after Neuro, before Investigations):
  - **Newborn blood spot screening**: 1st sample date & time, feeding at sampling (milk / TPN / NPO), automatic **age at sample** with warnings (taken before 24 h; transfusion given before the sample; on TPN; not on milk feeds). Result (awaiting / normal / abnormal – recall / repeat needed / inadequate), abnormal condition with suggestions (CH, CAH, PKU, MSUD, MCAD, galactosaemia, biotinidase, CF, haemoglobinopathy, G6PD, SCID, SMA…), repeat due date, repeat taken, repeat result.
  - **Other screening**: hearing screen (result, OAE / AABR, date), CCHD pulse oximetry (result, pre / post-ductal SpO2), thyroid (TSH / FT4).
  - **Metabolic**: metabolic concern; when chosen – working diagnosis (suggestions), ammonia (automatic check: > 100 high, ≥ 200 urgent metabolic advice), lactate, urine ketones, hypoglycaemia critical sample, tests sent & results, management.
- Work plan: **Screening** and **Metabolic** lines (flagged for abnormal NBS, hearing refer, CCHD fail, ammonia > 100).
- SBAR: Screening and Metabolic in Assessment; Pending lists NBS sample not taken, NBS / repeat result awaited, repeat due date, hearing screen not done / booked, critical sample results.

## Update 20 (sw v42)
- **Print fix for phones.** Some phones (especially the app installed on the iPhone home screen) ignore the Print button. Print / PDF and Print work plan now check whether the print screen opened; if not, a box appears with **Share / save print file**: it makes the same A4 print layout as a file (Save to Files, WhatsApp, AirDrop, email). Open the file → Share → Print (on iPhone, pinch out on the print preview to save as PDF). "Try Print again" and step-by-step help are in the same box.
- Where printing works (computer, Safari / Chrome tab) nothing changes – the print screen opens as before.
- Baby print: the jaundice guideline box only prints when a TSB is entered.

## Update 21 (sw v43) – checked against the paper follow-up sheet
- Respiratory: new mode **SiPAP / BiPAP** (P high, P low, rate, T high, FiO2). New **CXR** box (date, findings, tube / line tips) – shown in the work plan (if not normal) and the SBAR.
- Blood investigations: new **Cardiac** group – **BNP / NT-proBNP** and Troponin (dated like the other labs).
- Everything else on the paper sheet was already in the app (maternal labs, HVS, urine, CTG, cord / admission gases, Apgar, CGA, current weight, TPN / dextrose, renal labs, liver & bone, coagulation, TG, blood group / DCT / G6PD, head US, imaging, medications, plan).

## Update 22 (sw v44)
- Cardiovascular: **Targeted neonatal echo (TnECHO) forms** from the unit forms – each is a table with one column per exam (+ New exam), so follow-up exams sit side by side:
  - **Hypotension / haemodynamic assessment**: structures, preload (filling, LVEDD, IVC), LV systolic (contractility, EF M-mode, FS, EF Simpson, mVCFc, SVI, MPI), diastolic (E/A, E/E′), s′, RV (TAPSE, FAC), afterload (SVR, wall stress), LVO / RVO, catheter position, pericardial effusion, recommendation.
  - **PDA assessment**: diameter (size worked out), CW Doppler pattern, the 6 items of the **PDA shunt volume score** – points worked out automatically from the numbers (total /12) – and **treatment criteria** (diameter > 1.5 mm AND L-R flow AND score ≥ 6).
  - **PPHN assessment**: PFO/ASD and PDA shunt direction, PDA gradient / est. PAP, IVC, TR gradient / est. PAP, PAAT/RVET, IVS configuration, RV function (eyeballing, TAPSE, FAC, MPI, RVO), LV function, recommendation.
  - Normal ranges from the forms under each label; values outside them turn red. Latest exam of each form goes to the work plan and SBAR (abnormal items + recommendation).
- **OI / OSI** (Blood gases table, Respiratory): the FiO₂, MAP, SpO₂, OI and OSI rows now also show when the baby is on invasive ventilation / HFOV or has a PPHN echo exam (as well as PPHN in diagnosis / problems / echo). A new gas column takes FiO₂ and MAP from the current ventilator settings. OI uses arterial pO₂; OSI uses SpO₂. Last BGA on the work plan shows OI (with severity band) and OSI.

## Update 23 (sw v45)
- Blood gases: **OI is worked out only for arterial gases** (site = Art; needs FiO₂, MAP, pO₂) and **OSI only for capillary / venous gases** (needs FiO₂, MAP, SpO₂). A new **"Oxygenation index / saturation index (latest gas)"** box under the gas table shows the latest value, with OI severity band, gas time, FiO₂ and MAP.
- Echo forms: a box under each form shows what is worked out automatically for the latest exam – PDA: **size, shunt score /12, treatment criteria**; hypotension and PPHN forms: values outside the normal range and abnormal findings.
- Everything the app calculates inside tables (OI / OSI, PDA size / score / criteria, Thompson, Sarnat, lung US totals) and the new automatic boxes now have their own **purple colour**, so they stand apart from boxes you type in.

## Update 24 (sw v46)
- OI / OSI: removed the formula and "needs …" notes. Rows are labelled just OI and OSI; the "OI / OSI (latest gas)" box under the gas table appears only once a value has been calculated.

## Update 25 (sw v47)
- OI and OSI values are shown in their own blue box (in the gas table and in the "OI / OSI (latest gas)" box); the box turns **red when the value is above 15**.
- The OI comment (moderate 15–25 · severe 25–40 · very severe > 40) appears only when OI is above 15 – in the latest-gas box and on the work plan.

## Update 26 (sw v48)
- Date & time boxes: the date part is wider; time (h:mm) and AM / PM stay as two small boxes beside it.
- Blood pressure readings: removed the "Normal range needs DOB, time of birth and GA" note.
- PDA echo: PDA size and shunt score show as coloured boxes in the table and in the summary box (size: small green · moderate amber · large red; score ≥ 6 red with "high shunt"; treatment criteria red when met). Criteria are only judged once all 6 score items are in, or the score already reaches 6.
- Feeds: choosing **Other** opens an "Other feed / special formula" box with suggestions (hydrolysed, amino-acid, MCT, lactose-free, soy, AR, high-energy, renal, PKU / MSUD / urea-cycle / organic-acidaemia formulas, ketogenic…) – or type your own. It shows in the work plan and handover.
- Cultures: the Status box is removed to give more room. Status now follows the Organism box (blank / "Awaiting result" = awaiting; "No growth"; "Contaminant"; any organism = positive).
- Newborn blood spot screening is now a list – **+ Screening sample** adds as many as needed (sample type, date & time taken, status, and a **Result** box to write the result or pick a condition). "Feeding at 1st sample", age at 1st sample and "Next sample due" stay. Old 1st / repeat entries are moved into the list automatically.
- Metabolic: **Special investigations (metabolic team)** list – investigation name (with suggestions: amino acids, organic acids, acylcarnitines, carnitine, ammonia, lactate / pyruvate, ketones, insulin / cortisol / GH, reducing substances, orotic acid, succinylacetone, homocysteine, GALT, biotinidase, VLCFA, CDG, CSF glycine / lactate, AASA, sulphite, copper, 7-DHC, lysosomal enzymes, GAGs, genetics…), date and result. Investigations without a result appear under Pending. The old "tests sent" text is moved into the list.

## Update 27 (sw v49) – fixes found with a 5-day test baby
- Test file **NICU-test-baby-5-days.json** (tap ⇩ Receive and pick it): term baby with HIE (cooling), MAS, PPHN on HFOV / iNO, inotropes, seizures, EOS work-up, transfusions, TPN, jaundice, newborn screening and metabolic tests, 21–25 Oct 2026. Delete it when done (Status & handover → Delete this baby).
- "OI / OSI (latest gas)" box now uses only the most recent gas (it was showing an older value when today's gas had no MAP).
- Feeds → Other: new **kcal / 100 ml** and **carbs g / 100 ml** boxes, so calories and glucose from special formulas are worked out.
- Newborn screening: sampling warnings (before 24 h, after transfusion, on TPN) stop once a repeat sample has been taken.
- No doubled words in handover lines (e.g. "Normal – Normal …", "contaminant Contaminant").
- Echo forms fold away once they have exams (tap to open); the coloured summary box stays visible. Shorter Cardiovascular section.
- Print: calculated rows (OI / OSI, Thompson / lung US totals, PDA size / score) were missing – now printed; BP normal-range boxes, normal-range notes, change-log dates and medication rows no longer print oversized (the test baby prints on 4 pages instead of 5).

## Update 28 (sw v50) – easier to read
- Numbers and dates in boxes are **bold**; dates (date of birth, cultures, all date boxes) are centred.
- Location (e.g. **C3 S1 ISO 1**) is shown in **red bold** on the baby tab, at the top of the baby file, on the work plan cards and the SBAR header.
- Text boxes grow automatically to show everything written (Diagnosis, Current problems, notes, indications, CXR, consult / imaging notes, metabolic results, echo recommendations…). CXR is now a large box.
- Blood gases: the date spans the whole column above time and AM / PM; a line separates each gas.
- Sarnat and Thompson tables: wider pick-lists so the whole choice can be read (narrower label column on phones).
- Thyroid (TSH / FT4) removed from Newborn screening.
- SBAR card: each category name on the left, its items as separate small boxes, numbers in bold, changes marked ↻. Copied text is unchanged.

## Update 29 (sw v51)
- Text boxes are only as tall as what is written in them (one line when short or empty) and grow line by line as you type – no more oversized boxes. They re-measure when the screen is rotated or resized.
- The section bar (1 Patient … 19 Status & handover) stays at the top while scrolling, under the top bar – tap any section to jump there.
- Floor, Station and Bed boxes show the location in **red bold**.
- Date boxes: date centred left–right and top–bottom.
- SBAR card: less empty space (narrower name column, tighter rows). The "Full text to copy" box stays a fixed size with its own scroll.
- Antenatal antibiotic course details box grows to show the whole text.

## Update 30 (sw v52)
- Tables (blood gases, labs, echo forms, Sarnat, Thompson…): every box and its value is centred in its column; dates centred. Number boxes everywhere show the number in the centre (no up/down arrows).
- Boxes with suggestions (other feed / special formula, DCC reason, gastric aspirate colour, organism, newborn screening sample / result, metabolic investigations, plan time…) now grow to show the full text. Suggestions still appear: tap an empty box to see the whole list, or type to filter (matches any part of the name).
- Task, previous-medication and antenatal antibiotic boxes also grow with their text.
- Fixed overlapping boxes in Lines & tubes and Transfusions (date / time / AM-PM / days no longer run into each other on any screen size).
- HIE & cooling rebuilt, in this order: **Open HIE Calculator – CPQCC Cool Tool (California)** (opens https://cpqcc.org/cooltool/, needs internet) → Sarnat and Thompson (from the tables only; the manual boxes were removed) → Cooling status → **Cooling started** + **Age at start of cooling** (automatic from date & time of birth) → **Cooling method** + **Target temperature** → **Temperature changes** list (+ Temperature change: time, new temperature, reason) → Cooling hour (while cooling) → **Cooling ended** + **Cooling duration** (automatic) → current core temp, aEEG, NIRS, MRI. The old "method / target" choice is split automatically into method + target temperature.
- SBAR card: larger text; on phones each category name sits above its items.

## Update 31 (sw v53)
- Removed the outside HIE calculator link.
- New **Cooling eligibility check – AAP 2014 (NICHD trial criteria)** inside Neuro (shown for GA ≥ 35 wk or HIE; opens automatically until cooling has started). Works offline, no outside links.
  - **A · Gestation & age**: GA ≥ 36 wk and ≤ 6 h at assessment (assessment time box; blank = now). 35 wk → "discuss"; > 6 h → "discuss – late cooling"; BW < 1800 g flagged.
  - **B · Evidence of asphyxia**: worst pH / BE in the 1st hour taken automatically from the cord, admission (if ≤ 1 h) and gas tables, or typed here. pH ≤ 7.0 or BE ≤ −16 = met; pH 7.01–7.15, BE −10 to −15.9 or no gas → needs an acute perinatal event plus Apgar ≤ 5 at 10 min (from Birth) or assisted ventilation ≥ 10 min.
  - **C · Encephalopathy**: clinical seizures (or Seizures = Confirmed in Neuro), or ≥ 3 of the 6 NICHD categories moderate / severe (consciousness, spontaneous activity, posture, tone, primitive reflexes, autonomic).
  - Result: MEETS / does NOT meet / incomplete (lists what is missing). Shown in the handover. Decision support only.

## Update 32 (sw v54)
- Cooling eligibility check updated to the **AAP clinical report 2026** (Zanelli et al., *Pediatrics* 2026;157(2):e2025073627), which replaces the 2014 statement: ≥ 36 0/7 wk, moderate–severe HIE, start within 6 h, 33.5–34.5 °C for 72 h.
  - 35 wk now reads "outside AAP 2026 criteria – discuss" (was "many units cool from 35 wk").
  - Mild-only exam: "AAP 2026: cooling not recommended for mild HIE".
  - Target temperature outside 33.5–34.5 °C turns red; a cooling duration under 72 h is flagged.
  - Blood gas / Apgar / ventilation / 6-category exam rules unchanged (NICHD trial criteria, as used by the report's eligibility).

## Update 33 (sw v55) – new section order
1 Patient · 2 Antenatal history · 3 Birth · 4 Respiratory · 5 Cardiovascular · 6 Fluids & nutrition · 7 Abdomen & renal · 8 Neuro · 9 Infection · 10 Lines & tubes · 11 Current medications · 12 Previous medications · 13 Jaundice · 14 Investigations · 15 Transfusions · 16 Newborn screening, ROP & metabolic · 17 Consultations · 18 Plan for this shift · 19 Status & handover.
- ROP screening moved from Neuro to section 16, before the newborn blood spot screening (data and ROP log unchanged).
- Transfusion "Unit" box widened on medium screens.

## Update 34 (sw v56) – full review: safety fixes, new fields, new layout
Safety
- **Shift date** now starts on today at every launch and rolls over at midnight. Picking another date is deliberate back-dating and shows an amber banner with **Back to today**. (Before, an old date stayed set and silently changed log dates and every Day count.)
- **Blood gas unit**: pCO₂ / pO₂ are in **kPa** (unit default); mmHg can be chosen in Handover → Sync & settings. OI converts kPa × 7.50062. (Before, the app guessed: any pO₂ < 30 was treated as kPa, so a real PaO₂ of 25 mmHg gave OI ≈ 5 instead of ≈ 38, and a pO₂ ≥ 30 kPa was treated as mmHg.)
- **Saving**: if the device storage is full or blocked a red **Not saved** banner appears (before: silent failure). Saving is grouped (350 ms) and only edited babies are compared – faster with many babies.
- **Backup**: asks the browser for persistent storage; shows the last backup date and reminds after 3 days without a backup.
Clinical content
- Apgar 10 / 15 / 20 min open when the 5-min Apgar is **< 7** (NRP / AAP–ACOG).
- "Corrected age" renamed **CGA / PMA**; Thompson total 0 reads "normal".
- Cooling check wording updated to AAP 2026: started at 6–24 h → small benefit, "discuss"; > 24 h not eligible; 35 wk → select cases with the family.
- New fields: consanguinity; pregnancy (twins / triplets, birth order, chorionicity); maternal GBS, HIV, HBsAg, syphilis, rubella, HCV, antibody screen; admission temperature (WHO categories); vitamin K, Hep B, BCG; **iNO** (status, ppm, start – logged); NEC modified Bell stage; size / length / tip for every line and tube (ETT size and cm at lip).
- Lab rows show units (SI). **CCHD pulse oximetry** algorithm (right hand + foot → pass / repeat / fail, AAP 2020).
- Linked data: latest Imaging X-ray shown under CXR; latest lab-table TSB shown in Jaundice with **Use this**.
- Ranitidine removed from drug suggestions. BIND-M unchanged (unit uses BIND-M).
Layout and usability
- Each baby has a **summary strip** (location, name, ID, severity, GA, PND, CGA / PMA, weight, support, required boxes still empty) and **five tabs**: Today · Results (blood gases, echo forms, labs, transfusions, screening) · Background (patient, antenatal, birth) · History (all change logs, previous meds, consults) · Handover (SBAR, sync & settings).
- Each system shows its **last change** under the title; the full logs are in History.
- Required boxes marked *; implausible values get a red box and a short message (e.g. FiO₂ entered as 0.6).
- Deleted rows and log entries can be restored with **Undo** (7 s).
- One consolidated stylesheet (150 → 22 `!important`); colour has one meaning: white = typed, teal = calculated, red = out of range. Location is no longer red.
- Pinch-zoom allowed; time / date boxes carry their field name for screen readers.
Sync and security
- Same baby changed on two devices → the older version is kept as a **conflict copy** (nothing lost).
- Files that are not password-locked ask before opening; ids / locations from files are checked before use.
- New sync files use 600,000 PBKDF2 rounds (older files still open). Print-file fallback warns that it is not locked.
- Service worker: on slow Wi-Fi the saved copy opens after 3 s.
Upload `index.html`, `sw.js` (v56), `manifest.webmanifest` and this README. Saved babies open as before.

### Upload checklist (v58)
1. Upload `index.html`, `sw.js`, `manifest.webmanifest` and `README-v2.md` to the repository root (replace the old ones). Icons are inside the files – nothing else is needed. `refdata.js` and `tools/` are no longer used and can be deleted.
2. After GitHub Pages updates (1–2 min), open the app once while online, then close and reopen it so the new version (sw v58) is used.
3. Blood gases are in **kPa** by default. Check Handover → Sync & settings shows "kPa".
4. Send a backup (⇪ Send) from each device after updating – the new version reminds you every 3 days.
5. Optional: `NICU-demo.html` is a stand-alone example with a test baby; it uses separate storage. Do not upload it to the live site unless you want it public.

## Update 35 (sw v57) – more colour, same meaning
- Each body system has its own colour: section header, number chip, sub-headings, section bar chips and work-plan labels (respiratory blue, cardiovascular berry, fluids cyan, abdomen orange, neuro violet, infection olive, jaundice gold, lines slate, medicines green, plan indigo, antenatal pink, birth amber; results tab follows the same system colours).
- Summary and work-plan tiles are colour-coded (GA, PND, CGA / PMA, weight, support); SBAR blocks are tinted S amber · B blue · A teal · R red.
- Status colours are unchanged and reserved: white box = typed, teal tint = calculated, red = out of range / act, amber = warning. Dark mode and print follow the same colours.

## Update 36 (sw v58) – clearer automatic boxes, iNO only when relevant
- **iNO** section shows only when it applies: PPHN in Diagnosis / Current problems / echo, "hypoxaemic respiratory failure" (or HRF) written in Diagnosis / Current problems, latest OI > 15, or iNO currently On / Weaning.
- **Latest blood gas** (Respiratory) shows each value in its own box with units: pH, pCO₂, pO₂ (kPa), HCO₃, BE, lactate, FiO₂, MAP, SpO₂, and OI / OSI (red when OI > 15).
- **Automatic summaries are bullet lists**: latest TnECHO (one heading per exam, findings as bullets, recommendation in bold), PDA / haemodynamic / PPHN summaries, cooling-check A / B / C details, phototherapy / escalation / exchange levels shown as boxes with the guideline details as bullets.

## Update 37 (sw v59) – Today weight, simpler maternal screen, folding old data
- **New Today section "Weight & growth"** (first in Today): current weight, length, head circ. and **one** *Measured on* date on one row, then growth notes. The date fills in with the shift date when you type; change it to enter yesterday's values. A **Weight change** box shows the previous weight and the change in bold (e.g. Previous 1240 g on 26/10 → +25 g; g/day if more than 1 day apart), and warns when the measurement is 2 or more days old. The weight tile shows the date when it is not today.
- Patient: "Change from BW" box removed; birth measurements on one row; current measurements shown on one line (Weight · Length · HC, date, Edit).
- **Maternal investigations**: blood group, antibody screen, **HVS (GBS)** (one box; "Other organism grown" opens a details box), HIV, HBsAg, syphilis. **Extra screening** (Illegal baby, Mother addicted, Unbooked, Other) shows Rubella and Hepatitis C, and **+ Extra investigation** rows (name with suggestions + result). Tests without a result appear under Pending.
- Vitamin K and BCG removed. **Hepatitis B vaccine and HBIG** (with time given) appear only when the mother is HBsAg positive; not given yet → Pending.
- Respiratory: mode and all ventilator settings on **one line**.
- Antibiotics / medicines: only the **dose to give** is shown (e.g. 125 mg / dose) in a teal box, with the weight used. No mg/kg/day conversions.
- **Surfactant** given on an earlier day folds into one line (doses, last dose, PND) with **Show / add dose**. Work plan shows surfactant only on the day given and the next day.
- **Blood pressure**: readings from earlier days fold under "Earlier readings"; each reading shows the normal range for its own date (GA, PND and CGA), so a reading entered today gets today's range.
- **Antenatal steroids**: new option **Multiple courses** opens Course 1 and Course 2 (rescue), each with status (complete / incomplete), date and steroid. Shown in the handover.
- Text in all boxes is **bold** (placeholders stay light).
- Bed tabs at the top show the baby as **B/O + first name + first letter of the 2nd name** (e.g. "Baby of Sara Ahmed" → B/O Sara A.) instead of the task count.

## Update 38 (sw v60) – cleaner Today page
1. Empty score tables (lung ultrasound, Sarnat, Thompson) show only the "+ New score" button until the first score.
2. Inotropes: only Drug 1 shows; the next row appears when the one before it is filled.
3. Short boxes share a row: PDA + size + course; urine output + losses; seizures moved into the neuro examination. Rows whose boxes are all hidden leave no gap.
4. Section chips get an amber dot when something in that section changed today.
5. Daily values typed on an earlier day (blood glucose, urine output, gastric aspirate, girth, vomiting, stool, abdomen, AXR, TSB, CXR, core temp) turn amber with "yesterday" / "n d old". Works for values typed after this update.
6. **Open tasks** strip at the top of Today with tick boxes (ticks the task in Plan for this shift too).
7. Section chips use short names (Resp, CVS, Meds…) and wrap onto two lines instead of scrolling sideways.

## Update 39 (sw v61) – timed changes, OI/OSI always, TPN by GIR, Numeta, loss replacement, TOP thresholds
1. **Time of change** bar at the top of Resp, CVS, Fluids, Abdomen, Neuro, Infection and Jaundice (Today). Set the time (dd/mm + h:mm AM/PM) and every change made in that section is logged at that time in History → Change logs. Set it before or straight after the changes (changes from the last 15 min move to the chosen time). Stays on for 15 min, then goes back to "now". A time later than now just after midnight is taken as yesterday.
2. New logs: **Abdomen & renal** (abdomen, NEC, vomiting, losses, replacement), **Neuro** (seizures, anticonvulsants, cooling, aEEG), **Jaundice** (TSB, phototherapy); caffeine and surfactant changes go into the ventilation log. Changes also appear in the handover and work plan.
3. **OI / OSI** rows are always in the gas table. A new gas takes FiO₂ and MAP from the current settings (HFOV MAP; CPAP level; conventional / NIPPV / BiPAP estimated) – type over with the ventilator's MAP if different. If OI / OSI cannot be worked out, the box says what is missing.
4. Today → Resp shows the **last 2 gases** with ↑ ↓ against the gas before (also in the work plan and handover).
5. Lung ultrasound, Sarnat and Thompson: only a "+" button until the first score (no "how to score" box until then). CVS: **+ Inotropes, + PDA, + Echo** buttons – the boxes appear when pressed or when they hold data (opened but left empty, they fold again the next day).
6. Fluids: **Glucose ordered as GIR** → dextrose % needed (with a "Use" button; warns > 12.5 % = central line). For TPN the dextrose is worked out in the volume without the lipid. **Lipid type** box (SMOFlipid, Intralipid, ClinOleic, Lipofundin, Omegaven) with lipid volume ml/kg/d and ml/h. New fluid types **Numeta G13%E (preterm)** and **Numeta G16%E** (3- or 2-chamber bag, volume) → GIR, protein, lipid, kcal, Na, K, Ca, PO₄ from the Baxter SmPC, with max volume / rate warnings.
7. Abdomen: **GI loss replacement** for stoma, NG/OG and gastric aspirate losses: ml/kg/day, red when > 20, replacement split q6h / q8h / q12h (100 / 75 / 50 %), replacement fluid.
8. Cultures: **Swab from** box (stoma, eye, nose, ear, umbilical, rectal… or type). The culture list is the same in Today → Infection and Results → Investigations; old C/S and Swabs lab-table cells were moved into it.
9. Medicines: **Route** box next to the dose (filled in for common drugs). **Budesonide (Pulmicort)** and Salbutamol (nebulised) added. Caffeine has a route box.
10. **Diagnosis & problems** is now the first Today section – the same boxes as in Patient, so editing either updates everywhere.
11. Transfusions: **PRBC threshold – TOP trial lower arm** (Hb g/L: week 1 110 / 100, week 2 100 / 85, week ≥ 3 85 / 70, with / without respiratory support) compared with the latest Hb; flagged in the work plan when below. Preterm babies only.
12. Lab table: normal ranges under each test; values outside them turn **red** (Hb uses the TOP threshold for preterm babies). Ranges are typical neonatal values – edit INV_ROWS in index.html to match your lab. Abnormal values show ↑ ↓ in the work plan.
Upload `index.html`, `sw.js` (v61), `manifest.webmanifest` and this README.
Test file **NICU-test-baby-5-days.json** (v61 – v62): open it with ⇩ Receive (answer OK to "not password-locked"). 27+3 wk ELBW boy, 980 g, born 24/10/2026 – RDS on SIMV, hsPDA on paracetamol, dopamine, SIP with ileostomy (stoma losses replaced q6h), TPN ordered by GIR with SMOFlipid, CoNS in blood culture, stoma / nose / rectal swabs, Hb below the TOP threshold, abnormal labs in red, logs for every system. Delete it after testing (Handover → Delete this baby). Do not upload it to the live site.

## Update 40 (sw v62) – automatic growth centiles
- Centiles are worked out automatically from the growth charts you sent (no more typed centile boxes):
  - **Born ≤ 36+6 wk: Fenton 2013** (girls / boys; weight, length, head circ.) by PMA up to 50 weeks (from v63: read at the exact day, see Update 41). The centile is placed between the 3rd, 10th, 50th, 90th and 97th curves; below / above the outer curves it shows "< 3rd" / "> 97th".
  - From **50 wk PMA**: WHO by corrected age (PMA − 40 wk).
  - **Born ≥ 37+0 wk: WHO Child Growth Standards** by actual age (L, M, S by month to 24 months). WHO head circumference was not in the WHO file, so the official WHO L, M, S head-circumference table (CDC data tables for the WHO charts) was added.
- Patient → **Birth centiles** box (weight, length, head circ.) with **SGA / AGA / LGA** (< 10th / 10th–90th / > 90th). Centiles typed in older versions are listed under it.
- Today → Weight & growth → **Centiles** box for the current weight, length and head circ. on their "Measured on" date, the change in weight z-score since birth (↓ = falling across centiles), and the previous weight's centile. Values < 10th or > 90th are red.
- Centiles are added to the work plan (BW, CW) and the handover (birth and current measurements). Needs sex (M / F), GA and date of birth.
- The Fenton values are digitised from the chart (≈ ± 10–20 g); for a borderline result check on the official chart.

## Update 41 (sw v63) – new Fenton table (day by day)
- Fenton 2013 data replaced with the new workbook: one row per day, weight 22+0 to 50+0 wk, length and head circ. 23+0 to 50+0 wk, all five centiles (3rd, 10th, 50th, 90th, 97th) to 50+0 (the old table had no length 90th / 97th near 50 wk).
- Centiles are read at the **exact PMA** (e.g. 30+1), the same way PediTools does – no more mid-week reading. The workbook was checked against PediTools within about 1 centile; confirm borderline values (e.g. right at the 10th) in PediTools or on the chart.
- After 50+0 wk PMA: WHO by corrected age, as before. Born ≥ 37+0 wk: WHO, unchanged.
- Test file **NICU-Fenton-examples.json** (⇩ Receive): 3 boys and 3 girls (C4 S2 beds 1–6) to compare with PediTools. Delete them after checking.

## Update 42 (sw v64) – Fenton centiles checked against PediTools
- For every day of the Fenton table the app now fits smooth curve parameters (L, M, S – the method PediTools uses). These reproduce the 3rd–97th curves of the table within 0.5 %.
- Checked on 6 babies (3 boys, 3 girls; 18 measurements) against PediTools Fenton 2013: within 0.06 z everywhere (largest difference 2.1 centiles: boy 35+4 HC 33.5 cm → app 75.8 %, PediTools 77.9 %), 16 of 18 within 0.6 centile.
- Results are shown as PediTools shows them: centile, % with one decimal and z with two decimals (e.g. 7.7 % · z −1.43). Values below the 3rd or above the 97th now get an exact centile (e.g. 1.2 %) instead of "< 3rd".
- WHO (born ≥ 37 wk) unchanged.

## Update 43 (sw v65) – Fenton calibrated to PediTools, no z-scores
- Fenton curves corrected with 16 PediTools Fenton 2013 results (your screenshots: boys 23+4 to 35+4, girls 23+2 to 36+6; 48 measurements). At those ages the app now matches PediTools within 0.1 centile; between them about 0.4 centile on average (boys' head circ. 32–37 wk up to ≈ 2.5). The correction fades out 4 weeks after the last checked age.
- z-scores removed from the screen: only the centile and % (e.g. 8th · 7.7 %). The change since birth is shown as "↓ from 45th at birth".
- New workbook **Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx**: the corrected day-by-day centiles with L, M, S for every day, and a 'PediTools check' sheet that recalculates every screenshot value by formula.

## Update 44 (sw v66) – tab order, history by system
- Tabs from the left: **Background · History · Results · Today · Handover** (the file still opens on Today).
- History is now **system by system**, in the same order and colours as Today: Resp, CVS, Fluids, Abdomen, Neuro, Infection, Lines, Previous meds, Jaundice, ROP, Consults – each with its own chip, oldest change first, + Entry to add one by hand.
- "All changes" under a Today section opens that system's history directly.

## Update 45 (sw v67) – Diagnostics tab, ROP in Today
- The Results tab is now **Diagnostics**, in this order: 1 Blood gases · 2 Labs (blood group / DCT / G6PD, cultures & swabs, lab table) · 3 Imaging (its own section) · 4 TnECHO · 5 Transfusions · 6 Newborn screening (newborn blood spot screening, metabolic, other screening – hearing and CCHD – then notes).
- **ROP screening** moved to Today (after Jaundice), with its own "Time of these changes" bar; the ROP log stays in History → ROP. Saved data unchanged.

## Update 46 (sw v68) – bed numbering
- **C6 and C7**: rooms are numbered across the floor – S1 rooms 1–3, S2 rooms 4–6, S3 rooms 7–9 (4 beds each), plus isolation rooms 1 and 2 in each station.
- **C3 and C4**: S1 unchanged (ISO 1–4, beds 1–9); **S2 continues the numbering from bed 10** (beds 10–24).
- Babies already saved move to the new numbers automatically, once (e.g. C3 S2 bed 3 → bed 12; C6 S2 room 1 → room 4; C7 S3 room 3 → room 9). Files received from a device that has not been updated are converted the same way.

## Update 47 (sw v69) – lab ranges from your reference files
- Lab table ranges now come from **Pediatric_Lab_Reference_Ranges.xlsx** (CURRENT Dx & Tx Pediatrics 27e 2025, Pediatric Reference Intervals 8e 2021, Gomella 8e) and **Coagulation_Reference_Ranges.xlsx**, by age in days (and sex where the book gives separate ranges). Each column is checked against the range for the baby's age on that date; "N:" under each test shows today's range.
- Set as you asked: **DSB ≤ 17.1 µmol/L**, **CRP < 6 mg/L**, **nRBCs < 8 /100 WBC**, **fibrinogen in g/L** (Gomella: term or preterm, day 1 / 5 / 30).
- PT and APTT (Gomella, term vs preterm) and creatinine, PCT and D-dimer flag only when high. Hb: preterm babies keep the TOP transfusion threshold as the lower limit. INR is not in the files: preterm ≤ 1.85 (healthy preterm, coagulation file), term ≤ 1.5. BNP / NT-proBNP and troponin are not flagged (assay-dependent).
- Blood gases: the unit / OI note and the "OI / OSI (latest gas)" box were removed (OI and OSI still show in the gas table and in Today).

## Update 48 (sw v70) – centile boxes
- Centile boxes no longer repeat the PMA / age (it is already shown at the top of the file): e.g. "Birth weight 980 g · Fenton 2013 – 45th 45.3 %".
- Patient → **Current measurements** now uses the same boxes as the birth centiles (weight, length, head circ. with chart and centile, measured-on date, Edit).

## Update 49 (sw v71) – lab ranges from published neonatal references
Replaces the ranges of Update 47. Each column is checked for the baby's age on that date.
| Test | Normal / red when | Source |
|---|---|---|
| TLC ×10⁹/L | day 1: 5–30; from day 2: 5–21 | Rodwell haematological scoring system, J Pediatr 1988 |
| Hb g/L | term 130–220; preterm: TOP threshold – 220 | Gomella (neonatal anaemia < 130; polycythaemia Hct > 65 %); TOP trial, NEJM 2020 |
| Platelets ×10⁹/L | 150–450 | neonatal thrombocytopenia < 150 |
| nRBC /100 WBC | < 10 | healthy newborns < 10 (gone by day 4) |
| Retics % | day 1: 3–7 | Gomella (cord blood) |
| CRP mg/L | < 10 | Gomella Ch 146 |
| PCT ng/mL | day 1 ≤ 21, day 2 ≤ 15, day 3 ≤ 2, then < 0.5 | Chiesa et al., Clin Infect Dis 1998 (first 48 h) |
| PT, APTT, fibrinogen | term / preterm, day 1 / 5 / 30 (PT, APTT red only when high) | Andrew et al., in Gomella Table 92-1 |
| INR | ≤ 1.85 | healthy preterm newborns, 97.5th centile (coagulation reference file) |
| Na / K mmol/L | 135–145 / 3.5–6.0 | neonatal normal ranges (hyperkalaemia treated > 6.5) |
| Creatinine | red on a rise ≥ 26.5 µmol/L in 48 h or ≥ 1.5 × lowest earlier value, or ≥ 221 | neonatal modified KDIGO AKI criteria |
| Ca mmol/L | term 2.0–2.75; preterm 1.75–2.75 | neonatal hypocalcaemia definitions (Vuralli 2019) |
| DSB µmol/L | ≤ 17.1 | NASPGHAN–ESPGHAN cholestasis guideline 2017 |
| ALP U/L | ≤ 900 (with PO₄ < 1.8 → bone disease) | Backström et al., Acta Paediatr 2000 |
| Triglycerides mmol/L | ≤ 3.0 | ESPGHAN/ESPEN/ESPR/CSPEN PN guidelines: lipids, 2018 |
| Vitamin D nmol/L | ≥ 50 | ESPGHAN / Pediatric Reference Intervals |
| Urea, Mg, PO₄, albumin, ALT, AST, GGT | by age | CURRENT Diagnosis & Treatment Pediatrics 27e (2025), Ch 46 |
| D-dimer, PTH, BNP / NT-proBNP, troponin | not flagged | assay-dependent |

## Update 50 (sw v72) – anion gap, lab table without reference text
- Blood gases: new rows **Na, K, Cl**. When a gas shows **metabolic acidosis** (pH < 7.35 with HCO₃ < 22 or BE < −4) the **anion gap** = Na − (Cl + HCO₃) is worked out in its own box, like OI; red with "high" above 16 mmol/L (normal ≈ 8–16). Without Na or Cl it says "needs Na, Cl". The anion gap row only appears when at least one gas is acidotic, and is not shown for other gases. It also shows in Today's last 2 gases and in the work plan / handover gas line.
- Labs: the reference values ("N: …") under each test were removed. Values outside the ranges of Update 49 still turn red.

## Update 51 (sw v73) – your reference ranges for the red boxes
| Test | Term (≥ 37 wk) | Preterm | Source (as supplied) |
|---|---|---|---|
| Hb g/L | birth 140–220 · day 3 150–210 · day 7 135–215 · day 14 125–205 | low limit = TOP threshold, high limit as term | NHS laboratory reference intervals; TOP trial |
| WBC ×10⁹/L | 10–26 · 7–23 · 6–22 · 6–22 | birth 9–30 · 24 h 9.4–34 · 1 wk 5–21 · 2 wk 5–20 · 1 mo 5–19.5 | NHS; Safer Care Victoria |
| Platelets ×10⁹/L | 100–450 · 210–500 · 160–500 · 170–500 | 150–350 | NHS; Safer Care Victoria |
| Urea mmol/L | 1.0–6.5 | 1.0–6.5 | |
| Na / K mmol/L | 135–145 / 3.5–5.5 | 135–145 / 3.5–6.0 | |
| Mg mmol/L | 0.65–1.05 | 0.65–1.05 | |
| Ca mmol/L | 2.0–2.75 | 1.75–2.65 | |
| Ionised Ca mmol/L (new row) | 1.10–1.40 | 1.10–1.40 | |
| PO₄ mmol/L | 1.4–2.6 | 1.5–2.7 | |
| Albumin g/L | 28–44 | by GA: 27 wk 21–33 · 29 wk 23–34 · 31 wk 22–35 · 33 wk 22–35 · 35 wk 22–36 | |
| ALP U/L | day 0–7 75–300 · 8–28 90–477 · 29–90 90–540 | by GA: 27 wk 35–604 · 29 wk 119–465 · 31 wk 112–450 · 33 wk 110–398 · 35 wk 113–360 | Manchester University NHS FT |
| TSB | red at / above the phototherapy level of the Jaundice guideline (AAP 2022 / NICE CG98 / typed level) for the baby's age on that date | | |
| DSB µmol/L | red > 17.1 | | NASPGHAN–ESPGHAN 2017 |
Age bands: birth = day 1–2, day 3 = 3–5, day 7 = 6–11, day 14 = from day 12 (preterm WBC: birth = day 1, 24 h = day 2–4, 1 wk = day 5–11, 2 wk = day 12–21, 1 month after). Preterm GA rows: < 28 → 27 wk, 28–29 → 29, 30–31 → 31, 32–33 → 33, 34–36 → 35. TSB uses the age at the start of that date (the lowest level that day). Other tests as in Update 49.

## Update 52 (sw v74) – final: no red boxes in lab results
- Lab results are no longer coloured red and the work plan's "Last labs" has no ↑ ↓ arrows. (The reference ranges stay in the code, switched off – `LAB_FLAGS=false` in index.html – so they can be turned back on later.)
- Unchanged: anion gap and OI / OSI in blood gases, the TOP transfusion threshold box, and the Fenton / WHO centiles.

### Files in this version
- **Upload to GitHub (replace the old ones):** `index.html`, `sw.js` (nicu-duty-v74), `manifest.webmanifest`, `README-v2.md`.
- **For testing only – do not upload:** `NICU-test-baby-5-days.json` (⇩ Receive), `NICU-Fenton-examples.json`, `NICU-Fenton-extreme-examples.json`, and the demo pages `NICU-demo-5-days.html`, `NICU-Fenton-examples.html`, `NICU-Fenton-extreme-examples.html`.
- **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.
After uploading, open the app once while online, then close and reopen it so v74 is used. Send a backup (⇪ Send) from each device afterwards.

## Update 53 (sw v75) – red boxes back on, using Gomella's Neonatology 8e (2020)
Source: `NICU_Lab_Reference_Values_Gomella8.xlsx` supplied by the unit. Only tests with a Gomella value are coloured; each column is checked for the baby's age on that date. Hover/long-press a red box to see the limit.

| Test | Red when | Gomella |
|---|---|---|
| TLC ×10⁹/L | < 6 or > 30 | Ch 78 p 707 |
| Hb g/L | ≥ 35 wk, day 1–28: < 130 · after day 28: term < 90, preterm < 70 · < 35 wk in first 28 days: below TOP-trial threshold (not Gomella – kept) | Ch 88 p 815 |
| Platelets ×10⁹/L | < 150 | Ch 128 p 1092 |
| Retics % | day 1: outside 3–7 · later term 4–5, preterm 6–10 | Ch 88 / 85 |
| PT / APTT s | above mean + 2 SD (term) or range (preterm 30–36 wk), day 1 / 5 / 30 | Table 92-1 p 840 |
| Fibrinogen g/L | outside the same table | Table 92-1 |
| Na mmol/L | outside 135–145 | Ch 10 / 69 |
| K mmol/L | outside 3.5–5.5 | Ch 10 / 65 |
| Urea mmol/L | > 5.4 (BUN 15 mg/dL – dehydration / renal) | Ch 86 |
| Creatinine µmol/L | term: day 1–2 > 88, day 3–6 > 71, day ≥ 7 > 53 · BW < 2500 g: > 141 · plus KDIGO rise (≥ 26.5 in 48 h or ≥ 1.5× lowest) | Ch 86 p 805 |
| Ca mmol/L | term < 2.0, preterm < 1.75; > 2.75 | Ch 91 |
| Ionised Ca mmol/L | < 1.0 (4 mg/dL) or > 1.35 | Ch 91 |
| Mg mmol/L | outside 0.6–1.0 | Ch 105 |
| PO₄ mmol/L | < 1.29 (4 mg/dL) | Ch 113 |
| TSB | at/above phototherapy level of the chart (unchanged) | |
| DSB µmol/L | > 17.1 if TSB ≤ 85.5, or > 20 % of TSB if TSB > 85.5 | Ch 98 p 891 |
| ALP U/L | preterm > 900; BW < 1000 g > 500; term – no flag | Ch 113 |
| TG mmol/L | > 2.26 (200 mg/dL) | Ch 11 / 13 |

**Not coloured (no Gomella range):** nRBC, CRP, PCT, INR, D-dimer, albumin, ALT, AST, GGT, vitamin D, PTH, BNP, troponin.
Note: the book prints iCa low as "< 1.2 mmol/L" but 4 mg/dL = 1.0 mmol/L – 1.0 is used.

### Files in this version
- **Upload to GitHub:** `index.html`, `sw.js` (nicu-duty-v75), `manifest.webmanifest`, `README-v2.md`.
- **Testing only:** the 3 JSON files and 3 demo HTML pages. **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.

## Update 54 (sw v76) – cleaner Today tab, new way to record changes
- **Header:** location shown as a large coloured badge (S1 blue · S2 green · S3 orange); bed chips at the top carry the same station colour. The repeated "ID · sex · BW" line is removed. Tile text is centred.
- **Open tasks:** one task per line.
- **Diagnosis / Current problems:** shown as a clear bullet list; tap the list to edit (one item per line).
- **Centiles:** the repeated "previous weight …" and "measured on …" lines are removed from the centile box.
- **Recording changes (all Today sections):** the "Time of these changes" bar and the "Last change" line are gone. Each section now has a **Changes · 24 h** box directly under its main settings (Respiratory: under mode / settings; Cardiovascular: under the inotropes; Fluids: under intake / IV fluid; other sections: at the bottom). Every change appears there at once with the day (Today / Yesterday) and time already filled in as *now* – change them if it happened earlier. The full log stays in History.
- **Cardiovascular:** inotropes / medicines first, then the change box; the inotrope "Change / DC time" is pre-filled with the current time.
- **POCUS lung US score in Today:** open only if a score was done in the last 2 days; otherwise folded (tap to open).

### Files in this version
- **Upload to GitHub:** `index.html`, `sw.js` (nicu-duty-v76), `manifest.webmanifest`, `README-v2.md`.
- **Testing only:** the 3 JSON files and 3 demo HTML pages. **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.

## Update 55 (sw v77)
- **Centile boxes** (Background birth / current, Today weight & growth): boxes stretch across the full line, centile centred, label shows only the measurement and chart (e.g. "Weight · Fenton 2013" or "WHO"). "Current measurements" heading shortened.
- **More room under values** in blood-gas, OI / OSI and centile boxes so no number is cut off.
- **Changes · 24 h box:** each change now starts with its **date and time** (pre-filled as now), followed by what changed. Changes made at the same moment (e.g. PEEP 6 → 7 and FiO₂ 40 → 35, or IVF 150 → 160 and fluid type) share one line with one date/time; changing that time moves all of them. Each item has its own × to remove it.

### Files in this version
- **Upload to GitHub:** `index.html`, `sw.js` (nicu-duty-v77), `manifest.webmanifest`, `README-v2.md`.
- **Testing only:** the 3 JSON files and 3 demo HTML pages. **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.

## Update 56 (sw v78)
- **Everything changed in Today goes to History:** besides the boxes already tracked, every other box in a Today section with a change log (Respiratory, Cardiovascular incl. PDA, Fluids incl. electrolytes / TPN additives, Abdomen incl. girth, Neuro, Infection, Jaundice, Lines, ROP, and the notes boxes) is now recorded as "old → new" with its time. It shows in that section's **Changes · 24 h** box and in **History → that system**.
- **Changes box layout fixed:** the day, time and AM/PM boxes no longer overlap the text (also on phones).
- **Words centred** inside selection and text boxes (e.g. Mode "Low-flow O₂", fluid type). Long free-text boxes stay left-aligned.

### Files in this version
- **Upload to GitHub:** `index.html`, `sw.js` (nicu-duty-v78), `manifest.webmanifest`, `README-v2.md`.
- **Testing only:** the 3 JSON files and 3 demo HTML pages. **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.

## Update 57 (sw v79)
- **Centred:** calculated single-value boxes (PND, CGA / PMA, IV rate, GIR, calories …) and short free-text boxes (e.g. Feeds) are now centred.
- **Numeta:** fluid type renamed "Numeta G13%E" (old saved "(preterm)" values are converted). With Numeta chosen only Numeta boxes show: Bag (3- / 2-chamber), Numeta volume, a new **Added to the bag** box (vitamins / trace elements – not in Numeta) and "Numeta gives". Lipid type, Dextrose %, GIR ordered, electrolytes and Aminoplasmin are hidden; "Numeta gives" notes that the lipid (olive + soya oil) is already in the 3-chamber bag.

### Files in this version
- **Upload to GitHub:** `index.html`, `sw.js` (nicu-duty-v79), `manifest.webmanifest`, `README-v2.md`.
- **Testing only:** the 3 JSON files and 3 demo HTML pages. **Reference:** `Fenton_2013_Preterm_Growth_Charts_calibrated.xlsx`.

## Update 58 (sw v80) – handover (SBAR)
- Bigger text throughout the SBAR view.
- No centiles in the handover (baby line, birth line); size at birth shown only if SGA / LGA.
- No repeats: BW only in Birth; diagnosis lines already in Current problems are not listed again; Hb not repeated in Labs when the Hb / TOP line is shown; awaiting cultures only under Pending.
- **Changes – last 24 h** (in Situation): every change recorded in Today, all systems, with time, listed once (instead of under each system).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v80), `manifest.webmanifest`, `README-v2.md`.

## Update 59 (sw v81) – maternal investigations rearranged
1. Maternal blood group · antibody screen / anti-D · TLC · Hb · Plt (CBC).
2. **HVS (GBS)** – when a positive or negative result is chosen: antibiotic date & time, antibiotic (suggestions as you type), number of doses.
3. **HVS (other organisms)** – choose "Organism grown" to open the organism box (suggestions) and the same antibiotic boxes.
4. CRP · **PCT** (new) · urine analysis · CTG.
5. **Extra investigations** list with **+ Add investigation** (name + result, as many as needed).
- The separate "Other investigations" box is removed. Anything already written there is moved into the Extra investigations list ("Other investigations (earlier notes)"), and an old HVS "Other organism grown" result moves to the new other-organisms row – nothing is lost.
- HIV, HBsAg, syphilis and Extra screening (rubella / hepatitis C) stay, below these rows.
- GBS and other-organism antibiotics appear in the handover and work plan.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v81), `manifest.webmanifest`, `README-v2.md`.

## Update 60 (sw v82) – babies admitted from another hospital
- **Admitted from** has a new choice, **Other MOH hospital** (as well as Private hospital and Other hospital). For any of these, the Admission part of Birth shows: hospital name, **age at transfer** (automatic, from birth and admission time), **transport** and **reason for transfer**.
- New Background card **Referring hospital course**, shown only for these babies. It has one part per system: Respiratory (highest support, FiO₂ max, surfactant and time), Cardiovascular (inotropes, bolus), Fluids & feeds (IVF, feeds, lowest glucose), Infection (antibiotics and start time, culture site and time), Lines & tubes (up to 2 with insertion time), Neuro (seizures, cooling and start time), Investigations and other drugs given. Each part has a Details box.
- **Carry to Today** buttons add surfactant, antibiotics, the culture and lines into the normal lists with the time they were started at the other hospital. Day counts, logs and Changes · 24 h use that real time, and antibiotics show "Started at <hospital>".
- **Today tab:** Respiratory, CVS, Fluids, Infection, Lines and Neuro each show a purple **Before transfer · <hospital>** line with what was done there.
- **Handover:** B – Background has one "At <hospital> · <system>" line per filled system. The work plan has a **Before transfer** row.
- The old free-text box is now "Referring hospital – other details", for anything else.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v82), `manifest.webmanifest`, `README-v2.md`.

## Update 61 (sw v83)
- **Patient → Current measurements:** a first row shows the measurements themselves (weight g, length cm, head circ. cm, measured-on date, Edit). The centile boxes are in the row under it.
- **Referring hospital course** now uses the same boxes as Today:
  - **Respiratory:** the same mode list; choosing a mode opens the same settings (PIP, PEEP, rate, Ti, Vt, MAP, flow, FiO₂ max…).
  - **Cardiovascular:** inotropes 1–3, each with the drug list and highest dose in mcg/kg/min. Drug 2 appears once drug 1 is filled.
  - **Fluids & feeds:** total intake, IV fluids, the same fluid-type list, dextrose %, feeds (ml/kg/d or NPO), feed type, route, every … hours.
  - **Neuro:** anticonvulsant given (same drug list) and loading dose.
  - Values entered in the earlier version are kept: the old support and FiO₂ move into the new boxes, and old free text shows as "(earlier text)".
- **History:** Resp, CVS, Fluids, Infection, Lines and Neuro show the purple **Before transfer · <hospital>** line at the top, followed by the change log. Items carried to Today appear in the log at the time they were started at the other hospital.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v83), `manifest.webmanifest`, `README-v2.md`.

## Update 62 (sw v84)
- Antenatal: the **HIV, hepatitis & extra screening** part is removed. It still shows, as "earlier entries", only for babies who already have a value in it, so nothing saved is lost. The Hepatitis B vaccine / HBIG boxes in Birth now appear only for babies who already have HBsAg positive or a value in those boxes.
- Birth → Admission: **Transport** box removed.
- Referring hospital course → Infection: antibiotics are now rows like Today (drug with suggestions, start date & time, Day count, dose, unit, per, interval, route, dose to give). **+ Antibiotic** adds another row. Carry to Today copies each antibiotic with its dose. Antibiotics typed as text in v82–v83 are turned into rows automatically.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v84), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 63 (sw v86)
- Referring hospital course → Cardiovascular: inotropes now look like Today. Each of Drug 1–3 has started date & time, dose, then a panel with Change / DC time (dd/mm + time), New dose, **Change** and **DC**. Changes and DC are written in "Drug n – changes / DC".
- Inotropes still running at transfer get a **Carry to Today** button. It puts the drug in the first free Today inotrope row with its current dose and the start time from the other hospital (Day count correct). The changes at the other hospital are copied into the Today changes box, and History shows the start and each dose change at their real times.
- Doses typed as "Highest dose" in v83–v85 are kept as the dose.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v86), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 64 (sw v87)
- Referring hospital course → **Abdomen & renal**, after Cardiovascular, using the same choices as Today: abdomen, NEC (modified Bell), vomiting, gastric aspirate amount and colour, stool / meconium, urine output, creatinine, urea, Na, K, AXR, abdominal / renal US, surgery / procedure there (with time), and an **Other events** box.
- Cardiovascular: the details box is now **Other events** (hypotension, arrhythmia, echo, arrest / CPR…).
- New **Other events** box at the end of the card for anything else (e.g. events during transport).
- Abdomen & renal shows as "Before transfer" in Today → Abdomen and History → Abdomen, and as its own line in the handover. Other events appear in the handover under "Other".

### Files in this version
`index.html`, `sw.js` (nicu-duty-v87), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 65 (sw v88)
- Referring hospital course → Cardiovascular: **Fluid bolus** box removed.
- Abdomen & renal now has only: Abdomen · Gastric aspirate (No / Yes; Yes opens Amount and Colour) · Stool / meconium · Urine output · X-ray · Ultrasound · Other events. NEC, vomiting, creatinine, urea, Na, K and surgery boxes are removed.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v88), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 66 (sw v89)
- Referring hospital → Respiratory: label is now **Respiratory support on admission**.
- Labs: CBC and coagulation results are **no longer coloured red** (other tests unchanged). New **Hct (%)** row under Hb.
- Fluids: **Dextrose % and GIR fill each other automatically**. Type dextrose % and the GIR is worked out; type GIR and the dextrose % is worked out. If IV fluids or lipid change, the one typed last is kept and the other is recalculated.
- Today → Abdomen & renal: Abdomen, girth · **Gastric aspirate (No / Yes)**, where Yes opens amount and colour · vomiting, stool · urine output and fluid balance. **+ Losses**, **+ NEC staging** and **+ X-ray** buttons open those boxes only when needed. Losses opens both rows with their amounts.
- Inotropes (Today and referring hospital) and anticonvulsants: only Drug 1 shows. **+ Drug 2** appears once Drug 1 is filled, then **+ Drug 3**.
- Sarnat / Thompson tables: choices centred and bold.
- Drug list: **Melatonin** (HIE adjuvant) and **Aminophylline** added.
- **Changes · 24 h** boxes are closed until you tap them, show the count, and say "new – tap to check the time" after a change. Newest change is at the top.
- Neuro: **Reason cooling stopped early** box (with suggestions) appears when cooling is "Stopped early" or lasted under 72 h. It is shown in the handover and work plan.
- Antibiotics and other medications: **Change dose** button opens date & time + new dose. The change is written under the drug. Antibiotic changes go to History → Infection; other medicines go to a new **History → Medications** log, which also records stops, and to Today → Meds Changes · 24 h.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v89), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 67 (sw v90)
- Neuro: anticonvulsants are hidden until you press **+ Anticonvulsants**, the same as + Inotropes. Babies who already have an anticonvulsant entered still see it. Then **+ Drug 2** and **+ Drug 3** add more rows.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v90), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 68 (sw v91) – one sheet per day
- Each date now keeps its own sheet. Choosing a past date in the top bar (e.g. 28/10) shows the **Today** tab exactly as it was on that date. This covers Diagnosis & problems, weight, respiratory, CVS, fluids, abdomen, neuro, infection, jaundice, ROP and the shift plan, plus severity, if / then, parents and handover notes. The work plan and handover for that date are built from that sheet.
- You can change the sheet while viewing a past date. Changes are saved **to that date only**: later days are not changed. Logs record them with that date.
- If nothing was entered on a date, the sheet from the last earlier date is shown, and the banner says so.
- At midnight, or when the app is opened on a new day, the new day starts as a copy of the last sheet, the same as copying the paper sheet forward.
- Shared by all dates (not per day): Background (patient, antenatal, birth, referral), and items that carry their own date – blood gases, labs, BP readings, antibiotics and medicines, lines, cultures, imaging, transfusions, echo, scores – and the History logs.
- Sheets are kept for the last **30 days** per baby. Daily sheets start from this update, so days before it have no saved sheet.
- Future dates cannot be opened.
- Changes on different dates are never joined into one log line.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v91), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 69 (sw v92) – Discharge & save file
- Handover → **Discharge & save file** asks for the discharge date and outcome (Home, Transferred, Paediatric ward, Died, Other).
- It then saves the baby's **complete file** as one locked file (sync password): every daily sheet, all logs, results and background. You choose where it goes (Files / iCloud / AirDrop / email to yourself). The file is named e.g. `NICU-discharged-Baby-of-Mona-Ali-2026-10-31-locked.json`.
- After saving, the app asks before removing the baby from the device to free space. The removal also reaches your other device at the next sync.
- To see the baby again, tap **⇩ Receive** and pick the file (same sync password). The baby comes back with all daily sheets and can be discharged again.
- The handover shows "Discharged: date – outcome".
- Keep the files somewhere safe and follow your hospital's rules for storing patient data.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v92), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 70 (sw v93) – choose where to save
- Discharge & save file now lets you choose the place:
  - **Computer (Chrome / Edge):** a Save window opens. Pick the folder and file name.
  - **iPhone / iPad / Android:** the share sheet opens. Choose **Save to Files** and pick the folder (iCloud Drive, On My iPhone, a USB drive…), or AirDrop / email it to yourself.
  - If the phone blocks the share sheet after locking, a **Choose where to save** button appears to tap.
  - Mac Safari has no Save window, so the file goes to Downloads. Safari → Settings → General → "File download location: Ask for each download" makes it ask.
- Nothing is removed from the app unless the file was saved.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v93), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 71 (sw v94)
- Opening a date that has **no saved sheet** (e.g. a day before you started using daily sheets) no longer shows an empty page. It opens with the sheet of the nearest later date as a starting point (diagnosis, weight, support…). The banner says "no sheet was saved for this date … check and correct it".
- Anything you correct is saved to that date only. Later dates are not changed.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v94), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 72 (sw v95) – discharge window: save, share or print
After entering the discharge date and outcome, one window offers:
- **Save to a folder**
  - Chrome / Edge: a Save window opens to pick the folder.
  - Safari: the file goes to Downloads. To pick the folder every time: Safari → Settings → General → File download location → **Ask for each download**.
  - iPhone / iPad: use Share → **Save to Files** to pick the folder.
- **Share / AirDrop** (Mail, Messages; on iPhone / iPad also Save to Files).
- **Print / PDF** prints the baby's sheet. The window comes back afterwards.
- **Remove from this device** is only enabled after the file was saved or shared. **Keep baby in the app** closes the window without removing.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v95), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 73 (sw v96)
- Referring hospital course: **Investigations there** box removed. The part is now "Drugs given". Text written there before still shows, marked "earlier text".
- Referring hospital → Fluids & feeds now calculates like Today:
  - New **GIR** box, filled from dextrose %, and dextrose % is filled when you type GIR.
  - Total intake = IV fluids + feeds (fill any two).
  - A **Calculated** box shows IV rate (from birth weight), GIR from IVF, glucose from feeds, total glucose, and calories from IVF, from feeds and in total.
- Anticonvulsants:
  - Referring hospital: choosing a drug opens **loading dose, maintenance dose and interval**.
  - Today and referring hospital: a **Usual doses** box shows the usual neonatal loading and maintenance doses and interval for that drug (phenobarbitone, levetiracetam, phenytoin, fosphenytoin, midazolam, lidocaine, topiramate, pyridoxine). It also shows the loading dose in mg for the baby's weight. These are reminders only – the unit protocol and pharmacist decide.
- SBAR: "Changes – last 24 h" removed from Situation. Changes are still in each Today section and in History.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v96), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 74 (sw v97) – HIE: unit protocol and modified Sarnat form
- **Modified Sarnat – hourly exam** replaces the old Sarnat staging table. It matches the unit / Queensland form:
  - 8 rows (consciousness, spontaneous activity, posture, tone, suck, Moro, autonomic, seizures), each N / Mild / Mod / S / N/A with the form's wording.
  - Each column is one exam, with its actual date & time and the hour of life worked out from birth time.
  - Under each exam: **moderate / severe domains (of 6)** – suck and Moro count as one domain, primitive reflexes, scored by the worse of the two – and the **severity** (normal / mild / moderate / severe, + seizures).
  - Old Sarnat entries are converted automatically.
- **Cooling eligibility check – unit protocol:**
  - Eligibility: GA ≥ 36 wk; 35 wk → discuss with consultant; < 35 not eligible. BW < 1800 g → exclusion. BW below the 3rd centile → discuss with consultant. Age 6–24 h → discuss with consultant; > 24 h not eligible. Shows when the 6 h window ends.
  - Criteria A: pH ≤ 7.0 or base deficit ≥ 16. Or pH 7.01–7.15 / base deficit 10–15.9 on cord gas or a gas within 1 h, **plus any one** of: sentinel event, Apgar ≤ 5 at 10 min, ongoing resuscitation at 10 min. No gas → "gas needed".
  - Criteria B: taken from the **worst modified Sarnat exam in the first 6 h** (≥ 3 of 6 domains moderate / severe), or seizures (clinical, Neuro "confirmed", on the Sarnat exam, or on aEEG / EEG). A milder exam before 6 h shows "repeat hourly – exam can evolve". Mild only → "consult a neonatologist".
  - Absolute exclusions: severe anomaly / genetic syndrome / known metabolic disorder, severe uncontrolled bleeding (DIC).
  - aEEG / CFM (supportive, AAP 2026): upper and lower margin (µV) and continuous seizures → normal / moderately abnormal / suppressed / seizures. Not required to decide on cooling and must not delay it. An abnormal aEEG without criteria B → "repeat the Sarnat exam now".
  - **High-risk reminder** (unit 5.1.5) when the cord / first pH is < 7.1 and the baby does not meet criteria B: hourly Sarnat until 6 h (next due time), aEEG ≥ 6 h, start cooling at once if it worsens before the 6 h time. It also shows in the handover.
- The separate 6 neuro dropdowns in the check are no longer used; they show only for babies who already have them filled.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v97), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-referral-demo.html`.

## Update 75 (sw v98) – two cooling checks, Thompson revised, clearer design
- **Cooling eligibility – unit protocol & AAP 2026**: you enter the information once, in 5 numbered groups (time, perinatal asphyxia, encephalopathy, exclusions, aEEG). Two result cards side by side follow:
  - **Unit protocol** – as in Update 74. Criteria A needs any one of sentinel event / Apgar ≤ 5 / resuscitation at 10 min. 35 wk, weight < 3rd centile and 6–24 h → discuss with consultant. Includes the high-risk pH < 7.1 reminder.
  - **AAP 2026** – NICHD criteria. For pH 7.01–7.15 or no gas: an acute perinatal event **and** (Apgar ≤ 5 at 10 min or ventilation ≥ 10 min). 35 wk: select cases with the family. 6–24 h: small benefit. BW < 1800 g: outside trial criteria, discuss. Mild HIE: not recommended.
  - Each card has a large coloured result (✓ Eligible / Discuss with consultant / ✗ Not eligible / Incomplete – still needed) and a ✓ / ✗ / ? row for each criterion with the reasons.
  - The handover and work plan show both results.
- **Thompson score – serial exam** (as in the Thompson score document):
  - Wording: tone, consciousness, seizures, posture, Moro, grasp, suck, respiration, fontanelle.
  - Each exam has its date & time and hour of life.
  - Under each exam: **total / 22** and **severity band** (0 no abnormality · 1–10 mild · 11–14 moderate · 15–22 severe). Moderate and severe show in red.
  - New "Thompson score – criteria & bands" reference. It reminds you the score alone does not decide cooling.
  - Old Thompson entries keep their points.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v98), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 76 (sw v99)
- Modified Sarnat table: the rows now show the **6 domains** used for "≥ 3 of 6": 1 consciousness · 2 spontaneous activity · 3 posture · 4 tone · 5 primitive reflexes (suck and Moro, counted once using the worse) · 6 autonomic. **Seizures** are labelled "not one of the 6 (alone = criterion B)". The count row explains the rule.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v99), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 77 (sw v100)
- Modified Sarnat **overall stage** now follows the references: the level that most of the 6 domains fall in. A tie is decided by level of consciousness; if consciousness is not one of the tied levels, the more severe level is used.
- The cooling criterion is unchanged: ≥ 3 of 6 domains moderate / severe, or seizures. Within a domain the more severe sign is used (suck vs Moro).
- Sources (also shown in the app's Sarnat reference): NICHD NRN neurological exam (Shankaran, NEJM 2005); COMET Expanded Modified Sarnat SOP v3.3 (Imperial College, 2026); UC Davis HIE guideline (2026).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v100), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 78 (sw v101)
- **Seizures removed from the modified Sarnat table.** They are not part of the Sarnat exam. Record them in the eligibility check (clinical seizures, or on aEEG); seizures alone meet criterion B. Seizures already entered in old Sarnat exams are moved to "Clinical seizures".
- Under each Sarnat exam:
  - **Domains at each level** (N · Mild · Mod · S, of 6)
  - **Moderate + severe domains – cooling count** ("– meets" when ≥ 3)
  - **Stage of encephalopathy** (the level most domains fall in; a tie shows "tie → consciousness")
- New **How to read the exam** box under the table explains grading, stage and the cooling count.
- Cooling eligibility header: capital letters, white on a teal bar. Group and card titles are also in capitals.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v101), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 79 (sw v102)
- Cooling check: the aEEG title keeps the lowercase "a" (**aEEG / CFM**) while the other titles stay in capitals.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v102), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 80 (sw v103)
- Cooling check: the "discuss" lines are now short – e.g. "GA 35+2 wk – discuss with consultant", "BW below the 3rd centile – discuss with consultant", "6–24 h of age – discuss with consultant". The result box says "Discuss with consultant – Meets A + B". The background details stay only in the reference note at the bottom.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v103), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 81 (sw v105)
- HIE explanations now open only when you tap them, laid out as short headed lists:
  - **Criteria summary – unit protocol & AAP 2026** (bottom of the cooling check): two side-by-side cards with eligibility, criteria A, criteria B, exclusions and notes.
  - **How to read the Sarnat exam – stage & cooling count** (under the Sarnat table).
  - **Modified Sarnat – criteria** and **Thompson score – criteria & bands**: the notes are now bullet points with the sources underneath.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v105), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 82 (sw v106)
- Cooling check → Perinatal asphyxia: the "gases & Apgar come from…" note is removed. A box now shows the values taken **automatically**: worst pH and BE within 1 h (with their source, e.g. cord 1) and Apgar 10 min from Birth. The manual pH / BE boxes appear only when no gas is found, or if they were already filled.
- Sarnat and Thompson exam columns: the × sits in the top corner and the date, time and AM/PM fit inside the column on computer, iPad and phone – no overlap. (Also fixed a broken style rule that made these columns too narrow.)

### Files in this version
`index.html`, `sw.js` (nicu-duty-v106), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 83 (sw v107) – smaller top part
- The "NICU Duty Sheet / PER-BABY FOLLOW-UP" title is removed. The top bar holds only floor, date, Send and Receive. The browser tab and home-screen name are still "NICU Duty Sheet".
- The "No backup yet / Last backup … days ago" bar is gone. When a backup is due, an **amber dot** shows on **⇪ Send**; holding the pointer on it (computer) shows how long ago the last backup was. Saving-error alerts still show as a bar.
- Baby file header: **location and name in one two-part label** – location in the station colour on the left, name on the right – on the same line as the severity.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v107), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 84 (sw v108)
- Top bar: **WCH | NICU** label in the top-left space.
- Footer: the "Saved on this device only… unit's policy…" sentences are removed. One short line remains: calculations are aids, double-check before acting.
- **Today → Cardiovascular redesigned** in four numbered parts:
  1. **Blood pressure** – BP readings with normal ranges and the BP reference tables.
  2. **PDA** – "+ PDA" opens status, size and course (conservative / medical / surgical, intervention date & details).
  3. **Medications** – inotropes ("+ Inotropes", then "+ Inotrope 2 / 3"); **PDA treatment** (drug, dose, interval, start date, course day); and a new list, **Other cardiovascular medications** (e.g. hydrocortisone, PGE1, sildenafil, antihypertensives), with dose, unit, interval, route, Day count, **Change dose** and **Stop**.
  4. **Echo** – "+ Echo" for a short summary; the latest TnECHO from the Diagnostics tab shows underneath.
  - Then CVS notes and Changes · 24 h.
  - Other cardiovascular medications also show in Meds (from other sections), the handover and the work plan. Stops and dose changes go to History → Medications.
  - Text written in the old "Other drugs" box still shows, marked "earlier text".
- **Referring hospital → Cardiovascular**: new boxes for **Blood pressure**, **PDA**, **Echo** and **Other cardiovascular medications** (with suggestions), plus the inotropes and other events. They show in "Before transfer" (Today, History) and the handover.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v108), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 85 (sw v109) – every system in clear parts
- Part titles are bigger (16 px), bold and in each system's colour, with a thicker bar. Box labels are bigger and bold. This applies everywhere in the app.
- Cardiovascular: the numbers are removed – Blood pressure · PDA · Medications · Echo.
- Today, every system is split into named parts:
  - **Weight & growth:** Measurements · Growth
  - **Respiratory:** Respiratory support (mode, settings, FiO₂, changes) · iNO (when used) · Chest X-ray · Surfactant · Caffeine · Blood gases · Lung ultrasound · notes
  - **Fluids & nutrition:** Intake · Feeds · Totals · Blood glucose & plan
  - **Abdomen & renal:** Examination · Urine output & fluid balance (+ Losses) · NEC & X-ray (+ NEC staging, + X-ray) · notes
  - **Neuro:** Cranial ultrasound · Anticonvulsants (+ Anticonvulsants) · Seizures & neurological examination · HIE & cooling · Neuromonitoring & MRI · notes, then the cooling check, Sarnat and Thompson
  - **Infection:** Sepsis · Antibiotics (now above the cultures) · Cultures & swabs · Notes
  - **Jaundice:** Bilirubin · Phototherapy & thresholds · BIND-M (when used)
  - **ROP:** Screening · Result & follow-up
- Lines & tubes, Medications and Plan are single lists and stay as they are.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v109), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-HIE-demo.html`.

## Update 86 (sw v110)
- Cooling check: once cooling has started, the result reads "MET criteria – cooling started <date / time>" instead of "start cooling before…" (cards, handover and work plan).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v110), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`, `NICU-HIE-demo.html`.

## Update 87 (sw v111)
- Removed the explanation sentences under Blood pressure readings and under the medicine lists (antibiotics, other medications, cardiovascular medications).
- **Blood glucose** (Fluids → Blood glucose & plan) is now a list of readings. **+ Blood glucose** adds a row with date & time, value (mmol/L) and action taken. Each reading is marked **Low (< 2.6)**, **High (> 10)** or **In range**. The latest reading, with its time and action, goes to the handover and work plan. A value in the old single box still shows, marked "earlier entry".
- Abdomen: **abdomen, girth, vomiting and stool** on the first line; gastric aspirate (amount, colour) on the second.
- Anticonvulsants: the "usual doses" boxes are removed (Today and referring hospital).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v111), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 88 (sw v112)
- **Diagnosis first line (automatic)**, in capitals, by gestational age at birth (WHO preterm groups, ACOG/SMFM term groups): EXTREMELY / VERY / MODERATE / LATE PRETERM, EARLY / FULL / LATE TERM or POST-TERM INFANT, then GA and birth weight. "– MICROPREEMIE" is added when GA < 26+0 or BW < 800 g. It shows above Diagnosis (Patient and Today) and is the first Dx line in the handover and work plan.
- **Diagnosis & current problems carry forward:** a later date with no entry shows the last earlier diagnosis / problems. If you change them on a past date, later dates that still had the old text (or nothing) are updated; dates you changed separately keep their own text.
- **Antenatal steroids:** Given / None / Unknown. Each course has **first-dose date**, **regimen** (Dexamethasone 6 mg IM q12h × 4 · Dexamethasone 12 mg IM q24h × 2 · Betamethasone 12 mg IM q24h × 2 · Other), **doses received** and **last dose**. The status is worked out: **complete** or **incomplete (n of N doses)**, plus the time from last dose to birth (< 24 h, > 7 days). **+ Repeat course** adds a second (rescue) course. Old answers are converted.
- **MgSO₄:** No · Loading dose only · Loading + maintenance (complete) · Started – still running at birth · Unknown, with start time.
- **Antenatal US** shows as bullet points.
- The footer line about calculations is removed.
- **Surfactant dose times** now have a calendar.
- **Feed frequency:** every 1 / 2 / 3 / 4 h or **Continuous (milk drip)** (Today and referring hospital).
- **Neuro exam:** **Reflexes** (appropriate for GA / diminished / absent / exaggerated / asymmetrical) + comment, and **Clonus** (no sustained clonus / unsustained / sustained / asymmetrical) + number of beats + comment, each on its own line.
- **TOP transfusion box:** Hb can be entered in g/dL (e.g. 10.7) or g/L (107); it is compared correctly. Three boxes: threshold (g/L and g/dL), latest Hb, and **PRBC transfusion: Indicated – 15 ml/kg / Not indicated**. Only the week of life / support line remains under them. The box is hidden for term babies.
- **Work plan weight:** centile only (e.g. "32nd centile"), without the chart name.
- **Drug suggestions:** Benzylpenicillin (Penicillin G), Procaine penicillin, Benzathine penicillin.
- **New Background section – Examination & anomalies:** dysmorphic features (none / minor / suspected / known syndrome + description), cleft lip / palate (type + details), other congenital anomalies (bullets), genetics / plan, notes. It shows as "Anomalies" in the handover and work plan.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v112), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 89 (sw v113) – Newborn examination
Background → **Newborn examination** (replaces "Examination & anomalies"; data already entered is kept):
- **Examination:** examined at / by, then one line per area – skin, head, eyes (+ red reflex), ears, mouth & palate (+ cleft type), neck & clavicles, chest, heart & pulses, abdomen (+ cord vessels), genitalia (+ testes for boys), anus, spine (+ sacral dimple), limbs & digits, hips (+ hip risk factor), tone & reflexes, dysmorphic features. Each is Normal / Abnormal / Not examined; Abnormal opens a findings box.
- **✓ All normal** fills every area not yet answered with Normal (red reflex present, 3 cord vessels, testes descended, no dimple, no dysmorphism). Then change only the abnormal ones.
- **Follow-up from the examination** – tasks appear automatically, each with To do / Booked / Done / Not needed:
  - cleft → feeding plan, plastic / ENT, hearing
  - abnormal red reflex → urgent ophthalmology
  - heart / pulses → echo, cardiology
  - single umbilical artery → renal US
  - undescended testis → re-examine, surgical referral if persistent
  - genital finding → senior review / urology
  - anal anomaly → surgical review
  - high-risk dimple or spine finding → spinal US
  - abnormal hips → hip US + orthopaedics
  - hip risk factor → hip US at about 6 weeks
  - suspected / known syndrome → genetics
- **Syndrome work-up** (when a syndrome is suspected or known): karyotype / microarray, echo, renal US, cranial US, eye exam, hearing, genetics review – Planned / Sent / Done – normal / Done – abnormal (+ result) / Not needed; genetics notes.
- **Discharge examination:** examined at / by, red reflex, hips, heart & femoral pulses, testes, plus a summary of hearing, CCHD and newborn screening.
- Handover: abnormal findings under **Examination**. Open follow-up tasks and work-up items appear under **Pending**. The work plan shows "Exam / anomalies" and "Follow-up".
- **⚠ Anomaly** flag in the baby header and on the bed card for congenital anomalies only (dysmorphism, cleft, abnormal eyes / ears / mouth / neck / genitalia / anus / spine / limbs / hips, abnormal red reflex, single umbilical artery, undescended testis, high-risk dimple, other anomalies). Findings like caput or low tone are not flagged.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v113), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 90 (sw v114) – simpler newborn examination
- Each part is Normal / Abnormal / Not examined only. **Abnormal opens a Findings box written as bullet points** (one finding per line). The examples are shown inside the box.
- **Umbilical cord** is its own part, separate from Abdomen.
- Removed the extra boxes: red reflex, testes, cord vessels, sacral dimple and hip risk factor (write these in the findings of eyes, genitalia, cord, spine or hips).
- Removed the **Follow-up from the examination** and **Discharge examination** parts.
- Kept: All normal, dysmorphic features (findings as bullets), other anomalies, syndrome work-up, notes, and the ⚠ Anomaly flag.
- Answers in the removed boxes are moved into the matching findings (e.g. "single umbilical artery" → Umbilical cord, "undescended testis" → Genitalia).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v114), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 91 (sw v115) – compact top area
- **One row:** WCH NICU · baby cards · floor, date, Send, Receive. The top bar went from about 205 px to about 80 px on a computer.
- **Slimmer baby cards:** location and bed on one line, name under it. The ⚠ anomaly mark no longer covers the bed number. Cards scroll sideways when there are many babies.
- **Phone:** Send / Receive show as icons (⇪ ⇩), the WCH NICU label is hidden to save space, and the baby cards are on the second row. The top bar is about 120 px instead of about 170 px.
- **The top bar tucks away while you scroll down** and comes back as soon as you scroll up a little. The tabs and system buttons stay pinned at the top.
- **System buttons** (Dx, Weight, Resp…) are on one line without numbers and scroll sideways on a phone. The tabs are slightly shorter.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v115), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 92 (sw v116)
- System buttons (Dx, Weight, Resp, CVS…) are in colour again while staying small: each has its system's colour as a dot, coloured text, a light tint and a coloured border. This matches the colour of the section it opens, in light and dark mode. A section with changes today has a stronger coloured border.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v116), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 93 (sw v117)
- The automatic classification line is now **the first bullet inside the Diagnosis box**, not a separate box above it, e.g. "VERY PRETERM INFANT, GA 30+3 WEEKS". Birth weight is no longer written in it; "– MICROPREEMIE" is still added when GA < 26+0 or BW < 800 g.
- The line updates itself when GA or birth weight changes. If it is deleted, it comes back. It appears once in the handover and work plan (as part of the diagnosis).

### Files in this version
`index.html`, `sw.js` (nicu-duty-v117), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 94 (sw v118)
- Classification line shortened to e.g. **"VERY PRETERM GA 30+3 WEEKS"** (no "INFANT", no comma; "– MICROPREEMIE" when it applies). Lines in the old format are replaced automatically.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v118), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 95 (sw v119)
- Classification line format: **"EXTREMELY PRETERM (GA 25+4 WEEKS) – MICROPREEMIE"** – GA in brackets. Older formats are replaced automatically.

### Files in this version
`index.html`, `sw.js` (nicu-duty-v119), `manifest.webmanifest`, `README-v2.md`. Test only: `NICU-3-cases-demo.html`.

## Update 96 (sw v120)
- Blood glucose: the date & time box opens the calendar.
- Weight change: previous weight is taken from the earlier daily sheets (e.g. 02/11 → 03/11), with g/day and % from birth weight.
- Chest X-ray box: bullet points.
- "Plan for this shift" renamed **Plan**; the time box for tasks is removed (Today, work plan, handover).
- SBAR view: every item is a bullet point; items with several parts are listed as sub-bullets.
- Bed buttons: the small ⚠ anomaly mark is removed (it looked like a question mark); the ANOMALY label in the baby header stays.
- Print / PDF: new **Patient data** box at the top (baby details, measurements at birth and now with centile beside each, weight change, diagnosis). No growth-chart names anywhere. Each entry prints as its own bullet line under clear section headings; repeated patient boxes and empty boxes are not printed.

### Files in this version
index.html · sw.js (nicu-duty-v120) · manifest.webmanifest · README-v2.md

## Update 97 (sw v121)
- Helper sentences removed from the screens (e.g. "same boxes as Today → …", "sets every part not yet filled to Normal …", "same list as …", gas and BP explanations).
- Weight change: every weight is kept with its date, so the box shows **↑/↓ grams from the previous weight** (date), g/day, and % from birth weight.
- All date & time boxes (blood pressure, blood glucose, change times and others) open the calendar. Safari was closing the calendar in boxes inside a label; fixed.
- Plan: the task box spans the whole line.
- Status: If / then, Parents updated and Other handover notes show as bullet points.
- New **PDF** button (next to Print): makes a real PDF file of the baby's sheet (Patient data first, bullet lines by section), then Share / Save. Works in the installed iPhone app, where Print does not open. The "Print did not open" window also offers **Save PDF**.

### Files in this version
index.html · sw.js (nicu-duty-v121) · manifest.webmanifest · README-v2.md

## Update 98 (sw v122)
- Weight change: only "Decreased / Increased … g from previous weight"; the box spans the whole line.
- Blood glucose: the Low / High / In range label sits level with the glucose value.

### Files in this version
index.html · sw.js (nicu-duty-v122) · manifest.webmanifest · README-v2.md

## Update 99 (sw v123)
- "Bed" renamed **Room** (top buttons, header, Room box, print).
- Date boxes show **dd/mm** (no year) and open the calendar when tapped – blood gas columns, BP, blood glucose and all date & time boxes.
- Labs: red highlighting removed (no unit-approved neonatal reference ranges). Bilirubin keeps its jaundice-chart flag; the TOP transfusion thresholds stay.
- Weight change: compares with the weight entered on an earlier day ("Decreased / Increased … g from previous weight"); shows "No previous weight" when there is none.
- Layout: boxes stretch to fill each line (no empty space at the right edge); blood gas / lab tables use the full width.
- Blood glucose: Action / comment in its own framed box under each reading.
- PDF: on a computer (Chrome / Edge) a "Save as" window opens to choose the folder; on iPhone / iPad the share sheet opens (Save to Files → choose folder); Safari on Mac saves to Downloads.

### Files in this version
index.html · sw.js (nicu-duty-v123) · manifest.webmanifest · README-v2.md

## Update 100 (sw v124)
- Lab / gas tables: the test-name column is only as wide as its text; the value columns share the rest of the line.
- Blood glucose: Low / High / In range now shows inside the glucose box.
- Lines & tubes: new type **Peripheral arterial line (PAL)**.

### Files in this version
index.html · sw.js (nicu-duty-v124) · manifest.webmanifest · README-v2.md

## Update 101 (sw v125)
- "Print did not open" window shortened for iPad and computer: Save PDF → choose the folder.

### Files in this version
index.html · sw.js (nicu-duty-v125) · manifest.webmanifest · README-v2.md

## Update 102 (sw v126)
- Handover: for babies well above birth weight (chronic cases) the weight line shows the birth weight instead of a large "% above BW".

### Files in this version
index.html · sw.js (nicu-duty-v126) · manifest.webmanifest · README-v2.md

## Update 103 (sw v127)
- Print / PDF inside a preview window (a file opened inside another app, where printing and saving are blocked): a window now shows the print layout with **Download PDF** and **Open in new tab**, plus a note to open the file in Safari / Chrome.

### Files in this version
index.html · sw.js (nicu-duty-v127) · manifest.webmanifest · README-v2.md

## Update 104 (sw v128)
- **Daily sheets:** anything entered on an earlier date (caffeine, surfactant, inotropes, all Today boxes) now carries forward to the later days that had not changed it.
- **Obstetric & labour:** new "Maternal history (previous admissions, other relevant data)" box (bullets); Pregnancy and Para on one line; antenatal steroids on one line – Given/None/Unknown · Regimen · Doses given · Date & time · Course status (repeat course the same line); first-dose date box removed.
- MgSO₄ started: date only.
- Maternal investigations: HVS (GBS) · Antibiotic · Antibiotic date (no time, no number of doses); HVS other organisms moved to Extra investigations; Urine culture – date + result (organism suggestions incl. Candida growth).
- Extra investigations: choose the investigation → Date (no time) + Result with organism suggestions.
- Delayed cord clamping: "No" → "Not done".
- Size at birth: SGA (< 10th centile), AGA (10th–90th centile), LGA (> 90th centile).
- Bullet points in: Others (antenatal), Fluid & feed plan, Respiratory / CVS / Abdomen / Neuro / Infection notes, Culture notes, Bedside cranial US, Echo findings, X-ray, Growth and Examination notes.
- Weight: change from the previous weight; from birth weight only when no weight was entered before.
- Work plan: Age = GA · PND · CGA.
- Last labs (work plan, handover): grouped – CBC & infection, Coagulation, RFT & electrolytes, LFT & bone, Cardiac, Special.
- PDF: a PDF window opens with Save PDF (iPad: Save to Files → choose folder; Chrome/Edge: choose folder; Safari Mac: Downloads) and Open PDF.

### Files in this version
index.html · sw.js (nicu-duty-v128) · manifest.webmanifest · README-v2.md

## Update 105 (sw v129)
- Inotropes: one line per drug – Inotrope · Started · Dose | Change time · New dose · Change · DC. The "Inotrope … – changes / DC" text box is removed.
- Today sections (Respiratory, CVS, Fluids, Abdomen, Neuro, Infection, Lines, Meds, Jaundice, ROP): the "Changes · 24 h" boxes are removed – every change is recorded in the History tab only.

### Files in this version
index.html · sw.js (nicu-duty-v129) · manifest.webmanifest · README-v2.md

## Update 106 (sw v130)
- Respiratory support, IV fluids and Feeds: each on one framed line with a **Change time** box at the end (blank = now). Type the new values in the same boxes; the changes go to History at that time.

### Files in this version
index.html · sw.js (nicu-duty-v130) · manifest.webmanifest · README-v2.md

## Update 107 (sw v131)
- Respiratory support, IV fluids and Feeds: the current values stay on top; under them a **Change** box – Time (now, can be changed) · New mode / new values (grey = current value) · **Change** button. Feeds has an **NPO** button. Changes are saved and recorded in History at the chosen time.
- The "Change time" box from v130 is replaced by this Change box.

### Files in this version
index.html · sw.js (nicu-duty-v131) · manifest.webmanifest · README-v2.md

## Update 108 (sw v132)
- Medications (Other cardiovascular medications, Current medications, Antibiotics): each drug has its current details on top and a **Change / DC** box under them – Time · Dose · Interval · Route · **Change** · **DC** (press DC twice). Changes and stops go to History at the chosen time; DC moves the drug to Previous medications. The old "Change dose" and "Stop" buttons are replaced.

### Files in this version
index.html · sw.js (nicu-duty-v132) · manifest.webmanifest · README-v2.md

## Update 109 (sw v133) – professional EMR design
Visual layer only (`<style id="ds2">`, screen only). No field, label, section, calculation, storage, export, print or saving logic changed; all ids kept.
- Calm clinical palette: white panels on a light grey-blue background, one teal accent; section colours kept only as a thin marker and the section number.
- Section headers: white, clear title, number badge, left accent; part headings with a small marker.
- Patient summary: neutral tiles (label + large value), selected tab filled in teal, neutral section shortcut chips with coloured dot.
- Fields: consistent height and radius, clear hover and focus ring, invalid fields outlined red, text left-aligned like an EMR (date/time and table cells unchanged), larger readable labels.
- Buttons, add buttons, tables, change boxes, SBAR and work plan cards: same radius, border and soft shadow.
- Respects "reduce motion"; dark mode kept.
- Print: unchanged A4 layout; the new Change boxes are not printed.

### Files in this version
index.html · sw.js (nicu-duty-v133) · manifest.webmanifest · README-v2.md

## Update 110 (sw v134)
- Values in boxes are centred again (as before the redesign).
- Larger text across the form: values 18 px, labels 16 px, part headings 15.5 px, section titles 20 px, summary values 22 px, box height 48 px. The top bar keeps its compact size.

### Files in this version
index.html · sw.js (nicu-duty-v134) · manifest.webmanifest · README-v2.md

## Update 111 (sw v135)
- Caffeine removed from Respiratory. It is now a medication (Today → Medications → + Other medication → "Caffeine citrate").
- Caffeine already entered in Respiratory moves automatically to Medications (dose, unit, interval, route, start date kept) and the old boxes are cleared.
- Medications with a loading dose (caffeine, phenobarbital, aminophylline / theophylline, levetiracetam, phenytoin, fluconazole, digoxin) show two lines: **Loading** – loading dose (mg/kg), given date & time, loading to give (mg at current weight) – and **Maintenance** – dose, unit, per, interval, route, dose to give. Handover / print: "loading 20 mg/kg, maintenance 5 mg/kg/day q24h".

### Files in this version
index.html · sw.js (nicu-duty-v135) · manifest.webmanifest · README-v2.md

## Update 112 (sw v136)
- Colour pattern back, softly: each section has its colour on a thin top line, a light tint in the header, the title and a filled number badge; section shortcut buttons are lightly tinted in their colour; summary tiles have their colour on top with a light tint (values centred). Everything else from v133–v135 kept (calm background, centred larger text, Change boxes).

### Files in this version
index.html · sw.js (nicu-duty-v136) · manifest.webmanifest · README-v2.md
