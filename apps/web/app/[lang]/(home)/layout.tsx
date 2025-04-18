import * as React from "react";
import {LayoutProps} from "@/interfaces";
import AppLayout from "@/components/layouts/AppLayout";
import {SWRProvider} from "@/components/helps/SWRProvider";

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			{
				// Метрика
				process.env.METRICS !== undefined && process.env.METRICS.length > 0 &&
          <div dangerouslySetInnerHTML={{__html: process.env.METRICS}}/>
			}
			<SWRProvider>
				<AppLayout>
					{children}
				</AppLayout>
			</SWRProvider>
		</>
	)
}