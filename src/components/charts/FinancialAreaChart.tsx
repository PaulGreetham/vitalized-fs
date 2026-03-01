"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartSeries {
  key: string;
  label: string;
  color: string;
}

interface FinancialAreaChartProps<T extends Record<string, string | number>> {
  title: string;
  data: T[];
  xKey: keyof T;
  series: ChartSeries[];
}

const currencyCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatCurrencyCompact(value: number) {
  if (!Number.isFinite(value)) return "$0";
  return currencyCompact.format(value);
}

export function FinancialAreaChart<T extends Record<string, string | number>>({
  title,
  data,
  xKey,
  series,
}: FinancialAreaChartProps<T>) {
  const firstPoint = data[0]?.[xKey] ?? "start";
  const lastPoint = data[data.length - 1]?.[xKey] ?? "end";
  const animationKey = `${String(firstPoint)}-${String(lastPoint)}-${data.length}`;

  const chartConfig = series.reduce((acc, item) => {
    acc[item.key] = {
      label: item.label,
      color: item.color,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={String(xKey)}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrencyCompact(Number(value))}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => formatCurrencyCompact(Number(value))}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            {series.map((item) => (
              <Area
                key={`${item.key}-${animationKey}`}
                dataKey={item.key}
                type="monotone"
                fill={`var(--color-${item.key})`}
                fillOpacity={0.25}
                stroke={`var(--color-${item.key})`}
                strokeWidth={2}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
