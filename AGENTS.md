# EnergyRO — reguli de proiect

## Scop și documente
Citește intent.md, spec.md, plan.md și TASKS.md înainte de lucru. Spec și plan sunt draft până la aprobarea utilizatorului. Nu implementa înainte de aprobare.

## Roluri
Planner: planifică, integrează și este singurul care rulează comenzi PowerShell.
Coder: scrie cod, nu rulează comenzi.
Tester: scrie teste, nu rulează comenzi și nu pretinde că trec.
Reviewer: verifică cod și teste, fără unelte de scriere; planner-ul păstrează integral verdictul.
Flux pentru task-uri substantial/cornerstone: coder → tester → reviewer; planner execută verificările.

## Predări
Brief înainte de lansare: docs/handoff/<TASK-ID>-<rol>.md.
Raport: docs/handoff/<TASK-ID>-<rol>-raport.md.
TASKS.md este indexul explicit al stării. Nu deduce starea din apariția fișierelor.

## Constrângeri
Lucru, medii, cache-uri și instalări exclusiv pe D:. Nu afișa secrete. Nu suprascrie munca altui agent. Push, deploy și apeluri plătite necesită aprobare explicită.
Nu copia active proprietare ale inspirației italiene.

## Corectitudine energetică și ML
Stocare temporală UTC; afișare locală Europe/Bucharest cu DST explicit și date DD-MM-YYYY. Nu confunda ora locală cu offset fix EET pe tot anul.
Distinge MW de MWh, consumul raportat de consumul total și producția PV măsurată de cea estimată.
Păstrează issued_at, target_time, model_version și sursa fiecărei prognoze.
Backtesting cronologic cu disponibilitatea reală a datelor la momentul emiterii.
Nu inventa valori lipsă, precizie, economii sau licențe.

## Verificări
Prototipul React este autorizat prin docs/ui-build-plan.md. Planner rulează în D:\EnergyRO\prototype: npm test și npm run build; dependențe locale și cache npm pe D:. Verificările browser sunt separate de testele pure/build. Documentarea nu reprezintă dovadă de funcționare.
În workflow-uri Pi, output trebuie să coincidă cu raportul handoff al coder/tester: runtime-ul poate impune această cale peste brief. sessionDir nu controlează artefactele debug; artifactDir=project și destinațiile efective trebuie verificate. Reviewer rămâne read-only; planner transcrie integral verdictul.
