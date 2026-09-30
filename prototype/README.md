# EnergyRO — prototip local DEMO

React + Vite, CSS propriu, SVG pentru grafic și canvas exclusiv decorativ. Patru pagini locale: Prognoză, Sistem energetic, Evaluare și Metodologie; RO/EN, selecție comună zi/oră și cinci scene ilustrative. Fără fonturi externe, active Nimbus copiate sau biblioteci UI noi.

## Pornire PowerShell — exclusiv pe D:

Instrucțiuni pentru planner, nu comenzi executate în etapa de stilizare. Node/npm trebuie să fie deja disponibile; fără instalări globale. Din PowerShell:

```powershell
Set-Location D:\EnergyRO\prototype
New-Item -ItemType Directory -Force D:\tmp, D:\EnergyRO\.npm-cache | Out-Null
$env:TEMP = 'D:\tmp'
$env:TMP = 'D:\tmp'
$env:npm_config_cache = 'D:\EnergyRO\.npm-cache'

# Numai dacă dependențele locale trebuie refăcute, pe baza lockfile-ului existent:
npm ci --ignore-scripts --no-audit --no-fund --cache D:\EnergyRO\.npm-cache

npm test
npm run build
npm run dev -- --strictPort
```

Dependențele sunt locale în `prototype/node_modules`, build-ul în `prototype/dist`. Serverul folosește `http://127.0.0.1:5173`, nu este deploy. Oprire cu Ctrl+C. Instalarea necesită acces la registry autorizat separat; nu este necesară dacă dependențele existente sunt utilizabile. Nu schimbați cache/TEMP spre C: și nu instalați global.

## Date și limite

- Toate valorile energetice sunt **sintetice**, nu date live și nu prognoze operaționale. Nu există backend, model antrenat, integrare ENTSO-E/Open-Meteo sau cereri energetice la rețea.
- Fixture determinist: 07-12-2026…13-12-2026, 168 ore UTC. Este o mostră fixă de iarnă, nu un generator general de zile DST. Afișare locală Europe/Bucharest, date DD-MM-YYYY; proveniență UTC, `issued_at`, `target_time`, `model_version`, sursă.
- MW reprezintă putere, nu energie în MWh. Componenta solară nu este PV măsurat sau estimarea producției prosumatorilor. Cerul este ilustrativ, nu vremea întregii Românii și nu indică blackout.
- Metricile sunt calcule pe suport comun sintetic, nu dovezi de precizie pe date reale. Cele două goluri intenționate sunt oficial la 09-12-2026 11:00 și observat la 10-12-2026 04:00, local. Suportul comun așteptat din fixture este 166/168.
- **Neconcordanță păstrată:** la 09-12-2026 11:00, `row.official` este `null`, deși `row.forecasts.official.value` este numeric. UI și evaluarea folosesc seria, fără imputare din metadate; avertizarea contextuală și Metodologia explică diferența. Corectarea fixture-ului necesită task separat.

## Prezentare și accesibilitate intenționată

Cer fixed pe viewport, fără pointer events, cinci straturi cu crossfade și fallback CSS static fără canvas. Suprafețe light/navy pe clear/snow, pale/navy în scene întunecate. Glass suficient de opac, cu fallback solid fără suport blur sau cu `prefers-reduced-transparency`. Decorul CSS nu are mișcare continuă; pauza și reduced-motion elimină crossfade-ul. Componenta canvas existentă gestionează RAF, pauza, reduced-motion și tab-ul ascuns; CSS nu pretinde un hook pentru vizibilitatea tab-ului.

Numerele sunt text real, nu imagini. Selectarea are border/linie/`aria-pressed`, nu doar hover. Focus vizibil, skip-link, controale păstrate la mobil, serii SVG cu stiluri de linie distincte, cursor orar pentru tastatură și tabel alternativ. La mobil graficul păstrează lățime minimă **doar în panoul cu scroll local**, iar tabelele au scroll propriu. Banda zilelor este după conținutul paginii (după grafic la Prognoză); pe mobil se așază în mai multe rânduri. Proveniența lungă se încadrează în coloane.

Acestea sunt intenții implementate, **nu certificare de accesibilitate**. Nu s-au rulat comenzi, teste, build sau browser în etapa CSS. Rezultatele anterioare din raportul recovery-planner nu validează această etapă.

## Verificări necesare planner-ului

Reexecutare `npm test` și `npm run build`; apoi browser separat la 1440×1000, 1280×800, 390×844 și lățime 320px. Verificați toate paginile în RO/EN și toate scenele, contrastul efectiv inclusiv grafic/legende/select/options, lipsa overflow-ului documentului, scroll local SVG/tabele și vizibilitatea focusului. Testați tastatura, sliderul, pointerul/tabelul, sincronizarea zi/oră, golul oficial și avertizarea sa, pauza/reluarea, reduced-motion, tab ascuns și fallback fără canvas/blur. Capturi și verificarea erorilor runtime sunt încă necesare. Fără deploy sau afirmații de validare browser înainte de dovezi.
