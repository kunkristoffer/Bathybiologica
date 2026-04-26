import { PrivacySection } from '@/components/content/legal/privacy/PrivacySection';
import { TableOfContents } from '@/components/ui/menus/tableOfContent/ToC';
import { PrivacyMessages } from '@/types/legal/privacy.types';
import { getMessages } from 'next-intl/server';

export default async function Privacy() {
  const messages = await getMessages();
  const privacy = messages.privacy as PrivacyMessages;
  return (
    <main className='relative sm:flex-row gap-4 p-4 md:px-8'>
      <TableOfContents containerID='privacy-page' headingLevels={['h2', 'h3', 'h4']} />
      <div id='privacy-page' className='flex flex-col gap-12'>
        {privacy.sections.map((data, i) => (
          <PrivacySection key={data.id} level={i === 0 ? 1 : 2} {...data} />
        ))}
      </div>
    </main>
  );
}
