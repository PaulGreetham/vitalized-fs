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
import { Skeleton } from "@/components/ui/skeleton";

interface ContentDisplayProps {
  selectedCompany: CompanySearchResult | null;
}

export function ContentDisplay({ selectedCompany }: ContentDisplayProps) {
  const [financialData, setFinancialData] = useState<IncomeStatement[]>([]);
  const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheet[]>([]);
  const [cashFlowData, setCashFlowData] = useState<CashFlowStatement[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      if (!selectedCompany) return;
      const isFinancialRoute =
        pathname.includes('/income') ||
        pathname.includes('/balance') ||
        pathname.includes('/cash-flow');
      if (!isFinancialRoute) return;
      
      setIsLoadingContent(true);
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

        // Keep a short minimum skeleton to smooth page transitions.
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 1000 - elapsed);
        if (remainingDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingDelay));
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setIsLoadingContent(false);
      }
    }

    fetchData();
  }, [selectedCompany, pathname]);

  if (!selectedCompany) {
    return (
      <div className="h-full w-full">
        {/* Empty state with no welcome message */}
      </div>
    );
  }

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
    const showFinancialSkeleton =
      isLoadingContent &&
      (pathname.includes('/income') ||
        pathname.includes('/balance') ||
        pathname.includes('/cash-flow'));

    if (showFinancialSkeleton) {
      return (
        <div className="grid gap-6 mt-10">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-[220px] w-full" />
        </div>
      );
    }

    if (pathname.includes('/overview')) {
      return <CompanyOverviewDisplay selectedCompany={selectedCompany} />;
    }

    if (pathname.includes('/income')) {
      return (
        <div className="grid gap-6 mt-10">
          <IncomeStatementDisplay data={financialData} />
        </div>
      );
    }

    if (pathname.includes('/balance')) {
      return (
        <div className="grid gap-6 mt-10">
          <BalanceSheetDisplay data={balanceSheetData} />
        </div>
      );
    }

    if (pathname.includes('/cash-flow')) {
      return (
        <div className="grid gap-6 mt-10">
          <CashFlowDisplay data={cashFlowData} />
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