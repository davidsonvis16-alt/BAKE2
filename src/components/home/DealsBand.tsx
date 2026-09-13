import React, { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { useMenuData } from '../../hooks/useMenuData';
import { MenuItem, MenuItemOption } from '../../types';
import { useCartAnimation } from '../CartAnimation';
import { FoodPreviewModal } from '../FoodPreviewModal';
import { PriceBurst } from '../brand/PriceBurst';
import { Reveal } from '../brand/Reveal';
import { SectionHeading } from '../brand/SectionHeading';
import { formatKsh, hasOptions, lowestPrice } from '../../lib/menuMeta';

interface DealsBandProps {
  onAddToCart: (item: MenuItem, selectedOption?: MenuItemOption) => void;
  onSelectCategory: (categoryId: string) => void;
  /** Extra deal ids shown after the three headline deals (Specials page). */
  extraIds?: string[];
}

const HEADLINE: { id: string; tag?: string }[] = [
  { id: 'bbq1', tag: 'Serves 2' },
  { id: 'bbq2', tag: 'Serves 3–4' },
  { id: 'p2', tag: 'Medium or large' },
];

export const DealsBand: React.FC<DealsBandProps> = ({ onAddToCart, onSelectCategory, extraIds = [] }) => {
  const { menuItems } = useMenuData();
  const { triggerFly } = useCartAnimation();
  const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);

  const deals = useMemo(
    () =>
      // Each deal shows the dish's own photo, never a stand-in.
      [...HEADLINE, ...extraIds.map((id) => ({ id }))]
        .map((d) => {
          const item = menuItems.find((i) => i.id === d.id);
          return item ? { ...d, item, image: item.image } : null;
        })
        .filter((d): d is NonNullable<typeof d> => !!d),
    [menuItems, extraIds]
  );

  const add = (item: MenuItem, e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasOptions(item)) {
      setPreviewItem(item);
      return;
    }
    onAddToCart(item);
    triggerFly(e.currentTarget.getBoundingClientRect());
  };

  if (deals.length === 0) return null;
  const [lead, ...rest] = deals;

  return (
    <section className="bg-bm-ink py-14 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Deals & platters"
          title={
            <>
              Made for <span className="text-bm-orange">sharing</span>
            </>
          }
          description="Big plates, fair prices. Order for the table."
          action={
            <button
              type="button"
              onClick={() => onSelectCategory('bbq-platters')}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-extrabold text-white hover:border-white"
            >
              All BBQ platters
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          }
        />

        {/* Lead deal — split card */}
        <Reveal className="grid overflow-hidden rounded-[2rem] bg-bm-cream text-bm-ink md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
            <img src={lead.image} alt={lead.item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <PriceBurst price={lowestPrice(lead.item)} label="Only" size={116} className="absolute right-4 top-4 sm:right-6 sm:top-6" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            {lead.tag && (
              <span className="w-fit rounded-full bg-bm-ink px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-bm-orange">
                {lead.tag}
              </span>
            )}
            <h3 className="mt-4 font-display text-[2.5rem] uppercase leading-[0.92] text-bm-ink sm:text-6xl">{lead.item.name}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-bm-muted">{lead.item.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={(e) => add(lead.item, e)}
                className="inline-flex items-center gap-2 rounded-full bg-bm-orange px-7 py-4 text-[15px] font-extrabold text-bm-ink transition-[background-color,transform] hover:bg-bm-orange-hot active:scale-95"
              >
                <Plus className="h-4 w-4" strokeWidth={3} />
                Add to order
              </button>
              <span className="font-display text-3xl">{formatKsh(lowestPrice(lead.item))}</span>
            </div>
          </div>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2">
            {rest.map((deal, i) => (
              <Reveal key={deal.item.id} delay={i * 0.08} className="h-full">
                <article className="grid h-full overflow-hidden rounded-[1.75rem] bg-bm-coal sm:grid-cols-[1fr_1.1fr]">
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[260px]">
                    {deal.image ? (
                      <img src={deal.image} alt={deal.item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-bm-ember" />
                    )}
                  </div>
                  <div className="flex flex-col p-5 sm:p-7">
                    {deal.tag && <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-bm-orange">{deal.tag}</span>}
                    <h3 className="mt-2 font-display text-3xl uppercase leading-[0.95] text-white sm:text-4xl">{deal.item.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{deal.item.description}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="leading-none">
                        {hasOptions(deal.item) && (
                          <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/50">From</span>
                        )}
                        <span className="font-display text-2xl text-white">{formatKsh(lowestPrice(deal.item))}</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => add(deal.item, e)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-bm-ink hover:bg-bm-orange"
                      >
                        <Plus className="h-4 w-4" strokeWidth={3} />
                        {hasOptions(deal.item) ? 'Choose' : 'Add'}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {previewItem && (
          <FoodPreviewModal key={previewItem.id} item={previewItem} onClose={() => setPreviewItem(null)} onAddToCart={onAddToCart} />
        )}
      </AnimatePresence>
    </section>
  );
};
