import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		defaultVariants: {
			size: "default",
			variant: "default",
		},
		variants: {
			size: {
				icon: "h-9 w-9",
				default: "h-9 px-4 py-2",
				lg: "h-10 rounded-lg px-8",
				sm: "h-8 rounded-lg px-3 text-xs",
			},
			variant: {
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
			},
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ size, variant, className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp ref={ref} className={cn(buttonVariants({ size, variant, className }))} {...props} />
		);
	},
);
CustomButton.displayName = "Button";

export default CustomButton;