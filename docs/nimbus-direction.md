# UI-001 — referință vizuală Nimbus
Status: referință preferată explicit de utilizator; adaptare propusă, fără cod
Data: 29-09-2026
Referință: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/012-nimbus-weather.html
Screenshot inspectat: docs/evidence/nimbus-reference.png. Captură la 1440×1000, scenă de zi; celelalte scene nu au fost încă inspectate.

## Ce păstrăm ca intenție vizuală
Canvas atmosferic pe întregul viewport; carduri translucide; numerale mari și subțiri; tipografie aerisită; grafice integrate în suprafețe; bandă temporală selectabilă; culori care se adaptează scenei.
Preferința utilizatorului înlocuiește selectorul vizual anterior. Nu este nevoie de alegere din lista anterioară. React rămâne confirmat.

## Adaptare la EnergyRO
- Zona principală: consumul estimat pentru ora selectată, unitate MW și dată/oră explicite; nu sumă de consum ambiguă.
- Panou context: meteo relevant și indicatori energetici, cu proveniență; nu reutilizăm maree/temperatura mării fără scop.
- Panou de comparație: model, oficial, baseline și abatere demonstrativă, fără a inventa performanță live.
- Grafic dominant: ziua selectată, serii cu etichete și stiluri distincte; detalii sincronizate la hover/tastatură.
- Bandă zile: schimbă datele demo și scena atmosferică; zile fără model real nu se prezintă drept forecast disponibil.
- Pagini Sistem energetic, Evaluare, Metodologie în același limbaj; suprafețe mai opace pentru tabele/text lung.

## Siguranțe
DEMO permanent și explicație vizibilă că toate valorile energetice sunt sintetice. Fundalul nu pretinde o singură «vreme a României». În prototip, scena este ilustrativă și explicit etichetată, nu o concluzie despre sistem.
Nu echivalăm furtuna atmosferică cu risc energetic, lipsă de curent sau predicție de preț.
Canvas decorativ aria-hidden; numere reale în text accesibil, chiar dacă grafica este SVG. Reduced-motion oprește mișcarea; fallback fără canvas/blur; contrast minim în toate scenele; animație pauzată în tab inactiv; mobil cu buget de particule redus.
Nu copiem implementarea originală înainte de verificarea licenței. Cod și active proprii; screenshot doar referință, nu asset livrat.

## Următorul pas
Brief-uri coder/tester/reviewer și plan de prototip React înainte de cod, cu instalări/cache pe D:. Nu am implementat sau testat încă prototipul.
