import type { Metadata } from "next";
import Link from "next/link";
import { publishedPosts } from "@/content/posts";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section } from "@/components/ui/Layout";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { LinkButton } from "@/components/ui/Button";

const trail = crumbs({ name: "Blog", path: "/blog" });

export const metadata: Metadata = buildMetadata({
  title: "Dental Advice & Practice News | LDIC Lucan",
  description:
    "Articles from Lucan Dental & Implantology Centre on treatment, costs and what to expect at the practice in Lucan Village, Co. Dublin.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="From the practice"
        intro="Straightforward articles about treatment, costs and what to expect - written for patients, not for search engines."
        trail={trail}
      />

      <Section>
        <Container width="wide">
          {publishedPosts.length > 0 ? (
            <ul className="grid gap-5 lg:grid-cols-3">
              {publishedPosts.map((post) => (
                <Card as="li" key={post.slug} className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                    {post.category}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-sm text-ink-400">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-IE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </p>
                </Card>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-ink-50 p-10 text-center">
              <h2 className="text-xl">Articles are on the way</h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                In the meantime, the treatment pages set out what each procedure involves, and the
                price list is published in full.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <LinkButton href="/treatments" variant="outline">
                  Browse treatments
                </LinkButton>
                <LinkButton href="/pricing" variant="ghost">
                  See prices
                </LinkButton>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <BookingCta location="blog-index-footer" />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
