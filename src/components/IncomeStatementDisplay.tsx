import { IncomeStatement } from "@/types/financial";
import { IncomeChart } from './charts/IncomeChart';

interface Props {
  data: IncomeStatement[];
  isLoading?: boolean;
  error?: string | null;
}

export function IncomeStatementDisplay({ data, isLoading, error }: Props) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data?.length) return <div>No data available</div>;

  const latestStatement = data[0];

  const incomeData = [
    { type: 'Revenue', amount: latestStatement.revenue, fill: 'var(--color-revenue)' },
    { type: 'Interest Income', amount: latestStatement.interestIncome, fill: 'var(--color-interest-income)' },
    { type: 'Gross Profit', amount: latestStatement.grossProfit, fill: 'var(--color-gross-profit)' },
    { type: 'Operating Income', amount: latestStatement.operatingIncome, fill: 'var(--color-operating-income)' },
    { type: 'Net Income', amount: latestStatement.netIncome, fill: 'var(--color-net-income)' },
  ];

  const chartData = {
    labels: data.map(item => new Date(item.date).getFullYear()),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: 'hsl(var(--primary) / 0.5)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1
      },
      {
        label: 'Net Income',
        data: data.map(item => item.netIncome),
        backgroundColor: 'hsl(var(--secondary) / 0.5)',
        borderColor: 'hsl(var(--secondary))',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Income Statement for {latestStatement.symbol}</h2>
      <IncomeChart data={incomeData} />
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
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Calendar Year</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.calendarYear}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Period</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.period}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Income</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.revenue / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Interest Income</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.interestIncome / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Gross Profit</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.grossProfit / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Operating Income</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.operatingIncome / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Income Before Tax</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.incomeBeforeTax / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Income</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.netIncome / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Expenses</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Cost of Revenue</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.costOfRevenue / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">R&D Expenses</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.researchAndDevelopmentExpenses / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">SG&A Expenses</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.sellingGeneralAndAdministrativeExpenses / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Other Expenses</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.otherExpenses / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Operating Expenses</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.operatingExpenses / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Cost and Expenses</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.costAndExpenses / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Interest Expense</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.interestExpense / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Depreciation and Amortization</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.depreciationAndAmortization / 1_000_000).toFixed(2)}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Income Tax Expense</h4>
              <p className="mt-1 text-xl text-gray-900">${(latestStatement.incomeTaxExpense / 1_000_000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Ratios</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Gross Profit Ratio</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.grossProfitRatio.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">EBITDA Ratio</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.ebitdaratio.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Operating Income Ratio</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.operatingIncomeRatio.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Income Before Tax Ratio</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.incomeBeforeTaxRatio.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Net Income Ratio</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.netIncomeRatio.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Shares and Links</h3>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">EPS</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.eps.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">EPS Diluted</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.epsdiluted.toFixed(2)}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Weighted Average Shs Out</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.weightedAverageShsOut.toLocaleString()}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Weighted Average Shs Out Dil</h4>
              <p className="mt-1 text-xl text-gray-900">{latestStatement.weightedAverageShsOutDil.toLocaleString()}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Link</h4>
              <a href={latestStatement.link} target="_blank" rel="noopener noreferrer" className="mt-1 text-blue-600 hover:underline">SEC Filing</a>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Final Link</h4>
              <a href={latestStatement.finalLink} target="_blank" rel="noopener noreferrer" className="mt-1 text-blue-600 hover:underline">Detailed Report</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 