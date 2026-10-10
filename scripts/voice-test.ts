// The voice picker's choices (src/lib/voice.ts), on the voice lists real
// devices report: Chrome and Edge on Windows, an iPhone, a Mac, an Android
// phone. Pure functions, fake voices, a fake localStorage.
//
//   bun scripts/voice-test.ts
const store = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
};

const {
  DEFAULT_PREFS,
  describeVoice,
  effectiveRate,
  genderOf,
  pickVoice,
  rankVoices,
  readPrefs,
  savePrefs,
  suggestedVoice,
} = await import("../src/lib/voice.ts");
type V = Parameters<typeof describeVoice>[0];

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

const v = (name: string, lang: string, o: Partial<V> = {}): V => ({
  name,
  lang,
  voiceURI: o.voiceURI ?? name,
  localService: o.localService ?? true,
  default: o.default ?? false,
});
const short = (x: V | undefined) => x?.name.replace(/^(Microsoft|Google) /, "").split(/[ (-]/)[0];

// Chrome on Windows: the three SAPI voices, David the default.
const CHROME_WIN = [
  v("Microsoft David - English (United States)", "en-US", { default: true }),
  v("Microsoft Mark - English (United States)", "en-US"),
  v("Microsoft Zira - English (United States)", "en-US"),
];
// Edge adds the "Online (Natural)" voices, which need the network.
const net = { localService: false };
const EDGE = [
  ...CHROME_WIN,
  v("Microsoft Maisie Online (Natural) - English (United Kingdom)", "en-GB", net),
  v("Microsoft Sonia Online (Natural) - English (United Kingdom)", "en-GB", net),
  v("Microsoft Ryan Online (Natural) - English (United Kingdom)", "en-GB", net),
  v("Microsoft Ana Online (Natural) - English (United States)", "en-US", net),
  v("Microsoft Aria Online (Natural) - English (United States)", "en-US", net),
  v("Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)", "vi-VN", net),
];
const IPHONE = [
  v("Daniel", "en-GB"),
  v("Samantha", "en-US"),
  v("Kate", "en-GB"),
  v("Linh", "vi-VN"),
];
const IPHONE_ENHANCED = [...IPHONE, v("Samantha (Enhanced)", "en-US")];
const MAC = [
  v("Zarvox", "en-US"),
  v("Bubbles", "en-US"),
  v("Bad News", "en-US"),
  v("Fred", "en-US"),
  v("Samantha", "en-US"),
  v("Daniel", "en-GB"),
];
// Android Chrome names voices by language only.
const ANDROID = [
  v("English United States", "en-US"),
  v("English United Kingdom", "en-GB"),
  v("Tiếng Việt Việt Nam", "vi-VN"),
];
const VI_ONLY = [v("Tiếng Việt Việt Nam", "vi-VN")];

// ── Who is who
check(
  "sex is read from the name, child voices apart",
  genderOf(CHROME_WIN[2]) === "female" &&
    genderOf(CHROME_WIN[0]) === "male" &&
    genderOf(EDGE[3]) === "child" &&
    genderOf(ANDROID[0]) === undefined,
);
check(
  "labels say name · region · sex · natural · needs network",
  describeVoice(CHROME_WIN[2]) === "Zira · Mỹ · nữ" &&
    describeVoice(EDGE[4]) === "Sonia · Anh · nữ · tự nhiên · cần mạng",
  `${describeVoice(CHROME_WIN[2])} | ${describeVoice(EDGE[4])}`,
);

// ── Chrome on Windows: anything but David for the model line
const cwModel = pickVoice(CHROME_WIN, "model");
const cwGuest = pickVoice(CHROME_WIN, "guest");
check(
  "Chrome/Windows: Zira reads the model line, David the guest — two people",
  short(cwModel) === "Zira" && short(cwGuest) === "David",
  `${short(cwModel)} / ${short(cwGuest)}`,
);

// ── Edge: natural British adult voices first, no child voice suggested
const edgeRank = rankVoices(EDGE).map(short);
const edgeModel = pickVoice(EDGE, "model");
const edgeGuest = pickVoice(EDGE, "guest");
check(
  "Edge: Sonia (natural, British, adult) is the model voice",
  short(edgeModel) === "Sonia",
  edgeRank.join(","),
);
check(
  "Edge: the guest is Ryan — natural, British, the other sex",
  short(edgeGuest) === "Ryan",
  short(edgeGuest),
);
check(
  "Edge: the child voices rank below every natural adult voice",
  edgeRank.indexOf("Maisie") > edgeRank.indexOf("Aria") &&
    edgeRank.indexOf("Ana") > edgeRank.indexOf("Aria"),
  edgeRank.join(","),
);
check("Edge: the Vietnamese voice is not on the English list", !edgeRank.includes("HoaiMy"));

// ── iPhone
check(
  "iPhone: Kate (British) over Samantha; the guest is Daniel",
  short(pickVoice(IPHONE, "model")) === "Kate" && short(pickVoice(IPHONE, "guest")) === "Daniel",
  rankVoices(IPHONE).map(short).join(","),
);
check(
  "iPhone with an Enhanced voice downloaded: it reads the model line",
  pickVoice(IPHONE_ENHANCED, "model")?.name === "Samantha (Enhanced)",
);

// ── Mac: the joke voices are never offered, the old robot comes last
const macRank = rankVoices(MAC).map((x) => x.name);
check(
  "Mac: Zarvox, Bubbles and Bad News are left out; Fred ranks last",
  !macRank.some((n) => ["Zarvox", "Bubbles", "Bad News"].includes(n)) &&
    macRank[macRank.length - 1] === "Fred",
  macRank.join(","),
);

// ── Android and a device with no English voice
check(
  "Android: the British voice reads the model line, the American one the guest",
  pickVoice(ANDROID, "model")?.lang === "en-GB" && pickVoice(ANDROID, "guest")?.lang === "en-US",
);
check(
  "no English voice: nothing is picked, for either role",
  pickVoice(VI_ONLY, "model") === undefined && pickVoice(VI_ONLY, "guest") === undefined,
);
check(
  "one English voice: both roles use it",
  pickVoice([CHROME_WIN[2]], "guest") === CHROME_WIN[2],
);

// ── The learner's choice
const markForModel = { ...DEFAULT_PREFS, model: CHROME_WIN[1].voiceURI };
check(
  "a chosen voice is used while the device has it",
  short(pickVoice(CHROME_WIN, "model", markForModel)) === "Mark",
);
check(
  "a chosen voice the device lacks falls back to the suggestion",
  short(pickVoice(CHROME_WIN, "model", { ...DEFAULT_PREFS, model: "Sonia-on-another-PC" })) ===
    "Zira",
);
check(
  "the guest's suggestion moves off the voice the learner chose for the model",
  short(
    suggestedVoice(CHROME_WIN, "guest", { ...DEFAULT_PREFS, model: CHROME_WIN[0].voiceURI }),
  ) === "Zira",
  short(suggestedVoice(CHROME_WIN, "guest", { ...DEFAULT_PREFS, model: CHROME_WIN[0].voiceURI })),
);
check(
  "a choice is also found by name when the voiceURI changed",
  short(pickVoice(CHROME_WIN, "guest", { ...DEFAULT_PREFS, guest: CHROME_WIN[1].name })) === "Mark",
);

// ── Speed
check(
  "speed multiplies the week's rate: 0.8 slow → 0.68, fast → 0.92",
  effectiveRate(0.8, "slow") === 0.68 &&
    effectiveRate(0.8, "normal") === 0.8 &&
    effectiveRate(0.8, "fast") === 0.92,
);
check(
  "speed stays within 0.5–1.3",
  effectiveRate(0.5, "slow") === 0.5 && effectiveRate(1.2, "fast") === 1.3,
);

// ── Saved settings
check("nothing saved: the defaults", JSON.stringify(readPrefs()) === JSON.stringify(DEFAULT_PREFS));
savePrefs({ guest: "g", model: "m", speed: "slow" });
const back = readPrefs();
check(
  "settings come back as saved",
  back.guest === "g" && back.model === "m" && back.speed === "slow",
);
check(
  "kept apart from the academy.* keys a sign-out clears",
  [...store.keys()].every((k) => !k.startsWith("academy.")),
  [...store.keys()].join(","),
);
store.set("hospitality.voice.v1", "{broken");
check("broken JSON: the defaults", readPrefs().speed === "normal" && !readPrefs().model);
store.set("hospitality.voice.v1", JSON.stringify({ model: 5, speed: "warp" }));
const odd = readPrefs();
check("odd values: ignored", odd.model === undefined && odd.speed === "normal");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
