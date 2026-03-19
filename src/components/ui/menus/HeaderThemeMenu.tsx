'use client';

import { type ReactElement } from 'react';
import { type ThemeOptions, changeTheme } from '@/actions/changeTheme';
import { MonitorCog, Moon, Sun } from 'lucide-react';
import { IconButton } from '@/components/ui/buttons/IconButton';
import { HeaderMenu } from '@/components/ui/dropdowns/HeaderMenu';

export function HeaderMenuTheme({ current }: { current: ThemeOptions }) {
  // Grouping the available themes in an option
  const options: Record<ThemeOptions, ReactElement> = {
    dark: <Moon />,
    light: <Sun />,
    system: <MonitorCog />,
  };

  return (
    <HeaderMenu name='header-menu' active={options[current]} align='right'>
      {Object.keys(options).map((icon) => (
        <IconButton
          key={icon}
          icon={options[icon as ThemeOptions]}
          label={icon}
          onClick={() => {
            changeTheme(icon as ThemeOptions);
          }}
          className='hover:bg-primary/33 active:bg-primary/50 py-2 px-4'
        />
      ))}
    </HeaderMenu>
  );
}
