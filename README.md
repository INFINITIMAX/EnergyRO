# EnergyRO

Prototip React pentru explorarea consumului și evaluarea transparentă a prognozelor energetice din România.

**Stare actuală: DEMO local. Toate valorile energetice din interfață sunt sintetice.** Nu există încă backend, model energetic antrenat, integrare ENTSO-E sau prognoze reale. Publicarea codului nu este deploy-ul aplicației.

## Ce este implementat
- Patru pagini: Prognoză, Sistem energetic, Evaluare și Metodologie.
- RO/EN, selecție zi/oră, cinci scene ilustrative, grafic și tabel accesibil.
- Metrici MAE/bias/RMSE pe suport comun, cu lipsuri explicite; MW separat de MWh.
- 15 teste unitare, build și verificări browser executate; limite în [DESIGN.md](DESIGN.md) și [gate-uri UI](docs/UI-GATES.md).

## Pornire
Instrucțiuni PowerShell și dependențe în [prototype/README.md](prototype/README.md). Din `prototype/`: `npm ci --ignore-scripts --no-audit --no-fund`, `npm test`, `npm run build`, `npm run dev -- --strictPort`. Cache-urile și temporarele se configurează pe D: conform instrucțiunilor proiectului.

## Roadmap și documente
[intent.md](intent.md), [spec.md](spec.md), [plan.md](plan.md), [TASKS.md](TASKS.md). Următoarea etapă: audit și ingestie de date reale, începând cu consumul și benchmark-ul oficial. Accesul API ENTSO-E a fost solicitat; integrarea nu este implementată.

## Limite și proveniență
Interfața este inspirată de direcția vizuală Nimbus, cu implementare proprie. Captura referinței externe și payload-urile brute Open-Meteo nu sunt incluse în repository până la verificarea drepturilor de redistribuire. Capturile `ui-*.png` sunt generate din aplicația locală pentru verificare. Logurile, sesiunile agenților, cache-urile, build-urile și credențialele sunt excluse.
Nu există certificare WCAG, audit de securitate sau validare cross-browser. Licența de reutilizare a codului nu a fost încă aleasă; vizibilitatea publică nu reprezintă automat o licență open-source.
