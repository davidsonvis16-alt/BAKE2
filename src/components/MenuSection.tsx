import React, { useState, useMemo, useEffect } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { ProductCard } from './ProductCard';
import { MenuItem, MenuItemOption } from '../types';
import { LayoutGrid, List, Search, Coffee, Cake, GlassWater, Egg, UtensilsCrossed, Beef, Flame, Pizza, Sandwich, Drumstick, Soup, Utensils } from 'lucide-react';
import { ProductCardSkeleton, TicketListItemSkeleton } from './Skeletons';

interface MenuSectionProps {
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  wishlistIds: string[];
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onToggleWishlist: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  searchQuery,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
}) => {
  const { categories, menuItems, loading: dataLoading } = useMenuData();
  const [viewMode, setViewMode] = useState<'grid' | 'ticket'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Brief initial & category fetch loader simulation for smooth perceived performance
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Map category icons dynamically
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bakery-desserts': return <Cake className="w-3.5 h-3.5" />;
      case 'juices-cocktails': return <GlassWater className="w-3.5 h-3.5" />;
      case 'hot-cold-drinks': return <Coffee className="w-3.5 h-3.5" />;
      case 'breakfast': return <Egg className="w-3.5 h-3.5" />;
      case 'mains-meals': return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'light-snacks': return <Beef className="w-3.5 h-3.5" />;
      case 'kienyeji-traditional': return <Flame className="w-3.5 h-3.5" />;
      case 'pizza-pasta': return <Pizza className="w-3.5 h-3.5" />;
      case 'sandwiches-wraps': return <Sandwich className="w-3.5 h-3.5" />;
      case 'bbq-platters': return <Drumstick className="w-3.5 h-3.5" />;
      case 'soups-salads': return <Soup className="w-3.5 h-3.5" />;
      default: return <Utensils className="w-3.5 h-3.5" />;
    }
  };

  // Filter items by search query and category
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, menuItems]);

  const showLoading = isLoading || dataLoading;

  return (
    <section id="full-menu" className="py-10 md:py-16 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#000000]">
          FULL MENU
        </span>
        <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-2 tracking-tight">
          Popular Dishes & Drinks
        </h2>
        <p className="text-xs sm:text-sm text-[#000000]/70 mt-2 max-w-lg mx-auto">
          Open-kitchen freshly cooked delicacies, brewed Nakuru coffees, hand-stretched pizzas & local specialties.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 touch-pan-x no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors active:scale-95 ${
            selectedCategory === 'all'
              ? 'bg-[#000000] text-white'
              : 'bg-white text-[#000000] border border-[#EADECB] hover:border-[#000000]'
          }`}
        >
          <span>All Items</span>
          <span className="ml-1.5 text-[10px] opacity-70">({menuItems.length})</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors active:scale-95 ${
                isSelected
                  ? 'bg-[#000000] text-white'
                  : 'bg-white text-[#000000] border border-[#EADECB] hover:border-[#000000]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span className="ml-1.5">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#000000]/70">
          {selectedCategory === 'all' ? (
            <>Showing all <span className="text-[#000000] font-bold">{filteredItems.length}</span> items</>
          ) : (
            <>
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in{" "}
              <span className="font-bold text-[#000000]">{categories.find(c => c.id === selectedCategory)?.name}</span>
            </>
          )}
        </p>
      </div>

      {/* Main Content */}
      {showLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-[#000000]/60 font-semibold">No items found</p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-[#000000] underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              isWishlisted={wishlistIds.includes(item.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EADECB] shadow-sm overflow-hidden">
          <div className="divide-y divide-[#F3E8D8]">
            {filteredItems.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF3E7]/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#000000]">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] uppercase font-extrabold bg-[#000000] text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#000000]/60 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="font-mono font-bold text-sm text-[#000000]">
                      KSh {item.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
                    >
                      <span>+ Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};