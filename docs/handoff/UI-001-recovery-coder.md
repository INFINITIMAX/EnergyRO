# UI-001 — recuperare, coder
Status: relansare autorizată; TEMP/TMP D:\tmp și PI_SUBAGENTS_TEMP_ROOT D:\EnergyRO\.pi-runtime verificate. Profilele de lucru sunt în .pi/agents pe D:.

## Context
Citește AGENTS.md, PRODUCT.md, docs/ui-build-plan.md și docs/ui-surface-brief.md. Workflow-ul anterior s-a întrerupt cu timeout/WebSocket error. Păstrează componentele existente în prototype/src/ și inspectează-le înainte de modificare. Nu există App.jsx, main.jsx, styles.css sau README final; raportul coder lipsește.
Planner a rulat un smoke check Node: MAE/bias/RMSE pentru exemplul convenit, missing/zero, suport gol și shape 7×24 au trecut. Nu sunt teste complete sau dovadă de UI funcțional.

## Task restrâns pentru prima livrare
Citește metrics.js, demo-data.js, i18n.js, Atmosphere.jsx și HourlyChart.jsx. Creează doar prototype/src/App.jsx și prototype/src/main.jsx, folosind API-urile existente. Nu crea CSS în acest pas; stilizarea are etapă separată. Nu importa styles.css până când există; main.jsx montează App cu React DOM. Folosește proprietățile scene/paused/reduced ale Atmosphere și day/hour/onHour/t/number ale HourlyChart; folosește useReducedMotion existent.
Leagă patru pagini locale, selecția zilei/orei, RO/EN, buton pauză, labels DEMO permanent, context și evaluare calculată. Fără requests reale. Canvas ilustrativ nu reprezintă vremea întregii Românii sau risc de blackout. Folosește componentele existente, clase coerente cu CSS ulterior și markup semantic.

## Limite
NU shell/bash/PowerShell/npm/node/browser sau delegare. Doar citire și scriere în cele două fișiere de mai sus și docs/handoff/UI-001-recovery-coder-raport.md. Nu modifica package.json, componentele, fixtures sau testele; raportează dacă API-ul existent are bug.
Nu pretinde că build/test trec. Raport pe disc cu starea și următoarea etapă: CSS, apoi tester/reviewer și verificări planner. Nu atinge alte proiecte.

## Problemă observată pentru revizuire
În demo-data.js, un row oficial lipsește în mod deliberat, dar row.forecasts.official.value este numeric pentru același interval. Raportează neconcordanța; nu ascunde lipsa în UI și nu modifica fixture-ul în acest task.
