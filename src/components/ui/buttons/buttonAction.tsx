import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'warning' | 'error' | 'disabled';
type Style = 'solid' | 'outline';

type ButtonLinkProps = PropsWithChildren<ComponentPropsWithoutRef<'button'>> & {
  /** Label for the button */
  label: string;
  /** Change button colors from default */
  variant?: Variant;
  /** Filled or outline style */
  fill?: Style;
  /** Fill container or fit content */
  stretch?: boolean;
};

export function ButtonAction({
  label,
  onClick,
  className,
  disabled = false,
  fill = 'solid',
  variant = 'primary',
  stretch = false,
  ...rest
}: ButtonLinkProps) {
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
    disabled: {
      solid: 'border-transparent bg-disabled hover:brightness-115',
      outline: 'border-disabled text-disabled hover:brightness-200',
    },
  };

  return (
    <button
      type='submit'
      onClick={onClick}
      className={twMerge(
        `
          flex items-center justify-center py-2 px-4 rounded-md box-border border-2 transition-all cursor-pointer
          ${stretch ? 'w-full' : 'w-fit'}
          ${TW_VARIANTS[disabled ? 'disabled' : variant][fill]}
        `,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  );
}
