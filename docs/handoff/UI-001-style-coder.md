# UI-001 — stilizare, coder
Status: autorizat în continuarea planului UI-001; build/testele pure au trecut înaintea acestei etape.

## Context și direcție
Citește AGENTS.md, PRODUCT.md, docs/ui-build-plan.md, docs/UI-GATES.md, docs/ui-surface-brief.md, docs/nimbus-direction.md, rapoartele recovery și toate componentele actuale. Inspectează prin read docs/evidence/nimbus-reference.png. Nu copia sursa sau activele Nimbus.
Design read: interfață publică energetică pentru cititori tehnici, atmosferică și aerisită, Nimbus explicit, nu dashboard admin. CSS propriu, sans de sistem; fără librării, fonturi externe, iconuri sau asset-uri noi. Numere reale accesibile, dimensiune mare și greutate mică. Accent cald, navy pe zi/zăpadă și text pal pe rain/storm/night, contrast prioritar. Paletă coerentă și fundal ilustrativ.

## Fișiere autorizate
Creează exclusiv prototype/src/styles.css și prototype/README.md. Editează prototype/src/main.jsx numai pentru importul CSS creat. În prototype/src/App.jsx poți numai muta blocul existent selection-panel după conținutul paginii, înainte de închiderea main, ca banda zilelor să fie sub grafic conform referinței; păstrează integral logica, etichetele și handlers. Dacă alegi o altă ordonare, raportează divergența. Raport exclusiv docs/handoff/UI-001-style-coder-raport.md, aceeași destinație cu output runtime.
Nu modifica Atmosphere.jsx, HourlyChart.jsx, demo-data.js, i18n.js, metrics.js, package/lock/config, testele, documentele de produs sau alte fișiere. Nu instala, nu executa comenzi, browser, requests sau delegări. Doar tool-uri read/grep/find/ls/edit/write.

## Livrare completă
Stilizează TOATE clasele și paginile existente, nu doar hero. Cer full viewport fixed cu pointer-events none, canvas/decor în spatele suprafețelor, straturi și fallback static fără canvas. Cinci sky layers crossfade, cer luminos prima zi, clear cu lumină/clouds proprii CSS, rain/storm mai întunecate fără flash, snow rece luminos, night profund. Evită text invizibil pe fond și z-index negativ fără stacking context controlat.
Nav/DEMO/controale sus; forecast hero stânga cu citire dominantă, context/comparator dreapta, chart lat, apoi șapte zile. Max-width ~1320px și spațiu calm, adaptare 1440x1000, 1280x800, 390x844 și 320px. Datele rămân lizibile; tabelele pot scrolla local, fără overflow document. Main flex/grid, min-width:0, text lung proveniență wrap. Day strip accesibil cu selectare clară; nu elimina controale la mobil.
Glass cu opacitate suficientă și fallback fără backdrop-filter/prefers-reduced-transparency; nu toată pagina în carduri identice. Grafic: grid/text/paths/dots/selection vizibile în toate scenele. Stiluri de linie distincte pentru model/official/baseline/actual; legenda și tabelul păstrate. SVG width:100%/height:auto, min-width doar în container scroll dacă trebuie. Numere/tabular pentru metrici, warning lizibil, method text aerisit.
:focus-visible clar; hover nu singura indicație; :disabled dacă există. Native select/options lizibile inclusiv scene întunecate. Tap targets utile. Skip-link vizibil la focus. Reduced-motion și is-paused opresc CSS animations/transitions de decor; rule media pentru mișcare redusă. Canvas deja gestionează RAF. Nu promite oprirea CSS la tab hidden prin magie dacă nu există hook; preferă decor CSS static și mișcarea canvas existentă, astfel evitând mișcarea de fundal ascunsă.
README: pornire PowerShell pe D:, cache/TEMP pe D:, npm test/build/dev locale, date sintetice, fără live/backend/model, neconcordanța fixture, accesibilitate intenționată și verificări nerulate. Nu declara validări browser inexistente.

## Predare
Raport cu fișiere modificate, decizii vizuale, limite, modificarea de ordine DOM, ce trebuie inspectat/testat de planner. Fără claims de teste/build/browser trecute în etapa ta. Dacă o limită cere modificări în afara scope-ului, documentează și oprește acea schimbare.
