import React, { useEffect, useRef } from 'react';

const ClaudePartnerBadge = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = '//cdn.credly.com/assets/utilities/embed.js';
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    script.async = true;

    // Append to the container if available, otherwise fall back to body
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      // Leave the script in place; external embed handles its own iframe cleanup
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="w-[400px] h-[270px] overflow-hidden flex items-start justify-start rounded-lg shadow-lg bg-[hsl(var(--badge-surface))] [&>iframe]:scale-[1] [&>iframe]:origin-top-left [&>iframe]:bg-[hsl(var(--badge-surface))]"
      >
        <div
          ref={containerRef}
          data-iframe-width="400"
          data-iframe-height="270"
          data-share-badge-id="adecb53c-14e3-4db9-8e1d-138d15bc9fd8"
          data-share-badge-host="https://www.credly.com"
        />
      </div>
    </div>
  );


};

export default ClaudePartnerBadge;
