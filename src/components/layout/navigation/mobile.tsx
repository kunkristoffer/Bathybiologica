'use client';

import menuLinks from '@/data/navigation/links.json';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { HamburgerIcon } from '@/components/ui/icons/Hamburger';
import { MobileMenuLanguageSelect } from '@/components/ui/menus/mobile/MenuLanguageSelect';
import { MobileMenuAppearanceToggle } from '@/components/ui/menus/mobile/MenuAppearanceToggle';
import { ThemeOptions } from '@/actions/changeTheme';
import { useLocale } from 'next-intl';

export function NavigationMobile({ current }: { current: ThemeOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const locale = useLocale() as 'en' | 'no';

  return (
    <div ref={containerRef} className={`sm:hidden ${isOpen ? 'stop-scroll' : ''}`}>
      <HamburgerIcon active={isOpen} onClick={() => setIsOpen(!isOpen)} className='size-8' />
      <div
        className={`
          fixed inset-0 top-20 flex flex-col
          ${isOpen ? '' : 'translate-x-full'}
          backdrop-blur-xl backdrop-brightness-40  transition-transform
          overflow-y-auto
        `}
      >
        <nav className='flex-1 flex flex-col items-center justify-center gap-4 p-4'>
          {menuLinks.map((item) => (
            <Link
              href={item.href}
              key={'navbar-desktop-' + item.label[locale]}
              className='uppercase text-2xl/loose text-white'
              onClick={() => setIsOpen(false)}
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>
        <div className='bg-background flex flex-col gap-8 p-8'>
          <MobileMenuLanguageSelect />
          <MobileMenuAppearanceToggle current={current} />
        </div>
      </div>
    </div>
  );
}
