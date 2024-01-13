"use client";

import React from "react";
import AnimatedInputLabel from "../global/Inputs/AnimatedInputLabel";
import SubmitButton from "../global/Buttons/SubmitButton";
import { signInValidationSchema } from "@/validators/user/auth";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiCall from "@/helpers/apiCall";
import { LogInType, LoginResponse } from "@/Types/User";
import Link from "next/link";

export default function SignInForm() {
  const form = useForm<LogInType>({
    resolver: yupResolver(signInValidationSchema),
  });

  const handleSignIn = async (formValue: LogInType) => {
    try {
      const response = await apiCall<LoginResponse, LogInType>(
        "/login",
        "POST",
        formValue
      );

      if (response.data) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.accessToken);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="w-full mx-5 lg:max-w-[60rem] xl:w-[50%] py-10 xl:py-16 h-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="h-full overflow-auto py-10 xl:py-20 xs:w-full justify-between flex w-[20rem] sm:w-[30rem] flex-col gap-10 rounded-xl px-5 dark:bg-[rgb(29,29,29)] lg:min-w-[50%] lg:px-20 sm:px-10 bg-white"
        >
          <div className="">
            <h1 className="bg-radial-red text-3xl font-semibold text-[#333] dark:text-gray-200">
              Sign in
            </h1>
            <p className="mt-5 text-[#666]">To access your account</p>
          </div>
          <div className="flex flex-col gap-8">
            <AnimatedInputLabel
              name="email"
              label="Email"
              className="w-full border-[2px] "
              type="text"
            />
            <AnimatedInputLabel
              name="password"
              label="Password"
              type="password"
              className="w-full border-[2px]"
            />
            <button type="submit">
              <SubmitButton className="relative rounded-full">
                Log In
              </SubmitButton>
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <span>Already Added? </span>
            <Link
              className="p-2 px-5 bg-black text-white dark:bg-gray-300 dark:text-black rounded-full hover:bg-gray-500 "
              href={""}
            >
              Sign up
            </Link>
          </div>
          <p>
            {`This page is protected by Google reCAPTCHA to ensure you're not a
              bot. `}{" "}
            <Link className="underline" href={""}>
              Learn more.
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
