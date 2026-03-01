const FMP_BASE_URL = "https://financialmodelingprep.com/stable";

export class FmpRequestError extends Error {
  readonly status: number;
  readonly details: string;

  constructor(message: string, status: number, details: string = "") {
    super(message);
    this.name = "FmpRequestError";
    this.status = status;
    this.details = details;
  }
}

function getApiKey() {
  const apiKey = process.env.FMP_API_KEY;

  if (!apiKey) {
    throw new FmpRequestError(
      "FMP_API_KEY is not configured on the server",
      500
    );
  }

  return apiKey;
}

function createUrl(path: string, query: Record<string, string | number>) {
  const url = new URL(`${FMP_BASE_URL}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  url.searchParams.set("apikey", getApiKey());
  return url.toString();
}

export async function fetchFmpJson<T>(
  path: string,
  query: Record<string, string | number>
): Promise<T> {
  const url = createUrl(path, query);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new FmpRequestError("FMP upstream request failed", response.status, details);
  }

  return (await response.json()) as T;
}
