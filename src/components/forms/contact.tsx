'use client';

// Global
import { useActionState, useRef, type ComponentPropsWithoutRef } from 'react';
import { type ContactActionState, submitContactForm } from '@/actions/submitContactForm';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';

// Components
import { FormInputText } from '@/components/ui/input/text';
import { FormInputTextArea } from '@/components/ui/input/textArea';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';

const INITIAL: ContactActionState = { ok: false, values: {} };

type ContactUsFormProps = ComponentPropsWithoutRef<'form'>;

export function ContactForm(props: ContactUsFormProps) {
  const [state, formAction] = useActionState(submitContactForm, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  const { className, ...rest } = props;
  const { pending } = useFormStatus();

  const i18n = useTranslations('contactUsForm');
  return (
    <form
      ref={formRef}
      action={formAction}
      {...rest}
      className={`
        flex flex-col p-4 gap-4
        rounded-md border border-border bg-panel
        ${className}
      `}
    >
      <span className='flex gap-4'>
        <FormInputText
          name='firstName'
          label={i18n('firstName')}
          defaultValue={state.values?.firstName}
          placeholder={i18n('firstNamePlaceholder')}
          errorMessage={state.fieldErrors?.firstName && state.fieldErrors?.firstName.at(0)}
          required
        />
        <FormInputText
          name='lastName'
          label={i18n('lastName')}
          defaultValue={state.values?.lastName}
          placeholder={i18n('lastNamePlaceholder')}
          errorMessage={state.fieldErrors?.lastName && state.fieldErrors?.lastName.at(0)}
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
      <input type='text' name='hp' tabIndex={-1} autoComplete='off' className='hidden' />
      {state.message ? (
        <span role='status' className={`text-center py-4 ${state.ok ? 'text-success' : 'text-error'}`}>
          {state.message}
        </span>
      ) : (
        <ButtonAction
          type='submit'
          label={pending ? i18n('pending') : i18n('submit')}
          disabled={true}
          variant='secondary'
          stretch
        />
      )}
      <p className='text-center py-2 bg-error text-white rounded-md'>{i18n('status')}</p>
    </form>
  );
}
