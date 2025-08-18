interface FormInputTextProps {
  label: string;
  name: string;
  /** Default value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Is the field required? */
  required?: boolean;
  /** Error message for user */
  errorMessage?: string;
}

export function FormInputText({
  label,
  name,
  defaultValue,
  placeholder,
  required = false,
  errorMessage,
}: FormInputTextProps) {
  return (
    <label htmlFor='' className='flex-1 flex flex-col'>
      <p>{label}</p>
      <input
        type='text'
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className='w-full bg-input-field rounded-md p-2'
      />
      {errorMessage && <p className='text-error'>{errorMessage}</p>}
    </label>
  );
}
