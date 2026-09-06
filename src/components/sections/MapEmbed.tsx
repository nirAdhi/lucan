"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

const mapsQuery = encodeURIComponent(site.maps.query);
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

/**
 * Click-to-load wrapper around the Google Maps embed - see PracticeMap in LocationBlock.
 *
 * Until the button is pressed no request leaves the page, so Google sets no cookies. The
 * placeholder carries the address and a directions link so the section still does its job
 * for anyone who never loads the map.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Map showing ${site.name} in ${site.address.locality}`}
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[20rem] w-full border-0 lg:h-full lg:min-h-[26rem]"
      />
    );
  }

  return (
    <div className="flex h-[20rem] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-50 to-brand-100 p-6 text-center lg:h-full lg:min-h-[26rem]">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-[var(--shadow-soft)]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>

      <div>
        <p className="font-semibold text-ink-900">{site.name}</p>
        <p className="mt-1 text-sm text-ink-600">
          {site.address.street}, {site.address.locality}, {site.address.region}
        </p>
        <p className="mt-0.5 text-sm text-ink-500">{site.address.landmark}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            track("location_view", { cta_location: "map-embed" });
          }}
          className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Show map
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("location_view", { cta_location: "map-directions" })}
          className="rounded-full border border-brand-700 px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-white"
        >
          Get directions
        </a>
      </div>

      {/* Says why it isn't already there, so it doesn't read as a broken map. */}
      <p className="max-w-xs text-xs leading-relaxed text-ink-500">
        The map is not loaded until you ask for it, because Google sets cookies when it
        loads.
      </p>
    </div>
  );
}
