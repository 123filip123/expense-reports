"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

interface IProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: IProvidersProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
