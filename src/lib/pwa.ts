// THE OFFLINE SHELL'S ONE SWITCH (backlog P2-1a).
//
// A service worker is the one part of this app that a revert does not take
// back: it lives on every phone that has opened the app, and keeps running
// there after the code that registered it is gone. So there is a switch.
//
// To take the offline shell back: set OFFLINE_SHELL to false and deploy.
// Each phone then unregisters the worker and deletes its caches the next
// time it opens the app — no second release, nothing to hand-craft in
// public/sw.js. The home-screen icon is not affected: that is the manifest.
export const OFFLINE_SHELL = true;

/** Every cache public/sw.js creates starts with this. */
const CACHE_PREFIX = "academy-";

/** Register the worker, or — with the switch off — remove what an earlier
 *  release left on this device. Production builds only: dev serves modules
 *  unbundled, where a caching worker turns every edit into a stale-file hunt. */
export function syncOfflineShell(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;
  if (!OFFLINE_SHELL) {
    void removeOfflineShell();
    return;
  }
  navigator.serviceWorker.register("/sw.js").catch(() => {
    // An unavailable worker costs the offline shell and nothing else.
  });
}

export async function removeOfflineShell(): Promise<void> {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((r) => r.unregister()));
    if (typeof caches !== "undefined") {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith(CACHE_PREFIX)).map((k) => caches.delete(k)),
      );
    }
  } catch {
    // Nothing was registered, or storage is blocked: nothing to remove.
  }
}

/** Where the install banner may show: the pages a learner passes through,
 *  never the ones they work on.
 *
 *  The banner is fixed to the bottom of the screen until dismissed. Inside a
 *  lesson that is where the arcade's bubbles travel and where "Câu tiếp" and
 *  the microphone sit, and it would appear at the very moment a result is on
 *  screen — the first finished suite is what earns it. */
export function isLobbyPath(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/department/");
}
