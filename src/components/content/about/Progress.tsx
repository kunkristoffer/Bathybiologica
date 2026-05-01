import { Section } from '@/components/layout/base/section';
import { AboutProgressCard, AboutProgressData } from '@/components/ui/cards/about/ProgressCard';
import { Tagline } from '@/components/ui/tags/Tagline';
import Image from 'next/image';
import water from '@/assets/images/placeholder-water.jpg';
import { Activity, Dot, HeartPulse } from 'lucide-react';

export function AboutProgress() {
  const progressData: AboutProgressData[] = [
    {
      id: 'Science Station',
      title: 'Science Station',
      text: 'Fully equipped for fieldwork and data collection in Herdlafjorden',
      status: '01',
    },
    {
      id: 'Partnerships',
      title: 'Partnerships',
      text: 'Regional universities and research institutes collaborating on studies',
      status: 'Active',
    },
    {
      id: 'Community Programs',
      title: 'Community Programs',
      text: 'Workshops, monitoring days, and citizen science initiatives',
      status: 'Ongoing',
    },
  ];

  return (
    <Section id='progress' className='flex flex-col gap-16'>
      <Tagline text='Where We Are Today' />
      <div className='grid gap-8 grid-cols-1 md:grid-cols-3'>
        {progressData.map((item) => (
          <AboutProgressCard key={item.id} {...item} />
        ))}
      </div>
      <div className='grid gap-16 grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-8'>
          <h3>Launching from Herdlafjorden, Norway's west coast</h3>
          <p>
            Our first fully equipped science station is now operational and ready for fieldwork. We're actively pursuing
            partnerships with regional universities and research institutes.
          </p>
          <p>
            We host citizen science programs, hands-on workshops, and community monitoring days that bring marine
            science directly to the public.
          </p>
          <span className='flex gap-2 text-primary'>
            <HeartPulse className='animate-pulse' />
            <p>Accepting partnership inquiries</p>
          </span>
        </div>
        <div className='relative rounded-md overflow-clip shadow-panel'>
          <Image src={water} alt='A placeholder image' fill />
        </div>
      </div>
    </Section>
  );
}
