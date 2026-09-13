import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';
import { CartItem, MenuItem, MenuItemOption } from '../../types';
import { MenuCard } from '../menu/MenuCard';
import { SectionHeading } from '../brand/SectionHeading';
import { FoodPreviewModal } from '../FoodPreviewModal';

/** Hand-picked dishes that have their own photos. */
const FEATURED_IDS = ['bbq1', 'p4', 's5', 'm1_6', 'k2', 'm2_10', 'b12', 'pas2', 'bbq2', 'k4', 'm2_11', 'cd7'];

interface FanFavouritesProps {
  cartItems: CartItem[];
  wishlistIds: string[];
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onToggleWishlist: (item: MenuItem) => void;
}

export const FanFavourites: React.FC<FanFavouritesProps> = ({
  cartItems,
  wishlistIds,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
}) => {
  const { menuItems } = useMenuData();
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const featured = useMemo(
    () => FEATURED_IDS.map((id) => menuItems.find((i) => i.id === id)).filter((i): i is MenuItem => !!i),
    [menuItems]
  );

  const quantityOf = (id: string) => cartItems.filter((ci) => ci.item.id === id).reduce((n, ci) => n + ci.quantity, 0);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16) * 2, behavior: 'smooth' });
  };

  if (featured.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-bm-sand py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Most ordered"
          title={
            <>
              Nakuru's <span className="text-bm-flame">favourites</span>
            </>
          }
          description="The plates regulars come back for. Add them straight to your order."
          action={
            <div className="hidden gap-2 md:flex">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scroll(dir)}
                  className="grid h-12 w-12 place-items-center rounded-full bg-bm-ink text-white hover:bg-bm-orange hover:text-bm-ink"
                  aria-label={dir === -1 ? 'Previous favourites' : 'Next favourites'}
                >
                  {dir === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
              ))}
            </div>
          }
        />
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 sm:scroll-px-6 sm:px-6 lg:scroll-px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]"
      >
        {featured.map((item, i) => (
          <div key={item.id} data-card className="w-[74vw] max-w-[300px] shrink-0 snap-start sm:w-[290px] lg:w-[300px]">
            <MenuCard
              item={item}
              index={i}
              variant="feature"
              quantity={quantityOf(item.id)}
              isWishlisted={wishlistIds.includes(item.id)}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onToggleWishlist={onToggleWishlist}
              onOpenItem={setPreviewItem}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {previewItem && (
          <FoodPreviewModal key={previewItem.id} item={previewItem} onClose={() => setPreviewItem(null)} onAddToCart={onAddToCart} />
        )}
      </AnimatePresence>
    </section>
  );
};
