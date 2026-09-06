/**
 * Practice-wide facts (NAP, hours, CTAs).
 *
 * Everything here is sourced from the live LDIC website (ldic.ie) as of August 2026.
 * Anything the practice must confirm before launch is marked TODO(verify).
 * In Phase 2 this module is replaced by the `practices` / `locations` tables (PRD s57).
 */

export const site = {
  name: "Lucan Dental & Implantology Centre",
  shortName: "LDIC",
  legalName: "Lucan Dental & Implantology Centre",
  tagline: "Dentistry and implantology in the heart of Lucan Village",
  description:
    "Lucan Dental & Implantology Centre provides general, cosmetic, restorative and implant dentistry in Lucan Village, Co. Dublin. Book online or call (01) 628 1500.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ldic.ie",
  locale: "en_IE",
  phone: "(01) 628 1500",
  phoneE164: "+35316281500",
  email: "info@ldic.ie",
  address: {
    // TODO(verify): confirm the exact street line and Eircode with the practice.
    // The live site states only "Carlaimar, Lucan Village (opposite AIB Bank)".
    // An Eircode is required for accurate LocalBusiness schema and Google Business Profile.
    street: "Carlaimar, Lucan Village",
    locality: "Lucan",
    region: "Co. Dublin",
    postalCode: "",
    countryCode: "IE",
    country: "Ireland",
    landmark: "Opposite AIB Bank",
  },
  // TODO(verify): replace with the practice's Google Business Profile coordinates.
  geo: { latitude: 53.3561, longitude: -6.4489 },
  maps: {
    // Query-based embed/link needs no API key and stays correct if the pin moves.
    query: "Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin",
  },
  hours: [
    { label: "Monday", days: ["Monday"], opens: "09:00", closes: "17:00" },
    { label: "Tuesday", days: ["Tuesday"], opens: "09:00", closes: "17:00" },
    { label: "Wednesday", days: ["Wednesday"], opens: "09:00", closes: "17:00" },
    { label: "Thursday", days: ["Thursday"], opens: "09:00", closes: "17:00" },
    { label: "Friday", days: ["Friday"], opens: "09:00", closes: "17:00" },
  ],
  hoursNote: "Some Saturdays by appointment only.",
  cancellationNote:
    "The practice asks for at least 24 hours' notice to reschedule an appointment.",
  social: {
    /**
     * Feed the floating SocialRail and Organization `sameAs`. Each renders only when set.
     *
     * TODO(verify): Facebook. The link on the live ldic.ie is
     * `facebook.com/share/16spoFg...tid=wwXIfr` - a truncated share URL with a literal
     * "..." in it, so it is broken there too. Needs the real page URL from the practice
     * rather than a guess.
     */
    facebook: "" as string,
    instagram: "https://www.instagram.com/lucandentalimplantologycentre" as string,
  },
  // TODO(verify): WhatsApp Business number in E.164 (e.g. "+353871234567"). The practice
  // phone is a landline, so this needs to be whichever mobile actually has WhatsApp
  // Business on it. The rail's WhatsApp button renders only once this is set.
  whatsapp: "" as string,
  // TODO(verify): the practice's Google Place ID, e.g. from
  // https://developers.google.com/maps/documentation/places/web-service/place-id-finder.
  // GoogleRating fetches the live rating server-side from this - never a hardcoded number -
  // and renders nothing until it's set. Also needs a GOOGLE_PLACES_API_KEY env var.
  googlePlaceId: "" as string,
  /**
   * Homepage hero backdrop (components/sections/VideoHero.tsx).
   *
   * Served from Cloudinary with delivery transformations in the URL rather than as a file
   * in public/, so the master upload stays untouched and the browser gets a right-sized,
   * re-encoded copy. The source master is 1920x1080 / 19s / 6.4MB, which is far too heavy
   * to put behind an H1; the transformations below do the work:
   *
   *   f_auto:video  negotiate the format (WebM to Chrome, MP4 to Safari)
   *   q_auto        quality by content, not a fixed bitrate
   *   w_*,c_limit   cap the width, never upscale
   *
   * Measured result: 6.4MB master -> 1.96MB. Only desktop loads it at all: on a throttled
   * mobile profile the video landed in the LCP window and, covering the same area as the
   * poster, became a second LCP candidate at 5.1s. Phones get the poster (12KB via
   * next/image) instead - see components/sections/HeroBackdrop.tsx.
   *
   * `so_2` on the poster is the frame at 2s - chosen because the subject sits right of
   * frame, leaving the clean left side under the headline.
   *
   * CONSENT: anyone identifiable in this footage needs documented consent or a stock
   * licence on file - the same rule content/stories.ts and the case-study gallery follow.
   */
  heroVideo: {
    src: "https://res.cloudinary.com/dsiratycd/video/upload/e_contrast:-25,e_brightness:18,f_auto:video,q_auto,w_1440,c_limit/v1788643812/Lucan_Dental_Dashboard_Loop_v2_muted_gvinva.mp4" as string,
    poster:
      "https://res.cloudinary.com/dsiratycd/video/upload/so_2,e_contrast:-25,e_brightness:18,f_jpg,q_auto,w_1600,c_limit/v1788643812/Lucan_Dental_Dashboard_Loop_v2_muted_gvinva.jpg" as string,
  },
} as const;

export const cta = {
  book: { label: "Book Appointment", href: "/book" },
  emergency: { label: "Emergency Dental Care", href: "/emergency-dentist-lucan" },
  call: { label: `Call ${site.phone}`, href: `tel:${site.phoneE164}` },
} as const;

/** Main navigation (PRD s5). */
export const mainNav = [
  { label: "Treatments", href: "/treatments" },
  { label: "New Patients", href: "/new-patients" },
  { label: "Our Team", href: "/our-team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Patient Stories", href: "/patient-stories" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Reasons-to-choose used on the homepage and treatment pages (PRD s6). */
export const whyChoose = [
  {
    title: "A specialist-led implant team",
    body: "Implant and gum surgery is carried out by dentists with postgraduate training in periodontology and oral surgery, alongside general and cosmetic dentists for everyday care.",
  },
  {
    title: "Diagnostics on site",
    body: "Digital X-rays, OPG and CT scanning are available in the practice, so planning does not require a separate trip elsewhere.",
  },
  {
    title: "Written treatment plans",
    body: "Options are explained and set out in writing, with prices, before treatment begins.",
  },
  {
    title: "Care for anxious patients",
    body: "Sedation dentistry is available, in a calm environment designed to make appointments easier.",
  },
  {
    title: "PRSI and children's care",
    body: "PRSI examinations and scale-and-polish are offered subject to eligibility, and the practice treats children as well as adults.",
  },
  {
    title: "In the centre of Lucan Village",
    body: "Opposite AIB Bank in Lucan Village, convenient for Lucan, Adamstown, Palmerstown, Clondalkin and Dublin West.",
  },
] as const;
