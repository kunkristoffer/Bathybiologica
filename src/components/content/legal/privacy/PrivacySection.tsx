// Globals
import { type PrivacySectionNode } from '@/types/legal/privacy.types';
import { JSX } from 'react';
import Link from 'next/link';

// Components
import { Section } from '@/components/layout/base/section';
import { PrivacyBlock } from '@/components/content/legal/privacy/PrivacyBlock';

export async function PrivacySection({ id, level = 1, title, content, children }: PrivacySectionNode) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Section>
      <Link href={id}>
        <Heading id={id}>{title}</Heading>
      </Link>
      <div className='flex flex-col gap-2'>
        {content.map((item, i) => (
          <PrivacyBlock key={id} {...item} />
        ))}
      </div>
      {children && children.map((child) => <PrivacySection key={child.id} level={level + 1} {...child} />)}
    </Section>
  );
}
