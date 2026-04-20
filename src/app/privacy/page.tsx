import Link from 'next/link';
import { Section } from '@/components/layout/base/section';
import { TableOfContents } from '@/components/ui/menus/tableOfContent/ToC';

export default function Privacy() {
  return (
    <main className='relative sm:flex-row gap-4 p-4'>
      <TableOfContents />
      <div className='flex flex-col'>
        <Section>
          <Link href='#privacy-page-title'>
            <h1 id='privacy-page-title'>Privacy page</h1>
          </Link>
          <p>This page is under development</p>
        </Section>
      </div>
    </main>
  );
}
