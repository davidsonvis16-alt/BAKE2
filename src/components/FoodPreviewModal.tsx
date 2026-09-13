import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { useCartAnimation } from './CartAnimation';
import { useScrollLock } from '../hooks/useScrollLock';
import { CATEGORIES } from '../data/menuData';
import { formatKsh } from '../lib/menuMeta';
import { FoodArtFallback } from './menu/MenuCard';

interface FoodPreviewModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
}

export const FoodPreviewModal: React.FC<FoodPreviewModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState<MenuItemOption | undefined>(item.options?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const { triggerFly } = useCartAnimation();
  const addButtonRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  const unitPrice = selectedOption ? selectedOption.price : item.price;
  const categoryName = CATEGORIES.find((c) => c.id === item.category)?.name;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) onAddToCart(item, selectedOption);
    setAdded(true);
    if (addButtonRef.current) triggerFly(addButtonRef.current.getBoundingClientRect());
    setTimeout(onClose, 850);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div
        className="absolute inset-0 bg-bm-ink/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-bm-cream shadow-2xl md:grid md:max-h-[min(640px,88vh)] md:max-w-4xl md:grid-cols-[1.05fr_1fr] md:rounded-[1.75rem]"
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
      >
        <div className="relative aspect-[16/11] shrink-0 overflow-hidden bg-bm-coal md:aspect-auto md:h-full">
          {item.image && !imageFailed ? (
            <motion.img
              src={item.image}
              alt={item.name}
              onError={() => setImageFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <FoodArtFallback category={item.category} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          {item.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-bm-orange px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-bm-ink">
              {item.badge}
            </span>
          )}
          <span className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/70 md:hidden" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-bm-ink shadow-lg hover:bg-bm-sand"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-7" data-lenis-prevent>
            <div>
              {categoryName && (
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bm-flame">{categoryName}</p>
              )}
              <h2 className="mt-2 font-display text-[2rem] uppercase leading-[0.95] text-bm-ink sm:text-[2.5rem]">{item.name}</h2>
              {item.description && <p className="mt-3 text-[15px] leading-relaxed text-bm-muted">{item.description}</p>}
            </div>

            {item.options && item.options.length > 0 && (
              <fieldset>
                <legend className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-bm-ink">Choose your size</legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {item.options.map((opt) => {
                    const active = selectedOption?.name === opt.name;
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        aria-pressed={active}
                        className={`flex flex-col items-start rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                          active ? 'border-bm-ink bg-bm-ink text-white' : 'border-bm-line bg-white text-bm-ink hover:border-bm-ink'
                        }`}
                      >
                        <span className="text-sm font-bold">{opt.name}</span>
                        <span className={`font-display text-xl ${active ? 'text-bm-orange' : ''}`}>{formatKsh(opt.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <div className="flex items-center justify-between rounded-2xl bg-white p-3 ring-1 ring-bm-line">
              <span className="pl-1 text-sm font-bold text-bm-ink">Quantity</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full bg-bm-sand text-bm-ink hover:bg-bm-line disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-display text-2xl tabular-nums text-bm-ink" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-bm-ink text-white hover:bg-bm-ember"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-bm-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-7">
            <button
              ref={addButtonRef}
              type="button"
              onClick={handleAdd}
              disabled={added}
              className={`flex w-full items-center justify-between gap-3 rounded-full px-6 py-4 text-[15px] font-extrabold transition-[background-color,transform] active:scale-[0.98] ${
                added ? 'bg-bm-ink text-white' : 'bg-bm-orange text-bm-ink hover:bg-bm-orange-hot'
              }`}
            >
              <span className="flex items-center gap-2">
                {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" strokeWidth={3} />}
                {added ? 'Added to your order' : `Add ${quantity} to order`}
              </span>
              <span className="font-display text-xl">{formatKsh(unitPrice * quantity)}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
