import { AboutGetInvolved } from '@/components/content/about/GetInvolved';
import { AboutGoals } from '@/components/content/about/Goals';
import { AboutHero } from '@/components/content/about/HeroTextSwap';
import { AboutMemory } from '@/components/content/about/Memory';
import { AboutMission } from '@/components/content/about/Misson';
import { AboutTransparency } from '@/components/content/about/Transparency';
import { AboutVision } from '@/components/content/about/Vision';
import { AboutWhy } from '@/components/content/about/Why';
import { LandingContact } from '@/components/content/landingPage/contact';

export default function Home() {
  return (
    <main className=''>
      <AboutHero />
      <AboutWhy />
      <AboutMission />
      <AboutMemory />
      <AboutGoals />
      <AboutVision />
      <AboutGetInvolved />
      <AboutTransparency />
      <LandingContact />
    </main>
  );
}
