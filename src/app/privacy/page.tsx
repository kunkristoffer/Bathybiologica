import { PrivacySection } from '@/components/content/legal/privacy/PrivacySection';
import { TableOfContents } from '@/components/ui/menus/tableOfContent/ToC';
import { PrivacyMessages } from '@/types/legal/privacy.types';
import { getMessages } from 'next-intl/server';

export default async function Privacy() {
  const messages = await getMessages();
  const privacy = messages.privacy as PrivacyMessages;
  return (
    <main className='relative sm:flex-row gap-4 p-4'>
      <TableOfContents headingLevels={['h2', 'h3', 'h4']} />
      <div className='flex flex-col gap-4'>
        {privacy.sections.map((data, i) => (
          <PrivacySection key={data.id} level={i === 0 ? 1 : 2} {...data} />
        ))}
      </div>
    </main>
  );
}
