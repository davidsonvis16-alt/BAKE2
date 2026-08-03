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
    }, 450);
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
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, menuItems]);

  const showLoading = isLoading || dataLoading;

  return (
    <section id="full-menu" className="py-8 px-4 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#000000]">
          FULL MENU
        </span>
        <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#000000] uppercase tracking-wide">
          Popular Dishes & Drinks
        </h2>
        <p className="text-xs sm:text-sm text-[#000000] mt-1">
          Open-kitchen freshly cooked delicacies, brewed Nakuru coffees, hand-stretched pizzas & local specialties.
        </p>
      </div>

      {/* Filter Pills Row - Touch friendly scrolling for mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 touch-pan-x no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 active:scale-95 ${
            selectedCategory === 'all'
              ? 'bg-[#000000] text-white shadow-xs'
              : 'bg-white text-[#000000] border border-[#EADECB] hover:border-[#000000]'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>All Items ({menuItems.length})</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 active:scale-95 ${
                isSelected
                  ? 'bg-[#000000] text-white shadow-xs'
                  : 'bg-white text-[#000000] border border-[#EADECB] hover:border-[#000000]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* View Toggle Bar */}
      <div className="mt-2 mb-6 flex items-center justify-between bg-white p-3 rounded-2xl border border-[#EADECB] shadow-xs">
        <div className="text-xs font-semibold text-[#000000]">
          Showing <span className="text-[#000000] font-bold">{filteredItems.length}</span> items
          {selectedCategory !== 'all' && (
            <span> in <strong className="text-[#000000]">{categories.find(c => c.id === selectedCategory)?.name}</strong></span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-[#FAF3E7] p-1 rounded-xl border border-[#EADECB]">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'grid'
                ? 'bg-[#000000] text-white shadow-xs'
                : 'text-[#000000] hover:text-[#000000]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>

          <button
            onClick={() => setViewMode('ticket')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'ticket'
                ? 'bg-[#000000] text-white shadow-xs'
                : 'text-[#000000] hover:text-[#000000]'
            }`}
            title="Ticket List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {showLoading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#EADECB] shadow-2xs space-y-4">
            <div className="border-b border-[#EADECB] pb-3 mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-[#000000]">
              <span>Item & Craft Description</span>
              <span>Price (KSh) & Order</span>
            </div>
            <div className="divide-y divide-[#F3E8D8]">
              {Array.from({ length: 6 }).map((_, i) => (
                <TicketListItemSkeleton key={i} />
              ))}
            </div>
          </div>
        )
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EADECB] max-w-md mx-auto my-8">
          <Search className="w-12 h-12 text-[#000000] mx-auto mb-3 stroke-[1.5]" />
          <h3 className="font-display font-bold text-lg text-[#000000]">No items found</h3>
          <p className="text-xs text-[#000000] mt-1">
            We couldn't find anything matching "{searchQuery}". Try searching for coffee, pizza, burger, or BBQ.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
            }}
            className="mt-4 bg-[#000000] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#000000] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        /* TICKET LEADER STYLE VIEW (Signature BakeMart Ticket Display) */
        <div className="bg-white rounded-2xl p-6 border border-[#EADECB] shadow-sm space-y-4">
          <div className="border-b border-[#EADECB] pb-3 mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-[#000000]">
            <span>Item & Craft Description</span>
            <span>Price (KSh) & Order</span>
          </div>

          <div className="divide-y divide-[#F3E8D8]">
            {filteredItems.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group hover:bg-[#FAF3E7]/50 px-2 rounded-lg transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm sm:text-base text-[#000000] group-hover:text-[#000000] transition-colors">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] uppercase font-extrabold bg-[#000000] text-white px-1.5 py-0.2 rounded-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#000000] mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Dotted leader connection on desktop */}
                  <div className="hidden md:block flex-1 border-b-2 border-dotted border-[#D2C4B4] my-auto mx-2 opacity-50" />

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="font-mono font-bold text-sm text-[#000000]">
                      KSh {item.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-xs"
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