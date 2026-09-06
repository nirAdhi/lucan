import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export const dynamic = "force-dynamic";

export default async function TestimonialsListPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Testimonials</h1>
          <p className="mt-1 text-sm text-ink-500">
            What patients say after treatment. Only those with consent confirmed appear on the site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="shrink-0 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Add testimonial
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.id} className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5">
            <blockquote className="text-[0.95rem] leading-relaxed text-ink-600">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-ink-900">
              {t.author}
              {t.area ? <span className="font-normal text-ink-500"> &middot; {t.area}</span> : null}
            </p>
            {t.treatmentLabel ? (
              <p className="text-xs text-ink-400">{t.treatmentLabel}</p>
            ) : null}

            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-wide ${
                t.consentConfirmed ? "text-brand-700" : "text-urgent-700"
              }`}
            >
              {t.consentConfirmed
                ? `Published${t.consentRecordedAt ? ` · consent ${new Date(t.consentRecordedAt).toLocaleDateString("en-IE")}` : ""}`
                : "Hidden · no consent recorded"}
            </p>

            <div className="mt-3 flex gap-3">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button type="submit" className="text-sm font-semibold text-urgent-700 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {testimonials.length === 0 ? (
          <li className="col-span-full rounded-[var(--radius-card)] border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500">
            No testimonials yet. Add one above — it only goes live once &ldquo;consent confirmed&rdquo; is ticked.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
