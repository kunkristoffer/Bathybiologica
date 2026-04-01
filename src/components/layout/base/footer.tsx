import { IconLink } from '@/components/ui/buttons/iconLink';
import { SocialButton } from '@/components/ui/buttons/SocialButton';
import { Mail, ScrollText } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-black/50'>
      <div className='container mx-auto px-4 py-8 lg:py-16 grid gap-16 grid-cols-1 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <h2>Follow us on</h2>
          <div className='flex gap-4'>
            <SocialButton href='https://github.com/kunkristoffer/Bathybiologica' />
            <SocialButton href='https://www.bathybiologica.com/' />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>Newsletter</h2>
          <span className='flex items-center border border-input focus-within:border-primary'>
            <input
              type='email'
              className='flex-1 p-2 appearance-none'
              placeholder='Sign up for our newsletter'
              disabled
            />
            <ScrollText className='m-2' />
          </span>
          <p className='italic text-text-muted'>Newsletter signup coming soon</p>
        </div>
      </div>
      <div className='container mx-auto px-4 py-8 lg:py-16 grid gap-16 grid-cols-2 lg:grid-cols-4'>
        <div className='flex flex-col gap-4'>
          <h2>Our mission</h2>
          <small>
            Bathybiologica is a foundation dedicated to sharing knowledge, creating awareness, and supporting meaningful
            work connected to marine life and conservation.
          </small>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>Sitemap</h2>
          <nav className='flex flex-col'>
            <Link href='/'>Landing</Link>
            <Link href='/about'>About</Link>
            <Link href='/history'>History</Link>
            <Link href='/' className='hidden'>
              FAQ
            </Link>
            <Link href='/' className='hidden'>
              Gallery
            </Link>
          </nav>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>Quick links</h2>
          <nav className='flex flex-col'>
            <p>Login</p>
            <p>Dashboard</p>
            <p>Inbox</p>
            <p>Events</p>
          </nav>
          <p className='italic text-text-muted'>Features coming soon</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h2>Contact</h2>
          <IconLink
            href='mailto:contact@bathybiologica.com'
            label='contact@bathybiologica.com'
            icon={<Mail />}
            className='hidden'
          />
          <p className='text-sm/normal'>
            Please use the
            <Link href='/#contact' className='px-1'>
              contact form
            </Link>
            it you want to contact us. We are currently working on sitting up different communication channels.
          </p>
        </div>
      </div>
      <div className='bg-black/40'>
        <div className='container mx-auto flex justify-between items-center p-4'>
          <p className='text-sm/tight'>Copyright 2026 @ Bathybiologica</p>
          <Link href='/privacy' className='text-sm/tight'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
