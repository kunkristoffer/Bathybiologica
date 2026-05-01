import Image from 'next/image';
import { ComponentProps } from 'react';

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  description: string;
}

type TeamMemberCardProps = TeamMember & ComponentProps<'div'>;

export function AboutTeamMemberCard({ name, position, description, image = '' }: TeamMemberCardProps) {
  return (
    <div className='flex flex-col gap-4'>
      <span className='relative mx-auto w-full aspect-square max-h-48 max-w-48 rounded-full overflow-hidden'>
        <Image src={image} alt={`A profile picture of ${name}`} className='' fill />
      </span>
      <h3 className='text-center text-primary'>{name}</h3>
      <span>
        <p className='text-center'>{position}</p>
        <p className='text-center text-text-muted'>{description}</p>
      </span>
    </div>
  );
}
