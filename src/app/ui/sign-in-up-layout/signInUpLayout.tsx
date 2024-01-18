'use client';

import checkUserPreferredTheme from '@/helpers/themeHelpers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    console.log('unmounted');
    if (localStorage.getItem('accessToken')) {
      console.log('updating');
      router.push('/dashboard');
    }

    checkUserPreferredTheme();
  }, []);

  return (
    <main className="page-container-main flex h-screen w-screen flex-col items-center justify-center">
      <div className="h-full w-full px-10 backdrop-blur-sm md:px-0">
        {children}
      </div>
    </main>
  );
}
