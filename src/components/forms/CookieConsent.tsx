'use client';

// Form binding data
import { CONSENT_FORM_SCHEMA } from '@/data/legal/cookieConsentOptions';

// Global
import Link from 'next/link';
import { type ChangeEvent, useRef, useState } from 'react';
import { setCookieConsent } from '@/actions/legal/cookieConsent';

// Components
import { CookieConsentCategory } from '@/components/content/cookieConsent/CookieCategory';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';
import { ConsentFormSchemaBindings } from '@/types/legal/consent.types';

export function CookieConsentForm() {
  // Is user customizing consent, then show form
  const [isCustomizing, setIsCustomizing] = useState(true);

  // Cookie data
  const [consentForm, setConsentForm] = useState<ConsentFormSchemaBindings[]>(CONSENT_FORM_SCHEMA);
  const categoryNames = consentForm.map((category) => category.name);

  // Consent form bindings
  const consentFormBindings = CONSENT_FORM_SCHEMA as ConsentFormSchemaBindings[];
  const [cookieForm, setCookieForm] = useState(
    consentFormBindings.reduce<Record<string, Record<string, boolean>>>((categories, category) => {
      categories[category.name] =
        category.options?.reduce<Record<string, boolean>>((options, option) => {
          options[option.name] = false;
          return options;
        }, {}) || {};
      return categories;
    }, {})
  );

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    // The input element being changed
    const target = e.target;

    // Sanitize input
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

  // Use nested object to render form
  // use flatMap version to store values
  // Let rendered elemets use flatMap[name] as value

  function toggleCookie() {
    // Find a specific cookie and enable
  }
  function toggleCategory() {
    // Find and toggle all cookies in a category
  }
  function toggleAll() {
    // Toggle status of all cookies
  }
  function toggleEssential() {
    // find cookies with required tooltip and toggle cookies
  }

  function loadCookies() {
    // Load the existing cookie consent if it exists
  }

  async function saveCookies() {
    // Save the selected cookies and disable this form
    //setIsVisible(false);

    await setCookieConsent();
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
            {consentFormBindings.map((category, index) => (
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
              onClick={saveCookies}
            />
          )}
          <ButtonAction label='None' variant='error' stretch />
          <ButtonAction label='Essential only' variant='primary' stretch />
          <ButtonAction label='All' variant='success' stretch />
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
