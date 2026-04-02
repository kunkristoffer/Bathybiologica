'use client';

import menuLinks from '@/data/navigation/links.json';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { HamburgerIcon } from '@/components/ui/icons/Hamburger';
import { Globe } from 'lucide-react';

export function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <nav ref={containerRef} className={`sm:hidden ${isOpen ? 'stop-scroll' : ''}`}>
      <HamburgerIcon active={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div
        className={`
          fixed inset-0 top-20 flex flex-col
          ${isOpen ? '' : 'translate-x-full'}
          backdrop-blur-md backdrop-brightness-50 transition-transform
        `}
      >
        <nav className='flex-1 flex flex-col items-center justify-center gap-4 p-4'>
          {menuLinks.map((item) => (
            <Link href={item.href} key={'navbar-desktop-' + item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className='bg-panel flex flex-col gap-4'>
          <div>
            <span className='flex gap-2'>
              <Globe />
              <h3>Language</h3>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
