import React, { Dispatch, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CiMusicNote1 } from 'react-icons/ci';
import Link from 'next/link';
import { sidebarMenu } from './sidebarNavData';

import './_sidebar.scoped.scss';
import { usePathname } from 'next/navigation';

export default function Sidebar({
  setShowSidebar,
}: Readonly<{
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}>) {
  const route = usePathname();

  return (
    <div>
      <div className="CiMusicNote1 flex justify-between text-5xl">
        <Link
          href={'/dashboard'}
          className="logo-main colorful-gradient-v1 flex items-center gap-2"
        >
          <CiMusicNote1 className="stroke-[1px] text-green-500" />
          <span className="text-xl font-bold ">Dashboard</span>
        </Link>
        <button
          onClick={() => setShowSidebar(false)}
          className="float-end flex lg:hidden "
        >
          <IoMdClose className=" transition-transform duration-300 hover:rotate-90" />
        </button>
      </div>

      <ul className="my-5 flex flex-col text-slate-500">
        {sidebarMenu.map(data => {
          const Icon = data.icon;
          return (
            <li
              key={crypto.randomUUID()}
              className={
                'flex items-center gap-2 py-5 ' +
                (route.includes(data.link) && ' text-black dark:text-white')
              }
            >
              <Icon className="text-2xl" />
              <Link href={data.link} className="text-xl">
                {data.menu}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
