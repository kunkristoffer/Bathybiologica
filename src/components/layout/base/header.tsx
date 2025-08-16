import { ButtonLink } from "@/components/ui/buttons/buttonLink";
import { NavigationDesktop } from "@/components/layout/navigation/desktop";
import { NavigationMobile } from "@/components/layout/navigation/mobile";

export function Header() {
  return (
    <header className="w-full fixed">
      <div>
        <span className="flex-1">
          <ButtonLink href="/#" label="logo" />
        </span>
        <NavigationDesktop />
        <span className="flex-1 flex justify-end-safe items-center gap-2">
          <ButtonLink href="/#" label="🌑" variant="secondary" style="outline" />
          <ButtonLink href="/#" label="Donate Now" variant="secondary" className="max-lg:hidden" />
          <NavigationMobile />
        </span>
      </div>
    </header>
  );
}
