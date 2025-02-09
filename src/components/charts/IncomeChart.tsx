import { BarChart, Card, Title } from "@tremor/react";

interface IncomeChartProps {
  data: {
    type: string;
    amount: number;
    fill: string;
  }[];
}

export function IncomeChart({ data }: IncomeChartProps) {
  const formattedData = data.map(item => ({
    name: item.type,
    value: item.amount / 1_000_000, // Convert to millions
  }));

  return (
    <Card>
      <Title>Income Statement Overview</Title>
      <BarChart
        className="h-48 mt-4"
        data={formattedData}
        index="name"
        categories={["value"]}
        colors={["blue"]}
        valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number)}M`}
        showTooltip={true}
        showLegend={false}
        yAxisWidth={100}
        showAnimation={true}
        showGridLines={true}
        showXAxis={true}
        showYAxis={true}
      />
    </Card>
  );
} 