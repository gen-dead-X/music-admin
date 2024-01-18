'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

import { errorMessageToast } from '../toast/reactToastify';
import ThemeToggleButton from '../Buttons/ThemeToggleButton';
import Profile from '../../navbar/profile/profile';
import { ProfileResponse } from '@/Types/User';
import { USER_PROFILE_QUERY } from '@/graphql/auth/auth.graphql';
import { UserContext } from '@/context/User/UserContext';
import useTokenAuth from '@/hooks/useTokenAuth/useTokenAuth';

export default function Navbar() {
  const { setProfile, profile } = useContext(UserContext);
  const [showProfilePopUp, setShowProfilePopUp] = useState(false);
  const router = useRouter();
  const { redirectToLogin } = useTokenAuth();

  const { loading } = useQuery<{ getProfile: ProfileResponse }>(
    USER_PROFILE_QUERY,
    {
      onCompleted: ({ getProfile }) => {
        if (getProfile.success) {
          setProfile(getProfile.data);
        } else {
          localStorage.clear();
          router.push('/');
          errorMessageToast(getProfile.message ?? 'Error');
        }
      },

      onError: error => {
        errorMessageToast(error.message);
      },
    }
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      redirectToLogin();
    }
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="capitalize">
        <h2>{`${profile?.username ?? 'Artist'}' s Dashboard`}</h2>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <div className="relative">
          <button
            onClick={() => setShowProfilePopUp(!showProfilePopUp)}
            className="flex items-center"
          >
            <FaUserCircle className="block text-4xl" />
          </button>
          {showProfilePopUp && (
            <div className="absolute right-0 top-[3rem] min-w-max rounded-lg bg-slate-300 dark:bg-gray-700">
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
