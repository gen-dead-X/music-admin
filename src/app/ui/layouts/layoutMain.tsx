import React, { ReactNode } from 'react';
import Sidebar from '../global/sidebar/sidebar';
import Navbar from '../global/navbar/navbar';
import Footer from '../global/footer/footer';

export default function LayoutMain({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen">
      <aside className="h-full w-[20%] bg-teal-600 p-4 text-white">
        <Sidebar />
      </aside>

      <div className="flex w-[80%] flex-1 flex-col overflow-hidden">
        <header className="bg-gray-800 p-4 text-white">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto bg-cyan-700 p-4">
          <div className="h-[200vh]">{children}</div>
        </main>

        <footer className="bg-gray-800 p-4 text-white">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
