import { useState } from "react";
import { Input } from "@/components/ui/input";
import { searchCompanies } from "@/lib/api/financial";
import { CompanySearchResult } from "@/types/search";

interface Props {
  onCompanySelect: (company: CompanySearchResult) => void;
}

export function CompanySearch({ onCompanySelect }: Props) {
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchCompanies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="company-search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Search Company
        </label>
        <Input
          id="company-search"
          type="text"
          placeholder="Enter company name or symbol..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {isLoading && <div>Loading...</div>}
      
      {searchResults.length > 0 && (
        <ul className="space-y-2 border rounded-md p-2">
          {searchResults.map((company) => (
            <li
              key={company.symbol}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
              onClick={() => onCompanySelect(company)}
            >
              <div className="font-medium">{company.name}</div>
              <div className="text-sm text-gray-500">
                {company.symbol} • {company.exchangeShortName}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 