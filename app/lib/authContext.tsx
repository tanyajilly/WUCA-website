'use client';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { getUserFromLocalCookie } from '../lib/auth';

type UserDataType = {
  user: string | null,
  loading: boolean
}

interface ContextProps {
  userData: UserDataType,
  setUser: Dispatch<SetStateAction<UserDataType>>
}

const User = createContext<ContextProps>({
  userData: {
    user: null,
    loading: false,
  },
  setUser: () => {}
})

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
  const [userData, setUser] = useState<UserDataType>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    if (userData.user !== null) {
      return;
    }
    let isMounted = true;
    const resolveUser = async () => {
      const user = await getUserFromLocalCookie();
      if (isMounted) {
        setUser({ user, loading: false });
      }
    };
    resolveUser();

    return () => {
      isMounted = false;
    };
  });

  return <User.Provider value={{userData, setUser}}>{children}</User.Provider>;
};

export const useUser = () => useContext(User);
