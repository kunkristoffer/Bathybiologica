interface FormInputTextAreaProps {
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
  /** Optional limit on lines displayed before scroll takes over */
  lines?: number;
}

export function FormInputTextArea({
  label,
  name,
  defaultValue,
  placeholder,
  required = false,
  errorMessage,
}: FormInputTextAreaProps) {
  return (
    <label htmlFor='' className='flex flex-col'>
      <p>{label}</p>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={`bg-input-field rounded-md p-2`}
      />
      {errorMessage && <p className='text-error'>{errorMessage}</p>}
    </label>
  );
}
