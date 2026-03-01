import { NextResponse } from "next/server";

import { fetchFmpJson, FmpRequestError } from "@/lib/server/fmp";
import { CompanySearchResult } from "@/types/search";

interface RouteParams {
  params: Promise<{ symbol: string }>;
}

interface FmpCompanyProfile {
  symbol: string;
  companyName: string;
  currency: string;
  exchangeFullName?: string;
  exchange: string;
  price?: number;
  beta?: number;
  averageVolume?: number;
  marketCap?: number;
  lastDividend?: number;
  range?: string;
  change?: number;
  industry?: string;
  sector?: string;
  ceo?: string;
  website?: string;
  description?: string;
  fullTimeEmployees?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  ipoDate?: string;
  isActivelyTrading?: boolean;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { symbol } = await params;

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing required path parameter: symbol", status: 400 },
      { status: 400 }
    );
  }

  try {
    const data = await fetchFmpJson<FmpCompanyProfile[]>("/profile", { symbol });
    const profile = data?.[0];

    if (!profile) {
      return NextResponse.json(
        { error: "Company not found", status: 404 },
        { status: 404 }
      );
    }

    const result: CompanySearchResult = {
      symbol: profile.symbol,
      name: profile.companyName,
      currency: profile.currency,
      exchangeShortName: profile.exchange,
      stockExchange: profile.exchangeFullName ?? profile.exchange,
      price: profile.price,
      beta: profile.beta,
      volAvg: profile.averageVolume,
      mktCap: profile.marketCap,
      lastDiv: profile.lastDividend,
      range: profile.range,
      changes: profile.change,
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
      isActivelyTrading: profile.isActivelyTrading,
    };

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof FmpRequestError) {
      return NextResponse.json(
        {
          error: error.message,
          status: error.status,
          details: error.details,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Unexpected error while loading company profile", status: 500 },
      { status: 500 }
    );
  }
}
