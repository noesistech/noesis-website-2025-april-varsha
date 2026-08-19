import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const ClaudePartnerBadge = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = '//cdn.credly.com/assets/utilities/embed.js';
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center px-4">
      <Card className="w-full max-w-[400px] h-[270px] overflow-hidden p-0 rounded-lg shadow-lg border border-border/50 bg-card">
        <div
          ref={containerRef}
          className="w-full h-full"
          data-iframe-width="400"
          data-iframe-height="270"
          data-share-badge-id="adecb53c-14e3-4db9-8e1d-138d15bc9fd8"
          data-share-badge-host="https://www.credly.com"
        />
      </Card>
    </div>
  );
};

export default ClaudePartnerBadge;
