
"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip as RechartsTooltip, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const monthlySalesData = [
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

const salesChartConfig = {
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
        <ChartContainer config={salesChartConfig} className="h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={monthlySalesData}
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

const regionSalesData = [
  { region: "North", sales: 4000, fill: "var(--color-north)" },
  { region: "South", sales: 3000, fill: "var(--color-south)" },
  { region: "East", sales: 2000, fill: "var(--color-east)" },
  { region: "West", sales: 2780, fill: "var(--color-west)" },
  { region: "Central", sales: 1890, fill: "var(--color-central)" },
];

const regionChartConfig = {
  sales: {
    label: "Sales",
  },
  north: { label: "North", color: "hsl(var(--chart-1))" },
  south: { label: "South", color: "hsl(var(--chart-2))" },
  east: { label: "East", color: "hsl(var(--chart-3))" },
  west: { label: "West", color: "hsl(var(--chart-4))" },
  central: { label: "Central", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;
  
export function SalesByRegionChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Sales by Region</CardTitle>
        <CardDescription>Distribution of sales across different regions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={regionChartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={regionSalesData} layout="vertical" margin={{ right: 20 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="sales" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis type="category" dataKey="region" tickLine={false} axisLine={false} tickMargin={8} width={80} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} nameKey="region" />
            <Bar dataKey="sales" layout="vertical" radius={4}>
              {regionSalesData.map((entry) => (
                  <Cell key={`cell-${entry.region}`} fill={entry.fill} />
                ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


const orderStatusData = [
  { status: "Delivered", count: 250, fill: "hsl(var(--chart-1))" },
  { status: "Shipped", count: 120, fill: "hsl(var(--chart-2))" },
  { status: "Pending", count: 80, fill: "hsl(var(--chart-3))" },
  { status: "Cancelled", count: 30, fill: "hsl(var(--chart-4))" },
];

const orderStatusChartConfig = {
  count: {
    label: "Count",
  },
  delivered: { label: "Delivered", color: "hsl(var(--chart-1))" },
  shipped: { label: "Shipped", color: "hsl(var(--chart-2))" },
  pending: { label: "Pending", color: "hsl(var(--chart-3))" },
  cancelled: { label: "Cancelled", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export function OrderStatusChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Breakdown of current order statuses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={orderStatusChartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={orderStatusData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {orderStatusData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={entry.fill}
                  className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              ))}
            </Pie>
             <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
