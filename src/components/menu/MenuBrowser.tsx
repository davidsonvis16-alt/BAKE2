import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, Search, X } from 'lucide-react';
import { CATEGORIES } from '../../data/menuData';
import { useMenuData } from '../../hooks/useMenuData';
import { CartItem, Category, MenuItem, MenuItemOption } from '../../types';
import { FoodPreviewModal } from '../FoodPreviewModal';
import { MenuCard, MenuCardHandlers } from './MenuCard';
import { SplitImage } from '../brand/SplitImage';
import { PriceBurst } from '../brand/PriceBurst';
import { Reveal } from '../brand/Reveal';
import { VisitUs } from '../home/VisitUs';
import {
  categoryIcon,
  formatKsh,
  lowestPrice,
  orderCategories,
  shortCategoryName,
  startingPrice,
} from '../../lib/menuMeta';
import { scrollToElement } from '../../lib/smoothScroll';
import { SEARCH_FOCUS_EVENT, consumeSearchFocus } from '../../lib/searchFocus';

type SortMode = 'recommended' | 'low' | 'high';

interface MenuBrowserProps {
  mode: 'all' | 'category';
  categoryId?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onToggleWishlist: (item: MenuItem) => void;
  onSelectCategory: (categoryId: string) => void;
  onNavigateAll: () => void;
}

const QUICK_SEARCHES = ['Pizza', 'Coffee', 'Pilau', 'Samosa', 'Waffles', 'Smoothie', 'Burger'];
const SORTS: { id: SortMode; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'low', label: 'Price: low' },
  { id: 'high', label: 'Price: high' },
];

const siteHeaderHeight = () => document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 64;

