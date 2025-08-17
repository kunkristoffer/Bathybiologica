import { ContactUsForm } from '@/components/forms/contactUs';
import { Section } from '@/components/layout/base/section';
import { useTranslations } from 'next-intl';

export function LandingContact() {
  const i18n = useTranslations('landing.contactUs');
  return (
    <Section id='contact' sectionClassName='' className='flex-row gap-12'>
      <div className='flex-1 flex flex-col justify-center gap-4'>
        <h2>{i18n('title')}</h2>
        <p>{i18n('p1')}</p>
        <p>{i18n('p2')}</p>
      </div>
      <ContactUsForm className='flex-1' />
    </Section>
  );
}
