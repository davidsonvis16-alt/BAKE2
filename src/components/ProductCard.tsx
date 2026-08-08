import React, { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';

interface ProductCardProps {
  item: MenuItem;
  isWishlisted: boolean;
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onToggleWishlist: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [selectedOption, setSelectedOption] = useState<MenuItemOption | undefined>(
    item.options && item.options.length > 0 ? item.options[0] : undefined
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const currentPrice = selectedOption ? selectedOption.price : item.price;
  const safeImageSrc = item.image;

  const handleAdd = () => {
    onAddToCart(item, selectedOption);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const showImage = item.image && !imageFailed;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-[#E6D3C2] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-[#F5EFE7]">
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
          <div className="flex h-full items-center justify-center bg-[#F5EFE7]">
            <span className="text-3xl">🍽️</span>
          </div>
        )}

        <button
          onClick={() => onToggleWishlist(item)}
          className={`absolute top-4 right-4 z-20 rounded-full border border-white/90 bg-white/90 p-2 text-sm shadow-sm transition hover:bg-white ${
            isWishlisted ? 'text-red-500' : 'text-[#111]'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          type="button"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#111] leading-tight">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm leading-relaxed text-[#5C4B3F] line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        {item.options && item.options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.options.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                  selectedOption?.name === opt.name
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-[#E6D3C2] bg-[#F7F1E8] text-[#111] hover:border-[#111]'
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-base font-bold text-[#111]">
            KSh {currentPrice.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            disabled={addedAnimation}
            className={`rounded-full bg-[#111] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#000] ${
              addedAnimation ? 'opacity-80' : ''
            }`}
            type="button"
          >
            {addedAnimation ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
