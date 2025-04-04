import React from "react";

interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => (
  <div className={`flex flex-col py-4 gap-4 ${className}`}>
    {children}
  </div>
);