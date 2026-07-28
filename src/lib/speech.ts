// Shared browser speech helpers.

export function speakEN(text: string, rate = 0.85) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
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
