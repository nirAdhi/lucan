/**
 * Blog (PRD s28).
 *
 * Posts carry their own status and SEO fields; only `published` posts appear in the index
 * or the sitemap. The seed post below describes practice process only - what happens at an
 * appointment, what things cost - and makes no clinical claims (PRD s30). It still needs
 * practice sign-off before launch; set `status` to "draft" to pull it from the site.
 *
 * Phase 2 moves this into `blog_posts` / `blog_categories` with the draft -> review ->
 * published -> scheduled -> archived workflow from PRD s28.
 */

export type PostStatus = "draft" | "review" | "published" | "archived";

export type Post = {
  slug: string;
  title: string;
  status: PostStatus;
  /** ISO date. Used for Article schema and ordering. */
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  excerpt: string;
  /** Simple paragraph/heading blocks - replaced by rich text from the CMS in Phase 2. */
  body: ({ type: "h2"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] })[];
  seo: { title: string; description: string };
  /** Internal links to keep the content connected (PRD s27). */
  relatedTreatments: string[];
};

export const posts: Post[] = [
  {
    slug: "what-to-expect-at-your-first-appointment",
    title: "What to expect at your first appointment in Lucan",
    status: "published",
    publishedAt: "2026-08-25",
    author: "Lucan Dental & Implantology Centre",
    category: "New patients",
    excerpt:
      "A walk through a first visit at the practice: how long it takes, what the examination covers, what it costs and what you leave with.",
    seo: {
      title: "What to Expect at Your First Dental Appointment in Lucan | LDIC",
      description:
        "What happens at a first appointment at Lucan Dental & Implantology Centre: the examination, X-rays, your written treatment plan, and what a check-up costs.",
    },
    body: [
      {
        type: "p",
        text: "If you have not been to a dentist for a while, the hardest part is usually making the appointment. Here is what actually happens when you come in for the first time, so there are no surprises.",
      },
      { type: "h2", text: "Before you arrive" },
      {
        type: "p",
        text: "You can request an appointment online at any hour, or phone the practice on (01) 628 1500 during opening hours, Monday to Friday, 9am to 5pm. If you are anxious about dental treatment, say so when you book - it is useful to know in advance so enough time is set aside.",
      },
      { type: "h2", text: "The examination" },
      {
        type: "p",
        text: "Your dentist takes time to listen to your concerns first, then examines your teeth, gums and bite. X-rays are taken where they are needed to see what an examination alone cannot: a small X-ray is €40, an OPG €60 and a CT scan €120.",
      },
      { type: "h2", text: "Your written plan" },
      {
        type: "p",
        text: "You leave with your options explained and a clear, written treatment plan. Nothing is started without you knowing what it involves and what it costs.",
      },
      { type: "h2", text: "What it costs" },
      {
        type: "ul",
        items: [
          "General dentist exam (existing patients): €60",
          "General dentist exam and teeth cleaning: €110",
          "General dentist exam under PRSI: free once per year, subject to eligibility",
          "Examination, diagnosis, treatment plan and prescription: €120",
          "Children's exam: €50, or €80 with an X-ray and prescription",
        ],
      },
      {
        type: "p",
        text: "The full price list is published, so you can see the cost of anything that might be recommended before you come in.",
      },
      { type: "h2", text: "If you are in pain now" },
      {
        type: "p",
        text: "Do not wait for a routine appointment. An emergency appointment is €100 - phone the practice so the problem can be triaged and you can be offered the soonest suitable time.",
      },
      { type: "h2", text: "A note on rescheduling" },
      {
        type: "p",
        text: "If something comes up, the practice asks for at least 24 hours' notice to move an appointment, so the time can be offered to someone else.",
      },
    ],
    relatedTreatments: ["emergency-dentistry", "teeth-whitening", "dental-implants"],
  },
];

export const publishedPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}
