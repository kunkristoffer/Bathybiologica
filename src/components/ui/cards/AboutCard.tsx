import { type LucideIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardBaseProps extends ComponentProps<'div'> {
  title: string;
  children: ReactNode;
  /** Override the position of the icon in relation to content */
  iconPos?: 'top' | 'left' | 'inline';
}

type CardWithTag = {
  icon?: never;
  /** Add a tag above the card title, this is exclusive with icon */
  tag: string;
};

type CardWithIcon = {
  /** Add an icon to the card, this is exclusive with tag */
  icon: LucideIcon;
  tag?: never;
};

type CardProps = CardBaseProps & (CardWithIcon | CardWithTag);

export function AboutCard({ title, icon: Icon, tag, iconPos = 'inline', className, children, ...rest }: CardProps) {
  return (
    <div
      className={twMerge(
        `
          grid gap-4 panel h-full auto-rows-[auto_auto_1fr]
          ${iconPos === 'top' ? `[grid-template-areas:'icon''title''content']` : `grid-cols-[auto_1fr]`}
          ${iconPos === 'inline' ? `[grid-template-areas:'icon_title''content_content']` : ''}
          ${iconPos === 'left' ? `[grid-template-areas:'icon_title''icon_content']` : ''}
        `,
        className
      )}
      {...rest}
    >
      {tag && !Icon && <span className='[grid-area:icon] text-primary'>{tag}</span>}
      {Icon && <Icon className={`[grid-area:icon] self-center justify-self-center text-primary size-8`} />}
      <h3 className={`[grid-area:title] self-center ${iconPos === 'top' ? 'text-center' : ''} text-2xl`}>{title}</h3>
      <div className={`[grid-area:content] flex flex-col justify-around gap-4`}>{children}</div>
    </div>
  );
}
