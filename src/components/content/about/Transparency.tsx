import { Section } from '@/components/layout/base/section';
import { CardData, IconTitleTextCard } from '@/components/ui/cards/about/IconTitleText';
import { Tagline } from '@/components/ui/tags/Tagline';
import { CircleDot, Globe, LibraryBig } from 'lucide-react';

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
    <Section id='transparency' className='flex flex-col gap-16'>
      <Tagline text='Transparency' />
      <h2>We are committed to openness, accountability, and scientific integrity in everything we do.</h2>
      <div className='panel grid gap-8 grid-cols-1 md:grid-cols-3'>
        {cardData.map((item) => (
          <IconTitleTextCard key={item.id} {...item} className='border-0 shadow-none' />
        ))}
        <span className='md:col-span-3'>
          <p>
            Our commitment to transparency ensures that supporters, researchers, and communities can trust that their
            contributions are making a real difference in marine conservation and scientific accessibility.
          </p>
        </span>
      </div>
    </Section>
  );
}
