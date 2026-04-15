'use client';

import { type ConsentCategory } from '@/types/legal/consent.types';
import { ComponentProps, type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { FormCheckBox } from '@/components/ui/input/checkBox';
import { ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface CookieConsentCategoryProps extends ConsentCategory {
  /** Should this category start out open or collapsed */
  defaultOpen?: boolean;
  values: Record<string, boolean>;
  onChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
}

export function CookieConsentCategory({
  name,
  options,
  values,
  isRequired,
  tags,
  onChange,
  defaultOpen = false,
}: CookieConsentCategoryProps) {
  const selectedOptionAmount = Object.values(values).reduce((sum, cur) => (sum += cur ? 1 : 0), 0);
  const isCategorySelected = selectedOptionAmount === options?.length;

  const t = useTranslations('consent');

  return (
    <details
      name='cookie-consent'
      open={defaultOpen}
      className={`
        group flex flex-col panel bg-surface p-2
        hover:bg-surface-hover duration-200
        ${isCategorySelected ? 'border-primary' : ''}
      `}
    >
      <summary className='flex flex-col gap-2'>
        <span className='flex items-center gap-2 border-b border-panel-border pb-1'>
          <label className='flex gap-2 items-center mr-auto'>
            <FormCheckBox name={name} checked={isCategorySelected} onChange={onChange} disabled={isRequired} />
            <h3 className='ml-2'>{t(`categories.${name}.title`)}</h3>
            {tags?.length && <Tags tags={tags} className='max-sm:hidden' />}
          </label>
          <small className='text-text-muted'>{`${selectedOptionAmount} ${t('translations.of')} ${options?.length} ${t('translations.selected')}`}</small>
          <ListChevronsDownUp className='hidden group-open:block' />
          <ListChevronsUpDown className='group-open:hidden' />
        </span>
        <small className='italic'>{t(`categories.${name}.description`)}</small>
        {tags?.length && <Tags tags={tags} className='sm:hidden' />}
      </summary>
      <div className='flex flex-col gap-2 pt-2'>
        {options?.map((option) => (
          <label
            key={`${name}-${option.name}`}
            className={`
              flex flex-col justify-center p-2 gap-2 border rounded-md bg-panel
              hover:bg-panel-hover has-checked:bg-tertiary has-checked:hover:bg-tertiary-hover
              has-disabled:bg-disabled!
            `}
          >
            <span className='flex gap-2 justify-between'>
              <span className='flex gap-2 items-center'>
                <p className='capitalize mr-auto'>{t(`options.${option.name}.title`)}</p>
                <small title='cookie name' className='px-2 rounded-full bg-disabled border border-panel-border'>
                  {option.cookieName}
                </small>
              </span>
              <FormCheckBox
                name={option.name}
                checked={values[option.name]}
                data-parent-category={name}
                onChange={onChange}
                disabled={option.isRequired}
              />
            </span>
            <small>{t(`options.${option.name}.description`)}</small>
            {option.tags?.length && <Tags tags={option.tags} />}
          </label>
        ))}
      </div>
    </details>
  );
}

function Tags({ tags, className }: { tags: string[]; className?: ComponentProps<'span'>['className'] }) {
  const t = useTranslations('consent');
  const Tag = ({ tag }: { tag: string }) => (
    <small className='px-2 rounded-full bg-secondary border border-panel-border'>{tag}</small>
  );

  return (
    <span className={twMerge('flex gap-2 items-center', className)}>
      {tags.map((tag) => (
        <Tag key={tag} tag={t(`tags.${tag}`)} />
      ))}
    </span>
  );
}
