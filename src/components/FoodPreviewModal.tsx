import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import { MenuItem, MenuItemOption } from '../types';
import { useCartAnimation } from './CartAnimation';

interface FoodPreviewModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
}

export const FoodPreviewModal: React.FC<FoodPreviewModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<MenuItemOption | undefined>(
    item.options && item.options.length > 0 ? item.options[0] : undefined
  );
  const [added, setAdded] = React.useState(false);
  const { triggerFly } = useCartAnimation();
  const addButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const currentPrice = selectedOption ? selectedOption.price : item.price;

  const handleAdd = () => {
    onAddToCart(item, selectedOption);
    setAdded(true);
    if (addButtonRef.current) {
      triggerFly(addButtonRef.current.getBoundingClientRect());
    }
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="relative aspect-[4/3] bg-[#f8f1e5]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🍽️
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-[#e6d3c2] flex items-center justify-center text-[#000000] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {item.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-[#000000] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                {item.badge}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="space-y-2">
            <h2 className="text-charcoal font-black text-2xl text-[#000000] leading-tight">
              {item.name}
            </h2>
            {item.description && (
              <p className="text-sm text-[#5c4b3f] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-2xl text-[#000000]">
              KSh {currentPrice.toLocaleString()}
            </span>
            {selectedOption && (
              <span className="text-xs text-[#8c7a6c]">
                ({selectedOption.name})
              </span>
            )}
          </div>

          {item.options && item.options.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8c7a6c]">
                Choose Option
              </p>
              <div className="flex flex-wrap gap-2">
                {item.options.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      selectedOption?.name === opt.name
                        ? 'border-[#000000] bg-[#000000] text-white'
                        : 'border-[#e6d3c2] bg-[#fdfaf3] text-[#000000] hover:border-[#000000]'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#e6d3c2] bg-white">
          <button
            ref={addButtonRef}
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all active:scale-[0.98] ${
              added
                ? 'bg-[#d97a4c] text-white'
                : 'bg-[#000000] text-white hover:bg-[#000000]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
