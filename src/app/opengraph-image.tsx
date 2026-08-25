import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * Default social-share card for every page that does not pass its own `ogImage` to
 * buildMetadata() (see lib/seo.ts). Next wires this in automatically via the
 * opengraph-image file convention - no per-page change needed.
 */
export const runtime = "nodejs";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/ldic-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #faf8f5 0%, #dff1ef 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={620} height={389} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#123a37",
            fontWeight: 600,
          }}
        >
          {site.tagline}
        </div>
        <div style={{ marginTop: 14, fontSize: 24, color: "#347f76" }}>
          {`${site.address.locality}, ${site.address.region} · ${site.phone}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
