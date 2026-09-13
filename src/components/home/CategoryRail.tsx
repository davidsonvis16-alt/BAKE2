import React, { useMemo } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/menuData';
import { useMenuData } from '../../hooks/useMenuData';
import { Reveal } from '../brand/Reveal';
import { SectionHeading } from '../brand/SectionHeading';
import { categoryIcon, formatKsh, orderCategories, startingPrice } from '../../lib/menuMeta';

interface CategoryRailProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigateMenu: () => void;
}

export const CategoryRail: React.FC<CategoryRailProps> = ({ onSelectCategory, onNavigateMenu }) => {
  const { menuItems } = useMenuData();
  const categories = useMemo(() => orderCategories(CATEGORIES), []);

  return (
    <section className="bg-bm-cream py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore the menu"
          title={
            <>
              What are you <span className="text-bm-flame">craving?</span>
            </>
          }
          description={`${menuItems.length} dishes and drinks across ${categories.length} categories — tap one to dive in.`}
          action={
            <button
              type="button"
              onClick={onNavigateMenu}
              className="group inline-flex items-center gap-2 rounded-full bg-bm-ink px-6 py-3.5 text-sm font-extrabold text-white hover:bg-bm-ember"
            >
              Full menu
              <ArrowRight className="h-4 w-4 text-bm-orange transition-transform group-hover:translate-x-1" />
            </button>
          }
        />

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, i) => {
            const items = menuItems.filter((item) => item.category === category.id);
            const from = startingPrice(items);
            const Icon = categoryIcon(category.id);
            return (
              <Reveal
                key={category.id}
                delay={(i % 4) * 0.06}
                y={40}
                className="w-[46vw] max-w-[230px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-bm-coal text-left sm:aspect-square"
                >
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
                  <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-bm-orange text-bm-ink sm:left-4 sm:top-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur sm:right-4 sm:top-4">
                    {items.length} items
                  </span>
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-5">
                    <span className="min-w-0">
                      <span className="block font-display text-[1.45rem] uppercase leading-[0.95] text-white sm:text-[1.9rem]">
                        {category.name}
                      </span>
                      {from !== null && (
                        <span className="mt-1.5 block text-[13px] font-bold text-bm-orange">From {formatKsh(from)}</span>
                      )}
                    </span>
                    <span className="hidden h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-bm-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:grid">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-bm-muted sm:hidden">Swipe for more →</p>
      </div>
    </section>
  );
};
