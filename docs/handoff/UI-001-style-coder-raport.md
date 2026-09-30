# UI-001 — raport stilizare coder

## Stare
Livrare scrisă pe disc și inspectată static; **fără execuție de comenzi, teste, build, browser, requests, instalări sau delegări**. Nu declar gate-uri trecute sau UI-001 finalizat. Rezultatele recovery anterioare nu validează CSS-ul nou.

## Fișiere autorizate modificate
- Creat `prototype/src/styles.css`: prezentarea tuturor paginilor, claselor și scenelor existente.
- Creat `prototype/README.md`: utilizare PowerShell locală pe D:, cache/TEMP pe D:, npm test/build/dev, limite DEMO și verificări încă necesare.
- `prototype/src/main.jsx`: exclusiv importul `./styles.css`.
- `prototype/src/App.jsx`: exclusiv mutarea blocului existent `selection-panel`, integral, după conținutul condițional al paginilor și înainte de `</main>`.
- Acest raport, la destinația handoff/runtime autoritativă.

Nu au fost modificate componentele Atmosphere/HourlyChart, fixture-ul, traducerile, metricile, configurația, dependențele, testele sau documentele de produs. Logica, handlers și etichetele blocului mutat sunt păstrate.

## Decizii vizuale
- Interpretare proprie a capturii Nimbus inspectate: cer luminos pe prima zi, lumină radială și raze/clouds CSS statice, spațiu aerisit și numeral MW dominant, text accesibil de sistem cu greutate mică. Fără copiere de cod sau active; fără asset-uri/fonturi/iconuri externe.
- Canvas și cinci sky layers fixed pe viewport în spatele suprafețelor, cu `pointer-events:none`; stacking context izolat și z-index nenegativ. Crossfade de opacitate între scene; fallback complet prin fundalurile CSS dacă lipsește canvas.
- Clear/snow cu navy și suprafețe luminoase; rain/storm/night cu text pal și glass navy. Storm nu introduce flash. Noaptea are lumină lunară statică; snow rămâne rece/luminos. Tokeni de culoare comuni pentru text, grafice, select/options și warnings.
- Shell de maximum 1320px; nav/DEMO/controale sus; hero stânga și context/comparator dreapta; grafic lat, apoi zile. Alte pagini au balanță/mix, evaluare tabelară și texte/metadate aerisite, nu un dashboard admin cu carduri identice peste tot.
- Glass opac implicit, îmbunătățit cu blur numai prin feature query. `prefers-reduced-transparency` revine la suprafețe solide. Focus vizibil, skip-link, selected state cu border/linie și stil explicit, disabled state, ținte de minimum 44px pentru controale. Numere tabulare și proveniență cu wrap/min-width zero.
- Grafic: model solid gros, oficial dashed, baseline dotted, observat solid subțire; grid/text/dots/selection tematizate. Legenda, cursorul și tabelul sunt păstrate. SVG width 100%/height auto; pe ecrane mici lățimea minimă de 680px este numai în `chart-panel` cu scroll local. Tabelele au scroll propriu.
- Mobil: hero/context devin coloane, nav pe două coloane; zilele pe mai multe rânduri (fără eliminarea controalelor). Tabelele și graficul nu sunt restrânse până la text miniatural; alternativa textuală rămâne disponibilă. Sunt incluse reguli pentru forced-colors, nevalidate în browser.
- CSS nu are animații decorative continue. Pauza, clasele motion-reduced și media query-ul reduced-motion elimină crossfade-ul. Oprirea RAF la tab ascuns rămâne responsabilitatea componentei canvas existente; CSS nu pretinde un hook de vizibilitate absent.

## Ordine DOM și limite
Blocul zilelor și selectorul global al orei sunt acum la finalul `main` pentru toate paginile. La Prognoză urmează graficului, conform direcției. Pe celelalte pagini și pe mobil utilizatorul parcurge conținutul înainte de selectorul global; cursorul orar din Prognoză rămâne în grafic. Acesta este efectul intenționat al mutării autorizate, nu o schimbare de logică.

Nu impun încadrarea întregului conținut într-un singur viewport: chart help, sliderul, warnings și alternativa tabelară păstrează spațiul necesar; documentul poate avea scroll vertical. La mobil, scroll-ul local al panoului SVG trebuie inspectat cu pointer și tastatură, inclusiv focusul controalelor. Contrastul, hairline-ul numerelor de sistem și layout-ul exact depind de randarea browserului și nu sunt certificate static.

Neconcordanța fixture-ului rămâne: oficial lipsă la 09-12-2026 11:00 local, metadata numerică. Warning-ul existent este stilizat, seria nu este completată. Corectarea datelor sau restructurarea componentelor pentru alte soluții de scroll ar depăși scope-ul; nu am făcut acele schimbări.

## Verificări cerute planner-ului
1. Reexecutare locală pe D: a `npm test` și `npm run build`, cu dovezi noi.
2. Browser/capturi la 1440×1000, 1280×800, 390×844 și lățime 320px: toate cele patru pagini, RO/EN și toate cele cinci scene. Verificați layout, contrast efectiv, lipsa overflow-ului documentului, textul lung și controalele native select/options.
3. Navigare completă cu Tab/Shift+Tab, skip-link, focus vizibil, selectarea zilei/orei, slider cu săgeți, grafic pointer și selectare din tabel. Verificați scroll-ul local SVG/tabele și selecțiile sincronizate.
4. Warning-ul oficial la ziua a treia/ora 11, golul observat, proveniența și evaluarea 166/168 pe fixture, fără imputare.
5. Pauză/reluare, schimbarea preferinței reduced-motion, tab ascuns, fallback fără canvas, fără backdrop-filter și reduced-transparency. Verificați lipsa flash-urilor și erorilor runtime.
6. Review al codului/CSS și verificări browser de accesibilitate separate de testele pure; capturi/contrast și finish review înainte de orice acceptare finală. Fără deploy.
