import { AboutHero } from '@/components/content/about/Hero';
import { AboutMission } from '@/components/content/about/Misson';

export default function About() {
  return (
    <main className='gap-16'>
      <AboutHero />
      <AboutMission />
      <section>
        <h2>in memory</h2>
        <p>minneseksjon og hvorfor vi heter bathy...</p>
        <p>text + bilde</p>
      </section>
      <section>
        <h2>what we want to achieve</h2>
        <p>vår visjon</p>
        <p>bilde + cards?</p>
      </section>
      <section>
        <h2>how we do it</h2>
        <p>vår metodikk</p>
        <p>cards?</p>
      </section>
      <section>
        <h2>looking ahead</h2>
        <p>Hva er visionen vår framover</p>
        <p>bulletpoints?</p>
      </section>
    </main>
  );
}
