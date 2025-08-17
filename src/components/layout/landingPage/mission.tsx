import { Section } from "@/components/layout/base/section";
import Image from "next/image";

export function LandingMission() {
  return (
    <Section sectionClassName="bg-foreground" className="flex-col md:flex-row gap-12 lg:gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <h2 className="text-primary">Our Mission</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio obcaecati non quibusdam autem eos reiciendis
          repellendus sit in voluptate sapiente eveniet, dolor nulla laudantium velit qui quasi, possimus iure harum!
          Quia numquam blanditiis voluptate dolor aut nobis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia iusto pariatur dignissimos perferendis
          consectetur? Laboriosam deleniti aperiam, totam officiis libero ad nihil iusto consectetur maiores, eligendi
          rem magnam illum tenetur.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Image src="/hero-water.jpg" width={400} height={200} alt="" className="rounded-md" />
      </div>
    </Section>
  );
}
