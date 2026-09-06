import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Layout";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";

/**
 * Full-bleed hero with a video (or animated gradient) backdrop.
 *
 * The negative top margin pulls the hero up under the floating header pill so the backdrop
 * runs to the very top of the page; the matching top padding keeps the content clear of it.
 * Values track the header's height in components/layout/SiteHeader.tsx - if that changes,
 * change these too.
 *
 * The dark overlay is not decoration: it is what keeps white body copy above 4.5:1 contrast
 * over arbitrary video frames. Do not lighten it without re-checking against a bright frame.
 */
export function VideoHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate -mt-24 flex min-h-[36rem] items-center overflow-hidden lg:min-h-[42rem]">
      <HeroBackdrop
        src={site.heroVideo.src}
        srcSmall={site.heroVideo.srcSmall}
        poster={site.heroVideo.poster}
      />

      {/* Measured against the clip's brightest frames - see .hero-scrim in globals.css. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0 -z-10" />

      <Container width="wide">
        {/* Copy sits directly on the video - no panel. Legibility comes from the scrim
            plus the glyph shadow on .hero-copy (globals.css). */}
        <div className="max-w-2xl py-24 pt-[9.5rem] lg:py-28 lg:pt-[11.5rem]">{children}</div>
      </Container>
    </section>
  );
}
