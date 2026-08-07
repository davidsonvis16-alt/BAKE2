import React from 'react';

interface FeatureCardsProps {
  onNavigateReservation?: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigateReservation }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      </div>
    </section>
  );
};
