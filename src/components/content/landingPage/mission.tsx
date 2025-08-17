import { Section } from '@/components/layout/base/section';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function LandingMission() {
  const i18n = useTranslations('landing.mission');
  return (
    <Section sectionId='mission' sectionClassName='bg-foreground' className='flex-col md:flex-row gap-12 lg:gap-8'>
      <div className='flex-1 flex flex-col gap-8'>
        <h2 className='text-primary'>{i18n('title')}</h2>
        <p>{i18n('p1')}</p>
        <p>{i18n('p2')}</p>
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <Image src='/hero-water.jpg' width={400} height={200} alt='' className='rounded-md' />
      </div>
    </Section>
  );
}
