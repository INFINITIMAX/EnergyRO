# EnergyRO — index sarcini
Data: 29-09-2026

| ID | Sarcină | Responsabil | Stare | Livrabil |
|---|---|---|---|---|
| DOC-001 | Intent și spec/plan | Planner | Ordine aprobată; detalii tehnice deschise | intent.md, spec.md, plan.md, AGENTS.md |
| DOC-002 | Specificație produs, contract date și evaluare | Planner | Documentare finalizată; self-review; detalii propuse pentru revizuire | docs/product-spec.md, docs/data-contract.md, docs/evaluation-protocol.md, docs/REVIEW-DOC-002.md, GATES.md |
| DATA-001 | Audit surse | Planner | Acces Open-Meteo verificat pe eșantion recent; utilizatorul a solicitat acces API ENTSO-E prin e-mail, aprobare în așteptare | docs/data-audit.md, docs/evidence/access-check.md |
| DEC-001 | Alegere stack și detalii implementare | Utilizator + Planner | React confirmat; backend/hosting deschise | PRODUCT.md, spec.md, plan.md |
| UI-001 | Prototip React DEMO Nimbus | Planner; coder → tester → reviewer | ÎNCHIS — ACCEPTAT LOCAL la finish review fresh. 5/5 gate-uri prototip consemnate; 15/15 teste și build reexecutate la închidere; browser zero erori în suită, layout/motion/fallback/touch emulat verificate. Limite: hidden sintetic, fără cross-browser/WCAG formal/security audit; fixture contradictoriu explicit. Fără date live/backend/model/deploy | docs/ui-build-plan.md, docs/UI-GATES.md, docs/ui-surface-brief.md, docs/handoff/UI-001-*.md |
| GIT-001 | Publicare cod pe GitHub | Planner | ÎNCHIS — repository PUBLIC INFINITIMAX/EnergyRO, main; primul push verificat prin SHA local/remote identic. Cod/documente publicate, runtime/secrete/active externe excluse; fără deploy | README.md, .gitignore, docs/handoff/GIT-001-*.md |
| BUILD-001 | Ingestie și baseline consum | Neatribuit | În așteptarea auditului și planului tehnic | Brief-uri în docs/handoff/ înainte de lansare |
| FORECAST-002 | Prognoză solar/eolian la 7 zile și evaluare pe orizont | Neatribuit | Aprobat în roadmap; după consum și audit; neimplementat | plan.md, etapa 5 |
| FORECAST-003 | Extindere hidro/nuclear/gaz/cărbune | Neatribuit | Exploratoriu; condiționat de date și fezabilitate; neimplementat | plan.md, etapa 5 |

UI-001 este prototip DEMO local implementat, verificat și acceptat cu limite. Dovezi: docs/UI-GATES.md, docs/handoff/UI-001-style-verificare-planner.md și UI-001-finish-reviewer-raport.md; reexecuție închidere în .pi-runtime/ui-closeout-{tests,build}.log. Incidentele anterioare rămân documentate. Repository public: https://github.com/INFINITIMAX/EnergyRO. Nu există deploy; prototipul nu este produs live.

<!-- UI-001: selectorul d6a2be18 / seed 66ebf4a4 este supersedat de Nimbus. Workflow eșuat: 7eda3497-fe3b-4a76-ab66-fe98c75b869d. Rapoarte explicite în docs/handoff/. Nu deduce statusul din apariția fișierelor. -->
