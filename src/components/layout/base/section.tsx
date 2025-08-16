import { ComponentProps, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<ComponentPropsWithoutRef<'div'>> & {
  /** Optional tailwind styles for section container */
  sectionClassName?: ComponentProps<'section'>['className'];
};

export function Section(props: SectionProps) {
  const { children, sectionClassName, ...rest } = props;
  return (
    <section className={sectionClassName}>
      <div {...rest}>{children}</div>
    </section>
  );
}
