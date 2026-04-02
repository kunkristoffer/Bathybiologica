import { IconLink } from '@/components/ui/buttons/iconLink';
import { SocialButton } from '@/components/ui/buttons/SocialButton';
import { Mail, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className='bg-black/50'>
      <div className='container mx-auto px-4 py-8 lg:py-16 grid gap-16 grid-cols-1 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <h2>{t('followUs.title')}</h2>
          <div className='flex gap-4'>
            <SocialButton href='https://github.com/kunkristoffer/Bathybiologica' />
            <SocialButton href='https://www.bathybiologica.com/' />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>{t('newsletter.title')}</h2>
          <span className='flex items-center border border-input focus-within:border-primary'>
            <input
              type='email'
              className='flex-1 p-2 appearance-none'
              placeholder={t('newsletter.placeholder')}
              disabled
            />
            <ScrollText className='m-2' />
          </span>
          <p className='italic text-text-muted'>{t('newsletter.comingSoon')}</p>
        </div>
      </div>
      <div className='container mx-auto px-4 py-8 lg:py-16 grid gap-16 grid-cols-2 lg:grid-cols-4'>
        <div className='flex flex-col gap-4'>
          <h2>{t('mission.title')}</h2>
          <small>{t('mission.text')}</small>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>{t('sitemap.title')}</h2>
          <nav className='flex flex-col'>
            <Link href='/'>{t('sitemap.landing')}</Link>
            <Link href='/about'>{t('sitemap.about')}</Link>
            <Link href='/history'>{t('sitemap.history')}</Link>
          </nav>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>{t('links.title')}</h2>
          <nav className='flex flex-col'>
            <p>{t('links.login')}</p>
            <p>{t('links.dashboard')}</p>
            <p>{t('links.events')}</p>
            <p>{t('links.inbox')}</p>
          </nav>
          <p className='italic text-text-muted'>{t('links.comingSoon')}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>{t('contact.title')}</h2>
          <IconLink
            href='mailto:contact@bathybiologica.com'
            label='contact@bathybiologica.com'
            icon={<Mail />}
            className='hidden'
          />
          <p className='text-sm/normal wrap-break-word'>
            {t('contact.p1')} <Link href='/#contact'>{t('contact.label')}</Link> {t('contact.p2')}
          </p>
        </div>
      </div>
      <div className='bg-black/40'>
        <div className='container mx-auto flex justify-between items-center p-4'>
          <p className='text-sm/tight'>{t('bottom.copyright')}</p>
          <Link href='/privacy' className='text-sm/tight'>
            {t('bottom.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
