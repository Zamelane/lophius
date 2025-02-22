import {LayoutProps} from "@/interfaces";
import {SiteHeader} from "@/components/shadcn/site-header";
import {AppSidebar} from "@/components/shadcn/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/shadcn/ui/sidebar";

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