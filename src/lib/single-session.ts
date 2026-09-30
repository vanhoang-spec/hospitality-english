import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { signOut } from "@/lib/auth";

/** One live session per account.
 *
 *  A seat is an account, so nothing stops a shift from sharing one login
 *  and a hotel from buying 50 seats for 150 people. A licence server is
 *  the heavy answer; this is the cheap one: the browser mints a session
 *  id at sign-in, and whoever signs in last owns the account. The older
 *  device notices on its next heartbeat and signs itself out.
 *
 *  Deliberately not a security boundary — someone determined can sign in
 *  again a second later. It is a speed bump that makes sharing annoying
 *  enough to buy the seats instead, which is all a seat count can ask for. */
const SESSION_KEY = "academy.sessionId.v1";
const HEARTBEAT_MS = 3 * 60_000;

function mySessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    // Private mode with storage blocked: fall back to a per-tab id. The
    // learner still works; they simply cannot be detected as a duplicate.
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export function clearSessionId() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage blocked — nothing to clear */
  }
}

export function useSingleSession(userId: string | undefined, enabled: boolean) {
  useEffect(() => {
    if (!userId || !enabled) return;
    let stopped = false;
    const id = mySessionId();

    const claim = async () => {
      await supabase.from("active_sessions").upsert(
        {
          user_id: userId,
          session_id: id,
          last_seen: new Date().toISOString(),
          user_agent: typeof navigator === "undefined" ? null : navigator.userAgent.slice(0, 200),
        },
        { onConflict: "user_id" },
      );
    };

    const beat = async () => {
      if (stopped) return;
      const { data, error } = await supabase
        .from("active_sessions")
        .select("session_id")
        .eq("user_id", userId)
        .maybeSingle();
      // A read that fails (offline, RLS hiccup) must never sign anybody
      // out: the failure mode of this feature has to be "does nothing".
      if (error || !data) return;
      if (data.session_id !== id) {
        stopped = true;
        clearSessionId();
        await signOut();
        if (typeof window !== "undefined") {
          window.alert(
            "Tài khoản này vừa được đăng nhập trên thiết bị khác. Mỗi tài khoản chỉ dùng được ở một nơi tại một thời điểm.",
          );
          window.location.href = "/login";
        }
        return;
      }
      await supabase
        .from("active_sessions")
        .update({ last_seen: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("session_id", id);
    };

    void claim();
    const timer = window.setInterval(() => void beat(), HEARTBEAT_MS);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [userId, enabled]);
}
