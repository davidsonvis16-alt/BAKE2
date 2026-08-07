import React from 'react';
import { X, Star, Clock, TrendingUp } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { useAuth } from './AuthContext';

interface PopularItemsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopularItemsPopup: React.FC<PopularItemsPopupProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  if (!isOpen || !isAdmin) return null;

  const popularItems = MENU_ITEMS.filter(
    (item) => item.badge === 'Popular' || item.badge === 'Chef Special'
  ).slice(0, 4);

  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#000000] shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#000000] text-white p-6 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-300">
                Trending Now
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-1">Popular This Week</h2>
            <p className="text-xs text-orange-200/80 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Updated {today}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {popularItems.map((item, idx) => (
              <div
                key={item.id}
                className="group bg-white border border-[#EADECB] rounded-xl overflow-hidden hover:border-[#000000]/60 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative h-28 bg-[#FAF3E7] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-[#000000]/20" />
                    </div>
                  )}
                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#000000] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {/* Rank */}
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h4 className="font-display font-bold text-xs text-[#000000] truncate mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#000000]/50 line-clamp-2 mb-2">
                    {item.description || 'Freshly prepared at BakeMart Coffee House'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#000000]">
                      KSh {item.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-orange-400 fill-orange-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-[#EADECB] text-center">
            <p className="text-[10px] text-[#000000]/50 mb-3">
              These are the most ordered items this week
            </p>
            <button
              onClick={onClose}
              className="bg-[#000000] hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors shadow-md"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
