import React from "react";

export default function TabButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <button
      className={`flex-1 px-4 py-2 cursor-pointer 
        hover:bg-gray-50 dark:hover:bg-gray-800 
        border-b 
        ${
          isActive
            ? "border-gray-700 dark:border-gray-200"
            : "border-gray-300 dark:border-gray-600"
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
