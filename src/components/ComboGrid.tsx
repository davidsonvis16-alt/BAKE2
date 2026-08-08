import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useMenuData } from '../hooks/useMenuData';

interface ComboGridProps {
  onAddToCart: (itemId: string) => void;
}

export const ComboGrid: React.FC<ComboGridProps> = ({ onAddToCart }) => {
  const { menuItems, loading } = useMenuData();
  const grandFeast = menuItems.find((i) => i.id === 'bbq2') || menuItems[0];
  const tikkaPizza = menuItems.find((i) => i.id === 'p2') || menuItems[0];

  if (loading || !grandFeast || !tikkaPizza) {
    return (
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FAF3E7] border border-[#EADECB] p-6 animate-pulse" />
          <div className="rounded-2xl bg-[#FAF3E7] border border-[#EADECB] p-6 animate-pulse" />
        </div>
      </section>
    );
  }

  const fallback = { price: 0 };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8c7a6c]">
            COMBOS & DEALS
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#1a120b] mt-2 tracking-tight">
            Handpicked Combos
          </h2>
          <p className="text-sm text-[#5c4b3f] mt-3 max-w-lg mx-auto leading-relaxed">
            Our chef&apos;s favorite combos &mdash; crafted for sharing or savoring solo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Combo Card 1: Grand Feast */}
          <div className="relative group rounded-2xl border border-[#e6d3c2] bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Food Hero Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('/bbq-platters.jpeg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b]/40 via-[#1a120b]/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#d4a35a]/90 text-[10px] font-bold tracking-widest uppercase text-[#1a120b]">
                  BBQ Grand Feast
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a120b] leading-tight mb-1.5">
                Barbecue Grand Feast #2
              </h3>
              <p className="text-xs text-[#5c4b3f] leading-relaxed line-clamp-2 mb-3 flex-1">
                Mbuzi Choma, Kuku Choma, Swahili Pilau, Wedges, Sausages, Chips Masala, Fried Cassava & Greens.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#e6d3c2]">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#8c7a6c] font-bold">Only</span>
                  <span className="font-mono font-bold text-xl text-[#1a120b]">
                    KSh {(grandFeast?.price || fallback.price).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(grandFeast.id)}
                  className="bg-[#1a120b] hover:bg-[#2b1b12] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#d4a35a]" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Combo Card 2: Italian Pizza Deal */}
          <div className="relative group rounded-2xl border border-[#e6d3c2] bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Food Hero Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('/pizza-pasta.jpeg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b]/40 via-[#1a120b]/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#d4a35a]/90 text-[10px] font-bold tracking-widest uppercase text-[#1a120b]">
                  Italian Combo
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a120b] leading-tight mb-1.5">
                Chicken Tikka Pizza Deal
              </h3>
              <p className="text-xs text-[#5c4b3f] leading-relaxed line-clamp-2 mb-3 flex-1">
                Hand-stretched dough, roasted tikka chicken strips, capsicum, rich mozzarella & herb oregano.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#e6d3c2]">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#8c7a6c] font-bold">Medium / Large</span>
                  <span className="font-mono font-bold text-xl text-[#1a120b]">
                    KSh {(tikkaPizza?.price || fallback.price).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(tikkaPizza.id)}
                  className="bg-[#1a120b] hover:bg-[#2b1b12] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#d4a35a]" />
                  <span>Order Pizza</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
