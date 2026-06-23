import { useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";

type Term = { en: string; ipa: string; vi: string; usage: string };

const LIBRARY: Record<string, Term[]> = {
  FO: [
    { en: "Pre-authorization", ipa: "/priːˌɔː.θər.aɪˈzeɪ.ʃən/", vi: "Tạm giữ hạn mức trên thẻ", usage: "May I take a pre-authorization of $200 per night for incidentals?" },
    { en: "Incidental charges", ipa: "/ˌɪn.sɪˈden.təl ˈtʃɑːr.dʒɪz/", vi: "Phụ phí phát sinh", usage: "These cover any incidental charges during your stay." },
    { en: "Rollaway bed", ipa: "/ˈroʊl.ə.weɪ bed/", vi: "Giường phụ di động", usage: "Shall I arrange a rollaway bed for the young guest?" },
    { en: "Late check-out", ipa: "/leɪt ˈtʃek.aʊt/", vi: "Trả phòng muộn", usage: "I'd be delighted to grant a complimentary late check-out until 4pm." },
    { en: "Concierge", ipa: "/ˌkɒn.siˈɛərʒ/", vi: "Trợ lý quản gia", usage: "Our concierge will curate your evening's itinerary." },
    { en: "Turn-down service", ipa: "/ˈtɜːrn.daʊn ˈsɜːr.vɪs/", vi: "Dịch vụ chuẩn bị giường đêm", usage: "Turn-down service is offered nightly between 7 and 9pm." },
  ],
  FB: [
    { en: "Amuse-bouche", ipa: "/əˈmjuːz buːʃ/", vi: "Món khai vị bếp trưởng tặng", usage: "Please enjoy this amuse-bouche, compliments of the chef." },
    { en: "Sommelier", ipa: "/səˈmɛl.jeɪ/", vi: "Chuyên gia rượu vang", usage: "May I invite our sommelier to recommend a pairing?" },
    { en: "Mise en place", ipa: "/ˌmiːz ɒ̃ ˈplæs/", vi: "Sắp đặt sẵn sàng", usage: "All mise en place is verified before service opens." },
    { en: "Allergen", ipa: "/ˈæl.ə.dʒen/", vi: "Chất gây dị ứng", usage: "May I confirm any allergens before placing your order?" },
  ],
  HK: [
    { en: "Turndown", ipa: "/ˈtɜːrn.daʊn/", vi: "Dọn giường buổi tối", usage: "Turndown will be presented at your preferred hour." },
    { en: "Linen change", ipa: "/ˈlɪn.ɪn tʃeɪndʒ/", vi: "Thay khăn trải giường", usage: "A fresh linen change is performed daily upon request." },
    { en: "Do Not Disturb", ipa: "/duː nɒt dɪˈstɜːrb/", vi: "Không làm phiền", usage: "We shall honour your Do Not Disturb at all times." },
  ],
  SW: [
    { en: "Hydrotherapy", ipa: "/ˌhaɪ.drəˈθer.ə.pi/", vi: "Liệu pháp nước", usage: "Our hydrotherapy circuit is reserved exclusively for our guests." },
    { en: "Aromatherapy", ipa: "/əˌroʊ.məˈθer.ə.pi/", vi: "Liệu pháp tinh dầu", usage: "Would you prefer a calming or rejuvenating aromatherapy blend?" },
  ],
  GR: [
    { en: "Bespoke", ipa: "/bɪˈspoʊk/", vi: "Riêng biệt theo yêu cầu", usage: "Allow us to prepare a bespoke welcome amenity for your arrival." },
    { en: "VIP profile", ipa: "/ˌviː.aɪˈpiː ˈproʊ.faɪl/", vi: "Hồ sơ khách VIP", usage: "Your VIP profile has been shared with every touchpoint." },
  ],
  BO: [
    { en: "RevPAR", ipa: "/ˈrev.pɑːr/", vi: "Doanh thu trên phòng sẵn có", usage: "RevPAR rose seven percent year-on-year." },
    { en: "Forecast", ipa: "/ˈfɔːr.kæst/", vi: "Dự báo doanh thu", usage: "The forecast for the festive period remains favourable." },
  ],
};

export function VocabSuite({ dep, week }: { dep: string; week?: string }) {
  const { awardStars } = useAcademy();
  const content = week ? getWeekContent(dep, week) : null;
  const terms: Term[] = content
    ? content.lessons.flatMap((l) =>
        l.vocabulary.map((v) => ({ en: v.word, ipa: v.phonetic, vi: v.definition, usage: v.context })),
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
              className="relative h-56 cursor-pointer"
              onClick={() => flip(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center border border-primary/40 bg-card p-6 shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Term {i + 1}</div>
                  <div className="font-display mt-4 text-3xl text-foreground">{t.en}</div>
                  <div className="mt-auto text-[10px] uppercase tracking-[0.25em] text-foreground/50">Tap to reveal</div>
                </div>
                <div
                  className="absolute inset-0 flex flex-col border border-primary bg-card p-5 shadow-xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{t.ipa}</div>
                  <div className="font-display mt-2 text-xl text-primary">{t.en}</div>
                  <p className="mt-2 text-xs italic text-foreground/85">"{t.usage}"</p>
                  <div className="mt-auto border-t border-primary/20 pt-2 text-xs text-foreground/75">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">VI · </span>
                    {t.vi}
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
