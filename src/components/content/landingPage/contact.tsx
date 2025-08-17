import { ContactUsForm } from '@/components/forms/contactUs';
import { Section } from '@/components/layout/base/section';

export function LandingContact() {
  return (
    <Section id='contact' sectionClassName='' className='flex-row gap-12'>
      <div className='flex-1 flex flex-col gap-4'>
        <h2>Contact us</h2>
        <p>Have questions about our work or how you can get involved? We&apos;d love to hear from you.</p>
      </div>
      <ContactUsForm className='flex-1' />
    </Section>
  );
}
