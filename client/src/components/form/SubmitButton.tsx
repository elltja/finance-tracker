import React from "react";

interface SubmitButtonProps {
  children: Readonly<React.ReactNode>;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <button className="p-2 bg-primary rounded-md text-white cursor-pointer">
      {children}
    </button>
  );
}
