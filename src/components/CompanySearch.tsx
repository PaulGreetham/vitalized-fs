import { useState } from "react";
import { Input } from "@/components/ui/input";
import { searchCompanies, type Exchange } from "@/lib/api/financial";
import { CompanySearchResult } from "@/types/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanySearchTable } from "./CompanySearchTable";

interface Props {
  onCompanySelect: (company: CompanySearchResult) => void;
}

const EXCHANGES: { value: Exchange; label: string }[] = [
  { value: "ALL", label: "All Exchanges" },
  { value: "NYSE", label: "New York Stock Exchange (NYSE)" },
  { value: "NASDAQ", label: "NASDAQ" },
  { value: "AMEX", label: "American Stock Exchange (AMEX)" },
  { value: "TSX", label: "Toronto Stock Exchange (TSX)" },
  { value: "LSE", label: "London Stock Exchange (LSE)" },
];

const ITEMS_PER_PAGE = 10;

export function CompanySearch({ onCompanySelect }: Props) {
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<Exchange>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const exchange = selectedExchange === "ALL" ? undefined : selectedExchange;
      const results = await searchCompanies(query, 100, exchange);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExchangeChange = async (exchange: Exchange) => {
    setSelectedExchange(exchange);
    setCurrentPage(1);
    if (searchQuery) {
      setIsLoading(true);
      try {
        const exchangeValue = exchange === "ALL" ? undefined : exchange;
        const results = await searchCompanies(searchQuery, 100, exchangeValue);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="company-search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Search Company
          </label>
          <div className="flex gap-4">
            <Input
              id="company-search"
              type="text"
              placeholder="Enter company name or symbol..."
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1"
            />
            <Select
              value={selectedExchange}
              onValueChange={handleExchangeChange}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select Exchange" />
              </SelectTrigger>
              <SelectContent>
                {EXCHANGES.map((exchange) => (
                  <SelectItem key={exchange.label} value={exchange.value}>
                    {exchange.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      
      {searchResults.length > 0 && (
        <CompanySearchTable
          results={paginatedResults}
          onCompanySelect={onCompanySelect}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
} 