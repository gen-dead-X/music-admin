"use client";

import React from "react";
import AnimatedInputLabel from "../global/Inputs/AnimatedInputLabel";
import SubmitButton from "../global/Buttons/SubmitButton";
import { signUpValidationSchema } from "@/validators/user/auth";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiCall from "@/helpers/apiCall";
import { LoginResponse, SignUpType } from "@/Types/User";
import Link from "next/link";

export default function SignUpForm() {
  const form = useForm<SignUpType>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const handleSignUp = async (formValue: SignUpType) => {
    try {
      const response = await apiCall<LoginResponse, SignUpType>(
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
    <div className="w-full sm:w-[30rem] md:w-[40rem] lg:max-w-[60rem] xl:w-[40%] py-10 xl:py-16 h-full m-auto flex flex-col items-center justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="overflow-auto py-10 xl:py-20 xs:w-full justify-between flex w-full flex-col gap-10 rounded-xl px-5 dark:bg-[rgb(29,29,29)] xl:px-20 sm:px-10 bg-white"
        >
          <div className="">
            <h1 className="bg-radial-red text-3xl font-semibold text-[#333] dark:text-gray-200">
              Sign Up
            </h1>
            <p className="mt-5 text-[#666]">
              And dive into the world of Artists
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <AnimatedInputLabel
              name="name"
              label="Name"
              className="w-full border-[2px] "
              type="text"
            />
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
              showPasswordButton
              className="w-full border-[2px]"
            />
            <AnimatedInputLabel
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              showPasswordButton
              className="w-full border-[2px]"
            />
            <button type="submit">
              <SubmitButton className="relative rounded-full">
                Sign Up
              </SubmitButton>
            </button>
          </div>
          <div className="flex gap-5 items-start md:items-center flex-col md:flex-row ">
            <span>Already a Registered Member? </span>
            <Link
              className="p-2 px-5 bg-black text-white dark:bg-gray-300 dark:text-black rounded-full hover:bg-gray-500 "
              href={"/"}
            >
              Sign In
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
