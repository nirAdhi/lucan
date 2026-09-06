"use client";

import Image from "next/image";
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
export function HeroBackdrop({ src, poster }: { src?: string; poster?: string }) {
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

    // Desktop only. Measured on a throttled mobile profile, the video was 432KB arriving
    // right in the LCP window, and because it covers the same area as the poster it then
    // became a second, much later LCP candidate - 5.1s against 1.4s for the poster alone.
    // Half a megabyte of decorative background on a phone's data plan is a bad trade for
    // the visitor as well as for the metric, so small screens keep the (12KB) poster.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    // Even on desktop, wait for the main thread to settle first: mounting on hydration put
    // the download in a bandwidth fight with the poster, fonts and JS bundles.
    const idle = window.requestIdleCallback;
    if (idle) {
      const handle = idle(() => setResolvedSrc(src), { timeout: 4000 });
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(() => setResolvedSrc(src), 2500);
    return () => window.clearTimeout(timer);
  }, [src]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-brand-900">
      {/* Animated brand gradient: the always-there base layer, and the whole backdrop when
          no video is configured. Pauses under prefers-reduced-motion (see globals.css). */}
      <div className="hero-gradient absolute inset-0" />

      {poster ? (
        /* This is the hero's LCP element on any device that never loads the video, so it
           goes through next/image: resized per viewport and served as AVIF instead of one
           1600px JPEG for everyone. `priority` preloads it - without that the browser only
           discovers it after the CSS resolves, which showed up as "LCP request discovery". */
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      {resolvedSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={resolvedSrc}
          /* Deliberately no `poster`: the optimised <Image> above is already showing that
             exact frame underneath. Setting it here made the browser fetch the raw 105KB
             Cloudinary JPEG a second time, bypassing next/image entirely. */
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
