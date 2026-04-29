import { Section } from '@/components/layout/base/section';
import { Tagline } from '@/components/ui/tags/Tagline';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import per from '@/assets/images/per-profile.jpg';

export function AboutMemory() {
  return (
    <Section className='flex flex-col gap-16'>
      <Tagline text='In Loving Memory' icon={Heart} />
      <div className='grid gap-16 grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <h2>Why We Carry the Name Bathybiologica</h2>
          <p>
            This foundation bears the name of Per's original company, a name chosen deliberately and with profound
            purpose. When we set out to create an organization that would support marine research in Norwegian waters,
            we knew it had to honor the person whose passion and dedication inspired us all.
          </p>
          <p>
            Per dedicated their life to understanding the hidden depths of our oceans. Through years of meticulous
            research, countless expeditions, and an unwavering commitment to sharing knowledge, they showed us that
            marine biology is not just a science, it was a calling.
          </p>
          <p>
            By preserving the Bathybiologica name, we ensure that every research station we establish, every scientist
            we support, and every citizen we inspire carries forward a legacy of curiosity, rigor, and love for the sea.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 panel'>
          <Image
            src={per}
            className='bg-primary rounded-full border-2 drop-shadow-2xl'
            alt='A picture of Per R. Flood in a suit smiling'
            height={200}
            width={200}
          />
          <span>Dr. Per Robert Flood</span>
          <span className='text-xs'>Marine biologist, doctor in medicine and a loving father</span>
          <span className='italic text-center'>
            "Every dive reveals something new. Every sample tells a story. Our job is to listen."
          </span>
          <span className='text-xs'>
            Founder of the original Bathybiologica company, whose work laid the foundation for everything we do today.
          </span>
        </div>
      </div>
      <Link href='/history' className='block container mx-auto text-center text-primary hover:underline'>
        Read the complete story of Dr. Per R. Flood and our foundation
      </Link>
    </Section>
  );
}
