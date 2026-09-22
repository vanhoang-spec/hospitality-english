import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** What a hotel bought, and how long it has left.
 *
 *  A seat is an account, not a connection: delete a learner and the seat
 *  is free the same second, because the quota counts rows that exist.
 *  HR accounts are not seats — the hotel pays for learners. */
export type OrgSubscription = {
  planCode: string;
  seats: number;
  kind: "trial" | "m3" | "m6" | "m9" | "m12" | string;
  startsAt: string;
  endsAt: string;
  status: string;
  daysLeft: number;
  active: boolean;
};

export const PLAN_LABEL: Record<string, string> = {
  p50: "50 học viên",
  p100: "100 học viên",
  p200: "200 học viên",
  p300: "300 học viên",
  p500: "500 học viên",
};

export const TERM_LABEL: Record<string, string> = {
  trial: "Dùng thử 1 tháng",
  m3: "3 tháng",
  m6: "6 tháng",
  m9: "9 tháng",
  m12: "12 tháng",
};

export function subscriptionQueryKey(orgId: string | null | undefined) {
  return ["org-subscription", orgId] as const;
}

export function useOrgSubscription(orgId: string | null | undefined) {
  return useQuery({
    queryKey: subscriptionQueryKey(orgId),
    queryFn: async (): Promise<OrgSubscription | null> => {
      if (!orgId) return null;
      const { data, error } = await supabase
        .from("subscriptions")
        .select("plan_code, kind, starts_at, ends_at, status, plans(seats)")
        .eq("org_id", orgId)
        .eq("status", "active")
        .order("ends_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const row = data as unknown as {
        plan_code: string;
        kind: string;
        starts_at: string;
        ends_at: string;
        status: string;
        plans: { seats: number } | null;
      };
      const ends = new Date(row.ends_at).getTime();
      const daysLeft = Math.ceil((ends - Date.now()) / 86_400_000);
      return {
        planCode: row.plan_code,
        seats: row.plans?.seats ?? 0,
        kind: row.kind,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        status: row.status,
        daysLeft,
        active: ends > Date.now(),
      };
    },
    enabled: !!orgId,
    staleTime: 5 * 60_000,
  });
}

/** An organisation with no subscription row at all is one that predates
 *  the plans table, and is treated as active — a schema change must not
 *  lock a paying customer out. The same rule lives in org_is_active(). */
export function orgIsActive(sub: OrgSubscription | null | undefined, loaded: boolean): boolean {
  if (!loaded) return true;
  if (!sub) return true;
  return sub.active;
}
