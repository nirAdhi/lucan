/**
 * Structured data (PRD s26).
 *
 * All JSON-LD is generated from the content modules rather than pasted into pages, so a
 * change to a price, an opening hour or a dentist's role updates the markup everywhere it
 * appears. Every entity is given a stable @id so the graph nodes can reference each other.
 *
 * Note on FAQPage: Google narrowed FAQ rich-result eligibility in 2023, so this markup is
 * emitted for machine-readability, not on the assumption it will produce a rich result.
 */

import { site } from "@/content/site";
import type { Faq } from "@/content/faqs";
import type { Post } from "@/content/posts";
import type { TeamMember } from "@/content/team";
import type { Treatment } from "@/content/treatments";
import { absoluteUrl, type Crumb } from "@/lib/seo";

const PRACTICE_ID = `${absoluteUrl("/")}#dentist`;
const WEBSITE_ID = `${absoluteUrl("/")}#website`;

type Json = Record<string, unknown>;

const dayUri = (day: string) => `https://schema.org/${day}`;

/** The practice itself: a Dentist is a LocalBusiness and a MedicalBusiness in schema.org. */
export function practiceSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": PRACTICE_ID,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/icon-512.png"),
    image: absoluteUrl("/brand/ldic-logo.png"),
    telephone: site.phoneE164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days.map(dayUri),
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: [
      { "@type": "Place", name: "Lucan, Co. Dublin" },
      { "@type": "Place", name: "Dublin West" },
    ],
    // Deliberately no aggregateRating: review markup must reflect real, collected reviews.
    ...(site.social.facebook || site.social.instagram
      ? { sameAs: [site.social.facebook, site.social.instagram].filter(Boolean) }
      : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "en-IE",
    publisher: { "@id": PRACTICE_ID },
  };
}

export function breadcrumbSchema(trail: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function treatmentSchema(treatment: Treatment): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/treatments/${treatment.slug}`)}#service`,
    name: treatment.name,
    serviceType: treatment.name,
    description: treatment.seo.description,
    url: absoluteUrl(`/treatments/${treatment.slug}`),
    provider: { "@id": PRACTICE_ID },
    areaServed: { "@type": "Place", name: "Lucan, Co. Dublin" },
    audience: { "@type": "Patient" },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function personSchema(member: TeamMember): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl(`/our-team/${member.slug}`)}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.summary,
    url: absoluteUrl(`/our-team/${member.slug}`),
    worksFor: { "@id": PRACTICE_ID },
    ...(member.qualifications ? { honorificSuffix: member.qualifications } : {}),
    knowsAbout: member.specialities,
  };
}

export function articleSchema(post: Post): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@id": PRACTICE_ID },
    inLanguage: "en-IE",
    articleSection: post.category,
  };
}
