import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { ProductCard } from './ProductCard';
import { MenuItem, MenuItemOption } from '../types';
import { ProductCardSkeleton, TicketListItemSkeleton } from './Skeletons';
import { CategoryPlatterNav } from './CategoryPlatterNav';
import { FoodPreviewModal } from './FoodPreviewModal';
import { useCartAnimation } from './CartAnimation';

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
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const { triggerFly } = useCartAnimation();
  const dataAvailableRef = useRef(false);

  useEffect(() => {
    if (!dataLoading && menuItems.length > 0) {
      dataAvailableRef.current = true;
    }
  }, [dataLoading, menuItems.length]);

  useEffect(() => {
    if (dataAvailableRef.current) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

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

  const isSearching = searchQuery.trim().length > 0;

  return (
    <section id="full-menu" className="py-10 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSearching ? (
          /* Search Mode: images first, then text */
          <>
            {/* Main Content (Search Results) */}
            {showLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-[#5c4b3f] font-semibold">No items found</p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                  }}
                  className="mt-3 text-xs font-bold text-[#000000] underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isWishlisted={wishlistIds.includes(item.id)}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onOpenPreview={setPreviewItem}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden">
                <div className="divide-y divide-[#f3e8d8]">
                  {filteredItems.map((item) => {
                    const isWishlisted = wishlistIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fdfaf3] transition-colors"
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
                          <p className="text-xs text-[#5c4b3f] mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                          <span className="font-mono font-bold text-sm text-[#000000]">
                            KSh {item.price.toLocaleString()}
                          </span>

                          <button
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const rect = btn.getBoundingClientRect();
                              onAddToCart(item);
                              triggerFly(rect);
                            }}
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

            {/* Results Count & View Toggle (after images) */}
            <div className="flex items-center justify-between mb-6 mt-6">
              <p className="text-xs font-semibold text-[#5c4b3f]">
                {selectedCategory === 'all' ? (
                  <>Showing all <span className="text-[#000000] font-bold">{filteredItems.length}</span> items</>
                ) : (
                  <>
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in{" "}
                    <span className="font-bold text-[#000000]">{categories.find(c => c.id === selectedCategory)?.name}</span>
                  </>
                )}
              </p>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#000000] text-white'
                      : 'bg-white text-[#5c4b3f] border border-[#e6d3c2] hover:border-[#000000]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('ticket')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'ticket'
                      ? 'bg-[#000000] text-white'
                      : 'bg-white text-[#5c4b3f] border border-[#e6d3c2] hover:border-[#000000]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Platter Navigation (after images) */}
            <CategoryPlatterNav
              categories={categories}
              menuItems={menuItems}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />

            {/* Section Header (text after images) */}
            <div className="text-center max-w-2xl mx-auto mt-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
                FULL MENU
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#000000] mt-2 tracking-tight">
                Search Results
              </h2>
              <p className="text-sm text-[#5c4b3f] mt-3 max-w-lg mx-auto leading-relaxed">
                Food images matching "{searchQuery}" above. Browse the categories below for more.
              </p>
            </div>
          </>
        ) : (
          /* Normal Mode: text header first, then category, then results */
          <>
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
                FULL MENU
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#000000] mt-2 tracking-tight">
                Popular Dishes & Drinks
              </h2>
              <p className="text-sm text-[#5c4b3f] mt-3 max-w-lg mx-auto leading-relaxed">
                Open-kitchen freshly cooked delicacies, brewed Nakuru coffees, hand-stretched pizzas & local specialties.
              </p>
            </div>

            {/* Category Platter Navigation */}
            <CategoryPlatterNav
              categories={categories}
              menuItems={menuItems}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />

            {/* Results Count & View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold text-[#5c4b3f]">
                {selectedCategory === 'all' ? (
                  <>Showing all <span className="text-[#000000] font-bold">{filteredItems.length}</span> items</>
                ) : (
                  <>
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in{" "}
                    <span className="font-bold text-[#000000]">{categories.find(c => c.id === selectedCategory)?.name}</span>
                  </>
                )}
              </p>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#000000] text-white'
                      : 'bg-white text-[#5c4b3f] border border-[#e6d3c2] hover:border-[#000000]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h2a2 2 0 01-2 2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('ticket')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'ticket'
                      ? 'bg-[#000000] text-white'
                      : 'bg-white text-[#5c4b3f] border border-[#e6d3c2] hover:border-[#000000]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content */}
            {showLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-[#5c4b3f] font-semibold">No items found</p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                  }}
                  className="mt-3 text-xs font-bold text-[#000000] underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isWishlisted={wishlistIds.includes(item.id)}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onOpenPreview={setPreviewItem}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden">
                <div className="divide-y divide-[#f3e8d8]">
                  {filteredItems.map((item) => {
                    const isWishlisted = wishlistIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fdfaf3] transition-colors"
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
                          <p className="text-xs text-[#5c4b3f] mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                          <span className="font-mono font-bold text-sm text-[#000000]">
                            KSh {item.price.toLocaleString()}
                          </span>

                          <button
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const rect = btn.getBoundingClientRect();
                              onAddToCart(item);
                              triggerFly(rect);
                            }}
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
          </>
        )}
      </div>
      {previewItem && (
        <FoodPreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
