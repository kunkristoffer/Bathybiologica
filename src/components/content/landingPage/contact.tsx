'use server';

import { getTranslations } from 'next-intl/server';
import { checkConsent } from '@/libs/legal/consent';
import { Section } from '@/components/layout/base/section';
import { RecaptchaProvider } from '@/providers/recaptcha/provider';
import { ContactForm } from '@/components/forms/contact';
import { LandingContactFallback } from '@/components/content/landingPage/contactFallback';

export async function LandingContact() {
  // Get translations
  const t = await getTranslations('landing.contactUs');

  // Check cookie consent
  const hasConsent = await checkConsent('reCAPTCHA');

  if (!hasConsent) return <LandingContactFallback />;

  return (
    <Section sectionId='contact' sectionClassName='' className='md:flex-row gap-12'>
      <div className='flex-1 flex flex-col justify-center gap-4'>
        <h2>{t('title')}</h2>
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
      </div>
      <RecaptchaProvider>
        <ContactForm className='flex-1' />
      </RecaptchaProvider>
    </Section>
  );
}
