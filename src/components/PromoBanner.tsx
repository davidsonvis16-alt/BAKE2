import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';

interface PromoBannerProps {
  onAddToCart: (itemId: string) => void;
  onScrollToMenu: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onAddToCart, onScrollToMenu }) => {
  const { menuItems } = useMenuData();
  const bbqCategory = CATEGORIES.find((c) => c.id === 'bbq-platters') || CATEGORIES[0];
  const bbqPlatter = menuItems.find((i) => i.id === 'bbq1') || MENU_ITEMS.find((i) => i.id === 'bbq1') || menuItems[0];

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#1a120b] text-white overflow-hidden p-0 border border-[#2b1b12] flex flex-col md:grid md:grid-cols-12 md:gap-6 md:items-center md:p-8">
          {/* Image Content — on top for mobile, right side on desktop */}
          <div className="md:col-span-5 relative order-1 md:order-2">
            <div className="relative w-full aspect-[16/10] md:aspect-[4/3] md:rounded-xl overflow-hidden md:border md:border-white/10">
              <img
                src={bbqCategory.image}
                alt="BakeMart Barbecue Platter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#1a120b] text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#d4a35a]">
                KSh 1,500
              </div>
            </div>
          </div>

          {/* Text Content — below image on mobile, left side on desktop */}
          <div className="order-2 md:order-1 md:col-span-7 space-y-3 p-6 md:p-0">
            <div className="inline-flex items-center gap-2 bg-[#d4a35a] text-[#1a120b] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <span>Barbecue Special</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#fdfaf3] leading-tight">
              Sizzling Barbecue Platter #1
              <span className="block text-[#d4a35a] font-serif italic font-normal text-lg sm:text-xl mt-1">
                (Serves 2 Foodies)
              </span>
            </h3>

            <p className="text-[#f4a261]/90 text-xs sm:text-sm leading-relaxed max-w-lg">
              Mbuzi Choma, Kuku Choma, Sausages, Golden Chips, Wedges, Ugali, Chapati, Fresh Kachumbari & House Dipping Sauce.
            </p>

            <div className="pt-3 flex items-center gap-4 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase text-[#d4a35a] font-bold">Price</span>
                <span className="font-mono font-bold text-2xl text-[#d4a35a]">
                  KSh {bbqPlatter.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddToCart(bbqPlatter.id)}
                  className="bg-[#d4a35a] hover:bg-[#e6c98f] text-[#1a120b] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={onScrollToMenu}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all border border-white/20 flex items-center gap-1.5"
                >
                  <span>Explore BBQ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4a35a]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
