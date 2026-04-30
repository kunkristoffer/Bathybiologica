import { Section } from '@/components/layout/base/section';
import { AboutTeamMemberCard, TeamMember } from '@/components/ui/cards/about/TeamMemberCard';
import { Tagline } from '@/components/ui/tags/Tagline';
import Image from 'next/image';
import Link from 'next/link';

export function AboutTeam() {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Founder Name',
      position: 'Research Director',
      description: 'Marine Biology & Coastal Ecology',
      image: '/placeholder-manet.png',
    },
    {
      id: '2',
      name: 'Founder Name',
      position: 'Operations Lead',
      description: 'Science Communication & Field Logistics',
      image: '/placeholder-manet.png',
    },
    {
      id: '3',
      name: 'Founder Name',
      position: 'Founder',
      description: 'Institutional Relations & Grant Development',
      image: '/placeholder-manet.png',
    },
  ];
  return (
    <Section id='team' className='flex flex-col gap-16'>
      <Tagline text='Who We Are' />
      <h1>A Team Driven by Curiosity and Purpose</h1>
      <p>The people behind Bathybiologica's mission to democratize marine research across Norway.</p>
      <div className='grid gap-16 grid-cols-1 md:grid-cols-3'>
        {teamMembers.map((person) => (
          <AboutTeamMemberCard key={person.id} {...person} />
        ))}
      </div>
      <div className='group relative aspect-video rounded-md overflow-clip shadow-panel'>
        <Image
          src={'/placeholder-manet.png'}
          alt='A group picture of our team'
          className='object-cover object-top'
          fill
        />
        <span className='absolute bottom-0 w-full flex gap-8 p-4 bg-background/20 opacity-0 group-hover:opacity-100 duration-200'>
          <p className='flex-1'>Our team is growing. Interested in joining our mission?</p>
          <Link href='/#contact' className='text-primary hover:underline'>
            Get in touch
          </Link>
        </span>
      </div>
    </Section>
  );
}
