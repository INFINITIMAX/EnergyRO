# EnergyRO — specificație de produs
Status: propunere detaliată pentru revizuire; fără implementare
Data: 29-09-2026

## Poziționare
Observator public al sistemului energetic românesc: prognoze explicate și performanță verificabilă. Inspirație arhitecturală: Davide Deltetto; identitate, cod și metodologie proprii. Nu promitem prognoze superioare fără dovezi.
Diferențiatori țintă: benchmark oficial și naiv, istoric al emiterilor, limite transparente, starea datelor, RO/EN și experiență mobilă.

## Navigare și întrebarea centrală
1. Prognoză: ce estimăm pentru următoarea zi și cât de nesigur este rezultatul?
2. Sistem energetic: ce se întâmplă în sistem, conform datelor disponibile?
3. Evaluare: cât de bine au funcționat predicțiile deja emise?
4. Metodologie: ce măsurăm și cum se pot verifica afirmațiile?
Nu este necesară autentificare pentru consultarea publică. Exportul este condiționat de licență.

## 1. Prognoză
Prima livrare: consum național raportat, nu consum total presupus.
Conținut: grafic consum real/estimare; prognoză oficială și baseline când sunt disponibile; vârf și minim în MW; energie estimată în MWh calculată din intervale complete; issued_at, sursă, versiune și acoperire. Incertitudinea apare numai dacă metoda este calibrată și explicată.
Acțiuni: alegere zi, comutare serii, afișare intervale, detaliu la hover/tap; export ulterior dacă permis.
Ziua următoare este scope inițial. D-2/D-3 și 7 zile apar doar după emiterea și evaluarea reală a acestor orizonturi; nu se extrapolează o predicție D-1.
Stări: fără model încă → explicație, nu curbe fabricate; prognoză veche → avertizare și ultima emitere; serie oficială absentă → nu se inventează benchmark; interval lipsă → întreruperea graficului; demo → banner permanent și exclus din performanța reală.

## 2. Sistem energetic
Prima livrare: istoric consum și prospețimea acestuia. Mix energetic și import/export sunt extensii condiționate de audit.
Conținut ulterior: producție pe surse, consum, fluxuri și meteo contextual, fiecare cu timestamp și rezoluție. Soldul și convenția semnului sunt explicate; nu combinăm serii incompatibile ca o identitate fizică exactă.
Acțiuni: interval temporal, surse vizibile, explicația definițiilor.
Stări: surse cu întârzieri diferite → timestamp per serie; total incomplet → marcat; meteo indisponibil → restul paginii rămâne utilizabil. Fără flux de date suficient de rapid, nu etichetăm pagina drept «în timp real».

## 3. Evaluare
Conținut: comparație model/oficial/baseline, MAE în MW, bias în MW, perioadă, N intervale, zile și acoperire. Breakdown pe oră, zi și orizont dacă există observații. Perioadele de test și rezultatele live sunt distincte.
Acțiuni: perioadă, orizont, versiune și grupare; explicații ale formulelor și suportului comun.
Stări: istoric insuficient → afișăm dimensiunea eșantionului și avertizarea; lipsa actuals → intervale neevaluate; lipsa benchmark → nu declarăm câștigător; niciun interval comun → comparație indisponibilă, nu eroare zero.
Nu afișăm un procent generic de «acuratețe». Un model care pierde benchmark-ul rămâne afișat onest.

## 4. Metodologie
Conținut: definiția consumului, MW/MWh, timezone și DST, surse/licențe, meteo istoric, cutoff, features, modele, baseline, formule, revizii și limitări privind prosumatorii. Link spre repository după publicarea aprobată.
Acțiuni: citirea metodologiei și descărcări permise. FAQ: «De ce nu coincide cu alt site?», «Ce este D-1?», «De ce lipsesc date?».
Stări: licență neverificată → export blocat; metodă experimentală → marcată explicit.

## Cerințe transversale
RO/EN; date DD-MM-YYYY; ore locale Europe/Bucharest cu offset în detalii; navigare de tastatură; contraste și culori care nu sunt singurul cod al seriilor; layout mobil fără pierderea unităților; actualizare și incident vizibile; fără secrete/client data în frontend.
Sumarul zilnic se bazează exclusiv pe calcule verificabile. Varianta inițială poate fi un șablon determinist. Dacă LLM este introdus, afirmațiile numerice sunt validate și există fallback fără LLM.

## Scope și lansare
Preview de consum: toate cele patru pagini funcționează pentru datele disponibile, fără promisiunea extensiilor finalizate.
Lansare extinsă: PV/eolian și context complet numai după audit și verificare proprie.
Postarea descrie exact ce este live, ce este backtest și ce este planificat; menționează inspirația. Comercializarea nu face parte din această etapă.

## Decizii deschise
Stack/hosting; design vizual; ora de emitere și disponibilitatea benchmark-ului; rezoluția nativă; export/licențe; pragul de istoric live pentru postare. Nu se aleg tacit în acest document.
