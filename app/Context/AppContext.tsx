'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

type AppContextProps = {
  children: React.ReactNode;
};

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
};

export default AppContext;
