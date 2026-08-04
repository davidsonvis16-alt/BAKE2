import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

interface PromoBannerProps {
  onAddToCart: (itemId: string) => void;
  onScrollToMenu: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onAddToCart, onScrollToMenu }) => {
  const bbqCategory = CATEGORIES.find((c) => c.id === 'bbq-platters') || CATEGORIES[0];
  const bbqPlatter = MENU_ITEMS.find((i) => i.id === 'bbq1') || MENU_ITEMS[0];

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto smooth-slide-up">
      <div className="relative rounded-2xl bg-[#000000] text-white overflow-hidden p-6 sm:p-8 shadow-md border border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Text Content */}
          <div className="md:col-span-7 space-y-3">
            {/* ... existing content unchanged for brevity */}
            <div className="inline-flex items-center gap-2 bg-[#000000] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <span>Barbecue Special</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF3E7] leading-tight">
              Sizzling Barbecue Platter #1 <br />
              <span className="text-orange-300 font-serif italic font-normal text-lg sm:text-xl">
                (Serves 2 Foodies)
              </span>
            </h3>

            <p className="text-orange-200/90 text-xs sm:text-sm leading-relaxed max-w-lg">
              Mbuzi Choma, Kuku Choma, Sausages, Golden Chips, Wedges, Ugali, Chapati, Fresh Kachumbari & House Dipping Sauce.
            </p>

            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase text-orange-400 font-bold">Price</span>
                <span className="font-mono font-bold text-2xl text-orange-300">
                  KSh {bbqPlatter.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddToCart(bbqPlatter.id)}
                  className="bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={onScrollToMenu}
                  className="bg-[#FAF3E7]/10 hover:bg-[#FAF3E7]/20 text-[#FAF3E7] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all border border-orange-200/20 flex items-center gap-1.5"
                >
                  <span>Explore BBQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-neutral-700/40 shadow-lg">
              <img
                src={bbqCategory.image}
                alt="BakeMart Barbecue Platter"
                referrerPolicy="no-referrer"
                className="w-full h-52 sm:h-60 object-cover object-center"
              />
              <div className="absolute top-3 right-3 bg-[#000000] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md font-mono">
                KSh 1,500
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
