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
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EADECB] hover:border-[#000000]/40 hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Item Image */}
      <div className="relative w-full h-48 sm:h-44 md:h-48 overflow-hidden bg-[#FAF3E7]">
        {!imageLoaded && showImage && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6D8C5] via-[#F3E8D8] to-[#E6D8C5] animate-pulse z-10" />
        )}
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
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-[#FAF3E7]" />
        )}

        {/* Favourite Heart Icon */}
        <button
          onClick={() => onToggleWishlist(item)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-20 ${
            isWishlisted
              ? 'text-red-500 bg-red-50'
              : 'text-white/80 hover:text-white bg-black/20 hover:bg-black/40'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-sm text-[#000000] leading-snug">
            {item.name}
          </h3>
          {item.badge && (
            <span
              className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                item.badge === 'Chef Special'
                  ? 'bg-[#000000] text-orange-300'
                  : item.badge === 'Popular'
                  ? 'bg-[#000000] text-white'
                  : item.badge === 'Healthy'
                  ? 'bg-[#000000] text-white'
                  : 'bg-orange-100 text-[#000000]'
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-[#000000]/60 leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        {/* Portion / Size Option Selector */}
        {item.options && item.options.length > 0 && (
          <div className="mt-auto pt-2">
            <div className="flex items-center gap-1.5 bg-[#FAF3E7] p-1 rounded-xl border border-[#EADECB]">
              {item.options.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setSelectedOption(opt)}
                  className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-lg transition-all ${
                    selectedOption?.name === opt.name
                      ? 'bg-[#000000] text-white'
                      : 'text-[#000000] hover:bg-[#EADECB]'
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Add */}
        <div className="mt-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
          <span className="font-mono font-bold text-sm text-[#000000]">
            KSh {currentPrice.toLocaleString()}
          </span>

          <button
            onClick={handleAdd}
            disabled={addedAnimation}
            className={`flex items-center justify-center gap-1.5 font-bold text-xs px-3.5 py-2 rounded-full transition-all active:scale-95 w-full xs:w-auto ${
              addedAnimation
                ? 'bg-[#000000] text-white'
                : 'bg-[#000000] hover:bg-[#000000] text-white'
            }`}
            title="Add to cart"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added</span>
              </>
            ) : (
              <span>Add</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
