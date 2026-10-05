// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside the Lovable sandbox the deploy plugin is skipped unless `nitro` is set
// explicitly, and its default target is Cloudflare. Force-enable it and pick the
// host from the build environment: Vercel sets VERCEL=1 on every build, and then
// `vite build` writes .vercel/output (Build Output API); anywhere else it emits the
// Netlify SSR server + static client as before. On Vercel the SSR function runs in
// Singapore (sin1), next to the Supabase project (ap-southeast-1); Vercel's default
// region is Washington, which puts every server-side query across the Pacific.
//
// Declared outside the call on purpose: the wrapper's type lists only preset/output/
// cloudflare, but it spreads the whole object into nitro(), so `vercel` reaches
// Nitro's Vercel preset (checked: .vc-config.json gets "regions": ["sin1"]).
const nitro = {
  preset: process.env.VERCEL ? "vercel" : "netlify",
  vercel: { functions: { regions: ["sin1"] } },
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro,
});
