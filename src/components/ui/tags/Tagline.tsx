import { type LucideIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TaglineProps extends ComponentProps<'span'> {
  text: string;
  reversed?: boolean;
  icon?: LucideIcon;
}

export function Tagline({ text, icon: Icon, reversed = false, className, ...rest }: TaglineProps) {
  return (
    <span
      className={twMerge(
        `w-fit flex items-center ${reversed ? 'flex-row-reverse' : 'flex-row'} gap-4 px-4 py-2 rounded-full border border-primary text-text bg-tertiary/20`,
        className
      )}
      {...rest}
    >
      {Icon && <Icon className='text-primary' />}
      <p>{text}</p>
    </span>
  );
}
