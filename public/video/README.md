# Homepage hero video

Drop the practice's clip here, then point `site.heroVideo` in `src/content/site.ts` at it:

```ts
heroVideo: {
  src: "/video/hero.mp4",
  poster: "/video/hero-poster.jpg",
},
```

Until both are set, the hero renders an animated brand gradient instead — it is not broken,
it just has nothing to play.

## What the file needs to be

| | |
| --- | --- |
| Format | MP4 (H.264 + AAC, or no audio track at all) |
| Length | 10–20s, cut so the loop point isn't jarring |
| Size | **under ~4MB.** 1080p at ~2Mbps. This is a phone download. |
| Audio | Irrelevant — it plays muted and there is no unmute control |
| Poster | A good still frame. Many mobile visitors only ever see this. |

## How it behaves

Deliberately conservative, because a hero video is the easiest way to wreck page speed
(see `src/components/sections/HeroBackdrop.tsx`):

- Not in the server-rendered HTML — mounted after first paint, so the poster is the LCP
  element, not the video.
- **Never downloads** for visitors with `prefers-reduced-motion: reduce`, Save-Data on, or
  a 2g connection. They get the poster/gradient.
- Muted, looping, `playsInline` (iOS won't go fullscreen).

## Before you use footage of a patient

Anyone identifiable in the clip needs documented consent — the same rule the case-study
gallery and `content/stories.ts` already follow. Footage of the team, the rooms, or the
equipment sidesteps this entirely, as does properly licensed stock.

Whatever you use, keep the licence on file. Stock libraries with clips suitable for this
(Pexels, Coverr, Artgrid) or AI-generated footage are both fine — the Sologix site this was
modelled on uses AI-generated video for exactly this reason.
