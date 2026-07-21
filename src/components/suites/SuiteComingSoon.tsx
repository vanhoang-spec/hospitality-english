// Shown by every suite when the requested week has no authored content
// yet. Replaces the old per-suite generic fallbacks, which made empty
// weeks look like real lessons (audit finding: fake progress illusion).
export function SuiteComingSoon() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <div className="text-4xl">📝</div>
      <h2 className="font-display mt-4 text-2xl text-foreground">Nội dung tuần này đang được biên soạn</h2>
      <p className="mt-2 text-sm text-foreground/70">
        Giáo trình 40 tuần (pre-A1 → B1 nghiệp vụ khách sạn) đang được xây dựng theo lộ trình.
        Tuần này chưa có bài học — hãy quay lại tuần đã mở để luyện tập.
      </p>
    </div>
  );
}
