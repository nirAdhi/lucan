import { site } from "@/content/site";

/**
 * Live Google rating (and real review quotes), fetched server-side - never a hardcoded
 * number or invented testimonial. Returns null (and the UI renders nothing) until both
 * `site.googlePlaceId` (content/site.ts, TODO(verify)) and the `GOOGLE_PLACES_API_KEY` env
 * var are set, and again if Google's API errors, so a billing lapse or bad key degrades to
 * "no badge/no reviews section" rather than a broken page.
 */
export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleRating = {
  value: number;
  count: number;
  url: string;
  /** Up to 5 real reviews Google returns for a place - see components/sections/GoogleReviews.tsx. */
  reviews: GoogleReview[];
};

export async function getGoogleRating(): Promise<GoogleRating | null> {
  const placeId = site.googlePlaceId;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: "rating,user_ratings_total,url,reviews",
      key: apiKey,
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK" || typeof data.result?.rating !== "number") return null;

    const rawReviews: unknown[] = Array.isArray(data.result.reviews) ? data.result.reviews : [];

    const reviews: GoogleReview[] = rawReviews
      .filter((r): r is Record<string, unknown> => typeof r === "object" && r !== null)
      .map(
        (r): GoogleReview => ({
          author: typeof r.author_name === "string" ? r.author_name : "Google user",
          rating: typeof r.rating === "number" ? r.rating : 5,
          text: typeof r.text === "string" ? r.text : "",
          relativeTime:
            typeof r.relative_time_description === "string" ? r.relative_time_description : "",
        }),
      )
      .filter((r) => r.text.length > 0)
      .slice(0, 5);

    return {
      value: data.result.rating,
      count: typeof data.result.user_ratings_total === "number" ? data.result.user_ratings_total : 0,
      url: typeof data.result.url === "string" ? data.result.url : `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews,
    };
  } catch {
    return null;
  }
}
