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

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Combo Card 1: Grand Feast */}
        <div className="relative rounded-2xl bg-[#000000] text-white p-6 overflow-hidden border border-neutral-800 shadow-md flex flex-col justify-between group">
           <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: `url('/bbq-platters.jpeg')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/90 to-transparent" />

          <div className="relative z-10 space-y-2">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#000000] text-white px-2.5 py-0.5 rounded-xs">
              BBQ GRAND FEAST
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF3E7]">
              Barbecue Grand Feast #2
            </h3>
            <p className="text-xs text-orange-200/80 line-clamp-2">
              Mbuzi Choma, Kuku Choma, Swahili Pilau, Wedges, Sausages, Chips Masala, Fried Cassava & Greens.
            </p>
          </div>

          <div className="relative z-10 pt-5 flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[10px] text-orange-400 uppercase font-bold">Only</span>
               <span className="font-mono font-bold text-xl text-orange-300">
                 KSh {(grandFeast?.price || 0).toLocaleString()}
               </span>
             </div>

             <button
               onClick={() => onAddToCart(grandFeast.id)}
                className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
             >
               <ShoppingBag className="w-3.5 h-3.5" />
               <span>Order Now</span>
             </button>
           </div>
         </div>

         {/* Combo Card 2: Italian Pizza Deal */}
         <div className="relative rounded-2xl bg-[#000000] text-white p-6 overflow-hidden border border-neutral-800 shadow-md flex flex-col justify-between group">
            <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: `url('/pizza-pasta.jpeg')` }} />
           <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/90 to-transparent" />

           <div className="relative z-10 space-y-2">
             <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#000000] text-white px-2.5 py-0.5 rounded-xs">
               ITALIAN OPEN-KITCHEN
             </span>
             <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF3E7]">
               Chicken Tikka Pizza Deal
             </h3>
             <p className="text-xs text-orange-200/80 line-clamp-2">
               Hand-stretched dough, roasted tikka chicken strips, capsicum, rich mozzarella & herb oregano.
             </p>
           </div>

           <div className="relative z-10 pt-5 flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[10px] text-orange-400 uppercase font-bold">Medium / Large</span>
               <span className="font-mono font-bold text-xl text-orange-300">
                 KSh {(tikkaPizza?.price || 0).toLocaleString()}
               </span>
             </div>

            <button
              onClick={() => onAddToCart(tikkaPizza.id)}
              className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Pizza</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
