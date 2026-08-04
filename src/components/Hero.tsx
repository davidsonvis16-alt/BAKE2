import React from 'react';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <div className="relative bg-[#000000] text-white pt-6 md:pt-10 pb-16 md:pb-20">
      <div className="absolute inset-0 z-0">
        <img
          src="/open-kitchen.jpeg"
          alt="Open Kitchen"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            {/* Open Kitchen Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20">
              <span>Open-Kitchen Coffee Shop in Nakuru City</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight">
              BakeMart Coffee House <br />
              <span className="text-orange-300 font-serif italic font-normal text-xl sm:text-2xl lg:text-3xl">
                Beyond Sweetness It's Fresh and Nutritional
              </span>
            </h1>

            <p className="text-orange-200 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              The only open-kitchen coffee shop in Nakuru City. Watch our chefs craft your meals fresh daily in a trendy, relaxing, serene, and cozy atmosphere.
            </p>

            {/* Quick highlights */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-orange-200">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <ShieldCheck className="w-4 h-4 text-orange-300" />
                Rated 5.0 on Google
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-orange-300" />
                Open Daily — Closes at 8 PM
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onScrollToMenu}
                className="bg-white hover:bg-neutral-200 text-black font-bold text-sm px-7 py-3 rounded-full shadow-md transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/254725009708"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-800 hover:bg-black text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all flex items-center gap-2"
              >
                <span>WhatsApp: 0725 009708</span>
              </a>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-black h-64 sm:h-80 md:h-88">
                <img
                  src="/open-kitchen.jpeg"
                  alt="Open Kitchen"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white flex items-center justify-between shadow-md z-20">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold">Open-Kitchen Special</span>
                    <h4 className="font-serif font-bold text-sm text-neutral-100">BakeMart Special</h4>
                  </div>
                  <span className="bg-black text-white font-bold text-xs px-2.5 py-1 rounded-md border border-white/20">
                    Fresh Daily
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Wavy Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-6 sm:h-8 text-[#FAF3E7]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};
