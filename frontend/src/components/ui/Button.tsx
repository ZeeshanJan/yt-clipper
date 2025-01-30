import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => Promise<void>;
  className?: string;
}

export function Button({
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
