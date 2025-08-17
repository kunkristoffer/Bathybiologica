import { type ComponentPropsWithoutRef } from 'react';
import { contactFormSubmit } from '@/actions/contactForm';
import { FormInputText } from '@/components/ui/input/text';
import { FormInputTextArea } from '@/components/ui/input/textArea';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';
import { useTranslations } from 'next-intl';

type ContactUsFormProps = ComponentPropsWithoutRef<'form'>;

export function ContactUsForm(props: ContactUsFormProps) {
  const { className, ...rest } = props;
  const i18n = useTranslations('contactUsForm');
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
        <FormInputText name='firstName' label={i18n('firstName')} placeholder={i18n('firstNamePlaceholder')} required />
        <FormInputText name='lastName' label={i18n('lastName')} placeholder={i18n('lastNamePlaceholder')} required />
      </span>
      <FormInputText name='subject' label={i18n('subject')} placeholder={i18n('subjectPlaceholder')} required />
      <FormInputTextArea name='message' label={i18n('message')} placeholder={i18n('messagePlaceholder')} required />
      <ButtonAction type='submit' label={i18n('submit')} variant='secondary' stretch />
    </form>
  );
}
