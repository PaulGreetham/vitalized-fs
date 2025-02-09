import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    value: item.amount / 1_000_000, // Convert to millions
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}M`}
              />
              <Bar dataKey="value" fill="var(--chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 