import { cn } from "@/lib/utils";
import { LayoutProps } from "@/interfaces";

type Props = LayoutProps & {
  className?: string
}

export function ContentLayout({ children, className }: Props) {
  return (
    <div className={cn("flex flex-grow flex-col max-w-full gap-4 px-4 md:px-4", className)}>
      {children}
    </div>
  )
}