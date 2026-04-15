import { ButtonLink } from '@/components/ui/buttons/buttonLink';
import { Section } from '@/components/layout/base/section';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function LandingHero() {
  const t = useTranslations('landing.hero');
  return (
    <Section
      sectionClassName='relative'
      className='aspect-square sm:aspect-video lg:aspect-3/1 justify-center items-center'
    >
      <Image
        src={'/hero-water.jpg'}
        alt='Placeholder picture of a fjord'
        priority
        fill
        sizes='100vw'
        className='z-0 absolute inset-0 object-cover opacity-50 pointer-events-none'
      />
      <div className='z-10 flex flex-col items-center gap-4 text-shadow-lg'>
        <h1 className='transition'>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <span className='flex gap-2'>
          <ButtonLink label={t('donate')} href='/#donate' variant='secondary' />
          <ButtonLink label={t('volunteer')} href='/#volunteer' style='outline' className='bg-background/50' />
        </span>
      </div>
    </Section>
  );
}
