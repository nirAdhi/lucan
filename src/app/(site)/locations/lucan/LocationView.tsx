"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Records the location_view event (PRD s40). */
export function LocationView({ slug }: { slug: string }) {
  useEffect(() => {
    track("location_view", { location: slug });
  }, [slug]);

  return null;
}
