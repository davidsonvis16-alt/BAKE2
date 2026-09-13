import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatKsh, whatsappLink } from '../lib/menuMeta';

interface CartDockProps {
  cartItems: CartItem[];
  hidden: boolean;
  onOpenCart: () => void;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.81 11.81 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41z" />
  </svg>
);

/** Floating cart summary (appears once something is in the cart) plus the WhatsApp shortcut. */
export const CartDock: React.FC<CartDockProps> = ({ cartItems, hidden, onOpenCart }) => {
  const count = cartItems.reduce((n, ci) => n + ci.quantity, 0);
  const total = cartItems.reduce((sum, ci) => sum + (ci.selectedOption ? ci.selectedOption.price : ci.item.price) * ci.quantity, 0);
  const showBar = count > 0 && !hidden;
  const thumbs = cartItems.filter((ci) => ci.item.image).slice(-3);

  return (
    <>
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 lg:inset-x-auto lg:bottom-6 lg:left-1/2 lg:w-[460px] lg:-translate-x-1/2"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <button
              type="button"
              onClick={onOpenCart}
              className="flex w-full items-center gap-3 rounded-full bg-bm-ink py-2 pl-2 pr-2 text-left text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            >
              <span className="flex -space-x-3 pl-1">
                {thumbs.length > 0 ? (
                  thumbs.map((ci) => (
                    <img key={ci.id} src={ci.item.image} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-bm-ink" />
                  ))
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-extrabold">{count}</span>
                )}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-white/55">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
                <span className="block font-display text-xl">{formatKsh(total)}</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-bm-orange px-5 py-3 text-sm font-extrabold text-bm-ink">
                View order
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className={`group fixed right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-white shadow-[0_12px_28px_-12px_rgba(0,0,0,0.5)] transition-[bottom] duration-300 lg:bottom-6 lg:right-6 ${
          showBar ? 'bottom-[calc(9.5rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(5rem+env(safe-area-inset-bottom))]'
        }`}
      >
        <WhatsAppIcon />
        <span className="hidden text-sm font-extrabold lg:group-hover:inline">Order on WhatsApp</span>
      </a>
    </>
  );
};
