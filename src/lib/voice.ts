// Which English voice reads a line aloud, and how fast.
//
// Every line in the course is read by the device's own text-to-speech
// (speechSynthesis); there are no recordings. Left to itself the browser
// reads with the operating system's default voice — on Chrome for Windows
// that is "Microsoft David", the flat one — and the listening drill and the
// checkpoint made it worse by picking a RANDOM English voice, which on a
// Mac includes Zarvox and Bubbles. This ranks the voices a device has, by
// name, and remembers what the learner chose: one voice for the people they
// answer (guest, colleague, manager) and one for the lines they copy
// (headwords, examples, model answers).
//
// Pure: every function takes the voice list as an argument, and nothing here
// touches `window` at module level — qa-full imports this through the
// suites, under Bun, with no DOM.

export type VoiceRole = "guest" | "model";
export type Speed = "slow" | "normal" | "fast";

/** voiceURI per role (unset = the suggested voice), and a speed. */
export type VoicePrefs = { guest?: string; model?: string; speed: Speed };

export type VoiceLike = Pick<
  SpeechSynthesisVoice,
  "name" | "lang" | "voiceURI" | "localService" | "default"
>;

export const DEFAULT_PREFS: VoicePrefs = { speed: "normal" };

/** Multiplies the rate a line was written for (the week's ladder in
 *  phases.ts). The ladder itself never changes. */
export const SPEED_FACTOR: Record<Speed, number> = { slow: 0.85, normal: 1, fast: 1.15 };

// Not under "academy.": signOut() clears those. A voice belongs to the
// device, not to the learner, so it survives a sign-out on a shared PC.
const KEY = "hospitality.voice.v1";

