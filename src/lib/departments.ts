export type Department = {
  code: string;
  name_en: string;
  name_vi: string;
  tagline: string;
  motif: string;
  /** Authored but not yet offered to learners.
   *
   *  A department's 40 weeks cannot land in one commit, and a half-finished
   *  one must not appear in the lounge — a learner who picks it would meet a
   *  course that stops mid-way. Hidden keeps it out of the picker while the
   *  QA gates still check every week that DOES exist, so the content is held
   *  to the full standard from the first week authored rather than audited
   *  at the end. Two checks, and only two, are deferred: T1 coverage
   *  ("all 40 weeks present") and the oral-pool size of phases that are not
   *  finished yet. Nothing else is relaxed.
   *
   *  Shipping the department is deleting this line. */
  hidden?: boolean;
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
    motif: "✤",
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
    hidden: true,
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
