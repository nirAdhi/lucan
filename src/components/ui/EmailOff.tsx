import type { ReactNode } from "react";

/**
 * Hides its children from Cloudflare's Email Address Obfuscation.
 *
 * That feature rewrites our HTML *after* Next has rendered it: it turns
 * `<a href="mailto:info@ldic.ie">info@ldic.ie</a>` into a `__cf_email__` span pointing at
 * /cdn-cgi/l/email-protection, and injects a decoder script to put the address back. On
 * this site both halves of that go wrong:
 *
 *  - The injected script carries no CSP nonce, and our policy uses 'strict-dynamic', so the
 *    browser blocks it. The address never decodes - visitors see "[email protected]" with a
 *    dead link where the practice's email should be.
 *  - Cloudflare rewrites the HTML but not the RSC flight payload streamed alongside it, so
 *    the two disagree about the link's text. React threw a hydration error (#418) and
 *    discarded the server-rendered tree to re-render the whole page on the client.
 *
 * Cloudflare skips anything between <!--email_off--> and <!--/email_off-->. It matches
 * those on the HTML byte stream rather than the DOM, which is why this wraps each link
 * rather than the whole document: React streams suspended content *after* the shell, so a
 * closing marker in the layout would end up ahead of most of the page's links. Direct
 * siblings in one JSX parent, as here, are always flushed together.
 *
 * The same result can be had by turning Email Address Obfuscation off in the Cloudflare
 * dashboard (Scrape Shield). This keeps the site correct without depending on that setting
 * - and without depending on whoever holds the Cloudflare login.
 *
 * JSX cannot emit comment nodes, hence dangerouslySetInnerHTML; the content is a fixed
 * literal, never user input. The spans are `hidden`, so they take no part in layout.
 */
const OPEN = { __html: "<!--email_off-->" };
const CLOSE = { __html: "<!--/email_off-->" };

export function EmailOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span hidden dangerouslySetInnerHTML={OPEN} />
      {children}
      <span hidden dangerouslySetInnerHTML={CLOSE} />
    </>
  );
}
