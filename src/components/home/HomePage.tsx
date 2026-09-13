import React from 'react';
import { CartItem, MenuItem, MenuItemOption } from '../../types';
import { Hero } from '../Hero';
import { Marquee } from '../brand/Marquee';
import { CategoryRail } from './CategoryRail';
import { FanFavourites } from './FanFavourites';
import { SplitStory } from './SplitStory';
import { DealsBand } from './DealsBand';
import { OrderWays, StatsBand } from './StatsAndOrder';
import { VisitUs } from './VisitUs';

interface HomePageProps {
  cartItems: CartItem[];
  wishlistIds: string[];
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onToggleWishlist: (item: MenuItem) => void;
  onNavigate: (path: string) => void;
}

const TICKER = ['Fresh daily', 'Open kitchen', 'Moi Road, Nakuru', 'Order on WhatsApp', 'Delivery on Glovo', 'M-Pesa accepted'];

export const HomePage: React.FC<HomePageProps> = ({
  cartItems,
  wishlistIds,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onNavigate,
}) => {
  const selectCategory = (id: string) => onNavigate(`/category/${id}`);

  return (
    <>
      <Hero onNavigateMenu={() => onNavigate('/menu')} onSelectCategory={selectCategory} />
      <Marquee items={TICKER} className="bg-bm-orange py-3.5 text-bm-ink" itemClassName="text-xl sm:text-2xl" />
      <CategoryRail onSelectCategory={selectCategory} onNavigateMenu={() => onNavigate('/menu')} />
      <FanFavourites
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateQuantity}
        onToggleWishlist={onToggleWishlist}
      />
      <SplitStory
        onNavigateMenu={() => onNavigate('/menu')}
        onNavigateGallery={() => onNavigate('/gallery')}
        onNavigateReservation={() => onNavigate('/reservation')}
      />
      <DealsBand onAddToCart={onAddToCart} onSelectCategory={selectCategory} />
      <StatsBand />
      <OrderWays onNavigateReservation={() => onNavigate('/reservation')} />
      <VisitUs />
    </>
  );
};
