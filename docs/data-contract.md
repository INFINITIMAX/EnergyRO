# EnergyRO — contract de date
Status: propunere independentă de baza de date și limbaj
Data: 29-09-2026

## Principii
UTC pentru persistență, intervale [start, end), Europe/Bucharest pentru afișare. Timestamp-urile sunt timezone-aware. Valori de putere în MW, energie în MWh, temperatură în °C. Puterea medie pe interval nu este energie.
Timezone locală respectă DST; EET UTC+2 nu este offsetul României pe tot anul.

## Observație energetică
Câmpuri obligatorii: series_id, zone_id, interval_start_utc, interval_end_utc, value (nullable), unit, source, retrieved_at_utc, quality_status, revision_id.
Câmpuri nullable documentate: source_published_at_utc, source_revision_at_utc. Necunoscut nu înseamnă egal cu retrieval sau cu începutul intervalului.
Identitatea include sursă, serie, zonă, interval și revizie. Versiunile vechi nu sunt suprascrise fără urmă; vederea «latest» nu șterge istoricul.
quality_status: valid, missing, provisional, invalid. Imputarea pentru features are flag și metodă separată; nu devine valoare reală de evaluare.
Consum actual, prognoză oficială și PV sunt serii distincte. Semantica seriei și acoperirea prosumatorilor se documentează din sursă, nu se presupun.

## Prognoză
Câmpuri: forecast_run_id, series_id, zone_id, issued_at_utc (momentul emiterii proprii), data_cutoff_utc, interval_start_utc, interval_end_utc, prediction_mw, model_version, feature_version, training_run_id, forecast_kind (model/baseline/official), provenance, run_status, is_demo.
Forecast oficial păstrează source-issued-at dacă este disponibil; dacă lipsește, nu fabricăm vintage din numele fișierului. Păstrăm separat first_seen_at/retrieved_at și explicăm limita.
Cheia idempotentă per interval: forecast_run_id + series_id + zone_id + interval_start_utc + interval_end_utc. O reluare nu produce dubluri și nu rescrie o emitere deja publicată; corecția are run distinct.
Intervalele lower_mw/upper_mw sunt opționale, cu nominal_coverage și interval_method. Fără metodă verificată, nu afișăm bandă decorativă.

## Snapshot meteo și features
source/model, model_run_at dacă disponibil, retrieved_at, available_at dacă demonstrabil, valid_time, coordonate, variabilă și unitate. Forecast horizon și vintage sunt separate de valid_time.
Un backtest la un cutoff exact cere disponibilitatea acelui model/run la cutoff; offsetul previous_day1 singur nu garantează asta. Dacă disponibilitatea nu se poate verifica, raportăm limita sau colectăm prospectiv.
Snapshot-ul features și configurația sunt reproductibile; consumul lagged nu folosește revizii/publicări viitoare.

## Agregări
Energie = suma putere_medie_MW × durată_ore pentru intervale complete și compatibile. Dacă unele intervale lipsesc, afișăm energie parțială plus acoperire, nu total complet.
15 minute → oră: media ponderată cu durata a puterilor; o oră incompletă nu devine actual complet. Nu producem 15-minute actuals prin repetarea unui actual orar.
Capacitate instalată în MWp este serie separată; nu este producție în MW. Factorul de capacitate cere unități și perioade compatibile.

## Lipsuri, revizii și integritate
Fără forward-fill în actuals evaluate. Fără zero pentru missing. Zero explicit și lipsa au sens diferit. Duplicate identice sunt deduplicate, conflictele sunt semnalate și păstrate pentru audit.
Păstrăm payload brut și metadate numai când licența permite, fără credențiale. Politica de retenție și redistribuire rămâne de confirmat.
Dacă folosim actuals revizuite în scoruri, raportul indică snapshot-ul și data recalculării. Backtest pe latest-only este marcat retrospectiv, fără pretenție de reconstrucție perfectă a producției.

## Cazuri de test pentru implementare
- Zi locală de primăvară: 23 intervale orare; de toamnă: 25. Instantele UTC rămân unice; orele locale repetate au offset distinct.
- 100 MW pe 15 minute rezultă în 25 MWh, nu 100 MWh.
- Un interval nul nu devine zero și nu intră în MAE.
- Reingestia aceluiași payload nu creează dubluri.
- O revizie nouă nu șterge valoarea precedentă.
- Un run publicat nu se modifică la retry.
- Un feature disponibil după cutoff este respins.
- Demo nu poate fi selectat ca rezultat live în evaluator.

## Decizii deschise
Rezoluția finală urmează seriile RO reale. Formatele și schema fizică se decid după audit. Nu există încă implementarea acestui contract.
