import { type ComponentPropsWithoutRef } from 'react';
import { contactFormSubmit } from '@/actions/contactForm';
import { FormInputText } from '@/components/ui/input/text';
import { FormInputTextArea } from '@/components/ui/input/textArea';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';

type ContactUsFormProps = ComponentPropsWithoutRef<'form'>;

export function ContactUsForm(props: ContactUsFormProps) {
  const { className, ...rest } = props;
  return (
    <form
      action={contactFormSubmit}
      {...rest}
      className={`
        flex flex-col p-4 gap-4
        rounded-md border border-border bg-panel
        ${className}
      `}
    >
      <span className='flex gap-4'>
        <FormInputText label='First name' name='firstName' placeholder='Ole' required />
        <FormInputText label='Last name' name='lastName' placeholder='Gunnar' required />
      </span>
      <FormInputText label='Subject' name='subject' placeholder='What are you wondering about?' required />
      <FormInputTextArea label='Message' name='message' placeholder='Message...' required />
      <ButtonAction type='submit' label='submit' variant='secondary' stretch />
    </form>
  );
}
