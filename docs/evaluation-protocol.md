# EnergyRO — protocol de evaluare
Status: propunere; rezultate ML inexistente încă
Data: 29-09-2026

## 1. Target și emitere
Target inițial: consumul național raportat de seria RO aleasă după audit. Ora locală fixă de emitere și cutoff-ul se aleg după verificarea publicării datelor; nu presupunem acum că prognoza oficială este disponibilă la același cutoff.
D-1: prognoză emisă în ziua calendaristică locală anterioară zilei țintă, conform politicii de emitere. D-2/D-3 analog. Lead time în ore se calculează separat, inclusiv la DST. Un offset meteo de 24h nu este automat aceeași definiție.
Înregistrăm atât ziua locală, cât și instantele UTC. Comparația live folosește doar emiteri înaintea țintei, fără backfill prezentat drept rezultat live.

## 2. Benchmark
Baseline inițial propus: consumul din aceeași oră locală și aceeași zi a săptămânii precedente, numai dacă observația era disponibilă la cutoff. Alegerea orei duplicate la DST și a intervalelor fără corespondent este explicită: cazurile ambigue sau inexistente rămân lipsă pentru acest baseline; nu se inventează valori.
Baseline secundar posibil: mediana ultimelor patru săptămâni comparabile, cu aceleași restricții de disponibilitate.
Prognoza oficială este benchmark separat. Dacă sursa nu oferă vintage istoric, nu atribuim automat latest forecast unui cutoff din trecut. Arhivarea live este preferabilă.

## 3. Împărțirea datelor
Train cronologic, validation ulterior, test final nefolosit pentru tuning. Rolling-origin cu reantrenare numai pe trecut disponibil la fiecare origine. Duratele efective se aleg după acoperirea surselor.
Scaling, imputare, selectarea features și tuning sunt fit numai pe train; transformările nu citesc viitorul. Se raportează separat evaluarea cu weather reanalysis (experiment retrospectiv) și cea cu prognoze disponibile efectiv la emitere (operațională).
Lipsa istoricului de vintages limitează afirmațiile; nu este ascunsă printr-un split cronologic formal.

## 4. Suport comun și metrici
Pentru fiecare comparație, construim intersecția de intervale cu actual valid și toate prognozele comparate disponibile, la aceeași rezoluție și cutoff compatibil. Raportăm N, perioada, zilele, numitorul intervalelor așteptate și motivele excluderilor.
Scorurile individuale pe suport mai larg pot exista, dar nu se folosesc pentru clasament direct. Dacă suportul comun este gol, rezultatul este indisponibil.
e_i = prediction_i - actual_i; bias pozitiv = supraestimare.
MAE = sum(abs(e_i))/N, în MW; bias = sum(e_i)/N, în MW; RMSE = sqrt(sum(e_i^2)/N), în MW. Aceste formule cer intervale de aceeași durată; pentru durate diferite se utilizează ponderi de durată explicite sau se normalizează înainte de comparație.
Îmbunătățire MAE = 100 × (MAE_baseline - MAE_model)/MAE_baseline pe suport comun. Dacă MAE_baseline=0, procentul este nedefinit; valoare negativă înseamnă regresie.
Nu folosim «accuracy=100-MAPE». WAPE opțional = 100 × sum(abs(e))/sum(abs(actual)); numitor zero → nedefinit, nu zero eroare.
Erorile de energie zilnică se calculează separat și numai pentru zile complete.

## 5. Breakdown și incertitudine
Pe oră locală, weekday/weekend, anotimp și D-1/D-2/D-3, cu N pentru fiecare grup. Nu excludem ore nocturne din evaluarea consumului.
Pentru PV ulterior, prezentăm separat all-hours și daylight cu regulă fixată înainte de test; nu alegem filtrul care produce scorul cel mai bun.
Benzile au nominal coverage declarat. Calibrare pe validation; verificare a coverage observat și lățimii medii pe test/live. Nu ajustăm după test și nu le numim confidence interval fără justificare.
Afirmațiile de superioritate generală cer mai mult decât o fereastră scurtă și raportarea incertitudinii diferențelor. Fără dovadă suficientă, exprimarea este «în perioada evaluată».

## 6. Backtest versus live
Backtest: reconstrucție istorică, listă de limitări privind vintages/revizii și data experimentului.
Live: run salvat înaintea țintei, hash/config/version, actual ulterior și scor calculat după sosirea lui. Întreruperile contează în coverage operațional, nu se ascund prin excludere.
În fiecare raport: surse, interval temporal, versiuni, cutoff, rezoluție, excluderi, actuals snapshot și data recalculării.

## 7. Gates pentru implementarea viitoare
- DST, unități, missing/zero, duplicate și revizii sunt testate cu fixtures independente.
- Evaluatorul pe actual [100, 200] și prediction [110, 180] produce MAE=15 MW, bias=-5 MW și RMSE=sqrt(250) MW; un prediction lipsă reduce suportul, nu produce zero.
- Test negativ: injectarea unui feature publicat după cutoff este respinsă.
- Demo și backfill nu pot apărea în rezultate live.
- Fără interval comun nu există scor/clasament.
- Reingestia/retry este idempotentă; prognosticul deja publicat rămâne neschimbat.
- Benchmark și model au aceleași intervale pentru comparația raportată.
- Datele stale și jobul eșuat sunt vizibile în interfață.
Acestea sunt criterii propuse, nu teste deja scrise sau executate. Fluxul coder/tester/reviewer se aplică implementării.

## 8. Criterii de lansare, nu de performanță inventată
Preview: funcționalitate verificată, pipeline și provenance demonstrabile, metodologia și lipsurile publice, etichete backtest/live, review și aprobare deploy.
Postare cu rezultate: numărul real de zile live și acoperirea sunt declarate. Pragul minim de istoric se aprobă înainte de lansare; nu este fixat tacit aici.
Nu blocăm transparența doar fiindcă modelul pierde baseline-ul; blocăm afirmațiile false și rezultatele nereproductibile.
