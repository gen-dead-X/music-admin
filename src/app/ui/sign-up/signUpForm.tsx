'use client';

import React from 'react';
import AnimatedInputLabel from '../global/Inputs/AnimatedInputLabel';
import SubmitButton from '../global/buttons/SubmitButton';
import { signUpValidationSchema } from '@/validators/user/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApiResponse, SignUpType } from '@/Types/User';
import Link from 'next/link';
import { REGISTER_USER_MUTATION } from '@/graphql/auth/auth.graphql';
import { ApolloError, useMutation } from '@apollo/client';
import {
  errorMessageToast,
  successMessageToast,
} from '../global/toast/reactToastify';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpType>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    onCompleted: ({ register }: { register: ApiResponse }) => {
      if (register.success) {
        successMessageToast(register.message);
        router.push('/');
      } else {
        errorMessageToast(register.message);
      }
    },
    onError: (error: ApolloError) => {
      errorMessageToast(error.message);
    },
  });

  const handleSignUp = (formValue: SignUpType) => {
    registerUser({ variables: formValue });
  };

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center py-10 sm:w-[30rem] md:w-[40rem] lg:max-w-[60rem] xl:w-[40%] xl:py-16">
      <FormProvider {...form}>
        <form
          onSubmit={e => form.handleSubmit(handleSignUp)(e)}
          className="xs:w-full flex w-full flex-col justify-between gap-10 overflow-auto rounded-xl bg-white px-5 py-10 dark:bg-[rgb(29,29,29)] sm:px-10 xl:px-20 xl:py-20"
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
              name="phoneNumber"
              label="Phone"
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
              <SubmitButton
                className={
                  'relative rounded-full ' + (loading && ' submit-animation')
                }
              >
                Sign Up
              </SubmitButton>
            </button>
          </div>
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center ">
            <span>Already a Registered Member? </span>
            <Link
              className="rounded-full bg-black p-2 px-5 text-white hover:bg-gray-500 dark:bg-gray-300 dark:text-black "
              href={'/'}
            >
              Sign In
            </Link>
          </div>
          <p>
            {`This page is protected by Google reCAPTCHA to ensure you're not a
              bot. `}{' '}
            <Link className="underline" href={''}>
              Learn more.
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
