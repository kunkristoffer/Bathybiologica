// Globals
import { type PrivacySectionNode } from '@/types/legal/privacy.types';
import { JSX } from 'react';
import Link from 'next/link';

// Components
import { Section } from '@/components/layout/base/section';
import { PrivacyBlock } from '@/components/content/legal/privacy/PrivacyBlock';
import { Link as LinkIcon } from 'lucide-react';

export async function PrivacySection({ id, index = [], level = 1, title, content, children }: PrivacySectionNode) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <>
      <Section className={`group/sec flex flex-col gap-4 ${level > 3 ? 'pl-4' : ''}`}>
        <Link href={`#${id}`} className='group/link flex items-center group-hover/sec:text-primary hover:underline'>
          <Heading id={id} className={`${level == 2 ? 'border-b-2' : ''} font-bold`}>
            {`${index.join('.')} ${title}`}
          </Heading>
          <LinkIcon className='hidden group-hover/link:block pl-2' />
        </Link>
        <div className='flex flex-col gap-2 p-2'>
          {content.map((item, i) => (
            <PrivacyBlock key={`${item}-${i}`} {...item} />
          ))}
        </div>
      </Section>
      {children &&
        children.map((child, i) => (
          <PrivacySection key={child.id} index={[...index, i + 1]} level={level + 1} {...child} />
        ))}
    </>
  );
}
