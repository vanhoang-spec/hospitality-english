export type Department = {
  code: string;
  name_en: string;
  name_vi: string;
  tagline: string;
  motif: string;
  /** Not offered to learners — and WHY, because the two reasons behave
   *  differently and a gate that conflates them lies in its own log.
   *
   *  `"in-progress"` — the 40 weeks are still being written. A learner who
   *  picked it would meet a course that stops mid-way. Two checks are
   *  deferred while it holds: T1 coverage ("all 40 weeks present") and the
   *  oral-pool size of phases not finished yet. Nothing else is relaxed, so
   *  the content is held to the full standard from the first week authored.
   *  Shipping it is deleting this line.
   *
   *  `"withdrawn"` — the weeks are complete and the department has been
   *  taken out of the catalogue anyway. Nothing is deferred: a withdrawn
   *  department is checked exactly like a shipping one, because its content
   *  is finished and may return. Restoring it is deleting this line.
   *
   *  Both keep the department out of the picker, out of every learner route
   *  (see getDepartment), and out of the org-admin denominators. */
  hidden?: "in-progress" | "withdrawn";
};

export const DEPARTMENTS: Department[] = [
  {
    code: "FO",
    name_en: "Front Office",
    name_vi: "Lễ tân",
    tagline: "The first impression desk",
    motif: "✦",
  },
  {
    code: "FB",
    name_en: "Food & Beverage",
    name_vi: "Nhà hàng & Bar",
    tagline: "Service à la grande maison",
    motif: "❦",
  },
  {
    code: "HK",
    name_en: "Housekeeping",
    name_vi: "Buồng phòng",
    tagline: "Quiet excellence behind every door",
    motif: "✿",
  },
  {
    code: "SW",
    name_en: "Spa & Wellness",
    name_vi: "Spa & Sức khỏe",
    tagline: "The art of restoration",
    motif: "❀",
  },
  {
    code: "GR",
    name_en: "Guest Relations",
    name_vi: "Quan hệ khách hàng",
    tagline: "Bespoke moments, every time",
    motif: "✧",
  },
  {
    code: "BO",
    name_en: "Back Office",
    name_vi: "Vận hành & Kinh doanh",
    tagline: "Corporate operations & sales",
    // Withdrawn 2026-08. The 40 weeks are complete and BO-37/38 are among
    // the strongest material in the course, but three Phase 4 slots assume a
    // guest-facing job Back Office does not do — see docs/semantic-class-debt.md.
    // The content stays in the repo, gated and unchanged, until that is settled.
    motif: "✤",
    hidden: "withdrawn",
  },
  {
    // Security and Engineering as one team: both meet a guest only when
    // something has gone wrong, so they share a single language spine —
    // apologise, explain, fix, follow up. Their vocabulary splits in two
    // (patrol, access card, CCTV / air-con, leak, breaker) and every bank
    // slot carries both halves so neither trade is left out.
    //
    // Hidden until all 40 weeks exist. See `hidden` on the type above.
    code: "SE",
    name_en: "Safety & Facilities",
    name_vi: "An ninh & Kỹ thuật",
    tagline: "Secure, working, unnoticed",
    motif: "✥",
    hidden: "in-progress",
  },
];

/** The departments a learner may be placed in or navigate to.
 *
 *  Everything learner-facing reads this list; only authoring tools, the QA
 *  gates and the admin screens that must label historic rows read
 *  DEPARTMENTS. */
export const SHIPPING_DEPARTMENTS = DEPARTMENTS.filter((d) => !d.hidden);

export function getDepartment(code: string) {
  // Every learner route resolves its department from the URL through here, so
  // this is where hiding has to bite. Filtering the lounge grid alone only
  // closes the door people click — /department/SE, /handbook/SE/1 and
  // /learn/SE/1/vocab would all still open a course with holes in it.
  return SHIPPING_DEPARTMENTS.find((d) => d.code === code.toUpperCase());
}

/** Look-up across every department including unfinished ones. For admin
 *  screens that must render a label for whatever a stored row says, where
 *  showing the raw code would be worse than naming an unfinished course. */
export function getAnyDepartment(code: string) {
  return DEPARTMENTS.find((d) => d.code === code.toUpperCase());
}
