"use client"

import {ReactNode} from "react";
import {LucideIcon} from "lucide-react";
import {Card, CardTitle, CardHeader, CardContent, CardDescription} from "@/components/ui/card";

export type Step = {
	icon: LucideIcon
	title: string
	description: string
	component: ReactNode
}

type Props = {
	steps: Step[],
	stepIndex: number
}

export function Stepper({ steps, stepIndex }: Props) {
	const step = steps[stepIndex]
	return (
		<Card>
			<CardHeader className="flex flex-row items-center gap-2">
				<step.icon size={36} />
				<div>
					<CardTitle>{step.title}</CardTitle>
					<CardDescription>{step.description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					{step.component}
				</div>
			</CardContent>
		</Card>
	)
}