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

  // Simulated fetch delay when switching categories or subfilters for smooth skeleton transition
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [categoryId, selectedSubFilter, categorySearch]);

  const currentCategory = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  // Helper for Category Icons
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bakery-desserts': return <Cake className="w-5 h-5 text-orange-400" />;
      case 'juices-cocktails': return <GlassWater className="w-5 h-5 text-orange-400" />;
      case 'hot-cold-drinks': return <Coffee className="w-5 h-5 text-orange-400" />;
      case 'breakfast': return <Egg className="w-5 h-5 text-orange-400" />;
      case 'mains-meals': return <UtensilsCrossed className="w-5 h-5 text-orange-400" />;
      case 'light-snacks': return <Beef className="w-5 h-5 text-orange-400" />;
      case 'kienyeji-traditional': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'pizza-pasta': return <Pizza className="w-5 h-5 text-orange-400" />;
      case 'sandwiches-wraps': return <Sandwich className="w-5 h-5 text-orange-400" />;
      case 'bbq-platters': return <Drumstick className="w-5 h-5 text-orange-400" />;
      case 'soups-salads': return <Soup className="w-5 h-5 text-orange-400" />;
      default: return <Utensils className="w-5 h-5 text-orange-400" />;
    }
  };

  // Specific high-res image for category header
  const getCategoryHeroImage = (id: string) => {
    const cat = CATEGORIES.find((c) => c.id === id);
    return cat ? cat.image : CATEGORIES[2].image;
  };

  // Generate sub-filter tags dynamically based on category
  const subFilters = useMemo(() => {
    const items = menuItems.filter((i) => i.category === categoryId);
    if (categoryId === 'pizza-pasta') {
      return [
        { id: 'all', label: 'All Items' },
        { id: 'pizza', label: 'Pizzas' },
        { id: 'pasta', label: 'Pastas & Spaghetti' },
      ];
    } else if (categoryId === 'bakery-desserts') {
      return [
        { id: 'all', label: 'All Items' },
        { id: 'cake', label: 'Cakes & Slices' },
        { id: 'muffin', label: 'Muffins & Cookies' },
        { id: 'dessert', label: 'Desserts & Fruit' },
      ];
    } else if (categoryId === 'juices-cocktails') {
      return [
        { id: 'all', label: 'All Beverages' },
        { id: 'mojito', label: 'Mojitos & Lemonades' },
        { id: 'juice', label: '100% Fresh Juices' },
        { id: 'smoothie', label: 'Creamy Smoothies' },
      ];
    }
    return [{ id: 'all', label: 'All Items' }];
  }, [categoryId, menuItems]);

  // All items belonging to current category
  const categoryItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (item.category !== categoryId) return false;

      // Filter by search
      const matchesSearch =
        categorySearch === '' ||
        item.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        item.description.toLowerCase().includes(categorySearch.toLowerCase());

      // Filter by subfilter tag
      if (!matchesSearch) return false;
      if (selectedSubFilter === 'all') return true;

      const nameLower = item.name.toLowerCase();
      if (selectedSubFilter === 'pizza') return nameLower.includes('pizza') || nameLower.includes('garlic bread');
      if (selectedSubFilter === 'pasta') return nameLower.includes('pasta') || nameLower.includes('spaghetti') || nameLower.includes('penne') || nameLower.includes('noodles');
      if (selectedSubFilter === 'cake') return nameLower.includes('cake') || nameLower.includes('roll');
      if (selectedSubFilter === 'muffin') return nameLower.includes('muffin') || nameLower.includes('cookie');
      if (selectedSubFilter === 'dessert') return nameLower.includes('coupjack') || nameLower.includes('split') || nameLower.includes('delight') || nameLower.includes('cheesecake');
      if (selectedSubFilter === 'mojito') return nameLower.includes('mojito') || nameLower.includes('lemonade');
      if (selectedSubFilter === 'juice') return nameLower.includes('juice') || nameLower.includes('cocktail') || nameLower.includes('pawa');
      if (selectedSubFilter === 'smoothie') return nameLower.includes('smoothie');

      return true;
    });
  }, [categoryId, categorySearch, selectedSubFilter, menuItems]);

  // Find next category for bottom preview
  const currentIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
  const nextCategory = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-4 pb-16 px-4 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumbs Navigation */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="hidden xs:flex items-center gap-2 text-xs text-[#000000]">
          <button
            onClick={onBackToHome}
            className="hover:text-[#000000] font-semibold transition-colors flex items-center gap-1"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#000000]" />
          <span className="font-semibold">Categories</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#000000]" />
          <span className="text-[#000000] font-bold">{currentCategory.name}</span>
        </div>

        <button
          onClick={onBackToHome}
          className="bg-white hover:bg-[#FAF3E7] text-[#000000] border border-[#EADECB] text-xs font-bold px-3.5 py-2 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#000000]" />
          <span>Back</span>
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr] items-start">
        <aside className="hidden md:block self-start">
          <div className="sticky top-24 rounded-[32px] border border-[#E6D3C2] bg-white/95 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
            <div className="mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8C7A6C]">
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
                className={`flex items-center gap-3 w-full text-left rounded-[20px] border px-3.5 py-3 text-sm font-semibold transition ${
                  categoryId === 'all'
                    ? 'border-[#111] bg-[#111] text-white shadow-sm'
                    : 'border-[#F1E7DC] bg-[#FCF6EF] text-[#111] hover:border-[#111] hover:bg-[#F7EFE4]'
                }`}
              >
                <span className={categoryId === 'all' ? 'text-orange-300' : 'text-[#000000]/60'}>
                  <Utensils className="w-4 h-4" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm truncate">All Items</span>
                  <span className={`block text-[11px] ${categoryId === 'all' ? 'text-white/70' : 'text-[#000000]/50'}`}>
                    {menuItems.length} items
                  </span>
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const isActive = cat.id === categoryId;
                const icon = getCategoryIcon(cat.id);
                const itemCount = menuItems.filter((i) => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setSelectedSubFilter('all');
                      setCategorySearch('');
                    }}
                    className={`flex items-center gap-3 w-full text-left rounded-[20px] border px-3.5 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'border-[#111] bg-[#111] text-white shadow-sm'
                        : 'border-[#F1E7DC] bg-[#FCF6EF] text-[#111] hover:border-[#111] hover:bg-[#F7EFE4]'
                    }`}
                  >
                    <span className={isActive ? 'text-orange-300' : 'text-[#000000]/60'}>
                      {icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate">{cat.name}</span>
                      <span className={`block text-[11px] ${isActive ? 'text-white/70' : 'text-[#000000]/50'}`}>
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {/* 3. Category Header Banner Card */}
          <div className="overflow-hidden rounded-[36px] bg-[#111] text-white shadow-[0_40px_90px_rgba(0,0,0,0.18)] border border-[#2A2A2A]">
            <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1.6fr_1fr] lg:p-10">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#F9E7D6]">
                  {getCategoryIcon(currentCategory.id)}
                  <span>Open Kitchen Specialty</span>
                </div>

                <h1 className="font-display text-4xl font-black leading-tight text-[#F9F3EC] sm:text-5xl">
                  {currentCategory.name}
                </h1>

                <p className="max-w-2xl text-sm leading-relaxed text-[#F0D2A8] sm:text-base">
                  {currentCategory.description}. All items freshly prepared upon order in our open kitchen in Nakuru City.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F9E7D6]">
                  <span className="rounded-full bg-white/8 px-3 py-2 border border-white/10">
                    {menuItems.filter((i) => i.category === categoryId).length} Available Items
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-2 border border-white/10">
                    Freshly Prepared Daily
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1a1a] shadow-2xl h-72 sm:h-80">
                <ImageWithSkeleton
                  src={getCategoryHeroImage(currentCategory.id)}
                  alt={currentCategory.name}
                  referrerPolicy="no-referrer"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="overflow-hidden rounded-[32px] border border-[#E6D3C2] bg-white px-3 py-3">
              <div
                className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
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
                      className={`shrink-0 min-w-[170px] max-w-[190px] h-[104px] rounded-[26px] border bg-white p-3 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-[#111] bg-[#111] text-white shadow-lg'
                          : 'border-[#E6D3C2] text-[#111] hover:border-[#111] hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${isActive ? 'bg-orange-300 text-white' : 'bg-[#F5EFE7] text-[#111]'}`}>
                          {getCategoryIcon(cat.id)}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight line-clamp-2">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-[#6F5A4A]/80 mt-1">
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

          {/* 4. Controls Bar: Sub-filters & View Toggles */}
          <div className="grid gap-4 rounded-[32px] border border-[#E6D3C2] bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.06)] sm:grid-cols-[1fr_auto]">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49787]" />
              <input
                type="text"
                placeholder={`Search ${currentCategory.name}...`}
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full rounded-[30px] border border-[#E6D3C2] bg-[#F5EFE7] px-12 py-3 text-sm font-semibold text-[#111] outline-none transition focus:border-[#111] focus:ring-4 focus:ring-[#F0D5B6]/30"
              />
            </div>

            <div className="flex overflow-x-auto pb-2 no-scrollbar gap-3 min-w-max md:flex-wrap md:overflow-visible md:pb-0">
              {subFilters.map((sf) => (
                <button
                  key={sf.id}
                  onClick={() => setSelectedSubFilter(sf.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    selectedSubFilter === sf.id
                      ? 'bg-[#111] text-white shadow-sm'
                      : 'bg-[#F5EFE7] text-[#111] hover:bg-[#E9DDD0]'
                  }`}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

      {/* 5. Products Unfolded Display */}
      {categoryItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-[#EADECB] max-w-md mx-auto my-8">
          <Search className="w-10 h-10 text-[#000000] mx-auto mb-2" />
          <h3 className="font-bold text-[#000000]">No items found in this section</h3>
          <p className="text-xs text-[#000000] mt-1">
            Try clearing your search or switching sub-filters.
          </p>
          <button
            onClick={() => {
              setCategorySearch('');
              setSelectedSubFilter('all');
            }}
            className="mt-4 bg-[#000000] text-white text-xs font-bold px-4 py-2 rounded-full"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        /* Ticket List View */
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EADECB] shadow-sm space-y-3">
          <div className="border-b border-[#EADECB] pb-2 mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-[#000000]">
            <span>Item & Description</span>
            <span>Price & Order</span>
          </div>

          <div className="divide-y divide-[#F3E8D8]">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col xs:flex-row xs:items-center justify-between gap-2 hover:bg-[#FAF3E7]/60 px-2 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[#000000] line-clamp-1">{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] uppercase font-bold bg-[#000000] text-white px-1.5 py-0.2 rounded-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#000000] line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between xs:justify-end gap-3 shrink-0">
                  <span className="font-mono font-bold text-sm text-[#000000]">
                    KSh {item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
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

      {/* 6. Up Next Category Switcher Footer */}
      <div className="mt-10 pt-6 border-t border-[#EADECB] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#000000] tracking-wider">
            Explore Next Category
          </span>
          <h4 className="font-serif font-bold text-lg text-[#000000]">
            {nextCategory.name}
          </h4>
          <p className="text-xs text-[#000000] line-clamp-1">
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
          className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xs shrink-0 transition-colors"
        >
          <span>Unfold {nextCategory.name}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
