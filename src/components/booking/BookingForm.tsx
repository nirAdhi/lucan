"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { bookingReasons, timePreferences } from "@/content/booking";
import { team } from "@/content/team";
import { treatments } from "@/content/treatments";
import { site } from "@/content/site";
import { readAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

/**
 * Appointment request form (PRD s31, s35, s38).
 *
 * Phase 1 is a request, not a booked slot: the practice confirms the time. The form is
 * honest about that, because promising a confirmed appointment the system cannot hold
 * would be worse than the phone call it replaces. Phase 3 swaps the date/time preference
 * for real availability (PRD s33) without changing the fields around it.
 *
 * Funnel events: booking_started fires once on first interaction, booking_completed on a
 * successful submission - the conversion Google Ads should optimise for (PRD s41).
 */

type Errors = Record<string, string>;

const inputClass =
  "w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-[0.95rem] text-ink-800 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30";

const labelClass = "block text-sm font-semibold text-ink-700";

export function BookingForm() {
  const params = useSearchParams();
  const startedRef = useRef(false);

  const reasonFromUrl = params.get("reason") ?? "";
  const treatmentFromUrl = params.get("treatment") ?? "";

  const [reason, setReason] = useState(
    bookingReasons.some((option) => option.value === reasonFromUrl) ? reasonFromUrl : "",
  );
  const [treatment, setTreatment] = useState(
    treatments.some((item) => item.slug === treatmentFromUrl) ? treatmentFromUrl : "",
  );
  const [minDate, setMinDate] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");

  // Set on the client so the server-rendered HTML cannot disagree about today's date.
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  function onFirstInteraction() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("booking_started", { reason: reason || "unset", treatment: treatment || undefined });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setErrors({});
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const body = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      reason,
      treatment,
      dentist: form.get("dentist"),
      preferredDate: form.get("preferredDate"),
      preferredTime: form.get("preferredTime"),
      isNewPatient: form.get("isNewPatient") === "on",
      message: form.get("message"),
      consent: form.get("consent") === "on",
      marketingConsent: form.get("marketingConsent") === "on",
      company: form.get("company"),
      attribution: readAttribution(),
    };

    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: Errors;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.error ??
            (data.errors ? "Please check the highlighted fields." : "Something went wrong."),
        );
        setStatus("idle");
        return;
      }

      track("booking_completed", { reason, treatment: treatment || undefined });
      track("lead_created", { source: "website", reason });
      setStatus("sent");
    } catch {
      setFormError(
        `We could not submit your request. Please phone the practice on ${site.phone}.`,
      );
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-brand-200 bg-brand-50 p-8"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl text-brand-900">Request received</h2>
        <p className="mt-3 leading-relaxed text-ink-600">
          Thank you. The practice will be in touch to confirm your appointment. Requests are
          answered during opening hours, Monday to Friday, 9am to 5pm.
        </p>
        <p className="mt-4 leading-relaxed text-ink-600">
          If your problem is urgent, please phone{" "}
          <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-700 underline">
            {site.phone}
          </a>{" "}
          rather than waiting for a reply.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/new-patients" className="text-brand-700 hover:underline">
            What to expect at your first visit &rarr;
          </Link>
          <Link href="/pricing" className="text-brand-700 hover:underline">
            Price list &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const selectedReason = bookingReasons.find((option) => option.value === reason);

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      noValidate
      className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="reason" className={labelClass}>
            What is the appointment for? <Required />
          </label>
          <select
            id="reason"
            name="reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className={`${inputClass} mt-1.5`}
            aria-describedby={errors.reason ? "reason-error" : "reason-hint"}
            aria-invalid={Boolean(errors.reason)}
          >
            <option value="">Please choose...</option>
            {bookingReasons.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <p id="reason-hint" className="mt-1.5 text-sm text-ink-400">
            {selectedReason?.hint ?? "Not sure? Choose an examination and we will advise."}
          </p>
          <FieldError id="reason-error" message={errors.reason} />

          {selectedReason?.urgent ? (
            <p className="mt-3 rounded-xl bg-urgent-50 px-4 py-3 text-sm leading-relaxed text-urgent-700">
              For a dental emergency, please phone{" "}
              <a href={`tel:${site.phoneE164}`} className="font-semibold underline">
                {site.phone}
              </a>{" "}
              so we can triage the problem. Online requests are only picked up during opening
              hours.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="treatment" className={labelClass}>
            Treatment you are interested in
          </label>
          <select
            id="treatment"
            name="treatment"
            value={treatment}
            onChange={(event) => setTreatment(event.target.value)}
            className={`${inputClass} mt-1.5`}
          >
            <option value="">Not sure / general</option>
            {treatments.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate" className={labelClass}>
              Preferred date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              min={minDate || undefined}
              className={`${inputClass} mt-1.5`}
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className={labelClass}>
              Preferred time
            </label>
            <select id="preferredTime" name="preferredTime" className={`${inputClass} mt-1.5`}>
              {timePreferences.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dentist" className={labelClass}>
            Dentist
          </label>
          <select id="dentist" name="dentist" className={`${inputClass} mt-1.5`}>
            <option value="">Any dentist / earliest appointment</option>
            {team.map((member) => (
              <option key={member.slug} value={member.name}>
                {member.name} &mdash; {member.role}
              </option>
            ))}
          </select>
        </div>

        <hr className="border-ink-100" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your name <Required />
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={`${inputClass} mt-1.5`}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <Required />
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={`${inputClass} mt-1.5`}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            />
            <p id="phone-hint" className="mt-1.5 text-sm text-ink-400">
              We confirm appointments by phone.
            </p>
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${inputClass} mt-1.5`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <label className="flex items-start gap-3 text-[0.95rem] text-ink-600">
          <input
            type="checkbox"
            name="isNewPatient"
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-700"
          />
          <span>I am a new patient</span>
        </label>

        <div>
          <label htmlFor="message" className={labelClass}>
            Anything we should know?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${inputClass} mt-1.5`}
            placeholder="Symptoms, previous treatment, or if you are anxious about dental visits."
          />
          <p className="mt-1.5 text-sm text-ink-400">
            Please keep this brief and avoid sending detailed medical information through the
            website.
          </p>
        </div>

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="rounded-xl bg-ink-50 p-4">
          <label className="flex items-start gap-3 text-[0.95rem] text-ink-600">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-700"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree that the practice may contact me about this appointment request. See our{" "}
              <Link href="/privacy" className="font-semibold text-brand-700 underline">
                privacy notice
              </Link>
              . <Required />
            </span>
          </label>
          <FieldError id="consent-error" message={errors.consent} />

          <label className="mt-3 flex items-start gap-3 text-[0.95rem] text-ink-600">
            <input
              type="checkbox"
              name="marketingConsent"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-700"
            />
            <span>
              I would also like occasional practice news and reminders. Optional, and you can
              opt out at any time.
            </span>
          </label>
        </div>

        {formError ? (
          <p role="alert" className="rounded-xl bg-urgent-50 px-4 py-3 text-sm text-urgent-700">
            {formError}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Request appointment"}
          </Button>
          <p className="text-sm text-ink-400">
            Or phone{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-700 underline">
              {site.phone}
            </a>
          </p>
        </div>

        <p className="text-xs leading-relaxed text-ink-400">
          This is an appointment request, not a confirmed booking. The practice will contact you
          to confirm a time. {site.cancellationNote}
        </p>
      </div>
    </form>
  );
}

function Required() {
  return (
    <span className="text-urgent-600" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-urgent-700">
      {message}
    </p>
  );
}
