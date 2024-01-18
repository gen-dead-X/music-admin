import Link from 'next/link';
import React from 'react';

import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaIdCard } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const profileData = [
  { link: '/', icon: FaIdCard, menu: 'Profile' },
  { link: '/', icon: MdOutlineModeEditOutline, menu: 'Edit Details' },
];

export default function Profile() {
  const router = useRouter();

  const liStyles = `flex items-center gap-2 rounded-lg p-3 hover:backdrop-brightness-75
flex items-center gap-2 rounded-lg p-3 hover:backdrop-brightness-75`;

  return (
    <ul className="rounded-lg">
      {profileData.map(data => {
        const Icon = data.icon;

        return (
          <li key={crypto.randomUUID()} className={liStyles}>
            <Icon className="text-3xl" />
            <Link href={data.link}>{data.menu}</Link>
          </li>
        );
      })}

      <li className={liStyles}>
        <AiOutlineLogout className="text-3xl" />
        <button
          onClick={() => {
            localStorage.clear();
            router.push('/');
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
