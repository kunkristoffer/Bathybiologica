import { LandingContact } from '@/components/layout/landingPage/contact';
import { LandingDonate } from '@/components/layout/landingPage/donate';
import { LandingGallery } from '@/components/layout/landingPage/gallery';
import { LandingHero } from '@/components/layout/landingPage/hero';
import { LandingJourney } from '@/components/layout/landingPage/journey';
import { LandingMission } from '@/components/layout/landingPage/mission';
import { LandingProjects } from '@/components/layout/landingPage/projects';
import { LandingSponsors } from '@/components/layout/landingPage/sponsors';
import { LandingVolunteer } from '@/components/layout/landingPage/volunteer';

export default function Home() {
  return (
    <main className=''>
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
