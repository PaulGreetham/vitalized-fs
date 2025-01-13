import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CompanySearchResult } from "@/types/search";
import { IncomeStatement } from "@/types/financial";
import { getIncomeStatement } from "@/lib/api/financial";
import { CompanyHeader } from "./CompanyHeader";

interface ContentDisplayProps {
  selectedCompany: CompanySearchResult | null;
}

export function ContentDisplay({ selectedCompany }: ContentDisplayProps) {
  const [financialData, setFinancialData] = useState<IncomeStatement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      if (!selectedCompany) return;
      
      if (!pathname.includes('/income')) return;

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getIncomeStatement(selectedCompany.symbol);
        setFinancialData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch financial data');
        setFinancialData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedCompany, pathname]);

  if (!selectedCompany) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to Vitalized FS</h2>
        <p className="text-gray-600 mt-2">Search for a company to view its financial statements</p>
      </div>
    );
  }

  // Loading and error states
  if (isLoading) return (
    <>
      <CompanyHeader company={selectedCompany} />
      <div className="pt-32 px-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    </>
  );

  if (error) return (
    <>
      <CompanyHeader company={selectedCompany} />
      <div className="pt-32 px-8">
        <div className="text-red-500">{error}</div>
      </div>
    </>
  );

  // Content based on current route
  const renderContent = () => {
    if (pathname.includes('/overview')) {
      return (
        <div className="grid gap-6 mt-10">
          <h2 className="text-2xl font-semibold">Company Overview</h2>
          <div className="grid gap-4">
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Market Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Stock Price</h4>
                  <p className="mt-1 text-xl text-gray-900">${selectedCompany.price?.toFixed(2) ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Market Cap</h4>
                  <p className="mt-1 text-xl text-gray-900">${selectedCompany.mktCap ? (selectedCompany.mktCap / 1_000_000_000).toFixed(2) : 'N/A'}B</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Beta</h4>
                  <p className="mt-1 text-xl text-gray-900">{selectedCompany.beta?.toFixed(2) ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Average Volume</h4>
                  <p className="mt-1 text-xl text-gray-900">{selectedCompany.volAvg ? (selectedCompany.volAvg / 1_000_000).toFixed(1) : 'N/A'}M</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Dividend</h4>
                  <p className="mt-1 text-xl text-gray-900">${selectedCompany.lastDiv?.toFixed(2) ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">52-Week Range</h4>
                  <p className="mt-1 text-xl text-gray-900">{selectedCompany.range ?? 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Industry</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.industry ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Sector</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.sector ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">CEO</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.ceo ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Employees</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.fullTimeEmployees ? parseInt(selectedCompany.fullTimeEmployees).toLocaleString() : 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.phone ?? 'N/A'}</p>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500">IPO Date</h4>
                  <p className="mt-1 text-gray-900">{selectedCompany.ipoDate ? new Date(selectedCompany.ipoDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="flex flex-col md:col-span-2 lg:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="mt-1 text-gray-900">
                    {selectedCompany.address && selectedCompany.city && selectedCompany.state && selectedCompany.zip
                      ? `${selectedCompany.address}, ${selectedCompany.city}, ${selectedCompany.state} ${selectedCompany.zip}`
                      : 'N/A'
                    }
                  </p>
                </div>
                <div className="flex flex-col md:col-span-2 lg:col-span-3">
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  {selectedCompany.website ? (
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" 
                       className="mt-1 text-blue-600 hover:underline">
                      {selectedCompany.website}
                    </a>
                  ) : (
                    <p className="mt-1 text-gray-900">N/A</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{selectedCompany.description ?? 'No description available.'}</p>
            </div>
          </div>
        </div>
      );
    }

    if (pathname.includes('/income')) {
      return (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">Income Statement</h2>
          {financialData.length > 0 && (
            <div className="grid gap-4">
              <div className="p-4 border rounded">
                <h3 className="font-semibold">Revenue</h3>
                <p>${(financialData[0].revenue / 1_000_000).toFixed(2)}M</p>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-semibold">Net Income</h3>
                <p>${(financialData[0].netIncome / 1_000_000).toFixed(2)}M</p>
              </div>
              <div className="p-4 border rounded">
                <h3 className="font-semibold">EPS</h3>
                <p>${financialData[0].eps.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (pathname.includes('/balance')) {
      return (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">Balance Sheet</h2>
          <p>Balance sheet data will be displayed here</p>
        </div>
      );
    }

    if (pathname.includes('/cash-flow')) {
      return (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">Cash Flow Statement</h2>
          <p>Cash flow data will be displayed here</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <CompanyHeader company={selectedCompany} />
      <div className="pt-32 px-8 pb-20">
        {renderContent()}
      </div>
    </>
  );
} 