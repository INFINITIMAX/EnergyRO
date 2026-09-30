# UI-001 — raport tester stilizare

## Stare
Livrare tester scrisă pe disc, fără execuție de comenzi, browser, rețea, instalări sau delegări. Nu declar teste trecute și nu certific UI-001 finalizat.

## Fișiere livrate
- `prototype/tests/ui-browser-smoke.js` — expresie `async page => { ... }` pentru `playwright-cli run-code --filename`, fără importuri/require/filesystem.
- `docs/handoff/UI-001-style-test-protocol.md` — protocol manual concis pentru verificări vizuale/accessibility/fallback.
- `docs/handoff/UI-001-style-tester-raport.md` — acest raport.

## Acoperire a scriptului browser
Scriptul pornește de pe pagina locală deja deschisă și colectează `console.error`/`pageerror`. Include aserțiuni pentru:
- Prognoză vizibilă, DEMO, document `lang=ro`, hero MW și grafic.
- Schimbare oră cu `ArrowRight` pe slider și sincronizare cu selectorul global.
- Ziua 3 / ora 11: oficial lipsă, warning de neimputare.
- Ziua 4 / ora 04: observat lipsă în citirea graficului.
- Navigare pe cele 4 pagini în RO și EN, plus `document.lang=en`.
- Evaluare cu suport comun `166 / 168` și două intervale excluse.
- Pauză animație: `aria-pressed=true` și clasa `.is-paused`.
- Reduced motion emulat: clasa `.motion-reduced` și indicator UI.
- Overflow document pentru 5 scene (zile 0..4) și 4 pagini la 1440x1000 și 390x844.
- Reset final la Prognoză, ziua 0, ora 12, RO și animație nepauzată.

## Limite și riscuri statice
- Scriptul nu dovedește contrastul real, oprirea RAF în tab ascuns sau fallback-ul canvas/blur; acestea sunt în protocolul manual.
- Verificarea reduced-motion confirmă clase/indicator, nu demonstrează singură oprirea RAF.
- Verificarea numerică hero este de sincronizare prin schimbarea la ora următoare, nu recalculează complet fixture-ul.
- Nu am rulat scriptul; eventualele diferențe de nume accesibile/temporizare trebuie ajustate doar după execuția planner-ului.

## Pași pentru planner
1. Rulează verificările pure/build autorizate în `D:\EnergyRO\prototype`.
2. Rulează scriptul browser pe prototipul local deja deschis prin `playwright-cli run-code --filename=prototype/tests/ui-browser-smoke.js`.
3. Execută protocolul manual și păstrează capturi/observații pentru desktop, mobil și fallback-uri.
4. Dacă scriptul eșuează, raportează eroarea exactă; nu interpreta acest raport ca dovadă de trecere.
