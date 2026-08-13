import React from 'react';

interface StatsItem {
  number: string;
  label: string;
}

const stats: StatsItem[] = [
  { number: '12+', label: 'Food Categories' },
  { number: '369+', label: 'Menu Items' },
  { number: '5.0', label: 'Google Rating' },
  { number: 'Daily', label: 'Freshly Cooked' },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#e6d3c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#d97a4c]">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-[#5c4b3f] font-semibold mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
