import { prisma } from "@/lib/prisma";
import { createPriceItem, deletePriceItem, updatePriceItem } from "./actions";

export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded-lg border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30";

export default async function PricingAdminPage() {
  const items = await prisma.priceItem.findMany({
    orderBy: [{ groupOrder: "asc" }, { itemOrder: "asc" }],
  });

  const groups = new Map<string, { title: string; items: typeof items }>();
  for (const item of items) {
    if (!groups.has(item.groupSlug)) {
      groups.set(item.groupSlug, { title: item.groupTitle, items: [] });
    }
    groups.get(item.groupSlug)!.items.push(item);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Pricing</h1>
      <p className="mt-1 text-sm text-ink-500">
        Edits appear on the public price list immediately after saving.
      </p>

      <div className="mt-8 space-y-10">
        {[...groups.entries()].map(([groupSlug, group]) => (
          <section key={groupSlug}>
            <h2 className="text-lg font-semibold text-ink-900">{group.title}</h2>
            <div className="mt-3 divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200 bg-white">
              {group.items.map((item) => (
                <form
                  key={item.id}
                  action={updatePriceItem.bind(null, item.id)}
                  className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[1fr_140px_1fr_auto]"
                >
                  <input name="name" defaultValue={item.name} className={inputClass} />
                  <input name="price" defaultValue={item.price} className={inputClass} />
                  <input name="note" defaultValue={item.note ?? ""} placeholder="Note (optional)" className={inputClass} />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-[var(--radius-card)] border border-ink-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-ink-900">Add a price item</h2>
        <form action={createPriceItem} className="mt-3 grid gap-3 sm:grid-cols-2">
          <input name="slug" placeholder="Slug (e.g. new-item)" required className={inputClass} />
          <input name="name" placeholder="Name" required className={inputClass} />
          <input name="price" placeholder="Price (e.g. €120 or From €500)" required className={inputClass} />
          <input name="note" placeholder="Note (optional)" className={inputClass} />
          <input name="groupSlug" placeholder="Group slug (e.g. general-dentistry)" required className={inputClass} />
          <input name="groupTitle" placeholder="Group title (e.g. General dentistry)" required className={inputClass} />
          <button
            type="submit"
            className="col-span-full justify-self-start rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Add item
          </button>
        </form>
      </section>

      <DeleteList items={items} />
    </div>
  );
}

function DeleteList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-ink-900">Remove an item</h2>
      <ul className="mt-3 divide-y divide-ink-200 rounded-[var(--radius-card)] border border-ink-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-4">
            <span className="text-sm text-ink-700">{item.name}</span>
            <form action={deletePriceItem.bind(null, item.id)}>
              <button type="submit" className="text-sm font-semibold text-urgent-700 hover:underline">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
