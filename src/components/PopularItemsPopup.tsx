import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Flame, ShoppingBag } from 'lucide-react';
import { useMenuData } from '../hooks/useMenuData';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';
import { useCartAnimation } from './CartAnimation';
import { getCachedData, invalidateCache } from '../lib/dataCache';

const SESSION_KEY = 'bakemart_popular_seen';
const FALLBACK_ITEM_IDS = ['s6', 'bbq1'];

const FALLBACK_IMAGES: Record<string, string> = {
  s6: '/Chips-Masala.jpg',
  bbq1: '/Choma-Platter.jpg',
};

interface PopularItemsPopupProps {
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOption?: any) => void;
}

export const PopularItemsPopup: React.FC<PopularItemsPopupProps> = ({
  onClose,
  onAddToCart,
}) => {
  const { menuItems, loading: menuLoading } = useMenuData();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { triggerFly } = useCartAnimation();

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (alreadySeen || menuLoading) return;
    fetchPopularItems();
  }, [menuLoading]);

  async function fetchPopularItems() {
    if (!supabase) {
      showItemsForIds(FALLBACK_ITEM_IDS);
      return;
    }

    const ids = await getCachedData<string[]>(
      'popular-item-ids',
      async () => {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('items');

        if (error || !orders) {
          return FALLBACK_ITEM_IDS;
        }

        const totals: Record<string, number> = {};
        for (const order of orders) {
          const lineItems = Array.isArray(order.items) ? order.items : [];
          for (const li of lineItems) {
            const id = li.id ?? li.product_id ?? li.item_id;
            const qty = Number(li.quantity ?? li.qty ?? 1);
            if (!id) continue;
            totals[id] = (totals[id] || 0) + qty;
          }
        }

        const rankedIds = Object.entries(totals)
          .sort((a, b) => Number(b[1]) - Number(a[1]))
          .slice(0, 2)
          .map(([id]) => id);

        return rankedIds.length > 0 ? rankedIds : FALLBACK_ITEM_IDS;
      },
      { ttlMs: 5 * 60 * 1000 }
    );

    showItemsForIds(ids);
  }

  function showItemsForIds(ids: string[]) {
    const ordered = ids
      .map((id) => menuItems.find((m) => m.id === id))
      .filter(Boolean) as MenuItem[];
    setItems(ordered);
    setLoading(false);
    if (ordered.length > 0) {
      setIsOpen(true);
    }
  }

  function handleClose() {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  }

  const handleAddToCart = useCallback(
    (item: MenuItem, e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onAddToCart(item);
      triggerFly(rect);
    },
    [onAddToCart, triggerFly]
  );

  if (loading || !isOpen || items.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full text-[#000000]/40 hover:text-[#000000] hover:bg-[#FAF3E7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center mx-auto mb-3">
                <Flame className="w-6 h-6 text-orange-300" />
              </div>
              <h2 className="font-display font-bold text-xl text-[#000000]">
                Customer Favorites
              </h2>
              <p className="text-xs text-[#000000]/60 mt-1">
                Top picks from today&apos;s orders
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-white">
                    {item.image ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#FAF3E7] flex items-center justify-center">
                          <span className="text-2xl">🍽️</span>
                        </div>
                      </div>
                    )}

                    {/* Subtle shadow beneath food */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/5 rounded-full blur-md pointer-events-none" />

                    {/* Popular Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#000000] text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider z-10">
                      POPULAR
                    </span>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-[#000000] hover:bg-[#000000] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-90 z-10"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item Info */}
                  <div className="p-3.5">
                    <h3 className="font-display font-bold text-sm text-[#000000] truncate mb-1">
                      {item.name}
                    </h3>
                    <p className="font-mono font-bold text-sm text-[#F97316]">
                      KSh {item.price?.toLocaleString() || '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
