import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

export type ProfileWithOrg = {
  id: string;
  full_name: string | null;
  role: "member" | "org_admin" | "super_admin";
  org_id: string | null;
  must_change_password: boolean;
  service_stars: number;
  daily_streak: number;
  job_rank: string;
  organizations: { name: string } | null;
};

export function profileQueryKey(userId: string | undefined) {
  return ["profile", userId] as const;
}

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: profileQueryKey(userId),
    queryFn: async (): Promise<ProfileWithOrg | null> => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, role, org_id, must_change_password, service_stars, daily_streak, job_rank, organizations(name)",
        )
        .eq("id", userId)
        .single();
      if (error) throw error;
      return data as unknown as ProfileWithOrg;
    },
    enabled: !!userId,
  });
}

export function useInvalidateProfile() {
  const queryClient = useQueryClient();
  return (userId: string | undefined) =>
    queryClient.invalidateQueries({ queryKey: profileQueryKey(userId) });
}

// Patches the cached profile synchronously (no network round-trip) so a
// caller can update-then-navigate without AuthGate reading stale data on
// the very next render — invalidateQueries alone only schedules a
// background refetch, which can lose that race.
export function usePatchProfileCache() {
  const queryClient = useQueryClient();
  return (userId: string | undefined, patch: Partial<ProfileWithOrg>) => {
    if (!userId) return;
    queryClient.setQueryData<ProfileWithOrg | null>(profileQueryKey(userId), (old) =>
      old ? { ...old, ...patch } : old,
    );
  };
}

export async function signOut() {
  // Hotels run this on a shared back-office machine, so the previous
  // learner's cached stars, streak and pending-star queue must not sit in
  // localStorage waiting for the next person to open DevTools. The keys
  // are per-user, so this is about hygiene on a shared device rather than
  // about one learner seeing another's screen.
  try {
    const doomed: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith("academy.")) doomed.push(key);
    }
    for (const key of doomed) window.localStorage.removeItem(key);
  } catch {
    /* storage blocked — nothing cached to clear */
  }
  await supabase.auth.signOut();
}
