import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/menuData';
import { CategoryCard } from './CategoryCard';
import { CategoryCardSkeleton } from './Skeletons';

interface CategoryQuickNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryQuickNav: React.FC<CategoryQuickNavProps> = ({
  selectedCategory,
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
    <section className="relative py-14 sm:py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* faint dot texture, echoes the hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1a120b 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ---------- header ---------- */}
      <div className="relative flex flex-col items-center text-center mb-10 sm:mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#1a120b] text-[#d4a35a] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-5"
        >
          Explore the menu
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#1a120b] leading-[0.95] tracking-tight"
        >
          Pick Your
          <span className="block text-[#d97a4c] italic font-normal">Craving</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-sm sm:text-base text-[#5c4b3f] mt-4 max-w-md"
        >
          Every category opens onto a clean, focused list — tap in and browse
          without the clutter.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-[3px] bg-[#d4a35a] rounded-full mt-6 origin-center"
        />
      </div>

      {/* ---------- grid ---------- */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} className="smooth-card" />
            ))
          : CATEGORIES.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: (index % 8) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className={
                  cat.id === selectedCategory
                    ? 'ring-2 ring-[#d4a35a] rounded-[1.5rem]'
                    : ''
                }
              >
                <CategoryCard
                  category={cat}
                  onSelectCategory={onSelectCategory}
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
};