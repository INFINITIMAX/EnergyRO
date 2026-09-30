# GIT-001 — review înainte de repository public
Status: autorizare explicită a utilizatorului pentru INFINITIMAX/EnergyRO public și primul push; deploy NU autorizat.

## Sarcină și context
Verifică preflight-ul publicării codului existent, fără modificări ale aplicației. Citește .gitignore, README.md, AGENTS.md și docs/handoff/GIT-001-preflight.md când există. Inspectează lista staged prin fișierul .pi-runtime/git-staged-manifest.txt (planner o generează), apoi fișierele urmărite relevante: cod/config package/lock, documentație și rapoarte handoff. Nu inspecta .env, credențiale sau directoarele excluse.

## Autoritate și limite
Read-only; fără shell, scriere, requests sau delegare. Nu afișa/retipări valori care par secrete, adrese e-mail personale, tokenuri sau chei. Dacă identifici risc, raportează numai calea/linia și categoria, fără valoare. Nu publica nimic; planner este singurul care execută comenzi.

## Criterii
Niciun secret/config de auth/log/transcript/cache/dependency/build în staged. Referința nimbus-reference.png și payload-urile brute Open-Meteo sunt excluse din publicare; capturile proprii UI permise, cu proveniență declarată. Docs pot include căi Windows și instrucțiuni ale proiectului, dar nu credențiale. README delimitează DEMO/local și nu inventează modele/date reale, rezultate sau licență. Nu presupune licență MIT fără aprobare. Scanul automat este euristic, nu certificare de absență totală a secretelor. Comenzile de test/build trebuie efectiv rulate de planner; nu revendica execuții proprii.

## Verdict
ACCEPTAT PENTRU PRIMUL PUSH / BLOCAT, motive exacte și riscuri reziduale. Returnează integral; planner îl transcrie în docs/handoff/GIT-001-reviewer-raport.md și adaugă decizia. Nu declara că push-ul s-a produs deja.
