"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Records the treatment_view event (PRD s40).
 *
 * Kept as a tiny client island so the treatment page itself stays a server component and
 * ships no other JavaScript.
 */
export function TreatmentView({
  slug,
  name,
  category,
}: {
  slug: string;
  name: string;
  category: string;
}) {
  useEffect(() => {
    track("treatment_view", { treatment: slug, treatment_name: name, category });
  }, [slug, name, category]);

  return null;
}
