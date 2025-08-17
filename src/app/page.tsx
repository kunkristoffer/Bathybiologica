import { LandingContact } from "@/components/content/landingPage/contact";
import { LandingDonate } from "@/components/content/landingPage/donate";
import { LandingGallery } from "@/components/content/landingPage/gallery";
import { LandingHero } from "@/components/content/landingPage/hero";
import { LandingJourney } from "@/components/content/landingPage/journey";
import { LandingMission } from "@/components/content/landingPage/mission";
import { LandingProjects } from "@/components/content/landingPage/projects";
import { LandingSponsors } from "@/components/content/landingPage/sponsors";
import { LandingVolunteer } from "@/components/content/landingPage/volunteer";

export default function Home() {
  return (
    <main className="">
      <LandingHero />
      <LandingMission />
      <LandingProjects />
      <LandingVolunteer />
      <LandingJourney />
      <LandingGallery />
      <LandingDonate />
      <LandingSponsors />
      <LandingContact />
    </main>
  );
}
