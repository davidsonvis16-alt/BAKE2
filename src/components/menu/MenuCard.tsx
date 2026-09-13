import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Minus, Plus } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../../types';
import { useCartAnimation } from '../CartAnimation';
import { categoryIcon, formatKsh, hasOptions, lowestPrice } from '../../lib/menuMeta';

export interface MenuCardHandlers {
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onToggleWishlist: (item: MenuItem) => void;
  onOpenItem: (item: MenuItem) => void;
}

interface MenuCardProps extends MenuCardHandlers {
  item: MenuItem;
  quantity: number;
  isWishlisted: boolean;
  index?: number;
  variant?: 'grid' | 'feature';
}

/** Designed placeholder for dishes still waiting on a photo. */
export const FoodArtFallback: React.FC<{ category: string; className?: string }> = ({ category, className = '' }) => {
  const Icon = categoryIcon(category);
  return (
    <div
      className={`absolute inset-0 grid place-items-center bg-bm-coal ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)',
      }}
    >
      <div className="grid h-16 w-16 place-items-center rounded-full border border-bm-orange/40 bg-bm-ink/60 text-bm-orange sm:h-20 sm:w-20">
        <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.6} />
      </div>
    </div>
  );
};

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  quantity,
  isWishlisted,
  index = 0,
  variant = 'grid',
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onOpenItem,
}) => {
  const reduce = useReducedMotion();
  const { triggerFly } = useCartAnimation();
  const addRef = useRef<HTMLButtonElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const withOptions = hasOptions(item);
  const price = lowestPrice(item);
  const showImage = !!item.image && !imageFailed;
  const feature = variant === 'feature';

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (withOptions) {
      onOpenItem(item);
      return;
    }
    onAddToCart(item);
    triggerFly(e.currentTarget.getBoundingClientRect());
  };

  const card = (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-bm-line/80 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-22px_rgba(26,19,14,0.35)]"
    >
      <button
        type="button"
        onClick={() => onOpenItem(item)}
        className={`relative block w-full overflow-hidden bg-bm-coal text-left ${feature ? 'aspect-[4/3.4]' : 'aspect-[4/3]'}`}
        aria-label={`View ${item.name}`}
      >
        {showImage ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.07] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <FoodArtFallback category={item.category} />
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

        {item.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-bm-orange px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-bm-ink sm:left-3 sm:top-3">
            {item.badge}
          </span>
        )}
        {withOptions && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bm-ink sm:bottom-3 sm:left-3">
            {item.options!.length} sizes
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => onToggleWishlist(item)}
        className={`absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-colors sm:right-3 sm:top-3 ${
          isWishlisted ? 'bg-bm-orange text-bm-ink' : 'bg-black/35 text-white hover:bg-black/55'
        }`}
        aria-label={isWishlisted ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
        aria-pressed={isWishlisted}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      <div className={`flex flex-1 flex-col ${feature ? 'p-4 sm:p-5' : 'p-3 sm:p-4'}`}>
        <h3
          className={`font-display uppercase leading-[1.05] tracking-[0.01em] text-bm-ink ${
            feature ? 'text-xl sm:text-2xl' : 'text-[15px] sm:text-lg'
          }`}
        >
          <button type="button" onClick={() => onOpenItem(item)} className="text-left hover:text-bm-flame">
            {item.name}
          </button>
        </h3>
        {item.description && (
          <p className={`mt-1.5 line-clamp-2 leading-snug text-bm-muted ${feature ? 'text-sm' : 'text-[12px] sm:text-[13px]'}`}>
            {item.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0 leading-none">
            {withOptions && (
              <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.18em] text-bm-flame sm:text-[10px]">
                From
              </span>
            )}
            <span className={`block whitespace-nowrap font-display text-bm-ink ${feature ? 'text-2xl' : 'text-lg sm:text-xl'}`}>
              {formatKsh(price)}
            </span>
          </div>

          {quantity > 0 && !withOptions ? (
            <div className="flex shrink-0 items-center rounded-full bg-bm-ink p-1 text-white">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15 sm:h-8 sm:w-8"
                aria-label={`Remove one ${item.name}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-extrabold tabular-nums" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleAdd}
                className="grid h-7 w-7 place-items-center rounded-full bg-bm-orange text-bm-ink sm:h-8 sm:w-8"
                aria-label={`Add one more ${item.name}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              ref={addRef}
              type="button"
              onClick={handleAdd}
              className="relative flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-bm-orange px-2.5 text-[13px] font-extrabold text-bm-ink transition-[background-color,transform] hover:bg-bm-orange-hot active:scale-95 sm:h-10 sm:px-4"
              aria-label={withOptions ? `Choose a size for ${item.name}` : `Add ${item.name} to order`}
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              <span className="hidden sm:inline">{withOptions ? 'Choose' : 'Add'}</span>
              {quantity > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-bm-ink px-1 text-[10px] text-white">
                  {quantity}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );

  if (reduce) return card;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
    >
      {card}
    </motion.div>
  );
};
