import { LayoutProps } from "@/interfaces"

type Props = LayoutProps & {
  title: string
}

export const SimpleTitle = ({ children, title, ...props }: Props) => {
  return (
    <div className="flex flex-col flex-grow gap-3 max-w-full" {...props}>
      <h6 className="font-semibold text-lg">{title}</h6>
      <div className="text-sm font-semibold opacity-80">
        {children}
      </div>
    </div>
  )
}