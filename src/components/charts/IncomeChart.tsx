import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IncomeStatement } from '@/types/financial';

interface IncomeChartProps {
  data: {
    type: string;
    amount: number;
    fill: string;
  }[];
  chartData: IncomeStatement[];
}

export function IncomeChart({ chartData }: IncomeChartProps) {
  const timeSeriesData = chartData.map(item => ({
    year: new Date(item.date).getFullYear(),
    revenue: item.revenue / 1_000_000,
    netIncome: item.netIncome / 1_000_000,
  })).reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}M`}
              />
              <Bar dataKey="revenue" fill="var(--chart-1)" name="Revenue" />
              <Bar dataKey="netIncome" fill="var(--chart-2)" name="Net Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 