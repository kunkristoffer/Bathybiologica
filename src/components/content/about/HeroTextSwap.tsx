import { HeroSection } from '@/components/layout/base/sections/HeroSection';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';

export async function AboutHero() {
  return (
    <HeroSection>
      <div className='h-full flex flex-col gap-8 items-center justify-center'>
        <style>{`
          @keyframes cycle {
            0%, 100% { opacity: 0; transform: translateX(30px); }
            10%, 33.33% { opacity: 1; transform: translateX(0); }
            43.33%, 53.33% { opacity: 0; transform: translateX(-30px); }
          }
          .w1 { animation: cycle 9s infinite 0s; }
          .w2 { animation: cycle 9s infinite -3s; }
          .w3 { animation: cycle 9s infinite -6s; }
        `}</style>
        <h1 className='flex max-sm:flex-col justify-center items-center text-4xl sm:text-6xl md:text-8xl'>
          <span className='pr-8'>Open</span>
          <span className='relative w-34 sm:w-54 md:w-92 h-12 sm:h-14 md:h-24'>
            <span className='absolute w1'>Waters</span>
            <span className='absolute w2'>Science</span>
            <span className='absolute w3'>Futures</span>
          </span>
        </h1>
        <span className='text-xl'>
          A citizen-powered foundation democratizing marine research through open data, accessible coastal stations, and
          shared discovery.
        </span>
        <span className='flex justify-center gap-8'>
          <ButtonLink href='#mission' label='Our mission' className='shadow-surface' />
          <ButtonLink href='#team' label='Meet the team' style='outline' className='shadow-panel max-md:hidden' />
          <ButtonLink href='#get-involved' label='Get involved' style='outline' className='shadow-panel' />
        </span>
      </div>
    </HeroSection>
  );
}
