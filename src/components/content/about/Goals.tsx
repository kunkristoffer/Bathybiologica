import Image from 'next/image';
import manet from '@/assets/images/placeholder-manet.png';
import { IconTitleTextCard, type CardData } from '@/components/ui/cards/IconTitleText';
import { CircleDot, Globe, LibraryBig, Sun } from 'lucide-react';
import { Tagline } from '@/components/ui/tags/Tagline';

export function AboutGoals() {
  const cardData: CardData[] = [
    {
      id: 'lower-barriers-to-research',
      title: 'Lower Barriers to Research',
      text: [
        'We want to eliminate the costly and complex logistics that prevent marine biologists from conducting meaningful research. By providing equipped stations at strategic locations along the Norwegian coast, scientists can focus on what matters: their work.',
      ],
      icon: LibraryBig,
    },
    {
      id: 'document-norwegian-marine-life',
      title: 'Document Norwegian Marine Life',
      text: [
        'Norwegian waters host an incredible diversity of species, many still understudied. We aim to create comprehensive documentation of this biodiversity, building a living archive that will serve researchers and conservationists for generations.',
      ],
      icon: CircleDot,
    },
    {
      id: 'connect-science-and-society',
      title: 'Connect Science and Society',
      text: [
        'Scientific knowledge should not remain locked in academic journals. Through citizen science programs and public engagement, we want every Norwegian to feel connected to the marine ecosystems that surround them.',
      ],
      icon: Globe,
    },
  ];
  return (
    <section>
      <div className='grid gap-16 grid-cols-1 md:grid-cols-2'>
        <div className='relative'>
          <Image
            src={manet}
            alt='placeholder manet'
            placeholder='blur'
            fill
            className='object-cover aspect-square rounded-md shadow-panel'
          />
          <span className='absolute inset-2 top-auto text-text-muted italic text-center'>
            Cold water marine life thrive in the unique conditions of Norwegian fjords
          </span>
        </div>
        <div className='flex flex-col gap-4'>
          <Tagline text='What We Want to Achieve' icon={Sun} />
          <h2>Our Vision for Norwegian Waters</h2>
          <p>
            Every goal we set is designed to bring us closer to a future where marine research is accessible, knowledge
            is shared, and our oceans are understood and protected.
          </p>
          <div className='flex flex-col gap-4'>
            {cardData.map((card) => (
              <IconTitleTextCard key={card.id} iconPos='left' {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
