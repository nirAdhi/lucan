"use client";

import type { Testimonial } from "@prisma/client";
import { treatments } from "@/content/treatments";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30";
const labelClass = "block text-sm font-semibold text-ink-700";

/** Date input wants yyyy-mm-dd; Prisma hands back a Date. */
function asDateValue(date: Date | null | undefined) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="quote" className={labelClass}>
          What the patient said
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={5}
          defaultValue={testimonial?.quote}
          placeholder="In their own words - how they felt about the treatment and the visit."
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-ink-400">
          Publish it as they wrote it. Tidying spelling is fine; rewriting it into marketing
          copy is putting words in a patient&apos;s mouth.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className={labelClass}>
            Name as consented
          </label>
          <input
            id="author"
            name="author"
            required
            defaultValue={testimonial?.author}
            placeholder="e.g. Sarah M."
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-ink-400">First name or initials - never a full name.</p>
        </div>
        <div>
          <label htmlFor="area" className={labelClass}>
            Area (optional)
          </label>
          <input
            id="area"
            name="area"
            defaultValue={testimonial?.area ?? undefined}
            placeholder="e.g. Lucan"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="treatmentSlug" className={labelClass}>
            Treatment (optional)
          </label>
          <select
            id="treatmentSlug"
            name="treatmentSlug"
            defaultValue={testimonial?.treatmentSlug ?? ""}
            className={inputClass}
            onChange={(e) => {
              const label = e.currentTarget.selectedIndex > 0 ? e.currentTarget.selectedOptions[0].text : "";
              const labelInput = e.currentTarget.form?.elements.namedItem(
                "treatmentLabel",
              ) as HTMLInputElement | null;
              if (labelInput) labelInput.value = label;
            }}
          >
            <option value="">Not treatment-specific</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="treatmentLabel" className={labelClass}>
            Shown under the quote
          </label>
          <input
            id="treatmentLabel"
            name="treatmentLabel"
            defaultValue={testimonial?.treatmentLabel ?? undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rating" className={labelClass}>
            Rating they gave (optional)
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue={testimonial?.rating ?? ""}
            className={inputClass}
          >
            <option value="">No rating</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-ink-400">
            Only if they actually gave one. Leave blank otherwise.
          </p>
        </div>
        <div>
          <label htmlFor="order" className={labelClass}>
            Display order (lower shows first)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={testimonial?.order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div className="rounded-xl border border-gold-200 bg-gold-50 p-4">
        <label className="flex items-start gap-2.5 text-sm text-ink-700">
          <input
            type="checkbox"
            name="consentConfirmed"
            defaultChecked={testimonial?.consentConfirmed}
            className="mt-0.5"
          />
          <span>
            The patient has given documented consent for this to be published on the website.
            <strong> Without this ticked it never appears on the public site.</strong>
          </span>
        </label>
        <div className="mt-3">
          <label htmlFor="consentRecordedAt" className="block text-xs font-semibold text-ink-700">
            Date consent was recorded
          </label>
          <input
            id="consentRecordedAt"
            name="consentRecordedAt"
            type="date"
            defaultValue={asDateValue(testimonial?.consentRecordedAt)}
            className="mt-1 rounded-lg border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-800"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
      >
        Save
      </button>
    </form>
  );
}
