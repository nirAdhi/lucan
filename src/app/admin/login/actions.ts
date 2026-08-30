"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/admin/dentists",
    });
    return {};
  } catch (error) {
    // Auth.js throws a special redirect error on success - let it propagate so the
    // navigation actually happens, rather than swallowing it as a login failure.
    if (error instanceof AuthError && error.type !== "CredentialsSignin") {
      throw error;
    }
    if (isNextRedirectError(error)) throw error;
    return { error: "Incorrect username or password." };
  }
}

function isNextRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}
