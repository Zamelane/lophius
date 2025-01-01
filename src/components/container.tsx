import {LayoutProps} from "@/interfaces";

export default function Container({ children } : LayoutProps) {
  return (
    <div className="p-6 md:p-8">
      {children}
    </div>
  )
}