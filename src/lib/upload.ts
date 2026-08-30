import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Saves an uploaded photo under public/uploads so it's served like any other static asset
 * (and can go through next/image, same as the /brand/* logo files) - no custom file-serving
 * route needed. In Docker this directory is a mounted volume (see docker-compose.yml) so
 * uploads survive a container recreate.
 */
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function saveUploadedPhoto(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPEG, PNG or WebP images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 8MB or smaller.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), bytes);

  return `/uploads/${filename}`;
}
