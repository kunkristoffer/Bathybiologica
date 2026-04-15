'use server';

import { ContactForm } from '@/components/forms/contact';
import { Section } from '@/components/layout/base/section';
import { checkConsent } from '@/libs/legal/consent';
import { RecaptchaProvider } from '@/providers/recaptcha/provider';
import { getTranslations } from 'next-intl/server';

export async function LandingContact() {
  // Get translations
  const t = await getTranslations('landing.contactUs');

  // Check cookie consent
  const showForm = await checkConsent('google');

  return (
    <Section sectionId='contact' sectionClassName='' className='md:flex-row gap-12'>
      <div className='flex-1 flex flex-col justify-center gap-4'>
        <h2>{t('title')}</h2>
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
      </div>
      {showForm && (
        <RecaptchaProvider>
          <ContactForm className='flex-1' />
        </RecaptchaProvider>
      )}
    </Section>
  );
}
