import { type LucideIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardData {
  id: string;
  title: string;
  text: string[];
  icon: LucideIcon;
}

type IconTitleTextCardProps = { iconPos?: 'left' | 'top' } & CardData & ComponentProps<'div'>;

export function IconTitleTextCard({ title, text, icon: Icon, iconPos = 'top', className }: IconTitleTextCardProps) {
  return (
    <div
      className={twMerge(
        `panel flex ${iconPos === 'top' ? 'flex-col items-center' : ''} gap-4 hover:bg-panel-hover`,
        className
      )}
    >
      <Icon className={`${iconPos === 'top' ? 'size-8' : 'size-24'} text-primary`} />
      <span className='flex flex-col gap-4'>
        <h3 className={`${iconPos === 'top' ? 'text-center' : ''} line-clamp-2`}>{title}</h3>
        {text.map((para, i) => (
          <p key={`${title}-${i}`} className=''>
            {para}
          </p>
        ))}
      </span>
    </div>
  );
}
