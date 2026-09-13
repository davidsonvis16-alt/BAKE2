import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { useMenuData } from '../hooks/useMenuData';
import { DealsBand } from './home/DealsBand';
import { ReservationSection } from './ReservationSection';
import { SplitImage } from './brand/SplitImage';
import { PriceBurst } from './brand/PriceBurst';
import { startingPrice } from '../lib/menuMeta';

interface SpecialsPageProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
}

export const SpecialsPage: React.FC<SpecialsPageProps> = ({ onNavigate, onAddToCart }) => {
  const { menuItems } = useMenuData();
  const bbqFrom = startingPrice(menuItems.filter((i) => i.category === 'bbq-platters'));

  return (
    <div className="bg-bm-cream">
      <section className="mx-auto grid max-w-[1320px] items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16 lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-flame">Specials & combos</p>
          <h1 className="mt-3 font-display text-[3.5rem] uppercase leading-[0.86] text-bm-ink sm:text-7xl lg:text-8xl">
            Deals worth <span className="text-bm-flame">sharing</span>
            <span className="sr-only"> — Specials & Combos at BakeMart Coffee House Nakuru</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-bm-muted">
            Barbecue platters for the table, pizzas for the group and plates that fill you up — all cooked fresh in our open
            kitchen on Moi Road.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/category/bbq-platters')}
              className="group inline-flex items-center gap-2 rounded-full bg-bm-ink px-7 py-4 text-[15px] font-extrabold text-white hover:bg-bm-ember"
            >
              BBQ platters
              <ArrowRight className="h-4 w-4 text-bm-orange transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/menu')}
              className="inline-flex items-center rounded-full border-2 border-bm-ink px-7 py-4 text-[15px] font-extrabold text-bm-ink hover:bg-bm-ink hover:text-white"
            >
              Full menu
            </button>
          </div>
        </div>
        <div className="relative">
          <SplitImage
            src="/Choma-Platter.jpg"
            alt="Choma platter at BakeMart Coffee House"
            trigger="mount"
            priority
            className="aspect-[4/3] rounded-[2rem]"
          />
          {bbqFrom !== null && <PriceBurst price={bbqFrom} size={124} className="absolute -left-3 -top-6 sm:-left-6" />}
        </div>
      </section>

      <DealsBand onAddToCart={onAddToCart} onSelectCategory={(id) => onNavigate(`/category/${id}`)} extraIds={['p4', 's5', 'm1_6']} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <ReservationSection />
      </div>
    </div>
  );
};
