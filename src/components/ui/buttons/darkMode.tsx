'use client';

import { usePathname } from 'next/navigation';
import { changeTheme, Theme } from '@/actions/changeTheme';

export function DarkModeToggle({ current }: { current: Theme }) {
  const pathname = usePathname();

  return (
    <form action={changeTheme}>
      <input type='hidden' name='path' value={pathname} />
      <select
        id='theme-select'
        name='theme'
        defaultValue={current}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className='bg-background'
      >
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
        <option value='system'>System</option>
      </select>

      {/* No-JS fallback: users can still apply the choice */}
      <noscript>
        <button type='submit' className='ml-2 underline'>
          Apply
        </button>
      </noscript>
    </form>
  );
}
