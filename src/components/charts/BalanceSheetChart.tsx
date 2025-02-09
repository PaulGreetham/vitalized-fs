import { BarChart, Card, Title } from "@tremor/react";

interface BalanceSheetChartProps {
  data: {
    type: string;
    amount: number;
    fill: string;
  }[];
}

export function BalanceSheetChart({ data }: BalanceSheetChartProps) {
  const formattedData = data.map(item => ({
    name: item.type,
    Amount: item.amount / 1_000_000, // Convert to millions
  }));

  return (
    <Card>
      <Title>Balance Sheet Overview</Title>
      <BarChart
        className="h-48 mt-4"
        data={formattedData}
        index="name"
        categories={["Amount"]}
        colors={["blue"]}
        valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number)}M`}
        yAxisWidth={100}
        showAnimation={true}
        showLegend={false}
        showTooltip={true}
        showXAxis={true}
        showYAxis={true}    
        showGridLines={true}
      />
    </Card>
  );
} 