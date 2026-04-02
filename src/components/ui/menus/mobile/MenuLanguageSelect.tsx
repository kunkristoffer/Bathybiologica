import { changeLocale, Locales } from '@/actions/changeLocale';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';

export function MobileMenuLanguageSelect() {
  // Get the current locale for displaying correct active icon
  const current = useLocale();

  // Grouping the available languages in an option
  const options: Record<Locales, { label: string }> = {
    en: { label: 'English' },
    no: { label: 'Norsk' },
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='flex gap-2'>
        <Globe />
        <h2>Language</h2>
      </span>
      <select
        className='relative p-2 panel'
        defaultValue={current}
        onChange={(e) => {
          changeLocale(e.currentTarget.value as Locales);
        }}
      >
        {Object.keys(options).map((locale) => (
          <option key={locale} value={locale}>
            {options[locale as Locales].label}
          </option>
        ))}
      </select>
    </div>
  );
}
