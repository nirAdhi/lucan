/**
 * Serve the production build locally - `npm run preview`.
 *
 * Use this, not `npm run dev`, whenever you are measuring anything: Lighthouse scores,
 * bundle sizes, load times. The dev server ships unminified bundles with hot-reload
 * machinery attached, which reports ~1.5MB of "unminifiable JavaScript" and a Total
 * Blocking Time around 50x the real figure. Those numbers are artefacts of dev mode and
 * do not exist in what your visitors download.
 *
 * `output: "standalone"` (next.config.ts) emits a self-contained server but deliberately
 * does not copy public/ or .next/static - in Docker those are COPYd in by the Dockerfile.
 * This does the same thing for local use, then starts the server.
 */
import { cpSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";

const standalone = ".next/standalone";

if (!existsSync(standalone)) {
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

cpSync("public", `${standalone}/public`, { recursive: true });
cpSync(".next/static", `${standalone}/.next/static`, { recursive: true });

const port = process.env.PORT ?? "3000";
console.log(`\n  Production build on http://localhost:${port}\n`);

spawn("node", ["server.js"], {
  cwd: standalone,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production", PORT: port },
});
