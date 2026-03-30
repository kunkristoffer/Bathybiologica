'use client';

import { type ReactElement } from 'react';
import { changeLocale, type Locales } from '@/actions/changeLocale';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import svgGB from '@/assets/icons/gb.svg';
import svgNO from '@/assets/icons/no.svg';
import { HeaderMenu } from '@/components/ui/dropdowns/HeaderMenu';
import { IconButton } from '@/components/ui/buttons/IconButton';

export function HeaderMenuLocale() {
  // Get the current locale for displaying correct active icon
  const current = useLocale();

  // Grouping the available languages in an option
  const options: Record<Locales, { label: string; flag: ReactElement }> = {
    en: { label: 'English', flag: <Image src={svgGB} alt='England' className='size-6' /> },
    no: { label: 'Norsk', flag: <Image src={svgNO} alt='Norge' className='size-6' /> },
  };

  return (
    <HeaderMenu name='header-menu' active={options[current as Locales].flag} align='right'>
      {Object.keys(options).map((locale) => (
        <IconButton
          key={locale}
          icon={options[locale as Locales].flag}
          label={options[locale as Locales].label}
          onClick={() => {
            changeLocale(locale as Locales);
          }}
          className='hover:bg-primary/33 active:bg-primary/50 py-2 px-4'
        />
      ))}
    </HeaderMenu>
  );
}
