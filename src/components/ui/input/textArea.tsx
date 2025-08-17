interface FormInputTextAreaProps {
  label: string;
  name: string;
  /** Optional limit on lines displayed before scroll takes over */
  lines?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Is the field required? */
  required?: boolean;
}

export function FormInputTextArea({ label, name, lines = 5, placeholder, required = false }: FormInputTextAreaProps) {
  return (
    <label htmlFor='' className='flex flex-col'>
      <p>{label}</p>
      <textarea name={name} placeholder={placeholder} required={required} className={`bg-input-field rounded-md p-2`} />
    </label>
  );
}
