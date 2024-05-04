'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

type AppContextProps = {
  children: React.ReactNode;
  session: Session | null;
};

const AppContext: React.FC<AppContextProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default AppContext;
