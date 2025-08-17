import type { Theme } from "@/actions/changeTheme";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { NavigationDesktop } from "@/components/layout/navigation/desktop";
import { NavigationMobile } from "@/components/layout/navigation/mobile";
import { SelectLocaleButton } from "@/components/ui/buttons/selectLocale";
import { DarkModeToggle } from "@/components/ui/buttons/darkMode";

export async function Header() {
  const theme = ((await cookies()).get("theme")?.value as Theme) || "system";
  return (
    <header className="z-50 w-full fixed bg-background shadow-lg">
      <div>
        <Link href="/" className="group flex-1 flex items-center gap-4 ">
          <Image
            src="/logo.png"
            alt="Website logo - todo: change source before prod!!! ©️ https://www.mbari.org/animal/gossamer-worm"
            height={50}
            width={100}
            className="group-hover:drop-shadow-blue-400 group-hover:drop-shadow-lg duration-300"
          />
          <p className="-z-10 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
            Home
          </p>
        </Link>
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
