import { ContentLayout } from "@/src/shared/ui/layout/content-layout";
import { LayoutProps } from "@/src/shared/types";
import { getCurrentUser } from "@/src/shared/lib/dal";
import { forbidden } from "next/navigation";
import { HeaderTitle } from "@/src/shared/ui/navigation/header-title";

export default async function Page({ children }: LayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    forbidden()
  }

  return (
    <ContentLayout className='px-4'>
      <div>
        <HeaderTitle className="text-2xl">Настройки</HeaderTitle>
        <p className="text-sm opacity-80">
          Безопасность, фильтры и многое другое!
        </p>
      </div>
      {children}
    </ContentLayout>
  )
}