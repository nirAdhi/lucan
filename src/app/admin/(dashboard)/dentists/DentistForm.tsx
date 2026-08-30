import type { Dentist } from "@prisma/client";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30";
const labelClass = "block text-sm font-semibold text-ink-700";

export function DentistForm({
  dentist,
  allTreatments,
  action,
}: {
  dentist?: Dentist;
  allTreatments: { slug: string; name: string }[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required defaultValue={dentist?.name} className={inputClass} />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            URL slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            title="Lowercase letters, numbers and hyphens only"
            defaultValue={dentist?.slug}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <input id="role" name="role" required defaultValue={dentist?.role} className={inputClass} />
        </div>
        <div>
          <label htmlFor="qualifications" className={labelClass}>
            Qualifications
          </label>
          <input
            id="qualifications"
            name="qualifications"
            required
            defaultValue={dentist?.qualifications}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Short summary (card blurb)
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          defaultValue={dentist?.summary}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>
          Biography (one paragraph per line)
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          defaultValue={dentist?.bio.join("\n")}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="specialities" className={labelClass}>
            Specialities (one per line)
          </label>
          <textarea
            id="specialities"
            name="specialities"
            rows={4}
            defaultValue={dentist?.specialities.join("\n")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="languages" className={labelClass}>
            Languages (one per line, optional)
          </label>
          <textarea
            id="languages"
            name="languages"
            rows={4}
            defaultValue={dentist?.languages.join("\n")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <p className={labelClass}>Treatments led</p>
        <div className="mt-2 grid gap-2 rounded-xl border border-ink-200 p-4 sm:grid-cols-2">
          {allTreatments.map((treatment) => (
            <label key={treatment.slug} className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                name="treatments"
                value={treatment.slug}
                defaultChecked={dentist?.treatments.includes(treatment.slug)}
              />
              {treatment.name}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="registration" className={labelClass}>
            Dental Council registration (optional)
          </label>
          <input
            id="registration"
            name="registration"
            defaultValue={dentist?.registration ?? undefined}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="order" className={labelClass}>
            Display order (lower shows first)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={dentist?.order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="seoTitle" className={labelClass}>
            SEO title
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            required
            defaultValue={dentist?.seoTitle}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="seoDescription" className={labelClass}>
            SEO description
          </label>
          <input
            id="seoDescription"
            name="seoDescription"
            required
            defaultValue={dentist?.seoDescription}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="photo" className={labelClass}>
          Photo {dentist ? "(leave blank to keep the current one)" : ""}
        </label>
        {dentist?.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dentist.photoUrl} alt="" className="mt-2 h-20 w-20 rounded-full object-cover" />
        ) : null}
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="mt-1.5 block text-sm"
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
