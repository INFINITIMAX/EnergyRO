# UI-001 — recuperare, tester
Status: pregătit; se execută după predarea coder-ului.

## Context și sarcină
Citește AGENTS.md, docs/ui-build-plan.md, docs/UI-GATES.md, docs/handoff/UI-001-recovery-coder.md și raportul coder-ului. Inspectează prototype/src/App.jsx, main.jsx, metrics.js, demo-data.js, i18n.js și componentele existente. Această livrare este legarea aplicației, fără CSS; nu este finalizarea UI-001.

## Rezultat și limite
Scrie exclusiv prototype/tests/metrics.test.js, prototype/tests/demo-data.test.js și docs/handoff/UI-001-recovery-tester-raport.md. Dacă aceste teste există deja, citește și păstrează testele utile, fără suprascriere oarbă. Folosește node:test și node:assert/strict, importuri ESM ale funcțiilor pure. Nu modifica codul de producție, package.json sau alte fișiere. Fără comenzi, browser, instalări, requests sau delegare; tool-uri doar citire/scriere. Nu raporta teste trecute.

## Acoperire relevantă
Valori așteptate calculate independent: MAE/bias/RMSE, zero valid, null/NaN/Infinity excluse, suport gol, dimensiuni invalide, suport comun și numitor acoperire. Date demo: determinism, 7×24 intervale UTC contigue și emiteri anterioare țintelor, date DD-MM-YYYY, două goluri intenționate, mix însumat și bilanț MW, conversie Bucharest iarnă/vară și ore locale repetate în jurul DST prin helper-ele existente (nu presupune generator DST general). Verifică semantica seriei plate official pentru lipsa intenționată; raportează separat metadata forecasts.official contradictorie fără test artificial care cere remedierea în acest task. Verifică rezultatul evaluării întregului fixture față de numărul real de goluri.
Nu folosi teste bazate doar pe căutarea textului în JSX ca dovadă de UI. Raportul separă testele scrise de interacțiunile care trebuie verificate ulterior în browser: pagini, RO/EN, zi/oră, DEMO, pauză, provenance și lipsă oficială. Orice defect observat în App/main se raportează, nu se repară de tester.

## Predare
Raport cu status explicit, fișiere modificate, cazuri acoperite, verificări nerulate și defecte observate. Dacă raportul coder lipsește sau coder este blocat, scrie blocajul și oprește-te.
