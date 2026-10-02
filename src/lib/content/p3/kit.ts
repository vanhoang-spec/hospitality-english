// Shared kit for the hand-authored Phase 3 weeks (one file per department).
//
// Phase 3 used to be one set of frames reading each department's bank by
// slot index, and round 1 of the blind audit (ac24e13) found what that does:
// a frame that says "For a family, I recommend the …" printed "the silk
// pillowcase" for Housekeeping and "the aged steak" for F&B; a refund frame
// printed "I cannot add ten free minutes myself" for the Spa. The frame knew
// a part of speech, never a meaning. So each department's weeks are written
// for that department, and this file only keeps the cards honest:
//
//  · A card is looked up by its word in the department's reviewed bank (or
//    the short shared list below), so its phonetic and gloss stay the ones
//    already reviewed. An unknown word THROWS — a typo fails the build
//    instead of shipping a card with no pronunciation.
//  · A new word that is in no bank has to bring its own gloss, explicitly.
import type { LessonContent, SpeakingItem, VocabItem } from "../week-content";
import { v } from "../phase0";
import { P3_BANKS } from "../phase3-lexicon";

/** Function and frame words every department's P3 teaches. */
const SHARED: Record<string, [phonetic: string, gloss: string, icon: string]> = {
  Recommend: ["/ˌrekəˈmend/", "Gợi ý, giới thiệu", "👍"],
  Instead: ["/ɪnˈsted/", "Thay vào đó", "🔄"],
  Quieter: ["/ˈkwaɪətə/", "Yên tĩnh hơn", "🤫"],
  Charge: ["/tʃɑːdʒ/", "Khoản phí", "💳"],
  Policy: ["/ˈpɒləsi/", "Chính sách, quy định", "📜"],
  Because: ["/bɪˈkɒz/", "Bởi vì", "❓"],
  Within: ["/wɪˈðɪn/", "Trong vòng (thời gian)", "⏱️"],
  "Straight away": ["/streɪt əˈweɪ/", "Ngay lập tức", "⚡"],
  "Going to": ["/ˈɡəʊɪŋ tuː/", "Sắp, dự định sẽ", "📅"],
  Colleague: ["/ˈkɒliːɡ/", "Đồng nghiệp", "🤝"],
  Transfer: ["/trænsˈfɜː/", "Chuyển (máy, việc)", "📞"],
  Arrange: ["/əˈreɪndʒ/", "Sắp xếp", "🗓️"],
  Concern: ["/kənˈsɜːn/", "Điều khách lo lắng", "😟"],
  Apologise: ["/əˈpɒlədʒaɪz/", "Xin lỗi", "🙇"],
  Disappointed: ["/ˌdɪsəˈpɔɪntɪd/", "Thất vọng", "😞"],
  Prefer: ["/prɪˈfɜː/", "Thích hơn, muốn hơn", "❤️"],
  Option: ["/ˈɒpʃn/", "Lựa chọn", "🔀"],
  Either: ["/ˈaɪðə/", "Một trong hai", "2️⃣"],
  Shift: ["/ʃɪft/", "Ca làm việc", "🕒"],
  Update: ["/ʌpˈdeɪt/", "Cập nhật", "🔄"],
  Suddenly: ["/ˈsʌdnli/", "Đột nhiên", "⚡"],
  Yet: ["/jet/", "Chưa (dùng cuối câu phủ định/nghi vấn với hiện tại hoàn thành)", "⏳"],
  Review: ["/rɪˈvjuː/", "Xem lại, ôn lại", "🔁"],
  Confident: ["/ˈkɒnfɪdənt/", "Tự tin", "💪"],
};

/** A card builder bound to one department's bank. */
export function cardsFor(dep: string) {
  const bank = P3_BANKS[dep];
  if (!bank) throw new Error(`p3 kit: no P3 bank for ${dep}`);
  const banked = new Map<string, [string, string, string]>();
  for (const group of Object.values(bank))
    for (const w of group) banked.set(w.word, [w.phonetic, w.definition, w.icon]);
  return (
    word: string,
    context: string,
    gloss?: [phonetic: string, definition: string, icon: string],
  ): VocabItem => {
    const g = gloss ?? banked.get(word) ?? SHARED[word];
    if (!g) throw new Error(`p3 kit: "${word}" is in neither the ${dep} bank nor the shared list`);
    return v(word, g[0], g[1], context, g[2]);
  };
}

type Parts = Omit<LessonContent, "lessonId" | "lessonOrder" | "titleEn" | "titleVi">;

/** A lesson builder bound to one department. */
export function lessonsFor(dep: string) {
  return (week: number, order: number, titleEn: string, titleVi: string, parts: Parts) =>
    ({
      lessonId: `${dep}_${week}_${order}`,
      lessonOrder: order,
      titleEn,
      titleVi,
      ...parts,
    }) satisfies LessonContent;
}

/** Marks a turn the checkpoint must find answered right — see
 *  `SpeakingItem.risk`. */
export const risk = (s: SpeakingItem): SpeakingItem => ({ ...s, risk: true });
