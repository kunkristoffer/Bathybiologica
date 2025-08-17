import menuLinks from '@/data/navigation/links.json';
import Link from 'next/link';

export function NavigationDesktop() {
  return (
    <nav className='hidden sm:block'>
      <ul className='flex justify-around gap-4'>
        {menuLinks.map((item) => (
          <Link key={'navbar-desktop-' + item.label} href={item.href} scroll>
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
