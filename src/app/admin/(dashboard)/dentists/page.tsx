import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDentist } from "./actions";

export const dynamic = "force-dynamic";

export default async function DentistsListPage() {
  const dentists = await prisma.dentist.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Dentists</h1>
        <Link
          href="/admin/dentists/new"
          className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Add dentist
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200 bg-white">
        {dentists.map((dentist) => (
          <li key={dentist.id} className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              {dentist.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={dentist.photoUrl}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
                  {dentist.name
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join("")}
                </span>
              )}
              <div>
                <p className="font-semibold text-ink-900">{dentist.name}</p>
                <p className="text-sm text-ink-500">{dentist.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/dentists/${dentist.id}`}
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteDentist.bind(null, dentist.id)}>
                <button type="submit" className="text-sm font-semibold text-urgent-700 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {dentists.length === 0 ? (
          <li className="p-5 text-sm text-ink-500">No dentists yet. Add the first one above.</li>
        ) : null}
      </ul>
    </div>
  );
}
