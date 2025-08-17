import { ButtonLink } from "@/components/ui/buttons/buttonLink";
import { Section } from "@/components/layout/base/section";
import Image from "next/image";

export function LandingHero() {
  return (
    <Section
      sectionClassName="relative"
      className="aspect-square sm:aspect-video lg:aspect-[3/1] justify-center items-center"
    >
      <Image
        src={"/hero-water.jpg"}
        alt="Placeholder picture of a fjord"
        priority
        fill
        sizes="100vw"
        className="z-0 absolute inset-0 object-cover opacity-50 pointer-events-none"
      />
      <div className="z-10 flex flex-col items-center gap-2 text-shadow-lg shadow-red-500">
        <h1 className="transition">Studying Our Oceans</h1>
        <p>Join our mission to conserve marine ecosystems and protect ocean life for future generations.</p>
        <span className="flex gap-2">
          <ButtonLink label="Donate" href="/#landing-donate" variant="secondary" />
          <ButtonLink label="Volunteer" href="/#landing-donate" style="outline" className="!bg-foreground/50" />
        </span>
      </div>
    </Section>
  );
}
