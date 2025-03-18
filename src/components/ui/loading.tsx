
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress - slowed down
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5; // slower progress increments
        return next > 100 ? 100 : next;
      });
    }, 500); // longer interval between updates
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-noesis-darker to-noesis-dark relative",
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
            className="h-16 border-b border-white/20 mb-8 opacity-0 animate-[fadeIn_1.2s_ease-in-out_forwards]" 
            style={{ animationDelay: "0.3s" }}
          />

          {/* Hero section outline */}
          <div 
            className="h-80 border border-white/20 rounded-lg mb-12 opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards] flex items-center justify-center"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="w-1/2 h-1/2 border border-white/10 rounded-lg opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]" style={{ animationDelay: "1.5s" }} />
          </div>

          {/* Content sections outlines - animates in sequence with slower timing */}
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div 
              key={index} 
              className="h-48 border border-white/20 rounded-lg mb-8 opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards] flex"
              style={{ animationDelay: `${1.8 + index * 0.4}s` }}
            >
              <div className="w-1/3 border-r border-white/10 opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]" style={{ animationDelay: `${2.0 + index * 0.4}s` }} />
              <div className="w-2/3 flex flex-wrap p-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-1/2 h-16 p-2">
                    <div className="h-full border border-white/10 rounded-md opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]" style={{ animationDelay: `${2.2 + index * 0.4 + i * 0.15}s` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer outline */}
          <div 
            className="h-24 border-t border-white/20 mt-8 opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]"
            style={{ animationDelay: "4.0s" }}
          />
        </div>
      </div>
      
      {/* Loading message and progress - gradually appears */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-6 z-10 opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]" style={{ animationDelay: "0.5s" }}>
        <div className="text-center">
          <h3 className="text-xl font-medium mb-3 text-white/90">
            Loading your experience
          </h3>
        </div>
        
        {/* Progress bar with subtle gradient - smoother animation */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

