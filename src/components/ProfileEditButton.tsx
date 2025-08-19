'use client';

import { useState } from 'react';
import { User } from '@prisma/client';
import { Pencil } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';

interface ProfileEditButtonProps {
    user: User;
}

export default function ProfileEditButton({ user }: ProfileEditButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/30"
      >
        <Pencil size={16} />
        <span>Edit Profil</span>
      </button>
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
}