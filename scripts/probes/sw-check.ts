// Tries public/sw.js in a real browser.
//
// The worker cannot be exercised by `bun run dev` (it is registered in
// production builds only) and the production build has no local server. So
// this serves the real public/ folder — the worker, the offline page, the
// icons — next to a handful of made-up pages and files, and can cut its own
// network on request. The removal step calls the real removeOfflineShell
// from src/lib/pwa.ts, transpiled on the way out.
//
//   bun scripts/probes/sw-check.ts [port]     (default 8093)
//
// Then open http://localhost:8093/__run in a browser. The page runs every
// check, shows the list, and reports it back here, where it is printed.
// Headless, with a throwaway profile:
//
//   msedge --headless=new --user-data-dir=<empty dir> --remote-debugging-port=9333 http://localhost:8093/__run
//
// (Claude's built-in browser pane cannot register a service worker.)
//
// "Network gone" is a dropped connection, not an error page: a 500 is still
// a response, and the worker only falls back when fetch itself fails.

import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";

const PORT = Number(process.argv[2] ?? 8093);
const ROOT = resolve(import.meta.dirname, "..", "..");
const PUBLIC = resolve(ROOT, "public");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
};

let offline = false;
const hits = new Map<string, number>();

const page = (path: string, served: number) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>sw-check ${path}</title></head>
<body><h1>${path}</h1><p>Served <b id="served">${served}</b> time(s).</p></body></html>`;

// Runs in the browser. Kept as a function so it is linted and formatted
// like the rest of the file, then shipped as text.
async function runner() {
  type Line = { name: string; ok: boolean; detail: string };
  const out: Line[] = [];
  const check = (name: string, ok: unknown, detail: unknown = "") =>
    out.push({ name, ok: !!ok, detail: String(detail) });

  /** Open a path the way a tap on a link does (a navigation), and read it. */
  const open = (path: string) =>
    new Promise<{ title: string; served: string | null }>((done) => {
      const f = document.createElement("iframe");
      const read = () => {
        let title = "UNREADABLE";
        let served: string | null = null;
        try {
          title = f.contentDocument?.title ?? "UNREADABLE";
          served = f.contentDocument?.getElementById("served")?.textContent ?? null;
        } catch {
          /* a browser error page is cross-origin */
        }
        f.remove();
        done({ title, served });
      };
      f.onload = read;
      f.onerror = read;
      f.src = path;
      document.body.appendChild(f);
    });
  const text = (path: string) =>
    fetch(path).then(
      (r) => (r.ok ? r.text() : `HTTP ${r.status}`),
      () => "FAILED",
    );
  const hitCount = () => fetch("/__hits").then((r) => r.json() as Promise<Record<string, number>>);
  const network = (on: boolean) => fetch(`/__offline/${on ? "off" : "on"}`);

  try {
    await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise((r) =>
        navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }),
      );
    check("the worker takes control of the page", !!navigator.serviceWorker.controller);

    const stored = (await (await caches.open("academy-pages-v1")).keys()).map(
      (r) => new URL(r.url).pathname,
    );
    check(
      "the offline page and its two icons are stored at install",
      ["/offline.html", "/icon-192.png", "/favicon-32.png"].every((p) => stored.includes(p)),
      stored.join(", "),
    );

    const first = await open("/page-a");
    for (const p of ["/assets/app-3f9c1a.js", "/unhashed.js", "/api/ping", "/_serverFn/abc"]) {
      await text(p);
      // The worker answers before it has finished storing its copy, so a
      // second load in the same instant would still go to the server.
      await new Promise((r) => setTimeout(r, 300));
      await text(p);
    }
    const h = await hitCount();
    check(
      "a hashed build file is fetched once, then served from the device",
      h["/assets/app-3f9c1a.js"] === 1,
      `${h["/assets/app-3f9c1a.js"]} request(s) for 2 loads`,
    );
    check(
      "a file that keeps its name across releases is fetched every time",
      h["/unhashed.js"] === 2,
      `${h["/unhashed.js"]} request(s) for 2 loads`,
    );
    check("an /api/ call always reaches the server", h["/api/ping"] === 2, h["/api/ping"]);
    check(
      "a server function always reaches the server",
      h["/_serverFn/abc"] === 2,
      h["/_serverFn/abc"],
    );

    await network(false);
    const again = await open("/page-a");
    check(
      "network gone: a page opened before is still there",
      again.title === "sw-check /page-a" && again.served === first.served,
      `"${again.title}", copy ${again.served}`,
    );
    const never = await open("/page-b");
    check(
      "network gone: a page never opened becomes the offline page",
      never.title.startsWith("Không có mạng"),
      `"${never.title}"`,
    );
    const kept = await text("/assets/app-3f9c1a.js");
    check("network gone: the hashed file still loads", kept.includes("served 1"), kept);
    check(
      "network gone: the offline page's icon still loads",
      await fetch("/icon-192.png").then(
        (r) => r.ok,
        () => false,
      ),
    );
    check(
      "network gone: an /api/ call fails; no cache answers for it",
      (await text("/api/ping")) === "FAILED",
    );
    check("network gone: a server function fails too", (await text("/_serverFn/abc")) === "FAILED");
    check(
      "network gone: an unhashed file fails rather than going stale",
      (await text("/unhashed.js")) === "FAILED",
    );

    await network(true);
    const fresh = await open("/page-a");
    check(
      "network back: the page comes fresh from the server again",
      Number(fresh.served) === Number(first.served) + 1,
      `copy ${first.served} → ${fresh.served}`,
    );

    // What OFFLINE_SHELL = false does on each phone — the real function.
    const pwa = (await import("/__pwa.js" as string)) as { removeOfflineShell(): Promise<void> };
    await pwa.removeOfflineShell();
    check(
      "removal: no worker is registered",
      (await navigator.serviceWorker.getRegistrations()).length === 0,
    );
    const left = (await caches.keys()).filter((k) => k.startsWith("academy-"));
    check("removal: no cache is left", left.length === 0, left.join(", "));
  } catch (e) {
    check("the run finished without an error", false, e);
  }

  document.getElementById("result")!.textContent = out
    .map((l) => `${l.ok ? "PASS" : "FAIL"}  ${l.name}${l.detail ? `  — ${l.detail}` : ""}`)
    .join("\n");
  document.title = out.every((l) => l.ok) ? "sw-check: all passed" : "sw-check: FAILED";
  await fetch("/__result", { method: "POST", body: JSON.stringify(out) });
}

const transpile = (source: string) => new Bun.Transpiler({ loader: "ts" }).transformSync(source);

const RUN_PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>sw-check: running</title></head>
<body><h1>public/sw.js in this browser</h1><pre id="result">running…</pre>
<script type="module">${transpile(`(${runner.toString()})();`)}</script>
</body></html>`;

