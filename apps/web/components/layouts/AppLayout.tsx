'use server'

import { Suspense } from "react";
import {cookies} from "next/headers";
import {LayoutProps} from "@/interfaces";

import { Footer } from "./Footer";
import { SiteHeader } from "../sidebar/site-header";
import { AppSidebar } from "../sidebar/app-sidebar";
import {SidebarInset, SidebarProvider} from "../ui/sidebar";

export default async function AppLayout({ children }: LayoutProps) {
	const state = cookies().then(r => {
		const loadedState = r.get("sidebar_state")
		return loadedState ? loadedState.value === "true" : false
	})

	return (
		<SidebarProvider defaultOpen={state}>
      <AppSidebar />
      <SidebarInset className="ml-[2px] overflow-hidden">
				<SiteHeader />
				<div className="flex flex-grow justify-center">
					<div className="w-full max-w-[1920px]">
						<Suspense fallback={<p>Загрузка ...</p>}>
							{children}
						</Suspense>
					</div>
				</div>
				<Footer/>
      </SidebarInset>
    </SidebarProvider>
	)
}