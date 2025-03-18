
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress - dramatically slowed down
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Very slow progress increments
        const increment = Math.random() * 0.8; // Even slower increment
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 1500); // longer interval between updates
    
    return () => clearInterval(interval);
  }, []);

  // Force minimum display time of 15 seconds
  useEffect(() => {
    const minDisplayTime = 15000; // 15 seconds minimum
    
    // Ensure progress doesn't reach 100% too quickly
    const slowProgressTimeout = setTimeout(() => {
      if (progress > 80) {
        // Slow down even more at the end
        setProgress(85);
      }
    }, minDisplayTime - 4000);
    
    return () => clearTimeout(slowProgressTimeout);
  }, [progress]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-noesis-darker to-noesis-dark fixed top-0 left-0 z-50",
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
            className="h-16 border-b border-white/20 mb-8 opacity-50"
          />

          {/* Hero section outline */}
          <div 
            className="h-80 border border-white/20 rounded-lg mb-12 opacity-50 flex items-center justify-center"
          >
            <div className="w-1/2 h-1/2 border border-white/10 rounded-lg opacity-50" />
          </div>

          {/* Content sections outlines - no animations to ensure visibility */}
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div 
              key={index} 
              className="h-48 border border-white/20 rounded-lg mb-8 opacity-50 flex"
            >
              <div className="w-1/3 border-r border-white/10" />
              <div className="w-2/3 flex flex-wrap p-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-1/2 h-16 p-2">
                    <div className="h-full border border-white/10 rounded-md opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer outline */}
          <div 
            className="h-24 border-t border-white/20 mt-8 opacity-50"
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
            className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-1500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
