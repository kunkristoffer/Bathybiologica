import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface HamburgerIconProps extends ComponentProps<'svg'> {
  active?: boolean;
}

export function HamburgerIcon({ active, className, ...props }: HamburgerIconProps) {
  const pathClass: ComponentPropsWithoutRef<'path'>['className'] =
    'bg-primary fill-none stroke-current stroke-3 [transition:stroke-dasharray_0.3s_cubic-bezier(0.645,0.045,0.355,1),stroke-dashoffset_0.3s_cubic-bezier(0.645,0.045,0.355,1)]';

  return (
    <svg
      viewBox='35 50 30 1'
      xmlns='http://www.w3.org/2000/svg'
      className={twMerge('size-6 overflow-visible fill-text hover:fill-primary-hover', className)}
      {...props}
    >
      <path
        className={twMerge(pathClass, ``)}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeDasharray={active ? '22, 126' : '24, 126'}
        strokeDashoffset={active ? -94 : -38}
        d='M0 40h62c13 0 6 28-4 18L35 35'
      />
      <path
        className={twMerge(pathClass, ``)}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeDasharray={active ? '0, 70' : '24, 70'}
        strokeDashoffset={active ? -50 : -38}
        d='M0 50h70'
      />
      <path
        className={twMerge(pathClass, ``)}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeDasharray={active ? '22, 126' : '24, 126'}
        strokeDashoffset={active ? -94 : -38}
        d='M0 60h62c13 0 6-28-4-18L35 65'
      />
    </svg>
  );
}
