"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function changeLocale(formData: FormData) {
  const locale = String(formData.get("locale") || "en");
  const path = String(formData.get("path") || "/");

  (await cookies()).set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(path);
}
