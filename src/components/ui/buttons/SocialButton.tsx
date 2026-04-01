import Image from 'next/image';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

function getSocialVariant(url: string) {
  try {
    const hostname = new URL(url).hostname;

    switch (true) {
      case hostname.includes('discord.com'):
        return 'discord';
      case hostname.includes('github.com'):
        return 'github';
      case hostname.includes('instagram.com'):
        return 'instagram';
      case hostname.includes('linkedin.com'):
        return 'linkedin';
      case hostname.includes('telegram.org'):
        return 'telegram';
      case hostname.includes('tripadvisor.com'):
        return 'tripadvisor';
      case hostname.includes('whatsapp.com'):
        return 'whatsapp';
      case hostname.includes('youtube.com'):
        return 'youtube';
      default:
        return 'default';
    }
  } catch {
    return 'default';
  }
}

export function SocialButton({ href, className }: { href: string; className?: ComponentProps<'a'>['className'] }) {
  const variant = getSocialVariant(href);
  return (
    <a href={href} className={twMerge('relative size-12', className)}>
      <Image
        src={`/socials/${variant}.svg`}
        alt={`social icon for ${variant}`}
        fill
        className='transition-all drop-shadow-xl hover:drop-shadow-background'
      />
    </a>
  );
}
