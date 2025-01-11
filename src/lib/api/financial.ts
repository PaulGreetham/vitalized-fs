import { IncomeStatement } from "@/types/financial";
import { CompanySearchResult } from "@/types/search";

const API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/api/v3";

export type Exchange = 'ALL' | 'NYSE' | 'NASDAQ' | 'AMEX' | 'TSX' | 'LSE';

export async function searchCompanies(
  query: string, 
  limit: number = 10,
  exchange?: Exclude<Exchange, 'ALL'>
): Promise<CompanySearchResult[]> {
  try {
    const exchangeParam = exchange ? `&exchange=${exchange}` : '';
    const response = await fetch(
      `${BASE_URL}/search?query=${query}&limit=${limit}${exchangeParam}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to search companies');
    }

    const data = await response.json();
    return data as CompanySearchResult[];
  } catch (error) {
    console.error('Error searching companies:', error);
    throw error;
  }
}

export async function getIncomeStatement(symbol: string, period: 'annual' | 'quarter' = 'annual'): Promise<IncomeStatement[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/income-statement/${symbol}?period=${period}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch income statement');
    }

    const data = await response.json();
    return data as IncomeStatement[];
  } catch (error) {
    console.error('Error fetching income statement:', error);
    throw error;
  }
} 