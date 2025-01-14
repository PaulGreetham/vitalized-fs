'use client';

import { Geist } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { CompanySearch } from "@/components/CompanySearch";
import { ContentDisplay } from "@/components/ContentDisplay";
import { useState, useEffect } from "react";
import { CompanySearchResult } from "@/types/search";
import { useRouter, usePathname } from "next/navigation";
import { getCompanyBySymbol } from "@/lib/api/financial";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout() {
  const [selectedCompany, setSelectedCompany] = useState<CompanySearchResult | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleCompanySelect = (company: CompanySearchResult) => {
    console.log('Company selected:', company);
    setSelectedCompany(company);
    router.push(`/overview/${company.symbol}`);
  };

  // Extract company symbol from URL and set selected company if needed
  useEffect(() => {
    async function fetchCompanyDetails() {
      console.log('Current pathname:', pathname);
      console.log('Current selectedCompany:', selectedCompany);
      
      if (pathname && selectedCompany === null) {
        const match = pathname.match(/\/(overview|income|balance|cash-flow)\/([A-Z]+)(?:\.[A-Z])?/);
        console.log('URL match:', match);
        
        if (match && match[2]) {
          try {
            const symbol = match[2];
            console.log('Fetching details for symbol:', symbol);
            const company = await getCompanyBySymbol(symbol);
            
            if (company) {
              console.log('Setting company details:', company);
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
    <html lang="en">
      <body className={geist.className}>
        {/* Fixed Header */}
        <Header />
        
        {/* Fixed Search Bar */}
        <div className="fixed top-14 left-0 right-0 bg-white border-b z-40 px-8 py-4">
          <CompanySearch 
            onCompanySelect={handleCompanySelect}
            selectedCompany={selectedCompany}
          />
        </div>

        {/* Main Layout Container */}
        <div className="fixed inset-0 pt-32">
          <div className="flex h-full">
            <SidebarProvider>
              {/* Static Sidebar */}
              <div className="w-64 flex-none border-r bg-white">
                <AppSidebar selectedCompany={selectedCompany} />
              </div>
              
              {/* Scrollable Main Content */}
              <main className="flex-1 overflow-y-auto pb-20">
                <ContentDisplay selectedCompany={selectedCompany} />
              </main>
            </SidebarProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
