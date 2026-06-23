import { useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";
import { speakEN } from "@/lib/speech";

type Term = { en: string; ipa: string; vi: string; usage: string; icon?: string };

const FALLBACK_ICON = "✨";

const LIBRARY: Record<string, Term[]> = {
  FO: [
    { en: "Pre-authorization", ipa: "/priːˌɔː.θər.aɪˈzeɪ.ʃən/", vi: "Tạm giữ hạn mức trên thẻ", usage: "May I take a pre-authorization for incidentals?", icon: "💳" },
    { en: "Late check-out", ipa: "/leɪt ˈtʃek.aʊt/", vi: "Trả phòng muộn", usage: "I'd be delighted to grant a complimentary late check-out.", icon: "🕐" },
  ],
  FB: [{ en: "Allergen", ipa: "/ˈæl.ə.dʒen/", vi: "Chất gây dị ứng", usage: "May I confirm any allergens before placing your order?", icon: "🥜" }],
  HK: [{ en: "Turndown", ipa: "/ˈtɜːrn.daʊn/", vi: "Dọn giường buổi tối", usage: "Turndown will be presented at your preferred hour.", icon: "🛏️" }],
  SW: [{ en: "Aromatherapy", ipa: "/əˌroʊ.məˈθer.ə.pi/", vi: "Liệu pháp tinh dầu", usage: "Would you prefer a calming aromatherapy blend?", icon: "🌿" }],
  GR: [{ en: "Bespoke", ipa: "/bɪˈspoʊk/", vi: "Riêng biệt theo yêu cầu", usage: "Allow us to prepare a bespoke welcome amenity.", icon: "🎁" }],
  BO: [{ en: "RevPAR", ipa: "/ˈrev.pɑːr/", vi: "Doanh thu trên phòng sẵn có", usage: "RevPAR rose seven percent year-on-year.", icon: "📈" }],
};

export function VocabSuite({ dep, week }: { dep: string; week?: string }) {
  const { awardStars } = useAcademy();
  const content = week ? getWeekContent(dep, week) : null;
  const terms: Term[] = content
    ? content.lessons.flatMap((l) =>
        l.vocabulary.map((v) => ({ en: v.word, ipa: v.phonetic, vi: v.definition, usage: v.context, icon: v.icon })),
      )
    : LIBRARY[dep.toUpperCase()] ?? LIBRARY.FO;
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function flip(i: number) {
    setFlipped((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else {
        n.add(i);
        awardStars(1);
      }
      return n;
    });
  }

  return (
    <div>
      <p className="max-w-2xl text-sm text-foreground/75">
        Tap each card to reveal phonetic spelling, premium service context, and the Vietnamese rendering. Each new card mastered earns +1 ⭐.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
        {terms.map((t, i) => {
          const isFlipped = flipped.has(i);
          return (
            <motion.div
              key={t.en}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative h-72 cursor-pointer"
              onClick={() => flip(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between border border-primary/40 bg-card p-5 shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Term {i + 1}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEN(t.en, 0.85);
                      }}
                      className="border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                      aria-label={`Play audio for ${t.en}`}
                    >
                      🔊 Audio
                    </button>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-background/40 text-4xl">
                    {t.icon || FALLBACK_ICON}
                  </div>
                  <div className="font-display text-center text-2xl text-foreground">{t.en}</div>
                  <div className="text-center text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    Chạm để lật thẻ / Tap to reveal
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 flex flex-col border border-primary bg-card p-4 shadow-xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{t.ipa}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEN(t.usage, 0.85);
                      }}
                      className="border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                      aria-label={`Play example for ${t.en}`}
                    >
                      🔊 Audio
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/40 text-2xl">
                      {t.icon || FALLBACK_ICON}
                    </div>
                    <div className="font-display text-xl text-primary">{t.en}</div>
                  </div>
                  <p className="mt-3 text-xs italic text-foreground/85">"{t.usage}"</p>
                  <div className="mt-auto border-t border-primary/20 pt-2 text-xs text-foreground/75">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">VI · </span>
                    {t.vi}
                  </div>
                  <div className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    Chạm để lật thẻ / Tap to reveal
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
