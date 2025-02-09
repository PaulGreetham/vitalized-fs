import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 text-white px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Welcome to Vitalized FS</h1>
        <p className="text-xl mb-8 text-blue-100">
          Your comprehensive financial analysis platform for exploring company financials, 
          market data, and investment insights.
        </p>
        <div className="space-y-4">
          <Link href="/dashboard">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 