import { CashFlowStatement } from "@/types/financial";
import { CashFlowChart } from "./charts/CashFlowChart";

interface Props {
  data: CashFlowStatement[];
  isLoading: boolean;
  error: string | null;
}

export function CashFlowDisplay({ data, isLoading, error }: Props) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];

  const cashFlowData = [
    { type: 'Operating Cash Flow', amount: latestStatement.operatingCashFlow, fill: 'var(--chart-1)' },
    { type: 'Investing Cash Flow', amount: latestStatement.netCashUsedForInvestingActivites, fill: 'var(--chart-2)' },
    { type: 'Financing Cash Flow', amount: latestStatement.netCashUsedProvidedByFinancingActivities, fill: 'var(--chart-3)' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Cash Flow Statement for {latestStatement.symbol}</h2>
      <CashFlowChart data={cashFlowData} />
      
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
          <h3 className="text-lg font-semibold mb-4">Operating Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Income</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.netIncome / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Depreciation & Amortization</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.depreciationAndAmortization / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Operating Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.operatingCashFlow / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Investing Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Capital Expenditure</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.capitalExpenditure / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Acquisitions</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.acquisitionsNet / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Investing Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.netCashUsedForInvestingActivites / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Financing Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Debt Repayment</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.debtRepayment / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Dividends Paid</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.dividendsPaid / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Financing Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.netCashUsedProvidedByFinancingActivities / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 