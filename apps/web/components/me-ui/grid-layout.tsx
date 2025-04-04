import React from "react";

interface GridLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export const GridLayout = ({ children, className = '' }: GridLayoutProps) => (
  <div className="max-w-full mt-1">
    <div className={`grid flex-grow gap-[6px] grid-cols-[repeat(auto-fill,minmax(130px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] ${className}`}>
      {children}
    </div>
  </div>
);