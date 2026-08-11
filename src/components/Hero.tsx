import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Clock, Star } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

const fadeUp = (reduceMotion: boolean, delay = 0) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' as const, delay },
      };

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  const reduceMotion = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#fdfaf3] pt-8 sm:pt-10 lg:pt-14 pb-10 lg:pb-16">
      {/* faint corkboard texture, ties this page to the Gallery without competing for attention */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8c4a1a 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: content on solid cream — always crisp, no overlay needed */}
          <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              {...fadeUp(reduceMotion, 0)}
              className="inline-flex items-center gap-2 bg-white border border-[#e6d3c2] text-[#000000] text-[10px] font-bold px-3.5 py-1.5 rounded-full"
            >
              <span className="text-[#d4a35a]">●</span>
              <span>Nakuru's Only Open-Kitchen Coffee House</span>
            </motion.div>

            <motion.h1
              {...fadeUp(reduceMotion, 0.08)}
              className="font-serif font-black text-[2.75rem] sm:text-5xl lg:text-[3.75rem] text-[#000000] leading-[0.95] tracking-tight mt-5"
            >
              Where Every Corner
              <span className="block text-[#d4a35a] font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl mt-2">
                Tells a Story
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(reduceMotion, 0.16)}
              className="text-[#5c4b3f] text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed mt-5"
            >
              Widely rated among the best coffee spots and restaurants in Nakuru, BakeMart serves fresh food cooked in full view of your table —
              honest flavors, an open kitchen, and prices that keep it one of the most affordable places to eat well in the city.
            </motion.p>

            <motion.div
              {...fadeUp(reduceMotion, 0.24)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-[#5c4b3f] mt-6"
            >
              <span className="flex items-center gap-1.5 bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-[#d4a35a] fill-[#d4a35a]" />
                <span>Rated 5.0 on Google</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#e6d3c2] px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#d4a35a]" />
                <span>Open Daily · 7 AM – 8 PM</span>
              </span>
            </motion.div>

            <motion.div
              {...fadeUp(reduceMotion, 0.32)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-7"
            >
              <button
                onClick={onScrollToMenu}
                className="bg-[#000000] hover:bg-[#000000] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 text-[#d4a35a]" />
              </button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=BakeMart+Coffee+House,Tropical+House,Moi+Road,Nakuru"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-[#f8f1e5] text-[#000000] border border-[#e6d3c2] font-bold text-sm px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
              >
                <span>Visit Us</span>
              </a>
            </motion.div>
          </div>

          {/* Right: framed photo panel with a pinned second photo — the hero's one signature move */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* main photo */}
              <div className="relative rounded-[28px] overflow-hidden border border-[#e6d3c2] shadow-[0_20px_50px_rgba(26,18,11,0.18)] aspect-[4/3] lg:aspect-[16/12] bg-[#f8f1e5]">
                <img
                  src="/gallery-16.jpg"
                  alt="Cozy interior of BakeMart Coffee House, one of the best restaurants in Nakuru"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* pinned second photo — same washi-tape language as the Gallery */}
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
                whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.05 }}
                className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-[42%] sm:w-[38%] bg-white p-2 pb-6 rounded-sm shadow-[0_10px_25px_rgba(26,18,11,0.22)] border border-[#e6d3c2]"
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 rounded-[2px] shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,163,90,0.9), rgba(212,163,90,0.65))',
                    transform: 'translateX(-50%) rotate(-6deg)',
                  }}
                />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#f8f1e5]">
                  <img
                    src="/breakfast.jpeg"
                    alt="Fresh breakfast spread at BakeMart, a fresh food restaurant in Nakuru"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <p
                  className="mt-2 text-center text-sm sm:text-base leading-none text-[#000000]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  Fresh every morning
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};