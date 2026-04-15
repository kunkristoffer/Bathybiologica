"use server";

import { checkConsent } from "@/libs/legal/consent";
import { cookies } from "next/headers";

export type Locales = "no" | "en"

export async function changeLocale(newLocale: Locales) {
  const hasConsent = await checkConsent("locale")
  if (!hasConsent) {
    // Trigger consent error notification
    return
  }

  const cookieStore = await cookies()
  cookieStore.set("locale", newLocale, { maxAge: 60 * 60 * 24 * 365 });
}
