# UI-001 — preflight recuperare
Data: 29-09-2026

## Smoke check executat
Planner, PowerShell, cwd D:\EnergyRO\prototype, node --input-type=module cu assert native.
Exit 0. Verificate independent: MAE 15, bias -5, RMSE sqrt(250), zero valid versus null, zero intervale comune cu oficial lipsă, 7 zile fiecare cu 24 ore.
Nu este suită completă; nici build sau browser nu au fost executate.

## Root temporar subagenți
Sursă verificată: pi-subagents/src/shared/types.ts, bloc configuredTempRoot.
PI_SUBAGENTS_TEMP_ROOT este citit la încărcarea modulului; directorul implicit folosește os.tmpdir(). sessionDir nu mută async run root și toate artefactele.
Setarea în tool-ul PowerShell nu modifică mediul procesului Pi părinte deja pornit. Pentru respectarea integrală D:, Pi trebuie pornit din D:\EnergyRO cu PI_SUBAGENTS_TEMP_ROOT, TEMP și TMP pe D:. Artefactele trebuie configurate project/temp sau dezactivate, evitând fallback-ul la sesiunea părinte C:.
Nu a fost relansat agentul. Înainte de lansare trebuie repornită sesiunea cu aceste setări sau aprobată explicit o excepție strictă pentru metadatele runtime.

## Reluare
Brief task mic: docs/handoff/UI-001-recovery-coder.md. Task inițial limitat App.jsx/main.jsx; stilizarea separat, apoi tester/reviewer. Datele/prototipul parțial sunt păstrate.
