import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const PageContainer = ({ children, className = '' }: ContainerProps) => (
  <div className={`w-full max-w-[1920px] mx-auto box-border block px-[16px] md:px-[24px] bg-background ${className}`}>
    {children}
  </div>
);