// The learner's voice settings and the device's voice list, shared by every
// 🔊 button and the voice picker without a React context: three tiny stores
// read with useSyncExternalStore. Server render sees the defaults.
import { useSyncExternalStore } from "react";
import {
  DEFAULT_PREFS,
  readPrefs,
  savePrefs,
  watchVoices,
  type VoicePrefs,
  type VoiceRole,
} from "@/lib/voice";

function store<T>(initial: () => T) {
  let value: T | undefined;
  const listeners = new Set<() => void>();
  return {
    get(): T {
      if (value === undefined) value = initial();
      return value;
    },
    set(next: T) {
      value = next;
      listeners.forEach((l) => l());
    },
    subscribe(l: () => void) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

// ── Settings ─────────────────────────────────────────────────
const prefs = store<VoicePrefs>(readPrefs);

export function getVoicePrefs(): VoicePrefs {
  return prefs.get();
}

export function setVoicePrefs(patch: Partial<VoicePrefs>) {
  const next = { ...prefs.get(), ...patch };
  savePrefs(next);
  prefs.set(next);
}

export function useVoicePrefs(): VoicePrefs {
  return useSyncExternalStore(prefs.subscribe, prefs.get, () => DEFAULT_PREFS);
}

// ── The device's voices (filled in late on Chrome and Android) ─
const NONE: SpeechSynthesisVoice[] = [];
const voices = store<SpeechSynthesisVoice[]>(() => NONE);
let watching = false;

function subscribeVoices(l: () => void) {
  if (!watching) {
    watching = true;
    watchVoices((list) => voices.set(list.length ? [...list] : NONE));
  }
  return voices.subscribe(l);
}

export function useDeviceVoices(): SpeechSynthesisVoice[] {
  return useSyncExternalStore(subscribeVoices, voices.get, () => NONE);
}

// ── The picker: open or closed, and which section to show first ─
const picker = store<VoiceRole | null>(() => null);

export function openVoicePicker(role: VoiceRole = "model") {
  picker.set(role);
}

export function closeVoicePicker() {
  picker.set(null);
}

export function useVoicePicker(): VoiceRole | null {
  return useSyncExternalStore(picker.subscribe, picker.get, () => null);
}
