import {MouseEventHandler} from "react";
import {LoaderCircle} from "lucide-react";
import CustomButton from "@/components/shadcn/ui/custom-button";

export default function LoadingButton({
	isDisabled,
	isLoading,
	onClick,
	text,
	type
}: {
	isLoading?: boolean,
	isDisabled?: boolean,
	onClick?:  MouseEventHandler<HTMLButtonElement>,
	text: string,
	type?: "button" | "reset" | "submit" | undefined
}) {

	return (
		<CustomButton
			type={type}
			onClick={onClick}
			data-loading={isLoading}
			disabled={isLoading || isDisabled}
			className="group relative disabled:opacity-100"
		>
			<span className="group-data-[loading=true]:text-transparent">{text}</span>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<LoaderCircle size={16} strokeWidth={2} aria-hidden="true" className="animate-spin" />
				</div>
			)}
		</CustomButton>
	);
}