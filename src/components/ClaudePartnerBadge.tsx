import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

const BADGE_WIDTH = 400;
const BADGE_HEIGHT = 270;

const ClaudePartnerBadge = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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

  useEffect(() => {
    if (!cardRef.current || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setScale(Math.min(width / BADGE_WIDTH, 1));
      }
    });

    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex justify-center">
      <Card
        ref={cardRef}
        className="w-full max-w-[400px] h-auto overflow-hidden p-0 rounded-lg shadow-lg border border-border/50 bg-[hsl(var(--badge-surface))]"
      >
        <div
          className="relative"
          style={{ width: '100%', height: `${BADGE_HEIGHT * scale}px` }}
        >
          <div
            ref={containerRef}
            className="origin-top-left"
            style={{ width: BADGE_WIDTH, height: BADGE_HEIGHT, transform: `scale(${scale})` }}
            data-iframe-width={BADGE_WIDTH}
            data-iframe-height={BADGE_HEIGHT}
            data-share-badge-id="adecb53c-14e3-4db9-8e1d-138d15bc9fd8"
            data-share-badge-host="https://www.credly.com"
          />
        </div>
      </Card>
    </div>
  );
};

export default ClaudePartnerBadge;