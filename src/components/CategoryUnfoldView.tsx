import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';
import { ProductCard } from './ProductCard';
import { MenuItem, MenuItemOption } from '../types';
import { ProductCardSkeleton, TicketListItemSkeleton, ImageWithSkeleton } from './Skeletons';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  Coffee,
  Cake,
  GlassWater,
  Egg,
  UtensilsCrossed,
  Beef,
  Flame,
  Pizza,
  Sandwich,
  Drumstick,
  Soup,
  Utensils
} from 'lucide-react';

interface CategoryUnfoldViewProps {
  categoryId: string;
  onSelectCategory: (catId: string) => void;
  onBackToHome: () => void;
  wishlistIds: string[];
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onToggleWishlist: (item: MenuItem) => void;
}

export const CategoryUnfoldView: React.FC<CategoryUnfoldViewProps> = ({
  categoryId,
  onSelectCategory,
  onBackToHome,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
}) => {
  const { menuItems } = useMenuData();
  const [categorySearch, setCategorySearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'ticket'>('grid');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [categoryId, selectedSubFilter, categorySearch]);

  const currentCategory = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bakery-desserts': return <Cake className="w-5 h-5 text-[#d4a35a]" />;
      case 'juices-cocktails': return <GlassWater className="w-5 h-5 text-[#d4a35a]" />;
      case 'hot-cold-drinks': return <Coffee className="w-5 h-5 text-[#d4a35a]" />;
      case 'breakfast': return <Egg className="w-5 h-5 text-[#d4a35a]" />;
      case 'mains-meals': return <UtensilsCrossed className="w-5 h-5 text-[#d4a35a]" />;
      case 'light-snacks': return <Beef className="w-5 h-5 text-[#d4a35a]" />;
      case 'kienyeji-traditional': return <Flame className="w-5 h-5 text-[#d4a35a]" />;
      case 'pizza-pasta': return <Pizza className="w-5 h-5 text-[#d4a35a]" />;
      case 'sandwiches-wraps': return <Sandwich className="w-5 h-5 text-[#d4a35a]" />;
      case 'bbq-platters': return <Drumstick className="w-5 h-5 text-[#d4a35a]" />;
      case 'soups-salads': return <Soup className="w-5 h-5 text-[#d4a35a]" />;
      default: return <Utensils className="w-5 h-5 text-[#d4a35a]" />;
    }
  };

  const getCategoryHeroImage = (id: string) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat?.image || '/open-kitchen.jpeg';
  };

  const subFilters = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New' },
    { id: 'healthy', label: 'Healthy' },
    { id: 'budget', label: 'Budget' },
  ];

  const categoryItems = useMemo(() => {
    let items = menuItems.filter((item) => item.category === categoryId);

    if (categorySearch) {
      const q = categorySearch.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q)
      );
    }

    if (selectedSubFilter !== 'all') {
      if (selectedSubFilter === 'popular') {
        items = items.filter((item) => item.badge === 'Popular');
      } else if (selectedSubFilter === 'healthy') {
        items = items.filter((item) => item.badge === 'Healthy' || item.badge === 'Low Carb');
      } else if (selectedSubFilter === 'budget') {
        items = [...items].sort((a, b) => a.price - b.price).slice(0, 6);
      }
    }

    return items;
  }, [menuItems, categoryId, categorySearch, selectedSubFilter]);

  const currentIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
  const nextCategory = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];

  return (
    <div className="min-h-screen bg-[#fdfaf3] pt-4 pb-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="hidden xs:flex items-center gap-2 text-xs text-[#5c4b3f]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#1a120b] font-semibold transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold">Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1a120b] font-bold">{currentCategory.name}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="bg-white hover:bg-[#f8f1e5] text-[#1a120b] border border-[#e6d3c2] text-xs font-bold px-3.5 py-2 rounded-full flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-[280px_1fr] items-start min-w-0">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block self-start min-w-0">
            <div className="sticky top-24 rounded-2xl border border-[#e6d3c2] bg-white p-5 shadow-sm">
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
                  Categories
                </span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setSelectedSubFilter('all');
                    setCategorySearch('');
                  }}
                  className={`flex items-center gap-3 w-full text-left rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition min-w-0 ${
                    categoryId === 'all'
                      ? 'border-[#1a120b] bg-[#1a120b] text-white'
                      : 'border-[#e6d3c2] bg-[#fdfaf3] text-[#2b1b12] hover:border-[#1a120b]'
                  }`}
                >
                  <Utensils className="w-4 h-4 shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm truncate">All Items</span>
                    <span className={`block text-[11px] ${categoryId === 'all' ? 'text-white/70' : 'text-[#8c7a6c]'}`}>
                      {menuItems.length} items
                    </span>
                  </span>
                </button>

                {CATEGORIES.map((cat) => {
                  const icon = getCategoryIcon(cat.id);
                  const itemCount = menuItems.filter((i) => i.category === cat.id).length;
                  const isActive = cat.id === categoryId;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setSelectedSubFilter('all');
                        setCategorySearch('');
                      }}
                      className={`flex items-center gap-3 w-full text-left rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition min-w-0 ${
                        isActive
                          ? 'border-[#1a120b] bg-[#1a120b] text-white'
                          : 'border-[#e6d3c2] bg-[#fdfaf3] text-[#2b1b12] hover:border-[#1a120b]'
                      }`}
                    >
                      <span className={`shrink-0 ${isActive ? 'text-[#d4a35a]' : 'text-[#8c7a6c]'}`}>
                        {icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate">{cat.name}</span>
                        <span className={`block text-[11px] ${isActive ? 'text-white/70' : 'text-[#8c7a6c]'}`}>
                          {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-6 min-w-0">
            {/* Category Header Banner */}
            <div className="rounded-2xl border border-[#e6d3c2] bg-[#1a120b] text-white overflow-hidden">
              <div className="grid gap-6 p-5 sm:gap-8 sm:p-6 lg:grid-cols-[1.6fr_1fr] lg:p-8 grid-cols-1 min-w-0">
                <div className="space-y-4 min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-widest text-[#d4a35a] font-bold">
                    {getCategoryIcon(currentCategory.id)}
                    <span>Open Kitchen Specialty</span>
                  </div>

                  <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#fdfaf3] leading-tight">
                    {currentCategory.name}
                  </h1>

                  <p className="text-sm text-[#d4a35a]/80 leading-relaxed max-w-2xl">
                    {currentCategory.description}. All items freshly prepared upon order in our open kitchen in Nakuru City.
                  </p>

                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3 text-xs font-semibold uppercase tracking-wider text-[#d4a35a]/80">
                    <span className="rounded-full bg-white/8 px-2 sm:px-3 py-2 border border-white/10 text-[9px] sm:text-xs">
                      {menuItems.filter((i) => i.category === categoryId).length} Available Items
                    </span>
                    <span className="rounded-full bg-white/8 px-2 sm:px-3 py-2 border border-white/10 text-[9px] sm:text-xs">
                      Freshly Prepared Daily
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block min-w-0 relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0a05]">
                  <ImageWithSkeleton
                    src={getCategoryHeroImage(currentCategory.id)}
                    alt={currentCategory.name}
                    referrerPolicy="no-referrer"
                    containerClassName="w-full h-full aspect-[4/3]"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Mobile Category Switcher */}
            <div className="md:hidden">
              <div className="overflow-hidden rounded-2xl border border-[#e6d3c2] bg-white p-2">
                <div
                  className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                >
                  {CATEGORIES.map((cat) => {
                    const isActive = cat.id === categoryId;
                    const itemCount = menuItems.filter((item) => item.category === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setSelectedSubFilter('all');
                          setCategorySearch('');
                        }}
                        type="button"
                        className={`shrink-0 min-w-[120px] rounded-xl border bg-white p-3 text-left transition-all duration-200 ${
                          isActive
                            ? 'border-[#1a120b] bg-[#1a120b] text-white shadow-md'
                            : 'border-[#e6d3c2] text-[#2b1b12] hover:border-[#1a120b]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isActive ? 'bg-[#d4a35a] text-white' : 'bg-[#f8f1e5] text-[#8c7a6c]'}`}>
                            {getCategoryIcon(cat.id)}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold leading-tight line-clamp-1">
                              {cat.name}
                            </p>
                            <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/70' : 'text-[#8c7a6c]'}`}>
                              {itemCount} items
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Controls Bar: Search & Sub-filters */}
            <div className="grid gap-4 rounded-2xl border border-[#e6d3c2] bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto] min-w-0">
              <div className="relative w-full sm:w-auto min-w-0">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c7a6c]" />
                <input
                  type="text"
                  placeholder={`Search ${currentCategory.name}...`}
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full rounded-full border border-[#e6d3c2] bg-[#fdfaf3] px-12 py-2.5 text-sm font-semibold text-[#1a120b] placeholder-[#8c7a6c] outline-none transition focus:border-[#1a120b]"
                />
              </div>

              <div className="flex flex-wrap gap-2 min-w-0">
                {subFilters.map((sf) => (
                  <button
                    key={sf.id}
                    onClick={() => setSelectedSubFilter(sf.id)}
                    className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                      selectedSubFilter === sf.id
                        ? 'bg-[#1a120b] text-white'
                        : 'bg-[#fdfaf3] text-[#2b1b12] border border-[#e6d3c2] hover:border-[#1a120b]'
                    }`}
                  >
                    {sf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Display */}
            {categoryItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#e6d3c2]">
                <Search className="w-10 h-10 text-[#8c7a6c] mx-auto mb-3" />
                <h3 className="font-serif font-bold text-lg text-[#1a120b]">No items found in this section</h3>
                <p className="text-xs text-[#5c4b3f] mt-1">
                  Try clearing your search or switching sub-filters.
                </p>
                <button
                  onClick={() => {
                    setCategorySearch('');
                    setSelectedSubFilter('all');
                  }}
                  className="mt-4 bg-[#1a120b] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#2b1b12] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0">
                {categoryItems.map((item) => (
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
              <div className="bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden">
                <div className="divide-y divide-[#f3e8d8]">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex flex-col xs:flex-row xs:items-center justify-between gap-2 hover:bg-[#fdfaf3] px-2 rounded-lg transition-colors min-w-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-[#1a120b] line-clamp-1">{item.name}</span>
                          {item.badge && (
                            <span className="text-[9px] uppercase font-bold bg-[#1a120b] text-white px-1.5 py-0.2 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5c4b3f] line-clamp-1">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between xs:justify-end gap-3 shrink-0">
                        <span className="font-mono font-bold text-sm text-[#1a120b]">
                          KSh {item.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="bg-[#1a120b] hover:bg-[#2b1b12] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Up Next Category Switcher Footer */}
        <div className="mt-10 pt-6 border-t border-[#e6d3c2] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#8c7a6c] tracking-wider">
              Explore Next Category
            </span>
            <h4 className="font-serif font-bold text-lg text-[#1a120b] mt-1">
              {nextCategory.name}
            </h4>
            <p className="text-xs text-[#5c4b3f] line-clamp-1">
              {nextCategory.description}
            </p>
          </div>

          <button
            onClick={() => {
              onSelectCategory(nextCategory.id);
              setSelectedSubFilter('all');
              setCategorySearch('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#1a120b] hover:bg-[#2b1b12] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-colors shrink-0"
          >
            <span>Unfold {nextCategory.name}</span>
            <ChevronRight className="w-4 h-4 text-[#d4a35a]" />
          </button>
        </div>
      </div>
    </div>
  );
};