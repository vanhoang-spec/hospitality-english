import { getWeekContent } from "./src/lib/content/week-content";
const w = getWeekContent("HK", 33);
console.log(JSON.stringify(w, null, 2));
