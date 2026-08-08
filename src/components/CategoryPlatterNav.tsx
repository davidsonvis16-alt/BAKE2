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
    <div className="relative mb-8 md:mb-10">
      <div className="relative z-10 overflow-hidden rounded-[32px] border border-[#E6D3C2] bg-white/95 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-[#F3E8D8]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#7A6756]">
              Explore Categories
            </span>
            <p className="text-sm font-semibold text-[#111] mt-1">
              Swipe through our menu specialties.
            </p>
          </div>
          <div className="text-right text-[10px] uppercase tracking-[0.28em] text-[#7A6756]">
            {totalItems} items
          </div>
        </div>

        <div
          className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-5 sm:px-6 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const itemCount = getItemCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 min-w-[220px] sm:min-w-[240px] lg:min-w-[260px] max-w-[280px] group flex flex-col rounded-[28px] border bg-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                  isSelected
                    ? 'border-[#111] shadow-lg'
                    : 'border-[#E6D3C2] hover:-translate-y-1 hover:shadow-lg'
                }`}
              >
                <div className="relative h-56 overflow-hidden rounded-t-[28px] bg-[#F5EFE7]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#F3E2CF]">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                    <h3 className="text-lg font-serif font-black text-white leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-4 text-left">
                  <p className="text-sm text-[#6F5A4A] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
