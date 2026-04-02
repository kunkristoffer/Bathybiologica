import Link from 'next/link';
import { type ComponentProps, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface LinkProps extends ComponentProps<'a'> {
  href: string;
  label: string;
  isExternal?: boolean;
  icon: ReactElement;
}

export function IconLink({ href, icon, label, className, isExternal = false, ...props }: LinkProps) {
  if (href.includes('.') || isExternal) {
    return (
      <a href={href} className={twMerge('flex gap-2 items-center', className)} {...props}>
        {icon}
        {label && <p>{label}</p>}
      </a>
    );
  }
  return (
    <Link href={href} className={twMerge('flex gap-2 items-center', className)} {...props}>
      {icon}
      {label && <p>{label}</p>}
    </Link>
  );
}
