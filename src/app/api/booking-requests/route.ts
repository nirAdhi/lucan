import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { bookingReasons } from "@/content/booking";

/**
 * Appointment request intake (PRD s31, s35, s38).
 *
 * Phase 1 scope: this endpoint captures the enquiry, attaches its marketing attribution and
 * delivers it to the practice. It does NOT hold availability - Phase 3 (PRD s33) adds real
 * slots, and the same endpoint becomes the write path for the `appointments` table.
 *
 * Delivery is deliberately explicit. If no destination is configured the endpoint returns
 * 503 and the form tells the patient to phone, because an appointment request that is
 * silently discarded is worse than a form that admits it is not working.
 */

export const runtime = "nodejs";
/** Never cache a POST intake route. */
export const dynamic = "force-dynamic";

const MAX_FIELD = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

/**
 * Per-instance rate limit. Enough to stop a form-spam script; a multi-instance deployment
 * needs Redis (PRD s84 lists it) or the WAF rules from PRD s71.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [existingKey, value] of hits) {
      if (now > value.resetAt) hits.delete(existingKey);
    }
  }
  return false;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

/** Deliberately permissive: Irish numbers are written many ways and rejecting a real
 *  patient's number is a lost appointment. */
function looksLikePhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please phone the practice on (01) 628 1500." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real patient never fills this in.
  if (str(payload.company).length > 0) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const name = str(payload.name);
  const phone = str(payload.phone);
  const email = str(payload.email);
  const reason = str(payload.reason);
  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!looksLikePhone(phone)) errors.phone = "Please enter a phone number we can reach you on.";
  if (email.length > 0 && !looksLikeEmail(email)) errors.email = "Please check your email address.";
  if (!bookingReasons.some((option) => option.value === reason)) {
    errors.reason = "Please choose what the appointment is for.";
  }
  if (payload.consent !== true) {
    errors.consent = "Please confirm we can contact you about this request.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    name,
    phone,
    email,
    reason,
    treatment: str(payload.treatment),
    dentist: str(payload.dentist),
    preferredDate: str(payload.preferredDate),
    preferredTime: str(payload.preferredTime),
    isNewPatient: payload.isNewPatient === true,
    message: str(payload.message),
    consent: true,
    marketingConsent: payload.marketingConsent === true,
    // PRD s38: attribution travels with the enquiry.
    attribution:
      typeof payload.attribution === "object" && payload.attribution !== null
        ? payload.attribution
        : {},
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
  };

  const webhook = process.env.BOOKING_NOTIFY_WEBHOOK;
  const logFile = process.env.BOOKING_LOG_FILE;
  let delivered = false;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      delivered = response.ok;
      if (!delivered) {
        console.error("[booking] webhook rejected the request", response.status);
      }
    } catch (error) {
      console.error("[booking] webhook delivery failed", error);
    }
  }

  if (!delivered && logFile) {
    try {
      const target = path.resolve(process.cwd(), logFile);
      await mkdir(path.dirname(target), { recursive: true });
      await appendFile(target, `${JSON.stringify(record)}\n`, "utf8");
      delivered = true;
    } catch (error) {
      // A read-only or serverless filesystem is expected in production; the webhook is
      // the real delivery path there.
      console.error("[booking] could not write the local log file", error);
    }
  }

  if (!delivered) {
    console.error("[booking] NO DELIVERY DESTINATION CONFIGURED - request not stored", {
      reason: record.reason,
      receivedAt: record.receivedAt,
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not submit your request. Please phone the practice on (01) 628 1500 and we will book you in.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
