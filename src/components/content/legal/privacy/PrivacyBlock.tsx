import { type PrivacySectionNode } from '@/types/legal/privacy.types';
import { getTranslations } from 'next-intl/server';

type Categories = 'what' | 'how' | 'why' | (string & {});

async function Block({ category, text }: { category: Categories; text: string }) {
  const t = await getTranslations(`privacy`);
  return (
    <span
      className={`
      flex flex-col pl-2 border-l-2
      ${category === 'how' ? 'border-primary' : category === 'what' ? 'border-success' : ' border-warning'}
    `}
    >
      <p className='font-bold'>{t(`static.${category}`)}</p>
      <small>{text}</small>
    </span>
  );
}

async function Paragraph({ text }: { text: string }) {
  return <p>{text}</p>;
}

export function PrivacyBlock(data: PrivacySectionNode['content'][number]) {
  if (data.type === 'paragraph') return <Paragraph text={data.text} />;

  return (
    <div className='flex flex-col gap-2 p-2 border border-panel-border/50 rounded-md'>
      {Object.entries(data)
        .filter((data) => data[0] !== 'type')
        .map(([category, text]) => (
          <Block key={category} category={category} text={text} />
        ))}
    </div>
  );
}
