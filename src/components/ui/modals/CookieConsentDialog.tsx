'use client';

import cookieData from '@/data/legal/cookieConsentOptions.json';
import Link from 'next/link';
import { ChangeEvent, useRef, useState } from 'react';
import { CookieConsentCategory } from '@/components/content/cookieConsent/CookieCategory';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';
import { SelectedCookies } from '@/types/legal/cookieConsent.types';

export function CookieConsentDialog() {
  // Form UI state
  const [isVisible, setIsVisible] = useState(true);
  const [isCustomizing, setIsCustomizing] = useState(true);
  const formEl = useRef<HTMLFormElement>(null);

  // Cookie data
  const [cookieForm, setCookieForm] = useState(cookieData);
  const [selectedCookies, setSelectedCookies] = useState(
    cookieData
      .flatMap((category) => category.options)
      .reduce((acc, val) => ({ ...acc, [val.name]: false }), {} as Record<string, boolean>)
  );
  const categories = cookieData.map((category) => category.name);

  function handleFormChange(e: ChangeEvent<HTMLFormElement>) {
    const name: string = e.target.name;
    const value: boolean = e.target.checked;

    if (categories.includes(name)) {
      // Target is category
      const category = cookieData.find((el) => el.name === name)?.options;
      const values = category?.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur.name === name ? value : cur.isEnabled }),
        {}
      );

      console.log(name, values);
    } else {
      // Target is a child

      setSelectedCookies((old) => ({ ...old, [name]: value }));
    }

    console.log(name, value);
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

  function saveCookies() {
    // Save the selected cookies and disable this form
    setIsVisible(false);
  }

  if (!isVisible) return null;
  return (
    <dialog
      aria-labelledby='cookie-consent-title'
      closedby='none'
      className='
        appearance-none z-50 fixed size-full flex justify-center items-end-safe
        bg-transparent backdrop-blur-xs backdrop-brightness-50
        stop-scroll
      '
      open
    >
      <form ref={formEl} method='dialog' className='w-full bg-background text-text' onChange={handleFormChange}>
        <div className='max-h-screen container mx-auto flex flex-col p-4 gap-4'>
          <h2 id='cookie-consent-title'>We value your privacy</h2>
          <small className=''>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By
            clicking "Accept All", you consent to our use of cookies. You can also choose to accept only necessary
            cookies or customize your preferences.
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
              {cookieForm.map((category, index) => (
                <CookieConsentCategory
                  key={category.name}
                  name={category.name}
                  label={category.label}
                  description={category.description}
                  tooltip={category.tooltip}
                  options={category.options}
                  defaultOpen={index === 0}
                  selectedCookies={selectedCookies}
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
    </dialog>
  );
}
