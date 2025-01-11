'use client';

import { useState } from 'react';
import { CompanySearch } from "@/components/CompanySearch";
import { IncomeStatementDisplay } from "@/components/IncomeStatementDisplay";
import { getIncomeStatement } from "@/lib/api/financial";
import { CompanySearchResult } from "@/types/search";
import { IncomeStatement } from "@/types/financial";

export default function Home() {
  const [financialData, setFinancialData] = useState<IncomeStatement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompanySelect = async (company: CompanySearchResult) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getIncomeStatement(company.symbol);
      setFinancialData(data);
    } catch {
      setError('Failed to fetch financial data');
      setFinancialData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Vitalized FS</h1>
      <div className="max-w-2xl mx-auto space-y-8">
        <CompanySearch onCompanySelect={handleCompanySelect} />
        <IncomeStatementDisplay 
          data={financialData}
          isLoading={isLoading}
          error={error || undefined}
        />
      </div>
    </main>
  );
}
