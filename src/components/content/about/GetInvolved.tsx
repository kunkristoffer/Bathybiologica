import { type GetInvolvedData, AboutGetInvolvedCard } from '@/components/ui/cards/about/GetInvolvedCard';
import { Section } from '@/components/layout/base/sections/Base';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { Tagline } from '@/components/ui/tags/Tagline';

export function AboutGetInvolved() {
  const cardData: GetInvolvedData[] = [
    {
      id: 'access-stations-collaborate',
      title: 'Access Stations & Collaborate',
      tag: 'For Researchers',
      text: 'Submit project proposals and collaborate on cutting-edge studies. We provide equipment, logistics support, and connections to the wider marine science community.',
      cta: {
        label: 'Apply for Access',
        href: '#',
      },
    },
    {
      id: 'join-field-programs',
      title: 'Join Field Programs',
      tag: 'For Citizens',
      text: 'Participate in field days, data collection, monitoring programs, and educational workshops. No prior experience needed to contribute to marine science.',
      cta: {
        label: 'Join a Program',
        href: '#',
      },
    },
    {
      id: 'fund-the-mission',
      title: 'Fund the Mission',
      tag: 'For Supporters',
      text: 'Donate as an individual or partner as a sponsor to fund research grants and expand operations. Every contribution directly advances marine science.',
      cta: {
        label: 'Support Us',
        href: '#',
      },
    },
  ];

  return (
    <Section id='get-involved'>
      <Tagline text='Get involved' />
      <h2>Join the movement for accessible marine science</h2>
      <p>All contributions directly advance open, accessible marine science in Norway.</p>
      <div className='grid gap-8 grid-cols-1 md:grid-cols-3'>
        {cardData.map((item) => (
          <AboutGetInvolvedCard key={item.id} {...item} />
        ))}
      </div>
      <div className='panel flex gap-16'>
        <div className='flex-1'>
          <p>100% of donations fund research and station operations</p>
          <p>Every contribution goes directly to advancing marine science.</p>
        </div>
        <ButtonLink href='/donate' label='Donate Now' />
      </div>
    </Section>
  );
}
