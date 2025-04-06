import {LayoutProps} from "@/interfaces";

export function TagContainer({ children }: LayoutProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{children}
		</div>
	)
}