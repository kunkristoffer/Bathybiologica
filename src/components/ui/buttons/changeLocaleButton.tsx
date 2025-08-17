"use client";
import { usePathname } from "next/navigation";
import { changeLocale } from "@/i18n/change";
import { useLocale } from "next-intl";

export function ChangeLocaleButton() {
  const pathname = usePathname();
  const current = useLocale();

  return (
    <form action={changeLocale}>
      <input type="hidden" name="path" value={pathname} />
      <select name="locale" defaultValue={current} onChange={(e) => e.currentTarget.form?.requestSubmit()}>
        <option value="en">En</option>
        <option value="no">No</option>
      </select>
    </form>
  );
}
