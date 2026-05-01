import { VideoBackground } from '@/components/ui/parallaxing/VideoBackground';
import Link from 'next/link';

export async function AboutHero() {
  const links = [
    {
      label: 'Why It Matters',
      href: '#why',
    },
    {
      label: 'Our Mission',
      href: '#mission',
    },
    {
      label: 'In memory',
      href: '#memory',
    },
    {
      label: 'Our Goals',
      href: '#goals',
    },
    {
      label: 'Our Approach',
      href: '#how',
    },
    {
      label: 'Progress',
      href: '#progress',
    },
    {
      label: 'Our Vision',
      href: '#vision',
    },
    {
      label: 'Team',
      href: '#team',
    },
    {
      label: 'Get Involved',
      href: '#get-involved',
    },
    {
      label: 'Transparency',
      href: '#transparency',
    },
  ];
  return (
    <div
      className='
        relative flex h-[calc(100svh-var(--header-h))] overflow-hidden
        bg-linear-to-b from-transparent to-background
      '
    >
      <VideoBackground>
        <source src='/about-us-hero.webm' type='video/webm' />
        <source src='/gossamerworm-placeholder.mp4' type='video/mp4' />
      </VideoBackground>
      <div className='group container m-auto p-16 flex flex-col justify-center items-center gap-12'>
        <h1 className='text-4xl md:text-8xl'>Bathybiologica</h1>
        <p>
          Preserving the legacy of marine science while nurturing the next generation of ocean explorers in Norwegian
          waters
        </p>
        <span
          className='
            invisible opacity-0 group-hover:visible group-hover:opacity-100
            flex gap-x-16 gap-y-4 p-4 flex-wrap justify-center
            panel bg-background/80 duration-200
          '
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='break-keep text-primary hover:underline hover:text-primary-hover'
            >
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
}
