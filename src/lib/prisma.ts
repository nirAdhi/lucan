import { PrismaClient } from "@prisma/client";

/**
 * Standard Next.js singleton: without this, every hot-reload in dev would open a new
 * connection pool against Postgres until it runs out of connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
