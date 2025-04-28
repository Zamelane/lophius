import { cn } from "@/lib/utils";
import { LayoutProps } from "@/interfaces";

type ClassNameType = {
  className?: string
}

export const Centrize = ({
  children,
  className
}: LayoutProps & ClassNameType) => {
  return (
    <div className="flex justify-center">
      <div className={cn("w-full px-4 max-w-screen-2xl", className)}>
        {children}
      </div>
    </div>
  )
}