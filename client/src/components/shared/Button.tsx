import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: Readonly<React.ReactNode>;
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`p-2 bg-primary rounded-md text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
