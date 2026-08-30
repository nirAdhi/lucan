import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, publishedPosts } from "@/content/posts";
import { getTreatments } from "@/content/treatments";
import { buildMetadata, crumbs } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section } from "@/components/ui/Layout";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found | LDIC",
      description: "This article could not be found.",
      path: `/blog/${slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/blog/${post.slug}`,
    ogType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const trail = crumbs(
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  );

  const related = getTreatments(post.relatedTreatments);
  const publishedLabel = new Date(post.publishedAt).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} intro={post.excerpt} trail={trail} />

      <Section>
        <Container width="narrow">
          <p className="text-sm text-ink-400">
            <time dateTime={post.publishedAt}>{publishedLabel}</time>
            <span className="mx-2 text-ink-300">&middot;</span>
            {post.author}
          </p>

          <article className="prose-ldic mt-8 text-[1.05rem] text-ink-600">
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul") {
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </article>

          <p className="mt-10 rounded-[var(--radius-card)] bg-ink-50 p-5 text-sm leading-relaxed text-ink-500">
            This article is general information about how the practice works and what treatment
            costs. It is not dental advice for your own situation - book an examination for that.
          </p>

          {related.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-xl">Related treatments</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((treatment) => (
                  <Card as="li" key={treatment.slug}>
                    <h3 className="font-semibold">
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="hover:text-brand-700"
                      >
                        {treatment.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                      {treatment.cardText}
                    </p>
                  </Card>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-10">
            <Link href="/blog" className="font-semibold text-brand-700 hover:underline">
              &larr; All articles
            </Link>
          </p>
        </Container>
      </Section>

      <BookingCta location="blog-post-footer" />

      <JsonLd data={[articleSchema(post), breadcrumbSchema(trail)]} />
    </>
  );
}