export function readPrefs(): VoicePrefs {
  try {
    const raw = globalThis.localStorage?.getItem(KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const p = JSON.parse(raw) as Partial<VoicePrefs>;
    return {
      guest: typeof p.guest === "string" ? p.guest : undefined,
      model: typeof p.model === "string" ? p.model : undefined,
      speed: p.speed && p.speed in SPEED_FACTOR ? p.speed : "normal",
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePrefs(p: VoicePrefs): void {
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(p));
  } catch {
    // Storage blocked (private mode): the suggested voice still reads.
  }
}

// ── Names ────────────────────────────────────────────────────
// Vendors' voice names are stable across versions; add new ones here when
// a device shows one we do not know.
const CHILD = ["maisie", "ana"];
const FEMALE = [
  // Microsoft (Windows, Edge)
  "zira",
  "aria",
  "jenny",
  "michelle",
  "emma",
  "ava",
  "sonia",
  "libby",
  "hazel",
  "susan",
  "abbi",
  "bella",
  "hollie",
  "olivia",
  "natasha",
  "clara",
  "neerja",
  "molly",
  "emily",
  // Apple
  "samantha",
  "karen",
  "kate",
  "moira",
  "tessa",
  "fiona",
  "martha",
  "serena",
  "nicky",
  "allison",
  "victoria",
  "catherine",
  "stephanie",
  // Google
  "google uk english female",
  "google us english",
  "female",
  "woman",
];
const MALE = [
  "david",
  "mark",
  "guy",
  "ryan",
  "daniel",
  "george",
  "thomas",
  "christopher",
  "eric",
  "steve",
  "andrew",
  "brian",
  "alex",
  "arthur",
  "oliver",
  "william",
  "james",
  "liam",
  "connor",
  "prabhat",
  "rishi",
  "aaron",
  "tom",
  "gordon",
  "lee",
  "roger",
  "google uk english male",
  "male",
  "man",
];
/** Old formant voices: they work, but they sound like a 1990s computer. */
const ROBOT = [
  "fred",
  "ralph",
  "junior",
  "kathy",
  "eddy",
  "flo",
  "grandma",
  "grandpa",
  "reed",
  "rocko",
  "sandy",
  "shelley",
];
/** Apple's joke voices. Never offered. */
const NOVELTY = [
  "albert",
  "bad news",
  "bahh",
  "bells",
  "boing",
  "bubbles",
  "cellos",
  "good news",
  "jester",
  "organ",
  "pipe organ",
  "superstar",
  "trinoids",
  "whisper",
  "wobble",
  "zarvox",
  "deranged",
  "hysterical",
];

/** " microsoft sonia online natural english united kingdom " */
function words(s: string): string {
  return ` ${s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
}
const has = (name: string, list: string[]) => list.some((t) => name.includes(` ${t} `));

export type Gender = "female" | "male" | "child";

export function genderOf(v: Pick<VoiceLike, "name">): Gender | undefined {
  const n = words(v.name);
  if (has(n, CHILD)) return "child";
  if (has(n, FEMALE)) return "female";
  if (has(n, MALE)) return "male";
  return undefined;
}

/** Neural voices (Edge "Online (Natural)", Apple Enhanced/Premium, Google
 *  WaveNet) sound far better than the old ones, whoever is speaking. */
export function isNatural(v: Pick<VoiceLike, "name">): boolean {
  return /natural|neural|online|premium|enhanced|wavenet|siri/i.test(v.name);
}

const lang = (l: string) => (l ?? "").replace("_", "-").toLowerCase();
const isEnglish = (v: Pick<VoiceLike, "lang">) => lang(v.lang).startsWith("en");
const isNovelty = (v: Pick<VoiceLike, "name">) => has(words(v.name), NOVELTY);

/** The course is written British (IPA, spelling), so en-GB comes first. */
export function scoreVoice(v: VoiceLike): number {
  let s = 0;
  if (isNatural(v)) s += 30;
  if (/google/i.test(v.name)) s += 12;
  const l = lang(v.lang);
  if (l === "en-gb") s += 10;
  else if (l === "en-us") s += 6;
  if (v.localService) s += 2;
  const g = genderOf(v);
  if (g === "female") s += 1; // a tie-break, nothing more
  if (g === "child") s -= 30;
  if (has(words(v.name), ROBOT)) s -= 20;
  return s;
}

/** English voices, best first; joke voices left out. */
export function rankVoices<T extends VoiceLike>(voices: readonly T[]): T[] {
  return voices
    .filter((v) => isEnglish(v) && !isNovelty(v))
    .map((v, i) => ({ v, i, s: scoreVoice(v) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.v);
}

function chosen<T extends VoiceLike>(ranked: readonly T[], id: string | undefined): T | undefined {
  if (!id) return undefined;
  return ranked.find((v) => v.voiceURI === id) ?? ranked.find((v) => v.name === id);
}

/** What a role gets with nothing chosen. The model line takes the best
 *  voice; the guest takes the best OTHER voice, preferably the other sex,
 *  so the learner hears two people — unless that voice is much worse. */
export function suggestedVoice<T extends VoiceLike>(
  voices: readonly T[],
  role: VoiceRole,
  prefs: VoicePrefs = DEFAULT_PREFS,
): T | undefined {
  const ranked = rankVoices(voices);
  if (role === "model") return ranked[0];
  const model = pickVoice(voices, "model", prefs);
  const rest = ranked.filter((v) => v !== model);
  if (rest.length === 0) return model;
  const mg = model ? genderOf(model) : undefined;
  const best = scoreVoice(rest[0]);
  const other = rest.find((v) => {
    const g = genderOf(v);
    return g !== undefined && g !== "child" && mg !== undefined && g !== mg;
  });
  return other && scoreVoice(other) >= best - 10 ? other : rest[0];
}

/** The learner's voice for this role if the device still has it, else the
 *  suggested one; undefined only when the device has no English voice. */
export function pickVoice<T extends VoiceLike>(
  voices: readonly T[],
  role: VoiceRole,
  prefs: VoicePrefs = DEFAULT_PREFS,
): T | undefined {
  return chosen(rankVoices(voices), prefs[role]) ?? suggestedVoice(voices, role, prefs);
}

/** The rate a line was written for, times the learner's speed, kept in
 *  0.5–1.3 so no setting makes a line unintelligible. */
export function effectiveRate(baseRate: number, speed: Speed): number {
  const r = Math.min(1.3, Math.max(0.5, baseRate * (SPEED_FACTOR[speed] ?? 1)));
  return Math.round(r * 100) / 100;
}

const REGION: Record<string, string> = {
  "en-gb": "Anh",
  "en-us": "Mỹ",
  "en-au": "Úc",
  "en-ca": "Canada",
  "en-in": "Ấn Độ",
  "en-ie": "Ireland",
  "en-nz": "New Zealand",
  "en-za": "Nam Phi",
  "en-sg": "Singapore",
  "en-ph": "Philippines",
  "en-hk": "Hồng Kông",
};

/** "Microsoft Sonia Online (Natural) - English (United Kingdom)" → "Sonia". */
export function shortName(v: Pick<VoiceLike, "name">): string {
  return (
    v.name
      .replace(/\s*[-–(].*$/, "")
      .replace(/^(microsoft|apple)\s+/i, "")
      .replace(/\s+(online|natural|desktop|mobile)$/i, "")
      .trim() || v.name
  );
}

/** "Sonia · Anh · nữ · tự nhiên · cần mạng" */
export function describeVoice(v: VoiceLike): string {
  const parts = [shortName(v)];
  const region = REGION[lang(v.lang)];
  if (region) parts.push(region);
  const g = genderOf(v);
  if (g === "female") parts.push("nữ");
  else if (g === "male") parts.push("nam");
  else if (g === "child") parts.push("giọng trẻ em");
  if (isNatural(v)) parts.push("tự nhiên");
  if (!v.localService) parts.push("cần mạng");
  return parts.join(" · ");
}

/** What the picker plays when the learner taps ▶. */
export const SAMPLE_LINE: Record<VoiceRole, string> = {
  guest: "Hi, I'd like to check in, please. The booking is under Lee.",
  model: "Good evening, welcome to the hotel. How may I help you?",
};

// ── The browser ──────────────────────────────────────────────
function synth(): SpeechSynthesis | undefined {
  return typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis
    : undefined;
}

export function deviceVoices(): SpeechSynthesisVoice[] {
  try {
    return synth()?.getVoices() ?? [];
  } catch {
    return [];
  }
}

/** Calls back now and whenever the list changes: Chrome and Android return
 *  nothing on the first call and fill the list in later. Returns the
 *  unsubscribe. */
export function watchVoices(cb: (voices: SpeechSynthesisVoice[]) => void): () => void {
  const s = synth();
  if (!s) return () => {};
  const report = () => cb(deviceVoices());
  report();
  s.addEventListener?.("voiceschanged", report);
  return () => s.removeEventListener?.("voiceschanged", report);
}
