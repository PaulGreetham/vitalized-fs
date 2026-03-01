import { NextResponse } from "next/server";

import { fetchFmpJson, FmpRequestError } from "@/lib/server/fmp";
import { BalanceSheet } from "@/types/financial";

interface RouteParams {
  params: Promise<{ symbol: string }>;
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
    const data = await fetchFmpJson<Record<string, unknown>[]>(
      "/balance-sheet-statement",
      {
        symbol,
        limit: 4,
      }
    );

    const normalized: BalanceSheet[] = (Array.isArray(data) ? data : []).map((item) => {
      const date = String(item.date ?? "");
      return {
        ...(item as unknown as BalanceSheet),
        fillingDate: String(item.filingDate ?? item.fillingDate ?? ""),
        calendarYear: String(item.fiscalYear ?? item.calendarYear ?? date.slice(0, 4)),
        othertotalStockholdersEquity: Number(
          item.othertotalStockholdersEquity ?? item.otherTotalStockholdersEquity ?? 0
        ),
      };
    });

    return NextResponse.json(normalized);
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
      { error: "Unexpected error while loading balance sheet", status: 500 },
      { status: 500 }
    );
  }
}
