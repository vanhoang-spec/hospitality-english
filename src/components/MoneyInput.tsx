// An amount of đồng, shown the way it is read — 12.028.500, not 12028500 —
// while the owner types it. The value in and out is digits only, so every
// caller keeps doing Number(value) exactly as before.
import { useLayoutEffect, useRef, type InputHTMLAttributes, type KeyboardEvent } from "react";

/** "12028500" → "12.028.500". Grouped as text, not through Number, so no
 *  amount is ever rounded on its way to the screen. */
function groupDigits(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  /** Digits only, e.g. "12028500". Empty string for no amount. */
  value: string;
  onChange: (digits: string) => void;
};

export function MoneyInput({ value, onChange, onKeyDown, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  // Digits that sat to the right of the caret when the owner typed.
  const pendingCaret = useRef<number | null>(null);

  // Re-grouping moves every separator, so the caret is re-placed by the
  // number of DIGITS to its right — the one thing a keystroke never changes
  // behind the caret.
  function placeCaret() {
    const el = ref.current;
    const digitsRight = pendingCaret.current;
    pendingCaret.current = null;
    if (!el || digitsRight === null || document.activeElement !== el) return;
    let pos = el.value.length;
    let seen = 0;
    while (pos > 0 && seen < digitsRight) {
      pos--;
      if (/\d/.test(el.value[pos])) seen++;
    }
    el.setSelectionRange(pos, pos);
  }

  // Before paint, on the render that shows the regrouped value — a frame
  // later would let a fast second keystroke land at the end of the field.
  useLayoutEffect(placeCaret);

  // Backspace right after a dot would delete only the dot, which the next
  // render puts straight back — the caret would never get past it. Step over
  // the dot first, so the key removes the digit the owner meant.
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const el = e.currentTarget;
    const at = el.selectionStart;
    if (at !== null && at === el.selectionEnd) {
      if (e.key === "Backspace" && el.value[at - 1] === ".") el.setSelectionRange(at - 1, at - 1);
      if (e.key === "Delete" && el.value[at] === ".") el.setSelectionRange(at + 1, at + 1);
    }
    onKeyDown?.(e);
  }

  return (
    <input
      {...rest}
      ref={ref}
      inputMode="numeric"
      autoComplete="off"
      value={groupDigits(value)}
      onKeyDown={handleKeyDown}
      onChange={(e) => {
        const raw = e.target.value;
        const caret = e.target.selectionStart ?? raw.length;
        const next = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
        pendingCaret.current = raw.slice(caret).replace(/\D/g, "").length;
        onChange(next);
        // A letter or a dot changes no digit, so nothing re-renders and the
        // layout effect never runs; React still puts the old text back, so
        // the caret is fixed once that has happened.
        if (next === value) queueMicrotask(placeCaret);
      }}
    />
  );
}
