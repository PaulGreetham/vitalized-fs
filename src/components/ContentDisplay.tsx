import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CompanySearchResult } from "@/types/search";
import { IncomeStatement, BalanceSheet, CashFlowStatement } from "@/types/financial";
import { getIncomeStatement, getBalanceSheet, getCashFlowStatement } from "@/lib/api/financial";
import { CompanyHeader } from "./CompanyHeader";
import { IncomeStatementDisplay } from './IncomeStatementDisplay';
import { CompanyOverviewDisplay } from './CompanyOverviewDisplay';
import { BalanceSheetDisplay } from "./BalanceSheetDisplay";
import { CashFlowDisplay } from "./CashFlowDisplay";
import { CircularProgress } from "@/components/ui/circular-progress";

interface ContentDisplayProps {
  selectedCompany: CompanySearchResult | null;
}

export function ContentDisplay({ selectedCompany }: ContentDisplayProps) {
  const [financialData, setFinancialData] = useState<IncomeStatement[]>([]);
  const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheet[]>([]);
  const [cashFlowData, setCashFlowData] = useState<CashFlowStatement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      if (!selectedCompany) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const startTime = Date.now();
        
        if (pathname.includes('/income')) {
          const data = await getIncomeStatement(selectedCompany.symbol);
          setFinancialData(data);
        } else if (pathname.includes('/balance')) {
          const data = await getBalanceSheet(selectedCompany.symbol);
          setBalanceSheetData(data);
        } else if (pathname.includes('/cash-flow')) {
          const data = await getCashFlowStatement(selectedCompany.symbol);
          setCashFlowData(data);
        }
        
        // Ensure minimum 2 second loading time
        const elapsed = Date.now() - startTime;
        if (elapsed < 2000) {
          await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
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
    <div className="transition-opacity duration-100 ease-in-out">
      <CompanyHeader company={selectedCompany} />
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <CircularProgress size={60} />
      </div>
    </div>
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
          <BalanceSheetDisplay data={balanceSheetData} isLoading={isLoading} error={error} />
        </div>
      );
    }

    if (pathname.includes('/cash-flow')) {
      return (
        <div className="grid gap-6 mt-10">
          <CashFlowDisplay data={cashFlowData} isLoading={isLoading} error={error} />
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