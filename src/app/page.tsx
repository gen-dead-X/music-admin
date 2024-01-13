"use client";

import "./globals.scss";
import SignInUpLayout from "./ui/sign-in-up-layout/signInUpLayout";
import SignInForm from "./ui/sign-in/signInForm";

export default function Home() {
  return (
    <SignInUpLayout>
      <SignInForm />
    </SignInUpLayout>
  );
}
