import { type ComponentProps, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/components/layout/base/sections/Base';

interface SectionParallaxProps extends ComponentProps<'section'> {
  /** Set the id of this section */
  id: string;
  /** All children to be included in this component, will be wrapped in a div */
  children: ReactNode;
  /** Set the parallaxing image, must exist in `public` folder */
  image: string;
  /** Optional: Override the tailwind style of the parallaxing image */
  imageClassName?: ComponentProps<'span'>['className'];
  /** Optional: Override the tailwind style of the children container */
  containerClassName?: ComponentProps<'div'>['className'];
}

function ParallaxImage({ image, imageClassName }: Pick<SectionParallaxProps, 'image' | 'imageClassName'>) {
  return (
    <span
      className={twMerge(`-z-10 absolute inset-0 bg-cover bg-center bg-fixed`, imageClassName)}
      style={{ backgroundImage: `url(${image || 'hero-water.jpg'})` }}
    ></span>
  );
}

export function SectionParallax({
  id,
  image,
  imageClassName,
  children,
  className,
  containerClassName,
  ...rest
}: SectionParallaxProps) {
  return (
    <Section
      id={id}
      children={children}
      containerClassName={containerClassName}
      sectionChildren={<ParallaxImage image={image} imageClassName={imageClassName} />}
      className={twMerge('relative bg-background/80', className)}
      {...rest}
    />
  );
}
