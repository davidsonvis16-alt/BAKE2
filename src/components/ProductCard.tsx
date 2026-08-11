import React, { useState } from 'react';
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
      className="group bg-white rounded-2xl border border-[#e6d3c2] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#000000]/20 cursor-pointer"
      onClick={() => onOpenPreview?.(item)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f1e5]">
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

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item);
          }}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#d97a4c] border-[#d97a4c] text-white'
              : 'bg-white/90 border-[#e6d3c2] text-[#000000] hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-[#000000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          <h3 className="font-serif font-bold text-base text-[#000000] leading-tight line-clamp-1">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-[#5c4b3f] leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        {/* Options */}
        {item.options && item.options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.options.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOption(opt);
                }}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                  selectedOption?.name === opt.name
                    ? 'border-[#000000] bg-[#000000] text-white'
                    : 'border-[#e6d3c2] bg-[#fdfaf3] text-[#000000] hover:border-[#000000]'
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <p className="font-mono font-bold text-base text-[#000000]">
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
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
              addedAnimation
                ? 'bg-[#d97a4c] text-white'
                : 'bg-[#000000] text-white hover:bg-[#000000]'
            }`}
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
