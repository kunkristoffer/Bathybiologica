'use client';

import { removeConsentCookie } from '@/libs/legal/consent';
import { Section } from '@/components/layout/base/section';
import { useTranslations } from 'next-intl';

export function LandingContactFallback() {
  // Get translations
  const t = useTranslations('landing.contactUs');

  return (
    <Section sectionId='contact' sectionClassName='' className='md:flex-row gap-12'>
      <div className='flex-1 flex flex-col justify-center gap-4'>
        <h2>{t('title')}</h2>
        <p>{t('cookie1')}</p>
        <p>
          {t.rich('cookie2', {
            cookieText: (text) => (
              <span
                onClick={() => removeConsentCookie()}
                className='text-primary hover:text-primary-hover hover:underline'
              >
                {text}
              </span>
            ),
            privacyLabel: (label) => (
              <a className='whitespace-nowrap text-primary hover:underline' href='https://policies.google.com/privacy'>
                {label}
              </a>
            ),
            tosLabel: (label) => (
              <a className='whitespace-nowrap text-primary hover:underline' href='https://policies.google.com/privacy'>
                {label}
              </a>
            ),
          })}
        </p>
      </div>
    </Section>
  );
}
