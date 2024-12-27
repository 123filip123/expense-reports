// components/PageWrapper.tsx
import React, { ReactNode } from "react";

interface IPageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  );
};
