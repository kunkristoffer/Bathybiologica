"use server"

import type { GoogleVerifyResponse, VerifyRecaptchaOptions, VerifyRecaptchaResult } from "@/types/recaptcha.types";

export async function verifyRecaptcha({
  token,
  expectedAction,
  minScore = 0.5,
}: VerifyRecaptchaOptions): Promise<VerifyRecaptchaResult> {
  const secret = process.env.NODE_ENV === "test" ? process.env.TEST_RECAPTCHA_SECRET_KEY : process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to verify reCAPTCHA token");
  }

  const result: GoogleVerifyResponse = await response.json();

  const score = typeof result.score === "number" ? result.score : 0;
  const actionMatches = result.action === expectedAction;

  const ok =
    Boolean(result.success) &&
    actionMatches &&
    score >= minScore;

  return {
    ok,
    score,
    action: result.action,
    hostname: result.hostname,
    errors: result["error-codes"] ?? [],
  };
}
