# mmhammer.org – Website (GitHub + Vercel)

Statische HTML-Website der M+M Hammer Ltd.
Workflow: **Code auf GitHub → Vercel deployt automatisch bei jedem Push**.

---

## Erste Einrichtung – ohne Terminal, alles via GUI

### Schritt 1: Diesen Ordner zum neuen Speicherort kopieren

Im Finder: `website`-Ordner kopieren nach `/Users/michaelhammer/Projekte/mmhammer.org`
(Inhalt von `mmhammer.org` vorher leeren oder ersetzen.)

### Schritt 2: Auf GitHub pushen mit GitHub Desktop

1. **GitHub Desktop installieren** (falls noch nicht): https://desktop.github.com/
2. **Einloggen** mit deinem GitHub-Account
3. **File → Add Local Repository**, wähle `/Users/michaelhammer/Projekte/mmhammer.org`
4. Falls die Meldung "not a Git repository" kommt, klick auf den Link **„create a repository"** → bestätigen
5. Oben blauer Button **„Publish repository"** → Repo-Name z. B. `mmhammer-website` → **Publish**
6. Fertig – alle Dateien sind auf GitHub.

### Schritt 3: Vercel mit GitHub verbinden

1. Auf https://vercel.com einloggen
2. **Add New… → Project**
3. **Import Git Repository** → dein neues Repo `mmhammer-website` auswählen
4. Framework Preset: **Other** (Vercel erkennt statisches HTML automatisch)
5. **Deploy** klicken
6. Nach ~10 Sekunden ist die Seite live unter `xyz.vercel.app`

### Schritt 4: Custom Domain mmhammer.org

1. Im Vercel-Projekt: **Settings → Domains**
2. `mmhammer.org` und `www.mmhammer.org` eintragen
3. Vercel zeigt die nötigen DNS-Einträge → beim Domain-Provider eintragen
4. **Vorher**: Domain bei Google Sites entkoppeln, sonst zeigt sie weiter dorthin
5. Nach DNS-Propagation (10 Min – 24 h) ist mmhammer.org live, HTTPS automatisch

---

## Inhalt aktualisieren – ab jetzt nur noch 3 Klicks

1. HTML-Datei in TextEdit/VS Code öffnen, Text ändern, speichern
2. **GitHub Desktop** öffnen → unten links Commit-Nachricht eintippen → **Commit to main** → **Push origin**
3. Vercel deployt automatisch in ~30 Sekunden – Änderung ist live.

---

## Was ist drin

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `wohnmobil.html` | Hammer-Mobil |
| `villa-potima.html` | Villa Potima |
| `auswandern.html` | Expat-Kickstarter |
| `buecher.html` | Hammer-Bücher |
| `impressum.html` | Impressum &amp; Datenschutz |
| `styles.css` | Styling |
| `vercel.json` | saubere URLs (`/wohnmobil` statt `/wohnmobil.html`) und Redirects von Google-Sites-URLs |
| `robots.txt`, `sitemap.xml` | SEO |

## Bilder

Bilder werden direkt von Google Sites geladen (URLs in den HTML-Dateien). Sie funktionieren so wie sie sind. Falls Google sie irgendwann entfernt, kannst du die Bilder lokal ablegen und URLs ersetzen – sag Bescheid.
