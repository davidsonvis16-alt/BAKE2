import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useMenuData } from '../hooks/useMenuData';
import { SplitImage } from './brand/SplitImage';
import { PriceBurst } from './brand/PriceBurst';
import { categoryIcon, lowestPrice, openStatus, startingPrice } from '../lib/menuMeta';

interface HeroProps {
  onNavigateMenu: () => void;
  onSelectCategory: (categoryId: string) => void;
}

interface Slide {
  id: string;
  tag: string;
  eyebrow: string;
  lines: [string, string];
  body: string;
  image: string;
  categoryId: string;
  /** Price the burst shows: a specific item, or the cheapest in the category. */
  priceItemId?: string;
  priceLabel: string;
}

const SLIDES: Slide[] = [
  {
    id: 'bbq',
    tag: 'BBQ Platters',
    eyebrow: 'Flame-grilled · built for sharing',
    lines: ['Fired up.', 'Piled high.'],
    body: 'Mbuzi choma, kuku choma, sausages, chips and ugali — barbecue platters made for the whole table.',
    image: '/fresh off the fire.jpeg',
    categoryId: 'bbq-platters',
    priceLabel: 'From',
  },
  {
    id: 'coffee',
    tag: 'Coffee & Bakes',
    eyebrow: 'Brewed and baked every morning',
    lines: ['Brew. Bake.', 'Repeat.'],
    body: 'Fresh coffee, masala chai, cakes, muffins and waffles — straight from the open kitchen.',
    image: '/coffee-and-pastry.jpeg',
    categoryId: 'hot-cold-drinks',
    priceItemId: 'hb2',
    priceLabel: 'Coffee',
  },
  {
    id: 'pizza',
    tag: 'Pizza & Pasta',
    eyebrow: 'Hand-stretched in the open kitchen',
    lines: ['Hand-made.', 'Oven-hot.'],
    body: 'Margherita, chicken tikka, BBQ mix and more — stretched, topped and fired while you watch.',
    image: '/Pizza-Margarita.jpg',
    categoryId: 'pizza-pasta',
    priceItemId: 'p1',
    priceLabel: 'Pizza from',
  },
  {
    id: 'kienyeji',
    tag: 'Kienyeji',
    eyebrow: 'Nakuru flavours, done right',
    lines: ['Nakuru', 'on a plate.'],
    body: 'Mukimo, matoke, githeri and slow-cooked stews — the comfort food you grew up on.',
    image: '/kienyeji-traditional.jpeg',
    categoryId: 'kienyeji-traditional',
    priceLabel: 'From',
  },
];

