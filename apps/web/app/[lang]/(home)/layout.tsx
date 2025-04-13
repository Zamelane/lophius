import {LayoutProps} from "@/interfaces";
import AppLayout from "@/components/layouts/AppLayout";
import {SWRProvider} from "@/components/helps/SWRProvider";

export default function Layout({ children }: LayoutProps) {
	return (
		<SWRProvider>
			<AppLayout>
				{children}
			</AppLayout>
		</SWRProvider>
	)
}