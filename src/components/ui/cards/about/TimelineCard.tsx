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
    <div
      className={twMerge(
        'group relative border-l-2 border-tertiary hover:border-primary ml-4 pl-8 not-last:pb-6 duration-200',
        className
      )}
    >
      <span className='absolute top-0 left-0 -translate-x-1/2 inline-flex items-center justify-center size-8 rounded-full bg-tertiary border-2 border-tertiary group-hover:border-primary duration-200'>
        {number}
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
