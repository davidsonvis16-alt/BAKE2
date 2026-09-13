import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart, Plus, Trash2, X } from 'lucide-react';
import { MenuItem } from '../types';
import { useCartAnimation } from './CartAnimation';
import { useScrollLock } from '../hooks/useScrollLock';
import { categoryIcon, formatKsh, hasOptions, lowestPrice } from '../lib/menuMeta';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: MenuItem[];
  onRemoveFromWishlist: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  const { triggerFly } = useCartAnimation();
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[65]" role="dialog" aria-modal="true" aria-label="Saved favourites">
          <motion.div
            className="absolute inset-0 bg-bm-ink/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-bm-cream text-bm-ink shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between bg-bm-ink px-5 text-white">
              <h2 className="flex items-baseline gap-2 font-display text-2xl uppercase text-white">
                Favourites
                <span className="font-sans text-sm font-bold text-white/55">{wishlistItems.length}</span>
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close favourites"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-4 sm:p-5" data-lenis-prevent>
              {wishlistItems.length === 0 ? (
                <div className="px-4 py-16 text-center">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-bm-ink text-bm-orange">
                    <Heart className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-3xl uppercase text-bm-ink">Nothing saved yet</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-bm-muted">Tap the heart on any dish to keep it here for next time.</p>
                </div>
              ) : (
                wishlistItems.map((item) => {
                  const Icon = categoryIcon(item.category);
                  return (
                    <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-bm-line/70">
                      <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-bm-coal text-bm-orange">
                        <Icon className="h-6 w-6" />
                        {item.image && <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold">{item.name}</p>
                        <p className="mt-0.5 font-display text-lg leading-none">
                          {hasOptions(item) && <span className="mr-1 font-sans text-[10px] font-bold uppercase text-bm-muted">From</span>}
                          {formatKsh(lowestPrice(item))}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          onAddToCart(item);
                          triggerFly(rect);
                        }}
                        className="flex h-9 items-center gap-1 rounded-full bg-bm-orange px-3.5 text-xs font-extrabold text-bm-ink hover:bg-bm-orange-hot"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(item)}
                        className="grid h-9 w-9 place-items-center rounded-full text-bm-muted hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${item.name} from favourites`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
