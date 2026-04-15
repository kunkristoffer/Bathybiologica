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
import { FormInputConsentCheckBox } from '@/components/ui/input/consentCheckBox';

// Initial form state
const INITIAL: ContactActionState = { ok: false, values: {} };

export function ContactForm(props: ComponentPropsWithoutRef<'form'>) {
  const { className, ...rest } = props;

  const { ready, executeRecaptcha } = useRecaptcha();
  const [state, serverAction, pending] = useActionState(submitContactForm, INITIAL);

  const t = useTranslations('landing.contactUsForm');

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
          label={t('firstName')}
          defaultValue={state.values?.first_name}
          placeholder={t('firstNamePlaceholder')}
          errorMessage={state.fieldErrors?.first_name && state.fieldErrors?.first_name.at(0)}
          required
        />
        <FormInputText
          name='lastName'
          label={t('lastName')}
          defaultValue={state.values?.last_name}
          placeholder={t('lastNamePlaceholder')}
          errorMessage={state.fieldErrors?.last_name && state.fieldErrors?.last_name.at(0)}
          required
        />
      </span>
      <FormInputText
        name='email'
        label={t('email')}
        defaultValue={state.values?.email}
        placeholder={t('emailPlaceholder')}
        errorMessage={state.fieldErrors?.email && state.fieldErrors?.email.at(0)}
        required
      />
      <FormInputText
        name='subject'
        label={t('subject')}
        defaultValue={state.values?.subject}
        placeholder={t('subjectPlaceholder')}
        errorMessage={state.fieldErrors?.subject && state.fieldErrors?.subject.at(0)}
        required
      />
      <FormInputTextArea
        name='message'
        label={t('message')}
        defaultValue={state.values?.message}
        placeholder={t('messagePlaceholder')}
        errorMessage={state.fieldErrors?.message && state.fieldErrors?.message.at(0)}
        required
      />
      <FormInputConsentCheckBox
        name='consent'
        errorMessage={state.fieldErrors?.consent && state.fieldErrors?.consent.at(0)}
        defaultChecked={state.values?.consent}
      />
      <input type='text' name='hp' tabIndex={-1} autoComplete='off' className='absolute -top-8 -z-1' />
      {state.message ? (
        <span role='status' className={`text-center py-4 ${state.ok ? 'text-success' : 'text-error'}`}>
          {state.message}
        </span>
      ) : (
        <ButtonAction type='submit' label={pending && ready ? t('pending') : t('submit')} variant='secondary' stretch />
      )}
      <p className='hidden text-center py-2 bg-error text-white rounded-md'>{t('status')}</p>
      <p className='text-center text-xs/relaxed text-text-muted'>
        This form is protected by reCAPTCHA and the Google
        <a className='whitespace-nowrap text-primary hover:underline px-1' href='https://policies.google.com/privacy'>
          Privacy Policy
        </a>
        and
        <a className='whitespace-nowrap text-primary hover:underline px-1' href='https://policies.google.com/terms'>
          Terms of Service
        </a>
        apply.
      </p>
    </form>
  );
}
