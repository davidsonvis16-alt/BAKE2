import React, { useState, useRef } from 'react';
import { Plus, Heart, Check, Upload } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { uploadMenuItemImage } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { session } = useAuth();

  const currentPrice = selectedOption ? selectedOption.price : item.price;

  const handleAdd = () => {
    onAddToCart(item, selectedOption);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadMenuItemImage(file, item.id);
      if (url) {
        await supabase.from('menu_items').update({ image: url }).eq('id', item.id);
        setImageLoaded(false);
      }
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setUploadingImage(false);
      setShowUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
     <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EADECB] hover:border-[#000000]/60 hover:shadow-md smooth-card flex flex-col justify-between group">

      {/* Item Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#E6D8C5] mb-3">
        {!imageLoaded && item.image && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6D8C5] via-[#F3E8D8] to-[#E6D8C5] animate-pulse z-10" />
        )}
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {session ? (
              <button
                onClick={() => setShowUpload(true)}
                className="flex flex-col items-center gap-1 text-[#000000]/40 hover:text-[#000000] transition-colors"
                title="Add image"
              >
                <Upload className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Add Image</span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-1 text-[#000000]/30">
                <Upload className="w-8 h-8" />
                <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
              </div>
            )}
          </div>
        )}

        {/* Admin upload overlay button */}
        {session && (
          <>
            <button
              onClick={() => setShowUpload(true)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-lg z-20 transition-colors"
              title="Change image"
            >
              <Plus className="w-4 h-4" />
            </button>
            {showUpload && (
              <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center">
                <div className="bg-white rounded-xl p-4 mx-4 w-full max-w-xs space-y-3">
                  <p className="text-xs font-bold text-[#000000] text-center">Upload image for {item.name}</p>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="w-full text-xs"
                  />
                  <button
                    onClick={() => {
                      setShowUpload(false);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="w-full bg-gray-200 text-[#000000] text-xs font-bold py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Top Header: Title & Badges & Wishlist */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif font-bold text-base text-[#000000] group-hover:text-[#000000] transition-colors">
              {item.name}
            </h3>

            {item.badge && (
              <span
                className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
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

          <button
            onClick={() => onToggleWishlist(item)}
            className={`p-1.5 rounded-full transition-colors shrink-0 ${
              isWishlisted
                ? 'text-red-500 bg-red-50'
                : 'text-[#000000] hover:text-[#000000] hover:bg-[#FAF3E7]'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Item Description */}
        <p className="text-xs text-[#000000] leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Portion / Size Option Selector (e.g. Medium / Large Pizza sizes) */}
        {item.options && item.options.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 bg-[#FAF3E7] p-1 rounded-xl border border-[#EADECB]">
            {item.options.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`flex-1 text-[11px] font-bold py-1 px-2 rounded-lg smooth-btn ${
                  selectedOption?.name === opt.name
                    ? 'bg-[#000000] text-white shadow-xs'
                    : 'text-[#000000] hover:bg-[#EADECB]'
                }`}
              >
                {opt.name} (KSh {opt.price})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions: Price & Add Button */}
      <div className="mt-4 pt-3 border-t border-[#F3E8D8] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#000000] tracking-wider">Price</span>
          <span className="font-mono font-bold text-base sm:text-lg text-[#000000]">
            KSh {currentPrice.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={addedAnimation}
            className={`h-9 px-4 rounded-xl flex items-center gap-1.5 font-bold text-xs text-white smooth-btn shadow-sm ${
              addedAnimation
                ? 'bg-[#000000]'
                : 'bg-[#000000] hover:bg-[#000000]'
            }`}
          title="Add to cart"
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
