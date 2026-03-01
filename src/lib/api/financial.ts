import { BalanceSheet, IncomeStatement, CashFlowStatement } from "@/types/financial";
import { CompanySearchResult } from "@/types/search";

export type Exchange = 'ALL' | 'NYSE' | 'NASDAQ' | 'AMEX' | 'TSX' | 'LSE';

interface ApiErrorPayload {
  error?: string;
  status?: number;
  details?: string;
}

async function fetchInternalJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    let payload: ApiErrorPayload | null = null;
    try {
      payload = (await response.json()) as ApiErrorPayload;
    } catch {
      payload = null;
    }

    const status = payload?.status ?? response.status;
    const details = payload?.details ? ` (${payload.details})` : "";
    const message = payload?.error ?? "Request failed";
    throw new Error(`${message} [${status}]${details}`);
  }

  return (await response.json()) as T;
}

export async function searchCompanies(
  query: string, 
  limit: number = 10
): Promise<CompanySearchResult[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const url = `/api/financial/search?query=${encodeURIComponent(trimmedQuery)}&limit=${limit}`;
  const data = await fetchInternalJson<CompanySearchResult[]>(url);
  return Array.isArray(data) ? data : [];
}

export async function getCompanyBySymbol(symbol: string): Promise<CompanySearchResult> {
  return fetchInternalJson<CompanySearchResult>(
    `/api/financial/profile/${encodeURIComponent(symbol)}`
  );
}

export async function getIncomeStatement(symbol: string): Promise<IncomeStatement[]> {
  const data = await fetchInternalJson<IncomeStatement[]>(
    `/api/financial/income/${encodeURIComponent(symbol)}`
  );
  return Array.isArray(data) ? data : [];
}

export async function getBalanceSheet(symbol: string): Promise<BalanceSheet[]> {
  const data = await fetchInternalJson<BalanceSheet[]>(
    `/api/financial/balance/${encodeURIComponent(symbol)}`
  );
  return Array.isArray(data) ? data : [];
}

export async function getCashFlowStatement(symbol: string): Promise<CashFlowStatement[]> {
  const data = await fetchInternalJson<CashFlowStatement[]>(
    `/api/financial/cash-flow/${encodeURIComponent(symbol)}`
  );
  return Array.isArray(data) ? data : [];
} 