import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { CompanySearchResult } from "@/types/search";

interface Props {
  results: CompanySearchResult[];
  onCompanySelect: (company: CompanySearchResult) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];

  range.push(1);

  if (totalPages <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < totalPages && i > 1) {
      range.push(i);
    }
  }
  range.push(totalPages);

  let prev: number | null = null;
  for (const i of range) {
    if (prev) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (i - prev !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
}

export function CompanySearchTable({ 
  results, 
  onCompanySelect, 
  currentPage, 
  totalPages,
  onPageChange 
}: Props) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Exchange</TableHead>
            <TableHead>Currency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((company) => (
            <TableRow
              key={company.symbol}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onCompanySelect(company)}
            >
              <TableCell className="font-medium">{company.symbol}</TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.exchangeShortName}</TableCell>
              <TableCell>{company.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(pageNumber as number)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 