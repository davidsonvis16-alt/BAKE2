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
    <section id="full-menu" className="menu-section">
      <div className="menu-container">
        {isSearching ? (
          <>
            {showLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="no-items">
                <p className="no-items-text">No items found</p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                  }}
                  className="no-items-btn"
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
              <div className="ticket-list">
                <div>
                  {filteredItems.map((item) => {
                    const isWishlisted = wishlistIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="ticket-item"
                      >
                        <div className="ticket-item-info">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="ticket-item-name">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] uppercase font-extrabold bg-[#000000] text-white px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="ticket-item-desc">
                            {item.description}
                          </p>
                        </div>

                        <div className="ticket-item-actions">
                          <span className="ticket-item-price">
                            KSh {item.price.toLocaleString()}
                          </span>

                          <button
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const rect = btn.getBoundingClientRect();
                              onAddToCart(item);
                              triggerFly(rect);
                            }}
                            className="ticket-item-add"
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

            <div className="flex items-center justify-between mb-6 mt-6">
              <p className="results-count">
                {selectedCategory === 'all' ? (
                  <>Showing all <strong>{filteredItems.length}</strong> items</>
                ) : (
                  <>
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in{" "}
                    <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong>
                  </>
                )}
              </p>

              <div className="view-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('ticket')}
                  className={`view-toggle-btn ${viewMode === 'ticket' ? 'active' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <CategoryPlatterNav
              categories={categories}
              menuItems={menuItems}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />

            <div className="menu-header">
              <span className="menu-eyebrow">FULL MENU</span>
              <h2 className="menu-title">Search Results</h2>
              <p className="menu-description">
                Food images matching "{searchQuery}" above. Browse the categories below for more.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="menu-header">
              <span className="menu-eyebrow">FULL MENU</span>
              <h2 className="menu-title">Popular Dishes & Drinks</h2>
              <p className="menu-description">
                Open-kitchen freshly cooked delicacies, brewed Nakuru coffees, hand-stretched pizzas & local specialties.
              </p>
            </div>

            <CategoryPlatterNav
              categories={categories}
              menuItems={menuItems}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />

            <div className="flex items-center justify-between mb-6">
              <p className="results-count">
                {selectedCategory === 'all' ? (
                  <>Showing all <strong>{filteredItems.length}</strong> items</>
                ) : (
                  <>
                    {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in{" "}
                    <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong>
                  </>
                )}
              </p>

              <div className="view-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('ticket')}
                  className={`view-toggle-btn ${viewMode === 'ticket' ? 'active' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {showLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="no-items">
                <p className="no-items-text">No items found</p>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                  }}
                  className="no-items-btn"
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
              <div className="ticket-list">
                <div>
                  {filteredItems.map((item) => {
                    const isWishlisted = wishlistIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className="ticket-item"
                      >
                        <div className="ticket-item-info">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="ticket-item-name">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] uppercase font-extrabold bg-[#000000] text-white px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="ticket-item-desc">
                            {item.description}
                          </p>
                        </div>

                        <div className="ticket-item-actions">
                          <span className="ticket-item-price">
                            KSh {item.price.toLocaleString()}
                          </span>

                          <button
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              const rect = btn.getBoundingClientRect();
                              onAddToCart(item);
                              triggerFly(rect);
                            }}
                            className="ticket-item-add"
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
