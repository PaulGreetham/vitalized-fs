import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  className?: string;
  size?: number;
}

export function CircularProgress({ 
  className,
  size = 80
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="rotate-[-90deg]" width={size} height={size}>
        <circle
          className="text-blue-100"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-blue-600 transition-[stroke-dashoffset] duration-700 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
} 