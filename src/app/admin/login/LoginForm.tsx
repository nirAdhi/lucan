"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-ink-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-ink-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-ink-800 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
        />
      </div>

      {state?.error ? <p className="text-sm text-urgent-700">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
