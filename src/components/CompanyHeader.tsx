import { CompanySearchResult } from "@/types/search";

interface CompanyHeaderProps {
  company: CompanySearchResult;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="fixed top-32 left-64 right-0 bg-white border-b z-30 px-8 py-6 mt-8">
      <h1 className="text-3xl font-bold">{company.name}</h1>
      <div className="text-sm text-gray-500 mt-2">
        <span className="font-medium">{company.symbol}</span> • 
        <span className="ml-2">{company.exchangeShortName}</span> •
        <span className="ml-2">{company.currency}</span>
      </div>
    </div>
  );
} 