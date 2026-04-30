import { ComponentProps } from 'react';

export interface AboutProgressData {
  id: string;
  status: string;
  title: string;
  text: string;
}

type AboutProgressCardProps = AboutProgressData & ComponentProps<'div'>;

export function AboutProgressCard({ title, text, status }: AboutProgressCardProps) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='py-4 text-5xl font-extrabold tracking-wide text-primary text-center'>{status}</span>
      <h3>{title}</h3>
      <p className='text-text-muted'>{text}</p>
    </div>
  );
}
