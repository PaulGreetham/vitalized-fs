import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe } from "@/components/magicui/globe";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-600 to-blue-800 text-white px-4 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto relative z-10 pt-24">
        <h1 className="text-6xl font-bold mb-6">Vitalized FS</h1>
        <p className="text-xl mb-12 text-blue-100">
          Search for listed companies key financial metrics.
        </p>
        <div className="space-y-4 mb-40">
          <Link href="/dashboard">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg">
              Launch Dashboard
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-[25%] w-full">
          <Globe />
        </div>
      </div>
    </div>
  );
} 