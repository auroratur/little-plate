# 🍽️ Little Plate — Toddler Food Tracker

A private, phone-friendly web app to track what your toddler eats. Snap a photo of
her plate **before** and **after** a meal; Claude's vision model reads both, lists
each food, and estimates how much she ate. You review, tweak, and save. Everything
is stored **on your phone** — no accounts, no cloud database.

## What it does

- 📸 Before/after plate photos (uses your phone camera)
- ✨ AI identifies each food and estimates how much was eaten
- ✏️ Edit anything before saving (rename foods, drag the "eaten" slider, add notes)
- 📅 History grouped by day, with the photos
- 💾 100% local storage (IndexedDB) + JSON export/backup
- 📱 "Add to Home Screen" to feel like a native app

## One-time setup

1. **Get an Anthropic API key** at https://console.anthropic.com/settings/keys
   (Tip: set a monthly **spend limit** in the console — this key lives on your phone.)
2. Open the app (see "Running it" below).
3. Go to **Settings**, paste the key, tap **Test** → it should say "Key works!"

That's it. Now on the **Log** tab: add both photos → **Analyze with AI** → review → **Save**.

## Running it

The app is just static files (`index.html` + a few helpers). Two options:

### Option A — quick, on your home Wi-Fi (no accounts)
On your Mac, in this folder:
```bash
python3 -m http.server 8000
```
Find your Mac's local IP (System Settings → Wi-Fi → Details → IP address, e.g.
`192.168.1.42`), then on your phone (same Wi-Fi) open:
```
http://192.168.1.42:8000/index.html
```
Tap the browser's Share → **Add to Home Screen**.

- ✅ Camera capture and AI analysis both work over this plain-HTTP URL.
- ⚠️ Your Mac must be on and running the server. Offline caching is disabled on
  plain HTTP (that's fine — the app still works whenever the Mac is up).

### Option B — always available (recommended long-term)
Deploy the folder to any free static host over HTTPS, then bookmark that URL on
your phone. No Mac needed afterward, and you get full offline/PWA behavior.

- **Netlify Drop** — drag this folder onto https://app.netlify.com/drop
- **Cloudflare Pages** or **GitHub Pages** also work — just serve these files as-is.

Once hosted, open the HTTPS URL on your phone and Add to Home Screen.

## Cost

Each analysis sends two downsized photos + a short prompt and gets a small JSON
reply back. Rough ballpark on the default **Opus 4.8**: a few cents per meal.
Switch the model to **Sonnet 5** or **Haiku 4.5** in Settings to cut that
significantly if you log many meals a day.

## Privacy

- Photos and logs never leave your device **except** the two photos sent to
  Anthropic for a single analysis call.
- Your API key is stored only in your phone's browser (localStorage).
- Data lives in your browser's IndexedDB. Clearing the browser's site data (or
  the in-app **Clear all data**) erases it — export a JSON backup first if you
  want to keep it.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app (UI + logic, self-contained) |
| `manifest.webmanifest` | Makes it installable / "Add to Home Screen" |
| `sw.js` | Service worker — offline caching (HTTPS only) |
| `icon.svg` | App icon |

## Notes / ideas for later

- Weekly summary of favorite / rejected foods
- Allergy or "new food" flags
- Multiple kids
- Charts of variety over time

Just ask and these can be added.
