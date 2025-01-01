import "../../public/globals.css"
import {LayoutProps} from "@/interfaces";
import {ThemeProvider} from "@/components/shadcn/theme-provider";
import * as React from "react";
import {Toaster} from "@/components/ui/toaster";

export default function MyApp({children}: LayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<main>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</main>
			<Toaster/>
			</body>
		</html>
	)
}