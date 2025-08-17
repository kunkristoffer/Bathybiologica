"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Theme = "light" | "dark" | "system";

export async function changeTheme(formData: FormData) {
  const theme = (formData.get("theme") as Theme) ?? "system";
  const path = String(formData.get("path") || "/");

  (await cookies()).set("theme", theme, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(path);
}
