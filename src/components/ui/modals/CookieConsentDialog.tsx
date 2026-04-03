'use client';

import cookieData from '@/data/legal/cookieConsentOptions.json';
import Link from 'next/link';
import { useState } from 'react';
import { CookieConsentCategory } from '@/components/content/cookieConsent/CookieCategory';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';

export function CookieConsentDialog() {
  const [isCustomizing, setIsCustomizing] = useState(true);
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
      <form method='dialog' className='w-full bg-background text-text'>
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
              Cookie Policy
            </Link>
            .
          </small>
          {isCustomizing && (
            <div className='flex flex-col gap-4 overflow-auto'>
              {cookieData.map((category, index) => (
                <CookieConsentCategory
                  name={category.name}
                  label={category.label}
                  description={category.description}
                  tooltip={category.tooltip}
                  defaultOpen={index === 0}
                  options={category.options}
                />
              ))}
            </div>
          )}
          <span className='grid grid-cols-4 gap-4'>
            {isCustomizing && (
              <ButtonAction label='Save preferences' variant='success' stretch className='col-span-4' />
            )}
            <ButtonAction label='None' variant='error' disabled={isCustomizing} stretch />
            <ButtonAction label='Essential only' variant='primary' disabled={isCustomizing} stretch />
            <ButtonAction
              label={isCustomizing ? 'Close menu' : 'Customize'}
              variant='warning'
              aria-expanded={isCustomizing}
              onClick={() => setIsCustomizing((value) => !value)}
              stretch
            />
            <ButtonAction label='All' variant='success' disabled={isCustomizing} stretch />
          </span>
        </div>
      </form>
    </dialog>
  );
}
