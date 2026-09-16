import type { LucideIcon } from 'lucide-react';
import {
  Beef,
  Cake,
  CakeSlice,
  Coffee,
  Drumstick,
  Egg,
  Flame,
  GlassWater,
  Pizza,
  Sandwich,
  Soup,
  UtensilsCrossed,
} from 'lucide-react';
import type { Category, MenuItem } from '../types';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'bakery-desserts': Cake,
  'juices-cocktails': GlassWater,
  'hot-cold-drinks': Coffee,
  breakfast: Egg,
  'mains-meals': UtensilsCrossed,
  'light-snacks': Beef,
  'kienyeji-traditional': Flame,
  'pizza-pasta': Pizza,
  'sandwiches-wraps': Sandwich,
  'bbq-platters': Drumstick,
  'waffles-triffles': CakeSlice,
  'soups-salads': Soup,
};

const CATEGORY_SHORT_NAMES: Record<string, string> = {
  'bakery-desserts': 'Bakery',
  'juices-cocktails': 'Juices & Smoothies',
  'hot-cold-drinks': 'Coffee & Drinks',
  breakfast: 'Breakfast',
  'mains-meals': 'Mains & Stews',
  'light-snacks': 'Snacks & Burgers',
  'kienyeji-traditional': 'Kienyeji',
  'pizza-pasta': 'Pizza & Pasta',
  'sandwiches-wraps': 'Sandwiches & Wraps',
  'bbq-platters': 'BBQ Platters',
  'waffles-triffles': 'Waffles & Trifles',
  'soups-salads': 'Soups & Salads',
};

/** Display order: the crave-worthy mains lead, drinks and sweets follow. */
const DISPLAY_ORDER = [
  'bbq-platters',
  'pizza-pasta',
  'mains-meals',
  'light-snacks',
  'kienyeji-traditional',
  'breakfast',
  'sandwiches-wraps',
  'hot-cold-drinks',
  'juices-cocktails',
  'bakery-desserts',
  'waffles-triffles',
  'soups-salads',
];

export const categoryIcon = (id: string): LucideIcon => CATEGORY_ICONS[id] ?? UtensilsCrossed;

export const shortCategoryName = (category: Category) => CATEGORY_SHORT_NAMES[category.id] ?? category.name;

export function orderCategories(categories: Category[]): Category[] {
  const rank = (id: string) => {
    const i = DISPLAY_ORDER.indexOf(id);
    return i === -1 ? DISPLAY_ORDER.length : i;
  };
  return [...categories].sort((a, b) => rank(a.id) - rank(b.id));
}

export const hasOptions = (item: MenuItem) => !!item.options && item.options.length > 0;

export const lowestPrice = (item: MenuItem) =>
  hasOptions(item) ? Math.min(...item.options!.map((o) => o.price)) : item.price;

export function startingPrice(items: MenuItem[]): number | null {
  if (items.length === 0) return null;
  return Math.min(...items.map(lowestPrice));
}

export const formatKsh = (amount: number) => `KSh ${amount.toLocaleString()}`;

export const PHONE_DISPLAY = '0725 009 708';
export const PHONE_TEL = 'tel:+254725009708';
export const whatsappLink = (text = 'Hello BakeMart Coffee House, I would like to order...') =>
  `https://wa.me/254725009708?text=${encodeURIComponent(text)}`;
const MAP_QUERY = 'BakeMart Coffee House, Moi Road, Nakuru';
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
/** Keyless Maps embed. It only renders when a referrer is sent, so never pair it with referrerPolicy="no-referrer". */
export const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&hl=en&output=embed`;

/** Open 7AM–8PM daily, Nairobi time. */
export function openStatus(now = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: 'Africa/Nairobi' }).format(now)
  );
  const open = hour >= 7 && hour < 20;
  return { open, label: open ? 'Open now · till 8PM' : 'Closed · opens 7AM' };
}
