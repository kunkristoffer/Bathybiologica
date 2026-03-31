'use client';

import { FormCheckBox } from '@/components/ui/input/checkBox';

interface FormInputCheckTextBoxProps {
  /** Name of the input for use in formData */
  name: string;
  /** Id of the input for use with css or js */
  id?: string;
  /** Text displayed */
  text: string;
  /** Is the field required? */
  required?: boolean;
  /** Error message for user */
  errorMessage?: string;
  /** What is the default state */
  defaultChecked?: boolean;
}

export function FormInputCheckTextBox({ name, id, text, defaultChecked, errorMessage }: FormInputCheckTextBoxProps) {
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
        <p className='w-fit select-none text-text-input text-xs/snug'>{text}</p>
      </label>
      {errorMessage && <p className='text-error'>{errorMessage}</p>}
    </span>
  );
}
