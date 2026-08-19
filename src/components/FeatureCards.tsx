import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface FeatureItem {
  number: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    number: '01',
    title: 'OPEN KITCHEN',
    description: 'Watch our chefs prepare every dish fresh to order.',
  },
  {
    number: '02',
    title: 'DAILY FRESH',
    description: 'Coffee brewed, pastries baked and meals cooked fresh.',
  },
  {
    number: '03',
    title: 'NAKURU LOCATION',
    description: 'Tropical House, Moi Road — behind Gilanis Supermarket, beside Nakuru GPO.',
  },
  {
    number: '04',
    title: 'ORDER NOW',
    description: 'Order via WhatsApp or Glovo for pickup or delivery.',
  },
];

interface FeatureCardsProps {
  onNavigateMenu?: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigateMenu }) => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-[4%] left-[2%] w-14 sm:w-20 opacity-[0.10]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <ellipse cx="50" cy="50" rx="35" ry="22" />
          <path d="M50 28 C60 28 72 40 72 50 C72 60 60 72 50 72 C40 72 28 60 28 50 C28 40 40 28 50 28Z" />
          <path d="M50 50 L50 72" strokeDasharray="4 4" />
        </svg>

        <svg
          className="absolute bottom-[8%] right-[3%] w-12 sm:w-16 opacity-[0.08] hidden sm:block"
          viewBox="0 0 80 120"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <path d="M40 10 C20 10 10 40 10 70 C10 100 25 115 40 115 C55 115 70 100 70 70 C70 40 60 10 40 10Z" />
          <path d="M40 30 L40 100" strokeDasharray="3 3" />
        </svg>

        <div className="absolute top-[30%] right-[8%] w-2 h-2 rounded-full bg-[#d97a4c] opacity-20 hidden lg:block" />
        <div className="absolute bottom-[25%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#d97a4c] opacity-15 hidden lg:block" />
      </div>

      <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            WHY BAKEMART
          </span>
          <h2 className="text-charcoal-lg font-black text-3xl sm:text-4xl lg:text-5xl text-[#000000] mt-3 tracking-tight">
            THE OPEN-KITCHEN EXPERIENCE
          </h2>
          <div className="w-10 h-1 bg-[#d97a4c] rounded-full mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#5c4b3f] mt-4 max-w-lg mx-auto leading-relaxed">
            Fresh food, open preparation and the kind of room that keeps you lingering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#f8f1e5]">
              <img
                src="/space.jpeg"
                alt="Open kitchen space at BakeMart Coffee House"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/gallery-16.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group py-5 sm:py-6 ${
                    feature.title === 'ORDER NOW' && onNavigateMenu ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  onClick={() => {
                    if (feature.title === 'ORDER NOW' && onNavigateMenu) {
                      onNavigateMenu();
                    }
                  }}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="font-serif font-black text-2xl sm:text-3xl text-[#d97a4c] leading-none mt-0.5">
                      {feature.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-charcoal font-black text-base sm:text-lg text-[#000000] tracking-tight">
                          {feature.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-[#d97a4c] transition-transform duration-200 group-hover:translate-x-1 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#5c4b3f] leading-relaxed mt-1.5 max-w-md">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
