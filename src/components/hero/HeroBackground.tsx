
import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Background particles/orbs - Modified to prevent rendering artifacts */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[25%] left-[20%] h-40 w-40 rounded-full bg-noesis-purple/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite',
               transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
               backfaceVisibility: 'hidden' // Prevent flicker
             }}></div>
        <div className="absolute top-[75%] left-[75%] h-60 w-60 rounded-full bg-noesis-blue/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite 1s',
               transform: 'translate3d(0, 0, 0)', 
               backfaceVisibility: 'hidden'
             }}></div>
        <div className="absolute top-[50%] left-[50%] h-32 w-32 rounded-full bg-purple-400/20 blur-[40px] will-change-transform" 
             style={{ 
               animation: 'float 6s ease-in-out infinite 2s',
               transform: 'translate3d(0, 0, 0)', 
               backfaceVisibility: 'hidden'
             }}></div>
      </div>
      
      {/* Gradient overlay for smooth section transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-noesis-dark pointer-events-none"></div>
    </>
  );
};

export default HeroBackground;
