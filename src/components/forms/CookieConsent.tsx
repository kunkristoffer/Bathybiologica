'use client';

// Global
import { type ConsentMode, type ConsentOptions } from '@/types/legal/consent.types';
import { type ChangeEvent, useState } from 'react';
import { setConsent } from '@/libs/legal/consent';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Form binding data
import { consentFormData } from '@/data/legal/consent/formBinds';

// Components
import { CookieConsentCategory } from '@/components/content/cookieConsent/CookieCategory';
import { ButtonAction } from '@/components/ui/buttons/buttonAction';

export function CookieConsentForm() {
  // Get translations
  const t = useTranslations('consent');

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
        <h2 id='cookie-consent-title'>{t('title')}</h2>
        <small className=''>{t('description.p1')}</small>
        <small className=''>
          {t.rich('description.p2', {
            privacyLink: (chunks) => (
              <Link href={'/privacy'} className='underline underline-offset-4 text-primary'>
                {chunks}
              </Link>
            ),
            cookieLink: (chunks) => (
              <Link href={'/privacy#cookie'} className='underline underline-offset-4 text-primary'>
                {chunks}
              </Link>
            ),
          })}
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
              label={t('actions.saveCustom')}
              variant='success'
              stretch
              className='col-span-4'
              onClick={() => submit('custom')}
            />
          )}
          <ButtonAction label={t('actions.decline')} variant='error' stretch onClick={() => submit('none')} />
          <ButtonAction
            label={t('actions.acceptEssential')}
            variant='primary'
            stretch
            onClick={() => submit('essential')}
          />
          <ButtonAction label={t('actions.acceptAll')} variant='success' stretch onClick={() => submit('all')} />
          <ButtonAction
            label={isCustomizing ? t('actions.minimize') : t('actions.customize')}
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
