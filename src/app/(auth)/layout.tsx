import {LayoutProps} from "@/interfaces";
import {AuthLayout} from "@/components/layouts/AuthLayout";

export default function Layout({ children } : LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthLayout>
          {children}
        </AuthLayout>
      </div>
    </div>
  )
}