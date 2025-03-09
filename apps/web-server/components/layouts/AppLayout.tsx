import {LayoutProps} from "@/interfaces";
import {SiteHeader} from "@/components/shadcn/site-header";
import {DefaultAppSidebar} from "@/components/sidebar/default-app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/shadcn/ui/sidebar";
import { UniqueAppSidebar } from "../sidebar/unique-app-sidebar";

export default async function AppLayout({ children }: LayoutProps) {
	return (
		<div className="[--header-height:calc(theme(spacing.14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader/>
				<div className="flex flex-1">
					{/* <DefaultAppSidebar/> */}
					<UniqueAppSidebar/>
					<SidebarInset>
						<div className="flex flex-1 flex-col gap-4 p-4">
							{children}
						</div>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}