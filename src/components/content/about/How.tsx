import { Building2, Handshake, Microscope, Users } from 'lucide-react';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { Tagline } from '@/components/ui/tags/Tagline';
import { Section } from '@/components/layout/base/sections/Base';
import { AboutCard } from '@/components/ui/cards/AboutCard';

export function AboutHow() {
  const cardData = [
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
    <Section id='how'>
      <Tagline text='Our Approach' />
      <h2>Creating Spaces for Science to Happen</h2>
      <p>
        We believe that sustainable change comes from working with existing communities and resources, not replacing
        them.
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 auto-rows-fr'>
        {cardData.map((card) => (
          <AboutCard key={card.id} title={card.title} icon={card.icon} iconPos='left' className='bg-transparent'>
            <p>{card.text}</p>
          </AboutCard>
        ))}
      </div>
      <ButtonLink href='#' label='Get Involved with Our Work' />
    </Section>
  );
}
