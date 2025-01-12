import { IncomeStatement } from "@/types/financial";
import { CompanySearchResult } from "@/types/search";

const API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY;
const BASE_URL = "https://financialmodelingprep.com/api/v3";

export type Exchange = 'ALL' | 'NYSE' | 'NASDAQ' | 'AMEX' | 'TSX' | 'LSE';

export async function searchCompanies(
  query: string, 
  limit: number = 10
): Promise<CompanySearchResult[]> {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  try {
    const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to search companies');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }
    
    // Filter out any results without required fields
    const validResults = data.filter((item: CompanySearchResult) => 
      item.symbol && 
      item.name && 
      !item.symbol.includes('.')  // Exclude symbols with extensions
    );

    // Sort results to prioritize exact matches
    return validResults.sort((a, b) => {
      const aExactMatch = a.symbol === query.toUpperCase();
      const bExactMatch = b.symbol === query.toUpperCase();
      const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });
  } catch (error) {
    throw error;
  }
}

export async function getCompanyBySymbol(symbol: string): Promise<CompanySearchResult> {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const url = `${BASE_URL}/profile/${symbol}?apikey=${API_KEY}`;
  console.log('Fetching company profile from:', url);
  
  const response = await fetch(url);
  console.log('Profile API response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Profile API error:', errorText);
    throw new Error('Failed to fetch company details');
  }

  const data = await response.json();
  console.log('Raw profile data:', data);

  if (!data || data.length === 0) {
    throw new Error('Company not found');
  }

  const profile = data[0];
  const result = {
    symbol: profile.symbol,
    name: profile.companyName,
    currency: profile.currency,
    exchangeShortName: profile.exchangeShortName,
    stockExchange: profile.exchange,
    price: profile.price,
    beta: profile.beta,
    volAvg: profile.volAvg,
    mktCap: profile.mktCap,
    lastDiv: profile.lastDiv,
    range: profile.range,
    changes: profile.changes,
    industry: profile.industry,
    sector: profile.sector,
    ceo: profile.ceo,
    website: profile.website,
    description: profile.description,
    fullTimeEmployees: profile.fullTimeEmployees,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    country: profile.country,
    phone: profile.phone,
    ipoDate: profile.ipoDate,
    isActivelyTrading: profile.isActivelyTrading
  };

  console.log('Transformed company data:', result);
  return result;
}

export async function getIncomeStatement(symbol: string): Promise<IncomeStatement[]> {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const url = `${BASE_URL}/income-statement/${symbol}?limit=4&apikey=${API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch income statement');
  }

  const data = await response.json();
  return data;
} 