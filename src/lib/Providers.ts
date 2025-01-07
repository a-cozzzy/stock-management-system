"use client"
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return React.createElement(SessionProvider, null, children);
};

export default Providers;
