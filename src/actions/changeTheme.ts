"use server";

import { cookies } from "next/headers";

export type ThemeOptions = "light" | "dark" | "system";

export async function changeTheme(newTheme: ThemeOptions) {
  (await cookies()).set("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 });
}
