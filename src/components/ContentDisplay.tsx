import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CompanySearchResult } from "@/types/search";
import { IncomeStatement } from "@/types/financial";
import { getIncomeStatement } from "@/lib/api/financial";
import { CompanyHeader } from "./CompanyHeader";
import { IncomeStatementDisplay } from './IncomeStatementDisplay';
import { CompanyOverviewDisplay } from './CompanyOverviewDisplay';

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
      return <CompanyOverviewDisplay selectedCompany={selectedCompany} />;
    }

    if (pathname.includes('/income')) {
      return (
        <div className="grid gap-6 mt-10">
          <IncomeStatementDisplay data={financialData} isLoading={isLoading} error={error} />
        </div>
      );
    }

    if (pathname.includes('/balance')) {
      return (
        <div className="grid gap-6 mt-10">
          <h2 className="text-2xl font-semibold">Balance Sheet</h2>
          <p>Balance sheet data will be displayed here</p>
        </div>
      );
    }

    if (pathname.includes('/cash-flow')) {
      return (
        <div className="grid gap-6 mt-10">
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