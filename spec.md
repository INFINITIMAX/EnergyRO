# Spec: EnergyRO
Status: ordinea implementării aprobată; stack și detalii tehnice încă deschise
Data: 29-09-2026

## Specificații detaliate
- docs/product-spec.md: pagini, acțiuni, stări și scope.
- docs/data-contract.md: semantica și integritatea datelor.
- docs/evaluation-protocol.md: benchmark, leakage și evaluare.
Documentele sunt propuneri pentru revizuire; nu indică funcționalități implementate.

## Cerințe
### Prima livrare funcțională
- Consum național real și prognoză oficială, cu unități și surse explicite.
- Baseline simplu și model propriu pentru ziua următoare.
- Extindere până la 7 zile numai cu date și evaluare adecvate.
- Comparație model/oficial/baseline pe aceleași intervale disponibile.
- Arhivă de prognoze cu momentul emiterii și versiunea modelului.
- Evaluare D-1/D-2/D-3, MAE, bias, număr de observații și acoperire.
- Date lipsă, prospețime și erori de pipeline vizibile.

### Extindere înainte de lansarea completă
- Prognoze zilnice solar/eolian pentru 168 de intervale orare UTC, condiționate de audit; arhivare înainte de realizare și evaluare distinctă D+1…D+7 față de actuals și baseline. Definițiile orizonturilor se documentează explicit.
- Extindere exploratorie hidro/nuclear/gaz/cărbune, numai după verificarea fezabilității și a datelor disponibile; nu condiție obligatorie pentru prima lansare.
- Mix energetic, import/export și meteo relevant.
- Incertitudine cu metodă explicată și verificarea acoperirii intervalelor.
- Sumar zilnic bazat pe valori verificabile; LLM opțional, nu obligatoriu.
- Interfață RO/EN, responsive și export numai pentru date redistribuibile.

## Design propus, nu stack decis
Pipeline separat de interfață: ingestie → validare → features → predicție → persistare → evaluare după sosirea valorilor reale.
Interfața citește rezultate și nu antrenează modele la fiecare acces.
Python este candidat pentru pipeline; hosting, DB și frontend se aleg după audit, costuri și cerințe vizuale.

## Validare
Split cronologic și evaluare rolling-origin. Features disponibile strict la issued_at. Meteo observat sau arhiva compusă din primele ore ale rulărilor nu substituie automat o prognoză day-ahead istorică.
Nu pretindem superioritate față de benchmark înainte de măsurare.

## În afara scope-ului
Facturare, multi-tenancy comercial, integrare contoare private, trading automat, recomandări de profit garantat, SLA contractual.

## Conflicte/riscuri semnalate
Free tier nu asigură disponibilitate garantată. EET fix nu descrie ora de vară: se folosește timezone Europe/Bucharest. Licența de acces la date nu garantează drept de redistribuire. Datele agregate nu reprezintă automat întregul PV al prosumatorilor.
