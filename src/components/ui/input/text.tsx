interface FormInputTextProps {
  label: string;
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** Is the field required? */
  required?: boolean;
}

export function FormInputText({ label, name, placeholder, required = false }: FormInputTextProps) {
  return (
    <label htmlFor='' className='flex-1 flex flex-col'>
      <p>{label}</p>
      <input
        type='text'
        name={name}
        placeholder={placeholder}
        required={required}
        className='bg-input-field rounded-md p-2'
      />
    </label>
  );
}
