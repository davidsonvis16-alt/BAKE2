import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/menuData';
import { CategoryCard } from './CategoryCard';
import { CategoryCardSkeleton } from './Skeletons';

interface CategoryQuickNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryQuickNav: React.FC<CategoryQuickNavProps> = ({
  onSelectCategory,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto smooth-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#000000]">
            EXPLORE MENU CATEGORIES
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#000000] uppercase tracking-wide">
            Select Food Specialty
          </h2>
          <p className="text-xs sm:text-sm text-[#000000] mt-1">
            Tap any category card below to open its clean item menu list.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} className="smooth-card" />
            ))
          : CATEGORIES.map((cat, index) => (
              <div
                key={cat.id}
                className="smooth-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CategoryCard
                  category={cat}
                  onSelectCategory={onSelectCategory}
                />
              </div>
            ))}
      </div>
    </section>
  );
};
