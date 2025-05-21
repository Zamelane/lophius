import { ContentLayout } from "@/components/template-components/other/content-layout";
import { LayoutProps } from "@/interfaces";

export default function Page({ children }: LayoutProps) {
  return (
    <ContentLayout className='px-4'>
      <div>
        <h1 className="text-2xl">Общие настройки</h1>
        <p className="text-sm opacity-80">
          Конфигурация публичных параметров, общих списков, поведения фильтров и многое другое!
        </p>
      </div>
      {children}
    </ContentLayout>
  )
}