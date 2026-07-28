// The parts of the Web Speech API that TypeScript's DOM lib still leaves out.
//
// lib.dom.d.ts already ships SpeechRecognitionResult, SpeechRecognitionResultList
// and SpeechRecognitionAlternative, so those are deliberately NOT redeclared here
// — this file only fills the three gaps (the recognizer itself and its two event
// types) and the vendor-prefixed constructors. If a future TypeScript adds them,
// tsc will fail on the duplicate identifier, which is the signal to delete the
// corresponding block rather than to keep a stale copy.
//
// No imports or exports: that keeps this a global script file, so the Window
// augmentation below applies without a `declare global` wrapper.

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  /** Spec calls this SpeechRecognitionErrorCode: "no-speech", "not-allowed", … */
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((event: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
  prototype: SpeechRecognition;
}

interface Window {
  /** Unprefixed in Safari 14.1+ and Chrome 138+; absent in Firefox. */
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
  /** Older WebKit only; every current engine has the unprefixed AudioContext. */
  webkitAudioContext?: typeof AudioContext;
}
