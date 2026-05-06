import { type LucideIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentProps<'div'> {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  /** Override the position of the icon in relation to content */
  iconPos?: 'top' | 'left' | 'inline';
}

export function AboutCard({ title, icon: Icon, iconPos = 'inline', className, children, ...rest }: CardProps) {
  return (
    <div
      className={twMerge(
        `
          grid gap-4 panel h-full
          ${iconPos === 'top' ? `auto-rows-[auto_auto_1fr] [grid-template-areas:'icon''title''content']` : `grid-cols-[auto_1fr]`}
          ${iconPos === 'inline' ? `[grid-template-areas:'icon_title''content_content']` : ''}
          ${iconPos === 'left' ? `[grid-template-areas:'icon_title''icon_content']` : ''}
        `,
        className
      )}
      {...rest}
    >
      <Icon className={`[grid-area:icon] self-center justify-self-center text-primary size-8`} />
      <h3 className={`[grid-area:title] self-center ${iconPos === 'top' ? 'text-center' : ''} text-2xl`}>{title}</h3>
      <div className={`[grid-area:content] flex flex-col justify-around gap-4`}>{children}</div>
    </div>
  );
}
