// NICU Duty Sheet – offline support. Bump VERSION whenever you upload new app files.
const VERSION = "nicu-duty-v88";
const APP_FILES = ["./", "./index.html", "./manifest.webmanifest"];
const NET_WAIT = 3000; // slow hospital Wi-Fi: after 3 s use the saved copy, update in the background

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // App page: network first (to pick up updates) but never wait more than NET_WAIT when a saved copy exists
  if (req.mode === "navigate") {
    const net = fetch(req).then(r => { if (r && r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); } return r; });
    e.respondWith(caches.match("./index.html").then(saved => {
      if (!saved) return net;
      const timer = new Promise(res => setTimeout(() => res(saved), NET_WAIT));
      return Promise.race([net.catch(() => saved), timer]);
    }));
    e.waitUntil(net.catch(() => {}));
    return;
  }
  // Everything else on this site: saved copy first, refresh in the background
  if (url.origin === location.origin) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const fresh = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || fresh;
    })));
  }
});
