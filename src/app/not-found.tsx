import { headers } from "next/headers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

/**
 * Root 404 - the one that actually fires for a URL matching no route at all.
 *
 * Without this file Next serves its own bare "404: This page could not be found" page:
 * no header, no phone number, no way back into the site. The nicely built 404 inside the
 * (site) group never ran for those URLs, because a route group cannot catch a path that
 * matched nothing.
 *
 * The chrome is repeated here rather than inherited: this renders under the root layout,
 * which is only the html/body shell - app/(site)/layout.tsx is what normally adds the
 * header and footer, and that layout is not in this page's tree.
 *
 * Awaiting headers() keeps it out of the prerender, for the CSP nonce reason described in
 * app/(site)/not-found.tsx.
 */
export default async function RootNotFound() {
  await headers();

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 pb-24 lg:pb-0">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </>
  );
}
