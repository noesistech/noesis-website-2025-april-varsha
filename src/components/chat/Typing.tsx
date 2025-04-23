
import React, { useEffect } from 'react';
import { useMessageContext } from '@/contexts/MessageContext';

const Typing = () => {
  const { isTyping } = useMessageContext();

  useEffect(() => {
    console.log("Typing component rendered, isTyping:", isTyping);
  }, [isTyping]);

  // If not typing, don't render anything
  if (!isTyping) return null;

  return (
    <div className='flex items-center gap-2'>
      <div className="loader">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Typing;
