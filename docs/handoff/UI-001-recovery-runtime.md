# UI-001 — dovadă runtime și reluare
Status: workflow 0b77d6de oprit după coder predat și tester blocat de rutarea raportului. Raport coder transcris integral în docs/handoff/UI-001-recovery-coder-raport.md; tester relansat în workflow d279eccb-4d02-4db1-85f5-be896d055c3a (tester-v3 → reviewer-v3), fără repetarea coder-ului. Workflow anterior 7a3e85a7 eșuat înainte de cod.

## Verificări planner
- Director curent: D:\EnergyRO.
- TEMP și TMP: D:\tmp.
- PI_SUBAGENTS_TEMP_ROOT: D:\EnergyRO\.pi-runtime.
- Codul extensiei folosește PI_SUBAGENTS_TEMP_ROOT pentru TEMP_ROOT_DIR, nu doar sessionDir.
- Statusul efectiv al workflow-ului confirmă directorul și events pe D:\EnergyRO\.pi-runtime\async-subagent-runs\7a3e85a7-c1f4-48f6-9f6a-ca400c0ba24a.
- Profile writer pe D:\EnergyRO\.pi\agents\energyro-writer.md, cu tool-uri read/grep/find/ls/edit/write, fără shell. Reviewer builtin numai read/grep/find/ls. Spark, deși listat prin pi --list-models, a fost refuzat de contul ChatGPT. Override-ul writer a fost eliminat: la relansare moștenește modelul funcțional al sesiunii. Aceasta este o abatere explicită de la preferința pentru modelul mic, nu dovadă că Spark funcționează.
- Sesiuni copii cerute în D:\EnergyRO\.pi-sessions\subagents. Output aggregate cerut în D:\EnergyRO\.pi-runtime\recovery-workflow-output.md.

## Predări și trigger
Workflow: 7a3e85a7-c1f4-48f6-9f6a-ca400c0ba24a.
Ordine propusă la relansare: recovery-coder → recovery-tester → recovery-reviewer. Brief-urile sunt pe disc. Nu există App/main sau rapoarte coder/tester create de această lansare. Nu s-au executat instalări, build sau verificări browser.

## Corecție importantă a verificării D:
Directorul workflow pe D: NU dovedește că toate artefactele copilului sunt pe D:. Eroarea a raportat artefactul debug pe C:\Users\Lucian-PC\.pi\agent\sessions\--D--EnergyRO--\subagent-artifacts\abb332bd-6843-442d-a3ad-4cfac0c2e03e_energyro-writer_0_output.md. Nu a fost șters sau mutat automat.
Extensia pi-subagents este instalată și expusă; sursa src/extension/config.ts citește configurația C:\Users\Lucian-PC\.pi\agent\extensions\subagent\config.json la inițializare. Valoarea artifactDir lipsea (implicit session). Planner a setat exclusiv artifactDir=project, păstrând celelalte valori. Această configurație minimă obligatorie pe C: este permisă. Setarea globală va plasa artefactele în <cwd>/.pi/subagents/artifacts pentru toate proiectele. Pentru EnergyRO destinația este pe D:.
Utilizatorul a executat /reload. Relansarea 0b77d6de-d9cd-415d-9a69-14ae70063ecd setează explicit sessionDir/output pe D: pentru fiecare copil și nu impune Spark.
Verificare efectivă după lansare: input și transcript copil d7d00a9d-507e-4f6a-acd6-de9171065f48 sunt în D:\EnergyRO\.pi\subagents\artifacts; session.jsonl există în D:\EnergyRO\.pi-sessions\subagents\recovery-coder-v2\run-0. Aceasta confirmă aplicarea artifactDir=project în runtime pentru coder. Output-uri configurate: D:\EnergyRO\.pi-runtime\recovery-{coder,tester,reviewer}-v2-output.md. Verifică și etapele ulterioare la completare.

## Incident de predare și corecție
Runtime-ul impune output ca destinație autoritativă a raportului: coder a scris raportul complet în .pi-runtime/recovery-coder-v2-output.md, nu în handoff. Planner l-a copiat integral în destinația din brief, fără suprascriere. App.jsx și main.jsx sunt create; nu au fost executate.
Tester-v2 s-a oprit corect înainte de teste; raportul integral este păstrat în docs/handoff/UI-001-recovery-tester-v2-blocat-raport.md. Workflow oprit pentru evitarea review-ului prematur. La relansarea tester-ului, output este chiar docs/handoff/UI-001-recovery-tester-raport.md pentru eliminarea conflictului dintre brief și instrucțiunea runtime. Reviewer rămâne read-only; verdictul runtime este transcris ulterior de planner. Codul coder nu se reface.


