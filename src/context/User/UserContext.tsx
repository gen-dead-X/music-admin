import { Profile } from '@/Types/User';
import React, { ReactNode, createContext, useMemo, useState } from 'react';

type UserContext = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const UserContext = createContext<UserContext>({
  profile: null,
  setProfile: () => {
    throw new Error('Function not implemented.');
  },
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const context: UserContext = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
