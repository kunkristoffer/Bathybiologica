import { type ComponentProps, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionProps extends ComponentProps<'section'> {
  /** Set the id of this section */
  id: string;
  /** All children to be included in this component, will be wrapped in a div */
  children: ReactNode;
  /** Optional: Override the tailwind style of the children container */
  containerClassName?: ComponentProps<'div'>['className'];
  /** Optional: Add elements to section element before the children container */
  sectionChildren?: ReactNode;
}

export function Section({ id, children, className, containerClassName, sectionChildren, ...rest }: SectionProps) {
  return (
    <section id={id} className={twMerge('bg-background', className)} {...rest}>
      {sectionChildren}
      <div
        className={twMerge(
          'container mx-auto flex flex-col gap-8 md:gap-16 px-4 md:px-8 py-16 lg:py-24',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
