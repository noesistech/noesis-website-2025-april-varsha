
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        return next > 100 ? 100 : next;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[70vh] bg-noesis-dark relative",
        className
      )}
      {...props}
    >
      {/* Site outline lithograph */}
      <div className="w-full max-w-4xl mx-auto relative">
        {/* Animated outline container */}
        <div className="relative overflow-hidden">
          {/* Header outline */}
          <div 
            className="h-16 border-b border-white/20 mb-8 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" 
            style={{ animationDelay: "0.1s" }}
          />

          {/* Hero section outline */}
          <div 
            className="h-80 border border-white/20 rounded-lg mb-12 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] flex items-center justify-center"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-1/2 h-1/2 border border-white/10 rounded-lg opacity-60" />
          </div>

          {/* Content sections outlines - animates in sequence */}
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div 
              key={index} 
              className="h-48 border border-white/20 rounded-lg mb-8 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] flex"
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              <div className="w-1/3 border-r border-white/10" />
              <div className="w-2/3 flex flex-wrap p-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-1/2 h-16 p-2">
                    <div className="h-full border border-white/10 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer outline */}
          <div 
            className="h-24 border-t border-white/20 mt-8 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
            style={{ animationDelay: "1.7s" }}
          />
        </div>
      </div>
      
      {/* Loading message and progress */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-6 z-10">
        <div className="text-center">
          <h3 className="text-xl font-medium mb-3 text-white/90">
            Loading your experience
          </h3>
        </div>
        
        {/* Progress bar with subtle gradient */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
