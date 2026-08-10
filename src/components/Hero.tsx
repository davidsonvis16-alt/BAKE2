import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-[#fdfaf3] lg:min-h-[460px] flex items-center pt-6 md:pt-10 pb-12 md:pb-16">
      {/* Desktop hero background image */}
      <img
        src="/gallery-16.jpg"
        alt="BakeMart café interior"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Left cream gradient overlay for desktop readability */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#fdfaf3] via-[#fdfaf3]/70 to-transparent" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 lg:bg-white border border-[#e6d3c2] text-[#1a120b] text-[10px] font-bold px-3.5 py-1.5 rounded-full">
              <span className="text-[#d4a35a]">●</span>
              <span>Nakuru’s Cozy Open-Kitchen Café</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-[2.75rem] sm:text-5xl lg:text-6xl text-[#1a120b] leading-[0.95] tracking-tight">
              Where Every Corner
              <span className="block text-[#d4a35a] font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl mt-2">
                Tells a Story
              </span>
            </h1>

            <p className="text-[#5c4b3f] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Step into a warm, curated space — open kitchen, golden light, honest flavors, and the kind of atmosphere that keeps you lingering.
            </p>

            {/* Rating & Hours */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-[#5c4b3f]">
              <span className="flex items-center gap-1.5 bg-white/90 lg:bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <span className="text-[#d4a35a]">★</span>
                <span>Rated 5.0 on Google</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 lg:bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#d4a35a]" />
                <span>Open Daily · 7 AM – 8 PM</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onScrollToMenu}
                className="bg-[#1a120b] hover:bg-[#2b1b12] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 text-[#d4a35a]" />
              </button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-[#f8f1e5] text-[#1a120b] border border-[#e6d3c2] font-bold text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
              >
                <span>Visit Us</span>
              </a>
            </div>
          </div>

          {/* Right Image Feature (mobile only — desktop uses background) */}
          <div className="lg:col-span-7 lg:hidden">
            <div className="relative rounded-2xl overflow-hidden border border-[#e6d3c2] shadow-lg bg-[#f8f1e5] aspect-[4/3]">
              <img
                src="/gallery-16.jpg"
                alt="BakeMart café interior"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
