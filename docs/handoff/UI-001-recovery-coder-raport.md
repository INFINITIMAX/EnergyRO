# UI-001 — raport recuperare coder

## Stare
Livrarea restrânsă este scrisă, neverificată prin execuție. Au fost create exclusiv:
- `prototype/src/App.jsx`
- `prototype/src/main.jsx`

Componentele, fixture-urile, traducerile, metricile, configurația și testele existente au fost păstrate. Raportul este scris la destinația runtime autoritativă, în locul destinației din brief.

## Implementare
- Patru pagini locale: Prognoză, Sistem energetic, Evaluare, Metodologie; fără requests sau servicii reale.
- Selecția zilei și orei este comună paginilor; scena, valoarea principală, comparațiile, mixul și proveniența urmează selecția.
- RO/EN prin dicționarul existent și texte suplimentare bilingve; atributul documentului `lang` urmărește selecția.
- `Atmosphere` primește `scene`, `paused`, `reduced`; preferința de mișcare redusă folosește hook-ul existent. Clasele `is-paused` și `motion-reduced` sunt disponibile etapei CSS.
- `HourlyChart` primește API-ul existent integral și păstrează alternativa tabelară/tastatură.
- Etichete DEMO în antet, pagini și subsol; delimitare explicită față de ENTSO-E, vreme națională, risc de blackout și performanță energetică reală.
- Evaluarea folosește `evaluateCommonSupport` pe toate rândurile celor șapte zile, nu metadatele prognozelor. MAE/bias/RMSE, N, acoperire și excluderi sunt calculate, nu hardcodate.
- Mixul sintetic, balanța în MW și limitele PV sunt explicite. Timpul este afișat prin utilitarele Europe/Bucharest existente; proveniența include emiterile și țintele UTC, versiunile și sursele fiecărei serii.
- Intrarea React DOM montează App în `#root`, identificat în index.html existent. Niciun import de `styles.css` și niciun CSS creat.

## Neconcordanță păstrată și expusă
În `demo-data.js`, pentru 09-12-2026 11:00 Europe/Bucharest (`dayIndex=2`, `hour=11`), `row.official` este `null`, dar `row.forecasts.official.value` este numeric. Fixture-ul nu a fost modificat. Comparația, graficul, proveniența afișată și evaluarea folosesc seria `row.official`, deci păstrează Lipsă/excluderea. Avertisment contextual la selectarea intervalului și explicație permanentă în Metodologie. Evaluarea explică folosirea câmpurilor seriilor și enumeră cele două goluri deliberate.

## Verificări și limite
Au fost citite regulile, documentele cerute și toate cele cinci module existente înainte de scriere; index.html și vite.config.js au fost inspectate pentru integrare. Nu am rulat shell, Node, npm, build, teste sau browser și nu pretind că acestea trec. Smoke check-ul planner menționat în brief nu validează această livrare.

Aspectul Nimbus, contrastul, responsive, comportamentul vizual al pauzei/reduced-motion și ordinea vizuală a suprafețelor nu sunt validate. Fără CSS, prezentarea este intenționat incompletă. Datele sunt o mostră fixă de iarnă, nu un generator validat pentru zile DST sau prognoze operaționale.

## Următoarea etapă
CSS separat, inclusiv poziționarea decorului, suprafețe, clasele de scenă, oprirea animațiilor CSS la pauză/reduced-motion, focus/contrast și responsive; apoi tester/reviewer și verificările executate exclusiv de planner (teste, build, browser desktop/mobil, accesibilitate și scene). Adăugarea importului CSS numai după existența fișierului. Neconcordanța fixture-ului rămâne de revizuit în task autorizat separat.
