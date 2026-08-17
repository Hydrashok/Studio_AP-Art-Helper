/* Studio_AP Art Helper
   Offline support. Bump CACHE when you ship changes, or returning
   users keep getting the old version out of their cache. */

const CACHE = "art-helper-v15";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;

  // Cache-first for the shell so the app opens instantly and works
  // with no signal. Fonts are cached on first use the same way.
  e.respondWith(
    caches.match(req).then(hit => {
      if(hit) return hit;
      return fetch(req).then(res => {
        // only stash same-origin and font responses; don't fill the
        // cache with everything the page ever touches
        const url = new URL(req.url);
        const keep = url.origin === location.origin ||
                     /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
        if(keep && res.ok){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
    })
  );
});
