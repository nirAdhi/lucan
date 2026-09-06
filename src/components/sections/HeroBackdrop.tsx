"use client";

import { useEffect, useState } from "react";

/**
 * Background layer for the video hero.
 *
 * The video is deliberately NOT in the server-rendered HTML. It is mounted from an effect
 * only once we know the visitor actually wants it, because a hero video is the single
 * easiest way to wreck LCP and burn a mobile data plan:
 *
 *  - `prefers-reduced-motion: reduce` - never loads. Motion behind text is exactly what
 *    that setting exists to prevent.
 *  - Save-Data header / 2g / slow-2g - never loads.
 *  - Otherwise it loads *after* first paint, so the poster (or gradient) is the LCP
 *    element, not a multi-megabyte download.
 *
 * With no video configured (the default - see site.heroVideo in content/site.ts) this
 * renders an animated brand gradient instead, so the hero still feels alive rather than
 * showing an empty box or a placeholder that looks like a missing asset.
 */
export function HeroBackdrop({
  src,
  srcSmall,
  poster,
}: {
  src?: string;
  srcSmall?: string;
  poster?: string;
}) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

    // Picked once, from the width at mount. Deliberately not reactive to resize: swapping
    // the source mid-playback restarts the clip, which is far more jarring than a phone
    // held sideways getting the smaller encode.
    const small = srcSmall && window.matchMedia("(max-width: 820px)").matches;
    setResolvedSrc(small ? srcSmall : src);
  }, [src, srcSmall]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-brand-900">
      {/* Animated brand gradient: the always-there base layer, and the whole backdrop when
          no video is configured. Pauses under prefers-reduced-motion (see globals.css). */}
      <div className="hero-gradient absolute inset-0" />

      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- decorative backdrop, sized by CSS
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}

      {resolvedSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={resolvedSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : null}
    </div>
  );
}
