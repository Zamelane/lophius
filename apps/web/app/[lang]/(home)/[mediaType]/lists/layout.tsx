import { LocaleLink } from "@/src/shared/hooks/locale-link";
import { LayoutProps } from "@/src/shared/types";
import { ContentLayout } from "@/src/shared/ui/layout/content-layout";
import { HeaderTitle } from "@/src/shared/ui/navigation/header-title";
import { Button } from "@/src/shared/ui/shadcn/button";
import { SettingsIcon } from "lucide-react";

export default function Layout({ children }: LayoutProps) {
  return (
    <ContentLayout className='px-4'>
      <div className="flex justify-between items-center gap-4">
        <div>
          <HeaderTitle className="text-2xl">Библиотека</HeaderTitle>
          {/* <h1 className="text-2xl">Библиотека</h1> */}
          <p className="text-sm opacity-80">
            Твоё хранилище списков с любимыми тайтлами
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LocaleLink href='/settings?tab=lists'>
            <Button size='icon' variant='ghost'>
              <SettingsIcon />
            </Button>
          </LocaleLink>
        </div>
      </div>
      {children}
    </ContentLayout>
  )
}