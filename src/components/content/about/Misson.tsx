import { CardData, IconTitleTextCard } from '@/components/ui/cards/IconTitleText';
import { Anchor, Book, Fish, PersonStanding } from 'lucide-react';

export async function AboutMission() {
  const cardData: CardData[] = [
    {
      id: 'biodiversity-awareness',
      title: 'Biodiversity Awareness',
      text: ['Spreading knowledge about the rich and diverse marine ecosystems found in Norwegian waters.'],
      icon: Fish,
    },
    {
      id: 'research-support',
      title: 'Research Support',
      text: [
        'Enabling marine biologists to conduct meaningful research using local resources and designated stations.',
      ],
      icon: Anchor,
    },
    {
      id: 'Citizen Science',
      title: 'Citizen Science',
      text: ['Engaging communities in scientific discovery and ocean conservation efforts.'],
      icon: PersonStanding,
    },
    {
      id: 'Education',
      title: 'Education',
      text: ['Building understanding and appreciation for our marine heritage through accessible programs.'],
      icon: Book,
    },
  ];

  return (
    <section className='container mx-auto'>
      <h2>Bridging Research and Community</h2>
      <p>
        Bathybiologica exists to democratize marine research in Norwegian waters, making it accessible to scientists and
        citizens alike while preserving the knowledge and passion that drives ocean exploration.
      </p>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {cardData.map((card) => (
          <IconTitleTextCard key={card.id} {...card} />
        ))}
      </div>
      <span className=''>
        <p className='italic text-center'>
          "The ocean is not just a resource to be studied, it is a world to be understood, respected, and shared with
          all who seek its wonders."
        </p>
        <p className='text-xs text-center'>The guiding philosophy of Bathybiologica</p>
      </span>
    </section>
  );
}
