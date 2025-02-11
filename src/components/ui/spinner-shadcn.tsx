import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function SpinnerShadcn({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-24 w-24 animate-spin text-blue-600", className)} />
  );
} 