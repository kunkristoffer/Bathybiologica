import { getTranslations } from 'next-intl/server';
import { PrivacyData } from '@/data/legal/privacy/privacyData';
import { toCamelCase } from '@/utils/text/transform';

export async function PrivacyBlock({ id, content }: { id: string; content: PrivacyData['content'][number] }) {
  const t = await getTranslations(`privacy.${toCamelCase(id)}`);

  if (typeof content === 'string') {
    return <p>{t(content)}</p>;
  }
  return <div>testrrr</div>;
}
