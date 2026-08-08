import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative bg-[#fdfaf3] pt-6 md:pt-10 pb-16 md:pb-24 overflow-hidden">
      {/* Warm, bright editorial background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf3] via-[#f8f1e5] to-[#f5efe7]" />
        <img
          src="/open-kitchen.jpeg"
          alt="Open Kitchen"
          className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#e6d3c2] text-[#1a120b] text-[10px] font-bold px-3.5 py-1.5 rounded-full">
              <span className="text-[#d4a35a]">●</span>
              <span>Open-Kitchen Coffee Shop — Nakuru City</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#1a120b] leading-[0.95] tracking-tight">
              BakeMart Coffee House
              <span className="block text-[#d4a35a] font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl mt-2">
                Beyond Sweetness — It&apos;s Fresh and Nutritional
              </span>
            </h1>

            <p className="text-[#5c4b3f] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Fresh coffee, open-kitchen meals, and honest flavors — served daily in Nakuru.
            </p>

            {/* Rating & Hours */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-[#5c4b3f]">
              <span className="flex items-center gap-1.5 bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <span className="text-[#d4a35a]">★</span>
                <span>Rated 5.0 on Google</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#d4a35a]" />
                <span>Open Daily — Closes at 8 PM</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onScrollToMenu}
                className="bg-[#1a120b] hover:bg-[#2b1b12] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-[#d4a35a]" />
              </button>

              <a
                href="https://wa.me/254725009708"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-[#f8f1e5] text-[#1a120b] border border-[#e6d3c2] font-bold text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
              >
                <span>WhatsApp: 0725 009 708</span>
              </a>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border border-[#e6d3c2] shadow-lg bg-[#f8f1e5] aspect-[4/3]">
                <img
                  src="/open-kitchen.jpeg"
                  alt="Open Kitchen"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/40 via-transparent to-transparent" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-[#e6d3c2] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8c7a6c] font-bold">Open-Kitchen Special</span>
                      <h4 className="font-serif font-bold text-base text-[#1a120b] mt-0.5">BakeMart Special</h4>
                    </div>
                    <span className="bg-[#1a120b] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                      Fresh Daily
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
