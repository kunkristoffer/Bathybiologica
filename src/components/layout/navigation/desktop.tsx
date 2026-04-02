import { ThemeOptions } from '@/actions/changeTheme';
import { HeaderMenuLocale } from '@/components/ui/menus/HeaderLocaleMenu';
import { HeaderMenuTheme } from '@/components/ui/menus/HeaderThemeMenu';
import menuLinks from '@/data/navigation/links.json';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function NavigationDesktop({ current }: { current: ThemeOptions }) {
  const locale = useLocale() as 'en' | 'no';
  return (
    <>
      <nav className='hidden sm:flex justify-around gap-4'>
        {menuLinks.map((item) => (
          <Link key={'navbar-desktop-' + item.label[locale]} href={item.href} scroll>
            {item.label[locale]}
          </Link>
        ))}
      </nav>
      <span className='hidden sm:flex flex-1 justify-end-safe items-center gap-6'>
        <HeaderMenuTheme current={current} />
        <HeaderMenuLocale />
      </span>
    </>
  );
}
