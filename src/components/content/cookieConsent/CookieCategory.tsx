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
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const selected = options.reduce((acc, cur) => (cur.isEnabled ? acc + 1 : 0), 0);
  return (
    <details ref={detailsRef} name='cookie-consent' className='flex flex-col gap-2 panel' open={defaultOpen}>
      <summary className='flex flex-col'>
        <span className='flex items-center gap-2 border-b border-panel-border pb-1'>
          <FormCheckBox name={name} />
          <h3 className='ml-2'>{label}</h3>
          {detailsRef.current?.open}
          {tooltip && <small className='px-2 rounded-full bg-text-muted'>{tooltip}</small>}
          <small className='ml-auto text-text-muted'>{`${selected} of ${options.length} selected`}</small>
          <span className=''>{detailsRef.current?.open ? <ListChevronsUpDown /> : <ListChevronsDownUp />}</span>
        </span>
        <small className='italic py-2'>{description}</small>
      </summary>
      <div className='flex flex-col gap-2'>
        {options.map((option) => (
          <label
            key={option.label + option.name}
            className='flex flex-col justify-center p-2 gap-2 border rounded-md hover:bg-surface has-checked:bg-success/33'
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
