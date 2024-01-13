"use client";

import checkUserPreferredTheme from "@/helpers/themeHelpers";
import { useEffect } from "react";

export default function SignInUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    checkUserPreferredTheme();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen page-container-main">
      <div className="h-full">{children}</div>
    </main>
  );
}
