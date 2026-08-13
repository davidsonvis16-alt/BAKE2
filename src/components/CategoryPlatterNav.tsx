import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Category, MenuItem } from '../types';
import { CategoryCard } from './CategoryCard';

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
  const totalItems = menuItems.length;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="category-platter">
      <div className="category-platter-header">
        <div className="category-platter-title-group">
          <span className="category-platter-eyebrow">EXPLORE CATEGORIES</span>
          <h2 className="category-platter-title">Swipe through our menu specialties.</h2>
          <p className="category-platter-desc">
            {totalItems} items across {categories.length} categories
          </p>
        </div>

        <div className="category-platter-arrows">
          <button
            onClick={() => scrollBy(-1)}
            className="category-platter-arrow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="category-platter-arrow"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <div
          ref={scrollRef}
          className="category-platter-scroll"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>

        <div className="category-swipe-indicator">
          <div className="category-swipe-text">
            <span>Swipe</span>
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
