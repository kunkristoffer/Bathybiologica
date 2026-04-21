import { getTranslations } from 'next-intl/server';
import { PrivacySectionNode } from '@/types/legal/privacy.types';

export async function PrivacyBlock(data: PrivacySectionNode['content'][number]) {
  const t = await getTranslations(`privacy`);

  if (data.type === 'paragraph') {
    return <p>{data.text}</p>;
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='flex flex-col pl-2 border-l-2 border-success'>
        <p className='font-bold'>{t('static.what')}</p>
        <small>{data.what}</small>
      </span>
      <span className='flex flex-col pl-2 border-l-2 border-warning'>
        <p className='font-bold'>{t('static.why')}</p>
        <small>{data.why}</small>
      </span>
      <span className='flex flex-col pl-2 border-l-2 border-primary'>
        <p className='font-bold'>{t('static.how')}</p>
        <small>{data.how}</small>
      </span>
    </div>
  );
}
