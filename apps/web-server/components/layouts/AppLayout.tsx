import {LayoutProps} from "@/interfaces";
import { SiteHeader } from "../helps/site-header";
import { AppSidebar } from "../sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default async function AppLayout({ children }: LayoutProps) {
	return (
		<SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[2px]">
				<SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
					{children}
				</div>
      </SidebarInset>
    </SidebarProvider>
	)
}