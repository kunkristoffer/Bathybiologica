import { FormCheckBox } from '@/components/ui/input/checkBox';
import { ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

interface CookieConsentCategoryProps extends CookieCategory {
  defaultOpen: boolean;
}

export function CookieConsentCategory({
  name,
  label,
  description,
  tooltip,
  options,
  defaultOpen = false,
}: CookieConsentCategoryProps) {
  const [isExpanded, setIsExpended] = useState(defaultOpen);
  return (
    <div className='flex flex-col gap-2 panel'>
      <span className='flex items-center gap-2 border-b border-panel-border pb-1'>
        <FormCheckBox name={name} />
        <h3 className='ml-2'>{label}</h3>
        {tooltip && <small className='px-2 rounded-full bg-text-muted'>{tooltip}</small>}
        <span className='ml-auto' onClick={() => setIsExpended((old) => !old)}>
          {isExpanded ? <ListChevronsUpDown /> : <ListChevronsDownUp />}
        </span>
      </span>
      <div className='flex flex-col gap-2'>
        <small className='italic py-2'>{description}</small>
        {isExpanded &&
          options.map((option) => (
            <label
              key={option.label + option.name}
              className='flex flex-col justify-center p-2 gap-2 border rounded-md hover:bg-surface has-checked:bg-success/33'
            >
              <span className='flex gap-2'>
                <p className='capitalize mr-auto'>{option.label}</p>
                <FormCheckBox name={option.name} />
              </span>
              <small className=''>{option.description}</small>
            </label>
          ))}
      </div>
    </div>
  );
}
