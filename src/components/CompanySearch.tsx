import { useState, useCallback, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { useDebounce } from "@/hooks/use-debounce";

interface Props {
  onCompanySelect: (company: CompanySearchResult) => void;
  selectedCompany: CompanySearchResult | null;
}

const EXCHANGES: { value: Exchange; label: string }[] = [
  { value: "ALL", label: "All Exchanges" },
  { value: "NYSE", label: "New York Stock Exchange (NYSE)" },
  { value: "NASDAQ", label: "NASDAQ" },
  { value: "AMEX", label: "American Stock Exchange (AMEX)" },
  { value: "TSX", label: "Toronto Stock Exchange (TSX)" },
  { value: "LSE", label: "London Stock Exchange (LSE)" },
];

const RESULTS_PER_PAGE = 10;

export function CompanySearch({ onCompanySelect, selectedCompany }: Props) {
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<Exchange>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasSearched, setHasSearched] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasSearched') === 'true';
    }
    return false;
  });
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSearched', hasSearched.toString());
    }
  }, [hasSearched]);

  useEffect(() => {
    if (!selectedCompany && !hasSearched) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [selectedCompany, hasSearched]);

  const performSearch = useCallback(async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchCompanies(query, 100);
      setSearchResults(results);
      setCurrentPage(1);
      
      if (query.trim() !== '') {
        setHasSearched(true);
        setShowTooltip(false);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, performSearch]);

  const handleExchangeChange = (exchange: Exchange) => {
    setSelectedExchange(exchange);
    setCurrentPage(1);
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const handleCompanySelect = (company: CompanySearchResult) => {
    onCompanySelect(company);
    setSearchResults([]);
    setSearchQuery("");
  };

  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  return (
    <div className={`space-y-4 ${!selectedCompany ? 'relative z-50' : ''}`}>
      <div className="space-y-2">
        <label htmlFor="company-search" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Search Company
        </label>
        <div className="flex gap-4">
          <TooltipProvider>
            <Tooltip open={!selectedCompany && showTooltip && !hasSearched}>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <Input
                    id="company-search"
                    type="text"
                    placeholder="Enter company name..."
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    onClick={() => setShowTooltip(false)}
                    value={searchQuery}
                    className={`w-full ${!selectedCompany ? 'ring-2 ring-blue-200 bg-white shadow-sm' : ''}`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                align="start"
                className="bg-blue-600 text-white p-3 max-w-xs font-medium shadow-lg"
              >
                <TooltipArrow className="fill-blue-600" />
                <p>To see financial information on a company, please input the name of a listed company in the above search bar.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Select
            value={selectedExchange}
            onValueChange={handleExchangeChange}
            disabled={!selectedCompany}
          >
            <SelectTrigger className={`w-[220px] ${!selectedCompany ? 'opacity-40' : ''}`}>
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

      {isLoading && <div>Loading...</div>}
      
      {currentResults.length > 0 && (
        <div className="space-y-4">
          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2">Symbol</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Exchange</th>
                  <th className="text-left p-2">Currency</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((company) => (
                  <tr
                    key={company.symbol}
                    className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleCompanySelect(company)}
                  >
                    <td className="p-2 font-medium">{company.symbol}</td>
                    <td className="p-2">{company.name}</td>
                    <td className="p-2">{company.exchangeShortName}</td>
                    <td className="p-2">{company.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 