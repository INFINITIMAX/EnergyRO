# Plan: EnergyRO
Status: ordine aprobată — consum + benchmark oficial + evaluare, apoi solar/eolian; audit practic în curs
Data: 29-09-2026

1. Audit surse: acces, licențe, acoperire RO, rezoluție, goluri, DST, revizii și publicare. Livrabil: docs/data-audit.md cu dovezi și blocaje.
2. Revizuirea spec-ului și alegerea stack-ului împreună cu utilizatorul. Actualizare plan și criterii GATES.md înainte de cod.
3. Ingestie și baseline pentru consum. Flux coder → tester → reviewer; planner rulează verificările. Nicio instalare pe C:.
4. Model consum și backtest fără leakage; salvarea prognozelor live și evaluarea benchmark-urilor comune.
5. Prognoză pe surse + verificare retrospectivă, aprobată pentru roadmap:
   - După consum: solar și eolian, numai după auditul seriilor și al acoperirii datelor.
   - Emitere zilnică pentru următoarele 168 de intervale orare UTC (7 × 24h), separat pe sursă; această fereastră nu este identică cu șapte zile calendaristice locale în jurul DST.
   - Arhivă imuabilă: issued_at, cutoff, versiune model, sursă și interval țintă; fără rescriere după sosirea valorilor reale.
   - Evaluare după publicarea producției reale: prognoză versus realizat, MAE/bias în MW și eroare de energie în MWh pentru zile complete, suport comun, N și acoperire.
   - Scoruri distincte D+1…D+7, cu definiția orizontului explicită; comparație cu baseline simplu, nu doar o medie pe întreaga săptămână.
   - Ulterior, exploratoriu: hidro, nuclear, gaz și cărbune, condiționat de date despre debite/acumulări, disponibilitate, opriri și operare. Nu promitem aceeași precizie sau fezabilitate pentru toate sursele.
   - Incertitudine și degradarea preciziei cu orizontul vizibile; delimitarea producției PV raportate față de prosumatori.
   - Context energetic integrat numai cu definiții și serii compatibile. Acest milestone nu extinde task-ul curent UI-001 și nu indică modele deja implementate.
6. Interfață: cercetare skill-uri de design, brief vizual, RO/EN, accesibilitate, mobile, metodologie și starea datelor.
7. Review și deploy gate: teste reale, licențe, secrete, costuri, fallback și aprobarea utilizatorului înainte de publicare.
8. Istoric live și lansare: postare susținută de rezultate măsurate; comercializarea este o etapă distinctă, ulterioară.

## Riscuri
Token ENTSO-E; seriile RO incomplete; meteo istoric cu lead time nepotrivit; date revizuite fără vintage; free-tier fragil; scope prea mare.

## Dovadă înainte de lansare
Pipeline executat și monitorizat; prognoze arhivate înainte de actuals; evaluare cu perioadă și eșantion explicite; benchmark; teste de DST/goluri/unități; interfață verificată; drepturi de utilizare și redistribuire clarificate. Nu fixăm praguri de precizie înainte de audit.
