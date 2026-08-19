import React from 'react';
import ClaudePartnerBadge from './ClaudePartnerBadge';

const PartnerBadgeSection = () => {
  return (
    <section className="page-section overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="section-title">
            <span className="text-white">Claude</span>{' '}
            <span className="gradient-text">Partner Badge</span>
          </h2>
          <p className="section-subtitle">Proudly recognized as an official Anthropic Claude partner.</p>
        </div>
        
        <ClaudePartnerBadge />
      </div>
    </section>
  );
};

export default PartnerBadgeSection;
