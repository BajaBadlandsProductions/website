import Image from 'next/image';
import { TeamMember as TeamMemberType } from '@/types';

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="group">
      <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {member.name}
        </h3>
        <p className="text-accent-500 font-medium mb-4">
          {member.role}
        </p>
        {member.bio && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}