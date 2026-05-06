import water from '@/assets/images/placeholder-water.jpg';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { TimelineCard, type TimelineItem } from '@/components/ui/cards/about/TimelineCard';
import { SectionParallax } from '@/components/layout/base/sections/Parallax';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { Tagline } from '@/components/ui/tags/Tagline';

export function AboutVision() {
  const timelineData: TimelineItem[] = [
    {
      id: 'international-collaboration network',
      title: 'International Collaboration Network',
      text: 'Expanding our model beyond Norway to create partnerships with marine research foundations across Scandinavia and the North Atlantic, sharing resources and knowledge across borders.',
    },
    {
      id: 'marine-education-center',
      title: 'Marine Education Center',
      text: 'Establishing a dedicated facility where students, educators, and the public can learn about marine biology through hands-on experiences and direct contact with researchers.',
    },
    {
      id: 'real-time-ocean-monitoring',
      title: 'Real-Time Ocean Monitoring',
      text: 'Deploying permanent sensor networks across our station locations to provide continuous data on water conditions, biodiversity indicators, and ecosystem health.',
    },
    {
      id: 'research-grant-program',
      title: 'Research Grant Program',
      text: 'Creating a sustainable funding mechanism to provide grants for marine researchers, ensuring that financial barriers never prevent important research from happening.',
    },
  ];
  return (
    <SectionParallax id='vision' image='hero-water.jpg' containerClassName='grid grid-cols-1 md:grid-cols-2 gap-16'>
      <Tagline text="What's Next" icon={Sparkles} className='md:col-span-2' />
      <div className='flex flex-col gap-4'>
        <h2>Our Vision for the Future</h2>
        <p>
          Once we achieve our initial goals, establishing research stations, building community partnerships, and
          creating robust citizen science programs, we will turn our attention to these ambitious next steps.
        </p>
        <p>
          These are not distant dreams but planned evolutions of our mission. Each success builds the foundation for
          what comes next, ensuring that Per's legacy continues to grow and inspire future generations of ocean
          explorers.
        </p>
        <div className='relative h-full rounded-md shadow-panel overflow-hidden'>
          <Image src={water} alt='placeholder' fill className='object-cover object-center' />
        </div>
      </div>
      <div className='flex flex-col gap-16'>
        <div>
          {timelineData.map((item, i) => (
            <TimelineCard key={item.id} number={i + 1} {...item} />
          ))}
        </div>
        <div className='panel flex flex-col items-center gap-4'>
          <p>
            This is just the beginning. As we grow, our vision expands. Join us in shaping the future of marine research
            in Norway.
          </p>
          <ButtonLink href='#' label='Become part of our journey' style='outline' />
        </div>
      </div>
    </SectionParallax>
  );
}
