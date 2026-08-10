import React from 'react';
import { ShoppingBag, Clock, MapPin, Send } from 'lucide-react';

interface FeatureCardsProps {
  onNavigateReservation?: () => void;
  onNavigateMenu?: () => void;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}

const features: FeatureItem[] = [
  {
    icon: <ShoppingBag className="w-6 h-6 text-[#1a120b]" />,
    title: 'Open Kitchen',
    description: 'Watch our chefs prepare every dish fresh to order. No mystery behind the scenes.',
    accent: true,
  },
  {
    icon: <Clock className="w-6 h-6 text-[#1a120b]" />,
    title: 'Daily Fresh',
    description: 'Open daily from 7 AM until 8 PM. Coffee brewed, pastries baked, meals cooked fresh.',
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#1a120b]" />,
    title: 'Nakuru Location',
    description: 'Tropical House, Moi Road — behind Gilanis Supermarket, beside Nakuru GPO.',
  },
  {
    icon: <Send className="w-6 h-6 text-[#1a120b]" />,
    title: 'Order Now',
    description: 'Order via WhatsApp or Glovo delivery. Quick pickup or dine-in available.',
    accent: true,
  },
];

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onNavigateReservation, onNavigateMenu }) => {
  const orderNowCard = features.find((f) => f.title === 'Order Now');

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8c7a6c]">
            WHY BAKEMART
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#1a120b] mt-2 tracking-tight">
            The Open-Kitchen Experience
          </h2>
          <p className="text-sm text-[#5c4b3f] mt-3 max-w-lg mx-auto leading-relaxed">
            Beyond sweetness — it is fresh and nutritional. Every dish, brewed with care.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
          {features.map((feature, index) => {
            const isOrderNow = feature.title === 'Order Now';
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (isOrderNow && onNavigateMenu) onNavigateMenu();
                }}
                className={`group flex flex-col items-center text-center rounded-2xl p-4 sm:p-6 border transition-all duration-300 text-left ${
                  feature.accent
                    ? 'bg-[#1a120b] text-white border-[#2b1b12] shadow-md hover:shadow-lg'
                    : 'bg-white text-[#1a120b] border-[#e6d3c2] hover:border-[#1a120b]/20 hover:shadow-md'
                } ${isOrderNow ? 'cursor-pointer' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full mb-3 sm:mb-4 transition-all ${
                    feature.accent
                      ? 'bg-[#d4a35a] text-[#1a120b] group-hover:scale-110'
                      : 'bg-[#fdfaf3] border border-[#e6d3c2] group-hover:bg-[#f8f1e5]'
                  }`}
                >
                  {React.cloneElement(feature.icon as React.ReactElement, {
                    className: `w-5 h-5 sm:w-6 sm:h-6 transition-colors`,
                    style: feature.accent
                      ? { color: '#1a120b' }
                      : { color: '#1a120b' },
                  })}
                </div>
                <h3
                  className={`font-serif font-bold text-sm sm:text-base mb-1.5 sm:mb-2 ${
                    feature.accent ? 'text-[#fdfaf3]' : 'text-[#1a120b]'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-[11px] sm:text-xs md:text-sm leading-relaxed flex-1 ${
                    feature.accent ? 'text-[#d4a35a]/80' : 'text-[#5c4b3f]'
                  }`}
                >
                  {feature.description}
                </p>
                {isOrderNow && (
                  <span className="mt-2 sm:mt-3 text-[10px] font-bold uppercase tracking-widest text-[#d4a35a]">
                    Tap to order →
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {(onNavigateReservation || onNavigateMenu) && (
          <div className="mt-12 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {onNavigateMenu && (
                <button
                  onClick={onNavigateMenu}
                  className="bg-[#1a120b] hover:bg-[#2b1b12] text-white font-bold text-sm px-8 py-3 rounded-full transition-all flex items-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#d4a35a]" />
                  <span>View Full Menu</span>
                </button>
              )}
              {onNavigateReservation && (
                <button
                  onClick={onNavigateReservation}
                  className="bg-white hover:bg-[#f8f1e5] text-[#1a120b] border border-[#e6d3c2] font-bold text-sm px-8 py-3 rounded-full transition-all flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#d4a35a]" />
                  <span>Reserve a Table</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
