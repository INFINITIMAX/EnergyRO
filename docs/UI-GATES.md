# Gates: UI-001 — prototip React Nimbus
OWNS: prototype/**, docs/handoff/UI-001-*, DESIGN.md
Scope: Prototip local cu date sintetice, patru pagini, scene atmosferice, fără backend sau deploy.

- [x] G1: Codul și testele sunt predate pe disc; reviewer verifică ambele fără scriere.
  EVIDENCE: rapoarte recovery/style coder și tester în docs/handoff; review static păstrat integral în UI-001-style-reviewer-raport.md; finish fresh în UI-001-finish-reviewer-raport.md, ACCEPTAT LOCAL.
- [x] G2: Testele unitare acoperă calcule, missing/zero, date demo și comportamente pure; planner rulează testele și build-ul cu succes.
  EVIDENCE: după CSS/corecții finale, npm test exit 0, 15/15, npm run build exit 0; .pi-runtime/ui-final-tests.log și ui-final-build.log; docs/handoff/UI-001-style-verificare-planner.md.
- [x] G3: Browser desktop și mobil confirmă paginile, scenele și selecția zi/oră, RO/EN, lipsa overflow și zero erori runtime ale aplicației.
  EVIDENCE: UI-001_BROWSER_SMOKE_PASS consoleErrors0, desktop1440/mobile390; EXTRA_LAYOUT_PASS pagini la1280/320. .pi-runtime/ui-final-browser.log și ui-final-layout.log. Scenele și paginile în bucle separate, nu toate combinațiile; Chrome/emulare, nu cross-browser/telefon fizic.
- [x] G4: DEMO permanent, scene ilustrative, fără claims live; tastatură/reduced-motion/fallback și contrast inspectate.
  EVIDENCE: docs/handoff/UI-001-style-verificare-planner.md; MOTION_CHECK_PASS activ8/paused0/reduced0; A11Y_FALLBACK_CHECK_PASS; VISIBILITY_MEDIA_PASS; contrast inspectat vizual/conservator și corecții rerulate. Nu certificare WCAG; hidden sintetic/no-blur simulat, limite explicite.
- [x] G5: Capturi inspectate, detector design, review fresh și documentare a identității implementate; defectele rămase sunt explicit raportate.
  EVIDENCE: reviewer fresh a inspectat capturile reale și a evaluat explicit pattern-uri design/admin/Nimbus (review critic, nu detector automat separat). UI-001-finish-reviewer-raport.md: ACCEPTAT LOCAL, No issues found; DESIGN.md documentează implementarea/proveniența și limitele.

Gate-urile de browser/design sunt manuale cu evidență reală, nu un grep de cuvinte. Comenzile de verificare sunt executate exclusiv de planner după inspectarea fișierelor.
