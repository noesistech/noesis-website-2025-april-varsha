
import React from "react";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

export function ErrorDisplay({ message, className }: ErrorDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[60vh]", className)}>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h3 className="text-red-800 font-semibold text-lg mb-2">Something went wrong</h3>
        <p className="text-red-700">{message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
