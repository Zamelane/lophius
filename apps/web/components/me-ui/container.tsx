import React from "react";
import {cn} from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const PageContainer = ({ children, className = '' }: ContainerProps) => (
  <div className={cn('w-full h-full max-w-[1920px] mx-auto box-border block px-[16px] md:px-[24px] bg-background', className)}>
    {children}
  </div>
);