import React from 'react';
import { Category } from '../types';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
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
  const categoryItems = MENU_ITEMS.filter((i) => i.category === category.id);
  const minPrice = categoryItems.length > 0
    ? Math.min(...categoryItems.map((i) => i.price))
    : 0;

  return (
     <div
       onClick={() => onSelectCategory(category.id)}
       className="group bg-white rounded-2xl overflow-hidden border border-[#EADECB] shadow-xs hover:shadow-xl hover:border-[#000000]/60 smooth-card cursor-pointer"
     >
      {/* Category Representative Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#000000]">
        <ImageWithSkeleton
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback if image not loaded
            (e.target as HTMLImageElement).src = CATEGORIES[2].image;
          }}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent z-10" />
        
        {/* Count Badge */}
        <span className="absolute top-3 right-3 bg-[#000000]/90 backdrop-blur-md text-orange-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-neutral-700/50 z-20">
          {categoryItems.length} Items
        </span>
      </div>

      {/* Category Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#FAF3E7] text-[#000000]">
              <Utensils className="w-3.5 h-3.5" />
            </span>
            <h3 className="font-serif font-bold text-lg text-[#000000] group-hover:text-[#000000] transition-colors">
              {category.name}
            </h3>
          </div>

          <p className="text-xs text-[#000000] leading-relaxed line-clamp-2 mt-1">
            {category.description}
          </p>
        </div>

        {/* Footer info & CTA button */}
        <div className="mt-4 pt-3 border-t border-[#F3E8D8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#000000]">Starting at</span>
            <p className="font-mono font-bold text-sm text-[#000000]">
              KSh {minPrice.toLocaleString()}
            </p>
          </div>

          <button className="bg-[#FAF3E7] group-hover:bg-[#000000] text-[#000000] group-hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-colors">
            <span>View List</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
