
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
      setTimeout(() => {
        setTransitionStage('fadeIn');
        setDisplayLocation(location);
      }, 300); // match this with your CSS transition time
    }
  }, [location, displayLocation]);

  return (
    <div
      className={cn(
        'transition-opacity duration-300 ease-in-out min-h-screen',
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
