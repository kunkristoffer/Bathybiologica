import { useClickOutside } from '@/hooks/useClickOutside';
import { ComponentProps, ReactElement, ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface MenuProps extends ComponentProps<'details'> {
  /** The currently active element or value */
  active: ReactElement;
  /** The options for this dropdown */
  children: ReactNode;
  /** Overrides alignment of dropdown */
  align?: 'left' | 'center' | 'right';
  /** Overrides the default orientation of the dropdown */
  isHorizontal?: boolean;
}

export function HeaderMenu({ active, children, align = 'right', isHorizontal = false, ...props }: MenuProps) {
  const { className, ...rest } = props;
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useClickOutside(detailsRef, () => detailsRef.current?.toggleAttribute('open', false));
  return (
    <details ref={detailsRef} className={twMerge(`relative`, className)} {...rest}>
      <summary className='flex hover:animate-pulse'>{active}</summary>
      <div
        className={`
          absolute flex ${isHorizontal ? 'flex-row' : 'flex-col'} mt-2 w-max
          ${align === 'right' ? 'right-0' : align === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}
          overflow-clip rounded-md border border-surface-border shadow-surface
          bg-surface
        `}
        onMouseLeave={() => {
          //detailsRef.current?.toggleAttribute('open', false);
        }}
      >
        {children}
      </div>
    </details>
  );
}
