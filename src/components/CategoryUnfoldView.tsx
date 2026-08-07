import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
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
    const items = MENU_ITEMS.filter((i) => i.category === categoryId);
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
  }, [categoryId]);

  // All items belonging to current category
  const categoryItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
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
  }, [categoryId, categorySearch, selectedSubFilter]);

  // Find next category for bottom preview
  const currentIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
  const nextCategory = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];

  return (
    <div className="min-h-screen bg-[#FAF3E7] pt-4 pb-16 px-4 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumbs Navigation */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-[#000000]">
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
          className="bg-white hover:bg-[#FAF3E7] text-[#000000] border border-[#EADECB] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#000000]" />
          <span>Back to Overview</span>
        </button>
      </div>

      {/* 2. Category Switcher Bar (Quick Horizontal Scroll on Phone) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#000000] shrink-0 pr-1">
          Categories:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === categoryId;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setSelectedSubFilter('all');
                setCategorySearch('');
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#000000] text-orange-300 shadow-xs'
                  : 'bg-white text-[#000000] border border-[#EADECB] hover:border-[#000000]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 3. Category Header Banner Card */}
      <div className="relative rounded-3xl bg-[#000000] text-white overflow-hidden p-6 sm:p-8 mb-6 shadow-md border border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#000000] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {getCategoryIcon(currentCategory.id)}
              <span>Open Kitchen Specialty</span>
            </div>

            <h1 className="font-serif font-black text-2xl sm:text-4xl text-[#FAF3E7] tracking-tight">
              {currentCategory.name}
            </h1>

            <p className="text-orange-200/90 text-xs sm:text-sm leading-relaxed max-w-xl">
              {currentCategory.description}. All items freshly prepared upon order in our open kitchen in Nakuru City.
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs text-orange-300 font-bold">
              <span className="bg-[#000000] px-3 py-1 rounded-lg border border-neutral-700/60">
                {MENU_ITEMS.filter((i) => i.category === categoryId).length} Available Items
              </span>
              <span className="text-orange-400">
                Freshly Prepared Daily
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-700/40 shadow-lg h-44 sm:h-52 bg-[#000000]">
              <ImageWithSkeleton
                src={getCategoryHeroImage(currentCategory.id)}
                alt={currentCategory.name}
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent z-10" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Controls Bar: Sub-filters & View Toggles */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#EADECB] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Sub-filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {subFilters.map((sf) => (
            <button
              key={sf.id}
              onClick={() => setSelectedSubFilter(sf.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedSubFilter === sf.id
                  ? 'bg-[#000000] text-white shadow-xs'
                  : 'bg-[#FAF3E7] text-[#000000] hover:bg-[#EADECB]'
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>

        {/* Search & View Mode Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* Category Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#000000]" />
            <input
              type="text"
              placeholder={`Search ${currentCategory.name}...`}
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full bg-[#FAF3E7] border border-[#E1D4C0] focus:border-[#000000] text-xs text-[#000000] placeholder-[#000000] rounded-xl pl-8 pr-3 py-1.5 outline-none"
            />
          </div>

          {/* Grid/List Toggle */}
          <div className="flex items-center gap-1 bg-[#FAF3E7] p-1 rounded-xl border border-[#EADECB] shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'grid' ? 'bg-[#000000] text-white' : 'text-[#000000]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('ticket')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'ticket' ? 'bg-[#000000] text-white' : 'text-[#000000]'
              }`}
              title="List Ticket View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
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
        <div className="bg-white rounded-2xl p-6 border border-[#EADECB] shadow-sm space-y-3">
          <div className="border-b border-[#EADECB] pb-2 mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-[#000000]">
            <span>Item & Description</span>
            <span>Price & Order</span>
          </div>

          <div className="divide-y divide-[#F3E8D8]">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-3 hover:bg-[#FAF3E7]/60 px-2 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#000000]">{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] uppercase font-bold bg-[#000000] text-white px-1.5 py-0.2 rounded-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#000000] line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
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
