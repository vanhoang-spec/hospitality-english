import { getWeekContent } from "./src/lib/content/week-content";
const w33 = getWeekContent("HK", 33);
for (const l of w33!.lessons) {
  console.log("### " + l.lessonId + " " + l.titleEn);
  console.log(l.reading.text);
  console.log("---GRAMMAR---");
  console.log(JSON.stringify(l.grammar, null, 1));
  console.log("---SPEAKING---");
  console.log(JSON.stringify(l.speaking, null, 1));
}
