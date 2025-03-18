
import React, { useEffect, useState } from "react";
import { Circle, Square, Triangle, Hexagon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Animation types for geometric shapes
type AnimationVariant = "pulse" | "rotate" | "bounce" | "morph" | "float";

// Define properties for our animated shapes
interface AnimatedShape {
  component: React.ReactNode;
  variant: AnimationVariant;
  position: string;
  delay: string;
  color: string;
  size?: string;
}

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
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  // Define animated shapes with various positions and animations
  const shapes: AnimatedShape[] = [
    {
      component: <Circle className="w-16 h-16 stroke-[1.5]" />,
      variant: "pulse",
      position: "top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2",
      delay: "delay-100",
      color: "text-noesis-purple"
    },
    {
      component: <Square className="w-20 h-20 stroke-[1.5]" />,
      variant: "rotate",
      position: "top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2",
      delay: "delay-300",
      color: "text-noesis-blue"
    },
    {
      component: <Triangle className="w-24 h-24 stroke-[1.5]" />,
      variant: "float",
      position: "bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2",
      delay: "delay-500",
      color: "text-purple-400"
    },
    {
      component: <Hexagon className="w-20 h-20 stroke-[1.5]" />,
      variant: "rotate",
      position: "bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2",
      delay: "delay-700",
      color: "text-noesis-teal"
    },
    {
      component: <Circle className="w-12 h-12 stroke-[1.5]" />,
      variant: "morph",
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      delay: "delay-200",
      color: "text-noesis-blue/80"
    },
    {
      component: <Star className="w-14 h-14 stroke-[1.5]" />,
      variant: "pulse",
      position: "bottom-1/3 left-1/2 -translate-x-1/2",
      delay: "delay-400",
      color: "text-noesis-purple/90"
    }
  ];

  // Animation classes for each variant
  const getAnimationClass = (variant: AnimationVariant) => {
    switch (variant) {
      case "pulse":
        return "animate-[pulse_2.5s_ease-in-out_infinite]";
      case "rotate":
        return "animate-[spin_7s_linear_infinite]";
      case "bounce":
        return "animate-[bounce_2s_ease-in-out_infinite]";
      case "morph":
        return "animate-[scale_3s_ease-in-out_infinite]";
      case "float":
        return "animate-[float_6s_ease-in-out_infinite]";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/70 via-noesis-blue/10 to-noesis-dark/50 animate-[pulse_7s_ease-in-out_infinite] opacity-50"></div>
      
      {/* Floating geometric shapes */}
      <div className="w-full h-full absolute inset-0">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={cn(
              "absolute",
              shape.position,
              getAnimationClass(shape.variant),
              shape.delay,
              shape.color,
              "opacity-80 transition-all duration-1000"
            )}
          >
            {shape.component}
          </div>
        ))}
      </div>
      
      {/* Loading message and progress */}
      <div className="flex flex-col items-center justify-center gap-6 z-10 mt-20">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-noesis-purple to-noesis-blue bg-clip-text text-transparent">
            Creating Your Experience
          </h3>
          <p className="text-white/70">Please wait while we craft your content</p>
        </div>
        
        {/* Progress bar with gradient */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mt-3">
          <div 
            className="h-full bg-gradient-to-r from-noesis-purple via-noesis-blue to-noesis-teal rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
