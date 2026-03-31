interface FormCheckBoxProps {
  /** Name of the input for use in formData */
  name: string;
  /** Id of the input for use with css or js */
  id?: string;
  /** What is the default state */
  defaultChecked?: boolean;
}

export function FormCheckBox({ name, id, defaultChecked = false }: FormCheckBoxProps) {
  return (
    <label className='flex items-center cursor-pointer relative'>
      <input
        type='checkbox'
        name={name}
        defaultChecked={defaultChecked}
        id={id}
        className='peer h-5 w-5 cursor-pointer appearance-none rounded border border-secondary checked:bg-primary checked:border-primary'
      />
      <span className='absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3.5 w-3.5'
          viewBox='0 0 20 20'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='1'
        >
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          ></path>
        </svg>
      </span>
    </label>
  );
}
