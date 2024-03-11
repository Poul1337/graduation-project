"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";

type AppContextProps = {
  children: React.ReactNode;
};

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default AppContext;
