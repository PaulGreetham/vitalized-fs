import { NextRequest, NextResponse } from "next/server";

import { fetchFmpJson, FmpRequestError } from "@/lib/server/fmp";
import { CompanySearchResult } from "@/types/search";

interface FmpSearchItem {
  symbol?: string;
  name?: string;
  currency?: string;
  exchange?: string;
  exchangeFullName?: string;
}

function normalizeAndSortResults(rawData: FmpSearchItem[], query: string): CompanySearchResult[] {
  const validResults: CompanySearchResult[] = (Array.isArray(rawData) ? rawData : [])
    .filter((item) => item.symbol && item.name && !item.symbol.includes("."))
    .map((item) => ({
      symbol: item.symbol!,
      name: item.name!,
      currency: item.currency ?? "",
      exchangeShortName: item.exchange ?? "",
      stockExchange: item.exchangeFullName ?? item.exchange ?? "",
    }));

  const normalizedQuery = query.toUpperCase();
  return validResults.sort((a, b) => {
    const aExactMatch = a.symbol.toUpperCase() === normalizedQuery;
    const bExactMatch = b.symbol.toUpperCase() === normalizedQuery;
    const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
    const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());

    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim() ?? "";
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "10");

  if (!query) {
    return NextResponse.json(
      { error: "Missing required query parameter: query", status: 400 },
      { status: 400 }
    );
  }

  try {
    const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 10;
    const symbolRawData = await fetchFmpJson<FmpSearchItem[]>("/search-symbol", {
      query,
      limit: safeLimit,
    });

    let combinedRawData = Array.isArray(symbolRawData) ? symbolRawData : [];
    if (combinedRawData.length === 0) {
      const nameRawData = await fetchFmpJson<FmpSearchItem[]>("/search-name", {
        query,
        limit: safeLimit,
      });
      combinedRawData = Array.isArray(nameRawData) ? nameRawData : [];
    }

    const sorted = normalizeAndSortResults(combinedRawData, query);

    return NextResponse.json(sorted);
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
      { error: "Unexpected error while searching companies", status: 500 },
      { status: 500 }
    );
  }
}
