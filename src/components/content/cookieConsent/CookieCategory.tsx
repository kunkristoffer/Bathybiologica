import { FormCheckBox } from '@/components/ui/input/checkBox';
import { CookieCategory, CookieOption, SelectedCookies } from '@/types/legal/cookieConsent.types';
import { ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';
import { useRef } from 'react';

interface CookieConsentCategoryProps extends CookieCategory {
  defaultOpen?: boolean;
  selectedCookies: Record<string, boolean>;
}

export function CookieConsentCategory({
  name,
  label,
  description,
  tooltip,
  options,
  defaultOpen = false,
  selectedCookies,
}: CookieConsentCategoryProps) {
  const selected = options.reduce((acc, cur) => (cur.isEnabled ? acc + 1 : 0), 0);

  return (
    <details
      name='cookie-consent'
      className={`group flex flex-col gap-2 panel bg-surface hover:bg-surface-hover duration-200`}
      open={defaultOpen}
    >
      <summary className='flex flex-col'>
        <span className='flex items-center gap-2 border-b border-panel-border pb-1'>
          <label className='flex gap-2 items-center'>
            <FormCheckBox name={name} />
            <h3 className='ml-2'>{label}</h3>
            {tooltip && <small className='px-2 rounded-full bg-disabled'>{tooltip}</small>}
          </label>
          <small className='ml-auto text-text-muted'>{`${selected} of ${options.length} selected`}</small>
          <ListChevronsDownUp className='hidden group-open:block' />
          <ListChevronsUpDown className='group-open:hidden' />
        </span>
        <small className='italic py-2'>{description}</small>
      </summary>
      <div className='flex flex-col gap-2'>
        {options.map((option) => (
          <label
            key={option.label + option.name}
            className='flex flex-col justify-center p-2 gap-2 border rounded-md bg-panel hover:bg-panel-hover has-checked:bg-tertiary has-checked:hover:bg-tertiary-hover'
          >
            <span className='flex gap-2'>
              <p className='capitalize mr-auto'>{option.label}</p>
              <p className=''>{selectedCookies[option.name]}</p>
              <FormCheckBox name={option.name} />
            </span>
            <small className=''>{option.description}</small>
          </label>
        ))}
      </div>
    </details>
  );
}
