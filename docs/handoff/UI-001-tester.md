# UI-001 — tester
## Sarcină/context
Citește D:\EnergyRO\AGENTS.md, docs/ui-build-plan.md, docs/UI-GATES.md, docs/handoff/UI-001-coder-raport.md și codul în prototype/. Scrie teste unitare Node node:test/assert pentru funcțiile pure metrics.js/demo-data.js pe baza API-ului real implementat. Nu modifica implementarea pentru a face teste să treacă.
## Rezultat
prototype/tests/*.test.js. Teste cu așteptări independente pentru MAE=15 și bias=-5 pe actual [100,200], pred [110,180]; RMSE=sqrt(250). Cazuri missing vs zero, suport comun între seriile comparate, fără observații → scor indisponibil conform API. Dataset demo determinist, 7 zile/24 ore, timestamps/unități/demo flag și consistență mix dacă exportate. Nu teste tautologice sau snapshot care aprobă orice. Nu presupune funcții inexistente: raportează gaps.
## Limite
Scrie exclusiv prototype/tests/** și docs/handoff/UI-001-tester-raport.md. NU cod aplicație, package.json, documente de plan, .env, alte proiecte.
NU rula comenzi de niciun fel (bash/npm/node/PowerShell/browser), NU delega. Rolul tău scrie teste; numai planner-ul le execută. Nu raporta că «trec».
## Raport
Status explicit, teste scrise, ce acoperă și ce nu, riscuri și comenzi cerute planner-ului. Livrare finală: calea raportului pe disc.
