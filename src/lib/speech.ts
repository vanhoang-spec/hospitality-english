// Shared browser speech helpers.
import { deviceVoices, effectiveRate, pickVoice, type VoiceRole } from "@/lib/voice";
import { getVoicePrefs } from "@/lib/voice-store";

/** The one way a line is read aloud. `role` says whose voice: "guest" for
 *  what someone says TO the learner (guest, colleague, manager), "model"
 *  for what the learner copies (headwords, examples, model answers).
 *  `rate` is what the line was written for — the week's ladder — and the
 *  learner's speed setting multiplies it. Always called from a tap: iOS
 *  reads nothing that a tap did not start. */
export function speak(text: string, opts: { role: VoiceRole; rate: number }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const prefs = getVoicePrefs();
  const say = (localOnly: boolean) => {
    const all = deviceVoices();
    const voice = pickVoice(localOnly ? all.filter((v) => v.localService) : all, opts.role, prefs);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-GB";
    u.rate = effectiveRate(opts.rate, prefs.speed);
    u.pitch = 1;
    u.onerror = (e) => {
      // A second tap cancels the first line: not a failure.
      if (e.error === "interrupted" || e.error === "canceled") return;
      // Edge's "Online (Natural)" and Google voices need the network; read
      // the line again with a voice that lives on the device.
      if (voice && !voice.localService && !localOnly) say(true);
    };
    window.speechSynthesis.speak(u);
  };
  try {
    window.speechSynthesis.cancel();
    say(false);
  } catch {
    /* no-op */
  }
}

/** Stops whatever is being read — on leaving a page, so a line does not
 *  carry on over the next screen. */
export function stopSpeaking() {
  try {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    /* no-op */
  }
}

/** Does this device have an English text-to-speech voice at all?
 *
 *  The checkpoint waives the listening floor when the answer is no, which is
 *  right — a learner on a device with no English voice cannot be held to a
 *  block they were never able to hear. It was reading the wrong signal to
 *  decide, though: it asked whether the 🔊 button had been clicked. Not
 *  clicking is free, so the waiver was free, and an academic review measured
 *  what that was worth — a learner who understands no spoken English at all
 *  went from 40.0% to 92.3% likely to pass. Ask the device instead.
 *
 *  getVoices() is empty on first call in Chrome until the list loads, hence
 *  the voiceschanged listener at the call site. */
export function hasEnglishVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    return window.speechSynthesis.getVoices().some((v) => v.lang?.toLowerCase().startsWith("en"));
  } catch {
    return false;
  }
}

// Synthetic applause via WebAudio (no asset needed).
export function playApplause(durationMs = 1800) {
  if (typeof window === "undefined") return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try {
    const ctx = new AC();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * (durationMs / 1000), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      // White noise with slow envelope and small claps
      const t = i / data.length;
      const env = Math.sin(Math.PI * t) * 0.6;
      const claps = Math.sin(i * 0.002) * Math.sin(i * 0.013) * 0.3;
      data[i] = (Math.random() * 2 - 1) * env + claps * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    src.connect(gain).connect(ctx.destination);
    src.start();
    src.onended = () => ctx.close();
  } catch {
    /* no-op */
  }
}

// Collapse repeated adjacent words from SpeechRecognition transcripts.
export function dedupeTranscript(s: string): string {
  const words = s.toLowerCase().replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const out: string[] = [];
  for (const w of words) {
    if (out[out.length - 1] === w) continue;
    out.push(w);
  }
  // Also collapse repeated 2-word and 3-word bigrams at the tail
  for (const n of [3, 2]) {
    while (out.length >= n * 2) {
      const a = out.slice(-2 * n, -n).join(" ");
      const b = out.slice(-n).join(" ");
      if (a === b) out.splice(-n, n);
      else break;
    }
  }
  return out.join(" ");
}
