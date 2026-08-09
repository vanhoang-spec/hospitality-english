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

/** Content-hashed build output: safe to serve from cache forever. */
function isImmutableAsset(url) {
  return (
    url.pathname.startsWith("/_build/") ||
    url.pathname.startsWith("/assets/") ||
    /\.(?:js|css|woff2?|png|svg|webp|jpg|jpeg|ico)$/.test(url.pathname)
  );
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
  }
});
