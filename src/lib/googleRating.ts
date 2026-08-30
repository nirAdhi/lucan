import { site } from "@/content/site";

/**
 * Live Google rating, fetched server-side - never a hardcoded number. Returns null (and the
 * UI renders nothing) until both `site.googlePlaceId` (content/site.ts, TODO(verify)) and
 * the `GOOGLE_PLACES_API_KEY` env var are set, and again if Google's API errors, so a
 * billing lapse or bad key degrades to "no badge" rather than a broken page.
 */
export type GoogleRating = { value: number; count: number; url: string };

export async function getGoogleRating(): Promise<GoogleRating | null> {
  const placeId = site.googlePlaceId;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: "rating,user_ratings_total,url",
      key: apiKey,
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK" || typeof data.result?.rating !== "number") return null;

    return {
      value: data.result.rating,
      count: typeof data.result.user_ratings_total === "number" ? data.result.user_ratings_total : 0,
      url: typeof data.result.url === "string" ? data.result.url : `https://search.google.com/local/writereview?placeid=${placeId}`,
    };
  } catch {
    return null;
  }
}
