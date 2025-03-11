"use client"

import * as React from "react"
import { Bar, XAxis, BarChart, CartesianGrid } from "recharts"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 200, month: "February" },
  { desktop: 237, mobile: 120, month: "March" },
  { desktop: 73, mobile: 190, month: "April" },
  { desktop: 209, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 0, month: "February" },
  { desktop: 12, mobile: 54, month: "March" },
  { desktop: 0, mobile: 0, month: "April" },
  { desktop: 0, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 200, month: "February" },
  { desktop: 237, mobile: 120, month: "March" },
  { desktop: 73, mobile: 190, month: "April" },
  { desktop: 209, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 0, month: "February" },
  { desktop: 12, mobile: 54, month: "March" },
  { desktop: 0, mobile: 0, month: "April" },
  { desktop: 0, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 200, month: "February" },
  { desktop: 237, mobile: 120, month: "March" },
  { desktop: 73, mobile: 190, month: "April" },
  { desktop: 209, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
  { desktop: 10, mobile: 80, month: "January" },
  { desktop: 0, mobile: 0, month: "February" },
  { desktop: 12, mobile: 54, month: "March" },
  { desktop: 0, mobile: 0, month: "April" },
  { desktop: 0, mobile: 0, month: "May" },
  { desktop: 0, mobile: 140, month: "June" },
]

const chartConfig = {
  desktop: {
    color: "hsl(var(--chart-1))",
    label: "Desktop",
  },
  mobile: {
    color: "hsl(var(--chart-2))",
    label: "Mobile",
  },
} satisfies ChartConfig

export function ProfileActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Просмотры медиа</CardTitle>
        <CardDescription>За последние 3 месяца</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              radius={0}
              stackId="a"
              dataKey="desktop"
              fill="var(--color-desktop)"
            />
            <Bar
              radius={0}
              stackId="a"
              dataKey="mobile"
              fill="var(--color-mobile)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}