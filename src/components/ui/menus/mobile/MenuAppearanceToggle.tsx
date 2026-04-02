import { type ReactElement } from 'react';
import { changeTheme, type ThemeOptions } from '@/actions/changeTheme';
import { MonitorCog, Moon, Sun, SunMoon } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/IconButton';

export function MobileMenuAppearanceToggle({ current }: { current: ThemeOptions }) {
  // Grouping the available themes in an option
  const options: Record<ThemeOptions, ReactElement> = {
    dark: <Moon />,
    light: <Sun />,
    system: <MonitorCog />,
  };

  // Helpers for calculating moving background
  const keys = Object.keys(options) as ThemeOptions[];
  const activeIndex = keys.indexOf(current);

  return (
    <div className='flex flex-col gap-2'>
      <span className='flex gap-2'>
        <SunMoon />
        <h2>Appearance</h2>
      </span>
      <span className='panel relative grid grid-cols-3 rounded-full p-1 overflow-hidden'>
        <span
          aria-hidden='true'
          className='absolute inset-y-1 left-1 rounded-full bg-primary transition-transform duration-300 ease-out'
          style={{
            width: 'calc((100% - 0.5rem) / 3)',
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {keys.map((theme) => (
          <IconButton
            key={theme}
            icon={options[theme]}
            label={theme}
            onClick={() => changeTheme(theme)}
            className={`
              relative z-10 w-full justify-center rounded-full bg-transparent py-1 px-4
              ${current === theme ? 'text-primary-foreground' : ''}
            `}
          />
        ))}
      </span>
    </div>
  );
}
