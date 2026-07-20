import { createFileRoute } from "@tanstack/react-router";

// Placeholder — full dashboard (member table, add/delete/reset-password,
// progress matrix) lands in Phase 5. Kept as a minimal route now so
// AcademyNav's "Team" link type-checks against the route tree.
export const Route = createFileRoute("/org-admin")({
  head: () => ({ meta: [{ title: "Team — Embassy Language" }] }),
  component: OrgAdminPlaceholder,
});

function OrgAdminPlaceholder() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:px-10">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">Team</div>
      <h1 className="font-display mt-3 text-4xl text-foreground">Đang xây dựng</h1>
      <p className="mt-2 text-sm text-foreground/70">Bảng quản trị thành viên sẽ có mặt tại đây sớm.</p>
    </main>
  );
}
