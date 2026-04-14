'use client';

import { type ConsentCategory } from '@/types/legal/consent.types';
import { type ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { FormCheckBox } from '@/components/ui/input/checkBox';
import { ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';

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
        group flex flex-col gap-2 panel bg-surface
        hover:bg-surface-hover duration-200
        ${isCategorySelected ? 'border-primary' : ''}
      `}
    >
      <summary className='flex flex-col'>
        <span className='flex items-center gap-2 border-b border-panel-border pb-1'>
          <label className='flex gap-2 items-center'>
            <FormCheckBox name={name} checked={isCategorySelected} onChange={onChange} disabled={isRequired} />
            <h3 className='ml-2'>{t(`categories.${name}.title`)}</h3>
            {tags?.map((tag) => (
              <small key={name + tag} className='px-2 rounded-full bg-disabled'>
                {t(`tags.${tag}`)}
              </small>
            ))}
          </label>
          <small className='ml-auto text-text-muted'>{`${selectedOptionAmount} ${t('translations.of')} ${options?.length} ${t('translations.selected')}`}</small>
          <ListChevronsDownUp className='hidden group-open:block' />
          <ListChevronsUpDown className='group-open:hidden' />
        </span>
        <small className='italic py-2'>{t(`categories.${name}.description`)}</small>
      </summary>
      <div className='flex flex-col gap-2'>
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
                {/* <p className=''>{selectedCookies && selectedCookies[option.name]}</p> */}
                {option.tags?.map((tag) => (
                  <small key={name + tag} className='px-2 rounded-full bg-disabled'>
                    {t(`tags.${tag}`)}
                  </small>
                ))}
              </span>
              <FormCheckBox
                name={option.name}
                checked={values[option.name]}
                data-parent-category={name}
                onChange={onChange}
                disabled={option.isRequired}
              />
            </span>
            <small className=''>{t(`options.${option.name}.description`)}</small>
          </label>
        ))}
      </div>
    </details>
  );
}
