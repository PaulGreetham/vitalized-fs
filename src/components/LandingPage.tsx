import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import dashboardPreview from "@/assets/images/dashboard-preview.png";

export function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-4 py-10 relative z-10">
        {/* Left side: Text content */}
        <div className="flex flex-col space-y-6 pl-6 md:pl-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">Vitalized FS</h1>
          <p className="text-xl text-gray-600">
            Search for listed companies key financial metrics
          </p>
          <p className="text-gray-500 max-w-md">
            Access comprehensive financial data, interactive charts, and detailed statements for thousands of companies in one powerful dashboard.
          </p>
          <div className="pt-4">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Launch
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side: Image with subtle shadow */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-lg relative-lg overflow-hidden bg-white/50 backdrop-blur-sm p-4">
            <Image 
              src={dashboardPreview} 
              alt="Dashboard Preview"
              width={500}
              height={400}
              priority
              className="object-contain"
              style={{ maxHeight: '80vh' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 