"use client";

import React from "react";
import AnimatedInputLabel from "../global/Inputs/AnimatedInputLabel";
import SubmitButton from "../global/Buttons/SubmitButton";
import { signInValidationSchema } from "@/validators/user/auth";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiCall from "@/helpers/apiCall";
import { LogInType, LoginResponse } from "@/Types/User";

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
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="xs:max-w-[30rem] my-10 flex w-full flex-col gap-10 rounded-xl p-5 dark:bg-[rgb(29,29,29)] sm:px-20 md:px-44 lg:px-5 xl:px-20 2xl:px-32"
        >
          <div className="p-5 text-center">
            <h1 className="bg-radial-red text-5xl text-[#333] dark:text-gray-200">
              Log in
            </h1>
            <p className="mt-5 text-[#666]">To access your account</p>
          </div>
          <AnimatedInputLabel
            name="email"
            label="Email"
            className="w-full border-[2px]"
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
        </form>
      </FormProvider>
    </div>
  );
}
