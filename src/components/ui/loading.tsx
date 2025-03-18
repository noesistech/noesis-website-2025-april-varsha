
import React, { useEffect, useState } from "react";
import { Circle, Square, Triangle, Hexagon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

// Animation types for geometric shapes
type AnimationVariant = "pulse" | "rotate" | "bounce" | "morph";

// Define properties for our animated shapes
interface AnimatedShape {
  component: React.ReactNode;
  variant: AnimationVariant;
  position: string;
  delay: string;
  color: string;
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
      component: <Circle className="w-10 h-10 stroke-[1.5]" />,
      variant: "pulse",
      position: "top-16 left-1/4",
      delay: "delay-100",
      color: "text-noesis-purple"
    },
    {
      component: <Square className="w-12 h-12 stroke-[1.5]" />,
      variant: "rotate",
      position: "top-24 right-1/4",
      delay: "delay-300",
      color: "text-noesis-blue"
    },
    {
      component: <Triangle className="w-16 h-16 stroke-[1.5]" />,
      variant: "pulse",
      position: "bottom-20 left-1/3",
      delay: "delay-500",
      color: "text-purple-400"
    },
    {
      component: <Hexagon className="w-14 h-14 stroke-[1.5]" />,
      variant: "rotate",
      position: "bottom-10 right-1/3",
      delay: "delay-700",
      color: "text-noesis-teal"
    }
  ];

  // Animation classes for each variant
  const getAnimationClass = (variant: AnimationVariant) => {
    switch (variant) {
      case "pulse":
        return "animate-[pulse_2s_ease-in-out_infinite]";
      case "rotate":
        return "animate-[spin_5s_linear_infinite]";
      case "bounce":
        return "animate-[bounce_1.5s_ease-in-out_infinite]";
      case "morph":
        return "animate-[scale_3s_ease-in-out_infinite]";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[60vh] relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/50 via-noesis-blue/5 to-noesis-dark/50 animate-[pulse_5s_ease-in-out_infinite] opacity-40"></div>
      
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
              "opacity-80"
            )}
          >
            {shape.component}
          </div>
        ))}
      </div>
      
      {/* Central loading animation */}
      <div className="flex flex-col items-center justify-center gap-6 z-10">
        <div className="relative">
          <Loader className="w-16 h-16 animate-spin text-noesis-purple" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-noesis-blue rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-noesis-purple to-noesis-blue bg-clip-text text-transparent">
            Creating Your Experience
          </h3>
          <p className="text-white/70">Please wait while we prepare your content</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-noesis-purple to-noesis-blue rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
