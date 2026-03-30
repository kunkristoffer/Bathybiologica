'use client';

// Global
import { startTransition, useActionState, type ComponentPropsWithoutRef } from 'react';
import { type ContactActionState, submitContactForm } from '@/actions/submitContactForm';
import { useTranslations } from 'next-intl';

// Components
import { FormInputText } from '@/components/ui/input/text';
import { FormInputTextArea } from '@/components/ui/input/textArea';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';
import { useRecaptcha } from '@/providers/recaptcha/hook';

// Initial form state
const INITIAL: ContactActionState = { ok: false, values: {} };

export function ContactForm(props: ComponentPropsWithoutRef<'form'>) {
  const { className, ...rest } = props;

  const { ready, executeRecaptcha } = useRecaptcha();
  const [state, serverAction, pending] = useActionState(submitContactForm, INITIAL);

  const i18n = useTranslations('contactUsForm');

  async function formAction(formData: FormData) {
    const token = await executeRecaptcha('submit');
    formData.set('recaptchaToken', token);
    startTransition(() => {
      serverAction(formData);
    });
  }

  return (
    <form
      action={formAction}
      {...rest}
      className={`
        relative
        flex flex-col gap-4
        rounded-md panel
        ${className}
      `}
    >
      <span className='flex gap-4'>
        <FormInputText
          name='firstName'
          label={i18n('firstName')}
          defaultValue={state.values?.first_name}
          placeholder={i18n('firstNamePlaceholder')}
          errorMessage={state.fieldErrors?.first_name && state.fieldErrors?.first_name.at(0)}
          required
        />
        <FormInputText
          name='lastName'
          label={i18n('lastName')}
          defaultValue={state.values?.last_name}
          placeholder={i18n('lastNamePlaceholder')}
          errorMessage={state.fieldErrors?.last_name && state.fieldErrors?.last_name.at(0)}
          required
        />
      </span>
      <FormInputText
        name='email'
        label={i18n('email')}
        defaultValue={state.values?.email}
        placeholder={i18n('emailPlaceholder')}
        errorMessage={state.fieldErrors?.email && state.fieldErrors?.email.at(0)}
        required
      />
      <FormInputText
        name='subject'
        label={i18n('subject')}
        defaultValue={state.values?.subject}
        placeholder={i18n('subjectPlaceholder')}
        errorMessage={state.fieldErrors?.subject && state.fieldErrors?.subject.at(0)}
        required
      />
      <FormInputTextArea
        name='message'
        label={i18n('message')}
        defaultValue={state.values?.message}
        placeholder={i18n('messagePlaceholder')}
        errorMessage={state.fieldErrors?.message && state.fieldErrors?.message.at(0)}
        required
      />
      <input type='text' name='hp' tabIndex={-1} autoComplete='off' className='absolute -top-8 -z-1' />
      {state.message ? (
        <span role='status' className={`text-center py-4 ${state.ok ? 'text-success' : 'text-error'}`}>
          {state.message}
        </span>
      ) : (
        <ButtonAction type='submit' label={pending && ready ? i18n('pending') : i18n('submit')} variant='secondary' stretch />
      )}
      <p className='hidden text-center py-2 bg-error text-white rounded-md'>{i18n('status')}</p>
    </form>
  );
}
