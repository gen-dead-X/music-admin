'use client';

import React, { useContext } from 'react';
import AnimatedInputLabel from '../global/Inputs/AnimatedInputLabel';
import SubmitButton from '../global/buttons/SubmitButton';
import { signInValidationSchema } from '@/validators/user/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogInType, LoginResponse } from '@/Types/User';
import Link from 'next/link';
import { LocalStorageKeys } from '@/enums/globalEnum';
import { useMutation } from '@apollo/client';
import { SIGN_IN_USER_MUTATION } from '@/graphql/auth/auth.graphql';
import {
  errorMessageToast,
  successMessageToast,
} from '../global/toast/reactToastify';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/User/UserContext';

export default function SignInForm() {
  const { setProfile } = useContext(UserContext);
  const router = useRouter();
  const form = useForm<LogInType>({
    resolver: yupResolver(signInValidationSchema),
  });

  const [loginInput, { loading }] = useMutation(SIGN_IN_USER_MUTATION, {
    onCompleted: ({ login }: { login: LoginResponse }) => {
      if (login.success) {
        localStorage.setItem('accessToken', login.data.accessToken);
        localStorage.setItem('refreshToken', login.data.refreshToken);

        setProfile(login.data.userDetails);
        router.push('/dashboard');
        successMessageToast(login.message ?? 'Welcome Back!');
      } else {
        errorMessageToast(login?.message ?? '');
      }
    },
    onError(error) {
      errorMessageToast(error.message);
    },
  });

  const handleSignIn = (formValue: LogInType) => {
    loginInput({ variables: formValue });
  };

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center py-10 sm:w-[30rem] md:w-[40rem] lg:max-w-[60rem] xl:w-[40%] xl:py-16">
      <FormProvider {...form}>
        <form
          onSubmit={e => form.handleSubmit(handleSignIn)(e)}
          className="xs:w-full flex w-full flex-col justify-between gap-10 overflow-auto rounded-xl bg-white px-5 py-10 dark:bg-[rgb(29,29,29)] sm:px-10 xl:px-20 xl:py-20"
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
              <SubmitButton
                className={
                  'relative rounded-full ' + (loading && ' submit-animation ')
                }
              >
                Log In
              </SubmitButton>
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-full">
            <input
              type="checkbox"
              id="rememberMe"
              {...form.register(LocalStorageKeys.REMEMBER_ME)}
              className="h-5 w-5"
            />
            <label htmlFor="loginRememberMe">Remember me</label>
          </div>
          <div className="flex items-center gap-5">
            <span>Already Added? </span>
            <Link
              className="rounded-full bg-black p-2 px-5 text-white hover:bg-gray-500 dark:bg-gray-300 dark:text-black "
              href={'/sign-up'}
            >
              Sign up
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
