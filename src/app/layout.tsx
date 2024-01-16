import type { Metadata } from 'next';
import './globals.scss';
import ClientApp from './clientApp';

export const metadata: Metadata = {
  title: 'Music APP',
  description: 'Made With ❤️',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientApp>{children}</ClientApp>
    </html>
  );
}