export const MenuBrowser: React.FC<MenuBrowserProps> = ({
  mode,
  categoryId,
  searchQuery,
  onSearchChange,
  cartItems,
  wishlistIds,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onSelectCategory,
  onNavigateAll,
}) => {
  const { menuItems, loading } = useMenuData();
  const categories = useMemo(() => orderCategories(CATEGORIES), []);
  const currentCategory = mode === 'category' ? CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0] : null;

  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const [sort, setSort] = useState<SortMode>('recommended');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [activeId, setActiveId] = useState(currentCategory?.id ?? categories[0].id);

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const suppressSpyUntil = useRef(0);

  const stickyOffset = () => siteHeaderHeight() + (tabBarRef.current?.offsetHeight ?? 0) + 12;

  const quantities = useMemo(() => {
    const map = new Map<string, number>();
    for (const ci of cartItems) map.set(ci.item.id, (map.get(ci.item.id) ?? 0) + ci.quantity);
    return map;
  }, [cartItems]);

  const itemsByCategory = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of menuItems) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [menuItems]);

  const uncategorised = useMemo(() => {
    const known = new Set(CATEGORIES.map((c) => c.id));
    return menuItems.filter((i) => !known.has(i.category));
  }, [menuItems]);

  const sortItems = (items: MenuItem[]) =>
    sort === 'recommended'
      ? items
      : [...items].sort((a, b) => (sort === 'low' ? lowestPrice(a) - lowestPrice(b) : lowestPrice(b) - lowestPrice(a)));

  const query = (mode === 'all' ? searchQuery : categoryQuery).trim().toLowerCase();
  const matches = (item: MenuItem) =>
    item.name.toLowerCase().includes(query) || (item.description ?? '').toLowerCase().includes(query);

  const searchResults = useMemo(
    () => (mode === 'all' && query ? menuItems.filter(matches) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, query, menuItems]
  );

  const categoryItems = currentCategory ? itemsByCategory.get(currentCategory.id) ?? [] : [];
  const visibleCategoryItems = sortItems(query ? categoryItems.filter(matches) : categoryItems);

  const cardHandlers: MenuCardHandlers = { onAddToCart, onUpdateQuantity, onToggleWishlist, onOpenItem: setPreviewItem };

  // Scrollspy for the all-sections menu.
  useEffect(() => {
    if (mode !== 'all' || query) return;
    const onScroll = () => {
      if (Date.now() < suppressSpyUntil.current) return;
      const sections = document.querySelectorAll<HTMLElement>('[data-menu-section]');
      if (sections.length === 0) return;
      const line = stickyOffset() + 48;
      let current = sections[0].dataset.menuSection!;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top - line <= 0) current = s.dataset.menuSection!;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mode, query, menuItems.length]);

  useEffect(() => {
    if (currentCategory) {
      setActiveId(currentCategory.id);
      setCategoryQuery('');
    }
  }, [currentCategory?.id]);

  // Keep the active tab centred in the scroller.
  useEffect(() => {
    const bar = tabScrollRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${activeId}"]`);
    if (!bar || !tab) return;
    bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' });
  }, [activeId]);

  useEffect(() => {
    const focusSearch = () => {
      consumeSearchFocus();
      const input = searchRef.current;
      if (!input) return;
      scrollToElement(input, siteHeaderHeight() + 24);
      setTimeout(() => input.focus({ preventScroll: true }), 400);
    };
    if (consumeSearchFocus()) focusSearch();
    window.addEventListener(SEARCH_FOCUS_EVENT, focusSearch);
    return () => window.removeEventListener(SEARCH_FOCUS_EVENT, focusSearch);
  }, []);

  const handleTab = (id: string) => {
    if (mode === 'category') {
      if (id === 'all') onNavigateAll();
      else onSelectCategory(id);
      return;
    }
    setActiveId(id);
    suppressSpyUntil.current = Date.now() + 1300;
    const go = () => {
      const section = document.getElementById(`menu-${id}`);
      if (section) scrollToElement(section, stickyOffset());
    };
    if (query) {
      onSearchChange('');
      setTimeout(go, 60);
    } else {
      go();
    }
  };

  const nextCategory = currentCategory
    ? categories[(categories.findIndex((c) => c.id === currentCategory.id) + 1) % categories.length]
    : null;

  return (
    <div className="bg-bm-cream">
      {currentCategory ? (
        <CategoryHeader
          category={currentCategory}
          itemCount={categoryItems.length}
          fromPrice={startingPrice(categoryItems)}
          onNavigateAll={onNavigateAll}
        />
      ) : (
        <AllMenuHeader
          itemCount={menuItems.length}
          fromPrice={startingPrice(menuItems)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          searchRef={searchRef}
        />
      )}

      {/* Sticky category tabs */}
      <div ref={tabBarRef} className="sticky top-16 z-30 border-b border-bm-line bg-bm-cream/90 backdrop-blur-xl lg:top-[72px]">
        <div className="relative mx-auto flex max-w-[1320px] items-center gap-1 px-1 sm:px-4 lg:px-6">
          <TabArrow direction="left" onClick={() => tabScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} />
          <div
            ref={tabScrollRef}
            className="no-scrollbar bm-fade-x relative flex flex-1 gap-1.5 overflow-x-auto px-3 py-2.5"
            role="tablist"
            aria-label="Menu categories"
          >
            {mode === 'category' && (
              <CategoryTab id="all" label="Full menu" active={false} onClick={handleTab} icon={<LayoutGrid className="h-4 w-4" />} />
            )}
            {categories.map((c) => (
              <CategoryTab
                key={c.id}
                id={c.id}
                label={shortCategoryName(c)}
                image={c.image}
                active={activeId === c.id && !(mode === 'all' && query)}
                onClick={handleTab}
              />
            ))}
          </div>
          <TabArrow direction="right" onClick={() => tabScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} />
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-3 pb-16 sm:px-6 lg:px-8">
        {loading && menuItems.length === 0 ? (
          <div className="grid grid-cols-2 gap-3 pt-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-bm-line/80">
                <div className="aspect-[4/3] animate-pulse bg-bm-sand" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-bm-sand" />
                  <div className="h-3 w-full animate-pulse rounded bg-bm-sand" />
                  <div className="h-8 w-1/2 animate-pulse rounded-full bg-bm-sand" />
                </div>
              </div>
            ))}
          </div>
        ) : currentCategory ? (
          <>
            <Toolbar
              count={visibleCategoryItems.length}
              sort={sort}
              onSort={setSort}
              search={
                <SearchField
                  value={categoryQuery}
                  onChange={setCategoryQuery}
                  placeholder={`Search ${shortCategoryName(currentCategory).toLowerCase()}…`}
                  compact
                />
              }
            />
            {visibleCategoryItems.length === 0 ? (
              <EmptyState query={categoryQuery} onClear={() => setCategoryQuery('')} />
            ) : (
              <ItemGrid items={visibleCategoryItems} quantities={quantities} wishlistIds={wishlistIds} handlers={cardHandlers} />
            )}
            {nextCategory && <UpNext category={nextCategory} onSelect={onSelectCategory} />}
          </>
        ) : query ? (
          <>
            <div className="pt-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-bm-flame">Search results</p>
              <h2 className="mt-1 font-display text-3xl uppercase leading-none text-bm-ink sm:text-4xl">
                “{searchQuery.trim()}”
              </h2>
            </div>
            <Toolbar count={searchResults.length} sort={sort} onSort={setSort} />
            {searchResults.length === 0 ? (
              <EmptyState query={searchQuery} onClear={() => onSearchChange('')} onPick={onSearchChange} />
            ) : (
              <ItemGrid items={sortItems(searchResults)} quantities={quantities} wishlistIds={wishlistIds} handlers={cardHandlers} />
            )}
          </>
        ) : (
          <>
            {categories.map((c) => {
              const items = itemsByCategory.get(c.id) ?? [];
              if (items.length === 0) return null;
              return (
                <MenuSectionBlock key={c.id} id={c.id} title={c.name} items={items}>
                  <ItemGrid items={items} quantities={quantities} wishlistIds={wishlistIds} handlers={cardHandlers} />
                </MenuSectionBlock>
              );
            })}
            {uncategorised.length > 0 && (
              <MenuSectionBlock id="more" title="More favourites" items={uncategorised}>
                <ItemGrid items={uncategorised} quantities={quantities} wishlistIds={wishlistIds} handlers={cardHandlers} />
              </MenuSectionBlock>
            )}
          </>
        )}
      </div>

      {mode === 'all' && <VisitUs />}

      <AnimatePresence>
        {previewItem && (
          <FoodPreviewModal key={previewItem.id} item={previewItem} onClose={() => setPreviewItem(null)} onAddToCart={onAddToCart} />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------------------------------------------- headers */

const AllMenuHeader: React.FC<{
  itemCount: number;
  fromPrice: number | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
}> = ({ itemCount, fromPrice, searchQuery, onSearchChange, searchRef }) => (
  <section className="relative overflow-hidden bg-bm-ink text-white">
    <div className="relative mx-auto grid max-w-[1320px] items-center gap-8 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-14 md:pt-12 lg:gap-14 lg:px-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-orange">
          BakeMart menu · {itemCount} dishes & drinks
        </p>
        <h1 className="mt-3 font-display text-[4.75rem] uppercase leading-[0.84] text-white sm:text-[6.5rem] lg:text-[8.5rem]">
          The <span className="text-bm-orange">Menu</span>
          <span className="sr-only"> — coffee, pastries and fresh food in Nakuru</span>
        </h1>
        <p className="mt-2 font-script text-[1.9rem] leading-none text-bm-orange/90 sm:text-4xl">It's fresh and nutritional</p>

        <div className="mt-7 max-w-xl">
          <SearchField
            inputRef={searchRef}
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search pizza, pilau, coffee, waffles…"
            dark
          />
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {QUICK_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSearchChange(term)}
                className="shrink-0 rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white/80 hover:border-bm-orange hover:text-bm-orange"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="grid h-40 grid-cols-3 gap-2 sm:h-56 md:h-[400px] md:grid-cols-5 md:grid-rows-2 md:gap-3 lg:h-[460px]">
          <SplitImage
            src="/fresh off the fire.jpeg"
            alt="Barbecue platter at BakeMart"
            trigger="mount"
            priority
            className="rounded-2xl md:col-span-3 md:row-span-2 md:rounded-[1.75rem]"
          />
          <SplitImage
            src="/Pizza-Margarita.jpg"
            alt="Margherita pizza"
            trigger="mount"
            delay={0.15}
            strips={3}
            priority
            className="rounded-2xl md:col-span-2 md:rounded-[1.75rem]"
          />
          <SplitImage
            src="/coffee-and-pastry.jpeg"
            alt="Coffee with fresh pastries"
            trigger="mount"
            delay={0.3}
            strips={3}
            priority
            className="rounded-2xl md:col-span-2 md:rounded-[1.75rem]"
          />
        </div>
        {fromPrice !== null && (
          <PriceBurst price={fromPrice} label="Bites from" size={116} className="absolute -bottom-6 -left-5 hidden md:grid" />
        )}
      </div>
    </div>
  </section>
);

const CategoryHeader: React.FC<{
  category: Category;
  itemCount: number;
  fromPrice: number | null;
  onNavigateAll: () => void;
}> = ({ category, itemCount, fromPrice, onNavigateAll }) => {
  const Icon = categoryIcon(category.id);
  return (
    <section className="relative overflow-hidden bg-bm-ink text-white">
      <div className="relative mx-auto grid max-w-[1320px] md:grid-cols-2 md:gap-10 md:px-6 md:py-10 lg:gap-16 lg:px-8 lg:py-14">
        <div className="relative aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto md:min-h-[400px] md:rounded-[2rem]">
          <SplitImage
            key={category.id}
            src={category.image ?? '/gallery-16.jpg'}
            alt={`${category.name} at BakeMart Coffee House in Nakuru`}
            trigger="mount"
            priority
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bm-ink via-transparent to-transparent md:hidden" />
          {fromPrice !== null && (
            <PriceBurst price={fromPrice} size={104} className="absolute bottom-3 right-3 md:bottom-6 md:right-6 lg:scale-110" />
          )}
        </div>

        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-10 flex flex-col justify-center px-4 pb-8 sm:px-6 md:mt-0 md:px-0 md:pb-0"
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-semibold text-white/60">
            <button type="button" onClick={onNavigateAll} className="hover:text-bm-orange">
              Menu
            </button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{shortCategoryName(category)}</span>
          </nav>
          <span className="mt-4 grid h-12 w-12 place-items-center rounded-full bg-bm-orange text-bm-ink">
            <Icon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-[3rem] uppercase leading-[0.9] text-white sm:text-6xl lg:text-[5.5rem]">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
              {category.description}. Freshly prepared to order in our open kitchen in Nakuru City.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider">
              {itemCount} items
            </span>
            {fromPrice !== null && (
              <span className="rounded-full bg-bm-orange/15 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-bm-orange">
                From {formatKsh(fromPrice)}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- pieces */

const CategoryTab: React.FC<{
  id: string;
  label: string;
  image?: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: (id: string) => void;
}> = ({ id, label, image, icon, active, onClick }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    data-tab={id}
    onClick={() => onClick(id)}
    className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-bold ${
      active ? 'text-white' : 'text-bm-ink hover:bg-bm-sand'
    }`}
  >
    {active && (
      <motion.span
        layoutId="menu-tab-pill"
        className="absolute inset-0 rounded-full bg-bm-ink"
        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
      />
    )}
    <span
      className={`relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ${
        active ? 'ring-bm-orange' : 'bg-bm-sand ring-transparent'
      }`}
    >
      {image ? <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" /> : icon}
    </span>
    <span className="relative">{label}</span>
  </button>
);

const TabArrow: React.FC<{ direction: 'left' | 'right'; onClick: () => void }> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-bm-ink ring-1 ring-bm-line hover:bg-bm-ink hover:text-white md:grid"
    aria-label={direction === 'left' ? 'Scroll categories left' : 'Scroll categories right'}
  >
    {direction === 'left' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
  </button>
);

const SearchField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  dark?: boolean;
  compact?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}> = ({ value, onChange, placeholder, dark, compact, inputRef }) => (
  <label
    className={`flex items-center gap-3 rounded-full px-5 ring-1 transition-shadow focus-within:ring-2 ${
      dark
        ? 'bg-white text-bm-ink ring-white/10 focus-within:ring-bm-orange'
        : 'bg-white text-bm-ink ring-bm-line focus-within:ring-bm-ink'
    } ${compact ? 'h-11 w-full sm:w-72' : 'h-14'}`}
  >
    <Search className="h-5 w-5 shrink-0 text-bm-muted" />
    <span className="sr-only">Search the menu</span>
    <input
      ref={inputRef}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-bm-muted/70 [&::-webkit-search-cancel-button]:hidden"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bm-sand hover:bg-bm-line"
        aria-label="Clear search"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    )}
  </label>
);

const Toolbar: React.FC<{ count: number; sort: SortMode; onSort: (s: SortMode) => void; search?: React.ReactNode }> = ({
  count,
  sort,
  onSort,
  search,
}) => (
  <div className="flex flex-col gap-3 pb-5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pb-7">
    <div className="flex items-center justify-between gap-3 sm:justify-start">
      <p className="text-sm font-semibold text-bm-muted">
        <strong className="text-bm-ink">{count}</strong> {count === 1 ? 'item' : 'items'}
      </p>
      <div className="flex rounded-full bg-white p-1 ring-1 ring-bm-line sm:hidden">
        {SORTS.map((s) => (
          <SortButton key={s.id} active={sort === s.id} onClick={() => onSort(s.id)} label={s.label} />
        ))}
      </div>
    </div>
    <div className="flex items-center gap-3">
      {search}
      <div className="hidden rounded-full bg-white p-1 ring-1 ring-bm-line sm:flex">
        {SORTS.map((s) => (
          <SortButton key={s.id} active={sort === s.id} onClick={() => onSort(s.id)} label={s.label} />
        ))}
      </div>
    </div>
  </div>
);

const SortButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-bold ${
      active ? 'bg-bm-ink text-white' : 'text-bm-muted hover:text-bm-ink'
    }`}
  >
    {label}
  </button>
);

const MenuSectionBlock: React.FC<{ id: string; title: string; items: MenuItem[]; children: React.ReactNode }> = ({
  id,
  title,
  items,
  children,
}) => {
  const Icon = categoryIcon(id);
  const from = startingPrice(items);
  return (
    <section id={`menu-${id}`} data-menu-section={id} className="pt-10 sm:pt-16" aria-labelledby={`menu-${id}-title`}>
      <Reveal className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bm-ink text-bm-orange sm:h-14 sm:w-14">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </span>
        <div className="min-w-0">
          <h2 id={`menu-${id}-title`} className="font-display text-[1.9rem] uppercase leading-[0.95] text-bm-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-1 text-[13px] font-semibold text-bm-muted sm:text-sm">
            {items.length} items
            {from !== null && (
              <>
                {' '}
                · from <span className="text-bm-flame">{formatKsh(from)}</span>
              </>
            )}
          </p>
        </div>
        <span className="ml-2 hidden h-px flex-1 bg-bm-line sm:block" aria-hidden="true" />
      </Reveal>
      {children}
    </section>
  );
};

const ItemGrid: React.FC<{
  items: MenuItem[];
  quantities: Map<string, number>;
  wishlistIds: string[];
  handlers: MenuCardHandlers;
}> = ({ items, quantities, wishlistIds, handlers }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
    {items.map((item, i) => (
      <MenuCard
        key={item.id}
        item={item}
        index={i}
        quantity={quantities.get(item.id) ?? 0}
        isWishlisted={wishlistIds.includes(item.id)}
        {...handlers}
      />
    ))}
  </div>
);

const EmptyState: React.FC<{ query: string; onClear: () => void; onPick?: (q: string) => void }> = ({ query, onClear, onPick }) => (
  <div className="rounded-[1.75rem] bg-white px-6 py-14 text-center ring-1 ring-bm-line">
    <Search className="mx-auto h-10 w-10 text-bm-muted" />
    <h3 className="mt-4 font-display text-3xl uppercase text-bm-ink">Nothing matches “{query.trim()}”</h3>
    <p className="mt-2 text-sm text-bm-muted">Check the spelling, or try one of these:</p>
    {onPick && (
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {QUICK_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onPick(term)}
            className="rounded-full bg-bm-sand px-4 py-2 text-sm font-bold text-bm-ink hover:bg-bm-ink hover:text-white"
          >
            {term}
          </button>
        ))}
      </div>
    )}
    <button
      type="button"
      onClick={onClear}
      className="mt-6 rounded-full bg-bm-ink px-6 py-3 text-sm font-extrabold text-white hover:bg-bm-ember"
    >
      Clear search
    </button>
  </div>
);

const UpNext: React.FC<{ category: Category; onSelect: (id: string) => void }> = ({ category, onSelect }) => (
  <Reveal className="mt-14">
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className="group grid w-full overflow-hidden rounded-[1.75rem] bg-bm-ink text-left text-white sm:grid-cols-[1fr_1.2fr]"
    >
      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-auto sm:min-h-[220px]">
        <img
          src={category.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-10">
        <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-bm-orange">Up next</span>
        <span className="font-display text-4xl uppercase leading-none sm:text-5xl">{category.name}</span>
        <span className="line-clamp-2 text-sm text-white/65">{category.description}</span>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-bm-orange px-5 py-2.5 text-sm font-extrabold text-bm-ink">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  </Reveal>
);
