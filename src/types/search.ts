export interface CompanySearchResult {
  symbol: string;
  name: string;
  currency: string;
  exchangeShortName: string;
  stockExchange: string;
  // Market Data
  price?: number;
  beta?: number;
  volAvg?: number;
  mktCap?: number;
  lastDiv?: number;
  range?: string;
  changes?: number;
  // Company Info
  industry?: string;
  sector?: string;
  ceo?: string;
  website?: string;
  description?: string;
  fullTimeEmployees?: string;
  // Address
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  // Additional Info
  ipoDate?: string;
  isActivelyTrading?: boolean;
} 