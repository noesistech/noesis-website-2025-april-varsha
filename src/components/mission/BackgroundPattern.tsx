
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface BackgroundPatternProps {
  gridRows: number;
  gridCols: number;
}

const BackgroundPattern = ({ gridRows, gridCols }: BackgroundPatternProps) => {
  const totalRows = gridRows * 2;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="pattern-fade-top"></div>
      <div className="pattern-fade-bottom"></div>
      
      <div className="pattern-grid">
        {Array.from({ length: totalRows * gridCols }).map((_, index) => {
          const row = Math.floor(index / gridCols);
          const col = index % gridCols;
          const isEven = (row + col) % 2 === 0;
          const Icon = isEven ? Sparkles : Zap;
          const iconClass = isEven ? "sparkle-icon" : "zap-icon";
          
          return (
            <div 
              key={`grid-icon-${index}`} 
              className={`grid-cell ${iconClass}`}
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
                animationDelay: `${(row * col) % 5}s`
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundPattern;
