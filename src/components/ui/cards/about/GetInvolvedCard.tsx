import Link from 'next/link';
import { ComponentProps } from 'react';

export interface GetInvolvedData {
  id: string;
  title: string;
  tag: string;
  text: string;
  cta: {
    href: string;
    label: string;
  };
}

type GetInvolvedCardProps = GetInvolvedData & ComponentProps<'div'>;

export function AboutGetInvolvedCard({ title, text, tag, cta }: GetInvolvedCardProps) {
  return (
    <div className='flex flex-col gap-8 panel bg-transparent'>
      <span className='text-primary'>{tag}</span>
      <h3>{title}</h3>
      <p className='flex-1'>{text}</p>
      <Link href={cta.href} className='text-primary hover:underline'>
        {cta.label}
      </Link>
    </div>
  );
}
