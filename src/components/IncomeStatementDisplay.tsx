import { IncomeStatement } from "@/types/financial";

interface Props {
  data: IncomeStatement[];
  isLoading?: boolean;
  error?: string;
}

export function IncomeStatementDisplay({ data, isLoading, error }: Props) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Income Statement for {latestStatement.symbol}</h2>
      <div className="grid gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Revenue</h3>
          <p>${(latestStatement.revenue / 1_000_000).toFixed(2)}M</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Net Income</h3>
          <p>${(latestStatement.netIncome / 1_000_000).toFixed(2)}M</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">EPS</h3>
          <p>${latestStatement.eps.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
} 