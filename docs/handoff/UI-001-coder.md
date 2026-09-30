# UI-001 — coder

## Sarcină și context
Construiește prototipul React autorizat în D:\EnergyRO\prototype. Citește AGENTS.md, PRODUCT.md, docs/ui-build-plan.md, docs/UI-GATES.md și docs/nimbus-direction.md. Referința screenshot este docs/evidence/nimbus-reference.png; inspecteaz-o cu read. Nu copia codul site-ului.

## Rezultat așteptat
Aplicație completă React/Vite cu patru pagini, RO/EN și date sintetice deterministe. Nimbus este preferință explicită: canvas atmosferic full viewport cu clear/rain/storm/snow/night, crossfade, carduri frosted-glass și cer luminos de iarnă pentru prima zi. Scenele întunecate au text deschis, cele luminoase navy. Respinge aspectul generic admin/slate/neon. Fonduri suficient de opace pentru contrast.
Prognoză: valoare mare MW subțire accesibilă, oră selectată, data DD-MM-YYYY, context meteo DEMO, comparație model/oficial/baseline; grafic SVG 24h cu legendă, mouse/touch/tastatură și alternativă tabel; șapte zile selectabile care modifică seriile și scenele. Sistem energetic: mix sintetic consistent, consum/import-export explicit demo. Evaluare: funcții reale MAE/bias/RMSE cu suport comun și N, dar date sintetice clar marcate; fără procent accuracy fals. Metodologie: surse planificate, demo, lipsuri, pașii următori. DEMO vizibil pe toate paginile, fără claims de model live, conexiune ENTSO-E sau prognoză reală.
Buton pauză/animație; reduced-motion și tab visibility opresc RAF; cleanup react; fallback canvas/blur; mobil cu particule limitate; aria-hidden pe decor. Nu anima fulgere cu flash rapid. RO/EN pentru interfață. CSS responsive, tastatură, etichete accesibile, focus și hover, fără font CDN.

## Fișiere și limite
Poți crea/edita exclusiv prototype/package.json, prototype/index.html, prototype/vite.config.js, prototype/src/**, prototype/README.md și docs/handoff/UI-001-coder-raport.md. NU tests (tester scrie), documente de produs, evidențe, .env, .pi, .impeccable, alte proiecte sau fișierele altor agenți.
Package scripts: dev Vite cu host 127.0.0.1 și port 5173, build vite build, test node --test tests/*.test.js. metrics.js și demo-data.js trebuie importabile de Node ESM fără JSX/DOM. Include types/module și versiuni compatibile pentru React/Vite/plugin; niciun script de install/postinstall propriu. Folosește dependențe minimale.

## Constrângeri ferme
NU rula comenzi: nici bash, shell, PowerShell, npm, node, browser sau request de rețea. Doar read/find/grep/ls și write/edit. Nu delega. Nu instala; nu pretinde că teste/build trec. Totul pe D:. Nu există client sau API token.

## Raport
Scrie docs/handoff/UI-001-coder-raport.md cu status explicit, fișiere modificate, decizii, limitări și verificări cerute planner-ului. Nu transforma propuneri în dovezi. La final răspunde cu calea raportului.
