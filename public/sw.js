// Service worker for the offline shell (backlog P2-1a).
//
// The app is SSR (TanStack Start on Nitro), so HTML is rendered per request
// and must never be served stale while the network is up. Navigations are
// therefore network-first, falling back to whatever page is in the cache and
// finally to /offline.html. Build assets are content-hashed and immutable,
// so those are cache-first.
//
// Nothing here caches Supabase: it is a different origin and the same-origin
// check drops it. Server functions are excluded by name as well, because a
// cached mutation response would be a correctness bug, not a slow page.
//
// To take this worker back, do not edit it and do not delete it: flip
// OFFLINE_SHELL in src/lib/pwa.ts. The app then unregisters the worker and
// deletes these caches on each phone. Tried in a real browser with
// scripts/probes/sw-check.ts.

const VERSION = "v1";
const PAGE_CACHE = `academy-pages-${VERSION}`;
const ASSET_CACHE = `academy-assets-${VERSION}`;
const OFFLINE_URL = "/offline.html";

/** Everything needed to render the offline page with no network at all. */
const PRECACHE = [OFFLINE_URL, "/icon-192.png", "/favicon-32.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      // Individually, so one missing file cannot fail the whole install and
      // leave the app with no worker at all.
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("academy-") && k !== PAGE_CACHE && k !== ASSET_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Content-hashed build output: safe to serve from cache forever.
 *
 *  Only /assets/ — every file the build emits there carries its hash in its
 *  name. An earlier version matched any .js/.css/.png by extension, which
 *  also froze the files that keep their name across releases (the icons, and
 *  anything later put in public/): a new logo would never have reached a
 *  phone that had seen the old one. */
function isImmutableAsset(url) {
  return url.pathname.startsWith("/assets/");
}

function isServerCall(url) {
  return url.pathname.startsWith("/_serverFn") || url.pathname.startsWith("/api/");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (isServerCall(url)) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Keep the last good copy of each page so a second visit works on
          // the underground, in a service lift, or on hotel back-of-house
          // wifi. Only successful HTML — an error page cached is an error
          // page served.
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          return cached ?? (await caches.match(OFFLINE_URL)) ?? Response.error();
        }),
    );
    return;
  }

  if (isImmutableAsset(url)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ??
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(ASSET_CACHE).then((cache) => cache.put(req, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // The offline page's own files: fresh from the network whenever there is
  // one, from the install-time copy when there is not.
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(
      fetch(req).catch(async () => (await caches.match(url.pathname)) ?? Response.error()),
    );
  }
});
