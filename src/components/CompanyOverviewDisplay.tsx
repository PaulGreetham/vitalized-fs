import React from 'react';
import { CompanySearchResult } from '@/types/search';

interface CompanyOverviewDisplayProps {
  selectedCompany: CompanySearchResult;
}

export function CompanyOverviewDisplay({ selectedCompany }: CompanyOverviewDisplayProps) {
  return (
    <div className="grid gap-6 mt-10">
      <h2 className="text-2xl font-semibold">Company Overview</h2>
      <div className="grid gap-4">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Market Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Stock Price</h4>
              <p className="mt-1 text-xl text-gray-900">${selectedCompany.price?.toFixed(2) ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Market Cap</h4>
              <p className="mt-1 text-xl text-gray-900">${selectedCompany.mktCap ? (selectedCompany.mktCap / 1_000_000_000).toFixed(2) : 'N/A'}B</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Beta</h4>
              <p className="mt-1 text-xl text-gray-900">{selectedCompany.beta?.toFixed(2) ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Average Volume</h4>
              <p className="mt-1 text-xl text-gray-900">{selectedCompany.volAvg ? (selectedCompany.volAvg / 1_000_000).toFixed(1) : 'N/A'}M</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Dividend</h4>
              <p className="mt-1 text-xl text-gray-900">${selectedCompany.lastDiv?.toFixed(2) ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">52-Week Range</h4>
              <p className="mt-1 text-xl text-gray-900">{selectedCompany.range ?? 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Industry</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.industry ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Sector</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.sector ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">CEO</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.ceo ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Employees</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.fullTimeEmployees ? parseInt(selectedCompany.fullTimeEmployees).toLocaleString() : 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.phone ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-gray-500">IPO Date</h4>
              <p className="mt-1 text-gray-900">{selectedCompany.ipoDate ? new Date(selectedCompany.ipoDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="flex flex-col md:col-span-2 lg:col-span-3">
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="mt-1 text-gray-900">
                {selectedCompany.address && selectedCompany.city && selectedCompany.state && selectedCompany.zip
                  ? `${selectedCompany.address}, ${selectedCompany.city}, ${selectedCompany.state} ${selectedCompany.zip}`
                  : 'N/A'
                }
              </p>
            </div>
            <div className="flex flex-col md:col-span-2 lg:col-span-3">
              <h4 className="text-sm font-medium text-gray-500">Website</h4>
              {selectedCompany.website ? (
                <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" 
                   className="mt-1 text-blue-600 hover:underline">
                  {selectedCompany.website}
                </a>
              ) : (
                <p className="mt-1 text-gray-900">N/A</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-gray-700 leading-relaxed">{selectedCompany.description ?? 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
} 