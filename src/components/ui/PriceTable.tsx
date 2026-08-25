import type { PriceGroup, PriceItem } from "@/content/pricing";

/**
 * Price tables (PRD s44).
 *
 * Wrapped in an overflow-x container so a long price row never forces the page body to
 * scroll sideways on a phone.
 */
export function PriceTable({ items, caption }: { items: PriceItem[]; caption?: string }) {
  if (items.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-ink-200">
      <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
        {caption ? (
          <caption className="border-b border-ink-200 bg-ink-50 px-5 py-3 text-left text-base font-semibold text-ink-800">
            {caption}
          </caption>
        ) : null}
        <thead className="sr-only">
          <tr>
            <th scope="col">Treatment</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {items.map((item) => (
            <tr key={item.slug} className="align-top">
              <th scope="row" className="px-5 py-3.5 font-medium text-ink-700">
                {item.name}
                {item.note ? (
                  <span className="mt-0.5 block text-xs font-normal text-ink-400">{item.note}</span>
                ) : null}
              </th>
              <td className="whitespace-nowrap px-5 py-3.5 text-right font-semibold text-brand-800">
                {item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PriceGroupTable({ group }: { group: PriceGroup }) {
  return (
    <div id={group.slug} className="scroll-mt-28">
      <PriceTable items={group.items} caption={group.title} />
    </div>
  );
}
