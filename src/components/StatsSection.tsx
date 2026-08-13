import React from 'react';

interface StatsItem {
  number: string;
  label: string;
}

const stats: StatsItem[] = [
  { number: '12+', label: 'YEARS OF CRAFT' },
  { number: '202+', label: 'MENU FAVOURITES' },
  { number: '5.0', label: 'CUSTOMER RATING' },
  { number: 'DAILY', label: 'FRESHLY PREPARED' },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#FAF3E7]">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-[#e6d3c2]" />
        <div className="py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center ${
                  index < stats.length - 1
                    ? 'md:border-r md:border-[#e6d3c2]'
                    : ''
                }`}
              >
                <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#d97a4c]">
                  {stat.number}
                </div>
                <div className="text-[10px] sm:text-xs text-[#000000] font-bold mt-1.5 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-[#e6d3c2]" />
      </div>
    </section>
  );
};
