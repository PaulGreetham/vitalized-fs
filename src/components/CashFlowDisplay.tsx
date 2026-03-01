import { CashFlowStatement } from "@/types/financial";
import { FinancialAreaChart } from "@/components/charts/FinancialAreaChart";
import {
  formatCurrencyCompact,
  formatHumanDate,
  formatHumanDateTime,
} from "@/lib/formatters";

interface Props {
  data: CashFlowStatement[];
}

export function CashFlowDisplay({ data }: Props) {
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];
  const chartData = [...data].reverse().map((statement) => ({
    period: statement.calendarYear || statement.date,
    operatingCashFlow: statement.operatingCashFlow,
    freeCashFlow: statement.freeCashFlow,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Cash Flow Statement for {latestStatement.symbol}</h2>
      <FinancialAreaChart
        title="Operating and Free Cash Flow Trend"
        data={chartData}
        xKey="period"
        series={[
          {
            key: "operatingCashFlow",
            label: "Operating Cash Flow",
            color: "hsl(var(--chart-1))",
          },
          { key: "freeCashFlow", label: "Free Cash Flow", color: "hsl(var(--chart-2))" },
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
          <h3 className="text-lg font-semibold mb-4">Operating Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Income</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.netIncome)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Depreciation & Amortization</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.depreciationAndAmortization)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Operating Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.operatingCashFlow)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Investing Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Capital Expenditure</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.capitalExpenditure)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Acquisitions</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.acquisitionsNet)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Investing Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.netCashUsedForInvestingActivites)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Financing Activities</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Debt Repayment</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.debtRepayment)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Dividends Paid</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.dividendsPaid)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Financing Cash Flow</h4>
              <p className="mt-1 text-xl text-gray-900">{formatCurrencyCompact(latestStatement.netCashUsedProvidedByFinancingActivities)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 