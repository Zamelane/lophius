import "../../public/globals.css"
import {LayoutProps} from "@/interfaces";
import {ThemeProvider} from "@/components/shadcn/theme-provider";
import * as React from "react";
import Layout from "@/components/home/layout";

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
						<Layout>
							{children}
						</Layout>
					</ThemeProvider>
				</main>
			</body>
		</html>
	)
}