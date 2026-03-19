"use server";

import { cookies } from "next/headers";

export type Locales = "no" | "en"

export async function changeLocale(newLocale: Locales) {
  (await cookies()).set("locale", newLocale, { maxAge: 60 * 60 * 24 * 365 });
}
