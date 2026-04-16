import { Section } from '@/components/layout/base/section';
import { TableOfContentsDynamic } from '@/components/ui/menus/TableOfContents';
import Link from 'next/link';

export default function Privacy() {
  const sections = [
    {
      id: 'privacy-title',
      label: 'Privacy notice',
      children: [
        {
          id: 'data-collection-title',
          label: 'data-collection-title',
        },
        {
          id: 'consent-basis-title',
          label: 'consent-basis-title',
        },
      ],
    },
    {
      id: 'erasure-title',
      label: 'erasure-title',
    },
  ];
  return (
    <main className='flex-row'>
      <div className='relative'>
        <TableOfContentsDynamic links={sections} />
      </div>
      <div className='flex flex-col gap-4'>
        <Section>
          <Link href='#privacy-notice'>
            <h2 id='privacy-notice'>Privacy notice</h2>
          </Link>
          <p>
            This section is under development, check back later. It is currently being used to test layout spacing,
            anchor links, and text flow across multiple sections.
          </p>
          <div>
            <Link href='#sub-privacy-notice'>
              <h3 id='sub-privacy-notice'>Sub Privacy notice</h3>
            </Link>
            <p>
              This subsection can be used to test nested headings, anchor linking, and spacing between heading levels.
            </p>
          </div>
        </Section>
        <Section>
          <Link href='#consent-notice'>
            <h2 id='consent-notice'>Consent notice</h2>
          </Link>
          <p>
            This section is under development, check back later. It can help test paragraph spacing and section
            separation.
          </p>
          <span className='flex gap-4'>
            <p>This section is under development, check back later.</p>
            <p>This section is under development, check back later.</p>
          </span>
        </Section>
        <Section>
          <Link href='#what-data-we-collect'>
            <h2 id='what-data-we-collect'>What data we collect</h2>
          </Link>
          <p>
            This section can be used to test how regular body text behaves over multiple lines with a realistic heading.
          </p>
          <div>
            <Link href='#personal-data'>
              <h3 id='personal-data'>Personal data</h3>
            </Link>
            <p>
              Example text for personal information such as name, email address, and information voluntarily submitted
              through forms.
            </p>
          </div>
          <div>
            <Link href='#technical-data'>
              <h3 id='technical-data'>Technical data</h3>
            </Link>
            <p>Example text for browser type, device information, IP address, and session-related metadata.</p>
          </div>
        </Section>
        <Section>
          <Link href='#how-we-use-your-information'>
            <h2 id='how-we-use-your-information'>How we use your information</h2>
          </Link>
          <p>This section is useful for testing medium-length content and grouped explanatory subsections.</p>
          <div>
            <Link href='#service-delivery'>
              <h3 id='service-delivery'>Service delivery</h3>
            </Link>
            <p>
              We may use collected data to provide requested services, respond to inquiries, and maintain basic site
              functionality.
            </p>
          </div>
          <div>
            <Link href='#security-and-abuse-prevention'>
              <h3 id='security-and-abuse-prevention'>Security and abuse prevention</h3>
            </Link>
            <p>Example placeholder text for fraud prevention, spam filtering, and monitoring suspicious activity.</p>
          </div>
          <div>
            <Link href='#improvements-and-analytics'>
              <h4 id='improvements-and-analytics'>Improvements and analytics</h4>
            </Link>
            <p>
              Example placeholder text for internal analysis used to improve the website, content, and user experience.
            </p>
          </div>
        </Section>
        <Section>
          <Link href='#legal-basis-for-processing'>
            <h2 id='legal-basis-for-processing'>Legal basis for processing</h2>
          </Link>
          <p>This section can help test how the layout handles more formal legal content and longer headings.</p>
          <div>
            <Link href='#consent'>
              <h3 id='consent'>Consent</h3>
            </Link>
            <p>Placeholder text for processing based on the user’s clear and informed consent.</p>
          </div>
          <div>
            <Link href='#contractual-necessity'>
              <h3 id='contractual-necessity'>Contractual necessity</h3>
            </Link>
            <p>Placeholder text for data processing that is necessary in order to provide a requested service.</p>
          </div>
          <div>
            <Link href='#legitimate-interests'>
              <h3 id='legitimate-interests'>Legitimate interests</h3>
            </Link>
            <p>Placeholder text for internal administrative and security purposes, where applicable.</p>
          </div>
        </Section>
        <Section>
          <Link href='#cookies-and-local-storage'>
            <h2 id='cookies-and-local-storage'>Cookies and local storage</h2>
          </Link>
          <p>This section is helpful for testing anchors, grouped content, and mixed paragraph lengths.</p>
          <div>
            <Link href='#essential-cookies'>
              <h3 id='essential-cookies'>Essential cookies</h3>
            </Link>
            <p>
              Placeholder text for cookies required for site operation, security, and accessibility-related
              functionality.
            </p>
          </div>
          <div>
            <Link href='#preference-cookies'>
              <h3 id='preference-cookies'>Preference cookies</h3>
            </Link>
            <p>Placeholder text for remembering language, theme, or other user interface preferences.</p>
          </div>
          <div>
            <Link href='#analytics-cookies'>
              <h3 id='analytics-cookies'>Analytics cookies</h3>
            </Link>
            <p>Placeholder text for optional analytics technologies that help understand usage patterns.</p>
          </div>
        </Section>
        <Section>
          <Link href='#how-information-may-be-shared'>
            <h2 id='how-information-may-be-shared'>How information may be shared</h2>
          </Link>
          <p>
            This section can be used to see how the layout handles longer explanatory blocks and repeated structures.
          </p>
          <div>
            <Link href='#service-providers'>
              <h3 id='service-providers'>Service providers</h3>
            </Link>
            <p>
              Placeholder text about hosting providers, infrastructure services, analytics vendors, or communications
              tools.
            </p>
          </div>
          <div>
            <Link href='#legal-obligations'>
              <h3 id='legal-obligations'>Legal obligations</h3>
            </Link>
            <p>Placeholder text regarding disclosure when required by law, court order, or regulatory request.</p>
          </div>
        </Section>
        <Section>
          <Link href='#data-retention'>
            <h2 id='data-retention'>Data retention</h2>
          </Link>
          <p>
            Example placeholder text about keeping personal data only for as long as necessary to fulfill the relevant
            purpose.
          </p>
          <div>
            <Link href='#retention-periods'>
              <h3 id='retention-periods'>Retention periods</h3>
            </Link>
            <p>
              Different types of information may be stored for different lengths of time depending on legal requirements
              and operational needs.
            </p>
          </div>
          <div>
            <Link href='#deletion-practices'>
              <h3 id='deletion-practices'>Deletion practices</h3>
            </Link>
            <p>Placeholder text for deletion routines, anonymization, and review of stored data.</p>
          </div>
        </Section>
        <Section>
          <Link href='#your-rights'>
            <h2 id='your-rights'>Your rights</h2>
          </Link>
          <p>This section can help test more list-like legal content presented as separate blocks.</p>
          <div>
            <Link href='#right-of-access'>
              <h3 id='right-of-access'>Right of access</h3>
            </Link>
            <p>Placeholder text describing a user’s right to request access to information stored about them.</p>
          </div>
          <div>
            <Link href='#right-to-rectification'>
              <h3 id='right-to-rectification'>Right to rectification</h3>
            </Link>
            <p>
              Placeholder text describing a user’s right to request correction of inaccurate or incomplete information.
            </p>
          </div>
          <div>
            <Link href='#right-to-erasure'>
              <h3 id='right-to-erasure'>Right to erasure</h3>
            </Link>
            <p>Placeholder text describing the right to request deletion where applicable.</p>
          </div>
          <div>
            <Link href='#right-to-object'>
              <h3 id='right-to-object'>Right to object</h3>
            </Link>
            <p>Placeholder text describing the right to object to certain forms of processing.</p>
          </div>
        </Section>
        <Section>
          <Link href='#international-transfers'>
            <h2 id='international-transfers'>International transfers</h2>
          </Link>
          <p>
            Placeholder text for describing whether personal data is processed outside the user’s country and what
            safeguards may apply.
          </p>
        </Section>
        <Section>
          <Link href='#security-measures'>
            <h2 id='security-measures'>Security measures</h2>
          </Link>
          <p>This section can test how your layout handles short headings followed by slightly longer content.</p>
          <div>
            <Link href='#technical-measures'>
              <h3 id='technical-measures'>Technical measures</h3>
            </Link>
            <p>Placeholder text for encryption, access controls, backups, and other technical protections.</p>
          </div>
          <div>
            <Link href='#organizational-measures'>
              <h3 id='organizational-measures'>Organizational measures</h3>
            </Link>
            <p>Placeholder text for staff access limitations, documented routines, and internal privacy practices.</p>
          </div>
        </Section>
        <Section>
          <Link href='#childrens-privacy'>
            <h2 id='childrens-privacy'>Children’s privacy</h2>
          </Link>
          <p>
            Placeholder text for explaining whether the service is directed at children and how such data is handled.
          </p>
        </Section>
        <Section>
          <Link href='#changes-to-this-notice'>
            <h2 id='changes-to-this-notice'>Changes to this notice</h2>
          </Link>
          <p>
            Placeholder text describing that this notice may be updated from time to time and that material changes may
            be communicated clearly.
          </p>
        </Section>
        <Section>
          <Link href='#contact-information'>
            <h2 id='contact-information'>Contact information</h2>
          </Link>
          <p>
            Placeholder text for email addresses, contact forms, or other ways to get in touch about privacy-related
            matters.
          </p>
          <div>
            <Link href='#complaints'>
              <h3 id='complaints'>Complaints</h3>
            </Link>
            <p>Placeholder text describing how users may raise concerns or contact a relevant supervisory authority.</p>
          </div>
        </Section>
        <Section>
          <Link href='#frequently-asked-questions'>
            <h2 id='frequently-asked-questions'>Frequently asked questions</h2>
          </Link>
          <div>
            <Link href='#how-do-i-withdraw-consent'>
              <h3 id='how-do-i-withdraw-consent'>How do I withdraw consent?</h3>
            </Link>
            <p>
              Placeholder text for explaining how users can update preferences or withdraw previously given consent.
            </p>
          </div>
          <div>
            <Link href='#how-do-i-request-deletion'>
              <h3 id='how-do-i-request-deletion'>How do I request deletion?</h3>
            </Link>
            <p>
              Placeholder text for explaining how users can contact the website owner and request data deletion where
              applicable.
            </p>
          </div>
          <div>
            <Link href='#do-you-use-third-party-services'>
              <h3 id='do-you-use-third-party-services'>Do you use third-party services?</h3>
            </Link>
            <p>Placeholder text for explaining when external services may be used and how that affects privacy.</p>
          </div>
        </Section>
      </div>
    </main>
  );
}
