interface IErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: IErrorMessageProps) => {
  return <p className="text-tiny text-danger p-1 self-start">{children}</p>;
};
