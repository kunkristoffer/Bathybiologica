import { cookies } from "next/headers";
import type { Theme } from "@/actions/changeTheme";

import { ButtonLink } from "@/components/ui/buttons/buttonLink";
import { NavigationDesktop } from "@/components/layout/navigation/desktop";
import { NavigationMobile } from "@/components/layout/navigation/mobile";
import { SelectLocaleButton } from "@/components/ui/buttons/selectLocale";
import { DarkModeToggle } from "@/components/ui/buttons/darkMode";

export async function Header() {
  const theme = ((await cookies()).get("theme")?.value as Theme) || "system";
  return (
    <header className="z-50 w-full fixed bg-background shadow-lg">
      <div>
        <span className="flex-1">
          <ButtonLink href="/#" label="logo" />
        </span>
        <NavigationDesktop />
        <span className="flex-1 flex justify-end-safe items-center gap-2">
          <DarkModeToggle current={theme} />
          <SelectLocaleButton />
          <NavigationMobile />
        </span>
      </div>
    </header>
  );
}
