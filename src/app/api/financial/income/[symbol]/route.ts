import { NextResponse } from "next/server";

import { fetchFmpJson, FmpRequestError } from "@/lib/server/fmp";
import { IncomeStatement } from "@/types/financial";

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
    const data = await fetchFmpJson<Record<string, unknown>[]>("/income-statement", {
      symbol,
      limit: 4,
    });

    const normalized: IncomeStatement[] = (Array.isArray(data) ? data : []).map((item) => {
      const revenue = Number(item.revenue ?? 0);
      const grossProfit = Number(item.grossProfit ?? 0);
      const ebitda = Number(item.ebitda ?? 0);
      const operatingIncome = Number(item.operatingIncome ?? 0);
      const incomeBeforeTax = Number(item.incomeBeforeTax ?? 0);
      const netIncome = Number(item.netIncome ?? 0);

      const safeRatio = (value: number) => (revenue !== 0 ? value / revenue : 0);
      const date = String(item.date ?? "");

      return {
        ...(item as unknown as IncomeStatement),
        fillingDate: String(item.filingDate ?? item.fillingDate ?? ""),
        calendarYear: String(item.fiscalYear ?? item.calendarYear ?? date.slice(0, 4)),
        grossProfitRatio: Number(item.grossProfitRatio ?? safeRatio(grossProfit)),
        ebitdaratio: Number(item.ebitdaratio ?? item.ebitdaRatio ?? safeRatio(ebitda)),
        operatingIncomeRatio: Number(
          item.operatingIncomeRatio ?? safeRatio(operatingIncome)
        ),
        incomeBeforeTaxRatio: Number(
          item.incomeBeforeTaxRatio ?? safeRatio(incomeBeforeTax)
        ),
        netIncomeRatio: Number(item.netIncomeRatio ?? safeRatio(netIncome)),
        epsdiluted: Number(item.epsDiluted ?? item.epsdiluted ?? 0),
        link: String(item.link ?? ""),
        finalLink: String(item.finalLink ?? ""),
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
      { error: "Unexpected error while loading income statement", status: 500 },
      { status: 500 }
    );
  }
}
