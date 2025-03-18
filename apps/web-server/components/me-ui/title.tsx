import { cn } from "@/lib/utils";
import { LayoutProps } from "@/interfaces";

type Props = LayoutProps & {
  className?: string
}

export function Title({ children, className }: Props) {
  return (
    <h1 className={cn("text-2xl font-semibold", className)}>
            {children}
    </h1>
  )
}