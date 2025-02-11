'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CompanySearchResult } from "@/types/search";
import { getCompanyBySymbol } from "@/lib/api/financial";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { CompanySearch } from "@/components/CompanySearch";
import { ContentDisplay } from "@/components/ContentDisplay";

export function DashboardLayout() {
  const [selectedCompany, setSelectedCompany] = useState<CompanySearchResult | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleCompanySelect = (company: CompanySearchResult) => {
    setSelectedCompany(company);
    router.push(`/overview/${company.symbol}`);
  };

  // Extract company symbol from URL and set selected company if needed
  useEffect(() => {
    async function fetchCompanyDetails() {
      
      if (pathname && selectedCompany === null) {
        const match = pathname.match(/\/(overview|income|balance|cash-flow)\/([A-Z]+)(?:\.[A-Z])?/);
        
        if (match && match[2]) {
          try {
            const symbol = match[2];
            const company = await getCompanyBySymbol(symbol);
            
            if (company) {
              setSelectedCompany(company);
            } else {
              console.log('No company details returned');
            }
          } catch (error) {
            console.error('Failed to fetch company details:', error);
            router.push('/');
          }
        }
      }
    }

    fetchCompanyDetails();
  }, [pathname, selectedCompany, router]);

  return (
    <>
      <Header />
      <div className="fixed top-14 left-0 right-0 bg-white border-b z-40 px-8 py-4">
        <CompanySearch 
          onCompanySelect={handleCompanySelect}
          selectedCompany={selectedCompany}
        />
      </div>
      <div className="fixed inset-0 pt-32">
        <div className="flex h-full">
          <SidebarProvider>
            <div className="w-64 flex-none border-r bg-white">
              <AppSidebar selectedCompany={selectedCompany} />
            </div>
            <main className="flex-1 overflow-y-auto pb-20">
              <ContentDisplay selectedCompany={selectedCompany} />
            </main>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
}