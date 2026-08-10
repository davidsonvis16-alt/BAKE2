import React from 'react';
import { Category, MenuItem } from '../types';

interface CategoryPlatterNavProps {
  categories: Category[];
  menuItems: MenuItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPlatterNav: React.FC<CategoryPlatterNavProps> = ({
  categories,
  menuItems,
  selectedCategory,
  onSelectCategory,
}) => {
  const getItemCount = (categoryId: string) => {
    return menuItems.filter((item) => item.category === categoryId).length;
  };

  const totalItems = menuItems.length;

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
              EXPLORE CATEGORIES
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#1a120b] mt-1 tracking-tight">
              Swipe through our menu specialties.
            </h2>
            <p className="text-xs sm:text-sm text-[#5c4b3f] mt-1">
              {totalItems} items across {categories.length} categories
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const itemCount = getItemCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 w-[78vw] max-w-[320px] sm:w-[220px] lg:w-[240px] group flex flex-col rounded-2xl border bg-white transition-all duration-300 ${
                  isSelected
                    ? 'border-[#1a120b] shadow-lg'
                    : 'border-[#e6d3c2] hover:border-[#1a120b]/30 hover:shadow-md'
                }`}
              >
                {/* Category Image */}
                <div className="relative h-[180px] sm:h-[200px] overflow-hidden rounded-t-2xl bg-[#f8f1e5]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#f8f1e5] font-bold">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                    <h3 className="font-serif font-black text-base sm:text-lg text-white leading-tight mt-0.5">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Category Description */}
                <div className="px-4 py-3.5 text-left">
                  <p className="text-xs text-[#5c4b3f] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Swipe indicator */}
        <div className="pointer-events-none absolute bottom-2 right-4 sm:right-6 lg:right-8 flex items-center gap-1 text-[#8c7a6c]">
          <span className="text-[10px] font-bold uppercase tracking-widest">Swipe</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
};
