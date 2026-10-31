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
