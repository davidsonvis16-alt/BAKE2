import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';
import { ChevronRight, Utensils } from 'lucide-react';
import { ImageWithSkeleton } from './Skeletons';

interface CategoryCardProps {
  category: Category;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelectCategory,
}) => {
  const { menuItems } = useMenuData();
  const categoryItems = menuItems.filter((i) => i.category === category.id);
  const minPrice = categoryItems.length > 0
    ? Math.min(...categoryItems.map((i) => i.price))
    : 0;

  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className="group relative bg-white rounded-[1.75rem] overflow-visible border-[3px] border-[#1a120b] shadow-[6px_6px_0_0_#1a120b] hover:shadow-[10px_10px_0_0_#d4a35a] cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      {/* Flag-tag: item count, punched corner, hangs off the top */}
      <div className="absolute -top-4 -left-3 z-30 rotate-[-8deg]">
        <div className="relative bg-[#d4a35a] text-[#1a120b] font-black text-[11px] uppercase tracking-wide px-3.5 py-1.5 rounded-md shadow-[3px_3px_0_0_#1a120b]">
          {categoryItems.length} Items
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 rounded-full bg-[#1a120b]" />
        </div>
      </div>

      {/* Image, hard-cropped, thick bottom border to feel like a printed card not a photo card */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#1a120b] border-b-[3px] border-[#1a120b]">
        <ImageWithSkeleton
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = CATEGORIES[2].image;
          }}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b]/90 via-[#1a120b]/5 to-transparent" />

        <span className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#1a120b] shadow-[2px_2px_0_0_#1a120b]">
          <Utensils className="w-4 h-4" />
        </span>

        <h3 className="absolute bottom-3 left-4 right-4 font-serif font-black text-xl sm:text-2xl text-white leading-[0.95] line-clamp-2">
          {category.name}
        </h3>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5">
        <p className="text-xs text-[#5c4b3f] leading-relaxed line-clamp-2 min-h-[2.2em]">
          {category.description}
        </p>

        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#e6d3c2] flex items-center justify-between gap-3">
          {/* price tag, styled like a real hanging price ticket */}
          <div className="relative bg-[#faf3e7] border-2 border-[#1a120b] rounded-lg px-3 py-1.5">
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#1a120b]" />
            <span className="block text-[8px] uppercase font-black tracking-wide text-[#8c7a6c] leading-none">
              From
            </span>
            <span className="block font-mono font-black text-sm text-[#1a120b] leading-none mt-0.5">
              KSh {minPrice.toLocaleString()}
            </span>
          </div>

          <button className="bg-[#1a120b] text-white text-xs font-black px-4 py-2.5 rounded-full flex items-center justify-center gap-1 shadow-[3px_3px_0_0_#d4a35a] group-hover:shadow-[1px_1px_0_0_#d4a35a] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200">
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};