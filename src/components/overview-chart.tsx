"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 250, mobile: 160 },
  { month: "August", desktop: 180, mobile: 100 },
  { month: "September", desktop: 320, mobile: 220 },
  { month: "October", desktop: 280, mobile: 180 },
  { month: "November", desktop: 200, mobile: 150 },
  { month: "December", desktop: 350, mobile: 250 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function OverviewChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales data for desktop and mobile.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
             <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function SalesByRegionChart() {
  const regionData = [
    { region: "North", sales: 4000 },
    { region: "South", sales: 3000 },
    { region: "East", sales: 2000 },
    { region: "West", sales: 2780 },
    { region: "Central", sales: 1890 },
  ];

  const regionChartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
        <CardDescription>Distribution of sales across different regions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={regionChartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={regionData} layout="vertical" margin={{ right: 20 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="sales" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis type="category" dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
