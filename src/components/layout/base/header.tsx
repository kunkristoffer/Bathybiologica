import { ButtonLink } from "@/components/ui/buttons/buttonLink";
import { NavigationDesktop } from "@/components/layout/navigation/desktop";
import { NavigationMobile } from "@/components/layout/navigation/mobile";
import { DarkModeToggle } from "@/components/ui/buttons/darkModeToggle";
import { ChangeLocaleButton } from "@/components/ui/buttons/changeLocaleButton";

export function Header() {
  return (
    <header className="z-50 w-full fixed bg-background shadow-lg">
      <div>
        <span className="flex-1">
          <ButtonLink href="/#" label="logo" />
        </span>
        <NavigationDesktop />
        <span className="flex-1 flex justify-end-safe items-center gap-2">
          <DarkModeToggle />
          <ChangeLocaleButton />
          <NavigationMobile />
        </span>
      </div>
    </header>
  );
}
