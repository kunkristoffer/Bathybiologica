import { type LucideIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconTitleTextCardProps extends ComponentProps<'div'> {
  title: string;
  text: string[];
  icon: LucideIcon;
}

export function IconTitleTextCard({ title, text, icon: Icon, className, ...rest }: IconTitleTextCardProps) {
  return (
    <div className={twMerge('panel flex flex-col items-center gap-4', className)}>
      <Icon className='text-primary' />
      <h3 className='text-center'>{title}</h3>
      {text.map((para, i) => (
        <p key={`${title}-${i}`} className=''>
          {para}
        </p>
      ))}
    </div>
  );
}
