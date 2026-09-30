# Audit de date — preliminar
Data: 29-09-2026
Status: documentar; nu s-au efectuat cereri ENTSO-E autentificate sau măsurători de acoperire RO.

## Surse candidate și dovezi existente
### ENTSO-E
Consum real, prognoză day-ahead și producție pe surse sunt categorii publicate de platformă. Acoperirea efectivă RO, continuitatea, rezoluția și timestamp-ul publicării rămân de testat.
Documentație: https://transparencyplatform.zendesk.com/hc/en-us/articles/16647979768084-Actual-Total-Load-Day-ahead-Per-Bidding-Zone-6-1-A-6-1-B
API: https://documenter.getpostman.com/view/7009892/2s93JtP3F6
Pagina de suport a răspuns 403 la fetch; informațiile au fost găsite prin căutare. Nu echivalează cu validarea API.
Necesită verificarea accesului/tokenului și a condițiilor de utilizare/redistribuire.

### Transelectrica
Publică date de consum și starea SEN; candidat pentru control încrucișat, nu presupunem API stabil.
https://www.transelectrica.ro/web/tel/consum
https://www.transelectrica.ro/web/tel/sistemul-energetic-national
Rămân deschise definiția exactă a seriei, istoricul descărcabil și drepturile de redistribuire.

### Open-Meteo
https://open-meteo.com/en/docs/historical-forecast-api
https://open-meteo.com/en/docs/previous-runs-api
https://open-meteo.com/en/pricing
Historical Forecast este o serie construită din primele ore ale rulărilor succesive; nu trebuie tratată automat ca prognoză D-1/D-2/D-3. Previous Runs/Single Runs sunt candidați pentru lead-time, cu verificarea disponibilității efective și a acoperirii fiecărui model.
Free API pentru utilizare necomercială are limite; comercializarea ar necesita reanalizarea condițiilor.

## Inspirație inspectată în browser
https://electricity-fundamentals-forecast-dashboard.streamlit.app/
Autor indicat: Davide Deltetto. Consum, PV, comparație D-1/D-2/D-3, overlays meteo și benzi de incertitudine confirmate.
Pentru selecția consum/NORD, pagina afișa evaluare 13-09-2026–28-09-2026; nu generalizăm la întregul istoric al aplicației. Nu am văzut benchmark oficial/naiv în ecranele inspectate. Exportul CSV automat nu a reușit; nicio precizie numerică nu a fost validată independent.

## Riscuri infrastructură
https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
Joburile schedule pot întârzia sau fi eliminate; nu promitem oră garantată.
https://docs.github.com/actions/managing-workflow-runs/disabling-and-enabling-a-workflow
Cron public poate fi dezactivat după 60 de zile fără activitate.
Turso, Streamlit și Git LFS: costuri/cote curente încă neverificate; nu alegem stack doar din postarea originală.

## Checklist pentru audit practic
- [ ] Acces ENTSO-E autorizat, fără token în loguri.
- [ ] Eșantion RO real și prognoză oficială; definiții și unități.
- [ ] Inventar acoperire istorică și rezoluție; goluri/duplicate/revizii.
- [ ] DST și intervale UTC coerente.
- [ ] Verificarea surselor PV/eolian și limitelor de reprezentare.
- [ ] Vintage/issued_at și disponibilitatea datelor la cutoff.
- [ ] Meteo istoric pentru lead time ales și zone reprezentative.
- [ ] Licențe și redistribuire; documentarea termenilor.
- [ ] Estimarea volumelor, cotelor și costurilor înainte de stack.
