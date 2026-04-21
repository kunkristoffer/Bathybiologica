import { PrivacySection } from '@/components/content/legal/privacy/PrivacySection';
import { TableOfContents } from '@/components/ui/menus/tableOfContent/ToC';
import { privacyData } from '@/data/legal/privacy/privacyData';

export default async function Privacy() {
  return (
    <main className='relative sm:flex-row gap-4 p-4'>
      <TableOfContents />
      <div className='flex flex-col'>
        {privacyData.map((data) => (
          <PrivacySection key={data.id} {...data} />
        ))}
      </div>
    </main>
  );
}
