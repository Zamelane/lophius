import { LayoutProps } from "@/interfaces";

type Props = LayoutProps & {
  className?: string
}

export function ContentLayout({ children, ...props }: Props) {
  return (
    <div className="flex flex-grow flex-col max-w-full" {...props}>
      {children}
    </div>
  )
}