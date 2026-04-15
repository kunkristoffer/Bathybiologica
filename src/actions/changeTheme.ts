"use server";

import { checkConsent } from "@/libs/legal/consent";
import { cookies } from "next/headers";

export type ThemeOptions = "light" | "dark" | "system";

export async function changeTheme(newTheme: ThemeOptions) {
  const hasConsent = await checkConsent("theme")
  if (!hasConsent) {
    // Trigger consent error notification
    return
  }

  const cookieStore = await cookies()
  cookieStore.set("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 });
}
