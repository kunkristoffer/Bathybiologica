'use client';

import { type ComponentProps, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon: ReactElement;
}

export function IconButton({ icon, label, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={twMerge('flex gap-2 items-center', className)} {...props}>
      {icon}
      {label && <p className='capitalize'>{label}</p>}
    </button>
  );
}
