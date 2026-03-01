import { NextResponse } from "next/server";

import { fetchFmpJson, FmpRequestError } from "@/lib/server/fmp";
import { CashFlowStatement } from "@/types/financial";

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
      "/cash-flow-statement",
      {
        symbol,
        limit: 4,
      }
    );

    const normalized: CashFlowStatement[] = (Array.isArray(data) ? data : []).map((item) => {
      const providedInvesting = Number(item.netCashProvidedByInvestingActivities ?? 0);
      const providedFinancing = Number(item.netCashProvidedByFinancingActivities ?? 0);
      const date = String(item.date ?? "");

      return {
        ...(item as unknown as CashFlowStatement),
        fillingDate: String(item.filingDate ?? item.fillingDate ?? ""),
        calendarYear: String(item.fiscalYear ?? item.calendarYear ?? date.slice(0, 4)),
        otherInvestingActivites: Number(
          item.otherInvestingActivites ?? item.otherInvestingActivities ?? 0
        ),
        otherFinancingActivites: Number(
          item.otherFinancingActivites ?? item.otherFinancingActivities ?? 0
        ),
        dividendsPaid: Number(
          item.dividendsPaid ?? item.netDividendsPaid ?? item.commonDividendsPaid ?? 0
        ),
        netCashUsedForInvestingActivites: Number(
          item.netCashUsedForInvestingActivites ?? -providedInvesting
        ),
        netCashUsedProvidedByFinancingActivities: Number(
          item.netCashUsedProvidedByFinancingActivities ?? -providedFinancing
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
      { error: "Unexpected error while loading cash flow statement", status: 500 },
      { status: 500 }
    );
  }
}
