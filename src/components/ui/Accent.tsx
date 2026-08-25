import type { ReactNode } from "react";

/**
 * Italic editorial accent for a single emphasis word inside an otherwise plain heading,
 * e.g. `in the <Accent>heart</Accent> of Lucan`. Sparing by design - see lib/fonts.ts.
 */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-accent italic">{children}</em>;
}
