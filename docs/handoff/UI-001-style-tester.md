# UI-001 — stilizare, tester
Status: pregătit; numai după raport style-coder.

## Context
Citește AGENTS.md, docs/UI-GATES.md, brief/raport style-coder, codul actual App/main/styles/Atmosphere/HourlyChart și testele pure existente. Browserul este rulat exclusiv de planner prin playwright-cli deja instalat. Nu instalezi dependențe și nu execuți nimic.

## Rezultat și fișiere autorizate
Scrie exclusiv prototype/tests/ui-browser-smoke.js, docs/handoff/UI-001-style-test-protocol.md și docs/handoff/UI-001-style-tester-raport.md. Nu modifica testele pure sau producția/config/docs externe. Tool-uri doar read/grep/find/ls/edit/write. Output runtime coincide cu raportul tester.
Scriptul ui-browser-smoke.js conține expresia async page => { ... } executabilă prin playwright-cli run-code --filename=... conform skill-ului existent; fără importuri/npm packages, require, shell sau filesystem. Poți citi C:\Users\Lucian-PC\.pi\agent\skills\playwright-cli\SKILL.md dacă ai nevoie de contract. Funcții de assertion locale aruncă Error când condiția e falsă. Console raport clar pentru planner, fără pretinse rezultate înainte de execuție. Scriptul pornește de pe pagina deja deschisă pe localhost:5173; nu accesează alte servicii.

## Teste browser cu putere de regresie
Interacțiuni prin rol/label/selector stabil actual, nu căutare de cod JSX. Patru pagini și heading/content distinct; DEMO antet și subsol; RO/EN și document lang; schimbări zi/oră sincronizate cu text/calcul din fixture așteptat independent pentru un exemplu. Oficial lipsă zi 3, ora 11 și observat lipsă zi 4, ora 4: comparații/tabel/avertisment fără metadata imputată. Evaluare N 166/168 și două excluderi. Slider cu tastatură actualizează ora. Pauză schimba aria-pressed și .is-paused; reducedMotion emulat produce .motion-reduced și indicator, fără a confunda clasele cu dovadă RAF oprit. Cinci scene și pagini la viewport 1440x1000 și 390x844, document scrollWidth <= innerWidth (+1px toleranță), scroll local tabel permis. Detectează erori pageerror și console.error apărute în timpul scriptului. Teste de vizibilitate reală pentru nav/numere/titlu/chart și selectie; nu certifica contrast prin simpla prezență clasei.
Folosește așteptări pe DOM/locatori/event loop, fără sleep-uri fixe arbitrare și fără a slăbi assertion-uri ca să treacă. Restore final forecast prima zi RO, animație pause dacă simplifică captura.
Protocol manual separat: contrast pe toate scenele, focus/skip-link/touch, fallback canvas/blur, reduced-transparency, desen grafic și ruptură la null, oprire RAF la pauză/reduced-motion/tab hidden (dacă nu demonstrabil automat, planner verifică explicit), screenshot desktop/mobile. Nu transforma verificări manuale în teste pretins automate.

## Raport
Teste scrise dar nerulate, fișiere, acoperire, riscuri statice observate și pași planner. Dacă raportul coder lipsește/blocat, raportează BLOCAT și nu scrie teste.