let lastResult = "[]";

createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const path = url.pathname;
  const send = (type: string, body: string | Buffer) => {
    res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
    res.end(body);
  };

  // The controls answer even with the network "gone" — they are how it
  // comes back, and how the result gets out.
  if (path === "/__offline/on" || path === "/__offline/off") {
    offline = path.endsWith("/on");
    return send("application/json", JSON.stringify({ offline }));
  }
  if (path === "/__hits") return send("application/json", JSON.stringify(Object.fromEntries(hits)));
  if (path === "/__run") return send(TYPES[".html"], RUN_PAGE);
  if (path === "/__pwa.js")
    return send(TYPES[".js"], transpile(readFileSync(resolve(ROOT, "src/lib/pwa.ts"), "utf8")));
  if (path === "/__result") {
    if (req.method !== "POST") return send("application/json", lastResult);
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      lastResult = body;
      const lines = JSON.parse(body) as { name: string; ok: boolean; detail: string }[];
      for (const l of lines)
        console.log(`${l.ok ? "PASS" : "FAIL"}  ${l.name}${l.detail ? `  — ${l.detail}` : ""}`);
      const failed = lines.filter((l) => !l.ok).length;
      console.log(`\n${lines.length - failed} passed, ${failed} failed`);
      send("application/json", "{}");
    });
    return;
  }

  if (offline) {
    req.socket.destroy();
    return;
  }

  const n = (hits.get(path) ?? 0) + 1;
  hits.set(path, n);

  const file = resolve(PUBLIC, "." + path);
  if (path !== "/" && file.startsWith(PUBLIC) && existsSync(file))
    return send(TYPES[extname(file)] ?? "application/octet-stream", readFileSync(file));
  if (path.startsWith("/assets/") || path === "/unhashed.js")
    return send(TYPES[".js"], `// ${path}, served ${n}`);
  if (path.startsWith("/api/") || path.startsWith("/_serverFn"))
    return send("application/json", JSON.stringify({ path, served: n }));
  send(TYPES[".html"], page(path, n));
}).listen(PORT, () => console.log(`sw-check: open http://localhost:${PORT}/__run`));
