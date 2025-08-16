import { ButtonLink } from "@/components/ui/buttons/buttonLink";
import { Section } from "../base/section";
import Image from "next/image";

export function LandingHero() {
  return (
    <Section
      sectionClassName="relative isolate overflow-hidden"
      className="aspect-[3/1] justify-center items-center gap-2"
    >
      <Image
        src={"/hero-water.jpg"}
        alt="Picture of a fjord"
        priority
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-50"
      />
      <h1 className="transition">Studying Our Oceans</h1>
      <p>Join our mission to conserve marine ecosystems and protect ocean life for future generations.</p>
      <span className="flex gap-2 ">
        <ButtonLink label="Donate" href="/#landing-donate" variant="secondary" />
        <ButtonLink
          label="Volunteer"
          href="/#landing-donate"
          style="outline"
          className="!bg-foreground/50"
        />
      </span>
    </Section>
  );
}
