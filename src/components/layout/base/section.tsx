import { ComponentProps, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<ComponentPropsWithoutRef<'div'>> & {
  /** Optional tailwind styles for section container */
  sectionClassName?: ComponentProps<'section'>['className'];
  /** Optional Id for section container */
  sectionId?: ComponentProps<'section'>['id'];
};

export function Section(props: SectionProps) {
  const { children, sectionId, sectionClassName, ...rest } = props;
  return (
    <section id={sectionId} className={sectionClassName}>
      <div {...rest}>{children}</div>
    </section>
  );
}