const SLIDE_SECONDS = 7;
const EASE = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onNavigateMenu, onSelectCategory }) => {
  const { menuItems } = useMenuData();
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const status = useMemo(() => openStatus(), []);

  const slide = SLIDES[index];
  const TagIcon = categoryIcon(slide.categoryId);

  const price = useMemo(() => {
    if (slide.priceItemId) {
      const item = menuItems.find((i) => i.id === slide.priceItemId);
      if (item) return lowestPrice(item);
    }
    return startingPrice(menuItems.filter((i) => i.category === slide.categoryId));
  }, [menuItems, slide]);

  const goTo = (next: number) => {
    if (next === index) return;
    setPrevious(index);
    setIndex(next);
    setCycle((c) => c + 1);
  };
  const advance = () => goTo((index + 1) % SLIDES.length);

  return (
    <section
      className="relative overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured at BakeMart"
    >
      {/* Poster photo: printed straight onto the black, edges melting into it — no card. */}
      <div className="relative h-[58svh] min-h-[340px] w-full sm:h-[62svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[64%]">
        {previous !== null && (
          <img src={SLIDES[previous].image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <SplitImage
          key={`${slide.id}-${cycle}`}
          src={slide.image}
          alt={`${slide.tag} at BakeMart Coffee House`}
          strips={6}
          trigger="mount"
          priority
          className="absolute inset-0"
        />
        {/* Fades only touch the edges, so the food itself is shown as shot. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.85)_18%,rgba(0,0,0,0)_55%)] lg:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0.8)_14%,rgba(0,0,0,0)_48%)] lg:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-black to-transparent lg:block" />

        <AnimatePresence mode="wait">
          {price !== null && (
            <motion.div
              key={slide.id}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-10 lg:top-10"
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 60 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.35 }}
            >
              <PriceBurst price={price} label={slide.priceLabel} size={100} className="sm:hidden" />
              <PriceBurst price={price} label={slide.priceLabel} size={140} className="hidden sm:grid" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onSelectCategory(slide.categoryId)}
          className="group absolute left-4 top-4 flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-bm-ink sm:left-6 sm:top-6 lg:bottom-10 lg:left-auto lg:right-28 lg:top-auto lg:py-2 lg:pl-2 lg:pr-5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-bm-orange lg:h-10 lg:w-10">
            <TagIcon className="h-5 w-5" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-bm-muted">Now serving</span>
            <span className="block text-sm font-extrabold">{slide.tag}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Copy sits on the black, overlapping the photo's faded edge */}
      <div className="relative mx-auto -mt-32 max-w-[1320px] px-4 pb-10 sm:-mt-40 sm:px-6 lg:mt-0 lg:flex lg:min-h-[calc(100svh-7.75rem)] lg:items-center lg:px-8 lg:py-16">
        <div className="lg:max-w-[600px]">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] ${
              status.open ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/10 text-white/70'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${status.open ? 'animate-pulse bg-emerald-400' : 'bg-white/50'}`} />
            {status.label} · Moi Road, Nakuru
          </span>

          <AnimatePresence mode="wait">
            <motion.div key={slide.id} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
              <motion.p
                className="mt-5 text-sm font-bold text-bm-orange sm:text-base"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {slide.eyebrow}
              </motion.p>
              <h1 className="mt-2 font-display text-[3.7rem] uppercase leading-[0.86] text-white sm:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem]">
                {slide.lines.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      className={`block ${i === 1 ? 'text-bm-orange' : ''}`}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.05 + i * 0.09 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="sr-only"> — BakeMart Coffee House, coffee house and restaurant in Nakuru</span>
              </h1>
              <motion.p
                className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              >
                {slide.body}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onNavigateMenu}
              className="group inline-flex items-center gap-2 rounded-full bg-bm-orange px-7 py-4 text-[15px] font-extrabold text-bm-ink transition-[background-color,transform] hover:bg-bm-orange-hot active:scale-95"
            >
              Order now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onSelectCategory(slide.categoryId)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 text-[15px] font-extrabold text-white hover:border-white hover:bg-white/5"
            >
              See {slide.tag}
            </button>
          </div>

          <div className="mt-9 grid max-w-[560px] grid-cols-4 gap-2 sm:gap-3" role="tablist" aria-label="Choose a featured dish">
            {SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goTo(i)}
                  className="group text-left"
                >
                  <span className="relative block h-1 overflow-hidden rounded-full bg-white/15">
                    {active ? (
                      <span
                        key={cycle}
                        className="bm-progress absolute inset-0 rounded-full bg-bm-orange"
                        style={{ animationDuration: `${SLIDE_SECONDS}s`, animationPlayState: paused ? 'paused' : 'running' }}
                        onAnimationEnd={advance}
                      />
                    ) : (
                      <span className={`absolute inset-0 rounded-full ${i < index ? 'bg-white/40' : ''}`} />
                    )}
                  </span>
                  <span
                    className={`mt-2 hidden text-[12px] font-bold sm:block ${active ? 'text-white' : 'text-white/45 group-hover:text-white/80'}`}
                  >
                    <span className="mr-1.5 font-display text-bm-orange">0{i + 1}</span>
                    {s.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
