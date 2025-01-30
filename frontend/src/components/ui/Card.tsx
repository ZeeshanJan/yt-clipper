import React from "react";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
