const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  compactDisplay: "short",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const normalized = value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatCurrency(value?: number | null): string {
  if (value === undefined || value === null || !Number.isFinite(value)) return "N/A";
  return currencyFormatter.format(value);
}

export function formatCurrencyCompact(value?: number | null): string {
  if (value === undefined || value === null || !Number.isFinite(value)) return "N/A";
  return compactCurrencyFormatter.format(value);
}

export function formatNumberCompact(value?: number | null): string {
  if (value === undefined || value === null || !Number.isFinite(value)) return "N/A";
  return compactNumberFormatter.format(value);
}

export function formatHumanDate(value?: string | null): string {
  if (!value) return "N/A";
  const parsed = parseDateInput(value);
  if (!parsed) return value;
  return dateFormatter.format(parsed);
}

export function formatHumanDateTime(value?: string | null): string {
  if (!value) return "N/A";
  const parsed = parseDateInput(value);
  if (!parsed) return value;
  return dateTimeFormatter.format(parsed);
}
