import React from 'react';
import { ArrowRight, Star, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-[#1a120b]">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, #2b1b12 0%, #1a120b 55%, #140d07 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f8f1e5 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />

      <PencilDoodles />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[88vh] items-center gap-12 lg:gap-6">
          <div className="lg:col-span-6 relative z-20 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 bg-[#f8f1e5]/10 border border-[#f8f1e5]/20 text-[#e6c98f] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-7 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a35a]" />
              Est. Moi Road, Nakuru
            </div>

            <h1 className="font-serif font-black text-[3.4rem] sm:text-7xl lg:text-[5.5rem] text-[#fdfaf3] leading-[0.86] tracking-tight">
              Fresh,
              <br />
              Fire-Baked
              <br />
              <span className="text-[#d4a35a] italic font-normal">Every Day</span>
            </h1>

            <p className="text-[#c9b8a5] text-base lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed mt-7">
              Open-kitchen cooking, honest flavour, and the kind of room that
              keeps you lingering. From flame-grilled chicken to hand-stretched
              pizza — nothing here is rushed.
            </p>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-9"
            >
              <button
                onClick={onScrollToMenu}
                className="bg-[#d4a35a] hover:bg-[#e6c98f] text-[#1a120b] font-black text-sm px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(212,163,90,0.35)] active:scale-[0.97]"
              >
                View Menu
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru"
                target="_blank"
                rel="noreferrer"
                className="bg-transparent hover:bg-[#f8f1e5]/10 text-[#fdfaf3] border border-[#f8f1e5]/30 font-bold text-sm px-7 py-4 rounded-full transition-all"
              >
                Visit Us
              </a>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-8 border-t border-[#f8f1e5]/10 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#c9b8a5]">
                <Star className="w-3.5 h-3.5 text-[#d4a35a] fill-[#d4a35a]" />
                5.0 on Google
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#c9b8a5]">
                <Clock className="w-3.5 h-3.5 text-[#d4a35a]" />
                7 AM – 8 PM Daily
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative z-20 mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,163,90,0.28) 0%, rgba(212,163,90,0.12) 34%, transparent 68%)',
                }}
              />

              <div className="relative w-[92%] sm:w-[84%] lg:w-[96%] mx-auto">
                <img
                  src="/menu-item-cutout.png"
                  alt="Signature BakeMart dish"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 35px 45px rgba(0,0,0,0.6))' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="absolute top-2 right-0 sm:top-0 sm:right-4 lg:-right-2 z-30">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#d97a4c] flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.4)] border-2 border-[#1a120b]">
                  <span
                    className="text-center text-[11px] sm:text-[12px] font-black uppercase leading-tight text-[#1a120b] px-2"
                    style={{ fontFamily: 'Fraunces, serif' }}
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
                className="absolute top-[42%] -right-1 sm:-right-3 lg:-right-6 max-w-[150px] sm:max-w-[165px] bg-[#fdfaf3] rounded-2xl px-4 py-3.5 shadow-[0_16px_30px_rgba(0,0,0,0.4)] z-30 hidden sm:block"
              >
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-[#d4a35a] fill-[#d4a35a]" />
                  ))}
                </div>
                <p className="text-[11px] leading-snug text-[#2b1b12] font-semibold">
                  "Best flame-grilled chicken in Nakuru, hands down."
                </p>
                <p className="text-[9px] text-[#8c7a6c] font-bold mt-1.5">— Google review</p>
              </div>

              <div
                className="absolute bottom-[4%] left-0 sm:-left-4 bg-[#fdfaf3] rounded-2xl px-4 py-3 shadow-[0_16px_30px_rgba(0,0,0,0.4)] z-30 hidden sm:block"
              >
                <div className="font-serif font-black text-2xl text-[#1a120b] leading-none">
                  30+
                </div>
                <div className="text-[9px] uppercase tracking-wide text-[#8c7a6c] font-bold mt-1">
                  Items baked daily
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function PencilDoodles() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <svg
        viewBox="0 0 200 260"
        className="absolute top-[8%] left-[2%] sm:left-[6%] lg:left-[8%] w-40 sm:w-52 lg:w-64 opacity-[0.14]"
      >
        <path
          d="M100 10C50 10 15 60 15 130s35 120 85 120 85-60 85-120S150 10 100 10z"
          fill="none"
          stroke="#e6c98f"
          strokeWidth="3"
        />
        <path
          d="M100 20C75 60 75 200 100 240"
          fill="none"
          stroke="#e6c98f"
          strokeWidth="3"
        />
      </svg>

      <svg
        viewBox="0 0 120 200"
        className="absolute top-[4%] right-[4%] sm:right-[10%] w-20 sm:w-28 opacity-[0.16] hidden sm:block"
      >
        <path
          d="M30 190c-20-20 10-30-5-55s-25-15-10-45 5-40-10-60"
          fill="none"
          stroke="#f8f1e5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M70 190c-20-25 15-35-3-60s-22-18-5-48 8-38-8-60"
          fill="none"
          stroke="#f8f1e5"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 100 180"
        className="absolute bottom-[6%] left-[3%] sm:left-[8%] w-16 sm:w-20 opacity-[0.13] hidden lg:block"
      >
        <path d="M50 10v160" fill="none" stroke="#e6c98f" strokeWidth="2.5" />
        {[30, 55, 80, 105, 130].map((y, i) => (
          <g key={i}>
            <ellipse cx={50 - 14} cy={y} rx="10" ry="6" fill="none" stroke="#e6c98f" strokeWidth="2" transform={`rotate(-30 ${50 - 14} ${y})`} />
            <ellipse cx={50 + 14} cy={y} rx="10" ry="6" fill="none" stroke="#e6c98f" strokeWidth="2" transform={`rotate(30 ${50 + 14} ${y})`} />
          </g>
        ))}
      </svg>

      <span className="absolute top-[30%] left-[45%] text-[#e6c98f] opacity-20 text-2xl select-none hidden lg:block">✦</span>
      <span className="absolute bottom-[20%] right-[38%] text-[#e6c98f] opacity-15 text-xl select-none hidden lg:block">✦</span>
    </div>
  );
}
