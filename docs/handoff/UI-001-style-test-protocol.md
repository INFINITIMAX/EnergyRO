# UI-001 — protocol manual stilizare

Acest protocol este pentru planner în browser local; testerul nu a rulat comenzi/browser.

## Viewport și capturi
- Deschide prototipul local și capturează desktop 1280px și mobil 320px.
- Verifică cele 4 pagini: Prognoză, Sistem energetic, Evaluare, Metodologie.
- Verifică cele 5 scene principale prin zilele 0..4: senin, ploaie, furtună, ninsoare, noapte.
- Confirmă lipsa overflow-ului documentului; scroll local în grafic/tabele este permis.

## Contrast și lizibilitate
- Verifică contrastul efectiv pentru text, nav, DEMO badge, hero MW, panouri glass, warnings, legendă, tabel și focus pe toate scenele.
- Nu accepta doar clasele CSS ca dovadă de contrast; inspectează vizual sau cu unelte dedicate.
- Verifică opțiunile native ale selecturilor RO/EN și oră pe teme luminoase/întunecate.

## Tastatură, focus, touch
- Tab/Shift+Tab de la începutul paginii; skip-link trebuie să ducă la conținut.
- Focus vizibil pe nav, limbă, pauză, zile, slider, tabel, butoane orare.
- Sliderul orei trebuie să răspundă la ArrowLeft/ArrowRight și să sincronizeze hero, grafic, tabel și selectorul global.
- Pe touch/mobil, verifică selectarea pe grafic, scroll local al graficului/tabelelor și ținte de minim 44px.

## Date și goluri
- Ziua 3, ora 11 local: oficial este Lipsă și apare warningul de neimputare.
- Ziua 4, ora 04 local: observat este Lipsă în citirea graficului/tabel.
- Evaluare: suport comun 166 / 168 și 2 intervale excluse.
- Confirmă că metadata/proveniența păstrează issued_at, target_time, model_version și sursa.

## Fallback și motion
- Verifică fallback fără canvas: fundalurile CSS trebuie să rămână utilizabile.
- Verifică fallback fără backdrop-filter/blur și `prefers-reduced-transparency` dacă browserul permite.
- Pauză animație: aria-pressed, clasa `.is-paused` și oprire vizuală a canvasului.
- `prefers-reduced-motion: reduce`: clasa `.motion-reduced`, indicatorul UI și lipsa tranzițiilor decorative.
- Tab ascuns: verifică explicit că RAF/canvas nu continuă să animeze când documentul este hidden.

## Erori runtime
- Monitorizează `console.error` și `pageerror` pe durata interacțiunilor.
- Screenshoturile și observațiile browser sunt necesare separat de scriptul automat și de testele pure/build.
