'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/shadcn/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/src/shared/ui/shadcn/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
const chartData = [
  { mobile: 80, desktop: 10, month: 'January' },
  { desktop: 0, mobile: 200, month: 'February' },
  { mobile: 120, desktop: 237, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { mobile: 0, desktop: 209, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' },
  { mobile: 80, desktop: 10, month: 'January' },
  { mobile: 0, desktop: 0, month: 'February' },
  { mobile: 54, desktop: 12, month: 'March' },
  { mobile: 0, desktop: 0, month: 'April' },
  { mobile: 0, desktop: 0, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' },
  { mobile: 80, desktop: 10, month: 'January' },
  { desktop: 0, mobile: 200, month: 'February' },
  { mobile: 120, desktop: 237, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { mobile: 0, desktop: 209, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' },
  { mobile: 80, desktop: 10, month: 'January' },
  { mobile: 0, desktop: 0, month: 'February' },
  { mobile: 54, desktop: 12, month: 'March' },
  { mobile: 0, desktop: 0, month: 'April' },
  { mobile: 0, desktop: 0, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' },
  { desktop: 0, mobile: 140, month: 'June' },
  { mobile: 80, desktop: 10, month: 'January' },
  { desktop: 0, mobile: 200, month: 'February' },
  { mobile: 120, desktop: 237, month: 'March' },
  { desktop: 73, mobile: 190, month: 'April' },
  { mobile: 0, desktop: 209, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' },
  { mobile: 80, desktop: 10, month: 'January' },
  { mobile: 0, desktop: 0, month: 'February' },
  { mobile: 54, desktop: 12, month: 'March' },
  { mobile: 0, desktop: 0, month: 'April' },
  { mobile: 0, desktop: 0, month: 'May' },
  { desktop: 0, mobile: 140, month: 'June' }
]

const chartConfig = {
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function ProfileActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Просмотры медиа</CardTitle>
        <CardDescription>За последние 3 месяца</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='max-h-96 w-full'>
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              radius={0}
              stackId='a'
              dataKey='desktop'
              fill='var(--color-desktop)'
            />
            <Bar
              radius={0}
              stackId='a'
              dataKey='mobile'
              fill='var(--color-mobile)'
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
