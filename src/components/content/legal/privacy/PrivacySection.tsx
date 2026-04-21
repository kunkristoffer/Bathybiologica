import { type PrivacyData } from '@/data/legal/privacy/privacyData';

import Link from 'next/link';
import { toCamelCase } from '@/utils/text/transform';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/layout/base/section';
import { PrivacyBlock } from '@/components/content/legal/privacy/PrivacyBlock';

export async function PrivacySection({ id, content, children }: PrivacyData) {
  const t = await getTranslations(`privacy.${toCamelCase(id)}`);
  return (
    <Section>
      <Link href={id}>
        <h1 id={id}>{t('title')}</h1>
      </Link>
      {content.map((item, i) => (
        <PrivacyBlock key={`${id}-${i}`} id={id} content={item} />
      ))}
    </Section>
  );
}
