import { type ComponentProps, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeroSectionProps {
  children: ReactNode;
  /** Override the sections tailwind classes */
  className?: ComponentProps<'section'>['className'];
  /** Use custom image from public folder, defaults to `hero-water.jpg` */
  image?: string;
  /** Override tailwind classes for element that has the background */
  imageClassName?: ComponentProps<'span'>['className'];
}

export function HeroSection({ children, className, image, imageClassName }: HeroSectionProps) {
  return (
    <section
      className={twMerge(
        `relative h-[calc(100svh-var(--header-h))] overflow-hidden bg-linear-to-b from-transparent to-background`,
        className
      )}
    >
      <span
        className={twMerge(`-z-10 absolute inset-0 bg-cover bg-center bg-fixed`, imageClassName)}
        style={{ backgroundImage: `url(${image || 'hero-water.jpg'})` }}
      ></span>
      {children}
    </section>
  );
}
