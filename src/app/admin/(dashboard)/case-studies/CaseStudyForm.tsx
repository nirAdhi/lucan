"use client";

import type { CaseStudy } from "@prisma/client";
import { treatments } from "@/content/treatments";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30";
const labelClass = "block text-sm font-semibold text-ink-700";

export function CaseStudyForm({
  caseStudy,
  action,
}: {
  caseStudy?: CaseStudy;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="treatmentSlug" className={labelClass}>
          Treatment
        </label>
        <select
          id="treatmentSlug"
          name="treatmentSlug"
          required
          defaultValue={caseStudy?.treatmentSlug}
          className={inputClass}
          onChange={(e) => {
            const label = e.currentTarget.selectedOptions[0]?.text ?? "";
            const labelInput = e.currentTarget.form?.elements.namedItem(
              "treatmentLabel",
            ) as HTMLInputElement | null;
            if (labelInput && !labelInput.value) labelInput.value = label;
          }}
        >
          <option value="">Choose a treatment</option>
          {treatments.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="treatmentLabel" className={labelClass}>
          Display label (shown under the photos)
        </label>
        <input
          id="treatmentLabel"
          name="treatmentLabel"
          required
          defaultValue={caseStudy?.treatmentLabel}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="caption" className={labelClass}>
          Caption
        </label>
        <textarea
          id="caption"
          name="caption"
          rows={2}
          defaultValue={caseStudy?.caption}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="beforePhoto" className={labelClass}>
            Before photo {caseStudy ? "(leave blank to keep current)" : ""}
          </label>
          {caseStudy?.beforePhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={caseStudy.beforePhotoUrl} alt="" className="mt-2 h-24 w-24 rounded-lg object-cover" />
          ) : null}
          <input
            id="beforePhoto"
            name="beforePhoto"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required={!caseStudy}
            className="mt-1.5 block text-sm"
          />
        </div>
        <div>
          <label htmlFor="afterPhoto" className={labelClass}>
            After photo {caseStudy ? "(leave blank to keep current)" : ""}
          </label>
          {caseStudy?.afterPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={caseStudy.afterPhotoUrl} alt="" className="mt-2 h-24 w-24 rounded-lg object-cover" />
          ) : null}
          <input
            id="afterPhoto"
            name="afterPhoto"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required={!caseStudy}
            className="mt-1.5 block text-sm"
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm text-ink-700">
        <input
          type="checkbox"
          name="consentConfirmed"
          defaultChecked={caseStudy?.consentConfirmed}
          className="mt-0.5"
        />
        <span>
          The patient has given documented consent for these photos to be published on the
          website. <strong>Unchecked case studies never appear on the public site.</strong>
        </span>
      </label>

      <div>
        <label htmlFor="order" className={labelClass}>
          Display order (lower shows first)
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={caseStudy?.order ?? 0}
          className={`${inputClass} max-w-[10rem]`}
        />
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
