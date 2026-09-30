# UI-001 — raport recuperare tester

## Status explicit
Testele sunt scrise pe disc, **nerulate**. Inspecția statică este terminată pentru livrarea restrânsă App/main, fără CSS. Nu declar teste trecute, build funcțional, UI validat sau UI-001 finalizat. Raportul coder a fost disponibil și citit; nu există blocaj de predare.

## Fișiere modificate
Create (nu existau teste la inspecție):
- `prototype/tests/metrics.test.js` — 8 cazuri node:test.
- `prototype/tests/demo-data.test.js` — 7 cazuri node:test.
- `docs/handoff/UI-001-recovery-tester-raport.md` — acest raport.

Nicio modificare a producției, configurației, package.json, documentelor de stare sau altor fișiere. Testele folosesc `node:test`, `node:assert/strict` și importuri ESM ale funcțiilor pure. Nu există verificări prin căutare de text JSX prezentate ca dovadă UI.

## Inspecție și acoperire scrisă
Citite AGENTS.md, intent/spec/plan/TASKS, brief-urile recovery coder/tester, raportul coder, ui-build-plan și UI-GATES; inspectate toate modulele src, index.html, package.json și vite.config.js.

### Metrici
- MAE, bias = prognoză − observat și RMSE cu rezultate calculate manual: erori +2/−3/0, MAE 5/3, bias −1/3, RMSE √(13/3).
- Zero este observație validă, inclusiv perechea 0/0.
- null, undefined, NaN, ±Infinity și șiruri numerice excluse pe ambele laturi.
- Suport gol: N=0 și metrici null; dimensiuni/tipuri invalide respinse.
- Suport comun identic pentru comparatori, numitorul acoperirii egal cu toate rândurile, inclusiv rând invalid; exemple cu rezultate independente.
- Chei custom, lipsă de mutare a inputului, chei duplicate/goale și inputuri invalide.
- Acoperire null pentru zero intervale versus 0 pentru intervale fără suport.

### Date demo și timp
- Determinism, egalitate cu DEMO_DAYS și obiecte independente între apeluri.
- 7×24 = 168 ținte UTC unice și contigue, din 06-12-2026 22:00 UTC până în 13-12-2026 21:00 UTC; emiteri anterioare fiecărei ținte și proveniență pe fiecare comparator.
- Date locale exacte 07-12-2026…13-12-2026, ore 00:00…23:00, scenele existente.
- Exact două goluri în seriile plate: official la 09-12-2026 11:00 local și actual la 10-12-2026 04:00 local. Seria official rămâne null, fără imputare din metadate.
- Mix finit, nenegativ, suma componentelor = producție; producție + import net = consum, în MW; zero solar nocturn.
- Europe/Bucharest iarna UTC+2 și vara UTC+3, rollover de dată; saltul din primăvară și ora 03:30 repetată toamna cu etichete de zonă distincte. Testele sunt pentru helper-ele existente, nu pretind generator demo general pentru DST. Nu se fixează spelling-ul ICU EET/GMT+2.
- Evaluarea întregului fixture: total 168, N comun 166, două excluderi, acoperire 166/168. Oracle aritmetic separat, cu eliminarea indicilor cunoscuți ai golurilor și sumarea erorilor pentru fiecare comparator; nu reutilizează calculateMetrics pentru valorile așteptate.

## Defecte și limite observate
1. **Neconcordanță fixture confirmată static, păstrată:** `days[2].rows[11].official` este null, dar `forecasts.official.value` este numeric. Nu există test artificial care solicită corectarea metadata în acest task. App afișează seria plată în comparație și proveniență și o folosește pentru evaluare; avertizarea contextuală și explicația metodologică nu maschează golul.
2. **Prezentare incompletă prin scope:** styles.css nu există și main nu îl importă. Fallback-ul vizual CSS, temele, contrastul, responsive și decorul nu sunt livrate/validate aici. Este limita declarată a etapei, nu o remediere permisă testerului.
3. **App/main:** nu am identificat un defect suplimentar cert la inspecția statică. `#root` corespunde intrării HTML; props ale componentelor corespund API-urilor existente. Aceasta nu dovedește montarea React sau funcționarea interacțiunilor.

## Verificări nerulate / predare către planner și reviewer
Nu au fost executate comenzi, Node/npm, teste, build, browser, instalări, requests sau acces la rețea. Testele necesită execuție de către planner; reviewer trebuie să inspecteze codul și testele. Gate-urile rămân neconfirmate.

Verificări browser separate, după etapa CSS:
- Patru pagini, navigare, selecția comună zi/oră și actualizarea numeralului, comparației, mixului și provenienței.
- RO/EN, atributul lang, etichete și format numeric; DEMO permanent pe toate paginile și delimitări fără claims live.
- Zi cu fiecare scenă; pauză/reluare, reduced-motion, tab ascuns și fallback canvas/CSS.
- Grafic pointer, slider/taste săgeată, tabel alternativ și selecția orei din tabel; lipsa oficială vizibilă în comparație/grafic/tabel și fără completare implicită.
- Proveniență issued_at/target_time/model_version/source, evaluare cu 166/168 și două excluderi; avertismentul contradicției fixture.
- Desktop/mobil, focus/tastatură, contrast, overflow, ordinea decorului și zero erori runtime.

Nicio verificare browser nu este substituită de cele 15 teste pure scrise.
