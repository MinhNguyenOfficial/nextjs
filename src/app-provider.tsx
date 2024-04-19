'use client';
import { createContext, useContext, useState } from 'react';
import { clientSessionToken } from '@/lib/http';
import { AccountResType } from '@/schemaValidations/account.schema';

type User = AccountResType['data'];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  initialSessionToken = '',
  user: userProp,
  children,
}: {
  initialSessionToken?: string;
  user: User | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(userProp);
  useState(() => {
    if (typeof window !== 'undefined')
      clientSessionToken.value = initialSessionToken;
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
