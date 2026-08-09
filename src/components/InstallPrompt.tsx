import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hasFinishedASuite } from "@/lib/academy-store";
import { useSession } from "@/lib/auth";

/**
 * PWA install prompt and service-worker registration (backlog P2-1a).
 *
 * The retention loop was closed with nothing in it: the only way back into
 * the app was the review banner, which a learner can only see once they have
 * already opened the app. An icon on the home screen is the cheapest thing
 * that exists outside it — and the whole curriculum is static TypeScript, so
 * the app genuinely works offline once its pages are cached.
 *
 * The prompt waits for the first finished suite. Asking for a home-screen
 * icon before anyone has completed a lesson spends the one install prompt
 * the browser grants on someone with no reason yet to say yes.
 */

const DISMISS_PREFIX = "academy.installPrompt.v1.";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari predates display-mode and reports it here instead.
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua);
  // Chrome and Firefox on iOS cannot install either, and their UI differs,
  // so the Share-sheet instructions would be wrong for them.
  return ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}

export function InstallPrompt() {
  const { session } = useSession();
  const userId = session?.user.id;
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [earned, setEarned] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  // Registration is separate from the prompt: the offline shell should be
  // built up from the first visit, whether or not the learner ever installs.
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    // Dev serves modules unbundled and unhashed, where a caching worker
    // turns every edit into a stale-asset hunt.
    if (!import.meta.env.PROD) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // An unavailable worker costs the offline shell and nothing else.
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.localStorage.getItem(DISMISS_PREFIX + (userId ?? "anon")) === "1");
    setEarned(hasFinishedASuite(userId));

    const onFinished = () => setEarned(true);
    const onPrompt = (e: Event) => {
      // Keep the event: calling prompt() later is the only way to show the
      // browser's install dialog at a moment the learner has earned.
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = () => setDeferred(null);

    window.addEventListener("academy:suite-finished", onFinished);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIosSafari() && !isStandalone()) setIosHint(true);

    return () => {
      window.removeEventListener("academy:suite-finished", onFinished);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [userId]);

  function close() {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_PREFIX + (userId ?? "anon"), "1");
    } catch {
      /* dismissal is a preference, not a requirement */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    // Chrome allows one prompt per captured event either way, so the banner
    // has done its job whichever button they pressed.
    setDeferred(null);
    close();
  }

  if (dismissed || !earned || isStandalone()) return null;
  if (!deferred && !iosHint) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md border border-primary bg-card p-4 shadow-xl md:inset-x-auto md:right-6 md:bottom-6"
      role="dialog"
      aria-label="Thêm ứng dụng vào màn hình chính"
    >
      <div className="flex items-start gap-3">
        <img src="/icon-192.png" alt="" className="h-10 w-10 flex-none" />
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight text-foreground">
            Thêm vào màn hình chính
          </p>
          <p className="mt-1 text-xs leading-5 text-foreground/70">
            {deferred
              ? "Mở app bằng một chạm và học được cả khi mạng chập chờn."
              : "Chạm nút Chia sẻ ở thanh dưới, rồi chọn “Thêm vào MH chính”."}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={close}
          className="border border-primary/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-foreground/70 hover:border-primary"
        >
          Để sau
        </button>
        {deferred && (
          <button
            onClick={install}
            className="bg-primary px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
          >
            Thêm ngay
          </button>
        )}
      </div>
    </motion.div>
  );
}
