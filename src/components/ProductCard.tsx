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
      className="product-card"
      onClick={() => onOpenPreview?.(item)}
    >
      <div className="product-card-image">
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
            className={`w-full h-full object-cover transition duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#f8f1e5]">
            <span className="text-4xl">🍽️</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all"
          style={{
            backgroundColor: isWishlisted ? '#d97a4c' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isWishlisted ? '#d97a4c' : '#e6d3c2',
            color: '#000000'
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} style={{ color: isWishlisted ? 'white' : '#000000' }} />
        </button>

        {item.badge && (
          <div className="product-card-badge">
            {item.badge}
          </div>
        )}
      </div>

      <div className="product-card-content">
        <div className="space-y-1.5">
          <h3 className="product-card-name">
            {item.name}
          </h3>
          {item.description && (
            <p className="product-card-desc">
              {item.description}
            </p>
          )}
        </div>

        {item.options && item.options.length > 0 && (
          <div className="product-card-options">
            {item.options.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOption(opt);
                }}
                className={`product-card-option ${selectedOption?.name === opt.name ? 'selected' : ''}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        )}

        <div className="product-card-footer">
          <div>
            <p className="product-card-price">
              KSh {currentPrice.toLocaleString()}
            </p>
          </div>
          <button
            ref={addButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            disabled={addedAnimation}
            className={`product-card-add-btn ${addedAnimation ? 'added' : ''}`}
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
