import { auth } from "@/auth";

/**
 * Defense in depth for Server Actions: middleware already blocks unauthenticated requests
 * to /admin/*, but a mutation that touches the database and the filesystem (uploads) is
 * worth checking twice rather than relying solely on the route-level gate.
 */
export async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");
}
