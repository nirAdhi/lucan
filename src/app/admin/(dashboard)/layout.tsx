import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/auth";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-ink-50">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/admin/dentists" className="font-semibold text-ink-900">
            LDIC Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-ink-600">
            <Link href="/admin/dentists" className="hover:text-brand-700">
              Dentists
            </Link>
            <Link href="/admin/pricing" className="hover:text-brand-700">
              Pricing
            </Link>
            <Link href="/admin/case-studies" className="hover:text-brand-700">
              Case studies
            </Link>
            <Link href="/admin/testimonials" className="hover:text-brand-700">
              Testimonials
            </Link>
            <Link href="/" className="hover:text-brand-700">
              View site
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="hover:text-urgent-700">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
