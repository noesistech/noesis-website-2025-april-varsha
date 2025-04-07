
import React from 'react';

interface MissionStylesProps {
  gridRows: number;
  gridCols: number;
}

const MissionStyles = ({ gridRows, gridCols }: MissionStylesProps) => {
  return (
    <style>
      {`
        .pattern-fade-top {
          position: absolute;
          top: -150px;
          left: 0;
          right: 0;
          height: 450px;
          background: linear-gradient(to bottom, #1A1F2C 100%, rgba(26, 31, 44, 0.8) 100%, rgba(26, 31, 44, 0) 100%);
          z-index: 2;
        }
        
        .pattern-fade-bottom {
          position: absolute;
          bottom: -150px;
          left: 0;
          right: 0;
          height: 450px;
          background: linear-gradient(to top, #1A1F2C 100%, rgba(26, 31, 44, 0.8) 100%, rgba(26, 31, 44, 0) 100%);
          z-index: 2;
        }
        
        .pattern-grid {
          position: absolute;
          top: -100px;
          left: 0;
          right: 0;
          bottom: -100px;
          display: grid;
          grid-template-columns: repeat(${gridCols}, 1fr);
          grid-template-rows: repeat(${gridRows * 2}, 1fr);
          animation: moveUp 60s linear infinite;
          z-index: 1;
          height: calc(200% + 200px);
          transform-origin: top center;
          opacity: 0.6;
        }
        
        .grid-cell {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.1;
          transition: all 0.5s ease;
          animation: pulseOpacity 8s ease-in-out infinite;
        }
        
        .grid-cell svg {
          width: 28px;
          height: 28px;
        }
        
        @media (min-width: 768px) {
          .grid-cell svg {
            width: 38px;
            height: 38px;
          }
        }
        
        .sparkle-icon {
          color: #a074ff;
        }
        
        .zap-icon {
          color: #4ea7ff;
        }
        
        @keyframes moveUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes pulseOpacity {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }
        
        .promise-text {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          line-height: 1.2;
        }
        
        .promise-text.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .gradient-word {
          position: relative;
          display: inline-block;
        }
        
        .gradient-word::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #a074ff, #4ea7ff, #2fcbcf);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.2s ease;
        }
        
        .promise-text.animate-in .gradient-word::after {
          transform: scaleX(1);
          transition-delay: 0.8s;
        }
        
        .text-word {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .text-word:hover {
          transform: translateY(-5px);
        }
        
        .text-word-highlight {
          display: inline-block;
          position: relative;
        }
        
        .text-word-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #a074ff, #4ea7ff);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        
        .promise-text.animate-in .text-word-highlight::after {
          transform: scaleX(1);
          transition-delay: 0.5s;
        }
        
        .promise-glass-panel {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          box-shadow: 
            0 4px 30px rgba(0, 0, 0, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.05);
          transform-style: preserve-3d;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }
        
        .refraction-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05),
            rgba(134, 123, 255, 0.05),
            rgba(64, 153, 255, 0.08)
          );
          transform: translateZ(-10px);
          pointer-events: none;
          opacity: 0.7;
          mix-blend-mode: screen;
        }
        
        .glass-highlight {
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(255, 255, 255, 0.15),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        
        .promise-glass-panel:hover .glass-highlight {
          opacity: 1;
        }
        
        .section-title {
          @apply text-3xl md:text-4xl font-bold mb-6 text-center relative;
        }
        
        .section-title::after {
          content: '';
          @apply absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-1 bg-noesis-purple rounded-full mt-2;
          bottom: -12px;
        }
      `}
    </style>
  );
};

export default MissionStyles;
