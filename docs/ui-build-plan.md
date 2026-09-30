# UI-001 — plan implementare prototip
Status: implementare autorizată prin «ok go» după alegerea React și referinței Nimbus

## Stack local
React + Vite, JavaScript/JSX și CSS propriu; grafice SVG din date, canvas decorativ pentru cer. Fără biblioteci de componente obligatorii sau dependențe de servicii. Teste unitare Node native pentru funcții pure; smoke/browser checks Playwright CLI deja instalat. Nicio instalare globală nouă.
Dependențe runtime: react, react-dom. Dev: vite și @vitejs/plugin-react cu versiuni compatibile, alese în package.json. Planner rulează npm install cu cache și TEMP pe D:. Nu descărca fonturi externe la runtime; sistem sans pentru prototip, cu cifra mare subțire realizată prin SVG accesibil/text alternativ dacă necesar.

## Fișiere
prototype/package.json, index.html, vite.config.js, src/main.jsx, src/App.jsx, src/styles.css, src/demo-data.js, src/metrics.js, componente separate unde util. README cu pornire și limite.
Teste: prototype/tests/*.test.js. Documente de predare: docs/handoff/UI-001-*.md. Fără modificarea datelor reale existente.

## Ordine
1. Coder construiește aplicația completă și raportul, fără comenzi.
2. Tester citește codul și scrie teste relevante, fără comenzi.
3. Reviewer read-only verifică ambele livrări; planner păstrează integral verdictul.
4. Planner instalează local, rulează npm test și npm run build; dacă apar erori, corectează prin același ciclu pentru probleme substanțiale.
5. Planner pornește server strict local, verifică browser desktop/mobil, scene, pagini, selecția zilei/orei, reduced-motion și erori; capturi valide, maximum două runde vizuale.
6. Detector design și finish review fresh după capturi; documentarea DESIGN.md reflectă realizarea verificată, nu intenția.

## Scope exact
Patru pagini locale: Prognoză, Sistem energetic, Evaluare, Metodologie. Dataset sintetic determinist pentru șapte zile de iarnă, fără afirmații live. În prognoză, numeral MW pentru ora selectată, context, comparație și chart 24h; bandă zile schimbă date și scenă. Cinci scene: clear, rain, storm, snow, night. Fundal ilustrativ, nu meteo național.
RO/EN pentru textele UI; buton animație; teme adaptate scenei; grafic tastatură și etichete; tabel de valori ca alternativă. Sistem energetic cu mix sintetic consistent și proveniență demo. Evaluare calculează metrici din actual/model/oficial/baseline pe suport comun, semnalând explicit că sunt sintetice. Metodologie descrie demo și ceea ce nu este implementat.
Nu implementăm backend, antrenare, autentificare, export energetic fără licență, APIs reale sau deploy.

## Acceptance
Vezi docs/UI-GATES.md. Raportarea finală separă cod construit, testare executată și lipsuri. Nimic nu este produs live.
