// Globals
import { type PrivacySectionNode } from '@/types/legal/privacy.types';
import { JSX } from 'react';
import Link from 'next/link';

// Components
import { Section } from '@/components/layout/base/section';
import { PrivacyBlock } from '@/components/content/legal/privacy/PrivacyBlock';

export async function PrivacySection({ id, index = [], level = 1, title, content, children }: PrivacySectionNode) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Section className='flex flex-col gap-8'>
      <Link href={`#${id}`}>
        <Heading id={id}>{`${index.join('.')} ${title}`}</Heading>
      </Link>
      <div className='flex flex-col gap-2'>
        {content.map((item, i) => (
          <PrivacyBlock key={id} {...item} />
        ))}
      </div>
      {children &&
        children.map((child, i) => (
          <PrivacySection key={child.id} index={[...index, i + 1]} level={level + 1} {...child} />
        ))}
    </Section>
  );
}
