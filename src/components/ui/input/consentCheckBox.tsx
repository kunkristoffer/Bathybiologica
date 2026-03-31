'use client';

import { FormCheckBox } from '@/components/ui/input/checkBox';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FormInputConsentCheckBoxProps {
  /** Name of the input for use in formData */
  name: string;
  /** Id of the input for use with css or js */
  id?: string;
  /** Error message for user */
  errorMessage?: string;
  /** What is the default state */
  defaultChecked?: boolean;
}

export function FormInputConsentCheckBox({ name, id, defaultChecked, errorMessage }: FormInputConsentCheckBoxProps) {
  const i18n = useTranslations('contactUsForm');
  return (
    <span>
      <label
        className={`
          flex-1 flex items-center p-2 gap-2 rounded-md
          bg-input border-2
          ${errorMessage ? 'border-error' : 'border-text-muted'} has-checked:border-primary
          cursor-pointer
        `}
      >
        <FormCheckBox name={name} id={id} defaultChecked={defaultChecked} />
        <p className='w-fit select-none text-text-input text-xs/snug'>
          {i18n('consent.p1')}
          <Link href='/privacy' className='px-1 text-secondary hover:underline'>
            {i18n('consent.label')}
          </Link>
          {i18n('consent.p2')}
        </p>
      </label>
      {errorMessage && <p className='text-error'>{errorMessage}</p>}
    </span>
  );
}
