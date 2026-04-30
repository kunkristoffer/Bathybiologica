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
    <div className='panel flex flex-col gap-2'>
      <span className='relative mx-auto size-48 rounded-full overflow-hidden'>
        <Image src={image} alt={`A profile picture of ${name}`} className='' fill />
      </span>
      <h3 className='text-primary'>{name}</h3>
      <p>{position}</p>
      <p className='text-text-muted'>{description}</p>
    </div>
  );
}
