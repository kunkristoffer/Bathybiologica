import { HeroSection } from '@/components/layout/base/sections/HeroSection';
import { ButtonLink } from '@/components/ui/buttons/buttonLink';

export async function AboutHero() {
  return (
    <HeroSection>
      <div className='h-full flex flex-col gap-8 items-center justify-center'>
        <h1 className='text-4xl sm:text-6xl md:text-8xl'>Open Water. Open Science. Open Futures.</h1>
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
