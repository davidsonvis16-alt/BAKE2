import React from 'react';
import { X, Heart, Plus, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-full max-w-md h-full bg-[#FAF3E7] text-[#000000] shadow-2xl flex flex-col justify-between border-l border-[#EADECB]">
          
          {/* Header */}
          <div className="p-4 bg-[#000000] text-white flex items-center justify-between border-b border-neutral-700/40">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <h2 className="font-display font-bold text-base text-[#FAF3E7]">
                Saved Favorites ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-orange-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-[#000000] mx-auto opacity-30" />
                <h3 className="font-display font-bold text-lg text-[#000000]">
                  No favorites saved yet
                </h3>
                <p className="text-xs text-[#000000] max-w-xs mx-auto">
                  Click the heart icon on any menu item to save it for quick future ordering.
                </p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded-xl border border-[#EADECB] shadow-2xs flex items-center gap-3"
                >
                  {item.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 flex items-center justify-center">
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
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#000000] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#000000] truncate mt-0.5">
                      {item.description}
                    </p>
                    <p className="font-mono font-bold text-xs text-[#000000] mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(item)}
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
