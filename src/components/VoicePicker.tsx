// The voice picker: which English voice reads the guest's lines and which
// reads the model lines, and how fast. Opened from 🔊 in the nav or from the
// "Đổi giọng" button beside a listen button; mounted once in __root.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SAMPLE_LINE,
  describeVoice,
  effectiveRate,
  pickVoice,
  rankVoices,
  suggestedVoice,
  type Speed,
  type VoiceRole,
} from "@/lib/voice";
import {
  closeVoicePicker,
  openVoicePicker,
  setVoicePrefs,
  useDeviceVoices,
  useVoicePicker,
  useVoicePrefs,
} from "@/lib/voice-store";

const ROLES: { id: VoiceRole; label: string; hint: string }[] = [
  { id: "guest", label: "Giọng khách", hint: "Lời khách, đồng nghiệp, cấp trên nói với bạn." },
  { id: "model", label: "Giọng mẫu", hint: "Từ vựng, câu ví dụ và câu mẫu để bạn nói theo." },
];

const SPEEDS: { id: Speed; label: string }[] = [
  { id: "slow", label: "Chậm" },
  { id: "normal", label: "Vừa" },
  { id: "fast", label: "Nhanh" },
];

/** The rate the sample is played at: the middle of the course's ladder. */
const SAMPLE_RATE = 0.85;

const PILL =
  "border px-3 py-2 text-xs transition-colors aria-checked:border-primary aria-checked:bg-primary/15 aria-checked:text-primary";

/** "🎚 Đổi giọng", beside a listen button. Opens the picker on `role`. */
export function VoiceButton({ role }: { role: VoiceRole }) {
  return (
    <button
      type="button"
      onClick={() => openVoicePicker(role)}
      className="border border-primary/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-primary hover:text-primary"
      aria-label="Đổi giọng đọc"
    >
      🎚 Đổi giọng
    </button>
  );
}

export function VoicePicker() {
  const open = useVoicePicker();
  const prefs = useVoicePrefs();
  const voices = useDeviceVoices();
  const [tab, setTab] = useState<VoiceRole>("model");
  const [playing, setPlaying] = useState<string | null>(null);
  // Chrome and Android fill the list in late. After two seconds of nothing,
  // say the device has no English voice instead of "loading" for ever.
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTab(open);
    setWaited(false);
    const t = setTimeout(() => setWaited(true), 2000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVoicePicker();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.speechSynthesis?.cancel();
    };
  }, [open]);

  const ranked = rankVoices(voices);
  const current = pickVoice(voices, tab, prefs);
  const suggested = suggestedVoice(voices, tab, prefs);

  function preview(v: SpeechSynthesisVoice) {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(SAMPLE_LINE[tab]);
    u.voice = v;
    u.lang = v.lang;
    u.rate = effectiveRate(SAMPLE_RATE, prefs.speed);
    u.onstart = () => setPlaying(v.voiceURI);
    u.onend = () => setPlaying(null);
    u.onerror = () => setPlaying(null);
    s.speak(u);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-3 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVoicePicker}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Giọng đọc tiếng Anh"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85vh] w-full max-w-md overflow-y-auto overscroll-contain border border-primary/40 bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary">Giọng đọc</div>
                <h2 className="font-display mt-2 text-2xl">Tiếng Anh trong bài</h2>
              </div>
              <button
                type="button"
                onClick={closeVoicePicker}
                className="border border-primary/30 px-3 py-1.5 text-xs text-foreground/70 hover:border-primary hover:text-primary"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={tab === r.id}
                  onClick={() => setTab(r.id)}
                  className={`border px-3 py-2 text-xs uppercase tracking-[0.15em] ${
                    tab === r.id
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-primary/30 text-foreground/70 hover:border-primary"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              {ROLES.find((r) => r.id === tab)?.hint}
            </p>

            {ranked.length === 0 ? (
              <p className="mt-4 border-l-2 border-primary/40 pl-3 text-sm text-foreground/75">
                {waited
                  ? "Máy này chưa có giọng đọc tiếng Anh. Xem cách cài thêm giọng ở cuối bảng."
                  : "Đang tải danh sách giọng…"}
              </p>
            ) : (
              <div
                role="radiogroup"
                aria-label={ROLES.find((r) => r.id === tab)?.label}
                className="mt-4 space-y-2"
              >
                {ranked.map((v) => {
                  const on = v === current;
                  return (
                    <div key={v.voiceURI} className="flex items-center gap-2">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() =>
                          setVoicePrefs(
                            tab === "guest" ? { guest: v.voiceURI } : { model: v.voiceURI },
                          )
                        }
                        className={`min-w-0 flex-1 truncate text-left ${PILL} ${
                          on ? "" : "border-primary/20 text-foreground/80 hover:border-primary/60"
                        }`}
                      >
                        {on ? "✓ " : ""}
                        {describeVoice(v)}
                        {v === suggested ? " · gợi ý" : ""}
                      </button>
                      <button
                        type="button"
                        onClick={() => preview(v)}
                        className="shrink-0 border border-primary/30 px-3 py-2 text-xs text-primary hover:border-primary"
                        aria-label={`Nghe thử ${describeVoice(v)}`}
                      >
                        {playing === v.voiceURI ? "🔊…" : "▶"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-foreground/60">
              Tốc độ đọc
            </div>
            <div role="radiogroup" aria-label="Tốc độ đọc" className="mt-2 grid grid-cols-3 gap-2">
              {SPEEDS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={prefs.speed === s.id}
                  onClick={() => setVoicePrefs({ speed: s.id })}
                  className={`uppercase tracking-[0.15em] ${PILL} ${
                    prefs.speed === s.id
                      ? ""
                      : "border-primary/20 text-foreground/80 hover:border-primary/60"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              Áp dụng cho mọi bài nghe, kể cả bài sát hạch. Lựa chọn được lưu trên máy này.
            </p>

            <details className="mt-6 border-l-2 border-primary/40 pl-3 text-sm text-foreground/75">
              <summary className="cursor-pointer text-foreground">Muốn giọng hay hơn?</summary>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Máy tính Windows:</strong> mở app bằng <strong>Microsoft Edge</strong> —
                  có sẵn các giọng tự nhiên (Sonia, Libby, Ryan…). Chrome trên Windows chỉ có giọng
                  máy cũ.
                </li>
                <li>
                  <strong>iPhone / iPad:</strong> Cài đặt › Trợ năng › Nội dung được đọc › Giọng nói
                  › Tiếng Anh › tải giọng có chữ <em>Nâng cao</em>.
                </li>
                <li>
                  <strong>Android:</strong> Cài đặt › Chuyển văn bản thành giọng nói › Dịch vụ lời
                  nói của Google › Cài đặt dữ liệu giọng nói › Tiếng Anh.
                </li>
              </ul>
              <p className="mt-2">Cài xong, tải lại trang rồi mở bảng này để chọn giọng mới.</p>
            </details>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
