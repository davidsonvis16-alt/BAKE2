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
      {/* Plate / Platter illustration */}
      <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32">
          {/* Outer rim */}
          <div className="absolute inset-0 rounded-full bg-white border-[3px] sm:border-4 border-[#EADECB] shadow-lg" />
          {/* Inner plate */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-full bg-[#FAF3E7] border-2 border-[#EADECB]" />
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-[#000000] uppercase tracking-wider text-center px-2 leading-tight">
              {totalItems} Items
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal scrollable category cards */}
      <div className="relative z-10 flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pl-20 sm:pl-28 md:pl-32 py-6 sm:py-8 touch-pan-x">
        {categories.map((cat, index) => {
          const isSelected = selectedCategory === cat.id;
          const itemCount = getItemCount(cat.id);

          // Fan effect: cards tilt slightly based on distance from center
          const midPoint = (categories.length - 1) / 2;
          const distanceFromCenter = index - midPoint;
          const rotation = distanceFromCenter * -1.2;
          const yOffset = Math.abs(distanceFromCenter) * 1.2;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="shrink-0 w-28 sm:w-36 md:w-40 bg-white rounded-2xl border border-[#EADECB] shadow-sm hover:shadow-lg hover:border-[#000000]/40 transition-all duration-300 cursor-pointer group"
              style={{
                transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
                zIndex: categories.length - Math.abs(Math.round(distanceFromCenter)),
              }}
            >
              {/* Category Image */}
              <div className="relative h-24 sm:h-28 md:h-32 overflow-hidden rounded-t-2xl bg-[#000000]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent" />

                {/* Item count badge */}
                <span className="absolute top-2 right-2 bg-[#000000]/90 text-orange-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              </div>

              {/* Category Info */}
              <div className="p-2 sm:p-3 text-center">
                <h3 className="font-serif font-bold text-xs sm:text-sm text-[#000000] group-hover:text-[#000000] transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#000000]/60 mt-0.5">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Selected ring */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[#000000] pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
