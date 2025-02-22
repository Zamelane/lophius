import {LayoutProps} from "@/interfaces";
import AppLayout from "@/components/layouts/AppLayout";

export default function Layout({ children }: LayoutProps) {
	return (
		<AppLayout>
			{children}
		</AppLayout>
	)
}