# UI-001 — recuperare tester stilizare
Status: relansare după workflow 6703a2d3 expirat. Coder style complet predat; tester f662da27 stopped, eroare WebSocket, fără teste/protocol/raport. Reviewer nelansat. Nu există alt writer activ.

## Sarcină restrânsă
Citește AGENTS.md, docs/handoff/UI-001-style-coder-raport.md și docs/handoff/UI-001-style-tester.md. Acesta este amendamentul care restrânge acea sarcină: livrează script browser scurt (~100–160 linii), protocol manual concis și raport. Nu încerca o suită exhaustivă nouă; nu cerceta extensiile/runtime și nu citi toate documentele roadmap dacă nu sunt necesare. Citește App.jsx/styles.css și API-urile folosite când este necesar.

## Fișiere și tool-uri
Doar prototype/tests/ui-browser-smoke.js, docs/handoff/UI-001-style-test-protocol.md și docs/handoff/UI-001-style-tester-raport.md. Nu există aceste livrări la relansare; dacă au apărut între timp, inspectează și păstrează munca. Fără comenzi/browser/rețea/delegare. Output runtime chiar raportul handoff.

## Test minim cu aserțiuni reale
Expresie async page => { ... } pentru playwright-cli run-code --filename. Fără importuri. Script pe pagina locală deja deschisă: forecast vizibil și DEMO, navigare patru pagini, RO/EN lang, zi 3/11 lipsă oficială, zi 4/4 observat lipsă, evaluare 166/168, oră prin slider ArrowRight, pauză aria-pressed, reducedMotion/clasă. Verifică overflow document pe cele 5 scene (zile 0..4) și 4 pagini la 1440x1000 și 390x844. Erori console.error/pageerror colectate; throws la eșec. Așteaptă locatori/DOM, nu sleep arbitrar. Separă verificarea claselor de dovada RAF/contrast. Valoarea numerică hero nu necesită un calculator duplicat întreg: verifică o valoare calculată independent sau măcar schimbarea la ora următoare ca test de sincronizare. Reset la prima zi/forecast/RO la final.
Protocol manual pentru 320px/1280px, contrast toate scenele, skip/focus/touch, fallback canvas/blur, pause RAF/reduced/tab hidden. Raportul nu pretinde teste trecute. Semnalează defectele observate, nu le repara. Dacă ești blocat, predă blocajul imediat, nu aștepta finalul timeout-ului.
