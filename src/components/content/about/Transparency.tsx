import { CircleDot, Globe, LibraryBig } from 'lucide-react';
import { type CardData, IconTitleTextCard } from '@/components/ui/cards/about/IconTitleText';
import { Section } from '@/components/layout/base/sections/Base';
import { Tagline } from '@/components/ui/tags/Tagline';
import { AboutCard } from '@/components/ui/cards/AboutCard';

export function AboutTransparency() {
  const cardData: CardData[] = [
    {
      id: 'Openness',
      title: 'Openness',
      text: ['We operate with full transparency about our activities, funding, and decision-making processes.'],
      icon: LibraryBig,
    },
    {
      id: 'Scientific Integrity',
      title: 'Scientific Integrity',
      text: ['All research conducted through our stations adheres to ethical and scientific standards.'],
      icon: CircleDot,
    },
    {
      id: 'Knowledge Sharing',
      title: 'Knowledge Sharing',
      text: ['We believe in open data and knowledge sharing to maximize the impact of our research.'],
      icon: Globe,
    },
  ];
  return (
    <Section id='transparency'>
      <Tagline text='Transparency' />
      <h2>We are committed to openness, accountability, and scientific integrity in everything we do.</h2>
      <div className='panel grid gap-8 md:gap-x-16 grid-cols-1 md:grid-cols-3'>
        {cardData.map((card) => (
          <AboutCard key={card.id} title={card.title} icon={card.icon} iconPos='top' className='border-none shadow-none'>
            <p>{card.text}</p>
          </AboutCard>
        ))}
        <span className='md:col-span-3'>
          <p className='text-center'>
            Our commitment to transparency ensures that supporters, researchers, and communities can trust that their
            contributions are making a real difference in marine conservation and scientific accessibility.
          </p>
        </span>
      </div>
    </Section>
  );
}
