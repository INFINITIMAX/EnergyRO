# Verificare practică acces
Data: 29-09-2026
Comenzi: Invoke-RestMethod în PowerShell; fără instalări, tokenuri sau apeluri plătite.

## Open-Meteo — rezultat executat
Forecast pentru coordonate București, hourly temperature_2m, două zile, UTC: succes; 48 observații, 29-09-2026–30-09-2026, unitate °C.
Previous Runs pentru aceleași coordonate, temperature_2m_previous_day1, past_days=2 și forecast_days=1: succes; 72 observații și 72 valori nenule, 27-09-2026–29-09-2026.
Răspunsurile sunt în open-meteo-forecast-sample.json și open-meteo-previous-run-sample.json.
Acest test confirmă accesul și un eșantion recent, NU acoperirea multianuală, disponibilitatea la un cutoff exact, licența de redistribuire sau adecvarea unui singur oraș pentru modelul național.

## ENTSO-E — dependență deschisă
Nu s-a efectuat test autentificat și nu s-au căutat/citit secrete.
Ghidul oficial indică înregistrare în Transparency Platform, solicitare către transparency@entsoe.eu cu subiect RESTful API access și adresa înregistrată în corp. Răspunsul este vizat în trei zile lucrătoare, nu garantat. După aprobare se generează tokenul în cont.
Sursă: https://transparencyplatform.zendesk.com/hc/en-us/articles/12845911031188-How-to-get-security-token
Utilizatorul trebuie să confirme dacă are acces. Tokenul nu se trimite în conversație.
