
import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Background particles/orbs with enhanced visibility and performance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[25%] left-[20%] h-40 w-40 md:h-60 md:w-60 rounded-full bg-noesis-purple/30 blur-[60px] will-change-transform" 
          style={{ 
            animation: 'float 8s ease-in-out infinite',
            transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
            backfaceVisibility: 'hidden' // Prevent flicker
          }}
        ></div>
        <div 
          className="absolute top-[75%] left-[75%] h-60 w-60 md:h-80 md:w-80 rounded-full bg-noesis-blue/30 blur-[60px] will-change-transform" 
          style={{ 
            animation: 'float 10s ease-in-out infinite 1s',
            transform: 'translate3d(0, 0, 0)', 
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="absolute top-[50%] left-[50%] h-32 w-32 md:h-48 md:w-48 rounded-full bg-purple-400/30 blur-[60px] will-change-transform" 
          style={{ 
            animation: 'float 12s ease-in-out infinite 2s',
            transform: 'translate3d(0, 0, 0)', 
            backfaceVisibility: 'hidden'
          }}
        ></div>
      </div>
      
      {/* Add animation keyframes to index.css */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -15px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
      
      {/* Gradient overlay for smooth section transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-noesis-dark pointer-events-none"></div>
    </>
  );
};

export default HeroBackground;
