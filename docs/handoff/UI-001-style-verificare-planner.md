# UI-001 — verificare stilizare, planner
Status: execuții reușite, finish review fresh în așteptare; NU deploy și NU certificare WCAG/cross-browser.

## Dovezi executate
PowerShell, director proiect/prototip pe D:, TEMP/TMP D:\tmp; browser Chrome existent, izolat, daemon/output pe D:.
- npm test: exit 0, 15/15, zero fail/skipped; .pi-runtime/ui-final-tests.log.
- npm run build: exit 0, Vite 6.4.3, 32 module, CSS+JS generate; .pi-runtime/ui-final-build.log.
- playwright-cli run-code --filename=prototype/tests/ui-browser-smoke.js: exit 0 și rezultat UI-001_BROWSER_SMOKE_PASS, consoleErrors=0. .pi-runtime/ui-final-browser.log. Pagini RO/EN, zi/oră, ArrowRight sincronizat, goluri oficial/observat, suport 166/168 și exact două excluderi, pauză/reduced; 5 scene și 4 pagini testate în bucle DISTINCTE la 1440×1000 și 390×844, nu toate combinațiile pagină×scenă.
- EXTRA_LAYOUT_PASS: cele patru pagini la 1280 și 320px, scrollWidth=viewport pe toate. .pi-runtime/ui-final-layout.log.
- MOTION_CHECK_PASS: clearRect interceptat temporar, 8 cadre observate în stare activă, 0 paused, 0 reduced. .pi-runtime/style-motion.log. Instrumentarea eliminată după test. Tab nou headless nu a schimbat document.hidden (false), deci NU dovadă de tab real ascuns.
- VISIBILITY_MEDIA_PASS: ramură document.hidden simulată + visibilitychange, 0 desene în 8 cadre; getter și instrumentare restaurate. Media prefers-reduced-transparency emulată prin CDP: matches=true, suprafață solid rgb(20,40,63), blur none. .pi-runtime/style-visibility-media.log. Testul hidden este sintetic, nu actual background-tab lifecycle.
- A11Y_FALLBACK_CHECK_PASS: skip-link focus real, top8px, outline3px, Enter focalizează main; pointer grafic schimbă ora la2, buton tabel selectează8; pagină nouă cu getContext=null randată; fallback no-blur forțat cu stil solid vizibil. .pi-runtime/style-accessibility-fallback.log. Nu afirm că browserul fără suport blur a fost instalat/testat.
- EMULATED_TOUCH_PASS: context 390×844 isMobile/hasTouch, zi selectată prin tap, grafic tap schimbă ora4, tabel tap selectează5, viewport/document390. .pi-runtime/ui-touch.log. Emulare, nu telefon fizic.

## Intervenții planner mici, după review static
- Test exclus: locator exact dt intervale excluse → dd egal2, în loc de includes('2') tautologic.
- Test status: locator limitat la comparison-panel; output HTML are implicit tot role=status, ceea ce făcea strict mode violation. Eșec păstrat în style-browser-smoke.log; nu defect producție. page.reload pentru stare inițială repetabilă; marker PASS returnat ca rezultat efectiv, nu doar string în codul logat.
- Favicon data:, elimină cererea 404 inițială; logul istoric păstrează eroarea veche, testele finale colectează numai evenimentele rulării și raportează0.
- Contrast: calcule conservative WCAG ale tokenilor față de extremitățile fundalurilor au arătat riscuri pentru muted pe cer și label peste luna night. CSS: textul hero/footer/eyebrow întunecat folosește ink, label/indicator header au backing solid, highlight rain întunecat de la537791 la425f78. Sub30 linii, fără modificări date/handlers. Aceste calcule sunt analiză conservatoare de paletă, NU audit pixel-perfect al tuturor stărilor/antialiasingului. Build și smoke rerulate după corecții.

## Capturi și inspecție
Capturi proprii UI pe localhost, nu active livrate: docs/evidence/ui-{clear,rain,storm,snow,night}-desktop.png, ui-page-{system,evaluation,methodology}.png, ui-mobile-initial.png, ui-canvas-blur-fallback.png, ui-320-full.png. Referința nimbus-reference.png este numai inspirație, nu asset folosit în aplicație.
Primele fullPage screenshots cu fundal fixed au avut artefacte de compositing/captureBeyondViewport (fundalul acoperea numai viewportul curent), nu au fost acceptate ca dovadă de contrast. Capturile de scene/pagini au fost înlocuite de viewport captures la scrollTop0; ui-320-full.png are nume istoric, dar captura curentă este viewport, NU full-page. Captura storm inițială a avut panouri necompuse; ui-storm-stable.png după două RAF a confirmat textele vizibile. Pentru review vizual folosește viewport-urile finale și recaptură storm stabilă dacă necesar, nu imaginea intermediară defectă.
Am inspectat cu read clear/rain/storm-stable/snow/night și mobile320/evaluation din runda de diagnostic; reviewer fresh inspectează capturile finale. Decorul rămâne ilustrativ; diferențiere serii prin dash/dot/linie și tabel.

## Limite reziduale
Contradicția official null/metadata numerică este păstrată și explicată. Nu există API/backend/model real. Nu există audit vulnerabilități, test cross-browser, certificat WCAG, ecran citit cu screen reader sau lifecycle real de tab ascuns. Certificarea live/publicare nu este scopul acestui prototip local. Finish review și DESIGN.md/gates trebuie închise explicit, nu deduse din fișiere.
