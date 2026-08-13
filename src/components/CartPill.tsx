import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface CartPillProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const CartPill: React.FC<CartPillProps> = ({ cartCount, onOpenCart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setVisible(true);
    }
  }, [cartCount]);

  if (!visible || cartCount === 0) return null;

  return (
    <div className="cart-pill-container">
      <button
        onClick={() => {
          onOpenCart();
        }}
        className="cart-pill"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="cart-pill-count">{cartCount}</span>
        <span className="cart-pill-text">View Cart</span>
      </button>
    </div>
  );
};
