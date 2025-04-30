
import React from "react";

interface GradientCtaProps {
  children: React.ReactNode;
  height?: string;
  id?: string;
  onClick?: () => void;
}

const GradientCta = ({ children, height = "auto", id, onClick }: GradientCtaProps) => {
  return (
    <button
      id={id}
      className="bg-noesis-purple/30 border border-noesis-purple hover:bg-noesis-purple/40 text-white hover:scale-105 shadow-[0_0_10px_rgba(160,116,255,0.3)] px-4 py-2 rounded-md text-white font-medium flex items-center justify-center transition-all duration-300"
      style={{ height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GradientCta;
