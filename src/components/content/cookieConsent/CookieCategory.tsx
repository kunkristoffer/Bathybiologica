import { type ConsentFormSchemaBindings } from '@/types/legal/consent.types';
import { ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';
import { FormCheckBox } from '@/components/ui/input/checkBox';
import { ChangeEvent } from 'react';

interface CookieConsentCategoryProps extends ConsentFormSchemaBindings {
  /** Should this category start out open or collapsed */
  defaultOpen?: boolean;
  values: Record<string, boolean>;
  onChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
}

export function CookieConsentCategory({
  name,
  label,
  description,
  tooltip,
  options,
  values,
  onChange,
  defaultOpen = false,
}: CookieConsentCategoryProps) {
  const selectedOptionAmount = Object.values(values).reduce((sum, cur) => (sum += cur ? 1 : 0), 0);
  const isCategorySelected = selectedOptionAmount === options?.length;

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
            <FormCheckBox name={name} checked={isCategorySelected} onChange={onChange} />
            <h3 className='ml-2'>{label}</h3>
            {tooltip && <small className='px-2 rounded-full bg-disabled'>{tooltip}</small>}
          </label>
          <small className='ml-auto text-text-muted'>{`${selectedOptionAmount} of ${options?.length} selected`}</small>
          <ListChevronsDownUp className='hidden group-open:block' />
          <ListChevronsUpDown className='group-open:hidden' />
        </span>
        <small className='italic py-2'>{description}</small>
      </summary>
      <div className='flex flex-col gap-2'>
        {options?.map((option) => (
          <label
            key={option.label + option.name}
            className='flex flex-col justify-center p-2 gap-2 border rounded-md bg-panel hover:bg-panel-hover has-checked:bg-tertiary has-checked:hover:bg-tertiary-hover'
          >
            <span className='flex gap-2'>
              <p className='capitalize mr-auto'>{option.label}</p>
              {/* <p className=''>{selectedCookies && selectedCookies[option.name]}</p> */}
              <FormCheckBox
                name={option.name}
                checked={values[option.name]}
                data-parent-category={name}
                onChange={onChange}
              />
            </span>
            <small className=''>{option.description}</small>
          </label>
        ))}
      </div>
    </details>
  );
}
