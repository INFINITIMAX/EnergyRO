# Gates: DOC-002 — specificație produs și evaluare

OWNS: docs/product-spec.md, docs/data-contract.md, docs/evaluation-protocol.md, docs/REVIEW-DOC-002.md, spec.md, TASKS.md, GATES.md
Scope: Documentare fără implementare, instalări sau dependență de acces ENTSO-E. Criterii manuale: existența unor cuvinte nu dovedește corectitudinea semantică.

- [x] G1: Cele patru pagini au scop, conținut, acțiuni și stări de eroare/demo; scope-ul consum este separat de extensii.
  EVIDENCE: Self-review planner 29-09-2026: docs/product-spec.md secțiunile 1–4 și Scope și lansare; document recitit de pe disc cu UTF-8 explicit.
- [x] G2: Contractul distinge MW/MWh, UTC/ora locală, date lipsă, revizii, publicare și momentul emiterii; include cazuri DST verificabile.
  EVIDENCE: Self-review planner 29-09-2026: docs/data-contract.md, toate secțiunile; cazuri 23/25h și 100 MW × 0,25h; nu teste implementate.
- [x] G3: Evaluarea definește baseline, suport comun, MAE/bias, cutoff fără leakage și diferența între backtest și rezultate live.
  EVIDENCE: Self-review planner 29-09-2026: docs/evaluation-protocol.md secțiunile 1–6; excepții pentru vintage necunoscut, baseline zero și suport gol.
- [x] G4: Criteriile viitoarei implementări pot eșua și nu impun rezultate ML inventate; întrebările deschise sunt vizibile.
  EVIDENCE: Self-review planner 29-09-2026: evaluation-protocol.md secțiunile 7–8, inclusiv test negativ de leakage și exemplu calculabil; product-spec.md și data-contract.md decizii deschise.
- [x] G5: Review-ul și indexul de sarcini reflectă documentele efective; nu declară implementarea sau validarea energetică finalizată.
  EVIDENCE: docs/REVIEW-DOC-002.md, spec.md și TASKS.md recitite pe disc. Documente nenule și fără caractere UTF-8 de înlocuire; nicio verificare structurală nu este prezentată ca validare a datelor reale.

Rezultat: 5 criterii documentare revizuite manual; 0 unmet, 0 abandonate. Aprobarea utilizatorului asupra detaliilor și validarea practică rămân pași separați.
