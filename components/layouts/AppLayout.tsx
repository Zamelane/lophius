import {LayoutProps} from "@/interfaces";
import {SiteHeader} from "@/components/site-header";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export default function AppLayout({ children }: LayoutProps) {
	return (
		<div className="[--header-height:calc(theme(spacing.14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader/>
				<div className="flex flex-1">
					<AppSidebar/>
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