
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
      className="gradient-button px-4 py-2 rounded-md text-white font-medium flex items-center justify-center"
      style={{ height, background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GradientCta;
