/**
 * Monogram fallback for a dentist with no photo yet.
 *
 * Lives here rather than in content/team.ts on purpose. That module imports the Prisma
 * client, and importing any *value* from it inside a client component makes webpack pull
 * the whole database client into the browser bundle - which is exactly what happened:
 * 192KB of Prisma (59KB over the wire) was being shipped to every visitor because
 * components/team/TeamCard.tsx needed this one function.
 *
 * Keep this file free of server-only imports.
 */
export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
