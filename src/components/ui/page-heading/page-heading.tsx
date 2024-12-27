import { ReactNode } from "react";

interface IPageHeadingProps {
  children: ReactNode;
}

export const PageHeading = ({ children }: IPageHeadingProps) => {
  return <h1 className="text-5xl mb-4">{children}</h1>;
};
