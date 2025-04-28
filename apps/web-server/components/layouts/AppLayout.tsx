'use client'

import {LayoutProps} from "@/interfaces";

import { Footer } from "./Footer";
import { SiteHeader } from "../sidebar/site-header";
import { AppSidebar } from "../sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function AppLayout({ children }: LayoutProps) {
	return (
		<SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[2px] overflow-hidden">
				<SiteHeader />
				{children}
				<Footer/>
      </SidebarInset>
    </SidebarProvider>
	)
}