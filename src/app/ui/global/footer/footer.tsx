import Link from 'next/link';
import React from 'react';
import { CiMusicNote1 } from 'react-icons/ci';

export default function Footer() {
  return (
    <div>
      <Link href={'/dashboard'} className="flex items-center gap-2">
        <CiMusicNote1 className="text-3xl" />
        <span className="text-xs">Music</span>
      </Link>
    </div>
  );
}
