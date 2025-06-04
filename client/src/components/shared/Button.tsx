import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: Readonly<React.ReactNode>;
  className?: string;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    outline: "bg-bg border border-border text-foreground hover:bg-bg-hover",
  }[variant];
  return (
    <button
      className={clsx(`p-2 rounded-md cursor-pointer`, variantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
