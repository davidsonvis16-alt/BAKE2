import React from 'react';
import { X, Heart, Plus, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';
import { useCartAnimation } from './CartAnimation';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity drawer-overlay"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full max-w-md h-full bg-[#fdfaf3] text-[#000000] shadow-2xl flex flex-col border-l border-[#e6d3c2] drawer-content">

          {/* Header */}
          <div className="p-4 bg-white border-b border-[#e6d3c2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#d97a4c] fill-[#d97a4c]" />
              <h2 className="font-serif font-bold text-base text-[#000000]">
                Saved Favorites ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#8c7a6c] hover:text-[#000000] hover:bg-[#f8f1e5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-[#8c7a6c] mx-auto" />
                <h3 className="font-serif font-bold text-lg text-[#000000]">
                  No favorites saved yet
                </h3>
                <p className="text-xs text-[#5c4b3f] max-w-xs mx-auto">
                  Click the heart icon on any menu item to save it for quick future ordering.
                </p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border border-[#e6d3c2] flex items-center gap-3"
                >
                  {item.image && (
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#f8f1e5] shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-[80%] max-h-[80%] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#000000] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#5c4b3f] truncate mt-0.5">
                      {item.description}
                    </p>
                    <p className="font-mono font-bold text-xs text-[#000000] mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        onAddToCart(item);
                        triggerFly(rect);
                      }}
                      className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(item)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
