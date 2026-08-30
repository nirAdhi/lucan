import { getGoogleRating } from "@/lib/googleRating";
import { Card, Container, Section, SectionHeading } from "@/components/ui/Layout";
import { GoogleRating } from "@/components/sections/GoogleRating";

/**
 * Real Google review quotes (never invented testimonials) - renders the whole section as
 * nothing until content/site.ts's googlePlaceId and GOOGLE_PLACES_API_KEY are both set and
 * Google actually returns review text. See lib/googleRating.ts.
 */
export async function GoogleReviews() {
  const rating = await getGoogleRating();
  if (!rating || rating.reviews.length === 0) return null;

  return (
    <Section tone="tint">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Reviews" title="What patients say" />
          <GoogleRating />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rating.reviews.map((review, i) => (
            <Card as="li" key={`${review.author}-${i}`}>
              <StarRow value={review.rating} />
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-ink-900">
                {review.author}
                {review.relativeTime ? (
                  <span className="ml-2 font-normal text-ink-400">{review.relativeTime}</span>
                ) : null}
              </p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function StarRow({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            fill={i < Math.round(value) ? "currentColor" : "var(--color-ink-200)"}
            d="m10 1.5 2.47 5.51 6 .59-4.53 4.01 1.32 5.89L10 14.6l-5.26 2.9 1.32-5.89L1.53 7.6l6-.59L10 1.5Z"
          />
        </svg>
      ))}
    </div>
  );
}
