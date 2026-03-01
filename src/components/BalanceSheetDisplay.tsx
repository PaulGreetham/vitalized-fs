import { BalanceSheet } from "@/types/financial";
import { FinancialAreaChart } from "@/components/charts/FinancialAreaChart";
import {
  formatCurrencyCompact,
  formatHumanDate,
  formatHumanDateTime,
} from "@/lib/formatters";

interface Props {
  data: BalanceSheet[];
}

export function BalanceSheetDisplay({ data }: Props) {
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];
  const chartData = [...data].reverse().map((statement) => ({
    period: statement.calendarYear || statement.date,
    totalAssets: statement.totalAssets,
    totalLiabilities: statement.totalLiabilities,
    totalEquity: statement.totalEquity,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Balance Sheet for {latestStatement.symbol}</h2>
      <FinancialAreaChart
        title="Assets, Liabilities, and Equity Trend"
        data={chartData}
        xKey="period"
        series={[
          { key: "totalAssets", label: "Total Assets", color: "hsl(var(--chart-1))" },
          { key: "totalLiabilities", label: "Total Liabilities", color: "hsl(var(--chart-2))" },
          { key: "totalEquity", label: "Total Equity", color: "hsl(var(--chart-3))" },
        ]}
      />
      
      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Dates</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Date</h4>
              <p className="mt-1 text-xl text-gray-900">{formatHumanDate(latestStatement.date)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Filling Date</h4>
              <p className="mt-1 text-xl text-gray-900">{formatHumanDate(latestStatement.fillingDate)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Accepted Date</h4>
              <p className="mt-1 text-xl text-gray-900">{formatHumanDateTime(latestStatement.acceptedDate)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Assets</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Cash & Equivalents</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.cashAndCashEquivalents)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Short Term Investments</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.shortTermInvestments)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Receivables</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.netReceivables)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Inventory</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.inventory)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Current Assets</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.totalCurrentAssets)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Assets</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.totalAssets)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Account Payables</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.accountPayables)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Short Term Debt</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.shortTermDebt)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Current Liabilities</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.totalCurrentLiabilities)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Long Term Debt</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.longTermDebt)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Liabilities</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.totalLiabilities)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Equity</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Common Stock</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.commonStock)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Retained Earnings</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.retainedEarnings)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Total Equity</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.totalEquity)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 