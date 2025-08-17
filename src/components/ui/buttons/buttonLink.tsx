import Link from 'next/link';
import { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning' | 'error';
type Style = 'solid' | 'outline';

interface ButtonLinkProps {
  /** Label for the button */
  label: string;
  /** Internal or external link */
  href: string;
  /** Optional tailwind style override */
  className?: ComponentProps<'a'>['className'];
  /** Change button colors from default */
  variant?: Variant;
  /** Filled or outline style */
  style?: Style;
  /** Fill container or fit content */
  fill?: boolean;
}

export function ButtonLink({
  label,
  href,
  className,
  style = 'solid',
  variant = 'primary',
  fill = false,
}: ButtonLinkProps) {
  // Base for use with variants
  const TW_BASE = 'flex justify-center py-2 px-4 rounded-md box-border border-2 transition-all ';

  // Variant color maps
  const TW_VARIANTS: Record<Variant, { solid: string; outline: string }> = {
    primary: {
      solid: 'border-transparent bg-primary text-white hover:brightness-115',
      outline: 'border-primary text-primary hover:brightness-200',
    },
    secondary: {
      solid: 'border-transparent bg-secondary text-white hover:brightness-115',
      outline: 'border-secondary text-secondary hover:brightness-200',
    },
    tertiary: {
      solid: 'border-transparent bg-tertiary text-white hover:brightness-115',
      outline: 'border-tertiary text-tertiary hover:brightness-200',
    },
    success: {
      solid: 'border-transparent bg-success text-white hover:brightness-115',
      outline: 'border-success text-success hover:brightness-200',
    },
    warning: {
      solid: 'border-transparent bg-warning text-white hover:brightness-115',
      outline: 'border-warning text-warning hover:brightness-200',
    },
    danger: {
      solid: 'border-transparent bg-danger text-white hover:brightness-115',
      outline: 'border-danger text-danger hover:brightness-200',
    },
    error: {
      solid: 'border-transparent bg-error text-white hover:brightness-115',
      outline: 'border-error text-error hover:brightness-200',
    },
  };

  // Construct tailwind classes
  const twClasses = `${fill ? 'w-full' : 'w-fit'} ${TW_BASE} ${TW_VARIANTS[variant][style]} ${className}`;

  if (/^(\/|#)/.test(href))
    return (
      <Link href={href} className={twClasses}>
        {label}
      </Link>
    );

  return (
    <a href={href} className={twClasses}>
      {label}
    </a>
  );
}
