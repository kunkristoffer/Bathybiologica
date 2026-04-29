import { Section } from '@/components/layout/base/section';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { type CardData, IconTitleTextCard } from '@/components/ui/cards/IconTitleText';
import { Tagline } from '@/components/ui/tags/Tagline';
import { Building2, Handshake, Microscope, Users } from 'lucide-react';

export function AboutHow() {
  const cardData: CardData[] = [
    {
      id: 'Research Station Network',
      title: 'Research Station Network',
      text: [
        'We establish and maintain research stations at strategic coastal locations. These stations are equipped with essential tools and resources, allowing researchers to arrive and begin work immediately without the burden of organizing',
      ],
      icon: Building2,
    },
    {
      id: 'Local Partnerships',
      title: 'Local Partnerships',
      text: [
        'We build strong relationships with local communities, fishermen, and businesses. This network provides researchers with boats, equipment, local knowledge, and support. Resources that would otherwise take months to arrange.',
      ],
      icon: Handshake,
    },
    {
      id: 'Citizen Science Programs',
      title: 'Citizen Science Programs',
      text: [
        'We train and engage local volunteers to participate in data collection and monitoring. This expands our research capacity while creating a community deeply invested in marine conservation.',
      ],
      icon: Users,
    },
    {
      id: 'Shared Knowledge Platform',
      title: 'Shared Knowledge Platform',
      text: [
        'All research conducted through our network contributes to a shared database. This collective resource amplifies the impact of individual studies and enables collaborative breakthroughs.',
      ],
      icon: Microscope,
    },
  ];

  return (
    <Section className='flex flex-col items-center gap-16'>
      <Tagline text='How We Do It' />
      <h2>Our Approach to Change</h2>
      <p>
        We believe that sustainable change comes from working with existing communities and resources, not replacing
        them.
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        {cardData.map((card) => (
          <IconTitleTextCard key={card.id} iconPos='left' {...card} />
        ))}
      </div>
      <ButtonLink href='#' label='Get Involved with Our Work' />
    </Section>
  );
}
