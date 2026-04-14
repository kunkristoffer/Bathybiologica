'use client';

// Global
import type { ConsentFormOptions, ConsentMode, ConsentOptions } from '@/types/legal/consent.types';
import { type ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { setConsent } from '@/libs/legal/consent';

// Form binding data
import { consentFormData } from '@/data/legal/consent/formBinds';

// Components
import { CookieConsentCategory } from '@/components/content/cookieConsent/CookieCategory';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';

export function CookieConsentForm() {
  // Is user customizing consent, then show form
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Consent form bindings
  const [cookieForm, setCookieForm] = useState(
    consentFormData.reduce<Record<string, Record<string, boolean>>>((categories, category) => {
      categories[category.name] =
        category.options?.reduce<Record<string, boolean>>((options, option) => {
          options[option.name] = false;
          return options;
        }, {}) || {};
      return categories;
    }, {})
  );

  // Handles checkbox inputs
  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') {
      return;
    }

    const { name, checked, dataset } = target;
    const parentCategoryName = dataset.parentCategory;

    setCookieForm((old) => {
      if (!parentCategoryName) {
        // Target is category
        const children = { ...old[name] };
        for (const key in children) {
          children[key] = checked;
        }

        return { ...old, [name]: children };
      } else {
        // Target is an option
        const parent = { ...old[parentCategoryName] };
        parent[name] = checked;

        return { ...old, [parentCategoryName]: parent };
      }
    });
  }

  async function submit(mode: ConsentMode) {
    if (mode === 'custom') {
      const cookieFormFlattened = Object.fromEntries(
        Object.values(cookieForm).flatMap((test) => Object.entries(test))
      ) as ConsentOptions;
      await setConsent('custom', cookieFormFlattened);
    } else {
      await setConsent(mode);
    }
  }
  return (
    <form method='dialog' className='w-full bg-background text-text'>
      <div className='max-h-screen container mx-auto flex flex-col p-4 gap-8'>
        <h2 id='cookie-consent-title'>We value your privacy</h2>
        <small className=''>
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By
          clicking "Accept All", you consent to our use of cookies. You can also choose to accept only necessary cookies
          or customize your preferences.
        </small>
        <small className=''>
          By using this site, you agree to our{' '}
          <Link href={'privacyHref'} className='underline underline-offset-4 text-primary'>
            privacy policy
          </Link>{' '}
          and{' '}
          <Link href={'cookieHref'} className='underline underline-offset-4 text-primary'>
            cookie policy
          </Link>
        </small>
        {isCustomizing && (
          <div className='flex flex-col gap-4 overflow-auto'>
            {consentFormData.map((category, index) => (
              <CookieConsentCategory
                key={category.name}
                defaultOpen={index === 0}
                values={cookieForm[category.name]}
                onChange={handleFormChange}
                {...category}
              />
            ))}
          </div>
        )}
        <span className='grid grid-cols-4 gap-4'>
          {isCustomizing && (
            <ButtonAction
              label='Save preferences'
              variant='success'
              stretch
              className='col-span-4'
              onClick={() => submit('custom')}
            />
          )}
          <ButtonAction label='None' variant='error' stretch onClick={() => submit('none')} />
          <ButtonAction label='Essential only' variant='primary' stretch onClick={() => submit('essential')} />
          <ButtonAction label='All' variant='success' stretch onClick={() => submit('all')} />
          <ButtonAction
            label={isCustomizing ? 'Close menu' : 'Customize'}
            variant='warning'
            aria-expanded={isCustomizing}
            onClick={() => setIsCustomizing((value) => !value)}
            stretch
          />
        </span>
      </div>
    </form>
  );
}
