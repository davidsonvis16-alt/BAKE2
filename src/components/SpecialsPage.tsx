import React from 'react';
import { ComboGrid } from './ComboGrid';
import { ReservationSection } from './ReservationSection';

interface SpecialsPageProps {
  onNavigateMenu: () => void;
  onAddToCart: (itemId: string) => void;
}

export const SpecialsPage: React.FC<SpecialsPageProps> = ({ onNavigateMenu, onAddToCart }) => {
  return (
    <div className="pb-16 lg:pb-20">
      {/* Full Menu Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-14">
        <div className="bg-[#000000] text-[#fdfaf3] p-8 rounded-3xl border border-[#000000] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#d97a4c]">
              COMPLETE LISTINGS
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl">
              Prefer to view our full menu on a single page?
            </h3>
            <p className="text-xs sm:text-sm text-[#d97a4c]/80 max-w-xl">
              Explore all 12 food categories with live instant search, dietary tags, portion selection, and clean list layouts.
            </p>
          </div>

          <button
            onClick={onNavigateMenu}
            className="bg-[#d97a4c] hover:bg-[#e8a27a] text-[#000000] font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Open Full Menu Page →</span>
          </button>
        </div>
      </section>

      {/* Combos Grid */}
      <ComboGrid onAddToCart={onAddToCart} />

      {/* Table Reservation Section */}
      <div className="max-w-7xl mx-auto px-4">
        <ReservationSection />
      </div>
    </div>
  );
};
