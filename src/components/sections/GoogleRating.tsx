import { getGoogleRating } from "@/lib/googleRating";

/** Renders nothing until a real rating is available - see lib/googleRating.ts. */
export async function GoogleRating({ inverted = false }: { inverted?: boolean }) {
  const rating = await getGoogleRating();
  if (!rating) return null;

  return (
    <a
      href={rating.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium ${
        inverted ? "text-brand-100 hover:text-white" : "text-ink-600 hover:text-brand-800"
      }`}
    >
      <StarIcon className={inverted ? "text-gold-400" : "text-gold-500"} />
      <span className="font-semibold">{rating.value.toFixed(1)}</span>
      <span>from {rating.count} Google reviews</span>
    </a>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="m10 1.5 2.47 5.51 6 .59-4.53 4.01 1.32 5.89L10 14.6l-5.26 2.9 1.32-5.89L1.53 7.6l6-.59L10 1.5Z"
      />
    </svg>
  );
}
