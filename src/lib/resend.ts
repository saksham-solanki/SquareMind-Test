import { Resend } from "resend";

let _resend: Resend | null = null;

/**
 * Server-side Resend client for transactional email.
 * Lazily instantiated to avoid build-time crashes when env vars are missing.
 * ONLY import this in server-side code (API routes, server components).
 */
export function getResend(): Resend {
  if (_resend) return _resend;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("[Resend] Missing RESEND_API_KEY environment variable");
  }

  _resend = new Resend(apiKey);
  return _resend;
}
