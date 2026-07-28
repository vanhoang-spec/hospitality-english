export type Department = {
  code: string;
  name_en: string;
  name_vi: string;
  tagline: string;
  motif: string;
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
];

export function getDepartment(code: string) {
  return DEPARTMENTS.find((d) => d.code === code.toUpperCase());
}
