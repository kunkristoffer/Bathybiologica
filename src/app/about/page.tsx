import { AboutGetInvolved } from '@/components/content/about/GetInvolved';
import { AboutGoals } from '@/components/content/about/Goals';
import { AboutHero } from '@/components/content/about/Hero';
import { AboutHow } from '@/components/content/about/How';
import { AboutMemory } from '@/components/content/about/Memory';
import { AboutMission } from '@/components/content/about/Misson';
import { AboutProgress } from '@/components/content/about/Progress';
import { AboutTeam } from '@/components/content/about/Team';
import { AboutTransparency } from '@/components/content/about/Transparency';
import { AboutVision } from '@/components/content/about/Vision';
import { AboutWhy } from '@/components/content/about/Why';

export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutWhy />
      <AboutMission />
      <AboutMemory />
      <AboutGoals />
      <AboutHow />
      <AboutProgress />
      <AboutVision />
      <AboutTeam />
      <AboutGetInvolved />
      <AboutTransparency />
    </main>
  );
}
