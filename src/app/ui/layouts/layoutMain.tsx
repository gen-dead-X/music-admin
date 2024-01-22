'use client';

import React, { ReactNode, Suspense, useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';

import Sidebar from '../global/sidebar/sidebar';
import Navbar from '../global/navbar/navbar';
import Footer from '../global/footer/footer';
import './_layoutMain.scoped.scss';
import MainSuspenseLoader from '../global/loaders/mainSuspenseLoader';

export default function LayoutMain({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-screen">
      <aside
        className={
          'sidebar-main fixed z-[99] h-full  w-full  p-4 transition-all duration-300  ease-in-out  lg:static lg:w-[20%] lg:p-8 ' +
          (showSidebar ? ' ' : ' translate-x-[-100%]')
        }
      >
        <Sidebar setShowSidebar={setShowSidebar} />
      </aside>

      <div className="flex w-full flex-col overflow-hidden lg:w-[80%] lg:flex-1">
        <header className="header-main flex gap-5 bg-gray-800 p-4 ">
          <button
            onClick={() => setShowSidebar(true)}
            className="transition-all duration-200 hover:opacity-75 lg:hidden"
          >
            <RiMenu2Fill className="text-3xl" />
          </button>

          <Navbar />
        </header>

        <main className="main-content overflow-y-auto p-4 md:flex-1">
          <div className="min-h-[100vh]">
            <Suspense fallback={<MainSuspenseLoader />}>{children}</Suspense>
          </div>
        </main>

        <footer className="footer-main p-4 ">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
