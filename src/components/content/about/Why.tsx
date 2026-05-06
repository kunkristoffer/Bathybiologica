import { Circle, Moon, Sun } from 'lucide-react';
import { type CardData, IconTitleTextCard } from '@/components/ui/cards/about/IconTitleText';
import { Tagline } from '@/components/ui/tags/Tagline';
import { Section } from '@/components/layout/base/sections/Base';

export function AboutWhy() {
  const cardData: CardData[] = [
    {
      id: 'Limited Access',
      title: 'Limited Access',
      text: [
        'Scientists and graduates often lack access to local research opportunities, forcing them to rely on expensive and complex expeditions.',
      ],
      icon: Sun,
    },
    {
      id: 'High Barriers',
      title: 'High Barriers',
      text: [
        'Traditional research expeditions involve significant costs, logistical complexity, and resource requirements that many cannot meet.',
      ],
      icon: Moon,
    },
    {
      id: 'Missing Infrastructure',
      title: 'Missing Infrastructure',
      text: [
        'Theres a lack of structured, accessible citizen science initiatives that bridge the gap between professional research and public participation.',
      ],
      icon: Circle,
    },
  ];
  return (
    <Section id='why'>
      <Tagline text='Why it matters' />
      <h1>When Opportunities in Science Is Out of Reach</h1>
      <div className='grid gap-8 md:grid-cols-3'>
        {cardData.map((item) => (
          <IconTitleTextCard key={item.id} {...item} />
        ))}
      </div>
      <p>
        These challenges prevent valuable research from happening and limit our collective understanding of marine
        ecosystems at a time when we need it most.
      </p>
    </Section>
  );
}
