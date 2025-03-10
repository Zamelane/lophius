import {LayoutProps} from "@/interfaces";
import {SWRProvider} from "@/components/helps/SWRProvider";
import AppLayout from "@/components/layouts/AppLayout";

export default function Layout({ children }: LayoutProps) {
	return (
		<SWRProvider>
			<AppLayout>
				{children}
			</AppLayout>
		</SWRProvider>
	)
}