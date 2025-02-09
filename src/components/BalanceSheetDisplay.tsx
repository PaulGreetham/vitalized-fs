import { BalanceSheet } from "@/types/financial";
import { BalanceSheetChart } from "./charts/BalanceSheetChart";

interface Props {
  data: BalanceSheet[];
  isLoading: boolean;
  error: string | null;
}

export function BalanceSheetDisplay({ data, isLoading, error }: Props) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];

  const balanceData = [
    { type: 'Total Assets', amount: latestStatement.totalAssets, fill: 'var(--chart-1)' },
    { type: 'Total Liabilities', amount: latestStatement.totalLiabilities, fill: 'var(--chart-2)' },
    { type: 'Total Equity', amount: latestStatement.totalEquity, fill: 'var(--chart-3)' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Balance Sheet for {latestStatement.symbol}</h2>
      <BalanceSheetChart data={balanceData} />
      
      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Dates</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Date</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.date}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Filling Date</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.fillingDate}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Accepted Date</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.acceptedDate}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Assets</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Cash & Equivalents</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.cashAndCashEquivalents / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Short Term Investments</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.shortTermInvestments / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Receivables</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.netReceivables / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Inventory</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.inventory / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Current Assets</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.totalCurrentAssets / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Assets</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.totalAssets / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Account Payables</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.accountPayables / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Short Term Debt</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.shortTermDebt / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Current Liabilities</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.totalCurrentLiabilities / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Long Term Debt</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.longTermDebt / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Liabilities</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.totalLiabilities / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Equity</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Common Stock</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.commonStock / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Retained Earnings</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.retainedEarnings / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Equity</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.totalEquity / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 