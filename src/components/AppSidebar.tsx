import {
  Home,
  BarChart3,
  Wallet,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompanySearchResult } from "@/types/search";

export interface AppSidebarProps {
  selectedCompany: CompanySearchResult | null;
}

export function AppSidebar({ selectedCompany }: AppSidebarProps) {
  const pathname = usePathname();

  if (!selectedCompany) {
    return null;
  }

  const links = [
    {
      href: `/overview/${selectedCompany.symbol}`,
      label: "Overview",
      icon: Home,
      pattern: '/overview'
    },
    {
      href: `/income/${selectedCompany.symbol}`,
      label: "Income",
      icon: BarChart3,
      pattern: '/income'
    },
    {
      href: `/balance/${selectedCompany.symbol}`,
      label: "Balance Sheet",
      icon: Wallet,
      pattern: '/balance'
    },
    {
      href: `/cash-flow/${selectedCompany.symbol}`,
      label: "Cash Flow",
      icon: LineChart,
      pattern: '/cash-flow'
    }
  ];

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-2 mt-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 ${
                pathname.includes(link.pattern) ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 