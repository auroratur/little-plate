/* Little Plate service worker — network-first so updates always load.
   Falls back to cache only when offline. Only runs over HTTPS/localhost. */
const CACHE = 'little-plate-v5';
const SHELL = ['./', './index.html', './manifest.webmanifest', './supabase.js', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png',
  './fonts/poppins-600.woff2', './fonts/poppins-700.woff2', './fonts/poppins-800.woff2',
  './fonts/inter-400.woff2', './fonts/inter-500.woff2', './fonts/inter-600.woff2', './fonts/inter-700.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // never touch the API
  // Network-first: always try to fetch the latest, cache it, fall back to cache offline.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
