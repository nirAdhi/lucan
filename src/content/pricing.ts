/**
 * Price list (PRD s44).
 *
 * Transcribed from https://ldic.ie/prices/ (August 2026). Prices are held here, once,
 * and referenced by slug from treatment pages - never hard-coded into page copy - so a
 * single edit updates every page that quotes a figure.
 *
 * Phase 2 moves this into the `pricing` table with `price_history` for the audit trail
 * required by PRD s45.
 */

export type PriceItem = {
  /** Stable key used by treatment pages to quote a price. */
  slug: string;
  name: string;
  /** Rendered verbatim, including "From" and per-arch qualifiers. */
  price: string;
  note?: string;
};

export type PriceGroup = {
  slug: string;
  title: string;
  items: PriceItem[];
};

/** Date the list was last confirmed against the practice (PRD s44 "Last Updated"). */
export const pricingLastUpdated = "2026-08-25";

export const pricingDisclaimer =
  "Prices are a guide. A written treatment plan with a final cost is provided after an examination, because the treatment needed varies from patient to patient. PRSI entitlements are subject to eligibility.";

export const priceGroups: PriceGroup[] = [
  {
    slug: "general-dentistry",
    title: "General dentistry",
    items: [
      { slug: "prescription", name: "Prescription", price: "€35" },
      { slug: "exam-existing", name: "General dentist exam (existing patients)", price: "€60" },
      {
        slug: "exam-prsi",
        name: "General dentist exam (PRSI)",
        price: "Free",
        note: "Once per year, subject to eligibility",
      },
      { slug: "exam-and-clean", name: "General dentist exam and teeth cleaning", price: "€110" },
      { slug: "consultation-opg", name: "Consultation with OPG", price: "€90" },
      {
        slug: "scale-polish-from",
        name: "Scale & polish",
        price: "From €80",
        note: "Plus €60 if Airflow is needed",
      },
      { slug: "referral-letter", name: "Referral letter (with consultation / X-ray)", price: "€100" },
      { slug: "hospital-report", name: "Hospital report", price: "€100" },
      { slug: "emergency-appointment", name: "Emergency appointment", price: "€100" },
      {
        slug: "exam-diagnosis-plan",
        name: "Examination, diagnosis, treatment plan and prescription",
        price: "€120",
      },
      { slug: "specialist-consultation-opg", name: "Specialist consultation with OPG", price: "€200" },
      {
        slug: "specialist-consultation-ct",
        name: "Specialist consultation with CT scan",
        price: "€300",
      },
      { slug: "opg", name: "OPG", price: "€60" },
      { slug: "ct-scan", name: "CT scan", price: "€120" },
      { slug: "small-xray", name: "Small X-ray", price: "€40" },
      { slug: "study-models", name: "Study models mock-up / wax-up", price: "From €150 per arch" },
      { slug: "mouthguard", name: "Mouthguard / nightguard", price: "From €200" },
      { slug: "sportsguard", name: "Sportsguard / gumshield", price: "From €150 per arch" },
      {
        slug: "essix-retainer",
        name: "Essix retainer / removable retainer",
        price: "From €150 per arch or €250 both arches",
      },
      {
        slug: "fixed-retainer-post-ortho",
        name: "Fixed retainer (after orthodontic treatment)",
        price: "€180 per arch",
      },
      { slug: "periodontal-splint", name: "Periodontal splint", price: "€250" },
    ],
  },
  {
    slug: "cleaning-and-whitening",
    title: "Cleaning and whitening",
    items: [
      { slug: "scale-polish", name: "Scale and polish", price: "€80" },
      { slug: "scale-polish-under-13", name: "Scale and polish (under 13 years)", price: "€60" },
      {
        slug: "scale-polish-prsi",
        name: "Scale and polish (PRSI)",
        price: "€15",
        note: "Once per year, subject to eligibility",
      },
      { slug: "scale-polish-airflow", name: "Scale and polish with Airflow", price: "From €100" },
      { slug: "deep-cleaning", name: "Deep cleaning", price: "€120 per arch" },
      { slug: "periodontal-treatment", name: "Periodontal treatment", price: "From €350 per arch" },
      {
        slug: "whitening-home",
        name: "Whitening (home kit with two gels and personalised tray)",
        price: "€250",
      },
      { slug: "whitening-surgery", name: "Whitening (in surgery)", price: "€300" },
      { slug: "whitening-topup", name: "Top-up whitening syringe", price: "€40" },
    ],
  },
  {
    slug: "fillings-and-restorations",
    title: "Fillings and restorations",
    items: [
      { slug: "temporary-filling", name: "Temporary filling", price: "€60" },
      { slug: "white-filling", name: "White composite filling", price: "€120 to €200" },
      { slug: "composite-bonding", name: "Composite bonding / veneers", price: "From €275" },
      { slug: "incisal-edge-bonding", name: "Incisal edge bonding", price: "€160" },
    ],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    items: [
      { slug: "ortho-first-consultation", name: "First consultation", price: "€50" },
      { slug: "ortho-assessment", name: "Orthodontic assessment", price: "From €110" },
      { slug: "fixed-retainer", name: "Fixed retainer", price: "€150 per arch" },
      { slug: "braces-single-arch", name: "Metal braces (single arch)", price: "€2,500 to €3,200" },
      { slug: "braces-both-arches", name: "Metal braces (both arches)", price: "€3,200 to €5,500" },
      { slug: "clear-aligners", name: "Invisalign / clear aligners", price: "€4,000 to €5,800" },
    ],
  },
  {
    slug: "prosthetic-dentistry",
    title: "Prosthetic dentistry",
    items: [
      { slug: "denture-acrylic", name: "Acrylic-based denture", price: "€650 to €850" },
      { slug: "denture-flexible", name: "Flexible denture", price: "€750 to €950" },
      { slug: "denture-bredent", name: "Bredent denture", price: "€900 to €1,200" },
      { slug: "denture-chrome-cobalt", name: "Chrome cobalt denture", price: "€1,250" },
    ],
  },
  {
    slug: "crowns-and-veneers",
    title: "Dental crowns and veneers",
    items: [
      { slug: "post-fibreglass", name: "Core / post preparation (fibreglass)", price: "From €150" },
      { slug: "post-metal", name: "Core / post preparation (metal)", price: "€200 to €250" },
      { slug: "crown-metal-ceramic", name: "Crown, metal ceramic", price: "From €550" },
      { slug: "crown-full-ceramic", name: "Crown, full ceramic (e.max)", price: "From €750" },
      { slug: "crown-zirconium", name: "Crown, zirconium", price: "From €750" },
      { slug: "veneers", name: "Veneers (e.max, zirconium)", price: "From €750" },
      { slug: "temporary-crown", name: "Temporary acrylic crown", price: "€250 to €300" },
      { slug: "maryland-bridge", name: "Maryland bridge", price: "€800 to €1,400" },
      { slug: "recement-crown", name: "Recementing crown / bridge", price: "From €100" },
    ],
  },
  {
    slug: "root-canal",
    title: "Root canal treatment",
    items: [
      { slug: "rct-front", name: "Front tooth", price: "€500" },
      { slug: "rct-front-retreat", name: "Front tooth re-treatment", price: "€600" },
      { slug: "rct-premolar", name: "Premolar", price: "€600" },
      { slug: "rct-premolar-retreat", name: "Premolar re-treatment", price: "€700" },
      { slug: "rct-molar", name: "Molar", price: "€700" },
      { slug: "rct-molar-retreat", name: "Molar re-treatment", price: "€800" },
      { slug: "rct-front-endo", name: "Front tooth with endodontist", price: "€600" },
      {
        slug: "rct-front-endo-retreat",
        name: "Front tooth re-treatment with endodontist",
        price: "€700",
      },
      { slug: "rct-premolar-endo", name: "Premolar with endodontist", price: "€700" },
      {
        slug: "rct-premolar-endo-retreat",
        name: "Premolar re-treatment with endodontist",
        price: "€800",
      },
      { slug: "rct-molar-endo", name: "Molar with endodontist", price: "€800" },
      { slug: "rct-molar-endo-retreat", name: "Molar re-treatment with endodontist", price: "€900" },
      {
        slug: "pulp-dressing",
        name: "Pulp dressing / emergency canal opening",
        price: "€170 to €200",
      },
    ],
  },
  {
    slug: "extractions",
    title: "Extractions",
    items: [
      { slug: "extraction-regular", name: "Regular extraction", price: "€120 to €220" },
      { slug: "extraction-surgical", name: "Surgical extraction", price: "€220 to €350" },
      { slug: "extraction-wisdom", name: "Wisdom tooth extraction", price: "€250 to €550" },
    ],
  },
  {
    slug: "dental-implants",
    title: "Dental implants",
    items: [
      { slug: "implant", name: "Implant", price: "From €950" },
      { slug: "crown-on-implant", name: "Crown on implant", price: "From €950" },
      { slug: "implant-explantation", name: "Implant explantation", price: "From €400" },
    ],
  },
  {
    slug: "other-surgery",
    title: "Other surgery",
    items: [
      { slug: "sinus-lift", name: "Sinus lift", price: "€1,200 to €2,200" },
      { slug: "bone-graft", name: "Bone graft", price: "€400 to €2,300" },
      { slug: "gingivectomy", name: "Gingivectomy", price: "From €300" },
      { slug: "frenectomy", name: "Frenectomy", price: "€250 to €500" },
      { slug: "open-flap-surgery", name: "Open flap surgery", price: "From €300" },
      { slug: "iv-sedation", name: "IV sedation", price: "From €350" },
      { slug: "biopsy", name: "Biopsy", price: "From €250" },
    ],
  },
  {
    slug: "childrens-treatments",
    title: "Children's treatments",
    items: [
      { slug: "child-exam", name: "Exam", price: "€50" },
      { slug: "child-exam-xray", name: "Exam, X-ray and prescription", price: "€80" },
      { slug: "child-filling-deciduous", name: "Filling on a deciduous tooth", price: "From €100" },
      { slug: "child-filling-permanent", name: "Filling on a permanent tooth", price: "From €120" },
      { slug: "child-extraction", name: "Extraction of temporary tooth", price: "From €90" },
      { slug: "fissure-sealant", name: "Fissure sealant", price: "€50 per tooth" },
    ],
  },
];

const priceIndex = new Map<string, PriceItem>(
  priceGroups.flatMap((group) => group.items.map((item): [string, PriceItem] => [item.slug, item])),
);

/**
 * Look up a single price by slug. Returns undefined rather than throwing, so a mistyped
 * slug degrades to "price on request" instead of taking a page down.
 */
export function getPrice(slug: string): PriceItem | undefined {
  return priceIndex.get(slug);
}

export function getPrices(slugs: readonly string[]): PriceItem[] {
  return slugs.map((slug) => getPrice(slug)).filter((item): item is PriceItem => Boolean(item));
}

export function getPriceGroup(slug: string): PriceGroup | undefined {
  return priceGroups.find((group) => group.slug === slug);
}
