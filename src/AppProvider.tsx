'use client';
import { useState } from 'react';
import { clientSessionToken } from '@/lib/http';

export default function AppProvider({
  initialSessionToken = '',
  children,
}: {
  initialSessionToken?: string;
  children: React.ReactNode;
}) {
  useState(() => {
    if (typeof window !== 'undefined')
      clientSessionToken.value = initialSessionToken;
  });

  return <>{children}</>;
}

// const AppContext = createContext({
//   sessionToken: '',
//   setSessionToken: (sessionToken: string) => {},
// });

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider.');
//   }
//   return context;
// };
