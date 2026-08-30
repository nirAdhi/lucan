import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink-50 px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-ink-200 bg-white p-8 shadow-[var(--shadow-lift)]">
        <h1 className="text-xl font-semibold text-ink-900">LDIC Admin</h1>
        <p className="mt-1 text-sm text-ink-500">Sign in to manage dentists, pricing and case studies.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
