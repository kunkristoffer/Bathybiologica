import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TimelineItem {
  id: string;
  title: string;
  text: string;
}

type TimelineCardProps = TimelineItem & ComponentProps<'div'> & { number?: number };

export function TimelineCard({ title, text, number, className }: TimelineCardProps) {
  return (
    <div className={twMerge('relative border-l-2 border-tertiary pl-8 not-last:pb-8', className)}>
      <span className='absolute top-0 left-0 -translate-x-1/2 inline-flex items-center justify-center size-8 rounded-full bg-tertiary border border-primary'>
        <span>{number}</span>
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
