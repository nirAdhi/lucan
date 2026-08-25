/**
 * Appointment types and request options (PRD s32).
 *
 * The `value` strings are the contract between three places: the query string a treatment
 * page sends (`?reason=Implant consultation`), the form's select, and the API's validation.
 * Keep them stable - Phase 3 maps them onto `appointment_types` rows with real durations.
 */

export type BookingReason = {
  value: string;
  /** Rough appointment length, shown to set expectations. Confirmed by the practice. */
  duration?: string;
  hint?: string;
  urgent?: boolean;
};

export const bookingReasons: BookingReason[] = [
  {
    value: "New patient examination",
    hint: "First visit: examination, discussion and a written treatment plan",
  },
  { value: "General examination", hint: "Routine check-up for existing patients" },
  { value: "Hygiene / scale and polish", hint: "Cleaning appointment, with or without Airflow" },
  {
    value: "Emergency appointment",
    hint: "Pain, swelling, a broken tooth or a lost filling or crown",
    urgent: true,
  },
  { value: "Implant consultation", hint: "Assessment and planning for dental implants" },
  { value: "Orthodontic consultation", hint: "Clear aligners or fixed braces" },
  { value: "Cosmetic consultation", hint: "Whitening, bonding, veneers or a smile makeover" },
  { value: "Consultation", hint: "Any other treatment you would like to discuss" },
  { value: "Children's appointment", hint: "Examination or treatment for a child" },
];

export const timePreferences = [
  "Any time",
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 5pm)",
  "First available",
] as const;

export function isValidReason(value: string): boolean {
  return bookingReasons.some((reason) => reason.value === value);
}
