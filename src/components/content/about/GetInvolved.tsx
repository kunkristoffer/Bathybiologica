import Link from 'next/link';
import { Section } from '@/components/layout/base/sections/Base';
import { Tagline } from '@/components/ui/tags/Tagline';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { AboutCard } from '@/components/ui/cards/AboutCard';

export function AboutGetInvolved() {
  const cardData = [
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
        {cardData.map((card) => (
          <AboutCard key={card.id} title={card.title} tag={card.tag} iconPos='top' className='gap-8 bg-transparent'>
            <p className='pb-4'>{card.text}</p>
            <Link href={card.cta.href} className='mt-auto text-primary hover:underline'>
              {card.cta.label}
            </Link>
          </AboutCard>
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
