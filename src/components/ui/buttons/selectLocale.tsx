'use client';
import { usePathname } from 'next/navigation';
import { changeLocale } from '@/actions/changelocale';
import { useLocale } from 'next-intl';

export function SelectLocaleButton() {
  const pathname = usePathname();
  const current = useLocale();

  return (
    <form action={changeLocale}>
      <input type='hidden' name='path' value={pathname} />
      <select
        name='locale'
        defaultValue={current}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className='bg-background'
      >
        <option value='en'>En</option>
        <option value='no'>No</option>
      </select>
    </form>
  );
}
