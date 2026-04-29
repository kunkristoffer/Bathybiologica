import { AboutGoals } from '@/components/content/about/Goals';
import { AboutHero } from '@/components/content/about/Hero';
import { AboutHow } from '@/components/content/about/How';
import { AboutMemory } from '@/components/content/about/Memory';
import { AboutMission } from '@/components/content/about/Misson';

export default function About() {
  return (
    <main className='gap-16'>
      <AboutHero />
      <AboutMission />
      <AboutMemory />
      <AboutGoals />
      <AboutHow />
      <section>
        <h2>looking ahead</h2>
        <p>Hva er visionen vår framover</p>
        <p>bulletpoints?</p>
      </section>
    </main>
  );
}
