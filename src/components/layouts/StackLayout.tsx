import {LayoutProps} from "@/interfaces";

export default function StackLayout({ children } : LayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}