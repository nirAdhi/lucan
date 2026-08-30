import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "LDIC Admin", template: "%s | LDIC Admin" },
  robots: { index: false, follow: false },
};

/**
 * Just the metadata - the visible admin chrome (nav, sign-out) lives in the nested
 * (dashboard) layout so /admin/login can render its own plain, unauthenticated page
 * instead of a dashboard nav that would just bounce back to login.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
