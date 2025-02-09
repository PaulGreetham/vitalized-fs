import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CashFlowChartProps {
  data: {
    type: string;
    amount: number;
    fill: string;
  }[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    amount: item.amount / 1_000_000, // Convert to millions
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis label={{ value: 'Millions ($)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}M`} />
          <Bar dataKey="amount" fill="var(--chart-1)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 