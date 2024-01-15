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
      <div className="px-10 md:px-0 w-full h-full backdrop-blur-sm">
        {children}
      </div>
    </main>
  );
}
