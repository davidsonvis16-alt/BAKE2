import React, { useState, useRef } from 'react';
import { Heart, Check } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { useCartAnimation } from './CartAnimation';

interface ProductCardProps {
  item: MenuItem;
  isWishlisted: boolean;
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onToggleWishlist: (item: MenuItem) => void;
  onOpenPreview?: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onOpenPreview,
}) => {
  const [selectedOption, setSelectedOption] = useState<MenuItemOption | undefined>(
    item.options && item.options.length > 0 ? item.options[0] : undefined
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const { triggerFly } = useCartAnimation();
  const addButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentPrice = selectedOption ? selectedOption.price : item.price;
  const safeImageSrc = item.image;

  const handleAdd = () => {
    onAddToCart(item, selectedOption);
    setAddedAnimation(true);
    if (addButtonRef.current) {
      triggerFly(addButtonRef.current.getBoundingClientRect());
    }
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const showImage = item.image && !imageFailed;

  return (
    <div
      className="premium-card"
      onClick={() => onOpenPreview?.(item)}
    >
      <div className="premium-card-image">
        {showImage ? (
          <img
            src={safeImageSrc}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageFailed(true);
              setImageLoaded(true);
            }}
            className={`premium-card-img ${imageLoaded ? 'loaded' : 'loading'}`}
          />
        ) : (
          <div className="premium-card-fallback">
            <span>🍽️</span>
          </div>
        )}

        {item.badge && (
          <div className="premium-card-badge">
            {item.badge}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className="premium-card-wishlist"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} style={{ color: isWishlisted ? 'white' : '#000000' }} />
        </button>
      </div>

      <div className="premium-card-body">
        <div className="premium-card-text">
          <h3 className="premium-card-name">
            {item.name}
          </h3>
          {item.description && (
            <p className="premium-card-desc">
              {item.description}
            </p>
          )}
        </div>

        <div className="premium-card-footer">
          <p className="premium-card-price">
            KSh {currentPrice.toLocaleString()}
          </p>
          <button
            ref={addButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            disabled={addedAnimation}
            className={`premium-card-add ${addedAnimation ? 'added' : ''}`}
          >
            {addedAnimation ? (
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Added
              </span>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
