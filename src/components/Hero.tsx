import React from 'react';
import { ArrowRight, Star, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-[5%] left-[3%] w-16 sm:w-24 opacity-[0.12]"
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
          className="absolute top-[12%] right-[8%] w-12 sm:w-20 opacity-[0.10]"
          viewBox="0 0 80 120"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <path d="M40 10 C20 10 10 40 10 70 C10 100 25 115 40 115 C55 115 70 100 70 70 C70 40 60 10 40 10Z" />
          <path d="M40 30 L40 100" strokeDasharray="3 3" />
        </svg>

        <svg
          className="absolute bottom-[10%] left-[6%] w-14 sm:w-28 opacity-[0.10]"
          viewBox="0 0 120 80"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <path d="M20 40 Q40 10 60 40 T100 40" />
          <path d="M30 60 Q50 30 70 60 T110 60" />
          <circle cx="40" cy="40" r="3" />
          <circle cx="70" cy="50" r="2" />
          <circle cx="90" cy="35" r="3" />
        </svg>

        <svg
          className="absolute bottom-[15%] right-[4%] w-10 sm:w-16 opacity-[0.10] sm:block hidden"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <path d="M50 15 C30 15 15 35 15 55 C15 75 30 90 50 90 C70 90 85 75 85 55 C85 35 70 15 50 15Z" />
          <path d="M50 35 L50 75" strokeDasharray="4 4" />
          <path d="M35 50 L65 50" strokeDasharray="4 4" />
        </svg>

        <svg
          className="absolute top-[45%] left-[2%] w-8 sm:w-14 opacity-[0.08] lg:block hidden"
          viewBox="0 0 60 100"
          fill="none"
          stroke="#1a120b"
          strokeWidth="2"
        >
          <path d="M30 5 C15 5 5 25 5 50 C5 75 15 95 30 95 C45 95 55 75 55 50 C55 25 45 5 30 5Z" />
          <path d="M30 20 L30 80" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-14">
          <div className="lg:col-span-5 relative z-20 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 bg-[#f8f1e5] border border-[#e6d3c2] text-[#000000] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5 sm:mb-6 text-charcoal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97a4c]" />
              Est. Moi Road, Nakuru
            </div>

            <h1 className="font-black text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] text-[#000000] leading-[0.92] tracking-tight text-charcoal-lg">
              Coffee House &amp;
              <br />
              Bakery in
              <br />
              <span className="text-[#d97a4c] italic font-normal text-[1.5rem] sm:text-3xl md:text-4xl lg:text-[3.25rem]">Nakuru</span>
            </h1>

            <p className="text-[#5c4b3f] text-sm sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed mt-5 sm:mt-6 text-charcoal">
              Open-kitchen cooking, fresh pastries, honest flavour, and the kind of room that
              keeps you lingering. From coffee and flame-grilled chicken to hand-stretched
              pizza — nothing here is rushed. Located on Moi Road, Tropical House, Nakuru.
            </p>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6 sm:mt-7"
            >
              <button
                onClick={onScrollToMenu}
                className="bg-[#000000] hover:bg-[#2b1b12] text-white font-black text-sm px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] active:scale-[0.97]"
              >
                View Menu
                <ArrowRight className="w-4 h-4" style={{ color: '#d97a4c' }} />
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-[#f8f1e5] text-[#000000] border border-[#e6d3c2] font-bold text-sm px-6 py-3.5 sm:px-7 sm:py-4 rounded-full transition-all"
              >
                Visit Us
              </a>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-[#e6d3c2] max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#5c4b3f]">
                <Star className="w-3.5 h-3.5 text-[#d97a4c] fill-[#d97a4c]" />
                5.0 on Google
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#5c4b3f]">
                <Clock className="w-3.5 h-3.5 text-[#d97a4c]" />
                7 AM – 8 PM Daily
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative z-20 mt-2 sm:mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-[85%] sm:max-w-sm lg:max-w-none">
              <div className="relative w-full mx-auto">
                <img
                  src="/menu-item-cutout.png"
                  alt="Signature BakeMart dish"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.25))' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="absolute top-1 right-0 sm:top-0 sm:right-2 lg:right-4 z-30">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-[#d97a4c] flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.35)] border-2 border-[#000000]">
                  <span
                    className="text-center text-[10px] sm:text-[11px] lg:text-[13px] font-black uppercase leading-tight text-[#000000] px-2 text-charcoal"
                  >
                    Baked
                    <br />
                    Fresh
                    <br />
                    Daily
                  </span>
                </div>
              </div>

              <div
                className="absolute top-[28%] -right-2 sm:-right-3 lg:-right-6 max-w-[130px] sm:max-w-[150px] lg:max-w-[170px] bg-white rounded-2xl px-2.5 py-2.5 sm:px-4 sm:py-3.5 shadow-[0_16px_30px_rgba(0,0,0,0.35)] border border-[#e6d3c2] z-30"
              >
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-[#d97a4c] fill-[#d97a4c]" />
                  ))}
                </div>
                <p className="text-[10px] sm:text-[11px] leading-snug text-[#000000] font-semibold text-charcoal">
                  "Best flame-grilled chicken in Nakuru, hands down."
                </p>
                <p className="text-[8px] sm:text-[9px] text-[#8c7a6c] font-bold mt-1">— Google review</p>
              </div>

              <div
                className="absolute bottom-[2%] left-0 sm:-left-4 lg:-left-6 bg-white rounded-2xl px-2.5 py-2 sm:px-4 sm:py-3 shadow-[0_16px_30px_rgba(0,0,0,0.35)] border border-[#e6d3c2] z-30"
              >
                <div className="text-charcoal font-black text-lg sm:text-2xl leading-none">
                  202+
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-wide text-[#8c7a6c] font-bold mt-1">
                  Menu items & counting
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
