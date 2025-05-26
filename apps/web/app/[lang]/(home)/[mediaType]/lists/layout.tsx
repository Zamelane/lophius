import { LayoutProps } from "@/src/shared/types";
import { ContentLayout } from "@/src/shared/ui/layout/content-layout";

export default function Layout({ children }: LayoutProps) {
  return (
    <ContentLayout className='px-4'>
      <div>
        <h1 className="text-2xl">Библиотека</h1>
        <p className="text-sm opacity-80">
          Твоё хранилище списков с любимыми тайтлами
        </p>
      </div>
      {children}
    </ContentLayout>
  )
}